# Auditoria de perguntas e UX de respostas — VitaFrame v2

Data da auditoria: 2026-09-29  
Branch: `feat/structured-answer-ux`  
Base: `main@e89ea6e3a5dd18918d5476ca44bea911216d1790`

## Objetivo

Reduzir digitação por meio de reconhecimento e seleção, sem transformar taxonomias abertas em listas fechadas nem inferir condições clínicas. A regra adotada é: estruturar quando a resposta pode ser prevista com segurança; usar `Outro` para cauda longa; manter texto quando a informação é genuinamente aberta.

## Inventário

A varredura incluiu `app.mjs`, `prompt-compliance.mjs`, entrevista adaptativa, mapa alimentar, centro de dados, catálogos, schema local e HTML.

Contagem sem duplicar a mesma pergunta entre avaliação completa e entrevista adaptativa:

- 92 perguntas/controles de contexto fora da escala de preferências;
- 202 itens individuais do catálogo de preferências alimentares;
- total: **294 perguntas/controles de contexto do usuário**;
- 4 famílias adicionais de revisão profissional foram revisadas separadamente;
- importação de relatório, senha e arquivos criptografados são controles operacionais, não perguntas de anamnese.

Distribuição das 92 perguntas-base por domínio:
- Objetivo: 3
- Corpo: 10
- Saúde: 15
- Alimentação atual: 11
- Notas de preferências: 4
- Rotina: 12
- Treinamento: 13
- Recuperação/comportamento: 15
- Entrevista adaptativa exclusiva (álcool): 2
- Mapa alimentar: 7

Os 202 itens de preferência são gerados por `foodCatalog` e usam a mesma escala semântica.

## Classificação final

Contando as 202 preferências como perguntas de busca/catálogo:

| Classe | Definição | Quantidade |
|---|---|---:|
| A | Totalmente estruturada | 33 |
| B | Estruturada + Outro | 21 |
| C | Busca/catálogo | 205 |
| D | Estruturada + complemento opcional | 5 |
| E | Numérica/data/escala especializada | 22 |
| F | Texto livre justificado | 8 |
| **Total** |  | **294** |

### Texto livre remanescente (F) e justificativa

1. `goal.notes` — sucesso é pessoal e não possui taxonomia segura.
2. `foodNotes.mustKeep` — combinação pessoal posterior a um catálogo de 202 itens.
3. `foodNotes.avoid` — motivo e combinação podem ser arbitrários.
4. `foodNotes.controlRisk` — contexto comportamental individual; não deve ser inferido pelo catálogo.
5. `foodNotes.other` — escape explícito para alimento não catalogado.
6. `routine.workHours` — turnos, escalas quebradas e múltiplas jornadas tornam uma lista curta inadequada.
7. `routine.notes` — contexto residual depois das alternativas estruturadas.
8. `recovery.notes` — contexto residual de recuperação.

Campos clínicos de condição, medicamento e cirurgia são classificados como D: primeiro há resposta estruturada `Não / Sim / Não sei / Prefiro não informar`; texto só é solicitado quando `Sim`.

## Matriz mestra por pergunta

### Objetivo

| Pergunta/campo | Antes | Depois | Classe | Outro/estado especial | Motivo |
|---|---|---|---|---|---|
| Objetivo principal | cards | cards | A | — | conjunto pequeno e mutuamente exclusivo |
| Ritmo sustentável | select | select | A | Não sei | escala reconhecível |
| Critério pessoal de sucesso | textarea | textarea | F | — | resposta genuinamente aberta |

### Corpo

| Campo | Tipo final | Classe | Estado/Outro |
|---|---|---|---|
| idade | número | E | validação 18–100 |
| sexo para cálculo opcional | seleção | A | Prefiro não informar |
| altura | número | E | — |
| peso atual | número | E | — |
| peso habitual | número | E | — |
| cintura | número | E | — |
| gordura corporal | número | E | — |
| origem da gordura | seleção | B | Outro método + complemento |
| data da medição | data | E | — |
| peso objetivo | número | E | opcional |

### Saúde

