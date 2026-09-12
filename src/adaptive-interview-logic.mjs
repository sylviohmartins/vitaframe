const num = value => {
  if (value === '' || value == null) return null;
  const n = Number(String(value).replace(',', '.'));
  return Number.isFinite(n) ? n : null;
};

const skipped = (state, field) => Boolean(state?.meta?.adaptiveSkipped?.[field]);

export function adaptiveQuestions(state = {}) {
  const q = [];
  const body = state.body ?? {};
  const lifestyle = state.lifestyle ?? {};
  const training = state.training ?? {};
  const recovery = state.recovery ?? {};

  if (!body.weightKg && !skipped(state, 'body.weightKg')) q.push({
    field: 'body.weightKg', domain: 'Corpo', priority: 1, type: 'number', label: 'Qual é o seu peso atual?', help: 'Use o valor mais recente que você considera representativo.', suffix: 'kg', min: 30, max: 300, step: 0.01
  });
  if (!body.heightCm && !skipped(state, 'body.heightCm')) q.push({
    field: 'body.heightCm', domain: 'Corpo', priority: 1, type: 'number', label: 'Qual é a sua altura?', help: 'A altura ajuda a contextualizar medidas corporais.', suffix: 'cm', min: 120, max: 230, step: 0.1
  });
  if (body.bodyFatPct && !body.bodyFatSource && !skipped(state, 'body.bodyFatSource')) q.push({
    field: 'body.bodyFatSource', domain: 'Corpo', priority: 1, type: 'select', label: 'De onde veio sua estimativa de gordura corporal?', help: 'A origem altera o grau de confiança do valor.', options: [
      ['bioimpedance-home','Balança de bioimpedância doméstica'],['bioimpedance-pro','Bioimpedância profissional'],['skinfold','Dobras cutâneas'],['dexa','DEXA'],['other','Outro método']
    ]
  });
  if (body.bodyFatPct && !body.bodyFatDate && !skipped(state, 'body.bodyFatDate')) q.push({
    field: 'body.bodyFatDate', domain: 'Corpo', priority: 2, type: 'date', label: 'Quando essa estimativa foi medida?', help: 'Uma data permite comparar tendência sem misturar medições antigas e atuais.'
  });

  if (lifestyle.alcoholUse == null && !skipped(state, 'lifestyle.alcoholUse')) q.push({
    field: 'lifestyle.alcoholUse', domain: 'Rotina', priority: 2, type: 'select', label: 'Você consome bebida alcoólica atualmente?', help: 'Se a resposta for não, o VitaFrame não fará perguntas sobre tipos e frequência.', options: [['no','Não'],['yes','Sim'],['prefer-not','Prefiro não responder']]
  });
  if (lifestyle.alcoholUse === 'yes' && !lifestyle.alcoholFrequency && !skipped(state, 'lifestyle.alcoholFrequency')) q.push({
    field: 'lifestyle.alcoholFrequency', domain: 'Rotina', priority: 2, type: 'select', label: 'Com que frequência costuma consumir álcool?', help: 'A pergunta aparece somente porque você marcou que consome.', options: [['rare','Menos de 1 vez por semana'],['1-2','1–2 vezes por semana'],['3+','3 ou mais vezes por semana'],['variable','Varia muito']]
  });

  const days = num(training.daysPerWeek);
  if (days == null && !skipped(state, 'training.daysPerWeek')) q.push({
    field: 'training.daysPerWeek', domain: 'Treino', priority: 2, type: 'number', label: 'Quantos dias por semana você faz musculação atualmente?', help: 'Se for zero, perguntas sobre horário e intensidade podem ser omitidas.', min: 0, max: 7, step: 1
  });
  if (days != null && days > 0 && !training.time && !skipped(state, 'training.time')) q.push({
    field: 'training.time', domain: 'Treino', priority: 2, type: 'time', label: 'Em qual horário você costuma treinar?', help: 'Isso ajuda a estruturar alimentação e recuperação ao redor do treino.'
  });
  if (days != null && days > 0 && !training.experience && !skipped(state, 'training.experience')) q.push({
    field: 'training.experience', domain: 'Treino', priority: 2, type: 'select', label: 'Qual é sua experiência com musculação?', help: 'A pergunta é omitida para quem informou que não treina atualmente.', options: [['beginner','Menos de 1 ano'],['intermediate','1–3 anos'],['experienced','Mais de 3 anos'],['returning','Retornando após pausa']]
  });

  if (!recovery.sleepHours && !skipped(state, 'recovery.sleepHours')) q.push({
    field: 'recovery.sleepHours', domain: 'Recuperação', priority: 3, type: 'number', label: 'Quantas horas você costuma dormir por noite?', help: 'Sono é contexto importante para recuperação e aderência.', min: 0, max: 16, step: 0.5
  });

  return q.sort((a, b) => a.priority - b.priority);
}

export function setPath(object, path, value) {
  const parts = path.split('.');
  let cursor = object;
  for (let i = 0; i < parts.length - 1; i += 1) cursor = cursor[parts[i]] ??= {};
  cursor[parts.at(-1)] = value;
  return object;
}

export function getPath(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object);
}

export function normalizeAnswer(question, raw) {
  if (question.type === 'number') {
    const value = num(raw);
    if (value == null) return { ok: false, value: null, reason: 'Informe um número válido.' };
    if (question.min != null && value < question.min) return { ok: false, value: null, reason: `O valor mínimo é ${question.min}.` };
    if (question.max != null && value > question.max) return { ok: false, value: null, reason: `O valor máximo é ${question.max}.` };
    return { ok: true, value: String(value), reason: '' };
  }
  const value = String(raw ?? '').trim();
  if (!value) return { ok: false, value: '', reason: 'Escolha ou informe uma resposta.' };
  return { ok: true, value, reason: '' };
}