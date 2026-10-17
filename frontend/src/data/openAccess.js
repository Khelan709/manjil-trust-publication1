export const INFO_BAR = {
  left: 'Budapest Open Access Initiative (BOAI) Signatory',
  middle: 'Continuous Digital Publishing Workflow',
  licence: 'CC BY-NC 4.0 Standard License',
  link: 'Fee Transparency 2025–2026',
};

export const OA_HERO = {
  badge: 'Universal Scientific Dissemination',
  title: 'Open Access Publishing at Manjil Publication',
  subtitle: 'Democratizing scholarly inquiry, rigorous scientific discourse, and research dissemination without paywalls or geographic frontiers.',
  lead:
    'Since its founding, Manjil Publication has operated on the conviction that knowledge generated through public and scholarly pursuit belongs in the global commons. By removing financial and administrative barriers to academic literature, our Gold Open Access framework accelerates discovery, enables real-time citation tracking, and bridges the gap between Western archives and researchers in the Global South.',
  stats: [
    { value: '100%', label: 'Immediate Free Access' },
    { value: '58+', label: 'Refereed Journals' },
    { value: 'Zero', label: 'Embargo Periods', accent: true },
  ],
  node: {
    eyebrow: 'Institutional Archive Node',
    doi: 'DOI Prefix: 10.18231',
    caption: 'Perpetual Repository Archiving via CLOCKSS & Portico',
    trendLabel: 'Global Citations & Readership Trend',
    trendValue: '+184% YoY',
    trendAxis: ['2021 Base', '2023 Scaled', '2025 Global Open Access'],
  },
};

export const PILLARS = [
  { icon: 'public', label: 'Pillar I', title: 'Gold Open Access Model', text: 'Immediate, irrevocable, and unmetered digital access worldwide upon publication. No personal subscription barriers, library tollgates, or document paywalls.', note: 'Zero Embargo Period', filled: true },
  { icon: 'policy', label: 'Pillar II', title: 'Creative Commons Licensing', text: 'Articles are universally licensed under CC BY-NC 4.0. Third parties may read, quote, reuse, and build upon findings provided clear scholarly attribution is rendered.', note: 'CC BY-NC 4.0 Certified' },
  { icon: 'verified_user', label: 'Pillar III', title: 'Author Copyright Retention', text: 'Authors retain absolute copyright of their manuscripts, figures, and research datasets. Authors grant Manjil Publication an exclusive first-publication license while keeping dissemination sovereignty.', note: 'Full Author Sovereignty', hoverFilled: true },
  { icon: 'cloud_sync', label: 'Pillar IV', title: 'Global Digital Preservation', text: 'Permanent dark archival security powered through international partnerships with CLOCKSS, Portico, and institutional university repositories with uninterrupted availability.', note: 'Portico & CLOCKSS Linked' },
];

/** Prices per currency. Add a currency by adding a key to CURRENCIES and a price in each track. */
export const CURRENCIES = [
  { key: 'inr', label: 'Domestic (INR ₹)' },
  { key: 'usd', label: 'International (USD $)' },
];

export const APC_TRACKS = [
  { title: 'Medical & Biomedical Clinical Journals', subtitle: 'Clinical Trials, Systematic Reviews, Pathology, Surgical Monographs', cycle: '4 - 6 Weeks', services: 'iThenticate screening, Crossref DOI, JATS XML conversion, PubMed indexing package', price: { inr: '₹ 14,500', usd: '$ 195 USD' }, note: 'Zero Submission Fee' },
  { title: 'Humanities, Social Sciences & Literary Studies', subtitle: 'Archival History, Linguistics, Philosophy, Cultural Anthropology', cycle: '6 - 8 Weeks', services: 'Full copyediting, typography proofing, persistent metadata preservation', price: { inr: '₹ 9,500', usd: '$ 140 USD' }, note: 'Zero Submission Fee' },
  { title: 'Academic Theses, Monograph Supplements & Fast-Track', subtitle: 'Doctoral Dissertations, Special Editions, Multi-Author Anthologies', cycle: '3 - 4 Weeks (Expedited)', services: 'Dedicated production editor, custom hardbound print archiving, ISBN allocation', price: { inr: '₹ 22,000', usd: '$ 310 USD' }, note: 'Includes 2 Hardbound Copies' },
];

