import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, PRIORITY_EXAMS, TOP_CITIES } from '@/data/site';
import {
  ALL_RANKINGS,
  institutesIndex,
  rankingPath,
} from '@/data/rankings';

export const metadata: Metadata = {
  title: 'Complete Tree Sitemap Directory | CoachingRank.in',
  description:
    'Explore the complete tree-structured navigation hierarchy of CoachingRank.in covering all cities, competitive entrance exams, and verified rankings.',
  alternates: { canonical: '/sitemap' },
  openGraph: {
    title: 'Complete Tree Sitemap Directory | CoachingRank.in',
    description:
      'Explore the complete tree-structured navigation hierarchy of CoachingRank.in covering all cities, competitive exams, and verified rankings.',
    url: `${SITE.url}/sitemap`,
    type: 'website',
  },
};

// Precise City Hub Nodes grouped by state/region
const STATE_CITY_HUBS: { stateName: string; countText: string; cities: { name: string; slug: string; icon: string }[] }[] = [
  {
    stateName: 'Maharashtra',
    countText: '3 Cities',
    cities: [
      { name: 'Mumbai Coaching', slug: 'mumbai', icon: '🌊' },
      { name: 'Pune Coaching', slug: 'pune', icon: '🎓' },
      { name: 'Nagpur Coaching', slug: 'nagpur', icon: '🍊' },
    ],
  },
  {
    stateName: 'Delhi NCR',
    countText: '3 Cities',
    cities: [
      { name: 'Delhi Coaching', slug: 'delhi', icon: '🏛️' },
      { name: 'Gurgaon Coaching', slug: 'gurgaon', icon: '🏢' },
      { name: 'Noida Coaching', slug: 'noida', icon: '🚀' },
    ],
  },
  {
    stateName: 'Karnataka',
    countText: '1 City',
    cities: [
      { name: 'Bengaluru Coaching', slug: 'bangalore', icon: '🌿' },
    ],
  },
  {
    stateName: 'Telangana & Andhra Pradesh',
    countText: '2 Cities',
    cities: [
      { name: 'Hyderabad Coaching', slug: 'hyderabad', icon: '💎' },
      { name: 'Visakhapatnam Coaching', slug: 'visakhapatnam', icon: '⚓' },
    ],
  },
  {
    stateName: 'Tamil Nadu & Kerala',
    countText: '3 Cities',
    cities: [
      { name: 'Chennai Coaching', slug: 'chennai', icon: '🎭' },
      { name: 'Coimbatore Coaching', slug: 'coimbatore', icon: '⚙️' },
      { name: 'Kochi Coaching', slug: 'kochi', icon: '⛵' },
    ],
  },
  {
    stateName: 'West Bengal & Northeast',
    countText: '2 Cities',
    cities: [
      { name: 'Kolkata Coaching', slug: 'kolkata', icon: '🎨' },
      { name: 'Guwahati Coaching', slug: 'guwahati', icon: '🦏' },
    ],
  },
  {
    stateName: 'Uttar Pradesh',
    countText: '3 Cities',
    cities: [
      { name: 'Lucknow Coaching', slug: 'lucknow', icon: '🦁' },
      { name: 'Kanpur Coaching', slug: 'kanpur', icon: '🏭' },
      { name: 'Varanasi Coaching', slug: 'varanasi', icon: '🪔' },
    ],
  },
  {
    stateName: 'Rajasthan',
    countText: '2 Cities',
    cities: [
      { name: 'Jaipur Coaching', slug: 'jaipur', icon: '🕌' },
      { name: 'Kota Coaching', slug: 'kota', icon: '🎯' },
    ],
  },
  {
    stateName: 'Gujarat',
    countText: '2 Cities',
    cities: [
      { name: 'Ahmedabad Coaching', slug: 'ahmedabad', icon: '🏭' },
      { name: 'Surat Coaching', slug: 'surat', icon: '💎' },
    ],
  },
  {
    stateName: 'Punjab, Haryana & Chandigarh',
    countText: '2 Cities',
    cities: [
      { name: 'Chandigarh Coaching', slug: 'chandigarh', icon: '🌳' },
      { name: 'Amritsar Coaching', slug: 'amritsar', icon: '✨' },
    ],
  },
  {
    stateName: 'Madhya Pradesh & Chhattisgarh',
    countText: '2 Cities',
    cities: [
      { name: 'Indore Coaching', slug: 'indore', icon: '🌟' },
      { name: 'Bhopal Coaching', slug: 'bhopal', icon: '🏰' },
    ],
  },
  {
    stateName: 'Bihar & Jharkhand',
    countText: '2 Cities',
    cities: [
      { name: 'Patna Coaching', slug: 'patna', icon: '📖' },
      { name: 'Ranchi Coaching', slug: 'ranchi', icon: '🌲' },
    ],
  },
  {
    stateName: 'Odisha & Uttarakhand',
    countText: '2 Cities',
    cities: [
      { name: 'Dehradun Coaching', slug: 'dehradun', icon: '🏔️' },
      { name: 'Bhubaneswar Coaching', slug: 'bhubaneswar', icon: '🏛️' },
    ],
  },
];

