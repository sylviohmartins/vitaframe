# VitaFrame — Architectural Decision Records V1

## ADR-001 — GO COM AJUSTES

VitaFrame será avaliação/handoff estruturado, não prescritor automático de dieta ou treino. Motivo: mercado já é forte em tracking/prescrição e o posicionamento de pré-avaliação reduz comoditização e risco regulatório.

## ADR-002 — Local-first

Sem backend na V1. Reduz custo, acelera validação e evita centralizar dados sensíveis antes de necessidade real.

## ADR-003 — Plataforma web nativa

HTML/CSS/ES Modules sem framework/dependência runtime. A complexidade atual não justifica React/Next e o ganho de performance/supply chain é material.

## ADR-004 — PDF via print

Usar CSS de impressão e “Salvar como PDF” do navegador em vez de biblioteca PDF.

## ADR-005 — IA externa adiada, inteligência local implementada

Branching, follow-ups e parsing são determinísticos e explicáveis. Não enviar dados de saúde a um LLM/serviço de visão sem arquitetura de privacidade e benefício comprovado.

## ADR-006 — OCR por progressive enhancement

Tentar `TextDetector` nativo quando disponível; caso contrário, permitir colar texto. Nenhuma imagem sai do dispositivo só para cumprir um requisito visual de “IA”.

## ADR-007 — Histórico por snapshots explícitos

Estado atual e histórico são conceitos distintos. Medição histórica só entra quando o usuário confirma “Salvar medição atual no histórico”; isso evita criar falsos eventos a cada tecla.

## ADR-008 — Handoff profissional sem portal cloud

A V1 permite revisão profissional local separada do relato original. Portal multiusuário autenticado é incompatível com a meta de V1 sem backend e exige governança adicional; não simular isso em localStorage como se fosse autorização real.

## ADR-009 — Compartilhamento por arquivo criptografado

Sem servidor, “compartilhamento seguro” significa exportar `.vfsecure` com PBKDF2 + AES-GCM e orientar envio da senha por canal separado. Não criar link público falso.

## ADR-010 — Métricas locais

Coletar somente eventos abstratos localmente. Isso permite o usuário inspecionar progresso/funil sem analytics remoto. Métricas agregadas de produto só entram após decisão de privacidade específica.

## ADR-011 — Visual regression híbrida

Screenshots continuam artefatos para inspeção; uma assinatura geométrica versionada detecta mudanças de layout no CI. Atualizar baseline deve ser ato explícito.

## ADR-012 — Deploy existe, mas é gated

GitHub Pages está automatizado no código, porém só executa com `ENABLE_PAGES_DEPLOY=true` e Pages configurado. Configuração administrativa externa não deve deixar a `main` propositalmente vermelha.

## ADR-013 — Branch protection é governance externa

Checks são implementados, mas a conexão atual não oferece mutação de Rulesets. O requisito permanece rastreado como dependência administrativa até ser habilitado na UI/API com permissão adequada.

## ADR-014 — Pesquisa humana não é simulada

Discovery documental informa produto, mas entrevistas/usability tests dependem de participantes reais. O protocolo está em `VALIDATION.md`; nenhum resultado será inventado para marcar checklist como verde.