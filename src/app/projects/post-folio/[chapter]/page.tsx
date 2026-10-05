import PostFolioChapterView from '@/components/project/PostFolioChapterView';
import JsonLd from '@/components/seo/JsonLd';
import {
  getPostFolioChapter,
  POST_FOLIO_CHAPTER_SEGMENTS,
} from '@/lib/postFolioChapters';
import { getProjectBySlug } from '@/lib/projects';
import {
  absoluteAsset,
  absoluteUrl,
  breadcrumbJsonLd,
} from '@/lib/seo';
import { site } from '@/lib/site';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ chapter: string }>;
}

export function generateStaticParams() {
  return POST_FOLIO_CHAPTER_SEGMENTS.map((chapter) => ({ chapter }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { chapter: segment } = await params;
  const chapter = getPostFolioChapter(segment);
  const project = getProjectBySlug('post-folio');
  if (!chapter || !project) return { title: 'Post Folio' };

  const title = `${project.title} — ${chapter.title}`;
  const description = chapter.subtitle || project.description;
  const url = absoluteUrl(chapter.href);
  const image = absoluteAsset(
    chapter.hero?.replace('/gallery.webp', '/hero.webp') ||
      project.hoverImage ||
      project.images[0],
  );

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      type: 'article',
      images: [{ url: image, width: 1200, height: 900, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
  };
}

export default async function PostFolioChapterPage({ params }: PageProps) {
  const { chapter: segment } = await params;
  const chapter = getPostFolioChapter(segment);
  if (!chapter || chapter.id === 'overview') notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/#projects' },
          { name: 'Post Folio', path: '/projects/post-folio' },
          { name: chapter.title, path: chapter.href },
        ])}
      />
      <PostFolioChapterView key={chapter.id} chapter={chapter} />
    </>
  );
}
