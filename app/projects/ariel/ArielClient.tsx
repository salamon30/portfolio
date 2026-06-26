"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

const AMBER = "#f59e0b";

const PIPELINE = [
  {
    title: "Frame Extraction",
    body: "30 FPS drone footage filtered with a pixel-wise intensity threshold (≥10% delta per frame). Reduces 2,374 raw frames to ~237 per video sequence without sacrificing scene diversity.",
  },
  {
    title: "Annotation",
    body: "Collaborative labeling in Roboflow: tight bounding boxes, shadow exclusion (label the physical silhouette only), ≥20% body-visibility rule for truncated objects, ~15% negative-sample ratio.",
  },
  {
    title: "Training",
    body: "YOLOv8n on Google Colab T4 GPU for 150 epochs. Cosine LR decay, early stopping (patience=15), tuned loss weights (box=7.5, cls=1.5), batch=16, imgsz=640.",
  },
  {
    title: "Evaluation",
    body: "Locked 10% test split — 231 images, 501 instances. Metrics: mAP@0.5, mAP@0.5:0.95, per-class precision and recall, and confusion matrix analysis.",
  },
];

const DATASET_STATS = [
  { value: "4,776", label: "Annotations" },
  { value: "2,227", label: "Frames labeled" },
  { value: "10", label: "Video sequences" },
  { value: "4", label: "Distinct scenes" },
];

const RESULTS = [
  { cls: "All",     precision: "0.956", recall: "0.926", map50: "0.918", map5095: "0.850", highlight: true },
  { cls: "Human",   precision: "0.949", recall: "0.958", map50: "0.951", map5095: "0.845", highlight: false },
  { cls: "Bicycle", precision: "0.918", recall: "0.818", map50: "0.807", map5095: "0.713", highlight: false },
  { cls: "Vehicle", precision: "1.000", recall: "1.000", map50: "0.995", map5095: "0.993", highlight: false },
];

const LATENCY = [
  { label: "Preprocess",   ms: "0.9 ms" },
  { label: "Inference",    ms: "2.3 ms" },
  { label: "Postprocess",  ms: "1.0 ms" },
  { label: "Total",        ms: "4.2 ms" },
];

const TEAM = [
  { name: "Berke Uğur Aksakal", github: "https://github.com/BUAksakal" },
  { name: "Seifeldin Haggag",   github: "https://github.com/Seifeldin-Haggag" },
  { name: "Yazan Rihani",       github: null },
  { name: "Recep Uzun",         github: "https://github.com/salamon30" },
];

