import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Recep Ulaş Uzun is working on, reading and learning right now.",
  openGraph: {
    title: "Now · Recep Ulaş Uzun",
    description: "What Recep Ulaş Uzun is working on, reading and learning right now.",
    images: [{ url: "/preview.png", width: 1200, height: 630 }],
  },
};

export default function NowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
