/**
 * FAQ content, one set per page. Rendered by <FaqSection page="…" />.
 * Answers are plain strings; every figure below is taken from other pages of this site —
 * keep them in sync when policies or fees change (see data/openAccess.js, data/contact.js).
 */
export const FAQ_SETS = {
  home: {
    description: 'Quick answers about publishing, peer review and open access at Manjil Publication.',
    items: [
      { question: 'Is publishing with Manjil Publication really open access?', answer: 'Yes. All journals follow a Gold Open Access model with zero embargo: articles are free to read worldwide the moment they are published, under a CC BY-NC 4.0 licence. Authors retain copyright and grant the Trust a first-publication licence.' },
      { question: 'How long does peer review take?', answer: 'Authors receive an initial desk-screening decision within 5–7 working days. If the manuscript goes to external referees, the double-blind review phase averages 21–28 days.' },
      { question: 'How do I submit a manuscript?', answer: 'Use the Submit Manuscript button in the header. Before submitting, read the open access and APC details on the Open Access page. For help with an existing submission, write to submissions@manjiltrust.org.' },
      { question: 'Can I get an Article Processing Charge (APC) waiver?', answer: 'Yes. Authors from designated low-income and lower-middle-income countries are eligible for full or partial waivers, and early-career or unfunded scholars may also apply. Use the Request for Waiver page to apply.' },
      { question: 'Do you supply print copies to libraries?', answer: 'Yes. Digital issues are free, and hardbound annual volumes and print-on-demand supply are available for institutional libraries. See the Resources & Catalogues page or contact the editorial office to request specimens.' },
    ],
  },
  about: {
    description: 'Common questions about the Trust, its governance and its ethical commitments.',
    items: [
      { question: 'How is editorial independence protected?', answer: 'Acceptance decisions rest with the Editors-in-Chief. The Trust’s trustees and leadership do not hold veto authority or influence over acceptance rulings, and conflict-of-interest declarations are collected from editors, reviewers and authors.' },
      { question: 'Which ethical standards does the Trust follow?', answer: 'Manjil Publication follows the Committee on Publication Ethics (COPE) core practices, is registered with the Directory of Open Access Journals (DOAJ) and registers DOIs through Crossref.' },
      { question: 'How is published research preserved long term?', answer: 'Content is archived through Portico and the LOCKSS/CLOCKSS networks, so articles remain retrievable even if the publishing platform changes.' },
      { question: 'Where can I read the Trust’s governance and transparency reports?', answer: 'The Governance Charter & Annual Transparency Statements section on this page lists the annual operations report and the editorial governance charter. If a document is not yet downloadable, request it from the editorial office via the Contact page.' },
      { question: 'How do I raise a publication ethics concern?', answer: 'Write to the Publication Ethics & Grievance Officer at ombudsman@manjiltrust.org. Formal complaints receive a registered case docket number within 24 working hours.' },
    ],
  },
  contact: {
    description: 'Practical answers about reaching the right desk.',
    items: [
      { question: 'What are the office hours?', answer: 'Monday to Saturday, 09:30 AM – 06:00 PM IST. The office is closed on 2nd Saturdays and national gazetted holidays.' },
      { question: 'Which email address should I use?', answer: 'submissions@manjiltrust.org for manuscript tracking and peer review, monographs@manjiltrust.org for book proposals, international@manjiltrust.org for delegations and licensing, and info@manjiltrust.org for general inquiries.' },
      { question: 'How quickly will I receive a reply?', answer: 'Peer-review inquiries are typically acknowledged within 48 hours. Ethics complaints receive a case docket number within 24 working hours. Every inquiry submitted through the form receives a reference docket.' },
      { question: 'Can I attach documents to my inquiry?', answer: 'Yes. You can attach one PDF, DOCX or ZIP file up to 15 MB. Including DOI numbers or a cover letter helps the right department respond faster.' },
      { question: 'How do I get to the Trust Academic Center?', answer: 'The nearest station is Dwarka Sector 12 on the Delhi Metro Blue Line, about 650 m from Gate No. 2. The campus is roughly 25 minutes from IGI International Airport (Terminal 3).' },
    ],
  },
  openAccess: {
    description: 'Answers about licensing, article processing charges and waivers.',
    items: [
      { question: 'Which licence do articles use, and who owns the copyright?', answer: 'Articles are published under CC BY-NC 4.0. Authors keep copyright in their manuscripts, figures and datasets, and grant Manjil Publication an exclusive first-publication licence.' },
      { question: 'How much is the APC?', answer: 'The standard APC is ₹14,500 / $195 for Medical & Biomedical Clinical Journals, ₹9,500 / $140 for Humanities, Social Sciences & Literary Studies, and ₹22,000 / $310 for Academic Theses, Monograph Supplements & Fast-Track (includes 2 hardbound copies). There is no submission fee.' },
      { question: 'Who qualifies for an APC waiver?', answer: 'Corresponding authors from Research4Life Group A countries receive a 100% waiver, and Group B authors receive 50%. Early-career researchers, unfunded doctoral scholars and independent scholars may also request a discretionary waiver.' },
      { question: 'Does requesting a waiver affect the editorial decision?', answer: 'No. Acceptance decisions are blinded from waiver eligibility, so a request cannot help or harm your manuscript’s chances.' },
      { question: 'Can I deposit my article in an institutional repository?', answer: 'Yes. Immediate self-archiving is permitted — authors may deposit pre-prints, post-prints and the publisher PDF in institutional repositories straight away.' },
    ],
  },
  resources: {
    description: 'Common procedural clarifications regarding submission formatting, referee milestones, and perpetual archival policies.',
    items: [
  { question: 'What are the exact turnaround timelines for peer review and editorial determinations?', answer: 'Manjil Publication journals enforce rigorous peer-review milestones. Authors receive an initial desk-screening decision within 5–7 working days. If forwarded to external referees, the double-blind review phase requires an average of 21–28 days. Post-revision acceptance decisions are conveyed within 10 days, followed by early online DOI registration within 72 hours of signed page proofs.' },
  { question: 'Are there Article Processing Charges (APCs) for open-access publications under the Trust?', answer: 'As a registered non-profit academic trust, Manjil Publication heavily subsidizes open-access publishing costs. For domestic Indian scholars and developing-economy researchers (Research4Life countries), full or partial fee waivers are automatically extended. Standard APCs apply exclusively to sponsored institutional research grants and are documented transparently in our downloadable Master Price List.' },
  { question: 'Can authors submit manuscripts prepared in LaTeX rather than Microsoft Word?', answer: 'Yes. We strongly encourage LaTeX submissions, especially for quantitative, mathematical, and physics-adjacent studies. Our downloadable Author Toolkit Package includes verified Overleaf templates and standard .bst bibliography drivers. Authors should upload their compiled .pdf along with a .zip bundle containing all .tex, .bib, and high-resolution figure files.' },
  { question: 'How does the Trust ensure long-term perpetual preservation of digital articles?', answer: 'All electronic releases are mirrored into Portico and the global LOCKSS archival network. Even in catastrophic technical events, registered university libraries retain permanent unconstrained access. Additionally, XML feeds are ingested into national indexing repositories and DOAJ at release time.' },
    ],
  },
  waiver: {
    description: 'What to know before you request an APC waiver.',
    items: [
      { question: 'Who can request a waiver?', answer: 'Corresponding authors at institutions in Research4Life Group A (100% waiver) or Group B (50% waiver) countries, as well as early-career researchers, unfunded doctoral scholars and independent scholars without institutional funding.' },
      { question: 'How long does a decision take?', answer: 'Waiver decisions are issued within 3 working business days of receiving your request.' },
      { question: 'Will my request influence peer review?', answer: 'No. Waiver eligibility is kept separate from the editorial process, and acceptance decisions are blinded from it.' },
      { question: 'What supporting documents do I need?', answer: 'An official institutional certification confirming lack of funding, and your manuscript’s initial cover letter. You can upload the certification with the form or email it to the editorial office.' },
      { question: 'I have not submitted my manuscript yet. Can I still apply?', answer: 'Yes. Enter the working title of your manuscript, and add the manuscript ID if you already have one so the editorial office can link the two.' },
    ],
  },
  general: {
    description: 'Answers to the questions we receive most often.',
    items: [
      { question: 'Is all content free to read?', answer: 'Yes. Everything published by Manjil Publication is Gold Open Access with no paywalls or embargo periods.' },
      { question: 'How do I get in touch with the editorial office?', answer: 'Use the Contact Us page, or email info@manjiltrust.org. Office hours are Monday to Saturday, 09:30 AM – 06:00 PM IST.' },
      { question: 'Are fee waivers available?', answer: 'Yes. See the Request for Waiver page for eligibility and how to apply.' },
    ],
  },
};
