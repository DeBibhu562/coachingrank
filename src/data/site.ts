export const SITE = {
  name: 'CoachingRank',
  domain: 'coachingrank.in',
  url: 'https://coachingrank.in',
  email: 'info@coachingrank.in',
  tagline: 'India’s coaching rankings — exam-wise, city-wise, criterion-wise shortlists students trust.',
  description:
    'CoachingRank.in publishes exam and city coaching rankings with clear shortlists, hub pages, and answer-first guides built for Google, AI Overviews, and ChatGPT-style search.',
  year: 2026,
} as const;

export const CATEGORIES = [
  {
    key: 'rankings',
    path: '/rankings',
    label: 'Rankings',
    blurb: 'National and city coaching shortlists with locked top ranks.',
  },
  {
    key: 'exam',
    path: '/exam',
    label: 'Exam hubs',
    blurb: 'CLAT, AILET, DU LLB, UPSC, IPMAT, share market and more.',
  },
  {
    key: 'city',
    path: '/city',
    label: 'City hubs',
    blurb: 'Delhi, Mumbai, Bangalore, Hyderabad and other coaching cities.',
  },
  {
    key: 'institute',
    path: '/institute',
    label: 'Institutes',
    blurb: 'Brand pages for ranked coaching institutes.',
  },
  {
    key: 'compare',
    path: '/compare',
    label: 'Compare',
    blurb: 'Side-by-side fee, faculty and results shortlists.',
  },
  {
    key: 'criterion',
    path: '/criterion',
    label: 'By criterion',
    blurb: 'Rankings by results, faculty, mocks, fees and batch size.',
  },
] as const;

export const PRIORITY_EXAMS = [
  { slug: 'clat', label: 'CLAT', hub: '/exam/clat-coaching-rankings' },
  { slug: 'ailet', label: 'AILET', hub: '/exam/ailet-coaching-rankings' },
  { slug: 'du-llb', label: 'DU LLB', hub: '/exam/du-llb-coaching-rankings' },
  { slug: 'upsc', label: 'UPSC', hub: '/exam/upsc-coaching-rankings' },
  { slug: 'ipmat', label: 'IPMAT', hub: '/exam/ipmat-coaching-rankings' },
  { slug: 'share-market', label: 'Share Market', hub: '/exam/share-market-coaching-rankings' },
] as const;
