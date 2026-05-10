"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { PROFILE_AVATAR, TENNIS_PHOTOS } from "@/lib/media";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogosStrip />
      <SelectedWork />
      <OffCourt />
      <Footer />
    </>
  );
}

/* ----------------------------- HERO ----------------------------- */

function Hero() {
  const { t } = useT();

  return (
    <section className="relative overflow-hidden">
      {/* Decorative background — subtle gradient blobs + grid mask */}
      <BackgroundDecoration />

      <div className="container-page relative py-24 md:py-32 lg:py-40">
        <motion.div
          key={t.hero.title1 + t.hero.title2} // re-stagger on locale change
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl"
        >
          {/* Avatar — only renders if a profile photo exists */}
          {PROFILE_AVATAR && (
            <motion.div
              variants={item}
              className="mb-7 flex justify-center"
            >
              <div className="group relative">
                {/* glow ring */}
                <div
                  aria-hidden
                  className="absolute -inset-1 rounded-full opacity-60 blur-md"
                  style={{
                    background:
                      "conic-gradient(from 180deg, var(--accent), transparent 60%, var(--accent))",
                  }}
                />
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[var(--bg)] shadow-lg ring-1 ring-[var(--border)]">
                  <Image
                    src={PROFILE_AVATAR}
                    alt="Recep Ulaş Uzun"
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority
                  />
                </div>
                {/* live status dot */}
                <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[var(--bg)] bg-emerald-500" />
                </span>
              </div>
            </motion.div>
          )}

          <motion.div variants={item} className="mb-8 flex justify-center">
            <span className="chip">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t.hero.status}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-center text-display font-semibold tracking-tight"
          >
            {t.hero.title1}
            <br />
            <span className="text-muted">{t.hero.title2}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted md:text-xl"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/journey" className="btn-primary">
              {t.hero.ctaPrimary}
              <ArrowRight />
            </Link>
            <Link
              href="/cv/CV_Uzun.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              {t.hero.ctaCv}
            </Link>
            <Link href="/contact" className="btn-ghost">
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-14">
            <MetricsRow />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* Subtle, premium-feeling background: animated gradient blobs over a dotted grid */
function BackgroundDecoration() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* dotted grid with soft mask */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_75%)]" />

      {/* blob 1 — accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 55%, transparent), transparent 70%)",
        }}
      />
      {/* blob 2 — cool drift */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -left-32 top-32 h-[420px] w-[420px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%)",
        }}
      />
      {/* blob 3 — warm right */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute -right-32 top-56 h-[380px] w-[380px] rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(244, 114, 182, 0.45), transparent 70%)",
        }}
      />
    </div>
  );
}

function MetricsRow() {
  const { t } = useT();
  const metrics = [
    { value: t.metrics.years, label: t.metrics.yearsLabel },
    { value: t.metrics.projects, label: t.metrics.projectsLabel },
    { value: t.metrics.countries, label: t.metrics.countriesLabel },
    { value: t.metrics.languages, label: t.metrics.languagesLabel },
  ];
  return (
    <div className="grid grid-cols-2 border-y border-default md:grid-cols-4">
      {metrics.map((m, i) => (
        <div
          key={i}
          className={`flex flex-col gap-1 px-5 py-6 text-center ${
            i > 0 ? "border-l border-default" : ""
          } ${i >= 2 ? "border-t border-default md:border-t-0" : ""}`}
        >
          <span className="num text-3xl font-semibold tracking-tight md:text-4xl">
            {m.value}
          </span>
          <span className="text-xs text-faint md:text-sm">{m.label}</span>
        </div>
      ))}
    </div>
  );
}

/* --------------------------- LOGOS STRIP --------------------------- */

