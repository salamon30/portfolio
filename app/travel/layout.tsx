import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel",
  description:
    "Twelve countries across Europe and Türkiye — photos and short notes from time spent there.",
  openGraph: {
    title: "Travel · Recep Ulaş Uzun",
    description:
      "Twelve countries across Europe and Türkiye — photos and short notes from time spent there.",
    images: [{ url: "/preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel · Recep Ulaş Uzun",
    images: ["/preview.png"],
  },
};

export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
