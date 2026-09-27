import Link from 'next/link';
import { PRIORITY_EXAMS, TOP_CITIES, SITE } from '@/data/site';
import { ALL_RANKINGS, formatCityName, formatExamName } from '@/data/rankings';
import { RankingCards } from '@/components/RankingUI';
import SearchFilter from '@/components/SearchFilter';

const FEATURED_SLUGS = [
  'best-clat-coaching',
  'best-ailet-coaching',
  'best-du-llb-coaching',
  'best-upsc-coaching',
  'best-ipmat-coaching',
  'best-share-market-coaching',
];

export default function HomePage() {
  const featured = FEATURED_SLUGS
    .map((slug) => ALL_RANKINGS.find((r) => r.slug === slug))
    .filter(Boolean) as typeof ALL_RANKINGS;

  const metroRankings = [
    ALL_RANKINGS.find((r) => r.slug === 'best-clat-coaching-in-delhi'),
    ALL_RANKINGS.find((r) => r.slug === 'best-ailet-coaching-in-bangalore'),
    ALL_RANKINGS.find((r) => r.slug === 'best-upsc-coaching-in-delhi'),
    ALL_RANKINGS.find((r) => r.slug === 'best-ipmat-coaching-in-mumbai'),
    ALL_RANKINGS.find((r) => r.slug === 'best-clat-coaching-in-hyderabad'),
    ALL_RANKINGS.find((r) => r.slug === 'best-coaching-institutes-in-kota'),
  ].filter(Boolean) as typeof ALL_RANKINGS;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is CoachingRank.in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CoachingRank.in is an independent coaching ranking encyclopedia for Indian competitive entrance exams, providing audited classroom shortlists, faculty stability scores, and answer-first consensus.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which exams does CoachingRank cover first?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Core exam coverage includes CLAT, AILET, DU LLB and other law entrances, UPSC Civil Services, IPMAT (IIMs), and stock market trading institutes, organized across 32 city hubs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are institutes able to purchase top ranks on CoachingRank?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Ranks are determined strictly through independent editorial audits based on verified student selections, faculty tenure stability, batch size limits, and mock test infrastructure.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-status-pill">
            <span className="live-pulse-dot" />
            <span>2026 Admissions & Audit Cycle · Verified Consensus</span>
          </div>

          <h1>
            Audited Coaching Rankings{' '}
            <span className="highlight-text">Students Trust</span>
          </h1>

          <p className="hero-lead">
            Independent, data-backed shortlists with locked #1 and #2 benchmark ranks across India’s premier entrance exams, legal hubs, and civil service academies.
          </p>

          {/* Interactive Search Engine */}
          <SearchFilter rankings={ALL_RANKINGS} />

          {/* Institutional Trust Metrics Bar */}
          <div className="trust-metrics">
            <div className="metric-card">
              <span className="metric-num">230+</span>
              <span className="metric-label">Audited Shortlists</span>
              <span className="metric-sub">Updated for 2026</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">28+</span>
              <span className="metric-label">Competitive Exams</span>
              <span className="metric-sub">Law, UPSC, IIM, Finance</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">32</span>
              <span className="metric-label">Metro & City Hubs</span>
              <span className="metric-sub">Classroom verified</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">100%</span>
              <span className="metric-label">Editorial Independence</span>
              <span className="metric-sub">Zero sponsored ranks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Choose an Exam Section */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Exam Portals</span>
              <h2>Explore By Entrance Exam</h2>
            </div>
            <p>National benchmarks, city classroom audits, and criterion-specific rankings tailored for your target entrance test.</p>
          </div>

          <div className="exam-portals-grid">
            {PRIORITY_EXAMS.map((e) => (
              <Link key={e.slug} href={e.hub} className="exam-portal-card">
                <div className="exam-portal-top">
                  <span className="exam-portal-cat">{e.category}</span>
                  <span className="exam-portal-score">{e.benchmarkScore}</span>
                </div>

                <h3 className="exam-portal-title">{e.label}</h3>
                <p className="exam-portal-desc">{e.tagline}</p>

                <div className="exam-portal-footer">
                  <div className="exam-portal-stat">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>{e.intakeStat}</span>
                  </div>
                  <span className="exam-portal-arrow">
                    Audit Hub →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured National Shortlists */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">National Benchmarks</span>
              <h2>Pan-India Flagship Shortlists</h2>
            </div>
            <Link href="/rankings" className="btn btn-ghost btn-sm">
              View All 230+ Rankings →
            </Link>
          </div>

          <RankingCards pages={featured} cols3 />
        </div>
      </section>

      {/* Metro Coaching Hubs */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Metro Classrooms</span>
              <h2>Premier City Coaching Hubs</h2>
            </div>
            <p>Classroom audits across physical centres, evaluating student batches, faculty availability, and mock series.</p>
          </div>

          {/* Quick Metro Switcher Pills */}
          <div className="metro-pills-row">
            {TOP_CITIES.map((c) => (
              <Link key={c.slug} href={c.hub} className="metro-city-pill">
                <span className="metro-city-dot" />
                <span className="metro-city-name">{c.name}</span>
                <span className="metro-city-tag">{c.tag}</span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '28px' }}>
            <RankingCards pages={metroRankings} cols3 />
          </div>
        </div>
      </section>

      {/* Audit Methodology Showcase */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Inspection Rubric</span>
              <h2>How CoachingRank Audits Every Institute</h2>
            </div>
            <p>Our 4-pillar verification framework ensures rankings reflect verifiable selection data, not promotional claims.</p>
          </div>

          <div className="rubric-grid-4">
            <div className="rubric-card">
              <div className="rubric-card-header">
                <span className="rubric-card-number">01</span>
                <span className="rubric-card-weight">40% Weight</span>
              </div>
              <h3>Selection Ratio & AIR Audits</h3>
              <p>
                We cross-examine official selection rolls, Top-100 All-India Ranks, and compare verified qualifiers against total enrolled classroom strength.
              </p>
            </div>

            <div className="rubric-card">
              <div className="rubric-card-header">
                <span className="rubric-card-number">02</span>
                <span className="rubric-card-weight">25% Weight</span>
              </div>
              <h3>Faculty Tenure & Pedagogy</h3>
              <p>
                Evaluation of permanent subject heads, average teaching tenure (8+ years benchmark), and absence of mid-session faculty abandonment.
              </p>
            </div>

            <div className="rubric-card">
              <div className="rubric-card-header">
                <span className="rubric-card-number">03</span>
                <span className="rubric-card-weight">20% Weight</span>
              </div>
              <h3>Mock Test Rigor & Analytics</h3>
              <p>
                Inspection of computer-based test engines, all-India percentile calibration, and alignment with recent question-paper pattern variations.
              </p>
            </div>

            <div className="rubric-card">
              <div className="rubric-card-header">
                <span className="rubric-card-number">04</span>
                <span className="rubric-card-weight">15% Weight</span>
              </div>
              <h3>Batch Caps & Doubt Support</h3>
              <p>
                Strict audit of student-teacher ratio, batch size ceilings (under 60 students per classroom), and scheduled 1-on-1 personal mentorship.
              </p>
            </div>
          </div>

          <div className="editorial-pledge-banner">
            <div className="pledge-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div className="pledge-text">
              <h4>Institutional Editorial Pledge</h4>
              <p>
                CoachingRank.in does not accept sponsorship, paid placement, or advertising fees to influence ranking order. Every #1 and #2 pick is earned strictly through documented classroom performance.
              </p>
            </div>
            <Link href="/about" className="btn btn-outline btn-sm" style={{ whiteSpace: 'nowrap' }}>
              Read Full Charter →
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '840px' }}>
          <div className="section-head" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className="section-head-info">
              <span className="eyebrow">Editorial FAQs</span>
              <h2>Frequently Asked Questions</h2>
            </div>
          </div>

          <div className="faq-container">
            <details className="faq-accordion" open>
              <summary className="faq-summary">
                <span>What is CoachingRank.in and how are rankings determined?</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-content">
                <p>
                  CoachingRank.in is an independent coaching directory and ranking encyclopedia for Indian competitive entrance exams. Each institute is evaluated using an objective 100-point rubric covering verified selection ratios, faculty stability, mock test series caliber, and classroom batch limits.
                </p>
              </div>
            </details>

            <details className="faq-accordion">
              <summary className="faq-summary">
                <span>Can an institute pay to be listed at #1 or #2?</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-content">
                <p>
                  No. Ranks cannot be purchased, sponsored, or influenced by marketing budgets. We maintain strict editorial separation between directory verification and ranking positions.
                </p>
              </div>
            </details>

            <details className="faq-accordion">
              <summary className="faq-summary">
                <span>How can institutes submit corrections or updated classroom details?</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-content">
                <p>
                  Institutes can submit verification dossiers directly to our research desk via the{' '}
                  <Link href="/contact" className="text-link">
                    Contact Desk
                  </Link>{' '}
                  with audited selection proofs, faculty rosters, and classroom infrastructure specifications.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
