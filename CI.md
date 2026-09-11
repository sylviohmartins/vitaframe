# VitaFrame — CI/CD V1

## CI obrigatório

`CI / quality-gate` agrega três jobs materiais:

- `quality`: instalação determinística, sintaxe, unit tests e quality checks;
- `e2e`: E2E principal + estendido, acessibilidade objetiva, performance laboratorial, screenshots e regressão visual quando baseline existe;
- `impeccable`: detector fixado em versão explícita para todas as superfícies V1.

O job estável `quality-gate` somente passa se os três concluírem com `success`.

## Triggers

CI executa em:
- Pull Requests contra `main`;
- push em `main`;
- branches `feat/**`, `fix/**`, `refactor/**`, `chore/**`;
- `merge_group` quando usado.

`concurrency` cancela execuções obsoletas fora da `main`.

## Security

`Security / codeql` executa:
- em PR contra `main`;
- em push para `main`;
- semanalmente.

## Preview

`.github/workflows/preview.yml` valida PRs e publica um **artifact de preview estático** com a aplicação pronta para inspeção. A V1 não inventa uma URL pública de preview porque nenhum provedor externo foi configurado.

## Production deploy

`.github/workflows/deploy.yml` implementa GitHub Pages com:
- permissões mínimas necessárias a Pages/OIDC;
- environment `production`;
- upload do site estático;
- deploy;
- smoke test HTTP pós-deploy.

Para evitar workflow propositalmente quebrado em repositório sem Pages configurado, o deploy só executa quando a variável de repositório:

`ENABLE_PAGES_DEPLOY=true`

estiver configurada e Pages estiver habilitado. Essa configuração administrativa é uma dependência externa, não algo que deve ser falsificado no código.

## Scheduled validation

`.github/workflows/scheduled.yml` roda semanalmente e também aceita `workflow_dispatch`:
- CI;
- E2E ampliado;
- Impeccable;
- artefatos de validação.

CodeQL mantém seu próprio schedule.

## Supply chain

Actions utilizadas são de publishers oficiais e fixadas por commit SHA completo. Dependabot verifica GitHub Actions semanalmente. O projeto não possui dependências runtime npm na V1.

## Branch protection recomendada/obrigatória para operação contínua

Configurar Ruleset para `main` exigindo:
- Pull Request;
- `CI / quality-gate`;
- `Security / codeql`;
- conversas resolvidas;
- bloqueio de force push/delete;
- squash merge.

**Limitação operacional:** a conexão GitHub disponível ao agente não possui ação administrativa para criar/alterar Rulesets/branch protection. Portanto o repositório pode conter todos os checks e ainda depender de configuração administrativa no GitHub para torná-los obrigatórios. `REQUIREMENTS.md` registra esse item como dependência externa até ser habilitado.

## Merge strategy

Preferência: **Squash and Merge**. Commits do branch podem permanecer granulares, enquanto `main` recebe uma unidade semântica por PR.

## Artefatos

CI publica somente itens úteis e sem dados reais de usuário:
- screenshots de estado de teste sintético;
- assinatura de layout;
- performance laboratorial;
- relatórios do Impeccable;
- preview estático.

Nunca inserir dados pessoais/sensíveis reais em fixtures ou artifacts.

## Diagnóstico de falhas

Falha obrigatória deve ser corrigida, não ocultada. É proibido usar `continue-on-error` para mascarar quality gate, remover teste somente para obter verde ou declarar sucesso sem execução real.

## Definition of Done técnica

Para alteração material:
1. implementação;
2. `npm run ci`;
3. E2E aplicável;
4. acessibilidade objetiva;
5. performance/layout aplicável;
6. Impeccable;
7. CodeQL;
8. PR;
9. checks verdes;
10. squash merge;
11. checks verdes novamente na `main`.