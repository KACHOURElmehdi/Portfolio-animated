import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { seoCopy } from '@/lib/seo';
import { theme } from '@/lib/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Graphic Designer & Art Director`,
    short_name: site.name,
    description: seoCopy.description,
    start_url: '/',
    display: 'standalone',
    background_color: theme.green800,
    theme_color: theme.green400,
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/logo.webp',
        sizes: 'any',
        type: 'image/webp',
      },
    ],
  };
}