| Pergunta | Antes | Depois | Classe |
|---|---|---|---|
| alergia | textarea | status + múltipla seleção + Outro | B |
| intolerância/desconforto | textarea | status + múltipla seleção + Outro | B |
| condição relevante | textarea | status + complemento quando Sim | D |
| medicamento regular | textarea | status + complemento quando Sim | D |
| cirurgia/histórico | textarea | status + complemento quando Sim | D |
| dor/lesão/limitação | textarea | status + regiões + Outro | B |
| alguma situação de atenção se aplica? | implícito | filtro explícito | A |
| acompanhamento médico/nutricional | checkbox | checkbox condicional | A |
| sintomas cardiovasculares no exercício | checkbox | checkbox condicional | A |
| histórico/suspeita de transtorno alimentar | checkbox | checkbox condicional | A |
| mudança rápida não intencional de peso | checkbox | checkbox condicional | A |
| gestação/amamentação | checkbox | checkbox condicional | A |
| doença renal | checkbox | checkbox condicional | A |
| medicação para diabetes | checkbox | checkbox condicional | A |
| lesão aguda/dor limitante | checkbox | checkbox condicional | A |

Estados `Não`, `Não sei` e `Prefiro não informar` permanecem distintos. A seleção não diagnostica nenhuma condição.

### Alimentação atual

As sete descrições abertas foram substituídas por reconhecimento de combinações comuns + `Outro`:
- café da manhã;
- almoço;
- lanches;
- jantar;
- ceia/madrugada;
- bebidas;
- doces/sobremesas.

Cada uma é classe B. Opções `Não costumo...` são exclusivas das demais respostas.

Outros campos:
- delivery/semana: E;
- refeições fora/semana: E;
- água/dia: E;
- mudança no fim de semana: B, com opções de horário, social, delivery, lanches, doces, álcool, menos refeições e Outro.

### Preferências alimentares

`foodCatalog` contém 202 itens. Cada item é classe C e usa reconhecimento em escala:
- não gosto;
- indiferente;
- gosto;
- gosto muito;
- não conheço.

A busca já filtra o catálogo. As quatro notas finais permanecem F porque cobrem combinações e contexto que não devem ser inferidos da escala.

### Rotina

| Pergunta | Final | Classe |
|---|---|---|
| acordar | hora | E |
| dormir | hora | E |
| trabalho/estudo | opções + Outro | B |
| horário de trabalho | texto curto | F |
| deslocamento | faixas | A |
| facilidade para cozinhar | opções | A |
| meal prep | opções | A |
| geladeira/micro-ondas | opções | A |
| orçamento | opções | A |
| número de refeições | opções | A |
| maior fome | opções + Não sei | A |
| detalhes residuais | texto | F |

### Treinamento

| Pergunta | Antes | Depois | Classe |
|---|---|---|---|
| dias de musculação | número | número | E |
| duração | número | número | E |
| intensidade | seleção | seleção | A |
| horário | hora | hora | E |
| experiência | seleção | seleção | A |
| cardio/semana | número | número | E |
| duração cardio | — | número | E |
| passos | número | número | E |
| divisão de treino | texto | opções + Outro | B |
| modalidades de cardio | textarea | múltipla seleção + Outro | B |
| outras atividades | textarea | múltipla seleção + Outro | B |
| limitações | textarea | status + regiões + Outro | B |
| exercícios praticados | textarea injetado | catálogo curto + Outro | B |

O catálogo de exercícios é deliberadamente curto e reconhecível. Ele não tenta competir com bibliotecas especializadas; `Outro` cobre variações.

### Recuperação e comportamento

| Pergunta | Final | Classe |
|---|---|---|
| horas de sono | número | E |
| qualidade do sono | opções + Não sei | A |
| estresse | opções + Prefiro não responder | A |
| hidratação | número | E |
| fome noturna | frequência + Não sei | A |
| comer por emoção/tédio | frequência + Prefiro não responder | A |
| notas residuais | texto | F |
| usa suplementos | status | B |
| tipos de suplemento | múltipla seleção + Outro | B |
| saciedade | escala | A |
| vontade de doces | frequência | A |
| beliscar sem fome | frequência + Não sei | A |
| episódios de comer muito | frequência + Prefiro não responder | A |
| restrição rígida | estado/frequência + Prefiro não responder | A |
| estratégias anteriores | múltipla seleção + Outro | B |
| barreiras de adesão | múltipla seleção + Outro | B |

### Entrevista adaptativa

Perguntas de corpo, treino e sono reutilizam os mesmos conceitos da avaliação. Os únicos conceitos exclusivos são:
- consumo atual de álcool: A;
- frequência de álcool, somente se `Sim`: A.

O branching continua evitando a pergunta de frequência quando a resposta é `Não` ou `Prefiro não responder`.

