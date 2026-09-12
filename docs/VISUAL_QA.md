# VitaFrame V1 — Visual QA

Última revisão: 2026-09-12.

## Superfícies revisadas

- avaliação mobile (`mobile-step2.png`);
- Centro de Dados mobile (`advanced-mobile.png`);
- entrevista adaptativa mobile (`adaptive-mobile.png`);
- dia alimentar mobile (`meals-mobile.png`);
- perfil desktop em dark mode (`desktop-profile-dark.png`).

## Achados

### 1. Toast em mobile

**Problema:** mensagens transitórias na parte inferior podem competir visualmente com a barra sticky de navegação da avaliação.

**Ajuste:** em viewports pequenas, o toast passa a respeitar uma margem inferior maior para não encobrir CTAs e safe area.

### 2. Navegação horizontal do Centro de Dados

**Problema:** a navegação possui overflow horizontal intencional, mas a existência de itens adicionais não estava suficientemente evidente em mobile.

**Ajuste:** adicionada área de respiro no fim da faixa e comportamento de scroll/snap para reforçar que a barra é rolável sem criar overflow da página.

## Resultado visual

A direção visual foi mantida: tipografia forte, superfícies contidas, pouco ruído, ausência de gradientes decorativos e uso de cor restrito a estado, foco e hierarquia.

## Limite

Esta revisão visual por screenshot não substitui teste em hardware real nem auditoria manual WCAG com tecnologia assistiva. Esses itens permanecem rastreados no issue #3.
