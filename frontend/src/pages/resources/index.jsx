import { useMemo, useState } from 'react';
import ResourcesHero, { RegistryStrip } from './ResourcesHero';
import FeaturedDownloads from './FeaturedDownloads';
import ResourceToolbar from './ResourceToolbar';
import ResourceSection from './ResourceSection';
import PreservationBand from './PreservationBand';
import TechMatrix from './TechMatrix';
import SampleRequestModal from '../../components/forms/SampleRequestModal';
import FaqSection from '../../components/sections/FaqSection';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useContent } from '../../content/ContentContext';

const matches = (item, q) =>
  !q || `${item.tag} ${item.title} ${item.text} ${item.tags || ''}`.toLowerCase().includes(q);

export default function Resources() {
  const RESOURCE_SECTIONS = useContent('resources').sections;
  useDocumentTitle('Resources & Catalogues');
  const [role, setRole] = useState('all');
  const [query, setQuery] = useState('');
  const [sampleOpen, setSampleOpen] = useState(false);

  // Role tabs hide whole sections; search narrows cards inside the remaining sections.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCE_SECTIONS
      .filter((s) => role === 'all' || s.categories.includes(role))
      .map((s) => ({ section: s, items: s.items.filter((i) => matches(i, q)) }))
      .filter((g) => g.items.length > 0);
  }, [role, query, RESOURCE_SECTIONS]);

  // Keep the original page rhythm: preservation band sits after the first group.
  const [first, ...rest] = visible;

  return (
    <div className="flex flex-col w-full">
      <RegistryStrip />
      <ResourcesHero />
      <FeaturedDownloads onRequestSamples={() => setSampleOpen(true)} />
      <ResourceToolbar role={role} onRoleChange={setRole} query={query} onQueryChange={setQuery} />

      {first && <ResourceSection section={first.section} items={first.items} />}
      <PreservationBand />
      <div className="pt-space-xxl" />
      {rest.map((g) => <ResourceSection key={g.section.id} section={g.section} items={g.items} />)}
      {visible.length === 0 && (
        <p className="text-center font-body-md text-body-md text-on-surface-variant py-space-xl">
          No resources match “{query}”. Try a broader term such as “catalogue” or “ethics”.
        </p>
      )}

      <TechMatrix />

      <FaqSection page="resources" />

      <SampleRequestModal open={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}
