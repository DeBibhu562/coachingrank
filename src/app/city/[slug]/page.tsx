import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCityRankings, listCities } from '@/data/rankings';
import { RankingCards } from '@/components/RankingUI';

type Props = { params: Promise<{ slug: string }> };

function cityFromSlug(slug: string) {
  const m = slug.match(/^best-coaching-institutes-in-(.+)$/);
  return m?.[1] ?? null;
}

export function generateStaticParams() {
  return listCities().map((city) => ({ slug: `best-coaching-institutes-in-${city}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = cityFromSlug(slug);
  if (!city) return {};
  const label = city.replace(/-/g, ' ');
  return {
    title: `Best coaching institutes in ${label}`,
    description: `City hub for coaching rankings in ${label} across major entrance exams.`,
    alternates: { canonical: `/city/${slug}` },
  };
}

export default async function CityHubPage({ params }: Props) {
  const { slug } = await params;
  const city = cityFromSlug(slug);
  if (!city || !listCities().includes(city)) notFound();

  const pages = getCityRankings(city).filter((p) => !p.criterion);
  const label = city.replace(/-/g, ' ');

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/city">City</Link>
            <span>/</span>
            <span>{label}</span>
          </nav>
          <h1>Best coaching institutes in {label}</h1>
          <aside className="answer-block">
            <strong>Direct answer</strong>
            <p>
              This {label} hub collects exam-wise coaching shortlists for students comparing centres in the city.
            </p>
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
