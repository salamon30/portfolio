import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical notes, project write-ups and things learned the hard way — by Recep Ulaş Uzun.",
  openGraph: {
    title: "Writing · Recep Ulaş Uzun",
    description: "Technical notes, project write-ups and things learned the hard way.",
    images: [{ url: "/preview.png", width: 1200, height: 630 }],
  },
};

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
