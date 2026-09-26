import type { Metadata } from 'next';
import Link from 'next/link';
import { institutesIndex } from '@/data/rankings';

export const metadata: Metadata = {
  title: 'Ranked Coaching Institutes Directory | 80+ Audited Brands',
  description: 'Audited institute brand directory across CoachingRank shortlists, sorted by peak ranking performance and shortlist coverage.',
  alternates: { canonical: '/institute' },
};

function getPodiumClass(rank: number) {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return 'bronze';
  return 'rest';
}

export default function InstituteIndexPage() {
  const institutes = institutesIndex().slice(0, 80);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Institutes Directory</span>
          </nav>
          <h1>Ranked Coaching Institutes Directory</h1>
          <p className="prose-lead">
            Audited educational institutes and academy brands across India, sorted by their peak ranking performance and shortlist coverage.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Audited Brands</span>
              <h2>{institutes.length} Featured Coaching Institutes</h2>
            </div>
            <p>Click any institute to view its full ranking scorecard, appearances across exams, and audited locations.</p>
          </div>

          <div className="chooser-grid">
            {institutes.map((inst) => (
              <Link key={inst.slug} href={`/institute/${inst.slug}`} className="exam-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%' }}>
                  <span className={`medal-badge ${getPodiumClass(inst.topRank)}`} style={{ width: '38px', height: '38px', fontSize: '0.95rem' }}>
                    #{inst.topRank}
                  </span>
                  <div className="exam-card-info" style={{ flex: 1 }}>
                    <span className="exam-card-badge">
                      {inst.appearances} {inst.appearances === 1 ? 'Hub' : 'Hubs'} Covered
                    </span>
                    <h3>{inst.name}</h3>
                    <p>Peak rank #{inst.topRank} in audits</p>
                  </div>
                  <div className="exam-card-arrow">→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
