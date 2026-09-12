# VitaFrame — Testing V1

## Local

```bash
npm ci
npm run ci
npm run e2e
```

`npm run e2e` requer Chrome/Chromium. Em ambientes que bloqueiam navegação loopback do navegador, o teste local é inconclusivo e deve ser validado no runner do GitHub.

## Pirâmide de validação

### Unitários e quality tests

`tests/unit/` cobre funções puras e regras de negócio. `tests/quality/` mantém verificações especializadas como contraste e budgets estáticos. A cobertura inclui parsing numérico, IMC/TMB, composição derivada, completude, red flags, importação, snapshots, branching adaptativo, edge cases, contraste WCAG e budgets estáticos.

### Integração local

Como a V1 não possui API/banco externo, a integração relevante acontece dentro do navegador entre estado, UI e Web APIs. Os E2E exercitam armazenamento local consentido, roteamento, avaliação, importação assistida, histórico, refeições, entrevista adaptativa, perfil, tema e portabilidade/revisão local quando aplicável.

Não existe “teste de banco” artificial para uma dependência inexistente.

### E2E

- `tests/e2e/smoke.mjs` — caminho base: home, consentimento, avaliação, perfil, dark mode, acessibilidade básica, overflow e screenshots;
- `tests/e2e/extended.mjs` — budgets, AX tree, importação, histórico, branching, timeline alimentar, screenshots e assinatura geométrica;
- `tests/e2e/viewports.mjs` — sete classes de viewport solicitadas pela especificação.

A baseline de regressão geométrica permanece em `tests/visual-baseline.json`. Alterações acima da tolerância fazem o CI falhar e exigem revisão explícita.

## Edge cases e estados

Automação contempla, quando objetivamente testável, ausência/presença de treino, campos desconhecidos, percentual de gordura sem origem, conflitos de importação, OCR indisponível, valores fora de faixa, red flags, ausência de consentimento, refeições sem quantidade, dados incompletos, perguntas puladas, histórico vazio/povoado, conteúdo livre e dark mode.

Teclado virtual real, tecnologias assistivas e ergonomia física permanecem validação manual; não são simulados como evidência equivalente.

## Acessibilidade

Alvo: WCAG 2.2 AA. Automação cobre contraste de tokens, AX tree, labels/nomes, foco/reduced-motion por invariantes, overflow/reflow e matriz de viewports. [`../design/accessibility.md`](../design/accessibility.md) mantém a auditoria manual necessária.

## Visual regression

O E2E salva screenshots e uma assinatura geométrica. A baseline versionada representa uma execução visual aprovada. Mudanças intencionais de UX/UI precisam produzir nova evidência visual e atualizar a baseline conscientemente.

## Performance

Budgets ficam em [`performance.md`](performance.md). INP é tratado como métrica de campo e não é falsamente certificado por teste sintético.

## Impeccable

O CI executa `impeccable@4.0.1 detect` nas superfícies V1 e guarda relatórios como artefato. O detector complementa — não substitui — revisão visual, acessibilidade e regressão.

## Segurança

CodeQL executa em PR, `main` e agendamento; Actions são fixadas por SHA; CSP é validada; exportação protegida usa Web Crypto; importação conflitante não sobrescreve valores automaticamente.

## Critério

Teste verde significa **“o requisito implementado passou sua verificação”**, não “o produto comercial foi validado”. A cobertura da especificação fica em [`../product/requirements.md`](../product/requirements.md) e a auditoria independente em [`../audits/prompt-v1.md`](../audits/prompt-v1.md).
