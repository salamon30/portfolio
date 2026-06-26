"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { CATEGORY_COLORS, type Project } from "@/lib/projects";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const { t, locale } = useT();
  const color = CATEGORY_COLORS[project.category];

  const categoryLabel = {
    uni: t.projects.filterUni,
    work: t.projects.filterWork,
    personal: t.projects.filterPersonal,
    research: t.projects.filterResearch,
  }[project.category];

  return (
    <div className="container-page py-20 md:py-28">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-[var(--fg)]"
        >
          ← {t.projects.kicker}
        </Link>
      </motion.div>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px]">
        {/* LEFT — main content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {/* Category + year */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-faint">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: color }}
            />
            <span>{categoryLabel}</span>
            <span>·</span>
            <span className="num">{project.year}</span>
            {project.featured && (
              <span
                className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  color,
                  background: "color-mix(in srgb, currentColor 10%, transparent)",
                }}
              >
                ★ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            {project.titles[locale]}
          </h1>

          {/* Role */}
          {project.role && (
            <p className="mt-2 text-sm text-faint">{project.role[locale]}</p>
          )}

          {/* Cover */}
          {project.cover && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-default bg-subtle">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.cover}
                alt={project.titles.en}
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
            {(project.descriptions?.[locale] ?? project.summaries[locale])
              .split("\n\n")
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
        </motion.div>

        {/* RIGHT — sidebar */}
        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex flex-col gap-6"
        >
          {/* Links */}
          {project.links && (
            <div className="rounded-2xl border border-default bg-[var(--bg)] p-5 shadow-card">
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-faint">Links</p>
              <div className="flex flex-col gap-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-default px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
                  >
                    <GitHubIcon />
                    {t.projects.linkGithub}
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-default px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
                  >
                    <ExternalIcon />
                    {t.projects.linkDemo}
                  </a>
                )}
                {project.links.paper && (
                  <a
                    href={project.links.paper}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-default px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
                  >
                    <PaperIcon />
                    {t.projects.linkPaper}
                  </a>
                )}
                {project.links.api && (
                  <a
                    href={project.links.api}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-default px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
                  >
                    <ApiIcon />
                    {t.projects.linkApi}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Tech stack */}
          {project.tech.length > 0 && (
            <div className="rounded-2xl border border-default bg-[var(--bg)] p-5 shadow-card">
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-faint">Stack</p>
              <ul className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="num rounded-md border border-default bg-subtle px-2 py-0.5 text-[11px] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.aside>
      </div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 18l-6-6 6-6M16 6l6 6-6 6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 5h5v5M19 5L10 14M19 13v6H5V5h6" />
    </svg>
  );
}

function PaperIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 3h9l5 5v13H6zM14 3v6h6" />
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 6h16M4 12h10M4 18h7" />
      <path d="M19 15l2 2-2 2" />
    </svg>
  );
}
