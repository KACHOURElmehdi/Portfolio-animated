'use client';

import { Link } from 'next-transition-router';
import {
  getPostFolioChapters,
  type PostFolioChapter,
} from '@/lib/postFolioChapters';

interface PostFolioChapterNavProps {
  current: PostFolioChapter;
  compact?: boolean;
}

export default function PostFolioChapterNav({
  current,
  compact = false,
}: PostFolioChapterNavProps) {
  const chapters = getPostFolioChapters();

  return (
    <nav
      aria-label="Post Folio chapters"
      className={`border-y border-white/[0.08] ${compact ? 'mb-6 sm:mb-8' : 'mb-8 sm:mb-12'}`}
    >
      <div className="flex items-center justify-between gap-3 py-3 sm:py-3.5">
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted shrink-0">
          Post Folio
        </p>
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-accent shrink-0">
          {String(current.index).padStart(2, '0')} / 04
        </p>
      </div>

      <ul className="flex gap-1 overflow-x-auto pb-3 sm:pb-3.5 -mx-1 px-1 scrollbar-none">
        {chapters.map((chapter) => {
          const active = chapter.id === current.id;
          return (
            <li key={chapter.id} className="shrink-0">
              <Link
                href={chapter.href}
                prefetch={false}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-widest no-underline transition-colors ${
                  active
                    ? 'bg-accent/20 text-accent border border-accent/40'
                    : 'text-muted border border-transparent hover:text-cream hover:border-white/15'
                }`}
              >
                <span className="opacity-70">{String(chapter.index).padStart(2, '0')}</span>
                <span className="hidden sm:inline">{chapter.label}</span>
                <span className="sm:hidden">{chapter.shortLabel}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
