import type { Metadata } from 'next';
import Link from 'next/link';
import { PRIORITY_EXAMS } from '@/data/site';
import { listExams } from '@/data/rankings';

export const metadata: Metadata = {
  title: 'Exam Coaching Ranking Hubs',
  description: 'Exam-wise coaching ranking hubs for CLAT, AILET, DU LLB, UPSC, IPMAT, share market and more.',
  alternates: { canonical: '/exam' },
};

export default function ExamIndexPage() {
  const exams = listExams();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Exam hubs</span>
          </nav>
          <h1>Exam coaching ranking hubs</h1>
          <p className="prose-lead">Pick an exam to open national, city and criterion shortlists.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Priority</span>
              <h2>Start here</h2>
            </div>
          </div>
          <div className="chooser-list chooser-grid">
            {PRIORITY_EXAMS.map((e) => (
              <Link key={e.slug} href={e.hub} className="chooser-item">
                <div>
                  <h3>{e.label}</h3>
                  <p>Open the {e.label} coaching rankings hub</p>
                </div>
                <span className="chooser-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>

          <div className="stack-lg">
            <span className="eyebrow">All exams</span>
            <div className="link-rail stack-sm">
              {exams.map((exam) => (
                <Link key={exam} href={`/exam/${exam}-coaching-rankings`}>
                  {exam.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
