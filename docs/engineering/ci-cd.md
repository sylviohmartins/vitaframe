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

O workflow independente `Security / codeql` executa em PR contra `main`, push para `main` e semanalmente. Ele utiliza a suite `security-extended`, envia os resultados ao GitHub Code Scanning e preserva o SARIF por 7 dias como artifact de auditoria/triagem.

O check independente `codeql` faz parte do Ruleset da `main`, além do `quality-gate` agregado do CI. O `npm audit --audit-level=high` continua executando dentro de `npm run ci`.

## Preview

`.github/workflows/preview.yml` valida PRs e publica um artifact de preview estático. A V1 não inventa URL pública de preview sem provedor configurado.

## Production deploy

`.github/workflows/deploy.yml` implementa GitHub Pages com environment `production`, upload do site estático, deploy e smoke test.

Produção não é disparada durante um Pull Request nem manualmente. `Deploy Pages` somente considera uma execução concluída do workflow `CI` para a branch `main` e exige simultaneamente:

- `ENABLE_PAGES_DEPLOY=true`;
- CI com `conclusion == success`;
- CI originado por evento `push`;
- `head_branch == main`.

O workflow faz checkout exatamente de `github.event.workflow_run.head_sha`, isto é, o commit da `main` que acabou de ser validado. Como a `main` é protegida por Ruleset e alterações entram por Pull Request, o fluxo normal é: PR → checks obrigatórios → Squash Merge → CI do push na `main` → deploy → smoke test.

## Scheduled validation

`.github/workflows/scheduled.yml` executa validação periódica ampliada. CodeQL mantém seu próprio schedule.

## Supply chain

Actions de terceiros utilizadas são de publishers oficiais e fixadas por commit SHA completo. Dependabot verifica GitHub Actions. O projeto não possui dependências runtime npm na V1; ainda assim, o lockfile e `npm audit` permanecem no gate para detectar regressões futuras.

## Governança da estrutura

`npm run structure` aplica o root budget e a taxonomia de docs/testes. `npm run links` valida links Markdown relativos. Isso impede regressão silenciosa da organização do repositório.

## Branch protection atual

O Ruleset `Protect main` está ativo para a branch padrão. Ele exige Pull Request, `quality-gate`, `codeql`, resolução de conversas, histórico linear e bloqueia exclusão/force push. O método permitido pelo Ruleset é Squash.

## Merge strategy

**Squash and Merge** é o método adotado para a `main`.

## Artefatos

CI publica apenas itens necessários e sem dados reais de usuário: screenshots/fixtures sintéticas quando aplicáveis, assinatura de layout, performance laboratorial, relatórios do Impeccable e preview estático. O workflow `Security` também preserva o SARIF por 7 dias para auditoria; nenhum dado pessoal real deve ser introduzido em código, fixtures, logs ou artifacts.

## Definition of Done técnica

Para alteração material: implementação → `npm run ci` → E2E → acessibilidade/performance aplicável → Impeccable → CodeQL → PR → checks verdes → squash merge → checks verdes na `main` → deploy de produção somente depois do CI verde da `main`, quando aplicável.
