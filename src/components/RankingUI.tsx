import Link from 'next/link';
import type { RankingPage } from '@/data/rankings';
import { directAnswer, rankingPath } from '@/data/rankings';

function getBadgeClass(rank: number) {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return 'bronze';
  return 'rest';
}

export function AnswerBlock({ page }: { page: RankingPage }) {
  return (
    <aside className="answer-box">
      <div className="answer-header">
        <span className="answer-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Direct Answer
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Updated 2026</span>
      </div>
      <p className="answer-text">{directAnswer(page)}</p>
    </aside>
  );
}

export function RankingTable({ page }: { page: RankingPage }) {
  if (!page.institutes.length) {
    return (
      <div className="info-box" style={{ textAlign: 'center', padding: '36px' }}>
        <p>Rankings for this hub are being prepared by our editorial desk.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="ranking-table">
        <thead>
          <tr>
            <th style={{ width: '80px', textAlign: 'center' }}>Rank</th>
            <th>Institute & Audit Highlights</th>
            <th style={{ width: '130px', textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {page.institutes.map((inst) => (
            <tr key={`${inst.rank}-${inst.slug}`} className={inst.rank === 1 ? 'top-pick' : undefined}>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <span className={`medal-badge ${getBadgeClass(inst.rank)}`}>
                  #{inst.rank}
                </span>
              </td>
              <td>
                <div className="institute-details-col">
                  <div className="institute-title">
                    <Link href={`/institute/${inst.slug}`}>{inst.name}</Link>
                    {inst.rank <= 2 && (
                      <span className="verified-pill">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Top Verified
                      </span>
                    )}
                  </div>
                  {inst.blurb && <p className="institute-blurb">{inst.blurb}</p>}
                </div>
              </td>
              <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                <Link href={`/institute/${inst.slug}`} className="btn btn-ghost btn-sm">
                  View Profile →
                </Link>
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
    <div className="faq-container">
      {page.faqs.map((f, idx) => (
        <details key={f.question} className="faq-accordion" open={idx === 0}>
          <summary className="faq-summary">
            <span>{f.question}</span>
            <svg
              className="faq-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="faq-content">
            <p>{f.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function RankingCards({ pages, cols3 = false }: { pages: RankingPage[]; cols3?: boolean }) {
  return (
    <div className={`rank-card-list${cols3 ? ' cols-3' : ''}`}>
      {pages.map((p) => {
        const top1 = p.institutes[0];
        const top2 = p.institutes[1];

        return (
          <Link key={p.slug} href={rankingPath(p.slug)} className="rank-card">
            <div className="rank-card-header">
              <span className="rank-card-exam-tag">
                {p.city ? `${p.city} · ` : ''}
                {p.exam.toUpperCase()}
              </span>
              <span className="rank-card-year">2026 Audit</span>
            </div>

            <h3>{p.title.replace(/\s+2026.*/, '').replace(/\s+\|.*/, '')}</h3>

            <div className="rank-card-podium">
              {top1 && (
                <div className="podium-item top-rank">
                  <span className="podium-badge gold">1</span>
                  <span className="podium-name">{top1.name}</span>
                </div>
              )}
              {top2 && (
                <div className="podium-item">
                  <span className="podium-badge silver">2</span>
                  <span className="podium-name">{top2.name}</span>
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
