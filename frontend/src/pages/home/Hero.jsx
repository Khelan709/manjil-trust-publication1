import SmartLink from '../../components/ui/SmartLink';
import Icon from '../../components/ui/Icon';
import Container from '../../components/ui/Container';

import { ROUTES } from '../../data/routes';
import { useContent, useImages } from '../../content/ContentContext';

export default function Hero() {
  const ui = useContent('home').ui;
  const H = useContent('home').hero;
  const images = useImages();
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-on-primary pb-space-xxl pt-space-xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full" fill="none" viewBox="0 0 1000 1000">
            <circle cx="900" cy="100" r="450" stroke="currentColor" strokeDasharray="8 8" strokeWidth="1.5" />
            <circle cx="900" cy="100" r="300" stroke="currentColor" strokeWidth="1" />
            <path d="M100 800 L900 100" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
          </svg>
        </div>
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded bg-secondary/20 text-secondary-fixed w-fit font-label-sm text-label-sm">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" /> {H.badge}
              </div>
              <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-primary tracking-tight font-bold">{H.title}</h1>
              <p className="font-body-lg text-body-lg text-surface-container-highest max-w-2xl leading-relaxed">{H.lead}</p>
              <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                <a href="#flagship-journals" className="px-space-lg py-space-sm rounded bg-secondary-container text-on-secondary-fixed font-label-lg text-label-lg hover:bg-secondary-fixed-dim shadow-md flex items-center gap-space-xs transition-colors">
                  <span>{ui.heroButtons.explore}</span> <Icon name="arrow_downward" size={18} />
                </a>
                <a href="#monographs-catalog" className="px-space-lg py-space-sm rounded border border-on-primary/40 text-on-primary font-label-lg text-label-lg hover:bg-primary-container flex items-center gap-space-xs transition-colors">
                  <span>{ui.heroButtons.catalog}</span> <Icon name="library_books" size={18} />
                </a>
                <SmartLink to={ROUTES.submit} className="px-space-lg py-space-sm rounded bg-secondary-container text-on-secondary-container font-label-lg text-label-lg hover:bg-secondary-fixed flex items-center gap-space-xs shadow-md transition-colors">
                  <span>{ui.heroButtons.submit}</span> <Icon name="north_east" size={18} />
                </SmartLink>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-surface-container-lowest/10 backdrop-blur-md p-space-lg rounded-xl shadow-xl flex flex-col gap-space-md">
                <div className="relative rounded-lg overflow-hidden h-48 bg-primary-container">
                  <img src={images.heritageHero.src} alt={images.heritageHero.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent flex flex-col justify-end p-space-md">
                    <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider">{H.showcase.eyebrow}</span>
                    <span className="font-headline-sm text-headline-sm text-on-primary">{H.showcase.title}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                  {H.stats.map((s) => (
                    <div key={s.label} className="p-space-md rounded-lg bg-surface-container-lowest/5 text-center flex flex-col justify-center">
                      <span className={`font-display-hero text-headline-xl font-bold leading-none ${s.gold ? 'text-secondary-fixed' : 'text-on-primary'}`}>{s.value}</span>
                      <span className="font-label-sm text-label-sm text-surface-container-high mt-1 uppercase tracking-wider">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-container-low py-space-md shadow-sm">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-xs shrink-0">
            <Icon name="verified" size={20} className="text-secondary" />
            <span className="font-label-lg text-label-lg text-primary tracking-wide uppercase">{ui.standardsLabel}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-space-md text-on-surface-variant font-mono-cite text-mono-cite">
            {H.standards.map((s) => (
              <span key={s} className="px-space-md py-1 rounded bg-surface-container-lowest shadow-sm text-primary font-semibold">{s}</span>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
