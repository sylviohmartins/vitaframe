import test from 'node:test';
import assert from 'node:assert/strict';
import { completeness, dataQualityIssues, deriveInsights, redFlags, safeExport } from '../../src/logic.mjs';
import { adaptiveQuestions } from '../../src/adaptive-interview-logic.mjs';
import { parseImportedHealthText, validateImportObject } from '../../src/advanced-logic.mjs';

const empty = () => ({
  meta: { version: 1, adaptiveSkipped: {} },
  goal: {}, body: {}, health: {}, currentDiet: {}, foodPreferences: {}, routine: {}, lifestyle: {}, training: {}, recovery: {}
});

test('incomplete user remains valid without inventing body values', () => {
  const state = empty();
  const result = completeness(state);
  assert.equal(result.percent, 0);
  assert.equal(deriveInsights(state).length, 0);
  assert.ok(adaptiveQuestions(state).some(question => question.field === 'body.weightKg'));
});

test('user without current training does not receive irrelevant training detail questions', () => {
  const state = empty();
  state.body = { weightKg: '75', heightCm: '170' };
  state.training.daysPerWeek = '0';
  state.recovery.sleepHours = '7';
  state.lifestyle.alcoholUse = 'no';
  const fields = adaptiveQuestions(state).map(question => question.field);
  assert.ok(!fields.includes('training.time'));
  assert.ok(!fields.includes('training.experience'));
  assert.ok(!fields.includes('lifestyle.alcoholFrequency'));
});

test('many dietary restrictions/preferences do not affect core calculations', () => {
  const state = empty();
  state.body = { age: '29', sex: 'male', heightCm: '178', weightKg: '90' };
  state.foodPreferences = Object.fromEntries(Array.from({ length: 120 }, (_, index) => [`food-${index}`, index % 4 === 0 ? 0 : 2]));
  const insights = deriveInsights(state);
  assert.ok(insights.some(item => item.title === 'IMC estimado'));
  assert.ok(insights.some(item => item.title === 'Preferências mapeadas'));
});

test('medical and injury declarations generate attention without diagnosis', () => {
  const state = empty();
  state.health = { chestPain: true, acuteInjury: true, kidneyDisease: true };
  const flags = redFlags(state);
  assert.equal(flags.length, 3);
  assert.ok(flags.every(flag => !/diagn[oó]stic/i.test(flag.message)));
});

test('contradictory or implausible numbers are surfaced as data quality issues', () => {
  const state = empty();
  state.body = { age: '130', weightKg: '500', heightCm: '90', bodyFatPct: '90' };
  assert.deepEqual(dataQualityIssues(state), ['idade-fora-do-escopo','peso-improvavel','altura-improvavel','gordura-improvavel']);
});

test('long free text exports without truncation or execution', () => {
  const state = empty();
  const long = '<script>alert(1)</script>' + 'x'.repeat(20000);
  state.goal.notes = long;
  const exported = safeExport(state);
  assert.equal(exported.goal.notes, long);
  assert.equal(exported.meta.format, 'vitaframe-v1');
});

test('invalid upload text yields no fabricated measurements', () => {
  assert.deepEqual(parseImportedHealthText('imagem sem texto reconhecível ou números relacionados'), []);
  assert.equal(validateImportObject({ meta: { version: 1 }, goal: {}, body: {} }).ok, false);
});

test('vegetarian-compatible preferences are representable without special-casing diet diagnosis', () => {
  const state = empty();
  state.foodPreferences = { tofu: 3, lentilha: 3, graoDeBico: 3, carne: 0 };
  const exported = safeExport(state);
  assert.equal(exported.foodPreferences.tofu, 3);
  assert.equal(exported.foodPreferences.carne, 0);
});

test('interrupted assessment preserves lastStep metadata in export', () => {
  const state = empty();
  state.meta.lastStep = 6;
  assert.equal(safeExport(state).meta.lastStep, 6);
});
