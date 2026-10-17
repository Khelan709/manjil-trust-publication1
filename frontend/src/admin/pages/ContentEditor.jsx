import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import JsonEditor from '../JsonEditor';
import { adminApi } from '../adminApi';
import { CONTENT_SECTIONS, DEFAULT_CONTENT } from '../../data/defaults';
import { deepMerge } from '../../content/merge';
import { useReloadContent } from '../../content/ContentContext';

const LIVE_PATH = { home: '/', about: '/about', contact: '/contact', openAccess: '/open-access', resources: '/resources', waiver: '/request-waiver', settings: '/', faqs: '/', images: '/' };

/** Edits one content document: defaults + saved edits → form → PUT. */
export default function ContentEditor() {
  const { key } = useParams();
  const section = CONTENT_SECTIONS.find((s) => s.key === key);
  const reloadSite = useReloadContent();
  const [draft, setDraft] = useState(null);
  const [savedJson, setSavedJson] = useState('');
  const [state, setState] = useState({ loading: true, error: '', ok: '', saving: false, updated: '' });

  const imageKeys = useMemo(() => Object.keys(DEFAULT_CONTENT.images), []);

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: '', ok: '' }));
    try {
      const r = await adminApi.getContent(key);
      const effective = deepMerge(DEFAULT_CONTENT[key], r.data);
      setDraft(effective); setSavedJson(JSON.stringify(effective));
      setState((s) => ({ ...s, loading: false, updated: r.updatedAt ? `Last saved ${new Date(r.updatedAt).toLocaleString()} by ${r.updatedBy}` : 'Showing built-in defaults (not edited yet)' }));
    } catch (e) {
      setState((s) => ({ ...s, loading: false, error: e.message }));
    }
  }, [key]);

  useEffect(() => { if (section) load(); }, [section, load]);

  const dirty = draft && JSON.stringify(draft) !== savedJson;
  useEffect(() => {
    const warn = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  if (!section) return <p className="text-error">Unknown section.</p>;

  const save = async () => {
    setState((s) => ({ ...s, saving: true, error: '', ok: '' }));
    try {
      await adminApi.saveContent(key, draft);
      setSavedJson(JSON.stringify(draft));
      await reloadSite();
      setState((s) => ({ ...s, saving: false, ok: 'Saved. The website now shows your changes.', updated: `Last saved ${new Date().toLocaleString()}` }));
    } catch (e) {
      setState((s) => ({ ...s, saving: false, error: e.message }));
    }
  };

  const reset = async () => {
    if (!window.confirm(`Reset “${section.label}” to the built-in defaults? All your edits to this area will be lost.`)) return;
    try {
      await adminApi.resetContent(key);
      await reloadSite();
      await load();
      setState((s) => ({ ...s, ok: 'Reset to defaults.' }));
    } catch (e) {
      setState((s) => ({ ...s, error: e.message }));
    }
  };

  return (
    <div className="max-w-4xl flex flex-col gap-4">
      <div className="sticky top-0 z-20 bg-surface-container-low/95 backdrop-blur py-3 flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/50">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary font-bold">{section.label}</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">{section.hint} <span className="italic">{state.updated}</span></p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && <span className="font-label-sm text-label-sm text-secondary font-semibold">Unsaved changes</span>}
          <Link to={LIVE_PATH[key]} target="_blank" className="px-3 py-2 rounded border border-outline-variant text-primary font-label-md text-label-md hover:bg-surface-container">View live</Link>
          <button type="button" onClick={reset} className="px-3 py-2 rounded border border-outline-variant text-on-surface-variant font-label-md text-label-md hover:bg-surface-container">Reset to defaults</button>
          <button type="button" onClick={save} disabled={!dirty || state.saving} className="px-5 py-2 rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md font-bold hover:bg-secondary-fixed-dim disabled:opacity-50">
            {state.saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {state.error && <p role="alert" className="font-body-sm text-body-sm text-error bg-error-container/50 rounded p-3">{state.error}</p>}
      {state.ok && <p role="status" className="font-body-sm text-body-sm text-on-secondary-fixed bg-secondary-container/60 rounded p-3">{state.ok}</p>}
      {state.loading && <p className="text-on-surface-variant">Loading…</p>}

      {draft && (
        <div className="bg-surface-container-lowest rounded-lg shadow-sm p-5">
          <JsonEditor value={draft} onChange={setDraft} imageKeys={imageKeys} />
        </div>
      )}
    </div>
  );
}
