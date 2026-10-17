import Icon from '../ui/Icon';
import Container from '../ui/Container';
import SmartLink from '../ui/SmartLink';
import { useSettings } from '../../content/ContentContext';
import { ROUTES } from '../../data/routes';
import { safeUrl } from '../../utils/links';

function LinkedInIcon({ size = 16 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/**
 * Navy utility strip: contact details on the left; on the right the Submit Manuscript button
 * (URL set by an admin in Site Settings) followed by the LinkedIn icon.
 */
export default function TopBar() {
  const { brand, links, ui } = useSettings();
  const linkedin = safeUrl(links.linkedinUrl);
  return (
    <div className="bg-primary text-on-primary w-full">
      <Container className="h-10 flex items-center justify-between gap-space-md font-label-sm text-label-sm">
        <div className="flex items-center gap-space-lg min-w-0">
          <span className="flex items-center gap-space-xs whitespace-nowrap">
            <Icon name="call" size={14} /> {brand.phone}
          </span>
          <span className="hidden md:flex items-center gap-space-xs">
            <Icon name="mail" size={14} /> {brand.email}
          </span>
          <span className="hidden lg:inline-block px-space-xs py-0.5 rounded bg-surface-container-highest/20 text-on-primary">
            {brand.topBarBadge}
          </span>
        </div>
        <div className="flex items-center gap-space-sm shrink-0">
          <SmartLink
            to={ROUTES.submit}
            className="inline-flex items-center gap-space-xs px-space-md py-1 rounded bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold hover:bg-secondary-fixed transition-colors"
          >
            <Icon name="upload_file" size={14} />
            <span>{ui.header.submit}</span>
          </SmartLink>
          {linkedin !== '#' && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-7 h-7 rounded flex items-center justify-center text-on-primary hover:text-secondary-container hover:bg-surface-container-highest/15 transition-colors"
            >
              <LinkedInIcon />
            </a>
          )}
        </div>
      </Container>
    </div>
  );
}
