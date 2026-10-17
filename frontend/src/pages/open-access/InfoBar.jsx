import Container from '../../components/ui/Container';
import { useContent } from '../../content/ContentContext';

export default function InfoBar() {
  const B = useContent('openAccess').infoBar;
  return (
    <div className="w-full bg-primary-container py-space-sm">
      <Container className="flex flex-wrap items-center justify-between gap-space-sm text-surface-container-highest font-label-sm text-label-sm">
        <div className="flex items-center gap-space-md">
          <span className="inline-flex items-center gap-1.5 text-on-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed" /> {B.left}
          </span>
          <span className="hidden md:inline-block text-on-primary-container">•</span>
          <span className="hidden md:inline-block">{B.middle}</span>
        </div>
        <div className="flex items-center gap-space-lg">
          <span className="font-mono-cite text-mono-cite tracking-normal text-secondary-fixed">{B.licence}</span>
          <a href="#apc-policy" className="text-secondary-fixed hover:text-secondary-container transition-colors underline decoration-secondary-fixed decoration-1 underline-offset-2">{B.link}</a>
        </div>
      </Container>
    </div>
  );
}
