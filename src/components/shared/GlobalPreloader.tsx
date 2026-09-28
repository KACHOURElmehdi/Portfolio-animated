'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export const preloaderWords = [
  'Bonjour',
  'السلام علیکم',
  'नमस्ते',
  'Hola',
  'مرحباً',
  'Welcome',
];

const MIN_DISPLAY_MS = 700;
const HARD_CAP_MS = 1500;
/** Absolute ceiling — always reveal, even if exit animation hangs. */
const ABSOLUTE_MAX_MS = 2200;

function alreadySeen(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const at = sessionStorage.getItem('preloader-done-at');
    // Only treat as "already done" for rapid remounts (HMR), not the whole session.
    if (at && Date.now() - Number(at) < 4000) return true;
  } catch {}
  return false;
}

function markSeen() {
  try {
    sessionStorage.setItem('preloader-done-at', String(Date.now()));
    sessionStorage.setItem('preloader-seen', '1');
  } catch {}
  if (typeof window !== 'undefined') window.__preloaderDone = true;
}

/**
 * Only mounted client-side after ClientLayout decides this session needs it.
 * Never SSR'd — avoids hydration leaving a stuck overlay in the DOM.
 */
export default function GlobalPreloader({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dimension, setDimension] = useState<{ width: number; height: number }>({
    width: 1920,
    height: 1080,
  });

  const targetRef = useRef(0);
  const displayedRef = useRef(0);
  const fontsResolvedRef = useRef(false);
  const loadedRef = useRef(false);
  const startedAtRef = useRef(0);
  const exitStartedRef = useRef(false);
  const revealedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const reveal = useRef((animated: boolean) => {});
  reveal.current = (animated: boolean) => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    markSeen();

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onCompleteRef.current?.();
    };

    if (!animated || !containerRef.current) {
      finish();
      return;
    }

    const el = containerRef.current;
    const path = curvePathRef.current;
    if (!path) {
      el.style.pointerEvents = 'none';
      el.style.visibility = 'hidden';
      el.style.opacity = '0';
      finish();
      return;
    }

    const targetD = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
      dimension.width / 2
    } ${dimension.height} 0 ${dimension.height} L0 0`;

    gsap
      .timeline({ onComplete: finish })
      .to(path, {
        attr: { d: targetD },
        duration: 0.55,
        ease: 'power3.inOut',
      })
      .to(
        el,
        {
          yPercent: -100,
          duration: 0.65,
          ease: 'power4.inOut',
        },
        '<',
      );

    setTimeout(() => {
      el.style.pointerEvents = 'none';
      el.style.visibility = 'hidden';
      el.style.opacity = '0';
      finish();
    }, 1600);
  };

  useEffect(() => {
    if (alreadySeen()) {
      reveal.current(false);
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      reveal.current(false);
      return;
    }

    startedAtRef.current = performance.now();
    document.fonts?.ready.then(() => {
      fontsResolvedRef.current = true;
    });
    const onLoad = () => {
      loadedRef.current = true;
    };
    if (document.readyState === 'complete') loadedRef.current = true;
    window.addEventListener('load', onLoad);

    const capTimer = setTimeout(() => {
      fontsResolvedRef.current = true;
      loadedRef.current = true;
    }, Math.max(0, HARD_CAP_MS - MIN_DISPLAY_MS));

    const absolute = setTimeout(() => {
      fontsResolvedRef.current = true;
      loadedRef.current = true;
      setProgress(100);
      reveal.current(false);
      if (containerRef.current) {
        containerRef.current.style.pointerEvents = 'none';
        containerRef.current.style.visibility = 'hidden';
        containerRef.current.style.opacity = '0';
      }
    }, ABSOLUTE_MAX_MS);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(capTimer);
      clearTimeout(absolute);
    };
  }, []);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      if (revealedRef.current) return;
      const elapsed = performance.now() - startedAtRef.current;

      let target = Math.min(90, (elapsed / MIN_DISPLAY_MS) * 88);
      if (fontsResolvedRef.current) target = Math.max(target, 55);
      if (loadedRef.current) target = Math.max(target, 80);
      if (fontsResolvedRef.current && loadedRef.current && elapsed >= MIN_DISPLAY_MS) {
        target = 100;
      }

      targetRef.current = target;
      displayedRef.current += (targetRef.current - displayedRef.current) * 0.12;
      const shown = displayedRef.current >= 99.2 ? 100 : displayedRef.current;
      setProgress(shown);

      if (shown === 100 && !exitStartedRef.current) {
        exitStartedRef.current = true;
        markSeen();
        setTimeout(() => reveal.current(true), 120);
        return;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (revealedRef.current) return;
    if (index === preloaderWords.length - 1) return;
    const timeout = setTimeout(
      () => setIndex((prev) => prev + 1),
      index === 0 ? 380 : 280,
    );
    return () => clearTimeout(timeout);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
    dimension.width / 2
  } ${dimension.height + 300} 0 ${dimension.height} L0 0`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-ink cursor-wait text-cream select-none pointer-events-auto"
      style={{ willChange: 'transform' }}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex items-center text-3xl sm:text-4xl md:text-5xl font-display font-medium text-cream z-10 opacity-90">
        <p className="tracking-wide">{preloaderWords[index]}</p>
      </div>

      <div className="absolute bottom-8 left-8 z-10 flex items-baseline gap-3 font-mono" aria-hidden="true">
        <span className="text-accent text-sm uppercase tracking-widest">loading</span>
        <span className="text-cream text-lg tabular-nums">{Math.round(progress)}%</span>
      </div>

      <div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent z-10"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden="true"
      />

      <svg className="absolute top-0 -z-10 h-[calc(100%+300px)] w-full pointer-events-none">
        <path ref={curvePathRef} className="fill-ink" d={initialPath} />
      </svg>
    </div>
  );
}
