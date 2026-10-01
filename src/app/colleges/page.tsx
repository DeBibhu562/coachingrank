import type { Metadata } from 'next';
import Link from 'next/link';
import { COLLEGES, CollegeStream } from '@/data/colleges';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Top Law, Engineering & Medical Colleges in India 2027 | NIRF Rankings, Fees & Audits',
  description:
    'Explore India’s top 30 premier colleges across Law (NLUs), Engineering (IITs/NITs/BITS), and Medical (AIIMS/CMC) disciplines. Verified NIRF ranks, admission exams (CLAT, JEE, NEET), annual fees, placement packages, and audit scorecards.',
  alternates: { canonical: '/colleges' },
  openGraph: {
    title: 'Top Colleges in India 2027 – Law, Engineering & Medical | CoachingRank.in',
    description:
      'Verified rankings, fee structures, median salary packages, and forensic audit scorecards for premier Indian colleges.',
    url: `${SITE.url}/colleges`,
    type: 'website',
  },
};

const STREAMS: { key: CollegeStream | 'all'; label: string; icon: string; count: number }[] = [
  { key: 'all', label: 'All Disciplines', icon: '🏛️', count: 30 },
  { key: 'law', label: 'Top Law Colleges (NLUs)', icon: '⚖️', count: 10 },
  { key: 'engineering', label: 'Premier Engineering (IITs/NITs)', icon: '⚙️', count: 10 },
  { key: 'medical', label: 'Apex Medical (AIIMS/CMC)', icon: '🩺', count: 10 },
];

