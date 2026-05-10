"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function NotFound() {
  const { t, locale } = useT();

  const copy: Record<
    "en" | "tr" | "de",
    { kicker: string; title: string; body: string; home: string; contact: string }
  > = {
    en: {
      kicker: "404 · Not found",
      title: "Page not found.",
      body: "The link may be broken or the page may have been moved. Use one of the routes below to continue.",
      home: "Back to home",
      contact: "Send a message",
    },
    tr: {
      kicker: "404 · Bulunamadı",
      title: "Sayfa bulunamadı.",
      body: "Bağlantı bozulmuş ya da sayfa taşınmış olabilir. Aşağıdaki bağlantılardan birini kullanarak devam edebilirsiniz.",
      home: "Anasayfaya dön",
      contact: "Mesaj gönder",
    },
    de: {
      kicker: "404 · Nicht gefunden",
      title: "Seite nicht gefunden.",
      body: "Der Link ist möglicherweise nicht mehr gültig oder die Seite wurde verschoben. Bitte verwenden Sie einen der folgenden Wege.",
      home: "Zurück zur Startseite",
      contact: "Nachricht senden",
    },
  };
  const c = copy[locale];

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-grid">
      <div className="container-page flex min-h-[calc(100vh-4rem)] flex-col items-start justify-center py-24">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs uppercase tracking-[0.18em] text-faint"
        >
          {c.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl"
        >
          {c.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          {c.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link href="/" className="btn-primary">
            {c.home}
            <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            {c.contact}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid w-full max-w-2xl grid-cols-2 gap-2 md:grid-cols-3"
        >
          <QuickLink href="/journey" label={t.nav.journey} />
          <QuickLink href="/projects" label={t.nav.projects} />
          <QuickLink href="/travel" label={t.nav.travel} />
          <QuickLink href="/think" label={t.nav.think} />
          <QuickLink href="/contact" label={t.nav.contact} />
          <QuickLink href="/cv/CV_Uzun.pdf" label={t.nav.cv} external />
        </motion.div>
      </div>
    </section>
  );
}

function QuickLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center justify-between rounded-xl border border-default bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg-muted)] transition-colors hover:border-[var(--fg)]/30 hover:text-[var(--fg)]"
    >
      {label}
      <span className="opacity-0 transition-opacity group-hover:opacity-100">
        <ArrowUpRight />
      </span>
    </Link>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 7h10m0 0L7.5 2.5M12 7l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M4 10 10 4m0 0H5m5 0v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
