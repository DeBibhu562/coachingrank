import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_RANKINGS, rankingPath } from '@/data/rankings';

export const metadata: Metadata = {
  title: 'Compare Coaching Shortlists',
  description: 'Compare coaching institutes using CoachingRank shortlists for fees, faculty, results and more.',
  alternates: { canonical: '/compare' },
};

export default function CompareIndexPage() {
  const pages = ALL_RANKINGS.filter((r) => !r.criterion && r.institutes.length >= 2).slice(0, 24);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Compare</span>
          </nav>
          <h1>Compare coaching shortlists</h1>
          <p className="prose-lead">Side-by-side #1 vs #2 from each ranking shortlist.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="chooser-list">
            {pages.map((p) => (
              <Link key={p.slug} href={`/compare/${p.slug}-comparison`} className="chooser-item">
                <div>
                  <h3>
                    {p.institutes[0]?.name} vs {p.institutes[1]?.name}
                  </h3>
                  <p>{p.title}</p>
                </div>
                <span className="chooser-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
          <p className="stack-md prose-lead">
            Prefer the full list?{' '}
            <Link href={rankingPath('best-clat-coaching')} className="text-link">
              Open CLAT rankings
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
