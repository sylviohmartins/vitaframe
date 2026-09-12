import test from 'node:test';
import assert from 'node:assert/strict';
import {
  adaptiveFollowUps,
  applyDetectedValues,
  createProgressSnapshot,
  localMetrics,
  parseImportedHealthText,
  validateImportObject,
} from '../src/advanced-logic.mjs';

test('parseImportedHealthText recognizes common Zepp-style fields', () => {
  const result = parseImportedHealthText(`
    Peso 89,65 kg
    IMC 28.0
    Gordura corporal 28.2 %
    Água 49,2 %
    Metabolismo basal 1815 kcal
    Gordura visceral 12
    Músculo 61.07 kg
    Proteína 18.8 %
    Massa óssea 3.28 kg
  `);
  const byKey = Object.fromEntries(result.map(item => [item.key, item.value]));
  assert.equal(byKey.weightKg, 89.65);
  assert.equal(byKey.bodyFatPct, 28.2);
  assert.equal(byKey.waterPct, 49.2);
  assert.equal(byKey.bmrKcal, 1815);
  assert.equal(byKey.visceralFat, 12);
  assert.equal(byKey.muscleKg, 61.07);
  assert.equal(byKey.proteinPct, 18.8);
  assert.equal(byKey.boneMassKg, 3.28);
});

test('adaptiveFollowUps asks only relevant missing context', () => {
  const state = {
    body: { weightKg: '90', heightCm: '178', bodyFatPct: '28.2', bodyFatSource: '', bodyFatDate: '' },
    health: { answered: true },
    currentDiet: { answered: true },
    routine: { workMode: 'hybrid' },
    training: { daysPerWeek: '4', time: '', experience: '' },
    recovery: { sleepHours: '7' },
  };
  const questions = adaptiveFollowUps(state).map(item => item.question);
  assert.ok(questions.some(value => value.includes('De onde veio')));
  assert.ok(questions.some(value => value.includes('Quando essa estimativa')));
  assert.ok(questions.some(value => value.includes('horário')));
  assert.ok(questions.some(value => value.includes('Há quanto tempo')));
  assert.ok(!questions.some(value => value.includes('Qual é o seu peso')));
});

test('applyDetectedValues never applies unsupported fields into body implicitly', () => {
  const state = { body: {}, imported: {} };
  const next = applyDetectedValues(state, [
    { key: 'weightKg', value: 89.65 },
    { key: 'bmrKcal', value: 1815 },
  ], 'zepp-life-import', '2026-07-26T13:37:00.000Z');
  assert.equal(next.body.weightKg, '89.65');
  assert.equal(next.body.bmrKcal, undefined);
  assert.equal(next.imported.last.detected.length, 2);
});

test('createProgressSnapshot preserves temporal body context', () => {
  const snap = createProgressSnapshot({
    body: { weightKg: '89.65', waistCm: '96', bodyFatPct: '28.2', bodyFatSource: 'bioimpedance-home' },
    goal: { primary: 'fat-loss' },
    training: { daysPerWeek: '4' },
    recovery: { sleepHours: '7.5' },
  }, '2026-09-11T12:00:00.000Z');
  assert.equal(snap.weightKg, 89.65);
  assert.equal(snap.waistCm, 96);
  assert.equal(snap.bodyFatPct, 28.2);
  assert.equal(snap.trainingDaysPerWeek, 4);
});

test('localMetrics does not require health-content telemetry', () => {
  const metrics = localMetrics({
    meta: { createdAt: '2026-09-11T12:00:00.000Z', updatedAt: '2026-09-11T12:15:00.000Z', lastStep: 6 },
    goal: { primary: 'fat-loss' },
    body: { weightKg: '90', heightCm: '178' },
    foodPreferences: { a: 3, b: 0 },
  }, [{ id: 1 }]);
  assert.deepEqual(metrics, {
    currentStep: 6,
    elapsedMinutes: 15,
    historyCount: 1,
    hasGoal: true,
    hasBodyBasics: true,
    ratedFoods: 2,
  });
});

test('validateImportObject rejects malformed and incompatible imports', () => {
  assert.equal(validateImportObject(null).ok, false);
  assert.equal(validateImportObject({ meta: { version: 2 }, goal: {}, body: {}, health: {} }).ok, false);
  assert.equal(validateImportObject({ meta: { version: 1 }, goal: {}, body: {}, health: {} }).ok, true);
});