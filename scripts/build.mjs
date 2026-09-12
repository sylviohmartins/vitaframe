import { cp, mkdir, rm, stat } from 'node:fs/promises';

const output = 'dist';
const entries = ['index.html','advanced.html','adaptive.html','meals.html','assets','src','manifest.webmanifest','sw.js'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of entries) await cp(entry, `${output}/${entry}`, { recursive: true });

const required = [
  'dist/index.html','dist/advanced.html','dist/adaptive.html','dist/meals.html',
  'dist/assets/styles.css','dist/src/app.mjs','dist/src/advanced.mjs','dist/src/adaptive-interview.mjs','dist/src/meals.mjs','dist/sw.js'
];
for (const file of required) {
  const info = await stat(file);
  if (!info.isFile() || info.size === 0) throw new Error(`Invalid production artifact: ${file}`);
}
console.log(`Build OK: ${entries.length} production entries copied to ${output}/.`);