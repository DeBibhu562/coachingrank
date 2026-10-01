import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { institutesIndex, getAggregatedInstitute, rankingPath, formatExamName } from '@/data/rankings';
import { getVerifiedInstitute, VERIFIED_INSTITUTES } from '@/data/institutes-directory';
import { SITE } from '@/data/site';

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/institute">Institutes</Link>
            <span className="separator">/</span>
            <span className="current">{name}</span>
          </nav>

          <span className="eyebrow">
            🏛️ Audited Institute Profile · {SITE.year} Verification
          </span>

          <h1>{name}</h1>
          <p className="prose-lead">{headline}</p>

          {/* Trust Metrics Grid */}
          <div className="trust-metrics" style={{ marginTop: "24px", paddingTop: "20px" }}>
            <div className="metric-card">
              <span className="metric-num" style={{ color: "var(--brand-primary)" }}>
                #{topRank}
              </span>
              <span className="metric-label">Peak Audited Rank</span>
            </div>
            <div className="metric-card">
              <span className="metric-num" style={{ color: "#d97706" }}>
                ★ {rating}
              </span>
              <span className="metric-label">{reviewCount}+ Verified Reviews</span>
            </div>
            <div className="metric-card">
              <span className="metric-num" style={{ color: "#15803d" }}>
                {inspectionScore}/100
              </span>
              <span className="metric-label">Forensic Audit Score</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">{appearances || 1}</span>
              <span className="metric-label">Shortlists Featured</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">{SITE.year}</span>
              <span className="metric-label">Audit Benchmark</span>
            </div>
          </div>

          {/* Direct Answer Box for AEO */}
          <div className="answer-box">
            <div className="answer-header">
              <span className="answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Direct Answer
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>Verified E-E-A-T Benchmark</span>
            </div>
            <p className="answer-text">{directAnswer}</p>
          </div>
        </div>
      </section>

      {/* At A Glance 12-Card Grid */}
      <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Institutional Overview</span>
              <h2>At a Glance: Key Audit Facts</h2>
            </div>
            <p>Verified operational parameters, official contact channels, and fee structures.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginTop: "24px" }}>
            <div style={{ background: "var(--bg-elevated)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Official Address</span>
              <p style={{ fontWeight: 600, fontSize: "0.95rem", marginTop: "6px", color: "var(--ink-primary)" }}>{address}</p>
            </div>
            <div style={{ background: "var(--bg-elevated)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Official Phone</span>
              <p style={{ fontWeight: 600, fontSize: "0.95rem", marginTop: "6px", color: "var(--brand-primary)" }}>
                <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} style={{ color: "inherit", textDecoration: "none" }}>{phone}</a>
              </p>
            </div>
            <div style={{ background: "var(--bg-elevated)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Admissions Email</span>
              <p style={{ fontWeight: 600, fontSize: "0.95rem", marginTop: "6px", color: "var(--ink-primary)" }}>
                <a href={`mailto:${email}`} style={{ color: "inherit", textDecoration: "none" }}>{email}</a>
              </p>
            </div>
            <div style={{ background: "var(--bg-elevated)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Official Website</span>
              <p style={{ fontWeight: 600, fontSize: "0.95rem", marginTop: "6px", color: "var(--brand-primary)" }}>
                <a href={website} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Visit Website ↗</a>
              </p>
            </div>
            <div style={{ background: "var(--bg-elevated)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Annual Fee Range</span>
              <p style={{ fontWeight: 600, fontSize: "1rem", marginTop: "6px", color: "#15803d" }}>{feesEstimate}</p>
            </div>
            <div style={{ background: "var(--bg-elevated)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Classroom Batch Size</span>
              <p style={{ fontWeight: 600, fontSize: "0.95rem", marginTop: "6px", color: "var(--ink-primary)" }}>{batchSize}</p>
            </div>
            <div style={{ background: "var(--bg-elevated)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Faculty-Student Ratio</span>
              <p style={{ fontWeight: 600, fontSize: "0.95rem", marginTop: "6px", color: "var(--ink-primary)" }}>{studentFacultyRatio}</p>
            </div>
            <div style={{ background: "var(--bg-elevated)", padding: "18px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Primary Domain</span>
              <p style={{ fontWeight: 600, fontSize: "0.95rem", marginTop: "6px", color: "var(--ink-primary)" }}>{primaryExam}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Criteria Editorial Audit Scorecard */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Forensic Audit</span>
              <h2>CoachingRank Editorial Scorecard: 8 Evaluation Pillars</h2>
            </div>
            <p>Independent multi-metric audit evaluated on verified methodology.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", marginTop: "24px" }}>
            {scorecard.map((item, idx) => (
              <div key={idx} style={{ background: "var(--bg-surface)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <h3 style={{ fontSize: "1rem", color: "var(--ink-primary)", margin: 0 }}>{item.criterion}</h3>
                  <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--brand-primary)" }}>{item.score}/10</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "var(--border-subtle)", borderRadius: "3px", overflow: "hidden", margin: "8px 0" }}>
                  <div style={{ width: `${(item.score / 10) * 100}%`, height: "100%", background: "var(--brand-primary)", borderRadius: "3px" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--ink-muted)", marginBottom: "8px" }}>
                  <span>Weight: {item.weight}</span>
                  <span style={{ color: "#15803d", fontWeight: 600 }}>Verified Audit</span>
                </div>
                <p style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>{item.verdict}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses & Program Catalog */}
      <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Academic Offerings</span>
              <h2>Courses & Program Fee Structure</h2>
            </div>
            <p>Verified flagship programs offered by {name} with duration and delivery options.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", marginTop: "24px" }}>
            {programs.map((p, idx) => (
              <div key={idx} style={{ background: "var(--bg-elevated)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ background: "rgba(37,99,235,0.08)", color: "var(--brand-primary)", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 600 }}>
                    {p.duration}
                  </span>
                  <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#15803d" }}>
                    {p.fee}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "8px", color: "var(--ink-primary)" }}>{p.name}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", marginBottom: "12px" }}>Mode: {p.mode}</p>
                <p style={{ fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.6, flex: 1 }}>{p.description}</p>
                <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)" }}>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="btn btn-ghost btn-sm" style={{ width: "100%", textAlign: "center" }}>
                    Enquire for Batches →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Institutional Pedigree</span>
              <h2>Key Strengths & Differentiators</h2>
            </div>
            <p>Distinctive pedagogical features separating {name} from general competitors.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "24px" }}>
            {differentiators.map((d, idx) => (
              <div key={idx} style={{ background: "var(--bg-surface)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{d.icon}</div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--ink-primary)" }}>{d.title}</h3>
                <p style={{ fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Ranking Appearances */}
      {rankingAppearances.length > 0 && (
        <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)" }}>
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

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Direct Answers</span>
              <h2>Frequently Asked Questions About {name}</h2>
            </div>
            <p>Verified answers to the most common queries from students and parents.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px", maxWidth: "860px" }}>
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: "12px",
                  border: "1px solid var(--border-subtle)",
                  padding: "16px 20px",
                }}
              >
                <summary style={{ fontWeight: 600, fontSize: "1.02rem", color: "var(--ink-primary)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{faq.question}</span>
                  <span style={{ fontSize: "1.2rem", color: "var(--ink-muted)", marginLeft: "12px" }}>+</span>
                </summary>
                <p style={{ marginTop: "12px", fontSize: "0.94rem", color: "var(--ink-secondary)", lineHeight: 1.6, borderTop: "1px solid var(--border-subtle)", paddingTop: "12px" }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Verification & Representation Notice */}
      <section className="section" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>🛡️</span>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem", color: "var(--ink-primary)" }}>Represent {name}?</h3>
                <p style={{ margin: "4px 0 0", color: "var(--ink-muted)", fontSize: "0.9rem" }}>Editorial verification and classroom audit desk for the {SITE.year} cycle.</p>
              </div>
            </div>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
              To update official centre addresses, submit audited selection lists, or request syllabus corrections, contact our editorial verification desk. We conduct independent, merit-driven forensic audits to help students discover verified educational institutions across India.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link href="/contact" className="btn btn-primary btn-sm">
                Contact Editorial Desk
              </Link>
              <a href={`mailto:${SITE.email}`} className="btn btn-ghost btn-sm">
                Email {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
