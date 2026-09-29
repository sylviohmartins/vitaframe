import { foodCatalog, preferenceScale, references } from './catalog.mjs';
import {
  activityOptions,
  allergyOptions,
  cardioOptions,
  formatSelections,
  intoleranceOptions,
  limitationAreaOptions,
  mealQuickOptions,
  statusOptions,
  supplementOptions,
  trainingSplitOptions,
  weekendOptions,
} from './question-options.mjs';
import {
  calculateBMI,
  calculateBMR,
  completeness,
  dataQualityIssues,
  deriveInsights,
  estimateFatMass,
  estimateLeanMass,
  preferenceStats,
  redFlags,
  safeExport,
  toNumber,
} from './logic.mjs';
import {
  clearState,
  hasConsent,
  loadState,
  loadTheme,
  saveState,
  saveTheme,
  setConsent,
} from './storage.mjs';

const app = document.querySelector('#app');
const toast = document.querySelector('#toast');
const themeToggle = document.querySelector('#themeToggle');
const privacyButton = document.querySelector('#privacyButton');

const initialState = {
  meta: { version: 2, createdAt: new Date().toISOString(), lastStep: 1 },
  goal: { primary: '', pace: '', notes: '' },
  body: {
    age: '', sex: '', heightCm: '', weightKg: '', usualWeightKg: '', waistCm: '',
    bodyFatPct: '', bodyFatSource: '', bodyFatSourceOther: '', bodyFatDate: '', goalWeightKg: ''
  },
  health: {
    answered: false,
    allergies: '', allergyStatus: '', allergyItems: [], allergyOther: '',
    intolerances: '', intoleranceStatus: '', intoleranceItems: [], intoleranceOther: '',
    conditions: '', conditionStatus: '', medications: '', medicationStatus: '',
    surgeries: '', surgeryStatus: '', pain: '', painStatus: '', painAreas: [], painOther: '',
    attentionStatus: '',
    medicalFollowup: false, chestPain: false, eatingDisorder: false, rapidWeightChange: false,
    pregnancy: false, kidneyDisease: false, diabetesMedication: false, acuteInjury: false
  },
  currentDiet: {
    answered: false,
    breakfast: '', breakfastChoices: [], breakfastOther: '',
    lunch: '', lunchChoices: [], lunchOther: '',
    snack: '', snackChoices: [], snackOther: '',
    dinner: '', dinnerChoices: [], dinnerOther: '',
    supper: '', supperChoices: [], supperOther: '',
    drinks: '', drinksChoices: [], drinksOther: '',
    sweets: '', sweetsChoices: [], sweetsOther: '',
    deliveryPerWeek: '', eatOutPerWeek: '', waterLiters: '',
    weekendDiff: '', weekendChoices: [], weekendOther: ''
  },
  foodPreferences: {},
  foodNotes: { mustKeep: '', avoid: '', controlRisk: '', other: '' },
  routine: {
    answered: false, wakeTime: '', sleepTime: '', workMode: '', workModeOther: '', workHours: '', commute: '',
    cook: '', mealPrep: '', fridgeMicrowave: '', budget: '', preferredMeals: '', hungerPeriod: '', notes: ''
  },
  training: {
    answered: false, daysPerWeek: '', durationMin: '', intensity: '', split: '', splitOther: '', time: '', experience: '',
    cardio: '', cardioModalities: [], cardioOther: '', cardioDurationMin: '', cardioFrequency: '', steps: '',
    otherActivity: '', activityTypes: [], activityOther: '', limitations: '', limitationStatus: '',
    limitationAreas: [], limitationOther: '', exerciseSelections: [], exerciseOther: ''
  },
  recovery: {
    answered: false, sleepHours: '', sleepQuality: '', stress: '', hydration: '', hungerNight: '',
    emotionalEating: '', supplements: '', supplementStatus: '', supplementTypes: [], supplementOther: '', notes: ''
  }
}

let state = loadState(structuredClone(initialState));
let currentStep = Number(state?.meta?.lastStep || 1);

const steps = [
  ['Objetivo', 'Defina a direção sem transformar isso em uma promessa de resultado.'],
  ['Corpo', 'Registre medidas e deixe claro o que é medido, estimado ou informado.'],
  ['Saúde', 'Mapeie restrições e situações que pedem revisão profissional.'],
  ['Alimentação atual', 'Descreva o que realmente acontece hoje, sem tentar “acertar”.'],
  ['Preferências', 'Reconheça alimentos em vez de depender da memória.'],
  ['Rotina', 'Faça o futuro plano caber na vida real.'],
  ['Treinamento', 'Organize frequência, horário, experiência e limitações.'],
  ['Recuperação', 'Sono, estresse, hidratação e comportamento também importam.'],
  ['Revisão', 'Confira lacunas e inconsistências antes de concluir.'],
  ['Perfil', 'Veja um resumo portátil e orientado para próxima ação.']
];

function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.hidden = true; }, 2400);
}

function updatePrivacyChip() {
  privacyButton.innerHTML = hasConsent()
    ? '<span class="status-dot" aria-hidden="true"></span> Salvo neste dispositivo'
    : '<span class="status-dot muted" aria-hidden="true"></span> Sessão não persistida';
}

function persist(message = '') {
  state.meta.lastStep = currentStep;
  if (saveState(state) && message) showToast(message);
  updatePrivacyChip();
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111214' : '#f5f5f7');
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  saveTheme(theme);
}

const preferredTheme = loadTheme() || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(preferredTheme);
updatePrivacyChip();

themeToggle.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
privacyButton.addEventListener('click', () => location.hash = '#privacy');

function field({ label, name, value = '', type = 'text', inputmode = '', min = '', max = '', step = '', placeholder = '', help = '' }) {
  return `<label class="field"><span>${esc(label)}</span><input name="${esc(name)}" type="${esc(type)}" value="${esc(value)}" ${inputmode ? `inputmode="${inputmode}"` : ''} ${min !== '' ? `min="${min}"` : ''} ${max !== '' ? `max="${max}"` : ''} ${step !== '' ? `step="${step}"` : ''} placeholder="${esc(placeholder)}">${help ? `<small>${esc(help)}</small>` : ''}</label>`;
}

function textarea({ label, name, value = '', placeholder = '', help = '' }) {
  return `<label class="field field-wide"><span>${esc(label)}</span><textarea name="${esc(name)}" rows="3" placeholder="${esc(placeholder)}">${esc(value)}</textarea>${help ? `<small>${esc(help)}</small>` : ''}</label>`;
}

