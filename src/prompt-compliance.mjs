import { calculateBMI, calculateBMR, completeness, dataQualityIssues, redFlags } from './logic.mjs';
import { hasConsent, STORAGE_KEY } from './storage.mjs';

const HISTORY_KEY = 'vitaframe:v1:history';

const emptyMirror = () => ({
  goal: {}, body: {}, health: {}, currentDiet: {}, foodPreferences: {}, foodNotes: {},
  routine: {}, training: {}, recovery: {}, lifestyle: {}, meta: {}, imported: {},
});

let mirror = loadPersisted() || emptyMirror();

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function loadPersisted() {
  if (!hasConsent()) return null;
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return value && typeof value === 'object' ? value : null;
  } catch {
    return null;
  }
}

function readHistory() {
  if (!hasConsent()) return [];
  try {
    const value = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function setPath(object, path, value) {
  const parts = path.split('.');
  let cursor = object;
  for (let i = 0; i < parts.length - 1; i += 1) cursor = cursor[parts[i]] ??= {};
  cursor[parts.at(-1)] = value;
}

function option(value, label, current) {
  return `<option value="${esc(value)}" ${String(current ?? '') === String(value) ? 'selected' : ''}>${esc(label)}</option>`;
}

function selectField(label, name, current, options, help = '') {
  return `<label class="field vf-prompt-field"><span>${esc(label)}</span><select name="${esc(name)}"><option value="">Selecione</option>${options.map(([value, text]) => option(value, text, current)).join('')}</select>${help ? `<small>${esc(help)}</small>` : ''}</label>`;
}

function textareaField(label, name, current, placeholder = '', help = '') {
  return `<label class="field field-wide vf-prompt-field"><span>${esc(label)}</span><textarea name="${esc(name)}" rows="3" placeholder="${esc(placeholder)}">${esc(current ?? '')}</textarea>${help ? `<small>${esc(help)}</small>` : ''}</label>`;
}

function injectOnboardingTime() {
  const hero = document.querySelector('.hero-copy');
  if (!hero || hero.querySelector('[data-vf-time-estimate]')) return;
  const actions = hero.querySelector('.hero-actions');
  actions?.insertAdjacentHTML('afterend', '<p class="microcopy" data-vf-time-estimate><strong>Tempo estimado:</strong> 8–12 min para a avaliação completa. Você pode interromper e retomar se ativar o salvamento local.</p>');

  const history = readHistory();
  const panel = document.querySelector('.hero-panel');
  if (!panel || panel.querySelector('[data-vf-change-summary]') || history.length < 2) return;
  const previous = history.at(-2);
  const latest = history.at(-1);
  const previousWeight = Number(previous?.weightKg);
  const latestWeight = Number(latest?.weightKg);
  let summary = 'Há novas medições no seu histórico.';
  if (Number.isFinite(previousWeight) && Number.isFinite(latestWeight)) {
    const delta = latestWeight - previousWeight;
    summary = Math.abs(delta) < 0.01
      ? 'Peso sem mudança relevante entre os dois últimos snapshots.'
      : `Peso ${delta > 0 ? 'aumentou' : 'reduziu'} ${Math.abs(delta).toFixed(2).replace('.', ',')} kg entre os dois últimos snapshots.`;
  }
  panel.insertAdjacentHTML('beforeend', `<div class="notice neutral" data-vf-change-summary><strong>O que mudou</strong><p>${esc(summary)}</p><a href="./advanced.html#history">Ver histórico</a></div>`);
}

function injectTrainingDetails() {
  const form = document.querySelector('#assessmentForm');
  const heading = document.querySelector('.assessment-head .eyebrow')?.textContent || '';
  if (!form || !heading.includes('Etapa 7') || form.querySelector('[data-vf-training-extra]')) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'form-grid top-gap';
  wrapper.dataset.vfTrainingExtra = 'true';
  wrapper.innerHTML = textareaField(
    'Exercícios que costuma realizar',
    'training.exercises',
    mirror.training?.exercises,
    'Ex.: agachamento, leg press, supino, remada…',
    'Liste apenas se souber; não é necessário preencher séries/cargas para concluir a avaliação.'
  );
  form.append(wrapper);
}

function injectBehaviorAndDietHistory() {
  const form = document.querySelector('#assessmentForm');
  const heading = document.querySelector('.assessment-head .eyebrow')?.textContent || '';
  if (!form || !heading.includes('Etapa 8') || form.querySelector('[data-vf-behavior-extra]')) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'form-grid top-gap';
  wrapper.dataset.vfBehaviorExtra = 'true';
  wrapper.innerHTML = `
    ${selectField('Saciedade depois das refeições', 'recovery.satiety', mirror.recovery?.satiety, [['low','Costumo continuar com fome'],['variable','Varia bastante'],['good','Geralmente fico satisfeito(a)'],['unsure','Não sei avaliar']])}
    ${selectField('Vontade de doces', 'recovery.sweetCraving', mirror.recovery?.sweetCraving, [['rare','Raramente'],['sometimes','Às vezes'],['often','Frequentemente'],['very-often','Muito frequente']])}
    ${selectField('Beliscar sem fome física', 'recovery.snacking', mirror.recovery?.snacking, [['rare','Raramente'],['sometimes','Às vezes'],['often','Frequentemente']])}
    ${selectField('Episódios de comer quantidade muito maior que o habitual', 'recovery.overeating', mirror.recovery?.overeating, [['never','Não'],['sometimes','Às vezes'],['often','Frequentemente'],['prefer-not','Prefiro não responder']], 'Isso não diagnostica transtorno alimentar; serve apenas para indicar quando uma conversa profissional pode ser útil.')}
    ${selectField('Períodos de restrição alimentar muito rígida', 'recovery.restriction', mirror.recovery?.restriction, [['never','Não'],['past','Já aconteceu no passado'],['sometimes','Às vezes atualmente'],['often','Frequentemente atualmente'],['prefer-not','Prefiro não responder']])}
    ${textareaField('Dietas ou estratégias alimentares anteriores', 'recovery.dietHistory', mirror.recovery?.dietHistory, 'Ex.: contagem de calorias, low carb, acompanhamento com nutricionista, nenhuma…', 'Conte apenas o que considerar relevante. “Nunca fiz dieta” é uma resposta válida.')}
    ${textareaField('O que funcionou ou dificultou adesão no passado?', 'recovery.dietExperience', mirror.recovery?.dietExperience, 'Ex.: fome, repetição, cozinhar, trabalho, fim de semana, custo…')}
  `;
  form.append(wrapper);
}

function missingData(state) {
  const candidates = [
    [state.goal?.primary, 'objetivo principal'],
    [state.body?.age, 'idade'],
    [state.body?.heightCm, 'altura'],
    [state.body?.weightKg, 'peso atual'],
    [state.health?.answered, 'revisão de saúde'],
    [state.currentDiet?.answered || state.currentDiet?.mealTimeline?.length, 'alimentação atual'],
    [Object.keys(state.foodPreferences || {}).length >= 10, 'preferências alimentares'],
    [state.routine?.answered, 'rotina'],
    [state.training?.answered, 'treinamento'],
    [state.recovery?.answered, 'sono/recuperação'],
  ];
  return candidates.filter(([value]) => !value).map(([, label]) => label);
}

function confidenceFor(state) {
  const completion = completeness(state).percent;
  const qualityIssues = dataQualityIssues(state).length;
  const provenanceGap = Boolean(state.body?.bodyFatPct && (!state.body?.bodyFatSource || !state.body?.bodyFatDate));
  if (completion >= 90 && qualityIssues === 0 && !provenanceGap) return { label: 'Alta para organização do perfil', detail: 'A maior parte do contexto estrutural está preenchida e não há inconsistências básicas detectadas. Isso não significa certeza clínica.' };
  if (completion >= 60 && qualityIssues <= 1) return { label: 'Moderada', detail: 'Há informação suficiente para um resumo inicial, mas campos ausentes ou proveniência incompleta ainda reduzem a confiança.' };
  return { label: 'Inicial', detail: 'O perfil ainda possui lacunas relevantes. Complete os dados antes de usá-lo para apoiar uma decisão.' };
}

function compactText(...values) {
  return values.map(value => String(value || '').trim()).filter(Boolean).join(' · ') || 'Não informado';
}

function injectionState() {
  const persisted = loadPersisted();
  if (persisted) mirror = persisted;
  return mirror;
}

function injectProfileCompleteness() {
  const page = document.querySelector('.profile-page');
  if (!page || page.querySelector('[data-vf-prompt-profile]')) return;
  const state = injectionState();
  const missing = missingData(state);
  const confidence = confidenceFor(state);
  const flags = redFlags(state);
  const bmi = calculateBMI(state.body?.weightKg, state.body?.heightCm);
  const bmr = calculateBMR({ sex: state.body?.sex, age: state.body?.age, weightKg: state.body?.weightKg, heightCm: state.body?.heightCm });
  const importMeta = state.imported?.last;
  const measurementSource = importMeta?.source || 'informado pelo usuário';
  const measurementDate = importMeta?.recordedAt ? new Date(importMeta.recordedAt).toLocaleDateString('pt-BR') : (state.body?.bodyFatDate || 'data não informada');
  const meals = Array.isArray(state.currentDiet?.mealTimeline) ? state.currentDiet.mealTimeline.length : 0;

  const block = document.createElement('section');
  block.className = 'profile-section';
  block.dataset.vfPromptProfile = 'true';
  block.innerHTML = `
    <div class="section-title"><div><p class="eyebrow">Cobertura do perfil</p><h2>O contexto que sustenta a próxima decisão</h2></div><span>${esc(confidence.label)}</span></div>
    <div class="profile-columns">
      <section><h2>Alimentação</h2><p>${esc(compactText(state.currentDiet?.breakfast, state.currentDiet?.lunch, state.currentDiet?.dinner))}</p><dl><div><dt>Timeline</dt><dd>${meals ? `${meals} refeição(ões) mapeada(s)` : 'Não mapeada'}</dd></div><div><dt>Delivery</dt><dd>${state.currentDiet?.deliveryPerWeek !== '' && state.currentDiet?.deliveryPerWeek != null ? `${esc(state.currentDiet.deliveryPerWeek)}x/semana` : '—'}</dd></div><div><dt>Fim de semana</dt><dd>${esc(state.currentDiet?.weekendDiff || '—')}</dd></div></dl></section>
      <section><h2>Saúde</h2><p>${esc(compactText(state.health?.allergies, state.health?.intolerances, state.health?.conditions, state.health?.medications))}</p><dl><div><dt>Alertas declarados</dt><dd>${flags.length}</dd></div><div><dt>Limitações/dor</dt><dd>${esc(state.health?.pain || state.training?.limitations || '—')}</dd></div></dl></section>
      <section><h2>Adesão</h2><dl><div><dt>Cozinhar</dt><dd>${esc(state.routine?.cook || '—')}</dd></div><div><dt>Orçamento</dt><dd>${esc(state.routine?.budget || '—')}</dd></div><div><dt>Maior fome</dt><dd>${esc(state.routine?.hungerPeriod || '—')}</dd></div><div><dt>Saciedade</dt><dd>${esc(state.recovery?.satiety || '—')}</dd></div><div><dt>Vontade de doces</dt><dd>${esc(state.recovery?.sweetCraving || '—')}</dd></div></dl>${state.recovery?.dietHistory ? `<p><strong>Histórico de dietas:</strong> ${esc(state.recovery.dietHistory)}</p>` : ''}</section>
      <section><h2>Dados ausentes</h2>${missing.length ? `<ul>${missing.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : '<p>Nenhuma lacuna estrutural essencial detectada.</p>'}<p><a href="#assessment?step=9">Revisar inconsistências</a></p></section>
    </div>
    <div class="notice ${confidence.label.startsWith('Alta') ? 'success' : 'neutral'}"><strong>Grau de confiança: ${esc(confidence.label)}</strong><p>${esc(confidence.detail)}</p></div>
    <div class="profile-section" aria-labelledby="vf-provenance-title">
      <div class="section-title"><div><p class="eyebrow">Explicabilidade</p><h2 id="vf-provenance-title">Origem, método e confiança das estimativas</h2></div><a href="#assessment?step=2">Editar dados corporais</a></div>
      <div class="review-grid">
        <article><h3>IMC</h3><strong>${bmi ? bmi.toFixed(1) : '—'}</strong><p><b>Origem:</b> peso/altura ${esc(measurementSource)}.<br><b>Método:</b> peso ÷ altura².<br><b>Data:</b> ${esc(measurementDate)}.<br><b>Confiança:</b> estimativa descritiva; não mede composição corporal.</p></article>
        <article><h3>TMB</h3><strong>${bmr ? `${Math.round(bmr)} kcal/dia` : '—'}</strong><p><b>Origem:</b> idade, sexo biológico, peso e altura informados.<br><b>Método:</b> Mifflin–St Jeor.<br><b>Data:</b> calculada na visualização atual.<br><b>Confiança:</b> estimativa populacional; não é gasto total nem meta calórica.</p></article>
      </div>
    </div>
  `;

  const preference = page.querySelector('.profile-section');
  if (preference) preference.before(block); else page.append(block);
}

function enhance() {
  injectOnboardingTime();
  injectTrainingDetails();
  injectBehaviorAndDietHistory();
  injectProfileCompleteness();
}

function captureField(event) {
  const target = event.target;
  if (!target?.name || !target.name.includes('.')) return;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  if (target.name.startsWith('preference.')) {
    mirror.foodPreferences ??= {};
    mirror.foodPreferences[target.name.split('.')[1]] = value === 'n' ? 'n' : Number(value);
  } else {
    setPath(mirror, target.name, value);
  }
  queueMicrotask(() => {
    const persisted = loadPersisted();
    if (persisted) mirror = persisted;
    enhance();
  });
}

document.addEventListener('input', captureField, true);
document.addEventListener('change', captureField, true);
window.addEventListener('hashchange', () => queueMicrotask(enhance));

const observer = new MutationObserver(() => queueMicrotask(enhance));
observer.observe(document.querySelector('#app') || document.body, { childList: true, subtree: true });
enhance();
