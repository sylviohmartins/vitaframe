export const allergyOptions = [
  ['milk', 'Leite'],
  ['egg', 'Ovo'],
  ['soy', 'Soja'],
  ['wheat', 'Trigo e cereais relacionados'],
  ['peanut', 'Amendoim'],
  ['tree-nuts', 'Castanhas e outras oleaginosas'],
  ['fish', 'Peixes'],
  ['crustaceans', 'Crustáceos'],
  ['sesame', 'Gergelim'],
  ['medication', 'Medicamento'],
  ['insect', 'Picada ou veneno de inseto'],
  ['latex', 'Látex'],
  ['other', 'Outra'],
];

export const intoleranceOptions = [
  ['lactose', 'Lactose / leite causa desconforto'],
  ['fructose', 'Frutose / algumas frutas causam desconforto'],
  ['polyols', 'Adoçantes ou polióis causam desconforto'],
  ['caffeine', 'Cafeína causa desconforto'],
  ['wheat-discomfort', 'Trigo / glúten causa desconforto'],
  ['unsure-trigger', 'Tenho desconforto, mas não sei o gatilho'],
  ['other', 'Outro alimento ou componente'],
];

export const weekendOptions = [
  ['similar', 'É parecido com os dias úteis'],
  ['later', 'Horários ficam mais tarde'],
  ['social', 'Faço mais refeições sociais / em família'],
  ['delivery', 'Peço mais delivery ou como fora'],
  ['snacks', 'Belisco ou faço mais lanches'],
  ['sweets', 'Consumo mais doces / sobremesas'],
  ['alcohol', 'Consumo mais bebida alcoólica'],
  ['fewer-meals', 'Faço menos refeições planejadas'],
  ['other', 'Outra mudança'],
];

export const trainingSplitOptions = [
  ['full-body', 'Full body'],
  ['upper-lower', 'Upper / lower'],
  ['ab', 'AB'],
  ['abc', 'ABC'],
  ['abcd-plus', 'ABCD ou mais divisões'],
  ['ppl', 'Push / pull / legs'],
  ['variable', 'Varia conforme a semana ou orientação'],
  ['unsure', 'Não sei o nome da divisão'],
  ['other', 'Outra divisão'],
];

export const cardioOptions = [
  ['walking', 'Caminhada'],
  ['running', 'Corrida'],
  ['bike', 'Bicicleta / spinning'],
  ['elliptical', 'Elíptico'],
  ['stairs', 'Escada'],
  ['swimming', 'Natação'],
  ['dance', 'Dança'],
  ['team-sport', 'Esporte coletivo'],
  ['hiit', 'HIIT / circuito'],
  ['other', 'Outra modalidade'],
];

export const activityOptions = [
  ['walking-transport', 'Caminhada no deslocamento'],
  ['cycling-transport', 'Bicicleta no deslocamento'],
  ['team-sport', 'Futebol ou outro esporte coletivo'],
  ['racquet', 'Tênis / beach tennis / outro esporte de raquete'],
  ['martial-arts', 'Luta / arte marcial'],
  ['dance', 'Dança'],
  ['yoga-pilates', 'Yoga / pilates'],
  ['swimming', 'Natação'],
  ['other', 'Outra atividade'],
];

export const limitationAreaOptions = [
  ['knee', 'Joelho'],
  ['ankle-foot', 'Tornozelo / pé'],
  ['hip', 'Quadril'],
  ['lower-back', 'Lombar'],
  ['upper-back-neck', 'Costas / pescoço'],
  ['shoulder', 'Ombro'],
  ['elbow-wrist-hand', 'Cotovelo / punho / mão'],
  ['other', 'Outra região ou limitação'],
];

export const supplementOptions = [
  ['protein', 'Proteína em pó / whey'],
  ['creatine', 'Creatina'],
  ['caffeine', 'Cafeína / pré-treino'],
  ['vitamin-mineral', 'Vitaminas / minerais'],
  ['omega3', 'Ômega-3'],
  ['electrolytes', 'Eletrólitos / isotônico'],
  ['fiber', 'Fibras'],
  ['other', 'Outro suplemento'],
];

export const dietHistoryOptions = [
  ['calorie-counting', 'Contagem de calorias'],
  ['low-carb', 'Low carb'],
  ['intermittent-fasting', 'Jejum intermitente'],
  ['meal-plan', 'Cardápio / plano alimentar'],
  ['professional', 'Acompanhamento com nutricionista'],
  ['app-tracking', 'Registro em aplicativo'],
  ['none', 'Nunca segui uma estratégia específica'],
  ['other', 'Outra estratégia'],
];

