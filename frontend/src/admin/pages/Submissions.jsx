import { Fragment, useCallback, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { adminApi } from '../adminApi';

export const SUBMISSION_TYPES = [
  { key: 'inquiries', label: 'Contact inquiries', cols: ['docket', 'fullName', 'email', 'category', 'subject'], statuses: ['new', 'in_progress', 'resolved'] },
  { key: 'waivers', label: 'Waiver requests', cols: ['docket', 'fullName', 'email', 'country', 'waiverType', 'journalTrack'], statuses: ['new', 'under_review', 'approved', 'partially_approved', 'declined'] },
  { key: 'samples', label: 'Sample requests', cols: ['institution', 'designation', 'email', 'discipline'], statuses: ['new', 'dispatched', 'closed'] },
  { key: 'subscribers', label: 'Newsletter subscribers', cols: ['email', 'source'], statuses: null },
];

const pretty = (k) => k.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
const fmt = (v) => (v && /^\d{4}-\d\d-\d\dT/.test(v) ? new Date(v).toLocaleString() : v);

function Details({ type, item, onChange, onDelete }) {
  const [error, setError] = useState('');
  const patch = async (p) => { try { setError(''); onChange((await adminApi.updateSubmission(type.key, item._id, p)).item); } catch (e) { setError(e.message); } };
  const del = async () => {
    if (!window.confirm('Delete this record permanently?')) return;
    try { await adminApi.deleteSubmission(type.key, item._id); onDelete(item._id); } catch (e) { setError(e.message); }
  };
  const fields = Object.entries(item).filter(([k]) => !['_id', '__v', 'attachment', 'status', 'active'].includes(k));
  return (
    <div className="p-4 bg-surface-container-low flex flex-col gap-3">
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 font-body-sm text-body-sm">
        {fields.map(([k, v]) => (
          <div key={k} className={String(v).length > 80 ? 'md:col-span-2' : ''}>
            <dt className="font-label-sm text-label-sm text-on-surface-variant font-semibold">{pretty(k)}</dt>
            <dd className="text-on-surface whitespace-pre-wrap break-words">{String(fmt(v))}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap items-center gap-3">
        {type.statuses ? (
          <label className="font-label-md text-label-md text-primary flex items-center gap-2">Status
            <select value={item.status} onChange={(e) => patch({ status: e.target.value })} className="px-2 py-1 rounded border border-outline-variant bg-surface-container-lowest">
              {type.statuses.map((s) => <option key={s} value={s}>{pretty(s)}</option>)}
            </select>
          </label>
        ) : (
          <label className="font-label-md text-label-md text-primary flex items-center gap-2">
            <input type="checkbox" checked={item.active} onChange={(e) => patch({ active: e.target.checked })} className="accent-primary" /> Active subscriber
          </label>
        )}
        {item.attachment?.mediaId && (
          <button type="button" onClick={() => adminApi.downloadAttachment(item.attachment.mediaId, item.attachment.originalName).catch((e) => setError(e.message))} className="px-3 py-1.5 rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md font-semibold">
            Download attachment ({item.attachment.originalName})
          </button>
        )}
        <button type="button" onClick={del} className="ml-auto px-3 py-1.5 rounded border border-error text-error font-label-md text-label-md hover:bg-error-container/40">Delete</button>
      </div>
      {error && <p role="alert" className="text-error font-body-sm text-body-sm">{error}</p>}
    </div>
  );
}

export default function Submissions() {
  const { type: typeKey } = useParams();
  const type = SUBMISSION_TYPES.find((t) => t.key === typeKey);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], total: 0, pages: 1 });
  const [openId, setOpenId] = useState(null);
  const [state, setState] = useState({ loading: true, error: '' });

  const load = useCallback(async () => {
    if (!type) return;
    setState({ loading: true, error: '' });
    try { setData(await adminApi.list(type.key, page)); setState({ loading: false, error: '' }); } catch (e) { setState({ loading: false, error: e.message }); }
  }, [type, page]);

  useEffect(() => { setPage(1); setOpenId(null); }, [typeKey]);
  useEffect(() => { load(); }, [load]);

  if (!type) return <Navigate to="/admin" replace />;
  const replace = (item) => setData((d) => ({ ...d, items: d.items.map((x) => (x._id === item._id ? item : x)) }));
  const remove = (id) => { setData((d) => ({ ...d, items: d.items.filter((x) => x._id !== id), total: d.total - 1 })); setOpenId(null); };

  return (
    <div className="max-w-6xl flex flex-col gap-4">
      <div>
        <h1 className="font-headline-xl text-headline-xl text-primary font-bold">{type.label}</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{data.total} total · newest first. Click a row to see everything and update its status.</p>
      </div>
      {state.error && <p role="alert" className="text-error bg-error-container/50 rounded p-3">{state.error}</p>}
      <div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[720px] font-body-sm text-body-sm">
          <thead className="bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider">
            <tr>
              {type.cols.map((c) => <th key={c} className="px-4 py-3">{pretty(c)}</th>)}
              <th className="px-4 py-3">Received</th><th className="px-4 py-3">{type.statuses ? 'Status' : 'Active'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {data.items.map((it) => (
              <Fragment key={it._id}>
                <tr onClick={() => setOpenId(openId === it._id ? null : it._id)} className="cursor-pointer hover:bg-surface-container-low">
                  {type.cols.map((c) => <td key={c} className="px-4 py-3 max-w-[220px] truncate">{String(it[c] ?? '')}</td>)}
                  <td className="px-4 py-3 whitespace-nowrap">{fmt(it.createdAt)}</td>
                  <td className="px-4 py-3">{type.statuses ? pretty(it.status) : it.active ? 'Yes' : 'No'}</td>
                </tr>
                {openId === it._id && <tr><td colSpan={type.cols.length + 2} className="p-0"><Details type={type} item={it} onChange={replace} onDelete={remove} /></td></tr>}
              </Fragment>
            ))}
            {!state.loading && data.items.length === 0 && <tr><td colSpan={type.cols.length + 2} className="px-4 py-8 text-center text-on-surface-variant">Nothing here yet.</td></tr>}
          </tbody>
        </table>
      </div>
      {data.pages > 1 && (
        <div className="flex items-center gap-3 font-label-md text-label-md">
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 rounded border border-outline-variant disabled:opacity-40">Previous</button>
          <span>Page {page} of {data.pages}</span>
          <button type="button" disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 rounded border border-outline-variant disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}
