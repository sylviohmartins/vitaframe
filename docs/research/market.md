# VitaFrame — Research & Opportunity Assessment

Data da revisão independente: 2026-09-12.

## Decisão

**GO COM AJUSTES.**

O mercado já possui soluções fortes para tracking de alimentação, treino, coaching, dados de saúde e gestão profissional. A oportunidade mais coerente não é competir como “mais um gerador de dieta/treino”, e sim ocupar a camada de **coleta estruturada + organização de contexto + proveniência + portabilidade + handoff profissional**.

## Problema validado documentalmente

Informações úteis para decisões de saúde e treino costumam ficar espalhadas entre memória, notas, apps de tracking, exames, balanças e conversas. Usuários nem sempre sabem quais dados são relevantes; profissionais gastam tempo reconstruindo contexto; apps focados em tracking otimizam registro contínuo e softwares profissionais normalmente começam já dentro do fluxo clínico/coaching.

A oportunidade do VitaFrame é reduzir o custo cognitivo de organizar contexto **antes** de uma prescrição ou decisão profissional. Essa conclusão é uma hipótese de produto sustentada por pesquisa documental; validação comportamental ainda depende dos participantes definidos em `VALIDATION.md`.

## Landscape pesquisado

A pesquisa não foi limitada a “apps de dieta”. Foram confrontadas as seguintes categorias:

| Categoria | Exemplos observados | O que resolvem bem | Lacuna para a tese VitaFrame |
|---|---|---|---|
| Dieta / calorie tracking | MyFitnessPal, Fitia | logging, macros, refeições, metas | intake transversal e portável antes de um plano |
| Software para nutricionistas | Nutrium, WebDiet, Dietbox | anamnese profissional, prescrição, evolução, comunicação | coleta independente do prestador e controle local do usuário |
| Personal trainer / health coaching | ABC Trainerize | programa, hábitos, coaching, integrações | perfil neutro anterior à relação coach-cliente |
| Musculação / workout logging | Hevy | séries, cargas, PRs e histórico de treino | saúde, alimentação, rotina e handoff interdisciplinar |
| Fitness/health data hubs | Apple Saúde, Garmin Connect | consolidação de sensores, atividade, sono e tendências | contexto qualitativo, preferências e preparação de consulta |
| Peso / composição corporal | apps de balanças e ecossistemas conectados | séries temporais de peso/composição | proveniência + contexto comportamental e profissional |
| Formulários/anamnese | módulos de WebDiet, Dietbox e Nutrium | coleta pré-consulta no ecossistema profissional | experiência universal/local-first reutilizável entre profissionais |

Apple Saúde é uma referência adjacente importante porque organiza, no dispositivo e com controles de privacidade, dados vindos do iPhone, Apple Watch, apps e dispositivos compatíveis. Garmin Connect é referência de acompanhamento longitudinal de saúde/atividade e análise de treino. Esses produtos reforçam que a oportunidade do VitaFrame não é “possuir todos os dados”, mas estruturar **contexto humano que trackers não capturam bem**.

## Concorrência e adjacências — matriz funcional

