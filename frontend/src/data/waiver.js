/**
 * Waiver request form options. `value`s must match the enums in
 * backend/src/models/WaiverRequest.js.
 */
export const AUTHOR_STATUSES = [
  { value: 'group_a', label: 'Corresponding author at an institution in a low-income country (Research4Life Group A)' },
  { value: 'group_b', label: 'Corresponding author at an institution in a lower-middle-income country (Research4Life Group B)' },
  { value: 'early_career', label: 'Early-career researcher / unfunded doctoral scholar' },
  { value: 'independent', label: 'Independent scholar without institutional funding' },
  { value: 'other', label: 'Other (explain below)' },
];

export const WAIVER_TYPES = [
  { value: 'full', label: '100% Full Waiver' },
  { value: 'partial', label: '50% Partial Waiver' },
  { value: 'assess', label: 'Not sure — please assess my eligibility' },
];

export const JOURNAL_TRACKS = [
  { value: 'medical', label: 'Medical & Biomedical Clinical Journals' },
  { value: 'humanities', label: 'Humanities, Social Sciences & Literary Studies' },
  { value: 'thesis', label: 'Academic Theses, Monograph Supplements & Fast-Track' },
];

export const WAIVER_PAGE = {
  eyebrow: 'Universal Inclusivity & Research4Life Equity',
  title: 'Request for Waiver',
  lead: 'Financial hardship should never prevent sound research from being published. Use this form to request a full or partial Article Processing Charge (APC) waiver for your manuscript.',
  responseTime: 'Decisions are issued within 3 working business days.',
  blindNote: 'Editorial acceptance decisions are blinded from waiver eligibility to eliminate bias.',
  requirements: [
    'Submit this request together with your manuscript’s initial cover letter.',
    'Provide official institutional certification confirming lack of funding (upload below, or email it to the editorial office).',
    'Waiver decisions are issued within 3 working business days.',
  ],
};
