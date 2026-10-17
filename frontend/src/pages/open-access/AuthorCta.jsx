import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import Section from '../../components/ui/Section';
import FileLink from '../../components/ui/FileLink';

import { ROUTES } from '../../data/routes';
import { useContent } from '../../content/ContentContext';

export default function AuthorCta() {
  const ui = useContent('openAccess').ui;
  const A = useContent('openAccess').authorCta;
  return (
    <Section id="author-cta" className="scroll-mt-28">
      <div className="bg-primary-container text-on-primary rounded-xl p-space-xl lg:p-space-xxl shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/40 rounded-full blur-2xl pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl relative z-10 items-center">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed font-semibold">{A.eyebrow}</span>
            <h2 className="font-headline-xl text-headline-xl text-on-primary font-bold">{A.title}</h2>
            <p className="font-body-lg text-body-lg text-on-primary-container max-w-xl leading-relaxed">{A.text}</p>
            <div className="flex flex-wrap gap-space-sm pt-space-xs">
              {A.downloads.map((d) => (
                <FileLink
                  key={d.label}
                  href={d.href}
                  className="inline-flex items-center gap-2 px-space-md py-2.5 rounded bg-surface/10 hover:bg-surface/20 text-on-primary font-label-md text-label-md backdrop-blur-sm transition-colors"
                >
                  <Icon name={d.icon} size={18} className="text-secondary-fixed" /> <span>{d.label}</span>
                </FileLink>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-surface rounded-xl p-space-lg text-on-surface shadow-md flex flex-col gap-space-md">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">{A.portal.eyebrow}</span>
              <h3 className="font-headline-md text-headline-md text-primary font-bold">{A.portal.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{A.portal.text}</p>
            </div>
            <div className="flex flex-col gap-space-sm pt-space-xs">
              <Button to={ROUTES.submit} size="lg" trailingIcon="arrow_forward" className="w-full py-space-md shadow-sm">{ui.ctaButtons.submit}</Button>
              <Button to={ROUTES.contact} variant="soft" icon="help_center" className="w-full text-on-surface-variant hover:text-on-surface">{ui.ctaButtons.consult}</Button>
            </div>
            <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-mono-cite text-mono-cite">
              <span>{A.portal.footLeft}</span>
              <span>{A.portal.footRight}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
