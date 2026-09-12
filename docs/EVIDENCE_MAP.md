# VitaFrame — Evidence Map V1

Data da revisão independente: 2026-09-12.

Objetivo: ligar **cada regra material atualmente executada pelo produto** à sua natureza, fonte e limite. Este arquivo não autoriza prescrição clínica e não substitui julgamento profissional.

## Hierarquia usada

1. legislação e órgãos reguladores;
2. diretrizes governamentais/profissionais;
3. consensos e guidelines de sociedades reconhecidas;
4. revisões sistemáticas/meta-análises;
5. estudos primários quando necessários para uma fórmula ou regra específica.

## Regras ativas

| Regra / saída | Natureza | Base principal | Limite de produto |
|---|---|---|---|
| IMC = peso/altura² | cálculo descritivo | WHO Global Health Observatory — BMI: https://www.who.int/data/gho/data/themes/topics/GHO/body-mass-index | não é diagnóstico nem medida direta de composição corporal |
| TMB pela equação Mifflin–St Jeor | estimativa populacional | Mifflin et al., 1990: https://pubmed.ncbi.nlm.nih.gov/2305711/ | não é TDEE nem meta calórica |
| Distinguir dado informado/medido/estimado/inferido/desconhecido | governança/explicabilidade | LGPD + princípio de transparência; `PRIVACY.md` e `AI_GUARDRAILS.md` | confiança do dado não equivale a validade clínica |
| Percentual de gordura de balança doméstica tratado como estimativa | segurança de medição | regra conservadora de proveniência; não há interpretação clínica na V1 | acompanhar tendência sob condições semelhantes; não converter em diagnóstico |
| Prescrição dietética não automatizada | limite regulatório | Lei 8.234/1991; CFN Nota Técnica 85/2023; CRN-3 atuação profissional | V1 organiza contexto/educa, não prescreve dieta individualizada |
| Prescrição individualizada de exercício não automatizada | limite regulatório | Lei 9.696/1998; CONFEF; CREF4/SP | V1 coleta histórico/rotina/exercícios, não prescreve programa individualizado |
| Diagnóstico/tratamento médico fora do escopo | limite regulatório | Lei 12.842/2013 | red flag nunca é diagnóstico ou liberação |
| Dor no peito/desmaio durante exercício gera sinal de atenção | segurança conservadora | princípios de triagem pré-participação e necessidade de avaliação clínica diante de sintomas; CONFEF/CREF4-SP para atuação profissional | o software apenas orienta revisão profissional; não estratifica risco |
| Suspeita/histórico de transtorno alimentar interrompe automação prescritiva | segurança clínica | NICE NG69 — recognition and treatment: https://www.nice.org.uk/guidance/ng69/chapter/Recommendations | questionário não diagnostica; suspeita relevante deve ser avaliada por serviço/profissional adequado |
| Restrição rígida/episódios recorrentes de exagero são coletados sem diagnóstico | comportamento alimentar | NICE NG69 considera práticas restritivas e mudanças de comportamento alimentar no processo de identificação/avaliação | resposta isolada não confirma transtorno; serve para indicar necessidade de conversa profissional |
| Perda de peso rápida/não intencional sinaliza atenção | segurança clínica | NHS — unintentional weight loss: https://www.nhs.uk/symptoms/unintentional-weight-loss/ | não inferir causa; sugerir avaliação apropriada |
| Uso de medicação para diabetes + mudança de exercício/alimentação requer cautela | segurança clínica | ADA — Blood Glucose and Exercise: https://diabetes.org/health-wellness/fitness/blood-glucose-and-exercise | V1 não ajusta medicação, carboidrato ou dose de insulina |
| Gestação/amamentação, doença renal e lesão aguda são red flags para personalização autônoma | segurança conservadora | o produto não tenta tratamento; encaminha para avaliação individualizada compatível com o contexto | não classificar gravidade ou contraindicação absoluta |
| Atividade física geral pode ser apresentada apenas em caráter educacional | educação em saúde | Ministério da Saúde — Guia de Atividade Física para a População Brasileira; WHO Guidelines on Physical Activity | V1 não converte guia populacional em prescrição individual |
| Educação alimentar geral deve respeitar diretrizes oficiais e contexto cultural | educação em saúde | Ministério da Saúde — Guia Alimentar para a População Brasileira | não converter orientação populacional em plano terapêutico individual |
| Dados importados por OCR/padrão exigem confirmação | segurança de IA/importação | `AI_GUARDRAILS.md`; princípio de human-in-the-loop para dado sensível | OCR/pattern match é extração, não verdade clínica |
| Conflito entre valor atual e importado não é resolvido silenciosamente | governança de dados | `AI_GUARDRAILS.md` + implementação `import-conflict-guard.mjs` | usuário decide conscientemente qual referência manter |

## Fontes regulatórias brasileiras

Ver `docs/REGULATORY.md` para LGPD/ANPD, CFN/CRN, CONFEF/CREF, Ministério da Saúde e Lei do Ato Médico.

## Regras deliberadamente ausentes

A V1 não possui, portanto não precisa de regra clínica para:
- déficit calórico individual;
- meta de proteína/macronutrientes;
- prescrição de suplemento;
- seleção de exercícios, séries, repetições ou cargas;
- diagnóstico por exame laboratorial;
- dose/ajuste de medicamento;
- interpretação terapêutica de percentual de gordura;
- classificação de transtorno alimentar.

Se qualquer uma dessas capacidades for adicionada, este mapa precisa ser atualizado **antes** do merge e a revisão regulatória deve ser reaberta.
