import test from 'node:test';
import assert from 'node:assert/strict';
import { adaptiveQuestions, getPath, normalizeAnswer, setPath } from '../src/adaptive-interview-logic.mjs';

function baseState() {
  return {
    meta: { adaptiveSkipped: {} },
    body: { weightKg: '90', heightCm: '178' },
    lifestyle: {},
    training: {},
    recovery: { sleepHours: '7' },
  };
}

test('alcohol frequency is omitted when alcohol use is no', () => {
  const state = baseState();
  state.lifestyle.alcoholUse = 'no';
  const fields = adaptiveQuestions(state).map(question => question.field);
  assert.ok(!fields.includes('lifestyle.alcoholFrequency'));
});

test('alcohol frequency appears only after alcohol use yes', () => {
  const state = baseState();
  state.lifestyle.alcoholUse = 'yes';
  const fields = adaptiveQuestions(state).map(question => question.field);
  assert.ok(fields.includes('lifestyle.alcoholFrequency'));
});

test('training detail questions are omitted when current training days are zero', () => {
  const state = baseState();
  state.training.daysPerWeek = '0';
  const fields = adaptiveQuestions(state).map(question => question.field);
  assert.ok(!fields.includes('training.time'));
  assert.ok(!fields.includes('training.experience'));
});

test('training details appear when person currently trains', () => {
  const state = baseState();
  state.training.daysPerWeek = '4';
  const fields = adaptiveQuestions(state).map(question => question.field);
  assert.ok(fields.includes('training.time'));
  assert.ok(fields.includes('training.experience'));
});

test('skipped questions are not immediately asked again', () => {
  const state = baseState();
  state.training.daysPerWeek = '4';
  state.meta.adaptiveSkipped['training.time'] = true;
  const fields = adaptiveQuestions(state).map(question => question.field);
  assert.ok(!fields.includes('training.time'));
  assert.ok(fields.includes('training.experience'));
});

test('setPath and getPath preserve nested answer', () => {
  const state = {};
  setPath(state, 'training.daysPerWeek', '5');
  assert.equal(getPath(state, 'training.daysPerWeek'), '5');
});

test('normalizeAnswer enforces numeric bounds', () => {
  const question = { type: 'number', min: 0, max: 7 };
  assert.equal(normalizeAnswer(question, '4').ok, true);
  assert.equal(normalizeAnswer(question, '-1').ok, false);
  assert.equal(normalizeAnswer(question, '8').ok, false);
  assert.equal(normalizeAnswer(question, 'abc').ok, false);
});

test('body-fat provenance questions appear only when body fat exists', () => {
  const state = baseState();
  let fields = adaptiveQuestions(state).map(question => question.field);
  assert.ok(!fields.includes('body.bodyFatSource'));
  state.body.bodyFatPct = '28.2';
  fields = adaptiveQuestions(state).map(question => question.field);
  assert.ok(fields.includes('body.bodyFatSource'));
  assert.ok(fields.includes('body.bodyFatDate'));
});