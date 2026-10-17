import Icon from '../../components/ui/Icon';
import Container from '../../components/ui/Container';
import FileLink from '../../components/ui/FileLink';

const CARD = 'bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between transition-shadow';

/** 4-up / 3-up compact card with a text action and a version/size footer. */
function CompactCard({ item }) {
  const error = item.tone === 'error';
  return (
    <article className={CARD}>
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className={`px-space-xs py-0.5 rounded font-mono-cite text-mono-cite ${error ? 'bg-error-container text-on-error-container' : 'bg-surface-container text-on-surface-variant'}`}>{item.tag}</span>
          <Icon name={item.icon} className={error ? 'text-error' : 'text-outline'} />
        </div>
        <h3 className="font-headline-sm text-headline-sm text-primary">{item.title}</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{item.text}</p>
      </div>
      <div className="mt-space-md pt-space-sm flex items-center justify-between gap-space-sm">
        <FileLink href={item.href} className="font-label-md text-label-md text-primary hover:text-secondary flex items-center gap-1 font-semibold transition-colors">
          {item.action} <Icon name={item.actionIcon} size={14} />
        </FileLink>
        <span className="font-mono-cite text-mono-cite text-outline">{item.meta}</span>
      </div>
    </article>
  );
}

const LARGE_BUTTON = {
  primary: 'bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed-dim',
  default: 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest',
};

/** 3-up catalogue card with a format box and a full-width button. */
function CatalogueCard({ item }) {
  return (
    <article className={CARD}>
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className={`px-space-xs py-0.5 rounded font-mono-cite text-mono-cite ${item.tone === 'gold' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container text-on-surface-variant'}`}>{item.tag}</span>
          <Icon name={item.icon} className={item.iconTone === 'secondary' ? 'text-secondary' : 'text-primary'} />
        </div>
        <h3 className="font-headline-md text-headline-md text-primary">{item.title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">{item.text}</p>
        <div className="bg-surface-container p-space-sm rounded font-mono-cite text-mono-cite text-on-surface-variant mt-space-xs">{item.format}</div>
      </div>
      <div className="mt-space-md pt-space-md flex gap-space-sm">
        <FileLink
          href={item.href}
          className={`inline-flex w-full items-center justify-center gap-space-xs px-space-md py-space-sm rounded font-label-md text-label-md font-semibold transition-colors ${LARGE_BUTTON[item.actionTone || 'default']}`}
        >
          <Icon name={item.actionIcon} size={16} /> <span>{item.action}</span>
        </FileLink>
      </div>
    </article>
  );
}

const GRID = {
  compact: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg',
  'compact-3': 'grid grid-cols-1 md:grid-cols-3 gap-space-lg',
  large: 'grid grid-cols-1 md:grid-cols-3 gap-space-lg',
};

/** A titled group of resource cards. `items` is the already-filtered list. */
export default function ResourceSection({ section, items }) {
  const Card = section.layout === 'large' ? CatalogueCard : CompactCard;
  return (
    <section className="w-full bg-surface pb-space-xxl" aria-labelledby={`res-${section.id}`}>
      <Container className="flex flex-col gap-space-lg">
        <div className="flex items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-lg">
          <div className="flex items-center gap-space-md">
            <div className="w-10 h-10 rounded bg-primary text-on-primary flex items-center justify-center shrink-0">
              <Icon name={section.icon} size={20} />
            </div>
            <div>
              <h2 id={`res-${section.id}`} className="font-headline-lg text-headline-lg text-primary font-semibold">{section.title}</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{section.description}</p>
            </div>
          </div>
          <span className="hidden sm:inline font-mono-cite text-mono-cite px-space-sm py-1 bg-surface-container-highest rounded text-on-surface-variant whitespace-nowrap">{section.label}</span>
        </div>
        <div className={GRID[section.layout]}>
          {items.map((item) => <Card key={item.title} item={item} />)}
        </div>
      </Container>
    </section>
  );
}
