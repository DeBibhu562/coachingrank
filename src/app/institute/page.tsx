import type { Metadata } from 'next';
import Link from 'next/link';
import { institutesIndex } from '@/data/rankings';
import { VERIFIED_INSTITUTES } from '@/data/institutes-directory';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Ranked Coaching Institutes Directory 2027 | Audited Brands Across All Exams',
  description:
    'Comprehensive directory of audited coaching institutes across UPSC, Law, SSC/Banking, Share Market, CAT, IIT/NEET, CDS, and GMAT in India. Explore verified fees, batch sizes, faculty scorecards, and genuine student reviews.',
  alternates: { canonical: '/institute' },
  openGraph: {
    title: 'Ranked Coaching Institutes Directory 2027 | CoachingRank.in',
    description:
      'Explore verified rankings, fees, and audit scorecards for premier coaching institutes across India.',
    url: `${SITE.url}/institute`,
    type: 'website',
  },
};

function getPodiumClass(rank: number) {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return 'bronze';
  return 'rest';
}

const EXAM_CATEGORIES = [
  { label: 'UPSC Civil Services', exam: 'UPSC' },
  { label: 'Law (CLAT / AILET / Judiciary)', exam: 'LAW' },
  { label: 'SSC & Banking (CGL / PO)', exam: 'SSC / BANK' },
  { label: 'Share Market & Trading', exam: 'SHARE MARKET' },
  { label: 'CAT & Management', exam: 'CAT' },
  { label: 'IIT JEE & NEET Medical', exam: 'IIT / NEET' },
  { label: 'CDS / NDA / Defence', exam: 'CDS / DEFENCE' },
  { label: 'GMAT & Study Abroad', exam: 'GMAT / STUDY ABROAD' },
];

export default function InstituteIndexPage() {
  const verifiedList = Object.values(VERIFIED_INSTITUTES);
  const institutes = institutesIndex().slice(0, 100);

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Ranked Coaching Institutes Directory',
    description:
      'Audited educational institutes and academy brands across India, evaluated on verified methodology, batch size, faculty tenure, and transparent fees.',
    url: `${SITE.url}/institute`,
    publisher: {
      '@type': 'EducationalOrganization',
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Institutes Directory</span>
          </nav>
          <span className="eyebrow">🏛️ Independent Forensic Audits · {SITE.year}</span>
          <h1>Ranked Coaching Institutes Directory</h1>
          <p className="prose-lead">
            Audited educational institutes and academy brands across India — evaluated on verified classroom batch sizes, faculty tenure, transparent fee structures, and genuine student outcomes.
          </p>

          <div className="trust-metrics" style={{ marginTop: '24px', paddingTop: '20px' }}>
            <div className="metric-card">
              <span className="metric-num">80+</span>
              <span className="metric-label">Audited Brands</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">8</span>
              <span className="metric-label">Major Exam Disciplines</span>
            </div>
            <div className="metric-card">
              <span className="metric-num" style={{ color: '#15803d' }}>100%</span>
              <span className="metric-label">Merit-Driven Audits</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">{SITE.year}</span>
              <span className="metric-label">Editorial Benchmarks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Verified Institutes by Category */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Premier Brands</span>
              <h2>Verified Flagship Institutes by Exam Category</h2>
            </div>
            <p>Direct access to comprehensive scorecards for premier coaching academies across India.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '24px' }}>
            {EXAM_CATEGORIES.map((cat) => {
              const matched = verifiedList.filter((v) => v.category === cat.exam);
              if (matched.length === 0) return null;

              return (
                <div key={cat.exam} style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--ink-primary)', margin: 0 }}>
                      {cat.label}
                    </h3>
                    <span style={{ fontSize: '0.82rem', background: 'rgba(37,99,235,0.08)', color: 'var(--brand-primary)', padding: '4px 10px', borderRadius: '20px', fontWeight: 600 }}>
                      {matched.length} Verified {matched.length === 1 ? 'Brand' : 'Brands'}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    {matched.map((inst) => (
                      <Link
                        key={inst.slug}
                        href={`/institute/${inst.slug}`}
                        style={{
                          background: 'var(--bg-elevated)',
                          padding: '16px',
                          borderRadius: '12px',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          flexDirection: 'column',
                          textDecoration: 'none',
                          color: 'inherit',
                          transition: 'border-color 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span className={`medal-badge ${getPodiumClass(inst.topRank)}`} style={{ width: '28px', height: '28px', fontSize: '0.8rem' }}>
                            #{inst.topRank}
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#15803d' }}>
                            ★ {inst.rating} ({inst.inspectionScore}/100)
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.02rem', margin: '4px 0', color: 'var(--ink-primary)' }}>{inst.name}</h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', margin: '0 0 8px' }}>
                          {inst.address.city} · {inst.batchSize}
                        </p>
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                          <span>{inst.feesEstimate}</span>
                          <span>View Scorecard →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Complete A-Z Directory Index */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Full Coverage</span>
              <h2>Complete Audited Institutes Index ({institutes.length})</h2>
            </div>
            <p>Explore all educational brands appearing across CoachingRank’s national, metro, and criterion shortlists.</p>
          </div>

          <div className="chooser-grid" style={{ marginTop: '24px' }}>
            {institutes.map((inst) => (
              <Link key={inst.slug} href={`/institute/${inst.slug}`} className="exam-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%' }}>
                  <span className={`medal-badge ${getPodiumClass(inst.topRank)}`} style={{ width: '38px', height: '38px', fontSize: '0.95rem' }}>
                    #{inst.topRank}
                  </span>
                  <div className="exam-card-info" style={{ flex: 1 }}>
                    <span className="exam-card-badge">
                      {inst.appearances} {inst.appearances === 1 ? 'Hub' : 'Hubs'} Featured
                    </span>
                    <h3>{inst.name}</h3>
                    <p>Peak rank #{inst.topRank} in independent audits</p>
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
