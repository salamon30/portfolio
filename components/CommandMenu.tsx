"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LOCALES, LOCALE_FULL_LABELS, useT, type Locale } from "@/lib/i18n";

type CmdItem = {
  id: string;
  label: string;
  hint?: string;
  section: string;
  keywords: string;
  run: () => void;
};

type Theme = "light" | "dark";

export function CommandMenu() {
  const { t, locale, setLocale } = useT();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  const openExternal = useCallback(
    (href: string) => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [close]
  );

  const setTheme = useCallback((mode: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    try {
      window.localStorage.setItem("theme", mode);
    } catch {}
  }, []);

  const sectionLabels = useMemo(() => {
    const map: Record<Locale, { pages: string; actions: string; theme: string; lang: string }> = {
      en: { pages: "Pages", actions: "Actions", theme: "Theme", lang: "Language" },
      tr: { pages: "Sayfalar", actions: "Eylemler", theme: "Tema", lang: "Dil" },
      de: { pages: "Seiten", actions: "Aktionen", theme: "Design", lang: "Sprache" },
    };
    return map[locale];
  }, [locale]);

  const placeholderText = useMemo(() => {
    const map: Record<Locale, string> = {
      en: "Type a command or search…",
      tr: "Komut yaz ya da ara…",
      de: "Befehl eingeben oder suchen…",
    };
    return map[locale];
  }, [locale]);

  const emptyText = useMemo(() => {
    const map: Record<Locale, string> = {
      en: "No results",
      tr: "Sonuç bulunamadı",
      de: "Keine Ergebnisse",
    };
    return map[locale];
  }, [locale]);

  const items: CmdItem[] = useMemo(() => {
    const pages = [
      { id: "home", label: t.nav.home, href: "/" },
      { id: "journey", label: t.nav.journey, href: "/journey" },
      { id: "projects", label: t.nav.projects, href: "/projects" },
      { id: "travel", label: t.nav.travel, href: "/travel" },
      { id: "think", label: t.nav.think, href: "/think" },
      { id: "contact", label: t.nav.contact, href: "/contact" },
    ].map<CmdItem>((p) => ({
      id: `page-${p.id}`,
      label: p.label,
      section: sectionLabels.pages,
      keywords: `${p.label} ${p.id} ${p.href}`,
      run: () => navigate(p.href),
    }));

    const actions: CmdItem[] = [
      {
        id: "cv",
        label: t.nav.cv,
        hint: "PDF",
        section: sectionLabels.actions,
        keywords: "cv resume lebenslauf özgeçmiş",
        run: () => openExternal("/cv/CV_Uzun.pdf"),
      },
      {
        id: "email",
        label: "Email",
        hint: "ulasch_uzun@hotmail.com",
        section: sectionLabels.actions,
        keywords: "email mail contact iletişim kontakt",
        run: () => openExternal("mailto:ulasch_uzun@hotmail.com"),
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        section: sectionLabels.actions,
        keywords: "linkedin",
        run: () => openExternal("https://www.linkedin.com/in/recep-ulas-uzun/"),
      },
      {
        id: "github",
        label: "GitHub",
        section: sectionLabels.actions,
        keywords: "github code repo",
        run: () => openExternal("https://github.com/salamon30"),
      },
    ];

    const themes: CmdItem[] = [
      {
        id: "theme-light",
        label: locale === "tr" ? "Aydınlık tema" : locale === "de" ? "Helles Design" : "Light theme",
        section: sectionLabels.theme,
        keywords: "light theme aydınlık hell",
        run: () => {
          setTheme("light");
          close();
        },
      },
      {
        id: "theme-dark",
        label: locale === "tr" ? "Karanlık tema" : locale === "de" ? "Dunkles Design" : "Dark theme",
        section: sectionLabels.theme,
        keywords: "dark theme karanlık dunkel",
        run: () => {
          setTheme("dark");
          close();
        },
      },
    ];

    const langs: CmdItem[] = LOCALES.map((l) => ({
      id: `lang-${l}`,
      label: LOCALE_FULL_LABELS[l],
      section: sectionLabels.lang,
      keywords: `${l} ${LOCALE_FULL_LABELS[l]}`,
      run: () => {
        setLocale(l);
        close();
      },
    }));

    return [...pages, ...actions, ...themes, ...langs];
  }, [t, sectionLabels, navigate, openExternal, setTheme, setLocale, locale, close]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.keywords.toLowerCase().includes(q) || i.label.toLowerCase().includes(q));
  }, [items, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, CmdItem[]>();
    for (const item of filtered) {
      const arr = map.get(item.section) ?? [];
      arr.push(item);
      map.set(item.section, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  // Flat list (used for keyboard nav) preserving group order.
  const flat = useMemo(() => grouped.flatMap(([, arr]) => arr), [grouped]);

  // Global keyboard shortcut: ⌘K / Ctrl+K.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus input when opened.
  useEffect(() => {
    if (open) {
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      flat[active]?.run();
    }
  };

  let runningIdx = 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-default bg-[var(--bg)] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-default px-4 py-3">
              <SearchIcon />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder={placeholderText}
                className="h-8 flex-1 bg-transparent text-sm text-[var(--fg)] placeholder:text-faint focus:outline-none"
              />
              <kbd className="hidden rounded border border-default bg-subtle px-1.5 py-0.5 text-[10px] text-[var(--fg-muted)] md:inline">
                ESC
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-1.5">
              {grouped.length === 0 && (
                <p className="px-4 py-6 text-sm text-muted">{emptyText}</p>
              )}
              {grouped.map(([section, arr]) => (
                <div key={section} className="px-1.5 py-1">
                  <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-faint">
                    {section}
                  </p>
                  {arr.map((item) => {
                    const idx = runningIdx++;
                    const isActive = idx === active;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActive(idx)}
                        onClick={item.run}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-subtle text-[var(--fg)]"
                            : "text-[var(--fg-muted)]"
                        }`}
                      >
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.hint && (
                          <span className="text-xs text-faint">{item.hint}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-default px-4 py-2.5 text-[11px] text-faint">
              <div className="flex items-center gap-3">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                <span>{locale === "tr" ? "gezin" : locale === "de" ? "navigieren" : "navigate"}</span>
                <span className="mx-2">·</span>
                <Kbd>↵</Kbd>
                <span>{locale === "tr" ? "seç" : locale === "de" ? "auswählen" : "select"}</span>
              </div>
              <span>⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-default bg-subtle px-1.5 py-0.5 font-mono text-[10px] text-[var(--fg-muted)]">
      {children}
    </kbd>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[var(--fg-muted)]"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
