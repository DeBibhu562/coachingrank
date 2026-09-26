import Link from 'next/link';

export default function Logo({ size = 'default' }: { size?: 'default' | 'large' }) {
  const isLarge = size === 'large';

  return (
    <Link href="/" className={`brand-logo ${isLarge ? 'brand-logo--large' : ''}`} aria-label="CoachingRank.in Home">
      <span className="brand-emblem" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-emblem-svg">
          <defs>
            <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="logo-gold" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="logo-crimson" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          {/* Badge Base */}
          <rect width="40" height="40" rx="10" fill="url(#logo-bg)" stroke="#334155" strokeWidth="1.2" />
          <circle cx="20" cy="18" r="12" fill="#dc2626" fillOpacity="0.2" />

          {/* Podium Levels (2, 1, 3) */}
          <rect x="9" y="21" width="6" height="11" rx="1.5" fill="#94a3b8" />
          <rect x="17" y="15" width="6" height="17" rx="1.5" fill="url(#logo-gold)" />
          <rect x="25" y="23" width="6" height="9" rx="1.5" fill="#d97706" />

          {/* Crown / Star Over Center Podium */}
          <path d="M20 7.5L21.1 10.6L24.2 11.7L21.1 12.8L20 15.9L18.9 12.8L15.8 11.7L18.9 10.6Z" fill="url(#logo-gold)" />
        </svg>
      </span>

      <span className="brand-typography">
        <span className="brand-name">
          Coaching<span className="brand-name-accent">Rank</span>
          <span className="brand-tld">.in</span>
        </span>
        <span className="brand-tagline">Verified Coaching Authority</span>
      </span>
    </Link>
  );
}
