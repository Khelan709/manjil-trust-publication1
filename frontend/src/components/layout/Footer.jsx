import Container from '../ui/Container';
import SmartLink, { SmartNavLink } from '../ui/SmartLink';
import NewsletterForm from '../forms/NewsletterForm';
import { useImages, useSettings } from '../../content/ContentContext';

const footerLink = ({ isActive }) =>
  `transition-colors ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`;

function LinkColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-space-sm">
      <h4 className="font-headline-sm text-headline-sm text-primary">{title}</h4>
      <nav aria-label={title} className="flex flex-col gap-space-xs font-body-sm text-body-sm">
        {links.map((l) => (
          <SmartNavLink key={l.label} to={l.to} end={l.end} className={footerLink}>
            {l.label}
          </SmartNavLink>
        ))}
      </nav>
    </div>
  );
}

export default function Footer() {
  const { brand, nav, legalLinks, ui } = useSettings();
  const images = useImages();
  const f = ui.footer;
  return (
    <footer className="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <Container className="pt-space-xxl pb-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-xxl">
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <img src={images.logo.src} alt={images.logo.alt} className="h-16 w-16 object-contain" />
              <span className="font-headline-md text-headline-md text-primary font-semibold">{brand.name}</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">{brand.footerBlurb}</p>
            <div className="flex flex-wrap gap-space-sm mt-space-xs">
              {brand.footerBadges.map((b) => (
                <span key={b} className="px-space-sm py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <LinkColumn title={f.programsTitle} links={nav.footerPrograms} />
          <LinkColumn title={f.authorsTitle} links={nav.footerAuthors} />

          <div className="flex flex-col gap-space-sm">
            <h4 className="font-headline-sm text-headline-sm text-primary">{f.dispatchTitle}</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{f.dispatchText}</p>
            <NewsletterForm source="footer" buttonLabel={f.newsletterButton} />
          </div>
        </div>

        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
          <p className="font-body-sm text-body-sm text-on-surface-variant">{brand.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-space-lg font-label-sm text-label-sm">
            {legalLinks.map((l) => (
              <SmartLink key={l.label} to={l.to} className="text-on-surface-variant hover:text-on-surface transition-colors">
                {l.label}
              </SmartLink>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
