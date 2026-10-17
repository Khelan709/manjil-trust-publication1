/** Inquiry categories — `value`s must match INQUIRY_CATEGORIES in backend/src/models/Inquiry.js */
export const INQUIRY_CATEGORIES = [
  { value: 'status', label: 'Manuscript Submission Status & Peer Tracking' },
  { value: 'monograph', label: 'Book Publication Proposal & Thesis Conversion' },
  { value: 'oa', label: 'Open Access, APC Waivers & Repository Inquiries' },
  { value: 'editorial', label: 'Editorial Board / Peer Reviewer Application' },
  { value: 'library', label: 'Institutional Library Subscription & Print Supply' },
  { value: 'fair', label: 'Frankfurt Book Fair Delegation / International Rights' },
  { value: 'general', label: 'General Administrative Feedback' },
];

export const ATTACHMENT = {
  maxBytes: 15 * 1024 * 1024,
  accept: '.pdf,.docx,.zip',
  allowedExtensions: ['pdf', 'docx', 'zip'],
  hint: 'Attach PDF, DOCX, or ZIP (Max 15MB)',
};

export const DEPARTMENTS = [
  {
    icon: 'hub', tag: 'General Desk', title: 'Inquiries & Reception',
    text: 'Central reception for public registry, institutional charters, and physical dispatch verification.',
    links: [
      { icon: 'call', label: '+91-11-28549100 / 01', href: 'tel:+911128549100' },
      { icon: 'mail', label: 'info@manjiltrust.org', href: 'mailto:info@manjiltrust.org' },
    ],
  },
  {
    icon: 'rate_review', tag: 'Peer Review', title: 'Editorial & Manuscripts',
    text: 'Inquiries regarding manuscript tracking, blind referee assignment, proofs, and DOAJ indexation.',
    links: [{ icon: 'mail', label: 'submissions@manjiltrust.org', href: 'mailto:submissions@manjiltrust.org' }],
    note: { icon: 'verified', label: 'Avg. Review Ack: 48 Hours', accentIcon: true },
  },
  {
    icon: 'menu_book', tag: 'Scholarly Press', title: 'Monographs & Books',
    text: 'Full book proposals, doctoral thesis conversions, edited academic anthologies, and ISBN allocation.',
    links: [{ icon: 'mail', label: 'monographs@manjiltrust.org', href: 'mailto:monographs@manjiltrust.org' }],
    note: { icon: 'auto_stories', label: 'ISBN Registry Available' },
  },
  {
    icon: 'public', tag: 'Global Consortium', title: 'International Relations',
    text: 'Frankfurt Book Fair delegations, library consortia subscriptions, and Crossref-backed licensing.',
    links: [{ icon: 'mail', label: 'international@manjiltrust.org', href: 'mailto:international@manjiltrust.org' }],
    note: { icon: 'event_seat', label: 'Frankfurt 2026 Ready', accent: true, accentIcon: true },
  },
];

export const CAMPUS = {
  eyebrow: 'Registered Campus',
  title: 'Trust Academic Center',
  address: 'Manjil Publication Academic Center, Institutional Area, Sector 12, Dwarka, New Delhi - 110075, India',
  hoursTitle: 'Standard Office Timings',
  hours: 'Monday – Saturday: 09:30 AM – 06:00 PM IST',
  hoursNote: '(Closed on 2nd Saturdays & National Gazetted Holidays)',
  mapCaption: 'Institutional Corridor • Dwarka',
  mapTitle: 'Nearest Transit: Dwarka Sector 12 Metro',
  mapNote: 'Blue Line Network • 650m from Gate No. 2',
  travel: [
    { icon: 'directions_subway', text: 'Delhi Metro Blue Line to Dwarka Sec 12 Station.' },
    { icon: 'flight', text: '25 minutes from IGI International Airport (Terminal 3).' },
  ],
};

export const ESCALATION = {
  eyebrow: 'Escalation & Quality Desk',
  title: 'Publication Ethics & Grievance Officer',
  text: 'For peer review disputes, author conflict appeals, plagiarism inquiries, or ethical escalations adhering to the Committee on Publication Ethics (COPE) framework:',
  contactLabel: 'Direct Ombudsman Contact',
  email: 'ombudsman@manjiltrust.org',
  note: 'Formal complaints receive a registered case docket number within 24 working hours.',
};

export const AFFILIATIONS = [
  { name: 'DOAJ', desc: 'Indexed Repository' },
  { name: 'Crossref', desc: 'Digital DOI Registry' },
  { name: 'COPE', desc: 'Ethical Compliance' },
  { name: 'Portico', desc: 'Permanent Archive' },
  { name: 'FBF 2026', desc: 'Delegation Member' },
];
