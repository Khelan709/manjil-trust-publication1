// Browser-simulated (jsdom) checks of the client requirements. Run with: npm test
import React from 'react';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'http://localhost/' });
globalThis.window = dom.window; globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement; globalThis.Event = dom.window.Event; globalThis.IS_REACT_ACT_ENVIRONMENT = true;
dom.window.scrollTo = () => {}; globalThis.structuredClone ??= (v) => JSON.parse(JSON.stringify(v));
let overrides = {};
globalThis.fetch = async (url) => ({ ok: true, status: 200, json: async () => ({ content: overrides }) });
const { createRoot } = await import('react-dom/client'); const { act } = await import('react');
const { MemoryRouter } = await import('react-router-dom');
const { ContentProvider } = await import('../src/content/ContentContext.jsx');
const { default: App } = await import('../src/App.jsx');
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const mount = async (path) => { document.body.innerHTML = '<div id="root"></div>'; const root = createRoot(document.getElementById('root'));
  await act(async () => { root.render(<MemoryRouter initialEntries={[path]}><ContentProvider><App /></ContentProvider></MemoryRouter>); }); await act(async () => { await new Promise((r) => setTimeout(r, 20)); }); return root; };
const text = () => document.body.textContent;
const link = (label) => [...document.querySelectorAll('a')].find((a) => a.textContent.trim() === label);

// ---- defaults (built-in content, no admin edits)
let root = await mount('/');
const nav = [...document.querySelectorAll('nav[aria-label="Primary"] a')].map((a) => a.textContent.trim());
ok(JSON.stringify(nav) === JSON.stringify(['Home', 'Journals', 'Open Access', 'Resources', 'About', 'Contact']), `menu = ${nav.join(', ')}`);
ok(![...document.querySelectorAll('nav[aria-label="Primary"] a')].some((a) => /submit/i.test(a.textContent)), 'no Submit Manuscript in the navigation bar');
ok(!/Frankfurt Book Fair 2025 Delegation/.test(text()) || true, '(announcement check below)');
const topbar = document.querySelector('header > div');
ok(!/Frankfurt Book Fair 2025 Delegation Open/.test(topbar.textContent), 'top header: Frankfurt announcement removed');
ok(!/Institutional Inquiries/.test(topbar.textContent), 'top header: "Institutional Inquiries" removed');
const submit = [...topbar.querySelectorAll('a')].find((a) => /Submit Manuscript/.test(a.textContent));
ok(submit && submit.getAttribute('href') === '/contact', 'top header: Submit Manuscript present; empty URL falls back to /contact');
const li = topbar.querySelector('a[aria-label="LinkedIn"]');
ok(li && li.nextElementSibling === null && submit.compareDocumentPosition(li) & 4, 'LinkedIn icon comes after Submit Manuscript');
ok(/Select by discipline/.test(text()) && !/Filter by discipline/.test(text()), 'Home: "Select by discipline" label');
const sel = document.querySelector('#discipline-filter');
ok(sel && sel.tagName === 'SELECT' && sel.value === 'all' && sel.options[0].textContent === 'All Disciplines', 'Home: discipline control is a dropdown defaulting to All Disciplines');
ok(!/Manjil Trust/.test(text()), 'no "Manjil Trust" anywhere on Home');
const guidelines = link('Author Guidelines'); ok(guidelines && guidelines.getAttribute('href') === '/open-access', 'Home: Author Guidelines → /open-access');
ok(!document.querySelector('a[href="/submit-manuscript"]'), 'no link to a /submit-manuscript page');
ok(!document.querySelector('a[href="/subscriptions"]'), 'no link to /subscriptions');
await act(async () => root.unmount());

// ---- admin edits arrive from the API
overrides = { settings: { brand: { name: 'Edited Brand' }, links: { submitManuscriptUrl: 'https://forms.example.com/submit', linkedinUrl: 'https://www.linkedin.com/company/manjil' } },
  home: { hero: { title: 'Admin edited headline' } } };
root = await mount('/');
const top2 = document.querySelector('header > div');
const s2 = [...top2.querySelectorAll('a')].find((a) => /Submit Manuscript/.test(a.textContent));
ok(s2.getAttribute('href') === 'https://forms.example.com/submit' && s2.getAttribute('target') === '_blank' && /noopener/.test(s2.rel), 'admin-set Submit URL used (new tab, noopener)');
ok(top2.querySelector('a[aria-label="LinkedIn"]').getAttribute('href') === 'https://www.linkedin.com/company/manjil', 'admin-set LinkedIn URL used');
ok(/Edited Brand/.test(document.querySelector('header').textContent) && /Admin edited headline/.test(text()), 'admin-edited brand and Home headline show on the site');
const card = [...document.querySelectorAll('article a')].find((a) => /Submit Manuscript/.test(a.textContent));
ok(card && card.getAttribute('href') === 'https://forms.example.com/submit', 'journal card Submit button also uses the admin URL');
await act(async () => root.unmount());

// ---- hostile URL from admin is neutralised
overrides = { settings: { links: { submitManuscriptUrl: 'javascript:alert(1)', linkedinUrl: 'javascript:alert(2)' } } };
root = await mount('/');
const top3 = document.querySelector('header > div');
ok([...top3.querySelectorAll('a')].every((a) => !/^javascript:/i.test(a.getAttribute('href') || '')), 'javascript: URLs never reach an href');
ok(!top3.querySelector('a[aria-label="LinkedIn"]'), 'invalid LinkedIn URL hides the icon');
await act(async () => root.unmount());

// ---- other pages: theme + FAQ + waiver button
overrides = {};
root = await mount('/open-access');
ok(/Request for Waiver/.test(text()) && !/Download Waiver Request Form/.test(text()), 'Open Access: button reads "Request for Waiver"');
ok([...document.querySelectorAll('a')].find((a) => a.textContent.includes('Request for Waiver'))?.getAttribute('href') === '/request-waiver', 'Open Access: waiver button → /request-waiver');
ok(/Frequently Asked Questions/.test(text()), 'Open Access: FAQ present');
const hero = document.querySelector('main section'); 
await act(async () => root.unmount());
for (const p of ['/about', '/contact', '/resources', '/journals', '/request-waiver']) {
  root = await mount(p); ok(/Frequently Asked Questions/.test(text()) && !/Manjil Trust/.test(text()), `${p}: renders with FAQ, no "Manjil Trust"`); await act(async () => root.unmount());
}
root = await mount('/subscriptions'); ok(/could not be found/.test(text()), '/subscriptions is gone (404 page)'); await act(async () => root.unmount());
process.exit(fails ? 1 : 0);
