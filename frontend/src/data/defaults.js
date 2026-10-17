/**
 * DEFAULT_CONTENT — the built-in copy of every editable area of the site.
 *
 * Each top-level key is one "content document" that an admin can edit in the admin panel
 * (backend collection `contents`). The database stores only the admin's edits; at runtime
 * they are deep-merged over these defaults (see content/merge.js), so the site always renders
 * even if the API is unreachable, and a field added here later appears automatically.
 *
 * Keys must match ALLOWED_KEYS in backend/src/models/Content.js.
 */
import { SETTINGS } from './settings';
import images from '../assets/images';
import { FAQ_SETS } from './faqs';
import * as home from './home';
import * as about from './about';
import * as contact from './contact';
import * as oa from './openAccess';
import * as resources from './resources';
import { WAIVER_PAGE } from './waiver';
import { UI } from './ui';

export const DEFAULT_CONTENT = {
  settings: { ...SETTINGS, ui: UI.settings },
  images,
  faqs: FAQ_SETS,
  home: {
    ui: UI.home,
    hero: home.HOME_HERO,
    filters: home.HOME_FILTERS,
    journals: home.HOME_JOURNALS,
    programs: home.PROGRAMS,
    workflow: home.WORKFLOW,
    subscriptions: home.SUBSCRIPTIONS,
  },
  about: {
    ui: UI.about,
    hero: about.ABOUT_HERO,
    governanceStrip: about.GOVERNANCE_STRIP,
    mission: about.MISSION,
    milestones: about.MILESTONES,
    trustees: about.TRUSTEES,
    ethics: about.ETHICS,
    transparency: about.TRANSPARENCY,
  },
  contact: {
    ui: UI.contact,
    departments: contact.DEPARTMENTS,
    campus: contact.CAMPUS,
    escalation: contact.ESCALATION,
    affiliations: contact.AFFILIATIONS,
  },
  openAccess: {
    ui: UI.openAccess,
    infoBar: oa.INFO_BAR,
    hero: oa.OA_HERO,
    pillars: oa.PILLARS,
    apcTracks: oa.APC_TRACKS,
    waivers: oa.WAIVERS,
    compliance: oa.COMPLIANCE,
    authorCta: oa.AUTHOR_CTA,
  },
  resources: {
    ui: UI.resources,
    strip: resources.RESOURCE_STRIP,
    hero: resources.RESOURCES_HERO,
    featuredDownloads: resources.FEATURED_DOWNLOADS,
    roleFilters: resources.ROLE_FILTERS,
    sections: resources.RESOURCE_SECTIONS,
    preservation: resources.PRESERVATION,
    techMatrix: resources.TECH_MATRIX,
  },
  waiver: { ...WAIVER_PAGE, ui: UI.waiver },
};

/** Human labels + descriptions for the admin sidebar. */
export const CONTENT_SECTIONS = [
  { key: 'settings', label: 'Site Settings', hint: 'Brand, phone/email, Submit Manuscript URL, LinkedIn, menu and footer links.' },
  { key: 'home', label: 'Home Page', hint: 'Hero, journals, programs, workflow.' },
  { key: 'about', label: 'About Page', hint: 'Mission, milestones, trustees, ethics, transparency.' },
  { key: 'openAccess', label: 'Open Access Page', hint: 'Pillars, APC fees, waivers, compliance.' },
  { key: 'resources', label: 'Resources Page', hint: 'Downloads, guides, catalogues, tech specs.' },
  { key: 'contact', label: 'Contact Page', hint: 'Departments, campus details, affiliations.' },
  { key: 'waiver', label: 'Request-for-Waiver Page', hint: 'Intro text and requirements.' },
  { key: 'faqs', label: 'FAQs (all pages)', hint: 'Questions and answers for each page.' },
  { key: 'images', label: 'Images & Logo', hint: 'Logo and all photographs. Upload or paste a URL.' },
];
