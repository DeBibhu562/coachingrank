import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE } from '@/data/site';
import { ALL_RANKINGS, getRanking, rankingPath, formatCityName } from '@/data/rankings';
import {
  HeroAnswerCard,
  PodiumShowcase,
  RankingTable,
  DetailedInstituteAudits,
  EditorialDeepDive,
  MethodologyRubric,
  RankingSidebar,
  FaqBlock,
  RankingCards,
} from '@/components/RankingUI';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ALL_RANKINGS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getRanking(slug);
  if (!page) return {};
  const description = page.institutes[0]
    ? `${page.title}: #1 ${page.institutes[0].name}${page.institutes[1] ? `, #2 ${page.institutes[1].name}` : ''}. Independent audit on CoachingRank.in.`
    : page.title;
  return {
    title: `${page.title} | Audited Coaching Rankings`,
    description,
    alternates: { canonical: rankingPath(slug) },
  };
}

export default async function RankingSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getRanking(slug);
  if (!page) notFound();

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: page.title,
    itemListElement: page.institutes.map((inst) => ({
      '@type': 'ListItem',
      position: inst.rank,
      item: {
        '@type': 'EducationalOrganization',
        name: inst.name,
        url: `${SITE.url}/institute/${inst.slug}`,
        description: inst.blurb,
      },
    })),
  };

  const faqSchema =
    page.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: page.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question.replace(/CoachingCompare\.in/gi, 'CoachingRank.in'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer.replace(/CoachingCompare\.in/gi, 'CoachingRank.in'),
            },
          })),
        }
      : null;

  const compareSlug = page.institutes.length >= 2 ? `${page.slug}-comparison` : null;

  const relatedCityRankings = page.city
    ? ALL_RANKINGS.filter((r) => r.city === page.city && r.slug !== page.slug).slice(0, 6)
    : [];

  const relatedExamRankings = ALL_RANKINGS.filter(
    (r) => r.exam === page.exam && r.slug !== page.slug && !r.criterion,
  ).slice(0, 6);

  const cityLabel = page.city ? formatCityName(page.city) : null;
  const examLabel = page.exam.replace(/-/g, ' ').toUpperCase();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}

      {/* Hero Header Section */}
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/rankings">Rankings</Link>
            <span className="separator">/</span>
            <Link href={`/exam/${page.exam}`}>{examLabel}</Link>
            {page.city && (
              <>
                <span className="separator">/</span>
                <Link href={`/city/${page.city}`}>{cityLabel}</Link>
              </>
            )}
            <span className="separator">/</span>
            <span className="current">Shortlist</span>
          </nav>

          <div className="hero-audit-badges">
            <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              100-Pt Audited · {SITE.year} Edition
            </span>

            <span className="badge badge-subtle">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {cityLabel ? `${cityLabel} Hub` : 'Pan-India'}
            </span>

            <span className="badge badge-accent">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px' }}>
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              {examLabel} Preparation
            </span>

            <span className="badge badge-subtle">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px' }}>
                <path d="M3 21h18M3 7v14M21 7v14M6 21V11M10 21V11M14 21V11M18 21V11M12 3l9 4H3l9-4z" />
              </svg>
              {page.institutes.length} Institutes Audited
            </span>
          </div>

          <h1 className="hero-page-title">{page.title}</h1>

          <p className="prose-lead" style={{ maxWidth: '860px', marginBottom: '16px' }}>
            Independent editorial audit ranking premier coaching academies for {examLabel} aspirants
            {cityLabel ? ` located in and around ${cityLabel}` : ' across India'}. Every centre is evaluated on historical ranker selection rates, faculty tenure, test series rigor, and student feedback.
          </p>

          <HeroAnswerCard page={page} />
        </div>
      </section>

      {/* Main Two-Column Layout Section */}
      <section className="section" style={{ paddingTop: '32px' }}>
        <div className="container">
          <div className="ranking-layout">
            {/* Left Main Content */}
            <main className="ranking-main">
              {/* Quick Jump Bar */}
              <nav className="ranking-quick-nav" aria-label="Jump to section">
                <span className="quick-nav-label">Jump to:</span>
                <a href="#podium" className="quick-nav-link">Podium Showcase</a>
                <a href="#ranking-table" className="quick-nav-link">Ranking Standings</a>
                <a href="#detailed-audits" className="quick-nav-link">Centre Audits</a>
                {page.editorialGuide && (
                  <a href="#editorial-guide" className="quick-nav-link">Decision Guide</a>
                )}
                <a href="#methodology" className="quick-nav-link">Methodology Rubric</a>
                {page.faqs.length > 0 && (
                  <a href="#faqs" className="quick-nav-link">Common FAQs</a>
                )}
                <a href="#related-shortlists" className="quick-nav-link">Related Hubs</a>
              </nav>

              {/* 1. Top 3 Podium Showcase */}
              <section id="podium" style={{ scrollMarginTop: '100px' }}>
                <div className="section-head">
                  <div className="section-head-info">
                    <span className="eyebrow">Audited Leaders</span>
                    <h2>Top 3 Podium Showcase</h2>
                  </div>
                  <p>Institutes demonstrating peak selection consistency in the {examLabel} category.</p>
                </div>
                <PodiumShowcase institutes={page.institutes} />
              </section>

              {/* 2. Official Ranking Table */}
              <section id="ranking-table" style={{ scrollMarginTop: '100px' }}>
                <div className="section-head">
                  <div className="section-head-info">
                    <span className="eyebrow">Full Standings</span>
                    <h2>Official Ranking Standings ({page.institutes.length} Centres)</h2>
                  </div>
                  <p>Comprehensive overview of all audited institutes with scores and verified badges.</p>
                </div>
                <RankingTable page={page} />
              </section>

              {/* 3. Detailed Institute Audit Reviews */}
              <section id="detailed-audits" style={{ scrollMarginTop: '100px' }}>
                <div className="section-head">
                  <div className="section-head-info">
                    <span className="eyebrow">In-Depth Profiles</span>
                    <h2>Detailed Institute Audits & Scorecards</h2>
                  </div>
                  <p>Deep-dive analysis of each academy’s classroom infrastructure, faculty, and mock tests.</p>
                </div>
                <DetailedInstituteAudits
                  institutes={page.institutes}
                  exam={page.exam}
                  city={page.city}
                  compareSlug={compareSlug}
                />
              </section>

              {/* 4. Editorial Deep Dive & Decision Framework */}
              {page.editorialGuide && <EditorialDeepDive page={page} />}

              {/* 5. Scoring Methodology Rubric */}
              <section id="methodology" style={{ scrollMarginTop: '100px' }}>
                <MethodologyRubric exam={page.exam} city={page.city} />
              </section>

              {/* 6. FAQs Section */}
              {page.faqs.length > 0 && (
                <section id="faqs" style={{ scrollMarginTop: '100px' }}>
                  <div className="section-head">
                    <div className="section-head-info">
                      <span className="eyebrow">Questions & Answers</span>
                      <h2>Frequently Asked Questions About {examLabel} Coaching</h2>
                    </div>
                    <p>Guidance on fees, batch selections, study hubs, and course duration.</p>
                  </div>
                  <FaqBlock page={page} />
                </section>
              )}
            </main>

            {/* Right Sticky Sidebar (Sticks cleanly alongside main audit sections) */}
            <RankingSidebar
              page={page}
              compareSlug={compareSlug}
              relatedCityRankings={relatedCityRankings}
              relatedExamRankings={relatedExamRankings}
            />
          </div>
        </div>
      </section>

      {/* Full-Width Related Shortlists & National Hubs (Independent section preventing sidebar collision) */}
      {(relatedExamRankings.length > 0 || (relatedCityRankings.length > 0 && page.city)) && (
        <section
          id="related-shortlists"
          className="section section-alt"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '60px',
            paddingBottom: '80px',
            scrollMarginTop: '80px',
          }}
        >
          <div className="container">
            {relatedExamRankings.length > 0 && (
              <div style={{ marginBottom: relatedCityRankings.length > 0 && page.city ? '52px' : '0' }}>
                <div className="section-head">
                  <div className="section-head-info">
                    <span className="eyebrow">National Coverage</span>
                    <h2>{examLabel} Coaching Across India</h2>
                  </div>
                  <p>Compare top {examLabel} institutes in major education hubs with audited rankings.</p>
                </div>
                <RankingCards pages={relatedExamRankings} cols3 />
              </div>
            )}

            {relatedCityRankings.length > 0 && page.city && (
              <div>
                <div className="section-head">
                  <div className="section-head-info">
                    <span className="eyebrow">City Hub</span>
                    <h2>Other Top Coaching Rankings in {cityLabel}</h2>
                  </div>
                  <p>Top-ranked preparation centres for other competitive entrance exams in {cityLabel}.</p>
                </div>
                <RankingCards pages={relatedCityRankings} cols3 />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
