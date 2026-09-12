# VitaFrame — Performance Budgets V1

A V1 é estática e sem dependências runtime de terceiros, portanto deve permanecer leve por desenho.

## Budgets de laboratório

Em runner local/CI servido por HTTP local:

- HTML inicial: <= 50 KB por página;
- JavaScript próprio carregado pela página principal, incluindo a camada de conformidade do prompt: <= 150 KB não comprimido;
- CSS próprio carregado: <= 80 KB não comprimido;
- imagens estáticas empacotadas: no máximo 12, cada uma <= 150 KB;
- nenhuma fonte, stylesheet ou script de apresentação/runtime remoto;
- total de requests críticos da home: <= 12;
- CLS observado após carregamento: <= 0,10;
- LCP de laboratório: <= 2.500 ms;
- ausência de overflow horizontal nos viewports E2E;
- nenhuma dependência runtime npm/terceira.

## Testes

- `tests/performance-static.test.mjs`: budget de JavaScript realmente referenciado no `index.html`, ausência de fontes/CDNs remotos e limite dos assets de imagem;
- `scripts/e2e-extended.mjs`: sizes, requests, LCP/CLS e regressão geométrica;
- `scripts/e2e-viewports.mjs`: reflow/overflow em sete classes de viewport.

## INP

INP é uma métrica de campo. A V1 não declara conformidade de INP a partir de um teste sintético isolado. O E2E mantém interações críticas pequenas e JavaScript reduzido; quando houver tráfego real, INP deverá ser coletado de forma privacy-preserving e sem anexar conteúdo de saúde ao evento.

## Estratégia

1. preferir plataforma web nativa;
2. não carregar fontes remotas;
3. não carregar frameworks apenas para conveniência;
4. imagens enviadas pelo usuário permanecem locais e não entram no bundle;
5. service worker limita cache a assets estáticos same-origin;
6. regressões de tamanho, requests, layout e viewport são verificadas no CI;
7. novas funcionalidades devem entrar no mesmo budget, não criar exceção silenciosa.

## Produção

Core Web Vitals reais dependem de rede, dispositivo e hosting. A publicação comercial deve acompanhar dados de campo agregados e anônimos somente se houver base legal e arquitetura de privacidade compatível.