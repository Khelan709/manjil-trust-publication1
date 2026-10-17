// Admin content editor: renders every content document and edits lists/fields correctly. Run with: npm test
import React from 'react';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'http://localhost/' });
globalThis.window = dom.window; globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement; globalThis.Event = dom.window.Event; globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.structuredClone ??= (v) => JSON.parse(JSON.stringify(v));
const { createRoot } = await import('react-dom/client');
const { act } = await import('react');
const { renderToString } = await import('react-dom/server');
const { default: JsonEditor } = await import('../src/admin/JsonEditor.jsx');
const { DEFAULT_CONTENT } = await import('../src/data/defaults.js');
const { deepMerge } = await import('../src/content/merge.js');
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };

// 1. every content doc renders in the editor without throwing
for (const key of Object.keys(DEFAULT_CONTENT)) {
  try { const h = renderToString(<JsonEditor value={DEFAULT_CONTENT[key]} imageKeys={Object.keys(DEFAULT_CONTENT.images)} />); ok(h.length > 200, `editor renders "${key}" (${h.length} bytes)`); }
  catch (e) { ok(false, `editor renders "${key}": ${e.message}`); }
}

// 2. interaction: edit text, add / remove / reorder list items
let value = { hero: { title: 'Old title' }, items: [{ title: 'A', text: 'x' }, { title: 'B', text: 'y' }], tags: ['one', 'two'] };
const root = createRoot(document.getElementById('root'));
const render = () => act(() => root.render(<JsonEditor value={value} onChange={(v) => { value = v; render(); }} imageKeys={[]} />));
await render();
const q = (sel) => [...document.querySelectorAll(sel)];
const setVal = (el, v) => { const proto = el.tagName === 'TEXTAREA' ? dom.window.HTMLTextAreaElement.prototype : dom.window.HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v); el.dispatchEvent(new dom.window.Event('input', { bubbles: true })); };
const title = q('input').find((i) => i.value === 'Old title');
await act(() => setVal(title, 'New title'));
ok(value.hero.title === 'New title', 'typing updates nested string');
await act(() => q('button').find((b) => b.textContent.includes('Add item') && true).click());
ok(value.items.length === 3 || value.tags.length === 3, 'Add item appends to a list');
const addButtons = q('button').filter((b) => b.textContent.includes('Add item'));
await act(() => addButtons[addButtons.length - 1].click());
ok(value.items.length + value.tags.length === 6, 'Add item works on both object and string lists');
ok(value.items.at(-1).title === '' && value.items.at(-1).text === '', 'new object item is a blank copy of the shape');
const down = q('button[aria-label="Move down"]')[0];
await act(() => down.click());
ok(value.items[0].title === 'B' && value.items[1].title === 'A', 'Move down reorders');
window.confirm = () => true;
const del = q('button[aria-label="Remove"]')[0];
const before = value.items.length + value.tags.length;
await act(() => del.click());
ok(value.items.length + value.tags.length === before - 1, 'Remove deletes an item');
const merged = deepMerge({ a: { b: 1, c: 2 }, l: [1, 2] }, { a: { c: 9 }, l: [7] });
ok(merged.a.b === 1 && merged.a.c === 9 && merged.l.length === 1, 'deepMerge keeps defaults, overrides values, replaces lists');
process.exit(fails ? 1 : 0);
