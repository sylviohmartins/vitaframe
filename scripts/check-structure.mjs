import { execFileSync } from 'node:child_process';

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
  'tests/unit/adaptive-interview.test.mjs', 'tests/unit/advanced.test.mjs', 'tests/unit/edge-cases.test.mjs', 'tests/unit/logic.test.mjs',
  'tests/quality/accessibility-contrast.test.mjs', 'tests/quality/performance-static.test.mjs',
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

if (failures.length) {
  console.error('Repository structure failures:');
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`Repository structure OK: ${tracked.length} tracked paths checked.`);
