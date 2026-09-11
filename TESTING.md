# Testing V1

## Local

```bash
npm ci
npm run ci
```

O `npm run e2e` requer Chrome/Chromium. Em ambientes que bloqueiam navegação loopback do navegador, o E2E deve ser considerado inconclusivo localmente e validado no runner do GitHub.

## Cobertura

- sintaxe de módulos JS;
- testes unitários de parsing numérico, IMC, Mifflin-St Jeor, composição derivada, completude e red flags;
- quality checks para CSP, semântica base, reduced motion, ausência de scripts remotos e limites de segurança;
- E2E via CDP para consentimento, roteamento, avanço de etapa, layout mobile sem overflow, nomes acessíveis básicos, perfil e dark mode;
- screenshots mobile e desktop produzidos pelo E2E.

## Acessibilidade

Alvo de design: WCAG 2.2 AA. Automação cobre invariantes objetivos, mas não comprova conformidade integral. Revisão manual com teclado, leitor de tela e inspeção visual continua necessária antes de release comercial.
