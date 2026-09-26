import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE } from '@/data/site';
import { ALL_RANKINGS, getRanking, rankingPath } from '@/data/rankings';
import { AnswerBlock, FaqBlock, RankingTable, RankingCards } from '@/components/RankingUI';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ALL_RANKINGS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getRanking(slug);
  if (!page) return {};
  const description = page.institutes[0]
    ? `${page.title}: #1 ${page.institutes[0].name}${page.institutes[1] ? `, #2 ${page.institutes[1].name}` : ''}. Independent shortlist on CoachingRank.in.`
    : page.title;
  return {
    title: `${page.title} | Coaching Rankings`,
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
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null;

  const related = ALL_RANKINGS.filter(
    (r) => r.exam === page.exam && r.slug !== page.slug && !r.criterion,
  ).slice(0, 6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/rankings">Rankings</Link>
            <span className="separator">/</span>
            <span className="current">{page.exam.toUpperCase()}</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="eyebrow">
              ★ Audited Shortlist · {SITE.year}
            </span>
          </div>

          <h1>{page.title}</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.9rem', color: 'var(--ink-muted)', marginTop: '8px' }}>
            <span>📅 Verified for {SITE.year}</span>
            {page.city ? <span>· 📍 City: <strong>{page.city.replace(/-/g, ' ').toUpperCase()}</strong></span> : <span>· 🇮🇳 Pan-India</span>}
            {page.criterion ? <span>· 🎯 Criterion: <strong>{page.criterion.replace(/-/g, ' ')}</strong></span> : null}
            <span>· 🏛️ {page.institutes.length} Institutes Audited</span>
          </div>

          <AnswerBlock page={page} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-info">
              <span className="eyebrow">Official Rankings</span>
              <h2>Audited Ranking Table & Breakdown</h2>
            </div>
            <p>Ranks reflect comprehensive scoring on results evidence, faculty experience, and mock test rigor.</p>
          </div>

          <RankingTable page={page} />

          {/* FAQ Accordions */}
          {page.faqs.length > 0 ? (
            <div style={{ marginTop: '48px' }}>
              <div className="section-head">
                <div className="section-head-info">
                  <span className="eyebrow">Frequently Asked</span>
                  <h2>People Also Ask About {page.exam.toUpperCase()}</h2>
                </div>
              </div>
              <FaqBlock page={page} />
            </div>
          ) : null}

          {/* Related Rankings Cards */}
          {related.length > 0 ? (
            <div style={{ marginTop: '56px' }}>
              <div className="section-head">
                <div className="section-head-info">
                  <span className="eyebrow">Explore More</span>
                  <h2>Related {page.exam.replace(/-/g, ' ').toUpperCase()} Shortlists</h2>
                </div>
              </div>
              <RankingCards pages={related} cols3 />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
