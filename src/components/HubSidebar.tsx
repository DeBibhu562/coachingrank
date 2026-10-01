'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE, PRIORITY_EXAMS, TOP_CITIES } from '@/data/site';

interface HubSidebarProps {
  currentPath?: string;
  activeCategory?: string;
}

export default function HubSidebar({ currentPath, activeCategory }: HubSidebarProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/rankings') return activePath === '/rankings';
    if (href === '/institute') return activePath.startsWith('/institute');
    if (href === '/colleges') return activePath.startsWith('/colleges');
    if (href === '/exam') return activePath === '/exam';
    if (href === '/city') return activePath === '/city';
    if (href === '/compare') return activePath.startsWith('/compare');
    return activePath === href;
  }

  const PRIMARY_HUBS = [
    { label: 'All Rankings', href: '/rankings', icon: '🏆', badge: '230+' },
    { label: 'Coaching Institutes', href: '/institute', icon: '🏛️', badge: '80+ Brands' },
    { label: 'Top Colleges (NLUs/IITs)', href: '/colleges', icon: '🎓', badge: '30 Top' },
    { label: 'Exam Portals', href: '/exam', icon: '🎯', badge: '28+ Exams' },
    { label: 'Metro Cities', href: '/city', icon: '🏙️', badge: '32 Cities' },
    { label: 'Compare Institutes', href: '/compare', icon: '⚖️', badge: 'H2H' },
  ];

  const POPULAR_EXAMS = [
    { label: 'UPSC Civil Services', href: '/exam/upsc-coaching-rankings', icon: '🏛️' },
    { label: 'CLAT & Law Entrance', href: '/exam/clat-coaching-rankings', icon: '⚖️' },
    { label: 'CAT & Management', href: '/exam/cat-coaching-rankings', icon: '📊' },
    { label: 'IPMAT (IIMs & BBA)', href: '/exam/ipmat-coaching-rankings', icon: '🎯' },
    { label: 'IIT JEE & Engineering', href: '/exam/jee-coaching-rankings', icon: '⚙️' },
    { label: 'NEET UG Medical', href: '/exam/neet-coaching-rankings', icon: '🩺' },
    { label: 'SSC & Banking (CGL/PO)', href: '/exam/ssc-coaching-rankings', icon: '💼' },
    { label: 'Share Market & Trading', href: '/exam/share-market-coaching-rankings', icon: '📈' },
    { label: 'CDS / NDA Defence', href: '/exam/nda-coaching-rankings', icon: '🎖️' },
  ];

  const KEY_METROS = [
    { name: 'Delhi Coaching', href: '/city/best-coaching-institutes-in-delhi' },
    { name: 'Bengaluru Coaching', href: '/city/best-coaching-institutes-in-bangalore' },
    { name: 'Mumbai Coaching', href: '/city/best-coaching-institutes-in-mumbai' },
    { name: 'Hyderabad Coaching', href: '/city/best-coaching-institutes-in-hyderabad' },
    { name: 'Kota Coaching', href: '/city/best-coaching-institutes-in-kota' },
    { name: 'Pune Coaching', href: '/city/best-coaching-institutes-in-pune' },
    { name: 'Jaipur Coaching', href: '/city/best-coaching-institutes-in-jaipur' },
    { name: 'Lucknow Coaching', href: '/city/best-coaching-institutes-in-lucknow' },
  ];

  return (
    <div className="hub-sidebar-container">
      {/* Mobile Top Navigation & Toggle Bar */}
      <div className="hub-mobile-bar">
        <div className="hub-mobile-scroll-pills">
          {PRIMARY_HUBS.map((hub) => (
            <Link
              key={hub.href}
              href={hub.href}
              className={`hub-mobile-pill ${isActive(hub.href) ? 'active' : ''}`}
            >
              <span>{hub.icon}</span>
              <span>{hub.label}</span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="hub-mobile-drawer-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
        >
          <span>{mobileOpen ? '✕ Close Filters & Hubs' : '☰ All Hubs & Categories Filter'}</span>
          <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{mobileOpen ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Main Sidebar Card (Sticky on desktop, expandable on mobile) */}
      <aside className={`hub-sidebar ${mobileOpen ? 'mobile-visible' : ''}`}>
        {/* Section 1: Directory Hubs */}
        <div className="hub-sidebar-section">
          <div className="hub-sidebar-section-title">
            <span>Navigation Hubs</span>
            <span style={{ color: 'var(--brand-primary)', fontSize: '0.72rem' }}>2027 AUDIT</span>
          </div>
          <ul className="hub-sidebar-nav-list">
            {PRIMARY_HUBS.map((hub) => (
              <li key={hub.href}>
                <Link
                  href={hub.href}
                  className={`hub-sidebar-link ${isActive(hub.href) ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="hub-sidebar-link-left">
                    <span className="hub-sidebar-link-icon">{hub.icon}</span>
                    <span className="hub-sidebar-link-text">{hub.label}</span>
                  </div>
                  <span className="hub-sidebar-badge">{hub.badge}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2: Priority Entrance Exams */}
        <div className="hub-sidebar-section">
          <div className="hub-sidebar-section-title">
            <span>Priority Entrance Exams</span>
            <Link href="/exam" className="hub-sidebar-title-link">All 28+ →</Link>
          </div>
          <ul className="hub-sidebar-nav-list">
            {POPULAR_EXAMS.map((exam) => {
              const isExamActive = activePath.includes(exam.href);
              return (
                <li key={exam.href}>
                  <Link
                    href={exam.href}
                    className={`hub-sidebar-link ${isExamActive ? 'active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="hub-sidebar-link-left">
                      <span className="hub-sidebar-link-icon">{exam.icon}</span>
                      <span className="hub-sidebar-link-text">{exam.label}</span>
                    </div>
                    <span style={{ color: 'var(--ink-faint)', fontSize: '0.75rem' }}>→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Section 3: Premier Metro Coaching Hubs */}
        <div className="hub-sidebar-section">
          <div className="hub-sidebar-section-title">
            <span>Premier Coaching Metros</span>
            <Link href="/city" className="hub-sidebar-title-link">32 Cities →</Link>
          </div>
          <div className="hub-sidebar-chips-grid">
            {KEY_METROS.map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="hub-sidebar-chip"
                onClick={() => setMobileOpen(false)}
              >
                {city.name.replace(' Coaching', '')}
              </Link>
            ))}
          </div>
        </div>

        {/* Section 4: Colleges by Stream */}
        <div className="hub-sidebar-section">
          <div className="hub-sidebar-section-title">
            <span>Colleges Directory</span>
            <Link href="/colleges" className="hub-sidebar-title-link">View All 30 →</Link>
          </div>
          <ul className="hub-sidebar-nav-list">
            <li>
              <Link
                href="/colleges#law"
                className="hub-sidebar-link"
                onClick={() => setMobileOpen(false)}
              >
                <div className="hub-sidebar-link-left">
                  <span className="hub-sidebar-link-icon">⚖️</span>
                  <span className="hub-sidebar-link-text">Top 10 Law NLUs</span>
                </div>
                <span className="hub-sidebar-badge">NIRF #1–7</span>
              </Link>
            </li>
            <li>
              <Link
                href="/colleges#engineering"
                className="hub-sidebar-link"
                onClick={() => setMobileOpen(false)}
              >
                <div className="hub-sidebar-link-left">
                  <span className="hub-sidebar-link-icon">⚙️</span>
                  <span className="hub-sidebar-link-text">Premier IITs &amp; NITs</span>
                </div>
                <span className="hub-sidebar-badge">Top 10</span>
              </Link>
            </li>
            <li>
              <Link
                href="/colleges#medical"
                className="hub-sidebar-link"
                onClick={() => setMobileOpen(false)}
              >
                <div className="hub-sidebar-link-left">
                  <span className="hub-sidebar-link-icon">🩺</span>
                  <span className="hub-sidebar-link-text">Apex AIIMS &amp; CMC</span>
                </div>
                <span className="hub-sidebar-badge">Top 10</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 5: Audited Trust & Advisory Widget */}
        <div className="hub-sidebar-trust-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🛡️</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
                100% Zero Paid Placements
              </h4>
              <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                Independent forensic audits only.
              </p>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', margin: 0, lineHeight: 1.45 }}>
            Need unbiased advice on genuine batch sizes, fee negotiations, or faculty track records?
          </p>
          <Link
            href="/contact"
            className="btn btn-primary btn-sm"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '6px 12px' }}
            onClick={() => setMobileOpen(false)}
          >
            Talk to Advisory Desk →
          </Link>
        </div>
      </aside>
    </div>
  );
}
