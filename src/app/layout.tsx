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
    default: `${SITE.name}.in | Coaching Rankings, City Hubs & Answer Engine`,
    template: `%s | ${SITE.name}.in`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  alternates: { canonical: '/' },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: `${SITE.name}.in | Coaching Rankings & Hubs`,
    description: SITE.tagline,
    url: SITE.url,
    siteName: `${SITE.name}.in`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name}.in | Coaching Rankings`,
    description: SITE.tagline,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE.name}.in`,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/rankings?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${SITE.name}.in`,
    url: SITE.url,
    email: SITE.email,
    logo: `${SITE.url}/favicon.svg`,
  };

  return (
    <html lang="en">
      <head>
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
