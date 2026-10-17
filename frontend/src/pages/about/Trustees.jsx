import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';

import { ROUTES } from '../../data/routes';
import { useContent, useImages } from '../../content/ContentContext';

/** Reusable profile card; `member.image` is a key in assets/images.js. */
function TrusteeCard({ member }) {
  const images = useImages();
  const img = images[member.image];
  return (
    <article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md group">
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-surface-container relative">
        <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute bottom-2 left-2 px-space-xs py-0.5 rounded bg-primary/90 text-on-primary font-mono-cite text-mono-cite">{member.credentials}</div>
      </div>
      <div className="flex flex-col gap-space-xs flex-1">
        <span className="font-label-sm text-label-sm text-secondary uppercase">{member.role}</span>
        <h3 className="font-headline-sm text-headline-sm text-primary">{member.name}</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{member.bio}</p>
      </div>
      <div className="flex items-center justify-between pt-space-xs text-on-surface-variant font-label-sm text-label-sm">
        <span className="text-secondary font-semibold">{member.stat}</span>
        <Icon name="mail" size={18} className="text-primary" />
      </div>
    </article>
  );
}

export default function Trustees() {
  const T = useContent('about').trustees;
  return (
    <Section innerClassName="flex flex-col gap-space-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <SectionHeader eyebrow={T.eyebrow} title={T.title} description={T.description} />
        <Button to={ROUTES.contact} variant="soft" size="sm" icon="group" className="rounded-lg shrink-0">{T.cta}</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {T.members.map((m) => <TrusteeCard key={m.name} member={m} />)}
      </div>
    </Section>
  );
}