export const adherenceBarrierOptions = [
  ['hunger', 'Fome / pouca saciedade'],
  ['repetition', 'Repetição / pouca variedade'],
  ['cooking-time', 'Tempo para cozinhar'],
  ['work-routine', 'Trabalho / estudo'],
  ['weekends', 'Fim de semana'],
  ['social', 'Eventos e refeições sociais'],
  ['cost', 'Custo'],
  ['planning', 'Planejamento / compras'],
  ['portion', 'Controle de porção'],
  ['motivation', 'Manter consistência'],
  ['other', 'Outro fator'],
];

export const exerciseOptions = [
  ['squat', 'Agachamento'],
  ['leg-press', 'Leg press'],
  ['lunge', 'Afundo / passada'],
  ['leg-extension', 'Cadeira extensora'],
  ['leg-curl', 'Mesa / cadeira flexora'],
  ['rdl', 'Stiff / levantamento romeno'],
  ['deadlift', 'Levantamento terra'],
  ['hip-thrust', 'Hip thrust / elevação pélvica'],
  ['bench-press', 'Supino'],
  ['chest-press', 'Chest press / máquina'],
  ['overhead-press', 'Desenvolvimento de ombros'],
  ['lateral-raise', 'Elevação lateral'],
  ['row', 'Remada'],
  ['lat-pulldown', 'Puxada na frente'],
  ['pull-up', 'Barra fixa'],
  ['biceps-curl', 'Rosca de bíceps'],
  ['triceps', 'Tríceps na polia / extensão'],
  ['calf-raise', 'Panturrilha'],
  ['core', 'Abdominais / core'],
  ['other', 'Outro exercício'],
];

export const mealQuickOptions = {
  breakfast: [
    ['bread-eggs', 'Pão com ovo'],
    ['bread-cheese', 'Pão com queijo'],
    ['omelet', 'Ovos / omelete'],
    ['tapioca', 'Tapioca / crepioca'],
    ['yogurt-fruit', 'Iogurte + fruta / granola'],
    ['oats-fruit', 'Aveia + fruta'],
    ['fruit', 'Fruta'],
    ['protein-shake', 'Whey / shake proteico'],
    ['skip', 'Não costumo tomar café da manhã'],
    ['other', 'Outro'],
  ],
  lunch: [
    ['rice-beans-chicken', 'Arroz, feijão e frango'],
    ['rice-beans-meat', 'Arroz, feijão e carne'],
    ['plate', 'Prato feito / executivo'],
    ['self-service', 'Restaurante por quilo'],
    ['pasta', 'Macarrão / massa'],
    ['salad-protein', 'Salada / legumes + proteína'],
    ['delivery', 'Delivery'],
    ['skip', 'Não tenho almoço regular'],
    ['other', 'Outro'],
  ],
  snack: [
    ['fruit', 'Fruta'],
    ['yogurt', 'Iogurte'],
    ['sandwich', 'Sanduíche / pão'],
    ['nuts', 'Castanhas / amendoim'],
    ['protein-shake', 'Whey / shake proteico'],
    ['sweets', 'Doce / sobremesa'],
    ['savory', 'Salgado / lanche'],
    ['skip', 'Não costumo fazer lanche'],
    ['other', 'Outro'],
  ],
  dinner: [
    ['rice-beans-protein', 'Arroz, feijão e proteína'],
    ['lunch-repeat', 'Parecido com o almoço'],
    ['sandwich', 'Sanduíche / lanche'],
    ['omelet', 'Ovos / omelete'],
    ['pasta', 'Macarrão / massa'],
    ['salad-protein', 'Salada / legumes + proteína'],
    ['delivery', 'Delivery'],
    ['skip', 'Não tenho jantar regular'],
    ['other', 'Outro'],
  ],
  supper: [
    ['fruit', 'Fruta'],
    ['yogurt', 'Iogurte'],
    ['milk', 'Leite / bebida láctea'],
    ['sandwich', 'Pão / sanduíche'],
    ['protein-shake', 'Whey / shake proteico'],
    ['sweet', 'Doce / sobremesa'],
    ['skip', 'Não costumo fazer ceia'],
    ['other', 'Outro'],
  ],
  drinks: [
    ['water', 'Água'],
    ['coffee', 'Café'],
    ['milk', 'Leite / bebida láctea'],
    ['tea', 'Chá'],
    ['juice', 'Suco'],
    ['soda', 'Refrigerante'],
    ['zero-soda', 'Refrigerante zero'],
    ['energy', 'Energético'],
    ['alcohol', 'Bebida alcoólica'],
    ['other', 'Outra bebida'],
  ],
  sweets: [
    ['chocolate', 'Chocolate'],
    ['ice-cream', 'Sorvete'],
    ['cake', 'Bolo'],
    ['brigadeiro', 'Brigadeiro / docinho'],
    ['cookie', 'Cookie / brownie'],
    ['dessert', 'Sobremesa após refeição'],
    ['rare-none', 'Raramente / não costumo consumir'],
    ['other', 'Outro'],
  ],
};

