"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Counts the number inside a label like "3+" or "94.9%" up from 0 when it scrolls into view. */
export default function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num.replace(",", "."));
    const decimals = (num.split(/[.,]/)[1] ?? "").length;
    const sep = num.includes(",") ? "," : ".";
    if (reduce || !inView) {
      if (reduce) setShown(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(prefix + (target * eased).toFixed(decimals).replace(".", sep) + suffix);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return <span ref={ref}>{shown}</span>;
}
