# VitaFrame — Manual Accessibility Audit

## Status

**Pending human execution.** This document is the evidence register for the manual accessibility work required before claiming full WCAG 2.2 AA conformance. Automated CI coverage remains documented in [`accessibility.md`](accessibility.md) and does not replace the checks below.

## Audit metadata

Record one row for each audit round.

| Field | Value |
| --- | --- |
| Date | Pending |
| Auditor | Pending |
| Production URL | https://sylviohmartins.github.io/vitaframe/ |
| Commit SHA | Pending |
| Browsers | Pending |
| Operating systems | Pending |
| Physical devices | Pending |
| Assistive technologies | Pending |

Do not add personal, health or other sensitive data to this file, issues, screenshots, logs or artifacts.

## Result vocabulary

Use exactly one result per check:

- `PASS` — manually verified in the stated environment;
- `FAIL` — reproducible accessibility problem found;
- `BLOCKED` — could not be executed because the required device/tool/person was unavailable;
- `N/A` — demonstrably not applicable, with rationale.

A blank cell means **not tested**, never pass by implication.

## Severity

For every `FAIL`, register a GitHub issue and classify impact consistently:

- **Critical** — prevents a user relying on the tested modality from completing a core flow;
- **High** — major barrier with no reasonable workaround;
- **Medium** — meaningful degradation with a workaround;
- **Low** — limited usability/accessibility defect that does not block the task.

## Surfaces in scope

Audit at least these production surfaces:

1. home and privacy/consent;
2. assessment steps 1–10;
3. food preferences/search;
4. final profile;
5. adaptive interview;
6. meal timeline;
7. data center/import/history/professional review/secure export;
8. references and navigation/header/footer.

## Manual checklist

| Area | Procedure | Result | Environment/evidence | Issue |
| --- | --- | --- | --- | --- |
| Keyboard navigation | Complete every core flow with keyboard only; verify logical order, visible focus, activation and return of focus |  |  |  |
| Keyboard traps | Enter/leave every interactive region, dialog-like flow, file input and navigation path without getting trapped |  |  |  |
| Skip link / landmarks | Verify skip link behavior and sensible landmark navigation in a screen reader |  |  |  |
| Headings | Review heading hierarchy and announced structure on every major surface |  |  |  |
| Accessible names | Confirm buttons, links, inputs, icon controls and grouped controls have understandable announced names |  |  |  |
| Form instructions | Confirm labels, help, required context and invalid states are understandable without visual position alone |  |  |  |
| Error/status messages | Trigger representative validation, import and persistence states; confirm announcements and that color is not the only cue |  |  |  |
| Dynamic content | Verify route changes, toast/status updates, adaptive question replacement and profile updates remain understandable |  |  |  |
| NVDA + Chrome | Execute core flows on Windows with NVDA and Chrome |  |  |  |
| NVDA + Firefox | Execute core flows on Windows with NVDA and Firefox |  |  |  |
| VoiceOver + Safari | Execute core flows on macOS/iOS with VoiceOver and Safari when available |  |  |  |
| Zoom 200% | Verify all critical surfaces at 200% browser zoom with no loss of content or operation |  |  |  |
| Zoom 400% / reflow | Verify reflow at 400% where applicable; no required two-dimensional scrolling except intrinsically 2D content |  |  |  |
| Text scaling | Increase platform/browser text size and confirm controls/content remain usable |  |  |  |
| Reduced motion | Enable reduced motion at OS level and verify transitions/scroll behavior respect the preference |  |  |  |
| Orientation | Test portrait and landscape on representative physical mobile devices |  |  |  |
| Virtual keyboard | With mobile keyboard open, verify focused fields, action buttons and scroll position remain usable |  |  |  |
| Touch target ergonomics | Verify common actions on physical devices without repeated mistaps |  |  |  |
| Safe areas | Check notches/home indicators and edge spacing on representative iOS/Android devices |  |  |  |
| Contrast independent review | Independently inspect representative text, controls, focus indication and states beyond token-level automated tests |  |  |  |
| Print/PDF flow | Verify the profile print/save-PDF action does not create an inaccessible or unusable interaction in the browser UI |  |  |  |

## Finding record

For each failure, record at minimum:

| Field | Required content |
| --- | --- |
| ID | `A11Y-###` |
| Severity | Critical / High / Medium / Low |
| Surface | Page, route and component |
| Environment | OS, browser, assistive technology/device |
| Steps | Minimal reproducible sequence |
| Expected | Accessible behavior expected |
| Actual | Observed behavior |
| WCAG mapping | Criterion if confidently identified; otherwise leave unassigned for qualified review |
| Evidence | Screenshot/video/transcript using synthetic data only |
| GitHub issue | Link to remediation issue |
| Retest | SHA/environment and PASS/FAIL after fix |

## Exit criteria for issue #3 accessibility block

The accessibility block may be marked complete only when:

- every applicable checklist item above has an explicit `PASS`, `FAIL` or justified `N/A` result;
- no `BLOCKED` item remains for a modality/device considered part of the release claim;
- Critical and High findings are remediated and retested;
- remaining Medium/Low findings, if any, are explicitly documented with a release decision;
- the audit metadata identifies the production SHA and environments actually tested;
- evidence uses synthetic/non-sensitive data;
- wording continues to avoid claiming certification unless a qualified audit supports that claim.

Until those conditions are met, the correct statement remains: **designed and automatically tested with WCAG 2.2 AA as the target; manual conformance audit pending**.
