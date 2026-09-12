# VitaFrame — Design System V1

## Direção

Calma, precisão, privacidade e sofisticação discreta. Inspiração em princípios observáveis de Apple, Linear, Stripe, Notion e Raycast: hierarquia forte, whitespace, ritmo, tipografia consistente, foco e microinterações funcionais. Não copiar marca, trade dress ou componentes proprietários.

## Anti-referências

Evitar:
- gradiente roxo/azul sem função;
- dashboard lotado de cards;
- cards dentro de cards;
- glassmorphism ornamental;
- ícones decorativos repetidos;
- headings gigantes sem hierarquia;
- pills em excesso;
- texto cinza de baixo contraste;
- gamificação infantil;
- animação elástica/gratuita;
- linguagem moralizante sobre comida/corpo;
- números grandes sem contexto;
- aparência hospitalar ou academia hardcore;
- template genérico de IA.

## Tokens

### Cor — light
- background: `#f5f5f7`;
- surface: `#ffffff`;
- text: `#111114`;
- secondary text: `#5d626b`;
- accent: `#176b55`;
- success: `#1d6a47`;
- warning: `#8a5a00`;
- danger: `#a23030`;
- info: `#315f89`.

Dark mode possui tokens semanticamente equivalentes, não simples inversão.

### Tipografia
Stack de sistema: `-apple-system`, BlinkMacSystemFont, SF Pro Text quando disponível, Segoe UI e fallback sans-serif. Isso evita fonte remota e mantém bom rendering nativo.

### Espaçamento
Escala implícita baseada principalmente em 4/8px e valores de composição 12, 16, 18, 20, 24, 28, 32, 40, 48, 60+. Não usar espaçamentos aleatórios para “consertar” uma tela isolada.

### Radius
- pequeno: 12px;
- médio: 20px;
- grande: 28px;
- pill somente para controles/estados que realmente pedem formato compacto.

### Elevação
Sombras leves apenas para superfícies que precisam separar planos. Bordas são preferidas na maior parte do produto.

## Superfícies V1

### Home / avaliação
Hierarquia editorial + painel de progresso. Rail lateral em desktop e progresso compacto em mobile.

### Preferências
Linhas de alimentos e escala consistente. Busca reduz carga cognitiva. Reconhecimento substitui perguntas abertas sempre que possível.

### Entrevista adaptativa
Uma pergunta por vez, copy curta, razão explícita, possibilidade de pular e link para a etapa completa.

### Dia alimentar
Timeline vertical que representa sequência temporal; controles de reordenação são explícitos, não dependem de drag-and-drop oculto.

### Centro de dados
Layout editorial em duas colunas no desktop e uma no mobile. Seções: lacunas, import, histórico, handoff, arquivo seguro, métricas.

### Perfil
Resumo portátil, estimativas rotuladas, ações de exportação e informação operacional. Gráficos somente quando agregarem compreensão.

## UX writing

Preferir:
- “Qual é seu peso atual?”
- “De onde veio esta estimativa?”
- “Não sei informar as quantidades com confiança.”

Evitar:
- “anamnese antropométrica” como título principal;
- “comida lixo”, “cheat meal”, “fracasso”;
- julgamento sobre frequência de delivery/álcool;
- falsa precisão.

## Motion

Transições sutis e funcionais. `prefers-reduced-motion` é respeitado. A aplicação não depende de animação para transmitir estado.

## Acessibilidade

- WCAG 2.2 AA como alvo;
- contraste semântico;
- foco visível;
- labels;
- landmarks;
- touch targets confortáveis;
- nenhuma informação depende somente de cor;
- reflow mobile;
- reduced motion.

Ver `ACCESSIBILITY.md` para escopo de teste e limitações de certificação.

## Impeccable

O CI usa `impeccable@4.0.1 detect` em cada superfície da V1 e armazena os relatórios. O detector é um quality gate adicional, não substituto de design review. Mudança visual material deve ser confrontada com:
- hierarquia;
- alinhamento;
- spacing;
- tipografia;
- responsividade;
- acessibilidade;
- regressão visual;
- anti-patterns acima.

## Critério de polimento

Uma tela não está pronta apenas porque “parece bonita”. Deve:
1. deixar a próxima ação evidente;
2. não apresentar overflow;
3. manter ritmo e alinhamentos consistentes;
4. preservar legibilidade em light/dark;
5. funcionar com teclado;
6. suportar conteúdo vazio e longo;
7. não introduzir elemento visual sem função;
8. passar os gates automatizados aplicáveis;
9. permanecer compreensível sem animação.