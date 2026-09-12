import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../../assets/styles.css', import.meta.url), 'utf8');

function block(pattern) {
  const match = css.match(pattern);
  assert.ok(match?.[1], `CSS token block not found for ${pattern}`);
  return match[1];
}

function token(source, name) {
  const match = source.match(new RegExp(`--${name}\\s*:\\s*(#[0-9a-fA-F]{6})`));
  assert.ok(match?.[1], `Token --${name} not found`);
  return match[1];
}

function luminance(hex) {
  const rgb = [1, 3, 5].map(index => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const linear = rgb.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function expectAA(tokens, foreground, background, minimum = 4.5) {
  const ratio = contrast(token(tokens, foreground), token(tokens, background));
  assert.ok(ratio >= minimum, `${foreground}/${background} contrast ${ratio.toFixed(2)} is below ${minimum}:1`);
}

const light = block(/:root\s*\{([\s\S]*?)\n\}/);
const dark = block(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/);

test('light theme text and semantic colors meet WCAG AA contrast', () => {
  expectAA(light, 'text', 'bg');
  expectAA(light, 'text-2', 'bg');
  expectAA(light, 'accent', 'bg');
  expectAA(light, 'danger', 'danger-soft');
  expectAA(light, 'warning', 'warning-soft');
  expectAA(light, 'info', 'info-soft');
});

test('dark theme text and semantic colors meet WCAG AA contrast', () => {
  expectAA(dark, 'text', 'bg');
  expectAA(dark, 'text-2', 'bg');
  expectAA(dark, 'accent', 'bg');
  expectAA(dark, 'danger', 'danger-soft');
  expectAA(dark, 'warning', 'warning-soft');
  expectAA(dark, 'info', 'info-soft');
});
