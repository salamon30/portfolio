"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar under the nav that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))" }}
    />
  );
}
