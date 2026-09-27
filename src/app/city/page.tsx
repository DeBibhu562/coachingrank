import type { Metadata } from 'next';
import Link from 'next/link';
import { listCities, formatCityName, getCityRankings } from '@/data/rankings';

export const metadata: Metadata = {
  title: 'City Coaching Ranking Hubs | Best Centres in 32+ Cities',
  description: 'City-wise coaching ranking hubs across India on CoachingRank.in. Find audited classroom shortlists for your city.',
  alternates: { canonical: '/city' },
};

export default function CityIndexPage() {
  const cities = listCities();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">City Hubs</span>
          </nav>

          <div className="hero-status-pill">
            <span className="live-pulse-dot" />
            <span>Hyperlocal Classroom Audits · 32 Cities</span>
          </div>

          <h1>Best Coaching Institutes by City</h1>
          <p className="prose-lead">
            Explore verified physical classroom audits, faculty credentials, and exam-wise shortlists across {cities.length} major Indian educational hubs.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Metro Portals</span>
              <h2>Select Your Coaching City</h2>
            </div>
            <p>Every city hub features verified classroom locations, local faculty credentials, and fee benchmarks.</p>
          </div>

          <div className="chooser-grid">
            {cities.map((city) => {
              const cityName = formatCityName(city);
              const count = getCityRankings(city).filter((r) => !r.criterion).length;

              return (
                <Link key={city} href={`/city/best-coaching-institutes-in-${city}`} className="city-portal-card">
                  <div className="city-portal-header">
                    <span className="city-portal-badge">
                      <span className="live-pulse-dot" style={{ width: '5px', height: '5px' }} />
                      Audited Hub
                    </span>
                    <span className="city-portal-count">{count} Exam Shortlists</span>
                  </div>

                  <h3 className="city-portal-name">{cityName}</h3>
                  <p className="city-portal-desc">
                    Audited classrooms across law, civil services, management & competitive exams.
                  </p>

                  <div className="city-portal-footer">
                    <span>Explore {cityName} Portals</span>
                    <span className="city-portal-arrow">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
