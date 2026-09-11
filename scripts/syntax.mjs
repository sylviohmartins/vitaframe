import { readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
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
let failed = false;
for (const file of files) {
  if (file.endsWith('scripts/syntax.mjs')) continue;
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    failed = true;
    console.error(`Syntax failure: ${file}\n${result.stderr}`);
  }
}
if (failed) process.exit(1);
console.log(`Syntax OK: ${files.length} modules checked.`);
