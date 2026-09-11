# VitaFrame

> **V1 — avaliação estruturada, local-first e orientada por evidências para corpo, alimentação, rotina e treino.**

VitaFrame existe para organizar contexto antes de qualquer plano. A V1 conduz uma avaliação progressiva, registra preferências alimentares sem depender de memória espontânea, separa medição de estimativa, identifica red flags e gera um perfil portátil para revisão pessoal ou profissional.

## Por que este posicionamento

A investigação de mercado concluiu **GO COM AJUSTES**: trackers de alimentação, treino e softwares profissionais já são fortes em seus domínios. O espaço mais coerente para VitaFrame é a camada de **anamnese inteligente + estruturação + handoff**, não um prescritor automático de dieta/treino.

Veja [`docs/RESEARCH.md`](docs/RESEARCH.md).

## V1

- avaliação em 10 etapas;
- autosave local após consentimento;
- objetivos e composição corporal com origem do dado;
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

E2E:

```bash
python3 -m pip install -r requirements-dev.txt
python3 -m playwright install chromium
python3 -m http.server 4173 &
python3 e2e/test_vitaframe.py
```

## Arquitetura

HTML + CSS + ES Modules nativos. A escolha deliberadamente reduz dependências e superfície de ataque na fase de validação.

- [`ARCHITECTURE.md`](ARCHITECTURE.md)
- [`DESIGN.md`](DESIGN.md)
- [`PRIVACY.md`](PRIVACY.md)
- [`SECURITY.md`](SECURITY.md)
- [`AI_GUARDRAILS.md`](AI_GUARDRAILS.md)
- [`TESTING.md`](TESTING.md)

## Limites de segurança e profissão

VitaFrame V1 **não diagnostica, não prescreve dieta, suplemento ou treino e não é prontuário clínico**. Dados de saúde são sensíveis; por isso a V1 não os envia a um backend. Produção comercial/multiusuário exige arquitetura e governança adicionais.

## CI

PRs e `main` executam:

1. syntax + unit + quality;
2. Playwright E2E em Chromium;
3. Impeccable detector 3.2.1;
4. `quality-gate` agregador;
5. CodeQL em workflow de segurança.

As actions oficiais são fixadas por SHA completo. Consulte [`.github/workflows/`](.github/workflows/).

## Licença

Ainda não definida. Todos os direitos reservados até escolha explícita de licença.
