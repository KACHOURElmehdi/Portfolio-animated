'use client';

import Image from 'next/image';
import { Link } from 'next-transition-router';
import type { Project } from '@/lib/projects';
import { isSvgSrc, thumbSrc } from '@/lib/media';

interface ProjectNavProps {
  prev?: Project;
  next?: Project;
}

function Card({
  project,
  direction,
}: {
  project: Project;
  direction: 'prev' | 'next';
}) {
  const thumb = thumbSrc(project.hoverImage || project.images[0]);
  const isPrev = direction === 'prev';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex gap-4 sm:gap-5 items-center py-6 sm:py-8 no-underline ${
        isPrev
          ? 'md:pr-8 border-b md:border-b-0 border-white/[0.08]'
          : 'flex-row-reverse text-right md:border-l border-white/[0.08] md:pl-8'
      }`}
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-surface-card border border-surface-border">
        <Image
          src={thumb}
          alt=""
          fill
          sizes="80px"
          unoptimized={isSvgSrc(thumb)}
          className="object-contain object-center p-1.5"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`font-mono text-xs uppercase tracking-widest text-muted mb-1.5 flex items-center gap-2 ${
            isPrev ? '' : 'justify-end'
          }`}
        >
          {isPrev ? (
            <>
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              Previous project
            </>
          ) : (
            <>
              Next project
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </>
          )}
        </p>
        <p className="font-display font-black uppercase tracking-tight leading-none text-[clamp(1.15rem,2.8vw,1.85rem)] text-light/70 group-hover:text-accent transition-colors truncate">
          {project.title}
        </p>
        <p className="mt-1.5 font-mono text-xs uppercase tracking-widest text-muted truncate">
          {project.type}
        </p>
      </div>
    </Link>
  );
}

export default function ProjectNav({ prev, next }: ProjectNavProps) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="Project navigation"
      className="grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.08]"
    >
      {prev ? <Card project={prev} direction="prev" /> : <div />}
      {next ? <Card project={next} direction="next" /> : <div />}
    </nav>
  );
}
