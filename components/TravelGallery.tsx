"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { COUNTRIES, type Country } from "@/lib/travel";
import { useT } from "@/lib/i18n";
import { WorldMap } from "./WorldMap";

export function TravelGallery() {
  const { t, locale } = useT();
  const [activeSlug, setActiveSlug] = useState<string>(COUNTRIES[0].slug);
  const active = COUNTRIES.find((c) => c.slug === activeSlug) ?? COUNTRIES[0];

  return (
    <>
      {/* MAP */}
      <div className="mb-10">
        <WorldMap activeSlug={activeSlug} onSelect={setActiveSlug} />
        <p className="mt-3 text-center text-xs text-faint md:text-sm">
          {t.travel.description}
        </p>
      </div>

      {/* LIST + DETAIL */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[260px_1fr]">
        {/* left — chip list */}
        <aside className="md:sticky md:top-24 md:self-start">
          <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-faint">
            {t.travel.visited} · {COUNTRIES.length}
          </p>
          <ul className="flex flex-wrap gap-2 md:flex-col md:gap-1">
            {COUNTRIES.map((c) => {
              const isActive = c.slug === activeSlug;
              return (
                <li key={c.slug} className="md:w-full">
                  <button
                    onClick={() => setActiveSlug(c.slug)}
                    aria-pressed={isActive}
                    className={`group relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                      isActive
                        ? "border-default bg-subtle"
                        : "border-transparent hover:bg-subtle"
                    }`}
                  >
                    <span className="text-lg leading-none">{c.flag}</span>
                    <span className="flex-1 truncate font-medium">
                      {c.names[locale]}
                      {c.current && (
                        <span className="num ml-2 text-[10px] text-[var(--accent)]">
                          • {hereLabel(locale)}
                        </span>
                      )}
                      {c.home && (
                        <span className="num ml-2 text-[10px] text-faint">
                          • {homeLabel(locale)}
                        </span>
                      )}
                    </span>
                    <span className="num text-[11px] text-faint">{c.year}</span>
                    {isActive && (
                      <motion.span
                        layoutId="travel-active-bar"
                        className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* right — detail */}
        <section>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <CountryDetail country={active} />
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </>
  );
}

function hereLabel(locale: "en" | "tr" | "de") {
  return { en: "here", tr: "burası", de: "hier" }[locale];
}
function homeLabel(locale: "en" | "tr" | "de") {
  return { en: "home", tr: "yuva", de: "Heimat" }[locale];
}

function CountryDetail({ country }: { country: Country }) {
  const { t, locale } = useT();

  return (
    <article>
      <header className="flex flex-wrap items-end gap-3">
        <span className="text-5xl leading-none">{country.flag}</span>
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-faint">
            {t.travel.year} · {country.year}
          </p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
            {country.names[locale]}
          </h2>
        </div>
      </header>

      {country.cities.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {country.cities.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
      )}

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
        {country.notes[locale]}
      </p>

      <div className="mt-10">
        <PhotoGrid country={country} />
      </div>
    </article>
  );
}

function PhotoGrid({ country }: { country: Country }) {
  const { t } = useT();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (country.photos.length === 0) {
    return <EmptyPhotos flag={country.flag} message={t.travel.noPhotos} />;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {country.photos.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => setLightboxIndex(i)}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-default bg-subtle"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </motion.button>
        ))}
      </div>

      <Lightbox
        photos={country.photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onChange,
}: {
  photos: string[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number | null) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange(((index ?? 0) + 1) % photos.length);
      if (e.key === "ArrowLeft")
        onChange(((index ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, photos.length, onClose, onChange]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative h-full w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[index]}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </motion.div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70"
          >
            ✕
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index - 1 + photos.length) % photos.length);
                }}
                aria-label="Previous"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index + 1) % photos.length);
                }}
                aria-label="Next"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70"
              >
                ›
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white/80">
                {index + 1} / {photos.length}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EmptyPhotos({ flag, message }: { flag: string; message: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-dashed border-default bg-subtle"
        >
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <span className="text-2xl opacity-60">📷</span>
            <span className="text-2xl opacity-60">{flag}</span>
            {i === 1 && (
              <span className="text-[11px] leading-snug text-faint">
                {message}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
