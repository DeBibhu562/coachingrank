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

export function directAnswer(page: RankingPage): string {
  const top = page.institutes.slice(0, 3).map((i) => i.name);
  if (top.length === 0) {
    return `${page.title} shortlist on CoachingRank.in — updated for ${new Date().getFullYear()}.`;
  }
  const where = page.city
    ? page.city.replace(/-/g, ' ')
    : page.criterion
      ? `as per ${page.criterion.replace(/-/g, ' ')}`
      : 'in India';
  return `The top ${page.exam.replace(/-/g, ' ').toUpperCase()} coaching ${where} ranks ${top[0]} at #1${top[1] ? `, followed by ${top[1]}` : ''}${top[2] ? ` and ${top[2]}` : ''}.`;
}
