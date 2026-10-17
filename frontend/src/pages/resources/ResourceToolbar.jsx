import Icon from '../../components/ui/Icon';
import Container from '../../components/ui/Container';
import { useContent } from '../../content/ContentContext';

/** Role tabs + search box. Fully controlled by the parent page. */
export default function ResourceToolbar({ role, onRoleChange, query, onQueryChange }) {
  const ui = useContent('resources').ui;
  const ROLE_FILTERS = useContent('resources').roleFilters;
  return (
    <section className="w-full bg-surface py-space-xl">
      <Container>
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-lg">
          <div role="tablist" aria-label="Filter resources by audience" className="flex flex-wrap items-center gap-space-xs">
            {ROLE_FILTERS.map((r) => (
              <button
                key={r.key}
                role="tab"
                aria-selected={role === r.key}
                onClick={() => onRoleChange(r.key)}
                className={`px-space-md py-space-sm rounded font-label-md text-label-md transition-all ${
                  role === r.key ? 'bg-secondary-container text-on-secondary-fixed font-semibold' : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="relative min-w-[280px] lg:min-w-[360px]">
            <Icon name="search" size={18} className="absolute left-space-md top-1/2 -translate-y-1/2 text-outline" />
            <label htmlFor="resource-search" className="sr-only">Search resources</label>
            <input
              id="resource-search"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={ui.toolbar.searchPlaceholder}
              className="w-full pl-10 pr-space-md py-space-sm bg-surface-container-low text-on-surface rounded font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
