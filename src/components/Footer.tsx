import Link from 'next/link';
import { SITE, PRIORITY_EXAMS } from '@/data/site';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Logo size="large" />
            <p>
              India’s trusted coaching ranking encyclopedia. We publish unbiased national and city-wise shortlists,
              criterion lenses, and transparent institute comparisons for students and parents.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="footer-trust-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                100% Zero Paid Placements
              </span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Independent forensic audits across 28+ entrance exams.
              </span>
            </div>
          </div>

          {/* Column 1: Priority Exams */}
          <div className="footer-col">
            <h4>Priority Exams</h4>
            <ul>
              {PRIORITY_EXAMS.map((exam) => (
                <li key={exam.slug}>
                  <Link href={exam.hub}>{exam.label} Coaching</Link>
                </li>
              ))}
              <li>
                <Link href="/exam">All 28+ Exam Hubs →</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Top Cities */}
          <div className="footer-col">
            <h4>Coaching Hubs</h4>
            <ul>
              <li>
                <Link href="/city/best-coaching-institutes-in-delhi">Delhi Coaching</Link>
              </li>
              <li>
                <Link href="/city/best-coaching-institutes-in-bangalore">Bengaluru Coaching</Link>
              </li>
              <li>
                <Link href="/city/best-coaching-institutes-in-mumbai">Mumbai Coaching</Link>
              </li>
              <li>
                <Link href="/city/best-coaching-institutes-in-hyderabad">Hyderabad Coaching</Link>
              </li>
              <li>
                <Link href="/city/best-coaching-institutes-in-kota">Kota Coaching</Link>
              </li>
              <li>
                <Link href="/city">All 32 City Hubs →</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Site & Directory */}
          <div className="footer-col">
            <h4>Directory & Platform</h4>
            <ul>
              <li>
                <Link href="/about">About Us &amp; Charter</Link>
              </li>
              <li>
                <Link href="/sitemap">Tree Sitemap Directory</Link>
              </li>
              <li>
                <Link href="/rankings">All Rankings Index</Link>
              </li>
              <li>
                <Link href="/criterion">Rankings By Criterion</Link>
              </li>
              <li>
                <Link href="/compare">Institute Comparisons</Link>
              </li>
              <li>
                <Link href="/institute">Ranked Institutes Index</Link>
              </li>
              <li>
                <Link href="/colleges">Top Colleges Directory (30 NLUs, IITs, AIIMS)</Link>
              </li>
              <li>
                <Link href="/contact">Editorial &amp; Verification Desk</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {SITE.year} {SITE.name}.in. All rights reserved. Independent rankings and shortlists for educational purposes.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Link href="/about" style={{ color: '#94a3b8' }}>About Us</Link>
            <Link href="/sitemap" style={{ color: '#94a3b8' }}>Tree Sitemap</Link>
            <a href="/sitemap.xml" style={{ color: '#94a3b8' }}>XML Sitemap</a>
            <a href="/llms.txt" style={{ color: '#94a3b8' }}>AI / LLM Manifest</a>
            <Link href="/contact" style={{ color: '#94a3b8' }}>Contact Desk</Link>
            <a href={`mailto:${SITE.email}`} style={{ color: '#94a3b8' }}>{SITE.email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
