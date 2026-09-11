# VitaFrame

> **V1 — avaliação estruturada, adaptativa, local-first e orientada por evidências para corpo, alimentação, rotina e treino.**

VitaFrame organiza contexto antes de qualquer plano. A V1 conduz uma avaliação progressiva, registra preferências por reconhecimento, distingue medição de estimativa, preserva histórico, encontra lacunas, permite handoff profissional e gera um perfil portátil — sem exigir conta ou backend.

## Decisão de produto

A investigação concluiu **GO COM AJUSTES**: trackers de alimentação/treino e softwares profissionais já são fortes em seus domínios. O espaço mais coerente para VitaFrame é **intake inteligente + estruturação + proveniência + portabilidade + handoff**, não prescrição autônoma.

- [`docs/RESEARCH.md`](docs/RESEARCH.md)
- [`docs/REGULATORY.md`](docs/REGULATORY.md)
- [`REQUIREMENTS.md`](REQUIREMENTS.md)

## Experiências V1

### Avaliação completa — `index.html`
- 10 etapas;
- objetivo, corpo, saúde, alimentação, preferências, rotina, treino, recuperação, revisão e perfil;
- autosave somente após consentimento;
- red flags e inconsistências;
- IMC/TMB rotulados como estimativas educacionais;
- JSON + impressão/PDF.

### Entrevista adaptativa — `adaptive.html`
- uma pergunta por vez;
- branching real;
- álcool detalhado somente quando aplicável;
- perguntas de treino omitidas quando não há treino atual;
- proveniência de gordura corporal solicitada somente quando existe estimativa;
- opção de pular sem inventar resposta.

### Dia alimentar — `meals.html`
- adicionar/remover/reordenar refeições;
- horário opcional;
- conteúdo livre;
- “não sei a quantidade” explícito;
- persistência no perfil atual.

### Centro de dados — `advanced.html`
- follow-ups contextuais;
- importação assistida por texto;
- OCR **local** via `TextDetector` quando o navegador suportar;
- confirmação humana antes de aplicar valores;
- histórico de snapshots;
- revisão profissional local separada;
- exportação criptografada `.vfsecure` com PBKDF2 + AES-GCM;
- métricas locais sem telemetria de saúde.

## Preferências alimentares

O catálogo evita depender de memória espontânea. Categorias incluem proteínas, carboidratos, frutas, verduras/legumes, café/lanches, doces, bebidas e refeições sociais.

Escala:
- não gosto;
- indiferente;
- gosto;
- gosto muito;
- não conheço.

Há busca e campo para alimento não listado.

## Privacidade

- zero backend na V1;
- zero analytics remoto;
- zero pixels;
- zero scripts/fontes runtime de terceiros;
- nenhum LLM/serviço de visão externo;
- dados persistem somente após consentimento;
- exportação pode ser criptografada localmente;
- CSP restrictiva;
- métricas de funil ficam no próprio dispositivo e não contêm respostas de saúde.

`localStorage` **não é prontuário criptografado**. Veja [`PRIVACY.md`](PRIVACY.md) e [`SECURITY.md`](SECURITY.md).

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
npm run e2e
```

O CI executa:
1. syntax + unit + quality;
2. E2E principal e estendido em Chrome;
3. acessibilidade objetiva/AX tree;
4. budgets de performance e layout;
5. regressão visual quando baseline está versionada;
6. Impeccable `detect` em todas as superfícies;
7. `quality-gate` agregador;
8. CodeQL em workflow de segurança.

## GitHub Actions

- `.github/workflows/ci.yml` — PRs, `main` e branches de trabalho;
- `.github/workflows/security.yml` — CodeQL;
- `.github/workflows/preview.yml` — validação + artifact estático por PR;
- `.github/workflows/scheduled.yml` — validação semanal ampliada;
- `.github/workflows/deploy.yml` — GitHub Pages + smoke test, ativado somente quando `ENABLE_PAGES_DEPLOY=true`.

Actions oficiais são fixadas por SHA completo.

## Arquitetura e documentação

- [`PRODUCT.md`](PRODUCT.md)
- [`ARCHITECTURE.md`](ARCHITECTURE.md)
- [`DATA_MODEL.md`](DATA_MODEL.md)
- [`DESIGN.md`](DESIGN.md)
- [`PRIVACY.md`](PRIVACY.md)
- [`SECURITY.md`](SECURITY.md)
- [`AI_GUARDRAILS.md`](AI_GUARDRAILS.md)
- [`ACCESSIBILITY.md`](ACCESSIBILITY.md)
- [`PERFORMANCE.md`](PERFORMANCE.md)
- [`TESTING.md`](TESTING.md)
- [`CI.md`](CI.md)
- [`VALIDATION.md`](VALIDATION.md)
- [`DECISIONS.md`](DECISIONS.md)
- [`REQUIREMENTS.md`](REQUIREMENTS.md)

## Limites regulatórios

VitaFrame V1:
- não diagnostica;
- não trata doença;
- não prescreve dieta;
- não prescreve suplementos;
- não prescreve treino individualizado como profissional;
- não declara ausência de red flag como liberação clínica.

Consulte `docs/REGULATORY.md`.

## O que não pode ser falsamente marcado como “concluído” por código

Alguns itens do prompt dependem de fatores externos:
- entrevistas/usability tests com participantes reais;
- auditoria manual completa com leitores de tela/dispositivos reais para alegar conformidade WCAG integral;
- Ruleset/branch protection administrativo da `main`;
- deploy público enquanto GitHub Pages/variável do repositório não forem habilitados.

Esses itens ficam explicitamente rastreados em `REQUIREMENTS.md` em vez de serem simulados.

## Licença

Ainda não definida. Todos os direitos reservados até escolha explícita de licença.