import Icon from '../../components/ui/Icon';
import Section from '../../components/ui/Section';
import { useContent } from '../../content/ContentContext';

function DepartmentCard({ dept }) {
  return (
    <article className="bg-surface-container-lowest p-space-lg rounded shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
      <div className="flex flex-col gap-space-sm">
        <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
          <Icon name={dept.icon} size={20} />
        </div>
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">{dept.tag}</span>
        <h3 className="font-headline-sm text-headline-sm text-primary">{dept.title}</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{dept.text}</p>
      </div>
      <div className="pt-space-md mt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-md flex flex-col gap-space-xs font-mono-cite text-mono-cite text-primary">
        {dept.links.map((l) => (
          <a key={l.href} href={l.href} className="flex items-center gap-space-xs hover:text-secondary transition-colors">
            <Icon name={l.icon} size={15} className="text-on-surface-variant" /> {l.label}
          </a>
        ))}
        {dept.note && (
          <span className={`flex items-center gap-space-xs text-[11px] ${dept.note.accent ? 'text-secondary font-semibold' : 'text-on-surface-variant'}`}>
            <Icon name={dept.note.icon} size={14} className={dept.note.accentIcon ? 'text-secondary' : ''} /> {dept.note.label}
          </span>
        )}
      </div>
    </article>
  );
}

export default function DepartmentCards() {
  const DEPARTMENTS = useContent('contact').departments;
  return (
    <Section padding="py-space-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {DEPARTMENTS.map((d) => <DepartmentCard key={d.title} dept={d} />)}
      </div>
    </Section>
  );
}
