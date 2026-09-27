import PostFolioChapterView from '@/components/project/PostFolioChapterView';
import {
  getPostFolioChapter,
  POST_FOLIO_CHAPTER_SEGMENTS,
} from '@/lib/postFolioChapters';
import { getProjectBySlug } from '@/lib/projects';
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
  return {
    title: `${project.title} — ${chapter.title}`,
    description: chapter.subtitle,
    openGraph: {
      title: `${project.title} — ${chapter.title} | Aymen Rguig`,
      description: chapter.subtitle,
      images: chapter.hero
        ? [{ url: chapter.hero.replace('/gallery.webp', '/hero.webp'), width: 1200, height: 900 }]
        : [],
    },
  };
}

export default async function PostFolioChapterPage({ params }: PageProps) {
  const { chapter: segment } = await params;
  const chapter = getPostFolioChapter(segment);
  if (!chapter || chapter.id === 'overview') notFound();
  return <PostFolioChapterView key={chapter.id} chapter={chapter} />;
}
