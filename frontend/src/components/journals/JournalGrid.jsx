import { useMemo, useState } from 'react';
import Icon from '../ui/Icon';
import JournalCard from './JournalCard';

/**
 * Discipline dropdown + responsive grid of journal cards.
 * filters: [{ key, label }] (first entry should be { key: 'all' }) · journals: [{ category: <filter key>, … }]
 */
export default function JournalGrid({ journals, filters, selectLabel, id = 'discipline-filter' }) {
  const [filter, setFilter] = useState('all');
  const visible = useMemo(
    () => (filter === 'all' ? journals : journals.filter((j) => j.category === filter)),
    [filter, journals]
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-space-xs mb-space-lg">
        <label htmlFor={id} className="font-label-md text-label-md text-primary font-semibold">{selectLabel}</label>
        <div className="relative w-full sm:w-80">
          <select
            id={id}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none pl-space-md pr-10 py-space-sm rounded bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {filters.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
          </select>
          <Icon name="expand_more" size={20} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant sm:ml-space-sm" aria-live="polite">
          Showing {visible.length} of {journals.length} journals
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-space-lg">
        {visible.map((j) => <JournalCard key={j.title} journal={j} />)}
      </div>
    </>
  );
}
