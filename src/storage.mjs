export const STORAGE_KEY = 'vitaframe:v1:assessment';
export const CONSENT_KEY = 'vitaframe:v1:consent';
export const THEME_KEY = 'vitaframe:v1:theme';

export function hasStorage() {
  try {
    const key = '__vf_test__';
    localStorage.setItem(key, '1');
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function hasConsent() {
  return hasStorage() && localStorage.getItem(CONSENT_KEY) === 'yes';
}

export function setConsent(value) {
  if (!hasStorage()) return false;
  if (value) localStorage.setItem(CONSENT_KEY, 'yes');
  else {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(STORAGE_KEY);
  }
  return true;
}

export function loadState(fallback) {
  if (!hasConsent()) return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return { ...fallback, ...parsed, meta: { ...fallback.meta, ...(parsed.meta ?? {}) } };
  } catch {
    return fallback;
  }
}

export function saveState(state) {
  if (!hasConsent()) return false;
  try {
    const payload = {
      ...state,
      meta: { ...(state.meta ?? {}), updatedAt: new Date().toISOString() }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function clearState() {
  if (!hasStorage()) return;
  localStorage.removeItem(STORAGE_KEY);
}

export function loadTheme() {
  if (!hasStorage()) return null;
  return localStorage.getItem(THEME_KEY);
}

export function saveTheme(theme) {
  if (!hasStorage()) return;
  localStorage.setItem(THEME_KEY, theme);
}
