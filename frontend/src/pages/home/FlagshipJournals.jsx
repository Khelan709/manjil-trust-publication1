import Button from '../../components/ui/Button';
import Container from '../../components/ui/Container';
import JournalGrid from '../../components/journals/JournalGrid';
import { useContent } from '../../content/ContentContext';
import { ROUTES } from '../../data/routes';

export default function FlagshipJournals() {
  const { filters, journals, ui } = useContent('home');
  const f = ui.flagship;
  return (
    <Container as="section" id="flagship-journals" className="py-space-xxl w-full scroll-mt-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-bold">{f.eyebrow}</span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-bold">{f.title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">{f.text}</p>
        </div>
        <div className="flex items-center gap-space-xs shrink-0">
          <span className="font-label-sm text-label-sm text-on-surface-variant">{f.catalogueLabel}</span>
          <span className="px-space-sm py-0.5 rounded bg-surface-container-high text-primary font-bold font-mono-cite text-mono-cite">{f.cycle}</span>
        </div>
      </div>

      <JournalGrid journals={journals} filters={filters} selectLabel={f.selectLabel} />

      <div className="mt-space-xl flex justify-center">
        <Button to={ROUTES.journals} size="lg" trailingIcon="arrow_forward" className="px-space-xl shadow-md gap-space-sm">
          {f.exploreAll}
        </Button>
      </div>
    </Container>
  );
}
