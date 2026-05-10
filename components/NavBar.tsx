"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useT } from "@/lib/i18n";

export function NavBar() {
  const pathname = usePathname();
  const { t } = useT();
  const [open, setOpen] = useState(false);

  const items = [
    { href: "/",         label: t.nav.home },
    { href: "/journey",  label: t.nav.journey },
    { href: "/projects", label: t.nav.projects },
    { href: "/travel",   label: t.nav.travel },
    { href: "/think",    label: t.nav.think },
    { href: "/contact",  label: t.nav.contact },
  ];

  // Close the mobile sheet on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scroll while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-default bg-[var(--bg)]/75 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-default text-[11px] font-bold">
              R
            </span>
            <span className="hidden sm:inline">recep.uzun</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative isolate rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active
                      ? "text-[var(--fg)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-subtle"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Command palette hint — only on desktop */}
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", metaKey: true })
                );
              }}
              aria-label="Open command menu"
              className="hidden h-9 items-center gap-2 rounded-full border border-default bg-[var(--bg)] px-3 text-xs font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] lg:inline-flex"
            >
              <SearchIcon />
              <span>{t.nav.search}</span>
              <kbd className="rounded border border-default bg-subtle px-1 py-0.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>

            {/* CV — only on desktop */}
            <Link
              href="/cv/CV_Uzun.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden h-9 items-center gap-1.5 rounded-full border border-default bg-[var(--bg)] px-3 text-xs font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] lg:inline-flex"
              aria-label={t.nav.cv}
            >
              <DownloadIcon />
              {t.nav.cv}
            </Link>

            <LanguageSwitcher />
            <ThemeToggle />

            {/* Hamburger — only below lg */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-default bg-[var(--bg)] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-16 z-30 bg-[var(--bg)]/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-16 z-30 border-b border-default bg-[var(--bg)] lg:hidden"
            >
              <nav className="container-page flex flex-col gap-1 py-4">
                {items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-xl px-4 py-3 text-base transition-colors ${
                        active
                          ? "bg-subtle text-[var(--fg)]"
                          : "text-[var(--fg-muted)] hover:bg-subtle hover:text-[var(--fg)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <Link
                  href="/cv/CV_Uzun.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center gap-2 rounded-xl border border-default px-4 py-3 text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                >
                  <DownloadIcon />
                  {t.nav.cv}
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* --------------------------- ICONS --------------------------- */

function DownloadIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MenuIcon() {
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
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
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
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
