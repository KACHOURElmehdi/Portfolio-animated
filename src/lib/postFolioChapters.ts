import { media } from '@/lib/media';
import type { GalleryBlock } from '@/lib/projects';

export type PostFolioChapterId =
  | 'overview'
  | 'collection-1'
  | 'collection-2'
  | 'collection-3';

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

/** Only images from public/Media/post folio → public/optimized/post-folio */
const pf = (stem: string) => media(`post-folio/${stem}`, 'gallery');

/**
 * Post Folio — poster mockups only (15 pieces from Media/post folio).
 * Print and social are separate projects.
 */
export const POST_FOLIO_CHAPTERS: PostFolioChapter[] = [
  {
    id: 'overview',
    segment: '',
    index: 1,
    label: 'Overview',
    shortLabel: 'Overview',
    title: 'Overview',
    subtitle: 'Statement posters that set the tone',
    href: '/projects/post-folio',
    hero: pf('art'),
    blocks: [
      { type: 'feature', src: pf('spider'), caption: 'Bold campaign statement' },
      { type: 'pair', sources: [pf('pale'), pf('mohammed-one')] },
    ],
  },
  {
    id: 'collection-1',
    segment: 'collection-1',
    index: 2,
    label: 'Collection I',
    shortLabel: 'Collection I',
    title: 'Collection I',
    subtitle: 'Typography, portrait, and wall mockups',
    href: '/projects/post-folio/collection-1',
    hero: pf('cool'),
    blocks: [
      { type: 'pair', sources: [pf('chill'), pf('glory')] },
      { type: 'feature', src: pf('goatt') },
    ],
  },
  {
    id: 'collection-2',
    segment: 'collection-2',
    index: 3,
    label: 'Collection II',
    shortLabel: 'Collection II',
    title: 'Collection II',
    subtitle: 'Editorial energy and automotive',
    href: '/projects/post-folio/collection-2',
    hero: pf('idol'),
    blocks: [
      { type: 'pair', sources: [pf('m'), pf('gt3')] },
      { type: 'feature', src: pf('move'), caption: 'Atmosphere in motion' },
    ],
  },
  {
    id: 'collection-3',
    segment: 'collection-3',
    index: 4,
    label: 'Collection III',
    shortLabel: 'Collection III',
    title: 'Collection III',
    subtitle: 'Culture and portrait close',
    href: '/projects/post-folio/collection-3',
    hero: pf('youssra'),
    blocks: [
      { type: 'pair', sources: [pf('derham'), pf('lhaj-esco-one')] },
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
