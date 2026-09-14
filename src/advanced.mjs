import {
  STORAGE_KEY,
  hasConsent,
  loadTheme,
  saveTheme,
  saveState,
} from './storage.mjs';
import {
  adaptiveFollowUps,
  applyDetectedValues,
  createProgressSnapshot,
  localMetrics,
  parseImportedHealthText,
  validateImportObject,
} from './advanced-logic.mjs';

const HISTORY_KEY = 'vitaframe:v1:history';
const REVIEW_KEY = 'vitaframe:v1:professional-review';
const SECURE_FORMAT = 'vitaframe-secure-v1';
const IMPORT_PREVIEW_PLACEHOLDER = './assets/import-preview-placeholder.svg';

const $ = selector => document.querySelector(selector);
const enc = new TextEncoder();
const dec = new TextDecoder();
let selectedImageFile = null;
let detected = [];

function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function currentState() {
  if (!hasConsent()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (!hasConsent()) return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function toast(message) {
  const node = $('#toast');
  node.textContent = message;
  node.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { node.hidden = true; }, 2800);
}

function download(name, content, type = 'application/json') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function bytesToBase64(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

async function deriveKey(password, salt, usages) {
  const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 250000 },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    usages,
  );
}

async function encryptPayload(payload, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt, ['encrypt']);
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(payload)));
  return {
    format: SECURE_FORMAT,
    createdAt: new Date().toISOString(),
    kdf: { name: 'PBKDF2', hash: 'SHA-256', iterations: 250000, salt: bytesToBase64(salt) },
    cipher: { name: 'AES-GCM', iv: bytesToBase64(iv) },
    data: bytesToBase64(new Uint8Array(cipher)),
  };
}

async function decryptPayload(wrapper, password) {
  if (wrapper?.format !== SECURE_FORMAT) throw new Error('Formato criptografado incompatível.');
  if (wrapper?.kdf?.iterations !== 250000 || wrapper?.kdf?.hash !== 'SHA-256') throw new Error('Parâmetros criptográficos inesperados.');
  const salt = base64ToBytes(wrapper.kdf.salt);
  const iv = base64ToBytes(wrapper.cipher.iv);
  const cipher = base64ToBytes(wrapper.data);
  const key = await deriveKey(password, salt, ['decrypt']);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher);
  return JSON.parse(dec.decode(plain));
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111214' : '#f5f5f7');
  $('#themeToggle').setAttribute('aria-pressed', String(theme === 'dark'));
  saveTheme(theme);
}

function renderPrivacy() {
  const node = $('#privacyStatus');
  if (hasConsent()) {
    node.innerHTML = '<span class="status-dot" aria-hidden="true"></span>&nbsp; Persistência local autorizada neste navegador';
  } else {
    node.innerHTML = '<span class="status-dot muted" aria-hidden="true"></span>&nbsp; Salvamento local desativado · <a href="./index.html#privacy">ativar na tela de privacidade</a>';
  }
}

function renderAdaptive() {
  const state = currentState();
  const node = $('#adaptiveList');
  if (!state) {
    node.innerHTML = '<div class="notice neutral"><strong>Nenhuma avaliação local disponível</strong><p>Ative o salvamento local e preencha a avaliação para gerar perguntas contextuais.</p></div>';
    return;
  }
  const followups = adaptiveFollowUps(state);
  if (!followups.length) {
    node.innerHTML = '<div class="notice success"><strong>Nenhuma lacuna prioritária detectada</strong><p>O motor local não encontrou follow-ups essenciais com as regras atuais.</p></div>';
    return;
  }
  node.innerHTML = followups.map((item, index) => `
    <article class="adaptive-item">
      <span class="priority" aria-label="Prioridade ${item.priority}">${index + 1}</span>
      <div><h3>${esc(item.question)}</h3><p>${esc(item.reason)}</p><small>${esc(item.domain)} · prioridade ${item.priority}</small></div>
    </article>`).join('');
}

function renderDetected() {
  const node = $('#detectedResults');
  if (!detected.length) {
    node.innerHTML = '<p class="microcopy">Nenhum campo reconhecido ainda.</p>';
    return;
  }
  node.innerHTML = `
    <table class="detected-table">
      <thead><tr><th>Usar</th><th>Campo</th><th>Valor</th></tr></thead>
      <tbody>${detected.map((item, index) => `<tr><td><input type="checkbox" data-detected="${index}" checked aria-label="Usar ${esc(item.label)}"></td><td>${esc(item.label)}</td><td>${esc(item.value)} ${esc(item.unit)}</td></tr>`).join('')}</tbody>
    </table>
    <div class="detected-summary"><p class="microcopy">Confirme os valores antes de gravar. Reconhecimento por padrão ou OCR não substitui conferência humana.</p><button class="button primary" id="applyDetectedButton" type="button">Confirmar no perfil</button></div>`;
  $('#applyDetectedButton')?.addEventListener('click', applyDetected);
}