| Produto | Público / proposta | Onboarding e coleta | Personalização | IA / automação | Nutrição | Treino | Acompanhamento / integrações | Modelo | Força | Limitação / diferencial VitaFrame |
|---|---|---|---|---|---|---|---|---|---|---|
| MyFitnessPal | consumidor final; registro nutricional | perfil e metas orientados a calorias/macros | metas, alimentos, diário | Meal Scan com ML/computer vision | tracking, banco de alimentos, macros | atividade como contexto | ecossistema de integrações | freemium/premium | escala e base alimentar | foco em tracking; não é camada neutra de anamnese/handoff |
| Fitia | consumidor final; calorie counter + meal plans | objetivo, dados pessoais, preferências e refeições | metas, refeições e preferências | foto, voz, texto e coach/automação | planos automáticos, receitas, macros, lista de compras | fitness como contexto do objetivo | Apple Health/Health Connect e progresso | freemium/premium | velocidade e automação | avança para recomendação/plano; VitaFrame prioriza proveniência e pré-avaliação |
| Nutrium | nutricionistas + clientes | avaliação profissional e app cliente | workflow e plano definidos pelo profissional | IA de apoio ao acompanhamento | avaliação, plano, receitas, diário | atividade/wearables como contexto | Google Fit/Apple Health, teleconsulta, mensagens | assinatura profissional | fluxo profissional completo | começa dentro da relação nutricionista-cliente |
| WebDiet | nutricionistas | anamnese editável, questionários pré-consulta e saúde | formulários e atendimento configuráveis | apoio de IA e interpretação assistida | antropometria, exames, prescrição, metas, diário | contexto clínico e evolução | app paciente, agenda, comunicação | assinatura profissional | profundidade clínica | ferramenta do profissional; VitaFrame busca portabilidade do usuário |
| Dietbox | nutricionistas + pacientes | questionário pré-consulta, recordatório e anamnese | atendimento, metas e materiais pelo profissional | Assistente Dietbox e automações do consultório | planos, antropometria, diário, suplementos/fitoterápicos no contexto profissional | não é foco central | app paciente, WhatsApp, agenda, vídeo/chat | assinatura profissional | ecossistema brasileiro maduro | dependência da relação profissional; VitaFrame atua antes do consultório |
| ABC Trainerize | personal trainers/coaches + clientes | cadastro pelo coach, metas e programa | programas, hábitos e coaching configuráveis | AI Workout Builder e automações | meal tracking/planners, hábitos, macros | programação de treino central | Apple Watch, Garmin, Fitbit, Withings, MyFitnessPal, Zapier | assinatura B2B | ecossistema de coaching | orientado à entrega de programa, não perfil universal pré-avaliação |
| Hevy | praticantes de força | começa pelo treino/rotinas | rotinas e exercícios do usuário | automação limitada | não é foco | séries, reps, cargas, rotinas, PRs e estatísticas | mobile/desktop/wearables + social | free/pro | logging de força | domínio específico; não integra saúde/alimentação/rotina em handoff |
| Apple Saúde | usuário de ecossistema Apple | consolidação automática/manual de categorias de saúde | usuário escolhe fontes/categorias e compartilhamento | tendências e insights do sistema | registra categorias; não substitui planejamento nutricional | atividade/mobilidade/treino via ecossistema | iPhone, iPad, Apple Watch e apps/dispositivos compatíveis | incluído no ecossistema | privacidade e consolidação longitudinal | ótimo data hub, mas não conduz anamnese comportamental/profissional |
| Garmin Connect | usuários Garmin e atletas/praticantes | dados de dispositivo + perfil/atividade | painéis e métricas de treino | insights/análises conforme recursos do produto | recursos de nutrição aparecem em ofertas recentes, mas não são o núcleo histórico | forte em treino, carga e atividade | dispositivos Garmin e ecossistema Connect | free + recursos premium/Connect+ conforme oferta | profundidade longitudinal de fitness | tracker/analytics, não intake interdisciplinar e portável |

## Experiência mobile e qualidade visual — auditoria heurística

Esta seção é **avaliação de produto**, não afirmação oficial dos fornecedores. Ela existe porque o prompt exige observar experiência mobile e qualidade visual.

| Produto | Experiência mobile | Leitura visual/UX | Aprendizado para VitaFrame |
|---|---|---|---|
| MyFitnessPal | app maduro, orientado a registro frequente | alta densidade de informação e foco funcional | reduzir densidade no onboarding e explicar por que cada pergunta existe |
| Fitia | onboarding consumer/mobile-first | visual contemporâneo e fluxo rápido | usar progressive disclosure sem transformar intake em “mágica” opaca |
| Nutrium | app cliente + ambiente profissional | separação clara entre experiência do paciente e console profissional | preservar modos distintos usuário/profissional |
| WebDiet | app paciente + software profissional | prioriza operação clínica e produtividade | VitaFrame deve parecer produto do usuário, não prontuário SaaS |
| Dietbox | app dedicado ao paciente e ferramentas profissionais | experiência orientada ao relacionamento com nutricionista | handoff é valor, mas independência do prestador é diferencial |
| Trainerize | forte uso mobile por coach/cliente | UX orientada a tarefas, hábitos e programas | evitar dashboard excessivo antes de existir um plano |
| Hevy | mobile centrado em treino | interface específica e direta para logging | superfícies especializadas funcionam melhor que uma tela “faz tudo” |
| Apple Saúde | profundamente mobile e integrada ao sistema | hierarquia, privacidade, tendências e explicações contextuais | referência de proveniência, tendências e controle do usuário sem copiar identidade |
| Garmin Connect | app de alta densidade de métricas | dashboards e séries temporais para usuário recorrente | gráficos só quando melhoram interpretação longitudinal |

