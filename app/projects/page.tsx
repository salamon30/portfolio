"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useT } from "@/lib/i18n";
import {
  CATEGORY_COLORS,
  PROJECTS,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";

type Filter = "all" | ProjectCategory;

export default function ProjectsPage() {
  const { t, locale } = useT();
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.projects.filterAll },
    { id: "uni", label: t.projects.filterUni },
    { id: "work", label: t.projects.filterWork },
    { id: "personal", label: t.projects.filterPersonal },
    { id: "research", label: t.projects.filterResearch },
  ];

  const items = useMemo(
    () =>
      filter === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <div className="container-page py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 max-w-2xl"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-faint">
          {t.projects.kicker}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          {t.projects.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {t.projects.description}
        </p>
      </motion.div>

      {/* filters */}
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
                  layoutId="projects-filter-pill"
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

      {/* grid */}
      {items.length === 0 ? (
        <EmptyState
          title={t.projects.emptyTitle}
          body={t.projects.emptyBody}
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          <AnimatePresence initial={false}>
            {items.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <ProjectCard project={p} locale={locale} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */

function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: "en" | "tr" | "de";
}) {
  const { t } = useT();
  const color = CATEGORY_COLORS[project.category];
  const categoryLabel = {
    uni: t.projects.filterUni,
    work: t.projects.filterWork,
    personal: t.projects.filterPersonal,
    research: t.projects.filterResearch,
  }[project.category];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-default bg-[var(--bg)] shadow-card transition-shadow hover:shadow-cardHover">
      {/* top accent rail */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: color, opacity: 0.8 }}
      />

      {/* cover */}
      <CoverArea project={project} color={color} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-faint">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: color }}
          />
          <span>{categoryLabel}</span>
          <span className="text-faint">·</span>
          <span className="num">{project.year}</span>
          {project.featured && (
            <span
              className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide"
              style={{
                color,
                background: "color-mix(in srgb, currentColor 10%, transparent)",
              }}
            >
              ★ Featured
            </span>
          )}
        </div>

        <h2 className="mt-3 text-lg font-semibold tracking-tight md:text-xl">
          {project.titles[locale]}
        </h2>

        {project.role && (
          <p className="mt-1 text-xs text-faint">{project.role[locale]}</p>
        )}

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {project.summaries[locale]}
        </p>

        {project.tech.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="num rounded-md border border-default bg-subtle px-2 py-0.5 text-[11px] text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {project.links && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-default pt-4">
            {project.links.github && (
              <ProjectLink href={project.links.github} icon="code">
                {t.projects.linkGithub}
              </ProjectLink>
            )}
            {project.links.demo && (
              <ProjectLink href={project.links.demo} icon="external">
                {t.projects.linkDemo}
              </ProjectLink>
            )}
            {project.links.paper && (
              <ProjectLink href={project.links.paper} icon="paper">
                {t.projects.linkPaper}
              </ProjectLink>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function CoverArea({ project, color }: { project: Project; color: string }) {
  if (project.cover) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden border-b border-default bg-subtle">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.cover}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    );
  }

  // Deterministic, rich gradient derived from the project slug so every
  // card has its own mood while staying tied to the category colour.
  const seed = hashString(project.slug);
  const angle = 100 + (seed % 60);
  const x1 = 20 + (seed % 30);
  const y1 = 10 + ((seed >> 3) % 40);
  const x2 = 70 + ((seed >> 5) % 25);
  const y2 = 60 + ((seed >> 7) % 30);

  const initial = project.titles.en.charAt(0).toUpperCase();

  return (
    <div
      className="relative aspect-[16/9] overflow-hidden border-b border-default"
      style={{
        background: `
          radial-gradient(circle at ${x1}% ${y1}%, color-mix(in srgb, ${color} 45%, transparent), transparent 55%),
          radial-gradient(circle at ${x2}% ${y2}%, color-mix(in srgb, ${color} 25%, transparent), transparent 60%),
          linear-gradient(${angle}deg, color-mix(in srgb, ${color} 12%, var(--bg-subtle)), var(--bg-subtle))
        `,
      }}
    >
      {/* dotted texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--grid) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* floating initial */}
      <div className="absolute inset-0 flex items-center justify-between px-8">
        <div className="flex flex-col">
          <span
            className="num text-[96px] font-bold leading-none tracking-[-0.06em] transition-transform duration-500 group-hover:scale-[1.04]"
            style={{
              color,
              textShadow: `0 1px 0 color-mix(in srgb, ${color} 30%, transparent)`,
              opacity: 0.85,
            }}
          >
            {initial}
          </span>
          <span
            className="num mt-2 text-[11px] font-medium uppercase tracking-[0.2em]"
            style={{ color: `color-mix(in srgb, ${color} 70%, var(--fg-muted))` }}
          >
            {project.year}
          </span>
        </div>

        <svg
          width="88"
          height="88"
          viewBox="0 0 88 88"
          fill="none"
          aria-hidden
          className="opacity-40 transition-transform duration-700 group-hover:rotate-12"
          style={{ color }}
        >
          <circle cx="44" cy="44" r="38" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="44" cy="44" r="24" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 4" />
          <circle cx="44" cy="44" r="4" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

// Tiny, stable string hash (djb2 variant) for deterministic gradient seeds.
function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

function ProjectLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: "code" | "external" | "paper";
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-default px-3 py-1 text-xs text-muted transition-colors hover:text-[var(--fg)]"
    >
      <LinkIcon kind={icon} />
      {children}
    </Link>
  );
}

function LinkIcon({ kind }: { kind: "code" | "external" | "paper" }) {
  const common = {
    width: 12,
    height: 12,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    "aria-hidden": true,
  };
  if (kind === "code") {
    return (
      <svg {...common}>
        <path
          d="M8 18l-6-6 6-6M16 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (kind === "paper") {
    return (
      <svg {...common}>
        <path
          d="M6 3h9l5 5v13H6zM14 3v6h6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        d="M14 5h5v5M19 5L10 14M19 13v6H5V5h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-default bg-subtle py-16 text-center">
      <p className="text-sm font-medium text-[var(--fg)]">{title}</p>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  );
}
