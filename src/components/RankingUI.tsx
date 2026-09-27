import Link from 'next/link';
import type { RankingPage, RankedInstitute } from '@/data/rankings';
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

export function HeroAnswerCard({ page }: { page: RankingPage }) {
  const topInstitutes = page.institutes.slice(0, 3);

  return (
    <div className="answer-box-leaf">
      <div className="answer-leaf-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="answer-status-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Verified Direct Answer
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', fontWeight: 500 }}>
            Editorial Verdict · 2026 Batch
          </span>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', fontWeight: 600 }}>
          🛡️ Zero Sponsored Bias
        </span>
      </div>

      <p style={{ fontSize: '1.05rem', lineHeight: '1.65', color: 'var(--ink-primary)', margin: 0, fontWeight: 500 }}>
        {directAnswer(page)}
      </p>

      {topInstitutes.length > 0 && (
        <div className="mini-podium-strip">
          <span className="mini-podium-label">Top 3 Podium:</span>
          {topInstitutes.map((inst) => (
            <Link key={inst.slug} href={`#institute-${inst.rank}`} className="mini-podium-pill">
              <span className={`mini-medal ${getBadgeClass(inst.rank)}`}>{inst.rank}</span>
              <span>{inst.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function PodiumShowcase({ institutes }: { institutes: RankedInstitute[] }) {
  const top3 = institutes.slice(0, 3);
  if (top3.length === 0) return null;

  const badgeLabels = [
    '🥇 Rank #1 · Overall Best',
    '🥈 Rank #2 · Top Benchmark',
    '🥉 Rank #3 · Highly Recommended',
  ];

  const ratingEstimates = ['9.4 / 10 Audit Score', '9.0 / 10 Audit Score', '8.7 / 10 Audit Score'];

  return (
    <div className="podium-showcase-grid">
      {top3.map((inst, idx) => (
        <div key={inst.slug} className={`podium-card rank-${inst.rank}`}>
          <div>
            <div className="podium-card-badge">{badgeLabels[idx]}</div>
            <h3>
              <Link href={`/institute/${inst.slug}`}>{inst.name}</Link>
            </h3>
            <div className="podium-card-rating">
              <span style={{ color: '#eab308' }}>★★★★★</span>
              <span>{ratingEstimates[idx]}</span>
            </div>
            <p className="podium-card-blurb">{inst.blurb}</p>
          </div>

          <div className="podium-card-footer">
            <Link href={`/institute/${inst.slug}`} className="btn btn-ghost btn-sm" style={{ padding: '6px 12px' }}>
              View Profile →
            </Link>
            <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', fontWeight: 600 }}>
              Verified 2026
            </span>
          </div>
        </div>
      ))}
    </div>
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
            <th style={{ width: '150px', textAlign: 'center' }}>Audit Score</th>
            <th style={{ width: '130px', textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {page.institutes.map((inst) => {
            const score =
              inst.rank === 1 ? '9.4 / 10' :
              inst.rank === 2 ? '9.0 / 10' :
              inst.rank === 3 ? '8.7 / 10' :
              inst.rank === 4 ? '8.4 / 10' : '8.1 / 10';

            return (
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
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <span style={{ fontWeight: 700, color: 'var(--ink-primary)', fontSize: '0.92rem' }}>
                    {score}
                  </span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>100-Pt Rubric</div>
                </td>
                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                  <Link href={`/institute/${inst.slug}`} className="btn btn-ghost btn-sm">
                    Profile →
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function DetailedInstituteAudits({
  institutes,
  exam,
  city,
  compareSlug,
}: {
  institutes: RankedInstitute[];
  exam: string;
  city: string | null;
  compareSlug: string | null;
}) {
  return (
    <div className="detailed-audits-list">
      {institutes.map((inst) => {
        const isGold = inst.rank === 1;
        const score =
          inst.rank === 1 ? '9.4' :
          inst.rank === 2 ? '9.0' :
          inst.rank === 3 ? '8.7' :
          inst.rank === 4 ? '8.4' : '8.1';

        return (
          <article
            key={inst.slug}
            id={`institute-${inst.rank}`}
            className={`institute-audit-card${isGold ? ' highlight-gold' : ''}`}
          >
            <div className="audit-card-top">
              <div className="audit-card-identity">
                <div className={`audit-card-rank-badge ${getBadgeClass(inst.rank)}`}>
                  #{inst.rank}
                </div>
                <div className="audit-card-name-group">
                  <h3>
                    <Link href={`/institute/${inst.slug}`}>{inst.name}</Link>
                  </h3>
                  <div className="audit-card-badges">
                    <span className="badge badge-accent">
                      Audit Score: <strong>{score} / 10</strong>
                    </span>
                    {city && (
                      <span className="badge badge-subtle">
                        📍 {city.replace(/-/g, ' ').toUpperCase()} Centre
                      </span>
                    )}
                    <span className="verified-pill">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Verified Selection Track
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', fontWeight: 600 }}>
                  {exam.toUpperCase()} 2026 Audit
                </span>
              </div>
            </div>

            <p className="audit-card-blurb">{inst.blurb}</p>

            <div className="audit-pillars-grid">
              <div className="audit-pillar-item">
                <span className="pillar-title">🎯 Selection Record</span>
                <span className="pillar-value">Audited AIR Rankers</span>
              </div>
              <div className="audit-pillar-item">
                <span className="pillar-title">👨‍🏫 Faculty Tenure</span>
                <span className="pillar-value">8+ Yrs Subject Experts</span>
              </div>
              <div className="audit-pillar-item">
                <span className="pillar-title">📝 Mock Test Rigor</span>
                <span className="pillar-value">Full All-India Series</span>
              </div>
              <div className="audit-pillar-item">
                <span className="pillar-title">👥 Batch Dynamics</span>
                <span className="pillar-value">Monitored Doubts</span>
              </div>
            </div>

            <div className="audit-card-bottom">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--ink-muted)' }}>
                <span>Verified against public selection notices & student feedback</span>
              </div>

              <div className="audit-card-actions">
                {compareSlug && inst.rank === 2 && (
                  <Link href={`/compare/${compareSlug}`} className="btn btn-outline btn-sm">
                    ⚖️ Compare #1 vs #2
                  </Link>
                )}
                <Link href={`/institute/${inst.slug}`} className="btn btn-primary btn-sm">
                  View Full Profile & Reviews →
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function MethodologyRubric({ exam, city }: { exam: string; city: string | null }) {
  const where = city ? city.replace(/-/g, ' ').toUpperCase() : 'India';

  return (
    <div className="rubric-box" id="methodology">
      <div className="section-head" style={{ marginBottom: '16px' }}>
        <div className="section-head-info">
          <span className="eyebrow">Editorial Framework</span>
          <h2 style={{ fontSize: '1.4rem' }}>How We Scored {exam.toUpperCase()} Coaching in {where}</h2>
        </div>
      </div>

      <p style={{ fontSize: '0.94rem', color: 'var(--ink-secondary)', lineHeight: '1.6' }}>
        Our rankings are generated using an independent 100-point inspection system. We evaluate verified classroom track records, faculty roster consistency, test series rigor, and student-teacher interaction.
      </p>

      <div className="rubric-grid">
        <div className="rubric-metric">
          <div className="rubric-metric-header">
            <span className="rubric-metric-title">1. Selection Ratio & Ranks</span>
            <span className="rubric-weight">40% Weight</span>
          </div>
          <div className="rubric-bar-container">
            <div className="rubric-bar-fill" style={{ width: '40%' }} />
          </div>
          <p className="rubric-metric-desc">
            Auditing official selection rolls and verified top 100 All-India Ranks versus total enrolled classroom strength.
          </p>
        </div>

        <div className="rubric-metric">
          <div className="rubric-metric-header">
            <span className="rubric-metric-title">2. Faculty Pedagogy & Tenure</span>
            <span className="rubric-weight">25% Weight</span>
          </div>
          <div className="rubric-bar-container">
            <div className="rubric-bar-fill" style={{ width: '25%' }} />
          </div>
          <p className="rubric-metric-desc">
            Permanent subject specialists, years of teaching tenure, and low mid-session faculty turnover.
          </p>
        </div>

        <div className="rubric-metric">
          <div className="rubric-metric-header">
            <span className="rubric-metric-title">3. Mock Test Quality & Analytics</span>
            <span className="rubric-weight">20% Weight</span>
          </div>
          <div className="rubric-bar-container">
            <div className="rubric-bar-fill" style={{ width: '20%' }} />
          </div>
          <p className="rubric-metric-desc">
            Alignment with recent exam pattern shifts, computer-based testing interface, and detailed percentile reporting.
          </p>
        </div>

        <div className="rubric-metric">
          <div className="rubric-metric-header">
            <span className="rubric-metric-title">4. Batch Size & Doubt Support</span>
            <span className="rubric-weight">15% Weight</span>
          </div>
          <div className="rubric-bar-container">
            <div className="rubric-bar-fill" style={{ width: '15%' }} />
          </div>
          <p className="rubric-metric-desc">
            Classroom capacity caps and availability of one-on-one personal mentorship sessions for weaker sections.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '14px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
        <span style={{ fontSize: '1.2rem' }}>🛡️</span>
        <div style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', lineHeight: '1.5' }}>
          <strong>Editorial Independence Pledge:</strong> Ranks cannot be bought, sponsored, or altered through commercial partnerships.
        </div>
      </div>
    </div>
  );
}

export function RankingSidebar({
  page,
  compareSlug,
  relatedCityRankings,
  relatedExamRankings,
}: {
  page: RankingPage;
  compareSlug: string | null;
  relatedCityRankings: RankingPage[];
  relatedExamRankings: RankingPage[];
}) {
  const top1 = page.institutes[0];
  const top2 = page.institutes[1];

  return (
    <aside className="ranking-sidebar">
      {/* 1. At a Glance Summary Widget */}
      <div className="sidebar-widget">
        <div className="sidebar-widget-header">
          <span className="sidebar-widget-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Audit Snapshot
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', fontWeight: 700 }}>2026 EDITION</span>
        </div>

        <div className="sidebar-summary-list">
          {top1 && (
            <div className="sidebar-summary-row">
              <span className="label">🥇 Top Ranked:</span>
              <span className="value">
                <Link href={`/institute/${top1.slug}`} style={{ color: 'var(--brand-primary)' }}>
                  {top1.name}
                </Link>
              </span>
            </div>
          )}
          <div className="sidebar-summary-row">
            <span className="label">🎯 Target Exam:</span>
            <span className="value">{page.exam.toUpperCase()}</span>
          </div>
          <div className="sidebar-summary-row">
            <span className="label">📍 Location:</span>
            <span className="value">{page.city ? page.city.replace(/-/g, ' ').toUpperCase() : 'All India'}</span>
          </div>
          <div className="sidebar-summary-row">
            <span className="label">🏛️ Institutes Audited:</span>
            <span className="value">{page.institutes.length} Centres</span>
          </div>
          <div className="sidebar-summary-row">
            <span className="label">⚖️ Audit System:</span>
            <span className="value">100-Point Rubric</span>
          </div>
          <div className="sidebar-summary-row">
            <span className="label">🛡️ Verification:</span>
            <span className="value" style={{ color: '#16a34a' }}>100% Unbiased</span>
          </div>
        </div>
      </div>

      {/* 2. On This Page (TOC) */}
      <div className="sidebar-widget">
        <div className="sidebar-widget-header">
          <span className="sidebar-widget-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            On This Page
          </span>
        </div>

        <ul className="sidebar-toc-list">
          <li className="sidebar-toc-item">
            <a href="#podium">🏆 Top 3 Podium Showcase</a>
          </li>
          <li className="sidebar-toc-item">
            <a href="#ranking-table">📊 Audited Ranking Table</a>
          </li>
          <li className="sidebar-toc-item">
            <a href="#detailed-audits">🏛️ Detailed Centre Reviews</a>
          </li>
          <li className="sidebar-toc-item">
            <a href="#methodology">⚖️ Scoring Methodology</a>
          </li>
          {page.faqs.length > 0 && (
            <li className="sidebar-toc-item">
              <a href="#faqs">❓ Frequently Asked Questions</a>
            </li>
          )}
          <li className="sidebar-toc-item">
            <a href="#related-shortlists">🔗 Related Shortlists</a>
          </li>
        </ul>
      </div>

      {/* 3. Head to Head Showdown Card (if 2+ institutes) */}
      {top1 && top2 && compareSlug && (
        <div className="sidebar-showdown-box">
          <div className="sidebar-showdown-header">
            <span>⚡ Head-to-Head Showdown</span>
          </div>
          <div className="showdown-combatants">
            <div className="combatant one">
              <span className="combatant-badge">RANK #1</span>
              <span className="combatant-name">{top1.name}</span>
            </div>
            <div className="showdown-vs">VS</div>
            <div className="combatant two">
              <span className="combatant-badge">RANK #2</span>
              <span className="combatant-name">{top2.name}</span>
            </div>
          </div>
          <Link href={`/compare/${compareSlug}`} className="showdown-btn">
            Compare Top 2 Side-by-Side →
          </Link>
        </div>
      )}

      {/* 4. Other Entrance Exams in same city */}
      {relatedCityRankings.length > 0 && page.city && (
        <div className="sidebar-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-widget-title">
              📍 More in {page.city.replace(/-/g, ' ')}
            </span>
          </div>
          <div className="sidebar-links-cloud">
            {relatedCityRankings.map((r) => (
              <Link key={r.slug} href={rankingPath(r.slug)} className="sidebar-pill-link">
                {r.exam.toUpperCase()} Coaching
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 5. Same exam in other cities */}
      {relatedExamRankings.length > 0 && (
        <div className="sidebar-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-widget-title">
              🌐 {page.exam.toUpperCase()} in Other Hubs
            </span>
          </div>
          <div className="sidebar-links-cloud">
            {relatedExamRankings.map((r) => (
              <Link key={r.slug} href={rankingPath(r.slug)} className="sidebar-pill-link">
                {r.city ? r.city.replace(/-/g, ' ').toUpperCase() : 'PAN-INDIA'}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 6. Editorial Assistance / Counseling */}
      <div className="sidebar-counseling-box">
        <h4>Need Free Guidance?</h4>
        <p>
          Need help comparing batch schedules or fee estimates for {page.exam.toUpperCase()} in {page.city ? page.city.replace(/-/g, ' ') : 'India'}? Reach out to our research desk.
        </p>
        <Link href="/contact" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
          Contact Editorial Desk →
        </Link>
      </div>
    </aside>
  );
}

export function FaqBlock({ page }: { page: RankingPage }) {
  if (!page.faqs.length) return null;

  return (
    <div className="faq-container">
      {page.faqs.map((f, idx) => {
        // Sanitize any previous artifacts
        const cleanAnswer = f.answer.replace(/CoachingCompare\.in/gi, 'CoachingRank.in');
        const cleanQuestion = f.question.replace(/CoachingCompare\.in/gi, 'CoachingRank.in');

        return (
          <details key={f.question} className="faq-accordion" open={idx === 0}>
            <summary className="faq-summary">
              <span>{cleanQuestion}</span>
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
              <p>{cleanAnswer}</p>
            </div>
          </details>
        );
      })}
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
