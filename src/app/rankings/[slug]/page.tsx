import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE } from '@/data/site';
import {
  ALL_RANKINGS,
  getRanking,
  rankingPath,
} from '@/data/rankings';
import { AnswerBlock, FaqBlock, RankingTable } from '@/components/RankingUI';

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
  ).slice(0, 8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/rankings">Rankings</Link>
            <span>/</span>
            <span>{page.exam}</span>
          </nav>
          <h1>{page.title}</h1>
          <div className="meta-row">
            <span>Updated for {SITE.year}</span>
            {page.city ? <span>· City: {page.city.replace(/-/g, ' ')}</span> : <span>· National</span>}
            {page.criterion ? <span>· Criterion: {page.criterion.replace(/-/g, ' ')}</span> : null}
          </div>
          <AnswerBlock page={page} />
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <RankingTable page={page} />

          {page.faqs.length > 0 ? (
            <div className="stack-lg">
              <span className="eyebrow">FAQ</span>
              <h2 className="section-title stack-sm">People also ask</h2>
              <div className="stack-sm">
                <FaqBlock page={page} />
              </div>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="stack-lg">
              <span className="eyebrow">Related</span>
              <h2 className="section-title stack-sm">More {page.exam.replace(/-/g, ' ')} rankings</h2>
              <div className="link-rail stack-sm">
                {related.map((r) => (
                  <Link key={r.slug} href={rankingPath(r.slug)}>
                    {r.title.replace(/\s+\|.*/, '').slice(0, 48)}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
