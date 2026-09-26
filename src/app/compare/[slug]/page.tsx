import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_RANKINGS, getRanking, rankingPath } from '@/data/rankings';
import { AnswerBlock, RankingTable } from '@/components/RankingUI';

type Props = { params: Promise<{ slug: string }> };

function rankingSlugFromCompare(slug: string) {
  return slug.endsWith('-comparison') ? slug.slice(0, -'-comparison'.length) : null;
}

export function generateStaticParams() {
  return ALL_RANKINGS.filter((r) => r.institutes.length >= 2).map((r) => ({
    slug: `${r.slug}-comparison`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rankingSlug = rankingSlugFromCompare(slug);
  const page = rankingSlug ? getRanking(rankingSlug) : undefined;
  if (!page) return {};
  const a = page.institutes[0]?.name;
  const b = page.institutes[1]?.name;
  return {
    title: `${a} vs ${b} Coaching Comparison | Head-to-Head 2026`,
    description: `Compare ${a} and ${b} side-by-side using the audited ${page.title} shortlist on CoachingRank.in.`,
    alternates: { canonical: `/compare/${slug}` },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const rankingSlug = rankingSlugFromCompare(slug);
  const page = rankingSlug ? getRanking(rankingSlug) : undefined;
  if (!page || page.institutes.length < 2) notFound();

  const a = page.institutes[0];
  const b = page.institutes[1];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/compare">Compare</Link>
            <span className="separator">/</span>
            <span className="current">
              {a.name} vs {b.name}
            </span>
          </nav>

          <span className="eyebrow">
            ⚖️ Head-to-Head Showdown · 2026 Audit
          </span>

          <h1>
            {a.name} <span style={{ color: 'var(--brand-primary)' }}>vs</span> {b.name}
          </h1>
          <p className="prose-lead">
            Comprehensive comparison between the top 2 ranked institutes for {page.title}.
          </p>

          <AnswerBlock page={page} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Side-by-side Cards */}
          <div className="compare-grid">
            <article className="compare-card top-rank">
              <div className="compare-card-head">
                <span className="medal-badge gold">#1</span>
                <span className="verified-pill">Top Overall Pick</span>
              </div>
              <h3>
                <Link href={`/institute/${a.slug}`}>{a.name}</Link>
              </h3>
              <p style={{ marginTop: '8px' }}>
                {a.blurb || 'Top-ranked on this CoachingRank shortlist based on faculty stability, results, and mock series.'}
              </p>
              <div style={{ marginTop: '16px' }}>
                <Link href={`/institute/${a.slug}`} className="btn btn-primary btn-sm">
                  View {a.name} Profile →
                </Link>
              </div>
            </article>

            <article className="compare-card">
              <div className="compare-card-head">
                <span className="medal-badge silver">#2</span>
                <span className="verified-pill" style={{ color: 'var(--ink-secondary)', background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-medium)' }}>
                  Runner-Up Benchmark
                </span>
              </div>
              <h3>
                <Link href={`/institute/${b.slug}`}>{b.name}</Link>
              </h3>
              <p style={{ marginTop: '8px' }}>
                {b.blurb || 'Second-ranked on this CoachingRank shortlist with proven track record and national footprint.'}
              </p>
              <div style={{ marginTop: '16px' }}>
                <Link href={`/institute/${b.slug}`} className="btn btn-ghost btn-sm">
                  View {b.name} Profile →
                </Link>
              </div>
            </article>
          </div>

          {/* Full Shortlist Table */}
          <div style={{ marginTop: '48px' }}>
            <div className="section-head">
              <div className="section-head-info">
                <span className="eyebrow">Complete Hub</span>
                <h2>Full {page.title} Shortlist</h2>
              </div>
              <Link href={rankingPath(page.slug)} className="btn btn-ghost btn-sm">
                Open Full Ranking Hub →
              </Link>
            </div>
            <RankingTable page={page} />
          </div>
        </div>
      </section>
    </>
  );
}
