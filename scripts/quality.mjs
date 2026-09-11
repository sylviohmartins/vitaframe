import { readFile, access } from 'node:fs/promises';

const index = await readFile('index.html', 'utf8');
const advanced = await readFile('advanced.html', 'utf8');
const css = await readFile('assets/styles.css', 'utf8');
const advancedCss = await readFile('assets/advanced.css', 'utf8');
const app = await readFile('src/app.mjs', 'utf8');
const advancedApp = await readFile('src/advanced.mjs', 'utf8');
const sw = await readFile('sw.js', 'utf8');

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const htmlFiles = [index, advanced];

for (const [position, html] of htmlFiles.entries()) {
  const name = position === 0 ? 'index.html' : 'advanced.html';
  assert(html.includes('lang="pt-BR"'), `${name} must declare pt-BR language.`);
  assert(html.includes('viewport-fit=cover'), `${name} viewport must support safe areas.`);
  assert(html.includes('Content-Security-Policy'), `${name} CSP must be present.`);
  assert(html.includes('default-src \'self\''), `${name} CSP must default to self.`);
  assert(html.includes('connect-src \'self\''), `${name} CSP must restrict network connections.`);
  assert(html.includes('class="skip-link"'), `${name} skip link is required.`);
  assert(html.includes('<main id="main"'), `${name} main landmark is required.`);
  assert(!/<script[^>]+src=["']https?:/i.test(html), `${name} runtime remote scripts are forbidden.`);
  assert(!/<link[^>]+href=["']https?:/i.test(html), `${name} runtime remote styles/fonts are forbidden.`);
}

assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'Reduced motion support is required.');
assert(css.includes('focus-visible'), 'Visible focus treatment is required.');
assert(css.includes('min-height: 46px') || css.includes('height: 42px'), 'Comfortable touch target sizing expected.');
assert(advancedCss.includes('@media (max-width: 640px)'), 'Advanced center must have mobile-specific layout.');
assert(app.includes('não prescreve') || app.includes('não transforma esses dados em prescrição'), 'Safety boundary must be visible in UI copy.');
assert(app.includes('Não fazemos diagnóstico'), 'Diagnostic boundary must be visible.');
assert(sw.includes("event.request.method !== 'GET'"), 'Service worker must not cache mutation requests.');
assert(!app.includes('fetch('), 'Assessment runtime must not send user data to network.');
assert(!app.includes('XMLHttpRequest'), 'Assessment runtime must not use XHR.');
assert(!app.includes('navigator.sendBeacon'), 'Assessment runtime must not send analytics beacons.');
assert(!advancedApp.includes('fetch('), 'Advanced runtime must not send health data to network.');
assert(!advancedApp.includes('XMLHttpRequest'), 'Advanced runtime must not use XHR.');
assert(!advancedApp.includes('navigator.sendBeacon'), 'Advanced runtime must not send analytics beacons.');
assert(advancedApp.includes("'TextDetector' in window"), 'Image import must feature-detect local browser OCR.');
assert(advancedApp.includes("name: 'AES-GCM'"), 'Secure export must use authenticated encryption.');
assert(advancedApp.includes("name: 'PBKDF2'"), 'Secure export must derive keys from passphrases locally.');

for (const file of [
  'assets/styles.css','assets/advanced.css','src/app.mjs','src/advanced.mjs','src/advanced-logic.mjs','src/catalog.mjs',
  'src/logic.mjs','src/storage.mjs','manifest.webmanifest','sw.js','README.md','PRODUCT.md','DATA_MODEL.md','PRIVACY.md',
  'SECURITY.md','AI_GUARDRAILS.md','TESTING.md','docs/RESEARCH.md','docs/REGULATORY.md'
]) {
  try { await access(file); } catch { failures.push(`Missing required file: ${file}`); }
}

if (failures.length) {
  console.error('Quality gate failures:');
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log('Quality checks OK.');