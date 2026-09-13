# VitaFrame — Segunda auditoria independente do Prompt Mestre

Data: 2026-09-12.

## Objetivo

Esta auditoria foi executada sem usar a matriz de requisitos como fonte de verdade. O Prompt Mestre original foi tratado novamente como especificação e confrontado com código, documentação, testes e workflows.

## Resultado

A auditoria encontrou gaps materiais que a primeira matriz havia superestimado. Eles foram corrigidos antes da atualização final de status.

### Coberturas incompletas encontradas e corrigidas

- Pesquisa/concorrência: a pesquisa foi ampliada e hoje está em `docs/research/market.md`.
- Regulatório: referências de CRN, CREF e Ministério da Saúde foram consolidadas em `docs/governance/regulatory.md`.
- Preferências: `src/catalog.mjs` inclui restaurantes e contextos sociais.
- Alimentação atual: `meals.html` e `src/meals.mjs` suportam busca/reconhecimento, quantidade e frequência.
- Onboarding: existe estimativa de 8–12 minutos e retomada opcional.
- Treinamento: a coleta inclui exercícios realizados.
- Comportamento alimentar: saciedade, doces, beliscos, exageros, restrição e histórico de dietas foram contemplados com linguagem não diagnóstica.
- Perfil final: expõe Alimentação, Saúde, Adesão, Dados ausentes e Grau de confiança.
- Contradições: `src/import-conflict-guard.mjs` exige escolha consciente quando fontes divergem.
- Evidência: `docs/research/evidence-map.md` mapeia regra, fundamento e limite.
- Mobile-first: `tests/e2e/viewports.mjs` cobre sete classes de viewport.
- Dashboard: resume mudança de peso quando existem snapshots comparáveis.
- Performance: `tests/quality/performance-static.test.mjs` e `docs/engineering/performance.md` mantêm budgets e checks.
- Explicabilidade: IMC/TMB apresentam origem, método, data, confiança e editabilidade.
- Acessibilidade automatizada: `tests/quality/accessibility-contrast.test.mjs` valida contraste dos tokens light/dark.

## Limites deliberados

- IA externa/LLM: a V1 usa regras locais, transparentes e testáveis.
- OCR universal: `TextDetector` é progressive enhancement, com fallback local.
- Portal profissional multiusuário: o handoff existe localmente; autenticação e multi-tenant exigem backend e governança cloud.
- Preview público: PR gera artefato validável; URL pública depende de infraestrutura externa.
- INP: permanece métrica de campo.
- WCAG integral: automação não substitui auditoria manual com tecnologias assistivas.

## Dependências externas ainda abertas

1. pesquisa/usabilidade com pessoas reais;
2. auditoria manual completa de acessibilidade;
3. Ruleset/branch protection da `main`;
4. GitHub Pages/produção pública.

Esses itens permanecem no issue #3.

## Estado técnico atual

A reorganização do repositório foi concluída no PR #6 e mergeada na `main` pelo commit `db05c20bf77674e60f044e4cfd69b92b8883095b`.

Depois do merge, voltaram a passar na `main`: quality, testes unitários/quality, structure gate, internal-link gate, build/audit, E2E principal/estendido/viewports, Impeccable, CodeQL/security e `quality-gate`.

## Interpretação final

O Prompt Mestre foi integralmente auditado e todo requisito tecnicamente executável na arquitetura V1 foi implementado ou recebeu um limite/N/A justificável; dependências humanas e administrativas continuam explicitamente abertas.
