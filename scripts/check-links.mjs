import { execFileSync } from 'node:child_process';
import { stat, readFile } from 'node:fs/promises';
import path from 'node:path';

const tracked = execFileSync('git', ['ls-files', '*.md'], { encoding: 'utf8' })
  .split(/\r?\n/)
  .filter(Boolean);
const failures = [];
const markdownLink = /!?\[[^\]]*\]\(([^)]+)\)/g;

for (const file of tracked) {
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(markdownLink)) {
    let target = match[1].trim();
    if (!target || target.startsWith('#') || /^(?:https?:|mailto:|tel:)/i.test(target)) continue;
    if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1);
    target = target.split(/\s+["']/)[0];
    target = target.split('#')[0].split('?')[0];
    if (!target) continue;
    try { target = decodeURIComponent(target); } catch {}
    const resolved = target.startsWith('/')
      ? path.resolve(target.slice(1))
      : path.resolve(path.dirname(file), target);
    try {
      await stat(resolved);
    } catch {
      failures.push(`${file}: broken relative link -> ${match[1]}`);
    }
  }
}

if (failures.length) {
  console.error('Internal link check failures:');
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`Internal links OK: ${tracked.length} Markdown files checked.`);
