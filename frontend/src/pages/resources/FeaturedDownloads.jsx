import Icon from '../../components/ui/Icon';
import Container from '../../components/ui/Container';
import FileLink from '../../components/ui/FileLink';
import { useContent } from '../../content/ContentContext';

const TONES = {
  primary: {
    card: 'bg-primary-container text-on-primary shadow-md hover:shadow-xl',
    badge: 'bg-surface-container-highest/20 text-on-primary',
    icon: 'text-secondary-fixed',
    title: 'text-on-primary',
    text: 'text-on-primary-container',
    button: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed',
  },
  secondary: {
    card: 'bg-surface-container-low',
    badge: 'bg-surface-container-high text-on-surface',
    icon: 'text-primary',
    title: 'text-primary',
    text: 'text-on-surface-variant',
    button: 'bg-secondary-container text-on-secondary-fixed hover:bg-secondary-fixed-dim',
  },
  request: {
    card: 'bg-surface-container',
    badge: 'bg-secondary-fixed text-on-secondary-fixed',
    icon: 'text-secondary',
    title: 'text-primary',
    text: 'text-on-surface-variant',
    button: 'bg-surface-container-lowest text-primary hover:bg-surface-container-highest',
  },
};

/** Three highlighted downloads/actions that overlap the hero. `onRequestSamples` opens the modal. */
export default function FeaturedDownloads({ onRequestSamples }) {
  const FEATURED_DOWNLOADS = useContent('resources').featuredDownloads;
  return (
    <section className="w-full bg-surface-container-lowest py-space-xl -mt-8 relative z-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {FEATURED_DOWNLOADS.map((d) => {
            const t = TONES[d.kind];
            const buttonCls = `inline-flex w-full items-center justify-center gap-space-xs px-space-md py-space-sm rounded font-label-md text-label-md font-semibold transition-colors ${t.button}`;
            const inner = (
              <>
                <Icon name={d.action.icon} size={18} /> <span>{d.action.label}</span>
              </>
            );
            return (
              <article key={d.title} className={`p-space-lg rounded-lg flex flex-col justify-between transition-all duration-300 ${t.card}`}>
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className={`px-space-sm py-0.5 rounded font-mono-cite text-mono-cite ${t.badge}`}>{d.badge}</span>
                    <Icon name={d.icon} className={t.icon} />
                  </div>
                  <h3 className={`font-headline-md text-headline-md font-semibold mt-space-xs ${t.title}`}>{d.title}</h3>
                  <p className={`font-body-sm text-body-sm ${t.text}`}>{d.text}</p>
                </div>
                <div className="mt-space-lg pt-space-md">
                  {d.kind === 'request' ? (
                    <button type="button" onClick={onRequestSamples} className={buttonCls}>{inner}</button>
                  ) : (
                    <FileLink href={d.action.href} className={buttonCls}>{inner}</FileLink>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
