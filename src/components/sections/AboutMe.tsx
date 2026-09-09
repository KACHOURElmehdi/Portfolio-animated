'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import FlowField from '@/components/canvas/FlowField';

const CREDENTIALS = [
  {
    year: '2026',
    title: 'HEC National Skills Competency Test (NSCT)',
    organization: 'HEC, PSEB & P@SHA',
    stat: '95th Percentile — Top 5% nationwide',
    type: 'Competition',
  },
  {
    year: '2026',
    title: 'Software Engineer Intern — MERN Stack',
    organization: 'e-strats, Islamabad',
    stat: 'Real-time WebSocket APIs & multi-tenant cloud access control',
    type: 'Industry',
  },
  {
    year: '2022–26',
    title: 'BS Computer Science',
    organization: 'University of Peshawar',
    stat: '3.60 / 4.00 GPA',
    type: 'Education',
  },
];

const About = () => {
  const headingWords = [
    { t: 'WHO' },
    { t: 'am', serif: true },
    { t: 'i?' },
  ];
  const descriptionText =
    'I am a software engineer driven by a passion for building clean, intuitive, and reliable digital experiences.';
  const aboutMeText = `I build web applications that bridge thoughtful frontend interfaces with robust backend systems. To me, software is more than code on a screen; it is about making technology feel effortless and genuinely useful to real people.\n\nMy journey began with a simple curiosity for how things work under the hood. Over time, that curiosity evolved into a genuine passion for fluid interface animations, reliable backend architecture, and building user journeys that feel effortless and alive.\n\nWhether I am polishing micro-interactions or engineering full-stack systems, my core focus remains unchanged: creating software that brings people joy, solves real problems, and leaves a lasting positive impact.`;

  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.about-image-wrapper',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '.about-label',
        { opacity: 0, letterSpacing: '0.45em' },
        {
          opacity: 1,
          letterSpacing: '0.3em',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-label',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Stagger each credential row in on scroll
      const rows = gsap.utils.toArray<HTMLElement>('.cred-row');
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            delay: i * 0.07,
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              once: true,
            },
          },
        );
      });

      // Header row fade-in
      gsap.fromTo(
        '.cred-header',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 88%',
            once: true,
          },
        },
      );

      // Section label
      gsap.fromTo(
        '.cred-section-label',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 92%',
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <div className="bg-cream">
      <section
        ref={sectionRef}
        id="about"
        className="min-h-screen bg-ink text-light pt-24 pb-20 md:pt-32 md:pb-28 rounded-t-4xl overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="mb-10 md:mb-20">
            <AnimatedHeading
              words={headingWords}
              className="text-[clamp(2.5rem,7vw,6.5rem)] tracking-tight mb-4"
            />
            <ScrollWordReveal
              text={descriptionText}
              offset={['start 0.95', 'end 0.7']}
              className="text-base sm:text-lg md:text-xl text-gray-soft font-sans leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8 pb-16 md:pb-24 items-center">
            <div className="col-span-12 md:col-span-5 lg:col-span-5 flex items-center justify-center">
              <div className="about-image-wrapper relative group w-full max-w-[350px] md:max-w-[380px] h-[360px] md:h-[480px] bg-elevated-dark rounded-2xl overflow-hidden border border-border-subtler shadow-2xl [will-change:transform,opacity]">
                <FlowField />
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 lg:col-span-6 md:col-start-6 lg:col-start-7 flex flex-col justify-center space-y-8">
              <span className="about-label text-sm sm:text-base md:text-base text-warm uppercase tracking-[0.3em] font-medium text-center md:text-left inline-block">
                (About Me)
              </span>
              <div className="space-y-6">
                {aboutMeText.split('\n\n').map((p, i) => (
                  <ScrollWordReveal
                    key={i}
                    text={p}
                    offset={['start 0.92', 'end 0.65']}
                    className="text-base sm:text-lg md:text-lg leading-relaxed font-sans"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Editorial Credentials Table ──────────────────────────── */}
          <div ref={tableRef} className="pt-12 md:pt-20 border-t border-white/10">

            {/* Section label */}
            <span className="cred-section-label font-mono text-xs text-accent uppercase tracking-[0.3em] block mb-8 md:mb-12 opacity-0">
              (Experience & Credentials)
            </span>

            {/* Column headers — hidden on mobile */}
            <div className="cred-header hidden md:grid grid-cols-[100px_1fr_1fr_1fr] gap-x-8 pb-3 border-b border-white/10 opacity-0">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-soft">Year</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-soft">Title</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-soft">Organisation</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-soft">Highlight</span>
            </div>

            {/* Rows */}
            <div className="flex flex-col">
              {CREDENTIALS.map((item, idx) => (
                <div
                  key={idx}
                  className="cred-row group relative opacity-0"
                >
                  {/* Desktop row */}
                  <div className="hidden md:grid grid-cols-[100px_1fr_1fr_1fr] gap-x-8 py-6 border-b border-white/[0.07] items-baseline transition-colors duration-300 group-hover:border-white/20">
                    <span className="font-mono text-sm text-warm tabular-nums">{item.year}</span>

                    <span className="font-display font-bold text-base lg:text-lg uppercase tracking-tight text-cream leading-snug">
                      {item.title}
                    </span>

                    <span className="font-mono text-sm text-gray-soft leading-snug">
                      {item.organization}
                    </span>

                    <span className="font-sans text-sm text-warm-light leading-snug">
                      {item.stat}
                    </span>
                  </div>

                  {/* Accent bottom-line sweep on hover (matches Projects section) */}
                  <div className="hidden md:block absolute bottom-0 left-0 h-[1px] bg-accent w-0 transition-all duration-[350ms] ease-out group-hover:w-full pointer-events-none" />

                  {/* Mobile row — stacked */}
                  <div className="md:hidden py-5 border-b border-white/[0.07] flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs text-warm tabular-nums">{item.year}</span>
                      <span className="font-mono text-[10px] text-accent/70 uppercase tracking-widest">{item.type}</span>
                    </div>
                    <span className="font-display font-bold text-base uppercase tracking-tight text-cream leading-snug">
                      {item.title}
                    </span>
                    <span className="font-mono text-xs text-gray-soft">{item.organization}</span>
                    <span className="font-sans text-xs text-warm-light mt-0.5 leading-relaxed">{item.stat}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
          {/* ─────────────────────────────────────────────────────────── */}

        </div>
      </section>
    </div>
  );
};

export default About;
