# VitaFrame — Performance Budgets V1

A V1 é estática e sem dependências runtime, portanto deve permanecer leve por desenho.

## Budgets de laboratório

Em runner local/CI servido por HTTP local:

- HTML inicial: <= 50 KB por página;
- JavaScript próprio carregado por página: <= 150 KB não comprimido;
- CSS próprio carregado: <= 80 KB não comprimido;
- total de requests críticos da home: <= 12;
- CLS observado após carregamento: <= 0,10;
- LCP de laboratório: <= 2.500 ms;
- ausência de overflow horizontal nos viewports E2E;
- nenhuma dependência runtime de terceiros.

## INP

INP é uma métrica de campo. A V1 não declara conformidade de INP a partir de um teste sintético isolado. O E2E mede responsividade de interações críticas e mantém o JavaScript reduzido; quando houver tráfego real, INP deverá ser coletado de forma privacy-preserving e sem anexar conteúdo de saúde ao evento.

## Estratégia

1. preferir plataforma web nativa;
2. não carregar fontes remotas;
3. não carregar frameworks apenas para conveniência;
4. imagens de screenshots permanecem locais e não entram no bundle;
5. service worker limita cache a assets estáticos;
6. regressões de tamanho e layout são verificadas no CI.

## Produção

Core Web Vitals reais dependem de rede, dispositivo e hosting. A publicação comercial deve acompanhar dados de campo agregados e anônimos, se houver base legal e arquitetura de privacidade compatível.