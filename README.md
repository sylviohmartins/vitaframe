# VitaFrame

> **V1 — avaliação estruturada, adaptativa, local-first e orientada por evidências para corpo, alimentação, rotina e treino.**

VitaFrame organiza contexto antes de qualquer plano. A V1 conduz uma avaliação progressiva, registra preferências por reconhecimento, distingue medição de estimativa, preserva histórico, identifica lacunas, permite handoff profissional e gera um perfil portátil — sem exigir conta ou backend.

## Documentação

A documentação interna possui uma arquitetura própria. Comece pelo **[índice de documentação](docs/README.md)**.

Atalhos principais:

- [Produto](docs/product/product.md)
- [Requisitos da V1](docs/product/requirements.md)
- [Arquitetura](docs/architecture/overview.md)
- [Modelo de dados](docs/architecture/data-model.md)
- [Design System](docs/design/design-system.md)
- [UX](docs/design/ux-architecture.md)
- [Pesquisa de mercado](docs/research/market.md)
- [Regulatório](docs/governance/regulatory.md)
- [Privacidade](docs/governance/privacy.md)
- [Arquitetura de segurança](docs/governance/security.md)
- [Testes](docs/engineering/testing.md)
- [CI/CD](docs/engineering/ci-cd.md)

## Experiências V1

- `index.html` — avaliação completa e perfil;
- `adaptive.html` — entrevista adaptativa;
- `meals.html` — timeline do dia alimentar;
- `advanced.html` — centro de dados, importação assistida, histórico, revisão profissional e exportação protegida.

## Privacidade e limites

A V1 é local-first: não possui backend, analytics remoto, pixels, fontes/scripts runtime de terceiros ou LLM externo recebendo dados de saúde. Persistência local ocorre após consentimento. `localStorage` não deve ser tratado como prontuário ou cofre criptográfico.

VitaFrame V1 não diagnostica, não trata doença e não substitui nutricionista, profissional de Educação Física ou avaliação médica quando indicada. Consulte [privacidade](docs/governance/privacy.md), [segurança](docs/governance/security.md), [guardrails de IA](docs/governance/ai-guardrails.md) e [regulatório](docs/governance/regulatory.md).

## Executar

Não há dependências runtime nem etapa de compilação para abrir a aplicação.

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

O pipeline valida formatação, sintaxe, regras de lint, testes unitários/quality, estrutura do repositório, links internos, regras funcionais, `npm audit`, build, E2E, acessibilidade objetiva, performance, regressão visual, Impeccable e CodeQL.

## Estrutura

```text
.github/     automação e governança GitHub
assets/      CSS e assets estáticos
src/         runtime da aplicação
docs/        documentação por domínio
scripts/     build e quality tooling
tests/       unit, quality e E2E
```

A raiz é reservada a entrypoints, manifestos/configuração global e arquivos humanos reconhecidos pelo ecossistema. O CI impede que documentação interna volte a se acumular nela.

## GitHub Actions

- `.github/workflows/ci.yml` — quality, E2E, Impeccable, security e `quality-gate`;
- `.github/workflows/security.yml` — CodeQL;
- `.github/workflows/preview.yml` — artifact estático por PR;
- `.github/workflows/scheduled.yml` — validação periódica;
- `.github/workflows/deploy.yml` — GitHub Pages quando o repositório estiver administrativamente habilitado.

## Segurança

Para reportar uma vulnerabilidade, consulte [`SECURITY.md`](SECURITY.md). Não publique dados pessoais, dados de saúde ou detalhes exploráveis em issues públicas.

## Licença

Ainda não definida. Todos os direitos reservados até escolha explícita de licença.
