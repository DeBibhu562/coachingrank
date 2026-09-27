import rankingsJson from './rankings.generated.json';

export type RankedInstitute = {
  rank: number;
  name: string;
  slug: string;
  blurb: string;
};

export type RankingPage = {
  slug: string;
  title: string;
  exam: string;
  city: string | null;
  criterion: string | null;
  institutes: RankedInstitute[];
  faqs: { question: string; answer: string }[];
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


