'use client';

import React, { useState, useEffect, useRef } from 'react';
import AnimatedLink from '@/components/ui/AnimateLink';
import Magnetic from '@/components/ui/Magnetic';
import { FaArrowUp } from 'react-icons/fa';
import { useHandleLinkClick } from '@/lib/navigation';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { site, socialList, navLinks } from '@/lib/site';
import Lenis from 'lenis';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const lenisRef = useLenis() as React.RefObject<Lenis | null> | null;
  const lenis = lenisRef?.current;

  useEffect(() => {
    setIsMounted(true);
    let interval: NodeJS.Timeout | number | undefined;

    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: site.timeZone,
      });
      setCurrentTime(timeString);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          updateTime();
          interval = setInterval(updateTime, 30000);
        } else if (interval) {
          clearInterval(interval);
          interval = undefined;
        }
      },
      { threshold: 0 },
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleLinkClick = useHandleLinkClick();
  const links = navLinks.filter((l) => !('menuOnly' in l && l.menuOnly));

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-30 bg-ink border-t border-border-subtle px-6 sm:px-8 md:px-12 py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-12 max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            {site.title}
          </p>
          <p className="text-cream text-lg sm:text-xl font-sans leading-relaxed mb-2">
            {site.contactLead}
          </p>
          <p className="text-gray-soft text-sm font-sans">
            {site.location} · {site.name}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-12">
          <div>
            <h3 className="text-light/90 text-base sm:text-lg font-sans tracking-wide font-semibold mb-4 md:mb-6">
              Menu
            </h3>
            <ul className="flex flex-col gap-3 sm:gap-4 text-gray-soft text-xs sm:text-sm font-sans font-medium uppercase tracking-wide">
              {links.map((link) => (
                <AnimatedLink key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                  >
                    {link.name}
                  </a>
                </AnimatedLink>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-light/90 text-base sm:text-lg font-sans tracking-wide font-semibold mb-4 md:mb-6">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 sm:gap-4 text-gray-soft text-xs sm:text-sm font-sans font-medium tracking-wide">
              {socialList.map((s) => (
                <AnimatedLink key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="uppercase"
                  >
                    {s.label}
                  </a>
                </AnimatedLink>
              ))}
              <li className="normal-case text-gray-soft/80 break-all">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center min-h-11 py-2 hover:text-cream transition-colors break-words"
                  style={{ overflowWrap: 'anywhere' }}
                >
                  {site.email.replace('@', '@\u200b')}
                </a>
              </li>
              <li className="normal-case text-gray-soft/80">
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-11 py-2 hover:text-cream transition-colors"
                >
                  {site.whatsapp}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 mt-6 md:mt-0">
            <h3 className="text-light/90 text-base sm:text-lg font-sans tracking-wide font-semibold mb-2 md:mb-6">
              Local Time
            </h3>
            <p className="text-gray-soft text-sm sm:text-base font-sans font-medium tracking-wide">
              {isMounted && currentTime
                ? `${currentTime} ${site.timeZoneLabel}`
                : 'Loading local time...'}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Magnetic strength={0.4}>
            <button
              onClick={scrollToTop}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-gray-soft hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
