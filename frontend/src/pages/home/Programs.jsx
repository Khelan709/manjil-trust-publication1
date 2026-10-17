import { Link } from 'react-router-dom';
import Icon from '../../components/ui/Icon';
import Section from '../../components/ui/Section';
import FileLink from '../../components/ui/FileLink';

import { ROUTES } from '../../data/routes';
import { useContent, useImages } from '../../content/ContentContext';

export default function Programs() {
  const ui = useContent('home').ui;
  const P = useContent('home').programs;
  const images = useImages();
  const m = P.monograph;
  return (
    <Section id="monographs-catalog" bg="base" className="scroll-mt-28" innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
      <div className="lg:col-span-7 flex flex-col gap-space-lg">
        <div>
          <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-bold">{P.eyebrow}</span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-bold mt-space-xs">{P.title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">{P.text}</p>
        </div>
        {P.items.map((it) => (
          <div key={it.title} className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
              <Icon name={it.icon} size={26} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">{it.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{it.text}</p>
              <div className="flex flex-wrap items-center gap-space-md mt-2">
                <Link to={it.link.to} className="font-label-sm text-label-sm text-secondary hover:text-on-surface font-semibold flex items-center gap-1 transition-colors">
                  <span>{it.link.label}</span> <Icon name="arrow_forward" size={14} />
                </Link>
                {it.note && (
                  <>
                    <span className="text-outline-variant">•</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{it.note}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-5 flex flex-col gap-space-md">
        <div className="relative bg-surface-container-lowest p-space-lg rounded-2xl shadow-xl flex flex-col gap-space-md">
          <div className="flex items-center justify-between gap-space-sm bg-surface-container-low p-space-md rounded-lg">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-primary font-semibold">{m.eyebrow}</span>
              <span className="font-headline-sm text-headline-sm text-primary">{m.title}</span>
            </div>
            <span className="px-space-sm py-1 rounded bg-secondary text-on-secondary font-mono-cite text-[11px] font-bold shrink-0">{m.isbn}</span>
          </div>
          <div className="relative rounded-lg overflow-hidden h-64 bg-primary-container">
            <img src={images.monographIndic.src} alt={images.monographIndic.alt} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-space-md py-1 rounded text-primary font-label-sm text-label-sm">{m.caption}</div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant italic">{m.quote}</p>
          <div className="flex items-center gap-space-sm pt-space-xs">
            <FileLink href="" className="flex-1 py-2 rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md text-center hover:bg-secondary-fixed-dim transition-colors">{ui.programButtons.downloadPdf}</FileLink>
            <Link to={ROUTES.contact} className="flex-1 py-2 rounded bg-surface-container text-primary font-label-md text-label-md text-center hover:bg-surface-container-high transition-colors">{ui.programButtons.orderPrint}</Link>
          </div>
        </div>
        <div className="bg-primary text-on-primary p-space-md rounded-xl shadow-md flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <Icon name="verified_user" size={24} className="text-secondary-fixed" />
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary-fixed">{P.grant.eyebrow}</span>
              <span className="font-body-sm text-body-sm">{P.grant.text}</span>
            </div>
          </div>
          <Link to={ROUTES.contact} className="px-space-md py-1 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold hover:bg-secondary-fixed transition-colors">Apply</Link>
        </div>
      </div>
    </Section>
  );
}
