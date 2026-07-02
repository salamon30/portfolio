import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { ThemeScript } from "@/components/ThemeScript";
import { LanguageProvider } from "@/lib/i18n";
import { PageTransition } from "@/components/PageTransition";
import { CommandMenu } from "@/components/CommandMenu";
import { MotionProvider } from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://recepulasuzun.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Recep Ulaş Uzun — Edge AI & Computer Vision Engineer",
    template: "%s · Recep Ulaş Uzun",
  },
  description:
    "Edge AI and computer vision engineer — M.Eng. in AI for Smart Sensors and Actuators at THD Deggendorf. From training detection models to deploying them in production. Previously at Vodafone Türkiye and KPMG. Based in Bavaria.",
  keywords: [
    "Recep Uzun",
    "Recep Ulaş Uzun",
    "Edge AI",
    "Computer Vision",
    "Machine Learning",
    "YOLOv8",
    "Smart Sensors",
    "Data Engineer",
    "Munich",
    "Bavaria",
    "THD Deggendorf",
    "Werkstudent",
    "Portfolio",
  ],
  authors: [{ name: "Recep Ulaş Uzun" }],
  creator: "Recep Ulaş Uzun",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Recep Ulaş Uzun",
    title: "Recep Ulaş Uzun — Edge AI & Computer Vision Engineer",
    description:
      "Edge AI & computer vision engineer · M.Eng. AI for Smart Sensors and Actuators at THD Deggendorf · Previously at Vodafone Türkiye and KPMG.",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Recep Ulaş Uzun — Edge AI & Computer Vision Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recep Ulaş Uzun — Edge AI & Computer Vision Engineer",
    description:
      "Edge AI & computer vision engineer · M.Eng. AI for Smart Sensors and Actuators at THD Deggendorf · Previously at Vodafone Türkiye and KPMG.",
    images: ["/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Recep Ulaş Uzun",
              url: SITE_URL,
              image: `${SITE_URL}/me/avatar.png`,
              jobTitle: "Edge AI & Computer Vision Engineer — M.Eng. AI for Smart Sensors & Actuators",
              description:
                "Edge AI and computer vision engineer pursuing a Master's in AI for Smart Sensors and Actuators at THD Deggendorf. Previously in applied analytics at Vodafone Türkiye and KPMG.",
              worksFor: {
                "@type": "CollegeOrUniversity",
                name: "Technische Hochschule Deggendorf",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Kadir Has University",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Munich",
                addressCountry: "DE",
              },
              sameAs: [
                "https://www.linkedin.com/in/recep-ulas-uzun/",
                "https://github.com/salamon30",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <LanguageProvider>
          <MotionProvider>
            <NavBar />
            <CommandMenu />
            <main className="pt-16">
              <PageTransition>{children}</PageTransition>
            </main>
          </MotionProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
