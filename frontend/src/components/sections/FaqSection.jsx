import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Accordion from '../ui/Accordion';
import { useContent } from '../../content/ContentContext';

/**
 * Frequently Asked Questions block used at the end of every page.
 * `page` selects a set from data/faqs.js (falls back to `general`); `bg` alternates the band tint.
 */
export default function FaqSection({ page = 'general', bg = 'surface' }) {
  const ui = useContent('settings').ui;
  const FAQ_SETS = useContent('faqs');
  const set = FAQ_SETS[page] || FAQ_SETS.general;
  return (
    <Section bg={bg} aria-labelledby="faq-heading" innerClassName="max-w-4xl flex flex-col gap-space-lg">
      <SectionHeader
        align="center"
        eyebrow={ui.faq.eyebrow}
        title={ui.faq.title}
        description={set.description}
        id="faq-heading"
      />
      <div className="mt-space-md"><Accordion items={set.items} /></div>
    </Section>
  );
}