function select({ label, name, value = '', options, help = '' }) {
  return `<label class="field"><span>${esc(label)}</span><select name="${esc(name)}"><option value="">Selecione</option>${options.map(([v, l]) => `<option value="${esc(v)}" ${String(value) === String(v) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>${help ? `<small>${esc(help)}</small>` : ''}</label>`;
}

function checkbox({ label, name, checked = false, help = '' }) {
  return `<label class="check"><input type="checkbox" name="${esc(name)}" ${checked ? 'checked' : ''}><span><strong>${esc(label)}</strong>${help ? `<small>${esc(help)}</small>` : ''}</span></label>`;
}

function setPathValue(object, path, value) {
  const parts = path.split('.');
  let cursor = object;
  for (let i = 0; i < parts.length - 1; i += 1) cursor = cursor[parts[i]] ??= {};
  cursor[parts.at(-1)] = value;
}

function radioChoices({ legend, name, value = '', options, help = '', otherName = '', otherValue = '', otherLabel = 'Descreva' }) {
  const choices = options.map(([id, label]) =>
    `<label class="structured-option"><input type="radio" name="${esc(name)}" value="${esc(id)}" ${String(value) === String(id) ? 'checked' : ''}><span>${esc(label)}</span></label>`
  ).join('');
  const other = otherName
    ? `<label class="field conditional-other"><span>${esc(otherLabel)}</span><input name="${esc(otherName)}" type="text" value="${esc(otherValue)}" maxlength="160"></label>`
    : '';
  return `<fieldset class="structured-group"><legend>${esc(legend)}</legend>${help ? `<p class="structured-help">${esc(help)}</p>` : ''}<div class="structured-options">${choices}</div>${other}</fieldset>`;
}

function multiChoices({ legend, name, values = [], options, help = '', otherName = '', otherValue = '', otherLabel = 'Outro — descreva', exclusive = [] }) {
  const selected = Array.isArray(values) ? values : [];
  const choices = options.map(([id, label]) =>
    `<label class="structured-option"><input type="checkbox" name="${esc(name)}" data-array-path="${esc(name)}" value="${esc(id)}" ${selected.includes(id) ? 'checked' : ''} ${exclusive.includes(id) ? 'data-exclusive="true"' : ''}><span>${esc(label)}</span></label>`
  ).join('');
  const other = otherName
    ? `<label class="field conditional-other"><span>${esc(otherLabel)}</span><input name="${esc(otherName)}" type="text" value="${esc(otherValue)}" maxlength="180"></label>`
    : '';
  return `<fieldset class="structured-group"><legend>${esc(legend)}</legend>${help ? `<p class="structured-help">${esc(help)}</p>` : ''}<div class="structured-options">${choices}</div>${other}</fieldset>`;
}

function statusWithText({ legend, statusName, statusValue, textName, textValue, textLabel, help = '', placeholder = '' }) {
  return `<div class="conditional-block">${radioChoices({ legend, name: statusName, value: statusValue, options: statusOptions, help })}<label class="field field-wide conditional-yes"><span>${esc(textLabel)}</span><textarea name="${esc(textName)}" rows="3" placeholder="${esc(placeholder)}" maxlength="800">${esc(textValue)}</textarea></label></div>`;
}

function pageHeader(eyebrow, title, copy) {
  return `<div class="page-heading"><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1><p>${esc(copy)}</p></div>`;
}

function homeView() {
  const c = completeness(state);
  app.innerHTML = `
    <section class="hero" id="home">
      <div class="hero-copy">
        <p class="eyebrow">Contexto antes de plano</p>
        <h1>Organize corpo, alimentação, rotina e treino em um só perfil.</h1>
        <p class="hero-lead">O VitaFrame transforma respostas dispersas em uma avaliação estruturada, privada e fácil de compartilhar. A V1 não prescreve dieta ou treino.</p>
        <div class="hero-actions">
          <button class="button primary" data-action="start">${c.percent > 0 ? 'Continuar avaliação' : 'Começar avaliação'}</button>
          <a class="button secondary" href="#profile">Ver meu perfil</a>
        </div>
        <div class="trust-row" aria-label="Características principais">
          <span>Sem conta</span><span>Sem backend</span><span>Dados locais</span><span>Exportável</span>
        </div>
      </div>
      <aside class="hero-panel" aria-label="Resumo de progresso">
        <div class="progress-orb" style="--progress:${c.percent * 3.6}deg"><div><strong>${c.percent}%</strong><span>completo</span></div></div>
        <p>${c.completed} de ${c.total} blocos essenciais preenchidos.</p>
        <div class="mini-list"><span>Autosalvamento ${hasConsent() ? 'ativo' : 'opcional'}</span><span>Estimativas identificadas</span><span>Alertas não são diagnósticos</span></div>
      </aside>
    </section>
    <section class="principles section-grid" aria-labelledby="principles-title">
      <div>${pageHeader('Por que existe', 'Menos adivinhação. Mais contexto.', 'O problema não é falta de aplicativos de dieta. É começar decisões importantes com informações incompletas ou mal estruturadas.')}</div>
      <div class="principle-list">
        <article><span>01</span><div><h2>Reconhecimento em vez de memória</h2><p>Preferências são apresentadas por categorias para você classificar, sem precisar lembrar de tudo sozinho.</p></div></article>
        <article><span>02</span><div><h2>Medido não é estimado</h2><p>Peso, bioimpedância e cálculos derivados mantêm origem e natureza do dado visíveis.</p></div></article>
        <article><span>03</span><div><h2>Pronto para revisão humana</h2><p>O resultado é um perfil organizado que pode apoiar uma conversa melhor com profissionais habilitados.</p></div></article>
      </div>
    </section>`;
}

function assessmentShell(content) {
  const [label, description] = steps[currentStep - 1];
  const progress = Math.round((currentStep / steps.length) * 100);
  app.innerHTML = `
    <section class="assessment-shell">
      <aside class="step-rail" aria-label="Etapas da avaliação">
        <a class="back-home" href="#home">← Início</a>
        <p class="rail-label">Sua avaliação</p>
        <ol>${steps.map(([name], index) => `<li class="${index + 1 === currentStep ? 'current' : ''} ${index + 1 < currentStep ? 'done' : ''}"><button type="button" data-step="${index + 1}"><span>${index + 1}</span>${esc(name)}</button></li>`).join('')}</ol>
      </aside>
      <div class="assessment-main">
        <div class="mobile-progress"><span>Etapa ${currentStep} de ${steps.length}</span><div><i style="width:${progress}%"></i></div></div>
        <div class="assessment-head"><p class="eyebrow">Etapa ${currentStep} · ${esc(label)}</p><h1>${esc(label)}</h1><p>${esc(description)}</p></div>
        <form id="assessmentForm" novalidate>${content}</form>
        <div class="assessment-actions">
          <button type="button" class="button secondary" data-action="previous" ${currentStep === 1 ? 'disabled' : ''}>Voltar</button>
          <span class="save-state">${hasConsent() ? 'Salvo automaticamente neste dispositivo' : 'Ative o salvamento local se quiser retomar depois'}</span>
          ${currentStep < steps.length ? '<button type="button" class="button primary" data-action="next">Continuar</button>' : '<a class="button primary" href="#profile">Abrir perfil</a>'}
        </div>
      </div>
    </section>`;
}

function step1() {
  assessmentShell(`<div class="choice-grid" role="group" aria-label="Objetivo principal">
    ${[
      ['fat-loss', 'Perder gordura', 'Reduzir gordura preservando o máximo possível de massa magra.'],
      ['muscle', 'Ganhar massa muscular', 'Priorizar hipertrofia e desempenho sem atalhos.'],
      ['recomp', 'Recomposição corporal', 'Buscar melhora gradual de composição corporal.'],
      ['organize', 'Organizar meu contexto', 'Preparar informações para uma decisão ou consulta posterior.']
    ].map(([v, title, copy]) => `<label class="choice"><input type="radio" name="goal.primary" value="${v}" ${state.goal.primary === v ? 'checked' : ''}><span><strong>${title}</strong><small>${copy}</small></span></label>`).join('')}
    </div>
    <div class="form-grid top-gap">
      ${select({ label: 'Ritmo que parece mais sustentável', name: 'goal.pace', value: state.goal.pace, options: [['conservative','Gradual e conservador'],['balanced','Equilíbrio entre resultado e flexibilidade'],['unsure','Ainda não sei']] })}
      ${textarea({ label: 'O que faria você considerar esse processo bem-sucedido?', name: 'goal.notes', value: state.goal.notes, placeholder: 'Ex.: reduzir cintura, voltar a treinar com consistência, melhorar relação com a alimentação…' })}
    </div>`);
}

function step2() {
  const bmi = calculateBMI(state.body.weightKg, state.body.heightCm);
  const fatMass = estimateFatMass(state.body.weightKg, state.body.bodyFatPct);
  const lean = estimateLeanMass(state.body.weightKg, state.body.bodyFatPct);
  assessmentShell(`<div class="notice info"><strong>Importante</strong><p>Percentual de gordura de balança doméstica é uma estimativa. Use a mesma condição de medição para acompanhar tendência, não como verdade clínica exata.</p></div>
    <div class="form-grid">
      ${field({ label:'Idade', name:'body.age', value:state.body.age, type:'number', min:'18', max:'100', inputmode:'numeric' })}
      ${select({ label:'Sexo biológico para cálculos fisiológicos opcionais', name:'body.sex', value:state.body.sex, options:[['male','Masculino'],['female','Feminino'],['unspecified','Prefiro não informar']] })}
      ${field({ label:'Altura (cm)', name:'body.heightCm', value:state.body.heightCm, type:'number', min:'120', max:'230', inputmode:'decimal' })}
      ${field({ label:'Peso atual (kg)', name:'body.weightKg', value:state.body.weightKg, type:'number', min:'30', max:'300', step:'0.01', inputmode:'decimal' })}
      ${field({ label:'Peso habitual (kg)', name:'body.usualWeightKg', value:state.body.usualWeightKg, type:'number', step:'0.01', inputmode:'decimal' })}
      ${field({ label:'Cintura / abdômen (cm)', name:'body.waistCm', value:state.body.waistCm, type:'number', step:'0.1', inputmode:'decimal' })}
      ${field({ label:'Gordura corporal estimada (%)', name:'body.bodyFatPct', value:state.body.bodyFatPct, type:'number', min:'3', max:'70', step:'0.1', inputmode:'decimal' })}
      ${select({ label:'Origem da estimativa de gordura', name:'body.bodyFatSource', value:state.body.bodyFatSource, options:[['bioimpedance-home','Balança de bioimpedância doméstica'],['bioimpedance-pro','Bioimpedância profissional'],['skinfold','Dobras cutâneas'],['dexa','DEXA'],['other','Outro método']] })}
      ${field({ label:'Data da medição', name:'body.bodyFatDate', value:state.body.bodyFatDate, type:'date' })}
      ${field({ label:'Peso objetivo, se houver (kg)', name:'body.goalWeightKg', value:state.body.goalWeightKg, type:'number', step:'0.1', inputmode:'decimal' })}
    </div>
    ${(bmi || fatMass) ? `<div class="derived-grid" aria-label="Estimativas derivadas">
      ${bmi ? `<div><span>IMC estimado</span><strong>${bmi.toFixed(1)}</strong><small>Derivado do peso e altura informados</small></div>` : ''}
      ${fatMass ? `<div><span>Massa de gordura estimada</span><strong>${fatMass.toFixed(1)} kg</strong><small>Depende da precisão do % de gordura</small></div>` : ''}
      ${lean ? `<div><span>Massa livre de gordura estimada</span><strong>${lean.toFixed(1)} kg</strong><small>Derivada, não medida diretamente</small></div>` : ''}
    </div>` : ''}`);
}

function step3() {
  assessmentShell(`<div class="notice neutral"><strong>Você controla o que responde</strong><p>Selecione o que reconhecer. “Não”, “não sei” e “prefiro não informar” são respostas diferentes; texto aparece apenas quando acrescenta contexto.</p></div>
    <div class="conditional-block">
      ${radioChoices({ legend:'Possui alguma alergia conhecida?', name:'health.allergyStatus', value:state.health.allergyStatus, options:statusOptions, help:'Alergia é diferente de intolerância ou desconforto alimentar.' })}
      <div class="conditional-yes">
        ${multiChoices({ legend:'Quais alergias você reconhece?', name:'health.allergyItems', values:state.health.allergyItems, options:allergyOptions, help:'Selecione todas que se aplicam. Os atalhos alimentares priorizam os principais grupos reconhecidos pela Anvisa/ASBAI.', otherName:'health.allergyOther', otherValue:state.health.allergyOther })}
      </div>
    </div>
    <div class="conditional-block">
      ${radioChoices({ legend:'Possui intolerância ou alimento/componente que costuma causar desconforto?', name:'health.intoleranceStatus', value:state.health.intoleranceStatus, options:statusOptions, help:'Isso registra o seu relato; não tenta diagnosticar a causa do desconforto.' })}
      <div class="conditional-yes">
        ${multiChoices({ legend:'O que costuma causar desconforto?', name:'health.intoleranceItems', values:state.health.intoleranceItems, options:intoleranceOptions, otherName:'health.intoleranceOther', otherValue:state.health.intoleranceOther })}
      </div>
    </div>
    ${statusWithText({ legend:'Possui alguma condição de saúde relevante para alimentação ou exercício?', statusName:'health.conditionStatus', statusValue:state.health.conditionStatus, textName:'health.conditions', textValue:state.health.conditions, textLabel:'Qual condição?', help:'Evito uma lista fechada porque condições clínicas têm grande cauda longa e uma seleção curta poderia induzir classificação incorreta.', placeholder:'Ex.: hipertensão acompanhada, diabetes, condição gastrointestinal…' })}
    ${statusWithText({ legend:'Usa medicamentos de forma regular?', statusName:'health.medicationStatus', statusValue:state.health.medicationStatus, textName:'health.medications', textValue:state.health.medications, textLabel:'Quais medicamentos?', help:'Informe apenas se souber. O VitaFrame não interpreta doses nem interações.', placeholder:'Nome do medicamento; dose/frequência somente se considerar útil' })}
    ${statusWithText({ legend:'Possui cirurgia ou histórico de saúde importante para contextualizar?', statusName:'health.surgeryStatus', statusValue:state.health.surgeryStatus, textName:'health.surgeries', textValue:state.health.surgeries, textLabel:'Qual histórico?', placeholder:'Descreva apenas o que for relevante para o seu contexto atual' })}
    <div class="conditional-block">
      ${radioChoices({ legend:'Possui dor, lesão ou limitação atual que afeta movimento ou treino?', name:'health.painStatus', value:state.health.painStatus, options:statusOptions })}
      <div class="conditional-yes">
        ${multiChoices({ legend:'Em quais regiões ou tipos de limitação?', name:'health.painAreas', values:state.health.painAreas, options:limitationAreaOptions, otherName:'health.painOther', otherValue:state.health.painOther, otherLabel:'Detalhe a limitação apenas se necessário' })}
      </div>
    </div>
    <div class="conditional-block">
      ${radioChoices({ legend:'Alguma das situações de atenção profissional abaixo se aplica?', name:'health.attentionStatus', value:state.health.attentionStatus, options:[['none','Nenhuma das situações'],['yes','Sim, uma ou mais'],['prefer-not','Prefiro não responder']], help:'Marcar uma situação não gera diagnóstico; apenas mantém um alerta explícito para revisão profissional.' })}
      <fieldset class="check-panel conditional-yes"><legend>Selecione somente o que você já sabe ou reconhece no seu histórico</legend>
        ${checkbox({ label:'Tenho condição que exige acompanhamento médico ou nutricional', name:'health.medicalFollowup', checked:state.health.medicalFollowup })}
        ${checkbox({ label:'Tenho dor no peito, desmaio ou sintomas cardiovasculares relacionados ao exercício', name:'health.chestPain', checked:state.health.chestPain })}
        ${checkbox({ label:'Tenho histórico ou suspeita de transtorno alimentar', name:'health.eatingDisorder', checked:state.health.eatingDisorder })}
        ${checkbox({ label:'Tive mudança rápida e não intencional de peso', name:'health.rapidWeightChange', checked:state.health.rapidWeightChange })}
        ${checkbox({ label:'Estou em gestação ou amamentação', name:'health.pregnancy', checked:state.health.pregnancy })}
        ${checkbox({ label:'Tenho doença renal', name:'health.kidneyDisease', checked:state.health.kidneyDisease })}
        ${checkbox({ label:'Uso medicação para diabetes', name:'health.diabetesMedication', checked:state.health.diabetesMedication })}
        ${checkbox({ label:'Tenho lesão aguda importante ou dor que limita movimento', name:'health.acuteInjury', checked:state.health.acuteInjury })}
      </fieldset>
    </div>`);
}
function step4() {
  assessmentShell(`<div class="notice neutral"><strong>Reconheça primeiro; escreva só se faltar algo</strong><p>Marque combinações que aparecem no seu dia típico. “Outro” abre um complemento curto. Para detalhar por horário e quantidade, use também o mapa alimentar.</p><p><a href="./meals.html">Abrir meu dia alimentar →</a></p></div>
    ${multiChoices({ legend:'Café da manhã típico', name:'currentDiet.breakfastChoices', values:state.currentDiet.breakfastChoices, options:mealQuickOptions.breakfast, otherName:'currentDiet.breakfastOther', otherValue:state.currentDiet.breakfastOther, exclusive:['skip'] })}
    ${multiChoices({ legend:'Almoço típico', name:'currentDiet.lunchChoices', values:state.currentDiet.lunchChoices, options:mealQuickOptions.lunch, otherName:'currentDiet.lunchOther', otherValue:state.currentDiet.lunchOther, exclusive:['skip'] })}
    ${multiChoices({ legend:'Lanches mais comuns', name:'currentDiet.snackChoices', values:state.currentDiet.snackChoices, options:mealQuickOptions.snack, otherName:'currentDiet.snackOther', otherValue:state.currentDiet.snackOther, exclusive:['skip'] })}
    ${multiChoices({ legend:'Jantar típico', name:'currentDiet.dinnerChoices', values:state.currentDiet.dinnerChoices, options:mealQuickOptions.dinner, otherName:'currentDiet.dinnerOther', otherValue:state.currentDiet.dinnerOther, exclusive:['skip'] })}
    ${multiChoices({ legend:'Ceia / madrugada', name:'currentDiet.supperChoices', values:state.currentDiet.supperChoices, options:mealQuickOptions.supper, otherName:'currentDiet.supperOther', otherValue:state.currentDiet.supperOther, exclusive:['skip'] })}
    ${multiChoices({ legend:'Bebidas no dia a dia', name:'currentDiet.drinksChoices', values:state.currentDiet.drinksChoices, options:mealQuickOptions.drinks, otherName:'currentDiet.drinksOther', otherValue:state.currentDiet.drinksOther })}
    ${multiChoices({ legend:'Doces e sobremesas', name:'currentDiet.sweetsChoices', values:state.currentDiet.sweetsChoices, options:mealQuickOptions.sweets, otherName:'currentDiet.sweetsOther', otherValue:state.currentDiet.sweetsOther, exclusive:['rare-none'] })}
    <div class="form-grid top-gap">
      ${field({ label:'Delivery por semana', name:'currentDiet.deliveryPerWeek', value:state.currentDiet.deliveryPerWeek, type:'number', min:'0', max:'21', inputmode:'numeric', help:'Digite apenas o número aproximado; zero é uma resposta válida.' })}
      ${field({ label:'Refeições fora por semana', name:'currentDiet.eatOutPerWeek', value:state.currentDiet.eatOutPerWeek, type:'number', min:'0', max:'21', inputmode:'numeric' })}
      ${field({ label:'Água aproximada por dia (L)', name:'currentDiet.waterLiters', value:state.currentDiet.waterLiters, type:'number', min:'0', max:'10', step:'0.1', inputmode:'decimal' })}
    </div>
    ${multiChoices({ legend:'O que costuma mudar no sábado/domingo?', name:'currentDiet.weekendChoices', values:state.currentDiet.weekendChoices, options:weekendOptions, otherName:'currentDiet.weekendOther', otherValue:state.currentDiet.weekendOther, exclusive:['similar'] })}`);
}
function step5() {
  const search = `<label class="search-field"><span>Buscar alimento</span><input id="foodSearch" type="search" placeholder="Digite banana, arroz, pizza…" autocomplete="off"></label>`;
  const catalog = foodCatalog.map(category => `<section class="food-category" data-category="${category.id}"><div class="category-head"><h2>${esc(category.label)}</h2><span>${category.items.length} opções</span></div><div class="food-list">${category.items.map(item => foodItem(item)).join('')}</div></section>`).join('');
  assessmentShell(`${search}<div class="preference-legend" aria-label="Escala de preferência">${preferenceScale.map(item => `<span>${esc(item.label)}</span>`).join('')}</div><div id="foodCatalog">${catalog}</div>
    <div class="form-grid top-gap">
      ${textarea({ label:'Alimentos ou refeições que você não abre mão', name:'foodNotes.mustKeep', value:state.foodNotes.mustKeep })}
      ${textarea({ label:'Alimentos que você quer evitar', name:'foodNotes.avoid', value:state.foodNotes.avoid })}
      ${textarea({ label:'Alimentos de que gosta, mas prefere não ter por perto por dificuldade de porção', name:'foodNotes.controlRisk', value:state.foodNotes.controlRisk })}
      ${textarea({ label:'Outro alimento não listado', name:'foodNotes.other', value:state.foodNotes.other })}
    </div>`);
  const input = document.querySelector('#foodSearch');
  input?.addEventListener('input', () => filterFoods(input.value));
}

function foodItem(item) {
  const current = state.foodPreferences[item.id];
  return `<div class="food-row" data-food-label="${esc(item.label.toLowerCase())}"><span>${esc(item.label)}</span><div class="rating" role="radiogroup" aria-label="Preferência por ${esc(item.label)}">${preferenceScale.map(scale => `<label title="${esc(scale.label)}"><input type="radio" name="preference.${item.id}" value="${scale.value}" ${String(current) === String(scale.value) ? 'checked' : ''}><span>${scale.value === 'n' ? '?' : scale.value}</span><em>${esc(scale.label)}</em></label>`).join('')}</div></div>`;
}

function filterFoods(query) {
  const normalized = query.toLocaleLowerCase('pt-BR').trim();
  document.querySelectorAll('.food-row').forEach(row => {
    row.hidden = Boolean(normalized) && !row.dataset.foodLabel.includes(normalized);
  });
  document.querySelectorAll('.food-category').forEach(section => {
    section.hidden = [...section.querySelectorAll('.food-row')].every(row => row.hidden);
  });
}

function step6() {
  assessmentShell(`<div class="form-grid">
    ${field({ label:'Horário em que costuma acordar', name:'routine.wakeTime', value:state.routine.wakeTime, type:'time' })}
    ${field({ label:'Horário em que costuma dormir', name:'routine.sleepTime', value:state.routine.sleepTime, type:'time' })}
  </div>
  ${radioChoices({ legend:'Modalidade de trabalho/estudo', name:'routine.workMode', value:state.routine.workMode, options:[['remote','Remoto'],['hybrid','Híbrido'],['onsite','Presencial'],['variable','Variável / turnos'],['na','Não se aplica'],['other','Outro']], otherName:'routine.workModeOther', otherValue:state.routine.workModeOther })}
  <div class="form-grid top-gap">
    ${field({ label:'Horário de trabalho/estudo', name:'routine.workHours', value:state.routine.workHours, placeholder:'Ex.: 9h–18h', help:'Mantido como texto curto porque escalas, plantões e horários quebrados não cabem bem em uma lista única.' })}
    ${select({ label:'Tempo de deslocamento em dia presencial', name:'routine.commute', value:state.routine.commute, options:[['none','Sem deslocamento'],['up30','Até 30 min no total'],['31-60','31–60 min no total'],['61-90','61–90 min no total'],['91-120','91–120 min no total'],['120+','Mais de 2 h no total'],['variable','Varia muito']] })}
    ${select({ label:'Facilidade para cozinhar', name:'routine.cook', value:state.routine.cook, options:[['easy','Cozinho com facilidade'],['some','Consigo, mas quero praticidade'],['low','Tenho pouca disponibilidade'],['none','Não costumo cozinhar']] })}
    ${select({ label:'Preparar várias refeições de uma vez', name:'routine.mealPrep', value:state.routine.mealPrep, options:[['yes','Sim'],['maybe','Talvez'],['no','Prefiro não']] })}
    ${select({ label:'Geladeira e micro-ondas quando está fora', name:'routine.fridgeMicrowave', value:state.routine.fridgeMicrowave, options:[['both','Tenho os dois'],['fridge','Só geladeira'],['microwave','Só micro-ondas'],['none','Nenhum'],['na','Não se aplica']] })}
    ${select({ label:'Faixa de custo desejada', name:'routine.budget', value:state.routine.budget, options:[['economic','Econômica'],['balanced','Intermediária'],['flexible','Custo não é prioridade']] })}
    ${select({ label:'Quantidade de refeições preferida', name:'routine.preferredMeals', value:state.routine.preferredMeals, options:[['3','3 maiores'],['4','4 refeições'],['5','5 refeições'],['flexible','Sem preferência']] })}
    ${select({ label:'Período em que sente mais fome', name:'routine.hungerPeriod', value:state.routine.hungerPeriod, options:[['morning','Manhã'],['lunch','Almoço'],['afternoon','Tarde'],['night','Noite'],['late','Madrugada'],['varies','Varia muito'],['unsure','Não sei perceber um padrão']] })}
    ${textarea({ label:'Detalhes importantes da rotina', name:'routine.notes', value:state.routine.notes, help:'Campo aberto mantido apenas para contexto que não cabe nas alternativas acima.' })}
  </div>`);
}
function step7() {
  assessmentShell(`<div class="form-grid">
    ${field({ label:'Musculação por semana (dias)', name:'training.daysPerWeek', value:state.training.daysPerWeek, type:'number', min:'0', max:'7', inputmode:'numeric' })}
    ${field({ label:'Duração média do treino (min)', name:'training.durationMin', value:state.training.durationMin, type:'number', min:'0', max:'240', inputmode:'numeric' })}
    ${select({ label:'Intensidade percebida', name:'training.intensity', value:state.training.intensity, options:[['light','Leve'],['moderate','Moderada'],['high','Alta'],['unsure','Não sei avaliar']] })}
    ${field({ label:'Horário habitual', name:'training.time', value:state.training.time, type:'time' })}
    ${select({ label:'Experiência com musculação', name:'training.experience', value:state.training.experience, options:[['beginner','Menos de 1 ano'],['intermediate','1–3 anos'],['experienced','Mais de 3 anos'],['returning','Retornando após pausa']] })}
    ${field({ label:'Cardio por semana', name:'training.cardioFrequency', value:state.training.cardioFrequency, type:'number', min:'0', max:'14', inputmode:'numeric' })}
    ${field({ label:'Duração média do cardio (min)', name:'training.cardioDurationMin', value:state.training.cardioDurationMin, type:'number', min:'0', max:'300', inputmode:'numeric' })}
    ${field({ label:'Passos aproximados por dia', name:'training.steps', value:state.training.steps, type:'number', min:'0', max:'50000', inputmode:'numeric' })}
  </div>
  ${radioChoices({ legend:'Como costuma dividir a musculação?', name:'training.split', value:state.training.split, options:trainingSplitOptions, otherName:'training.splitOther', otherValue:state.training.splitOther })}
  ${multiChoices({ legend:'Quais modalidades de cardio costuma fazer?', name:'training.cardioModalities', values:state.training.cardioModalities, options:cardioOptions, otherName:'training.cardioOther', otherValue:state.training.cardioOther })}
  ${multiChoices({ legend:'Outras atividades físicas que fazem parte da rotina', name:'training.activityTypes', values:state.training.activityTypes, options:activityOptions, otherName:'training.activityOther', otherValue:state.training.activityOther })}
  <div class="conditional-block">
    ${radioChoices({ legend:'Possui limitação, dor, fisioterapia ou restrição que interfere no exercício?', name:'training.limitationStatus', value:state.training.limitationStatus, options:statusOptions })}
    <div class="conditional-yes">
      ${multiChoices({ legend:'Onde ou em que tipo de limitação?', name:'training.limitationAreas', values:state.training.limitationAreas, options:limitationAreaOptions, otherName:'training.limitationOther', otherValue:state.training.limitationOther, otherLabel:'Detalhe apenas o necessário para contextualizar o treino' })}
    </div>
  </div>`);
}
function step8() {
  assessmentShell(`<div class="form-grid">
    ${field({ label:'Horas de sono por noite', name:'recovery.sleepHours', value:state.recovery.sleepHours, type:'number', min:'0', max:'16', step:'0.5', inputmode:'decimal' })}
    ${select({ label:'Qualidade percebida do sono', name:'recovery.sleepQuality', value:state.recovery.sleepQuality, options:[['poor','Ruim'],['fair','Regular'],['good','Boa'],['great','Muito boa'],['unsure','Não sei avaliar']] })}
    ${select({ label:'Estresse no dia a dia', name:'recovery.stress', value:state.recovery.stress, options:[['low','Baixo'],['moderate','Moderado'],['high','Alto'],['very-high','Muito alto'],['prefer-not','Prefiro não responder']] })}
    ${field({ label:'Água aproximada por dia (L)', name:'recovery.hydration', value:state.recovery.hydration, type:'number', min:'0', max:'10', step:'0.1', inputmode:'decimal' })}
    ${select({ label:'Fome forte à noite', name:'recovery.hungerNight', value:state.recovery.hungerNight, options:[['never','Raramente / nunca'],['sometimes','Às vezes'],['often','Frequentemente'],['unsure','Não sei avaliar']] })}
    ${select({ label:'Comer por tédio, estresse ou ansiedade', name:'recovery.emotionalEating', value:state.recovery.emotionalEating, options:[['never','Raramente / nunca'],['sometimes','Às vezes'],['often','Frequentemente'],['prefer-not','Prefiro não responder']] })}
    ${textarea({ label:'Outras informações de recuperação', name:'recovery.notes', value:state.recovery.notes, help:'Use somente para algo relevante que não esteja representado nas alternativas.' })}
  </div>
  <div class="conditional-block">
    ${radioChoices({ legend:'Usa suplementos atualmente?', name:'recovery.supplementStatus', value:state.recovery.supplementStatus, options:statusOptions, help:'Vitaminas e suplementos entram apenas como contexto declarado; o VitaFrame não recomenda uso.' })}
    <div class="conditional-yes">
      ${multiChoices({ legend:'Quais tipos?', name:'recovery.supplementTypes', values:state.recovery.supplementTypes, options:supplementOptions, otherName:'recovery.supplementOther', otherValue:state.recovery.supplementOther, otherLabel:'Outro suplemento — nome/dose somente se souber' })}
    </div>
  </div>`);
}
function step9() {
  const c = completeness(state);
  const issues = dataQualityIssues(state);
  const flags = redFlags(state);
  const stats = preferenceStats(state.foodPreferences);
  assessmentShell(`<div class="review-score"><strong>${c.percent}%</strong><div><h2>Completude do perfil</h2><p>${c.completed} de ${c.total} blocos essenciais possuem informação suficiente para um resumo inicial.</p></div></div>
    <div class="review-grid">
      <article><h2>Objetivo</h2><p>${state.goal.primary ? 'Informado' : 'Ainda não informado'}</p></article>
      <article><h2>Corpo</h2><p>${state.body.weightKg && state.body.heightCm ? `${esc(state.body.weightKg)} kg · ${esc(state.body.heightCm)} cm` : 'Dados básicos incompletos'}</p></article>
      <article><h2>Preferências</h2><p>${stats.rated} alimentos avaliados</p></article>
      <article><h2>Treino</h2><p>${state.training.daysPerWeek !== '' ? `${esc(state.training.daysPerWeek)} dia(s)/semana` : 'Ainda não informado'}</p></article>
    </div>
    ${issues.length ? `<div class="notice warning"><strong>Confira estes dados</strong><ul>${issues.map(issue => `<li>${esc(issue.replaceAll('-', ' '))}</li>`).join('')}</ul><p>São verificações de consistência, não avaliações clínicas.</p></div>` : '<div class="notice success"><strong>Nenhuma inconsistência básica detectada</strong><p>Os campos numéricos preenchidos estão dentro das faixas de validação da V1.</p></div>'}
    ${flags.length ? `<div class="notice warning"><strong>Revisão profissional recomendada</strong><ul>${flags.map(flag => `<li>${esc(flag.message)}</li>`).join('')}</ul></div>` : '<div class="notice neutral"><strong>Sem red flags declaradas</strong><p>Isso não significa ausência de risco clínico; apenas que nenhuma das situações perguntadas foi marcada.</p></div>'}
    <div class="review-actions"><button type="button" class="button secondary" data-action="export">Exportar JSON agora</button><a class="button primary" href="#profile">Concluir e abrir perfil</a></div>`);
}

function step10() {
  profileView(true);
}

function profileView(inAssessment = false) {
  const c = completeness(state);
  const insights = deriveInsights(state);
  const flags = redFlags(state);
  const stats = preferenceStats(state.foodPreferences);
  const loved = foodCatalog.flatMap(category => category.items).filter(item => state.foodPreferences[item.id] === 3).map(item => item.label).slice(0, 12);
  const disliked = foodCatalog.flatMap(category => category.items).filter(item => state.foodPreferences[item.id] === 0).map(item => item.label).slice(0, 12);
  const body = state.body;
  const bmr = calculateBMR({ sex:body.sex, age:body.age, weightKg:body.weightKg, heightCm:body.heightCm });
  const bmi = calculateBMI(body.weightKg, body.heightCm);
  const html = `
    <section class="profile-page">
      ${pageHeader('Seu perfil', 'Contexto organizado para a próxima decisão.', 'O VitaFrame resume o que foi informado e destaca estimativas. Ele não transforma esses dados em prescrição automaticamente.')}
      <div class="profile-actions"><button class="button primary" type="button" data-action="print">Imprimir / salvar PDF</button><button class="button secondary" type="button" data-action="export">Exportar JSON</button><label class="button secondary file-button">Importar JSON<input id="importFile" type="file" accept="application/json"></label></div>
      <div class="profile-hero">
        <div><span>Completude</span><strong>${c.percent}%</strong><small>${c.completed}/${c.total} blocos essenciais</small></div>
        <div><span>Peso informado</span><strong>${body.weightKg ? `${esc(body.weightKg)} kg` : '—'}</strong><small>${body.bodyFatDate ? `Medição: ${esc(body.bodyFatDate)}` : 'Sem data informada'}</small></div>
        <div><span>IMC</span><strong>${bmi ? bmi.toFixed(1) : '—'}</strong><small>${bmi ? 'Estimado' : 'Dados insuficientes'}</small></div>
        <div><span>TMB</span><strong>${bmr ? `${Math.round(bmr)} kcal` : '—'}</strong><small>${bmr ? 'Estimativa educacional, não meta' : 'Dados insuficientes'}</small></div>
      </div>
      ${flags.length ? `<div class="notice warning"><strong>Antes de um plano autônomo</strong><ul>${flags.map(flag => `<li>${esc(flag.message)}</li>`).join('')}</ul></div>` : ''}
      <div class="profile-columns">
        <section><h2>Objetivo</h2><dl><div><dt>Prioridade</dt><dd>${esc(goalLabel(state.goal.primary)) || 'Não informado'}</dd></div><div><dt>Ritmo</dt><dd>${esc(state.goal.pace || 'Não informado')}</dd></div></dl>${state.goal.notes ? `<p>${esc(state.goal.notes)}</p>` : ''}</section>
        <section><h2>Composição corporal</h2><dl><div><dt>Altura</dt><dd>${body.heightCm ? `${esc(body.heightCm)} cm` : '—'}</dd></div><div><dt>Gordura corporal</dt><dd>${body.bodyFatPct ? `${esc(body.bodyFatPct)}% · estimado` : '—'}</dd></div><div><dt>Origem</dt><dd>${esc(body.bodyFatSource || 'Não informada')}</dd></div><div><dt>Cintura</dt><dd>${body.waistCm ? `${esc(body.waistCm)} cm` : '—'}</dd></div></dl></section>
        <section><h2>Rotina</h2><dl><div><dt>Trabalho</dt><dd>${esc(state.routine.workMode || '—')}</dd></div><div><dt>Cozinhar</dt><dd>${esc(state.routine.cook || '—')}</dd></div><div><dt>Refeições preferidas</dt><dd>${esc(state.routine.preferredMeals || '—')}</dd></div><div><dt>Maior fome</dt><dd>${esc(state.routine.hungerPeriod || '—')}</dd></div></dl></section>
        <section><h2>Treinamento</h2><dl><div><dt>Musculação</dt><dd>${state.training.daysPerWeek !== '' ? `${esc(state.training.daysPerWeek)} dia(s)/semana` : '—'}</dd></div><div><dt>Duração</dt><dd>${state.training.durationMin ? `${esc(state.training.durationMin)} min` : '—'}</dd></div><div><dt>Horário</dt><dd>${esc(state.training.time || '—')}</dd></div><div><dt>Passos</dt><dd>${state.training.steps ? `${esc(state.training.steps)}/dia` : '—'}</dd></div></dl></section>
      </div>
      <section class="profile-section"><div class="section-title"><div><p class="eyebrow">Preferências</p><h2>O que você reconheceu como mais útil</h2></div><span>${stats.rated} avaliados</span></div><div class="preference-summary"><div><h3>Gosto muito</h3><p>${loved.length ? loved.map(item => `<span>${esc(item)}</span>`).join('') : 'Nenhum item marcado ainda.'}</p></div><div><h3>Não gosto</h3><p>${disliked.length ? disliked.map(item => `<span>${esc(item)}</span>`).join('') : 'Nenhum item marcado ainda.'}</p></div></div></section>
      <section class="profile-section"><div class="section-title"><div><p class="eyebrow">Insights</p><h2>Derivados com transparência</h2></div></div><div class="insight-list">${insights.length ? insights.map(item => `<article class="insight ${item.type}"><span>${esc(item.type)}</span><h3>${esc(item.title)}</h3><strong>${esc(item.value)}</strong><p>${esc(item.detail)}</p></article>`).join('') : '<p>Preencha mais dados para habilitar estimativas e verificações.</p>'}</div></section>
      <section class="profile-section"><div class="section-title"><div><p class="eyebrow">Próxima ação</p><h2>Use este perfil como ponto de partida, não como prescrição.</h2></div></div><p>Você pode exportar os dados, salvar esta página como PDF e compartilhar o contexto com nutricionista, profissional de Educação Física ou outro profissional habilitado quando fizer sentido.</p></section>
    </section>`;
  if (inAssessment) assessmentShell(html);
  else app.innerHTML = html;
  document.querySelector('#importFile')?.addEventListener('change', importFile);
}

function goalLabel(value) {
  return ({'fat-loss':'Perder gordura','muscle':'Ganhar massa muscular','recomp':'Recomposição corporal','organize':'Organizar contexto'})[value] || '';
}

function privacyView() {
  app.innerHTML = `<section class="content-page">${pageHeader('Privacidade', 'Seus dados ficam com você na V1.', 'A aplicação foi desenhada para funcionar sem conta, backend, analytics ou scripts de terceiros.')}
    <div class="content-stack">
      <article><h2>Persistência opcional</h2><p>Sem consentimento, suas respostas existem apenas na sessão atual. Ao ativar, o VitaFrame grava o estado no localStorage deste navegador.</p><button class="button ${hasConsent() ? 'secondary' : 'primary'}" type="button" data-action="consent">${hasConsent() ? 'Desativar e apagar dados locais' : 'Ativar salvamento local'}</button></article>
      <article><h2>Exportação e exclusão</h2><p>Você pode exportar JSON a qualquer momento. Também pode apagar o armazenamento local sem depender de uma conta ou suporte.</p><div class="inline-actions"><button class="button secondary" type="button" data-action="export">Exportar JSON</button><button class="button danger" type="button" data-action="clear">Apagar avaliação local</button></div></article>
      <article><h2>Limite desta arquitetura</h2><p>localStorage não é um prontuário clínico e não oferece a governança necessária para produto multiusuário. Uma versão comercial com nuvem exige autenticação, criptografia, segregação, retenção, auditoria e governança LGPD adequadas.</p></article>
    </div></section>`;
}

function referencesView() {
  app.innerHTML = `<section class="content-page">${pageHeader('Referências', 'Evidência e limites visíveis.', 'A V1 usa referências para fundamentar regras e cálculos educacionais, sem converter literatura em prescrição automática.')}
    <div class="reference-list">${references.map(reference => `<article><span>${esc(reference.type)}</span><div><h2>${esc(reference.title)}</h2><p>${esc(reference.note)}</p><a href="${esc(reference.url)}" rel="noreferrer" target="_blank">Abrir fonte oficial / primária ↗</a></div></article>`).join('')}</div></section>`;
}

function route() {
  const hash = location.hash || '#home';
  if (hash.startsWith('#assessment')) {
    const match = hash.match(/step=(\d+)/);
    if (match) currentStep = Math.min(10, Math.max(1, Number(match[1])));
    renderStep();
  } else if (hash === '#profile') profileView();
  else if (hash === '#privacy') privacyView();
  else if (hash === '#references') referencesView();
  else homeView();
  document.querySelector('#main')?.focus({ preventScroll: true });
  scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

function renderStep() {
  [step1, step2, step3, step4, step5, step6, step7, step8, step9, step10][currentStep - 1]();
  bindForm();
}

function bindForm() {
  const form = document.querySelector('#assessmentForm');
  if (!form) return;
  form.addEventListener('input', handleFieldChange);
  form.addEventListener('change', handleFieldChange);
}

function handleFieldChange(event) {
  const target = event.target;
  if (!target?.name) return;

  if (target.name.startsWith('preference.')) {
    const id = target.name.split('.')[1];
    state.foodPreferences[id] = target.value === 'n' ? 'n' : Number(target.value);
    persist();
    return;
  }

  const arrayPath = target.dataset.arrayPath;
  if (arrayPath) {
    const group = target.closest('.structured-group');
    if (target.checked && target.dataset.exclusive === 'true') {
      group?.querySelectorAll('[data-array-path]').forEach(input => {
        if (input !== target) input.checked = false;
      });
    } else if (target.checked) {
      group?.querySelectorAll('[data-array-path][data-exclusive="true"]').forEach(input => { input.checked = false; });
    }
    const values = [...(group?.querySelectorAll('[data-array-path]:checked') ?? [])].map(input => input.value);
    setPathValue(state, arrayPath, values);
  } else {
    setPathValue(state, target.name, target.type === 'checkbox' ? target.checked : target.value);
  }

  const root = target.name.split('.')[0];
  if (['health','currentDiet','routine','training','recovery'].includes(root)) state[root].answered = true;

  if (target.name === 'health.attentionStatus' && target.value !== 'yes') {
    for (const key of ['medicalFollowup','chestPain','eatingDisorder','rapidWeightChange','pregnancy','kidneyDisease','diabetesMedication','acuteInjury']) {
      state.health[key] = false;
    }
  }

  persist();
}

function nextStep() {
  if (currentStep < steps.length) {
    currentStep += 1;
    state.meta.lastStep = currentStep;
    persist();
    location.hash = `#assessment?step=${currentStep}`;
  }
}