async function detectFromImage(file) {
  if (!file) return '';
  if (!('TextDetector' in window)) return '';
  try {
    const bitmap = await createImageBitmap(file);
    const detector = new window.TextDetector();
    const blocks = await detector.detect(bitmap);
    bitmap.close?.();
    return blocks.map(block => block.rawValue || block.text || '').filter(Boolean).join('\n');
  } catch (error) {
    console.warn('Native OCR unavailable for this image.', error);
    return '';
  }
}

async function identifyImport() {
  let text = $('#healthText').value.trim();
  if (!text && selectedImageFile) {
    const nativeText = await detectFromImage(selectedImageFile);
    if (nativeText) {
      text = nativeText;
      $('#healthText').value = nativeText;
      toast('Texto identificado localmente pelo navegador. Confira antes de aplicar.');
    } else {
      toast('OCR nativo indisponível. Cole o texto do relatório para continuar sem enviar a imagem a terceiros.');
    }
  }
  detected = parseImportedHealthText(text);
  renderDetected();
}

function applyDetected() {
  const state = currentState();
  if (!state) return toast('Ative o salvamento local antes de alterar a avaliação.');
  const selected = detected.filter((_, index) => document.querySelector(`[data-detected="${index}"]`)?.checked);
  if (!selected.length) return toast('Selecione pelo menos um valor.');
  const source = /zepp/i.test($('#healthText').value) ? 'zepp-life-import' : 'local-assisted-import';
  const next = applyDetectedValues(state, selected, source, new Date().toISOString());
  if (!saveState(next)) return toast('Não foi possível salvar os valores.');
  toast(`${selected.length} dado(s) confirmado(s) no perfil.`);
  renderAdaptive();
  renderMetrics();
}

function loadHistory() {
  return readJson(HISTORY_KEY, []);
}

function renderHistory() {
  const list = loadHistory();
  const node = $('#historyList');
  if (!list.length) {
    node.innerHTML = '<p class="microcopy">Nenhum snapshot salvo. O histórico só cresce quando você confirma uma medição.</p>';
    return;
  }
  node.innerHTML = list.slice().reverse().map(item => `
    <div class="history-row">
      <strong>${new Date(item.recordedAt).toLocaleString('pt-BR')}</strong>
      <span>${item.weightKg ?? '—'} kg</span>
      <span>${item.waistCm ?? '—'} cm cintura</span>
      <span>${item.bodyFatPct ?? '—'}% gordura</span>
      <span>${item.trainingDaysPerWeek ?? '—'} treino(s)/sem</span>
      <button type="button" data-delete-history="${esc(item.id)}">Excluir</button>
    </div>`).join('');
  node.querySelectorAll('[data-delete-history]').forEach(button => button.addEventListener('click', () => {
    const next = loadHistory().filter(item => item.id !== button.dataset.deleteHistory);
    writeJson(HISTORY_KEY, next);
    renderHistory();
    renderMetrics();
  }));
}

function saveSnapshot() {
  const state = currentState();
  if (!state) return toast('Ative o salvamento local e preencha a avaliação primeiro.');
  const snapshot = createProgressSnapshot(state);
  const list = loadHistory();
  list.push(snapshot);
  if (!writeJson(HISTORY_KEY, list.slice(-100))) return toast('Não foi possível salvar o histórico.');
  renderHistory();
  renderMetrics();
  toast('Medição adicionada ao histórico.');
}

function exportHistory() {
  download(`vitaframe-history-${new Date().toISOString().slice(0,10)}.json`, JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), history: loadHistory() }, null, 2));
}

function loadReview() {
  return readJson(REVIEW_KEY, { type: '', status: 'pending', clarifications: '', notes: '', updatedAt: '' });
}

function renderReview() {
  const review = loadReview();
  const form = $('#professionalForm');
  form.elements.type.value = review.type || '';
  form.elements.status.value = review.status || 'pending';
  form.elements.clarifications.value = review.clarifications || '';
  form.elements.notes.value = review.notes || '';
}

function saveReview(event) {
  event.preventDefault();
  if (!hasConsent()) return toast('Ative o salvamento local antes de registrar uma revisão.');
  const data = new FormData(event.currentTarget);
  const review = {
    type: data.get('type') || '',
    status: data.get('status') || 'pending',
    clarifications: data.get('clarifications') || '',
    notes: data.get('notes') || '',
    updatedAt: new Date().toISOString(),
  };
  writeJson(REVIEW_KEY, review);
  toast('Revisão profissional salva separadamente do relato original.');
}

