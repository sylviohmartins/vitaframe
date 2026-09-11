# VitaFrame Design System V1

## Direção

Calma, precisão, privacidade e sofisticação discreta. Inspiração em princípios de Apple, Linear e Stripe: hierarquia forte, bastante whitespace, tipografia de sistema, poucos efeitos e elementos com propósito.

## Anti-referências

- “AI slop” com gradiente roxo/azul;
- dashboards lotados de cards;
- glassmorphism ornamental;
- ícones decorativos repetidos;
- gamificação infantil;
- linguagem moralizante sobre comida/corpo;
- números gigantes sem contexto.

## Tokens

- background: `#f5f5f7`;
- surface: branco/translúcido;
- text: `#111114`;
- accent: verde profundo `#176b55`;
- warning/error/info com fundos discretos;
- radius: 12 / 20 / 28 px;
- touch targets: preferencialmente 44px+, acima do mínimo WCAG 2.2 de 24x24 quando aplicável.

## Tipografia

System stack para reduzir dependência, latência e tracking. Hierarquia usa peso e escala, não fontes externas.

## Motion

Somente feedback e transição leve. `prefers-reduced-motion` desabilita movimento não essencial.

## Acessibilidade

Alvo: WCAG 2.2 AA. Focus visível, skip link, landmarks, labels, mensagens textuais além de cor, navegação por teclado e layout responsivo.
