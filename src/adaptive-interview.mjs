import { hasConsent, loadState, loadTheme, saveState, saveTheme } from './storage.mjs';
import { adaptiveQuestions, getPath, normalizeAnswer, setPath } from './adaptive-interview-logic.mjs';

const fallback = {
  meta: { version: 1, createdAt: new Date().toISOString(), lastStep: 1, adaptiveSkipped: {} },
  goal: {},
  body: {},
  health: {},
  currentDiet: {},
  foodPreferences: {},
  foodNotes: {},
  routine: {},
  lifestyle: {},
  training: {},
  recovery: {},
};

let state = loadState(structuredClone(fallback));
state.meta ??= structuredClone(fallback.meta);
state.meta.adaptiveSkipped ??= {};
state.lifestyle ??= {};

const $ = selector => document.querySelector(selector);
const host = $('#questionHost');
const progress = $('#adaptiveProgress');

function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toast(message) {
  const node = $('#toast');
  node.textContent = message;
  node.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { node.hidden = true; }, 2500);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111214' : '#f5f5f7');
  $('#themeToggle').setAttribute('aria-pressed', String(theme === 'dark'));
  saveTheme(theme);
}

function persist() {
  if (!hasConsent()) return false;
  return saveState(state);
}

function inputFor(question) {
  const existing = getPath(state, question.field) ?? '';
  if (question.type === 'select') {
    return `<select id="adaptiveAnswer" aria-labelledby="adaptiveQuestionTitle" aria-describedby="questionHelp"><option value="">Selecione</option>${question.options.map(([value, label]) => `<option value="${esc(value)}" ${String(existing) === String(value) ? 'selected' : ''}>${esc(label)}</option>`).join('')}</select>`;
  }
  const attributes = [
    `type="${esc(question.type)}"`,
    `value="${esc(existing)}"`,
    'aria-labelledby="adaptiveQuestionTitle"',
    'aria-describedby="questionHelp"',
    question.min != null ? `min="${question.min}"` : '',
    question.max != null ? `max="${question.max}"` : '',
    question.step != null ? `step="${question.step}"` : '',
    question.type === 'number' ? 'inputmode="decimal"' : '',
  ].filter(Boolean).join(' ');
  const input = `<input id="adaptiveAnswer" ${attributes}>`;
  return question.suffix ? `<div class="suffix-wrap">${input}<span aria-hidden="true">${esc(question.suffix)}</span></div>` : input;
}

function fullAssessmentTarget(question) {
  if (question.domain === 'Corpo') return './index.html#assessment?step=2';
  if (question.domain === 'Saúde') return './index.html#assessment?step=3';
  if (question.domain === 'Alimentação') return './index.html#assessment?step=4';
  if (question.domain === 'Rotina') return './index.html#assessment?step=6';
  if (question.domain === 'Treino') return './index.html#assessment?step=7';
  if (question.domain === 'Recuperação') return './index.html#assessment?step=8';
  return './index.html#assessment?step=1';
}

function renderDone() {
  progress.textContent = 'Sem perguntas adaptativas pendentes.';
  host.innerHTML = `<div class="adaptive-done"><p class="eyebrow">Revisão concluída</p><h2>Seu perfil não tem lacunas contextuais prioritárias pelas regras atuais.</h2><p>Isso não significa que todas as informações possíveis foram preenchidas nem substitui avaliação profissional.</p><div class="inline-actions" style="justify-content:center"><a class="button primary" href="./index.html#profile">Abrir perfil</a><a class="button secondary" href="./advanced.html">Centro de dados</a><a class="button secondary" href="./meals.html">Dia alimentar</a></div></div>`;
}

function render() {
  if (!hasConsent()) {
    progress.textContent = 'Persistência local desativada.';
    host.innerHTML = `<div class="adaptive-done"><p class="eyebrow">Privacidade primeiro</p><h2>Ative o salvamento local para usar a entrevista adaptativa.</h2><p>As respostas precisam ser persistidas para que perguntas seguintes sejam condicionadas ao que você já informou.</p><a class="button primary" href="./index.html#privacy">Abrir privacidade</a></div>`;
    return;
  }

  const questions = adaptiveQuestions(state);
  if (!questions.length) return renderDone();
  const question = questions[0];
  const skippedCount = Object.keys(state.meta.adaptiveSkipped ?? {}).length;
  progress.textContent = `${questions.length} pergunta${questions.length === 1 ? '' : 's'} contextual${questions.length === 1 ? '' : 'is'} restante${questions.length === 1 ? '' : 's'}${skippedCount ? ` · ${skippedCount} pulada${skippedCount === 1 ? '' : 's'}` : ''}`;
  host.innerHTML = `<form id="adaptiveForm" class="question-card" novalidate>
    <span class="domain">${esc(question.domain)} · prioridade ${question.priority}</span>
    <h2 id="adaptiveQuestionTitle">${esc(question.label)}</h2>
    <p id="questionHelp">${esc(question.help)}</p>
    <div class="question-control">${inputFor(question)}</div>
    <div class="question-error" id="questionError" role="alert"></div>
    <div class="question-actions">
      <a href="${fullAssessmentTarget(question)}" class="button secondary">Abrir etapa completa</a>
      <div class="right"><button type="button" class="button secondary" id="skipQuestion">Pular</button><button type="submit" class="button primary">Salvar e continuar</button></div>
    </div>
  </form>`;

  const answer = $('#adaptiveAnswer');
  answer?.focus();
  $('#adaptiveForm').addEventListener('submit', event => {
    event.preventDefault();
    const result = normalizeAnswer(question, answer?.value);
    if (!result.ok) {
      $('#questionError').textContent = result.reason;
      answer?.focus();
      return;
    }
    setPath(state, question.field, result.value);
    delete state.meta.adaptiveSkipped[question.field];
    state.meta.updatedAt = new Date().toISOString();
    if (!persist()) return toast('Não foi possível salvar a resposta neste navegador.');
    toast('Resposta salva.');
    render();
  });

  $('#skipQuestion').addEventListener('click', () => {
    state.meta.adaptiveSkipped[question.field] = true;
    state.meta.updatedAt = new Date().toISOString();
    if (!persist()) return toast('Não foi possível registrar o pulo desta pergunta.');
    render();
  });
}

const theme = loadTheme() || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(theme);
$('#themeToggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

render();
