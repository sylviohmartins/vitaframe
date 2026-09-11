# CI/CD V1

## CI obrigatório

`CI / quality-gate` agrega:

- `quality`: syntax, unit tests e regras estáticas;
- `e2e`: fluxo real em Chromium;
- `impeccable`: detector determinístico de design.

`Security / codeql` executa em PR, main e semanalmente.

## Branch protection recomendada

Configurar Ruleset para `main` exigindo:

- Pull Request;
- `CI / quality-gate`;
- `Security / codeql`;
- conversas resolvidas;
- bloqueio de force push/delete;
- squash merge como método preferido.

A API disponível ao agente nesta sessão não expõe mutação de Rulesets/branch protection; portanto os workflows estão implementados, mas o enforcement da regra de merge depende da configuração do repositório no GitHub.

## Deploy

V1 é host-agnostic e funciona em qualquer servidor estático. GitHub Pages pode ser habilitado depois sem alterar a aplicação. Não foi criado workflow de produção que falharia por ausência de configuração de Pages/environment.
