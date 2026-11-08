"use client";

import { useEffect, useRef } from "react";

/*
  Particle flow field behind the hero.
  Thousands of particles drift along a slowly changing flow and leave
  fading trails in the accent colours, like light streams.
  The pointer is a vortex: nearby streams speed up, brighten and swirl
  around it. A click sends a shockwave that scatters them.
  Canvas 2D, pauses off-screen, a single static frame with reduced motion.
*/

type P = { x: number; y: number; vx: number; vy: number; life: number; c: number };

function hexToRgb(hex: string, fb: [number, number, number]): [number, number, number] {
  const m = hex.trim().match(/^#?([0-9a-f]{6})$/i);
  if (!m) return fb;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function FlowField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const host = cv?.parentElement;
    if (!cv || !host) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0, t = 0, raf = 0, running = false;
    let ps: P[] = [];
    const pointer = { x: -9999, y: -9999, active: false, sx: -9999, sy: -9999 };

    // palette: three accents, a small LUT of blended colours across them
    let lut: string[] = [];
    let dark = false;
    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      const c1 = hexToRgb(cs.getPropertyValue("--accent"), [55, 138, 221]);
      const c2 = hexToRgb(cs.getPropertyValue("--accent-2"), [139, 92, 246]);
      const c3 = hexToRgb(cs.getPropertyValue("--accent-3"), [236, 72, 153]);
      dark = document.documentElement.classList.contains("dark");
      lut = [];
      for (let k = 0; k <= 32; k++) {
        const u = k / 32;
        const [a, b, f] = u < 0.5 ? [c1, c2, u * 2] : [c2, c3, (u - 0.5) * 2];
        lut.push(
          `${Math.round(a[0] + (b[0] - a[0]) * f)},${Math.round(a[1] + (b[1] - a[1]) * f)},${Math.round(a[2] + (b[2] - a[2]) * f)}`
        );
      }
    };
    readTheme();
    const themeObs = new MutationObserver(() => {
      readTheme();
      ctx.clearRect(0, 0, W, H);
      if (reduce) staticFrame();
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const spawn = (p: P, anywhere: boolean) => {
      p.x = Math.random() * W;
      p.y = anywhere ? Math.random() * H : Math.random() * H;
      p.vx = 0; p.vy = 0;
      p.life = 120 + Math.random() * 260;
      // colour follows horizontal position (blue left, violet middle, pink right) with jitter
      p.c = Math.min(1, Math.max(0, p.x / W + (Math.random() - 0.5) * 0.35));
    };

    function build() {
      const r = host!.getBoundingClientRect();
      W = r.width; H = r.height;
      cv!.width = Math.round(W * dpr);
      cv!.height = Math.round(H * dpr);
      cv!.style.width = W + "px";
      cv!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(1600, Math.max(400, (W * H) / 900)));
      ps = Array.from({ length: n }, () => {
        const p = { x: 0, y: 0, vx: 0, vy: 0, life: 0, c: 0 };
        spawn(p, true);
        p.life *= Math.random(); // stagger respawns
        return p;
      });
    }

    // smooth pseudo-noise flow angle, slowly evolving over time
    const angle = (x: number, y: number) =>
      (Math.sin(x * 0.0023 + t * 0.21) +
        Math.cos(y * 0.0029 - t * 0.17) +
        Math.sin((x + y) * 0.0013 + t * 0.11) * 0.8) *
      1.7;

    function step(draw: boolean) {
      t += 0.016;
      // pointer position eased, so the vortex glides instead of jumping
      pointer.sx += (pointer.x - pointer.sx) * 0.18;
      pointer.sy += (pointer.y - pointer.sy) * 0.18;
      const R = Math.max(160, Math.min(W, H) * 0.3), R2 = R * R;

      if (draw) {
        // fade old trails toward transparent, keeping the page background visible
        ctx!.globalCompositeOperation = "destination-out";
        ctx!.fillStyle = "rgba(0,0,0,0.055)";
        ctx!.fillRect(0, 0, W, H);
        ctx!.globalCompositeOperation = dark ? "lighter" : "source-over";
        ctx!.lineCap = "round";
      }

      for (const p of ps) {
        const a = angle(p.x, p.y);
        let tx = Math.cos(a) * 0.9, ty = Math.sin(a) * 0.9;
        let heat = 0;

        if (pointer.active) {
          const dx = p.x - pointer.sx, dy = p.y - pointer.sy, d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1, f = 1 - d / R, ff = f * f;
            // swirl around the cursor plus a gentle pull inward, with a calm eye in the middle
            const eye = Math.min(1, d / 26);
            tx += (-dy / d) * ff * 6 * eye - (dx / d) * ff * 1.4;
            ty += (dx / d) * ff * 6 * eye - (dy / d) * ff * 1.4;
            heat = ff;
          }
        }

        p.vx += (tx - p.vx) * 0.08;
        p.vy += (ty - p.vy) * 0.08;
        const ox = p.x, oy = p.y;
        p.x += p.vx; p.y += p.vy;
        p.life--;

        if (draw) {
          const sp = Math.min(1, Math.hypot(p.vx, p.vy) / 5);
          const alpha = (dark ? 0.22 : 0.28) + sp * 0.45 + heat * 0.3;
          ctx!.strokeStyle = `rgba(${lut[Math.round(p.c * 32)]},${Math.min(0.95, alpha).toFixed(3)})`;
          ctx!.lineWidth = 0.9 + heat * 1.4;
          ctx!.beginPath();
          ctx!.moveTo(ox, oy);
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();
        }

        if (p.life <= 0 || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) spawn(p, false);
      }
      if (draw) ctx!.globalCompositeOperation = "source-over";
    }

    function staticFrame() {
      ctx!.clearRect(0, 0, W, H);
      for (let k = 0; k < 90; k++) step(true);
    }

    function frame() { step(true); raf = requestAnimationFrame(frame); }
    function start() { if (running || reduce) return; running = true; frame(); }
    function stop() { running = false; cancelAnimationFrame(raf); raf = 0; }

    function move(e: PointerEvent) {
      const r = host!.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (y < -40 || y > H + 40) { pointer.active = false; return; }
      if (!pointer.active) { pointer.sx = x; pointer.sy = y; }
      pointer.x = x; pointer.y = y; pointer.active = true;
    }
    function down(e: PointerEvent) {
      move(e);
      if (!pointer.active) return;
      const kr = Math.max(220, Math.min(W, H) * 0.45);
      for (const p of ps) {
        const dx = p.x - pointer.x, dy = p.y - pointer.y, d = Math.hypot(dx, dy) || 1;
        if (d < kr) {
          const f = (1 - d / kr) * 14;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
    }
    const leave = () => { pointer.active = false; };
    let rt: ReturnType<typeof setTimeout>;
    const resize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => { build(); if (reduce) staticFrame(); }, 150);
    };
    const vis = () => (document.hidden ? stop() : start());

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", vis);
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => (en.isIntersecting ? start() : stop())),
      { threshold: 0.01 }
    );
    io.observe(host);

    build();
    if (reduce) staticFrame(); else start();

    return () => {
      stop();
      io.disconnect();
      themeObs.disconnect();
      clearTimeout(rt);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 block" />;
}
