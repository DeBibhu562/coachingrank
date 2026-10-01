import type { Metadata } from 'next';
import Link from 'next/link';
import { PRIORITY_EXAMS } from '@/data/site';
import { listExams, formatExamName, getRankingsByExam } from '@/data/rankings';
import HubSidebar from '@/components/HubSidebar';

export const metadata: Metadata = {
  title: 'Exam Coaching Ranking Hubs | All 28+ Entrance Tests',
  description: 'Exam-wise coaching ranking hubs for CLAT, AILET, DU LLB, UPSC, IPMAT, share market and more on CoachingRank.in.',
  alternates: { canonical: '/exam' },
};

export default function ExamIndexPage() {
  const allExams = listExams();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Exam Hubs</span>
          </nav>

          <div className="hero-status-pill">
            <span className="live-pulse-dot" />
            <span>2027 Admissions · 28+ Audited Competitions</span>
          </div>

          <h1>Competitive Exam Coaching Hubs</h1>
          <p className="prose-lead">
            Select your target exam to access audited national benchmarks, city-specific classroom shortlists, and criterion filters.
          </p>
        </div>
      </section>

      {/* Main Two-Column Hub Layout */}
      <section className="section" style={{ paddingTop: '28px' }}>
        <div className="container">
          <div className="hub-layout">
            {/* Left Responsive Sticky Sidebar */}
            <div className="hub-sidebar-wrapper">
              <HubSidebar currentPath="/exam" />
            </div>

            {/* Right Main Content */}
            <div className="hub-main-content">
              {/* Priority Flagship Exams */}
              <div style={{ marginBottom: '40px' }}>
                <div className="section-head" style={{ marginBottom: '20px' }}>
                  <div className="section-head-info">
                    <span className="eyebrow">Flagship Portals</span>
                    <h2>Priority Entrance Exams ({PRIORITY_EXAMS.length})</h2>
                  </div>
                  <p>Our most detailed research hubs featuring verified classroom audits, selection verification, and faculty tracking.</p>
                </div>

                <div className="exam-portals-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                  {PRIORITY_EXAMS.map((e) => (
                    <Link key={e.slug} href={e.hub} className="exam-portal-card">
                      <div className="exam-portal-top">
                        <span className="exam-portal-cat">{e.category}</span>
                        <span className="exam-portal-score">{e.benchmarkScore}</span>
                      </div>

                      <h3 className="exam-portal-title">{e.label}</h3>
                      <p className="exam-portal-desc">{e.tagline}</p>

                      <div className="exam-portal-footer">
                        <div className="exam-portal-stat">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          <span>{e.intakeStat}</span>
                        </div>
                        <span className="exam-portal-arrow">
                          Audit Hub →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* All Exams Directory */}
              <div style={{ background: 'var(--bg-surface)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                <div className="section-head" style={{ marginBottom: '20px' }}>
                  <div className="section-head-info">
                    <span className="eyebrow">Comprehensive Directory</span>
                    <h2>All {allExams.length} Exam Portals</h2>
                  </div>
                  <p>Click on any entrance exam below to view national rankings, city hubs, and institute scorecards.</p>
                </div>

                <div className="filter-pills-row" style={{ justifyContent: 'flex-start', gap: '10px' }}>
                  {allExams.map((exam) => {
                    const count = getRankingsByExam(exam).length;
                    return (
                      <Link
                        key={exam}
                        href={`/exam/${exam}-coaching-rankings`}
                        className="filter-pill"
                        style={{ padding: '9px 16px', fontSize: '0.9rem' }}
                      >
                        <span style={{ fontWeight: 700 }}>{formatExamName(exam)}</span>
                        <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>({count})</span>
                        <span style={{ color: 'var(--brand-primary)', fontWeight: '800' }}>→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
