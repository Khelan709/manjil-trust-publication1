import Icon from '../../components/ui/Icon';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import { useContent, useImages } from '../../content/ContentContext';

export default function Mission() {
  const M = useContent('about').mission;
  const images = useImages();
  return (
    <Section innerClassName="flex flex-col gap-space-xl">
      <SectionHeader eyebrow={M.eyebrow} title={M.title} description={M.description} maxWidth="max-w-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
        <div className="lg:col-span-7 bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex flex-col gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <Icon name={M.card.icon} size={28} />
            </div>
            <h3 className="font-headline-md text-headline-md text-primary">{M.card.title}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{M.card.text}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-sm">
              {M.card.points.map((p) => (
                <div key={p.title} className="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
                  <span className="font-label-md text-label-md text-primary flex items-center gap-space-xs">
                    <Icon name={p.icon} size={18} className="text-secondary" /> {p.title}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{p.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-space-lg flex items-center justify-between gap-space-md text-on-surface-variant">
            <span className="font-mono-cite text-mono-cite">{M.card.reg}</span>
            <span className="font-label-sm text-label-sm text-primary uppercase">{M.card.kind}</span>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          <div className="relative rounded-xl overflow-hidden shadow-sm h-80 bg-surface-container">
            <img src={images.archiveLibrary.src} alt={images.archiveLibrary.alt} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent p-space-lg flex flex-col justify-end text-on-primary">
              <span className="font-label-sm text-label-sm text-secondary-fixed uppercase">{M.image.eyebrow}</span>
              <p className="font-headline-sm text-headline-sm">{M.image.text}</p>
            </div>
          </div>
          <figure className="p-space-lg bg-surface-container-low rounded-xl flex flex-col gap-space-sm justify-center flex-1">
            <span className="font-label-sm text-label-sm text-secondary uppercase font-bold">{M.pillar.eyebrow}</span>
            <blockquote className="font-headline-sm text-headline-sm text-primary italic leading-snug">{M.pillar.quote}</blockquote>
            <figcaption className="font-body-sm text-body-sm text-on-surface-variant">{M.pillar.cite}</figcaption>
          </figure>
        </div>
      </div>
    </Section>
  );
}
