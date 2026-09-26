import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCriterionRankings } from '@/data/rankings';
import { RankingCards } from '@/components/RankingUI';

type Props = { params: Promise<{ slug: string }> };

function criterionFromSlug(slug: string) {
  const m = slug.match(/^best-coaching-as-per-(.+)$/);
  return m?.[1] ?? null;
}

export function generateStaticParams() {
  const criteria = [...new Set(getCriterionRankings().map((p) => p.criterion).filter(Boolean) as string[])];
  return criteria.map((c) => ({ slug: `best-coaching-as-per-${c}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const criterion = criterionFromSlug(slug);
  if (!criterion) return {};
  const label = criterion.replace(/-/g, ' ');
  return {
    title: `Best Coaching as per ${label.toUpperCase()} | 2026 Rankings`,
    description: `Audited coaching rankings judged strictly by ${label}. Compare institutes based on verifiable performance evidence.`,
    alternates: { canonical: `/criterion/${slug}` },
  };
}

export default async function CriterionHubPage({ params }: Props) {
  const { slug } = await params;
  const criterion = criterionFromSlug(slug);
  const pages = getCriterionRankings().filter((p) => p.criterion === criterion);
  if (!criterion || pages.length === 0) notFound();
  const label = criterion.replace(/-/g, ' ');

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/criterion">Criterion Hubs</Link>
            <span className="separator">/</span>
            <span className="current" style={{ textTransform: 'capitalize' }}>{label}</span>
          </nav>

          <span className="eyebrow">
            🎯 Criterion Audit · 2026
          </span>

          <h1 style={{ textTransform: 'capitalize' }}>Best Coaching as per {label}</h1>
          <p className="prose-lead">
            Dedicated rankings evaluating coaching institutes specifically through the lens of {label}.
          </p>

          <div className="answer-box">
            <div className="answer-header">
              <span className="answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Direct Answer
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Audited 2026</span>
            </div>
            <p className="answer-text">
              These {pages.length} shortlists reorder coaching academies across Indian cities based on verified{' '}
              {label.toUpperCase()} data, highlighting centres that prioritize excellence in this specific area.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Audited Portals</span>
              <h2>{pages.length} Ranking Hubs Filtered by {label.toUpperCase()}</h2>
            </div>
            <p>Click any card to view the specific ranking table and student feedback.</p>
          </div>

          <RankingCards pages={pages} cols3 />
        </div>
      </section>
    </>
  );
}
