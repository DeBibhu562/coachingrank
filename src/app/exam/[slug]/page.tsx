import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRankingsByExam, listExams, rankingPath } from '@/data/rankings';
import { RankingCards } from '@/components/RankingUI';

type Props = { params: Promise<{ slug: string }> };

function examFromSlug(slug: string) {
  const m = slug.match(/^(.+)-coaching-rankings$/);
  return m?.[1] ?? null;
}

export function generateStaticParams() {
  return listExams().map((exam) => ({ slug: `${exam}-coaching-rankings` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = examFromSlug(slug);
  if (!exam) return {};
  const label = exam.replace(/-/g, ' ');
  return {
    title: `${label.toUpperCase()} Coaching Rankings Hub | 2026 Shortlists`,
    description: `Explore ${label} coaching rankings by city, national benchmarks, and criterion filters on CoachingRank.in.`,
    alternates: { canonical: `/exam/${slug}` },
  };
}

export default async function ExamHubPage({ params }: Props) {
  const { slug } = await params;
  const exam = examFromSlug(slug);
  if (!exam || !listExams().includes(exam)) notFound();

  const pages = getRankingsByExam(exam);
  const national = pages.filter((p) => !p.city && !p.criterion);
  const cities = pages.filter((p) => p.city && !p.criterion);
  const criteria = pages.filter((p) => p.criterion);
  const label = exam.replace(/-/g, ' ');

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/exam">Exam Hubs</Link>
            <span className="separator">/</span>
            <span className="current">{label.toUpperCase()}</span>
          </nav>

          <span className="eyebrow">
            ★ Exam Master Hub · 2026 Audit
          </span>

          <h1>{label.toUpperCase()} Coaching Rankings</h1>
          <p className="prose-lead">
            Audited national benchmarks, city classroom shortlists, and criterion-wise evaluations for {label.toUpperCase()}.
          </p>

          <div className="answer-box">
            <div className="answer-header">
              <span className="answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Direct Answer
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Updated 2026</span>
            </div>
            <p className="answer-text">
              CoachingRank’s {label.toUpperCase()} master hub tracks verified coaching centres across India
              {national[0]?.institutes[0]
                ? ` — Pan-India #1 is ${national[0].institutes[0].name}${national[0].institutes[1] ? `, followed by #2 ${national[0].institutes[1].name}` : ''}`
                : ''}
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {national.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div className="section-head">
                <div className="section-head-info">
                  <span className="eyebrow">Pan-India</span>
                  <h2>National {label.toUpperCase()} Shortlists</h2>
                </div>
              </div>
              <RankingCards pages={national} cols3 />
            </div>
          )}

          {cities.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div className="section-head">
                <div className="section-head-info">
                  <span className="eyebrow">City Hubs</span>
                  <h2>{label.toUpperCase()} Coaching by City</h2>
                </div>
                <p>Classroom shortlists verified for physical presence, faculty, and batch sizes.</p>
              </div>
              <RankingCards pages={cities} cols3 />
            </div>
          )}

          {criteria.length > 0 && (
            <div>
              <div className="section-head">
                <div className="section-head-info">
                  <span className="eyebrow">Criterion Lenses</span>
                  <h2>Rankings by Specific Criterion</h2>
                </div>
                <p>Filter by alumni track record, mock tests, and faculty stability.</p>
              </div>
              <div className="filter-pills-row" style={{ justifyContent: 'flex-start' }}>
                {criteria.map((p) => (
                  <Link key={p.slug} href={rankingPath(p.slug)} className="filter-pill" style={{ padding: '8px 16px' }}>
                    {p.criterion?.replace(/-/g, ' ').toUpperCase()} Rankings →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
