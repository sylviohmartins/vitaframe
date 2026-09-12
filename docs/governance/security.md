# VitaFrame — Security V1

## Threat model resumido

A V1 manipula potencialmente dados sensíveis de saúde no navegador. Os riscos prioritários são:
- execução de script não confiável no origin;
- exposição em dispositivo compartilhado;
- exportação não protegida;
- dependência comprometida no CI;
- dados reais inseridos em artifacts/logs;
- evolução futura para cloud sem controles adequados.

## Controles implementados

### Runtime
- zero dependências runtime de terceiros;
- CSP `default-src 'self'` e `connect-src 'self'`;
- nenhuma fonte/script remoto;
- nenhuma chamada de rede do assessment/advanced/meals/adaptive/local metrics;
- service worker limita interceptação/cache a GET do mesmo origin;
- dados só persistem após consentimento;
- exclusão local disponível.

### Portabilidade
- JSON legível quando o usuário prefere transparência;
- `.vfsecure` com PBKDF2-SHA256 + AES-GCM para compartilhamento de arquivo protegido;
- salt e IV aleatórios;
- senha não persistida.

### Importação
- nenhum OCR externo silencioso;
- OCR nativo feature-detected quando disponível;
- confirmação humana antes de persistir campos detectados;
- importação estruturada valida versão e estrutura mínima.

### CI / supply chain
- Actions oficiais fixadas por SHA completo;
- lockfile obrigatório;
- `npm ci --ignore-scripts`;
- CodeQL em PR/`main`/schedule;
- Dependabot para Actions;
- permissões mínimas por workflow;
- artifacts com retenção curta e somente fixtures sintéticas.

## Secure-by-default

A V1 deliberadamente não implementa:
- autenticação própria;
- banco remoto;
- APIs de saúde;
- tokens de terceiros;
- analytics remoto;
- LLM/visão externo.

Isso reduz a superfície antes de existir necessidade validada.

## Limitações

- `localStorage` não possui criptografia própria e não deve ser chamado de cofre;
- criptografia de exportação protege o arquivo, não a sessão do navegador;
- usuário em computador compartilhado precisa apagar os dados;
- CSP reduz risco, mas não substitui prevenção de XSS e revisão de código;
- um produto cloud exigirá controles adicionais.

## Requisitos mínimos para uma futura versão cloud

- autenticação robusta e MFA onde apropriado;
- autorização por recurso/tenant;
- sessões seguras;
- TLS;
- criptografia em repouso;
- KMS/gestão de chaves;
- secretos fora do código;
- logs auditáveis e minimizados;
- rate limiting;
- backups e restore testados;
- vulnerability management;
- SAST/DAST conforme arquitetura;
- gestão de dependências;
- resposta a incidentes;
- retenção e descarte;
- revisão de subprocessadores;
- RIPD/avaliação de risco quando aplicável.

## Vulnerabilidades

Não inserir dados pessoais reais em issues públicas. Relatórios devem conter passos mínimos de reprodução e fixtures sintéticas. O template do repositório orienta a não anexar evidência sensível.

## GitHub governance

Os workflows e checks existem no código. Torná-los obrigatórios na `main` requer Ruleset/branch protection administrativo. A conexão do agente não tem capacidade de mutar essa configuração; o gap é rastreado explicitamente em `REQUIREMENTS.md`.