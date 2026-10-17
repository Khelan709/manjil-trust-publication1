import Icon from '../../components/ui/Icon';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import { useContent } from '../../content/ContentContext';

function PillarCard({ pillar }) {
  const iconBox = pillar.filled
    ? 'bg-primary text-on-primary group-hover:bg-primary-container'
    : pillar.hoverFilled
      ? 'bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary'
      : 'bg-surface-container text-primary group-hover:bg-secondary-container group-hover:text-on-secondary-container';
  return (
    <article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
      <div className="flex flex-col gap-space-md">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm transition-colors ${iconBox}`}>
          <Icon name={pillar.icon} size={24} />
        </div>
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">{pillar.label}</span>
          <h3 className="font-headline-sm text-headline-sm text-primary">{pillar.title}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{pillar.text}</p>
        </div>
      </div>
      <div className="pt-space-md mt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg px-space-lg py-space-sm rounded-b-xl">
        <span className="font-mono-cite text-mono-cite text-primary font-medium flex items-center gap-1">
          <Icon name="check_circle" size={14} /> {pillar.note}
        </span>
      </div>
    </article>
  );
}

export default function Pillars() {
  const ui = useContent('openAccess').ui;
  const PILLARS = useContent('openAccess').pillars;
  return (
    <Section bg="low" innerClassName="flex flex-col gap-space-xl">
      <SectionHeader
        eyebrow={ui.pillarsIntro.eyebrow}
        title={ui.pillarsIntro.title}
        description={ui.pillarsIntro.description}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {PILLARS.map((p) => <PillarCard key={p.label} pillar={p} />)}
      </div>
    </Section>
  );
}
