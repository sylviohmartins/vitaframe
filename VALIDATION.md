# VitaFrame — Validation V1

## O que foi validado tecnicamente

A V1 exige evidência reproduzível para:

- sintaxe;
- testes unitários;
- testes de regras adaptativas/importação;
- quality checks de privacidade e segurança;
- E2E em Chrome;
- screenshots em mobile e desktop;
- Impeccable detector;
- CodeQL;
- quality gate agregador;
- execução pós-merge na `main`.

## O que exige participantes reais

O agente não deve inventar evidência de UX Research. Estas hipóteses permanecem dependentes de pessoas reais:

1. tempo aceitável de preenchimento;
2. taxa de abandono por etapa;
3. utilidade percebida do perfil final;
4. clareza da escala de preferências;
5. valor para nutricionistas;
6. valor para profissionais de Educação Física;
7. disposição a atualizar medições;
8. disposição a pagar;
9. entendimento dos limites entre educação e prescrição.

## Protocolo recomendado

### Usuários
- 5–8 participantes no primeiro ciclo de usabilidade;
- perfis com experiência distinta em dieta/academia;
- tarefas: iniciar avaliação, interromper/retomar, classificar alimentos, importar um relatório, exportar perfil;
- observar erros, hesitação, tempo e abandono sem induzir respostas.

### Profissionais
- 3–5 nutricionistas e 3–5 profissionais de Educação Física;
- avaliar se o relatório reduz perguntas repetitivas;
- marcar campos essenciais, ruído e informações ausentes;
- não pedir validação de prescrição automática, porque esse não é o escopo da V1.

## Métricas

- completion rate;
- mediana de time-to-complete;
- drop-off por etapa;
- missing data rate;
- correction rate após revisão;
- professional usefulness score (1–5);
- intenção de retorno após 30 dias;
- SUS (System Usability Scale), se apropriado.

## Regra de evidência

Resultados só entram em `docs/RESEARCH.md` como fatos após coleta real. Até lá devem permanecer rotulados como hipótese ou plano de validação.