export const statusOptions = [
  ['none', 'Não'],
  ['yes', 'Sim'],
  ['unsure', 'Não sei / não tenho certeza'],
  ['prefer-not', 'Prefiro não informar'],
];

export function optionLabel(options, value) {
  return options.find(([id]) => id === value)?.[1] || value || '';
}

export function formatSelections(values, options, other = '') {
  const selected = Array.isArray(values) ? values : [];
  const labels = selected
    .filter(value => value !== 'other')
    .map(value => optionLabel(options, value))
    .filter(Boolean);
  if (selected.includes('other') && String(other || '').trim()) labels.push(String(other).trim());
  return labels.join(', ');
}

function migrateLegacyText(target, statusKey, itemsKey, otherKey, legacyKey) {
  const legacy = typeof target?.[legacyKey] === 'string' ? target[legacyKey].trim() : '';
  if (!target || target[statusKey]) return;
  if (!legacy) return;
  target[statusKey] = 'yes';
  target[itemsKey] = ['other'];
  target[otherKey] = legacy;
}

function migrateMeal(target, key) {
  const legacy = typeof target?.[key] === 'string' ? target[key].trim() : '';
  const choicesKey = `${key}Choices`;
  const otherKey = `${key}Other`;
  if (!target || Array.isArray(target[choicesKey]) || !legacy) return;
  target[choicesKey] = ['other'];
  target[otherKey] = legacy;
}

export function migrateStructuredState(input) {
  const state = structuredClone(input || {});
  state.meta ??= {};
  state.meta.version = Math.max(Number(state.meta.version || 1), 2);

  state.health ??= {};
  state.currentDiet ??= {};
  state.routine ??= {};
  state.training ??= {};
  state.recovery ??= {};

  migrateLegacyText(state.health, 'allergyStatus', 'allergyItems', 'allergyOther', 'allergies');
  migrateLegacyText(state.health, 'intoleranceStatus', 'intoleranceItems', 'intoleranceOther', 'intolerances');

  for (const [status, legacy] of [
    ['conditionStatus', 'conditions'],
    ['medicationStatus', 'medications'],
    ['surgeryStatus', 'surgeries'],
    ['painStatus', 'pain'],
  ]) {
    const text = typeof state.health[legacy] === 'string' ? state.health[legacy].trim() : '';
    if (!state.health[status] && text) state.health[status] = 'yes';
  }

  if (!Array.isArray(state.health.painAreas) && state.health.painStatus === 'yes' && state.health.pain) {
    state.health.painAreas = ['other'];
    state.health.painOther = state.health.pain;
  }

  for (const key of ['breakfast', 'lunch', 'snack', 'dinner', 'supper', 'drinks', 'sweets']) migrateMeal(state.currentDiet, key);
  if (!Array.isArray(state.currentDiet.weekendChoices) && state.currentDiet.weekendDiff) {
    state.currentDiet.weekendChoices = ['other'];
    state.currentDiet.weekendOther = state.currentDiet.weekendDiff;
  }

  if (!state.routine.workModeOther) state.routine.workModeOther = '';
  if (!state.body) state.body = {};
  if (!state.body.bodyFatSourceOther) state.body.bodyFatSourceOther = '';

  if (!Array.isArray(state.training.cardioModalities) && state.training.cardio) {
    state.training.cardioModalities = ['other'];
    state.training.cardioOther = state.training.cardio;
  }
  if (!Array.isArray(state.training.activityTypes) && state.training.otherActivity) {
    state.training.activityTypes = ['other'];
    state.training.activityOther = state.training.otherActivity;
  }
  if (!state.training.limitationStatus && state.training.limitations) state.training.limitationStatus = 'yes';
  if (!Array.isArray(state.training.limitationAreas) && state.training.limitations) {
    state.training.limitationAreas = ['other'];
    state.training.limitationOther = state.training.limitations;
  }
  if (!Array.isArray(state.training.exerciseSelections) && state.training.exercises) {
    state.training.exerciseSelections = ['other'];
    state.training.exerciseOther = state.training.exercises;
  }

  if (!state.recovery.supplementStatus && state.recovery.supplements) state.recovery.supplementStatus = 'yes';
  if (!Array.isArray(state.recovery.supplementTypes) && state.recovery.supplements) {
    state.recovery.supplementTypes = ['other'];
    state.recovery.supplementOther = state.recovery.supplements;
  }
  if (!Array.isArray(state.recovery.dietHistoryChoices) && state.recovery.dietHistory) {
    state.recovery.dietHistoryChoices = ['other'];
    state.recovery.dietHistoryOther = state.recovery.dietHistory;
  }
  if (!Array.isArray(state.recovery.adherenceBarriers) && state.recovery.dietExperience) {
    state.recovery.adherenceBarriers = ['other'];
    state.recovery.adherenceOther = state.recovery.dietExperience;
  }

  return state;
}
