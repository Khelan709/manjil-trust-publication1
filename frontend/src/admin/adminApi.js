/** Admin API client. The JWT lives in localStorage; every request sends it as a Bearer token. */
const BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const KEY = 'mp_admin_token';

export const getToken = () => { try { return localStorage.getItem(KEY) || ''; } catch { return ''; } };
export const setToken = (t) => { try { localStorage.setItem(KEY, t); } catch { /* storage blocked */ } };
export const clearToken = () => { try { localStorage.removeItem(KEY); } catch { /* ignore */ } };

async function request(path, { method = 'GET', body, form, blob } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  let res;
  try {
    res = await fetch(`${BASE}/api${path}`, { method, headers, body: form || (body !== undefined ? JSON.stringify(body) : undefined) });
  } catch {
    throw new Error('Cannot reach the server. Check that the backend is running.');
  }
  if (res.status === 401 && path !== '/auth/login') {
    clearToken();
    window.dispatchEvent(new Event('admin-unauthorized'));
  }
  if (blob && res.ok) return res.blob();
  let data = null;
  try { data = await res.json(); } catch { /* empty body */ }
  if (!res.ok) throw new Error(data?.message || `Request failed (${res.status}).`);
  return data;
}

export const adminApi = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  me: () => request('/admin/me'),
  getContent: (key) => request(`/admin/content/${key}`),
  saveContent: (key, data) => request(`/admin/content/${key}`, { method: 'PUT', body: { data } }),
  resetContent: (key) => request(`/admin/content/${key}`, { method: 'DELETE' }),
  uploadMedia: (file) => { const f = new FormData(); f.append('file', file); return request('/admin/media', { method: 'POST', form: f }); },
  counts: () => request('/admin/submissions'),
  list: (type, page = 1) => request(`/admin/submissions/${type}?page=${page}`),
  updateSubmission: (type, id, patch) => request(`/admin/submissions/${type}/${id}`, { method: 'PATCH', body: patch }),
  deleteSubmission: (type, id) => request(`/admin/submissions/${type}/${id}`, { method: 'DELETE' }),
  users: () => request('/admin/users'),
  createUser: (u) => request('/admin/users', { method: 'POST', body: u }),
  deleteUser: (id) => request(`/admin/users/${id}`, { method: 'DELETE' }),
  changePassword: (currentPassword, newPassword) => request('/admin/change-password', { method: 'POST', body: { currentPassword, newPassword } }),
  async downloadAttachment(id, filename) {
    const blob = await request(`/admin/media/${id}`, { blob: true });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename || 'attachment'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
};
