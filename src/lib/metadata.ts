import { Metadata } from 'next';
import { site } from '@/lib/site';
import { absoluteUrl, seoCopy } from '@/lib/seo';

export const siteMetadata: Metadata = {
  title: {
    default: seoCopy.titleDefault,
    template: seoCopy.titleTemplate,
  },
  description: seoCopy.description,
  keywords: seoCopy.keywords,
  authors: [{ name: site.name, url: absoluteUrl('/') }],
  creator: site.name,
  publisher: site.name,
  category: 'design',
  applicationName: `${site.name} Portfolio`,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: absoluteUrl('/'),
  },
  icons: {
    icon: [{ url: '/logo.webp', type: 'image/webp' }],
    apple: [{ url: '/logo.png', type: 'image/png' }],
    shortcut: '/logo.webp',
  },
  openGraph: {
    title: seoCopy.titleDefault,
    description: seoCopy.description,
    url: absoluteUrl('/'),
    siteName: `${site.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: seoCopy.ogImage,
        width: 1200,
        height: 630,
        alt: seoCopy.titleDefault,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoCopy.titleDefault,
    description: seoCopy.description,
    images: [seoCopy.ogImage],
    creator: '@4pexvisual',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  other: {
    'geo.region': 'MA',
    'geo.placename': site.location,
  },
};
