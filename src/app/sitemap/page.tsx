import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, PRIORITY_EXAMS, TOP_CITIES } from '@/data/site';
import {
  ALL_RANKINGS,
  institutesIndex,
  listCities,
  listExams,
  getCriterionRankings,
  formatCityName,
  formatExamName,
  rankingPath,
} from '@/data/rankings';

export const metadata: Metadata = {
  title: 'Complete Tree Sitemap & Coaching Directory | CoachingRank.in',
  description:
    'Explore the complete structured navigation tree and directory of CoachingRank.in covering all national entrance exams, 32+ coaching cities, criteria rankings, and verified institute profiles.',
  alternates: { canonical: '/sitemap' },
  openGraph: {
    title: 'Complete Tree Sitemap & Directory | CoachingRank.in',
    description:
      'Tree-structured navigation index of all coaching rankings, city hubs, exam portals, and institute audit cards on CoachingRank.in.',
    url: `${SITE.url}/sitemap`,
    type: 'website',
  },
};

// Exam category groupings
const EXAM_GROUPS: { groupName: string; icon: string; slugs: string[] }[] = [
  {
    groupName: 'Law Entrances',
    icon: '⚖️',
    slugs: ['clat', 'ailet', 'du-llb', 'clat-pg', 'cuet-pg-law', 'judiciary', 'online-clat-pg', 'online-du-llb'],
  },
  {
    groupName: 'Engineering & Medical',
    icon: '🔬',
    slugs: ['jee', 'neet', 'gate', 'foundation', 'class-10-boards', 'class-12-boards'],
  },
  {
    groupName: 'Civil Services & Government',
    icon: '🏛️',
    slugs: ['upsc', 'online-upsc', 'ssc', 'banking', 'nda', 'ctet'],
  },
  {
    groupName: 'Management & Commerce',
    icon: '📈',
    slugs: ['cat', 'ipmat', 'online-ipmat', 'cuet', 'share-market', 'online-share-market', 'study-abroad'],
  },
];

// City regional groupings
const CITY_REGIONS: { regionName: string; cities: { slug: string; name: string }[] }[] = [
  {
    regionName: 'Delhi NCR & North Zone',
    cities: [
      { slug: 'delhi', name: 'Delhi NCR' },
      { slug: 'gurgaon', name: 'Gurgaon' },
      { slug: 'noida', name: 'Noida' },
      { slug: 'south-delhi', name: 'South Delhi' },
      { slug: 'chandigarh', name: 'Chandigarh' },
      { slug: 'dehradun', name: 'Dehradun' },
      { slug: 'jaipur', name: 'Jaipur' },
      { slug: 'kota', name: 'Kota' },
    ],
  },
  {
    regionName: 'Maharashtra & West Zone',
    cities: [
      { slug: 'mumbai', name: 'Mumbai' },
      { slug: 'pune', name: 'Pune' },
      { slug: 'nagpur', name: 'Nagpur' },
      { slug: 'ahmedabad', name: 'Ahmedabad' },
      { slug: 'surat', name: 'Surat' },
    ],
  },
  {
    regionName: 'South India Hubs',
    cities: [
      { slug: 'bangalore', name: 'Bengaluru' },
      { slug: 'hyderabad', name: 'Hyderabad' },
      { slug: 'chennai', name: 'Chennai' },
      { slug: 'visakhapatnam', name: 'Visakhapatnam' },
      { slug: 'kochi', name: 'Kochi' },
    ],
  },
  {
    regionName: 'Central & Eastern India Hubs',
    cities: [
      { slug: 'lucknow', name: 'Lucknow' },
      { slug: 'kanpur', name: 'Kanpur' },
      { slug: 'varanasi', name: 'Varanasi' },
      { slug: 'patna', name: 'Patna' },
      { slug: 'ranchi', name: 'Ranchi' },
      { slug: 'bhopal', name: 'Bhopal' },
      { slug: 'indore', name: 'Indore' },
      { slug: 'kolkata', name: 'Kolkata' },
      { slug: 'bhubaneswar', name: 'Bhubaneswar' },
      { slug: 'guwahati', name: 'Guwahati' },
    ],
  },
];

