# VitaFrame — Data Model V1

## Princípios

A V1 é local-first e sem backend, mas o modelo de dados é estruturado para evitar um JSON sem governança. Cada domínio tem responsabilidade clara, versão, origem e possibilidade de evolução.

## Entidades conceituais

### Assessment
Representa uma avaliação em andamento.

Campos principais:
- `meta.version`, `createdAt`, `updatedAt`, `lastStep`, `adaptiveSkipped`;
- `goal`;
- `body`;
- `health`;
- `currentDiet`;
- `foodPreferences`;
- `foodNotes`;
- `routine`;
- `lifestyle`;
- `training`;
- `recovery`;
- `imported`.

### BodyMeasurement
Registro temporal de composição corporal.

```json
{
  "id": "uuid/local-id",
  "recordedAt": "2026-09-11T21:00:00.000Z",
  "source": "manual|zepp-life-import|local-assisted-import|other",
  "weightKg": 89.65,
  "waistCm": null,
  "bodyFatPct": 28.2,
  "bodyFatMethod": "bioimpedance-home",
  "provenance": "measured|reported|estimated"
}
```

O histórico nunca sobrescreve silenciosamente registros anteriores. Quando um valor importado conflita com o perfil atual, a UI exige uma escolha explícita antes da substituição.

### FoodPreference
Valor normalizado por alimento ou contexto alimentar:
- `0`: não gosto;
- `1`: indiferente;
- `2`: gosto;
- `3`: gosto muito;
- `n`: não conheço.

O catálogo inclui proteínas, carboidratos, frutas, vegetais, cafés/lanches, doces, bebidas, refeições e contextos sociais/restaurantes. Itens não listados podem ser registrados em texto livre.

### MealPattern
Conjunto ordenado de refeições de um dia típico.

Cada item de `currentDiet.mealTimeline` pode conter:
- `id`;
- `label`;
- `time`;
- `foodSearch` — estado transitório da busca assistida;
- `foods` — descrição livre/itens adicionados;
- `quantity` — quantidade aproximada quando conhecida;
- `frequency` — frequência habitual quando conhecida;
- `quantityUnknown` — marcação explícita de incerteza.

A V1 permite adicionar, remover e reordenar refeições e nunca interpreta ausência de quantidade como zero.

### TrainingProfile
`training` reúne frequência, duração, intensidade, divisão, horário, experiência, cardio, passos, outras atividades, limitações e `exercises` — exercícios que a pessoa relata realizar. Isso descreve o contexto; não representa prescrição de treino.

### RecoveryAndBehavior
`recovery` reúne sono, hidratação, estresse, fome noturna, alimentação emocional e suplementos. A auditoria independente acrescentou campos explícitos para:
- `satiety`;
- `sweetCraving`;
- `snacking`;
- `overeating`;
- `restriction`;
- `dietHistory`;
- `dietExperience`.

Esses campos não diagnosticam transtornos alimentares; servem para estruturar contexto e apoiar revisão profissional quando necessário.

### ProfessionalReview
Revisão local e opcional, separada das respostas originais do usuário.

Campos:
- tipo de profissional;
- status de revisão;
- observações;
- data;
- itens a esclarecer.

### ImportedData
`imported.last` registra a última importação assistida:
- `source`;
- `recordedAt`;
- campos detectados;
- confiança do parser quando disponível.

A extração não é aplicada silenciosamente: o usuário confirma os valores e conflitos ficam desmarcados por padrão.

### ProgressSnapshot
Snapshot explícito do estado relevante para comparação longitudinal. Atualmente preserva, quando disponíveis: peso, cintura, percentual de gordura/origem/data, objetivo, dias de treino e sono.

### Consent
Consentimento local para persistência no navegador. Não equivale automaticamente a uma base legal válida para eventual produto cloud; essa decisão depende do contexto futuro de tratamento.

### LocalMetrics
Métricas de UX estritamente locais e sem conteúdo de saúde, incluindo visitas por rota/etapa, etapa máxima, visualização do perfil e timestamps abstratos.

## Proveniência

Dados e saídas devem ser distinguíveis como:
- `reported`: informado pelo usuário;
- `measured`: originado de uma medição/dispositivo;
- `estimated`: calculado por equação ou equipamento estimativo;
- `inferred`: inferência do sistema;
- `unknown`: origem não conhecida.

Nenhuma inferência ou importação deve substituir silenciosamente um dado informado. Estimativas exibidas no perfil devem apresentar, quando aplicável, origem, método, data/contexto, grau de confiança e caminho de edição.

## Persistência V1

Namespace: `vitaframe:v1:*`.

Principais registros:
- `assessment` — estado atual;
- `consent`;
- `theme`;
- `history` — snapshots longitudinais;
- `professional-review`;
- `local-metrics`.

## Versionamento

- schema atual: `v1`;
- mudanças incompatíveis exigem migração explícita;
- importações devem validar `meta.version` antes de substituir o estado;
- histórico explícito é preferido a overwrite silencioso para medições longitudinais.

## Segurança

`localStorage` não é cofre criptográfico. O uso atual reduz centralização e transmissão, mas dados exportados podem ser protegidos com o formato `.vfsecure` da V1, baseado em PBKDF2-SHA256 + AES-GCM. Uma futura arquitetura multiusuário deverá introduzir autenticação, autorização, criptografia em trânsito/repouso, auditoria, retenção e segregação.