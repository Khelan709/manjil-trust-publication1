import { ROUTES } from './routes';

export const HOME_HERO = {
  badge: 'Open Access & Peer-Reviewed Scholarly Publishing',
  title: 'Advancing Thought, Literature & Scientific Research',
  lead: 'Manjil Publication fosters academic rigor and literary heritage by publishing peer-reviewed journals, monographs, and research volumes freely accessible to researchers and universities globally.',
  showcase: { eyebrow: 'Indexed Research Repository', title: 'Knowledge Free for Humankind' },
  stats: [
    { value: '60+', label: 'Peer-Reviewed Journals', gold: true },
    { value: '1,200+', label: 'Published Volumes', gold: true },
    { value: '100%', label: 'DOAJ Aligned Open Access' },
    { value: '85+', label: 'Countries Reached' },
  ],
  standards: ['CROSSREF DOI', 'COPE ETHICS', 'CLOCKSS ARCHIVE', 'PORTICO PRESERVATION', 'GOOGLE SCHOLAR', 'NISO Z39.29'],
};

export const HOME_FILTERS = [
  { key: 'all', label: 'All Disciplines' },
  { key: 'humanities', label: 'Social Sciences & Humanities' },
  { key: 'medical', label: 'Medical & Life Sciences' },
  { key: 'heritage', label: 'Literature & Heritage' },
  { key: 'tech', label: 'Technological Advances' },
];

export const HOME_JOURNALS = [
  { title: 'Manjil Journal of Interdisciplinary Studies', category: 'humanities', cover: 'coverInterdisciplinary', frequency: 'Quarterly', badge: 'DOAJ', badgeTone: 'navy', issn: 'ISSN: 2456-8910 (Online)', text: 'Cross-disciplinary analyses across sociology, jurisprudence, political economy, and humanities.', tags: ['Crossref DOI', 'Scopus Prep'], volume: 9 },
  { title: 'Archives of South Asian Heritage & Literature', category: 'heritage', cover: 'coverHeritageLiterature', frequency: 'Bi-Annual', badge: 'COPE', badgeTone: 'gold', issn: 'ISSN: 2581-9022 (Print & E)', text: 'Critical translations, manuscript preservation, dialectology, and folklore of the subcontinent.', tags: ['Crossref DOI', 'UGC-Care Listed'], volume: 14 },
  { title: 'Journal of Contemporary Social Policy & Law', category: 'humanities', cover: 'coverSocialPolicy', frequency: 'Quarterly', badge: 'DOAJ', badgeTone: 'navy', issn: 'ISSN: 2349-7718 (Online)', text: 'Doctrinal analysis, public welfare jurisprudence, socio-legal reforms, and constitutional rights.', tags: ['Crossref DOI', 'Index Copernicus'], volume: 7 },
  { title: 'International Journal of Public Health Innovations', category: 'medical', cover: 'coverPublicHealth', frequency: 'Monthly', badge: 'PubMed Prep', badgeTone: 'navy', issn: 'ISSN: 2632-1143 (Online)', text: 'Epidemiological trials, primary healthcare delivery, biostatistics, and global disease monitoring.', tags: ['Crossref DOI', 'ICMJE Standard'], volume: 11 },
  { title: 'Manjil Review of Science, Ethics & Tech', category: 'tech', cover: 'coverScienceEthics', frequency: 'Bi-Monthly', badge: 'DOAJ', badgeTone: 'navy', issn: 'ISSN: 2708-449X (Online)', text: 'Ethical AI governance, computational sociology, genetic engineering oversight, and epistemology.', tags: ['Crossref DOI', 'IEEE Collab'], volume: 5 },
];

export const PROGRAMS = {
  eyebrow: 'PUBLISHING PROGRAMS',
  title: 'Monographs, Text Proposals & Editorial Services',
  text: 'We provide full-spectrum publication pathways for authors, scholarly institutions, and departmental colloquiums. Each manuscript undergoes rigorous blind academic review.',
  items: [
    { icon: 'menu_book', title: 'Monograph & Dissertation Publishing', text: 'Convert qualifying doctoral theses, research monographs, and edited volumes into recognized hardbound volumes with international ISBN and chapter-level Crossref DOIs.', link: { label: 'Submit Book Proposal', to: ROUTES.contact }, note: 'Royalty & Open Access Models' },
    { icon: 'history_edu', title: 'Conference Proceedings & Special Volumes', text: 'End-to-end editorial infrastructure for university symposia and academic conventions, guaranteeing indexed digital volumes with rapid turnaround times.', link: { label: 'Inquire for Proceedings', to: ROUTES.contact }, note: 'Institutional Discounting' },
    { icon: 'archive', title: 'Archival Preservation & Repository Integration', text: 'Guaranteed permanent digital custody through Portico, CLOCKSS, and university OAI-PMH endpoints preventing link degradation or manuscript loss.', link: { label: 'View Archival Standards', to: ROUTES.preservation } },
  ],
  monograph: {
    eyebrow: 'Latest Monograph Release',
    title: 'Studies in Indic Historiography',
    isbn: 'ISBN 978-93-841',
    caption: 'Hardbound & Digital Open Access Edition',
    quote: '"An essential, rigorous reference examining early medieval epigraphy and administrative charters across northern India." — Prof. R. K. Mukherjee, Delhi University.',
  },
  grant: { eyebrow: 'Author Grant Subsidy 2025', text: 'APC Waivers available for low-income researchers' },
};

export const WORKFLOW = {
  eyebrow: 'SUBMISSION LIFECYCLE',
  title: 'Rigorous, Transparent Academic Workflow',
  text: 'From editorial intake to permanent worldwide preservation, our peer review process upholds COPE standards and delivers timely author feedback.',
  steps: [
    { title: 'Manuscript Submission', text: 'Authors submit via our secure portal with blinded manuscripts, structured abstracts, conflict disclosures, and dataset links.', icon: 'schedule', note: 'Average: 48h Intake Check' },
    { title: 'Double-Blind Review', text: 'Evaluated by at least two independent subject-matter referees with strict plagiarism scans via iThenticate prior to reviewer dispatch.', icon: 'verified', note: '21-Day Decision Target' },
    { title: 'Copyediting & Typesetting', text: 'Professional academic copyeditors format citations in APA/Chicago/Vancouver styles, compile high-res figures, and produce XML/PDF proofs.', icon: 'fact_check', note: 'Author Galley Approval' },
    { title: 'DOI & Global Indexing', text: 'Immediate release with Crossref DOI registration, Portico archiving, and syndication across Google Scholar and partner university repositories.', icon: 'public', note: 'Global Open Access' },
  ],
  cta: { title: 'Ready to publish your research with Manjil Publication?', text: 'Download our template packages (LaTeX & MS Word) or review ethical disclosure policies.' },
};

export const SUBSCRIPTIONS = {
  imageTitle: 'Institutional Library Partnerships',
  imageText: 'Supplying 340+ University Libraries Globally',
  eyebrow: 'FOR LIBRARIANS & CONSORTIA',
  title: 'Institutional Subscriptions, Print-on-Demand & Consortia',
  text: 'While our digital issues are fully open access, university libraries and academic centers require durable hardbound annual volumes, customized OAI-PMH feeds, and COUNTER-compliant usage telemetry.',
  features: [
    { icon: 'print', title: 'Annual Bound Volumes', text: 'Archival-grade acid-free paper hardbound collections sent to library stacks yearly.' },
    { icon: 'lan', title: 'Consortium EZproxy & IP Access', text: 'Seamless campus-wide direct access with unmetered simultaneous user licensing.' },
  ],
};
