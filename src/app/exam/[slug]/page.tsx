import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRankingsByExam, listExams, rankingPath, formatExamName, formatCityName } from '@/data/rankings';
import { RankingCards, AnswerBlock } from '@/components/RankingUI';

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
  const examName = formatExamName(exam);
  return {
    title: `${examName} Coaching Rankings Hub | 2026 Audited Shortlists`,
    description: `Explore audited ${examName} coaching rankings by city, national benchmarks, and criterion filters on CoachingRank.in.`,
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
  const examName = formatExamName(exam);

  const topNational = national[0];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/exam">Exam Hubs</Link>
            <span className="separator">/</span>
            <span className="current">{examName}</span>
          </nav>

          <div className="hero-status-pill">
            <span className="live-pulse-dot" />
            <span>2026 Audit Dossier · Verified Entrance Benchmark</span>
          </div>

          <h1>{examName} Coaching Rankings Hub</h1>
          <p className="prose-lead">
            Audited national benchmarks, city classroom shortlists, and criterion-wise evaluations for {examName} aspirants.
          </p>

          {/* Quick Metrics Bar */}
          <div className="hub-stat-strip">
            <div className="hub-stat-item">
              <span className="hub-stat-label">Audited Portals</span>
              <span className="hub-stat-val">{pages.length} Shortlists</span>
            </div>
            <div className="hub-stat-item">
              <span className="hub-stat-label">Active Cities</span>
              <span className="hub-stat-val">{cities.length || 1} Metro Hubs</span>
            </div>
            <div className="hub-stat-item">
              <span className="hub-stat-label">Audit Rubric</span>
              <span className="hub-stat-val">100-Point Inspection</span>
            </div>
            <div className="hub-stat-item">
              <span className="hub-stat-label">Commercial Policy</span>
              <span className="hub-stat-val" style={{ color: '#16a34a' }}>100% Unbiased</span>
            </div>
          </div>

          {/* Executive Direct Answer Block */}
          {topNational ? (
            <AnswerBlock page={topNational} />
          ) : (
            <div className="answer-box-leaf" style={{ marginTop: '20px' }}>
              <div className="answer-leaf-header">
                <div className="answer-status-cluster">
                  <span className="live-pulse-dot" />
                  <span className="answer-status-title">Editorial Audit Consensus</span>
                  <span className="answer-status-batch">· Verified 2026 Cycle</span>
                </div>
                <div className="answer-bias-tag">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>100% Independent & Unbiased</span>
                </div>
              </div>
              <p className="answer-lead-text">
                CoachingRank indexes {pages.length} verified shortlists for {examName} preparation across India, evaluating classroom faculty tenure, mock test difficulty calibration, and documented student selection ratios.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          {national.length > 0 && (
            <div style={{ marginBottom: '52px' }}>
              <div className="section-head">
                <div className="section-head-info">
                  <span className="eyebrow">National Benchmarks</span>
                  <h2>Pan-India {examName} Shortlists</h2>
                </div>
                <p>Audited for pan-India selection track, senior subject specialists, and mock test infrastructure.</p>
              </div>
              <RankingCards pages={national} cols3 />
            </div>
          )}

          {cities.length > 0 && (
            <div style={{ marginBottom: '52px' }}>
              <div className="section-head">
                <div className="section-head-info">
                  <span className="eyebrow">City Hubs</span>
                  <h2>{examName} Coaching by City</h2>
                </div>
                <p>Physical classroom shortlists verified for faculty presence, batch size limits, and local reputation.</p>
              </div>
              <RankingCards pages={cities} cols3 />
            </div>
          )}

          {criteria.length > 0 && (
            <div>
              <div className="section-head">
                <div className="section-head-info">
                  <span className="eyebrow">Criterion Lenses</span>
                  <h2>Filter {examName} Rankings by Priority</h2>
                </div>
                <p>Compare institutes by specific focus areas: selections, faculty stability, fees, or mock series.</p>
              </div>
              <div className="filter-pills-row" style={{ justifyContent: 'flex-start' }}>
                {criteria.map((p) => {
                  const critLabel = p.criterion
                    ? p.criterion.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                    : 'Criterion';
                  return (
                    <Link
                      key={p.slug}
                      href={rankingPath(p.slug)}
                      className="filter-pill"
                      style={{ padding: '8px 18px', fontSize: '0.9rem' }}
                    >
                      <span>{critLabel} Focus</span>
                      <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>→</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
