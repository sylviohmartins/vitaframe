# VitaFrame — Documentation

This directory is the canonical entry point for internal product, architecture, design, engineering, governance, research and audit documentation.

## Product

- [Product](product/product.md)
- [Roadmap](product/roadmap.md)
- [Requirements](product/requirements.md)

## Architecture

- [Architecture overview](architecture/overview.md)
- [Data model](architecture/data-model.md)
- [Decisions](architecture/decisions.md)

## Design

- [Design system](design/design-system.md)
- [Brand identity](design/brand.md)
- [UX architecture](design/ux-architecture.md)
- [Accessibility](design/accessibility.md)
- [Visual QA](design/visual-qa.md)

## Engineering

- [Testing](engineering/testing.md)
- [Performance](engineering/performance.md)
- [CI/CD](engineering/ci-cd.md)

## Governance

- [Security architecture](governance/security.md)
- [Privacy](governance/privacy.md)
- [AI guardrails](governance/ai-guardrails.md)
- [Regulatory](governance/regulatory.md)

## Research

- [Market research](research/market.md)
- [Validation plan](research/validation-plan.md)
- [Evidence map](research/evidence-map.md)

## Audits

- [Prompt V1 audit](audits/prompt-v1.md)

## Documentation conventions

- Keep repository-level human entry points such as `README.md` and `SECURITY.md` at the repository root.
- Keep internal documentation under `docs/`, grouped by the reader's intent rather than by chronology.
- Use kebab-case for internal documentation filenames.
- Prefer shallow paths. Add a new subdirectory only when a real semantic group exists.
- Update relative links whenever files move; `npm run links` is a mandatory CI check.
- Do not store generated artifacts, screenshots from temporary runs, coverage reports, caches or logs in `docs/`.
- Architectural or governance changes should update the relevant decision/audit record when the reasoning would otherwise be lost.

## Repository structure principle

The root is intentionally reserved for application entrypoints, package metadata, globally discovered configuration, and repository-level human entry points. Organization exists to reduce cognitive cost, not to minimize the number of root files at any cost.
