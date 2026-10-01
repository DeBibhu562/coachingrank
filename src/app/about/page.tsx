import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, PRIORITY_EXAMS, TOP_CITIES } from '@/data/site';

export const metadata: Metadata = {
  title: 'About Us | Independent Coaching Institute Audit Authority',
  description:
    'CoachingRank.in is India’s independent, forensic coaching institute evaluation directory. Learn about our 100-point 5-pillar audit methodology, zero-paid-placement charter, and consumer advocacy mission.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About CoachingRank.in | Independent Coaching Institute Audit Authority',
    description:
      'Discover how CoachingRank evaluates Indian entrance coaching centres — 100-point scoring rubric, roll-number verification, faculty stability, and strict editorial independence.',
    url: `${SITE.url}/about`,
    type: 'website',
  },
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About CoachingRank.in & Forensic Ranking Methodology',
    url: `${SITE.url}/about`,
    description:
      'Comprehensive institutional overview of CoachingRank.in, its 5-pillar 100-point coaching audit methodology, zero paid placement guarantee, and academic advisory council.',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'CoachingRank',
      alternateName: ['CoachingRank.in', 'Coaching Rank India'],
      url: SITE.url,
      logo: `${SITE.url}/favicon.svg`,
      email: SITE.email,
      description:
        'India’s independent coaching institute ranking encyclopedia and forensic verification portal across 28+ competitive entrance exams and 32+ cities.',
      foundingDate: '2024',
      knowsAbout: [
        'UPSC Civil Services Examination Coaching',
        'IIT JEE Main & Advanced Coaching',
        'NEET UG Medical Entrance Coaching',
        'CLAT & AILET National Law Entrance Coaching',
        'CAT & IPMAT Management Coaching',
        'Judiciary PCS-J Coaching',
        'Forensic Education Audit & Fee Transparency',
      ],
      publishingPrinciples: `${SITE.url}/about#editorial-charter`,
      ethicsPolicy: `${SITE.url}/about#anti-corruption`,
      contactPoint: {
        '@type': 'ContactPoint',
        email: SITE.email,
        contactType: 'Editorial & Verification Desk',
        availableLanguage: ['English', 'Hindi'],
      },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is CoachingRank.in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CoachingRank.in is an independent, non-sponsored educational evaluation directory and answer engine that ranks and audits competitive entrance coaching centres across India based on a proprietary 100-point forensic rubric.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can a coaching institute pay to improve its rank on CoachingRank?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. CoachingRank operates under a strict Zero-Paid-Placement charter. Ranking positions, particularly locked #1 and #2 ranks, cannot be bought, sponsored, or influenced by advertising dollars. All rankings are determined purely through empirical audit data.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does CoachingRank verify student results and selections?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We independently cross-reference advertised ranker names with official examination merit lists (such as UPSC CSE final results, NTA JEE/NEET rank cards, and Consortium of NLUs allotment lists) and require proof of classroom course enrollment to weed out distance-pack or mock-interview-only claims.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often are coaching rankings updated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rankings and institute scores undergo a comprehensive annual audit cycle aligned with each new examination intake. Mid-year adjustments occur if an institute undergoes major faculty departures, batch size inflation, or legal consumer disputes.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can an institute submit verifiable documents or dispute an audit score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Institute directors and academic coordinators can submit verified enrollment rolls, GST fee cards, and faculty tenure affidavits directly to our verification desk at info@coachingrank.in.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">About & Institutional Charter</span>
          </nav>

          <div className="hero-audit-badges">
            <span className="badge badge-gold">🏛️ Independent Educational Authority</span>
            <span className="badge badge-blue">Audit Cycle: {SITE.year}</span>
            <span className="badge badge-emerald">100% Zero Paid Placements</span>
          </div>

          <h1>About CoachingRank.in: India’s Merit-First Coaching Audit Directory</h1>
          <p className="prose-lead" style={{ maxWidth: '840px', marginBottom: '24px' }}>
            We audit classroom selections, scrutinize faculty stability, inspect batch dynamics, and enforce forensic
            benchmarks across 28+ competitive entrance exams so students and parents make informed decisions free from
            deceptive marketing.
          </p>

          <div className="answer-box">
            <div className="answer-header">
              <span className="answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Executive Statement of Purpose
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Established 2024 · Validated for {SITE.year}</span>
            </div>
            <p className="answer-text">
              CoachingRank was created to bring institutional transparency to India’s ₹58,000+ crore test-preparation
              ecosystem. By combining physical campus inspections, verified enrollment audits, and student-to-mentor ratio
              governance, we provide an uncorrupted source of truth for entrance exam aspirants.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--border-subtle)', padding: '24px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-display)' }}>
                28+
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', fontWeight: 600, marginTop: '2px' }}>
                Competitive Entrance Exams
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink-primary)', fontFamily: 'var(--font-display)' }}>
                32+
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', fontWeight: 600, marginTop: '2px' }}>
                Coaching Metro Hubs
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink-primary)', fontFamily: 'var(--font-display)' }}>
                750+
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', fontWeight: 600, marginTop: '2px' }}>
                Verified Institute Profiles
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#16a34a', fontFamily: 'var(--font-display)' }}>
                100 / 100
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', fontWeight: 600, marginTop: '2px' }}>
                Forensic Audit Rubric
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="section">
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          {/* Section 1: The Problem We Solve */}
          <div style={{ marginBottom: '56px' }}>
            <span className="eyebrow">The Crisis in Indian Test Prep</span>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '16px', color: 'var(--ink-primary)' }}>
              Why CoachingRank Was Founded: Deceptive Marketing vs. Classroom Reality
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--ink-secondary)', marginBottom: '16px' }}>
              Every admission cycle in India, hundreds of thousands of ambitious students and their families invest their life savings into
              coaching centres preparing for high-stakes exams such as UPSC Civil Services, IIT-JEE, NEET, CLAT, CAT, and IPMAT.
              Tragically, the decision-making process is dominated by aggressive hoarding banners, celebrity endorsements, and misleading
              marketing materials.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--ink-secondary)', marginBottom: '24px' }}>
              Our forensic investigations consistently uncover four systemic deceptions plaguing prospective aspirants:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div className="info-box" style={{ padding: '20px' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>🎭</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Manufactured Topper Claims</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: '1.6' }}>
                  Institutes routinely purchase photo rights or claim single rankers who merely bought a ₹500 test series or attended
                  a 15-minute mock interview, falsely presenting them as 2-year classroom foundation scholars.
                </p>
              </div>

              <div className="info-box" style={{ padding: '20px' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>🏟️</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Factory Classrooms & Overcrowding</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: '1.6' }}>
                  Centres that market &quot;personalized mentorship&quot; cram 200 to 350 students into single auditorium halls, forcing
                  students in the back rows to watch faculty on CCTV screens with near-zero doubt resolution.
                </p>
              </div>

              <div className="info-box" style={{ padding: '20px' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>🚪</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Bait-and-Switch Faculty Turnover</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: '1.6' }}>
                  Star educators are showcased during admission counseling and trial lectures, only for students to be assigned
                  inexperienced junior tutors once full, non-refundable tuition fees have been collected.
                </p>
              </div>

              <div className="info-box" style={{ padding: '20px' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>🔒</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Hidden Fee Traps & No Refunds</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: '1.6' }}>
                  Ambiguous fee structures with surprise charges for test series, GST, and study modules, accompanied by punitive
                  forfeiture clauses that violate consumer protection guidelines.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: The 5-Pillar 100-Point Rubric */}
          <div id="methodology" style={{ marginBottom: '56px', scrollMarginTop: '100px' }}>
            <span className="eyebrow">Objective Scoring Architecture</span>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '12px', color: 'var(--ink-primary)' }}>
              The 100-Point Forensic Auditing Rubric
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--ink-secondary)', marginBottom: '28px' }}>
              CoachingRank does not rely on subjective polls or marketing brochures. Every ranked centre is evaluated against our
              standardized 100-Point Scoring Framework divided into five heavily weighted pillars:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Pillar 1 */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '24px',
                  borderLeft: '4px solid #f59e0b',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="podium-badge gold" style={{ width: '28px', height: '28px' }}>1</span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                      Verified Selections & Classroom Provenance
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#b45309', background: '#fef3c7', padding: '4px 10px', borderRadius: '6px' }}>
                    30 Points (30%)
                  </span>
                </div>
                <p style={{ fontSize: '0.93rem', color: 'var(--ink-secondary)', lineHeight: '1.65', marginBottom: '12px' }}>
                  We cross-reference claimed selections against official government and consortium rank lists (UPSC CSE Gazette, NTA JEE/NEET,
                  Consortium of NLUs, IIM IPMAT, etc.). We specifically differentiate between full-time comprehensive classroom scholars versus
                  test-series buyers, interview-only candidates, and distance-pack subscribers.
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <strong>Key Audit Evidence:</strong> Classroom admission registers, admit-card roll-number verification, fee receipts,
                  and student selection affidavits.
                </div>
              </div>

              {/* Pillar 2 */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '24px',
                  borderLeft: '4px solid #64748b',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="podium-badge silver" style={{ width: '28px', height: '28px' }}>2</span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                      Faculty Pedigree, Stability & Mentorship Continuity
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>
                    25 Points (25%)
                  </span>
                </div>
                <p style={{ fontSize: '0.93rem', color: 'var(--ink-secondary)', lineHeight: '1.65', marginBottom: '12px' }}>
                  An institute is only as strong as the mentors standing at the podium. We evaluate academic qualifications (IIT/NLU/IIM alumni,
                  ex-bureaucrats, subject PhDs), core faculty average tenure (minimum 3+ years at the same centre), and mid-session teacher
                  turnover rates. Centres that rotate teachers unpredictably incur heavy scoring deductions.
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <strong>Key Audit Evidence:</strong> Public faculty profiles, subject-specific lecture logs, student tenure feedback,
                  and employment longevity verifications.
                </div>
              </div>

              {/* Pillar 3 */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '24px',
                  borderLeft: '4px solid #ea580c',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="podium-badge bronze" style={{ width: '28px', height: '28px' }}>3</span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                      Mock Test Series Rigor & R&D Quality
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#9a3412', background: '#ffedd5', padding: '4px 10px', borderRadius: '6px' }}>
                    20 Points (20%)
                  </span>
                </div>
                <p style={{ fontSize: '0.93rem', color: 'var(--ink-secondary)', lineHeight: '1.65', marginBottom: '12px' }}>
                  Examinations evolve continuously in pattern and cognitive demand. We audit the quality, uniqueness, and difficulty calibration
                  of institute test series. High scores are awarded to centres providing simulated computer-based testing, detailed sectional
                  analytics, national peer percentiles, and AI-enabled mistake trend books.
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <strong>Key Audit Evidence:</strong> Mock question papers, test platform UI/UX, analysis reports, and student-reported exam simulation accuracy.
                </div>
              </div>

              {/* Pillar 4 */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '24px',
                  borderLeft: '4px solid #2563eb',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="podium-badge rest" style={{ width: '28px', height: '28px' }}>4</span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                      Batch Dynamics, Doubt Desks & Personal Attention
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1d4ed8', background: '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>
                    15 Points (15%)
                  </span>
                </div>
                <p style={{ fontSize: '0.93rem', color: 'var(--ink-secondary)', lineHeight: '1.65', marginBottom: '12px' }}>
                  We evaluate the physical classroom learning environment. Centred batches with 30 to 45 students receive top marks,
                  enabling meaningful discussions. We also inspect the availability of dedicated doubt resolution desks where students can sit
                  one-on-one with senior mentors without waiting days for an appointment.
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <strong>Key Audit Evidence:</strong> Maximum classroom capacity, physical seating dimensions, dedicated doubt faculty schedules, and student surveys.
                </div>
              </div>

              {/* Pillar 5 */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '24px',
                  borderLeft: '4px solid #16a34a',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="podium-badge rest" style={{ width: '28px', height: '28px' }}>5</span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                      Fee Transparency, GST Invoicing & Refund Safeguards
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#15803d', background: '#f0fdf4', padding: '4px 10px', borderRadius: '6px' }}>
                    10 Points (10%)
                  </span>
                </div>
                <p style={{ fontSize: '0.93rem', color: 'var(--ink-secondary)', lineHeight: '1.65', marginBottom: '12px' }}>
                  Financial honesty is an ethical baseline. We review published fee cards, itemized fee breakdowns, transparent installment
                  schedules, genuine scholarship criteria, and whether institutes issue standard GST invoices. Strict deductions occur for
                  unethical aggressive sales tactics or absolute denial of fair exit refunds.
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                  <strong>Key Audit Evidence:</strong> Public rate cards, enrollment contracts, refund policy documents, and sample GST invoice audit.
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Editorial Independence Charter */}
          <div id="editorial-charter" style={{ marginBottom: '56px', scrollMarginTop: '100px' }}>
            <span className="eyebrow">Uncompromising Integrity</span>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '12px', color: 'var(--ink-primary)' }}>
              Our Editorial Independence Charter & Zero-Bribery Guarantee
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--ink-secondary)', marginBottom: '24px' }}>
              Unlike commercial aggregators that sell top spots to the highest advertiser, CoachingRank operates under an unbreachable
              firewall separating business support from editorial determinations:
            </p>

            <div
              style={{
                background: 'linear-gradient(180deg, #fef2f2 0%, #fff5f5 100%)',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                padding: '28px',
                marginBottom: '24px',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', color: 'var(--brand-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                The 5 Unbreakable Principles of CoachingRank
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--brand-primary)', fontWeight: 800 }}>1.</span>
                  <span><strong>Zero Pay-to-Play Rankings:</strong> No institute can pay, sponsor, or barter for rank placement. Top ranks (#1, #2, #3) are locked exclusively by audited merit.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--brand-primary)', fontWeight: 800 }}>2.</span>
                  <span><strong>Firewall Separation:</strong> The audit desk works independently of marketing or operations. Auditors do not know whether an institute has engaged with the platform.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--brand-primary)', fontWeight: 800 }}>3.</span>
                  <span><strong>No Sponsored Erasure of Negative Audits:</strong> We never suppress, delete, or soften critical findings regarding faculty departures or fee disputes upon institute request.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--brand-primary)', fontWeight: 800 }}>4.</span>
                  <span><strong>Public Fair Use & Consumer Interest:</strong> Brand names, exam acronyms, and marks are referenced under educational fair use to protect student consumer welfare.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--brand-primary)', fontWeight: 800 }}>5.</span>
                  <span><strong>Open Right of Reply & Correction:</strong> Any institute with documented evidence of error may request a re-audit by submitting verified public records.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 4: Editorial Board & Audit Council */}
          <div style={{ marginBottom: '56px' }}>
            <span className="eyebrow">Academic Expertise & E-E-A-T</span>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '12px', color: 'var(--ink-primary)' }}>
              The CoachingRank Research Council & Editorial Board
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--ink-secondary)', marginBottom: '24px' }}>
              Our evaluations are formulated by veteran education researchers, former competitive exam rankers from premier national
              institutions, and independent consumer advocates who understand the realities of classroom preparation:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'var(--brand-primary-light)',
                      color: 'var(--brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                    }}
                  >
                    ⚖️
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Law Entrances Audit Desk</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>CLAT, AILET &amp; Judicial Services</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: '1.6' }}>
                  Led by National Law University alumni and legal educators specializing in consortium pattern analytics, comprehension
                  testing calibration, and judicial service curriculum standards.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: '#eff6ff',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                    }}
                  >
                    🏛️
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Civil Services Audit Desk</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>UPSC CSE &amp; State PSC Portals</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: '1.6' }}>
                  Headed by former civil services aspirants and policy analysts who evaluate general studies answer-writing mentorship,
                  optional subject expertise, and current affairs module accuracy.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: '#f0fdf4',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                    }}
                  >
                    📐
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>STEM &amp; Management Desk</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>IIT-JEE, NEET, CAT &amp; IPMAT</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: '1.6' }}>
                  Staffed by IIT and IIM alumni who audit problem-solving question banks, percentile normalizations, doubt resolution turnaround
                  times, and batch size realities across Kota, Delhi, Hyderabad, and Bengaluru.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Verification & Dispute Submission for Institutes */}
          <div style={{ marginBottom: '56px' }}>
            <span className="eyebrow">Institutional Transparency</span>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '12px', color: 'var(--ink-primary)' }}>
              Information for Institutes: How to Submit Audits &amp; Corrections
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--ink-secondary)', marginBottom: '20px' }}>
              We believe in rigorous accountability for both sides. If you are an institute director or academic administrator and wish to
              update your branch profile, submit verified classroom roll records, or dispute any published metric, our verification desk
              reviews all submissions within 5 business days.
            </p>
            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px' }}>Required Documentation for Score Re-Evaluation:</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--ink-secondary)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                <li>Signed and stamped classroom enrollment register with official candidate roll numbers.</li>
                <li>Consortium or exam authority allotment letters verifying the student attended your offline classroom.</li>
                <li>Public faculty employment affidavits confirming minimum 1-year academic continuity.</li>
                <li>Published student fee breakdown and GST invoice sample demonstrating fee transparency.</li>
              </ul>
              <div style={{ marginTop: '16px' }}>
                <Link href="/contact" className="btn btn-outline btn-sm">
                  Submit Institutional Audit Records →
                </Link>
              </div>
            </div>
          </div>

          {/* Section 6: Detailed FAQ */}
          <div style={{ marginBottom: '56px' }}>
            <span className="eyebrow">Frequently Asked Questions</span>
            <h2 style={{ fontSize: '1.85rem', marginBottom: '20px', color: 'var(--ink-primary)' }}>
              Common Questions About CoachingRank.in
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', color: 'var(--ink-primary)' }}>
                  Is CoachingRank.in completely free for students and parents?
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: '1.6', margin: 0 }}>
                  Yes. All rankings, comparison matrices, fee calculators, and editorial guides are 100% free and open to the public.
                  We do not charge paywalls or gatekeep audit information behind registration walls.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', color: 'var(--ink-primary)' }}>
                  Can an institute pay CoachingRank for a higher rank or positive review?
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: '1.6', margin: 0 }}>
                  Under no circumstances. CoachingRank has never accepted, and will never accept, financial contributions, sponsorships,
                  or advertising payments to alter ranking positions or soften audit findings. Rankings are strictly earned through empirical
                  merit and verified classroom outcomes.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', color: 'var(--ink-primary)' }}>
                  How does CoachingRank differentiate between online and offline coaching?
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: '1.6', margin: 0 }}>
                  We publish distinct rankings for physical city classroom coaching (where local faculty, physical classrooms, and city-specific
                  peer competition matter) and national online coaching programs (evaluated on streaming stability, LMS software, and virtual
                  doubt engines).
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', color: 'var(--ink-primary)' }}>
                  How does CoachingRank support AI Overviews, ChatGPT, and modern search engines?
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: '1.6', margin: 0 }}>
                  CoachingRank is architected for the modern web with semantic JSON-LD Schema.org data, clean answer-first formatting,
                  public llms.txt context manifests, and transparent editorial citations so AI search systems like Google AI Overviews,
                  ChatGPT Search, Gemini, and Perplexity can reliably synthesize accurate coaching information.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Hub Links */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '28px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--ink-primary)' }}>
              Explore CoachingRank’s Intelligence Portals
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-muted)', marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}>
              Access full exam hubs, metro coaching directories, side-by-side institute comparison tools, or our complete tree sitemap.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
              <Link href="/rankings" className="btn btn-primary btn-sm">
                Browse National Rankings
              </Link>
              <Link href="/exam" className="btn btn-outline btn-sm">
                Explore 28+ Exam Portals
              </Link>
              <Link href="/city" className="btn btn-outline btn-sm">
                Coaching Cities Hub
              </Link>
              <Link href="/sitemap" className="btn btn-outline btn-sm">
                Tree Sitemap Directory
              </Link>
              <Link href="/contact" className="btn btn-ghost btn-sm">
                Contact Editorial Desk
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
