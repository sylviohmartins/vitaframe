# VitaFrame — identidade de marca

## Conceito

A identidade do VitaFrame parte de uma ideia simples: **vida dentro de uma estrutura que ajuda a enxergar contexto**.

O símbolo combina duas camadas:

- quatro cantos abertos representam `Frame`: enquadramento, organização, contexto e modularidade;
- o `V` central representa `Vita`: vida, indivíduo e continuidade.

Os cantos não formam uma caixa fechada. A abertura comunica que o VitaFrame organiza informação sem aprisionar o usuário em um fluxo rígido e que os dados continuam pertencendo à pessoa. O `V` permanece visualmente independente para funcionar em escalas pequenas.

Nome interno do conceito: **Open Frame V**.

## Território escolhido

Foram considerados três territórios:

1. frame dobrado, com a própria moldura convergindo para um `V`;
2. monograma `VF` de fita contínua;
3. `V` central dentro de um frame aberto e modular.

A terceira direção foi escolhida porque preserva legibilidade em 16 px, funciona em monocromia, não depende de detalhes finos e evita os clichês mais comuns de health-tech — coração, folha, cruz, ECG, halter, DNA e sparkle de IA.

## Tipografia

O wordmark usa **Inter SemiBold** como referência tipográfica, com fallback para a stack nativa do sistema.

- família de referência: Inter;
- peso: 600;
- licença da família: SIL Open Font License 1.1;
- nenhum arquivo de fonte é distribuído pelo VitaFrame;
- a interface continua usando a stack de sistema definida no Design System.

No produto, `VitaFrame` permanece como texto real para preservar acessibilidade, performance e rendering nativo. Os SVGs de lockup usam a mesma linguagem tipográfica sem carregar fonte remota.

## Cores

### Light

- brand mark: `#176b55`;
- wordmark: `#111114`;
- background recomendado: `#f5f5f7` ou `#ffffff`.

### Dark

- brand mark: `#69bea4`;
- wordmark: `#f4f5f6`;
- background recomendado: `#111214`.

### App icon

- background: `#176b55`;
- símbolo: `#ffffff`.

### Favicon

- background: `#111114`;
- símbolo: `#69bea4`.

A marca também funciona em uma única cor. O arquivo `mark.svg` é monocromático para permitir uso como máscara CSS e aplicações controladas pelo contexto.

## Assets

Os arquivos canônicos ficam em `assets/brand/`:

- `mark.svg` — símbolo monocromático;
- `wordmark.svg` — wordmark vetorial;
- `logo.svg` — lockup horizontal para superfícies claras;
- `logo-dark.svg` — lockup horizontal para superfícies escuras;
- `logo-compact.svg` — lockup reduzido;
- `favicon.svg` e `favicon.ico`;
- `apple-touch-icon.png`;
- `icon-192.png` e `icon-512.png`;
- `icon-maskable-192.png` e `icon-maskable-512.png`;
- `og-image.png`;
- `brand.css` — integração mínima da marca com a topbar.

## Clear space

Para o símbolo isolado, preserve ao redor pelo menos **25% da largura do próprio símbolo** sempre que o contexto permitir.

No lockup horizontal, o espaço entre símbolo e wordmark é parte da composição e não deve ser comprimido.

## Tamanho mínimo

- favicon: 16 px, usando o asset específico;
- símbolo na UI: 24 px;
- símbolo institucional isolado: 32 px;
- lockup horizontal: recomenda-se altura mínima de 24 px.

Abaixo desses limites, prefira o favicon ou apenas o símbolo.

## Favicon e redução

O favicon usa o mesmo `Open Frame V`, mas com fundo escuro e contraste mint. Ele não é uma miniatura do lockup horizontal.

A geometria foi verificada visualmente em 16, 20, 24, 32, 48, 64 e 128 px. Em 16 px o `V` e os quatro cantos continuam separáveis.

## PWA e maskable

Os ícones `any` usam um tile verde com cantos visuais arredondados.

Os ícones `maskable` usam background opaco ocupando todo o canvas e mantêm o símbolo dentro da safe zone central. Isso evita cortes em máscaras circulares, squircles e demais formas aplicadas pelo sistema operacional.

## Uso em light e dark

Na UI o símbolo é aplicado como CSS mask e recebe `var(--accent)`, portanto acompanha os tokens do tema sem duplicar SVGs no runtime.

O texto `VitaFrame` permanece texto HTML. Isso evita nome acessível duplicado e mantém o header leve.

Os SVGs `logo.svg` e `logo-dark.svg` servem para contextos institucionais em que o lockup precisa ser um único asset.

## Uso correto

- manter proporções;
- respeitar clear space;
- preservar a grafia `VitaFrame`;
- usar as cores definidas ou monocromia;
- preferir o símbolo isolado em superfícies muito pequenas;
- usar os assets maskable apenas para contextos que aplicam máscara.

## Não fazer

- esticar ou inclinar;
- redesenhar o `V`;
- fechar os quatro cantos para criar uma caixa;
- adicionar glow, gradiente, 3D ou sombra dramática;
- recolorir com paleta multicolorida;
- colocar coração, folha, cruz médica ou elementos de academia dentro do símbolo;
- substituir o wordmark por fonte futurista ou rounded infantil.

## Similaridade e risco visual

Foi feita uma varredura pública limitada por produtos de nutrição/fitness, software premium e buscas por marcas `V` + frame/viewfinder.

O território de **letra dentro de moldura** existe em bibliotecas e templates genéricos; portanto o conceito não deve ser interpretado como exclusividade jurídica por si só. A execução do VitaFrame diferencia-se pela proporção dos quatro cantos abertos, ritmo de stroke, relação com o `V`, sistema cromático e aplicação consistente no produto.

Não foi identificada, nessa varredura limitada, uma identidade de health-tech relevante com a mesma construção e proporções. Isso **não substitui busca de anterioridade, registro de marca ou parecer jurídico**.

## Avaliação do conceito

| Critério | Nota |
| --- | ---: |
| Originalidade | 8.2 |
| Relevância | 9.4 |
| Memorabilidade | 8.7 |
| Legibilidade | 9.6 |
| Redução | 9.5 |
| Sofisticação | 9.0 |
| Longevidade | 9.2 |
| Coerência com VitaFrame | 9.7 |
| Light / dark | 9.6 |
| Favicon | 9.5 |
| PWA | 9.5 |
| Acessibilidade | 9.3 |

## Princípio

A marca deve parecer parte do sistema, não uma camada aplicada posteriormente.

**Clareza sobre decoração. Distinção sobre tendência. Significado sobre efeito. Precisão sobre complexidade.**
