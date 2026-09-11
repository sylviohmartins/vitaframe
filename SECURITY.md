# Security V1

## Controles presentes

- Content Security Policy sem scripts/estilos/fontes externos;
- `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`;
- zero dependências runtime;
- sem secrets;
- saída dinâmica escapada antes de HTML;
- dados não enviados a endpoints externos;
- Actions com `permissions` mínimos;
- CodeQL no workflow de segurança;
- verificações de qualidade bloqueiam introdução de scripts remotos no shell.

## Ameaças conhecidas

- XSS introduzido por regressão futura poderia acessar `localStorage`;
- dispositivo compartilhado compromete confidencialidade local;
- export JSON fica sob responsabilidade do usuário após download.

## Produção futura

Migrar dados sensíveis para arquitetura com autenticação forte, criptografia em trânsito/repouso, controle de acesso, trilha de auditoria e threat modeling formal.
