import { PROJECTS } from "@/lib/projects";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.titles.en,
    description: project.summaries.en,
    openGraph: {
      title: `${project.titles.en} · Recep Ulaş Uzun`,
      description: project.summaries.en,
      images: [
        {
          url: project.cover ?? "/preview.png",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
