import type { Metadata } from 'next';
import Link from 'next/link';
import { PRIORITY_EXAMS } from '@/data/site';
import { listExams } from '@/data/rankings';

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
          <h1>Competitive Exam Coaching Hubs</h1>
          <p className="prose-lead">
            Select your target exam to access national audits, city-specific classroom shortlists, and criterion filters.
          </p>
        </div>
      </section>

      {/* Priority Flagship Exams */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Flagship Clusters</span>
              <h2>Priority Entrance Exams</h2>
            </div>
            <p>Our most detailed research hubs featuring verified classroom audits and faculty tracking.</p>
          </div>

          <div className="chooser-grid">
            {PRIORITY_EXAMS.map((e) => (
              <Link key={e.slug} href={e.hub} className="exam-card">
                <div className="exam-card-info">
                  <span className="exam-card-badge">National & City Hub</span>
                  <h3>{e.label} Coaching</h3>
                  <p>National rankings, city hubs & criterion filters</p>
                </div>
                <div className="exam-card-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Exams Directory */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Comprehensive Directory</span>
              <h2>All {allExams.length} Exam Clusters</h2>
            </div>
            <p>Click on any examination below to view rankings, benchmarks, and institute comparisons.</p>
          </div>

          <div className="filter-pills-row" style={{ justifyContent: 'flex-start', gap: '10px' }}>
            {allExams.map((exam) => (
              <Link
                key={exam}
                href={`/exam/${exam}-coaching-rankings`}
                className="filter-pill"
                style={{ padding: '10px 18px', fontSize: '0.92rem' }}
              >
                <span>{exam.replace(/-/g, ' ').toUpperCase()}</span>
                <span style={{ color: 'var(--brand-primary)', fontWeight: '800' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
