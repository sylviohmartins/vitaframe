# VitaFrame — Research & Opportunity Assessment

Data da revisão: 2026-09-11.

## Decisão

**GO COM AJUSTES.**

O mercado já possui soluções fortes para tracking de alimentação, treino, coaching e gestão profissional. A oportunidade mais coerente não é competir como “mais um gerador de dieta/treino”, e sim ocupar a camada de **coleta estruturada + organização de contexto + proveniência + portabilidade + handoff profissional**.

## Problema validado documentalmente

Informações úteis para decisões de saúde e treino costumam ficar espalhadas entre memória, notas, apps de tracking, exames, balanças e conversas. Usuários nem sempre sabem quais dados são relevantes; profissionais gastam tempo reconstruindo contexto; apps focados em tracking otimizam registro contínuo e softwares profissionais normalmente começam já dentro do fluxo clínico/coaching.

A oportunidade do VitaFrame é reduzir o custo cognitivo de organizar contexto **antes** de uma prescrição ou decisão profissional.

## Concorrência e adjacências

| Produto | Público / proposta | Onboarding e coleta | IA / automação | Nutrição | Treino | Acompanhamento / integrações | Modelo | Força | Lacuna relevante para VitaFrame |
|---|---|---|---|---|---|---|---|---|---|
| MyFitnessPal | consumidor final; registro nutricional | perfil e metas orientados a calorias/macros | Meal Scan usa ML/computer vision para reconhecer alimentos | tracking, banco de alimentos, macros | atividade como contexto | ecossistema de integrações | freemium/premium | escala e base alimentar | não é uma camada neutra de anamnese e handoff; foco principal é tracking |
| Fitia | consumidor final; calorie counter + meal plans | objetivo, dados pessoais, preferências e refeições | foto, voz, texto, criação de alimentos e coach por IA | planos automáticos, receitas, macros, lista de compras | fitness aparece como contexto de objetivo | Apple Health/Health Connect e progresso | freemium/premium | experiência rápida e automação | avança diretamente para recomendações/plano; VitaFrame pode diferenciar-se por proveniência, pré-avaliação e limites regulatórios |
| Nutrium | nutricionistas + clientes | avaliação profissional e app cliente | recursos de IA de apoio ao acompanhamento | avaliação, planos, receitas, diário | atividade e wearables como contexto | Google Fit/Apple Health, teleconsulta, mensagens | assinatura profissional | fluxo profissional completo | começa dentro da relação nutricionista-cliente; VitaFrame pode ser pré-consulta universal/local-first |
| WebDiet | nutricionistas | anamnese editável, questionários pré-consulta e saúde | interpretação de anamnese/PDF e apoio por IA | antropometria, exames, prescrição, metas, diário | contexto clínico e evolução | app paciente, agenda, comunicação | assinatura profissional | profundidade clínica e pré-consulta | é ferramenta do profissional; VitaFrame busca portabilidade do usuário e coleta independente do prestador |
| ABC Trainerize | personal trainers/coaches e clientes | cadastro pelo coach, metas e programa | AI Workout Builder e automação de coaching | meal tracking, meal planners, hábitos, macros | programação de treino central | Apple Watch, Garmin, Fitbit, Withings, MyFitnessPal, Zapier | assinatura B2B/profissional | ecossistema de coaching | orientado à relação coach-cliente e entrega de programa, não a um perfil universal de pré-avaliação |
| Hevy | praticantes de força | começa pelo treino/rotinas | automação limitada comparada a apps de nutrição | não é foco | registro de séries, reps, cargas, rotinas, PRs e estatísticas | mobile/desktop/wearables + social | free/pro | excelente logging de força | domínio específico; não organiza saúde, alimentação e rotina em um handoff único |

### Fontes primárias consultadas

- MyFitnessPal Meal Scan FAQ: https://support.myfitnesspal.com/hc/en-us/articles/360045761612-Meal-Scan-FAQ
- Fitia features: https://fitia.app/features/
- Fitia meal planner: https://fitia.app/help/articles/create-meal-plan-fitia/
- Nutrium professionals: https://nutrium.com/pt-br/professionals
- Nutrium client app: https://help.nutrium.com/pt-BR/articles/3372169-quais-sao-as-funcionalidades-do-aplicativo-movel-disponiveis-para-os-meus-clientes
- WebDiet funcionalidades: https://blog.webdiet.com.br/2026/05/05/software-para-nutricionistas-webdiet-principais-funcionalidades/
- ABC Trainerize features: https://www.trainerize.com/features/
- ABC Trainerize nutrition: https://www.trainerize.com/features/nutrition/
- Hevy feature guide: https://help.hevyapp.com/hc/en-us/articles/33106320824727-Everything-You-Need-to-Know-About-the-Hevy-App-2025-Features-Guide

## Leitura competitiva

### Onde o mercado é forte

- logging de refeições e calorias;
- geração de planos e receitas;
- workout tracking;
- coaching e comunicação profissional;
- prontuário e gestão de consultório;
- wearables e progress tracking.

### Onde ainda existe espaço

A combinação abaixo é menos comum como produto independente:

1. onboarding pré-profissional;
2. coleta orientada por reconhecimento, não memória espontânea;
3. proveniência explícita de dado medido/informado/estimado;
4. local-first sem necessidade de conta;
5. exportação portátil e segura;
6. motor adaptativo que encontra lacunas sem prescrever;
7. histórico independente de um prestador;
8. handoff que pode ser usado por nutricionista ou profissional de Educação Física.

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
| Concorrência | 4 | alta, sobretudo em tracking e prescrição |
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
6. preferências por reconhecimento;
7. rotina e praticidade;
8. treino e limitações;
9. sono/recuperação;
10. revisão e perfil;
11. export/import JSON e impressão/PDF;
12. persistência local opcional;
13. histórico versionado de medições;
14. importação assistida local com OCR nativo quando disponível + confirmação humana;
15. follow-ups adaptativos locais;
16. revisão profissional separada;
17. exportação criptografada local.

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