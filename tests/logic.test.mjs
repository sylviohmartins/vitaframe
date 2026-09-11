import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBMI, calculateBMR, completeness, dataQualityIssues, estimateFatMass,
  estimateLeanMass, preferenceStats, redFlags, toNumber
} from '../src/logic.mjs';

test('toNumber accepts Brazilian decimal comma', () => {
  assert.equal(toNumber('89,65'), 89.65);
  assert.equal(toNumber(''), null);
});

test('BMI is calculated from kg and cm', () => {
  assert.equal(calculateBMI(89.65, 179).toFixed(1), '28.0');
});

test('Mifflin-St Jeor returns null without compatible sex data', () => {
  assert.equal(calculateBMR({ sex: 'unspecified', age: 29, weightKg: 90, heightCm: 179 }), null);
  assert.equal(Math.round(calculateBMR({ sex: 'male', age: 29, weightKg: 90, heightCm: 179 })), 1879);
});

test('body composition derivations remain mathematical estimates', () => {
  assert.equal(estimateFatMass(89.65, 28.2).toFixed(1), '25.3');
  assert.equal(estimateLeanMass(89.65, 28.2).toFixed(1), '64.4');
});

test('preference stats distinguish liked, disliked and unknown', () => {
  assert.deepEqual(preferenceStats({ a: 3, b: 2, c: 0, d: 'n' }), { rated: 4, liked: 2, loved: 1, disliked: 1, unknown: 1 });
});

test('red flags are explicit and deterministic', () => {
  const flags = redFlags({ health: { kidneyDisease: true, chestPain: true } });
  assert.equal(flags.length, 2);
  assert.ok(flags.some(flag => flag.key === 'kidneyDisease'));
});

test('data quality catches implausible values without diagnosing', () => {
  const issues = dataQualityIssues({ body: { age: 29, weightKg: 500, heightCm: 179, bodyFatPct: 28 } });
  assert.deepEqual(issues, ['peso-improvavel']);
});

test('completeness rewards meaningful blocks instead of every field', () => {
  const state = {
    goal: { primary: 'fat-loss' }, body: { age: 29, heightCm: 179, weightKg: 90 }, health: { answered: true },
    currentDiet: { answered: true }, foodPreferences: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`x${i}`, 2])),
    routine: { answered: true }, training: { answered: true }, recovery: { answered: true }
  };
  assert.equal(completeness(state).percent, 100);
});
