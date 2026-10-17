import Section from '../../components/ui/Section';
import { useContent } from '../../content/ContentContext';

export default function TechMatrix() {
  const T = useContent('resources').techMatrix;
  return (
    <Section bg="high" padding="py-space-xl" innerClassName="flex flex-col gap-space-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">{T.eyebrow}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold">{T.title}</h2>
        </div>
        <span className="font-mono-cite text-mono-cite text-on-surface-variant">{T.rev}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md mt-space-sm">
        {T.items.map((i) => (
          <div key={i.label} className="bg-surface-container-lowest p-space-md rounded-lg">
            <div className="font-mono-cite text-mono-cite text-secondary font-bold">{i.label}</div>
            <div className="font-headline-sm text-headline-sm text-primary mt-1">{i.value}</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{i.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
