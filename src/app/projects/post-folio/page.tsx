import PostFolioChapterView from '@/components/project/PostFolioChapterView';
import JsonLd from '@/components/seo/JsonLd';
import { getPostFolioChapter } from '@/lib/postFolioChapters';
import { getProjectBySlug } from '@/lib/projects';
import {
  absoluteAsset,
  absoluteUrl,
  breadcrumbJsonLd,
  projectJsonLd,
} from '@/lib/seo';
import { site } from '@/lib/site';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const project = getProjectBySlug('post-folio');
  const title = project?.title ?? 'Post Folio';
  const description = project?.overview || project?.description || '';
  const url = absoluteUrl('/projects/post-folio');
  const image = absoluteAsset(project?.hoverImage || project?.images?.[0] || '/og-image.png');

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
  };
}

export default function PostFolioOverviewPage() {
  const chapter = getPostFolioChapter('');
  const project = getProjectBySlug('post-folio');
  if (!chapter) return null;

  return (
    <>
      {project && (
        <JsonLd
          data={[
            projectJsonLd(project),
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Work', path: '/#projects' },
              { name: 'Post Folio', path: '/projects/post-folio' },
            ]),
          ]}
        />
      )}
      <PostFolioChapterView key="overview" chapter={chapter} />
    </>
  );
}
