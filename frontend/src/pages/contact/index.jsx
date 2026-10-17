import ContactHero from './ContactHero';
import DepartmentCards from './DepartmentCards';
import CampusCard from './CampusCard';
import EscalationCard from './EscalationCard';
import ContactForm from '../../components/forms/ContactForm';
import Section from '../../components/ui/Section';
import FaqSection from '../../components/sections/FaqSection';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useContent } from '../../content/ContentContext';

export default function Contact() {
  const ui = useContent('contact').ui;
  const AFFILIATIONS = useContent('contact').affiliations;
  useDocumentTitle('Contact Us');
  return (
    <div className="flex flex-col w-full">
      <ContactHero />
      <DepartmentCards />

      <section className="w-full py-space-xl bg-surface-container-low/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          <div className="lg:col-span-7 bg-surface-container-lowest p-space-xl rounded shadow-sm">
            <div className="flex items-center justify-between pb-space-md mb-space-lg bg-surface-container-low/60 -mx-space-xl -mt-space-xl px-space-xl pt-space-xl">
              <div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">{ui.formEyebrow}</span>
                <h2 className="font-headline-md text-headline-md text-primary mt-1">{ui.formTitle}</h2>
              </div>
              <span aria-hidden="true" className="material-symbols-outlined text-primary text-[28px] opacity-40">assignment</span>
            </div>
            <ContactForm />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            <CampusCard />
            <EscalationCard />
          </div>
        </div>
      </section>

      <Section padding="py-space-xl" innerClassName="flex flex-col items-center">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-bold mb-space-lg">
          {ui.affiliationsTitle}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-space-lg w-full max-w-4xl items-center text-center">
          {AFFILIATIONS.map((a) => (
            <div key={a.name} className="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col items-center gap-1 group hover:shadow-md transition-shadow">
              <span className="font-headline-sm text-headline-sm font-bold text-primary group-hover:text-secondary transition-colors">{a.name}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{a.desc}</span>
            </div>
          ))}
        </div>
      </Section>
      <FaqSection page="contact" bg="low" />
    </div>
  );
}
