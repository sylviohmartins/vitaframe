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
- IMC;
- Mifflin-St Jeor;
- composição derivada;
- completude;
- red flags;
- parser de relatório de bioimpedância;
- aplicação confirmada de campos importados;
- snapshots;
- métricas locais;
- validação de importação;
- branching adaptativo;
- omissão de perguntas de álcool/treino não aplicáveis;
- pulo explícito;
- normalização e limites de respostas adaptativas.

### Integração local

O E2E testa integração entre:
- armazenamento local consentido;
- roteamento;
- avaliação;
- importação assistida;
- histórico;
- timeline de refeições;
- entrevista adaptativa;
- perfil;
- tema;
- export/portabilidade quando aplicável.

Como a V1 não possui API/banco externo, esses fluxos constituem a camada de integração relevante. Não existe “integration test de banco” artificial para uma dependência que não existe.

### E2E principal

`scripts/e2e.mjs` cobre:
- home;
- consentimento;
- navegação da avaliação;
- avanço entre etapas;
- layout mobile sem overflow;
- nomes acessíveis básicos;
- perfil;
- dark mode;
- screenshots mobile/desktop.

### E2E estendido

`scripts/e2e-extended.mjs` cobre:
- budgets de tamanho;
- LCP/CLS laboratoriais quando disponíveis no Chrome;
- número de requests;
- árvore de acessibilidade do Chrome;
- importação de texto de balança/app;
- confirmação de dados importados;
- histórico/snapshot;
- timeline alimentar;
- persistência local;
- layout mobile e desktop;
- assinatura geométrica de componentes para regressão visual.

Quando `tests/visual-baseline.json` existe, alterações geométricas acima da tolerância fazem o CI falhar.

## Edge cases

As regras/testes contemplam explicitamente:
- pessoa sem musculação;
- pessoa com musculação;
- campos corporais desconhecidos;
- percentual de gordura sem origem/data;
- importação incompatível;
- valores numéricos fora de faixa;
- red flags;
- ausência de consentimento;
- OCR indisponível;
- refeições sem quantidade conhecida;
- dados incompletos;
- perguntas puladas;
- viewport mobile e desktop;
- dark mode.

Casos que exigem julgamento clínico não são automatizados como se fossem regra universal.

## Acessibilidade

Alvo de design: WCAG 2.2 AA. Automação cobre invariantes objetivos e árvore de acessibilidade, mas não comprova conformidade integral. `ACCESSIBILITY.md` mantém o checklist manual de teclado, leitores de tela, zoom/reflow, contraste e dispositivos reais.

## Visual regression

O E2E salva screenshots e uma assinatura de layout. A baseline é versionada após uma execução de referência aprovada. Mudanças intencionais exigem revisão e atualização explícita da baseline.

## Performance

Budgets ficam em `PERFORMANCE.md`. Tamanho, requests, LCP/CLS laboratoriais e overflow entram no E2E estendido. INP é tratado como métrica de campo e não é falsamente “certificado” por um teste sintético.

## Impeccable

O CI executa `impeccable@4.0.1 detect` em todas as superfícies V1. O relatório é artefato do workflow. A revisão de design também segue `DESIGN.md`; automação de detector não substitui inspeção visual.

## Segurança

- quality checks rejeitam runtime remoto e transmissão de dados por `fetch`/XHR/beacon nos módulos de saúde;
- CodeQL executa em PR, `main` e agendamento;
- Actions são fixadas por SHA;
- CSP é validada;
- criptografia local possui testes de fluxo no navegador quando adicionada ao E2E aplicável.

## Critério

Teste verde significa “requisito implementado passou sua verificação”, não “todo o prompt foi implementado”. A cobertura de requisitos é auditada separadamente em `REQUIREMENTS.md`.