import { cp, mkdir, rm, stat } from 'node:fs/promises';

const output = 'dist';
const entries = ['index.html','advanced.html','adaptive.html','meals.html','assets','src','manifest.webmanifest','sw.js'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of entries) await cp(entry, `${output}/${entry}`, { recursive: true });

const required = [
  'dist/index.html','dist/advanced.html','dist/adaptive.html','dist/meals.html',
  'dist/assets/styles.css','dist/assets/brand/brand.css','dist/assets/brand/mark.svg',
  'dist/assets/brand/favicon.svg','dist/assets/brand/favicon.ico','dist/assets/brand/apple-touch-icon.png',
  'dist/assets/brand/icon-192.png','dist/assets/brand/icon-512.png',
  'dist/assets/brand/icon-maskable-192.png','dist/assets/brand/icon-maskable-512.png',
  'dist/assets/brand/og-image.png',
  'dist/src/app.mjs','dist/src/advanced.mjs','dist/src/adaptive-interview.mjs','dist/src/meals.mjs',
  'dist/manifest.webmanifest','dist/sw.js'
];
for (const file of required) {
  const info = await stat(file);
  if (!info.isFile() || info.size === 0) throw new Error(`Invalid production artifact: ${file}`);
}
console.log(`Build OK: ${entries.length} production entries copied to ${output}/.`);