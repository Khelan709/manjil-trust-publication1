import Icon from '../../components/ui/Icon';
import { useContent, useImages } from '../../content/ContentContext';

export default function CampusCard() {
  const C = useContent('contact').campus;
  const images = useImages();
  return (
    <div className="bg-surface-container-lowest p-space-xl rounded shadow-sm flex flex-col gap-space-md">
      <div className="flex items-start justify-between">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">{C.eyebrow}</span>
          <h3 className="font-headline-md text-headline-md text-primary mt-1">{C.title}</h3>
        </div>
        <div className="w-9 h-9 rounded bg-surface-container-low flex items-center justify-center text-primary">
          <Icon name="account_balance" size={20} />
        </div>
      </div>
      <address className="not-italic font-body-md text-body-md text-on-surface-variant">{C.address}</address>
      <div className="bg-surface-container-low p-space-md rounded flex items-start gap-space-sm">
        <Icon name="schedule" size={20} className="text-secondary shrink-0 mt-0.5" />
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-primary font-bold">{C.hoursTitle}</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">{C.hours}</span>
          <span className="font-mono-cite text-mono-cite text-on-surface-variant mt-1">{C.hoursNote}</span>
        </div>
      </div>
      <div className="relative w-full h-52 rounded overflow-hidden shadow-inner">
        <div role="img" aria-label={images.contactMap.alt} className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${images.contactMap.src}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex flex-col justify-end p-space-md text-on-primary">
          <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary-fixed">
            <Icon name="location_on" size={16} /> <span>{C.mapCaption}</span>
          </div>
          <span className="font-headline-sm text-headline-sm font-semibold">{C.mapTitle}</span>
          <p className="font-body-sm text-xs text-surface-container-highest/90">{C.mapNote}</p>
        </div>
      </div>
      <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
        {C.travel.map((t) => (
          <li key={t.icon} className="flex items-center gap-space-xs">
            <Icon name={t.icon} size={16} className="text-primary" /> <span>{t.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
