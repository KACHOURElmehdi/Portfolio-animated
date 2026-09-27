/**
 * Helpers for optimized media under /public/optimized.
 * Originals stay in /public/Media; never reference them from the UI.
 */

export type MediaVariant = 'thumb' | 'hero' | 'gallery';

/** Raster derivative: `/optimized/<stem>/<variant>.webp` */
export function media(stem: string, variant: MediaVariant = 'gallery'): string {
  return `/optimized/${stem}/${variant}.webp`;
}

/** Copied SVG logo path (served as-is). */
export function logoSvg(name: string): string {
  return `/optimized/logos/${name}.svg`;
}

export function isSvgSrc(src: string): boolean {
  return src.toLowerCase().endsWith('.svg');
}

/** Swap WebP variant for lighter grid/thumb delivery. */
export function withMediaVariant(src: string, variant: MediaVariant): string {
  if (isSvgSrc(src)) return src;
  return src.replace(/\/(thumb|hero|gallery)\.webp$/i, `/${variant}.webp`);
}

export function gallerySrc(src: string): string {
  return withMediaVariant(src, 'gallery');
}

export function thumbSrc(src: string): string {
  return withMediaVariant(src, 'thumb');
}

export function heroSrc(src: string): string {
  return withMediaVariant(src, 'hero');
}
