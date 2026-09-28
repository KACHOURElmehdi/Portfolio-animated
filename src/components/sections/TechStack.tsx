'use client';

import { useRef, useState, type ComponentType } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import { HiOutlineSparkles } from 'react-icons/hi2';
import {
  FiAperture,
  FiEdit3,
  FiGrid,
  FiImage,
  FiLayers,
  FiPackage,
  FiPenTool,
  FiShare2,
  FiType,
} from 'react-icons/fi';

type IconComponent = ComponentType<{ className?: string }>;

export interface TechItem {
  name: string;
  category: 'skills' | 'software';
  icon?: string;
  Icon?: IconComponent;
  level?: string;
  description?: string;
}

export interface StackCategory {
  id: string;
  title: string;
  label?: string;
  description?: string;
  technologies: TechItem[];
}

export const STACK_SECTIONS: StackCategory[] = [
  {
    id: 'skills',
    title: 'CORE SKILLS',
    technologies: [
      { name: 'Graphic Design', category: 'skills', Icon: FiPenTool },
      { name: 'Art Direction', category: 'skills', Icon: FiAperture },
      { name: 'Brand Identity', category: 'skills', Icon: FiLayers },
      { name: 'Logo Design', category: 'skills', Icon: FiEdit3 },
      { name: 'Packaging Design', category: 'skills', Icon: FiPackage },
      { name: 'Print Design', category: 'skills', Icon: FiImage },
      { name: 'Typography', category: 'skills', Icon: FiType },
      { name: 'Social Media Design', category: 'skills', Icon: FiShare2 },
      { name: 'Digital Content', category: 'skills', Icon: FiGrid },
      { name: 'AI-Assisted Visuals', category: 'skills', Icon: HiOutlineSparkles },
    ],
  },
  {
    id: 'software',
    title: 'SOFTWARE',
    technologies: [
      { name: 'Adobe Illustrator', category: 'software', icon: '/Services/illustrator.png' },
      { name: 'Adobe Photoshop', category: 'software', icon: '/Services/photoshop.png' },
      { name: 'Adobe InDesign', category: 'software', icon: '/Services/indesign.png' },
      { name: 'Figma', category: 'software', icon: '/Services/figma.png' },
      { name: 'Canva', category: 'software', icon: '/Services/canva.png' },
      { name: 'CapCut', category: 'software', icon: '/Services/capcut-icon.svg' },
      { name: 'Microsoft Word', category: 'software', icon: '/Services/microsoft-word.svg' },
      { name: 'Microsoft Excel', category: 'software', icon: '/Services/excel.png' },
    ],
  },
];

const TechStack = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const descriptionText =
    'Creative disciplines and software I use to design brands, packaging, print, and digital visuals.';

  const filterOptions = [
    { id: 'all', label: 'All Categories' },
    { id: 'skills', label: 'Core Skills' },
    { id: 'software', label: 'Software' },
  ];

  const visibleSections =
    activeFilter === 'all'
      ? STACK_SECTIONS
      : STACK_SECTIONS.filter((sec) => sec.id === activeFilter);

  useGSAP(
    () => {
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        const items = section.querySelectorAll('.tech-item');
        const title = titleRefs.current[index];

        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                end: 'top 70%',
                scrub: 0.5,
              },
            },
          );
        }

        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                end: 'top 70%',
                scrub: 0.5,
              },
            },
          );
        }
      });
    },
    { scope: containerRef, dependencies: [activeFilter] },
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        !window.matchMedia('(hover: hover)').matches)
    ) {
      return;
    }
    const target = e.currentTarget.querySelector('.tech-icon');
    if (!target) return;
    gsap.to(target, { rotation: 360, scale: 1.1, duration: 0.6, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        !window.matchMedia('(hover: hover)').matches)
    ) {
      return;
    }
    const target = e.currentTarget.querySelector('.tech-icon');
    if (!target) return;
    gsap.to(target, { rotation: 0, scale: 1, duration: 0.5, ease: 'power2.inOut' });
  };

  return (
    <section
      ref={containerRef}
      id="tech-stack"
      className="bg-ink text-light pt-14 pb-10 md:pt-32 md:pb-20 rounded-b-4xl overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-8 md:mb-14">
          <AnimatedHeading
            words={[{ t: 'MY' }, { t: 'stack', serif: true }]}
            className="text-[clamp(2.5rem,7vw,6.5rem)] tracking-tight mb-4"
          />
          <ScrollWordReveal
            text={descriptionText}
            offset={['start 0.95', 'end 0.7']}
            className="text-base sm:text-lg md:text-xl text-gray-soft font-sans leading-relaxed max-w-3xl"
          />
        </div>

        <div className="mb-12 flex flex-wrap gap-2 sm:gap-3 items-center">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setActiveFilter(option.id)}
                className={`text-xs sm:text-sm font-mono tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-cream text-ink border-cream font-semibold shadow-md'
                    : 'bg-elevated-dark/60 text-gray-soft border-white/10 hover:border-accent/40 hover:text-cream'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-10 md:space-y-24">
          {visibleSections.map((stack, index) => (
            <div
              key={stack.id}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className="flex flex-col md:flex-row md:items-start md:justify-between gap-6"
            >
              <div className="md:w-1/3">
                <h3
                  ref={(el) => {
                    titleRefs.current[index] = el;
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent-light tracking-tight font-display uppercase"
                >
                  {stack.title}
                </h3>
                <span className="font-mono text-xs text-warm tracking-widest uppercase block mt-2">
                  {stack.technologies.length}{' '}
                  {stack.id === 'software' ? 'Applications' : 'Skills'}
                </span>
              </div>

              <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {stack.technologies.map((tech, i) => {
                  const Icon = tech.Icon;
                  return (
                    <div
                      key={i}
                      className="tech-item flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-elevated-dark/60 border border-white/[0.04] hover:border-accent/30 bg-surface/50"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="tech-icon w-10 h-10 flex items-center justify-center relative flex-shrink-0 text-cream overflow-hidden rounded-md">
                        {tech.icon ? (
                          <Image
                            src={tech.icon}
                            alt={`${tech.name} logo`}
                            width={40}
                            height={40}
                            unoptimized={tech.icon.endsWith('.svg')}
                            className="w-full h-full object-contain"
                          />
                        ) : Icon ? (
                          <Icon className="w-7 h-7" />
                        ) : null}
                      </div>
                      <p className="text-xs sm:text-sm font-mono font-bold text-cream break-words">
                        {tech.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
