import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { theme } from '@/lib/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Graphic Designer & Art Director`,
    short_name: site.name,
    description: site.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: theme.green800,
    theme_color: theme.green400,
    icons: [
      {
        src: '/logo.webp',
        sizes: 'any',
        type: 'image/webp',
      },
    ],
  };
}
