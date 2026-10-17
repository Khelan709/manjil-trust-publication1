import Icon from '../../components/ui/Icon';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import { useContent } from '../../content/ContentContext';

export default function Compliance() {
  const C = useContent('openAccess').compliance;
  const r = C.review;
  return (
    <Section bg="low" innerClassName="flex flex-col gap-space-xl">
      <SectionHeader eyebrow={C.eyebrow} title={C.title} description={C.text} maxWidth="max-w-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {C.cards.map((c) => (
          <article key={c.title} className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
            <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary">
              <Icon name={c.icon} size={20} />
            </div>
            <div className="flex flex-col gap-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">{c.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{c.text}</p>
            </div>
            <span className="mt-auto font-label-sm text-label-sm text-secondary font-semibold">{c.note}</span>
          </article>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-md grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="inline-flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            <Icon name="verified" size={16} /> {r.eyebrow}
          </div>
          <h3 className="font-headline-lg text-headline-lg text-primary font-bold">{r.title}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{r.text}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
            {r.points.map((p) => (
              <div key={p.title} className="flex flex-col gap-1">
                <span className="font-headline-sm text-headline-sm text-primary font-semibold">{p.title}</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-space-lg flex flex-col gap-space-md">
          <span className="font-headline-sm text-headline-sm text-primary font-semibold">{r.stagesTitle}</span>
          <ol className="flex flex-col gap-space-sm font-body-sm text-body-sm">
            {r.stages.map((s, i) => (
              <li key={s.title} className="flex items-center gap-space-md">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono-cite text-mono-cite shrink-0 ${i === r.stages.length - 1 ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className="font-semibold text-primary block">{s.title}</span>
                  <span className="text-on-surface-variant">{s.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
