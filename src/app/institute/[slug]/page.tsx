import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_RANKINGS, institutesIndex, rankingPath } from '@/data/rankings';
import { SITE } from '@/data/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return institutesIndex().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const inst = institutesIndex().find((i) => i.slug === slug);
  if (!inst) return {};
  return {
    title: `${inst.name} coaching rankings & reviews`,
    description: `${inst.name} appears on CoachingRank shortlists with best rank #${inst.topRank} across ${inst.appearances} ranking pages.`,
    alternates: { canonical: `/institute/${slug}` },
  };
}

export default async function InstitutePage({ params }: Props) {
  const { slug } = await params;
  const inst = institutesIndex().find((i) => i.slug === slug);
  if (!inst) notFound();

  const appearances = ALL_RANKINGS.filter((p) => p.institutes.some((i) => i.slug === slug)).map((p) => {
    const row = p.institutes.find((i) => i.slug === slug)!;
    return { page: p, rank: row.rank, blurb: row.blurb };
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: inst.name,
    url: `${SITE.url}/institute/${inst.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/institute">Institutes</Link>
            <span>/</span>
            <span>{inst.name}</span>
          </nav>
          <h1>{inst.name}</h1>
          <aside className="answer-block">
            <strong>Direct answer</strong>
            <p>
              {inst.name} holds a best CoachingRank position of #{inst.topRank} and appears on{' '}
              {inst.appearances} ranking pages across exam and city hubs.
            </p>
          </aside>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <span className="eyebrow">Where it ranks</span>
          <h2 className="section-title">Ranking appearances</h2>
          <div className="faq-list stack-sm">
            {appearances.slice(0, 40).map(({ page, rank, blurb }) => (
              <article key={page.slug} className="faq-item">
                <h3>
                  <Link href={rankingPath(page.slug)}>
                    #{rank} on {page.title}
                  </Link>
                </h3>
                {blurb ? <p>{blurb}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
