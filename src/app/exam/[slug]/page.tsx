import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRankingsByExam, listExams, rankingPath } from '@/data/rankings';
import { RankingCards } from '@/components/RankingUI';

type Props = { params: Promise<{ slug: string }> };

function examFromSlug(slug: string) {
  const m = slug.match(/^(.+)-coaching-rankings$/);
  return m?.[1] ?? null;
}

export function generateStaticParams() {
  return listExams().map((exam) => ({ slug: `${exam}-coaching-rankings` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = examFromSlug(slug);
  if (!exam) return {};
  const label = exam.replace(/-/g, ' ');
  return {
    title: `${label} coaching rankings hub`,
    description: `Explore ${label} coaching rankings by city and criterion on CoachingRank.in.`,
    alternates: { canonical: `/exam/${slug}` },
  };
}

export default async function ExamHubPage({ params }: Props) {
  const { slug } = await params;
  const exam = examFromSlug(slug);
  if (!exam || !listExams().includes(exam)) notFound();

  const pages = getRankingsByExam(exam);
  const national = pages.filter((p) => !p.city && !p.criterion);
  const cities = pages.filter((p) => p.city && !p.criterion);
  const criteria = pages.filter((p) => p.criterion);
  const label = exam.replace(/-/g, ' ');

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/exam">Exam</Link>
            <span>/</span>
            <span>{label}</span>
          </nav>
          <h1>{label} coaching rankings</h1>
          <aside className="answer-block">
            <strong>Direct answer</strong>
            <p>
              CoachingRank’s {label} hub groups national, city and criterion shortlists
              {national[0]?.institutes[0]
                ? ` — national #1 is ${national[0].institutes[0].name}${national[0].institutes[1] ? `, #2 ${national[0].institutes[1].name}` : ''}`
                : ''}
              .
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {national.length > 0 ? (
            <>
              <div className="section-head">
                <div>
                  <span className="eyebrow">National</span>
                  <h2>Flagship {label} lists</h2>
                </div>
              </div>
              <RankingCards pages={national} />
            </>
          ) : null}

          {cities.length > 0 ? (
            <div className="stack-lg">
              <div className="section-head">
                <div>
                  <span className="eyebrow">Cities</span>
                  <h2>{label} coaching by city</h2>
                </div>
              </div>
              <RankingCards pages={cities} />
            </div>
          ) : null}

          {criteria.length > 0 ? (
            <div className="stack-lg">
              <span className="eyebrow">By criterion</span>
              <div className="link-rail stack-sm">
                {criteria.map((p) => (
                  <Link key={p.slug} href={rankingPath(p.slug)}>
                    {p.criterion?.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
