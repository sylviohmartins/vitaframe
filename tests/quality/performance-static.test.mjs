import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = new URL('../../', import.meta.url);

async function bytes(relative) {
  return (await stat(new URL(relative, root))).size;
}

test('main page loaded JavaScript including compliance layer stays within budget', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  const scripts = [...html.matchAll(/<script[^>]+src="\.\/(src\/[^\"]+)"/g)].map(match => match[1]);
  assert.ok(scripts.includes('src/prompt-compliance.mjs'), 'prompt compliance runtime must be part of main budget');
  const total = (await Promise.all(scripts.map(bytes))).reduce((sum, value) => sum + value, 0);
  assert.ok(total <= 150_000, `main page JavaScript ${total} bytes exceeds 150 KB budget`);
});

test('production HTML contains no remote font or stylesheet dependency', async () => {
  for (const file of ['index.html', 'adaptive.html', 'advanced.html', 'meals.html']) {
    const html = await readFile(new URL(file, root), 'utf8');
    assert.doesNotMatch(html, /<(?:link|style|script)[^>]+(?:fonts\.googleapis|fonts\.gstatic|https?:\/\/cdn\.)/i, `${file} contains remote presentation/runtime dependency`);
  }
});

test('shipped image assets are bounded and lightweight', async () => {
  const assetsPath = new URL('assets/', root);
  const files = await readdir(assetsPath);
  const images = files.filter(file => /\.(?:png|jpe?g|webp|svg)$/i.test(file));
  assert.ok(images.length <= 12, `unexpected image asset count: ${images.length}`);
  for (const file of images) {
    const size = await bytes(path.posix.join('assets', file));
    assert.ok(size <= 150_000, `${file} exceeds 150 KB static image budget`);
  }
});
