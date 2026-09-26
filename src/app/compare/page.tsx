import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_RANKINGS } from '@/data/rankings';

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

          <span className="eyebrow">
            ⚖️ Side-by-Side Analysis · 2026
          </span>

          <h1>Compare Top Coaching Institutes</h1>
          <p className="prose-lead">
            Side-by-side #1 vs #2 showdowns from each ranking shortlist to help you choose the best classroom for your goals.
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

              return (
                <Link
                  key={p.slug}
                  href={`/compare/${p.slug}-comparison`}
                  className="exam-card"
                  style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="exam-card-badge">
                      {p.city ? `${p.city} · ` : ''}{p.exam.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--brand-primary)' }}>
                      VS SHOWDOWN
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.08rem', lineHeight: '1.4' }}>
                      {inst1?.name} <span style={{ color: 'var(--brand-primary)' }}>vs</span> {inst2?.name}
                    </h3>
                    <p style={{ marginTop: '4px', fontSize: '0.86rem' }}>{p.title}</p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '8px',
                      paddingTop: '10px',
                      borderTop: '1px solid var(--border-subtle)',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: 'var(--ink-primary)',
                    }}
                  >
                    <span>View Breakdown</span>
                    <span style={{ color: 'var(--brand-primary)' }}>→</span>
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
