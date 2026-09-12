const CACHE = 'vitaframe-v1.1.3';
const ASSETS = [
  './',
  './index.html',
  './advanced.html',
  './meals.html',
  './adaptive.html',
  './assets/styles.css',
  './assets/navigation.css',
  './assets/advanced.css',
  './assets/meals.css',
  './assets/adaptive.css',
  './src/app.mjs',
  './src/catalog.mjs',
  './src/logic.mjs',
  './src/storage.mjs',
  './src/local-metrics.mjs',
  './src/prompt-compliance.mjs',
  './src/advanced.mjs',
  './src/advanced-logic.mjs',
  './src/import-conflict-guard.mjs',
  './src/meals.mjs',
  './src/adaptive-interview.mjs',
  './src/adaptive-interview-logic.mjs',
  './manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (!response || response.status !== 200 || response.type === 'opaque') return response;
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  })));
});