/**
 * Thin fetch wrapper around the Express API (see /backend).
 * In dev, Vite proxies /api to http://localhost:5000. In production set
 * VITE_API_BASE_URL if the API lives on a different origin.
 */
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

async function request(path, options = {}) {
  let response;
  try {
    const isForm = options.body instanceof FormData;
    response = await fetch(`${BASE_URL}/api${path}`, {
      // For FormData the browser sets Content-Type (with the multipart boundary) itself.
      headers: isForm ? {} : { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new Error('Unable to reach the server. Please try again shortly.');
  }
  let data = null;
  try {
    data = await response.json();
  } catch {
    /* non-JSON response */
  }
  if (!response.ok) {
    throw new Error(data?.message || `Request failed (${response.status}).`);
  }
  return data;
}

export const api = {
  getContent: () => request('/content'),
  subscribeNewsletter: (email, source) =>
    request('/newsletter', { method: 'POST', body: JSON.stringify({ email, source }) }),
  /** @param {FormData} formData  fields + optional `attachment` file */
  submitInquiry: (formData) => request('/contact', { method: 'POST', body: formData }),
  /** @param {FormData} formData  fields + optional `attachment` file */
  submitWaiverRequest: (formData) => request('/waiver-requests', { method: 'POST', body: formData }),
  requestSamples: (payload) => request('/sample-requests', { method: 'POST', body: JSON.stringify(payload) }),
};
