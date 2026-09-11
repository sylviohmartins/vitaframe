# Architectural Decision Records — V1

## ADR-001 — GO COM AJUSTES
VitaFrame V1 será avaliação/handoff, não prescritor automático.

## ADR-002 — Local-first
Sem backend para V1. Reduz custo, acelera validação e evita centralizar dados sensíveis antes de necessidade real.

## ADR-003 — Vanilla web platform
Sem framework/dependência runtime. A complexidade atual não justifica React/Next e o ganho em supply-chain/performance é material.

## ADR-004 — PDF via print
Em vez de biblioteca PDF, usa CSS de impressão e “Salvar como PDF” do navegador.

## ADR-005 — Screenshot sem OCR na V1
A imagem pode ser aberta localmente como referência, mas não é processada por serviço externo. OCR/visão só entra quando houver arquitetura de privacidade e benefício demonstrado.
