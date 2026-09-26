import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact CoachingRank.in at ${SITE.email}`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <section className="page-hero">
      <div className="container pad-bottom">
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Contact</span>
        </nav>
        <h1>Contact CoachingRank</h1>
        <aside className="answer-block">
          <strong>Direct answer</strong>
          <p>
            Email{' '}
            <a href={`mailto:${SITE.email}`} className="text-link">
              {SITE.email}
            </a>{' '}
            for corrections, institute updates, partnerships and ranking questions.
          </p>
        </aside>
        <div className="stack-md">
          <span className="eyebrow">Editorial & support</span>
          <p className="prose-body">
            <a href={`mailto:${SITE.email}`} className="text-link">
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
