/**
 * Resources & Catalogues content.
 * `href` is empty until the real files are uploaded; FileLink renders an inert
 * button for empty hrefs. `tags` feed the page search in addition to visible text.
 * Mirrors the backend `Resource` model (backend/src/models/Resource.js).
 */
export const RESOURCE_STRIP = {
  left: 'ARCHIVAL DOCUMENTATION REGISTRY • OFFICIAL RELEASE CYCLES 2025–2026',
  standards: 'CURATION STANDARDS: COPE • NISO Z39.48 • DOAJ',
  updated: 'UPDATED: OCTOBER 2025',
};

export const RESOURCES_HERO = {
  badge: 'Institutional Scholarly Assets',
  title: 'Resources & Catalogues',
  subtitle: 'Downloadable Guides, Editorial Documentation, and Annual Publication Catalogues.',
  text: 'Directly access institutional reference templates, double-blind review criteria, production-grade typography specs, and comprehensive subject-matter directories curated by the Manjil Publication editorial board.',
  integrity: { title: 'Catalogue Integrity', value: '58+', label: 'Active Peer-Reviewed Titles', left: 'ISBN/ISSN Registered', right: '100% Gold Open Access' },
};

export const FEATURED_DOWNLOADS = [
  { kind: 'primary', badge: 'PDF • 14.8 MB', icon: 'menu_book', title: 'Complete 2025–26 Academic Catalogue', text: 'Comprehensive registry containing all 58 indexed journals, monograph bibliographies, metadata profiles, and tiered print subscription schedules.', action: { label: 'Download Complete Catalogue', icon: 'download', href: '' } },
  { kind: 'secondary', badge: 'ZIP • 4.2 MB', icon: 'folder_zip', title: 'Author Submission Toolkit Package', text: 'Includes pre-styled LaTeX / Overleaf source repositories, Microsoft Word (.docx) production templates, CSL citation bundles, and contributor checklists.', action: { label: 'Download Author Toolkit', icon: 'archive', href: '' } },
  { kind: 'request', badge: 'DISPATCH SERVICE', icon: 'mark_as_unread', title: 'Request Institutional Print Samples', text: 'Exemplar archival copies and spine-bound issues for university acquisitions committees, departmental heads, and serial acquisitions librarians.', action: { label: 'Request Hardcover Specimens', icon: 'local_shipping' } },
];

export const ROLE_FILTERS = [
  { key: 'all', label: 'All Resources' },
  { key: 'authors', label: 'For Authors' },
  { key: 'reviewers', label: 'For Reviewers' },
  { key: 'editors', label: 'For Editors' },
  { key: 'librarians', label: 'For Librarians' },
];

