import type { Metadata } from "next";

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
  return <>{children}</>;
}
