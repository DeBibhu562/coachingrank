'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const PRIMARY = [
  { href: '/', label: 'Home' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/exam', label: 'Exams' },
  { href: '/city', label: 'Cities' },
] as const;

const SECONDARY = [
  { href: '/institute', label: 'Institutes' },
  { href: '/compare', label: 'Compare' },
  { href: '/criterion', label: 'By criterion' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />

        <nav className="nav-links" aria-label="Main">
          {PRIMARY.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-cta">
          <Link href="/contact" className="btn btn-ghost">
            Contact
          </Link>
          <Link href="/rankings" className="btn btn-primary">
            Browse rankings
          </Link>
        </div>

        <button
          type="button"
          className="mobile-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <div id="mobile-nav" className={`mobile-panel${open ? ' open' : ''}`}>
        {PRIMARY.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <div className="mobile-secondary">
          {SECONDARY.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
