"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const sections = [
  {
    label: "Working on",
    entries: [
      "M.Eng. thesis — edge AI inference pipeline for embedded sensor nodes",
      "Low-altitude aerial detection project (YOLOv8 + Fraunhofer IVI collaboration)",
      "This portfolio",
    ],
  },
  {
    label: "Reading",
    entries: [
      "Designing Data-Intensive Applications — Martin Kleppmann",
      "Deep Learning — Goodfellow, Bengio & Courville",
    ],
  },
  {
    label: "Learning",
    entries: [
      "ROS 2 — autonomous systems coursework",
      "TensorRT — optimising neural nets for edge deployment",
    ],
  },
  {
    label: "Location",
    entries: ["Bavaria, Germany — Erlangen / Deggendorf"],
  },
];

export default function NowPage() {
  return (
    <div className="container-page py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14 max-w-2xl"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Now</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          What I&apos;m up to.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          A snapshot of what is occupying my time right now. Updated manually — last edit June 2026.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((s, si) => (
          <motion.div
            key={s.label}
            custom={si}
            variants={item}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-default bg-[var(--bg)] p-6 shadow-card"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-faint">
              {s.label}
            </p>
            <ul className="space-y-2">
              {s.entries.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {e}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
