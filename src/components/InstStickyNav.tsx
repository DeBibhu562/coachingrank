'use client';

import { useEffect, useState, useRef } from 'react';

export interface NavItem {
  id: string;
  label: string;
  badge?: number | string;
}

interface InstStickyNavProps {
  items: NavItem[];
  ctaText?: string;
  ctaHref?: string;
}

export default function InstStickyNav({
  items,
  ctaText = 'Contact Desk',
  ctaHref = '#contact',
}: InstStickyNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || 'overview');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    // Scrollspy to determine the active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // Offset for header + sub-nav
      let current = items[0]?.id || 'overview';

      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          current = item.id;
          break;
        }
      }

      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  // Keep active tab centered in horizontal view on mobile
  useEffect(() => {
    const activeEl = tabRefs.current[activeId];
    const container = scrollContainerRef.current;
    if (activeEl && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeEl.getBoundingClientRect();
      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeId]);

  const scrollToTarget = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const yOffset = -128; // main header (70px) + sticky subnav (50px) + 8px breathing space
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      setActiveId(id);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToTarget(id);
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaHref.startsWith('#')) {
      e.preventDefault();
      scrollToTarget(ctaHref.replace('#', ''));
    }
  };

  return (
    <nav className="inst-sticky-nav" aria-label="Page Sections">
      <div className="container">
        <div className="inst-sticky-nav-wrap">
          <div className="inst-nav-scroll" ref={scrollContainerRef}>
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  ref={(el) => {
                    tabRefs.current[item.id] = el;
                  }}
                  onClick={(e) => handleTabClick(e, item.id)}
                  className={`inst-nav-tab ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge !== null && (
                    <span className="inst-nav-badge">{item.badge}</span>
                  )}
                </a>
              );
            })}
          </div>

          {ctaText && (
            <div className="inst-sticky-nav-cta">
              <a
                href={ctaHref}
                onClick={handleCtaClick}
                className="inst-subnav-btn"
              >
                <span>{ctaText}</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
