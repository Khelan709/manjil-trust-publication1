import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import FaqSection from '../components/sections/FaqSection';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ROUTES } from '../data/routes';

/** Stand-in for routes the design links to but has not specified yet (see data/routes.js). */
export default function PlaceholderPage({ title, description, icon = 'construction' }) {
  useDocumentTitle(title);
  return (
    <>
    <Section bg="low" padding="py-32" innerClassName="flex flex-col items-center text-center gap-space-md">
      <div className="w-16 h-16 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
        <Icon name={icon} size={32} />
      </div>
      <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Coming soon</span>
      <h1 className="font-headline-xl text-headline-xl text-primary font-bold">{title}</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">{description}</p>
      <div className="flex flex-wrap justify-center gap-space-md pt-space-sm">
        <Button to={ROUTES.home} trailingIcon="arrow_forward">Back to Home</Button>
        <Button to={ROUTES.contact} variant="soft">Contact the Editorial Desk</Button>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Developers: build this screen in <code className="font-mono-cite">src/pages</code> and swap the route in{' '}
        <Link to={ROUTES.home} className="underline">App.jsx</Link>.
      </p>
    </Section>
    <FaqSection page="general" />
    </>
  );
}
