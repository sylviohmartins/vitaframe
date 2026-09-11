# VitaFrame

> **V1 — avaliação estruturada, local-first e orientada por evidências para corpo, alimentação, rotina e treino.**

VitaFrame existe para organizar contexto antes de qualquer plano. A V1 conduz uma avaliação progressiva, registra preferências alimentares sem depender de memória espontânea, separa medição de estimativa, identifica situações de atenção e gera um perfil portátil para revisão pessoal ou profissional.

## Decisão de produto

A investigação concluiu **GO COM AJUSTES**: trackers de alimentação, treino e softwares profissionais já são fortes em seus domínios. O espaço mais coerente para VitaFrame é **anamnese inteligente + estruturação + handoff**, não prescrição autônoma.

Veja [`docs/RESEARCH.md`](docs/RESEARCH.md) e [`docs/REGULATORY.md`](docs/REGULATORY.md).

## V1

- avaliação progressiva em 10 etapas;
- autosave local somente após consentimento;
- objetivos e composição corporal com proveniência;
- saúde, restrições e red flags;
- alimentação atual e contexto social;
- catálogo amplo de preferências por reconhecimento;
- rotina, praticidade e orçamento;
- treino, cardio, passos e limitações;
- sono, estresse e hidratação;
- IMC e TMB como **estimativas educacionais**, nunca metas;
- perfil final, impressão/PDF e export/import JSON;
- dark mode, mobile-first e PWA básica;
- zero backend, analytics, pixels ou scripts runtime de terceiros.

## Executar

Não há build nem dependências runtime.

```bash
python3 -m http.server 4173
```

Abra `http://localhost:4173`.

## Validar

```bash
npm ci
npm run ci
```

E2E usa Chrome/Chromium headless via Chrome DevTools Protocol, sem biblioteca de browser adicional:

```bash
npm run e2e
```

O CI executa E2E em runner GitHub com Chrome disponível e captura screenshots mobile/desktop como artefatos.

## Arquitetura

HTML + CSS + ES Modules nativos. A escolha reduz dependências, custo de build e superfície de supply chain na fase de validação.

- [`ARCHITECTURE.md`](ARCHITECTURE.md)
- [`DESIGN.md`](DESIGN.md)
- [`PRIVACY.md`](PRIVACY.md)
- [`SECURITY.md`](SECURITY.md)
- [`AI_GUARDRAILS.md`](AI_GUARDRAILS.md)
- [`TESTING.md`](TESTING.md)
- [`CI.md`](CI.md)

## Limites

VitaFrame V1 **não diagnostica, não prescreve dieta, suplemento ou treino e não é prontuário clínico**. Produção comercial/multiusuário exige arquitetura e governança adicionais.

## CI

PRs e `main` executam:

1. syntax + unit + quality;
2. E2E real em Chrome;
3. Impeccable CLI `detect` fixado em versão explícita;
4. `quality-gate` agregador;
5. CodeQL em workflow de segurança.

As GitHub Actions oficiais são fixadas por SHA completo.

## Licença

Ainda não definida. Todos os direitos reservados até escolha explícita de licença.
