import { media } from '@/lib/media';
import type { GalleryBlock } from '@/lib/projects';

export type PostFolioChapterId =
  | 'overview'
  | 'collection-1'
  | 'collection-2'
  | 'selected-works';

export interface PostFolioChapter {
  id: PostFolioChapterId;
  /** URL segment; empty string = /projects/post-folio */
  segment: string;
  index: number;
  label: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  href: string;
  hero?: string;
  blocks: GalleryBlock[];
}

const pf = (stem: string) => media(`post-folio/${stem}`, 'gallery');
const pr = (stem: string) => media(`print-folio/${stem}`, 'gallery');
const sm = (stem: string) => media(`social-media/${stem}`, 'gallery');

/**
 * Curated chapter distribution — art-directed, not sequential slicing.
 *
 * 01 Overview — statement pieces that define the folio’s range
 * 02 Collection I — wall-mockup posters: typography, portraits, energy
 * 03 Collection II — atmospheric mockups into print collateral
 * 04 Selected Works — commercial / social campaigns as the closing chapter
 */
export const POST_FOLIO_CHAPTERS: PostFolioChapter[] = [
  {
    id: 'overview',
    segment: '',
    index: 1,
    label: 'Overview',
    shortLabel: 'Overview',
    title: 'Overview',
    subtitle: 'Project introduction and selected highlights',
    href: '/projects/post-folio',
    hero: pf('art'),
    blocks: [
      { type: 'feature', src: pf('spider'), caption: 'Bold campaign statement' },
      { type: 'pair', sources: [pf('pale'), pf('mohammed-one')] },
      { type: 'feature', src: pr('mexico-resto'), caption: 'Bridge into print & promotion' },
    ],
  },
  {
    id: 'collection-1',
    segment: 'collection-1',
    index: 2,
    label: 'Collection I',
    shortLabel: 'Collection I',
    title: 'Collection I',
    subtitle: 'Poster mockups — typography, portrait, and motion',
    href: '/projects/post-folio/collection-1',
    hero: pf('cool'),
    blocks: [
      { type: 'pair', sources: [pf('chill'), pf('glory')] },
      { type: 'grid', sources: [pf('goatt'), pf('idol'), pf('m')], columns: 3 },
      { type: 'feature', src: pf('gt3'), caption: 'Automotive editorial' },
      { type: 'pair', sources: [pf('derham'), pf('lhaj-esco-one')] },
    ],
  },
  {
    id: 'collection-2',
    segment: 'collection-2',
    index: 3,
    label: 'Collection II',
    shortLabel: 'Collection II',
    title: 'Collection II',
    subtitle: 'Atmosphere, culture, and print systems',
    href: '/projects/post-folio/collection-2',
    hero: pf('move'),
    blocks: [
      {
        type: 'asymmetric',
        primary: pf('youssra'),
        secondary: pr('friday-cocktail'),
      },
      { type: 'grid', sources: [pr('spa'), pr('food'), pr('front')], columns: 3 },
      { type: 'fullBleed', src: pr('as') },
      { type: 'feature', src: pr('visite-card'), caption: 'Identity collateral' },
    ],
  },
  {
    id: 'selected-works',
    segment: 'selected-works',
    index: 4,
    label: 'Selected Works',
    shortLabel: 'Selected',
    title: 'Selected Works',
    subtitle: 'Campaign graphics and commercial applications',
    href: '/projects/post-folio/selected-works',
    hero: sm('black'),
    blocks: [
      { type: 'pair', sources: [sm('travel'), sm('health')] },
      { type: 'grid', sources: [sm('7ari'), sm('shobbe'), sm('mada')], columns: 3 },
      { type: 'feature', src: sm('macheal'), caption: 'Portrait campaign' },
      { type: 'fullBleed', src: sm('design') },
    ],
  },
];

export function getPostFolioChapters(): PostFolioChapter[] {
  return POST_FOLIO_CHAPTERS;
}

export function getPostFolioChapter(
  segment: string | undefined | null
): PostFolioChapter | undefined {
  const key = !segment || segment === 'overview' ? '' : segment;
  return POST_FOLIO_CHAPTERS.find((c) => c.segment === key);
}

export function getAdjacentChapters(segment: string | undefined | null): {
  prev?: PostFolioChapter;
  next?: PostFolioChapter;
  current?: PostFolioChapter;
} {
  const current = getPostFolioChapter(segment);
  if (!current) return {};
  const idx = POST_FOLIO_CHAPTERS.findIndex((c) => c.id === current.id);
  return {
    current,
    prev: idx > 0 ? POST_FOLIO_CHAPTERS[idx - 1] : undefined,
    next: idx < POST_FOLIO_CHAPTERS.length - 1 ? POST_FOLIO_CHAPTERS[idx + 1] : undefined,
  };
}

export function chapterMediaSources(chapter: PostFolioChapter): string[] {
  const out: string[] = [];
  if (chapter.hero) out.push(chapter.hero);
  for (const b of chapter.blocks) {
    if (b.type === 'feature' || b.type === 'fullBleed') out.push(b.src);
    else if (b.type === 'pair') out.push(...b.sources);
    else if (b.type === 'asymmetric') out.push(b.primary, b.secondary);
    else if (b.type === 'grid') out.push(...b.sources);
  }
  return out;
}

export const POST_FOLIO_CHAPTER_SEGMENTS = POST_FOLIO_CHAPTERS.filter((c) => c.segment).map(
  (c) => c.segment
);
