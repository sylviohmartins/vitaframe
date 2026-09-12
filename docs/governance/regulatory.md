# VitaFrame — Regulatory & Safety Baseline — Brasil

Data da revisão independente: 2026-09-12. Documento de produto/engenharia; não substitui parecer jurídico, regulatório ou profissional.

## 1. LGPD e dados de saúde

A Lei nº 13.709/2018 classifica dados referentes à saúde como **dados pessoais sensíveis** e prevê hipóteses específicas de tratamento para essa categoria.

Fontes oficiais:
- LGPD: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm
- ANPD — perguntas frequentes: https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes/perguntas-frequentes
- ANPD — RIPD: https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-de-impacto-a-protecao-de-dados-pessoais-ripd
- ANPD — Agenda Regulatória 2025-2026: https://www.gov.br/anpd/pt-br/assuntos/regulacao/agenda-regulatoria-1

### Implicações para o VitaFrame

- finalidade deve ser explícita;
- coleta deve ser minimizada;
- dado sensível não deve aparecer em analytics genérico;
- exportação, correção e exclusão precisam ser possíveis;
- uma futura camada cloud exige definição de papéis de controlador/operador, base legal, retenção, controles de acesso, segurança e resposta a incidentes;
- tratamento automatizado, IA e dados sensíveis elevam a necessidade de avaliação de risco;
- antes de escalar para cloud/profissionais, um RIPD deve ser considerado e documentado conforme o risco concreto.

A V1 local-first reduz transmissão e centralização, mas **localStorage não é um cofre criptográfico**. A proteção adicional da exportação criptografada não transforma o navegador em prontuário clínico.

## 2. Nutrição

A profissão de nutricionista é regulamentada pela Lei nº 8.234/1991. O CFN e o sistema CFN/CRN tratam a prescrição dietética individualizada como atividade profissional regulamentada/privativa do nutricionista dentro do respectivo enquadramento.

Fontes oficiais/profissionais:
- Lei nº 8.234/1991: https://www.planalto.gov.br/ccivil_03/leis/1989_1994/l8234.htm
- CFN — Nota Técnica nº 85/2023, versão resumida: https://www.cfn.org.br/wp-content/uploads/2023/11/RESUMIDA_PRESCRI%C3%87%C3%83O-DIET%C3%89TICA.pdf
- CFN — Resolução nº 731/2022 sobre prescrição de suplementos pelo nutricionista: https://www.cfn.org.br/wp-content/uploads/resolucoes/Res_731_2022.html
- CRN-3 — dúvidas sobre atuação profissional e definição de prescrição dietética: https://www.crn3.org.br/duvidas/atuacao-profissional
- Ministério da Saúde — Guias Alimentares: https://www.gov.br/saude/pt-br/composicao/saps/promocao-da-saude/guias-alimentares
- Ministério da Saúde — Guia Alimentar para a População Brasileira: https://www.gov.br/saude/pt-br/assuntos/saude-brasil/publicacoes-para-promocao-a-saude/guia_alimentar_populacao_brasileira_2ed.pdf/view

### Implicação

A V1 pode organizar respostas, apresentar cálculos educacionais rotulados, registrar preferências e apoiar uma consulta. Ela **não deve se apresentar como nutricionista nem gerar prescrição dietética individualizada autônoma**. Conteúdo educacional geral deve ser distinguido de conduta individualizada.

## 3. Educação Física

A Lei nº 9.696/1998 regulamenta a profissão de Educação Física. O sistema CONFEF/CREF detalha competências de avaliação, orientação e prescrição de exercícios físicos.

Fontes oficiais/profissionais:
- Lei nº 9.696/1998: https://www.planalto.gov.br/ccivil_03/leis/l9696.htm
- CONFEF — resolução/orientação sobre avaliação e prescrição de exercício: https://www.confef.org.br/confefv2/includes/api/resolucoes/imprimir.php?id=473
- CONFEF — campos de intervenção/competências profissionais: https://www.confef.org.br/confefv2/includes/api/resolucoes/imprimir.php?id=573
- CREF4/SP — fiscalização: orientação e prescrição de atividade física como competência profissional: https://www.crefsp.gov.br/fiscalizacao
- CREF4/SP — Resolução nº 137/2021, competências na área da saúde: https://www.crefsp.gov.br/link/18868-Resolu%C3%A7%C3%A3o-CREF4-SP-n%C2%BA-137-2021
- Ministério da Saúde — Guia de Atividade Física para a População Brasileira: https://bvsms.saude.gov.br/ministerio-da-saude-disponibiliza-guia-de-atividade-fisica-para-a-populacao-brasileira/

