import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import Section from '../../components/ui/Section';
import Eyebrow from '../../components/ui/Eyebrow';
import { useContent } from '../../content/ContentContext';

function DocumentRow({ doc }) {
  const ui = useContent('about').ui;
  return (
    <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md hover:bg-surface-container transition-colors">
      <div className="flex items-center gap-space-md">
        <div className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center shrink-0">
          <Icon name={doc.icon} size={20} />
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-primary">{doc.title}</span>
          <span className="font-mono-cite text-mono-cite text-on-surface-variant">{doc.meta}</span>
        </div>
      </div>
      <Button
        size="sm"
        icon="download"
        className="shrink-0"
        href={doc.href || undefined}
        download={doc.href ? true : undefined}
        title={doc.href ? undefined : 'Document will be available soon'}
      >
        {ui.downloadButton}
      </Button>
    </div>
  );
}

export default function Transparency() {
  const ui = useContent('about').ui;
  const T = useContent('about').transparency;
  return (
    <Section innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
      <div className="lg:col-span-6 flex flex-col gap-space-md">
        <Eyebrow>{T.eyebrow}</Eyebrow>
        <h2 className="font-headline-xl text-headline-xl text-primary">{T.title}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{T.text}</p>
        <div className="flex flex-col gap-space-sm pt-space-xs">
          {T.documents.map((d) => <DocumentRow key={d.title} doc={d} />)}
        </div>
      </div>

      <div className="lg:col-span-6 bg-surface-container-lowest p-space-xl rounded-xl shadow-md flex flex-col gap-space-lg">
        <div className="flex items-center justify-between gap-space-sm">
          <span className="font-headline-md text-headline-md text-primary font-semibold">{T.metricsTitle}</span>
          <span className="px-space-sm py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">{ui.auditedBadge}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-lg">
          {T.metrics.map((m) => (
            <div key={m.label} className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
              <span className="font-mono-cite text-mono-cite text-on-surface-variant">{m.label}</span>
              <span className={`font-headline-lg text-headline-lg font-bold ${m.accent ? 'text-secondary' : 'text-primary'}`}>{m.value}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">{m.note}</span>
            </div>
          ))}
        </div>
        <div className="p-space-sm bg-surface-container-high rounded text-center">
          <p className="font-label-sm text-label-sm text-on-surface-variant">{T.audit}</p>
        </div>
      </div>
    </Section>
  );
}
