# VitaFrame — Testing V1

## Local

```bash
npm ci
npm run ci
npm run e2e
```

`npm run e2e` requer Chrome/Chromium. Em ambientes que bloqueiam navegação loopback do navegador, o teste local é inconclusivo e deve ser validado no runner do GitHub.

## Pirâmide de validação

### Unitários

Cobrem funções puras e regras de negócio:
- parsing numérico;
- IMC e Mifflin-St Jeor;
- composição derivada;
- completude e red flags;
- parser de relatório de bioimpedância;
- aplicação confirmada de campos importados;
- snapshots e métricas locais;
- validação de importação;
- branching adaptativo, omissão de perguntas e pulo explícito;
- normalização/limites das respostas;
- edge cases de perfis incompletos e valores fora de faixa;
- contraste WCAG dos tokens light/dark;
- budgets estáticos de JS, imagens e ausência de fontes/CDNs remotos.

### Integração local

Como a V1 não possui API/banco externo, a integração relevante acontece dentro do navegador entre estado, UI e Web APIs. Os E2E exercitam:
- armazenamento local consentido;
- roteamento;
- avaliação completa e campos adicionais auditados;
- importação assistida + conflitos de medição;
- histórico;
- timeline de refeições com busca/quantidade/frequência;
- entrevista adaptativa;
- perfil e explicabilidade;
- tema;
- portabilidade/revisão local quando aplicável.

Não existe “teste de banco” artificial para uma dependência inexistente.

### E2E principal

`scripts/e2e.mjs` cobre o caminho base: home, consentimento, avaliação, avanço, perfil, dark mode, acessibilidade básica, overflow e screenshots.

### E2E estendido

`scripts/e2e-extended.mjs` cobre:
- budgets de tamanho/request;
- LCP/CLS laboratoriais quando disponíveis;
- árvore de acessibilidade do Chrome;
- importação assistida e confirmação;
- histórico/snapshot;
- branching adaptativo;
- timeline alimentar/persistência;
- screenshots de superfícies críticas;
- assinatura geométrica para regressão visual.

Quando `tests/visual-baseline.json` existe, alterações geométricas acima da tolerância fazem o CI falhar e exigem revisão explícita da baseline.

### Matriz de dispositivos

`scripts/e2e-viewports.mjs` cobre sete tamanhos pedidos pela especificação:
- 375×667 — iPhone compacto;
- 390×844 — iPhone Pro;
- 430×932 — iPhone Pro Max;
- 360×740 — Android pequeno;
- 412×915 — Android grande;
- 768×1024 — tablet;
- 1440×1000 — desktop.

Valida home, preferências, treinamento, comportamento/recuperação, perfil, entrevista adaptativa, dia alimentar e centro de dados, rejeitando overflow e superfície principal invisível.

## Edge cases e estados

Automação contempla, quando objetivamente testável:
- pessoa sem musculação e com musculação;
- campos corporais desconhecidos;
- percentual de gordura sem origem/data;
- valores importados conflitantes;
- importação incompatível e OCR indisponível;
- valores numéricos fora de faixa;
- red flags;
- ausência de consentimento;
- refeições sem quantidade conhecida;
- dados incompletos e perguntas puladas;
- estados vazios/povoados do histórico e refeições;
- conteúdo livre de alimentação/rotina;
- viewports small/large/tablet/desktop;
- dark mode.

Teclado virtual real, tecnologias assistivas e ergonomia física permanecem validação manual; não são simulados como evidência equivalente.

## Acessibilidade

Alvo: WCAG 2.2 AA. Automação cobre contraste de tokens, AX tree, labels/nomes, foco/reduced-motion por invariantes, overflow/reflow e matriz de viewports. `ACCESSIBILITY.md` mantém a auditoria manual necessária para teclado completo, VoiceOver/NVDA, zoom, dispositivos físicos e teclado virtual.

## Visual regression

O E2E salva screenshots e uma assinatura geométrica. A baseline versionada representa uma execução visual aprovada. Mudanças intencionais de UX/UI precisam produzir nova evidência visual e atualizar a baseline conscientemente; “aceitar snapshot” não é correção automática.

## Performance

Budgets ficam em `PERFORMANCE.md`. Tamanho, requests, JS realmente carregado, imagens/fontes, LCP/CLS e overflow entram no CI. INP é tratado como métrica de campo e não é falsamente certificado por um teste sintético.

## Impeccable

O CI executa `impeccable@4.0.1 detect` nas superfícies V1 e guarda relatórios como artefato. O detector complementa — não substitui — revisão visual, acessibilidade e regressão.

## Segurança

- checks rejeitam scripts/estilos remotos indevidos e transmissão de dados por `fetch`/XHR/beacon nos módulos sensíveis;
- CodeQL executa em PR, `main` e agendamento;
- Actions são pinadas por SHA;
- CSP é validada;
- exportação protegida usa Web Crypto;
- importação conflitante não sobrescreve valores automaticamente.

## Critério

Teste verde significa **“o requisito implementado passou sua verificação”**, não “o produto comercial foi validado”. A cobertura da especificação é auditada em `REQUIREMENTS.md` e, de forma independente, em `docs/PROMPT_AUDIT.md`.