export default function SitemapPage() {
  const allInstitutes = institutesIndex();
  const topInstitutes = allInstitutes.slice(0, 36);

  // Group leaf rankings by primary exam for high-impact matrix
  const topRankingsByExam = [
    {
      examName: 'CLAT & Law Rankings',
      items: ALL_RANKINGS.filter(
        (r) => ['clat', 'ailet', 'du-llb', 'clat-pg', 'cuet-pg-law'].includes(r.exam)
      ).slice(0, 16),
    },
    {
      examName: 'UPSC Civil Services Rankings',
      items: ALL_RANKINGS.filter((r) => r.exam === 'upsc' || r.exam === 'online-upsc').slice(0, 14),
    },
    {
      examName: 'IIT-JEE & NEET Medical Rankings',
      items: ALL_RANKINGS.filter((r) => ['jee', 'neet', 'foundation'].includes(r.exam)).slice(0, 14),
    },
    {
      examName: 'IPMAT & Management Rankings',
      items: ALL_RANKINGS.filter((r) => ['ipmat', 'online-ipmat', 'cat', 'cuet'].includes(r.exam)).slice(0, 14),
    },
    {
      examName: 'Judiciary & Government Exams',
      items: ALL_RANKINGS.filter((r) => ['judiciary', 'ssc', 'banking', 'nda'].includes(r.exam)).slice(0, 14),
    },
  ];

  const sitemapSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CoachingRank.in Tree Sitemap Directory',
    url: `${SITE.url}/sitemap`,
    description:
      'Complete tree-structured navigation hierarchy of CoachingRank.in covering all competitive exams, coaching cities, and verified rankings.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE.url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Structured Sitemap Directory',
          item: `${SITE.url}/sitemap`,
        },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sitemapSchema) }} />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Tree Sitemap Directory</span>
          </nav>

          <div className="hero-audit-badges">
            <span className="badge badge-gold">🗺️ Master Tree Navigation</span>
            <span className="badge badge-blue">Index Edition: {SITE.year}</span>
            <span className="badge badge-emerald">Comprehensive Internal Link Architecture</span>
          </div>

          <h1>CoachingRank.in Structured Sitemap & Complete Directory</h1>
          <p className="prose-lead" style={{ maxWidth: '840px', marginBottom: '20px' }}>
            Comprehensive tree navigation index of CoachingRank.in. Explore all core platform hubs, national competitive
            exams, 32+ coaching cities, criteria rankings, comparison matrices, and audited institute profiles organized
            for effortless discovery and search indexation.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <a href="#core-hubs" className="badge badge-blue" style={{ textDecoration: 'none' }}>
              🌐 Core Hubs
            </a>
            <a href="#exam-portals" className="badge badge-blue" style={{ textDecoration: 'none' }}>
              📚 28+ Exam Portals
            </a>
            <a href="#city-nodes" className="badge badge-blue" style={{ textDecoration: 'none' }}>
              📍 City Hub Nodes
            </a>
            <a href="#criteria-rankings" className="badge badge-blue" style={{ textDecoration: 'none' }}>
              ⚖️ Criterion Shortlists
            </a>
            <a href="#rankings-matrix" className="badge badge-blue" style={{ textDecoration: 'none' }}>
              🏆 Leaf Rankings Matrix
            </a>
            <a href="#institutes-index" className="badge badge-blue" style={{ textDecoration: 'none' }}>
              🏛️ Institute Profiles
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          
          {/* Section 1: Core Platform Hubs */}
          <div id="core-hubs" className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>🌐</span> Core Platform Hubs & Governance
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '20px' }}>
              Foundational architecture, comparison tools, evaluation charters, and machine-readable endpoints.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
              <Link href="/" className="sidebar-link" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
                • Homepage (/)
              </Link>
              <Link href="/rankings" className="sidebar-link" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
                • All Rankings Index (/rankings)
              </Link>
              <Link href="/exam" className="sidebar-link" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
                • Exam Portals Directory (/exam)
              </Link>
              <Link href="/city" className="sidebar-link" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
                • Coaching Cities Hub (/city)
              </Link>
              <Link href="/institute" className="sidebar-link" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
                • Ranked Institutes Index (/institute)
              </Link>
              <Link href="/compare" className="sidebar-link" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
                • Head-to-Head Compare (/compare)
              </Link>
              <Link href="/criterion" className="sidebar-link" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
                • By Criterion Portals (/criterion)
              </Link>
              <Link href="/about" className="sidebar-link" style={{ padding: '10px 14px', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca', fontWeight: 700, color: 'var(--brand-primary)' }}>
                • About & Methodology (/about)
              </Link>
              <Link href="/contact" className="sidebar-link" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
                • Contact & Verification Desk (/contact)
              </Link>
              <a href="/sitemap.xml" className="sidebar-link" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
                • XML Sitemap (/sitemap.xml)
              </a>
              <a href="/llms.txt" className="sidebar-link" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
                • AI / LLM Context Manifest (/llms.txt)
              </a>
              <a href="/llms-full.txt" className="sidebar-link" style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 600 }}>
                • Full AI Knowledge Base (/llms-full.txt)
              </a>
            </div>
          </div>

          {/* Section 2: Exam Portals by Category */}
          <div id="exam-portals" className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>📚</span> Competitive Entrance Exam Portals
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '24px' }}>
              Dedicated examination intelligence hubs with verified national benchmarks, seat intakes, and syllabus calibrations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {EXAM_GROUPS.map((grp) => (
                <div key={grp.groupName} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{grp.icon}</span> {grp.groupName}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {grp.slugs.map((slug) => (
                      <Link
                        key={slug}
                        href={`/exam/${slug}-coaching-rankings`}
                        className="badge badge-blue"
                        style={{ padding: '7px 14px', fontSize: '0.86rem', textDecoration: 'none' }}
                      >
                        {formatExamName(slug)} Coaching Rankings →
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Coaching City Hubs by Region */}
          <div id="city-nodes" className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>📍</span> City Hub Nodes by Region &amp; State
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '24px' }}>
              Physical classroom coaching directories with local faculty stability and verified student review counts.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {CITY_REGIONS.map((region) => (
                <div key={region.regionName} style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '12px' }}>
                    {region.regionName}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {region.cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/city/best-coaching-institutes-in-${city.slug}`}
                        style={{
                          fontSize: '0.84rem',
                          color: 'var(--ink-secondary)',
                          background: '#ffffff',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-subtle)',
                          textDecoration: 'none',
                          fontWeight: 500,
                        }}
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Criteria-Based Rankings */}
          <div id="criteria-rankings" className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>⚖️</span> National Criteria-Based Rankings Directory
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '20px' }}>
              Specific ranking lenses tailored to individual student priorities (faculty pedigree, small batch sizes, mock test series, or alumni ratings).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
              <Link href="/criterion/best-coaching-as-per-results" className="sidebar-link" style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}>
                📊 As Per Verified Results
              </Link>
              <Link href="/criterion/best-coaching-as-per-faculty-experience" className="sidebar-link" style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}>
                👨‍🏫 As Per Faculty Experience
              </Link>
              <Link href="/criterion/best-coaching-as-per-batch-size" className="sidebar-link" style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}>
                👥 As Per Small Batch Size
              </Link>
              <Link href="/criterion/best-coaching-as-per-mock-test-series" className="sidebar-link" style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}>
                📝 As Per Mock Test Series
              </Link>
              <Link href="/criterion/best-coaching-as-per-google-ratings" className="sidebar-link" style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}>
                ⭐ As Per Google Ratings
              </Link>
              <Link href="/criterion/best-coaching-as-per-alumni" className="sidebar-link" style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}>
                🎓 As Per Alumni Reviews
              </Link>
              <Link href="/criterion/best-coaching-as-per-clat-toppers" className="sidebar-link" style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}>
                🏆 As Per CLAT Toppers
              </Link>
              <Link href="/criterion/best-coaching-as-per-cse-toppers" className="sidebar-link" style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}>
                🥇 As Per UPSC CSE Toppers
              </Link>
            </div>
          </div>

          {/* Section 5: Top Exam in City Rankings Matrix */}
          <div id="rankings-matrix" className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>🏆</span> Top Exam in City Rankings Matrix
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '24px' }}>
              Direct access to our most audited leaf ranking pages with comprehensive two-column analysis, podium spotlights, and fee estimates.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
              {topRankingsByExam.map((col) => (
                <div key={col.examName}>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '12px', paddingBottom: '6px', borderBottom: '2px solid var(--border-subtle)' }}>
                    {col.examName}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {col.items.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={rankingPath(r.slug)}
                          className="sidebar-link"
                          style={{
                            padding: '4px 8px',
                            fontSize: '0.84rem',
                            display: 'block',
                            borderRadius: '4px',
                          }}
                        >
                          › {r.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Premier Institutes Index */}
          <div id="institutes-index" className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>🏛️</span> Premier Ranked Institutes Directory
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '20px' }}>
              Direct audit profile cards for leading test-prep brands across India.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
              {topInstitutes.map((inst) => (
                <Link
                  key={inst.slug}
                  href={`/institute/${inst.slug}`}
                  style={{
                    padding: '8px 12px',
                    background: '#f8fafc',
                    borderRadius: '6px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.84rem',
                    color: 'var(--ink-secondary)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{inst.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>Top #{inst.topRank}</span>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Link href="/institute" className="btn btn-outline btn-sm">
                View All 750+ Ranked Institutes Profiles →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
