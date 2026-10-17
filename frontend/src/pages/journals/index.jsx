import Container from '../../components/ui/Container';
import JournalGrid from '../../components/journals/JournalGrid';
import FaqSection from '../../components/sections/FaqSection';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useContent } from '../../content/ContentContext';

/** Full journal catalogue. Uses the same journals list as the Home page (edit it under Admin → Home Page → Journals). */
export default function Journals() {
  useDocumentTitle('Journals');
  const { filters, journals, ui } = useContent('home');
  return (
    <div className="flex flex-col w-full">
      <section className="w-full bg-primary text-on-primary py-space-xl">
        <Container className="flex flex-col gap-space-xs max-w-4xl mx-0">
          <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-widest font-bold">{ui.flagship.eyebrow}</span>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-primary font-bold tracking-tight">Journals</h1>
          <p className="font-body-lg text-body-lg text-surface-container-highest">{ui.flagship.text}</p>
        </Container>
      </section>
      <Container as="section" className="py-space-xl w-full">
        <JournalGrid journals={journals} filters={filters} selectLabel={ui.flagship.selectLabel} id="journals-discipline" />
      </Container>
      <FaqSection page="home" bg="low" />
    </div>
  );
}
