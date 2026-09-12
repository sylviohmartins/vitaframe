# VitaFrame — CI/CD V1

## CI obrigatório

`CI / quality-gate` agrega quatro jobs materiais:

- `quality`: instalação determinística, formatação, sintaxe, lint, unit/quality tests, estrutura, links, regras de qualidade, audit e build;
- `e2e`: E2E principal + estendido + matriz de viewports, acessibilidade objetiva, performance e regressão visual;
- `impeccable`: detector fixado em versão explícita para todas as superfícies V1;
- `security`: CodeQL no próprio workflow principal.

O job estável `quality-gate` somente passa se todos concluírem com `success`.

## Triggers

CI executa em Pull Requests contra `main`, push em `main`, branches de trabalho reconhecidas e `merge_group`. `concurrency` cancela execuções obsoletas fora da `main`.

## Security

O workflow independente `Security / codeql` executa em PR contra `main`, push para `main` e semanalmente.

## Preview

`.github/workflows/preview.yml` valida PRs e publica um artifact de preview estático. A V1 não inventa URL pública de preview sem provedor configurado.

## Production deploy

`.github/workflows/deploy.yml` implementa GitHub Pages com environment `production`, upload do site estático, deploy e smoke test. O deploy só executa quando `ENABLE_PAGES_DEPLOY=true` e Pages estiver habilitado.

## Scheduled validation

`.github/workflows/scheduled.yml` executa validação periódica ampliada. CodeQL mantém seu próprio schedule.

## Supply chain

Actions de terceiros utilizadas são de publishers oficiais e fixadas por commit SHA completo. Dependabot verifica GitHub Actions. O projeto não possui dependências runtime npm na V1.

## Governança da estrutura

`npm run structure` aplica o root budget e a taxonomia de docs/testes. `npm run links` valida links Markdown relativos. Isso impede regressão silenciosa da organização do repositório.

## Branch protection recomendada

Configurar Ruleset para `main` exigindo Pull Request, `CI / quality-gate`, `Security / codeql`, conversas resolvidas e bloqueio de force push/delete. A conexão do agente não possui permissão administrativa para aplicar Rulesets; o item permanece explicitamente rastreado em [`../product/requirements.md`](../product/requirements.md).

## Merge strategy

Preferência: **Squash and Merge**.

## Artefatos

CI publica somente itens úteis e sem dados reais de usuário: screenshots sintéticos, assinatura de layout, performance laboratorial, relatórios do Impeccable e preview estático.

## Definition of Done técnica

Para alteração material: implementação → `npm run ci` → E2E → acessibilidade/performance aplicável → Impeccable → CodeQL → PR → checks verdes → squash merge → checks verdes na `main`.
