// The ONLY place the API URL is read. Set VITE_API_URL in client/.env (local) or your host's env settings.
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiEnabled = Boolean(API_URL);

async function request(path, { method = 'GET', body, signal, timeout = 15000 } = {}) {
  if (!apiEnabled) throw new Error('API is not configured (VITE_API_URL is empty).');
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  signal?.addEventListener('abort', () => ctrl.abort());
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const err = new Error(data?.error || 'Request failed');
      err.status = res.status;
      err.details = data?.details;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  get: (path, opts) => request(path, opts),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
};