export default function CollegesDirectoryPage() {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Top Colleges in India Directory 2027',
    description:
      'Verified evaluation directory covering India’s premier Law, Engineering, and Medical colleges, including NIRF ranks, cutoff entrance exams, tuition fees, and median placement salaries.',
    url: `${SITE.url}/colleges`,
    publisher: {
      '@type': 'EducationalOrganization',
      name: SITE.name,
      url: SITE.url,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: COLLEGES.map((college, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${SITE.url}/colleges/${college.slug}`,
        name: college.name,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Colleges Directory</span>
          </nav>
          <span className="eyebrow">🎓 National Institutional Benchmarks · {SITE.year}</span>
          <h1>Top Law, Engineering & Medical Colleges in India</h1>
          <p className="prose-lead">
            Forensic evaluation and verified audit directory covering India’s premier National Law Universities (NLUs), Indian Institutes of Technology (IITs), National Institutes of Technology (NITs), and All India Institutes of Medical Sciences (AIIMS).
          </p>

          <div className="trust-metrics" style={{ marginTop: '24px', paddingTop: '20px' }}>
            <div className="metric-card">
              <span className="metric-num">30</span>
              <span className="metric-label">Premier Institutions</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">3</span>
              <span className="metric-label">Major Professional Streams</span>
            </div>
            <div className="metric-card">
              <span className="metric-num" style={{ color: 'var(--brand-primary)' }}>NIRF 2026/27</span>
              <span className="metric-label">Rank Calibrated</span>
            </div>
            <div className="metric-card">
              <span className="metric-num" style={{ color: '#15803d' }}>100%</span>
              <span className="metric-label">Verified Contact Details</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections by Stream */}
      <section className="section">
        <div className="container">
          {/* Stream Quick Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {STREAMS.slice(1).map((s) => (
              <a
                key={s.key}
                href={`#${s.key}`}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '18px 20px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                <div>
                  <h3 style={{ fontSize: '1.05rem', margin: '0 0 4px', color: 'var(--ink-primary)' }}>{s.label}</h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                    {s.count} Verified Profiles →
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Stream 1: Law Colleges */}
          <div id="law" style={{ marginBottom: '56px', scrollMarginTop: '80px' }}>
            <div className="section-head">
              <div className="section-head-info">
                <span className="eyebrow">⚖️ Legal Education</span>
                <h2>Top 10 Law Colleges in India (NLUs & Central Faculties)</h2>
              </div>
              <p>Ranked by academic rigor, Philip C. Jessup mooting records, corporate placement CTC, and judicial clerkships.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '24px' }}>
              {COLLEGES.filter((c) => c.stream === 'law').map((college) => (
                <Link
                  key={college.slug}
                  href={`/colleges/${college.slug}`}
                  style={{
                    background: 'var(--bg-surface)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid var(--border-subtle)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ background: 'rgba(37,99,235,0.1)', color: 'var(--brand-primary)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700 }}>
                      NIRF #{college.nirfRank}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: 600 }}>
                      ★ {college.rating} ({college.inspectionScore}/100)
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.18rem', margin: '0 0 6px', color: 'var(--ink-primary)' }}>{college.name}</h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', margin: '0 0 14px' }}>
                    📍 {college.address.city}, {college.address.state} · Estd. {college.established}
                  </p>

                  <div style={{ background: 'var(--bg-elevated)', padding: '12px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.84rem', marginBottom: '16px' }}>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>ENTRANCE EXAM</span>
                      <strong style={{ color: 'var(--ink-primary)' }}>{college.entranceExam.split('(')[0]}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>MEDIAN PACKAGE</span>
                      <strong style={{ color: '#15803d' }}>{college.medianPackageLPA}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>ANNUAL FEE</span>
                      <span style={{ color: 'var(--ink-primary)' }}>{college.annualFeeRange}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>SEATS</span>
                      <span style={{ color: 'var(--ink-primary)' }}>{college.totalIntake} Intake</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.88rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                    <span>Phone: {college.phone}</span>
                    <span>View Audit Profile →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Stream 2: Engineering Colleges */}
          <div id="engineering" style={{ marginBottom: '56px', scrollMarginTop: '80px' }}>
            <div className="section-head">
              <div className="section-head-info">
                <span className="eyebrow">⚙️ Technology & Engineering</span>
                <h2>Top 10 Engineering Colleges in India (IITs, NITs & BITS)</h2>
              </div>
              <p>Evaluated on research citations, startup incubation, high-frequency quant recruitment, and JEE Advanced selectivity.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '24px' }}>
              {COLLEGES.filter((c) => c.stream === 'engineering').map((college) => (
                <Link
                  key={college.slug}
                  href={`/colleges/${college.slug}`}
                  style={{
                    background: 'var(--bg-surface)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid var(--border-subtle)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ background: 'rgba(37,99,235,0.1)', color: 'var(--brand-primary)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700 }}>
                      NIRF #{college.nirfRank}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: 600 }}>
                      ★ {college.rating} ({college.inspectionScore}/100)
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.18rem', margin: '0 0 6px', color: 'var(--ink-primary)' }}>{college.name}</h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', margin: '0 0 14px' }}>
                    📍 {college.address.city}, {college.address.state} · Estd. {college.established}
                  </p>

                  <div style={{ background: 'var(--bg-elevated)', padding: '12px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.84rem', marginBottom: '16px' }}>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>ENTRANCE EXAM</span>
                      <strong style={{ color: 'var(--ink-primary)' }}>{college.entranceExam.split('(')[0]}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>MEDIAN PACKAGE</span>
                      <strong style={{ color: '#15803d' }}>{college.medianPackageLPA}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>ANNUAL FEE</span>
                      <span style={{ color: 'var(--ink-primary)' }}>{college.annualFeeRange}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>CAMPUS</span>
                      <span style={{ color: 'var(--ink-primary)' }}>{college.campusAcres.split('(')[0]}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.88rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                    <span>Phone: {college.phone}</span>
                    <span>View Audit Profile →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Stream 3: Medical Colleges */}
          <div id="medical" style={{ marginBottom: '56px', scrollMarginTop: '80px' }}>
            <div className="section-head">
              <div className="section-head-info">
                <span className="eyebrow">🩺 Medicine & Healthcare</span>
                <h2>Top 10 Medical Colleges in India (AIIMS, CMC & Apex Institutions)</h2>
              </div>
              <p>Audited on clinical patient load, bed strength, resident stipends, and NEET UG top 100 cutoff percentiles.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '24px' }}>
              {COLLEGES.filter((c) => c.stream === 'medical').map((college) => (
                <Link
                  key={college.slug}
                  href={`/colleges/${college.slug}`}
                  style={{
                    background: 'var(--bg-surface)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid var(--border-subtle)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ background: 'rgba(37,99,235,0.1)', color: 'var(--brand-primary)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700 }}>
                      NIRF #{college.nirfRank}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: 600 }}>
                      ★ {college.rating} ({college.inspectionScore}/100)
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.18rem', margin: '0 0 6px', color: 'var(--ink-primary)' }}>{college.name}</h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', margin: '0 0 14px' }}>
                    📍 {college.address.city}, {college.address.state} · Estd. {college.established}
                  </p>

                  <div style={{ background: 'var(--bg-elevated)', padding: '12px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.84rem', marginBottom: '16px' }}>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>ENTRANCE EXAM</span>
                      <strong style={{ color: 'var(--ink-primary)' }}>{college.entranceExam.split('(')[0]}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>RESIDENCY STIPEND</span>
                      <strong style={{ color: '#15803d' }}>{college.medianPackageLPA}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>COURSE FEE</span>
                      <span style={{ color: 'var(--ink-primary)' }}>{college.annualFeeRange}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem' }}>MBBS SEATS</span>
                      <span style={{ color: 'var(--ink-primary)' }}>{college.totalIntake} Intake</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.88rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                    <span>Phone: {college.phone}</span>
                    <span>View Audit Profile →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
