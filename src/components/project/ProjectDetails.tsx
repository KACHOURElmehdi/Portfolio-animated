'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from 'next-transition-router';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { FaArrowUp } from 'react-icons/fa';
import { Project, getAdjacentProjects } from '@/lib/projects';
import { site } from '@/lib/site';
import { heroSrc, isSvgSrc } from '@/lib/media';
import { buildGalleryLayout, flattenGallerySources } from '@/lib/projectGallery';
import { useReducedMotion } from '@/lib/useReducedMotion';
import ProjectGallery from '@/components/project/ProjectGallery';
import ProjectLightbox from '@/components/project/ProjectLightbox';
import ProjectNav from '@/components/project/ProjectNav';

export default function ProjectDetails({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { prev, next } = getAdjacentProjects(project.slug);
  const reduced = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hero = project.images[0];
  const galleryBlocks = useMemo(() => buildGalleryLayout(project), [project]);
  const lightboxSources = useMemo(
    () => flattenGallerySources(galleryBlocks, hero),
    [galleryBlocks, hero]
  );

  useGSAP(
    () => {
      if (reduced || !titleRef.current) return;

      const split = SplitText.create(titleRef.current.querySelector('.pd-title-text'), {
        type: 'lines',
        mask: 'lines',
      });
      gsap.fromTo(
        split.lines,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.85,
          ease: EASE.outQuart,
          stagger: 0.06,
          delay: 0.1,
        }
      );

      gsap.fromTo(
        '.pd-reveal',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: EASE.outCubic,
          stagger: 0.08,
          delay: 0.2,
        }
      );

      return () => split.revert();
    },
    { scope: rootRef, dependencies: [project.slug, reduced] }
  );

  const scrollToTop = () => {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
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
        <div className="mb-6 sm:mb-10">
          <Link
            href="/"
            onClick={() => {
              try {
                if (!sessionStorage.getItem('projects-scroll')) {
                  sessionStorage.setItem('nav_target_section', 'projects');
                }
              } catch {}
            }}
            className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors duration-200 group"
          >
            <span className="text-base sm:text-lg transform group-hover:-translate-x-1 transition-transform duration-200">
              ←
            </span>
            <span className="font-mono text-xs uppercase tracking-widest">Back to Work</span>
          </Link>
        </div>

        {/* Hero opening */}
        <header className="mb-8 sm:mb-12 md:mb-14">
          <h1
            ref={titleRef}
            aria-label={project.title}
            className="font-display font-black uppercase tracking-tight leading-[0.98] text-[clamp(2.25rem,7vw,5.5rem)] mb-4 sm:mb-5"
          >
            <span aria-hidden="true" className="pd-title-text block">
              {project.title}
            </span>
          </h1>

          <p className="pd-reveal font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-accent mb-5 sm:mb-6">
            {metaLine}
          </p>

          <p className="pd-reveal max-w-2xl text-base sm:text-lg md:text-xl text-light/85 font-sans leading-relaxed">
            {project.description}
          </p>
        </header>

        {hero && (
          <button
            type="button"
            onClick={() => openLightbox(hero)}
            className="pd-reveal relative w-full aspect-[4/5] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-surface-card border border-surface-border mb-10 sm:mb-14 md:mb-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`View ${project.title} hero artwork`}
          >
            <Image
              src={heroSrc(hero)}
              alt={`${project.title} hero`}
              fill
              sizes="(max-width: 768px) 100vw, 1100px"
              priority
              unoptimized={isSvgSrc(hero)}
              className="object-contain object-center p-3 sm:p-5"
            />
          </button>
        )}

        {/* Overview */}
        <section className="mb-10 sm:mb-14 md:mb-16">
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

        {(project.architecture || project.implementation) && (
          <section className="mb-10 sm:mb-14 md:mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {project.architecture && (
              <div>
                <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-accent mb-3">
                  Concept
                </h2>
                <p className="text-[0.95rem] sm:text-base md:text-lg text-light/85 font-sans leading-relaxed max-w-xl">
                  {project.architecture}
                </p>
              </div>
            )}
            {project.implementation && (
              <div>
                <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-accent mb-3">
                  Approach
                </h2>
                <p className="text-[0.95rem] sm:text-base md:text-lg text-light/85 font-sans leading-relaxed max-w-xl">
                  {project.implementation}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Key moves */}
        {project.myRole?.length > 0 && (
          <section className="mb-12 sm:mb-16 md:mb-20">
            <AnimatedHeading
              words={[{ t: 'KEY' }, { t: 'moves', serif: true }]}
              showLine={false}
              containerClassName="mb-5 sm:mb-8"
              className="text-[clamp(1.75rem,4.5vw,3.2rem)] text-white"
            />
            <ul className="divide-y divide-white/[0.06] border-t border-b border-white/[0.06]">
              {project.myRole.map((role, i) => (
                <li key={i} className="py-3.5 sm:py-4 flex items-start gap-3 sm:gap-5">
                  <span className="font-mono text-xs text-accent mt-1 shrink-0 w-6 sm:w-8">
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

        {/* Gallery */}
        {galleryBlocks.length > 0 && (
          <section className="mb-12 sm:mb-16 md:mb-20">
            <div className="mb-5 sm:mb-8 flex items-end justify-between gap-4">
              <h2 className="font-display font-black uppercase tracking-tight text-[clamp(1.6rem,3.5vw,2.6rem)]">
                Gallery
              </h2>
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-muted">
                {lightboxSources.length} pieces · tap to expand
              </p>
            </div>
            <ProjectGallery blocks={galleryBlocks} title={project.title} onOpen={openLightbox} />
          </section>
        )}

        {/* Disciplines */}
        {project.tech?.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <h2 className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-4">
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

        <ProjectNav prev={prev} next={next} />

        <div className="relative flex justify-center py-8 sm:py-10">
          <div className="text-center flex flex-col items-center">
            <p className="text-muted text-base sm:text-lg mb-1">Have a project in mind?</p>
            <a
              href={`mailto:${site.email}`}
              className="text-lg sm:text-xl font-semibold text-muted hover:text-light transition"
            >
              {site.email}
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="absolute right-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 focus:outline-none"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <ProjectLightbox
        sources={lightboxSources}
        index={lightboxIndex}
        title={project.title}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </section>
  );
}
