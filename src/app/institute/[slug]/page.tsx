import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_RANKINGS, institutesIndex, rankingPath } from '@/data/rankings';
import { SITE } from '@/data/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return institutesIndex().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const inst = institutesIndex().find((i) => i.slug === slug);
  if (!inst) return {};
  return {
    title: `${inst.name} Coaching Rankings, Audits & Scorecard | 2026`,
    description: `${inst.name} appears on CoachingRank shortlists with a peak rank of #${inst.topRank} across ${inst.appearances} ranking pages.`,
    alternates: { canonical: `/institute/${slug}` },
  };
}

function getBadgeStyle(rank: number) {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return 'bronze';
  return 'rest';
}

export default async function InstitutePage({ params }: Props) {
  const { slug } = await params;
  const inst = institutesIndex().find((i) => i.slug === slug);
  if (!inst) notFound();

  const appearances = ALL_RANKINGS.filter((p) => p.institutes.some((i) => i.slug === slug)).map((p) => {
    const row = p.institutes.find((i) => i.slug === slug)!;
    return { page: p, rank: row.rank, blurb: row.blurb };
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: inst.name,
    url: `${SITE.url}/institute/${inst.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/institute">Institutes</Link>
            <span className="separator">/</span>
            <span className="current">{inst.name}</span>
          </nav>

          <span className="eyebrow">
            🏛️ Audited Institute Scorecard · {SITE.year}
          </span>

          <h1>{inst.name}</h1>
          <p className="prose-lead">
            Comprehensive audit scorecard, historical rankings, and classroom appearances across India.
          </p>

          {/* Institute Metrics Overview */}
          <div className="trust-metrics" style={{ marginTop: '24px', paddingTop: '20px' }}>
            <div className="metric-card">
              <span className="metric-num" style={{ color: 'var(--brand-primary)' }}>
                #{inst.topRank}
              </span>
              <span className="metric-label">Peak Audited Rank</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">{inst.appearances}</span>
              <span className="metric-label">Shortlists Featured</span>
            </div>
            <div className="metric-card">
              <span className="metric-num" style={{ color: '#15803d' }}>100%</span>
              <span className="metric-label">Verified Classroom</span>
            </div>
            <div className="metric-card">
              <span className="metric-num">{SITE.year}</span>
              <span className="metric-label">Editorial Audit Cycle</span>
            </div>
          </div>

          <div className="answer-box">
            <div className="answer-header">
              <span className="answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Direct Answer
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Verified 2026</span>
            </div>
            <p className="answer-text">
              {inst.name} holds a peak CoachingRank audit position of #{inst.topRank} and is currently featured across{' '}
              {inst.appearances} verified ranking shortlists across national, city, and criterion hubs.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Track Record</span>
              <h2>Verified Ranking Appearances ({appearances.length})</h2>
            </div>
            <p>Every hub where {inst.name} has undergone an editorial audit and received an official rank.</p>
          </div>

          <div className="chooser-grid">
            {appearances.slice(0, 45).map(({ page, rank, blurb }) => (
              <div key={page.slug} className="exam-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className={`medal-badge ${getBadgeStyle(rank)}`} style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                    #{rank}
                  </span>
                  <span className="exam-card-badge">
                    {page.city ? `${page.city} · ` : ''}{page.exam.toUpperCase()}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', lineHeight: '1.35', marginBottom: '8px' }}>
                  <Link href={rankingPath(page.slug)} style={{ color: 'var(--ink-primary)' }}>
                    #{rank} on {page.title.replace(/\s+2026.*/, '').replace(/\s+\|.*/, '')}
                  </Link>
                </h3>

                {blurb && (
                  <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: '1.5', flex: 1 }}>
                    {blurb}
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

          {/* Desk Notice */}
          <div className="info-box" style={{ marginTop: '48px', padding: '24px', background: 'var(--bg-surface)' }}>
            <h4 style={{ color: 'var(--brand-primary)', marginBottom: '6px' }}>Represent {inst.name}?</h4>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.94rem', lineHeight: '1.6' }}>
              To update campus locations, submit audited selection rolls, or request faculty updates for the {SITE.year}{' '}
              audit cycle, contact our editorial desk via{' '}
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
