import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How I work through a problem — the methods I use and the tools I rely on, in roughly the order I reach for them.",
  openGraph: {
    title: "Approach · Recep Ulaş Uzun",
    description:
      "How I work through a problem — the methods I use and the tools I rely on, in roughly the order I reach for them.",
    images: [{ url: "/preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Approach · Recep Ulaş Uzun",
    images: ["/preview.png"],
  },
};

export default function ThinkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
