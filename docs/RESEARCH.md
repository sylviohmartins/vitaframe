# VitaFrame — Research & Opportunity Assessment

Data da revisão: 2026-09-11.

## Decisão

**GO COM AJUSTES.**

O mercado já possui soluções fortes para registro de alimentação, treino e gestão profissional. A oportunidade mais coerente não é competir como “mais um gerador de dieta/treino”, e sim ocupar a camada de **coleta estruturada + organização de contexto + portabilidade + handoff profissional**.

## Problema validado

Informações úteis para decisões de saúde e treino costumam ficar espalhadas entre memória, notas, apps de tracking, exames, balanças e conversas. Usuários nem sempre sabem quais dados são relevantes; profissionais gastam tempo reconstruindo contexto; apps focados em tracking tendem a otimizar registro contínuo, e softwares profissionais tendem a iniciar já dentro do fluxo clínico/coaching.

## Mercado observado

| Produto / categoria | Força principal | Lacuna que VitaFrame explora |
|---|---|---|
| MyFitnessPal | tracking nutricional, base ampla e recursos de IA | forte em registro/calorias; não é uma camada neutra de anamnese/handoff |
| Nutrium | gestão, avaliação e planejamento para nutricionistas | excelente lado profissional; VitaFrame V1 foca pré-avaliação local e portátil do usuário |
| ABC Trainerize | fitness, nutrição, hábitos e acompanhamento para coaches | orientado ao relacionamento coach-cliente; não prioriza um perfil local-first universal |
| Hevy e trackers de treino | registro e progresso de musculação | treino é um domínio específico, não contexto integrado de saúde/rotina/alimentação |
| apps de dieta com IA | recomendações e automação | risco de comoditização e maior exposição regulatória/segurança quando avançam para prescrição |

Fontes primárias/atuais consultadas:

- MyFitnessPal: https://www.myfitnesspal.com/
- Nutrium para profissionais: https://nutrium.com/pt-br/professionals
- ABC Trainerize: https://www.trainerize.com/

## Jobs to be Done

### Usuário

- “Quero organizar tudo que é relevante sem precisar saber previamente o que perguntar.”
- “Quero responder de forma simples, inclusive por reconhecimento de alimentos.”
- “Quero distinguir o que medi do que foi estimado.”
- “Quero levar um resumo melhor para um profissional sem recontar tudo do zero.”
- “Quero controlar meus dados e conseguir exportá-los.”

### Profissional

- “Quero receber contexto prévio estruturado e identificar rapidamente lacunas, preferências, rotina e sinais de atenção.”
- “Quero que o sistema não invente conclusões clínicas nem esconda origem do dado.”

## Opportunity score (0–10)

| Critério | Nota | Leitura |
|---|---:|---|
| Problema real | 8 | fragmentação e baixa qualidade de anamnese são plausíveis e recorrentes |
| Frequência | 7 | especialmente relevante em início de acompanhamento ou mudança de objetivo |
| Público potencial | 8 | fitness/nutrição têm público amplo |
| Concorrência | 4 | alta; reduz atratividade de um app genérico |
| Diferenciação possível | 8 | local-first + anamnese inteligente + proveniência + handoff é combinação menos comum |
| Valor para usuário | 8 | organização e portabilidade são tangíveis |
| Valor para profissional | 7 | pode reduzir coleta repetitiva se a informação for de qualidade |
| Aquisição | 5 | mercado ruidoso; exige posicionamento claro |
| Viabilidade técnica | 9 | V1 estática é simples |
| Complexidade operacional | 8 | baixa na V1 local-first; sobe muito com cloud/profissionais |
| Risco regulatório | 5 | administrável se não houver prescrição/diagnóstico automático |
| Risco clínico | 6 | reduzido por limites explícitos e red flags |
| Monetização | 6 | ainda precisa validação real de disposição a pagar |
| Retenção | 5 | anamnese é episódica; retenção futura depende de acompanhamento/histórico |

## Diferencial recomendado

> **VitaFrame transforma informações dispersas sobre corpo, alimentação, rotina e treino em um perfil estruturado, transparente e portátil — antes de qualquer plano.**

A V1 deve provar qualidade da coleta, experiência e utilidade do resultado. Prescrição autônoma não faz parte do escopo.

## MVP aprovado

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
12. persistência local opcional.

## Hipóteses ainda não validadas por pesquisa com usuários

A investigação documental não substitui entrevistas e testes reais. Antes de produto comercial, validar pelo menos:

- tempo aceitável para preencher;
- utilidade percebida do relatório por nutricionistas e profissionais de Educação Física;
- disposição a retornar para atualizar dados;
- disposição a pagar;
- impacto real do catálogo de preferências na taxa de conclusão;
- quais dados profissionais consideram essenciais versus ruído.
