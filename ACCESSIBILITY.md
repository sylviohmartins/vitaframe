# VitaFrame — Accessibility V1

## Alvo

WCAG 2.2 AA como alvo de projeto.

## Cobertura automatizada

O CI verifica invariantes que podem ser automatizadas de forma confiável:

- `lang=pt-BR`;
- landmark principal;
- skip link;
- foco visível;
- suporte a `prefers-reduced-motion`;
- nomes acessíveis básicos em elementos interativos visíveis;
- ausência de overflow horizontal em viewport mobile;
- árvore de acessibilidade do Chrome para telas críticas;
- navegação por teclado nos fluxos principais;
- labels em formulários e controles;
- screenshots mobile/desktop para inspeção.

## Checklist manual antes de release comercial

Automação não comprova WCAG integral. A V1 mantém esta revisão explícita:

- navegar todas as telas somente com teclado;
- validar ordem de foco e retorno de foco;
- executar VoiceOver no Safari/iOS e NVDA ou Narrator no Windows;
- validar zoom de 200% e reflow;
- validar contraste com ferramenta dedicada;
- validar mensagens de erro e instruções sem depender apenas de cor;
- validar áreas de toque em dispositivos reais;
- validar `prefers-reduced-motion` em dispositivo real;
- validar orientação e teclado virtual em mobile.

## Regra de produto

Nenhuma saída de saúde pode depender somente de cor, ícone ou posição. Estimativas, alertas e red flags devem possuir texto explícito.

## Limite de evidência

A V1 pode afirmar que foi **projetada e testada com alvo WCAG 2.2 AA**. Não deve afirmar certificação ou conformidade integral até uma auditoria manual completa por pessoa qualificada.