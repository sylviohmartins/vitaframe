# Documentação do VitaFrame

Este diretório é a fonte de verdade da documentação interna do projeto. A organização é **por intenção de consulta**, não pela ordem histórica de criação dos arquivos.

## Produto

- [`product/product.md`](product/product.md) — proposta de valor, escopo e critérios de release.
- [`product/roadmap.md`](product/roadmap.md) — evolução possível após validação.
- [`product/requirements.md`](product/requirements.md) — matriz de conformidade do Prompt Mestre.

## Arquitetura

- [`architecture/overview.md`](architecture/overview.md) — arquitetura técnica e decisões estruturais.
- [`architecture/data-model.md`](architecture/data-model.md) — entidades, persistência, proveniência e versionamento.
- [`architecture/decisions.md`](architecture/decisions.md) — decisões arquiteturais e trade-offs.

## Design e UX

- [`design/design-system.md`](design/design-system.md) — direção visual, tokens e princípios.
- [`design/ux-architecture.md`](design/ux-architecture.md) — sitemap, jornadas, branching e wireframes conceituais.
- [`design/accessibility.md`](design/accessibility.md) — alvo WCAG e protocolo de validação.
- [`design/visual-qa.md`](design/visual-qa.md) — inspeção visual e achados.

## Engenharia

- [`engineering/testing.md`](engineering/testing.md) — estratégia de testes.
- [`engineering/performance.md`](engineering/performance.md) — budgets e Core Web Vitals.
- [`engineering/ci-cd.md`](engineering/ci-cd.md) — workflows, quality gate, deploy e troubleshooting.

## Governança

- [`governance/security.md`](governance/security.md) — threat model e controles técnicos. A política pública de reporte permanece em [`../SECURITY.md`](../SECURITY.md).
- [`governance/privacy.md`](governance/privacy.md) — privacy by design e LGPD.
- [`governance/ai-guardrails.md`](governance/ai-guardrails.md) — limites da IA.
- [`governance/regulatory.md`](governance/regulatory.md) — fronteiras profissionais e regulatórias.

## Pesquisa e evidência

- [`research/market.md`](research/market.md) — mercado, concorrentes, JTBD e decisão de oportunidade.
- [`research/validation-plan.md`](research/validation-plan.md) — protocolo de pesquisa/usabilidade externa.
- [`research/evidence-map.md`](research/evidence-map.md) — regra → evidência científica/regulatória.

## Auditorias

- [`audits/prompt-v1.md`](audits/prompt-v1.md) — segunda auditoria independente do Prompt Mestre.

## Como adicionar documentação

1. escolha o domínio em que uma pessoa naturalmente procuraria a informação;
2. prefira nomes `kebab-case.md` para documentação interna;
3. evite criar Markdown novo na raiz;
4. mantenha links relativos válidos;
5. se uma nova categoria não tiver pelo menos uma responsabilidade clara, não crie outra camada de pasta;
6. execute `npm run structure` e `npm run links` antes do PR.

`README.md` e `SECURITY.md` permanecem na raiz porque são pontos de entrada reconhecidos pelo GitHub/ecossistema, não porque documentação interna deva viver lá.
