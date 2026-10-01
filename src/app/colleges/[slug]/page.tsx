import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COLLEGES, getCollegeBySlug } from '@/data/colleges';
import { SITE } from '@/data/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COLLEGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) return {};

  const title = `${college.name} Review 2027 – NIRF #${college.nirfRank}, Fees, Cutoff & Placements | CoachingRank`;
  const description = `${college.name} (${college.shortName}) is ranked NIRF #${college.nirfRank} in India for ${college.streamLabel}. Explore verified annual fees (${college.annualFeeRange}), ${college.entranceExam} admission criteria, median CTC (${college.medianPackageLPA}), and editorial audit scorecard.`;

  return {
    title,
    description,
    alternates: { canonical: `/colleges/${slug}` },
    openGraph: {
      title: `${college.shortName} – NIRF #${college.nirfRank} Review & Audit Scorecard 2027`,
      description,
      url: `${SITE.url}/colleges/${slug}`,
      type: 'article',
    },
  };
}

export default async function CollegeProfilePage({ params }: Props) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);

  if (!college) {
    notFound();
  }

  const fullAddress = `${college.address.street}, ${college.address.city}, ${college.address.state} ${college.address.pin}, ${college.address.country}`;

  /* JSON-LD Schemas */
  const schemaOrg = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollegeOrUniversity',
      name: college.name,
      alternateName: [college.shortName],
      url: college.website,
      description: college.directAnswer,
      foundingDate: String(college.established),
      address: {
        '@type': 'PostalAddress',
        streetAddress: college.address.street,
        addressLocality: college.address.city,
        addressRegion: college.address.state,
        postalCode: college.address.pin,
        addressCountry: college.address.country,
      },
      telephone: college.phone,
      email: college.email,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(college.rating),
        reviewCount: String(college.reviewCount),
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: college.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
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
            <Link href="/colleges">Colleges</Link>
            <span className="separator">/</span>
            <span className="current">{college.shortName}</span>
          </nav>

          <span className="eyebrow">
            🏛️ NIRF Rank #{college.nirfRank} · {college.streamLabel} Audit · {SITE.year}
          </span>

          <h1>{college.name}</h1>
          <p className="prose-lead">{college.headline}</p>

          {/* Trust Metrics Grid */}
          <div className="trust-metrics" style={{ marginTop: '24px', paddingTop: '20px' }}>
            <div className="metric-card">
              <span className="metric-num" style={{ color: 'var(--brand-primary)' }}>
                NIRF #{college.nirfRank}
              </span>
              <span className="metric-label">National Ranking</span>
            </div>
            <div className="metric-card">
              <span className="metric-num" style={{ color: '#15803d' }}>
                {college.medianPackageLPA}
              </span>
              <span className="metric-label">Median Package</span>
            </div>
            <div className="metric-card">
              <span className="metric-num" style={{ color: '#d97706' }}>
                ★ {college.rating}
              </span>
              <span className="metric-label">{college.reviewCount}+ Verified Reviews</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">{college.inspectionScore}/100</span>
              <span className="metric-label">Audit Scorecard</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">{college.established}</span>
              <span className="metric-label">Year Established</span>
            </div>
          </div>

          {/* Direct Answer Box */}
          <div className="answer-box">
            <div className="answer-header">
              <span className="answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Direct Answer
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Verified Institutional Data {SITE.year}</span>
            </div>
            <p className="answer-text">{college.directAnswer}</p>
          </div>
        </div>
      </section>

      {/* At A Glance 12-Card Grid */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Institutional Overview</span>
              <h2>At a Glance: Key Admissions & Campus Facts</h2>
            </div>
            <p>Verified campus location, official contact numbers, fees, and admission parameters.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '24px' }}>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Official Address</span>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '6px', color: 'var(--ink-primary)' }}>{fullAddress}</p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admissions Phone</span>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '6px', color: 'var(--brand-primary)' }}>
                <a href={`tel:${college.phone.replace(/[^0-9+]/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{college.phone}</a>
              </p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Official Email</span>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '6px', color: 'var(--ink-primary)' }}>
                <a href={`mailto:${college.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{college.email}</a>
              </p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Official Website</span>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '6px', color: 'var(--brand-primary)' }}>
                <a href={college.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Visit Portal ↗</a>
              </p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Primary Entrance Exam</span>
              <p style={{ fontWeight: 600, fontSize: '1rem', marginTop: '6px', color: 'var(--ink-primary)' }}>{college.entranceExam}</p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Annual Tuition Range</span>
              <p style={{ fontWeight: 600, fontSize: '1rem', marginTop: '6px', color: '#15803d' }}>{college.annualFeeRange}</p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hostel & Living Cost</span>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '6px', color: 'var(--ink-primary)' }}>{college.hostelFeeAnnual}</p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Median Placement Package</span>
              <p style={{ fontWeight: 600, fontSize: '1rem', marginTop: '6px', color: '#15803d' }}>{college.medianPackageLPA}</p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Highest Package Recorded</span>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '6px', color: 'var(--ink-primary)' }}>{college.highestPackageLPA}</p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Campus Area</span>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '6px', color: 'var(--ink-primary)' }}>{college.campusAcres}</p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Student-to-Faculty Ratio</span>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '6px', color: 'var(--ink-primary)' }}>{college.studentFacultyRatio}</p>
            </div>
            <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>NAAC / Accreditation</span>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '6px', color: 'var(--ink-primary)' }}>{college.naacGrade} Grade ({college.ownership})</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Criteria Forensic Audit Scorecard */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Academic Scorecard</span>
              <h2>CoachingRank Forensic Audit: 8 Quality Dimensions</h2>
            </div>
            <p>Comprehensive institutional review based on verified government and independent data.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '24px' }}>
            {college.auditScorecard.map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1rem', color: 'var(--ink-primary)', margin: 0 }}>{item.criterion}</h3>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--brand-primary)' }}>{item.score}/10</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden', margin: '8px 0' }}>
                  <div style={{ width: `${(item.score / 10) * 100}%`, height: '100%', background: 'var(--brand-primary)', borderRadius: '3px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: '8px' }}>
                  <span>Weight: {item.weight}</span>
                  <span style={{ color: '#15803d', fontWeight: 600 }}>Audited Dimension</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.5, margin: 0 }}>{item.verdict}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Degree Catalog</span>
              <h2>Flagship Academic Programs & Fee Structures</h2>
            </div>
            <p>Degree options, durations, annual tuition fees, seat capacities, and admission prerequisites.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '24px' }}>
            {college.programs.map((p, idx) => (
              <div key={idx} style={{ background: 'var(--bg-elevated)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ background: 'rgba(37,99,235,0.08)', color: 'var(--brand-primary)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {p.duration} · {p.degree}
                  </span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#15803d' }}>
                    {p.annualFee}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.18rem', marginBottom: '8px', color: 'var(--ink-primary)' }}>{p.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '12px' }}>
                  Total Intake: <strong>{p.seats} Seats</strong>
                </p>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.6, flex: 1 }}>
                  <strong>Eligibility & Entrance:</strong> {p.eligibility}
                </p>
                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                  <a href={college.website} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                    View Official Syllabus & Admissions ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators & Campus Stature */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Institutional Heritage</span>
              <h2>Why {college.shortName} Stands Out</h2>
            </div>
            <p>Distinctive pedagogical advantages, research laboratories, and placement traditions.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '24px' }}>
            {college.differentiators.map((d, idx) => (
              <div key={idx} style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{d.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--ink-primary)' }}>{d.title}</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Recruiters Banner */}
      {college.topRecruiters.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <div className="section-head">
              <div className="section-head-info">
                <span className="eyebrow">Career Outcomes</span>
                <h2>Premier Placement Partners & Top Recruiters</h2>
              </div>
              <p>Key corporate entities, magic circle law firms, hospital networks, and research labs recruiting on campus.</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
              {college.topRecruiters.map((recruiter, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: 'var(--ink-primary)',
                  }}
                >
                  ✓ {recruiter}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Direct Answers</span>
              <h2>Frequently Asked Questions About {college.shortName}</h2>
            </div>
            <p>Verified admissions facts, rank cutoffs, and fee transparency queries.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px', maxWidth: '860px' }}>
            {college.faqs.map((faq, idx) => (
              <details
                key={idx}
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  padding: '16px 20px',
                }}
              >
                <summary style={{ fontWeight: 600, fontSize: '1.02rem', color: 'var(--ink-primary)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{faq.question}</span>
                  <span style={{ fontSize: '1.2rem', color: 'var(--ink-muted)', marginLeft: '12px' }}>+</span>
                </summary>
                <p style={{ marginTop: '12px', fontSize: '0.94rem', color: 'var(--ink-secondary)', lineHeight: 1.6, borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Office Contact Card */}
      <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>📞</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--ink-primary)' }}>Official Admissions Contact Desk</h3>
                <p style={{ margin: '4px 0 0', color: 'var(--ink-muted)', fontSize: '0.9rem' }}>Contact {college.shortName} directly for verified counseling and intake queries.</p>
              </div>
            </div>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Campus Address: <strong>{fullAddress}</strong><br />
              Official Website: <strong>{college.website}</strong><br />
              Official Email: <strong>{college.email}</strong>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a href={`tel:${college.phone.replace(/[^0-9+]/g, '')}`} className="btn btn-primary btn-sm">
                Call {college.phone}
              </a>
              <a href={`mailto:${college.email}`} className="btn btn-ghost btn-sm">
                Email Admissions Desk
              </a>
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                Visit Official Portal ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
