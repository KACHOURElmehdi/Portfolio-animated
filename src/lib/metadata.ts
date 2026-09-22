import { Metadata } from 'next';
import { site } from '@/lib/site';

const description =
  'Explore the portfolio of Aymen Rguig, a Graphic Designer and Art Director specializing in brand identity, logo design, packaging, print design, and creative visual communication.';

export const siteMetadata: Metadata = {
  title: {
    default: 'Aymen Rguig — Graphic Designer & Art Director',
    template: '%s | Aymen Rguig',
  },
  description,
  keywords: [
    'Aymen Rguig',
    'Graphic Designer',
    'Art Director',
    'Brand Identity',
    'Logo Design',
    'Packaging Design',
    'Print Design',
    'Social Media Design',
    'Typography',
    'Portfolio',
    'Completo',
  ],
  authors: [
    {
      name: site.name,
    },
  ],
  creator: site.name,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: './',
  },
  icons: {
    icon: '/logo.webp',
  },
  openGraph: {
    title: 'Aymen Rguig — Graphic Designer & Art Director',
    description,
    url: site.url,
    siteName: 'Aymen Rguig Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aymen Rguig — Graphic Designer & Art Director',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aymen Rguig — Graphic Designer & Art Director',
    description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