function previousStep() {
  if (currentStep > 1) {
    currentStep -= 1;
    state.meta.lastStep = currentStep;
    persist();
    location.hash = `#assessment?step=${currentStep}`;
  }
}

function exportData() {
  const blob = new Blob([JSON.stringify(safeExport(state), null, 2)], { type: 'application/json' });
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = `vitaframe-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(href);
  showToast('Exportação preparada.');
}

async function importFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    if (!parsed || parsed?.meta?.format && parsed.meta.format !== 'vitaframe-v1') throw new Error('Formato incompatível');
    state = { ...structuredClone(initialState), ...parsed, meta: { ...initialState.meta, ...(parsed.meta ?? {}) } };
    persist('Dados importados.');
    profileView();
  } catch {
    showToast('Não foi possível importar esse arquivo.');
  } finally {
    event.target.value = '';
  }
}

document.addEventListener('click', event => {
  const actionEl = event.target.closest('[data-action]');
  const stepEl = event.target.closest('[data-step]');
  if (stepEl) {
    currentStep = Number(stepEl.dataset.step);
    state.meta.lastStep = currentStep;
    persist();
    location.hash = `#assessment?step=${currentStep}`;
    return;
  }
  if (!actionEl) return;
  const action = actionEl.dataset.action;
  if (action === 'start') {
    if (!hasConsent()) location.hash = '#privacy';
    else location.hash = `#assessment?step=${state.meta.lastStep || 1}`;
  }
  if (action === 'next') nextStep();
  if (action === 'previous') previousStep();
  if (action === 'export') exportData();
  if (action === 'print') window.print();
  if (action === 'consent') {
    if (hasConsent()) {
      setConsent(false);
      state = structuredClone(initialState);
      showToast('Salvamento local desativado e dados locais apagados.');
    } else {
      setConsent(true);
      saveState(state);
      showToast('Salvamento local ativado.');
    }
    updatePrivacyChip();
    privacyView();
  }
  if (action === 'clear') {
    if (confirm('Apagar a avaliação salva neste navegador? Esta ação não pode ser desfeita.')) {
      clearState();
      state = structuredClone(initialState);
      currentStep = 1;
      showToast('Avaliação local apagada.');
      privacyView();
    }
  }
});

window.addEventListener('hashchange', route);

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

route();
