# VitaFrame — UX Architecture V1

## Sitemap

```text
Home
├── Avaliação completa
│   ├── 1 Objetivo
│   ├── 2 Corpo
│   ├── 3 Saúde
│   ├── 4 Alimentação atual
│   ├── 5 Preferências
│   ├── 6 Rotina
│   ├── 7 Treinamento
│   ├── 8 Recuperação
│   ├── 9 Revisão
│   └── 10 Perfil
├── Entrevista adaptativa
├── Meu dia alimentar
├── Centro de dados
│   ├── Revisão adaptativa
│   ├── Importação assistida
│   ├── Histórico
│   ├── Revisão profissional
│   ├── Compartilhamento protegido
│   └── Métricas locais
├── Referências
└── Privacidade
```

## Jornada principal

1. usuário entende que o produto organiza contexto e não promete prescrição;
2. escolhe se quer persistir localmente;
3. inicia avaliação completa ou entrevista adaptativa;
4. informa objetivo e corpo;
5. revisa saúde/red flags;
6. descreve alimentação ou constrói timeline do dia típico;
7. classifica alimentos por reconhecimento;
8. contextualiza rotina, treino e recuperação;
9. revisa lacunas/inconsistências;
10. abre perfil;
11. opcionalmente salva snapshot, importa dados ou registra revisão profissional;
12. exporta JSON/PDF ou `.vfsecure`.

## Jornada de retorno

1. aplicação lê estado local somente após consentimento;
2. home mostra progresso;
3. usuário continua da etapa anterior, usa entrevista adaptativa para lacunas ou adiciona nova medição ao histórico;
4. perfil permanece a visão consolidada atual; histórico permanece separado.

## Branching

### Álcool
```text
Consome álcool?
├── Não → encerrar ramo
├── Prefiro não responder → encerrar ramo
└── Sim → perguntar frequência
```

### Musculação
```text
Dias/semana?
├── 0 → não perguntar horário/experiência atual
└── >0 → horário + experiência
```

### Composição corporal
```text
Percentual de gordura informado?
├── Não → não pedir método/data
└── Sim
    ├── método/origem
    └── data
```

Perguntas puladas ficam marcadas para não reaparecer imediatamente.

## Wireframes conceituais

### Mobile — entrevista adaptativa
```text
┌─────────────────────────────┐
│ VitaFrame                 ◐ │
├─────────────────────────────┤
│ ENTREVISTA ADAPTATIVA       │
│ Só o que ainda faz          │
│ diferença.                  │
│ 4 perguntas restantes       │
│                             │
│ ┌─────────────────────────┐ │
│ │ TREINO · PRIORIDADE 2   │ │
│ │ Em qual horário você    │ │
│ │ costuma treinar?        │ │
│ │ [ 18:30              ]  │ │
│ │                         │ │
│ │ [Pular] [Salvar →]      │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### Mobile — preferências
```text
┌─────────────────────────────┐
│ Buscar alimento             │
│ [ banana, arroz, pizza... ] │
│ 0 não gosto · ... · ?       │
│                             │
│ Frutas                      │
│ Banana       0 1 2 3 ?      │
│ Maçã         0 1 2 3 ?      │
│ ...                         │
└─────────────────────────────┘
```

### Desktop — avaliação
```text
┌──────────┬────────────────────────────────────┐
│ etapas   │ Etapa 4 · Alimentação atual       │
│ 1 ✓      │                                    │
│ 2 ✓      │ [campos em grid]                  │
│ 3 ✓      │                                    │
│ 4 ●      │                                    │
│ ...      │ ← Voltar     salvo      Continuar │
└──────────┴────────────────────────────────────┘
```

### Desktop — centro de dados
```text
┌─────────────────┬─────────────────────────────┐
│ heading sticky  │ conteúdo operacional       │
│ + explicação    │ import / histórico /       │
│                 │ revisão / secure export    │
└─────────────────┴─────────────────────────────┘
```

## Componentes

- topbar/brand;
- primary/secondary/danger button;
- field/select/textarea;
- choice card;
- notices (`info`, `warning`, `success`, `neutral`);
- step rail;
- mobile progress;
- food row + rating group;
- adaptive question card;
- meal timeline card;
- history row;
- metrics tile;
- profile section;
- toast;
- encrypted import/export controls.

## Estados

Cada fluxo considera:
- vazio;
- preenchido;
- incompleto;
- loading apenas quando existe operação assíncrona local;
- sucesso;
- warning;
- erro;
- disabled;
- ausência de consentimento;
- OCR indisponível;
- dado desconhecido;
- pergunta pulada.

## Copy

Princípios:
- linguagem cotidiana;
- pergunta curta;
- motivo somente quando ajuda decisão;
- nunca moralizar comida/corpo;
- não usar “certo/errado” para hábitos;
- estimativa deve dizer “estimado”;
- red flag deve dizer “revisão profissional”, não diagnóstico;
- botões descrevem ação real.

## Mobile-first

- controles tocáveis;
- grids colapsam para uma coluna;
- navegação secundária some da topbar quando espaço é pequeno e permanece no footer;
- ações críticas ficam visíveis;
- timeline não depende de drag gesture;
- rating distribui opções na largura disponível;
- sem overflow horizontal nos viewports testados.

## Desktop

- largura máxima evita linhas extensas;
- rail de avaliação aproveita espaço lateral;
- centro de dados usa duas colunas com contexto sticky;
- perfil usa grid somente onde comparação melhora leitura.

## Validação

A estrutura acima é a arquitetura V1 implementada. Usabilidade real com participantes segue `VALIDATION.md`; wireframe conceitual/documentação não substitui teste de uso.