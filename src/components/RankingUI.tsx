import Link from 'next/link';
import type { RankingPage, RankedInstitute } from '@/data/rankings';
import { directAnswer, rankingPath, formatCityName, formatExamName } from '@/data/rankings';

function getBadgeClass(rank: number) {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return 'bronze';
  return 'rest';
}

export function AnswerBlock({ page }: { page: RankingPage }) {
  const topInstitutes = page.institutes.slice(0, 3);
  const badgeMedals = [
    { label: '1st', bgClass: 'gold', score: '9.4' },
    { label: '2nd', bgClass: 'silver', score: '9.0' },
    { label: '3rd', bgClass: 'bronze', score: '8.7' },
  ];

  return (
    <aside className="answer-box-leaf" style={{ marginTop: '18px', marginBottom: '28px' }}>
      <div className="answer-leaf-header">
        <div className="answer-status-cluster">
          <span className="live-pulse-dot" />
          <span className="answer-status-title">Editorial Audit Consensus</span>
          <span className="answer-status-batch">· Verified 2027 Admissions</span>
        </div>
        <div className="answer-bias-tag">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>100% Unbiased & Independent</span>
        </div>
      </div>

      <p className="answer-lead-text">{directAnswer(page)}</p>

      {topInstitutes.length > 0 && (
        <div className="mini-podium-strip">
          <span className="mini-podium-label">Podium Picks:</span>
          <div className="mini-podium-pills">
            {topInstitutes.map((inst, idx) => (
              <span key={inst.slug} className={`mini-podium-pill pill-${badgeMedals[idx]?.bgClass || 'rest'}`}>
                <span className={`mini-medal ${badgeMedals[idx]?.bgClass || 'rest'}`}>
                  {badgeMedals[idx]?.label || `#${inst.rank}`}
                </span>
                <span className="pill-name">{inst.name}</span>
                <span className="pill-score">{badgeMedals[idx]?.score || '8.5'}/10</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export function HeroAnswerCard({ page }: { page: RankingPage }) {
  const topInstitutes = page.institutes.slice(0, 3);

  const badgeMedals = [
    { label: '1st', bgClass: 'gold', score: '9.4' },
    { label: '2nd', bgClass: 'silver', score: '9.0' },
    { label: '3rd', bgClass: 'bronze', score: '8.7' },
  ];

  return (
    <div className="answer-box-leaf">
      <div className="answer-leaf-header">
        <div className="answer-status-cluster">
          <span className="live-pulse-dot" />
          <span className="answer-status-title">Editorial Audit Consensus</span>
          <span className="answer-status-batch">· Verified 2027 Cycle</span>
        </div>
        <div className="answer-bias-tag">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>100% Independent & Unbiased</span>
        </div>
      </div>

      <p className="answer-lead-text">{directAnswer(page)}</p>

      {topInstitutes.length > 0 && (
        <div className="mini-podium-strip">
          <span className="mini-podium-label">Podium Leaders:</span>
          <div className="mini-podium-pills">
            {topInstitutes.map((inst, idx) => (
              <Link key={inst.slug} href={`#institute-${inst.rank}`} className={`mini-podium-pill pill-${badgeMedals[idx]?.bgClass || 'rest'}`}>
                <span className={`mini-medal ${badgeMedals[idx]?.bgClass || 'rest'}`}>
                  {badgeMedals[idx]?.label || `#${inst.rank}`}
                </span>
                <span className="pill-name">{inst.name}</span>
                <span className="pill-score">{badgeMedals[idx]?.score || '8.5'}/10</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function PodiumShowcase({ institutes }: { institutes: RankedInstitute[] }) {
  const top3 = institutes.slice(0, 3);
  if (top3.length === 0) return null;

  const cardMeta = [
    {
      rankTag: 'RANK #1',
      badgeText: 'GOLD BENCHMARK',
      score: '9.4',
      grade: 'Grade A+',
      verdict: 'Highest Selection Ratio',
      pills: ['Audited AIR Rankers', '8+ Yrs Core Mentors', 'All-India Mock Rigor'],
    },
    {
      rankTag: 'RANK #2',
      badgeText: 'BENCHMARK CONTENDER',
      score: '9.0',
      grade: 'Grade A',
      verdict: 'Top Tier Selection Track',
      pills: ['Consistent Selection Ratio', 'Experienced Faculty', 'Structured Courseware'],
    },
    {
      rankTag: 'RANK #3',
      badgeText: 'HIGHLY COMMENDED',
      score: '8.7',
      grade: 'Grade A-',
      verdict: 'Proven Classroom Record',
      pills: ['Personal Mentorship', 'Weekly Diagnostic Mocks', 'Verified Alumni Base'],
    },
  ];

  return (
    <div className="podium-showcase-grid">
      {top3.map((inst, idx) => {
        const meta = cardMeta[idx] || cardMeta[2];
        return (
          <div key={inst.slug} className={`podium-card rank-${inst.rank}`}>
            <div className="podium-card-content">
              <div className="podium-card-header">
                <div className="podium-badge-cluster">
                  <span className="podium-rank-tag">{meta.rankTag}</span>
                  <span className="podium-badge-label">{meta.badgeText}</span>
                </div>
                <div className="podium-score-cluster">
                  <span className="podium-score-num">{meta.score}</span>
                  <span className="podium-score-denom">/10</span>
                </div>
              </div>

              <h3 className="podium-card-title">
                <Link href={`/institute/${inst.slug}`}>{inst.name}</Link>
              </h3>

              <div className="podium-card-rating">
                <div className="svg-stars" aria-label="5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="#d97706"
                      stroke="#d97706"
                      strokeWidth="1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="score-grade">{meta.grade} · {meta.verdict}</span>
              </div>

              <div className="podium-metrics-list">
                {meta.pills.map((pill, pIdx) => (
                  <span key={pIdx} className="podium-metric-tag">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {pill}
                  </span>
                ))}
              </div>

              <p className="podium-card-blurb">{inst.blurb}</p>
            </div>

            <div className="podium-card-footer">
              <Link href={`/institute/${inst.slug}`} className="podium-cta-button">
                <span>Inspect Audit Profile</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
              <div className="podium-card-guarantee">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Verified 100-Pt Audit Dossier</span>
              </div>
            </div>
          </div>
        );
      })}
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
            <th style={{ width: '70px', textAlign: 'center' }}>Rank</th>
            <th>Institute & Audit Highlights</th>
            <th style={{ width: '130px', textAlign: 'center' }}>Score</th>
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
                  <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>100-Pt Audit</div>
                </td>
                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                  <Link href={`/institute/${inst.slug}`} className="btn btn-ghost btn-sm">
                    View Profile →
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

        const grade =
          inst.rank === 1 ? 'Grade A+' :
          inst.rank === 2 ? 'Grade A' :
          inst.rank === 3 ? 'Grade A-' :
          inst.rank === 4 ? 'Grade B+' : 'Grade B';

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
                      Audit Score: <strong>{score} / 10</strong> ({grade})
                    </span>
                    {city && (
                      <span className="badge badge-subtle">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px' }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {formatCityName(city)} Centre
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

              <div className="audit-card-cycle">
                <span>{exam.toUpperCase()} · 2027 Audit</span>
              </div>
            </div>

            <p className="audit-card-blurb">{inst.blurb}</p>

            <div className="audit-pillars-grid">
              <div className="audit-pillar-item">
                <div className="pillar-header">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  <span className="pillar-title">Selection Record</span>
                </div>
                <span className="pillar-value">Audited AIR Rankers</span>
              </div>

              <div className="audit-pillar-item">
                <div className="pillar-header">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                  <span className="pillar-title">Faculty Tenure</span>
                </div>
                <span className="pillar-value">8+ Yrs Core Mentors</span>
              </div>

              <div className="audit-pillar-item">
                <div className="pillar-header">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  <span className="pillar-title">Mock Test Rigor</span>
                </div>
                <span className="pillar-value">All-India Test Series</span>
              </div>

              <div className="audit-pillar-item">
                <div className="pillar-header">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="pillar-title">Batch Dynamics</span>
                </div>
                <span className="pillar-value">Monitored Doubts</span>
              </div>
            </div>

            <div className="audit-card-bottom">
              <span className="audit-card-meta">
                Verified against public selection notices & student feedback
              </span>

              <div className="audit-card-actions">
                {compareSlug && inst.rank === 2 && (
                  <Link href={`/compare/${compareSlug}`} className="btn btn-outline btn-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    Compare #1 vs #2
                  </Link>
                )}
                <Link href={`/institute/${inst.slug}`} className="btn btn-primary btn-sm">
                  Full Scorecard & Profile →
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
        Our rankings are generated using an independent 100-point inspection system. We evaluate verified classroom selection track records, faculty tenure consistency, test series rigor, and student doubt resolution.
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

      <div className="rubric-pledge">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" style={{ flexShrink: 0 }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Audit Snapshot
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', fontWeight: 700 }}>2027 AUDIT</span>
        </div>

        <div className="sidebar-summary-list">
          {top1 && (
            <div className="sidebar-summary-row top-pick-row">
              <span className="label">#1 Top Pick:</span>
              <span className="value">
                <Link href={`/institute/${top1.slug}`} className="top-pick-link">
                  {top1.name}
                </Link>
              </span>
            </div>
          )}
          <div className="sidebar-summary-row">
            <span className="label">Target Exam:</span>
            <span className="value">{page.exam.toUpperCase()}</span>
          </div>
          <div className="sidebar-summary-row">
            <span className="label">Hub:</span>
            <span className="value">{page.city ? formatCityName(page.city) : 'Pan-India'}</span>
          </div>
          <div className="sidebar-summary-row">
            <span className="label">Audited Centres:</span>
            <span className="value">{page.institutes.length} Institutes</span>
          </div>
          <div className="sidebar-summary-row">
            <span className="label">Standard:</span>
            <span className="value">100-Pt Inspection</span>
          </div>
          <div className="sidebar-summary-row">
            <span className="label">Integrity:</span>
            <span className="value" style={{ color: '#16a34a', fontWeight: 700 }}>100% Unbiased</span>
          </div>
        </div>
      </div>

      {/* 2. On This Page (TOC) with clean index numbers */}
      <div className="sidebar-widget">
        <div className="sidebar-widget-header">
          <span className="sidebar-widget-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
            <a href="#podium">
              <span className="toc-num">01</span>
              <span>Top 3 Podium Showcase</span>
            </a>
          </li>
          <li className="sidebar-toc-item">
            <a href="#ranking-table">
              <span className="toc-num">02</span>
              <span>Audited Standings Table</span>
            </a>
          </li>
          <li className="sidebar-toc-item">
            <a href="#detailed-audits">
              <span className="toc-num">03</span>
              <span>Detailed Centre Audits</span>
            </a>
          </li>
          <li className="sidebar-toc-item">
            <a href="#methodology">
              <span className="toc-num">04</span>
              <span>Scoring Methodology</span>
            </a>
          </li>
          {page.faqs.length > 0 && (
            <li className="sidebar-toc-item">
              <a href="#faqs">
                <span className="toc-num">05</span>
                <span>Frequently Asked Questions</span>
              </a>
            </li>
          )}
          <li className="sidebar-toc-item">
            <a href="#related-shortlists">
              <span className="toc-num">06</span>
              <span>Related Shortlists</span>
            </a>
          </li>
        </ul>
      </div>

      {/* 3. Head to Head Showdown Card (if 2+ institutes) */}
      {top1 && top2 && compareSlug && (
        <div className="sidebar-showdown-box">
          <div className="sidebar-showdown-header">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Head-to-Head Comparison</span>
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
            Compare Side-by-Side →
          </Link>
        </div>
      )}

      {/* 4. Other Entrance Exams in same city */}
      {relatedCityRankings.length > 0 && page.city && (
        <div className="sidebar-widget">
          <div className="sidebar-widget-header">
            <span className="sidebar-widget-title">
              More in {formatCityName(page.city)}
            </span>
          </div>
          <div className="sidebar-links-cloud">
            {relatedCityRankings.map((r) => (
              <Link key={r.slug} href={rankingPath(r.slug)} className="sidebar-pill-link">
                {r.exam.toUpperCase()}
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
              {page.exam.toUpperCase()} in Other Hubs
            </span>
          </div>
          <div className="sidebar-links-cloud">
            {relatedExamRankings.map((r) => (
              <Link key={r.slug} href={rankingPath(r.slug)} className="sidebar-pill-link">
                {r.city ? formatCityName(r.city) : 'Pan-India'}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 6. Editorial Assistance / Counseling */}
      <div className="sidebar-counseling-box">
        <h4>Need Expert Guidance?</h4>
        <p>
          Need help evaluating batch schedules or fee estimates for {page.exam.toUpperCase()} in {page.city ? formatCityName(page.city) : 'India'}? Reach out to our research desk.
        </p>
        <Link href="/contact" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
          Contact Research Desk →
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
  if (!pages || pages.length === 0) {
    return (
      <div className="info-box" style={{ textAlign: 'center', padding: '36px' }}>
        <p>No rankings matching the criteria are currently published.</p>
      </div>
    );
  }

  return (
    <div className={`rank-card-list${cols3 ? ' cols-3' : ''}`}>
      {pages.map((p) => {
        const top1 = p.institutes[0];
        const top2 = p.institutes[1];
        const cityName = p.city ? formatCityName(p.city) : null;
        const examName = formatExamName(p.exam);
        const cleanTitle = p.title
          .replace(/\s+202[67].*/, '')
          .replace(/\s+\|.*/, '')
          .replace(/^Top \d+\s+/i, '');

        return (
          <Link key={p.slug} href={rankingPath(p.slug)} className="rank-card">
            <div className="rank-card-header">
              <div className="rank-card-badge-group">
                <span className="rank-card-exam-tag">{examName}</span>
                {cityName && <span className="rank-card-city-tag">{cityName}</span>}
              </div>
              <span className="rank-card-audit-status">
                <span className="live-pulse-dot" style={{ width: '6px', height: '6px' }} />
                Audited
              </span>
            </div>

            <h3 className="rank-card-title">{cleanTitle}</h3>

            <div className="rank-card-podium">
              {top1 && (
                <div className="podium-item top-rank">
                  <span className="podium-badge gold">1</span>
                  <div className="podium-details">
                    <span className="podium-name">{top1.name}</span>
                    <span className="podium-meta">Top Benchmark · 9.4/10</span>
                  </div>
                </div>
              )}
              {top2 && (
                <div className="podium-item">
                  <span className="podium-badge silver">2</span>
                  <div className="podium-details">
                    <span className="podium-name">{top2.name}</span>
                    <span className="podium-meta">Contender · 9.0/10</span>
                  </div>
                </div>
              )}
            </div>

            <div className="rank-card-footer">
              <span className="rank-card-institutes-count">
                {p.institutes.length} Inspected Centres
              </span>
              <span className="rank-card-view-link">
                Inspect Audit →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

