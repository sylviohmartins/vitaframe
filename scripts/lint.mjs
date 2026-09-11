import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.name.endsWith('.mjs')) files.push(full);
  }
  return files;
}

const files = [...await walk('src'), ...await walk('scripts'), ...await walk('tests')];
const failures = [];
for (const file of files) {
  const content = await readFile(file, 'utf8');
  if (/\bvar\s+/.test(content)) failures.push(`${file}: use let/const instead of var`);
  if (/eval\s*\(/.test(content)) failures.push(`${file}: eval is forbidden`);
  if (/new\s+Function\s*\(/.test(content)) failures.push(`${file}: Function constructor is forbidden`);
  if (/document\.write\s*\(/.test(content)) failures.push(`${file}: document.write is forbidden`);
  if (/localStorage\.setItem\([^\n]*(password|senha|secret)/i.test(content)) failures.push(`${file}: secrets/passwords must not be stored in localStorage`);
  if (/window\.open\s*\([^)]*https?:\/\//.test(content)) failures.push(`${file}: runtime must not open hard-coded external destinations`);
  if (/fetch\s*\(\s*[`'"]https?:\/\//.test(content) && file.startsWith('src/')) failures.push(`${file}: runtime must not call hard-coded remote HTTP endpoints`);
}

if (failures.length) {
  console.error('Lint failures:');
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`Lint OK: ${files.length} modules checked.`);