function LogosStrip() {
  const { t } = useT();
  const items = [
    "Python",
    "PyTorch",
    "YOLOv8",
    "SQL",
    "Tableau",
    "Power BI",
    "C++",
    "TypeScript",
    "MATLAB",
    "Edge AI",
  ];
  return (
    <section className="border-y border-default bg-subtle">
      <div className="container-page py-10">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.18em] text-faint">
          {t.stack.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map((label) => (
            <span
              key={label}
              className="num text-sm font-medium text-muted transition-colors hover:text-[var(--fg)]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- SELECTED WORK ------------------------- */

function SelectedWork() {
  const { t } = useT();

  return (
    <section className="container-page py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex items-end justify-between"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-faint">
            {t.selectedWork.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t.selectedWork.title}
          </h2>
        </div>
        <Link
          href="/journey"
          className="hidden text-sm text-muted transition-colors hover:text-[var(--fg)] md:inline-flex"
        >
          {t.selectedWork.all} →
        </Link>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {t.selectedWork.items.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card group flex flex-col p-6 transition-shadow hover:shadow-cardHover"
          >
            <span className="text-[11px] uppercase tracking-[0.16em] text-faint">
              {p.kicker}
            </span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">
              {p.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {p.summary}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-default pt-4">
              <span className="num text-xs font-medium text-[var(--accent)]">
                {p.metric}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- OFF COURT ---------------------------- */

function OffCourt() {
  const { t } = useT();
  const hasPhotos = TENNIS_PHOTOS.length > 0;

  return (
    <section className="relative overflow-hidden border-t border-default">
      {/* faint accent wash so the section doesn't feel flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 0%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="container-page relative py-24 md:py-32">
        {/* Photo strip — only when at least one photo exists */}
        {hasPhotos && <TennisGallery photos={TENNIS_PHOTOS} />}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* LEFT — intro + stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-faint">
              <TennisIcon />
              {t.tennis.kicker}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {t.tennis.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {t.tennis.description}
            </p>

            <div className="mt-10 grid grid-cols-3 border-y border-default">
              {t.tennis.stats.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 py-5 ${
                    i > 0 ? "border-l border-default pl-4" : ""
                  }`}
                >
                  <span className="num text-2xl font-semibold tracking-tight md:text-3xl">
                    {s.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-faint">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — lesson cards */}
          <div className="flex flex-col gap-3">
            {t.tennis.lessons.map((l, i) => (
              <motion.div
                key={l.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="card p-5 md:p-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="num text-xs text-faint">
                    0{i + 1}
                  </span>
                  <h3 className="text-base font-semibold tracking-tight md:text-lg">
                    {l.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
                  {l.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Asymmetric tennis photo collage with parallax-like motion. */
function TennisGallery({ photos }: { photos: string[] }) {
  // Use up to 5 photos for the collage, in deterministic positions.
  const items = photos.slice(0, 5);
  // Slot definitions — varying span/aspect for a magazine-like feel.
  const slots = [
    "col-span-2 row-span-2 aspect-[4/5]",
    "col-span-2 aspect-[4/3]",
    "col-span-1 aspect-square",
    "col-span-1 aspect-square",
    "col-span-2 aspect-[16/9]",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 grid grid-cols-4 gap-3 md:mb-20 md:gap-4"
    >
      {items.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.08 * i }}
          whileHover={{ y: -4 }}
          className={`relative overflow-hidden rounded-2xl border border-default bg-subtle ${slots[i] ?? "col-span-1 aspect-square"}`}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.04]"
            loading={i < 2 ? "eager" : "lazy"}
          />
          {/* subtle vignette */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function TennisIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-[var(--accent)]"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 8.5c4 1.4 11 1.4 16 0M4 15.5c4-1.4 11-1.4 16 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ----------------------------- FOOTER ----------------------------- */

function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-default">
      <div className="container-page flex flex-col items-start justify-between gap-4 py-10 text-sm text-muted md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Recep Ulaş Uzun · {t.footer.built}</p>
        <div className="flex items-center gap-5">
          <Link href="mailto:ulasch_uzun@hotmail.com" className="hover:text-[var(--fg)]">
            Email
          </Link>
          <Link
            href="https://www.linkedin.com/in/recep-ulas-uzun/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--fg)]"
          >
            LinkedIn
          </Link>
          <Link
            href="/cv/CV_Uzun.pdf"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--fg)]"
          >
            {t.nav.cv}
          </Link>
          <span className="text-faint">München</span>
        </div>
      </div>
    </footer>
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