export const WAIVERS = {
  eyebrow: 'Universal Inclusivity & Research4Life Equity',
  title: 'Automatic APC Waivers for Developing Nations',
  text: 'Manjil Publication firmly believes financial hardship must never impede the dissemination of high-caliber research. We implement standardized waivers aligning directly with the World Bank classification and Research4Life criteria:',
  tiers: [
    { value: '100% Full Waiver', group: 'Research4Life Group A', text: 'Automatic zero-fee publication for corresponding authors from designated low-income countries.', accent: true },
    { value: '50% Partial Waiver', group: 'Research4Life Group B', text: 'Direct fee concession for low-to-middle income regional researchers upon manuscript submission.' },
  ],
  disclaimer: '*Editorial acceptance decisions are blinded from waiver eligibility to eliminate bias.',
  procedure: {
    eyebrow: 'Application Procedure',
    title: 'Requesting an Editorial Waiver',
    text: 'Self-funded researchers, unfunded PhD scholars, and faculty without institutional grants may request discretionary fee alleviation during manuscript initiation:',
    steps: [
      'Submit waiver request simultaneously with initial cover letter.',
      'Provide official institutional certification confirming lack of funding.',
      'Waiver decisions are issued within 3 working business days.',
    ],
    cta: 'Request for Waiver',
  },
};

export const COMPLIANCE = {
  eyebrow: 'Scholarly Integrity Framework',
  title: 'Indexing Compliance & Rigorous Quality Control',
  text: 'Every Manjil Publication journal operates within stringently audited international publication ethics guidelines, safeguarding academic authenticity from submission to archiving.',
  cards: [
    { icon: 'fact_check', title: 'DOAJ Registry', text: 'Compliance with Directory of Open Access Journals criteria, including transparent peer-review declarations, explicit APC notice, and machine-readable metadata.', note: 'Fully Compliant Directory' },
    { icon: 'gavel', title: 'COPE Code of Conduct', text: 'Adherence to Committee on Publication Ethics guidelines for handling disputes, corrections, errata, author disputes, and potential retractions transparently.', note: 'Ethical Oversight Active' },
    { icon: 'find_in_page', title: 'iThenticate Screening', text: 'All incoming manuscripts are automatically passed through Crossref Similarity Check powered by Turnitin/iThenticate to guarantee uncompromised original scholarship.', note: 'Plagiarism Threshold <10%' },
    { icon: 'history_edu', title: 'Sherpa Romeo Green', text: 'Immediate self-archiving permitted. Authors are entitled to deposit pre-prints, post-prints, and publisher PDFs immediately into institutional university repositories.', note: 'Green Self-Archiving Permitted' },
  ],
  review: {
    eyebrow: 'Strict Academic Governance',
    title: 'Double-Blind Peer Review & Editorial Sovereignty',
    text: 'The integrity of Manjil Publication journals rests on our uncompromising double-blind peer review architecture. Authors and reviewers remain entirely anonymous to one another throughout the appraisal pipeline.',
    points: [
      { title: 'Absolute Editorial Independence', text: 'The Trust’s trustees and commercial leadership exercise zero veto authority or influence over acceptance rulings made by Editor-in-Chiefs.' },
      { title: 'Conflict of Interest Disclosures', text: 'Mandatory disclosure declarations are gathered from editors, peer reviewers, and contributing authors before editorial deliberation commences.' },
    ],
    stagesTitle: 'Peer Review Lifecycle Stages',
    stages: [
      { title: 'Preliminary Editorial Screen', text: 'Scope validation & iThenticate similarity check.' },
      { title: 'Blind External Referee Assignment', text: 'Minimum 2 subject specialists evaluated anonymously.' },
      { title: 'Revision Cycle & Data Verification', text: 'Statistical check & methodological validation.' },
      { title: 'Final Editorial Decision', text: 'Acceptance, DOI assignment & continuous typesetting.' },
    ],
  },
};

export const AUTHOR_CTA = {
  eyebrow: 'Author Resources & Submission',
  title: 'Ready to Publish Your Research in Gold Open Access?',
  text: 'Accelerate the global impact of your findings. Download official publication templates or submit your manuscript directly to our central editorial manuscript management portal.',
  // `href` left empty until the files are uploaded.
  downloads: [
    { icon: 'description', label: 'MS Word Template (.docx)', href: '' },
    { icon: 'code', label: 'LaTeX Overleaf Package (.zip)', href: '' },
    { icon: 'shield_with_heart', label: 'Ethical Declaration Form (.pdf)', href: '' },
  ],
  portal: {
    eyebrow: 'Direct Portal Access',
    title: 'Manuscript Tracking Suite',
    text: 'Track your paper in real-time from double-blind referee review through production, XML layout, and final Crossref DOI allocation.',
    footLeft: 'Avg. Initial Review: 21 Days',
    footRight: 'Fast-Track Available',
  },
};
