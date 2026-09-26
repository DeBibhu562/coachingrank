import Link from 'next/link';
import type { RankingPage } from '@/data/rankings';
import { directAnswer, rankingPath } from '@/data/rankings';

function badgeClass(rank: number) {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return 'bronze';
  return 'rest';
}

export function AnswerBlock({ page }: { page: RankingPage }) {
  return (
    <aside className="answer-block">
      <strong>Direct answer</strong>
      <p>{directAnswer(page)}</p>
    </aside>
  );
}

export function RankingTable({ page }: { page: RankingPage }) {
  if (!page.institutes.length) {
    return <p>Rankings for this hub are being prepared.</p>;
  }

  return (
    <div className="table-wrap">
      <table className="rank-table">
        <thead>
          <tr>
            <th className="col-rank">Rank</th>
            <th>Institute</th>
          </tr>
        </thead>
        <tbody>
          {page.institutes.map((inst) => (
            <tr key={`${inst.rank}-${inst.slug}`} className={inst.rank <= 3 ? 'rank-top' : undefined}>
              <td>
                <span className={`rank-badge ${badgeClass(inst.rank)}`}>#{inst.rank}</span>
              </td>
              <td>
                <div className="rank-name">
                  <Link href={`/institute/${inst.slug}`}>{inst.name}</Link>
                </div>
                {inst.blurb ? <p className="rank-blurb">{inst.blurb}</p> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FaqBlock({ page }: { page: RankingPage }) {
  if (!page.faqs.length) return null;
  return (
    <div className="faq-list">
      {page.faqs.map((f) => (
        <article key={f.question} className="faq-item">
          <h3>{f.question}</h3>
          <p>{f.answer}</p>
        </article>
      ))}
    </div>
  );
}

export function RankingCards({ pages, cols3 = false }: { pages: RankingPage[]; cols3?: boolean }) {
  return (
    <div className={`rank-preview-list${cols3 ? ' cols-3' : ''}`}>
      {pages.map((p) => (
        <Link key={p.slug} href={rankingPath(p.slug)} className="rank-preview">
          <h3>{p.title.replace(/\s+2026.*/, '').replace(/\s+\|.*/, '')}</h3>
          <div className="rank-preview-ranks">
            {p.institutes[0] ? (
              <span className="rp-1">#1 {p.institutes[0].name}</span>
            ) : (
              <span>Open shortlist</span>
            )}
            {p.institutes[1] ? <span className="rp-2">#2 {p.institutes[1].name}</span> : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
