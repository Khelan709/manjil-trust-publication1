import { Link } from 'react-router-dom';
import Icon from '../../components/ui/Icon';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import WaiverRequestForm from '../../components/forms/WaiverRequestForm';
import FaqSection from '../../components/sections/FaqSection';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import { ROUTES } from '../../data/routes';
import { useContent } from '../../content/ContentContext';

export default function RequestWaiver() {
  const P = useContent('waiver');
  const WAIVERS = useContent('openAccess').waivers;
  useDocumentTitle('Request for Waiver');
  return (
    <div className="flex flex-col w-full">
      <section className="w-full bg-primary text-on-primary py-space-xl">
        <Container>
          <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider mb-space-sm">
            <Link to={ROUTES.openAccess} className="hover:text-on-primary transition-colors">{P.ui.breadcrumbRoot}</Link>
            <Icon name="chevron_right" size={14} />
            <span className="text-secondary-fixed font-bold">{P.ui.breadcrumbCurrent}</span>
          </div>
          <div className="max-w-3xl flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-widest font-bold">{P.eyebrow}</span>
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-primary font-bold tracking-tight">{P.title}</h1>
            <p className="font-body-lg text-body-lg text-surface-container-highest">{P.lead}</p>
          </div>
        </Container>
      </section>

      <Section padding="py-space-xl" innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        <div className="lg:col-span-7 bg-surface-container-lowest p-space-xl rounded shadow-sm">
          <div className="pb-space-md mb-space-lg">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">{P.ui.formEyebrow}</span>
            <h2 className="font-headline-md text-headline-md text-primary mt-1">{P.ui.formTitle}</h2>
          </div>
          <WaiverRequestForm />
        </div>

        <aside className="lg:col-span-5 flex flex-col gap-space-lg">
          <div className="bg-surface-container-high rounded-xl p-space-lg flex flex-col gap-space-md">
            <span className="font-headline-sm text-headline-sm text-primary font-semibold">{P.ui.tiersTitle}</span>
            {WAIVERS.tiers.map((t) => (
              <div key={t.group} className="p-space-md bg-surface-container-lowest rounded-lg shadow-sm">
                <span className={`block font-headline-sm text-headline-sm font-bold ${t.accent ? 'text-secondary' : 'text-primary'}`}>{t.value}</span>
                <span className="font-label-md text-label-md text-primary font-semibold block mt-0.5">{t.group}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">{t.text}</span>
              </div>
            ))}
          </div>
          <div className="bg-surface-container rounded-xl p-space-lg flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">{P.ui.beforeTitle}</span>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              {P.requirements.map((r) => (
                <li key={r} className="flex items-start gap-space-xs">
                  <Icon name="done" size={16} className="text-secondary mt-0.5" /> <span>{r}</span>
                </li>
              ))}
            </ul>
            <p className="font-body-sm text-body-sm text-on-surface-variant italic pt-space-xs">{P.blindNote}</p>
          </div>
        </aside>
      </Section>

      <FaqSection page="waiver" />
    </div>
  );
}
