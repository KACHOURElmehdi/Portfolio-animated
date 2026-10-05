'use client';

import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import GlobalPreloader from '@/components/shared/GlobalPreloader';
import CustomCursor from '@/components/shared/CustomCursor';
import Providers from './providers';

import { theme } from '@/lib/theme';

declare global {
  interface Window {
    __preloaderDone?: boolean;
  }
}

/** Skip only for rapid remounts (HMR) — not forever for the whole tab session. */
const HMR_SKIP_MS = 4000;

function recentlyCompletedPreloader(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const at = sessionStorage.getItem('preloader-done-at');
    if (at && Date.now() - Number(at) < HMR_SKIP_MS) return true;
  } catch {}
  return false;
}

function markPreloaderDone() {
  try {
    sessionStorage.setItem('preloader-done-at', String(Date.now()));
    sessionStorage.setItem('preloader-seen', '1');
  } catch {}
  if (typeof window !== 'undefined') {
    window.__preloaderDone = true;
    document.body.classList.remove('preloader-active');
  }
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // Mount after layout effect so we never SSR a stuck overlay.
  // Fresh page loads (and reloads after a few seconds) show Bonjour again.
  const [showLoader, setShowLoader] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useLayoutEffect(() => {
    if (recentlyCompletedPreloader()) {
      markPreloaderDone();
      setShowLoader(false);
      setShowCursor(true);
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent('preloaderComplete'));
      });
      return;
    }
    // Real page start — play the greeting intro.
    window.__preloaderDone = false;
    setShowLoader(true);
  }, []);

  useEffect(() => {
    console.log(
      '%c Portfolio %c by Aymen Rguig (@4pexvisual) ',
      `background: ${theme.green800}; color: ${theme.green50}; padding: 4px 8px; border-radius: 4px 0 0 4px; font-family: monospace; font-weight: bold;`,
      `background: ${theme.green50}; color: ${theme.green800}; padding: 4px 8px; border-radius: 0 4px 4px 0; font-family: monospace; font-weight: bold; border: 1px solid ${theme.green800};`
    );
  }, []);

  const handleExitComplete = useCallback(() => {
    markPreloaderDone();
    setShowLoader(false);
    window.scrollTo(0, 0);
    setShowCursor(true);
    window.dispatchEvent(new CustomEvent('preloaderComplete'));
  }, []);

  return (
    <>
      <div className="film-grain pointer-events-none" aria-hidden="true" />
      {showCursor && <CustomCursor />}

      {showLoader ? <GlobalPreloader onComplete={handleExitComplete} /> : null}

      <SmoothScrollProvider>
        <Providers>{children}</Providers>
      </SmoothScrollProvider>
    </>
  );
}
