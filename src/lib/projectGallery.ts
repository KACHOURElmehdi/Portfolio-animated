import type { GalleryBlock, Project } from '@/lib/projects';
import { thumbSrc } from '@/lib/media';

export type { GalleryBlock };

/** Build editorial gallery blocks from project images + kind. */
export function buildGalleryLayout(project: Project): GalleryBlock[] {
  if (project.galleryLayout?.length) return project.galleryLayout;

  const imgs = project.images || [];
  if (imgs.length <= 1) return [];

  // Skip hero (images[0]) — already shown in the project opening.
  const rest = imgs.slice(1);

  switch (project.galleryKind || inferKind(project)) {
    case 'logos':
      return buildLogoLayout(rest);
    case 'posters':
      return buildPosterLayout(rest);
    case 'packaging':
      return buildPackagingLayout(rest);
    default:
      return buildDefaultLayout(rest);
  }
}

function inferKind(project: Project): NonNullable<Project['galleryKind']> {
  if (project.slug === 'logo-folio') return 'logos';
  if (project.slug === 'post-folio') return 'posters';
  if (project.slug === 'product-packaging') return 'packaging';
  return 'default';
}

function buildLogoLayout(imgs: string[]): GalleryBlock[] {
  if (!imgs.length) return [];
  const blocks: GalleryBlock[] = [{ type: 'feature', src: imgs[0], caption: 'Mark exploration' }];
  const remaining = imgs.slice(1);
  if (remaining.length === 1) {
    blocks.push({ type: 'feature', src: remaining[0] });
    return blocks;
  }
  // Dense grid for logo marks — much less scroll than stacked cards.
  for (let i = 0; i < remaining.length; i += 3) {
    const chunk = remaining.slice(i, i + 3);
    if (chunk.length === 1) blocks.push({ type: 'feature', src: chunk[0] });
    else if (chunk.length === 2) blocks.push({ type: 'pair', sources: [chunk[0], chunk[1]] });
    else blocks.push({ type: 'grid', sources: chunk, columns: 3 });
  }
  return blocks;
}

function buildPosterLayout(imgs: string[]): GalleryBlock[] {
  if (!imgs.length) return [];
  const blocks: GalleryBlock[] = [];
  let i = 0;
  // First remaining piece as feature
  if (imgs[i]) {
    blocks.push({ type: 'feature', src: imgs[i] });
    i += 1;
  }
  while (i < imgs.length) {
    const left = imgs.length - i;
    if (left >= 3 && i % 5 === 1) {
      blocks.push({ type: 'grid', sources: imgs.slice(i, i + 3), columns: 3 });
      i += 3;
    } else if (left >= 2) {
      blocks.push({ type: 'pair', sources: [imgs[i], imgs[i + 1]] });
      i += 2;
    } else {
      blocks.push({ type: 'fullBleed', src: imgs[i] });
      i += 1;
    }
  }
  return blocks;
}

function buildPackagingLayout(imgs: string[]): GalleryBlock[] {
  if (!imgs.length) return [];
  const blocks: GalleryBlock[] = [{ type: 'feature', src: imgs[0] }];
  let i = 1;
  while (i < imgs.length) {
    if (i + 1 < imgs.length) {
      if ((i - 1) % 4 === 0) {
        blocks.push({ type: 'asymmetric', primary: imgs[i], secondary: imgs[i + 1] });
      } else {
        blocks.push({ type: 'pair', sources: [imgs[i], imgs[i + 1]] });
      }
      i += 2;
    } else {
      blocks.push({ type: 'feature', src: imgs[i] });
      i += 1;
    }
  }
  return blocks;
}

function buildDefaultLayout(imgs: string[]): GalleryBlock[] {
  return imgs.map((src) => ({ type: 'feature' as const, src }));
}

/** Flatten blocks to ordered src list for lightbox. */
export function flattenGallerySources(blocks: GalleryBlock[], hero?: string): string[] {
  const out: string[] = [];
  if (hero) out.push(hero);
  for (const b of blocks) {
    if (b.type === 'feature' || b.type === 'fullBleed') out.push(b.src);
    else if (b.type === 'pair') out.push(...b.sources);
    else if (b.type === 'asymmetric') out.push(b.primary, b.secondary);
    else if (b.type === 'grid') out.push(...b.sources);
  }
  return out;
}

export function displaySrcForBlock(src: string, dense: boolean): string {
  return dense ? thumbSrc(src) : src;
}
