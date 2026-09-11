# VitaFrame V1 — Pesquisa de oportunidade

Data de corte: 11/09/2026.

## Decisão

**GO COM AJUSTES.** Existe oportunidade, mas não como “IA que prescreve dieta e treino sozinha”. A oportunidade mais defensável é uma camada de **avaliação estruturada + organização + educação + handoff profissional**, com automação progressiva e revisão humana quando entrar em prescrição.

## Problema observado

O mercado está fragmentado entre três famílias:

1. trackers de alimentação e calorias, como MyFitnessPal, Fitia e Lifesum;
2. trackers/planejadores de treino, como Hevy;
3. sistemas profissionais, como Dietbox, WebDiet, Nutrium e Trainerize.

Eles resolvem muito bem partes da jornada, mas há espaço para uma experiência consumer-first que transforme informações dispersas de alimentação, corpo, rotina, treino, preferências e limitações em um perfil estruturado, portátil e explicitamente preparado para revisão profissional.

## Concorrência resumida

- **MyFitnessPal**: logging amplo, macros, medidas, integrações, Meal Scan, Voice Logging e, no Premium+, planejamento de refeições/lista de compras. Forte em tracking; menos centrado em uma anamnese holística pré-plano.
- **Fitia**: tracking com IA por foto/voz/texto, meal planner, progresso e lista de compras. Forte em automação de alimentação.
- **Lifesum**: food tracking, meal plans, dietas, receitas, habit trackers e integrações com wearables.
- **Hevy**: referência forte para logging de treino, rotinas, progressão, medidas corporais e fotos. Foco claro em treino, não em anamnese integrada.
- **ABC Trainerize**: plataforma para coaches com treino, hábitos, nutrição, meal tracking/planning e IA para criação de workouts.
- **Dietbox / WebDiet / Nutrium**: ecossistemas profissionais completos com anamnese, pré-consulta, antropometria, prontuário, plano alimentar e acompanhamento. São fortes no lado do profissional.

## Lacuna recomendada

O diferencial de V1 não é competir em banco de alimentos, contador de calorias ou biblioteca de exercícios. É:

- entrevista guiada mobile-first;
- preferências por reconhecimento, não lembrança espontânea;
- proveniência dos dados (autorreferido, balança, profissional, relatório);
- separação entre medição e estimativa;
- identificação de lacunas e inconsistências;
- privacidade local-first no protótipo;
- relatório legível para o usuário e útil como preparação de consulta;
- limites explícitos entre educação e prescrição.

## Jobs to be Done

### Usuário
“Quando eu for organizar minha alimentação e treino, quero uma forma simples de registrar tudo que realmente importa, para não esquecer informações, entender meu contexto e chegar melhor preparado a uma decisão ou consulta.”

### Nutricionista
“Quando um paciente chega, quero receber contexto pré-consulta organizado e com origem clara, para usar tempo de consulta em análise e escuta, não em coleta mecânica.”

### Profissional de Educação Física
“Quando vou avaliar uma pessoa, quero rotina, histórico, objetivos, dor/limitações e experiência de treino de forma estruturada, para saber o que precisa de aprofundamento.”

## Regulatório e privacidade

- A Lei 8.234/1991 define atividades privativas dos nutricionistas, incluindo assistência/educação nutricional e, para enfermos, assistência dietoterápica com prescrição e planejamento de dietas.
- A Resolução CFN 666/2020 explicita que avaliação/diagnóstico nutricional e plano alimentar devem ser realizados pelo nutricionista, com registro adequado.
- A Resolução CONFEF 046/2002 delimita intervenção do profissional de Educação Física; documentos do CONFEF tratam treinamento, avaliação e prescrição de exercício como competências profissionais.
- A LGPD classifica dados referentes à saúde como dados pessoais sensíveis.

Por isso, a V1 **não prescreve dieta, suplemento ou treino**. Ela organiza dados, faz cálculos educacionais claramente rotulados e produz handoff.

## Score de oportunidade (0–10)

| Critério | Nota | Leitura |
|---|---:|---|
| Problema real | 8 | Coleta e organização pré-plano são recorrentes. |
| Frequência | 8 | Ocorre a cada novo acompanhamento e revisão. |
| Público potencial | 9 | Fitness, nutrição e saúde têm público amplo. |
| Pressão competitiva | 9 | Mercado muito competitivo; nota alta = pressão alta. |
| Diferenciação possível | 7 | Boa se focar contexto/handoff, fraca se virar contador genérico. |
| Valor para usuário | 8 | Reduz esquecimento e melhora clareza. |
| Valor para profissional | 8 | Pré-consulta organizada é operacionalmente útil. |
| Facilidade de aquisição | 5 | CAC pode ser difícil sem canal profissional/comunidade. |
| Viabilidade técnica | 9 | MVP local-first é simples e barato. |
| Complexidade operacional | 5 | Baixa na V1, cresce muito com prontuário/prescrição. |
| Risco regulatório | 7 | Material se entrar em prescrição automática. |
| Risco clínico | 7 | Controlável com limites e escalonamento. |
| Monetização | 7 | B2C, Pro e B2B2C são possíveis. |
| Retenção | 6 | Precisa evoluir de avaliação pontual para acompanhamento. |

## Fontes de mercado

- MyFitnessPal: https://support.myfitnesspal.com/hc/en-us/articles/34889191368077-The-difference-between-Free-Premium-and-Premium
- Fitia: https://fitia.app/features/
- Lifesum: https://lifesum.com/features/
- Hevy: https://www.hevyapp.com/features/
- ABC Trainerize: https://www.trainerize.com/features/
- Dietbox: https://dietbox.me/pt-BR
- WebDiet: https://webdiet.com.br/site/
- Nutrium: https://nutrium.com/pt-br/professionals

## Fontes regulatórias e técnicas

- Lei 8.234/1991: https://www.planalto.gov.br/ccivil_03/leis/1989_1994/l8234.htm
- LGPD: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm
- ANPD — segurança: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte
- CONFEF 046/2002: https://www.confef.org.br/confef/resolucoes/res-pdf/82.pdf
- CFN 666/2020 (DOU): https://cfn.org.br/wp-content/uploads/resolucoes/DOU_666.pdf

## Evidência de exercício relevante ao posicionamento

A atualização ACSM 2026 sintetizou 137 revisões e mais de 30 mil participantes e reforçou consistência, individualização e adequação de carga/volume ao objetivo. Para V1, isso sustenta a decisão de coletar contexto e não fingir que uma única receita serve a todos.

Fonte: https://acsm.org/resistance-training-guidelines-update-2026/
