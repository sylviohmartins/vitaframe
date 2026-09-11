import { hasConsent } from './storage.mjs';

export const METRICS_KEY = 'vitaframe:v1:local-metrics';

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

export function routeEvent(hash = location.hash, now = new Date().toISOString()) {
  if (!hasConsent()) return null;
  const metrics = read();
  metrics.version = 1;
  metrics.startedAt ||= now;
  metrics.updatedAt = now;
  metrics.routeVisits ??= {};
  metrics.stepVisits ??= {};
  metrics.stepFirstSeen ??= {};
  metrics.stepLastSeen ??= {};

  const route = hash.startsWith('#assessment') ? 'assessment' : hash.startsWith('#profile') ? 'profile' : hash.startsWith('#privacy') ? 'privacy' : hash.startsWith('#references') ? 'references' : 'home';
  metrics.routeVisits[route] = (metrics.routeVisits[route] || 0) + 1;
  metrics.lastRoute = route;

  const stepMatch = hash.match(/[?&]step=(\d+)/);
  if (stepMatch) {
    const step = stepMatch[1];
    metrics.stepVisits[step] = (metrics.stepVisits[step] || 0) + 1;
    metrics.stepFirstSeen[step] ||= now;
    metrics.stepLastSeen[step] = now;
    metrics.maxStepSeen = Math.max(Number(metrics.maxStepSeen || 0), Number(step));
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