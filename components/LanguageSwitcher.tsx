"use client";

import { motion } from "framer-motion";
import { LOCALES, LOCALE_LABELS, useT } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useT();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex h-9 items-center gap-0.5 rounded-full border border-default bg-[var(--bg)] p-0.5 text-xs font-medium"
    >
      {LOCALES.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => setLocale(loc)}
            aria-pressed={active}
            className={`relative isolate flex h-8 min-w-[2.25rem] items-center justify-center rounded-full px-2 transition-colors ${
              active
                ? "text-white"
                : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{ background: "var(--accent)" }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{LOCALE_LABELS[loc]}</span>
          </button>
        );
      })}
    </div>
  );
}
