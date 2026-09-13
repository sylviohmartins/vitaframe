const CACHE = 'vitaframe-v1.2.1';
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
  './assets/brand/logo.svg',
  './assets/brand/logo-dark.svg',
  './assets/brand/logo-compact.svg',
  './assets/brand/mark.svg',
  './assets/brand/wordmark.svg',
  './assets/brand/favicon.svg',
  './assets/brand/favicon.ico',
  './assets/brand/apple-touch-icon.png',
  './assets/brand/icon-192.png',
  './assets/brand/icon-512.png',
  './assets/brand/icon-maskable-192.png',
  './assets/brand/icon-maskable-512.png',
  './assets/brand/og-image.png',
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