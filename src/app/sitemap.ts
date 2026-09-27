import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { getPostFolioChapters } from '@/lib/postFolioChapters';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects().map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const postFolioChapters = getPostFolioChapters()
    .filter((c) => c.segment)
    .map((c) => ({
      url: `${site.url}${c.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projects,
    ...postFolioChapters,
  ];
}
