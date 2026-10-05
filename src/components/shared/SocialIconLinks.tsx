'use client';

import { FaInstagram, FaTiktok, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { socialNetworks, type SocialIconName, type SocialNetwork } from '@/lib/site';

const ICONS: Record<SocialIconName, IconType> = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
};

type SocialIconLinksProps = {
  items?: SocialNetwork[];
  className?: string;
  linkClassName?: string;
  showLabels?: boolean;
  /** Compact icon-only row (aria-label still present). */
  iconOnly?: boolean;
};

export default function SocialIconLinks({
  items = socialNetworks,
  className = '',
  linkClassName = '',
  showLabels = true,
  iconOnly = false,
}: SocialIconLinksProps) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`.trim()}>
      {items.map((s) => {
        const Icon = ICONS[s.icon];
        const external = !s.href.startsWith('mailto:');
        const title = s.handle ? `${s.label} ${s.handle}` : s.label;
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={title}
              title={title}
              className={`group inline-flex items-center gap-2 min-h-11 transition-colors duration-300 ${linkClassName}`.trim()}
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-subtler bg-elevated-dark/60 text-cream group-hover:border-accent group-hover:text-accent group-hover:bg-accent/10 transition-colors duration-300">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              {!iconOnly && showLabels && (
                <span className="flex flex-col leading-tight">
                  <span className="text-xs sm:text-sm font-medium uppercase tracking-wide">{s.label}</span>
                  {s.handle && (
                    <span className="font-mono text-[10px] sm:text-[11px] text-gray-soft normal-case tracking-normal">
                      {s.handle}
                    </span>
                  )}
                </span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
