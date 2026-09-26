import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_RANKINGS, rankingPath } from '@/data/rankings';
import { RankingCards } from '@/components/RankingUI';

export const metadata: Metadata = {
  title: 'All Coaching Rankings',
  description:
    'Browse national and city coaching rankings across CLAT, AILET, DU LLB, UPSC, IPMAT, share market and more on CoachingRank.in.',
  alternates: { canonical: '/rankings' },
};

export default function RankingsIndexPage() {
  const national = ALL_RANKINGS.filter((r) => !r.city && !r.criterion).slice(0, 18);
  const byExam = [...new Set(ALL_RANKINGS.map((r) => r.exam))].sort();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Rankings</span>
          </nav>
          <h1>Coaching rankings directory</h1>
          <p className="prose-lead">National and city shortlists across major entrance exams.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">National lists</span>
              <h2>Flagship ranking pages</h2>
            </div>
          </div>
          <RankingCards pages={national} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Filter by exam</span>
              <h2>Every exam cluster</h2>
            </div>
          </div>
          <div className="link-rail">
            {byExam.map((exam) => (
              <Link key={exam} href={`/exam/${exam}-coaching-rankings`}>
                {exam.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
          <p className="stack-md prose-lead">
            {ALL_RANKINGS.length} ranking pages · example{' '}
            <Link href={rankingPath('best-clat-coaching-in-delhi')} className="text-link">
              /rankings/best-clat-coaching-in-delhi
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
