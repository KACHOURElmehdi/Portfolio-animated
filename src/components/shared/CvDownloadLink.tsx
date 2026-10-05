'use client';

import { FaFilePdf } from 'react-icons/fa6';
import { site } from '@/lib/site';

type CvDownloadLinkProps = {
  className?: string;
  /** Visual density for different surfaces. */
  variant?: 'button' | 'inline' | 'icon';
};

export default function CvDownloadLink({
  className = '',
  variant = 'button',
}: CvDownloadLinkProps) {
  const label = 'Download CV';

  if (variant === 'icon') {
    return (
      <a
        href={site.cvUrl}
        download={site.cvFileName}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtler bg-elevated-dark/60 text-cream hover:border-accent hover:text-accent hover:bg-accent/10 transition-colors duration-300 min-h-11 min-w-11 ${className}`.trim()}
      >
        <FaFilePdf className="h-4 w-4" aria-hidden />
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a
        href={site.cvUrl}
        download={site.cvFileName}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 min-h-11 py-2 uppercase tracking-wide transition-colors duration-300 ${className}`.trim()}
      >
        <FaFilePdf className="h-4 w-4 shrink-0" aria-hidden />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={site.cvUrl}
      download={site.cvFileName}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 min-h-11 px-5 py-3 rounded-full border border-border-subtler bg-elevated-dark/50 text-cream hover:border-accent hover:text-accent hover:bg-accent/10 transition-colors duration-300 ${className}`.trim()}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
        <FaFilePdf className="h-4 w-4" aria-hidden />
      </span>
      <span className="flex flex-col leading-tight text-left">
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">{label}</span>
        <span className="font-mono text-[10px] sm:text-[11px] text-gray-soft normal-case tracking-normal">
          PDF · {site.name}
        </span>
      </span>
    </a>
  );
}
