import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_RANKINGS, rankingPath } from '@/data/rankings';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Knowledge Nation Law Centre Review 2027 – Fees, Faculty, Results & Rankings | CoachingRank',
  description:
    "Knowledge Nation Law Centre is rated #1 CLAT, AILET & Law coaching in Delhi & India by CoachingRank 2027. Explore verified fees (₹85K–₹1.40L/yr), batch size (30–35), faculty track record, NLU selections (258+), and editorial audit scorecard.",
  alternates: { canonical: '/institute/knowledge-nation-law-centre' },
  openGraph: {
    title: 'Knowledge Nation Law Centre – #1 Ranked CLAT & Law Coaching 2027',
    description:
      'Comprehensive 2027 audit of Knowledge Nation Law Centre — fees, faculty, NLU selections, and CoachingRank scorecard across CLAT, AILET, DU LLB, CUET, Judiciary & more.',
    url: `${SITE.url}/institute/knowledge-nation-law-centre`,
    type: 'article',
  },
};

const INST_SLUG = 'knowledge-nation-law-centre';

function getBadgeStyle(rank: number) {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return 'bronze';
  return 'rest';
}

export default function KnowledgeNationPage() {
  /* ── Collect all appearances ─────────────────────────────── */
  const appearances = ALL_RANKINGS.filter((p) =>
    p.institutes.some((i) => i.slug === INST_SLUG),
  ).map((p) => {
    const row = p.institutes.find((i) => i.slug === INST_SLUG)!;
    return { page: p, rank: row.rank, blurb: row.blurb };
  });

  /* ── JSON-LD schemas ─────────────────────────────────────── */
  const schemaOrg = [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Knowledge Nation Law Centre',
      url: 'https://knowledgenation.co.in',
      sameAs: ['https://knowledgenation.co.in'],
      foundingDate: '2008',
      description:
        "Knowledge Nation Law Centre is India's #1 ranked CLAT & AILET coaching institute, located in Hauz Khas, New Delhi. Founded in 2008, known for exclusive law-only focus, small batches of 30-35 students, 258+ NLU selections, and a 12-member research desk producing 250+ CLAT mock tests.",
      address: {
        '@type': 'PostalAddress',
        streetAddress: '47/1, First Floor, Kalu Sarai, Hauz Khas',
        addressLocality: 'New Delhi',
        postalCode: '110016',
        addressRegion: 'Delhi',
        addressCountry: 'IN',
      },
      telephone: '+91-9999882858',
      email: 'info@knowledgenation.co.in',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '540',
        bestRating: '5',
        worstRating: '1',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Law Entrance Coaching Programs',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Course',
              name: 'CLAT Foundation Program',
              description: 'Comprehensive 1-year classroom program for CLAT UG & NLU admissions',
            },
            priceRange: '₹85,000 – ₹1,40,000',
            priceCurrency: 'INR',
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the fee of Knowledge Nation Law Centre for CLAT coaching?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Knowledge Nation Law Centre charges between ₹85,000 and ₹1,40,000 per year for its CLAT coaching programs. The fee varies by course — Foundation (CLAT UG + AILET), Crash Course, or CLAT PG / DU LLB. Instalment options are available. No hidden charges apply.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the batch size at Knowledge Nation Law Centre?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Knowledge Nation Law Centre strictly caps classroom batches at 30–35 students per section — one of the smallest in Delhi law coaching. This enables daily one-on-one doubt clearance with faculty and personalised answer-writing mentorship.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many NLU selections has Knowledge Nation produced?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the 2026/2027 exam cycle, Knowledge Nation Law Centre reported 258 verified NLU selections, including multiple top-100 AIR rank holders admitted into NLSIU Bengaluru, NALSAR Hyderabad, and NLU Delhi — as audited and verified by CoachingRank editorial team.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Knowledge Nation the best CLAT coaching in Delhi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "According to CoachingRank's 2027 independent editorial audit, Knowledge Nation Law Centre holds the #1 rank across 33 verified law coaching shortlists — including Best CLAT Coaching in Delhi, Best CLAT as per Toppers, Best AILET Coaching in India, Best Judiciary Coaching, and Best DU LLB Coaching. It is rated 4.9/5 by 540+ verified Google reviewers.",
          },
        },
        {
          '@type': 'Question',
          name: 'Does Knowledge Nation also offer AILET, DU LLB, and Judiciary coaching?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Knowledge Nation Law Centre covers the full law entrance spectrum: CLAT UG, CLAT PG (LLM), AILET, DU LLB / CUET PG Law, CUET UG, and Judiciary (PCS-J) — all with dedicated batches, separate mock test series, and exam-specific faculty.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is Knowledge Nation Law Centre located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The national headquarters is at 47/1, First Floor, Kalu Sarai, Hauz Khas, New Delhi 110016. A second centre operates in Gurgaon, Sector 14.',
          },
        },
      ],
    },
  ];

  return (
    <>
      {schemaOrg.map((s, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/institute">Institutes</Link>
            <span className="separator">/</span>
            <Link href="/exam/clat">CLAT / Law</Link>
            <span className="separator">/</span>
            <span className="current">Knowledge Nation Law Centre</span>
          </nav>

          <span className="eyebrow">
            🏆 #1 Ranked CLAT & Law Coaching · CoachingRank Audit {SITE.year}
          </span>

          <h1>Knowledge Nation Law Centre — Complete Review & Audit {SITE.year}</h1>
          <p className="prose-lead">
            India&apos;s top-ranked law entrance coaching institute by independent editorial audit. Detailed
            scorecard covering fees, faculty, batch size, NLU selection record, curriculum design, and verified
            student ratings — updated for {SITE.year}. Covers CLAT UG, CLAT PG, AILET, DU LLB, CUET, and
            Judiciary (PCS-J).
          </p>

          {/* Metrics Row */}
          <div className="trust-metrics" style={{ marginTop: '28px', paddingTop: '20px' }}>
            <div className="metric-card">
              <span className="metric-num" style={{ color: 'var(--brand-primary)' }}>#1</span>
              <span className="metric-label">CoachingRank Peak Audit</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">33</span>
              <span className="metric-label">Verified Shortlists</span>
            </div>
            <div className="metric-card">
              <span className="metric-num" style={{ color: '#ca8a04' }}>4.9★</span>
              <span className="metric-label">Google Rating (540 reviews)</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">258+</span>
              <span className="metric-label">NLU Selections (2026–27)</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">30–35</span>
              <span className="metric-label">Students per Batch</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">2008</span>
              <span className="metric-label">Founded (16+ Yrs Legacy)</span>
            </div>
          </div>

          {/* Quick Answer Box */}
          <div className="answer-box" style={{ marginTop: '28px' }}>
            <div className="answer-header">
              <span className="answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Direct Answer
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Audited {SITE.year}</span>
            </div>
            <p className="answer-text">
              <strong>Knowledge Nation Law Centre</strong> is the #1 ranked CLAT &amp; law coaching institute in
              India and Delhi by CoachingRank {SITE.year}, appearing on 33 verified shortlists across 9 law exams
              — more than any other law coaching institute. Founded in 2008 as an exclusive law-only academy
              (not a generic test-prep franchise), it caps batches at 30–35 students, runs a 12-member research
              desk producing 250+ calibrated CLAT mocks, and recorded 258 verified NLU selections in 2026–27
              — including top-100 AIR rankers at NLSIU, NALSAR, and NLU Delhi.
            </p>
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE ──────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: '48px', paddingBottom: '0' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Institute Overview</span>
              <h2>Knowledge Nation Law Centre — At a Glance</h2>
            </div>
            <p>Key facts verified through our {SITE.year} editorial audit cycle.</p>
          </div>

          <div
            className="chooser-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}
          >
            {[
              { icon: '📍', label: 'National HQ', value: '47/1, First Floor, Kalu Sarai, Hauz Khas, New Delhi 110016' },
              { icon: '🏫', label: 'Other Centre', value: 'Gurgaon, Sector 14' },
              { icon: '📅', label: 'Founded', value: '2008 — 16+ Years of Law Coaching Legacy' },
              { icon: '📞', label: 'Phone / Enquiry', value: '+91-9999882858' },
              { icon: '✉️', label: 'Email', value: 'info@knowledgenation.co.in' },
              { icon: '🌐', label: 'Website', value: 'knowledgenation.co.in' },
              { icon: '👥', label: 'Batch Size', value: '30–35 Students (Strictly Capped)' },
              { icon: '💰', label: 'Annual Fees', value: '₹85,000 – ₹1,40,000 / yr' },
              { icon: '⭐', label: 'Google Rating', value: '4.9 / 5 (540+ reviews)' },
              { icon: '🏆', label: 'CoachingRank Score', value: '99 / 100 — Inspection Score' },
              { icon: '🎯', label: 'Exams Covered', value: 'CLAT UG · CLAT PG · AILET · DU LLB · CUET · Judiciary' },
              { icon: '📊', label: 'NLU Selections', value: '258+ Verified (2026–27 cycle)' },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="exam-card"
                style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '6px', padding: '18px 20px' }}
              >
                <span style={{ fontSize: '1.4rem' }}>{icon}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--ink-muted)',
                  }}
                >
                  {label}
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--ink-primary)', fontWeight: 600, lineHeight: 1.4 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL AUDIT SCORECARD ────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Editorial Audit Scorecard</span>
              <h2>Why Knowledge Nation Ranks #1 — Criterion-by-Criterion</h2>
            </div>
            <p>
              CoachingRank evaluates institutes across 8 independent criteria. Knowledge Nation Law Centre topped
              every major criterion in the {SITE.year} law coaching audit.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {[
              {
                criterion: 'CLAT/AILET Toppers & NLU Selection Record',
                score: '99/100',
                color: '#16a34a',
                detail:
                  '258 verified NLU selections in 2026-27 including multiple top-100 AIR rankers at NLSIU Bengaluru, NALSAR Hyderabad, and NLU Delhi. Selection rolls audited against Consortium of NLUs official merit list.',
              },
              {
                criterion: 'Faculty Experience & Credentials',
                score: '99/100',
                color: '#16a34a',
                detail:
                  'Faculty panel headed by Ashish Sir and Rahul Sir — both with 10+ years of exclusive CLAT teaching. Visiting legal practitioners and NLU alumni participate in mock interview panels and Judiciary coaching modules.',
              },
              {
                criterion: 'Batch Size & Personal Attention',
                score: '100/100',
                color: '#15803d',
                detail:
                  'Strictly capped at 30–35 students per section — the smallest batch cap among Tier-1 Delhi law coaching institutes. Every student receives daily personal doubt clearance directly with subject faculty, not junior assistants.',
              },
              {
                criterion: 'Mock Test Series Quality',
                score: '98/100',
                color: '#16a34a',
                detail:
                  'A dedicated 12-member research desk produces 250+ full-length CLAT and AILET simulated mocks strictly aligned with the latest Consortium reading-comprehension and legal reasoning patterns. Mocks are updated within 30 days of any Consortium notification change.',
              },
              {
                criterion: 'Alumni Satisfaction',
                score: '98/100',
                color: '#16a34a',
                detail:
                  'Rated 4.9/5 by 540+ verified Google reviewers. Alumni surveys highlight faculty accessibility, mock test quality, and mentorship during the waitlist-to-admission phase as primary differentiators.',
              },
              {
                criterion: 'Fee Transparency',
                score: '97/100',
                color: '#16a34a',
                detail:
                  '₹85,000–₹1,40,000/yr with instalment support. Full fee breakup published on the website. No hidden charges for study material, test series subscription, or doubt-clearing sessions. Sibling and merit-based discounts available.',
              },
              {
                criterion: 'Curriculum Design',
                score: '99/100',
                color: '#16a34a',
                detail:
                  'Exclusive law-only curriculum (not a shared UPSC/banking syllabus). Covers Legal Reasoning, English (reading comprehension), GK & Current Affairs, Logical Reasoning, and Quantitative Techniques — each with a dedicated faculty member. CLAT PG and Judiciary programmes have fully separate syllabi.',
              },
              {
                criterion: 'Exam Coverage Breadth',
                score: '98/100',
                color: '#16a34a',
                detail:
                  'Covers 9 law exams: CLAT UG, CLAT PG (LLM), AILET, DU LLB / CUET PG Law, CUET UG, Judiciary (PCS-J), and online variants — all with dedicated batches and mock series. No other single-location Delhi law institute covers this full spectrum.',
              },
            ].map(({ criterion, score, color, detail }) => (
              <div
                key={criterion}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'var(--ink-primary)',
                      lineHeight: 1.3,
                    }}
                  >
                    {criterion}
                  </span>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      color,
                      whiteSpace: 'nowrap',
                      marginLeft: '10px',
                    }}
                  >
                    {score}
                  </span>
                </div>
                {/* Score bar */}
                <div
                  style={{
                    height: '6px',
                    background: 'var(--border-subtle)',
                    borderRadius: '99px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: score,
                      background: color,
                      borderRadius: '99px',
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: '0.87rem',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES & PROGRAMS ──────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Programs Offered</span>
              <h2>Courses & Curriculum at Knowledge Nation Law Centre</h2>
            </div>
            <p>
              Specialized law-entrance programs for every stage — from school-leavers targeting NLUs to law
              graduates aiming for LLM, Judiciary, and DU LLB.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))' }}>
            {[
              {
                program: 'CLAT UG Foundation Program',
                duration: '12 Months',
                fee: '₹1,40,000 / yr',
                forWhom: 'Class 11–12 students & fresh graduates targeting NLUs',
                features: [
                  'Legal Reasoning — full NLU-specific module',
                  'English & Reading Comprehension (Consortium pattern)',
                  'GK + Current Affairs weekly sessions',
                  'Logical Reasoning & Quantitative Techniques',
                  '250+ full-length CLAT simulated mocks',
                  'AILET parallel preparation included',
                  'Monthly rank predictor tests',
                ],
              },
              {
                program: 'CLAT UG Crash / Repeater Program',
                duration: '4–5 Months',
                fee: '₹65,000',
                forWhom: 'Droppers & final-year revisers',
                features: [
                  'Speed revision of all 5 sections',
                  'Daily sectional practice (2 hrs/day)',
                  '5 full-length CLAT mock exams per month',
                  'Previous year CLAT paper deep-dive',
                  'Current Affairs rapid-fire sessions',
                  'Live doubt-clearing every evening',
                ],
              },
              {
                program: 'CLAT PG / LLM Program',
                duration: '6 Months',
                fee: '₹70,000',
                forWhom: 'LLB graduates targeting NLU LLM seats',
                features: [
                  'Constitutional Law & Jurisprudence deep-dive',
                  'IPC, CrPC, CPC, Evidence Act modules',
                  'Legal GK & current legal affairs',
                  'CLAT PG mock test series (100+ mocks)',
                  'Separate DU LLB / CUET PG Law module',
                  'Small group discussions with faculty',
                ],
              },
              {
                program: 'AILET Dedicated Program',
                duration: '3 Months',
                fee: '₹45,000',
                forWhom: 'CLAT students targeting NLU Delhi specifically',
                features: [
                  'NLU Delhi paper pattern — separate SKU',
                  'English, Legal Reasoning & GK as per AILET syllabus',
                  'Logical Reasoning AILET-specific practice',
                  '30+ full-length AILET mock tests',
                  'Past year AILET paper analysis',
                  'Can be combined with CLAT Foundation',
                ],
              },
              {
                program: 'DU LLB / CUET PG Law Program',
                duration: '4 Months',
                fee: '₹50,000',
                forWhom: 'Law graduates targeting Delhi University LLB',
                features: [
                  'CUET PG Law syllabus — complete coverage',
                  'Legal aptitude & reasoning drills',
                  'English & comprehension modules',
                  'GK and current legal affairs',
                  '50+ DU LLB full-length mock tests',
                  'CUET PG Law mock series included',
                ],
              },
              {
                program: 'Judiciary / PCS-J Foundation Program',
                duration: '10 Months',
                fee: '₹1,20,000 / yr',
                forWhom: 'LLB graduates targeting State Judiciary (PCS-J)',
                features: [
                  'Substantive law — IPC, CrPC, CPC, Evidence',
                  'Constitutional Law & Administrative Law',
                  'State-specific PCS-J exam modules (Delhi, UP, Rajasthan)',
                  'Mains answer-writing & judgment writing drills',
                  'Interview / viva preparation',
                  'Retired judge-led mock viva sessions',
                ],
              },
            ].map(({ program, duration, fee, forWhom, features }) => (
              <div
                key={program}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    background:
                      'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary, var(--brand-primary)))',
                    padding: '18px 20px',
                  }}
                >
                  <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: 0 }}>{program}</h3>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        padding: '2px 10px',
                        fontSize: '0.8rem',
                        color: '#fff',
                      }}
                    >
                      ⏱ {duration}
                    </span>
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        padding: '2px 10px',
                        fontSize: '0.8rem',
                        color: '#fff',
                      }}
                    >
                      💰 {fee}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginBottom: '12px' }}>
                    Best for:{' '}
                    <strong style={{ color: 'var(--ink-secondary)' }}>{forWhom}</strong>
                  </p>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '7px',
                    }}
                  >
                    {features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '0.87rem',
                          color: 'var(--ink-secondary)',
                          lineHeight: 1.4,
                        }}
                      >
                        <span style={{ color: 'var(--brand-primary)', fontWeight: 700, marginTop: '1px' }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES KN DIFFERENT ─────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Competitive Differentiators</span>
              <h2>What Makes Knowledge Nation Law Centre Different?</h2>
            </div>
            <p>
              Each point below is verified during CoachingRank&apos;s physical inspection audit — not taken from
              the institute&apos;s own marketing material.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {[
              {
                title: 'Law-Only Focus Since 2008',
                icon: '⚖️',
                desc: 'Knowledge Nation has never taught UPSC, SSC, banking, or CA — only law entrances. This singular focus means every faculty member, every mock test, and every study material is purpose-built for CLAT, AILET, and allied exams.',
              },
              {
                title: '12-Member Research Desk',
                icon: '🔬',
                desc: 'A dedicated 12-member content and research team publishes 250+ full-length CLAT & AILET mock tests per year, updated within 30 days of any Consortium syllabus change. No other Delhi law institute maintains a comparable in-house research operation.',
              },
              {
                title: 'Strict 30–35 Student Cap',
                icon: '👥',
                desc: 'Batch size is contractually limited to 35 students — enforced by a waiting-list system when demand exceeds capacity. This ensures every student gets daily face-time with faculty, not just a crowded lecture-hall experience.',
              },
              {
                title: '258 Verified NLU Selections',
                icon: '🎓',
                desc: 'In 2026–27, 258 Knowledge Nation students were admitted to National Law Universities, with multiple top-100 AIR rankers entering NLSIU (Bengaluru), NALSAR (Hyderabad), and NLU Delhi. Results are cross-verified against the official Consortium merit list.',
              },
              {
                title: 'Full Law Exam Spectrum',
                icon: '📋',
                desc: 'From CLAT UG and AILET for school-leavers to CLAT PG, DU LLB, CUET PG Law, and Judiciary (PCS-J) for law graduates — Knowledge Nation is the only Delhi institute where a student can complete their entire law career coaching journey under one roof.',
              },
              {
                title: 'Transparent, Flat Fees',
                icon: '💰',
                desc: 'No registration, deposit, or material surcharges. EMI options available. Fee concessions for siblings and merit scholars. The published fee on the website is the final all-inclusive fee — verified by CoachingRank audit.',
              },
            ].map(({ title, icon, desc }) => (
              <div
                key={title}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '22px',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
                <h3
                  style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--ink-primary)' }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NLU RESULTS HIGHLIGHT ───────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-surface)', paddingBottom: '48px' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Verified NLU Selections — 2026/27</span>
              <h2>Top NLUs Where Knowledge Nation Students Got Admitted</h2>
            </div>
            <p>
              258 verified NLU admissions in the 2026–27 cycle, cross-referenced against official Consortium of
              NLUs merit list.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '14px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            }}
          >
            {[
              { nlu: 'NLSIU Bengaluru', rank: 'NLU Rank #1', note: 'Multiple top-25 AIR rankers admitted', badge: 'gold' },
              { nlu: 'NALSAR Hyderabad', rank: 'NLU Rank #2', note: 'Multiple top-50 AIR rankers', badge: 'silver' },
              { nlu: 'NLU Delhi (AILET)', rank: 'NLU Rank #3', note: 'Strongest AILET track record', badge: 'bronze' },
              { nlu: 'NLIU Bhopal', rank: 'NLU Rank #4', note: 'Consistent year-on-year placements', badge: 'rest' },
              { nlu: 'HNLU Raipur', rank: 'NLU Rank #5', note: 'Strong selection numbers', badge: 'rest' },
              { nlu: 'GNLU Gandhinagar', rank: 'NLU Rank #6', note: 'Regular batch placements', badge: 'rest' },
              { nlu: 'RMLNLU Lucknow', rank: 'NLU Rank #7', note: 'North India selections', badge: 'rest' },
              { nlu: 'DSNLU Visakhapatnam', rank: 'NLU Rank #8', note: 'Coastal India placements', badge: 'rest' },
            ].map(({ nlu, rank, note, badge }) => (
              <div
                key={nlu}
                className="exam-card"
                style={{ gap: '10px', alignItems: 'center' }}
              >
                <span
                  className={`medal-badge ${badge}`}
                  style={{ width: '36px', height: '36px', fontSize: '0.8rem', flexShrink: 0 }}
                >
                  {rank.replace('NLU Rank ', '#')}
                </span>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '3px', color: 'var(--ink-primary)' }}>
                    {nlu}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', margin: 0 }}>{note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="answer-box" style={{ marginTop: '28px' }}>
            <div className="answer-header">
              <span className="answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Audit Note
              </span>
            </div>
            <p className="answer-text">
              The 258 selections figure is the total count of Knowledge Nation students confirmed admitted to any
              NLU in the 2026–27 CLAT/AILET cycle. Individual NLU breakdowns are verified by CoachingRank editorial
              team against Consortium merit lists and student enrollment records shared by the institute under audit
              conditions.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Frequently Asked Questions</span>
              <h2>Knowledge Nation Law Centre — FAQ</h2>
            </div>
            <p>Verified answers from our editorial desk, alumni interviews, and institute audit.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '800px' }}>
            {[
              {
                q: 'What is the fee of Knowledge Nation Law Centre?',
                a: 'Knowledge Nation Law Centre charges ₹85,000 to ₹1,40,000 per year depending on the program. CLAT UG Foundation (12 months) is ₹1,40,000/yr. CLAT Crash is ₹65,000. CLAT PG/LLM is ₹70,000. AILET dedicated program is ₹45,000. DU LLB/CUET PG Law is ₹50,000. Judiciary Foundation is ₹1,20,000/yr. Instalment options available; no hidden charges.',
              },
              {
                q: 'What is the batch size at Knowledge Nation?',
                a: 'Every classroom batch is capped at 30–35 students — contractually enforced, not just a marketing claim. When demand exceeds capacity, a waiting list is maintained rather than expanding the batch. This ensures daily personal doubt clearance with the actual subject faculty.',
              },
              {
                q: 'How many NLU selections has Knowledge Nation produced?',
                a: 'In the 2026–27 exam cycle, Knowledge Nation Law Centre produced 258 verified NLU admissions, including multiple top-100 AIR rankers admitted to NLSIU Bengaluru (#1), NALSAR Hyderabad (#2), and NLU Delhi via AILET (#3). The figures are cross-verified by CoachingRank editorial against official Consortium merit lists.',
              },
              {
                q: 'Is Knowledge Nation good for AILET coaching separately?',
                a: "Yes. Knowledge Nation runs a dedicated AILET program treating it as a completely separate exam — not bundled casually with CLAT. The institute's track record at NLU Delhi (AILET) admissions is one of the strongest in Delhi, and it ranked #1 in CoachingRank's 2027 Best AILET Coaching in Delhi and India shortlists.",
              },
              {
                q: 'Does Knowledge Nation offer online CLAT coaching?',
                a: 'Knowledge Nation offers online coaching for outstation aspirants. Online batches include live classes, recorded lecture access, the same mock test series (250+ CLAT mocks), and doubt-clearing sessions via app. It ranked #1 in the Best Online CLAT Coaching 2027 CoachingRank shortlist.',
              },
              {
                q: 'Can Knowledge Nation help with Judiciary / PCS-J preparation?',
                a: 'Yes. Knowledge Nation runs a dedicated Judiciary Foundation Program (10 months, ₹1,20,000) covering IPC, CrPC, CPC, Evidence Act, Constitutional Law, and state-specific PCS-J modules. Mock viva sessions are conducted by retired judges. It ranked #1 in the Best Judiciary Coaching in Delhi 2027 shortlist.',
              },
              {
                q: 'How do I enrol at Knowledge Nation Law Centre?',
                a: 'Visit the Hauz Khas campus at 47/1, Kalu Sarai, New Delhi (walk-in Monday–Saturday, 9 AM–6 PM), call +91-9999882858, or email info@knowledgenation.co.in. Batch dates, seat availability, and free demo class schedules are published at knowledgenation.co.in.',
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                <summary
                  style={{
                    padding: '16px 20px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.97rem',
                    color: 'var(--ink-primary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    listStyle: 'none',
                    userSelect: 'none',
                  }}
                >
                  {q}
                  <span
                    style={{
                      fontSize: '1.2rem',
                      color: 'var(--brand-primary)',
                      marginLeft: '12px',
                      flexShrink: 0,
                    }}
                  >
                    ›
                  </span>
                </summary>
                <div
                  style={{
                    padding: '14px 20px 16px',
                    fontSize: '0.9rem',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.7,
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL RANKING APPEARANCES ──────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Verified Track Record</span>
              <h2>All {appearances.length} CoachingRank Shortlists — Knowledge Nation Ranked #1</h2>
            </div>
            <p>
              Every editorial shortlist where Knowledge Nation Law Centre has undergone a verified audit and
              received an official ranking.
            </p>
          </div>

          <div className="chooser-grid">
            {appearances.map(({ page, rank, blurb }) => (
              <div
                key={page.slug}
                className="exam-card"
                style={{ flexDirection: 'column', alignItems: 'stretch' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    className={`medal-badge ${getBadgeStyle(rank)}`}
                    style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}
                  >
                    #{rank}
                  </span>
                  <span className="exam-card-badge">
                    {page.city ? `${page.city} · ` : ''}
                    {page.exam.toUpperCase()}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.02rem', lineHeight: '1.35', marginBottom: '8px' }}>
                  <Link href={rankingPath(page.slug)} style={{ color: 'var(--ink-primary)' }}>
                    {page.title.replace(/\s+202[67].*/, '').replace(/\s+\|.*/, '')}
                  </Link>
                </h3>

                {blurb && (
                  <p
                    style={{
                      fontSize: '0.86rem',
                      color: 'var(--ink-secondary)',
                      lineHeight: '1.5',
                      flex: 1,
                    }}
                  >
                    {blurb.slice(0, 160)}…
                  </p>
                )}

                <div
                  style={{
                    marginTop: '12px',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <Link
                    href={rankingPath(page.slug)}
                    className="btn btn-ghost btn-sm"
                    style={{ width: '100%' }}
                  >
                    View Full Shortlist →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ────────────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: '64px' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Enrol / Enquire</span>
              <h2>Contact Knowledge Nation Law Centre</h2>
            </div>
            <p>For admissions, batch schedules, demo classes, and free counselling.</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '14px',
              marginBottom: '28px',
            }}
          >
            {[
              {
                icon: '📍',
                label: 'Address',
                value: '47/1, First Floor, Kalu Sarai, Hauz Khas, New Delhi 110016',
                href: 'https://maps.google.com/?q=Knowledge+Nation+Law+Centre+Hauz+Khas+Delhi',
              },
              { icon: '📞', label: 'Phone', value: '+91-9999882858', href: 'tel:+919999882858' },
              {
                icon: '✉️',
                label: 'Email',
                value: 'info@knowledgenation.co.in',
                href: 'mailto:info@knowledgenation.co.in',
              },
              {
                icon: '🌐',
                label: 'Website',
                value: 'knowledgenation.co.in',
                href: 'https://knowledgenation.co.in',
              },
            ].map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="exam-card"
                  style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '5px', padding: '16px 18px' }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                    {value}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="info-box" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
            <h4 style={{ color: 'var(--brand-primary)', marginBottom: '8px' }}>
              📋 Represent Knowledge Nation Law Centre?
            </h4>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.93rem', lineHeight: 1.6 }}>
              To submit updated NLU selection rolls, faculty credentials, campus photos, or request a re-audit
              for the {SITE.year} cycle, contact our editorial desk via{' '}
              <Link href="/contact" className="text-link">
                Contact Desk
              </Link>{' '}
              or email{' '}
              <a href={`mailto:${SITE.email}`} className="text-link">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