### Implicação

A V1 pode organizar histórico, rotina, frequência, experiência, exercícios praticados, limitações e preferências de treino. Prescrição profissional individualizada deve respeitar o enquadramento aplicável e responsabilidade do profissional habilitado.

## 4. Medicina e encaminhamento

A Lei nº 12.842/2013 disciplina o exercício da Medicina e inclui prevenção, diagnóstico e tratamento de doenças no objeto da atuação médica, além de listar atividades privativas específicas.

Fonte oficial:
- Lei nº 12.842/2013: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12842.htm

### Implicação

O VitaFrame não realiza diagnóstico nosológico, prognóstico ou tratamento médico. Red flags devem orientar procura/revisão profissional, sem afirmar diagnóstico, gravidade ou “liberação”. Uma integração clínica futura deve ser revisada novamente à luz das normas profissionais vigentes e, quando pertinente, de orientação do CFM.

## 5. Matriz operacional de limites

| Tipo de saída | V1 pode fazer? | Regra |
|---|---|---|
| Educação geral | Sim | informação genérica, contextualizada e baseada em fonte |
| Organização de dados | Sim | preservar proveniência e permitir edição |
| Cálculo descritivo | Sim | rotular como estimativa; não transformar automaticamente em meta/prescrição |
| Identificação de lacuna/inconsistência | Sim | motor adaptativo pode pedir esclarecimento |
| Triagem de red flags | Sim, com limite | sinalizar necessidade de atenção; não diagnosticar gravidade |
| Avaliação clínica profissional | Não como IA autônoma | requer profissional e contexto apropriado |
| Recomendação educacional genérica | Sim | não individualizar como conduta clínica/prescrição |
| Plano alimentar individualizado prescritivo | Não na V1 autônoma | reservar a profissional habilitado/enquadramento jurídico aplicável |
| Prescrição de suplementos | Não na V1 autônoma | exige enquadramento profissional específico |
| Prescrição individualizada de exercício | Não na V1 autônoma | workflow deve reservar decisão ao profissional habilitado |
| Diagnóstico de doença | Não | fora de escopo |
| Tratamento de doença | Não | fora de escopo |
| Interpretação automatizada de exame como diagnóstico | Não | pode organizar valores; conclusão clínica exige profissional |

## 6. Consentimento não resolve tudo

Um checkbox de consentimento não legitima automaticamente qualquer tratamento. Em eventual produto cloud, a hipótese legal adequada precisa ser definida por operação e finalidade. Direitos do titular, transparência, minimização, segurança e prestação de contas continuam aplicáveis.

## 7. IA

A Agenda Regulatória 2025-2026 da ANPD inclui IA, tratamento de alto risco e dados de saúde entre temas relevantes. Uma futura integração de LLM/visão deve passar por revisão de:

- finalidade;
- base legal;
- transferência/compartilhamento;
- retenção pelo fornecedor;
- treinamento com dados do usuário;
- decisões automatizadas;
- explicabilidade;
- minimização;
- possibilidade de opt-out;
- risco de alucinação;
- revisão humana;
- RIPD quando adequado.

A V1 evita enviar dados de saúde a modelos externos. O OCR opcional usa apenas recurso nativo do navegador quando disponível e exige confirmação humana antes de persistir.

## 8. Segurança e incidentes

Dados de saúde possuem impacto elevado em caso de exposição. Para uma versão cloud, exigir no mínimo:

- criptografia em trânsito e repouso;
- segregação por usuário/tenant;
- MFA para profissionais quando pertinente;
- logs de auditoria sem conteúdo sensível desnecessário;
- gestão de segredo;
- princípio do menor privilégio;
- backup e restauração testados;
- plano de resposta a incidentes;
- retenção e descarte;
- revisão de fornecedores/subprocessadores.

## 9. Regra de produto

Nenhum disclaimer autoriza uma atividade que a legislação ou regulação reserve a profissional habilitado. Quando uma funcionalidade ultrapassar organização/educação e entrar em decisão clínica ou prescritiva, a arquitetura de produto deve mudar junto com responsabilidade, revisão profissional e governança.

## 10. Limite desta revisão

A matriz acima é uma baseline de produto para a V1 e não um parecer jurídico. Alterações que introduzam prescrição, teleatendimento profissional, prontuário, cobrança por atendimento, integração de exames clínicos ou IA externa exigem nova revisão regulatória específica antes do release.