function clearReview() {
  if (!hasConsent()) return;
  localStorage.removeItem(REVIEW_KEY);
  renderReview();
  toast('Revisão local removida.');
}

async function secureExport() {
  const state = currentState();
  const password = $('#securePassword').value;
  if (!state) return toast('Nenhuma avaliação local disponível.');
  if (password.length < 10) return toast('Use uma senha com pelo menos 10 caracteres.');
  const payload = {
    assessment: state,
    history: loadHistory(),
    professionalReview: loadReview(),
    exportedAt: new Date().toISOString(),
  };
  try {
    const wrapper = await encryptPayload(payload, password);
    download(`vitaframe-${new Date().toISOString().slice(0,10)}.vfsecure`, JSON.stringify(wrapper), 'application/json');
    $('#secureStatus').textContent = 'Arquivo criptografado gerado localmente. Compartilhe a senha por outro canal.';
  } catch {
    $('#secureStatus').textContent = 'Não foi possível criptografar neste navegador.';
  }
}

async function secureImport() {
  const file = $('#encryptedImportFile').files?.[0];
  const password = $('#securePassword').value;
  if (!file) return toast('Selecione um arquivo .vfsecure.');
  if (!hasConsent()) return toast('Ative o salvamento local antes de importar.');
  try {
    const wrapper = JSON.parse(await file.text());
    const payload = await decryptPayload(wrapper, password);
    const validation = validateImportObject(payload.assessment);
    if (!validation.ok) throw new Error(validation.reason);
    saveState(payload.assessment);
    if (Array.isArray(payload.history)) writeJson(HISTORY_KEY, payload.history.slice(-100));
    if (payload.professionalReview) writeJson(REVIEW_KEY, payload.professionalReview);
    $('#secureStatus').textContent = 'Arquivo descriptografado e importado. Revise o perfil antes de usar os dados.';
    renderAll();
  } catch (error) {
    $('#secureStatus').textContent = `Importação falhou: ${error.message || 'senha incorreta ou arquivo inválido'}`;
  }
}

function renderMetrics() {
  const state = currentState();
  const metrics = localMetrics(state || {}, loadHistory());
  const entries = [
    ['Etapa atual', metrics.currentStep, 'Calculado localmente'],
    ['Tempo entre criação e última edição', metrics.elapsedMinutes == null ? '—' : `${metrics.elapsedMinutes} min`, 'Não mede tempo ativo de tela'],
    ['Snapshots', metrics.historyCount, 'Histórico local'],
    ['Alimentos avaliados', metrics.ratedFoods, 'Sem enviar preferências'],
    ['Objetivo informado', metrics.hasGoal ? 'Sim' : 'Não', 'Completude estrutural'],
    ['Corpo básico', metrics.hasBodyBasics ? 'Completo' : 'Pendente', 'Peso + altura'],
  ];
  $('#metricsGrid').innerHTML = entries.map(([label, value, note]) => `<article class="metric"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(note)}</small></article>`).join('');
}

function renderAll() {
  renderPrivacy();
  renderAdaptive();
  renderDetected();
  renderHistory();
  renderReview();
  renderMetrics();
}

const theme = loadTheme() || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(theme);
$('#themeToggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

$('#healthImage').addEventListener('change', event => {
  selectedImageFile = event.target.files?.[0] || null;
  const wrap = $('#imagePreviewWrap');
  const image = $('#imagePreview');
  if (!selectedImageFile) {
    wrap.hidden = true;
    image.src = IMPORT_PREVIEW_PLACEHOLDER;
    image.alt = 'Prévia do screenshot selecionado';
    return;
  }
  image.src = IMPORT_PREVIEW_PLACEHOLDER;
  image.alt = `Screenshot selecionado: ${selectedImageFile.name}`;
  wrap.hidden = false;
});
$('#detectButton').addEventListener('click', identifyImport);
$('#clearImportButton').addEventListener('click', () => {
  selectedImageFile = null;
  $('#healthImage').value = '';
  $('#healthText').value = '';
  $('#imagePreviewWrap').hidden = true;
  $('#imagePreview').src = IMPORT_PREVIEW_PLACEHOLDER;
  $('#imagePreview').alt = 'Prévia do screenshot selecionado';
  detected = [];
  renderDetected();
});
$('#snapshotButton').addEventListener('click', saveSnapshot);
$('#exportHistoryButton').addEventListener('click', exportHistory);
$('#professionalForm').addEventListener('submit', saveReview);
$('#clearReviewButton').addEventListener('click', clearReview);
$('#encryptedExportButton').addEventListener('click', secureExport);
$('#encryptedImportButton').addEventListener('click', secureImport);

renderAll();