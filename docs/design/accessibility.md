# VitaFrame — Accessibility V1

## Alvo

WCAG 2.2 AA como alvo de projeto.

## Cobertura automatizada

O CI verifica invariantes que podem ser automatizadas de forma confiável:

- `lang=pt-BR`, landmark principal e skip link;
- foco visível e `prefers-reduced-motion`;
- labels/nomes acessíveis em elementos interativos visíveis;
- árvore de acessibilidade do Chrome nas superfícies críticas;
- teste de contraste WCAG por tokens nos temas light/dark (`tests/quality/accessibility-contrast.test.mjs`);
- ausência de overflow horizontal em uma matriz explícita de viewports;
- presença/visibilidade das superfícies principais;
- estados de ausência de consentimento, dados desconhecidos e fluxos incompletos nos testes aplicáveis.

### Matriz responsiva automatizada

`tests/e2e/viewports.mjs` executa as superfícies críticas em tamanhos próximos aos explicitamente pedidos no Prompt Mestre:

- iPhone compacto: 375×667;
- iPhone Pro: 390×844;
- iPhone Pro Max: 430×932;
- Android pequeno: 360×740;
- Android grande: 412×915;
- tablet: 768×1024;
- desktop: 1440×1000.

O teste cobre home, preferências, treinamento, comportamento/recuperação, perfil, entrevista adaptativa, dia alimentar e centro de dados.

## Checklist manual antes de release comercial

Automação não comprova WCAG integral. Permanecem dependências humanas explícitas:

- navegar todas as telas somente com teclado e revisar ordem/retorno de foco;
- executar VoiceOver no Safari/iOS e NVDA ou Narrator no Windows;
- validar zoom de 200% e reflow com conteúdo real;
- validar contraste e legibilidade também com ferramenta/inspeção independente;
- validar mensagens de erro e instruções sem depender apenas de cor;
- validar áreas de toque em dispositivos físicos;
- validar `prefers-reduced-motion` em dispositivo real;
- validar orientação, safe areas e comportamento com teclado virtual aberto em mobile.

A matriz de viewports automatizada **não simula fielmente teclado virtual, leitor de tela ou ergonomia física do aparelho**; esses pontos continuam no protocolo manual e não são marcados como concluídos artificialmente.

## Regra de produto

Nenhuma saída de saúde pode depender somente de cor, ícone ou posição. Estimativas, alertas e red flags devem possuir texto explícito.

## Limite de evidência

A V1 pode afirmar que foi **projetada e automatizadamente testada com alvo WCAG 2.2 AA**. Não deve afirmar certificação ou conformidade integral até uma auditoria manual completa por pessoa qualificada, registrada com evidências.
