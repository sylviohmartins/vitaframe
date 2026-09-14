import { hasConsent } from './storage.mjs';

export const METRICS_KEY = 'vitaframe:v1:local-metrics';
const MIN_STEP = 1;
const MAX_STEP = 10;

function read() {
  try {
    return JSON.parse(localStorage.getItem(METRICS_KEY) || '{}');
  } catch {
    return {};
  }
}

function write(value) {
  if (!hasConsent()) return;
  try { localStorage.setItem(METRICS_KEY, JSON.stringify(value)); } catch {}
}

function normalizedStepSeries(value, fallback) {
  const series = Array(MAX_STEP + 1).fill(fallback);
  if (Array.isArray(value)) {
    for (let step = MIN_STEP; step <= MAX_STEP; step += 1) {
      series.splice(step, 1, value[step] ?? fallback);
    }
    return series;
  }
  if (value && typeof value === 'object') {
    for (let step = MIN_STEP; step <= MAX_STEP; step += 1) {
      const legacyValue = Object.prototype.hasOwnProperty.call(value, String(step))
        ? Object.values(value)[Object.keys(value).indexOf(String(step))]
        : fallback;
      series.splice(step, 1, legacyValue ?? fallback);
    }
  }
  return series;
}

export function routeEvent(hash = location.hash, now = new Date().toISOString()) {
  if (!hasConsent()) return null;
  const metrics = read();
  metrics.version = 1;
  metrics.startedAt ||= now;
  metrics.updatedAt = now;
  metrics.routeVisits ??= {};

  const route = hash.startsWith('#assessment') ? 'assessment' : hash.startsWith('#profile') ? 'profile' : hash.startsWith('#privacy') ? 'privacy' : hash.startsWith('#references') ? 'references' : 'home';
  metrics.routeVisits[route] = (metrics.routeVisits[route] || 0) + 1;
  metrics.lastRoute = route;

  const stepMatch = hash.match(/[?&]step=(\d{1,2})(?:&|$)/);
  if (stepMatch) {
    const step = Number.parseInt(stepMatch[1], 10);
    if (Number.isInteger(step) && step >= MIN_STEP && step <= MAX_STEP) {
      const stepVisits = normalizedStepSeries(metrics.stepVisits, 0);
      const stepFirstSeen = normalizedStepSeries(metrics.stepFirstSeen, null);
      const stepLastSeen = normalizedStepSeries(metrics.stepLastSeen, null);

      stepVisits.splice(step, 1, (Number(stepVisits.at(step)) || 0) + 1);
      if (!stepFirstSeen.at(step)) stepFirstSeen.splice(step, 1, now);
      stepLastSeen.splice(step, 1, now);

      metrics.stepVisits = stepVisits;
      metrics.stepFirstSeen = stepFirstSeen;
      metrics.stepLastSeen = stepLastSeen;
      metrics.maxStepSeen = Math.max(Number(metrics.maxStepSeen || 0), step);
    }
  }

  if (route === 'profile') {
    metrics.profileViews = (metrics.profileViews || 0) + 1;
    metrics.firstProfileAt ||= now;
  }

  write(metrics);
  return metrics;
}

export function readLocalMetrics() {
  return read();
}

if (typeof window !== 'undefined') {
  routeEvent();
  window.addEventListener('hashchange', () => routeEvent());
}