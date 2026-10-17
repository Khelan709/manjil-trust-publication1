import Container from '../../components/ui/Container';
import Icon from '../../components/ui/Icon';
import { useContent } from '../../content/ContentContext';

export default function GovernanceStrip() {
  const ui = useContent('about').ui;
  const GOVERNANCE_STRIP = useContent('about').governanceStrip;
  return (
    <section className="w-full bg-surface-container-high py-space-md">
      <Container className="flex flex-wrap items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <Icon name="policy" size={22} className="text-secondary" />
          <span className="font-label-md text-label-md text-primary uppercase">{ui.governanceTitle}</span>
        </div>
        <ul className="flex flex-wrap items-center gap-space-lg font-label-sm text-label-sm text-on-surface-variant">
          {GOVERNANCE_STRIP.map((t) => (
            <li key={t} className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary" /> {t}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
