'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { PRIORITY_EXAMS, TOP_CITIES } from '@/data/site';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [examDropdown, setExamDropdown] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);
  const pathname = usePathname();

  const examDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (examDropdownRef.current && !examDropdownRef.current.contains(event.target as Node)) {
        setExamDropdown(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setCityDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setExamDropdown(false);
    setCityDropdown(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Logo />
          <div className="header-status-badge">
            <span className="live-pulse-dot" style={{ width: '6px', height: '6px' }} />
            <span>2027 Audit</span>
          </div>
        </div>

        <nav className="nav-links" aria-label="Main Navigation">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            Home
          </Link>

          <Link
            href="/rankings"
            className={`nav-link ${isActive('/rankings') ? 'active' : ''}`}
            aria-current={isActive('/rankings') ? 'page' : undefined}
          >
            Rankings
          </Link>

          {/* Exams Dropdown */}
          <div
            className="nav-dropdown-wrapper"
            ref={examDropdownRef}
            onMouseEnter={() => setExamDropdown(true)}
            onMouseLeave={() => setExamDropdown(false)}
          >
            <Link
              href="/exam"
              className={`nav-link nav-link-has-dropdown ${isActive('/exam') ? 'active' : ''}`}
              aria-expanded={examDropdown}
            >
              <span>Exams</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>

            {examDropdown && (
              <div className="nav-dropdown-menu exam-dropdown">
                <div className="dropdown-header">
                  <span>Priority Entrance Hubs</span>
                  <span className="dropdown-count">2027 Benchmarks</span>
                </div>
                <div className="dropdown-grid">
                  {PRIORITY_EXAMS.map((exam) => (
                    <Link
                      key={exam.slug}
                      href={exam.hub}
                      className="dropdown-item"
                      onClick={() => setExamDropdown(false)}
                    >
                      <div className="dropdown-item-info">
                        <span className="dropdown-item-title">{exam.label}</span>
                        <span className="dropdown-item-desc">{exam.category}</span>
                      </div>
                      <span className="dropdown-item-stat">{exam.intakeStat}</span>
                    </Link>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <Link href="/exam" onClick={() => setExamDropdown(false)}>
                    Browse All 28+ Exam Portals →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Cities Dropdown */}
          <div
            className="nav-dropdown-wrapper"
            ref={cityDropdownRef}
            onMouseEnter={() => setCityDropdown(true)}
            onMouseLeave={() => setCityDropdown(false)}
          >
            <Link
              href="/city"
              className={`nav-link nav-link-has-dropdown ${isActive('/city') ? 'active' : ''}`}
              aria-expanded={cityDropdown}
            >
              <span>Cities</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>

            {cityDropdown && (
              <div className="nav-dropdown-menu city-dropdown">
                <div className="dropdown-header">
                  <span>Premier Metro Hubs</span>
                  <span className="dropdown-count">Classroom Audited</span>
                </div>
                <div className="dropdown-grid">
                  {TOP_CITIES.map((city) => (
                    <Link
                      key={city.slug}
                      href={city.hub}
                      className="dropdown-item"
                      onClick={() => setCityDropdown(false)}
                    >
                      <div className="dropdown-item-info">
                        <span className="dropdown-item-title">{city.name}</span>
                        <span className="dropdown-item-desc">{city.tag}</span>
                      </div>
                      <span className="dropdown-arrow">→</span>
                    </Link>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <Link href="/city" onClick={() => setCityDropdown(false)}>
                    Explore All 32 Indian Coaching Cities →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/compare"
            className={`nav-link ${isActive('/compare') ? 'active' : ''}`}
            aria-current={isActive('/compare') ? 'page' : undefined}
          >
            Compare
          </Link>

          <Link
            href="/about"
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            aria-current={isActive('/about') ? 'page' : undefined}
          >
            Methodology
          </Link>
        </nav>

        <div className="header-actions">
          <Link href="/contact" className="btn btn-ghost btn-sm">
            Contact Desk
          </Link>
          <Link href="/rankings" className="btn btn-primary btn-sm">
            Browse Rankings →
          </Link>
        </div>

        <button
          type="button"
          className="mobile-toggle"
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div id="mobile-drawer" className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-inner">
          <div className="mobile-section-label">Navigation</div>
          <div className="mobile-nav-group">
            <Link href="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              <span>Home</span>
              <span style={{ color: 'var(--ink-faint)' }}>→</span>
            </Link>
            <Link href="/rankings" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              <span>All Rankings Directory</span>
              <span style={{ color: 'var(--ink-faint)' }}>→</span>
            </Link>
            <Link href="/compare" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              <span>Head-to-Head Compare</span>
              <span style={{ color: 'var(--ink-faint)' }}>→</span>
            </Link>
            <Link href="/about" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              <span>100-Pt Methodology</span>
              <span style={{ color: 'var(--ink-faint)' }}>→</span>
            </Link>
          </div>

          <div className="mobile-section-label" style={{ marginTop: '16px' }}>Priority Exams</div>
          <div className="mobile-grid-links">
            {PRIORITY_EXAMS.map((e) => (
              <Link
                key={e.slug}
                href={e.hub}
                className="mobile-grid-item"
                onClick={() => setMobileOpen(false)}
              >
                <span className="item-name">{e.label}</span>
                <span className="item-cat">{e.category}</span>
              </Link>
            ))}
          </div>

          <div className="mobile-section-label" style={{ marginTop: '16px' }}>Coaching Cities</div>
          <div className="mobile-cities-chips">
            {TOP_CITIES.map((c) => (
              <Link
                key={c.slug}
                href={c.hub}
                className="mobile-city-chip"
                onClick={() => setMobileOpen(false)}
              >
                {c.name}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link
              href="/rankings"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setMobileOpen(false)}
            >
              Explore 230+ Rankings
            </Link>
            <Link
              href="/contact"
              className="btn btn-ghost"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setMobileOpen(false)}
            >
              Contact Verification Desk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