export default function ArielClient() {
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
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: AMBER }} />
            <span>{t.projects.filterResearch}</span>
            <span>·</span>
            <span className="num">2026</span>
            <span
              className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ color: AMBER, background: "color-mix(in srgb, currentColor 10%, transparent)" }}
            >
              ★ Featured
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Project Ariel — Low-Altitude Aerial Detection
          </h1>
          <p className="mt-2 text-sm text-faint">
            ML Engineering · Group-One · THD × THI × Fraunhofer IVI · April – July 2026
          </p>

          {/* Metric chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { label: "91.8% mAP@0.5", desc: "Overall" },
              { label: "4.2 ms",         desc: "Per frame" },
              { label: "YOLOv8n",        desc: "Model" },
              { label: "4,776",          desc: "Annotations" },
            ].map(({ label, desc }) => (
              <div
                key={label}
                className="rounded-xl border px-3 py-1.5 text-sm"
                style={{ borderColor: `${AMBER}50`, background: `${AMBER}0d` }}
              >
                <span className="num font-semibold" style={{ color: AMBER }}>{label}</span>
                <span className="ml-1.5 text-xs text-faint">{desc}</span>
              </div>
            ))}
          </div>

          {/* Demo video */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-default bg-subtle">
            <video
              src="https://github.com/user-attachments/assets/6bf30f82-0f2c-4328-b598-dad79f8f0d81"
              controls
              muted
              loop
              playsInline
              className="w-full"
              poster="/projects/ariel.svg"
            />
          </div>
          <p className="mt-2 text-xs text-faint">YOLOv8n · 2× speed · conf=0.50</p>

          {/* Problem */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Problem</h2>
            <div className="mt-3 space-y-3 text-base leading-relaxed text-muted">
              <p>
                Existing aerial object-detection datasets — VisDrone, UAVDT — are designed for flight altitudes above 30 metres. At 3–9 metres the geometry changes entirely: objects fill the frame, perspective distortion dominates, and ground shadows frequently exceed the physical footprint of the objects they cast. Standard detectors miss detections and generate high false-positive rates on shadows and ground texture.
              </p>
              <p>
                The project&apos;s goal was to close that gap by building a fully annotated dataset from real low-altitude drone footage and fine-tuning a nano-scale model suitable for onboard edge deployment.
              </p>
            </div>
          </section>

          {/* Pipeline */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">4-Stage Pipeline</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PIPELINE.map((step, i) => (
                <div key={i} className="rounded-2xl border border-default bg-[var(--bg)] p-5 shadow-card">
                  <div
                    className="num mb-2 text-xs font-medium tracking-widest"
                    style={{ color: AMBER }}
                  >
                    0{i + 1}
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Dataset */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Dataset</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {DATASET_STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-default bg-[var(--bg)] p-4 text-center shadow-card"
                >
                  <div className="num text-2xl font-semibold" style={{ color: AMBER }}>{value}</div>
                  <div className="mt-1 text-xs text-faint">{label}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-faint">
              Classes: Human 3,642 (76.2%) · Bicycle 597 (12.5%) · Vehicle 537 (11.2%) · Scenes: DK_backyard, DK_parking, THI_Bikepark, THI_Grass · Split: 80 / 10 / 10
            </p>
          </section>

          {/* Results */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Results</h2>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-default">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-default bg-subtle">
                    {["Class", "Precision", "Recall", "mAP@0.5", "mAP@0.5:0.95"].map((h, i) => (
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
                  {RESULTS.map((row, i) => (
                    <tr key={row.cls} className={i < RESULTS.length - 1 ? "border-b border-default" : ""}>
                      <td className="px-4 py-3 font-medium">{row.cls}</td>
                      <td className="num px-4 py-3 text-right text-muted">{row.precision}</td>
                      <td className="num px-4 py-3 text-right text-muted">{row.recall}</td>
                      <td
                        className="num px-4 py-3 text-right font-semibold"
                        style={{ color: row.highlight ? AMBER : undefined }}
                      >
                        {row.map50}
                      </td>
                      <td className="num px-4 py-3 text-right text-muted">{row.map5095}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Latency */}
            <div className="mt-4 rounded-2xl border border-default bg-[var(--bg)] p-5 shadow-card">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-faint">
                Inference Latency · T4 GPU
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                {LATENCY.map(({ label, ms }) => (
                  <div key={label}>
                    <div className="num text-xl font-semibold text-[var(--fg)]">{ms}</div>
                    <div className="mt-0.5 text-xs text-faint">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key finding */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Key Finding</h2>
            <div
              className="mt-4 rounded-2xl border p-5"
              style={{ borderColor: `${AMBER}40`, background: `${AMBER}0a` }}
            >
              <p className="text-sm leading-relaxed text-muted">
                Confusion matrix analysis revealed the primary failure mode:{" "}
                <strong>83% of background false positives were classified as Human</strong>. The model
                occasionally hallucinates people on empty terrain — a direct consequence of Human being
                the majority class (76.2%). Future iterations should expand the negative-sample pool
                and apply hard-negative mining to address this bias.
              </p>
            </div>
          </section>

          {/* Team */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Team</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {TEAM.map(({ name, github }) =>
                github ? (
                  <a
                    key={name}
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-default px-3 py-1.5 text-sm transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
                  >
                    {name}
                  </a>
                ) : (
                  <span
                    key={name}
                    className="rounded-xl border border-default px-3 py-1.5 text-sm text-muted"
                  >
                    {name}
                  </span>
                )
              )}
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
                href="https://github.com/BUAksakal/low-altitude-aerial-detection"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-default px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
              >
                <GitHubIcon /> {t.projects.linkGithub}
              </a>
            </div>
          </div>

          {/* Downloads */}
          <div className="rounded-2xl border border-default bg-[var(--bg)] p-5 shadow-card">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-faint">Downloads</p>
            <div className="flex flex-col gap-2">
              <a
                href="/projects/ariel/report.pdf"
                download
                className="flex items-center gap-2 rounded-xl border border-default px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
              >
                <PaperIcon /> Research Paper (PDF)
              </a>
              <a
                href="/projects/ariel/presentation.pptx"
                download
                className="flex items-center gap-2 rounded-xl border border-default px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--fg)]/30 hover:bg-subtle"
              >
                <SlidesIcon /> Presentation (PPTX)
              </a>
            </div>
          </div>

          {/* Stack */}
          <div className="rounded-2xl border border-default bg-[var(--bg)] p-5 shadow-card">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-faint">Stack</p>
            <ul className="flex flex-wrap gap-1.5">
              {["Python", "YOLOv8n", "PyTorch", "OpenCV", "Roboflow", "X-AnyLabeling", "ONNX", "Google Colab"].map((tech) => (
                <li
                  key={tech}
                  className="num rounded-md border border-default bg-subtle px-2 py-0.5 text-[11px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliation */}
          <div className="rounded-2xl border border-default bg-[var(--bg)] p-5 shadow-card">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-faint">Affiliation</p>
            <div className="space-y-1.5 text-sm text-muted">
              <p>Technische Hochschule Deggendorf</p>
              <p className="text-faint">× Technische Hochschule Ingolstadt</p>
              <p className="text-faint">× Fraunhofer IVI</p>
            </div>
            <p className="mt-3 text-xs text-faint">SS26 · April – July 2026</p>
          </div>
        </motion.aside>
      </div>

      {/* Sample predictions — full container width */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16"
      >
        <h2 className="text-lg font-semibold tracking-tight">Sample Predictions</h2>
        <div className="mt-4 flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-default bg-subtle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/ariel/predictions-grid.png"
              alt="THI_Bikepark and THI_Grass scene predictions"
              className="w-full"
              loading="lazy"
            />
            <p className="px-4 py-2.5 text-xs text-faint">THI_Bikepark · THI_Grass + Mixed Scenes — model predictions</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-default bg-subtle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/ariel/gt-vs-predictions.png"
              alt="Ground Truth Labels vs Model Predictions"
              className="w-full"
              loading="lazy"
            />
            <p className="px-4 py-2.5 text-xs text-faint">Ground Truth Labels vs Model Predictions — THI_Bikepark</p>
          </div>
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

function PaperIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 3h9l5 5v13H6zM14 3v6h6" />
    </svg>
  );
}

function SlidesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
