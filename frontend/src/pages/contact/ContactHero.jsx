import Container from '../../components/ui/Container';
import Icon from '../../components/ui/Icon';
import { useContent } from '../../content/ContentContext';

export default function ContactHero() {
  const ui = useContent('contact').ui;
  return (
    <section className="relative w-full overflow-hidden bg-primary text-on-primary py-space-xl">
      <Container>
        <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider mb-space-sm">
          <span>{ui.hero.breadcrumbRoot}</span>
          <Icon name="chevron_right" size={14} />
          <span className="text-secondary-fixed font-bold">{ui.hero.breadcrumbCurrent}</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="max-w-3xl">
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-primary font-bold tracking-tight mb-space-xs">{ui.hero.title}</h1>
            <p className="font-body-lg text-body-lg text-surface-container-highest">
              {ui.hero.lead}
            </p>
          </div>
          <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded shadow-sm shrink-0">
            <span className="relative flex h-3 w-3" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-primary">{ui.hero.statusTitle}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Mon – Sat (09:30 AM – 06:00 PM IST)</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
