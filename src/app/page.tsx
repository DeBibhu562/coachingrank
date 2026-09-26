import Link from 'next/link';
import { PRIORITY_EXAMS, SITE } from '@/data/site';
import { ALL_RANKINGS } from '@/data/rankings';
import { RankingCards } from '@/components/RankingUI';

const featuredSlugs = [
  'best-clat-coaching',
  'best-ailet-coaching',
  'best-du-llb-coaching',
  'best-upsc-coaching',
  'best-ipmat-coaching',
  'best-share-market-coaching',
];

export default function HomePage() {
  const featured = featuredSlugs
    .map((slug) => ALL_RANKINGS.find((r) => r.slug === slug))
    .filter(Boolean) as typeof ALL_RANKINGS;

  const delhi = ALL_RANKINGS.filter((r) => r.city === 'delhi' && !r.criterion).slice(0, 6);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is CoachingRank.in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CoachingRank.in is an independent coaching rankings and hub encyclopedia for Indian competitive exams, built as an answer engine for Google and AI search.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which exams does CoachingRank cover first?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Priority clusters include CLAT, AILET, DU LLB and other law rankings, UPSC, IPMAT, and share-market coaching rankings, with city and criterion hubs.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="hero">
        <div className="container">
          <span className="hero-brand">CoachingRank</span>
          <h1>Coaching rankings students trust — by exam and city</h1>
          <p className="hero-lead">{SITE.tagline}</p>
          <div className="hero-actions">
            <Link href="/rankings" className="btn btn-primary">
              Explore rankings
            </Link>
            <Link href="/exam" className="btn btn-ghost">
              Browse exams
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Start here</span>
              <h2>Choose an exam</h2>
            </div>
          </div>
          <div className="chooser-list chooser-grid">
            {PRIORITY_EXAMS.map((e) => (
              <Link key={e.slug} href={e.hub} className="chooser-item">
                <div>
                  <h3>{e.label}</h3>
                  <p>National, city and criterion shortlists</p>
                </div>
                <span className="chooser-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Featured shortlists</span>
              <h2>Top coaching rankings</h2>
            </div>
            <p>#1 and #2 locked for law, UPSC, IPMAT and share-market national lists.</p>
          </div>
          <RankingCards pages={featured} cols3 />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">City</span>
              <h2>Best coaching in Delhi</h2>
            </div>
            <Link href="/city/best-coaching-institutes-in-delhi" className="btn btn-ghost">
              Open Delhi hub
            </Link>
          </div>
          <RankingCards pages={delhi} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Method</span>
              <h2>How CoachingRank works</h2>
            </div>
          </div>
          <ol className="method-list">
            <li>
              <div>
                <strong>Answer-first shortlists</strong>
                <span>Every ranking opens with a clear #1 / #2 statement.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Exam and city hubs</strong>
                <span>Related pages interlink so you can move from national to local fast.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Criterion lenses</strong>
                <span>Filter by results, faculty, mocks and more when one factor matters most.</span>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2>Common questions</h2>
            </div>
          </div>
          <div className="faq-list">
            <article className="faq-item">
              <h3>What is CoachingRank.in?</h3>
              <p>
                An independent coaching rankings site for Indian competitive exams — shortlists by exam, city and
                criterion.
              </p>
            </article>
            <article className="faq-item">
              <h3>Which exams are covered first?</h3>
              <p>CLAT, AILET, DU LLB, UPSC, IPMAT and share-market coaching, with city and criterion hubs.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