export const RESOURCE_SECTIONS = [
  {
    id: 'guidelines', icon: 'edit_note', title: 'Author Guidelines & Manuscript Kits',
    description: 'Rigorous specifications for preparing text, citation bibliographies, high-resolution visual plates, and provenance manifests.',
    label: 'SECTION 01 / GUIDELINES', categories: ['authors'], layout: 'compact',
    items: [
      { tag: 'DOCX & TEX', icon: 'description', title: 'Preparation Templates', text: 'Pre-formatted submission layouts. Includes baseline double-column geometry, abstract block styling, and institutional affiliation metadata tagging.', action: 'Download Kits', actionIcon: 'arrow_downward', meta: 'v4.8 (2025)', tags: 'latex word author manuscript template' },
      { tag: 'STYLE DIRECTIVE', icon: 'format_quote', title: 'Reference Formatting Guides', text: 'Granular syntax rules covering APA 7th Edition, Vancouver Medical Standard, and Chicago Manual 17th with explicit Crossref DOI embedding guidelines.', action: 'View Specs', actionIcon: 'open_in_new', meta: 'PDF • 850 KB', tags: 'apa vancouver chicago citation formatting author' },
      { tag: 'PRODUCTION SPECS', icon: 'photo_size_select_actual', title: 'Figure & Image Standards', text: 'Exact vector and raster criteria: minimum 300 DPI for continuous tone, 600 DPI for combination charts, TIFF/EPS CMYK color spaces, and micro-label readability.', action: 'Manual PDF', actionIcon: 'download', meta: 'PDF • 1.4 MB', tags: 'figure dpi tiff eps image resolution author graphics' },
      { tag: 'MANDATORY POLICY', tone: 'error', icon: 'smart_toy', title: 'Plagiarism & AI Declaration', text: 'Standardized declaration of Generative AI tool usage, authorship authenticity agreements, and iThenticate similarity score evaluation indices (under 12%).', action: 'Disclosure Form', actionIcon: 'assignment', meta: 'DOCX Form', tags: 'ai plagiarism ethics llm declaration author compliance' },
    ],
  },
  {
    id: 'referees', icon: 'rate_review', title: 'Reviewer & Editor Documentation',
    description: 'Protocols for referee evaluations, double-blind parity, conflict adjudication, and editorial independence.',
    label: 'SECTION 02 / REFEREE CODES', categories: ['reviewers', 'editors'], layout: 'compact',
    items: [
      { tag: 'RUBRIC PROTOCOL', icon: 'checklist_rtl', title: 'Reviewer Scoring Rubric', text: 'Standardized 5-tier evaluation metrics assessing methodology validity, sample power, statistical clarity, ethical provenance, and scholarly impact.', action: 'Scoring Sheet', actionIcon: 'download', meta: 'PDF • 420 KB', tags: 'reviewer rubric scoring referee evaluation' },
      { tag: 'CONFIDENTIALITY', icon: 'visibility_off', title: 'Double-Blind Referee Guidance', text: 'Guidelines for maintaining author and evaluator anonymity during manuscript review, handling self-citations, and recognizing anonymized institutional datasets.', action: 'Referee Manual', actionIcon: 'open_in_new', meta: 'PDF • 610 KB', tags: 'double-blind reviewer referee guidance review' },
      { tag: 'COPE COMPLIANT', icon: 'gavel', title: 'Ethical Oversight Handbook', text: 'Comprehensive editor guidebook detailing dispute resolution, handling alleged guest author coercion, and protocols for peer-review manipulation investigations.', action: 'Handbook Dossier', actionIcon: 'download', meta: 'PDF • 2.1 MB', tags: 'editor ethical oversight handbook cope editorial' },
      { tag: 'FORM ICMJE', icon: 'handshake', title: 'Conflict of Interest Statement', text: 'Mandatory disclosure template for editors and referees covering commercial funding, institutional affiliations, shared patents, or recent joint publications.', action: 'PDF Disclosure', actionIcon: 'download', meta: 'Fillable PDF', tags: 'conflict interest coi disclosure editor reviewer' },
    ],
  },
  {
    id: 'catalogues', icon: 'library_books', title: 'Annual Catalogues & Master Price Lists',
    description: 'Official institutional distribution indices, print subscription tiers, and discipline-specific catalog releases.',
    label: 'SECTION 03 / ACQUISITIONS', categories: ['librarians'], layout: 'large',
    items: [
      { tag: 'MASTER EDITIONS', tone: 'gold', icon: 'inventory_2', iconTone: 'secondary', title: '2025/2026 Complete Academic Catalogue', text: 'The authoritative master volume covering indexed scientific, historical, and humanities serials published under the Manjil Publication imprint. Includes complete editorial rosters and ISSN directory.', format: 'FORMAT: High-Resolution Print PDF • 14.8 MB • 164 Pages', action: 'Download Master Volume', actionIcon: 'download', actionTone: 'primary', tags: 'catalogue 2025 2026 complete price institutional librarian' },
      { tag: 'PRICING SCHEDULE', icon: 'payments', iconTone: 'primary', title: 'Print-on-Demand (POD) Schedule', text: 'Detailed single-issue and continuous quarterly hardcover binding subscription rates for domestic (INR) and overseas international libraries (USD / GBP). Includes air-mail archival dispatch costs.', format: 'FORMAT: Spreadsheet XLS & PDF • 1.1 MB • Currency Matrix', action: 'Download Price Schedule', actionIcon: 'table_chart', tags: 'price list print-on-demand pod librarian subscription institutional' },
      { tag: 'DISCIPLINE PACKS', icon: 'collections_bookmark', iconTone: 'primary', title: 'Subject-Wise Brochures', text: 'Focused prospectuses tailored for specialized faculties: Health Sciences & Oncology, South Asian Archaeological Archives, and Quantitative Social Dynamics.', format: 'FORMAT: 3 Segmented PDFs • Combined 6.4 MB', action: 'Explore Subject Packs', actionIcon: 'folder_open', tags: 'brochures health south asian social sciences subject librarian' },
    ],
  },
  {
    id: 'ethics', icon: 'policy', title: 'Ethics & Compliance Dossiers',
    description: 'International integrity frameworks aligned with the Committee on Publication Ethics (COPE) and ICMJE principles.',
    label: 'SECTION 04 / GOVERNANCE', categories: ['authors', 'reviewers', 'editors'], layout: 'compact-3',
    items: [
      { tag: 'COPE CORE GUIDELINES', icon: 'verified_user', title: 'COPE Best Practice Procedures', text: 'Systematic flowcharts addressing simultaneous submission, fabricated citations, authorship changes post-acceptance, and ghostwriting allegations.', action: 'Read Statement', actionIcon: 'open_in_new', meta: 'PDF • 920 KB', tags: 'cope best practice guidelines ethics misconduct authors editors' },
      { tag: 'IRB COMPLIANCE', icon: 'biotech', title: 'Human & Animal Ethics Protocol', text: 'Informed patient consent mandates, Helsinki Declaration conformity documentation, and Institutional Animal Care and Use Committee (IACUC) approval filings.', action: 'Protocol Checklist', actionIcon: 'assignment_turned_in', meta: 'PDF • 740 KB', tags: 'human animal subjects irb consent ethics clinical trials' },
      { tag: 'CORRECTIONS & ERRATA', tone: 'error', icon: 'history_toggle_off', title: 'Retraction & Correction Policy', text: 'Detailed procedural rules regarding formal Corrigenda, Expressions of Concern, and full article Retractions with perpetual Crossmark link preservation.', action: 'View Formal Policy', actionIcon: 'open_in_new', meta: 'PDF • 510 KB', tags: 'retraction correction errata policy notice ethics' },
    ],
  },
];

