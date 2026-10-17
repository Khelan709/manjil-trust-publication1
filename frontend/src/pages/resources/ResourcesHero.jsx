import Icon from '../../components/ui/Icon';
import Container from '../../components/ui/Container';
import { useContent } from '../../content/ContentContext';

export function RegistryStrip() {
  const S = useContent('resources').strip;
  return (
    <section className="w-full bg-primary-container py-space-sm">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-space-xs text-surface-container-highest font-mono-cite text-mono-cite">
        <div className="flex items-center gap-space-sm">
          <span className="flex h-2 w-2 rounded-full bg-secondary-fixed shrink-0" />
          <span>{S.left}</span>
        </div>
        <div className="flex items-center gap-space-md">
          <span>{S.standards}</span>
          <span className="hidden md:inline text-on-primary-container">|</span>
          <span className="hidden md:inline">{S.updated}</span>
        </div>
      </Container>
    </section>
  );
}

export default function ResourcesHero() {
  const H = useContent('resources').hero;
  return (
    <section className="w-full bg-primary text-on-primary py-space-xxl">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          <div className="inline-flex items-center gap-space-xs bg-secondary-container px-space-md py-1 rounded text-on-secondary-fixed font-label-sm text-label-sm w-fit uppercase tracking-wider">
            <Icon name="folder_special" size={16} /> {H.badge}
          </div>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-primary font-bold tracking-tight">{H.title}</h1>
          <p className="font-headline-md text-headline-md text-surface-container-highest font-normal max-w-3xl">{H.subtitle}</p>
          <p className="font-body-md text-body-md text-surface-container-high max-w-2xl mt-space-xs">{H.text}</p>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-space-md bg-surface-container p-space-lg rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider">{H.integrity.title}</span>
            <Icon name="verified" className="text-secondary" />
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-display-hero text-display-hero text-primary">{H.integrity.value}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">{H.integrity.label}</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-4/5 rounded-full" />
          </div>
          <div className="flex justify-between items-center font-mono-cite text-mono-cite text-on-surface-variant">
            <span>{H.integrity.left}</span>
            <span className="text-primary font-semibold">{H.integrity.right}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
