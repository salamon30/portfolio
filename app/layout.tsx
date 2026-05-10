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
    default: "Recep Ulaş Uzun — Data, AI & Smart Sensors",
    template: "%s · Recep Ulaş Uzun",
  },
  description:
    "Computer engineer pursuing a Master's in AI for Smart Sensors and Actuators at THD Deggendorf. Background in applied analytics at Vodafone Türkiye and KPMG. Based in Munich.",
  keywords: [
    "Recep Uzun",
    "Recep Ulaş Uzun",
    "Data Engineer",
    "AI",
    "Smart Sensors",
    "Machine Learning",
    "Munich",
    "THD",
    "Vodafone",
    "KPMG",
    "Portfolio",
  ],
  authors: [{ name: "Recep Ulaş Uzun" }],
  creator: "Recep Ulaş Uzun",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Recep Ulaş Uzun",
    title: "Recep Ulaş Uzun — Data, AI & Smart Sensors",
    description:
      "Computer engineer · Master's in AI for Smart Sensors and Actuators at THD Deggendorf · Applied analytics at Vodafone Türkiye and KPMG.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recep Ulaş Uzun — Data, AI & Smart Sensors",
    description:
      "Computer engineer · Master's in AI for Smart Sensors and Actuators at THD Deggendorf · Applied analytics at Vodafone Türkiye and KPMG.",
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
