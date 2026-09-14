const numberFrom = value => {
  if (value == null || value === '') return null;
  const parsed = Number(String(value).replace(',', '.').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
};

export function parseImportedHealthText(input = '') {
  const text = String(input).replace(/\u00a0/g, ' ').replace(/\r/g, '\n');
  const rules = [
    { key: 'weightKg', label: 'Peso', unit: 'kg', rx: /(?:peso|weight)\s*[:\-]?\s*(\d{2,3}(?:[.,]\d{1,2})?)\s*kg\b/i },
    { key: 'bmi', label: 'IMC', unit: '', rx: /(?:imc|bmi)\s*[:\-]?\s*(\d{1,2}(?:[.,]\d{1,2})?)/i },
    { key: 'bodyFatPct', label: 'Gordura corporal', unit: '%', rx: /(?:gordura\s*corporal|body\s*fat)\s*[:\-]?\s*(\d{1,2}(?:[.,]\d{1,2})?)\s*%?/i },
    { key: 'waterPct', label: 'Água corporal', unit: '%', rx: /(?:água|agua|body\s*water)\s*[:\-]?\s*(\d{1,2}(?:[.,]\d{1,2})?)\s*%?/i },
    { key: 'bmrKcal', label: 'Metabolismo basal', unit: 'kcal', rx: /(?:metabolismo\s*basal|bmr|basal\s*metabolism)\s*[:\-]?\s*(\d{3,4})\s*(?:kcal)?/i },
    { key: 'visceralFat', label: 'Gordura visceral', unit: '', rx: /(?:gordura\s*visceral|visceral\s*fat)\s*[:\-]?\s*(\d{1,2}(?:[.,]\d)?)/i },
    { key: 'muscleKg', label: 'Músculo', unit: 'kg', rx: /(?:músculo|musculo|muscle(?:\s*mass)?)\s*[:\-]?\s*(\d{1,3}(?:[.,]\d{1,2})?)\s*kg\b/i },
    { key: 'proteinPct', label: 'Proteína corporal', unit: '%', rx: /(?:proteína|proteina|protein)\s*[:\-]?\s*(\d{1,2}(?:[.,]\d{1,2})?)\s*%/i },
    { key: 'boneMassKg', label: 'Massa óssea', unit: 'kg', rx: /(?:massa\s*[óo]ssea|bone\s*mass)\s*[:\-]?\s*(\d{1,2}(?:[.,]\d{1,2})?)\s*kg\b/i }
  ];

  return rules.flatMap(rule => {
    const match = text.match(rule.rx);
    if (!match) return [];
    const value = numberFrom(match[1]);
    if (value == null) return [];
    return [{ key: rule.key, label: rule.label, value, unit: rule.unit, confidence: 'pattern-match' }];
  });
}

export function applyDetectedValues(state, detected = [], source = 'imported-text', recordedAt = '') {
  const next = structuredClone(state);
  next.body ??= {};
  next.imported ??= {};
  next.imported.last = { source, recordedAt: recordedAt || new Date().toISOString(), detected: structuredClone(detected) };

  for (const item of detected) {
    if (item.key === 'weightKg') next.body.weightKg = String(item.value);
    if (item.key === 'bodyFatPct') {
      next.body.bodyFatPct = String(item.value);
      next.body.bodyFatSource = source.includes('zepp') ? 'bioimpedance-home' : (next.body.bodyFatSource || 'other');
      if (recordedAt) next.body.bodyFatDate = recordedAt.slice(0, 10);
    }
  }
  return next;
}

export function adaptiveFollowUps(state = {}) {
  const body = state.body ?? {};
  const health = state.health ?? {};
  const diet = state.currentDiet ?? {};
  const routine = state.routine ?? {};
  const training = state.training ?? {};
  const recovery = state.recovery ?? {};
  const items = [];

  if (!body.weightKg) items.push({ domain: 'Corpo', priority: 1, question: 'Qual é o seu peso atual?', reason: 'Peso é necessário para contextualizar tendências e cálculos opcionais.' });
  if (!body.heightCm) items.push({ domain: 'Corpo', priority: 1, question: 'Qual é a sua altura?', reason: 'Altura permite interpretar o peso sem tratá-lo isoladamente.' });
  if (body.bodyFatPct && !body.bodyFatSource) items.push({ domain: 'Corpo', priority: 1, question: 'De onde veio a estimativa de gordura corporal?', reason: 'A proveniência muda o grau de confiança do valor.' });
  if (body.bodyFatPct && !body.bodyFatDate) items.push({ domain: 'Corpo', priority: 2, question: 'Quando essa estimativa de gordura corporal foi medida?', reason: 'Sem data, uma medição perde valor longitudinal.' });
  if (!health.answered) items.push({ domain: 'Saúde', priority: 1, question: 'Você revisou as perguntas de saúde e restrições?', reason: 'Esse bloco determina se recomendações automáticas precisam ser interrompidas.' });
  if (!diet.answered && !diet.breakfast && !diet.lunch && !diet.dinner) items.push({ domain: 'Alimentação', priority: 2, question: 'Como é um dia alimentar típico para você?', reason: 'Planos aderentes precisam partir do comportamento real.' });
  if (!routine.workMode) items.push({ domain: 'Rotina', priority: 2, question: 'Sua rotina principal é remota, híbrida, presencial ou variável?', reason: 'Disponibilidade e ambiente mudam a praticidade das refeições.' });

  const trainingDays = numberFrom(training.daysPerWeek);
  if (trainingDays != null && trainingDays > 0 && !training.time) items.push({ domain: 'Treino', priority: 2, question: 'Em qual horário você costuma treinar?', reason: 'Horário ajuda a organizar alimentação e recuperação ao redor do treino.' });
  if (trainingDays != null && trainingDays > 0 && !training.experience) items.push({ domain: 'Treino', priority: 2, question: 'Há quanto tempo você pratica musculação?', reason: 'Experiência muda a interpretação de volume, desempenho e objetivos.' });
  if (trainingDays === 0) items.push({ domain: 'Treino', priority: 3, question: 'Você pretende iniciar musculação nas próximas semanas?', reason: 'Se não houver treino atual, perguntas de divisão e intensidade podem ser ignoradas.' });
  if (!recovery.sleepHours) items.push({ domain: 'Recuperação', priority: 3, question: 'Quantas horas você costuma dormir?', reason: 'Sono é contexto relevante para recuperação e aderência.' });

  const weight = numberFrom(body.weightKg);
  const usual = numberFrom(body.usualWeightKg);
  if (weight && usual && Math.abs(weight - usual) / usual >= 0.15) items.push({ domain: 'Consistência', priority: 1, question: `Seu peso atual (${weight} kg) está bem diferente do peso habitual (${usual} kg). Essa mudança foi intencional e em quanto tempo ocorreu?`, reason: 'Mudanças importantes merecem contexto antes de qualquer interpretação.' });

  return items.sort((a, b) => a.priority - b.priority);
}

export function createProgressSnapshot(state = {}, now = new Date().toISOString()) {
  const body = state.body ?? {};
  return {
    id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
    recordedAt: now,
    weightKg: numberFrom(body.weightKg),
    waistCm: numberFrom(body.waistCm),
    bodyFatPct: numberFrom(body.bodyFatPct),
    goal: state.goal?.primary || '',
    trainingDaysPerWeek: numberFrom(state.training?.daysPerWeek),
    sleepHours: numberFrom(state.recovery?.sleepHours)
  };
}

export function localMetrics(state = {}, history = []) {
  const created = Date.parse(state.meta?.createdAt || '');
  const updated = Date.parse(state.meta?.updatedAt || '');
  const elapsedMinutes = Number.isFinite(created) && Number.isFinite(updated) && updated >= created
    ? Math.round((updated - created) / 60000)
    : null;
  return {
    currentStep: Number(state.meta?.lastStep || 1),
    elapsedMinutes,
    historyCount: Array.isArray(history) ? history.length : 0,
    hasGoal: Boolean(state.goal?.primary),
    hasBodyBasics: Boolean(state.body?.weightKg && state.body?.heightCm),
    ratedFoods: Object.keys(state.foodPreferences ?? {}).length
  };
}

export function validateImportObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { ok: false, reason: 'Arquivo não contém um objeto de avaliação.' };
  if (Number(value.meta?.version) !== 1) return { ok: false, reason: 'Versão de avaliação incompatível com a V1.' };
  if (!value.goal || !value.body || !value.health) return { ok: false, reason: 'Estrutura mínima da avaliação não foi encontrada.' };
  return { ok: true, reason: '' };
}