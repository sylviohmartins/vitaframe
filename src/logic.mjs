export function toNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const normalized = String(value).replace(',', '.').trim();
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function calculateBMI(weightKg, heightCm) {
  const weight = toNumber(weightKg);
  const height = toNumber(heightCm);
  if (!weight || !height || weight <= 0 || height <= 0) return null;
  const meters = height / 100;
  return weight / (meters * meters);
}

export function calculateBMR({ sex, age, weightKg, heightCm }) {
  const ageNumber = toNumber(age);
  const weight = toNumber(weightKg);
  const height = toNumber(heightCm);
  if (!ageNumber || !weight || !height || ageNumber <= 0 || weight <= 0 || height <= 0) return null;
  if (sex !== 'male' && sex !== 'female') return null;
  const base = 10 * weight + 6.25 * height - 5 * ageNumber;
  return sex === 'male' ? base + 5 : base - 161;
}

export function estimateFatMass(weightKg, bodyFatPct) {
  const weight = toNumber(weightKg);
  const fat = toNumber(bodyFatPct);
  if (!weight || fat === null || fat < 0 || fat > 75) return null;
  return weight * fat / 100;
}

export function estimateLeanMass(weightKg, bodyFatPct) {
  const weight = toNumber(weightKg);
  const fatMass = estimateFatMass(weightKg, bodyFatPct);
  if (!weight || fatMass === null) return null;
  return weight - fatMass;
}

export function dataQualityIssues(state) {
  const issues = [];
  const age = toNumber(state?.body?.age);
  const weight = toNumber(state?.body?.weightKg);
  const height = toNumber(state?.body?.heightCm);
  const fat = toNumber(state?.body?.bodyFatPct);

  if (age !== null && (age < 18 || age > 100)) issues.push('idade-fora-do-escopo');
  if (weight !== null && (weight < 30 || weight > 300)) issues.push('peso-improvavel');
  if (height !== null && (height < 120 || height > 230)) issues.push('altura-improvavel');
  if (fat !== null && (fat < 3 || fat > 70)) issues.push('gordura-improvavel');
  return issues;
}

export function redFlags(state) {
  const health = state?.health ?? {};
  const flags = [];
  const map = [
    ['medicalFollowup', 'Você informou uma condição que exige acompanhamento médico ou nutricional.'],
    ['chestPain', 'Dor no peito, desmaio ou sintoma cardiovascular durante exercício merece avaliação profissional antes de intensificar treino.'],
    ['eatingDisorder', 'Histórico ou suspeita de transtorno alimentar exige abordagem profissional especializada.'],
    ['rapidWeightChange', 'Mudança de peso rápida e não intencional merece investigação profissional.'],
    ['pregnancy', 'Gestação ou amamentação exige planejamento individualizado com profissional habilitado.'],
    ['kidneyDisease', 'Doença renal pode alterar necessidades nutricionais e exige orientação profissional.'],
    ['diabetesMedication', 'Uso de medicação para diabetes exige cuidado profissional ao alterar alimentação ou exercício.'],
    ['acuteInjury', 'Dor ou lesão aguda importante deve ser avaliada antes de modificar carga de treinamento.']
  ];
  for (const [key, message] of map) {
    if (health[key] === true) flags.push({ key, message });
  }
  return flags;
}

export function preferenceStats(preferences = {}) {
  const values = Object.values(preferences);
  const numeric = values.filter(value => Number.isInteger(value));
  return {
    rated: values.length,
    liked: numeric.filter(value => value >= 2).length,
    loved: numeric.filter(value => value === 3).length,
    disliked: numeric.filter(value => value === 0).length,
    unknown: values.filter(value => value === 'n').length
  };
}

export function completeness(state) {
  const checks = [
    Boolean(state?.goal?.primary),
    Boolean(toNumber(state?.body?.age)),
    Boolean(toNumber(state?.body?.heightCm)),
    Boolean(toNumber(state?.body?.weightKg)),
    Boolean(state?.health?.answered),
    Boolean(state?.currentDiet?.answered),
    preferenceStats(state?.foodPreferences).rated >= 10,
    Boolean(state?.routine?.answered),
    Boolean(state?.training?.answered),
    Boolean(state?.recovery?.answered)
  ];
  const completed = checks.filter(Boolean).length;
  return { completed, total: checks.length, percent: Math.round((completed / checks.length) * 100) };
}

export function deriveInsights(state) {
  const insights = [];
  const bmi = calculateBMI(state?.body?.weightKg, state?.body?.heightCm);
  const bmr = calculateBMR({
    sex: state?.body?.sex,
    age: state?.body?.age,
    weightKg: state?.body?.weightKg,
    heightCm: state?.body?.heightCm
  });
  const stats = preferenceStats(state?.foodPreferences);
  const flags = redFlags(state);

  if (bmi) {
    insights.push({
      type: 'estimate',
      title: 'IMC estimado',
      value: bmi.toFixed(1),
      detail: 'É uma triagem populacional e não descreve sozinho composição corporal ou saúde individual.'
    });
  }
  if (bmr) {
    insights.push({
      type: 'estimate',
      title: 'Metabolismo basal estimado',
      value: `${Math.round(bmr)} kcal/dia`,
      detail: 'Estimativa pela equação de Mifflin-St Jeor. Não é meta calórica nem gasto total diário.'
    });
  }
  if (stats.rated) {
    insights.push({
      type: 'reported',
      title: 'Preferências mapeadas',
      value: `${stats.rated} itens`,
      detail: `${stats.loved} marcados como “gosto muito” e ${stats.disliked} como “não gosto”.`
    });
  }
  if (flags.length) {
    insights.push({
      type: 'attention',
      title: 'Revisão profissional recomendada',
      value: `${flags.length} alerta${flags.length > 1 ? 's' : ''}`,
      detail: 'O VitaFrame não interpreta clinicamente esses itens; eles apenas indicam que planejamento autônomo pode não ser apropriado.'
    });
  }
  return insights;
}

export function safeExport(state) {
  const clone = JSON.parse(JSON.stringify(state ?? {}));
  clone.meta = {
    ...(clone.meta ?? {}),
    exportedAt: new Date().toISOString(),
    format: 'vitaframe-v1'
  };
  return clone;
}
