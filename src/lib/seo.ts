import { site, socialNetworks } from '@/lib/site';
import type { Project } from '@/lib/projects';

export function absoluteUrl(path = '/'): string {
  const base = site.url.replace(/\/$/, '');
  if (!path || path === '/') return base;
  return path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function absoluteAsset(src: string): string {
  if (!src) return absoluteUrl('/og-image.png');
  if (src.startsWith('http')) return src;
  return absoluteUrl(src);
}

const description =
  'Portfolio of Aymen Rguig — Graphic Designer & Art Director in Morocco. Brand identity, logo design, packaging, print, and social visuals for clients worldwide.';

export const seoCopy = {
  titleDefault: 'Aymen Rguig — Graphic Designer & Art Director',
  titleTemplate: '%s | Aymen Rguig',
  description,
  shortDescription: site.specialization,
  ogImage: '/og-image.png',
  keywords: [
    'Aymen Rguig',
    'Graphic Designer Morocco',
    'Art Director',
    'Brand Identity Designer',
    'Logo Design',
    'Packaging Design',
    'Print Design',
    'Social Media Design',
    'Typography',
    'Completo',
    '4pexvisual',
    'Portfolio',
    'Casablanca',
    'Morocco Designer',
  ],
};

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: absoluteUrl('/'),
    image: absoluteUrl('/logo.png'),
    jobTitle: site.title,
    description: seoCopy.description,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MA',
      addressLocality: site.location,
    },
    sameAs: [
      site.instagramApex,
      site.instagramPersonal,
      site.tiktok,
      site.linkedin,
      site.whatsappUrl,
    ],
    knowsAbout: site.roles,
    alumniOf: site.founderOf,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${site.name} Portfolio`,
    url: absoluteUrl('/'),
    description: seoCopy.description,
    inLanguage: 'en',
    publisher: {
      '@type': 'Person',
      name: site.name,
    },
  };
}

export function professionalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.brand,
    url: absoluteUrl('/'),
    image: absoluteUrl('/og-image.png'),
    description: seoCopy.description,
    email: site.email,
    telephone: site.whatsapp,
    areaServed: ['Morocco', 'Worldwide'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MA',
    },
    sameAs: socialNetworks.map((s) => s.href),
    priceRange: '$$',
  };
}

export function projectJsonLd(project: Project) {
  const image = absoluteAsset(project.hoverImage || project.images[0]);
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.overview || project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    image,
    dateCreated: project.year,
    creator: {
      '@type': 'Person',
      name: site.name,
      url: absoluteUrl('/'),
    },
    genre: project.type,
    keywords: project.tech.join(', '),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function portfolioItemListJsonLd(projects: Project[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${site.name} — Selected Work`,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/projects/${project.slug}`),
      name: project.title,
    })),
  };
}
