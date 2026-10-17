import Section from '../../components/ui/Section';
import { useContent, useImages } from '../../content/ContentContext';

export default function PreservationBand() {
  const P = useContent('resources').preservation;
  const images = useImages();
  return (
    <Section bg="base" padding="py-space-xl" innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
      <div className="lg:col-span-5 relative">
        <img src={images.resourcesArchive.src} alt={images.resourcesArchive.alt} loading="lazy" className="w-full h-80 object-cover shadow-md rounded-lg" />
        <div className="absolute -bottom-4 -right-4 bg-primary text-on-primary p-space-md rounded-lg shadow-lg hidden sm:block">
          <div className="font-headline-sm text-headline-sm font-semibold">{P.badgeTitle}</div>
          <div className="font-mono-cite text-mono-cite text-primary-fixed">{P.badgeText}</div>
        </div>
      </div>
      <div className="lg:col-span-7 flex flex-col gap-space-md">
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">{P.eyebrow}</span>
        <h2 className="font-headline-xl text-headline-xl text-primary font-bold">{P.title}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">{P.text}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-md pt-space-xs">
          {P.stats.map((s) => (
            <div key={s.label} className="bg-surface-container-lowest p-space-sm rounded">
              <div className="font-headline-sm text-headline-sm text-primary font-bold">{s.value}</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
