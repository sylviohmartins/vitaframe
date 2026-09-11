# CI/CD V1

## CI obrigatório

`CI / quality-gate` agrega:

- `quality`: `npm ci`, sintaxe, unit tests e regras estáticas;
- `e2e`: fluxo real em Chrome via CDP + screenshots;
- `impeccable`: `npx impeccable@4.0.1 detect index.html --json`.

`Security / codeql` executa em PR, `main` e semanalmente.

## Supply chain

Ações de terceiros usadas nos workflows são oficiais e fixadas por SHA completo. O GitHub recomenda SHA completo como forma imutável de referenciar actions.

## Branch protection recomendada

Configurar Ruleset para `main` exigindo:

- Pull Request;
- `CI / quality-gate`;
- `Security / codeql`;
- conversas resolvidas;
- bloqueio de force push/delete;
- squash merge como método preferido.

A conexão disponível ao agente não expõe mutação de Rulesets/branch protection; o enforcement depende da configuração do repositório.

## Deploy

V1 é host-agnostic e funciona em qualquer servidor estático. Nenhum deploy automático obrigatório foi criado porque não há ambiente/Pages configurado e um workflow propositalmente vermelho não deve fazer parte do quality gate.
