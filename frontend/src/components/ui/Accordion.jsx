import { useState } from 'react';
import Icon from './Icon';

/** Single-open accordion. items: [{ question, answer }] */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="flex flex-col gap-space-sm">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className="bg-surface-container-lowest overflow-hidden">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(open ? null : i)}
              className="w-full px-space-lg py-space-md flex items-center justify-between gap-space-md text-left font-headline-sm text-headline-sm text-primary font-semibold hover:bg-surface-container transition-colors"
            >
              <span>{item.question}</span>
              <Icon name="expand_more" className={`text-outline shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <div id={`faq-panel-${i}`} className="px-space-lg py-space-md bg-surface-container-low font-body-md text-body-md text-on-surface-variant">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
