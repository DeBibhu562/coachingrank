import type { Metadata } from 'next';
import Link from 'next/link';
import { getCriterionRankings, rankingPath } from '@/data/rankings';

export const metadata: Metadata = {
  title: 'Coaching Rankings by Criterion | Results, Faculty, Mocks & Batch Size',
  description: 'Criterion-wise coaching rankings on CoachingRank.in — filter institutes by results, faculty experience, mock series, alumni, and batch size.',
  alternates: { canonical: '/criterion' },
};

export default function CriterionIndexPage() {
  const pages = getCriterionRankings();
  const criteria = [...new Set(pages.map((p) => p.criterion).filter(Boolean) as string[])].sort();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Criterion Hubs</span>
          </nav>

          <div className="hero-status-pill">
            <span className="live-pulse-dot" />
            <span>Specialized Lenses · 2027 Audit</span>
          </div>

          <h1>Coaching Rankings by Specific Criterion</h1>
          <p className="prose-lead">
            When one specific factor matters most to your entrance exam journey — evaluate centres through dedicated audit lenses.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Audit Metrics</span>
              <h2>Select an Evaluation Criterion</h2>
            </div>
            <p>Every criterion lens re-scores institutes based on specific verifiable evidence.</p>
          </div>

          <div className="chooser-grid">
            {criteria.map((c) => (
              <Link key={c} href={`/criterion/best-coaching-as-per-${c}`} className="exam-card">
                <div className="exam-card-info">
                  <span className="exam-card-badge">🎯 Evaluation Metric</span>
                  <h3 style={{ textTransform: 'capitalize' }}>As per {c.replace(/-/g, ' ')}</h3>
                  <p>Audited shortlists judged strictly by this parameter</p>
                </div>
                <div className="exam-card-arrow">→</div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '56px' }}>
            <div className="section-head">
              <div className="section-head-info">
                <span className="eyebrow">Directory</span>
                <h2>All Criterion Shortlists ({pages.length})</h2>
              </div>
            </div>

            <div className="filter-pills-row" style={{ justifyContent: 'flex-start', gap: '10px' }}>
              {pages.map((p) => (
                <Link
                  key={p.slug}
                  href={rankingPath(p.slug)}
                  className="filter-pill"
                  style={{ padding: '8px 14px', fontSize: '0.88rem' }}
                >
                  {p.title.replace(/\s+\|.*/, '').slice(0, 48)} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
