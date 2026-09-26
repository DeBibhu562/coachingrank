import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_RANKINGS, getRanking } from '@/data/rankings';
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
    title: `${a} vs ${b} coaching comparison`,
    description: `Compare ${a} and ${b} using the ${page.title} shortlist on CoachingRank.in.`,
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
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/compare">Compare</Link>
            <span>/</span>
            <span>
              {a.name} vs {b.name}
            </span>
          </nav>
          <h1>
            {a.name} vs {b.name}
          </h1>
          <AnswerBlock page={page} />
        </div>
      </section>
      <section className="section section-tight">
        <div className="container">
          <div className="compare-duo">
            <article className="compare-side top">
              <h3>
                #{a.rank} {a.name}
              </h3>
              <p>{a.blurb || 'Top-ranked on this CoachingRank shortlist.'}</p>
            </article>
            <article className="compare-side">
              <h3>
                #{b.rank} {b.name}
              </h3>
              <p>{b.blurb || 'Second on this CoachingRank shortlist.'}</p>
            </article>
          </div>
          <RankingTable page={page} />
        </div>
      </section>
    </>
  );
}
