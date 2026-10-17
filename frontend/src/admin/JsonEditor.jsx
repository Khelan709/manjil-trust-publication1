import { useRef, useState } from 'react';
import Icon from '../components/ui/Icon';
import { adminApi } from './adminApi';
import { safeImageSrc } from '../utils/links';

/**
 * Generic editor for any JSON content document. It renders a form that mirrors the data:
 *   strings → text inputs / textareas · numbers · booleans → checkboxes
 *   lists → reorderable, add/remove-able cards · objects → grouped fields
 * Special field names get helpers: `src`/`href`/`fileUrl` → upload button (+ image preview),
 * `cover`/`image` → image picker, `to` → link hint, `icon` → icon-name hint.
 */

const UPLOAD_FIELDS = new Set(['src', 'href', 'fileUrl']);
const IMAGE_KEY_FIELDS = new Set(['cover', 'image']);
const TITLE_FIELDS = ['title', 'name', 'label', 'question', 'value', 'tag', 'group', 'year'];

const LABELS = { src: 'Image / file URL', alt: 'Image description (alt text)', href: 'File or link URL', to: 'Link (page path or URL)', end: 'Exact match (advanced)', icon: 'Icon name', cover: 'Cover image', id: 'ID (advanced)', tags: 'Search keywords' };
const prettify = (k) => LABELS[k] || String(k).replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]/g, ' ').replace(/^./, (c) => c.toUpperCase());

const itemTitle = (item, i) => {
  if (item && typeof item === 'object') for (const f of TITLE_FIELDS) if (typeof item[f] === 'string' && item[f]) return item[f].slice(0, 70);
  if (typeof item === 'string' && item) return item.slice(0, 70);
  return `Item ${i + 1}`;
};

/** A blank copy of an item's shape, used by "Add item". */
const blankLike = (v) => {
  if (Array.isArray(v)) return [];
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blankLike(x)]));
  if (typeof v === 'number') return 0;
  if (typeof v === 'boolean') return false;
  return '';
};

const INPUT = 'w-full px-3 py-2 rounded border border-outline-variant bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary';
const SMALL_BTN = 'px-2 py-1 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container text-xs inline-flex items-center gap-1 disabled:opacity-40';

function UploadButton({ onDone, setError }) {
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setError('');
    try { onDone((await adminApi.uploadMedia(file)).url); } catch (err) { setError(err.message); } finally { setBusy(false); e.target.value = ''; }
  };
  return (
    <>
      <button type="button" className={SMALL_BTN} disabled={busy} onClick={() => input.current?.click()}>
        <Icon name="upload" size={14} /> {busy ? 'Uploading…' : 'Upload'}
      </button>
      <input ref={input} type="file" className="sr-only" onChange={pick} tabIndex={-1} />
    </>
  );
}

function StringField({ name, value, onChange, imageKeys }) {
  const [error, setError] = useState('');
  const id = useRef(`f${Math.random().toString(36).slice(2)}`).current;
  const label = prettify(name);
  let control;
  if (IMAGE_KEY_FIELDS.has(name) && imageKeys?.length) {
    const opts = imageKeys.includes(value) || !value ? imageKeys : [value, ...imageKeys];
    control = <select id={id} className={INPUT} value={value} onChange={(e) => onChange(e.target.value)}>{!value && <option value="">—</option>}{opts.map((k) => <option key={k} value={k}>{k}</option>)}</select>;
  } else if (UPLOAD_FIELDS.has(name)) {
    const preview = name === 'src' ? safeImageSrc(value) : '';
    control = (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <input id={id} className={INPUT} value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://… or /media/… (use Upload)" />
          <UploadButton onDone={onChange} setError={setError} />
        </div>
        {preview && <img src={preview} alt="" className="h-20 w-auto max-w-xs object-contain rounded border border-outline-variant bg-surface-container-low" />}
      </div>
    );
  } else if (value.length > 90 || value.includes('\n')) {
    control = <textarea id={id} className={INPUT} rows={Math.min(10, Math.max(3, Math.ceil(value.length / 90)))} value={value} onChange={(e) => onChange(e.target.value)} />;
  } else {
    control = <input id={id} className={INPUT} value={value} onChange={(e) => onChange(e.target.value)} />;
  }
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-label-sm text-label-sm text-on-surface-variant font-semibold">{label}</label>
      {control}
      {name === 'to' && <span className="text-xs text-on-surface-variant">Use a page path like <code>/about</code>, a full URL, or <code>@submit</code> for the Submit Manuscript URL.</span>}
      {name === 'icon' && <span className="text-xs text-on-surface-variant">Material Symbols icon name (browse at fonts.google.com/icons), e.g. <code>verified</code>.</span>}
      {error && <span role="alert" className="text-xs text-error">{error}</span>}
    </div>
  );
}

