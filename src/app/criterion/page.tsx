import type { Metadata } from 'next';
import Link from 'next/link';
import { getCriterionRankings, rankingPath } from '@/data/rankings';

export const metadata: Metadata = {
  title: 'Coaching Rankings by Criterion',
  description: 'Criterion-wise coaching rankings — results, faculty, mocks, alumni and more.',
  alternates: { canonical: '/criterion' },
};

export default function CriterionIndexPage() {
  const pages = getCriterionRankings();
  const criteria = [...new Set(pages.map((p) => p.criterion).filter(Boolean) as string[])].sort();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Criterion</span>
          </nav>
          <h1>Rankings by criterion</h1>
          <p className="prose-lead">
            Shortlists focused on one factor — toppers, faculty, mocks, batch size and more.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Lenses</span>
              <h2>Browse by criterion</h2>
            </div>
          </div>
          <div className="chooser-list chooser-grid">
            {criteria.map((c) => (
              <Link key={c} href={`/criterion/best-coaching-as-per-${c}`} className="chooser-item">
                <div>
                  <h3>{c.replace(/-/g, ' ')}</h3>
                  <p>Rankings judged by this factor</p>
                </div>
                <span className="chooser-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>

          <div className="stack-lg">
            <span className="eyebrow">All criterion pages</span>
            <div className="link-rail stack-sm">
              {pages.slice(0, 40).map((p) => (
                <Link key={p.slug} href={rankingPath(p.slug)}>
                  {p.title.replace(/\s+\|.*/, '').slice(0, 52)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
