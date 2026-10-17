import SmartLink from '../ui/SmartLink';
import Icon from '../ui/Icon';
import { ROUTES } from '../../data/routes';
import { useContent, useImages } from '../../content/ContentContext';

/** Catalogue card (3:4 cover, ISSN, indexing tags, submit action). */
export default function JournalCard({ journal }) {
  const ui = useContent('settings').ui;
  const images = useImages();
  const cover = images[journal.cover];
  const badge = journal.badgeTone === 'gold' ? 'bg-secondary text-on-secondary' : 'bg-primary/90 text-secondary-fixed';
  return (
    <article className="group flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm hover:shadow-xl transition-all">
      <div className="flex flex-col gap-space-sm">
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-primary-container">
          <img src={cover.src} alt={cover.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-sm px-space-xs py-0.5 rounded text-[10px] font-mono-cite text-primary uppercase font-bold">{journal.frequency}</div>
          <div className={`absolute bottom-2 right-2 px-space-xs py-0.5 rounded text-[10px] font-mono-cite ${badge}`}>{journal.badge}</div>
        </div>
        <div className="flex flex-col">
          <span className="font-mono-cite text-[11px] text-on-surface-variant">{journal.issn}</span>
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold leading-snug mt-1 group-hover:text-secondary transition-colors">{journal.title}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">{journal.text}</p>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {journal.tags.map((t) => <span key={t} className="px-1.5 py-0.5 rounded bg-surface-container text-[10px] font-label-sm text-primary">{t}</span>)}
        </div>
      </div>
      <div className="flex flex-col gap-space-xs pt-space-md mt-space-sm bg-surface-container-low/50 -mx-space-md -mb-space-md p-space-md rounded-b-xl">
        <SmartLink to={ROUTES.submit} className="w-full py-1.5 rounded bg-secondary-container text-on-secondary-fixed font-label-md text-label-md text-center hover:bg-secondary-fixed-dim flex items-center justify-center gap-1 transition-colors">
          <span>{ui.journalCard.submit}</span> <Icon name="upload" size={14} />
        </SmartLink>
        <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-1">
          <SmartLink to={ROUTES.journals} className="hover:text-primary transition-colors">{ui.journalCard.currentIssue.replace('{n}', journal.volume)}</SmartLink>
          <SmartLink to={ROUTES.journals} className="hover:text-secondary font-semibold transition-colors">{ui.journalCard.aimScope}</SmartLink>
        </div>
      </div>
    </article>
  );
}
