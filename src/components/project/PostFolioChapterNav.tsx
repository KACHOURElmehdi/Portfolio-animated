'use client';

import { Link } from 'next-transition-router';
import {
  getAdjacentChapters,
  type PostFolioChapter,
} from '@/lib/postFolioChapters';

interface PostFolioChapterNavProps {
  current: PostFolioChapter;
  compact?: boolean;
}

/** Compact mobile label — keep readable, avoid wrapping the chrome. */
function mobileChapterLabel(chapter: PostFolioChapter): string {
  switch (chapter.id) {
    case 'collection-1':
      return 'Coll. I';
    case 'collection-2':
      return 'Coll. II';
    case 'collection-3':
      return 'Coll. III';
    default:
      return chapter.shortLabel;
  }
}

/**
 * Lightweight chapter chrome — no tab strip of all chapters.
 * Each page stands alone; only adjacent prev/next are offered.
 */
export default function PostFolioChapterNav({
  current,
  compact = false,
}: PostFolioChapterNavProps) {
  const { prev, next } = getAdjacentChapters(current.segment);

  return (
    <nav
      aria-label="Chapter position"
      className={`border-y border-white/[0.08] ${compact ? 'mb-6 sm:mb-8' : 'mb-8 sm:mb-12'}`}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4 py-1 sm:py-2">
        {prev ? (
          <Link
            href={prev.href}
            prefetch={false}
            aria-label={`Previous chapter: ${prev.label}`}
            className="group inline-flex items-center gap-1.5 sm:gap-2 min-h-11 py-3 font-mono text-xs uppercase tracking-[0.12em] sm:tracking-[0.16em] text-muted hover:text-cream no-underline transition-colors min-w-0 max-w-[38%]"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5 shrink-0">
              ←
            </span>
            <span className="truncate">
              <span className="sm:hidden">{mobileChapterLabel(prev)}</span>
              <span className="hidden sm:inline">
                {String(prev.index).padStart(2, '0')} {prev.shortLabel}
              </span>
            </span>
          </Link>
        ) : (
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted/50">Start</span>
        )}

        <p
          className="font-mono text-xs uppercase tracking-[0.2em] text-accent shrink-0"
          aria-current="page"
        >
          <span className="sr-only">
            Chapter {current.index} of 4: {current.label}
          </span>
          <span aria-hidden="true">
            {String(current.index).padStart(2, '0')} / 04
          </span>
        </p>

        {next ? (
          <Link
            href={next.href}
            prefetch={false}
            aria-label={`Next chapter: ${next.label}`}
            className="group inline-flex items-center gap-1.5 sm:gap-2 min-h-11 py-3 font-mono text-xs uppercase tracking-[0.12em] sm:tracking-[0.16em] text-muted hover:text-cream no-underline transition-colors min-w-0 max-w-[38%] justify-end text-right"
          >
            <span className="truncate">
              <span className="sm:hidden">{mobileChapterLabel(next)}</span>
              <span className="hidden sm:inline">
                {String(next.index).padStart(2, '0')} {next.shortLabel}
              </span>
            </span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 shrink-0">
              →
            </span>
          </Link>
        ) : (
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted/50 text-right">
            End
          </span>
        )}
      </div>
    </nav>
  );
}
