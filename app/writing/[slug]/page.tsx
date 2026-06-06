import { POSTS } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PostClient from "./PostClient";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: `${post.title} · Recep Ulaş Uzun`,
      description: post.summary,
      images: [{ url: "/preview.png", width: 1200, height: 630 }],
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();
  return <PostClient post={post} />;
}