export default function SitemapPage() {
  const allInstitutes = institutesIndex();
  const topInstitutes = allInstitutes.slice(0, 36);

  // Top Exam × City Rankings Matrix
  const examMatrixColumns = [
    {
      title: 'CLAT Coaching Rankings',
      links: [
        { label: 'CLAT in Delhi', href: '/rankings/best-clat-coaching-in-delhi' },
        { label: 'CLAT in Mumbai', href: '/rankings/best-clat-coaching-in-mumbai' },
        { label: 'CLAT in Bengaluru', href: '/rankings/best-clat-coaching-in-bangalore' },
        { label: 'CLAT in Hyderabad', href: '/rankings/best-clat-coaching-in-hyderabad' },
        { label: 'CLAT in Pune', href: '/rankings/best-clat-coaching-in-pune' },
        { label: 'CLAT in Jaipur', href: '/rankings/best-clat-coaching-in-jaipur' },
        { label: 'CLAT in Lucknow', href: '/rankings/best-clat-coaching-in-lucknow' },
        { label: 'CLAT in Chandigarh', href: '/rankings/best-clat-coaching-in-chandigarh' },
      ],
    },
    {
      title: 'DU LLB Coaching Rankings',
      links: [
        { label: 'DU LLB in Delhi', href: '/rankings/best-du-llb-coaching-in-delhi' },
        { label: 'DU LLB in Mumbai', href: '/rankings/best-du-llb-coaching-in-mumbai' },
        { label: 'DU LLB in Bengaluru', href: '/rankings/best-du-llb-coaching-in-bangalore' },
        { label: 'DU LLB in Hyderabad', href: '/rankings/best-du-llb-coaching-in-hyderabad' },
        { label: 'DU LLB in Pune', href: '/rankings/best-du-llb-coaching-in-pune' },
        { label: 'DU LLB in Jaipur', href: '/rankings/best-du-llb-coaching-in-jaipur' },
        { label: 'DU LLB in Lucknow', href: '/rankings/best-du-llb-coaching-in-lucknow' },
        { label: 'DU LLB in Chandigarh', href: '/rankings/best-du-llb-coaching-in-chandigarh' },
      ],
    },
    {
      title: 'CLAT PG Coaching Rankings',
      links: [
        { label: 'CLAT PG in Delhi', href: '/rankings/best-clat-pg-coaching-in-delhi' },
        { label: 'CLAT PG in Mumbai', href: '/rankings/best-clat-pg-coaching-in-mumbai' },
        { label: 'CLAT PG in Bengaluru', href: '/rankings/best-clat-pg-coaching-in-bangalore' },
        { label: 'CLAT PG in Hyderabad', href: '/rankings/best-clat-pg-coaching-in-hyderabad' },
        { label: 'CLAT PG in Pune', href: '/rankings/best-clat-pg-coaching-in-pune' },
        { label: 'CLAT PG in Jaipur', href: '/rankings/best-clat-pg-coaching-in-jaipur' },
        { label: 'CLAT PG in Lucknow', href: '/rankings/best-clat-pg-coaching-in-lucknow' },
        { label: 'CLAT PG in Chandigarh', href: '/rankings/best-clat-pg-coaching-in-chandigarh' },
      ],
    },
    {
      title: 'AILET Coaching Rankings',
      links: [
        { label: 'AILET in Delhi', href: '/rankings/best-ailet-coaching-in-delhi' },
        { label: 'AILET in Mumbai', href: '/rankings/best-ailet-coaching-in-mumbai' },
        { label: 'AILET in Bengaluru', href: '/rankings/best-ailet-coaching-in-bangalore' },
        { label: 'AILET in Hyderabad', href: '/rankings/best-ailet-coaching-in-hyderabad' },
        { label: 'AILET in Pune', href: '/rankings/best-ailet-coaching-in-pune' },
        { label: 'AILET in Jaipur', href: '/rankings/best-ailet-coaching-in-jaipur' },
        { label: 'AILET in Lucknow', href: '/rankings/best-ailet-coaching-in-lucknow' },
        { label: 'AILET in Chandigarh', href: '/rankings/best-ailet-coaching-in-chandigarh' },
      ],
    },
    {
      title: 'Judiciary Coaching Rankings',
      links: [
        { label: 'Judiciary in Delhi', href: '/rankings/best-judiciary-coaching-in-delhi' },
        { label: 'Judiciary in Mumbai', href: '/rankings/best-judiciary-coaching-in-mumbai' },
        { label: 'Judiciary in Bengaluru', href: '/rankings/best-judiciary-coaching-in-bangalore' },
        { label: 'Judiciary in Hyderabad', href: '/rankings/best-judiciary-coaching-in-hyderabad' },
        { label: 'Judiciary in Pune', href: '/rankings/best-judiciary-coaching-in-pune' },
        { label: 'Judiciary in Jaipur', href: '/rankings/best-judiciary-coaching-in-jaipur' },
        { label: 'Judiciary in Lucknow', href: '/rankings/best-judiciary-coaching-in-lucknow' },
        { label: 'Judiciary in Chandigarh', href: '/rankings/best-judiciary-coaching-in-chandigarh' },
      ],
    },
    {
      title: 'CUET PG Law Coaching Rankings',
      links: [
        { label: 'CUET PG Law in Delhi', href: '/rankings/best-cuet-pg-law-coaching-in-delhi' },
        { label: 'CUET PG Law in Mumbai', href: '/rankings/best-cuet-pg-law-coaching-in-mumbai' },
        { label: 'CUET PG Law in Bengaluru', href: '/rankings/best-cuet-pg-law-coaching-in-bangalore' },
        { label: 'CUET PG Law in Hyderabad', href: '/rankings/best-cuet-pg-law-coaching-in-hyderabad' },
        { label: 'CUET PG Law in Pune', href: '/rankings/best-cuet-pg-law-coaching-in-pune' },
        { label: 'CUET PG Law in Jaipur', href: '/rankings/best-cuet-pg-law-coaching-in-jaipur' },
        { label: 'CUET PG Law in Lucknow', href: '/rankings/best-cuet-pg-law-coaching-in-lucknow' },
        { label: 'CUET PG Law in Chandigarh', href: '/rankings/best-cuet-pg-law-coaching-in-chandigarh' },
      ],
    },
    {
      title: 'UPSC CSE Coaching Rankings',
      links: [
        { label: 'UPSC in Delhi', href: '/rankings/best-upsc-coaching-in-delhi' },
        { label: 'UPSC in South Delhi', href: '/rankings/best-upsc-coaching-in-south-delhi' },
        { label: 'UPSC as per Results', href: '/rankings/best-upsc-coaching-as-per-results' },
        { label: 'UPSC as per CSE Toppers', href: '/rankings/best-upsc-coaching-as-per-cse-toppers' },
        { label: 'UPSC as per Faculty', href: '/rankings/best-upsc-coaching-as-per-faculty-experience' },
        { label: 'UPSC as per Batch Size', href: '/rankings/best-upsc-coaching-as-per-batch-size' },
        { label: 'UPSC as per Mock Tests', href: '/rankings/best-upsc-coaching-as-per-mock-test-series' },
        { label: 'Best Online UPSC Coaching', href: '/rankings/best-online-upsc-coaching' },
      ],
    },
    {
      title: 'IIT-JEE & NEET Coaching Rankings',
      links: [
        { label: 'JEE in Kota', href: '/rankings/best-jee-coaching-in-kota' },
        { label: 'JEE in Delhi', href: '/rankings/best-jee-coaching-in-delhi' },
        { label: 'JEE in Hyderabad', href: '/rankings/best-jee-coaching-in-hyderabad' },
        { label: 'JEE in Bengaluru', href: '/rankings/best-jee-coaching-in-bangalore' },
        { label: 'NEET in Kota', href: '/rankings/best-neet-coaching-in-kota' },
        { label: 'NEET in Delhi', href: '/rankings/best-neet-coaching-in-delhi' },
        { label: 'NEET in Hyderabad', href: '/rankings/best-neet-coaching-in-hyderabad' },
        { label: 'NEET in Chennai', href: '/rankings/best-neet-coaching-in-chennai' },
      ],
    },
    {
      title: 'IPMAT Management Rankings',
      links: [
        { label: 'Best IPMAT Coaching (India)', href: '/rankings/best-ipmat-coaching' },
        { label: 'Best Online IPMAT Coaching', href: '/rankings/best-online-ipmat-coaching' },
        { label: 'IPMAT as per Results', href: '/rankings/best-ipmat-coaching-as-per-results' },
        { label: 'IPMAT as per IPM Toppers', href: '/rankings/best-ipmat-coaching-as-per-ipm-toppers' },
        { label: 'IPMAT as per Faculty', href: '/rankings/best-ipmat-coaching-as-per-faculty-experience' },
        { label: 'IPMAT as per Batch Size', href: '/rankings/best-ipmat-coaching-as-per-batch-size' },
        { label: 'IPMAT as per Mock Tests', href: '/rankings/best-ipmat-coaching-as-per-mock-test-series' },
        { label: 'IPMAT as per Alumni', href: '/rankings/best-ipmat-coaching-as-per-alumni' },
      ],
    },
  ];

  const sitemapSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CoachingRank.in',
    url: SITE.url,
    description: 'Independent directory and evaluation platform for competitive coaching institutes in India.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/rankings?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CoachingRank.in',
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE.email,
      contactType: 'Admissions and Audit Desk',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sitemapSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      <main style={{ flex: 1 }}>
        <div className="container" style={{ padding: '40px 20px 80px' }}>
          
          {/* Breadcrumbs matching reference */}
          <nav className="breadcrumb-nav">
            <div className="breadcrumb-item" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Link href="/">Home</Link>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
            <div className="breadcrumb-item">
              <span style={{ color: 'var(--ink-primary)', fontWeight: 700 }}>Structured Sitemap Directory</span>
            </div>
          </nav>

          {/* Header matching reference */}
          <header style={{ marginBottom: '40px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '10px' }}>
              Tree Navigation Architecture
            </span>
            <h1 style={{ fontSize: '34px', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
              CoachingRank.in Structured Sitemap
            </h1>
            <p style={{ fontSize: '15.5px', color: 'var(--ink-muted)' }}>
              All pages and internal linking clusters organized logically by level and category for easy navigation and search indexation.
            </p>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            
            {/* Card 1: Core Platform Hubs */}
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--brand-primary)' }}>🌐</span> Core Platform Hubs
              </h2>
              <div className="grid-3">
                <Link className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/">
                  • Homepage (/)
                </Link>
                <Link className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/exam">
                  • All Exams Directory (/exams)
                </Link>
                <Link className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/about#methodology">
                  • 100-Point Inspection (/methodology)
                </Link>
                <Link className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/compare">
                  • Direct Compare Tool (/compare)
                </Link>
                <Link className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/about">
                  • About Us (/about)
                </Link>
                <Link className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/contact">
                  • Contact &amp; Audits (/contact)
                </Link>
                <Link className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/rankings">
                  • All Rankings Index (/rankings)
                </Link>
                <Link className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/city">
                  • Coaching Cities Hub (/city)
                </Link>
                <Link className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/criterion">
                  • Rankings By Criterion (/criterion)
                </Link>
                <Link className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/institute">
                  • Ranked Institutes Index (/institute)
                </Link>
                <a className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/sitemap.xml">
                  • XML Sitemap (/sitemap.xml)
                </a>
                <a className="sidebar-link" style={{ fontSize: '14px', fontWeight: 600 }} href="/llms.txt">
                  • AI / LLM Context Manifest (/llms.txt)
                </a>
              </div>
            </div>

            {/* Card 2: City Hub Nodes (By State) */}
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--brand-primary)' }}>🗺️</span> City Hub Nodes (By State)
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {STATE_CITY_HUBS.map((st) => (
                  <div key={st.stateName}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1d4ed8', marginBottom: '8px' }}>
                      {st.stateName} ({st.countText})
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {st.cities.map((ct) => (
                        <Link
                          key={ct.slug}
                          className="badge badge-blue"
                          style={{ padding: '6px 12px', fontSize: '13px' }}
                          href={`/city/best-coaching-institutes-in-${ct.slug}`}
                        >
                          {ct.icon} {ct.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: IPMAT & Criteria Rankings Directory */}
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--brand-primary)' }}>🎯</span> Benchmark Criteria &amp; National Rankings
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1d4ed8', marginBottom: '10px' }}>
                    National &amp; Benchmark Criteria Rankings
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <Link className="badge badge-gold" style={{ padding: '6px 12px', fontSize: '13px' }} href="/rankings/best-clat-coaching">
                      🏆 Best CLAT Coaching (India)
                    </Link>
                    <Link className="badge badge-gold" style={{ padding: '6px 12px', fontSize: '13px' }} href="/rankings/best-upsc-coaching">
                      🏆 Best UPSC Coaching (India)
                    </Link>
                    <Link className="badge badge-gold" style={{ padding: '6px 12px', fontSize: '13px' }} href="/rankings/best-jee-coaching">
                      🏆 Best JEE Coaching (India)
                    </Link>
                    <Link className="badge badge-gold" style={{ padding: '6px 12px', fontSize: '13px' }} href="/rankings/best-neet-coaching">
                      🏆 Best NEET Coaching (India)
                    </Link>
                    <Link className="badge badge-gold" style={{ padding: '6px 12px', fontSize: '13px' }} href="/rankings/best-ipmat-coaching">
                      🏆 Best IPMAT Coaching (India)
                    </Link>
                    <Link className="badge badge-blue" style={{ padding: '6px 12px', fontSize: '13px' }} href="/criterion/best-coaching-as-per-results">
                      📊 As Per Results
                    </Link>
                    <Link className="badge badge-blue" style={{ padding: '6px 12px', fontSize: '13px' }} href="/criterion/best-coaching-as-per-faculty-experience">
                      👨‍🏫 As Per Faculty Experience
                    </Link>
                    <Link className="badge badge-blue" style={{ padding: '6px 12px', fontSize: '13px' }} href="/criterion/best-coaching-as-per-google-ratings">
                      ⭐ As Per Google Ratings
                    </Link>
                    <Link className="badge badge-blue" style={{ padding: '6px 12px', fontSize: '13px' }} href="/criterion/best-coaching-as-per-mock-test-series">
                      📝 As Per Mock Test Series
                    </Link>
                    <Link className="badge badge-blue" style={{ padding: '6px 12px', fontSize: '13px' }} href="/criterion/best-coaching-as-per-batch-size">
                      👥 As Per Batch Size
                    </Link>
                    <Link className="badge badge-blue" style={{ padding: '6px 12px', fontSize: '13px' }} href="/criterion/best-coaching-as-per-alumni">
                      🎓 As Per Alumni
                    </Link>
                    <Link className="badge badge-blue" style={{ padding: '6px 12px', fontSize: '13px' }} href="/criterion/best-coaching-as-per-clat-toppers">
                      🥇 As Per CLAT Toppers
                    </Link>
                    <Link className="badge badge-blue" style={{ padding: '6px 12px', fontSize: '13px' }} href="/criterion/best-coaching-as-per-cse-toppers">
                      🥇 As Per CSE Toppers
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1d4ed8', marginBottom: '10px' }}>
                    City-Wise IPMAT Coaching Hubs
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[
                      { city: 'Delhi', slug: 'delhi' },
                      { city: 'Gurgaon', slug: 'gurgaon' },
                      { city: 'Mumbai', slug: 'mumbai' },
                      { city: 'Bengaluru', slug: 'bangalore' },
                      { city: 'Indore', slug: 'indore' },
                      { city: 'Hyderabad', slug: 'hyderabad' },
                      { city: 'Pune', slug: 'pune' },
                      { city: 'Jaipur', slug: 'jaipur' },
                      { city: 'Lucknow', slug: 'lucknow' },
                      { city: 'Kolkata', slug: 'kolkata' },
                      { city: 'Chandigarh', slug: 'chandigarh' },
                      { city: 'Ahmedabad', slug: 'ahmedabad' },
                      { city: 'Chennai', slug: 'chennai' },
                      { city: 'Bhopal', slug: 'bhopal' },
                      { city: 'Patna', slug: 'patna' },
                      { city: 'Dehradun', slug: 'dehradun' },
                      { city: 'Kanpur', slug: 'kanpur' },
                      { city: 'Varanasi', slug: 'varanasi' },
                      { city: 'Ranchi', slug: 'ranchi' },
                      { city: 'Surat', slug: 'surat' },
                      { city: 'Nagpur', slug: 'nagpur' },
                      { city: 'Noida', slug: 'noida' },
                      { city: 'Kota', slug: 'kota' },
                    ].map((c) => (
                      <Link
                        key={c.slug}
                        className="sidebar-link"
                        style={{ padding: '4px 10px', fontSize: '13px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        href={`/rankings/best-ipmat-coaching-in-${c.slug}`}
                      >
                        › IPMAT in {c.city}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Top Exam in City Rankings Matrix */}
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--brand-primary)' }}>🏆</span> Top Exam in City Rankings Matrix
              </h2>
              <div className="grid-3">
                {examMatrixColumns.map((col) => (
                  <div key={col.title} style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '8px' }}>
                      {col.title}
                    </h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: 0, margin: 0 }}>
                      {col.links.map((lnk) => (
                        <li key={lnk.href}>
                          <Link
                            className="sidebar-link"
                            style={{ padding: '4px 8px', fontSize: '13px' }}
                            href={lnk.href}
                          >
                            › {lnk.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 5: Premier Ranked Institutes Index */}
            <div className="card" style={{ padding: '28px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--brand-primary)' }}>🏛️</span> Premier Audited Institutes Directory
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {topInstitutes.map((inst) => (
                  <Link
                    key={inst.slug}
                    className="sidebar-link"
                    style={{ padding: '6px 12px', fontSize: '13px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    href={`/institute/${inst.slug}`}
                  >
                    <span style={{ fontWeight: 600 }}>{inst.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Top #{inst.topRank}</span>
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: '16px' }}>
                <Link href="/institute" className="sidebar-link" style={{ fontSize: '13.5px', color: 'var(--brand-primary)', fontWeight: 700 }}>
                  Browse All 750+ Ranked Institutes Directory →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
