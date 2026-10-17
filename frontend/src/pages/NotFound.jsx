import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ROUTES } from '../data/routes';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <Section bg="low" padding="py-32" innerClassName="flex flex-col items-center text-center gap-space-md">
      <span className="font-display-hero text-display-hero text-secondary font-bold">404</span>
      <h1 className="font-headline-xl text-headline-xl text-primary font-bold">This page could not be found</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
        The volume you are looking for may have been moved or withdrawn from the catalogue.
      </p>
      <Button to={ROUTES.home} trailingIcon="arrow_forward" size="lg">Return to Home</Button>
    </Section>
  );
}