### Mapa alimentar

| Campo | Padrão | Classe |
|---|---|---|
| horário | time | E |
| nome da refeição | datalist + texto customizado | C |
| busca de alimento | catálogo + custom | C |
| alimentos da refeição | busca para reconhecimento + complemento | D |
| quantidade | sugestões de medidas + custom | D |
| frequência | datalist + custom | C |
| quantidade desconhecida | checkbox explícito | A |

## Revisão profissional e controles operacionais

A revisão profissional é separada do relato do usuário:
- tipo de revisão: B (`Outra` revela complemento);
- status: A;
- pontos a esclarecer: texto livre profissional;
- observações profissionais: texto livre profissional.

Importação de texto/OCR, arquivos e senha criptográfica não foram artificialmente convertidos em alternativas porque são controles operacionais.

## Evidência e decisões

### Alergias

- ANVISA, Perguntas e Respostas sobre Rotulagem de Alimentos Alergênicos: informa que oito grupos respondem por cerca de 90% dos casos de alergia alimentar e fundamenta a rotulagem brasileira.  
  https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/alimentos/perguntas-e-respostas/arquivos/alergenicos.pdf
- ASBAI, Alergia alimentar: destaca leite, ovo, soja, trigo, amendoim, castanhas, crustáceos e peixes como principais causas e reconhece diferenças regionais e alimentos emergentes.  
  https://asbai.org.br/
- ASBAI / Registro Brasileiro de Anafilaxia: alimentos, medicamentos e insetos aparecem entre os principais desencadeadores; látex também é reconhecido.

Decisão de UX: apresentar atalhos comuns, mas manter `Outra`; prevalência não é tratada como diagnóstico nem como lista exaustiva.

### Formulários

- GOV.UK Design System — Checkboxes: recomenda resposta explícita de “nenhum” quando a ausência precisa ser distinguida de pergunta não respondida.
- GOV.UK Design System — Radios: conditional reveal é adequado para informação relacionada, sem esconder conteúdo essencial.

Decisão: filtros binários/semânticos antes de complementos e diferenciação explícita entre `Não`, `Não sei` e `Prefiro não informar`.

### Catálogo + custom

- Apple Health permite buscar medicamento e adicionar item quando não encontrado.
- Cronometer usa pesquisa de alimentos e permite itens/refeições customizados.
- Hevy e Strong oferecem biblioteca/pesquisa de exercícios e criação de exercício customizado.

Decisão: reconhecimento primeiro, customização como escape; evitar carregar listas gigantes no formulário principal.

### Atividade física e alimentação no Brasil

- Ministério da Saúde — Guia de Atividade Física para a População Brasileira.
- Ministério da Saúde — Guia Alimentar para a População Brasileira.
- Vigitel Brasil — indicadores atuais de atividade, álcool e outros hábitos em adultos das capitais.

Essas fontes ajudam terminologia e cobertura de contexto; não são convertidas em prescrição individual.

## Modelo de dados e compatibilidade

O schema lógico passa para `meta.version = 2`, mantendo a chave local `vitaframe:v1:assessment` para localizar instalações existentes.

`migrateStructuredState`:
- não apaga campos legados;
- texto legado de taxonomia aberta vira `other + texto original`;
- não tenta adivinhar alergia, doença, medicamento ou exercício;
- migra valores simples somente quando a equivalência é objetiva;
- preserva export/import v1 e aceita v1/v2.

Exemplo:

```json
{
  "allergyStatus": "yes",
  "allergyItems": ["milk", "other"],
  "allergyOther": "texto livre preservado"
}
```

## Regras de UX

1. reconhecimento antes de lembrança;
2. `Outro` apenas em taxonomias abertas;
3. `Não`, `Não sei` e `Prefiro não informar` nunca são sinônimos;
4. texto complementar aparece somente quando relevante;
5. nenhuma lista clínica é apresentada como diagnóstico;
6. listas longas usam busca/catálogo;
7. helper text visível é preferido a tooltip para instrução essencial;
8. nenhum tooltip novo foi criado: as ambiguidades encontradas cabem melhor em helper text persistente, acessível a touch, teclado e leitor de tela.

## Limitações

Esta auditoria melhora estrutura e fricção, mas não transforma as taxonomias em instrumentos clínicos validados. Estudos de usabilidade com participantes e auditoria manual com tecnologias assistivas continuam sendo validação humana separada.
