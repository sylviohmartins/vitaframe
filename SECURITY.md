# Política de Segurança — VitaFrame

## Reportar uma vulnerabilidade

Não publique vulnerabilidades exploráveis, segredos, dados pessoais ou dados de saúde em uma issue pública.

Quando o **Private Vulnerability Reporting / Security Advisory** do GitHub estiver disponível para este repositório, utilize esse canal. Se ele não estiver disponível, abra apenas uma issue mínima solicitando um canal privado de contato, sem incluir detalhes técnicos sensíveis.

Inclua no relato privado, quando possível:

- componente afetado;
- impacto esperado;
- passos mínimos para reprodução usando dados sintéticos;
- versão/commit observado;
- sugestão de mitigação, se houver.

## Escopo

A V1 é uma aplicação web local-first sem backend próprio. Ainda assim, relatos sobre XSS, CSP, PWA/service worker, exportação criptografada, supply chain, GitHub Actions e exposição indevida de dados são relevantes.

O threat model, controles implementados, limitações e requisitos de uma futura arquitetura cloud ficam em **[docs/governance/security.md](docs/governance/security.md)**.

## Dados sensíveis

Nunca anexe informações pessoais ou médicas reais a issues, Pull Requests, logs ou artifacts usados para reproduzir um problema. Use fixtures sintéticas.
