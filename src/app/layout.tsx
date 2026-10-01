import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE } from '@/data/site';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${SITE.name}.in | India’s Independent Coaching Rankings, City Hubs & Answer Engine`,
    template: `%s | ${SITE.name}.in`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: `${SITE.name}.in | Coaching Rankings, City Hubs & Forensic Audits`,
    description: SITE.tagline,
    url: SITE.url,
    siteName: `${SITE.name}.in`,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name}.in | India’s Coaching Rankings`,
    description: SITE.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE.name}.in`,
    alternateName: ['CoachingRank', 'Coaching Rank India'],
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/rankings?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: `${SITE.name}.in`,
    alternateName: ['CoachingRank', 'Coaching Rank India', 'CoachingRank.in'],
    url: SITE.url,
    email: SITE.email,
    logo: `${SITE.url}/favicon.svg`,
    description:
      'India’s independent coaching ranking encyclopedia and 100-point forensic audit directory across 28+ competitive entrance exams and 32+ cities.',
    foundingDate: '2024',
    knowsAbout: [
      'Competitive Exams in India',
      'UPSC Civil Services Coaching',
      'IIT JEE Main & Advanced Coaching',
      'NEET UG Medical Coaching',
      'CLAT & AILET Law Coaching',
      'CAT & IPMAT Management Coaching',
      'Judiciary PCS-J Coaching',
      'Coaching Fee Transparency & Audits',
    ],
    publishingPrinciples: `${SITE.url}/about#editorial-charter`,
    ethicsPolicy: `${SITE.url}/about#anti-corruption`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE.email,
      contactType: 'Editorial & Verification Desk',
      availableLanguage: ['English', 'Hindi'],
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
