"use client";

import { motion } from "framer-motion";
import { Timeline } from "@/components/Timeline";
import { useT } from "@/lib/i18n";

export default function JourneyPage() {
  const { t } = useT();
  return (
    <div className="container-page py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 max-w-2xl"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-faint">
          {t.journey.kicker}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          {t.journey.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {t.journey.description}
        </p>
      </motion.div>

      <Timeline />
    </div>
  );
}
