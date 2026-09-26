import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="logo-brand" aria-label="CoachingRank home">
      <span className="logo-mark" aria-hidden>
        #
      </span>
      <span className="logo-text">
        <strong>CoachingRank</strong>
        <span>India coaching rankings</span>
      </span>
    </Link>
  );
}
