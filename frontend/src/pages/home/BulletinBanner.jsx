import NewsletterForm from '../../components/forms/NewsletterForm';
import { useContent } from '../../content/ContentContext';

export default function BulletinBanner() {
  const ui = useContent('home').ui;
  return (
    <section className="bg-secondary text-on-secondary py-space-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-space-xl">
        <div className="flex flex-col gap-space-xs max-w-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed">{ui.bulletin.eyebrow}</span>
          <h3 className="font-headline-lg text-headline-lg font-bold text-on-secondary">{ui.bulletin.title}</h3>
          <p className="font-body-md text-body-md text-on-secondary/90">{ui.bulletin.text}</p>
        </div>
        <div className="w-full lg:w-auto flex-1 max-w-md">
          <div className="bg-surface-container-lowest/10 p-2 rounded-lg">
            <NewsletterForm
              variant="inline"
              tone="dark"
              source="heritage-bulletin"
              placeholder={ui.bulletin.placeholder}
              buttonLabel={ui.bulletin.button}
              inputClassName="flex-1 px-space-md py-space-sm rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm outline-none shadow-sm"
              buttonClassName="px-space-lg py-space-sm rounded bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container shrink-0 shadow-md disabled:opacity-60"
            />
          </div>
          <span className="font-mono-cite text-[11px] text-on-secondary/80 mt-2 block">{ui.bulletin.note}</span>
        </div>
      </div>
    </section>
  );
}
