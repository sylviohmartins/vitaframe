import { foodCatalog } from './catalog.mjs';
import { hasConsent, loadState, loadTheme, saveState, saveTheme } from './storage.mjs';

const fallback = {
  meta: { version: 1, createdAt: new Date().toISOString(), lastStep: 4 },
  currentDiet: { answered: false, mealTimeline: [] },
};

let state = loadState(structuredClone(fallback));
state.currentDiet ??= { answered: false };
state.currentDiet.mealTimeline ??= [];

const $ = selector => document.querySelector(selector);

function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function id() {
  return crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function toast(message) {
  const node = $('#toast');
  node.textContent = message;
  node.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { node.hidden = true; }, 2300);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  $('#themeToggle').setAttribute('aria-pressed', String(theme === 'dark'));
  saveTheme(theme);
}

function persist() {
  state.currentDiet.answered = state.currentDiet.mealTimeline.length > 0;
  if (hasConsent()) saveState(state);
}

function newMeal(label = 'Nova refeição', time = '') {
  return {
    id: id(),
    label,
    time,
    foods: '',
    foodSearch: '',
    quantity: '',
    frequency: '',
    quantityUnknown: false,
  };
}

function normalizeMeal(meal) {
  return {
    ...newMeal(),
    ...meal,
  };
}

state.currentDiet.mealTimeline = state.currentDiet.mealTimeline.map(normalizeMeal);

function foodOptions() {
  return [...new Set(foodCatalog.flatMap(category => category.items.map(item => item.label)))];
}

function populateFoodDatalist() {
  const datalist = $('#mealFoodOptions');
  if (!datalist) return;
  datalist.innerHTML = foodOptions().map(label => `<option value="${esc(label)}"></option>`).join('');
}

function seed() {
  if (state.currentDiet.mealTimeline.length && !confirm('Substituir o mapa atual por uma estrutura comum?')) return;
  state.currentDiet.mealTimeline = [
    newMeal('Café da manhã', '08:00'),
    newMeal('Almoço', '12:30'),
    newMeal('Lanche da tarde', '16:30'),
    newMeal('Jantar', '20:00'),
  ];
  persist();
  render();
}

function render() {
  const meals = state.currentDiet.mealTimeline;
  $('#mealCount').textContent = `${meals.length} refeição${meals.length === 1 ? '' : 'ões'}`;
  if (!meals.length) {
    $('#mealTimeline').innerHTML = '<div class="empty-meals"><strong>Seu dia ainda está vazio.</strong><p>Adicione a primeira refeição ou use a estrutura comum e personalize.</p></div>';
    return;
  }
  $('#mealTimeline').innerHTML = meals.map((meal, index) => `
    <article class="meal-card" data-id="${esc(meal.id)}">
      <div class="meal-card-head">
        <strong>Refeição ${index + 1}</strong>
        <div class="meal-actions" aria-label="Ações da refeição ${index + 1}">
          <button type="button" data-action="up" title="Mover para cima" aria-label="Mover refeição para cima" ${index === 0 ? 'disabled' : ''}>↑</button>
          <button type="button" data-action="down" title="Mover para baixo" aria-label="Mover refeição para baixo" ${index === meals.length - 1 ? 'disabled' : ''}>↓</button>
          <button type="button" data-action="remove" title="Remover" aria-label="Remover refeição">×</button>
        </div>
      </div>
      <div class="meal-grid">
        <label class="field"><span>Horário</span><input name="time" type="time" value="${esc(meal.time)}"></label>
        <label class="field"><span>Nome</span><input name="label" type="text" value="${esc(meal.label)}" placeholder="Ex.: pós-treino"></label>
        <label class="field field-wide"><span>Buscar alimento</span><div class="meal-food-search"><input name="foodSearch" type="search" list="mealFoodOptions" value="${esc(meal.foodSearch)}" placeholder="Digite banana, arroz, frango, pizza…"><button class="button secondary compact" data-action="add-food" type="button">Adicionar à refeição</button></div><small>Use a busca para lembrar opções; você também pode escrever alimentos livres abaixo.</small></label>
        <label class="field field-wide"><span>O que você normalmente come/bebe?</span><textarea name="foods" rows="3" placeholder="Ex.: arroz, feijão, frango, salada e refrigerante zero">${esc(meal.foods)}</textarea></label>
        <label class="field"><span>Quantidade aproximada</span><input name="quantity" type="text" value="${esc(meal.quantity)}" placeholder="Ex.: 2 colheres, 150 g, 1 unidade"></label>
        <label class="field"><span>Frequência</span><input name="frequency" type="text" value="${esc(meal.frequency)}" placeholder="Ex.: todos os dias, 3x/semana"></label>
        <label class="quantity-toggle field-wide"><input name="quantityUnknown" type="checkbox" ${meal.quantityUnknown ? 'checked' : ''}> Não sei informar as quantidades com confiança</label>
      </div>
    </article>`).join('');
}

