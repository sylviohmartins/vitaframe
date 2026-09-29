# VitaFrame DESIGN.md — editorial product language

## Intent

This document is the visual source of truth for the VitaFrame redesign. It adapts observable principles from Apple's public web design language to VitaFrame without copying Apple assets, proprietary layouts, trade dress or product-specific content.

The product identity remains VitaFrame: privacy-first, health-context focused, green-accented, calm and non-clinical.

## Reference principles

Source inspiration: Apple DESIGN.md analysis from VoltAgent/awesome-design-md plus Apple's public Human Interface Guidelines.

Translate the reference into these principles:

1. Content before chrome.
2. System typography before remote font dependencies.
3. One brand accent for primary actions and interactive emphasis.
4. Generous whitespace and clear reading hierarchy.
5. Flat surfaces; avoid decorative card shadows.
6. Surface changes and spacing create hierarchy before borders.
7. Pill geometry is reserved for actions and compact controls.
8. Motion communicates press/state changes and stays subtle.
9. Dark surfaces are used as editorial rhythm, not decoration.
10. Accessibility and familiar behavior take priority over imitation.

## VitaFrame identity

### Brand accent

Light:
- accent: #176b55
- accent hover: #0f5b47
- accent soft: #e8f3ef

Dark:
- accent: #69bea4
- accent hover: #82ccb4
- accent soft: #173b31

Do not replace the VitaFrame green with Apple's blue. The reference contributes composition rules, not brand ownership.

### Neutral palette

Light:
- canvas: #ffffff
- parchment: #f5f5f7
- ink: #1d1d1f
- secondary ink: #424245
- muted ink: #6e6e73
- hairline: #d2d2d7

Dark:
- canvas: #000000
- raised surface: #1d1d1f
- secondary surface: #272729
- primary text: #f5f5f7
- secondary text: #d2d2d7
- muted text: #a1a1a6

## Typography

Use the system stack:

`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Do not bundle SF Pro.

Rules:
- display headings: weight 600, tight tracking;
- body: regular weight and comfortable line height;
- avoid oversized decorative headings that compete with tasks;
- hierarchy comes from scale, whitespace and weight before color.

## Surfaces

### Global navigation

Use a near-black translucent bar with restrained controls. It should feel like infrastructure, not a hero element.

### Home hero

The message is primary. The progress summary is a supporting utility surface on parchment, without drop shadow.

### Editorial section

A near-black full-width band may be used to create section rhythm and focus, with VitaFrame mint/green as the only accent.

### Assessment

The step rail may use parchment to separate navigation from the work surface. Selected state uses VitaFrame green. Forms remain familiar and quiet.

### Data center

Use editorial two-column rhythm. Utility containers use parchment or near-flat surfaces, not floating shadows.

### Adaptive interview

A single question is the focal point. The question surface is flat and spacious.

### Meal timeline

Timeline structure remains explicit. Individual meal containers use flat neutral surfaces and retain obvious reordering/removal controls.

## Components

### Primary button

- full pill;
- VitaFrame green;
- white label;
- no shadow;
- press state may use scale(.96);
- visible keyboard focus is mandatory.

### Secondary button

- white/neutral surface;
- hairline border;
- secondary emphasis;
- hero-specific secondary action may appear as an accent text action on larger screens.

### Inputs

Use parchment/secondary surfaces with minimal neutral border by default. Hover/focus may reveal stronger boundary and focus ring.

### Cards

Cards are not the default grouping mechanism. Prefer spacing, sections, dividers or surface changes. When a container is necessary, use 18px radius and no decorative drop shadow.

## Responsive rules

- preserve current critical breakpoints and touch targets;
- no horizontal overflow in the existing viewport matrix;
- controls collapse before text becomes cramped;
- mobile primary actions remain full-width where the current flow expects them;
- reduced-motion preference must continue to disable nonessential motion.

## Accessibility

Target WCAG 2.2 AA.

Mandatory:
- visible focus;
- semantic labels;
- minimum comfortable touch targets;
- no information conveyed only by color;
- readable light and dark modes;
- content remains usable with reduced motion;
- existing keyboard and accessibility-tree behavior must not regress.

## Non-goals

Do not:
- copy Apple logos, images, icons, navigation labels or product layouts;
- introduce Apple blue as VitaFrame brand color;
- bundle proprietary Apple fonts;
- turn health-context screens into marketing product tiles;
- sacrifice data clarity for cinematic presentation;
- remove safety, privacy or professional-review language.

## Implementation mapping

The runtime design layer is `assets/editorial.css`, loaded after the existing surface styles. This keeps the redesign isolated, reviewable and reversible while preserving functional CSS contracts used by the existing JavaScript and tests.

The PWA service worker must precache this file.

## Acceptance gates

The redesign is ready only when:
- `npm run ci` passes;
- `npm run e2e` passes;
- viewport matrix passes;
- accessibility checks pass;
- CodeQL passes;
- Impeccable reports generate for every V1 surface;
- GitHub Pages production deploy remains healthy after merge;
- no functional flow, local-storage contract or privacy boundary regresses.
