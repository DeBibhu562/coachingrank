import Link from 'next/link';
import { PRIORITY_EXAMS, SITE } from '@/data/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-brand">{SITE.name}.in</div>
        <p className="footer-tagline">{SITE.tagline}</p>
        <p className="stack-sm">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>

        <div className="footer-grid">
          <div>
            <h4>Explore</h4>
            <Link href="/rankings">Rankings</Link>
            <Link href="/exam">Exam hubs</Link>
            <Link href="/city">City hubs</Link>
            <Link href="/institute">Institutes</Link>
          </div>

          <div>
            <h4>Priority exams</h4>
            {PRIORITY_EXAMS.map((e) => (
              <Link key={e.slug} href={e.hub}>
                {e.label}
              </Link>
            ))}
          </div>

          <div>
            <h4>Site</h4>
            <Link href="/compare">Compare</Link>
            <Link href="/criterion">By criterion</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-note">
          © {SITE.year} {SITE.name}.in · Independent coaching rankings for students and parents.
        </div>
      </div>
    </footer>
  );
}
