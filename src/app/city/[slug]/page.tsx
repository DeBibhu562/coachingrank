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
    title: `Best Coaching Institutes in ${label.toUpperCase()} | 2026 Rankings`,
    description: `Audited city hub for top coaching rankings in ${label} across law, civil services, management, engineering, and foundation.`,
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
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/city">City Hubs</Link>
            <span className="separator">/</span>
            <span className="current" style={{ textTransform: 'capitalize' }}>{label}</span>
          </nav>

          <span className="eyebrow">
            📍 Hyperlocal City Hub · 2026
          </span>

          <h1 style={{ textTransform: 'capitalize' }}>Best Coaching Institutes in {label}</h1>
          <p className="prose-lead">
            Audited classroom shortlists across all major entrance exams for students in {label.toUpperCase()}.
          </p>

          <div className="answer-box">
            <div className="answer-header">
              <span className="answer-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Direct Answer
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Verified 2026</span>
            </div>
            <p className="answer-text">
              This {label.toUpperCase()} hub indexes verified coaching shortlists across {pages.length} exam categories,
              with #1 and #2 classroom picks evaluated for faculty presence, batch limits, and transparent fees.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Audited Portals</span>
              <h2>{pages.length} Exam Rankings in {label.toUpperCase()}</h2>
            </div>
            <p>Click any card to view the full classroom audit, top ranks, and address contact details.</p>
          </div>

          <RankingCards pages={pages} cols3 />
        </div>
      </section>
    </>
  );
}
