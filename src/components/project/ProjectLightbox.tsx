'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { gallerySrc, isSvgSrc } from '@/lib/media';

interface ProjectLightboxProps {
  sources: string[];
  index: number | null;
  title: string;
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function ProjectLightbox({
  sources,
  index,
  title,
  onClose,
  onChange,
}: ProjectLightboxProps) {
  const open = index !== null && index >= 0 && index < sources.length;
  const src = open ? gallerySrc(sources[index]) : null;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (index === null) return;
      const next = (index + dir + sources.length) % sources.length;
      onChange(next);
    },
    [index, onChange, sources.length]
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, go]);

  if (!open || !src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} artwork viewer`}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-ink/92 backdrop-blur-sm p-3 sm:p-6"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 font-mono text-xs uppercase tracking-widest text-cream/80 hover:text-accent"
        aria-label="Close"
      >
        Close ✕
      </button>

      {sources.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-2 sm:left-4 z-10 w-10 h-10 rounded-full border border-white/20 text-cream hover:border-accent hover:text-accent"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-2 sm:right-4 z-10 w-10 h-10 rounded-full border border-white/20 text-cream hover:border-accent hover:text-accent"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            →
          </button>
        </>
      )}

      <div
        className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={`${title} — ${index! + 1} of ${sources.length}`}
          fill
          sizes="(max-width: 1024px) 100vw, 1100px"
          unoptimized={isSvgSrc(src)}
          className="object-contain"
          priority
        />
      </div>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-widest text-muted">
        {String(index! + 1).padStart(2, '0')} / {String(sources.length).padStart(2, '0')}
      </p>
    </div>
  );
}
