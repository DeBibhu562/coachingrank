import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_RANKINGS, formatExamName } from '@/data/rankings';
import { RankingCards } from '@/components/RankingUI';
import SearchFilter from '@/components/SearchFilter';
import HubSidebar from '@/components/HubSidebar';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'All Coaching Rankings & National Shortlists | 2027 Directory',
  description:
    'Browse verified national and city coaching rankings across CLAT, AILET, DU LLB, UPSC, IPMAT, share market and more on CoachingRank.in.',
  alternates: { canonical: '/rankings' },
};

export default function RankingsIndexPage() {
  const national = ALL_RANKINGS.filter((r) => !r.city && !r.criterion).slice(0, 24);
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
            <span>2027 Audit Directory · 230+ Verified Portals</span>
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

      {/* Main Hub Two-Column Layout */}
      <section className="section" style={{ paddingTop: '28px' }}>
        <div className="container">
          <div className="hub-layout">
            {/* Professional Responsive Left Sidebar */}
            <div className="hub-sidebar-wrapper">
              <HubSidebar currentPath="/rankings" />
            </div>

            {/* Main Content Area */}
            <div className="hub-main-content">
              {/* Flagship National Shortlists */}
              <div style={{ marginBottom: '48px' }}>
                <div className="section-head" style={{ marginBottom: '24px' }}>
                  <div className="section-head-info">
                    <span className="eyebrow">National Benchmarks</span>
                    <h2>Flagship National Shortlists ({national.length})</h2>
                  </div>
                  <p>Pan-India rankings audited for faculty pedigree, verified selections, and study material rigor.</p>
                </div>

                <RankingCards pages={national} />
              </div>

              {/* Filter by Exam Rail */}
              <div style={{ background: 'var(--bg-surface)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)', marginBottom: '32px' }}>
                <div className="section-head" style={{ marginBottom: '16px' }}>
                  <div className="section-head-info">
                    <span className="eyebrow">Exam Portals</span>
                    <h2>Browse Rankings By Entrance Exam</h2>
                  </div>
                  <p>Direct access to all 28+ verified competitive exam coaching benchmarks.</p>
                </div>

                <div className="filter-pills-row" style={{ justifyContent: 'flex-start', gap: '8px' }}>
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

                <p className="prose-lead" style={{ marginTop: '20px', fontSize: '0.92rem' }}>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
