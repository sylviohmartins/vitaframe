# VitaFrame — Validation Results V1

## Status

**No real participant sessions are recorded yet.** This file is the canonical evidence register for the human-validation block tracked in issue #3. It must not be populated with simulated, inferred or agent-generated participant results.

The study design is defined in [`validation-plan.md`](validation-plan.md).

## Privacy and evidence rules

- Use anonymous participant IDs such as `U01`, `N01` and `PE01`.
- Do not commit names, contact details, health histories, screenshots containing real health data, recordings or raw sensitive notes.
- Use synthetic data for screenshots/reproduction artifacts committed to the repository.
- Store any consent records or raw research material outside the public repository using an appropriately controlled location.
- Report findings in aggregate whenever possible.

## Session register

Add one row only after a real session has occurred.

| Participant | Role | Date | Device/browser | Core tasks completed | Duration | SUS / usability | Professional usefulness | Notes/evidence |
| --- | --- | --- | --- | --- | ---: | --- | --- | --- |
| — | — | — | — | — | — | — | — | No sessions recorded |

Suggested anonymous prefixes:

- `U##` — end user;
- `N##` — nutrition professional;
- `PE##` — Physical Education professional.

## Core task protocol

For end-user sessions, observe without coaching through the following tasks when applicable:

1. start the assessment without prior product context;
2. provide body context and a goal;
3. classify food preferences using search/categories;
4. map a representative meal day;
5. interrupt and resume after local persistence is enabled;
6. import a synthetic bioimpedance/health report or use the documented fallback;
7. identify and understand a data inconsistency or missing-context prompt;
8. review the final profile and distinguish informed data from estimates;
9. export/share the profile through the available V1 mechanisms.

For professional sessions, ask the participant to review a **synthetic completed profile** and evaluate:

- whether the profile reduces repetitive intake questions;
- what essential context is missing;
- what information is noise or ambiguous;
- whether provenance/estimate labels are understandable;
- whether the handoff is useful within the V1 scope;
- whether any wording could be confused with autonomous prescription.

Do not ask professionals to validate an autonomous prescription feature because the V1 does not provide one.

## Observation sheet

Create a copy of this table per session outside the public repository when notes could contain personal data; commit only sanitized findings.

| Task | Outcome | Time | Errors | Hesitation / question | Assistance needed | Severity of friction |
| --- | --- | ---: | --- | --- | --- | --- |
| Start assessment |  |  |  |  |  |  |
| Body + goal |  |  |  |  |  |  |
| Preferences |  |  |  |  |  |  |
| Meal day |  |  |  |  |  |  |
| Resume |  |  |  |  |  |  |
| Import |  |  |  |  |  |  |
| Inconsistency/missing data |  |  |  |  |  |  |
| Final profile |  |  |  |  |  |  |
| Export/handoff |  |  |  |  |  |  |

Outcome vocabulary: `completed`, `completed-with-help`, `abandoned`, `not-applicable`.

## Aggregate metrics

Populate only from real observations.

| Metric | Result | Sample / denominator | Notes |
| --- | ---: | --- | --- |
| Completion rate | Pending | — |  |
| Median time-to-complete | Pending | — |  |
| Drop-off by step | Pending | — |  |
| Missing-data rate | Pending | — |  |
| Correction rate after review | Pending | — |  |
| SUS or equivalent usability score | Pending | — |  |
| Professional usefulness score (1–5) — nutrition | Pending | — |  |
| Professional usefulness score (1–5) — Physical Education | Pending | — |  |
| Intention to return/update | Pending | — |  |

## Finding register

Each recurring or material problem should become a GitHub issue when it requires product change.

| ID | Evidence count | Audience | Severity | Finding | Proposed action | GitHub issue | Retest status |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| — | — | — | — | No validated findings yet | — | — | — |

Severity guidance:

- **Critical** — prevents completion of a core task or creates a serious misunderstanding of product scope/safety;
- **High** — causes frequent failure or materially wrong interpretation without a reasonable workaround;
- **Medium** — meaningful friction or ambiguity with a workable path forward;
- **Low** — polish/usability issue with limited impact.

## Study synthesis

After each research cycle, summarize only evidence actually observed:

### What worked

Pending real sessions.

### Where participants struggled

Pending real sessions.

### Professional feedback

Pending real sessions.

### Decisions resulting from evidence

Pending real sessions.

## Exit criteria for issue #3 human-validation block

The human-validation block can be marked complete only when:

- real end-user sessions have been conducted and recorded with anonymized evidence;
- at least one nutrition professional and at least one Physical Education professional have reviewed the product/profile, or an explicit documented decision changes that scope;
- the core scenarios above have evidence or a justified `not applicable` decision;
- completion/time/drop-off and qualitative friction have been synthesized;
- professional usefulness has been captured;
- material findings have corresponding remediation issues or explicit acceptance decisions;
- no simulated participant result is represented as real evidence.

The recommended first-cycle sample remains the one in [`validation-plan.md`](validation-plan.md): 5–8 end users, 3–5 nutrition professionals and 3–5 Physical Education professionals. The issue may track a smaller staged start, but sample limitations must remain explicit in the conclusions.
