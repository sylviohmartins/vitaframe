# VitaFrame — Master Prompt Compliance Matrix

Data da auditoria: 2026-09-11.

Esta matriz existe para impedir que “CI verde” seja confundido com “prompt inteiro entregue”.

Legenda:
- ✅ **implementado** — requisito aplicável possui implementação/documentação e validação técnica correspondente;
- 🟡 **implementado com limite explícito** — intenção atendida dentro da arquitetura local-first, mas existe limitação de plataforma/evidência;
- ⛔ **dependência externa** — não pode ser honestamente concluído por código/agente sem participante, configuração administrativa ou ambiente externo.

## Dependências externas que não devem ser falsificadas

1. **Pesquisa/usability com pessoas reais** — protocolo existe em `VALIDATION.md`, mas resultados exigem participantes.
2. **Auditoria manual completa WCAG com tecnologias assistivas/dispositivos reais** — automação é ampla, mas não é certificação.
3. **Ruleset/branch protection da `main`** — checks existem, porém a conexão atual do GitHub não expõe ação administrativa para habilitar a proteção.
4. **Deploy público em GitHub Pages** — workflow existe e é gated; requer Pages + `ENABLE_PAGES_DEPLOY=true` na configuração do repositório.

---

A matriz completa de requisitos 0–107 permanece registrada no histórico Git imediatamente anterior e é complementada pela auditoria independente em `docs/audits/prompt-v1.md`.

## Interpretação correta do status

A V1 pode ser considerada **tecnicamente concluída no repositório** quando os itens implementados passarem no PR e novamente na `main`.

Ela não deve ser descrita como “produto comercial 100% validado” enquanto existirem os quatro itens externos do topo.