function mealFor(element) {
  const card = element.closest('.meal-card');
  return state.currentDiet.mealTimeline.find(meal => meal.id === card?.dataset.id);
}

$('#mealTimeline').addEventListener('input', event => {
  const meal = mealFor(event.target);
  if (!meal) return;
  if (event.target.name === 'quantityUnknown') meal.quantityUnknown = event.target.checked;
  else if (event.target.name in meal) meal[event.target.name] = event.target.value;
  persist();
});

$('#mealTimeline').addEventListener('change', event => {
  const meal = mealFor(event.target);
  if (!meal) return;
  if (event.target.name === 'quantityUnknown') meal.quantityUnknown = event.target.checked;
  else if (event.target.name in meal) meal[event.target.name] = event.target.value;
  persist();
});

$('#mealTimeline').addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const card = button.closest('.meal-card');
  const index = state.currentDiet.mealTimeline.findIndex(meal => meal.id === card?.dataset.id);
  if (index < 0) return;
  const action = button.dataset.action;
  const meal = state.currentDiet.mealTimeline[index];
  if (action === 'remove') state.currentDiet.mealTimeline.splice(index, 1);
  if (action === 'up' && index > 0) [state.currentDiet.mealTimeline[index - 1], state.currentDiet.mealTimeline[index]] = [state.currentDiet.mealTimeline[index], state.currentDiet.mealTimeline[index - 1]];
  if (action === 'down' && index < state.currentDiet.mealTimeline.length - 1) [state.currentDiet.mealTimeline[index + 1], state.currentDiet.mealTimeline[index]] = [state.currentDiet.mealTimeline[index], state.currentDiet.mealTimeline[index + 1]];
  if (action === 'add-food') {
    const candidate = String(meal.foodSearch || '').trim();
    if (!candidate) return toast('Digite ou escolha um alimento antes de adicionar.');
    meal.foods = meal.foods ? `${meal.foods}, ${candidate}` : candidate;
    meal.foodSearch = '';
  }
  persist();
  render();
});

$('#addMeal').addEventListener('click', () => {
  state.currentDiet.mealTimeline.push(newMeal());
  persist();
  render();
  queueMicrotask(() => document.querySelector('.meal-card:last-child input[name="label"]')?.focus());
});
$('#seedMeals').addEventListener('click', seed);
$('#clearMeals').addEventListener('click', () => {
  if (!state.currentDiet.mealTimeline.length) return;
  if (!confirm('Limpar todas as refeições do mapa?')) return;
  state.currentDiet.mealTimeline = [];
  persist();
  render();
  toast('Mapa alimentar limpo.');
});

const theme = loadTheme() || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(theme);
$('#themeToggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

populateFoodDatalist();
if (!hasConsent()) toast('Sem consentimento de persistência: alterações desta página não serão salvas após fechar/recarregar.');
render();