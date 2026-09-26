import type { Metadata } from 'next';
import Link from 'next/link';
import { listCities } from '@/data/rankings';

export const metadata: Metadata = {
  title: 'City Coaching Hubs',
  description: 'City-wise coaching ranking hubs across India on CoachingRank.in.',
  alternates: { canonical: '/city' },
};

export default function CityIndexPage() {
  const cities = listCities();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>City hubs</span>
          </nav>
          <h1>Best coaching institutes by city</h1>
          <p className="prose-lead">City hubs collect exam rankings for local comparisons.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="chooser-list chooser-grid">
            {cities.map((city) => (
              <Link key={city} href={`/city/best-coaching-institutes-in-${city}`} className="chooser-item">
                <div>
                  <h3>{city.replace(/-/g, ' ')}</h3>
                  <p>Exam-wise shortlists in this city</p>
                </div>
                <span className="chooser-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
