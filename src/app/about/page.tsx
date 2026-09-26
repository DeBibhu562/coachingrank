import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Ranking Methodology & Editorial Independence | About CoachingRank',
  description:
    'Discover how CoachingRank evaluates Indian entrance coaching centres — 5-point scoring rubric, campus audits, and strict editorial independence.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">About & Methodology</span>
          </nav>

          <span className="eyebrow">
            🛡️ Editorial Charter · {SITE.year}
          </span>

          <h1>About {SITE.name}.in & Our Ranking Methodology</h1>
          <p className="prose-lead">
            Built as an unbiased, answer-first coaching directory for students and parents navigating India’s competitive
            entrance exams.
          </p>

          <div className="answer-box">
            <div className="answer-header">
              <span className="answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Core Mission
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Updated {SITE.year}</span>
            </div>
            <p className="answer-text">
              CoachingRank publishes exam and city coaching rankings with locked #1 and #2 positions based strictly on
              verifiable student outcomes, faculty continuity, and classroom integrity — free from paid placements or
              advertiser bias.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Evaluation Framework</span>
              <h2>The 5-Point Auditing Rubric</h2>
            </div>
            <p>Every ranked coaching centre is evaluated across five weighted parameters.</p>
          </div>

          <div className="chooser-grid">
            <div className="info-box" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="podium-badge gold" style={{ width: '28px', height: '28px' }}>
                  1
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--brand-primary)' }}>
                  WEIGHT: 30%
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Verified Selections & Rank Proof</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                We cross-reference advertised toppers with public NLU/IIT/UPSC selection lists, verified roll numbers,
                and classroom enrollment records rather than distance-pack purchases.
              </p>
            </div>

            <div className="info-box" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="podium-badge silver" style={{ width: '28px', height: '28px' }}>
                  2
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--brand-primary)' }}>
                  WEIGHT: 25%
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Faculty Stability & Pedigree</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Evaluating whether core mentors remain with the classroom across the full academic batch, or if centres
                rely on temporary guest lecturers with high mid-year turnover.
              </p>
            </div>

            <div className="info-box" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="podium-badge bronze" style={{ width: '28px', height: '28px' }}>
                  3
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--brand-primary)' }}>
                  WEIGHT: 20%
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Mock Series & R&D Quality</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Audit of original mock tests, question bank relevance to the latest examination pattern, in-depth AI/sectional
                analytics, and national percentile benchmarking.
              </p>
            </div>

            <div className="info-box" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="podium-badge rest" style={{ width: '28px', height: '28px' }}>
                  4
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--brand-primary)' }}>
                  WEIGHT: 15%
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Batch Size & Doubt Support</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Classrooms with capped batch sizes (30–45 students) receive higher scores for personalized mentor
                access and dedicated 1-on-1 doubt resolution desks.
              </p>
            </div>

            <div className="info-box" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="podium-badge rest" style={{ width: '28px', height: '28px' }}>
                  5
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--brand-primary)' }}>
                  WEIGHT: 10%
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Fee Transparency & Receipts</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                Auditing published fee cards, GST invoice issuance, scholarship clarity, and pro-rata refund policies
                for withdrawal.
              </p>
            </div>

            <div className="info-box" style={{ padding: '24px', background: 'var(--brand-primary-light)', borderColor: '#fecaca' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--brand-primary)' }}>100% Editorial Independence</h3>
              </div>
              <p style={{ color: 'var(--ink-primary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                We do not accept payments, sponsorships, or affiliate commissions to manipulate rankings. All scores
                are reviewed and updated annually by our editorial team.
              </p>
            </div>
          </div>

          {/* Contact desk callout */}
          <div style={{ marginTop: '56px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>Have questions about our audits or methodology?</h3>
            <p className="prose-lead" style={{ margin: '0 auto 20px', maxWidth: '580px' }}>
              Our editorial and verification desks welcome inquiries, student reviews, and institute documentation.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Reach Out to Editorial Desk →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
