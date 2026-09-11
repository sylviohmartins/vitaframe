import { readFile, access } from 'node:fs/promises';

const index = await readFile('index.html', 'utf8');
const css = await readFile('assets/styles.css', 'utf8');
const app = await readFile('src/app.mjs', 'utf8');
const sw = await readFile('sw.js', 'utf8');

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

assert(index.includes('lang="pt-BR"'), 'HTML must declare pt-BR language.');
assert(index.includes('viewport-fit=cover'), 'Viewport must support safe areas.');
assert(index.includes('Content-Security-Policy'), 'CSP must be present.');
assert(index.includes('default-src \'self\''), 'CSP must default to self.');
assert(index.includes('connect-src \'self\''), 'CSP must restrict network connections.');
assert(index.includes('class="skip-link"'), 'Skip link is required.');
assert(index.includes('<main id="main"'), 'Main landmark is required.');
assert(!/<script[^>]+src=["']https?:/i.test(index), 'Runtime remote scripts are forbidden.');
assert(!/<link[^>]+href=["']https?:/i.test(index), 'Runtime remote styles/fonts are forbidden.');
assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'Reduced motion support is required.');
assert(css.includes('focus-visible'), 'Visible focus treatment is required.');
assert(css.includes('min-height: 46px') || css.includes('height: 42px'), 'Comfortable touch target sizing expected.');
assert(app.includes('não prescreve') || app.includes('não transforma esses dados em prescrição'), 'Safety boundary must be visible in UI copy.');
assert(app.includes('Não fazemos diagnóstico'), 'Diagnostic boundary must be visible.');
assert(sw.includes("event.request.method !== 'GET'"), 'Service worker must not cache mutation requests.');
assert(!app.includes('fetch('), 'Assessment runtime must not send user data to network.');
assert(!app.includes('XMLHttpRequest'), 'Assessment runtime must not use XHR.');
assert(!app.includes('navigator.sendBeacon'), 'Assessment runtime must not send analytics beacons.');

for (const file of ['assets/styles.css','src/app.mjs','src/catalog.mjs','src/logic.mjs','src/storage.mjs','manifest.webmanifest','sw.js','README.md','PRIVACY.md','SECURITY.md']) {
  try { await access(file); } catch { failures.push(`Missing required file: ${file}`); }
}

if (failures.length) {
  console.error('Quality gate failures:');
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log('Quality checks OK.');
