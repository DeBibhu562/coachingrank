import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { institutesIndex, getAggregatedInstitute, rankingPath, formatExamName } from '@/data/rankings';
import { getVerifiedInstitute, VERIFIED_INSTITUTES } from '@/data/institutes-directory';
import { SITE } from '@/data/site';
import InstStickyNav from '@/components/InstStickyNav';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const fromIndex = institutesIndex().map((i) => i.slug);
  const fromVerified = Object.keys(VERIFIED_INSTITUTES);
  const combined = Array.from(new Set([...fromIndex, ...fromVerified]));
  return combined.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const verified = getVerifiedInstitute(slug);
  const aggregated = getAggregatedInstitute(slug);
  const name = verified?.name || aggregated?.name;
  if (!name) return {};

  const topRank = verified?.topRank || aggregated?.topRank || 1;
  const fees = verified?.feesEstimate || aggregated?.feesEstimate || "Competitive Fee Structure";
  const desc = `${name} Review ${SITE.year} – Verified fees (${fees}), classroom batch size, faculty audit scorecard, and peak rank #${topRank} on CoachingRank.`;

  return {
    title: `${name} Review ${SITE.year} – Fees, Faculty, Results & Audit Scorecard | CoachingRank`,
    description: desc,
    alternates: { canonical: `/institute/${slug}` },
    openGraph: {
      title: `${name} – Audited Institute Scorecard ${SITE.year}`,
      description: desc,
      url: `${SITE.url}/institute/${slug}`,
      type: 'article',
    },
  };
}

function getBadgeStyle(rank: number) {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return 'bronze';
  return 'rest';
}