export const PRESERVATION = {
  badgeTitle: 'Portico & LOCKSS',
  badgeText: 'Perpetual Digital Archival System',
  eyebrow: 'Standardized Preservation',
  title: 'Preserving Every Footnote, Formula, and Citation Since 1982',
  text: 'Manjil Publication guarantees continuous availability of published findings through automated multi-depository replication. In accordance with NISO standards, metadata is immediately ingested into Crossref, DOAJ, and national repositories upon DOI registration.',
  stats: [
    { value: '100%', label: 'DOI Assignment' },
    { value: '< 21 Days', label: 'Initial Referee Decision' },
    { value: 'CC BY 4.0', label: 'Creative Commons Open' },
  ],
};

export const TECH_MATRIX = {
  eyebrow: 'Production Quick Reference',
  title: 'Manuscript Typesetting & Artwork Matrix',
  rev: 'MANJIL TECH-SPEC • REV 2025.10',
  items: [
    { label: 'VECTOR ARTWORK', value: '1200 DPI / EPS', text: 'Line art, circuit schematics, gene loci maps, and mathematical graphs. Fonts must be embedded or outlined.' },
    { label: 'HALFTONE / PHOTO', value: '300 DPI / TIFF', text: 'Clinical histology, radiological scans, and photographic plates. Save in CMYK or uncompressed 8-bit grayscale.' },
    { label: 'REFERENCE STYLE', value: 'APA 7th • Vancouver', text: 'Numerical in-text citations [1] for Medicine; Author-Date (Smith, 2024) for Humanities and Social Studies.' },
    { label: 'SIMILARITY LIMIT', value: '< 15% Maximum', text: 'Strict iThenticate screening. Excludes bibliography and approved standard experimental methodology phrases.' },
  ],
};


/** Values must match SAMPLE_DISCIPLINES in backend/src/models/SampleRequest.js */
export const SAMPLE_DISCIPLINES = [
  'All Disciplinary Imprints (Comprehensive)',
  'Clinical Health Sciences & Oncology',
  'South Asian Archeology & Heritage Studies',
  'Economics & Quantitative Social Dynamics',
];
