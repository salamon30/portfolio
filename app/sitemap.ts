import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = ["", "/journey", "/projects", "/writing", "/travel", "/think", "/now", "/contact"].map(
    (r) => ({
      url: `${SITE_URL}${r}`,
      lastModified: now,
      changeFrequency: (r === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: r === "" ? 1 : 0.7,
    }),
  );

  const projects = PROJECTS.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.8 : 0.6,
  }));

  const posts = POSTS.map((p) => ({
    url: `${SITE_URL}/writing/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...projects, ...posts];
}
