export const site = {
  name: 'Aymen Rguig',
  firstName: 'Aymen',
  lastName: 'Rguig',
  handle: '4pexvisual',
  brand: 'Aymen Rguig',
  email: 'aymeenrguig@gmail.com',
  whatsapp: '+212 7 05 26 94 15',
  whatsappUrl: 'https://wa.me/212705269415',
  instagramApex: 'https://www.instagram.com/4pexvisual',
  tiktok: 'https://www.tiktok.com/@4pexvisuals',
  instagramPersonal: 'https://www.instagram.com/4yyymn',
  linkedin: 'https://www.linkedin.com/in/aymen-rguig-420295341',
  /** Served from public/Cv — URL-safe copy of the master PDF. */
  cvUrl: '/Cv/aymen-rguig.pdf',
  cvFileName: 'Aymen-Rguig-CV.pdf',
  location: 'Morocco',
  timeZone: 'Africa/Casablanca',
  timeZoneLabel: 'GMT+1',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://aymen-rguig.vercel.app'),
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
  spotify: {
    title: 'Ayman has no enemies',
    url: 'https://open.spotify.com/playlist/1CbOpL5Ffcn30zK90BG8C7',
    embedUrl:
      'https://open.spotify.com/embed/playlist/1CbOpL5Ffcn30zK90BG8C7?utm_source=generator&theme=0',
    blurb:
      'A working soundtrack for late nights, mockups, and the space between ideas—press play while you browse the work.',
  },
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

export type SocialIconName = 'instagram' | 'tiktok' | 'linkedin' | 'whatsapp' | 'email';

export type SocialNetwork = {
  id: string;
  label: string;
  href: string;
  handle?: string;
  icon: SocialIconName;
};

/** Public social profiles — cleaned URLs, no tracking params. */
export const socialNetworks: SocialNetwork[] = [
  {
    id: 'instagram-apex',
    label: 'Instagram',
    handle: '@4pexvisual',
    href: site.instagramApex,
    icon: 'instagram',
  },
  {
    id: 'tiktok-apex',
    label: 'TikTok',
    handle: '@4pexvisuals',
    href: site.tiktok,
    icon: 'tiktok',
  },
  {
    id: 'instagram-aymen',
    label: 'Instagram',
    handle: '@4yyymn',
    href: site.instagramPersonal,
    icon: 'instagram',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Aymen Rguig',
    href: site.linkedin,
    icon: 'linkedin',
  },
];

export type SocialKey = 'whatsapp' | 'email';

export const socials: Record<SocialKey, { label: string; href: string }> = {
  whatsapp: { label: 'WhatsApp', href: site.whatsappUrl },
  email: { label: 'Email', href: `mailto:${site.email}` },
};

/** Contact channels (WhatsApp + email) for menus and footers. */
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

/** Categories that match publicly shipped projects. */
export const portfolioCategories = [
  { id: '01', name: 'Logo Folio' },
  { id: '02', name: 'Brand Folio' },
  { id: '03', name: 'Post Folio' },
  { id: '04', name: 'Print Folio' },
  { id: '05', name: 'Social Media' },
  { id: '06', name: 'Product Folio' },
  { id: '07', name: 'Recent Projects' },
] as const;
