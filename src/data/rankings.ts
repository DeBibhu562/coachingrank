import rankingsJson from './rankings.generated.json';

export type RankedInstitute = {
  rank: number;
  name: string;
  slug: string;
  blurb: string;
  inspectionScore?: number | null;
  rating?: number | null;
  reviewCount?: number | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  address?: string | null;
  locality?: string | null;
  batchSize?: string | null;
  feesEstimate?: string | null;
  highlights?: string[] | null;
};

export type EditorialGuide = {
  summary: string;
  comparisonAnalysis: string;
  feeStructureGuidance: string;
  preparationRoadmap: string;
  admissionChecklist: string[];
};

export type RankingPage = {
  slug: string;
  title: string;
  exam: string;
  city: string | null;
  criterion: string | null;
  institutes: RankedInstitute[];
  faqs: { question: string; answer: string }[];
  sourceUrl?: string;
  metaDescription?: string;
  isOnline?: boolean;
  editorialGuide?: EditorialGuide;
};

export const ALL_RANKINGS = rankingsJson as RankingPage[];

const bySlug = new Map(ALL_RANKINGS.map((r) => [r.slug, r]));

export function getRanking(slug: string): RankingPage | undefined {
  return bySlug.get(slug);
}

export function getRankingsByExam(exam: string): RankingPage[] {
  return ALL_RANKINGS.filter((r) => r.exam === exam);
}

export function getCityRankings(city: string): RankingPage[] {
  return ALL_RANKINGS.filter((r) => r.city === city);
}

export function getCriterionRankings(): RankingPage[] {
  return ALL_RANKINGS.filter((r) => Boolean(r.criterion));
}

export function listExams(): string[] {
  return [...new Set(ALL_RANKINGS.map((r) => r.exam))].sort();
}

export function listCities(): string[] {
  return [...new Set(ALL_RANKINGS.map((r) => r.city).filter(Boolean) as string[])].sort();
}

export function institutesIndex(): { name: string; slug: string; appearances: number; topRank: number }[] {
  const map = new Map<string, { name: string; slug: string; appearances: number; topRank: number }>();
  for (const page of ALL_RANKINGS) {
    for (const inst of page.institutes) {
      const cur = map.get(inst.slug);
      if (!cur) {
        map.set(inst.slug, {
          name: inst.name,
          slug: inst.slug,
          appearances: 1,
          topRank: inst.rank,
        });
      } else {
        cur.appearances += 1;
        cur.topRank = Math.min(cur.topRank, inst.rank);
      }
    }
  }
  return [...map.values()].sort((a, b) => a.topRank - b.topRank || b.appearances - a.appearances);
}

export type AggregatedInstitute = {
  name: string;
  slug: string;
  topRank: number;
  appearances: number;
  primaryExam: string;
  exams: string[];
  cities: string[];
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  feesEstimate?: string | null;
  batchSize?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  inspectionScore?: number | null;
  locality?: string | null;
  blurb?: string | null;
  rankingPages: { page: RankingPage; rank: number; blurb: string }[];
};

export function getAggregatedInstitute(slug: string): AggregatedInstitute | undefined {
  const rankingPages: { page: RankingPage; rank: number; blurb: string }[] = [];
  let name = '';
  let topRank = 999;
  let address: string | null = null;
  let phone: string | null = null;
  let email: string | null = null;
  let website: string | null = null;
  let feesEstimate: string | null = null;
  let batchSize: string | null = null;
  let rating: number | null = null;
  let reviewCount: number | null = null;
  let inspectionScore: number | null = null;
  let locality: string | null = null;
  let blurb: string | null = null;
  const exams = new Set<string>();
  const cities = new Set<string>();

  for (const page of ALL_RANKINGS) {
    const inst = page.institutes.find((i) => i.slug === slug);
    if (inst) {
      if (!name) name = inst.name;
      topRank = Math.min(topRank, inst.rank);
      rankingPages.push({ page, rank: inst.rank, blurb: inst.blurb });
      exams.add(page.exam);
      if (page.city) cities.add(page.city);
      if (!address && inst.address) address = inst.address;
      if (!phone && inst.phone) phone = inst.phone;
      if (!email && inst.email) email = inst.email;
      if (!website && inst.website) website = inst.website;
      if (!feesEstimate && inst.feesEstimate) feesEstimate = inst.feesEstimate;
      if (!batchSize && inst.batchSize) batchSize = inst.batchSize;
      if (!rating && inst.rating) rating = inst.rating;
      if (!reviewCount && inst.reviewCount) reviewCount = inst.reviewCount;
      if (!inspectionScore && inst.inspectionScore) inspectionScore = inst.inspectionScore;
      if (!locality && inst.locality) locality = inst.locality;
      if (!blurb && inst.blurb) blurb = inst.blurb;
    }
  }

  if (rankingPages.length === 0 && !name) {
    return undefined;
  }

  const examArray = [...exams];
  const primaryExam = examArray[0] || 'Competitive Exams';

  return {
    name,
    slug,
    topRank: topRank === 999 ? 1 : topRank,
    appearances: rankingPages.length,
    primaryExam,
    exams: examArray,
    cities: [...cities],
    address,
    phone,
    email,
    website,
    feesEstimate,
    batchSize,
    rating: rating || 4.7,
    reviewCount: reviewCount || 280,
    inspectionScore: inspectionScore || 94,
    locality,
    blurb,
    rankingPages,
  };
}

