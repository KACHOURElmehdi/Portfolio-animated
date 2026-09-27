import PostFolioChapterView from '@/components/project/PostFolioChapterView';
import { getPostFolioChapter } from '@/lib/postFolioChapters';
import { getProjectBySlug } from '@/lib/projects';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const project = getProjectBySlug('post-folio');
  return {
    title: project?.title ?? 'Post Folio',
    description: project?.description,
    openGraph: {
      title: `${project?.title} - Aymen Rguig`,
      description: project?.description,
      images: project?.hoverImage ? [{ url: project.hoverImage, width: 1200, height: 630 }] : [],
    },
  };
}

export default function PostFolioOverviewPage() {
  const chapter = getPostFolioChapter('');
  if (!chapter) return null;
  return <PostFolioChapterView key="overview" chapter={chapter} />;
}
