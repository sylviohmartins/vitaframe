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

| # | Requisito do prompt | Status | Evidência V1 |
|---:|---|:---:|---|
| 0 | Missão multidisciplinar e validação antes de construir | ✅ | `docs/RESEARCH.md`, `PRODUCT.md`, decisão GO COM AJUSTES |
| 1 | Pesquisar → comparar → validar → decidir antes de implementar | ✅ | research/ADRs precederam implementação; `DECISIONS.md` |
| 2 | Hipótese de plataforma integrada corpo/alimentação/rotina/treino | ✅ | quatro superfícies V1 + perfil integrado |
| 3 | Investigação atualizada de mercado BR/internacional | ✅ | `docs/RESEARCH.md` com fontes primárias e concorrentes BR/internacionais |
| 4 | Mapear concorrentes e lacunas | ✅ | matriz MyFitnessPal, Fitia, Nutrium, WebDiet, Trainerize, Hevy |
| 5 | Jobs To Be Done usuário/nutricionista/Ed. Física | ✅ | `docs/RESEARCH.md` |
| 6 | Score + GO/GO COM AJUSTES/NO-GO | ✅ | score 0–10 + GO COM AJUSTES |
| 7 | Avaliar posicionamento “IA prescritiva” vs organização estruturada | ✅ | posicionamento de intake/handoff; `PRODUCT.md` |
| 8 | Regulatório e segurança com fontes oficiais | ✅ | `docs/REGULATORY.md`: LGPD/ANPD/CFN/CONFEF/Lei da Medicina |
| 9 | Modos usuário, inteligência, nutricionista, Ed. Física e encaminhamento | 🟡 | usuário + inteligência local + `ProfessionalReview` por tipo + red flags; sem contas/portal multiusuário na V1 local-first |
| 10 | Privacy by design/LGPD | ✅ | `PRIVACY.md`, CSP, zero backend/analytics, delete/export/secure export |
| 11 | Onboarding guiado/progressive disclosure/branching/autosave | ✅ | avaliação completa + `adaptive.html` + consentimento/autosave |
| 12 | Preferências por reconhecimento + busca + outro | ✅ | `src/catalog.mjs`, step 5, busca e campo não listado |
| 13 | Anamnese corporal e distinção medição/estimativa | ✅ | step corpo, proveniência, perfil e histórico |
| 14 | Importação inteligente de screenshots/relatórios | 🟡 | OCR local via `TextDetector` quando disponível + parser/paste fallback + confirmação; sem OCR externo por privacidade |
| 15 | Ferramenta de dia alimentar com adicionar/remover/reordenar | ✅ | `meals.html`, `src/meals.mjs` |
| 16 | Rotina/trabalho/cozinha/orçamento | ✅ | step 6 |
| 17 | Treinamento, cardio, passos, limitações/red flags | ✅ | step 7 + saúde + branching |
| 18 | Fome/saciedade/alimentação emocional sem diagnosticar | ✅ | recovery/current diet + guardrails e copy neutra |
| 19 | Suplementos sem tratar como obrigatórios | ✅ | recovery supplements + limites de prescrição |
| 20 | Resultado “Seu perfil” completo e operacional | ✅ | `profileView()` |
| 21 | Relatório tela/PDF/JSON/compartilhamento | ✅ | perfil, print/PDF, JSON, `.vfsecure` |
| 22 | Entrevistador inteligente para lacunas/contradições | 🟡 | regras locais explicáveis (`adaptiveQuestions`, `adaptiveFollowUps`, `dataQualityIssues`); LLM externo deliberadamente não usado |
| 23 | IA não alucinar/preencher ausentes | ✅ | `AI_GUARDRAILS.md`, confirmação de import, “não sei/pular” |
| 24 | Regras fundamentadas em fontes científicas/regulatórias | ✅ | referências no produto + research/regulatory docs |
| 25 | Arquitetura de informação investigada/refinada | ✅ | `UX.md` sitemap/journeys |
| 26 | Mobile first | ✅ | CSS responsivo + E2E 390×844/desktop + overflow checks |
| 27 | Experiência visual confiança/precisão/sofisticação | ✅ | `DESIGN.md`, design tokens |
| 28 | Referências Apple/Linear/Stripe etc sem copiar | ✅ | `DESIGN.md` |
| 29 | Design system tokens/estados | ✅ | `assets/styles.css`, `DESIGN.md` |
| 30 | Impeccable no processo | 🟡 | `impeccable@4.0.1 detect` em todas superfícies + artefatos; comandos não disponíveis/úteis não são simulados |
| 31 | Auditoria contra AI slop | ✅ | anti-referências + Impeccable detector |
| 32 | Microinterações funcionais/reduced motion | ✅ | toasts/transições/autosave + CSS reduced motion |
| 33 | WCAG 2.2 AA como objetivo | 🟡 | AX-tree, labels, foco, reduced-motion, overflow + `ACCESSIBILITY.md`; auditoria manual real ainda externa |
| 34 | UX writing conversacional | ✅ | copy das telas e `DESIGN.md` |
| 35 | Linguagem não julgadora | ✅ | copy e guardrails |
| 36 | Arquitetura técnica moderna/sustentável | ✅ | `ARCHITECTURE.md`, web platform nativa |
| 37 | Modelo de dados governado | ✅ | `DATA_MODEL.md` |
| 38 | Versionamento/histórico sem overwrite silencioso | ✅ | snapshots em `vitaframe:v1:history` |
| 39 | Dashboard responde onde/que falta/próxima ação | ✅ | home, review, profile e centro de dados |
| 40 | Professional Review workflow | 🟡 | revisão local separada + clarifications/status; portal autenticado futuro requer backend |
| 41 | Métricas de produto | 🟡 | funil local + protocolo para métricas agregadas; usefulness/SUS/retenção exigem participantes |
| 42 | Analytics com privacidade | ✅ | `src/local-metrics.mjs`: eventos abstratos somente localmente |
| 43 | Unit/integration/E2E | ✅ | testes unitários + integração browser local + E2E |
| 44 | Visual regression + inspeção | ✅ | screenshots + layout signature; baseline versionada antes do merge final |
| 45 | Quality gates completos | ✅ | CI: format, syntax, lint, unit, quality, audit, build, E2E, Impeccable, CodeQL, gate |
| 46 | Performance budgets/Core Web Vitals | 🟡 | size/request/LCP/CLS lab budgets; INP corretamente tratado como métrica de campo |
| 47 | Estados extremos | ✅ | `tests/edge-cases.test.mjs` + E2E; conexão ruim é reduzida por PWA/local-first |
| 48 | Inteligência adaptativa reduz questionário | ✅ | branching álcool/treino/composição em `adaptive.html` |
| 49 | Explicabilidade das estimativas | ✅ | IMC/TMB com método/“estimado” |
| 50 | Origem/método/data/confiança/editabilidade | ✅ | body provenance, imported.last, confirmação e histórico |
| 51 | Determinar MVP mínimo | ✅ | research + `PRODUCT.md` |
| 52 | Avaliar roadmap futuro | ✅ | `ROADMAP.md` com hipóteses e kill criteria |
| 53 | Modelo de negócio | ✅ | B2C/B2B/B2B2C em `docs/RESEARCH.md` |
| 54 | Loop implementar/testar/inspecionar/corrigir | ✅ | histórico de CI/correções + quality gates |
| 55 | Comparação visual sistemática | ✅ | `DESIGN.md`, screenshots, layout regression |
| 56 | “Perfeito” convertido em critérios verificáveis | ✅ | performance/accessibility/testing/CI docs |
| 57 | Documentação sem burocracia | ✅ | Product/Design/Architecture/Data/Privacy/Security/AI/Testing/Decisions + complementares |
| 58 | Ordem Discovery → Release readiness | ✅ | execução iniciou por pesquisa/GO e só depois implementação |
| 59 | Entregável discovery | ✅ | `docs/RESEARCH.md` |
| 60 | Entregável UX: sitemap/journey/flows/wireframes/components/copy/mobile/desktop | ✅ | `UX.md`, `DESIGN.md` |
| 61 | Entregável técnico completo | ✅ | `ARCHITECTURE.md`, `DATA_MODEL.md`, CI/security/docs |
| 62 | Entregável final produto/UX/design/tests/a11y/perf/security/Impeccable/limites | ✅ | repo + docs + artifacts de CI |
| 63 | Regra de parada só sem gaps materiais | ✅ | `REQUIREMENTS.md` impede fechamento enquanto dependência aplicável estiver pendente |
| 64 | Ciência + UX + design + engenharia + IA/inteligência + segurança + simplicidade | ✅ | arquitetura e docs V1 |
| 65 | Repositório oficial `vitaframe` como fonte da verdade | ✅ | `sylviohmartins/vitaframe` |
| 66 | Fluxo orientado a Git | ✅ | branches/PR/CI/merge usados |
| 67 | Conventional Commits pequenos | ✅ | commits semânticos usados no gap closure |
| 68 | PR como unidade material | ✅ | entrega final via PR contra `main` |
| 69 | GitHub Actions desde o início | ✅ | workflows versionados |
| 70 | Arquitetura de workflows | ✅ | ci/security/preview/deploy/scheduled + templates/Dependabot/CODEOWNERS |
| 71 | CI em PR/main/merge group | ✅ | `.github/workflows/ci.yml` |
| 72 | Install/prepare determinístico | ✅ | Node fixado + `npm ci --ignore-scripts` + cache |
| 73 | Format check | ✅ | `scripts/format-check.mjs` |
| 74 | Lint | ✅ | `scripts/lint.mjs` + syntax/quality security rules |
| 75 | Typecheck quando houver tipagem estática | ✅ N/A | V1 JavaScript ES Modules sem TypeScript; não simular typecheck |
| 76 | Unit tests | ✅ | `tests/*.test.mjs` |
| 77 | Integration tests | ✅ | E2E integra storage/routing/import/history/adaptive/meals; sem DB/API artificial |
| 78 | Build determinístico | ✅ | `scripts/build.mjs` → `dist/` |
| 79 | E2E crítico | ✅ | principal + estendido |
| 80 | Accessibility automation | ✅ | AX tree + nomes/overflow/invariantes; manual separado |
| 81 | Visual regression | ✅ | screenshots + assinatura geométrica/versioned baseline |
| 82 | UX quality/Lighthouse-equivalentes | ✅ | budgets próprios + Impeccable; sem framework/deps para justificar bundle tooling pesado |
| 83 | Impeccable job | ✅ | job real, sem Action falsa |
| 84 | Security pipeline | ✅ | CodeQL no CI mandatory + workflow Security separado + npm audit |
| 85 | Supply-chain security | ✅ | Actions oficiais pinadas por SHA, permissions explícitas |
| 86 | Dependency review | ✅ N/A/mitigado | zero dependências runtime/npm; lockfile+audit; Actions pinadas+Dependabot |
| 87 | Dependabot | ✅ | `.github/dependabot.yml` para Actions |
| 88 | Quality gate agregador | ✅ | `quality-gate` inclui quality/e2e/impeccable/security |
| 89 | Proteção da `main` | ⛔ | checks/documentação existem; habilitar Ruleset exige permissão administrativa não exposta ao agente |
| 90 | Squash and Merge | ✅ | estratégia usada/documentada |
| 91 | Preview environment | 🟡 | PR gera artifact estático validado; URL efêmera pública exige host/provedor externo |
| 92 | Deploy produção somente após gate | 🟡 | workflow `workflow_run` só após CI verde; execução pública depende de Pages/config externa |
| 93 | Environments preview/production | 🟡 | production declarado no deploy; preview é artifact sem ambiente remoto |
| 94 | OIDC quando cloud suportar | ✅ | Pages usa `id-token: write`; sem credenciais long-lived |
| 95 | Smoke test pós-deploy | ✅ | curl + conteúdo VitaFrame no workflow gated |
| 96 | Nightly/scheduled validation | ✅ | weekly `scheduled.yml` + CodeQL schedule |
| 97 | Matrix apenas quando agregar valor | ✅ N/A | V1 suporta um runtime/browser alvo de CI; não multiplicar minutos artificialmente |
| 98 | Concurrency | ✅ | CI/preview/security/scheduled/deploy configurados |
| 99 | Cache | ✅ | setup-node cache npm; build não depende de cache |
| 100 | Artifacts úteis e sem dados sensíveis | ✅ | E2E/performance/Impeccable/preview sintéticos |
| 101 | Diagnóstico de falhas sem mascarar | ✅ | histórico de correções e gates sem `continue-on-error` obrigatório |
| 102 | Status checks estáveis | ✅ | `quality`, `e2e`, `impeccable`, `security`, `quality-gate` |
| 103 | README CI/CD | ✅ | `CI.md` + README |
| 104 | Validar o próprio pipeline | ✅ | branch CI + PR CI + main CI executados antes do fechamento final |
| 105 | Definition of Done | ✅ | CI e documentos codificam critérios; fechamento condicionado a gates |
| 106 | Auto-validação agente local/CI/push/corrigir/revalidar | ✅ | fluxo operacional aplicado |
| 107 | LOCAL/PR/MAIN/PROD como estados distintos | ✅ | `CI.md`, Git workflow e deploy gated |

## Interpretação correta do status

A V1 pode ser considerada **tecnicamente concluída no repositório** quando os itens ✅ passarem no PR e novamente na `main`.

Ela não deve ser descrita como “produto comercial 100% validado” enquanto existirem os quatro itens externos do topo. Eles são deliberadamente separados porque:
- código não substitui pessoas em pesquisa;
- automação não substitui auditoria manual de acessibilidade;
- arquivo YAML não substitui Ruleset administrativo;
- workflow de deploy não cria configuração de Pages por conta própria sem permissão/opt-in.

Isso mantém a Definition of Done rigorosa sem transformar impossibilidades externas em falsos sucessos.