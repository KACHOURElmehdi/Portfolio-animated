import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { getPostFolioChapters } from '@/lib/postFolioChapters';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projects = getAllProjects().map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const postFolioChapters = getPostFolioChapters()
    .filter((c) => c.segment)
    .map((c) => ({
      url: absoluteUrl(c.href),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projects,
    ...postFolioChapters,
  ];
}
