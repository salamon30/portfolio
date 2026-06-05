import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to internships, working student roles and research collaborations. Reach out via email, LinkedIn, or the contact form.",
  openGraph: {
    title: "Contact · Recep Ulaş Uzun",
    description:
      "Open to internships, working student roles and research collaborations. Reach out via email, LinkedIn, or the contact form.",
    images: [{ url: "/preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact · Recep Ulaş Uzun",
    images: ["/preview.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
