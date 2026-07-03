"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

const EMERALD = "#10b981";

const PERFORMANCE = [
  { cls: "Overall",   map50: "94.9%", map5095: "61.5%", precision: "92.4%", recall: "90.2%", highlight: true },
  { cls: "Helmet",    map50: "96.1%", map5095: "61.8%", precision: "93.7%", recall: "92.1%", highlight: false },
  { cls: "No Helmet", map50: "93.7%", map5095: "61.2%", precision: "91.1%", recall: "88.3%", highlight: false },
];

const DEPLOY_STEPS = [
  {
    title: "Model",
    body: "YOLOv8s fine-tuned on a curated PPE dataset. Dataset quality and augmentation — mosaic, lighting shifts, perspective transforms — proved more impactful than model scaling.",
  },
  {
    title: "API",
    body: "Inference wrapped in a FastAPI REST API with image and video endpoints, containerised with Docker for reproducible builds.",
  },
  {
    title: "Dashboard",
    body: "Interactive Streamlit dashboard for live video upload, annotation preview and per-class performance metrics.",
  },
  {
    title: "CI/CD",
    body: "Deployed on Render with GitHub Actions — every push to main triggers an automatic rebuild and redeploy of both services.",
  },
];

export default function HelmetDetectionClient() {
  const { t } = useT();

  return (
    <div className="container-page py-20 md:py-28">
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
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {/* Category + year */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-faint">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: EMERALD }} />
            <span>{t.projects.filterUni}</span>
            <span>·</span>
            <span className="num">2026</span>
            <span
              className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ color: EMERALD, background: "color-mix(in srgb, currentColor 10%, transparent)" }}
            >
              ★ Featured
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            PPE Helmet Detection — Live Cloud Deploy
          </h1>
          <p className="mt-2 text-sm text-faint">
            Solo · Machine Learning &amp; Deep Learning · M.Eng. · THD Deggendorf
          </p>

          {/* Metric chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { label: "94.9% mAP@50", desc: "Overall" },
              { label: "103 FPS",      desc: "GPU inference" },
              { label: "YOLOv8s",      desc: "Model" },
              { label: "CI/CD",        desc: "Auto-deploy" },
            ].map(({ label, desc }) => (
              <div
                key={label}
                className="rounded-xl border px-3 py-1.5 text-sm"
                style={{ borderColor: `${EMERALD}50`, background: `${EMERALD}0d` }}
              >
                <span className="num font-semibold" style={{ color: EMERALD }}>{label}</span>
                <span className="ml-1.5 text-xs text-faint">{desc}</span>
              </div>
            ))}
          </div>

          {/* Demo video */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-default bg-subtle">
            <video
              src="/projects/helmet-detection/demo.mp4"
              controls
              muted
              loop
              playsInline
              className="w-full"
              poster="/projects/helmet-detection/still-1.jpg"
            />
          </div>
          <p className="mt-2 text-xs text-faint">
            Live inference — per-person helmet detection with real-time compliance HUD
          </p>

          {/* Problem */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Problem</h2>
            <div className="mt-3 space-y-3 text-base leading-relaxed text-muted">
              <p>
                Manual PPE compliance checks on construction sites are slow, inconsistent and
                impossible to scale across camera feeds. The goal: detect helmet / no-helmet per
                person in live video, aggregate a site-level compliance score in real time, and make
                the whole system reproducible enough to redeploy with a single push.
              </p>
              <p>
                Final case study for the Machine Learning and Deep Learning course at THD Deggendorf —
                extended beyond coursework requirements into a full production deployment.
              </p>
            </div>
          </section>

          {/* Model performance */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Model Performance</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-default">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-default bg-subtle">
                    {["Class", "mAP@50", "mAP@50-95", "Precision", "Recall"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-4 py-3 text-xs font-medium uppercase tracking-widest text-faint ${i === 0 ? "text-left" : "text-right"}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERFORMANCE.map((row, i) => (
                    <tr key={row.cls} className={i < PERFORMANCE.length - 1 ? "border-b border-default" : ""}>
                      <td className="px-4 py-3 font-medium">{row.cls}</td>
                      <td
                        className="num px-4 py-3 text-right font-semibold"
                        style={{ color: row.highlight ? EMERALD : undefined }}
                      >
                        {row.map50}
                      </td>
                      <td className="num px-4 py-3 text-right text-muted">{row.map5095}</td>
                      <td className="num px-4 py-3 text-right text-muted">{row.precision}</td>
                      <td className="num px-4 py-3 text-right text-muted">{row.recall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-faint">
              Held-out test split · 103 FPS on GPU · confidence threshold 0.50
            </p>
          </section>

          {/* Deployment pipeline */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">From Notebook to Production</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {DEPLOY_STEPS.map((step, i) => (
                <div key={i} className="rounded-2xl border border-default bg-[var(--bg)] p-5 shadow-card">
                  <div
                    className="num mb-2 text-xs font-medium tracking-widest"
                    style={{ color: EMERALD }}
                  >
                    0{i + 1}
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key learning */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Key Learning</h2>
            <div
              className="mt-4 rounded-2xl border p-5"
              style={{ borderColor: `${EMERALD}40`, background: `${EMERALD}0a` }}
            >
              <p className="text-sm leading-relaxed text-muted">
                The gap between held-out test accuracy and live-camera performance closed
                significantly after <strong>adding 200 frames from the actual deployment
                environment</strong> to the training set. In production computer vision, domain
                match beats benchmark scores.
              </p>
            </div>
          </section>
        </motion.div>

        {/* RIGHT sidebar */}
        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex flex-col gap-6"
        >
          {/* Links */}
          <div className="rounded-2xl border border-default bg-[var(--bg)] p-5 shadow-card">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-faint">Links</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/salamon30/helmet-detection"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-default px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
              >
                <GitHubIcon /> {t.projects.linkGithub}
              </a>
              <a
                href="https://helmet-streamlit.onrender.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-default px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
              >
                <ExternalIcon /> {t.projects.linkDemo}
              </a>
              <a
                href="https://helmet-detection-6kf7.onrender.com/docs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-default px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
              >
                <ApiIcon /> {t.projects.linkApi}
              </a>
            </div>
          </div>

          {/* Stack */}
          <div className="rounded-2xl border border-default bg-[var(--bg)] p-5 shadow-card">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-faint">Stack</p>
            <ul className="flex flex-wrap gap-1.5">
              {["Python", "YOLOv8s", "PyTorch", "OpenCV", "FastAPI", "Docker", "Render", "GitHub Actions", "Streamlit"].map((tech) => (
                <li
                  key={tech}
                  className="num rounded-md border border-default bg-subtle px-2 py-0.5 text-[11px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Course */}
          <div className="rounded-2xl border border-default bg-[var(--bg)] p-5 shadow-card">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-faint">Context</p>
            <div className="space-y-1.5 text-sm text-muted">
              <p>Technische Hochschule Deggendorf</p>
              <p className="text-faint">Machine Learning &amp; Deep Learning</p>
              <p className="text-faint">M.Eng. AI for Smart Sensors &amp; Actuators</p>
            </div>
            <p className="mt-3 text-xs text-faint">2026 · Solo project</p>
          </div>
        </motion.aside>
      </div>

      {/* Streamlit dashboard */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="mt-16"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">Streamlit Dashboard</h2>
          <a
            href="https://helmet-streamlit.onrender.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-[var(--fg)]"
          >
            Open live dashboard →
          </a>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-default bg-subtle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/helmet-detection/dashboard-detection.png"
              alt="Streamlit dashboard — detection tab with image, video and webcam modes"
              className="w-full"
              loading="lazy"
            />
            <figcaption className="px-4 py-2.5 text-xs text-faint">
              Detection — image / video / webcam input with adjustable confidence threshold
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-default bg-subtle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/helmet-detection/dashboard-analysis.png"
              alt="Streamlit dashboard — model analysis tab with per-class performance metrics"
              className="w-full"
              loading="lazy"
            />
            <figcaption className="px-4 py-2.5 text-xs text-faint">
              Model Analysis — per-class metrics and training curves
            </figcaption>
          </figure>
        </div>
      </motion.section>

      {/* Sample detections */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16"
      >
        <h2 className="text-lg font-semibold tracking-tight">Sample Detections</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-default bg-subtle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/helmet-detection/still-1.jpg"
              alt="Three workers detected wearing helmets — 100% compliance"
              className="w-full"
              loading="lazy"
            />
            <figcaption className="px-4 py-2.5 text-xs text-faint">
              3 helmets detected · Compliance: 100%
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-default bg-subtle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/helmet-detection/still-2.jpg"
              alt="Per-person helmet detection with confidence scores"
              className="w-full"
              loading="lazy"
            />
            <figcaption className="px-4 py-2.5 text-xs text-faint">
              Per-person confidence scores at 0.50 threshold
            </figcaption>
          </figure>
        </div>
      </motion.section>
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

function ApiIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 6h16M4 12h10M4 18h7" />
      <path d="M19 15l2 2-2 2" />
    </svg>
  );
}
