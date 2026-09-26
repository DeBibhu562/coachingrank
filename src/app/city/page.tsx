import type { Metadata } from 'next';
import Link from 'next/link';
import { listCities } from '@/data/rankings';

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
          <h1>Best Coaching Institutes by City</h1>
          <p className="prose-lead">
            Explore verified classroom audits and exam-wise shortlists across {cities.length} major Indian educational hubs.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Hyperlocal Portals</span>
              <h2>Select an Educational City</h2>
            </div>
            <p>Every city hub features verified classroom locations, local faculty credentials, and fee benchmarks.</p>
          </div>

          <div className="chooser-grid">
            {cities.map((city) => (
              <Link key={city} href={`/city/best-coaching-institutes-in-${city}`} className="exam-card">
                <div className="exam-card-info">
                  <span className="exam-card-badge">📍 City Hub</span>
                  <h3 style={{ textTransform: 'capitalize' }}>{city.replace(/-/g, ' ')}</h3>
                  <p>Exam shortlists & classroom rankings</p>
                </div>
                <div className="exam-card-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
