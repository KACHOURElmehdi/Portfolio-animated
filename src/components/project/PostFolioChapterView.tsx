'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from 'next-transition-router';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { FaArrowUp } from 'react-icons/fa';
import { getProjectBySlug, getAdjacentProjects } from '@/lib/projects';
import { site } from '@/lib/site';
import { heroSrc, isSvgSrc } from '@/lib/media';
import { flattenGallerySources } from '@/lib/projectGallery';
import { useReducedMotion } from '@/lib/useReducedMotion';
import {
  getAdjacentChapters,
  type PostFolioChapter,
} from '@/lib/postFolioChapters';
import ProjectGallery from '@/components/project/ProjectGallery';
import ProjectLightbox from '@/components/project/ProjectLightbox';
import ProjectNav from '@/components/project/ProjectNav';
import PostFolioChapterNav from '@/components/project/PostFolioChapterNav';

interface PostFolioChapterViewProps {
  chapter: PostFolioChapter;
}

export default function PostFolioChapterView({ chapter }: PostFolioChapterViewProps) {
  const project = getProjectBySlug('post-folio')!;
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { prev: prevChapter, next: nextChapter } = getAdjacentChapters(chapter.segment);
  const { prev: prevProject, next: nextProject } = getAdjacentProjects('post-folio');
  const isOverview = chapter.id === 'overview';

  const lightboxSources = useMemo(
    () => flattenGallerySources(chapter.blocks, chapter.hero),
    [chapter]
  );

  useEffect(() => {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [chapter.id]);

  useGSAP(
    () => {
      if (reduced || !titleRef.current) return;
      const el = titleRef.current.querySelector('.pd-title-text');
      if (!el) return;
      const split = SplitText.create(el, { type: 'lines', mask: 'lines' });
      gsap.fromTo(
        split.lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.75,
          ease: EASE.outQuart,
          stagger: 0.05,
          delay: 0.08,
        }
      );
      return () => split.revert();
    },
    { scope: rootRef, dependencies: [chapter.id, reduced] }
  );

  const scrollToTop = () => {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (src: string) => {
    const idx = lightboxSources.findIndex((s) => s === src);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  const metaLine = [project.type, project.role, project.year].filter(Boolean).join(' · ');

  return (
    <section
      ref={rootRef}
      className="min-h-screen bg-surface-base text-white px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-5 sm:mb-8">
          <Link
            href="/"
            prefetch={false}
            onClick={() => {
              try {
                if (!sessionStorage.getItem('projects-scroll')) {
                  sessionStorage.setItem('nav_target_section', 'projects');
                }
              } catch {}
            }}
            className="inline-flex items-center gap-2 min-h-11 py-3 -my-1 text-muted hover:text-white transition-colors duration-200 group"
          >
            <span className="text-base transform group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest">Back to Work</span>
          </Link>
        </div>

        <PostFolioChapterNav current={chapter} compact={!isOverview} />

        {isOverview ? (
          <header className="mb-8 sm:mb-12">
            <h1
              ref={titleRef}
              aria-label={project.title}
              className="font-display font-black uppercase tracking-tight leading-[0.98] text-[clamp(2.25rem,7vw,5.5rem)] mb-4"
            >
              <span aria-hidden="true" className="pd-title-text block">
                {project.title}
              </span>
            </h1>
            <p className="font-mono text-[13px] sm:text-sm uppercase tracking-[0.16em] text-accent mb-5">
              {metaLine}
            </p>
            <p className="max-w-2xl text-base sm:text-lg md:text-xl text-light/85 font-sans leading-relaxed">
              {project.description}
            </p>
          </header>
        ) : (
          <header className="mb-6 sm:mb-8">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted mb-2">
              Post Folio
            </p>
            <h1
              ref={titleRef}
              className="font-display font-black uppercase tracking-tight leading-none text-[clamp(1.75rem,5vw,3.4rem)] mb-2"
            >
              <span className="pd-title-text block">{chapter.title}</span>
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {chapter.subtitle}
            </p>
          </header>
        )}

        {chapter.hero && (
          <button
            type="button"
            onClick={() => openLightbox(chapter.hero!)}
            className="relative w-full aspect-[4/5] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-surface-card border border-surface-border mb-8 sm:mb-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`View ${chapter.title} hero artwork`}
          >
            <Image
              src={heroSrc(chapter.hero)}
              alt={`${project.title} — ${chapter.title} hero`}
              fill
              sizes="(max-width: 768px) 100vw, 1100px"
              priority
              unoptimized={isSvgSrc(chapter.hero)}
              className="object-contain object-center p-3 sm:p-5"
            />
          </button>
        )}

        {isOverview && (
          <>
            <section className="mb-10 sm:mb-14">
              <div className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-8">
                <div className="md:col-span-3">
                  <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-accent">
                    Overview
                  </h2>
                </div>
                <div className="md:col-span-9">
                  <p className="text-base sm:text-lg md:text-[1.35rem] text-light font-sans leading-relaxed max-w-3xl">
                    {project.overview}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10 sm:mb-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div>
                <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-accent mb-3">
                  Challenge
                </h2>
                <p className="text-[0.95rem] sm:text-base md:text-lg text-light/85 font-sans leading-relaxed max-w-xl">
                  {project.architecture}
                </p>
              </div>
              <div>
                <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-accent mb-3">
                  Approach
                </h2>
                <p className="text-[0.95rem] sm:text-base md:text-lg text-light/85 font-sans leading-relaxed max-w-xl">
                  {project.implementation}
                </p>
              </div>
            </section>

            {project.myRole?.length > 0 && (
              <section className="mb-12 sm:mb-16">
                <AnimatedHeading
                  words={[{ t: 'KEY' }, { t: 'moves', serif: true }]}
                  showLine={false}
                  containerClassName="mb-5 sm:mb-8"
                  className="text-[clamp(1.75rem,4.5vw,3.2rem)] text-white"
                />
                <ul className="divide-y divide-white/[0.06] border-t border-b border-white/[0.06]">
                  {project.myRole.map((role, i) => (
                    <li key={i} className="py-3.5 sm:py-4 flex items-start gap-3 sm:gap-5">
                      <span aria-hidden="true" className="font-mono text-xs text-accent mt-1 shrink-0 w-6 sm:w-8">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm sm:text-base text-light/85 font-sans leading-relaxed">
                        {role}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mb-5 sm:mb-8 flex items-end justify-between gap-4">
              <h2 className="font-display font-black uppercase tracking-tight text-[clamp(1.75rem,4.5vw,3.2rem)]">
                Selected Highlights
              </h2>
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-muted">
                {lightboxSources.length} pieces · tap to expand
              </p>
            </div>
          </>
        )}

        {!isOverview && (
          <div className="mb-5 sm:mb-7 flex items-end justify-between gap-4">
            <h2 className="font-display font-black uppercase tracking-tight text-[clamp(1.75rem,4.5vw,3.2rem)]">
              Gallery
            </h2>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-muted">
              {lightboxSources.length} pieces · tap to expand
            </p>
          </div>
        )}

        <div className="mb-12 sm:mb-16">
          <ProjectGallery
            blocks={chapter.blocks}
            title={`${project.title} — ${chapter.title}`}
            onOpen={openLightbox}
            kind="posters"
          />
        </div>

        {/* Chapter forward / back */}
        <nav
          aria-label="Chapter navigation"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 border-t border-white/[0.08] mb-10 sm:mb-14"
        >
          {prevChapter ? (
            <Link
              href={prevChapter.href}
              prefetch={false}
              aria-label={`Previous chapter: ${prevChapter.label}`}
              className="group py-6 sm:py-8 sm:pr-6 no-underline border-b sm:border-b-0 sm:border-r border-white/[0.08]"
            >
              <p
                aria-hidden="true"
                className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2 flex items-center gap-2"
              >
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                {String(prevChapter.index).padStart(2, '0')} {prevChapter.label}
              </p>
              <p
                aria-hidden="true"
                className="font-display font-black uppercase tracking-tight text-lg sm:text-xl text-light/70 group-hover:text-accent transition-colors"
              >
                {prevChapter.title}
              </p>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextChapter ? (
            <Link
              href={nextChapter.href}
              prefetch={false}
              aria-label={`Next chapter: ${nextChapter.label}`}
              className="group py-6 sm:py-8 sm:pl-6 no-underline text-right"
            >
              <p
                aria-hidden="true"
                className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2 flex items-center justify-end gap-2"
              >
                Continue the project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </p>
              <p
                aria-hidden="true"
                className="font-display font-black uppercase tracking-tight text-lg sm:text-xl text-light/70 group-hover:text-accent transition-colors"
              >
                {String(nextChapter.index).padStart(2, '0')} {nextChapter.label}
              </p>
            </Link>
          ) : (
            <Link
              href="/projects/post-folio"
              prefetch={false}
              className="group py-6 sm:py-8 sm:pl-6 no-underline text-right"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                Return to overview
              </p>
              <p className="font-display font-black uppercase tracking-tight text-lg sm:text-xl text-light/70 group-hover:text-accent transition-colors">
                Post Folio
              </p>
            </Link>
          )}
        </nav>

        {chapter.id === 'selected-works' && (
          <>
            {project.tech?.length > 0 && (
              <section className="mb-12 sm:mb-16">
                <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-accent mb-4">
                  Disciplines
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-3 py-1.5 rounded-full bg-surface-mid border border-white/[0.08] text-cream"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </section>
            )}
            <ProjectNav prev={prevProject} next={nextProject} />
          </>
        )}

        <div className="relative flex justify-center py-8">
          <div className="text-center max-w-md px-4">
            <p className="text-muted text-sm sm:text-base mb-2">{site.contactLead}</p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center min-h-11 py-3 text-lg font-semibold text-muted hover:text-light transition break-all"
            >
              {site.email}
            </a>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-11 py-3 font-mono text-xs uppercase tracking-widest text-accent hover:text-cream transition"
            >
              WhatsApp · {site.whatsapp}
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="absolute right-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ProjectLightbox
        sources={lightboxSources}
        index={lightboxIndex}
        title={`${project.title} — ${chapter.title}`}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </section>
  );
}
