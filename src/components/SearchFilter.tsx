'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { RankingPage } from '@/data/rankings';

interface SearchFilterProps {
  rankings: RankingPage[];
  placeholder?: string;
  initialQuery?: string;
  showPills?: boolean;
}

const QUICK_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'CLAT & Law', value: 'clat' },
  { label: 'UPSC / IAS', value: 'upsc' },
  { label: 'IPMAT & CAT', value: 'ipmat' },
  { label: 'Delhi', value: 'delhi' },
  { label: 'Bangalore', value: 'bangalore' },
  { label: 'By Results', value: 'results' },
];

export default function SearchFilter({
  rankings,
  placeholder = 'Search by exam (CLAT, UPSC, IPMAT), city (Delhi, Bangalore), or institute...',
  showPills = true,
}: SearchFilterProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter rankings based on search query
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return rankings
      .filter((r) => {
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesExam = r.exam.toLowerCase().includes(q);
        const matchesCity = r.city ? r.city.toLowerCase().includes(q) : false;
        const matchesInstitute = r.institutes.some((i) => i.name.toLowerCase().includes(q));
        return matchesTitle || matchesExam || matchesCity || matchesInstitute;
      })
      .slice(0, 8);
  }, [rankings, query]);

  function handleFilterClick(filterValue: string) {
    setActiveFilter(filterValue);
    if (filterValue === 'all') {
      setQuery('');
      setIsOpen(false);
    } else if (filterValue === 'clat') {
      router.push('/exam/clat-coaching-rankings');
    } else if (filterValue === 'upsc') {
      router.push('/exam/upsc-coaching-rankings');
    } else if (filterValue === 'ipmat') {
      router.push('/exam/ipmat-coaching-rankings');
    } else if (filterValue === 'delhi') {
      router.push('/city/best-coaching-institutes-in-delhi');
    } else if (filterValue === 'bangalore') {
      router.push('/city/best-coaching-institutes-in-bangalore');
    } else if (filterValue === 'results') {
      router.push('/criterion/results-ranking');
    }
  }

  return (
    <div className="search-container" ref={containerRef}>
      <div className="search-input-box">
        <svg
          className="search-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          aria-label="Search rankings"
        />

        {query ? (
          <button
            type="button"
            className="btn btn-subtle btn-sm"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        ) : (
          <span className="search-badge">236 Hubs</span>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div className="search-results-dropdown">
          <div className="search-dropdown-group-title">Matching Rankings & Hubs</div>
          {searchResults.map((result) => (
            <Link
              key={result.slug}
              href={`/rankings/${result.slug}`}
              className="search-item"
              onClick={() => setIsOpen(false)}
            >
              <div>
                <div>{result.title.replace(/\s+2026.*/, '').replace(/\s+\|.*/, '')}</div>
                <div className="search-item-meta">
                  {result.institutes[0]?.name ? `#1 ${result.institutes[0].name}` : 'Rankings list'}
                </div>
              </div>
              <span className="search-item-meta">
                {result.city ? result.city.toUpperCase() : result.exam.toUpperCase()} →
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Category Filter Pills */}
      {showPills && (
        <div className="filter-pills-row">
          {QUICK_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`filter-pill ${activeFilter === f.value ? 'active' : ''}`}
              onClick={() => handleFilterClick(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
