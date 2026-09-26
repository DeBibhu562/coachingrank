import type { Metadata } from 'next';
import Link from 'next/link';
import { institutesIndex } from '@/data/rankings';

export const metadata: Metadata = {
  title: 'Ranked Coaching Institutes',
  description: 'Institute brand pages appearing across CoachingRank shortlists.',
  alternates: { canonical: '/institute' },
};

export default function InstituteIndexPage() {
  const institutes = institutesIndex().slice(0, 80);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Institutes</span>
          </nav>
          <h1>Ranked coaching institutes</h1>
          <p className="prose-lead">Brands on CoachingRank shortlists, sorted by best rank and coverage.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="chooser-list">
            {institutes.map((inst) => (
              <Link key={inst.slug} href={`/institute/${inst.slug}`} className="chooser-item">
                <div>
                  <h3>{inst.name}</h3>
                  <p>
                    Best rank #{inst.topRank} · listed on {inst.appearances} pages
                  </p>
                </div>
                <span className="chooser-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