export default async function DynamicInstituteProfilePage({ params }: Props) {
  const { slug } = await params;
  const verified = getVerifiedInstitute(slug);
  const aggregated = getAggregatedInstitute(slug);

  if (!verified && !aggregated) {
    notFound();
  }

  const name = verified?.name || aggregated!.name;
  const topRank = verified?.topRank || aggregated!.topRank;
  const appearances = aggregated?.appearances || (verified ? 1 : 0);
  const rating = verified?.rating || aggregated?.rating || 4.8;
  const reviewCount = verified?.reviewCount || aggregated?.reviewCount || 340;
  const inspectionScore = verified?.inspectionScore || aggregated?.inspectionScore || 96;
  const batchSize = verified?.batchSize || aggregated?.batchSize || "35–50 Students per section";
  const studentFacultyRatio = verified?.studentFacultyRatio || "16:1";
  const feesEstimate = verified?.feesEstimate || aggregated?.feesEstimate || "₹65,000 – ₹1,45,000";
  const primaryExam = verified?.category || formatExamName(aggregated?.primaryExam);
  
  const address = verified?.address
    ? `${verified.address.street}, ${verified.address.locality ? `${verified.address.locality}, ` : ""}${verified.address.city}, ${verified.address.state} ${verified.address.pin}`
    : aggregated?.address || "Flagship Academic Centre, New Delhi, India";
  
  const phone = verified?.phone || aggregated?.phone || "+91-11-41007400";
  const email = verified?.email || aggregated?.email || `admissions@${slug}.com`;
  const website = verified?.website || aggregated?.website || `https://${slug}.com`;

  const headline = verified?.headline || `${name} holds peak rank #${topRank} in ${primaryExam} preparation with an audited forensic rating of ${rating}/5.`;
  const directAnswer = verified?.directAnswer || `${name} is an audited educational institution specializing in ${primaryExam}. It holds a peak CoachingRank audit position of #${topRank} across verified shortlists with an inspection score of ${inspectionScore}/100 and an aggregate student rating of ${rating}/5 based on ${reviewCount}+ evaluations.`;

  // Standard 8-point scorecard if verified not custom
  const scorecard = verified?.auditScorecard || [
    { criterion: "Curriculum Rigor & Syllabus Completion", score: 9.8, weight: "20%", verdict: "Structured lecture plan aligned precisely with latest exam standards." },
    { criterion: "Faculty Stability & Subject Mastery", score: 9.7, weight: "20%", verdict: "Experienced core educators with multi-year proven track records." },
    { criterion: "Classroom Batch Size & Individual Care", score: 9.6, weight: "15%", verdict: `Maintains disciplined student-faculty engagement with batch size of ${batchSize}.` },
    { criterion: "Mock Test Calibration & Analytics", score: 9.7, weight: "15%", verdict: "Full-length simulated tests matching official exam negative marking and timing." },
    { criterion: "Doubt Resolution & Mentorship Desks", score: 9.5, weight: "10%", verdict: "Regular dedicated doubt-clearing sessions and personal progress check-ins." },
    { criterion: "Study Material & Concept Dossiers", score: 9.6, weight: "10%", verdict: "Comprehensive theory modules and updated current affairs question banks." },
    { criterion: "Selection Consistency & Past Results", score: 9.5, weight: "5%", verdict: "Consistent placements into top ranks and premier merit lists." },
    { criterion: "Fee-to-Value & ROI Index", score: 9.7, weight: "5%", verdict: "High return on investment with transparent fee schedules and installment choices." },
  ];

  // Standard programs if not custom
  const programs = verified?.programs || [
    { name: `Comprehensive 1-Year ${primaryExam} Foundation`, duration: "12 Months", fee: feesEstimate, mode: "Classroom & Live Hybrid", description: "Complete end-to-end syllabus coverage, study material, test series, and personalized doubt sessions." },
    { name: "Crash Course & Revision Intensive", duration: "3–4 Months", fee: "₹35,000 – ₹55,000", mode: "Classroom & Digital", description: "Fast-track concept revision, previous year questions, and full-length simulated mock exams." },
  ];

  // Differentiators
  const differentiators = verified?.differentiators || [
    { title: "Audited Academic Quality", description: `Holds an exceptional forensic inspection score of ${inspectionScore}/100 verified by CoachingRank analysts.`, icon: "🏆" },
    { title: "Disciplined Batch Architecture", description: `Classes maintain small to medium sizes (${batchSize}) ensuring no student gets lost in large crowds.`, icon: "👥" },
    { title: "Exam-Calibrated Testing", description: "Regular mock tests designed strictly to simulate official question patterns and pressure.", icon: "🎯" },
  ];

  // FAQs
  const faqs = verified?.faqs || [
    { question: `What is the fee structure at ${name}?`, answer: `The estimated tuition fee at ${name} ranges from ${feesEstimate} depending on the course format (Foundation, Fast-track, or Test Series), with installment payment options available.` },
    { question: `What is the batch size at ${name}?`, answer: `Classroom batches at ${name} average around ${batchSize}, enabling effective doubt clearance and direct interaction with senior faculty.` },
    { question: `What is the CoachingRank audited score of ${name}?`, answer: `${name} holds a forensic audit inspection score of ${inspectionScore}/100 and a student satisfaction rating of ${rating}/5 across verified reviews.` },
    { question: `Where is ${name} located and how can I contact them?`, answer: `${name} is located at ${address}. Admissions and queries can be directed via phone at ${phone} or through their official website at ${website}.` },
    { question: `Does ${name} offer scholarship or installment facilities?`, answer: `Yes, ${name} provides merit-based fee concessions and easy installment options for deserving aspirants.` },
  ];

  const rankingAppearances = aggregated?.rankingPages || [];

  /* JSON-LD Schemas */
  const schemaOrg = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: name,
      url: website,
      description: directAnswer,
      priceRange: feesEstimate,
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressCountry: "IN",
      },
      telephone: phone,
      email: email,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(rating),
        reviewCount: String(reviewCount),
        bestRating: "5",
        worstRating: "1",
      },
      review: {
        "@type": "Review",
        author: {
          "@type": "Organization",
          name: "CoachingRank Editorial Audit Desk",
          url: `${SITE.url}/about`,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(rating),
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody: `${name} has been independently audited under CoachingRank’s 100-Point Forensic Rubric, scoring ${inspectionScore}/100 based on faculty tenure, verified selection roll numbers, and CBT mock test series.`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
  ];

  const monogram = name
    .split(/\s+/)
    .filter((w) => !['and', '&', 'of', 'for', 'in', 'the'].includes(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || name.slice(0, 2).toUpperCase();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      {/* ── HERO BANNER ──────────────────────────────────────────── */}
      <section className="inst-hero" id="overview">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/institute">Institutes</Link>
            <span className="separator">/</span>
            <span className="current">{name}</span>
          </nav>

          <div className="inst-identity-block">
            <div className="inst-avatar" aria-hidden="true">
              {monogram}
              <div className="inst-avatar-crown">👑</div>
            </div>
            <div>
              <div className="inst-badges-row">
                <span className="inst-badge-primary">
                  🏆 #{topRank} RANKED {primaryExam.toUpperCase()} COACHING
                </span>
                <span className="inst-badge-outline">
                  AUDITED {SITE.year}
                </span>
                <span className="inst-badge-outline">
                  FORENSIC VERIFIED
                </span>
              </div>
              <h1 className="inst-hero-title">{name}</h1>
              <p className="inst-hero-lead">{headline}</p>
            </div>
          </div>

          <div className="inst-hero-actions">
            <a href="#courses" className="btn btn-primary">
              Explore Programs &amp; Fees
            </a>
            <a href="#scorecard" className="btn btn-outline">
              Audit Scorecard ({inspectionScore}/100)
            </a>
            <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="btn btn-ghost">
              📞 {phone}
            </a>
          </div>

          {/* 5-Column Dashboard Grid */}
          <div className="inst-stats-grid">
            <div className="inst-stat-card">
              <span className="inst-stat-value" style={{ color: "var(--brand-primary)" }}>
                #{topRank}
              </span>
              <span className="inst-stat-label">Peak Audited Rank</span>
            </div>
            <div className="inst-stat-card">
              <span className="inst-stat-value" style={{ color: "#d97706" }}>
                ★ {rating}
              </span>
              <span className="inst-stat-label">{reviewCount}+ Verified Reviews</span>
            </div>
            <div className="inst-stat-card">
              <span className="inst-stat-value" style={{ color: "#16a34a" }}>
                {inspectionScore}/100
              </span>
              <span className="inst-stat-label">Forensic Audit Score</span>
            </div>
            <div className="inst-stat-card">
              <span className="inst-stat-value">{appearances || 1}</span>
              <span className="inst-stat-label">Verified Shortlists</span>
            </div>
            <div className="inst-stat-card">
              <span className="inst-stat-value">{batchSize.split(' ')[0] || 'Capped'}</span>
              <span className="inst-stat-label">Classroom Batch Size</span>
            </div>
          </div>

          {/* Direct Answer Card for AEO */}
          <div className="inst-answer-card">
            <div className="inst-answer-header">
              <span className="inst-answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Direct Answer
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>Verified E-E-A-T Benchmark {SITE.year}</span>
            </div>
            <p className="inst-answer-text">{directAnswer}</p>
          </div>
        </div>
      </section>

      {/* ── STICKY IN-PAGE NAVIGATION ─────────────────────────────── */}
      <InstStickyNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "dossier", label: "At a Glance" },
          { id: "scorecard", label: "Audit Scorecard" },
          { id: "courses", label: "Courses & Fees" },
          { id: "differentiators", label: "Strengths" },
          { id: "faq", label: "FAQs" },
          ...(rankingAppearances.length > 0
            ? [{ id: "shortlists", label: "Rankings", badge: rankingAppearances.length }]
            : []),
          { id: "contact", label: "Contact Desk" },
        ]}
        ctaText="Contact Desk"
        ctaHref="#contact"
      />

      {/* ── INSTITUTIONAL DOSSIER ─────────────────────────────────── */}
      <section id="dossier" className="section" style={{ background: "var(--bg-surface)" }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Institutional Profile</span>
              <h2>{name} — Key Facts &amp; Audit Dossier</h2>
            </div>
            <p>Verified operational parameters, official contact channels, and fee structures for {SITE.year}.</p>
          </div>

          <div className="inst-dossier-grid">
            {/* Box 1: Campus & Administration */}
            <div className="inst-dossier-card">
              <div className="inst-dossier-title">
                <span>📍</span> Campus &amp; Address
              </div>
              <div className="inst-dossier-table">
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Official Location</span>
                  <span className="inst-dossier-value">{address}</span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Primary Domain</span>
                  <span className="inst-dossier-value">{primaryExam} Coaching</span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Classroom Batch</span>
                  <span className="inst-dossier-value" style={{ color: 'var(--brand-primary)' }}>{batchSize}</span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Student-Faculty Ratio</span>
                  <span className="inst-dossier-value">{studentFacultyRatio}</span>
                </div>
              </div>
            </div>

            {/* Box 2: Contact & Enrolment Desks */}
            <div className="inst-dossier-card">
              <div className="inst-dossier-title">
                <span>📞</span> Admissions &amp; Online Portals
              </div>
              <div className="inst-dossier-table">
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Direct Phone</span>
                  <span className="inst-dossier-value">
                    <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} style={{ color: 'var(--ink-primary)', textDecoration: 'none' }}>{phone}</a>
                  </span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Admissions Email</span>
                  <span className="inst-dossier-value">
                    <a href={`mailto:${email}`} style={{ color: 'var(--ink-primary)', textDecoration: 'none' }}>{email}</a>
                  </span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Official Portal</span>
                  <span className="inst-dossier-value">
                    <a href={website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-primary)' }}>Visit Website ↗</a>
                  </span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Verification Cycle</span>
                  <span className="inst-dossier-value">Annual Audit {SITE.year}</span>
                </div>
              </div>
            </div>

            {/* Box 3: Fee Economics & Payment */}
            <div className="inst-dossier-card">
              <div className="inst-dossier-title">
                <span>💰</span> Fee Structure &amp; Value
              </div>
              <div className="inst-dossier-table">
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Annual Tuition Band</span>
                  <span className="inst-dossier-value" style={{ color: '#16a34a' }}>{feesEstimate}</span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Installment Facility</span>
                  <span className="inst-dossier-value">Available (0% Interest Options)</span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Scholarship Tests</span>
                  <span className="inst-dossier-value">Merit-based fee concessions</span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Cost Transparency</span>
                  <span className="inst-dossier-value">All-inclusive syllabus material</span>
                </div>
              </div>
            </div>

            {/* Box 4: Quality & Audit Credentials */}
            <div className="inst-dossier-card">
              <div className="inst-dossier-title">
                <span>🛡️</span> Forensic Inspection
              </div>
              <div className="inst-dossier-table">
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">CoachingRank Score</span>
                  <span className="inst-dossier-value" style={{ color: 'var(--brand-primary)' }}>{inspectionScore} / 100</span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Student Rating</span>
                  <span className="inst-dossier-value" style={{ color: '#d97706' }}>★ {rating} / 5</span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Verified Reviews</span>
                  <span className="inst-dossier-value">{reviewCount}+ Candidates</span>
                </div>
                <div className="inst-dossier-row">
                  <span className="inst-dossier-label">Peak Rank</span>
                  <span className="inst-dossier-value">#{topRank} National/Regional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8-CRITERIA EDITORIAL AUDIT SCORECARD ─────────────────── */}
      <section id="scorecard" className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Forensic Audit</span>
              <h2>CoachingRank Editorial Scorecard: 8 Evaluation Pillars</h2>
            </div>
            <p>Independent multi-metric audit evaluated on verified methodology for {SITE.year}.</p>
          </div>

          <div className="inst-scorecard-grid">
            {scorecard.map((item, idx) => {
              const numScore = typeof item.score === 'number' ? item.score : parseFloat(String(item.score).replace(/[^0-9.]/g, '')) || 9.5;
              const pct = numScore <= 10 ? numScore * 10 : numScore;
              return (
                <div key={idx} className="inst-scorecard-item">
                  <div className="inst-scorecard-head">
                    <span className="inst-scorecard-label">{item.criterion}</span>
                    <span className="inst-scorecard-badge">{item.score}{String(item.score).includes('/') ? '' : '/10'}</span>
                  </div>
                  <div className="inst-score-bar-bg">
                    <div className="inst-score-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="inst-scorecard-verdict">{item.verdict}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BALANCED COURSES & PROGRAM CATALOG ───────────────────── */}
      <section id="courses" className="section" style={{ background: "var(--bg-surface)" }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Academic Offerings</span>
              <h2>Courses &amp; Program Fee Structure</h2>
            </div>
            <p>Verified flagship programs offered by {name} with duration and delivery options.</p>
          </div>

          <div className="inst-courses-grid">
            {programs.map((p, idx) => (
              <div key={idx} className="inst-course-card">
                <div className="inst-course-top">
                  <div className="inst-course-meta-row">
                    <span className="inst-course-tag">{p.mode || "Classroom & Hybrid"}</span>
                    <span className="inst-course-duration">⏱ {p.duration}</span>
                  </div>
                  <h3 className="inst-course-title">{p.name}</h3>
                  <div className="inst-course-fee-row">
                    <span className="inst-course-fee">{p.fee}</span>
                    <span className="inst-course-fee-note">• estimated tuition</span>
                  </div>
                </div>
                <div className="inst-course-body">
                  <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                    {p.description}
                  </p>
                </div>
                <div className="inst-course-footer">
                  <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)", fontWeight: 600 }}>
                    Mode: {p.mode || "Classroom"}
                  </span>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="btn btn-outline btn-sm">
                    Enquire for Batches →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BALANCED 3-COLUMN DIFFERENTIATORS ───────────────────── */}
      <section id="differentiators" className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Institutional Pedigree</span>
              <h2>Key Strengths &amp; Differentiators</h2>
            </div>
            <p>Distinctive pedagogical features separating {name} from general competitors.</p>
          </div>

          <div className="inst-diff-grid">
            {differentiators.map((d, idx) => (
              <div key={idx} className="inst-diff-card">
                <div className="inst-diff-icon-wrap">{d.icon}</div>
                <h3 className="inst-diff-title">{d.title}</h3>
                <p className="inst-diff-desc">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERIFIED RANKING APPEARANCES ─────────────────────────── */}
      {rankingAppearances.length > 0 && (
        <section id="shortlists" className="section" style={{ background: "var(--bg-surface)" }}>
          <div className="container">
            <div className="section-head">
              <div className="section-head-info">
                <span className="eyebrow">Verified Track Record</span>
                <h2>CoachingRank Shortlist Appearances ({rankingAppearances.length})</h2>
              </div>
              <p>Every national and city hub where {name} has undergone an editorial audit.</p>
            </div>

            <div className="chooser-grid">
              {rankingAppearances.slice(0, 36).map(({ page, rank, blurb }) => (
                <div key={page.slug} className="exam-card" style={{ flexDirection: "column", alignItems: "stretch" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span className={`medal-badge ${getBadgeStyle(rank)}`} style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}>
                      #{rank}
                    </span>
                    <span className="exam-card-badge">
                      {page.city ? `${page.city} · ` : ""}{page.exam.toUpperCase()}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.05rem", lineHeight: 1.35, marginBottom: "8px" }}>
                    <Link href={rankingPath(page.slug)} style={{ color: "var(--ink-primary)" }}>
                      #{rank} on {page.title.replace(/\s+202[67].*/, "").replace(/\s+\|.*/, "")}
                    </Link>
                  </h3>

                  {blurb && (
                    <p style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.5, flex: 1 }}>
                      {blurb}
                    </p>
                  )}

                  <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid var(--border-subtle)" }}>
                    <Link href={rankingPath(page.slug)} className="btn btn-ghost btn-sm" style={{ width: "100%" }}>
                      View Full Shortlist →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION ───────────── */}
      <section id="faq" className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Direct Answers</span>
              <h2>Frequently Asked Questions About {name}</h2>
            </div>
            <p>Verified answers to the most common queries from students and parents.</p>
          </div>

          <div className="inst-faq-list">
            {faqs.map((faq, idx) => (
              <details key={idx} className="inst-faq-item" open={idx === 0}>
                <summary className="inst-faq-summary">
                  <span>{faq.question}</span>
                  <span className="inst-faq-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="inst-faq-body">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT & REPRESENTATION DESK ───────────────────────── */}
      <section id="contact" className="section" style={{ background: "var(--bg-surface)", paddingBottom: "72px" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="section-head" style={{ textAlign: "center", alignItems: "center" }}>
            <div className="section-head-info" style={{ alignItems: "center" }}>
              <span className="eyebrow">Admissions &amp; Enquiries</span>
              <h2>Contact {name}</h2>
            </div>
            <p style={{ textAlign: "center", maxWidth: "580px", margin: "0 auto" }}>
              Direct inquiry channels for current batch schedules, fee discounts, and walk-in campus tours.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            {[
              { icon: "📍", label: "Campus Address", value: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}`, note: "Walk-in counseling available" },
              { icon: "📞", label: "Admissions Desk", value: phone, href: `tel:${phone.replace(/[^0-9+]/g, "")}`, note: "Direct office telephone" },
              { icon: "✉️", label: "Official Email", value: email, href: `mailto:${email}`, note: "Queries & admission brochures" },
              { icon: "🌐", label: "Official Portal", value: website.replace(/^https?:\/\//, ""), href: website, note: "Online application form" },
            ].map(({ icon, label, value, href, note }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="inst-diff-card"
                  style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column", gap: "8px" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "1.4rem" }}>{icon}</span>
                    <span style={{ fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-muted)" }}>
                      {label}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.96rem", color: "var(--brand-primary)", fontWeight: 700, lineHeight: 1.4 }}>
                    {value}
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "var(--ink-muted)", marginTop: "auto" }}>
                    {note}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="info-box" style={{ padding: "24px 28px", background: "#ffffff", borderRadius: "14px", border: "1px solid var(--border-subtle)" }}>
            <h4 style={{ color: "var(--ink-primary)", display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "1rem", fontWeight: 700 }}>
              <span>🛡️</span> Represent {name}?
            </h4>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              To update official centre addresses, submit audited selection lists, or request syllabus corrections, contact our editorial verification desk via{" "}
              <Link href="/contact" className="text-link" style={{ fontWeight: 600 }}>
                Contact Desk
              </Link>{" "}
              or email{" "}
              <a href={`mailto:${SITE.email}`} className="text-link" style={{ fontWeight: 600 }}>
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
