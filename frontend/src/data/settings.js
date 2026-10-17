import { ROUTES } from './routes';

/**
 * Site-wide settings: brand, contact details, header/footer links and the two
 * admin-configurable URLs (Submit Manuscript, LinkedIn). Editable in Admin → Site Settings.
 * In any link field, the special value "@submit" means "the Submit Manuscript URL".
 */
export const SETTINGS = {
  brand: {
    name: 'Manjil Publication',
    tagline: 'Publishing House & Research Archive',
    phone: '+91-11-28549100',
    email: 'contact@manjiltrust.org',
    topBarBadge: 'ISSN & ISBN Registered',
    footerBlurb:
      'Dedicated to advancing scholarly discourse, rigorous peer-reviewed inquiry, and literary curation. Preserving intellectual heritage through open dissemination and academic monographs since 1982.',
    footerBadges: ['Crossref Member', 'COPE Compliant', 'DOAJ Indexed'],
    copyright: '© 2025 Manjil Publication. All rights reserved. Registered Academic & Literary Trust.',
  },
  links: {
    // Leave empty to send visitors to the Contact page instead.
    submitManuscriptUrl: '',
    linkedinUrl: 'https://www.linkedin.com/',
  },
  legalLinks: [
    { label: 'Privacy Policy', to: ROUTES.privacy },
    { label: 'Terms of Service', to: ROUTES.terms },
    { label: 'Portico & LOCKSS Preservation', to: ROUTES.preservation },
  ],
  nav: {
    main: [
      { label: 'Home', to: ROUTES.home, end: true },
      { label: 'Journals', to: ROUTES.journals },
      { label: 'Open Access', to: ROUTES.openAccess },
      { label: 'Resources', to: ROUTES.resources },
      { label: 'About', to: ROUTES.about },
      { label: 'Contact', to: ROUTES.contact },
    ],
    searchTo: ROUTES.catalogSearch,
    footerPrograms: [
      { label: 'Peer-Reviewed Journals', to: ROUTES.journals },
      { label: 'Academic Monographs', to: ROUTES.books },
      { label: 'Literary Anthologies', to: ROUTES.books },
      { label: 'Gold Open Access Portal', to: ROUTES.openAccess },
      { label: 'Annual Publication Catalogues', to: ROUTES.resources },
    ],
    footerAuthors: [
      { label: 'Manuscript Submission Portal', to: ROUTES.submit },
      { label: 'Author Preparation Guidelines', to: ROUTES.authorGuidelines },
      { label: 'Double-Blind Peer Review', to: ROUTES.peerReview },
      { label: 'Ethical Guidelines & Malpractice', to: ROUTES.ethics },
      { label: 'Licensing & Permissions', to: ROUTES.copyright },
    ],
  },
};
