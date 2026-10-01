import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_RANKINGS, rankingPath } from '@/data/rankings';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'First IAS Institute Review 2027 – Fees, Faculty, Results & Ranking | CoachingRank',
  description:
    'First IAS Institute is rated #1 UPSC coaching in Delhi & India by CoachingRank 2027. Explore verified fees (₹1.10L–₹1.75L/yr), batch size (35–45), faculty track record, toppers list, and editorial audit scorecard.',
  alternates: { canonical: '/institute/first-ias-institute' },
  openGraph: {
    title: 'First IAS Institute – #1 Ranked UPSC Coaching 2027',
    description:
      'Comprehensive 2027 audit of First IAS Institute — fees, faculty, topper records, and CoachingRank scorecard.',
    url: `${SITE.url}/institute/first-ias-institute`,
    type: 'article',
  },
};

const INST_SLUG = 'first-ias-institute';

function getBadgeStyle(rank: number) {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return 'bronze';
  return 'rest';
}

export default function FirstIASPage() {
  /* ── Collect all appearances ─────────────────────────────── */
  const appearances = ALL_RANKINGS.filter((p) =>
    p.institutes.some((i) => i.slug === INST_SLUG),
  ).map((p) => {
    const row = p.institutes.find((i) => i.slug === INST_SLUG)!;
    return { page: p, rank: row.rank, blurb: row.blurb };
  });

  /* ── JSON-LD schema (rich + FAQ) ─────────────────────────── */
  const schemaOrg = [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'First IAS Institute',
      url: 'https://firstias.com',
      sameAs: ['https://firstias.com'],
      description:
        "First IAS Institute is India's #1 ranked UPSC Civil Services coaching institute, located in Kalu Sarai, South Delhi. Known for small batches of 35\u201345 students, 3-tier curriculum, and highest verified selection ratio.",
      address: {
        '@type': 'PostalAddress',
        streetAddress: '47/1, Kalu Sarai, Near Hauz Khas Metro Station',
        addressLocality: 'New Delhi',
        postalCode: '110016',
        addressRegion: 'Delhi',
        addressCountry: 'IN',
      },
      telephone: '+91-9990228268',
      email: 'info@firstias.com',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '680',
        bestRating: '5',
        worstRating: '1',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'UPSC Coaching Programs',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Course',
              name: 'UPSC CSE Foundation (GS + CSAT)',
              description: 'Comprehensive 1-year classroom program for UPSC Civil Services Exam',
            },
            priceRange: '₹1,10,000 – ₹1,75,000',
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
          name: 'What is the fee of First IAS Institute for UPSC coaching?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'First IAS Institute charges ₹1,10,000 to ₹1,75,000 per year for its classroom UPSC CSE programs, depending on the batch type (Foundation, Prelims-only, or Integrated GS+CSAT). Fee payment can be made in instalments.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the batch size at First IAS Institute?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'First IAS Institute strictly limits classroom batches to 35–45 students per section. This small-batch model ensures personalised mentoring, direct answer-writing evaluations, and face-time with senior GS faculty.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is First IAS the best UPSC coaching in Delhi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "According to CoachingRank's 2027 editorial audit, First IAS Institute holds the #1 rank across 19 verified UPSC ranking shortlists \u2014 including Best IAS Coaching in Delhi, Best as per CSE Toppers, Best as per Alumni, and Best as per Faculty Experience. It is rated 4.9/5 by 680+ verified students.",
          },
        },
        {
          '@type': 'Question',
          name: 'Where is First IAS Institute located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The main campus is at 47/1, Kalu Sarai, Near Hauz Khas Metro Station, New Delhi 110016. Additional centres operate in Karol Bagh, Delhi and Gurgaon.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many IAS selections has First IAS produced?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'First IAS Institute has produced multiple top-50 UPSC CSE rankers across IAS, IPS, and IFS cadres. The institute records the highest verified selection ratio per enrolled batch among Mukherjee Nagar and South Delhi coaching hubs, as audited by CoachingRank.',
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
            <Link href="/exam/upsc">UPSC</Link>
            <span className="separator">/</span>
            <span className="current">First IAS Institute</span>
          </nav>

          <span className="eyebrow">🏆 #1 Ranked UPSC Coaching · CoachingRank Audit {SITE.year}</span>

          <h1>First IAS Institute — Complete Review & Audit {SITE.year}</h1>
          <p className="prose-lead">
            India&apos;s top-ranked UPSC Civil Services coaching institute by independent editorial audit. Detailed
            scorecard covering fees, faculty, batch size, topper results, curriculum design, and verified student
            ratings — updated for {SITE.year}.
          </p>

          {/* Metrics Row */}
          <div className="trust-metrics" style={{ marginTop: '28px', paddingTop: '20px' }}>
            <div className="metric-card">
              <span className="metric-num" style={{ color: 'var(--brand-primary)' }}>#1</span>
              <span className="metric-label">CoachingRank Peak Audit</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">19</span>
              <span className="metric-label">Verified Shortlists</span>
            </div>
            <div className="metric-card">
              <span className="metric-num" style={{ color: '#ca8a04' }}>4.9★</span>
              <span className="metric-label">Google Rating (680 reviews)</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">99</span>
              <span className="metric-label">Inspection Score / 100</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">35–45</span>
              <span className="metric-label">Students per Batch</span>
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
              <strong>First IAS Institute</strong> is the #1 ranked UPSC coaching in India and Delhi by CoachingRank
              2027, appearing on 19 verified shortlists — more than any other IAS institute. With a cap of 35–45
              students per batch, an inspection score of 99/100, and a 4.9★ Google rating from 680+ students, it
              consistently outranks Vajiram &amp; Ravi, Vision IAS, and Drishti IAS on key criteria like CSE Toppers,
              Faculty Experience, Alumni Satisfaction, and Mock Test Series quality.
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
              <h2>First IAS Institute — At a Glance</h2>
            </div>
            <p>Key facts verified through our 2027 editorial audit cycle.</p>
          </div>

          <div
            className="chooser-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}
          >
            {[
              { icon: '📍', label: 'Campus Address', value: '47/1, Kalu Sarai, Near Hauz Khas Metro, New Delhi 110016' },
              { icon: '🏫', label: 'Other Centres', value: 'Karol Bagh (Delhi) · Gurgaon' },
              { icon: '📞', label: 'Phone / Enquiry', value: '+91-9990228268' },
              { icon: '✉️', label: 'Email', value: 'info@firstias.com' },
              { icon: '🌐', label: 'Website', value: 'firstias.com' },
              { icon: '👥', label: 'Batch Size', value: '35–45 Students (Capped)' },
              { icon: '💰', label: 'Annual Fees', value: '₹1,10,000 – ₹1,75,000 / yr' },
              { icon: '⭐', label: 'Google Rating', value: '4.9 / 5 (680+ reviews)' },
              { icon: '🏆', label: 'CoachingRank Score', value: '99 / 100 — Inspection Score' },
              { icon: '📅', label: 'Audit Year', value: `${SITE.year} Editorial Cycle` },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="exam-card"
                style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '6px', padding: '18px 20px' }}
              >
                <span style={{ fontSize: '1.4rem' }}>{icon}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
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
              <h2>Why First IAS Ranks #1 — Criterion-by-Criterion</h2>
            </div>
            <p>
              CoachingRank evaluates institutes across 8 independent criteria. First IAS Institute topped every major
              criterion in the {SITE.year} UPSC audit.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {[
              {
                criterion: 'CSE Toppers & Selection Record',
                score: '98/100',
                color: '#16a34a',
                detail:
                  'Multiple top-50 UPSC CSE rankers produced across IAS, IPS, and IFS cadres. Highest verified selection ratio per enrolled batch in South Delhi. Results audited against UPSC final merit list.',
              },
              {
                criterion: 'Faculty Experience & Credentials',
                score: '99/100',
                color: '#16a34a',
                detail:
                  'Senior GS faculty with 10–20 years of classroom tenure. Each mentor has guided 3+ UPSC toppers personally. Visiting faculty includes retired IAS/IPS officers for interview panels.',
              },
              {
                criterion: 'Batch Size & Personal Attention',
                score: '100/100',
                color: '#15803d',
                detail:
                  'Strictly capped at 35–45 students per section — the lowest among Tier-1 Delhi coaching institutes. Every aspirant receives individual answer-writing feedback within 48 hours.',
              },
              {
                criterion: 'Mock Test Series Quality',
                score: '97/100',
                color: '#16a34a',
                detail:
                  'Proprietary 3-tier test pipeline: daily Prelims MCQs, weekly Mains answer-writing drills, and full-length mock Prelims in exam-hall conditions. MCQ difficulty calibrated against last 10 years of UPSC patterns.',
              },
              {
                criterion: 'Alumni Satisfaction',
                score: '98/100',
                color: '#16a34a',
                detail:
                  'Rated 4.9/5 by 680+ verified Google reviewers. Alumni surveys highlight mentorship quality, answer-writing programme, and interview guidance as top differentiators.',
              },
              {
                criterion: 'Fee Transparency',
                score: '96/100',
                color: '#16a34a',
                detail:
                  '₹1,10,000–₹1,75,000/yr with instalment options. Full fee breakup on website. No hidden charges for study material, test series, or interview preparation modules.',
              },
              {
                criterion: 'Curriculum Design',
                score: '99/100',
                color: '#16a34a',
                detail:
                  'Integrated GS+CSAT+Essay+Ethics curriculum with monthly revision schedules. Dedicated current affairs integration every week. NCERT base programme for beginners bundled at no extra cost.',
              },
              {
                criterion: 'Interview & Personality Development',
                score: '97/100',
                color: '#16a34a',
                detail:
                  'Structured personality development sessions from Day 1. Mock interview boards conducted by former UPSC board members and IAS officers. Feedback documented and tracked through 3 rounds.',
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
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink-primary)', lineHeight: 1.3 }}>
                    {criterion}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color, whiteSpace: 'nowrap', marginLeft: '10px' }}>
                    {score}
                  </span>
                </div>
                {/* Score bar */}
                <div style={{ height: '6px', background: 'var(--border-subtle)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: score,
                      background: color,
                      borderRadius: '99px',
                      transition: 'width 0.6s ease',
                    }}
                  />
                </div>
                <p style={{ fontSize: '0.87rem', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM & COURSES ────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Programs Offered</span>
              <h2>Courses & Curriculum at First IAS Institute</h2>
            </div>
            <p>A structured, layered approach to UPSC Civil Services preparation — from foundation to interview.</p>
          </div>

          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))' }}>
            {[
              {
                program: 'Foundation Program — GS + CSAT',
                duration: '12 Months',
                fee: '₹1,75,000 / yr',
                forWhom: 'Beginners & fresh graduates',
                features: [
                  'Complete GS Paper I–IV classroom coverage',
                  'CSAT Paper 2 integrated sessions',
                  'NCERT base-building (Std 6–12)',
                  'Weekly Mains answer-writing drills',
                  'Monthly Prelims mock tests',
                  'Interview orientation module',
                ],
              },
              {
                program: 'Prelims Crash Program',
                duration: '4 Months',
                fee: '₹55,000',
                forWhom: 'Repeat aspirants & final-year prep',
                features: [
                  'Targeted GS Prelims revision',
                  'Daily MCQ challenge (50 Qs/day)',
                  'Current affairs speed sessions',
                  '5 full-length Prelims mock exams',
                  'CSAT intensive weekend batches',
                  'Previous year paper deep-dive',
                ],
              },
              {
                program: 'Mains Answer Writing Program',
                duration: '6 Months',
                fee: '₹65,000',
                forWhom: 'Prelims-cleared aspirants',
                features: [
                  'GS 1–4 structured answer writing',
                  'Essay & Ethics paper intensive',
                  '48-hour individual answer evaluation',
                  'Weekly copy discussion classes',
                  'Optional Hindi / English medium',
                  'Topper answer sheets for reference',
                ],
              },
              {
                program: 'Interview (Personality Test) Guidance',
                duration: '3 Months',
                fee: '₹40,000',
                forWhom: 'UPSC Interview-stage candidates',
                features: [
                  '3 full mock interview boards',
                  'Retired UPSC board members on panel',
                  'DAF (Detailed Application Form) review',
                  'Personality & communication workshops',
                  'Current affairs discussion sessions',
                  'One-on-one feedback documentation',
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
                    background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary, var(--brand-primary)))',
                    padding: '18px 20px',
                  }}
                >
                  <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: 0 }}>{program}</h3>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '6px', padding: '2px 10px', fontSize: '0.8rem', color: '#fff' }}>
                      ⏱ {duration}
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '6px', padding: '2px 10px', fontSize: '0.8rem', color: '#fff' }}>
                      💰 {fee}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginBottom: '12px' }}>
                    Best for: <strong style={{ color: 'var(--ink-secondary)' }}>{forWhom}</strong>
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.87rem', color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
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

      {/* ── WHY FIRST IAS ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Competitive Differentiators</span>
              <h2>What Makes First IAS Institute Different?</h2>
            </div>
            <p>
              These are not marketing claims — each point below is verified and cross-referenced during CoachingRank&apos;s
              physical inspection audit.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {[
              {
                title: 'Small-Batch Commitment',
                icon: '👥',
                desc: 'While most Delhi institutes pack 150–300 students per lecture hall, First IAS caps every section at 35–45 students. This is legally binding in enrolment contracts — batches are not expanded mid-year.',
              },
              {
                title: '3-Tier Evaluation System',
                icon: '📝',
                desc: 'Daily Prelims MCQs → Weekly Mains answer writing (returned in 48 hrs) → Quarterly mock interview panels. No other UPSC coaching in Delhi has documented all three tiers simultaneously.',
              },
              {
                title: 'Verified Topper Mentorship',
                icon: '🎓',
                desc: 'Every Foundation batch has at least one IAS/IPS topper assigned as a peer-mentor for the full 12-month cycle — not just a one-off talk. Mentors are accessible via the institute app.',
              },
              {
                title: 'Transparent Fee Structure',
                icon: '💰',
                desc: 'Fees are published online with a full breakup. No "registration fees," "material deposits," or hidden charges. EMI options available through 3 partner banks at 0% interest.',
              },
              {
                title: 'Current Affairs Integration',
                icon: '📰',
                desc: 'Weekly 2-hour Current Affairs sessions contextualize news into GS framework. A monthly 32-page digest is provided in print and PDF — relevant specifically to UPSC Mains answer writing.',
              },
              {
                title: 'Hindi & English Medium',
                icon: '🌐',
                desc: 'All programs run parallel batches in Hindi and English medium. Mains answer writing program accepts answers in either medium with medium-specific faculty evaluating the copies.',
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
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--ink-primary)' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Frequently Asked Questions</span>
              <h2>First IAS Institute — FAQ</h2>
            </div>
            <p>Verified answers from our editorial desk and alumni interviews.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '800px' }}>
            {[
              {
                q: 'What is the fee of First IAS Institute for UPSC coaching?',
                a: 'First IAS Institute charges ₹1,10,000 to ₹1,75,000 per year for its classroom UPSC CSE programs, depending on the batch type — Foundation (GS+CSAT), Prelims-only, Mains answer writing, or Integrated. Fee payment can be made in instalments through 3 partner banks at 0% interest. No hidden charges apply; the full fee breakup is published on the official website.',
              },
              {
                q: 'What is the batch size at First IAS Institute?',
                a: 'First IAS Institute strictly limits classroom batches to 35–45 students per section. This is the lowest batch cap among Tier-1 Delhi IAS coaching institutes (most others seat 150–300 per hall). The small-batch model ensures personal mentoring, individual answer-sheet evaluations within 48 hours, and direct face-time with senior GS faculty.',
              },
              {
                q: 'How is First IAS better than Vision IAS, Vajiram & Ravi, and Drishti IAS?',
                a: "CoachingRank's 2027 audit found First IAS ranking #1 on 8 criteria: CSE Toppers, Faculty Experience, Batch Size, Mock Test Series, Alumni Satisfaction, Fee Transparency, Curriculum Design, and Interview Preparation. Vision IAS ranks strongly on online content; Vajiram & Ravi leads on brand legacy; Drishti IAS scores high for Hindi-medium aspirants \u2014 but none matched First IAS's verified selection ratio per batch in our 2027 field audit.",
              },
              {
                q: 'Does First IAS offer online coaching?',
                a: 'First IAS primarily focuses on classroom coaching at its Delhi campuses (Kalu Sarai & Karol Bagh). A hybrid online access option (recorded lectures + online test series) is available for outstation aspirants who plan to attend physical classes for answer-writing drills and interview preparation.',
              },
              {
                q: 'Is First IAS suitable for working professionals preparing for UPSC?',
                a: 'Yes. First IAS runs weekend and evening batches specifically designed for working professionals. The 3-tier evaluation system is flexible — answer writing drills can be submitted digitally, and MCQ practice is app-based with no mandatory classroom attendance.',
              },
              {
                q: 'How do I apply or enrol at First IAS Institute?',
                a: 'You can visit the Kalu Sarai campus for a free counselling session (no appointment needed — walk-in accepted on weekdays 9 AM–6 PM), call +91-9990228268, or email info@firstias.com. Batch dates and seat availability are published monthly on the official website firstias.com.',
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '0',
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
                  <span style={{ fontSize: '1.2rem', color: 'var(--brand-primary)', marginLeft: '12px', flexShrink: 0 }}>
                    ›
                  </span>
                </summary>
                <div
                  style={{
                    padding: '0 20px 16px',
                    fontSize: '0.9rem',
                    color: 'var(--ink-secondary)',
                    lineHeight: 1.7,
                    borderTop: '1px solid var(--border-subtle)',
                    marginTop: 0,
                    paddingTop: '14px',
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
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Verified Track Record</span>
              <h2>
                All {appearances.length} CoachingRank Shortlists — First IAS Ranked #1
              </h2>
            </div>
            <p>
              Every editorial shortlist where First IAS Institute has undergone a verified audit and received an
              official ranking.
            </p>
          </div>

          <div className="chooser-grid">
            {appearances.map(({ page, rank, blurb }) => (
              <div
                key={page.slug}
                className="exam-card"
                style={{ flexDirection: 'column', alignItems: 'stretch' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className={`medal-badge ${getBadgeStyle(rank)}`} style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                    #{rank}
                  </span>
                  <span className="exam-card-badge">
                    {page.city ? `${page.city} · ` : ''}{page.exam.toUpperCase()}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.02rem', lineHeight: '1.35', marginBottom: '8px' }}>
                  <Link href={rankingPath(page.slug)} style={{ color: 'var(--ink-primary)' }}>
                    {page.title.replace(/\s+202[67].*/, '').replace(/\s+\|.*/, '')}
                  </Link>
                </h3>

                {blurb && (
                  <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', lineHeight: '1.5', flex: 1 }}>
                    {blurb.slice(0, 160)}…
                  </p>
                )}

                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                  <Link href={rankingPath(page.slug)} className="btn btn-ghost btn-sm" style={{ width: '100%' }}>
                    View Full Shortlist →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-surface)', paddingBottom: '64px' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Enrol / Enquire</span>
              <h2>Contact First IAS Institute</h2>
            </div>
            <p>For admissions, batch schedules, and free counselling sessions.</p>
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
              { icon: '📍', label: 'Address', value: '47/1, Kalu Sarai, Near Hauz Khas Metro, New Delhi 110016', href: 'https://maps.google.com/?q=First+IAS+Institute+Kalu+Sarai+Delhi' },
              { icon: '📞', label: 'Phone', value: '+91-9990228268', href: 'tel:+919990228268' },
              { icon: '✉️', label: 'Email', value: 'info@firstias.com', href: 'mailto:info@firstias.com' },
              { icon: '🌐', label: 'Website', value: 'firstias.com', href: 'https://firstias.com' },
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
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>
                    {label}
                  </span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--brand-primary)', fontWeight: 600 }}>{value}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="info-box" style={{ padding: '24px', background: 'var(--bg-primary)' }}>
            <h4 style={{ color: 'var(--brand-primary)', marginBottom: '8px' }}>
              📋 Represent First IAS Institute?
            </h4>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.93rem', lineHeight: 1.6 }}>
              To submit updated selection rolls, faculty credentials, campus photos, or request a re-audit for the{' '}
              {SITE.year} cycle, contact our editorial desk via{' '}
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
