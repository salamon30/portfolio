import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://recepulasuzun.com";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A working catalogue of university, professional and personal work — computer vision, edge AI, data analytics and full-stack development.",
  openGraph: {
    title: "Projects · Recep Ulaş Uzun",
    description:
      "A working catalogue of university, professional and personal work — computer vision, edge AI, data analytics and full-stack development.",
    images: [{ url: "/preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects · Recep Ulaş Uzun",
    images: ["/preview.png"],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects — Recep Ulaş Uzun",
    url: `${SITE_URL}/projects`,
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: p.titles.en,
        description: p.summaries.en,
        url: p.links?.github ?? `${SITE_URL}/projects`,
        programmingLanguage: p.tech,
        dateCreated: p.year,
        ...(p.links?.github && { codeRepository: p.links.github }),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      {children}
    </>
  );
}
