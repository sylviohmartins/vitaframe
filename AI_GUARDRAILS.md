# VitaFrame — AI & Intelligence Guardrails V1

## Estado atual

A V1 **não chama modelos externos**. “Inteligência” significa regras locais explicáveis para:
- branching de perguntas;
- detecção de lacunas;
- verificações de consistência;
- parsing assistido de relatórios;
- rotulagem de estimativas;
- red flags sem diagnóstico.

Isso foi escolhido para evitar enviar dados de saúde a terceiros antes de haver arquitetura de privacidade e benefício validado.

## Regras obrigatórias

1. nunca inventar dado ausente;
2. nunca transformar inferência em fato confirmado;
3. preservar origem/data/método quando houver;
4. distinguir `reported`, `measured`, `estimated`, `inferred` e `unknown`;
5. conflito entre fontes deve ser apresentado ao usuário, não resolvido silenciosamente;
6. red flag interrompe automação prescritiva e orienta revisão profissional;
7. ausência de red flag não significa liberação clínica;
8. não diagnosticar doença ou transtorno;
9. não gerar prescrição dietética, de suplemento ou exercício na V1 autônoma;
10. texto extraído de imagem/relatório exige confirmação antes de persistir;
11. qualquer cálculo deve expor método e natureza estimativa;
12. linguagem deve ser neutra e não moralizar alimentos/corpo;
13. usuário pode editar ou apagar dados;
14. prompts/regras clínicas futuras precisam de versionamento e rastreabilidade;
15. resposta de IA futura deve citar base científica/regulatória relevante quando fizer afirmação material.

## Branching

A entrevista adaptativa usa regras determinísticas e testáveis. Exemplo:
- se `alcoholUse = no`, frequência de álcool não é perguntada;
- se `training.daysPerWeek = 0`, horário/experiência de musculação não são perguntados;
- se percentual de gordura existe sem origem, perguntar proveniência;
- pergunta pulada não reaparece imediatamente como se fosse obrigatória.

Essa lógica reduz coleta sem opacidade de modelo.

## OCR / visão

- usar `TextDetector` nativo apenas se o navegador oferecer;
- nenhuma imagem é enviada a serviço externo na V1;
- parser de texto identifica campos, mas não interpreta clinicamente resultados;
- confiança de pattern matching não equivale a certeza;
- usuário seleciona explicitamente o que será aplicado.

## Futura IA externa

Antes de integrar LLM/visão de terceiros, exigir decisão arquitetural formal sobre:
- finalidade;
- base legal;
- minimização;
- retenção pelo fornecedor;
- treinamento com dados;
- localização/transferência de dados;
- subprocessadores;
- criptografia;
- isolamento por usuário;
- avaliação de risco/RIPD quando aplicável;
- avaliação de alucinação;
- human-in-the-loop;
- possibilidade de desabilitar IA;
- logs que não exponham saúde desnecessariamente.

## Profissionais

Uma futura IA pode auxiliar um profissional com organização/sumarização, mas aprovação profissional não pode ser falsificada. `ProfessionalReview` da V1 é um registro separado; o software não preenche o campo em nome de um nutricionista, profissional de Educação Física ou médico.

## Fontes

Regras materiais devem priorizar:
1. legislação/órgão regulador;
2. diretrizes e consensos;
3. revisões sistemáticas/meta-análises;
4. estudos primários de qualidade quando necessário.

Marketing, influenciadores e blogs não devem fundamentar regra clínica.