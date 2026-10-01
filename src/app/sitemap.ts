import type { MetadataRoute } from 'next';
import { SITE, PRIORITY_EXAMS } from '@/data/site';
import {
  ALL_RANKINGS,
  institutesIndex,
  listCities,
  listExams,
  getCriterionRankings,
  rankingPath,
} from '@/data/rankings';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE.url}/rankings`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE.url}/sitemap`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${SITE.url}/exam`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/city`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/institute`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE.url}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE.url}/criterion`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    // Dedicated high-priority institute profile pages
    { url: `${SITE.url}/institute/first-ias-institute`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ];

  for (const exam of listExams()) {
    base.push({
      url: `${SITE.url}/exam/${exam}-coaching-rankings`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: PRIORITY_EXAMS.some((p) => p.slug === exam) ? 0.85 : 0.7,
    });
  }

  for (const city of listCities()) {
    base.push({
      url: `${SITE.url}/city/best-coaching-institutes-in-${city}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    });
  }

  const criteria = [...new Set(getCriterionRankings().map((p) => p.criterion).filter(Boolean) as string[])];
  for (const c of criteria) {
    base.push({
      url: `${SITE.url}/criterion/best-coaching-as-per-${c}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.65,
    });
  }

  for (const r of ALL_RANKINGS) {
    base.push({
      url: `${SITE.url}${rankingPath(r.slug)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: r.city || r.criterion ? 0.7 : 0.8,
    });
  }

  for (const inst of institutesIndex()) {
    base.push({
      url: `${SITE.url}/institute/${inst.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  for (const r of ALL_RANKINGS.filter((x) => x.institutes.length >= 2)) {
    base.push({
      url: `${SITE.url}/compare/${r.slug}-comparison`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.55,
    });
  }

  return base;
}
