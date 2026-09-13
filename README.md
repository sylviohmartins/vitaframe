# VitaFrame

VitaFrame is a privacy-first, local-first V1 for structured health, nutrition and training assessment. It focuses on collecting context, preferences, routine, body data and training information in a way that can be reviewed and exported without turning the product into an autonomous prescription system.

## V1 scope

The current V1 includes:

- structured multi-step assessment;
- adaptive interview with local explainable rules;
- food-preference catalog and search;
- editable current-meal timeline;
- body/composition history and estimates;
- health and attention flags without diagnosis;
- assisted local import with conflict review;
- profile summary and professional handoff;
- local metrics without remote analytics;
- JSON export/import and print/PDF;
- encrypted export for sensitive data handoff;
- responsive/mobile-first UI and dark mode;
- PWA/offline support;
- automated quality, E2E, accessibility/performance static checks, Impeccable and CodeQL.

The V1 does **not** claim full clinical validation, full WCAG certification, autonomous nutrition/training prescription, or a production multi-user professional portal.

## Run locally

Requirements: Node.js 22+.

```bash
npm ci
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Validate

```bash
npm run ci
npm run e2e
```

Important individual checks:

```bash
npm run structure
npm run links
npm test
npm run build
```

## Repository map

- `.github/` — workflows, templates, CODEOWNERS and dependency automation.
- `assets/` — application styles and static UI assets.
- `docs/` — canonical internal documentation, grouped by product, architecture, design, engineering, governance, research and audits.
- `scripts/` — deterministic build and repository quality tooling.
- `src/` — application/runtime modules.
- `tests/` — unit, quality and browser E2E validation.
- root HTML files + `manifest.webmanifest` + `sw.js` — static/PWA entrypoints.

Start with [the documentation index](docs/README.md) for product, architecture, design, engineering, governance and research material.

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting. Technical threat-model and security architecture details live in [docs/governance/security.md](docs/governance/security.md).

## Product status

The V1 codebase has been audited against the Prompt Mestre and the technically executable scope is represented in [docs/product/requirements.md](docs/product/requirements.md) and [docs/audits/prompt-v1.md](docs/audits/prompt-v1.md).

External validation remains intentionally separate from code completion: real-user usability studies, manual assistive-technology accessibility review, repository administrative protections, and public production hosting are tracked outside the automated implementation gates.
