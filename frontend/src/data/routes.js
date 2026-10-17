/**
 * Single source of truth for URL paths.
 * The design export referenced pages through `data-path` slugs; each slug is
 * mapped to a real route here. Pages without a design yet are listed in
 * PLACEHOLDER_PAGES and rendered by <PlaceholderPage />.
 */
export const ROUTES = {
  home: '/',
  openAccess: '/open-access',
  resources: '/resources',
  about: '/about',
  contact: '/contact',
  /** Not a real route: resolved at render time to the URL an admin sets in Settings → links.submitManuscriptUrl (see SmartLink). */
  submit: '@submit',
  journals: '/journals',
  books: '/books',
  requestWaiver: '/request-waiver',
  catalogSearch: '/catalog-search',
  authorGuidelines: '/author-guidelines',
  peerReview: '/peer-review',
  ethics: '/publication-ethics',
  copyright: '/copyright-policy',
  privacy: '/privacy-policy',
  terms: '/terms-of-service',
  preservation: '/archival-preservation',
};

/** Routes that are linked from the design but have no screen designed yet. */
export const PLACEHOLDER_PAGES = [
  { path: ROUTES.books, title: 'Books & Monographs', icon: 'menu_book', description: 'Academic monographs and literary anthologies will be catalogued here.' },
  { path: ROUTES.catalogSearch, title: 'Catalogue Search', icon: 'search', description: 'Bibliographic catalogue search will be available here.' },
  { path: ROUTES.authorGuidelines, title: 'Author Preparation Guidelines', icon: 'edit_note', description: 'Detailed manuscript preparation guidance will be published here.' },
  { path: ROUTES.peerReview, title: 'Double-Blind Peer Review', icon: 'visibility_off', description: 'The full peer-review policy and reviewer guidance will be published here.' },
  { path: ROUTES.ethics, title: 'Ethical Guidelines & Malpractice', icon: 'gavel', description: 'The publication ethics and malpractice statement will be published here.' },
  { path: ROUTES.copyright, title: 'Licensing & Permissions', icon: 'copyright', description: 'Copyright, licensing and permissions information will be published here.' },
  { path: ROUTES.privacy, title: 'Privacy Policy', icon: 'privacy_tip', description: 'The privacy policy will be published here.' },
  { path: ROUTES.terms, title: 'Terms of Service', icon: 'description', description: 'The terms of service will be published here.' },
  { path: ROUTES.preservation, title: 'Portico & LOCKSS Preservation', icon: 'inventory_2', description: 'Digital preservation details will be published here.' },
];
