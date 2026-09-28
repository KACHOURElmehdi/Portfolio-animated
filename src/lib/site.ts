export const site = {
  name: 'Aymen Rguig',
  firstName: 'Aymen',
  lastName: 'Rguig',
  handle: 'apex_visuals',
  brand: 'Aymen Rguig',
  email: 'aymeenrguig@gmail.com',
  whatsapp: '+212 7 05 26 94 15',
  whatsappUrl: 'https://wa.me/212705269415',
  location: 'Morocco',
  timeZone: 'Africa/Casablanca',
  timeZoneLabel: 'GMT+1',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  tagline: 'A Designer who Judges a book by its cover.',
  taglineSupport: 'Because if the cover does not impress you, what else can?',
  /** Clear first-screen specialization — grounded in shipped work. */
  specialization:
    'Graphic designer & art director focused on brand identity, packaging, print, and social visuals.',
  title: 'Graphic Designer & Art Director',
  shortTitle: 'Graphic Designer',
  founderOf: 'Completo',
  portfolioYear: '2026',
  contactLead:
    'Have a project, collaboration, or opportunity in mind? Get in touch.',
  roles: [
    'Graphic Designer',
    'Art Director',
    'Brand Identity Design',
    'Logo Design',
    'Packaging Design',
    'Print Design',
    'Social Media Design',
    'Typography',
    'AI-Assisted Visual Creation',
  ],
};

export type SocialKey = 'whatsapp' | 'email';

export const socials: Record<SocialKey, { label: string; href: string }> = {
  whatsapp: { label: 'WhatsApp', href: site.whatsappUrl },
  email: { label: 'Email', href: `mailto:${site.email}` },
};

/** Only links with real hrefs — no dead social placeholders. */
export const socialList: Array<{ label: string; href: string }> = [
  socials.whatsapp,
  socials.email,
].filter((s) => Boolean(s.href));

export const navLinks = [
  { name: 'Home', href: '/#top', menuOnly: true },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Work', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
] as const;

export const stats = [
  { value: '2500', suffix: '+', label: 'Design Hours' },
  { value: '50', suffix: '+', label: 'Clients' },
  { value: '3', suffix: '', label: 'Years of Experience' },
  { value: '3', suffix: '+', label: 'Countries Served' },
] as const;

/** Categories that match publicly shipped projects (Print lives inside Post Folio). */
export const portfolioCategories = [
  { id: '01', name: 'Logo Folio' },
  { id: '02', name: 'Brand Folio' },
  { id: '03', name: 'Post Folio' },
  { id: '04', name: 'Product Folio' },
] as const;