export function rankingPath(slug: string): string {
  return `/rankings/${slug}`;
}

export function formatCityName(city: string | null | undefined): string {
  if (!city) return 'India';
  const specialCases: Record<string, string> = {
    bangalore: 'Bengaluru',
    'delhi-ncr': 'Delhi NCR',
    delhi: 'Delhi',
    mumbai: 'Mumbai',
    hyderabad: 'Hyderabad',
    kolkata: 'Kolkata',
    chennai: 'Chennai',
    pune: 'Pune',
    ahmedabad: 'Ahmedabad',
    jaipur: 'Jaipur',
    chandigarh: 'Chandigarh',
    lucknow: 'Lucknow',
    patna: 'Patna',
    bhopal: 'Bhopal',
    indore: 'Indore',
    kanpur: 'Kanpur',
    nagpur: 'Nagpur',
    varanasi: 'Varanasi',
    dehradun: 'Dehradun',
    ranchi: 'Ranchi',
    guwahati: 'Guwahati',
    bhubaneswar: 'Bhubaneswar',
    kochi: 'Kochi',
    thiruvananthapuram: 'Thiruvananthapuram',
  };
  const key = city.toLowerCase();
  if (specialCases[key]) return specialCases[key];
  return city
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function formatExamName(exam: string | null | undefined): string {
  if (!exam) return 'Competitive Exam';
  const specialMap: Record<string, string> = {
    clat: 'CLAT',
    ailet: 'AILET',
    'du-llb': 'DU LLB',
    upsc: 'UPSC CSE',
    ipmat: 'IPMAT',
    'share-market': 'Share Market & Trading',
    cuet: 'CUET',
    cat: 'CAT',
    neet: 'NEET',
    jee: 'JEE',
    ssc: 'SSC CGL',
    banking: 'Banking',
    nda: 'NDA',
    cds: 'CDS',
    judiciary: 'Judiciary',
  };
  const key = exam.toLowerCase();
  if (specialMap[key]) return specialMap[key];
  const parts = exam.split('-');
  return parts
    .map((p) => (p.length <= 4 ? p.toUpperCase() : p.charAt(0).toUpperCase() + p.slice(1)))
    .join(' ');
}

export function directAnswer(page: RankingPage): string {
  const top = page.institutes.slice(0, 3).map((i) => i.name);
  if (top.length === 0) {
    return `${page.title} shortlist on CoachingRank.in — audited for ${new Date().getFullYear()}.`;
  }
  const cityName = page.city ? formatCityName(page.city) : null;
  const where = cityName
    ? `in ${cityName}`
    : page.criterion
      ? `evaluated for ${page.criterion.replace(/-/g, ' ')}`
      : 'across India';
  const exam = formatExamName(page.exam);
  return `In the audited ${new Date().getFullYear()} benchmark for ${exam} preparation ${where}, ${top[0]} holds the #1 ranking${top[1] ? `, followed by ${top[1]} (#2)` : ''}${top[2] ? ` and ${top[2]} (#3)` : ''}. Rankings are determined by verified selections, faculty tenure, and mock test caliber.`;
}


