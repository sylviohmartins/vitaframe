import { hasConsent, STORAGE_KEY } from './storage.mjs';

const fieldMap = new Map([
  ['Peso', { path: ['body', 'weightKg'], unit: 'kg' }],
  ['Gordura corporal', { path: ['body', 'bodyFatPct'], unit: '%' }],
]);

function currentState() {
  if (!hasConsent()) return null;
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
}

function getPath(object, parts) {
  return parts.reduce((value, key) => value?.[key], object);
}

function number(value) {
  if (value == null || value === '') return null;
  const parsed = Number(String(value).replace(',', '.').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function guardDetectedConflicts() {
  const results = document.querySelector('#detectedResults');
  const table = results?.querySelector('.detected-table');
  if (!table || table.dataset.conflictGuarded === 'true') return;
  const state = currentState();
  if (!state) return;

  const conflicts = [];
  for (const row of table.querySelectorAll('tbody tr')) {
    const cells = row.querySelectorAll('td');
    const label = cells[1]?.textContent?.trim();
    const mapping = fieldMap.get(label);
    if (!mapping) continue;
    const current = number(getPath(state, mapping.path));
    const detected = number(cells[2]?.textContent);
    if (current == null || detected == null || Math.abs(current - detected) < 0.001) continue;

    const checkbox = row.querySelector('input[data-detected]');
    if (checkbox) checkbox.checked = false;
    row.dataset.conflict = 'true';
    cells[1].insertAdjacentHTML('beforeend', `<small class="microcopy"><br><strong>Conflito:</strong> o perfil atual contém ${current} ${mapping.unit}. O relatório detectou ${detected} ${mapping.unit}. Marque “Usar” somente se quiser substituir o valor atual.</small>`);
    conflicts.push(label);
  }

  if (conflicts.length) {
    table.insertAdjacentHTML('beforebegin', `<div class="notice warning" data-import-conflict-notice><strong>Encontramos valores diferentes do seu perfil atual</strong><p>Nenhum valor conflitante foi selecionado automaticamente. Compare as fontes e escolha conscientemente qual referência manter.</p></div>`);
  }
  table.dataset.conflictGuarded = 'true';
}

const host = document.querySelector('#detectedResults');
if (host) {
  new MutationObserver(() => queueMicrotask(guardDetectedConflicts)).observe(host, { childList: true, subtree: true });
  guardDetectedConflicts();
}
