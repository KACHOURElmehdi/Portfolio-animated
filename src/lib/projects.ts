import { theme } from '@/lib/theme';

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  type: string;
  role: string;
  tech: string[];
  description: string;
  overview: string;
  architecture: string;
  implementation: string;
  stats: ProjectStat[];
  accent: string;
  myRole: string[];
  images: string[];
  hoverImage: string;
  github: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    slug: 'petcrib',
    title: 'PETCRIB',
    type: 'Branding & Uniform Design',
    role: 'Brand Designer',
    tech: [
      'Logo Design',
      'Brand Identity',
      'Color Palette',
      'Typography',
      'Uniform Design',
      'Brand Applications',
    ],
    description:
      'Created a pet-friendly brand identity for a pet hotel and grooming store using soothing blues, dark orange, and soft greens.',
    overview:
      'Created a pet-friendly brand identity for a pet hotel and grooming store using soothing blues, dark orange, and soft greens. The logo combines playful typography with a cozy house icon, symbolizing a safe and welcoming environment for pets.',
    architecture:
      'The brand identity extends across visual applications, including signage, stationery, and staff uniforms, creating a friendly and professional appearance. Color choices prioritize calm, pet-friendly hues—soft blues, dark orange, and soft greens.',
    implementation:
      'The design brings together pet-focused visual communication and a welcoming aesthetic. Applications include logo presentation, brand color palette, typography, pet photography, exterior signage, and staff polo shirt mockups.',
    stats: [
      { value: 'Brand', label: 'Identity system' },
      { value: 'Uniform', label: 'Staff applications' },
      { value: 'Signage', label: 'Environmental mockups' },
    ],
    accent: theme.green600,
    myRole: [
      'Designed the PETCRIB logo featuring a house icon with a dog silhouette.',
      'Defined a pet-friendly color palette of cream, soft blue, sage green, teal, and dark orange.',
      'Developed typography and brand applications for signage and stationery.',
      'Created staff uniform mockups with logo placement on polo shirts.',
    ],
    images: [
      '/Projects/petcrib/01_overview.webp',
      '/Projects/petcrib/02_logo.webp',
      '/Projects/petcrib/03_mockups.webp',
    ],
    hoverImage: '/Projects/petcrib/01_overview.webp',
    github: '',
    liveUrl: '',
  },
  {
    id: 2,
    slug: 'artisan',
    title: 'Artisan',
    type: 'Branding, Landing Page & Packaging',
    role: 'Brand & Packaging Designer',
    tech: [
      'Brand Identity',
      'Logo Design',
      'Packaging Design',
      'Web Design',
      'Landing Page',
      'Product Presentation',
    ],
    description:
      'Natural, authentic brand identity for Artisan Soap Bar, spanning packaging, product presentation, and landing page design.',
    overview:
      'This project focused on creating a natural, authentic, and eco-conscious brand identity for Artisan Soap Bar, a handcrafted organic soap brand. The branding direction centers on earthy tones—primarily moss green, soft nude, and warm beige—reflecting the brand’s focus on natural ingredients and sustainability.',
    architecture:
      'The packaging concept uses minimalist layouts, botanical illustrations, and kraft-paper materials to communicate an artisanal aesthetic. The visual identity combines an elegant serif logo with natural textures and understated color combinations.',
    implementation:
      'The landing page extends this design system into a clean digital experience, using prominent product imagery, ingredient highlights, and sustainability messaging. Deliverables include logo, color palette, typography, soap packaging, product photography, packaging mockups, and landing page mockups.',
    stats: [
      { value: 'Packaging', label: 'Product systems' },
      { value: 'Web', label: 'Landing page' },
      { value: 'Identity', label: 'Brand toolkit' },
    ],
    accent: theme.green500,
    myRole: [
      'Designed the Artisan Soap Bar logo and secondary mark.',
      'Built an earthy brand palette of moss green, soft nude, and warm beige.',
      'Created packaging layouts with botanical line illustrations.',
      'Extended the identity into landing page mockups and product presentations.',
    ],
    images: [
      '/Projects/artisan/01_overview.webp',
      '/Projects/artisan/02_identity.webp',
      '/Projects/artisan/03_packaging.webp',
    ],
    hoverImage: '/Projects/artisan/01_overview.webp',
    github: '',
    liveUrl: '',
  },
  {
    id: 3,
    slug: 'soda-crave',
    title: 'Soda Crave',
    type: 'Logo Design & Product Design',
    role: 'Brand & Product Designer',
    tech: [
      'Logo Design',
      'Beverage Branding',
      'Packaging Design',
      'Product Identity',
      'Product Mockups',
    ],
    description:
      'Bold, colorful brand identity for Soda Crave—a high-energy soda drink line built to stand out on crowded shelves.',
    overview:
      'This project involved creating a bold, colorful, and high-energy brand identity for Soda Crave, a new soda drink line targeting a youthful and fun-loving audience. The core design direction was to make the product stand out on crowded shelves through vibrant visuals and unconventional design elements.',
    architecture:
      'The logo features exaggerated, bubbly typography with dynamic motion lines, conveying fizz, fun, and excitement. Packaging incorporates full-wrap labels with flavor-themed patterns such as citrus slices, strawberries, and grapes.',
    implementation:
      'High-contrast color combinations and bold graphics were used to make the cans visually distinctive. Deliverables include the Soda Crave logo and flavor can mockups in purple, yellow citrus, and pink strawberry variants.',
    stats: [
      { value: 'Logo', label: 'Bubbly wordmark' },
      { value: '3+', label: 'Flavor can designs' },
      { value: 'Pack', label: 'Full-wrap labels' },
    ],
    accent: theme.green400,
    myRole: [
      'Designed the bubbly Soda Crave logo with dynamic motion accents.',
      'Created flavor-themed can mockups for grape, citrus, and strawberry variants.',
      'Developed high-contrast packaging graphics for shelf visibility.',
      'Built a playful product identity system for a youth-focused beverage line.',
    ],
    images: [
      '/Projects/soda-crave/01_overview.webp',
      '/Projects/soda-crave/02_cans.webp',
      '/Projects/soda-crave/03_flavors.webp',
    ],
    hoverImage: '/Projects/soda-crave/01_overview.webp',
    github: '',
    liveUrl: '',
  },
  {
    id: 4,
    slug: 'logo-folio',
    title: 'Top Ten Logo',
    type: 'Logo Folio',
    role: 'Logo Designer',
    tech: ['Logo Design', 'Identity Marks', 'Icon Design', 'Illustrator', 'Photoshop'],
    description:
      'A curated selection of ten logo designs spanning identity marks, icon systems, and brand symbols.',
    overview:
      'Logo Folio presents a selection titled Top Ten Logo—ten logo designs spanning monograms, icon marks, and brand symbols across multiple industries.',
    architecture:
      'Each mark is designed as a standalone identity asset, exploring silhouette, typography, and symbolic forms suited to different brand contexts.',
    implementation:
      'Presented as a curated logo grid from the Logo Folio section of the 2026 portfolio. High-resolution individual logo files are pending for better gallery clarity.',
    stats: [
      { value: '10', label: 'Logo marks' },
      { value: '01', label: 'Logo Folio' },
      { value: '2026', label: 'Portfolio year' },
    ],
    accent: theme.green300,
    myRole: [
      'Designed a set of ten logo concepts and identity marks.',
      'Explored monogram, icon, and pictorial logo approaches.',
      'Prepared logo presentations for the Logo Folio section.',
    ],
    images: [
      '/Projects/logo-folio/01_top-ten.webp',
      '/Projects/logo-folio/02_brand-header.webp',
    ],
    hoverImage: '/Projects/logo-folio/01_top-ten.webp',
    github: '',
    liveUrl: '',
  },
  {
    id: 5,
    slug: 'post-folio',
    title: 'Post Folio',
    type: 'Print & Social Media Design',
    role: 'Graphic Designer',
    tech: [
      'Print Design',
      'Poster Design',
      'Social Media Design',
      'Promotional Graphics',
      'Campaign Visuals',
    ],
    description:
      'A collection of poster, print, and social media designs spanning promotional, editorial, and event visuals.',
    overview:
      'Post Folio gathers poster, flyer, and social media work including promotional advertising, healthcare and clinic graphics, real estate materials, fashion and streetwear visuals, restaurant posters, and event promotions.',
    architecture:
      'Designs are organized as a visual collection rather than individual client case studies. Artwork emphasizes bold typography, photography-led layouts, and campaign-ready compositions for print and digital channels.',
    implementation:
      'Includes social media posters such as Black Friday promotions, event flyers, food advertising, and floral promotional designs, alongside broader print folio work from the 2026 portfolio.',
    stats: [
      { value: '03', label: 'Post Folio' },
      { value: 'Print', label: 'Poster & flyer work' },
      { value: 'Social', label: 'Digital campaigns' },
    ],
    accent: theme.green200,
    myRole: [
      'Designed promotional posters and print communication pieces.',
      'Created social media campaign graphics and event visuals.',
      'Developed food, fashion, and entertainment-oriented poster layouts.',
    ],
    images: [
      '/Projects/post-folio/02_print-grid.webp',
      '/Projects/post-folio/01_grid.webp',
      '/Projects/post-folio/03_social.webp',
    ],
    hoverImage: '/Projects/post-folio/02_print-grid.webp',
    github: '',
    liveUrl: '',
  },
  {
    id: 6,
    slug: 'product-packaging',
    title: 'Product Packaging',
    type: 'Product & Packaging Design',
    role: 'Packaging Designer',
    tech: [
      'Packaging Design',
      'Product Identity',
      'Label Design',
      'Print Production',
      'Pharmaceutical Packaging',
    ],
    description:
      'Product packaging and pharmaceutical-style packaging examples, including Zofenil and Spasmomen design work.',
    overview:
      'Product Folio showcases packaging design examples, including pharmaceutical-style packaging labeled Zofenil and Spasmomen, presented as packaging design work from campaign and product identity projects.',
    architecture:
      'Designs focus on clear product hierarchy, dosage communication, and structured packaging layouts suitable for regulated product presentation.',
    implementation:
      'Gallery includes packaging mockups and related campaign flyer artwork. Presented as packaging design examples without medical endorsement or commercial outcome claims.',
    stats: [
      { value: '06', label: 'Product Folio' },
      { value: 'Pack', label: 'Packaging systems' },
      { value: 'Print', label: 'Production-ready' },
    ],
    accent: theme.green700,
    myRole: [
      'Designed pharmaceutical-style packaging layouts and product boxes.',
      'Developed supporting campaign flyer artwork for packaging brands.',
      'Structured product information hierarchies for packaging applications.',
    ],
    images: [
      '/Projects/packaging/01_menarini.webp',
      '/Projects/packaging/03_zofenil-plus.webp',
      '/Projects/packaging/04_spasmomen-flyer.webp',
      '/Projects/packaging/02_recent.webp',
    ],
    hoverImage: '/Projects/packaging/01_menarini.webp',
    github: '',
    liveUrl: '',
  },
];

export function getAllProjects(): Project[] {
  return projects;
}
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: projects[(idx - 1 + projects.length) % projects.length],
    next: projects[(idx + 1) % projects.length],
  };
}
