import { theme } from '@/lib/theme';
import { logoSvg, media } from '@/lib/media';

export interface ProjectStat {
  value: string;
  label: string;
}

export type GalleryBlock =
  | { type: 'feature'; src: string; caption?: string }
  | { type: 'pair'; sources: [string, string] }
  | { type: 'grid'; sources: string[]; columns?: 2 | 3 }
  | { type: 'asymmetric'; primary: string; secondary: string }
  | { type: 'fullBleed'; src: string };

export interface Project {
  id: number;
  slug: string;
  title: string;
  type: string;
  role: string;
  year?: string;
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
  /** Controls auto gallery composition when galleryLayout is omitted. */
  galleryKind?: 'logos' | 'posters' | 'packaging' | 'default';
  /** Optional explicit editorial blocks. */
  galleryLayout?: GalleryBlock[];
}

const projects: Project[] = [
  {
    id: 1,
    slug: 'petcrib',
    title: 'PETCRIB',
    type: 'Branding & Uniform Design',
    role: 'Brand Designer',
    year: '2025',
    galleryKind: 'default',
    tech: [
      'Logo Design',
      'Brand Identity',
      'Color Palette',
      'Typography',
      'Uniform Design',
      'Brand Applications',
    ],
    description:
      'Brand identity for a pet hotel and grooming store—logo, palette, environmental signage, and staff uniforms.',
    overview:
      'PETCRIB needed a friendly, trustworthy identity for a pet hotel and grooming business. The mark pairs a house icon with dog and cat silhouettes, set in a calm palette of cream, soft blue, sage, teal, and dark orange—readable at large signage scale and on staff uniforms.',
    architecture:
      'The system is built to travel: logo and typography lockups feed wall graphics, exterior signage, and polo applications so guests meet the same brand indoors and out.',
    implementation:
      'Deliverables shown: brand system board, interior logo application, exterior signage, and front/back staff polo mockups cropped from the original presentation board.',
    stats: [
      { value: 'Brand', label: 'Identity system' },
      { value: 'Uniform', label: 'Staff applications' },
      { value: 'Signage', label: 'Environmental mockups' },
    ],
    accent: theme.green600,
    myRole: [
      'Designed the PETCRIB logo featuring a house icon with dog and cat silhouettes.',
      'Defined a pet-friendly color palette of cream, soft blue, sage green, teal, and dark orange.',
      'Developed typography and brand applications for signage.',
      'Created staff uniform mockups with logo placement on polo shirts.',
    ],
    images: [
      media('brand-folio/petcrib-brand', 'gallery'),
      media('brand-folio/petcrib-system', 'gallery'),
      media('brand-folio/petcrib-wall', 'gallery'),
      media('brand-folio/petcrib-exterior', 'gallery'),
      media('brand-folio/petcrib-uniforms', 'gallery'),
    ],
    galleryLayout: [
      { type: 'feature', src: media('brand-folio/petcrib-system', 'gallery'), caption: 'Brand system' },
      {
        type: 'asymmetric',
        primary: media('brand-folio/petcrib-wall', 'gallery'),
        secondary: media('brand-folio/petcrib-exterior', 'gallery'),
      },
      { type: 'feature', src: media('brand-folio/petcrib-uniforms', 'gallery'), caption: 'Staff uniforms' },
    ],
    hoverImage: media('brand-folio/petcrib-brand', 'hero'),
    github: '',
    liveUrl: '',
  },
  {
    id: 2,
    slug: 'artisan',
    title: 'Artisan',
    type: 'Branding, Landing Page & Packaging',
    role: 'Brand & Packaging Designer',
    year: '2025',
    galleryKind: 'default',
    tech: [
      'Brand Identity',
      'Logo Design',
      'Packaging Design',
      'Web Design',
      'Landing Page',
      'Product Presentation',
    ],
    description:
      'Earthy identity for Artisan Soap Bar—logo system, botanical packaging, and landing page presentation.',
    overview:
      'Artisan Soap Bar is a handcrafted organic soap brand. The identity uses moss green, soft nude, and warm beige with an elegant serif wordmark and a circular “A” sub-mark—positioning the product as quiet, natural, and premium on shelf.',
    architecture:
      'Packaging leans on kraft and deep-green cartons with botanical line illustration. The same visual language carries into a clean digital landing page built around product photography and the primary lockup.',
    implementation:
      'Gallery crops from the original board: brand system, logo treatment, desktop/laptop website mockup, and dual soap-box packaging.',
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
      media('brand-folio/artisan-brand', 'gallery'),
      media('brand-folio/artisan-system', 'gallery'),
      media('brand-folio/artisan-logo', 'gallery'),
      media('brand-folio/artisan-web', 'gallery'),
      media('brand-folio/artisan-packaging', 'gallery'),
    ],
    galleryLayout: [
      { type: 'feature', src: media('brand-folio/artisan-system', 'gallery'), caption: 'Brand system' },
      {
        type: 'pair',
        sources: [
          media('brand-folio/artisan-logo', 'gallery'),
          media('brand-folio/artisan-web', 'gallery'),
        ],
      },
      {
        type: 'feature',
        src: media('brand-folio/artisan-packaging', 'gallery'),
        caption: 'Packaging',
      },
    ],
    hoverImage: media('brand-folio/artisan-brand', 'hero'),
    github: '',
    liveUrl: '',
  },
  {
    id: 3,
    slug: 'soda-crave',
    title: 'Soda Crave',
    type: 'Logo Design & Product Design',
    role: 'Brand & Product Designer',
    year: '2025',
    galleryKind: 'default',
    tech: [
      'Logo Design',
      'Beverage Branding',
      'Packaging Design',
      'Product Identity',
      'Product Mockups',
    ],
    description:
      'High-energy beverage identity for Soda Crave—bubbly wordmark plus grape, citrus, and strawberry can designs.',
    overview:
      'Soda Crave is a youth-focused soda line designed to cut through crowded shelves with bold color, condensation-led product shots, and flavor-specific illustration—each SKU stays distinct while sharing one bubbly wordmark.',
    architecture:
      'A single bubbly lockup anchors three flavor cans (grape, citrus, strawberry). Backgrounds, line-art fruit motifs, and can graphics shift per flavor without breaking the parent brand.',
    implementation:
      'Gallery crops from the original flavor board: logo lockup and three can mockups presented as an editorial sequence.',
    stats: [
      { value: 'Logo', label: 'Bubbly wordmark' },
      { value: '3', label: 'Flavor can designs' },
      { value: 'Pack', label: 'Can graphics' },
    ],
    accent: theme.green400,
    myRole: [
      'Designed the bubbly Soda Crave logo with dynamic motion accents.',
      'Created flavor-themed can mockups for grape, citrus, and strawberry variants.',
      'Developed high-contrast packaging graphics for shelf visibility.',
      'Built a playful product identity system for a youth-focused beverage line.',
    ],
    images: [
      media('brand-folio/soda-crave', 'gallery'),
      media('brand-folio/soda-logo', 'gallery'),
      media('brand-folio/soda-grape', 'gallery'),
      media('brand-folio/soda-citrus', 'gallery'),
      media('brand-folio/soda-strawberry', 'gallery'),
    ],
    galleryLayout: [
      { type: 'feature', src: media('brand-folio/soda-logo', 'gallery'), caption: 'Wordmark' },
      {
        type: 'grid',
        sources: [
          media('brand-folio/soda-grape', 'gallery'),
          media('brand-folio/soda-citrus', 'gallery'),
          media('brand-folio/soda-strawberry', 'gallery'),
        ],
        columns: 3,
      },
    ],
    hoverImage: media('brand-folio/soda-crave', 'hero'),
    github: '',
    liveUrl: '',
  },
  {
    id: 4,
    slug: 'logo-folio',
    title: 'Top Ten Logo',
    type: 'Logo Folio',
    role: 'Logo Designer',
    year: '2026',
    galleryKind: 'logos',
    tech: ['Logo Design', 'Identity Marks', 'Icon Design', 'Illustrator', 'Photoshop'],
    description:
      'A curated selection of ten logo designs spanning identity marks, icon systems, and brand symbols.',
    overview:
      'Logo Folio presents a selection titled Top Ten Logo—ten logo designs spanning monograms, icon marks, and brand symbols across multiple industries.',
    architecture:
      'Each mark is designed as a standalone identity asset, exploring silhouette, typography, and symbolic forms suited to different brand contexts.',
    implementation:
      'Presented as individual logo marks from the Logo Folio: Apex, barber, beauty, car wash, delivery, fashion, moto, phone, Taylor, and ZOFI.',
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
      logoSvg('apex-logo'),
      logoSvg('barber'),
      logoSvg('beauty'),
      logoSvg('car-wash'),
      logoSvg('delivery'),
      logoSvg('girl'),
      logoSvg('moto'),
      logoSvg('phone'),
      logoSvg('taylor'),
      media('logos/zofi-logo', 'gallery'),
    ],
    hoverImage: media('logos/zofi-logo', 'hero'),
    github: '',
    liveUrl: '',
  },
  {
    id: 5,
    slug: 'post-folio',
    title: 'Post Folio',
    type: 'Print & Social Media Design',
    role: 'Graphic Designer',
    year: '2026',
    galleryKind: 'posters',
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
      'Post Folio gathers poster mockups and campaign visuals—from typographic statements and portrait treatments to automotive, sports, and cultural pieces—alongside print and social media work for restaurants, events, and promotions.',
    architecture:
      'Designs are organized as a visual collection rather than individual client case studies. Artwork emphasizes bold typography, photography-led layouts, and campaign-ready compositions for print and digital channels.',
    implementation:
      'Presented as four connected chapters: Overview, Collection I, Collection II, and Selected Works—so each set of posters, print pieces, and campaign graphics can be browsed with intention.',
    stats: [
      { value: '04', label: 'Chapters' },
      { value: 'Print', label: 'Poster & flyer work' },
      { value: 'Social', label: 'Digital campaigns' },
    ],
    accent: theme.green200,
    myRole: [
      'Designed promotional posters and print communication pieces.',
      'Created social media campaign graphics and event visuals.',
      'Developed food, fashion, and entertainment-oriented poster layouts.',
    ],
    // Home card / metadata only — chapter pages load their own curated media.
    images: [media('post-folio/art', 'gallery')],
    hoverImage: media('post-folio/art', 'hero'),
    github: '',
    liveUrl: '',
  },
  {
    id: 6,
    slug: 'product-packaging',
    title: 'Product Packaging',
    type: 'Product & Packaging Design',
    role: 'Packaging Designer',
    year: '2025',
    galleryKind: 'packaging',
    tech: [
      'Packaging Design',
      'Product Identity',
      'Label Design',
      'Print Production',
      'Pharmaceutical Packaging',
    ],
    description:
      'Packaging and product identity—Marani Coffee, food packs, and curated pharmaceutical-style systems for Zofenil and Spasmomen.',
    overview:
      'Product Folio gathers packaging work including Marani Coffee brand applications, food packaging, and pharmaceutical-style boxes for Zofenil and Spasmomen—each system prioritizes clear hierarchy and production-ready layouts.',
    architecture:
      'Layouts balance brand storytelling with readable product information suitable for retail shelves and regulated presentation, using consistent type scales and panel structure across SKUs.',
    implementation:
      'Curated gallery: Marani board, selected food packs, one strongest Zofenil system, and Spasmomen—without near-duplicate Zofenil variants.',
    stats: [
      { value: '06', label: 'Product Folio' },
      { value: 'Pack', label: 'Packaging systems' },
      { value: 'Print', label: 'Production-ready' },
    ],
    accent: theme.green700,
    myRole: [
      'Designed pharmaceutical-style packaging layouts and product boxes.',
      'Developed food and coffee brand packaging applications.',
      'Structured product information hierarchies for packaging applications.',
    ],
    images: [
      media('brand-folio/marani-brand', 'gallery'),
      media('packaging/pack', 'gallery'),
      media('packaging/cls', 'gallery'),
      media('packaging/zofi', 'gallery'),
      media('packaging/spass', 'gallery'),
    ],
    galleryLayout: [
      {
        type: 'pair',
        sources: [media('packaging/pack', 'gallery'), media('packaging/cls', 'gallery')],
      },
      { type: 'feature', src: media('packaging/zofi', 'gallery'), caption: 'Zofenil' },
      { type: 'feature', src: media('packaging/spass', 'gallery'), caption: 'Spasmomen' },
    ],
    hoverImage: media('brand-folio/marani-brand', 'hero'),
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
