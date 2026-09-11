import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const roots = ['src', 'scripts', 'tests', 'assets', '.github/workflows'];
const direct = ['index.html','advanced.html','adaptive.html','meals.html','package.json','manifest.webmanifest'];
const extensions = new Set(['.mjs','.js','.css','.html','.json','.yml','.yaml','.md']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (extensions.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

const files = [...direct, ...(await Promise.all(roots.map(walk))).flat()];
const failures = [];
for (const file of files) {
  const content = await readFile(file, 'utf8');
  content.split('\n').forEach((line, index) => {
    if (/[ \t]+$/.test(line)) failures.push(`${file}:${index + 1}: trailing whitespace`);
    if (line.includes('\t')) failures.push(`${file}:${index + 1}: tab indentation is not allowed`);
  });
}

if (failures.length) {
  console.error('Format check failures:');
  failures.slice(0, 100).forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`Format OK: ${files.length} files checked.`);