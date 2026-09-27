import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_RANKINGS, formatCityName, formatExamName } from '@/data/rankings';

export const metadata: Metadata = {
  title: 'Compare Coaching Shortlists | Side-by-Side Institute Analysis',
  description: 'Compare coaching institutes using CoachingRank shortlists for fees, faculty, results and classroom structure.',
  alternates: { canonical: '/compare' },
};

export default function CompareIndexPage() {
  const pages = ALL_RANKINGS.filter((r) => !r.criterion && r.institutes.length >= 2).slice(0, 30);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Compare Shortlists</span>
          </nav>

          <div className="hero-status-pill">
            <span className="live-pulse-dot" />
            <span>Head-to-Head Institute Showdowns · 2026 Audit</span>
          </div>

          <h1>Compare Top Coaching Institutes</h1>
          <p className="prose-lead">
            Side-by-side #1 vs #2 showdowns from each ranking shortlist to help students and families evaluate faculty tenure, selection ratios, and mock series.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Head-to-Head</span>
              <h2>Featured Institute Comparisons</h2>
            </div>
            <p>Compare faculty pedigree, selection track record, and mock test infrastructure.</p>
          </div>

          <div className="chooser-grid">
            {pages.map((p) => {
              const inst1 = p.institutes[0];
              const inst2 = p.institutes[1];
              const cityName = p.city ? formatCityName(p.city) : null;
              const examName = formatExamName(p.exam);
              const cleanTitle = p.title.replace(/\s+2026.*/, '').replace(/\s+\|.*/, '');

              return (
                <Link
                  key={p.slug}
                  href={`/compare/${p.slug}-comparison`}
                  className="showdown-card"
                >
                  <div className="showdown-card-top">
                    <div className="showdown-badge-group">
                      <span className="showdown-exam-tag">{examName}</span>
                      {cityName && <span className="showdown-city-tag">{cityName}</span>}
                    </div>
                    <span className="showdown-vs-tag">
                      #1 VS #2
                    </span>
                  </div>

                  <div className="showdown-contenders">
                    <div className="contender-name">
                      <span className="medal-dot gold">1</span>
                      <span>{inst1?.name}</span>
                    </div>
                    <span className="contender-vs">vs</span>
                    <div className="contender-name">
                      <span className="medal-dot silver">2</span>
                      <span>{inst2?.name}</span>
                    </div>
                  </div>

                  <p className="showdown-title-meta">{cleanTitle}</p>

                  <div className="showdown-card-footer">
                    <span>Inspect Breakdown</span>
                    <span className="showdown-arrow">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
