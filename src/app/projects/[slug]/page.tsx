import ProjectDetails from '@/components/project/ProjectDetails';
import JsonLd from '@/components/seo/JsonLd';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import {
  absoluteAsset,
  absoluteUrl,
  breadcrumbJsonLd,
  projectJsonLd,
} from '@/lib/seo';
import { site } from '@/lib/site';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {
      title: 'Project Not Found',
      robots: { index: false, follow: false },
    };
  }

  const title = project.title;
  const description = project.overview || project.description;
  const url = absoluteUrl(`/projects/${project.slug}`);
  const image = absoluteAsset(project.hoverImage || project.images[0]);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: `${site.name} Portfolio`,
      type: 'article',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} — ${project.type}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
    keywords: [project.title, project.type, ...project.tech, site.name],
  };
}

export async function generateStaticParams() {
  return getAllProjects()
    .filter((project) => project.slug !== 'post-folio')
    .map((project) => ({
      slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={[
          projectJsonLd(project),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/#projects' },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <ProjectDetails key={project.slug} project={project} />
    </>
  );
}
