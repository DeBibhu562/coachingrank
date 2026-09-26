import Link from 'next/link';
import { PRIORITY_EXAMS, SITE } from '@/data/site';
import { ALL_RANKINGS } from '@/data/rankings';
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

  const delhi = ALL_RANKINGS.filter((r) => r.city === 'delhi' && !r.criterion).slice(0, 6);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is CoachingRank.in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CoachingRank.in is an independent coaching rankings and hub encyclopedia for Indian competitive exams, built as an answer engine for Google and AI search.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which exams does CoachingRank cover first?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Priority clusters include CLAT, AILET, DU LLB and other law rankings, UPSC, IPMAT, and share-market coaching rankings, with city and criterion hubs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are institutes able to buy top ranks on CoachingRank?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Ranks are determined strictly through editorial audits based on verified student results, faculty stability, batch size limits, and mock test infrastructure.',
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
          <span className="eyebrow">
            ★ India’s Verified Coaching Authority · 2026
          </span>
          <h1>
            Coaching Rankings Students Trust —{' '}
            <span className="highlight-text">Exam & City Audits</span>
          </h1>
          <p className="hero-lead">
            Unbiased, editorial-first shortlists with verified #1 and #2 ranks across India’s premier entrance exams,
            legal hubs, and civil service academies.
          </p>

          {/* Interactive Search Engine */}
          <SearchFilter rankings={ALL_RANKINGS} />

          {/* Trust Metrics Bar */}
          <div className="trust-metrics">
            <div className="metric-card">
              <span className="metric-num">230+</span>
              <span className="metric-label">Verified Shortlists</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">28+</span>
              <span className="metric-label">Competitive Exams</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">32</span>
              <span className="metric-label">Indian Cities</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">100%</span>
              <span className="metric-label">Editorial Independence</span>
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
            <p>National, city-level and criterion-specific rankings tailored for your target entrance test.</p>
          </div>

          <div className="chooser-grid">
            {PRIORITY_EXAMS.map((e) => (
              <Link key={e.slug} href={e.hub} className="exam-card">
                <div className="exam-card-info">
                  <span className="exam-card-badge">Verified Hub</span>
                  <h3>{e.label} Coaching</h3>
                  <p>National rankings, city hubs & criterion filters</p>
                </div>
                <div className="exam-card-arrow">→</div>
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
              <h2>Top National Coaching Shortlists</h2>
            </div>
            <Link href="/rankings" className="btn btn-ghost btn-sm">
              View All Rankings →
            </Link>
          </div>

          <RankingCards pages={featured} cols3 />
        </div>
      </section>

      {/* City Spotlight: Delhi Hub */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">City Spotlight</span>
              <h2>Best Coaching Centres in Delhi</h2>
            </div>
            <Link href="/city/best-coaching-institutes-in-delhi" className="btn btn-ghost btn-sm">
              Open Delhi Master Hub →
            </Link>
          </div>

          <RankingCards pages={delhi} />
        </div>
      </section>

      {/* Audit Methodology Showcase */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Audit Integrity</span>
              <h2>How CoachingRank Evaluates Institutes</h2>
            </div>
            <p>Our 3-pillar verification framework ensures every ranking is backed by verifiable metrics.</p>
          </div>

          <div className="chooser-grid">
            <div className="info-box" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span className="podium-badge gold" style={{ width: '28px', height: '28px', fontSize: '0.9rem' }}>
                  1
                </span>
                <h3 style={{ fontSize: '1.15rem' }}>Answer-First Shortlists</h3>
              </div>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.94rem', lineHeight: '1.6' }}>
                Every ranking opens with a clear #1 and #2 declaration. We do not sell sponsored banner placements or
                allow commercial influence on rankings.
              </p>
            </div>

            <div className="info-box" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span className="podium-badge silver" style={{ width: '28px', height: '28px', fontSize: '0.9rem' }}>
                  2
                </span>
                <h3 style={{ fontSize: '1.15rem' }}>Hyperlocal City Hubs</h3>
              </div>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.94rem', lineHeight: '1.6' }}>
                Coaching effectiveness is local. We audit physical classroom infrastructure, faculty availability, and
                student batches across 32 cities.
              </p>
            </div>

            <div className="info-box" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span className="podium-badge bronze" style={{ width: '28px', height: '28px', fontSize: '0.9rem' }}>
                  3
                </span>
                <h3 style={{ fontSize: '1.15rem' }}>Multi-Criterion Lenses</h3>
              </div>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.94rem', lineHeight: '1.6' }}>
                Filter shortlists by what matters most to your family: verified NLU/IIT results, faculty tenure, test
                series rigor, or capped batch sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '840px' }}>
          <div className="section-head" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className="section-head-info">
              <span className="eyebrow">Common Queries</span>
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
                  CoachingRank.in is an independent coaching directory and ranking encyclopedia for Indian competitive
                  exams. Each institute is scored against verified selection records, faculty stability, mock test
                  curriculum, and student-teacher ratio.
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
                  No. Ranks cannot be purchased. We maintain strict editorial separation between any future directory
                  features and ranking audits.
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
                  Institutes can reach out directly via our{' '}
                  <Link href="/contact" className="text-link">
                    Contact Desk
                  </Link>{' '}
                  with audited classroom verification documents, GST registration, and faculty rosters.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
