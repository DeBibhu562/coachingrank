import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'About CoachingRank',
  description: SITE.description,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <section className="page-hero">
      <div className="container pad-bottom">
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>About</span>
        </nav>
        <h1>About {SITE.name}.in</h1>
        <aside className="answer-block">
          <strong>Direct answer</strong>
          <p>
            CoachingRank is an independent rankings site for “best coaching” queries — exam hubs, city hubs and
            shortlists students can trust.
          </p>
        </aside>
        <p className="prose-body stack-md">{SITE.description}</p>
        <p className="prose-body">
          Contact:{' '}
          <a href={`mailto:${SITE.email}`} className="text-link">
            {SITE.email}
          </a>
        </p>
      </div>
    </section>
  );
}
