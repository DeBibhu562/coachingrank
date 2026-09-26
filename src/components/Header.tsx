'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const PRIMARY_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/exam', label: 'Exams' },
  { href: '/city', label: 'Cities' },
  { href: '/compare', label: 'Compare' },
] as const;

const SECONDARY_LINKS = [
  { href: '/institute', label: 'Institutes' },
  { href: '/criterion', label: 'By Criterion' },
  { href: '/about', label: 'Methodology' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />

        <nav className="nav-links" aria-label="Main Navigation">
          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
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
        <div className="mobile-nav-group">
          {PRIMARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              <span>{link.label}</span>
              <span style={{ color: 'var(--ink-faint)' }}>→</span>
            </Link>
          ))}
        </div>

        <div className="mobile-secondary-group">
          {SECONDARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-sec-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
          <Link
            href="/rankings"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => setMobileOpen(false)}
          >
            Explore 230+ Rankings
          </Link>
        </div>
      </div>
    </header>
  );
}
