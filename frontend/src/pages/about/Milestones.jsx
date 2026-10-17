import Icon from '../../components/ui/Icon';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import { useContent } from '../../content/ContentContext';

function MilestoneCard({ item }) {
  const dark = item.highlight;
  return (
    <li
      className={`p-space-lg rounded-xl shadow-sm flex flex-col justify-between gap-space-lg transition-transform hover:-translate-y-1 ${
        dark ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest'
      }`}
    >
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className={`font-display-hero text-headline-xl font-bold ${dark ? 'text-secondary-fixed' : 'text-secondary'}`}>{item.year}</span>
          <span className={`px-space-xs py-0.5 rounded font-label-sm text-label-sm ${dark ? 'bg-primary-container text-secondary-fixed' : 'bg-surface-container text-on-surface'}`}>
            {item.tag}
          </span>
        </div>
        <h3 className={`font-headline-sm text-headline-sm ${dark ? 'text-on-primary' : 'text-primary'}`}>{item.title}</h3>
        <p className={`font-body-sm text-body-sm leading-relaxed ${dark ? 'text-surface-container-high' : 'text-on-surface-variant'}`}>{item.text}</p>
      </div>
      <div className={`flex items-center gap-space-xs font-mono-cite text-mono-cite pt-space-xs ${dark ? 'text-secondary-fixed' : 'text-on-surface-variant'}`}>
        <Icon name={item.icon} size={16} /> <span>{item.note}</span>
      </div>
    </li>
  );
}

export default function Milestones() {
  const M = useContent('about').milestones;
  return (
    <Section bg="low" innerClassName="flex flex-col gap-space-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <SectionHeader eyebrow={M.eyebrow} title={M.title} description={M.description} maxWidth="max-w-xl" />
        <div className="flex items-center gap-space-xs font-mono-cite text-mono-cite bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm w-fit">
          <Icon name="history_edu" size={16} className="text-secondary" /> <span>{M.log}</span>
        </div>
      </div>
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {M.items.map((item) => <MilestoneCard key={item.year} item={item} />)}
      </ol>
    </Section>
  );
}
