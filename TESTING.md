# Testing V1

## Local

```bash
npm run ci
python3 -m http.server 4173
python3 e2e/test_vitaframe.py
```

## Cobertura

- sintaxe de todos módulos JS;
- unit tests para números, IMC, TMB, composição, completude e red flags;
- quality checks para CSP, semântica base, reduced motion, ausência de scripts remotos e limites de segurança;
- E2E com Playwright em viewport mobile e smoke visual desktop/dark mode;
- screenshot de diagnóstico em E2E.

## Limite

Automação não prova conformidade WCAG completa nem excelência visual. Revisão manual continua necessária antes de release comercial.
