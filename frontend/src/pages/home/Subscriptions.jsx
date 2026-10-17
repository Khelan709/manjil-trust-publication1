import Icon from '../../components/ui/Icon';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';

import { ROUTES } from '../../data/routes';
import { useContent, useImages } from '../../content/ContentContext';

export default function Subscriptions() {
  const ui = useContent('home').ui;
  const S = useContent('home').subscriptions;
  const images = useImages();
  return (
    <Section bg="low" innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
      <div className="lg:col-span-5 relative">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 bg-primary-container">
          <img src={images.libraryPartnership.src} alt={images.libraryPartnership.alt} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-space-lg">
            <span className="font-headline-sm text-headline-sm text-on-primary font-semibold">{S.imageTitle}</span>
            <span className="font-body-sm text-body-sm text-secondary-fixed">{S.imageText}</span>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 flex flex-col gap-space-md">
        <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-bold">{S.eyebrow}</span>
        <h2 className="font-headline-xl text-headline-xl text-primary font-bold">{S.title}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{S.text}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
          {S.features.map((f) => (
            <div key={f.title} className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-1">
              <div className="flex items-center gap-2 text-primary font-semibold font-label-md text-label-md">
                <Icon name={f.icon} size={18} className="text-secondary" /> {f.title}
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
          <Button to={ROUTES.resources} size="lg" className="px-space-lg shadow-md">{ui.subscriptionButtons.priceList}</Button>
          <Button to={ROUTES.contact} size="lg" variant="softHighest" className="px-space-lg">{ui.subscriptionButtons.sample}</Button>
        </div>
      </div>
    </Section>
  );
}
