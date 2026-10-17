import Icon from '../../components/ui/Icon';
import Container from '../../components/ui/Container';
import { useContent, useImages } from '../../content/ContentContext';

/** Decorative citations/readership trend line (static illustration from the design). */
function TrendChart() {
  return (
    <svg className="w-full h-14 text-primary" fill="none" preserveAspectRatio="none" viewBox="0 0 320 60" role="img" aria-label="Readership trend rising year over year">
      <path d="M0 45 C 40 42, 70 38, 100 32 C 140 25, 180 28, 220 18 C 260 8, 290 12, 320 4 L 320 60 L 0 60 Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M0 45 C 40 42, 70 38, 100 32 C 140 25, 180 28, 220 18 C 260 8, 290 12, 320 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
      <circle cx="100" cy="32" r="3" fill="currentColor" />
      <circle cx="220" cy="18" r="3" fill="currentColor" />
      <circle cx="320" cy="4" r="4" fill="#775a00" />
    </svg>
  );
}

export default function OaHero() {
  const ui = useContent('openAccess').ui;
  const H = useContent('openAccess').hero;
  const images = useImages();
  const n = H.node;
  return (
    <section className="relative w-full bg-primary text-on-primary pt-space-xl pb-space-xxl overflow-hidden">
      <div className="absolute -top-32 right-0 w-[580px] h-[580px] bg-primary-container/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-12 w-96 h-96 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none" />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-1 rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md">
              <Icon name="lock_open" size={16} /> {H.badge}
            </div>
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-primary tracking-tight">{H.title}</h1>
            <p className="font-headline-md text-headline-md text-surface-container-highest italic font-normal">{H.subtitle}</p>
            <p className="font-body-lg text-body-lg text-surface-container-high max-w-2xl leading-relaxed mt-space-xs">{H.lead}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-md pt-space-md">
              {H.stats.map((s, i) => (
                <div key={s.label} className={`p-space-md bg-primary-container rounded-xl shadow-sm ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
                  <span className={`block font-headline-lg text-headline-lg font-bold ${s.accent ? 'text-secondary-fixed' : 'text-on-primary'}`}>{s.value}</span>
                  <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col gap-space-md relative overflow-hidden">
              <div className="flex items-center justify-between gap-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">{n.eyebrow}</span>
                <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface font-mono-cite text-mono-cite">{n.doi}</span>
              </div>
              <div className="relative w-full h-52 rounded-lg overflow-hidden shadow-sm">
                <img src={images.openAccessRepository.src} alt={images.openAccessRepository.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-space-md">
                  <span className="text-on-primary font-label-md text-label-md flex items-center gap-1.5">
                    <Icon name="verified" size={16} /> {n.caption}
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-xs">
                <div className="flex items-center justify-between text-on-surface font-label-sm text-label-sm">
                  <span>{n.trendLabel}</span>
                  <span className="text-secondary font-semibold">{n.trendValue}</span>
                </div>
                <TrendChart />
                <div className="flex items-center justify-between font-mono-cite text-mono-cite text-on-surface-variant">
                  <span>{n.trendAxis[0]}</span>
                  <span>{n.trendAxis[1]}</span>
                  <span className="font-bold text-on-surface">{n.trendAxis[2]}</span>
                </div>
              </div>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <a href="#apc-policy" className="flex-1 text-center py-space-sm px-space-md rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-fixed-dim shadow-sm transition-colors">{ui.heroButtons.apc}</a>
                <a href="#author-cta" className="flex-1 text-center py-space-sm px-space-md rounded bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors">{ui.heroButtons.kits}</a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
