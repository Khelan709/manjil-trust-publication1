import Icon from '../../components/ui/Icon';
import { useContent } from '../../content/ContentContext';

export default function EscalationCard() {
  const E = useContent('contact').escalation;
  return (
    <div className="bg-primary text-on-primary p-space-xl rounded shadow-md relative overflow-hidden">
      <div className="relative z-10 flex flex-col gap-space-sm">
        <div className="flex items-center gap-space-xs text-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider">
          <Icon name="gavel" size={16} /> <span>{E.eyebrow}</span>
        </div>
        <h4 className="font-headline-md text-headline-md font-semibold tracking-tight">{E.title}</h4>
        <p className="font-body-sm text-body-sm text-primary-fixed-dim">{E.text}</p>
        <div className="mt-space-sm p-space-md rounded bg-primary-container/80 flex items-center justify-between gap-space-sm">
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-secondary-fixed font-semibold">{E.contactLabel}</span>
            <a href={`mailto:${E.email}`} className="font-mono-cite text-mono-cite text-on-primary hover:text-secondary-fixed transition-colors truncate">{E.email}</a>
          </div>
          <Icon name="verified_user" size={24} className="text-secondary-fixed shrink-0" />
        </div>
        <p className="font-label-sm text-label-sm text-primary-fixed-dim/70 mt-1">{E.note}</p>
      </div>
      <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-surface-container-highest/5 rounded-full pointer-events-none" />
    </div>
  );
}
