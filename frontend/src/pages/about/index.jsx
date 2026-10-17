import AboutHero from './AboutHero';
import GovernanceStrip from './GovernanceStrip';
import Mission from './Mission';
import Milestones from './Milestones';
import Trustees from './Trustees';
import EthicalFramework from './EthicalFramework';
import Transparency from './Transparency';
import FaqSection from '../../components/sections/FaqSection';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { ROUTES } from '../../data/routes';
import { useContent } from '../../content/ContentContext';

export default function About() {
  const ui = useContent('about').ui;
  useDocumentTitle('About the Trust');
  return (
    <div className="flex flex-col w-full">
      <AboutHero />
      <GovernanceStrip />
      <Mission />
      <Milestones />
      <Trustees />
      <EthicalFramework />
      <Transparency />
      <FaqSection page="about" bg="low" />
      <Section bg="primaryContainer" padding="py-space-xl" innerClassName="flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div className="flex flex-col gap-space-xs text-center md:text-left">
          <h3 className="font-headline-lg text-headline-lg text-on-primary">{ui.cta.title}</h3>
          <p className="font-body-md text-body-md text-on-primary-container max-w-xl">
            {ui.cta.text}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-space-md shrink-0">
          <Button to={ROUTES.submit} variant="goldHover" icon="upload_file" className="rounded-lg px-space-lg shadow-sm">{ui.cta.submit}</Button>
          <Button to={ROUTES.contact} icon="mail" className="rounded-lg px-space-lg shadow-sm">{ui.cta.contact}</Button>
        </div>
      </Section>
    </div>
  );
}