## Fontes primárias consultadas

- MyFitnessPal Meal Scan FAQ: https://support.myfitnesspal.com/hc/en-us/articles/360045761612-Meal-Scan-FAQ
- Fitia features: https://fitia.app/features/
- Fitia meal planner: https://fitia.app/help/articles/create-meal-plan-fitia/
- Nutrium professionals: https://nutrium.com/pt-br/professionals
- Nutrium client app: https://help.nutrium.com/pt-BR/articles/3372169-quais-sao-as-funcionalidades-do-aplicativo-movel-disponiveis-para-os-meus-clientes
- WebDiet funcionalidades: https://blog.webdiet.com.br/2026/05/05/software-para-nutricionistas-webdiet-principais-funcionalidades/
- Dietbox plataforma: https://dietbox.me/pt-BR
- Dietbox app do paciente: https://dietbox.me/pt-BR/Download
- ABC Trainerize features: https://www.trainerize.com/features/
- ABC Trainerize nutrition: https://www.trainerize.com/features/nutrition/
- Hevy feature guide: https://help.hevyapp.com/hc/en-us/articles/33106320824727-Everything-You-Need-to-Know-About-the-Hevy-App-2025-Features-Guide
- Apple Saúde: https://www.apple.com/br/health/
- Apple Support — uso e fontes de dados do app Saúde: https://support.apple.com/pt-br/104997
- Garmin Connect — health/wellness tracking: https://www.garmin.com/en-US/blog/fitness/unlocking-the-potential-of-garmin-connect/

## Leitura competitiva

### Onde o mercado é forte

- logging de refeições e calorias;
- geração de planos e receitas;
- workout tracking;
- coaching e comunicação profissional;
- prontuário e gestão de consultório;
- wearables, sensores e progress tracking;
- dashboards longitudinais de saúde/fitness.

### Onde ainda existe espaço

A combinação abaixo é menos comum como produto independente:

1. onboarding pré-profissional;
2. coleta orientada por reconhecimento, não memória espontânea;
3. proveniência explícita de dado medido/informado/estimado;
4. local-first sem necessidade de conta;
5. exportação portátil e segura;
6. motor adaptativo que encontra lacunas sem prescrever;
7. histórico independente de um prestador;
8. handoff que pode ser usado por nutricionista ou profissional de Educação Física;
9. integração, em um único perfil, de comportamento, rotina, alimentação, treino e contexto corporal.

Isso não significa ausência de concorrência indireta. Significa que a diferenciação depende de excelência de UX, confiança e interoperabilidade — não de “ter IA”.

## Jobs to be Done refinados

### Usuário

- “Quero organizar tudo que é relevante sem precisar saber previamente o que perguntar.”
- “Quero responder por reconhecimento de opções quando minha memória espontânea falha.”
- “Quero distinguir o que medi do que foi estimado.”
- “Quero interromper e retomar sem criar conta.”
- “Quero levar um resumo melhor para um profissional sem recontar tudo do zero.”
- “Quero acompanhar medições ao longo do tempo sem ficar preso a um prestador.”
- “Quero compartilhar meus dados de forma controlada.”

### Nutricionista

- “Quero receber contexto prévio estruturado e identificar rapidamente lacunas, preferências, rotina e sinais de atenção.”
- “Quero saber a origem do dado e não receber conclusões clínicas inventadas.”

### Profissional de Educação Física

- “Quero compreender experiência, objetivos, rotina, limitações e histórico antes de planejar ou ajustar o treinamento.”

## Opportunity score (0–10)

