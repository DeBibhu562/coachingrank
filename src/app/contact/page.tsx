import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/data/site';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Editorial Desk | Corrections, Updates & Verification',
  description:
    'Contact the CoachingRank.in editorial and research desk for institute corrections, campus audits, partnerships, or general queries.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Contact Desk</span>
          </nav>

          <span className="eyebrow">
            ✉️ Editorial & Verification Support · 2026
          </span>

          <h1>Contact CoachingRank.in</h1>
          <p className="prose-lead">
            Reach out to our research desk for institute verification, ranking corrections, student feedback, or general
            inquiries.
          </p>

          <div className="answer-box">
            <div className="answer-header">
              <span className="answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Direct Answer
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Response: 24–48 Hours</span>
            </div>
            <p className="answer-text">
              Direct email:{' '}
              <a href={`mailto:${SITE.email}`} className="text-link" style={{ fontWeight: '700' }}>
                {SITE.email}
              </a>{' '}
              for editorial corrections, audited classroom roll numbers, and official ranking questions.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Interactive Form */}
            <ContactForm />

            {/* Direct Contact Info Sidebar */}
            <div className="contact-info-panel">
              <div className="info-box">
                <h4>Editorial & Audits Desk</h4>
                <p>
                  <a href={`mailto:${SITE.email}`} className="text-link">
                    {SITE.email}
                  </a>
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', display: 'block', marginTop: '4px' }}>
                  For methodology feedback, ranking audit submissions, and NLU/IIT selection proof.
                </span>
              </div>

              <div className="info-box">
                <h4>Institute Verification</h4>
                <p>Campus & Faculty Rosters</p>
                <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', display: 'block', marginTop: '4px' }}>
                  Institutes requesting profile updates must provide physical classroom walk-in addresses and official GST
                  receipt cards.
                </span>
              </div>

              <div className="info-box" style={{ background: 'var(--bg-surface-subtle)' }}>
                <h4>Response SLA</h4>
                <p style={{ color: 'var(--brand-primary)', fontWeight: '700' }}>24 to 48 Business Hours</p>
                <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', display: 'block', marginTop: '4px' }}>
                  Our team reviews all incoming inquiries during Indian standard business hours (Monday–Friday).
                </span>
              </div>

              <div className="info-box">
                <h4>Learn Our Standards</h4>
                <p>
                  <Link href="/about" className="text-link">
                    Read Our 5-Point Scoring Rubric →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
