import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .split(/\r?\n/)
  .filter(Boolean);
const failures = [];
const rootMarkdownAllowed = new Set(['README.md', 'SECURITY.md']);
const forbiddenTrackedPrefixes = ['dist/', 'coverage/', '.cache/', 'e2e-artifacts/', 'node_modules/'];
const required = [
  '.editorconfig', 'README.md', 'SECURITY.md', 'package.json', 'package-lock.json',
  'docs/README.md',
  'docs/product/product.md', 'docs/product/roadmap.md', 'docs/product/requirements.md',
  'docs/architecture/overview.md', 'docs/architecture/data-model.md', 'docs/architecture/decisions.md',
  'docs/design/design-system.md', 'docs/design/ux-architecture.md', 'docs/design/accessibility.md', 'docs/design/visual-qa.md',
  'docs/engineering/testing.md', 'docs/engineering/performance.md', 'docs/engineering/ci-cd.md',
  'docs/governance/security.md', 'docs/governance/privacy.md', 'docs/governance/ai-guardrails.md', 'docs/governance/regulatory.md',
  'docs/research/market.md', 'docs/research/validation-plan.md', 'docs/research/evidence-map.md',
  'docs/audits/prompt-v1.md',
  'tests/e2e/smoke.mjs', 'tests/e2e/extended.mjs', 'tests/e2e/viewports.mjs',
  'tests/visual-baseline.json',
  'scripts/check-structure.mjs', 'scripts/check-links.mjs'
];

for (const file of tracked) {
  if (!file.includes('/') && file.endsWith('.md') && !rootMarkdownAllowed.has(file)) {
    failures.push(`${file}: internal documentation must live under docs/`);
  }
  if (forbiddenTrackedPrefixes.some(prefix => file.startsWith(prefix))) {
    failures.push(`${file}: generated/runtime artifact must not be tracked`);
  }
  if (/^scripts\/e2e(?:-|\.)/.test(file)) failures.push(`${file}: E2E belongs under tests/e2e/`);
  if (/^tests\/[^/]+\.test\.mjs$/.test(file)) failures.push(`${file}: tests must be classified under tests/unit/ or tests/quality/`);
}

for (const file of required) if (!tracked.includes(file)) failures.push(`missing required path: ${file}`);

const stalePaths = new Map([
  ['PRODUCT.md', 'docs/product/product.md'],
  ['ROADMAP.md', 'docs/product/roadmap.md'],
  ['REQUIREMENTS.md', 'docs/product/requirements.md'],
  ['ARCHITECTURE.md', 'docs/architecture/overview.md'],
  ['DATA_MODEL.md', 'docs/architecture/data-model.md'],
  ['DECISIONS.md', 'docs/architecture/decisions.md'],
  ['DESIGN.md', 'docs/design/design-system.md'],
  ['UX.md', 'docs/design/ux-architecture.md'],
  ['ACCESSIBILITY.md', 'docs/design/accessibility.md'],
  ['TESTING.md', 'docs/engineering/testing.md'],
  ['PERFORMANCE.md', 'docs/engineering/performance.md'],
  ['CI.md', 'docs/engineering/ci-cd.md'],
  ['PRIVACY.md', 'docs/governance/privacy.md'],
  ['AI_GUARDRAILS.md', 'docs/governance/ai-guardrails.md'],
  ['docs/REGULATORY.md', 'docs/governance/regulatory.md'],
  ['docs/RESEARCH.md', 'docs/research/market.md'],
  ['VALIDATION.md', 'docs/research/validation-plan.md'],
  ['docs/EVIDENCE_MAP.md', 'docs/research/evidence-map.md'],
  ['docs/PROMPT_AUDIT.md', 'docs/audits/prompt-v1.md'],
  ['scripts/e2e.mjs', 'tests/e2e/smoke.mjs'],
  ['scripts/e2e-extended.mjs', 'tests/e2e/extended.mjs'],
  ['scripts/e2e-viewports.mjs', 'tests/e2e/viewports.mjs'],
  ['tests/accessibility-contrast.test.mjs', 'tests/quality/accessibility-contrast.test.mjs'],
  ['tests/performance-static.test.mjs', 'tests/quality/performance-static.test.mjs']
]);

for (const file of tracked.filter(item => item.endsWith('.md') && !item.startsWith('docs/audits/'))) {
  const content = await readFile(file, 'utf8');
  for (const [oldPath, newPath] of stalePaths) {
    if (content.includes(oldPath) && file !== newPath) failures.push(`${file}: stale path ${oldPath}; use ${newPath}`);
  }
}

if (failures.length) {
  console.error('Repository structure failures:');
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`Repository structure OK: ${tracked.length} tracked paths checked.`);
