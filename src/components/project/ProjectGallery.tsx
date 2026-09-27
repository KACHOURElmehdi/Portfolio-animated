'use client';

import Image from 'next/image';
import type { GalleryBlock } from '@/lib/projects';
import { isSvgSrc, thumbSrc, gallerySrc } from '@/lib/media';

interface ProjectGalleryProps {
  blocks: GalleryBlock[];
  title: string;
  onOpen: (src: string) => void;
}

function Frame({
  src,
  alt,
  dense,
  priority,
  className,
  onOpen,
  sizes,
}: {
  src: string;
  alt: string;
  dense?: boolean;
  priority?: boolean;
  className?: string;
  onOpen: (src: string) => void;
  sizes: string;
}) {
  const display = dense ? thumbSrc(src) : gallerySrc(src);
  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      className={`group relative w-full overflow-hidden rounded-xl bg-surface-card border border-surface-border text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className || ''}`}
      aria-label={`View larger: ${alt}`}
    >
      <Image
        src={display}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        unoptimized={isSvgSrc(display)}
        className="object-contain object-center p-3 sm:p-4 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />
    </button>
  );
}

export default function ProjectGallery({ blocks, title, onOpen }: ProjectGalleryProps) {
  if (!blocks.length) return null;

  let counter = 1;

  return (
    <div className="flex flex-col gap-5 sm:gap-7 md:gap-10">
      {blocks.map((block, bi) => {
        if (block.type === 'feature' || block.type === 'fullBleed') {
          const n = counter++;
          return (
            <figure key={`f-${bi}`} className="w-full">
              <Frame
                src={block.src}
                alt={`${title} artwork ${n}`}
                sizes="(max-width: 768px) 100vw, 1100px"
                className={
                  block.type === 'fullBleed'
                    ? 'aspect-[4/5] sm:aspect-[16/10] min-h-[280px] max-h-[720px]'
                    : 'aspect-[4/5] sm:aspect-[16/10] min-h-[260px] max-h-[640px]'
                }
                onOpen={onOpen}
              />
              {block.type === 'feature' && block.caption && (
                <figcaption className="mt-2.5 font-mono text-[11px] uppercase tracking-widest text-muted">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === 'pair') {
          const a = counter++;
          const b = counter++;
          return (
            <div key={`p-${bi}`} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {block.sources.map((src, i) => (
                <Frame
                  key={src}
                  src={src}
                  alt={`${title} artwork ${i === 0 ? a : b}`}
                  dense
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="aspect-[4/5] sm:aspect-square min-h-[220px] max-h-[480px]"
                  onOpen={onOpen}
                />
              ))}
            </div>
          );
        }

        if (block.type === 'asymmetric') {
          const a = counter++;
          const b = counter++;
          return (
            <div
              key={`a-${bi}`}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-5 items-stretch"
            >
              <Frame
                src={block.primary}
                alt={`${title} artwork ${a}`}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="md:col-span-3 aspect-[4/5] sm:aspect-[16/11] min-h-[240px] max-h-[560px]"
                onOpen={onOpen}
              />
              <Frame
                src={block.secondary}
                alt={`${title} artwork ${b}`}
                dense
                sizes="(max-width: 768px) 100vw, 40vw"
                className="md:col-span-2 aspect-[4/5] sm:aspect-[4/5] min-h-[220px] max-h-[560px]"
                onOpen={onOpen}
              />
            </div>
          );
        }

        if (block.type === 'grid') {
          const cols = block.columns || 3;
          const start = counter;
          counter += block.sources.length;
          return (
            <div
              key={`g-${bi}`}
              className={`grid grid-cols-2 ${cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-3 sm:gap-4`}
            >
              {block.sources.map((src, i) => (
                <Frame
                  key={src}
                  src={src}
                  alt={`${title} artwork ${start + i}`}
                  dense
                  sizes={
                    cols === 3
                      ? '(max-width: 768px) 50vw, 33vw'
                      : '(max-width: 768px) 50vw, 50vw'
                  }
                  className="aspect-square min-h-[140px] max-h-[360px]"
                  onOpen={onOpen}
                />
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
