export const SITE = {
  name: 'CoachingRank',
  domain: 'coachingrank.in',
  url: 'https://coachingrank.in',
  email: 'info@coachingrank.in',
  tagline: 'India’s coaching rankings — exam-wise, city-wise, criterion-wise shortlists students trust.',
  description:
    'CoachingRank.in publishes exam and city coaching rankings with clear shortlists, hub pages, and answer-first guides built for Google, AI Overviews, and ChatGPT-style search.',
  year: 2027,
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

export interface PriorityExam {
  slug: string;
  label: string;
  hub: string;
  category: string;
  tagline: string;
  intakeStat: string;
  benchmarkScore: string;
}

export const PRIORITY_EXAMS: PriorityExam[] = [
  {
    slug: 'clat',
    label: 'CLAT (Law)',
    hub: '/exam/clat-coaching-rankings',
    category: 'National Law Universities',
    tagline: '26 National Law Universities · Consortium mock test calibration & comprehension speed',
    intakeStat: '3,200+ NLU Seats',
    benchmarkScore: '9.4 / 10 Benchmark',
  },
  {
    slug: 'ailet',
    label: 'AILET (NLU Delhi)',
    hub: '/exam/ailet-coaching-rankings',
    category: 'Premier Law Entrance',
    tagline: 'NLU Delhi entrance · Critical reasoning speed drill & analytical precision',
    intakeStat: '123 Total Seats',
    benchmarkScore: '9.3 / 10 Benchmark',
  },
  {
    slug: 'du-llb',
    label: 'DU LLB / CUET PG',
    hub: '/exam/du-llb-coaching-rankings',
    category: '3-Year Law Benchmark',
    tagline: 'Faculty of Law DU · Constitutional jurisprudence & legal aptitude',
    intakeStat: '2,888 Faculty Seats',
    benchmarkScore: '9.1 / 10 Benchmark',
  },
  {
    slug: 'upsc',
    label: 'UPSC CSE',
    hub: '/exam/upsc-coaching-rankings',
    category: 'Civil Services',
    tagline: 'IAS/IPS 3-tier filtration · GS Prelims-Mains consistency & faculty mentorship',
    intakeStat: '1,000+ Cadre Ranks',
    benchmarkScore: '9.5 / 10 Benchmark',
  },
  {
    slug: 'ipmat',
    label: 'IPMAT (IIMs)',
    hub: '/exam/ipmat-coaching-rankings',
    category: 'Integrated Management',
    tagline: 'IIM Indore & Rohtak 5-Year BBA+MBA · Higher-math calculus & verbal agility',
    intakeStat: '5 Premier IIMs',
    benchmarkScore: '9.0 / 10 Benchmark',
  },
  {
    slug: 'share-market',
    label: 'Stock Market & Trading',
    hub: '/exam/share-market-coaching-rankings',
    category: 'Financial Markets',
    tagline: 'SEBI-aligned technical analysis · Price action, derivatives risk & live trading floors',
    intakeStat: 'Live Market Labs',
    benchmarkScore: '8.9 / 10 Benchmark',
  },
];

export const TOP_CITIES = [
  { slug: 'delhi', name: 'Delhi NCR', hub: '/city/best-coaching-institutes-in-delhi', tag: 'Capital Hub' },
  { slug: 'bangalore', name: 'Bengaluru', hub: '/city/best-coaching-institutes-in-bangalore', tag: 'Tech & Law' },
  { slug: 'mumbai', name: 'Mumbai', hub: '/city/best-coaching-institutes-in-mumbai', tag: 'Finance & Law' },
  { slug: 'hyderabad', name: 'Hyderabad', hub: '/city/best-coaching-institutes-in-hyderabad', tag: 'Southern Hub' },
  { slug: 'kota', name: 'Kota', hub: '/city/best-coaching-institutes-in-kota', tag: 'National Hub' },
  { slug: 'pune', name: 'Pune', hub: '/city/best-coaching-institutes-in-pune', tag: 'Academic Hub' },
] as const;