function ListField({ name, value, onChange, imageKeys, depth }) {
  const isPrimitive = value.length > 0 && typeof value[0] !== 'object';
  const template = blankLike(value[0] ?? '');
  const update = (i, v) => onChange(value.map((x, j) => (j === i ? v : x)));
  const move = (i, d) => { const j = i + d; if (j < 0 || j >= value.length) return; const next = [...value]; [next[i], next[j]] = [next[j], next[i]]; onChange(next); };
  const remove = (i) => { if (window.confirm('Remove this item?')) onChange(value.filter((_, j) => j !== i)); };
  const dup = (i) => onChange([...value.slice(0, i + 1), structuredClone(value[i]), ...value.slice(i + 1)]);
  return (
    <div className="flex flex-col gap-2">
      <div className="font-label-md text-label-md text-primary font-semibold">{prettify(name)} <span className="text-on-surface-variant font-normal">({value.length})</span></div>
      {value.map((item, i) => (
        <div key={i} className="rounded border border-outline-variant bg-surface-container-lowest">
          {isPrimitive ? (
            <div className="flex gap-2 items-center p-2">
              <input className={INPUT} value={item} onChange={(e) => update(i, e.target.value)} aria-label={`${prettify(name)} ${i + 1}`} />
              <button type="button" className={SMALL_BTN} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up"><Icon name="arrow_upward" size={14} /></button>
              <button type="button" className={SMALL_BTN} onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down"><Icon name="arrow_downward" size={14} /></button>
              <button type="button" className={SMALL_BTN} onClick={() => remove(i)} aria-label="Remove"><Icon name="delete" size={14} /></button>
            </div>
          ) : (
            <details open={value.length <= 3 && depth < 2}>
              <summary className="cursor-pointer select-none px-3 py-2 flex items-center justify-between gap-2 font-label-md text-label-md text-primary">
                <span className="truncate">{i + 1}. {itemTitle(item, i)}</span>
                <span className="flex gap-1 shrink-0" onClick={(e) => e.preventDefault()}>
                  <button type="button" className={SMALL_BTN} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up"><Icon name="arrow_upward" size={14} /></button>
                  <button type="button" className={SMALL_BTN} onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down"><Icon name="arrow_downward" size={14} /></button>
                  <button type="button" className={SMALL_BTN} onClick={() => dup(i)} aria-label="Duplicate"><Icon name="content_copy" size={14} /></button>
                  <button type="button" className={SMALL_BTN} onClick={() => remove(i)} aria-label="Remove"><Icon name="delete" size={14} /></button>
                </span>
              </summary>
              <div className="p-3 pt-1 border-t border-outline-variant/50">
                <Node value={item} onChange={(v) => update(i, v)} imageKeys={imageKeys} depth={depth + 1} />
              </div>
            </details>
          )}
        </div>
      ))}
      <button type="button" className={`${SMALL_BTN} self-start`} onClick={() => onChange([...value, structuredClone(template)])}>
        <Icon name="add" size={14} /> Add item
      </button>
    </div>
  );
}

function Node({ name = '', value, onChange, imageKeys, depth = 0 }) {
  if (typeof value === 'string' || value === null || value === undefined) return <StringField name={name} value={value ?? ''} onChange={onChange} imageKeys={imageKeys} />;
  if (typeof value === 'number') {
    return (
      <label className="flex flex-col gap-1 font-label-sm text-label-sm text-on-surface-variant font-semibold">{prettify(name)}
        <input type="number" className={INPUT} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </label>
    );
  }
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 font-label-md text-label-md text-on-surface">
        <input type="checkbox" className="h-4 w-4 accent-primary" checked={value} onChange={(e) => onChange(e.target.checked)} /> {prettify(name)}
      </label>
    );
  }
  if (Array.isArray(value)) return <ListField name={name} value={value} onChange={onChange} imageKeys={imageKeys} depth={depth} />;

  // object: render children; nested objects become collapsible groups
  const entries = Object.entries(value);
  const children = entries.map(([k, v]) => {
    const nested = v && typeof v === 'object' && !Array.isArray(v);
    const set = (nv) => onChange({ ...value, [k]: nv });
    if (nested) {
      return (
        <details key={k} open={depth < 1} className="rounded border border-outline-variant/70 bg-surface-container-low/40">
          <summary className="cursor-pointer select-none px-3 py-2 font-label-md text-label-md text-primary font-semibold">{prettify(k)}</summary>
          <div className="p-3 pt-1"><Node name={k} value={v} onChange={set} imageKeys={imageKeys} depth={depth + 1} /></div>
        </details>
      );
    }
    return <Node key={k} name={k} value={v} onChange={set} imageKeys={imageKeys} depth={depth + 1} />;
  });
  return <div className="flex flex-col gap-3">{children}</div>;
}

export default function JsonEditor({ value, onChange, imageKeys }) {
  return <Node value={value} onChange={onChange} imageKeys={imageKeys} depth={0} />;
}
