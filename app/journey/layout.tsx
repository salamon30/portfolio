import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "Roles, education and recognition — a chronological view of the work and study that brought me here.",
  openGraph: {
    title: "Journey · Recep Ulaş Uzun",
    description:
      "Roles, education and recognition — a chronological view of the work and study that brought me here.",
    images: [{ url: "/preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journey · Recep Ulaş Uzun",
    images: ["/preview.png"],
  },
};

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
