import Container from '../../components/ui/Container';
import Icon from '../../components/ui/Icon';
import { useContent } from '../../content/ContentContext';

export default function AboutHero() {
  const H = useContent('about').hero;
  return (
    <section className="relative w-full overflow-hidden bg-primary text-on-primary py-space-xxl">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <pattern id="scholarly-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#scholarly-grid)" />
        </svg>
      </div>
      <Container className="relative z-10 flex flex-col gap-space-lg">
        <div className="flex flex-wrap items-center gap-space-sm">
          <span className="px-space-sm py-1 rounded bg-secondary text-on-primary font-label-sm text-label-sm uppercase tracking-widest">{H.badge}</span>
          <span className="text-on-primary-container font-mono-cite text-mono-cite">{H.reg}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
          <span className="text-secondary-fixed font-label-sm text-label-sm">{H.years}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-end">
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-primary leading-tight">{H.title}</h1>
            <p className="font-body-lg text-body-lg text-surface-container-high max-w-2xl">{H.lead}</p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-space-sm bg-primary-container/80 p-space-lg rounded-xl shadow-md">
            <div className="flex items-center justify-between pb-space-xs">
              <span className="font-label-sm text-label-sm text-on-primary-container uppercase">{H.holdingsTitle}</span>
              <Icon name="verified" size={18} className="text-secondary-fixed" />
            </div>
            <div className="grid grid-cols-2 gap-space-md pt-space-xs">
              {H.holdings.map((h) => (
                <div key={h.label}>
                  <div className="font-headline-lg text-headline-lg text-secondary-fixed font-semibold">{h.value}</div>
                  <div className="font-label-sm text-label-sm text-on-primary-container">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
