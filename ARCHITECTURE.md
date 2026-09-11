# Architecture V1

## Escolha

Aplicação web estática, sem framework e sem dependências runtime. HTML + CSS + módulos ES nativos.

## Razões

- repositório greenfield;
- V1 precisa validar hipótese rapidamente;
- zero backend reduz custo e superfície de ataque;
- sem bundle reduz supply-chain risk e melhora performance;
- módulos puros permitem testes unitários no Node;
- GitHub Pages ou qualquer host estático pode servir o projeto.

## Componentes

- `index.html`: shell e política CSP;
- `assets/styles.css`: design system e responsividade;
- `src/app.mjs`: roteamento, renderização e interações;
- `src/catalog.mjs`: catálogo alimentar e referências;
- `src/logic.mjs`: cálculos/flags/insights puros;
- `src/storage.mjs`: persistência local e exportação;
- `sw.js`: cache apenas de assets estáticos.

## Dados

V1 usa `localStorage` somente após consentimento. Nenhum dado é enviado à rede. Isso é deliberadamente um protótipo local-first, não prontuário clínico. Para produção multiusuário, migrar para armazenamento autenticado, criptografia adequada, segregação, auditoria, políticas de retenção e governança LGPD.
