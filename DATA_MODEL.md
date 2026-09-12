# VitaFrame — Data Model V1

## Princípios

A V1 é local-first e sem backend, mas o modelo de dados é estruturado para evitar um JSON sem governança. Cada domínio tem responsabilidade clara, versão, origem e possibilidade de evolução.

## Entidades conceituais

### Assessment
Representa uma avaliação em andamento.

Campos principais:
- `meta.version`
- `meta.createdAt`
- `meta.updatedAt`
- `meta.lastStep`
- `goal`
- `body`
- `health`
- `currentDiet`
- `foodPreferences`
- `foodNotes`
- `routine`
- `training`
- `recovery`

### BodyMeasurement
Registro temporal de composição corporal.

```json
{
  "id": "uuid/local-id",
  "recordedAt": "2026-09-11T21:00:00.000Z",
  "source": "manual|zepp-life|apple-health|other",
  "weightKg": 89.65,
  "waistCm": null,
  "bodyFatPct": 28.2,
  "bodyFatMethod": "bioimpedance-home",
  "provenance": "measured|reported|estimated"
}
```

O histórico nunca sobrescreve silenciosamente registros anteriores.

### FoodPreference
Valor normalizado por alimento:
- `0`: não gosto;
- `1`: indiferente;
- `2`: gosto;
- `3`: gosto muito;
- `n`: não conheço.

### MealPattern
Conjunto de refeições do dia típico, com ordem, horário opcional e conteúdo livre. A V1 permite representar padrões sem inferir quantidade quando o usuário não souber.

### ProfessionalReview
Revisão local e opcional, sem transformar o navegador em prontuário.

Campos:
- tipo de profissional;
- status de revisão;
- observações;
- data;
- itens a esclarecer.

### ProgressSnapshot
Snapshot explícito do estado relevante para comparação longitudinal.

### Consent
Consentimento local para persistência no navegador. Não equivale automaticamente a uma base legal válida para eventual produto cloud; essa decisão depende do contexto futuro de tratamento.

### LocalMetrics
Métricas de UX estritamente locais e sem conteúdo de saúde, como:
- data de início;
- data da última atualização;
- etapa atual;
- número de snapshots;
- completude.

## Proveniência

Dados derivados devem ser marcados como:
- `reported`: informado pelo usuário;
- `measured`: originado de uma medição/dispositivo;
- `estimated`: calculado por equação ou equipamento estimativo;
- `inferred`: inferência do sistema;
- `unknown`: origem não conhecida.

Nenhuma inferência deve substituir silenciosamente um dado informado.

## Versionamento

- schema atual: `v1`;
- chaves de armazenamento usam namespace `vitaframe:v1:*`;
- mudanças incompatíveis exigem migração explícita;
- importações devem validar `meta.version` antes de substituir o estado.

## Segurança

`localStorage` não é cofre criptográfico. O uso atual reduz centralização e transmissão, mas dados exportados podem ser protegidos com o formato criptografado local da V1. Uma futura arquitetura multiusuário deverá introduzir autenticação, autorização, criptografia em trânsito/repouso, auditoria, retenção e segregação.