import Icon from '../../components/ui/Icon';
import Section from '../../components/ui/Section';
import SectionHeader from '../../components/ui/SectionHeader';
import Button from '../../components/ui/Button';

import { ROUTES } from '../../data/routes';
import { useContent } from '../../content/ContentContext';

export default function Workflow() {
  const ui = useContent('home').ui;
  const W = useContent('home').workflow;
  return (
    <Section id="publish-workflow" className="scroll-mt-28">
      <SectionHeader align="center" eyebrow={W.eyebrow} title={W.title} description={W.text} className="mb-space-xl" />
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {W.steps.map((s, i) => (
          <li key={s.title} className="p-space-lg rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
            <span aria-hidden="true" className="font-display-hero text-headline-xl text-secondary-container font-black leading-none">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">{s.title}</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{s.text}</p>
            <span className="font-label-sm text-label-sm text-primary font-semibold mt-auto pt-space-xs flex items-center gap-1">
              <Icon name={s.icon} size={16} /> {s.note}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-space-xl p-space-lg rounded-xl bg-primary text-on-primary flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-lg bg-surface-container-lowest/10 flex items-center justify-center shrink-0">
            <Icon name="assignment" size={28} className="text-secondary-fixed" />
          </div>
          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-primary font-bold">{W.cta.title}</h4>
            <p className="font-body-sm text-body-sm text-surface-container-highest">{W.cta.text}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-space-md shrink-0">
          <Button to={ROUTES.openAccess} variant="light" className="font-semibold">{ui.workflowButtons.guidelines}</Button>
          <Button to={ROUTES.submit} variant="amber" className="font-bold shadow-md">{ui.workflowButtons.submit}</Button>
        </div>
      </div>
    </Section>
  );
}
