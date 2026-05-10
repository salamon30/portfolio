"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Honours the user's `prefers-reduced-motion` OS setting automatically.
 * When enabled, Framer Motion strips transforms from all animations,
 * leaving static content without movement.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
