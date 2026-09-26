import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCriterionRankings } from '@/data/rankings';
import { RankingCards } from '@/components/RankingUI';

type Props = { params: Promise<{ slug: string }> };

function criterionFromSlug(slug: string) {
  const m = slug.match(/^best-coaching-as-per-(.+)$/);
  return m?.[1] ?? null;
}

export function generateStaticParams() {
  const criteria = [...new Set(getCriterionRankings().map((p) => p.criterion).filter(Boolean) as string[])];
  return criteria.map((c) => ({ slug: `best-coaching-as-per-${c}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const criterion = criterionFromSlug(slug);
  if (!criterion) return {};
  const label = criterion.replace(/-/g, ' ');
  return {
    title: `Best coaching as per ${label}`,
    description: `Criterion hub for coaching rankings judged by ${label}.`,
    alternates: { canonical: `/criterion/${slug}` },
  };
}

export default async function CriterionHubPage({ params }: Props) {
  const { slug } = await params;
  const criterion = criterionFromSlug(slug);
  const pages = getCriterionRankings().filter((p) => p.criterion === criterion);
  if (!criterion || pages.length === 0) notFound();
  const label = criterion.replace(/-/g, ' ');

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/criterion">Criterion</Link>
            <span>/</span>
            <span>{label}</span>
          </nav>
          <h1>Best coaching as per {label}</h1>
          <aside className="answer-block">
            <strong>Direct answer</strong>
            <p>These shortlists reorder institutes using the {label} lens across exams and cities.</p>
          </aside>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <RankingCards pages={pages} />
        </div>
      </section>
    </>
  );
}
