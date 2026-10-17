import Icon from '../../components/ui/Icon';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import { useContent } from '../../content/ContentContext';

export default function EthicalFramework() {
  const E = useContent('about').ethics;
  return (
    <Section bg="low" innerClassName="flex flex-col gap-space-xl">
      <SectionHeader eyebrow={E.eyebrow} title={E.title} description={E.description} maxWidth="max-w-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        {E.cards.map((c) => (
          <article key={c.code} className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="h-10 min-w-10 px-2 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold font-mono-cite text-mono-cite">{c.code}</span>
              <span className="px-space-xs py-0.5 rounded bg-surface-container-low text-secondary font-label-sm text-label-sm font-semibold">{c.status}</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary">{c.title}</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{c.text}</p>
            <div className="pt-space-xs text-primary font-label-sm text-label-sm flex items-center gap-space-xs">
              <Icon name={c.icon} size={16} /> <span>{c.note}</span>
            </div>
          </article>
        ))}
      </div>
      <ul className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-wrap items-center justify-around gap-space-md text-on-surface-variant">
        {E.affiliations.map((a) => (
          <li key={a.label} className="flex items-center gap-space-xs font-label-md text-label-md">
            <Icon name={a.icon} size={20} className="text-secondary" /> <span>{a.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
