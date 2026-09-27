import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCityRankings, listCities, formatCityName } from '@/data/rankings';
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
  const cityName = formatCityName(city);
  return {
    title: `Best Coaching Institutes in ${cityName} | 2026 Audited Rankings`,
    description: `Audited city hub for top coaching rankings in ${cityName} across law, civil services, management, engineering, and competitive exams.`,
    alternates: { canonical: `/city/${slug}` },
  };
}

export default async function CityHubPage({ params }: Props) {
  const { slug } = await params;
  const city = cityFromSlug(slug);
  if (!city || !listCities().includes(city)) notFound();

  const pages = getCityRankings(city).filter((p) => !p.criterion);
  const cityName = formatCityName(city);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/city">City Hubs</Link>
            <span className="separator">/</span>
            <span className="current">{cityName}</span>
          </nav>

          <div className="hero-status-pill">
            <span className="live-pulse-dot" />
            <span>Hyperlocal Classroom Audit · 2026 Cycle</span>
          </div>

          <h1>Best Coaching Institutes in {cityName}</h1>
          <p className="prose-lead">
            Audited physical classroom shortlists, faculty stability rankings, and student selection benchmarks for aspirants across {cityName}.
          </p>

          {/* Quick Metrics Bar */}
          <div className="hub-stat-strip">
            <div className="hub-stat-item">
              <span className="hub-stat-label">Metro Hub</span>
              <span className="hub-stat-val">{cityName}</span>
            </div>
            <div className="hub-stat-item">
              <span className="hub-stat-label">Audited Exam Portals</span>
              <span className="hub-stat-val">{pages.length} Categories</span>
            </div>
            <div className="hub-stat-item">
              <span className="hub-stat-label">Inspection Level</span>
              <span className="hub-stat-val">Physical Classroom & Results</span>
            </div>
            <div className="hub-stat-item">
              <span className="hub-stat-label">Integrity Status</span>
              <span className="hub-stat-val" style={{ color: '#16a34a' }}>100% Unbiased</span>
            </div>
          </div>

          {/* Executive Direct Answer Card */}
          <div className="answer-box-leaf" style={{ marginTop: '20px' }}>
            <div className="answer-leaf-header">
              <div className="answer-status-cluster">
                <span className="live-pulse-dot" />
                <span className="answer-status-title">City Consensus Briefing</span>
                <span className="answer-status-batch">· {cityName} Classrooms</span>
              </div>
              <div className="answer-bias-tag">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Zero Commercial Influence</span>
              </div>
            </div>
            <p className="answer-lead-text">
              This {cityName} hub indexes verified coaching shortlists across {pages.length} competitive exam portals. Every featured institute is audited for full-time faculty presence, batch size limits under 60 students, and documented selection track records.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Audited Portals</span>
              <h2>{pages.length} Exam Portals in {cityName}</h2>
            </div>
            <p>Click any card to inspect full classroom audits, faculty profiles, and verified #1 and #2 ranks.</p>
          </div>

          <RankingCards pages={pages} cols3 />
        </div>
      </section>
    </>
  );
}
