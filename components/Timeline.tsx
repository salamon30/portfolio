"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useT } from "@/lib/i18n";

type Kind = "all" | "work" | "education" | "achievement";

const TYPE_COLORS: Record<Exclude<Kind, "all">, string> = {
  work: "var(--accent)",
  education: "#8b5cf6",
  achievement: "#f59e0b",
};

export function Timeline() {
  const { t } = useT();
  const [filter, setFilter] = useState<Kind>("all");

  const filters: { id: Kind; label: string }[] = [
    { id: "all", label: t.journey.filterAll },
    { id: "work", label: t.journey.filterWork },
    { id: "education", label: t.journey.filterEducation },
    { id: "achievement", label: t.journey.filterAchievement },
  ];

  const items = useMemo(
    () =>
      filter === "all"
        ? t.journey.items
        : t.journey.items.filter((i) => i.type === filter),
    [filter, t.journey.items]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              className={`relative rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active
                  ? "border-transparent text-white"
                  : "border-default text-muted hover:text-[var(--fg)]"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="timeline-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{ background: "var(--accent)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="relative">
        {/* vertical rail */}
        <div
          aria-hidden
          className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--border)] md:left-[11px]"
        />

        <AnimatePresence initial={false}>
          <ul className="space-y-8">
            {items.map((it, i) => (
              <motion.li
                key={it.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="relative grid grid-cols-[24px_1fr] gap-4 md:grid-cols-[140px_24px_1fr] md:gap-6"
              >
                {/* period (desktop only on left) */}
                <span className="num hidden shrink-0 text-right text-xs text-faint md:block md:pt-1.5">
                  {it.period}
                </span>

                {/* dot */}
                <span className="relative flex items-start justify-center">
                  <span
                    className="mt-1.5 inline-block h-[9px] w-[9px] rounded-full ring-4"
                    style={{
                      background: TYPE_COLORS[it.type],
                      // @ts-expect-error CSS var is valid but TS is strict
                      "--tw-ring-color": "var(--bg)",
                    }}
                  />
                </span>

                {/* content */}
                <div className="min-w-0">
                  <span className="num text-xs text-faint md:hidden">
                    {it.period}
                  </span>
                  <h3 className="mt-0.5 text-base font-semibold tracking-tight md:text-lg md:mt-0">
                    {it.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted">
                    <span className="font-medium text-[var(--fg)]">{it.org}</span>
                    <span className="text-faint"> · {it.location}</span>
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {it.summary}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
