import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_RANKINGS, formatExamName } from '@/data/rankings';
import { RankingCards } from '@/components/RankingUI';
import SearchFilter from '@/components/SearchFilter';

export const metadata: Metadata = {
  title: 'All Coaching Rankings & National Shortlists | 2026 Directory',
  description:
    'Browse verified national and city coaching rankings across CLAT, AILET, DU LLB, UPSC, IPMAT, share market and more on CoachingRank.in.',
  alternates: { canonical: '/rankings' },
};

export default function RankingsIndexPage() {
  const national = ALL_RANKINGS.filter((r) => !r.city && !r.criterion).slice(0, 18);
  const byExam = [...new Set(ALL_RANKINGS.map((r) => r.exam))].sort();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Rankings Directory</span>
          </nav>

          <div className="hero-status-pill">
            <span className="live-pulse-dot" />
            <span>2026 Audit Directory · 230+ Verified Portals</span>
          </div>

          <h1>National & Regional Coaching Directory</h1>
          <p className="prose-lead">
            Explore verified shortlists with #1 and #2 ranks across India’s premier competitive entrance exams and 32 city hubs.
          </p>

          <div style={{ marginTop: '24px' }}>
            <SearchFilter rankings={ALL_RANKINGS} showPills={false} placeholder="Filter rankings by name, exam or city..." />
          </div>
        </div>
      </section>

      {/* National Shortlists */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">National Benchmarks</span>
              <h2>Flagship National Shortlists</h2>
            </div>
            <p>Pan-India rankings audited for faculty pedigree, verified selections, and study material rigor.</p>
          </div>

          <RankingCards pages={national} cols3 />
        </div>
      </section>

      {/* Filter by Exam Rail */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Exam Portals</span>
              <h2>Browse By Entrance Exam</h2>
            </div>
          </div>

          <div className="filter-pills-row" style={{ justifyContent: 'flex-start' }}>
            {byExam.map((exam) => (
              <Link
                key={exam}
                href={`/exam/${exam}-coaching-rankings`}
                className="filter-pill"
                style={{ padding: '8px 16px' }}
              >
                <span>{formatExamName(exam)}</span>
                <span style={{ color: 'var(--brand-primary)' }}>→</span>
              </Link>
            ))}
          </div>

          <p className="prose-lead" style={{ marginTop: '24px', fontSize: '0.95rem' }}>
            Looking for city-level classroom rankings? Explore our{' '}
            <Link href="/city" className="text-link">
              32 Indian Coaching Cities
            </Link>{' '}
            or compare specific institutes in the{' '}
            <Link href="/compare" className="text-link">
              Comparison Engine
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