| Critério | Nota | Leitura |
|---|---:|---|
| Problema real | 8 | fragmentação e baixa qualidade de contexto são recorrentes |
| Frequência | 7 | forte no início de acompanhamento, mudança de objetivo e troca de profissional |
| Público potencial | 8 | nutrição/fitness têm mercado amplo |
| Concorrência | 4 | alta, sobretudo em tracking, gestão e prescrição |
| Diferenciação possível | 8 | local-first + proveniência + reconhecimento + handoff é combinação menos comum |
| Valor para usuário | 8 | organização, portabilidade e controle são tangíveis |
| Valor para profissionais | 7 | pode reduzir coleta repetitiva se o relatório tiver alta qualidade |
| Aquisição | 5 | mercado ruidoso e CAC pode ser alto |
| Viabilidade técnica | 9 | V1 estática/local-first é simples |
| Complexidade operacional | 8 | baixa sem backend; cresce muito com cloud e profissionais |
| Risco regulatório | 5 | administrável enquanto não houver prescrição/diagnóstico automático |
| Risco clínico | 6 | reduzido por limites explícitos, proveniência e red flags |
| Monetização | 6 | plausível, porém não validada com disposição a pagar real |
| Retenção | 6 | histórico e atualização aumentam recorrência, mas anamnese isolada é episódica |

## Posicionamento recomendado

> **VitaFrame transforma informações dispersas sobre corpo, alimentação, rotina e treino em um perfil estruturado, transparente, versionado e portátil — antes de qualquer plano.**

A V1 deve provar qualidade da coleta, experiência e utilidade do resultado. Prescrição autônoma não é o diferencial recomendado.

## Produto em camadas

1. **Coleta estruturada** — objetivo, corpo, saúde, alimentação, preferências, rotina, treino e recuperação.
2. **Organização e qualidade de dados** — proveniência, inconsistências, lacunas e histórico.
3. **Insights educacionais** — cálculos claramente rotulados e contextualizados.
4. **Assistência local** — follow-ups adaptativos determinísticos; IA externa fica condicionada a arquitetura de privacidade.
5. **Revisão profissional** — handoff e observações separadas do relato original.
6. **Plano profissional** — somente em futura camada compatível com enquadramento regulatório e responsabilidade profissional.

## MVP/V1 aprovado

1. onboarding e privacidade;
2. objetivo;
3. corpo e composição com proveniência;
4. saúde e red flags;
5. alimentação atual;
6. preferências por reconhecimento, incluindo contextos sociais/restaurantes;
7. rotina, praticidade e orçamento;
8. treino, exercícios e limitações;
9. sono, recuperação e comportamento alimentar;
10. histórico de dietas/estratégias anteriores;
11. revisão e perfil com alimentação, saúde, adesão, lacunas e confiança;
12. export/import JSON e impressão/PDF;
13. persistência local opcional;
14. histórico versionado de medições;
15. importação assistida local com OCR nativo quando disponível + confirmação humana;
16. follow-ups adaptativos locais;
17. revisão profissional separada;
18. exportação criptografada local.

## Monetização — hipóteses

### B2C freemium
- gratuito: avaliação, perfil, histórico curto e export;
- premium: histórico ampliado, integrações, relatórios avançados e IA privacy-preserving.

Risco: disposição a pagar pode ser baixa para uma ferramenta episódica.

### B2B profissional
- assinatura para nutricionistas/trainers com formulários customizados, intake e portal profissional.

Vantagem: problema operacional e ROI são mais fáceis de demonstrar.

### B2B2C / clínicas e academias
- intake padronizado antes da primeira consulta/avaliação;
- marca branca e integração via API.

Maior potencial de receita, porém maior complexidade de LGPD, suporte e integrações.

### Recomendação

Validar B2B/B2B2C cedo. O valor econômico de reduzir tempo de intake é mais mensurável que cobrar diretamente do usuário por uma anamnese isolada.

## Hipóteses ainda não validadas com participantes reais

A investigação documental não substitui entrevistas e testes reais. Antes de produto comercial, validar:

- tempo aceitável para preencher;
- taxa real de abandono;
- utilidade percebida do relatório por nutricionistas e profissionais de Educação Física;
- disposição a retornar para atualizar dados;
- disposição a pagar;
- impacto do catálogo de preferências na conclusão;
- quais dados profissionais consideram essenciais versus ruído.

O protocolo está documentado em `VALIDATION.md`. Nenhum resultado de pesquisa com pessoas deve ser inventado.