import test from 'node:test';
import assert from 'node:assert/strict';
import {
  allergyOptions,
  formatSelections,
  mealQuickOptions,
  migrateStructuredState,
  statusOptions,
} from '../../src/question-options.mjs';

test('legacy free text is preserved as Other instead of being guessed', () => {
  const migrated = migrateStructuredState({
    meta: { version: 1 },
    health: { allergies: 'reação a corante não especificado', intolerances: '' },
    currentDiet: { breakfast: 'pão artesanal com requeijão' },
    routine: {},
    training: {},
    recovery: {},
  });
  assert.equal(migrated.meta.version, 2);
  assert.equal(migrated.health.allergyStatus, 'yes');
  assert.deepEqual(migrated.health.allergyItems, ['other']);
  assert.equal(migrated.health.allergyOther, 'reação a corante não especificado');
  assert.deepEqual(migrated.currentDiet.breakfastChoices, ['other']);
  assert.equal(migrated.currentDiet.breakfastOther, 'pão artesanal com requeijão');
});

test('existing structured answers are not overwritten by legacy strings', () => {
  const migrated = migrateStructuredState({
    meta: { version: 2 },
    health: {
      allergies: 'texto antigo',
      allergyStatus: 'none',
      allergyItems: [],
      allergyOther: '',
    },
    currentDiet: {},
    routine: {},
    training: {},
    recovery: {},
  });
  assert.equal(migrated.health.allergyStatus, 'none');
  assert.deepEqual(migrated.health.allergyItems, []);
});

test('legacy commute and training split migrate only when equivalence is safe', () => {
  const mapped = migrateStructuredState({
    meta: { version: 1 },
    health: {},
    currentDiet: {},
    routine: { commute: '45 min por trecho' },
    training: { split: 'upper / lower' },
    recovery: {},
  });
  assert.equal(mapped.routine.commute, '31-60');
  assert.equal(mapped.training.split, 'upper-lower');

  const custom = migrateStructuredState({
    meta: { version: 1 },
    health: {},
    currentDiet: {},
    routine: {},
    training: { split: 'treino próprio do fisioterapeuta' },
    recovery: {},
  });
  assert.equal(custom.training.split, 'other');
  assert.equal(custom.training.splitOther, 'treino próprio do fisioterapeuta');
});

test('legacy red flags explicitly activate attention state without inventing diagnoses', () => {
  const migrated = migrateStructuredState({
    meta: { version: 1 },
    health: { acuteInjury: true },
    currentDiet: {},
    routine: {},
    training: {},
    recovery: {},
  });
  assert.equal(migrated.health.attentionStatus, 'yes');
  assert.equal(migrated.health.acuteInjury, true);
});

test('selection formatter resolves stable ids and custom Other text', () => {
  const value = formatSelections(['milk', 'other'], allergyOptions, 'mostarda');
  assert.equal(value, 'Leite, mostarda');
});

test('open taxonomies expose Other and status semantics stay distinct', () => {
  assert.ok(allergyOptions.some(([id]) => id === 'other'));
  assert.ok(mealQuickOptions.breakfast.some(([id]) => id === 'other'));
  assert.deepEqual(statusOptions.map(([id]) => id), ['none', 'yes', 'unsure', 'prefer-not']);
});
