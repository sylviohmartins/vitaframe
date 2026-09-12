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
│   ├── 8 Recuperação e comportamento alimentar
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
2. vê uma estimativa de 8–12 min e sabe que pode retomar se ativar persistência local;
3. escolhe se quer persistir localmente;
4. inicia avaliação completa ou entrevista adaptativa;
5. informa objetivo e corpo;
6. revisa saúde/red flags;
7. descreve alimentação ou constrói timeline do dia típico com busca, quantidade/frequência quando souber;
8. classifica alimentos, bebidas, refeições e contextos sociais por reconhecimento;
9. contextualiza rotina, treino, exercícios, recuperação e comportamento alimentar;
10. registra histórico de dietas/estratégias anteriores quando pertinente;
11. revisa lacunas/inconsistências;
12. abre perfil com alimentação, saúde, adesão, dados ausentes e grau de confiança;
13. opcionalmente salva snapshot, importa dados ou registra revisão profissional;
14. exporta JSON/PDF ou `.vfsecure`.

## Jornada de retorno

1. aplicação lê estado local somente após consentimento;
2. home mostra progresso e, quando há pelo menos dois snapshots comparáveis, “o que mudou”;
3. usuário continua da etapa anterior, usa entrevista adaptativa ou adiciona nova medição;
4. perfil permanece a visão consolidada atual e histórico permanece separado.

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

### Importação conflitante
```text
Valor detectado = valor atual?
├── Sim → pode permanecer selecionado para confirmação
└── Não → desmarcar por padrão
          mostrar atual × importado
          exigir escolha explícita
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
│ ...                         │
│ Restaurantes / social       │
│ Pizzaria     0 1 2 3 ?      │
└─────────────────────────────┘
```

### Mobile — dia alimentar
```text
┌─────────────────────────────┐
│ 12:30  Almoço            ↑↓×│
│ Buscar alimento             │
│ [ arroz                 ] [+]│
│ O que come/bebe              │
│ [ arroz, feijão, frango ]   │
│ Quantidade [2 colheres...]   │
│ Frequência [dias úteis...]   │
│ □ não sei a quantidade       │
└─────────────────────────────┘
```

### Desktop — avaliação
```text
┌──────────┬────────────────────────────────────┐
│ etapas   │ Etapa 8 · Recuperação             │
│ 1 ✓      │ sono / fome / comportamento       │
│ ...      │ histórico de dietas               │
│ 8 ●      │                                    │
│          │ ← Voltar     salvo      Continuar │
└──────────┴────────────────────────────────────┘
```

### Desktop — centro de dados
```text
┌─────────────────┬─────────────────────────────┐
│ contexto        │ import / conflitos /        │
│ + explicação    │ histórico / revisão /       │
│                 │ secure export / métricas    │
└─────────────────┴─────────────────────────────┘
```

## Componentes

- topbar/brand;
- primary/secondary/danger button;
- field/select/textarea;
- choice card;
- notices (`info`, `warning`, `success`, `neutral`);
- step rail e mobile progress;
- food row + rating group;
- adaptive question card;
- meal timeline card + food search;
- import conflict notice;
- history row;
- metrics tile;
- profile section/confidence/provenance;
- toast;
- encrypted import/export controls.

## Estados

Cada fluxo considera:
- vazio;
- preenchido;
- incompleto;
- sucesso/warning/erro;
- disabled;
- ausência de consentimento;
- OCR indisponível;
- dado desconhecido;
- pergunta pulada;
- importação conflitante;
- conteúdo longo e texto livre;
- ausência de histórico.

## Copy

Princípios:
- linguagem cotidiana e neutra;
- pergunta curta;
- motivo somente quando ajuda decisão;
- nunca moralizar comida/corpo;
- não usar “certo/errado” para hábitos;
- estimativa deve dizer “estimado” e explicar método/limite;
- red flag deve dizer “revisão profissional”, não diagnóstico;
- comportamento alimentar é contexto, não diagnóstico;
- botões descrevem a ação real.

## Mobile-first e matriz de dispositivos

Os fluxos críticos são automatizadamente exercitados em:
- 375×667;
- 390×844;
- 430×932;
- 360×740;
- 412×915;
- 768×1024;
- 1440×1000.

Princípios:
- controles tocáveis;
- grids colapsam para uma coluna;
- ações críticas continuam descobríveis;
- timeline não depende de drag gesture;
- rating distribui opções na largura disponível;
- nenhuma superfície crítica deve produzir overflow horizontal.

Teclado virtual, ergonomia física e tecnologias assistivas reais permanecem validação manual documentada em `ACCESSIBILITY.md`.

## Desktop

- largura máxima evita linhas extensas;
- rail de avaliação aproveita espaço lateral;
- centro de dados preserva contexto operacional;
- perfil usa grid somente onde comparação melhora leitura.

## Validação

A estrutura acima é a arquitetura V1 implementada. Usabilidade real com participantes segue `VALIDATION.md`; wireframe, heurística e automação não substituem teste de uso.