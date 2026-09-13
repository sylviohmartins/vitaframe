import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const pages = ['index.html', 'adaptive.html', 'advanced.html', 'meals.html'];
const requiredAssets = [
  'assets/brand/mark.svg',
  'assets/brand/logo.svg',
  'assets/brand/logo-dark.svg',
  'assets/brand/logo-compact.svg',
  'assets/brand/wordmark.svg',
  'assets/brand/favicon.svg',
  'assets/brand/favicon.ico',
  'assets/brand/apple-touch-icon.png',
  'assets/brand/icon-192.png',
  'assets/brand/icon-512.png',
  'assets/brand/icon-maskable-192.png',
  'assets/brand/icon-maskable-512.png',
  'assets/brand/og-image.png',
  'assets/brand/brand.css'
];

function pngDimensions(buffer) {
  const signature = buffer.subarray(0, 8).toString('hex');
  assert.equal(signature, '89504e470d0a1a0a');
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

test('brand assets are tracked and non-empty', async () => {
  for (const path of requiredAssets) {
    const info = await stat(path);
    assert.equal(info.isFile(), true, `${path} must be a file`);
    assert.ok(info.size > 0, `${path} must not be empty`);
  }
});

test('vector brand assets remain script-free and raster-free', async () => {
  for (const path of [
    'assets/brand/mark.svg',
    'assets/brand/logo.svg',
    'assets/brand/logo-dark.svg',
    'assets/brand/logo-compact.svg',
    'assets/brand/wordmark.svg',
    'assets/brand/favicon.svg'
  ]) {
    const svg = await readFile(path, 'utf8');
    assert.doesNotMatch(svg, /<script\b/i, `${path} must not contain script`);
    assert.doesNotMatch(svg, /<image\b/i, `${path} must not embed raster images`);
    assert.doesNotMatch(svg, /data:image/i, `${path} must not embed data URLs`);
    assert.match(svg, /viewBox=/, `${path} must define a viewBox`);
  }
});

test('raster deliverables have the expected dimensions', async () => {
  const expected = new Map([
    ['assets/brand/apple-touch-icon.png', [180, 180]],
    ['assets/brand/icon-192.png', [192, 192]],
    ['assets/brand/icon-512.png', [512, 512]],
    ['assets/brand/icon-maskable-192.png', [192, 192]],
    ['assets/brand/icon-maskable-512.png', [512, 512]],
    ['assets/brand/og-image.png', [1200, 630]]
  ]);

  for (const [path, [width, height]] of expected) {
    const buffer = await readFile(path);
    assert.deepEqual(pngDimensions(buffer), { width, height }, `${path} dimensions`);
  }
});

test('manifest exposes regular and maskable PWA icons', async () => {
  const manifest = JSON.parse(await readFile('manifest.webmanifest', 'utf8'));
  const keys = new Set(manifest.icons.map(icon => `${icon.sizes}:${icon.purpose}`));
  assert.ok(keys.has('192x192:any'));
  assert.ok(keys.has('512x512:any'));
  assert.ok(keys.has('192x192:maskable'));
  assert.ok(keys.has('512x512:maskable'));
});

test('every surface references browser, PWA and social brand metadata', async () => {
  for (const page of pages) {
    const html = await readFile(page, 'utf8');
    assert.match(html, /assets\/brand\/favicon\.svg/);
    assert.match(html, /assets\/brand\/favicon\.ico/);
    assert.match(html, /assets\/brand\/apple-touch-icon\.png/);
    assert.match(html, /rel="manifest" href="\.\/manifest\.webmanifest"/);
    assert.match(html, /assets\/brand\/brand\.css/);
    assert.match(html, /property="og:image"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
  }
});

test('service worker precaches runtime brand assets', async () => {
  const sw = await readFile('sw.js', 'utf8');
  for (const asset of [
    './assets/brand/brand.css',
    './assets/brand/mark.svg',
    './assets/brand/favicon.svg',
    './assets/brand/favicon.ico',
    './assets/brand/apple-touch-icon.png',
    './assets/brand/icon-192.png',
    './assets/brand/icon-512.png',
    './assets/brand/icon-maskable-192.png',
    './assets/brand/icon-maskable-512.png'
  ]) {
    assert.ok(sw.includes(`'${asset}'`), `${asset} must be precached`);
  }
});
