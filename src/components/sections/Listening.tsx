'use client';

import { FaSpotify } from 'react-icons/fa6';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import { site } from '@/lib/site';

export default function Listening() {
  const playlist = site.spotify;

  return (
    <section
      id="listening"
      className="relative w-full bg-cream text-charcoal overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20 px-6 sm:px-8 md:px-12 lg:px-16"
      aria-labelledby="listening-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-warm">
              (Now playing)
            </p>
            <div id="listening-heading">
              <AnimatedHeading
                words={[{ t: 'GIVE THIS' }, { t: 'a listen.', serif: true }]}
                className="text-[clamp(2.25rem,6vw,4.75rem)] leading-none text-charcoal"
              />
            </div>
            <p className="max-w-md text-sm sm:text-base text-gray-soft leading-relaxed">
              {playlist.blurb}
            </p>
            <div className="pt-1">
              <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-charcoal">
                {playlist.title}
              </p>
              <a
                href={playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2.5 min-h-11 text-sm font-medium uppercase tracking-wide text-warm hover:text-accent transition-colors duration-300"
              >
                <FaSpotify className="h-5 w-5 shrink-0" aria-hidden />
                <span>Open in Spotify</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            <div className="rounded-2xl overflow-hidden border border-border/40 bg-ink/5 shadow-[0_20px_50px_-28px_rgba(8,28,21,0.45)]">
              <iframe
                title={`Spotify playlist: ${playlist.title}`}
                src={playlist.embedUrl}
                width="100%"
                height={352}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block w-full border-0"
                style={{ borderRadius: 0, minHeight: 352 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
