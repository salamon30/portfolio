"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useT, type Locale } from "@/lib/i18n";

/**
 * "How I work": data → model → ship → measure, with the stages lighting up in turn
 * and a loop back from measuring to the next fix. Each stage names real proof from the projects.
 */

type Stage = { title: string; body: string; proof: string };
type Copy = { kicker: string; title: string; sub: string; stages: Stage[]; loop: string; loopProof: string };

const COPY: Record<Locale, Copy> = {
  en: {
    kicker: "How I work",
    title: "Every model ships with the test that shows where it fails.",
    sub: "The same four steps in every project, from drone detection to LLM assistants.",
    stages: [
      { title: "Data", body: "Collect it, label it, and check it before training on it.", proof: "3–9 m drone dataset, labelled in CVAT" },
      { title: "Model", body: "Start with the simplest model that can work, then add what the numbers ask for.", proof: "YOLOv8 · RAG + reranker · tool-calling LLM" },
      { title: "Ship", body: "Make it run outside my laptop, with tests on every push.", proof: "FastAPI · Docker · CI · 2 live demos" },
      { title: "Measure", body: "Test on data the system has never seen and report where it breaks.", proof: "held-out sets · 270-run multi-fidelity eval" },
    ],
    loop: "Failures feed the next fix",
    loopProof: "one prompt rule: 86 → 90 of 90 tests",
  },
  tr: {
    kicker: "Nasıl çalışıyorum",
    title: "Her model, nerede hata yaptığını gösteren testiyle birlikte yayına çıkar.",
    sub: "Drone tespitinden LLM asistanlarına kadar her projede aynı dört adım.",
    stages: [
      { title: "Veri", body: "Topla, etiketle ve eğitmeden önce kontrol et.", proof: "3–9 m drone veri seti, CVAT ile etiketlendi" },
      { title: "Model", body: "İşe yarayabilecek en basit modelle başla, sonra rakamların istediğini ekle.", proof: "YOLOv8 · RAG + reranker · tool-calling LLM" },
      { title: "Yayın", body: "Bilgisayarımın dışında da çalışsın, her push'ta testler koşsun.", proof: "FastAPI · Docker · CI · 2 canlı demo" },
      { title: "Ölçüm", body: "Sistemin hiç görmediği verilerle test et ve nerede bozulduğunu raporla.", proof: "görülmemiş test setleri · 270 çalıştırmalık değerlendirme" },
    ],
    loop: "Hatalar bir sonraki düzeltmeyi besler",
    loopProof: "tek bir talimat kuralı: 90 testte 86 → 90",
  },
  de: {
    kicker: "Arbeitsweise",
    title: "Jedes Modell geht mit dem Test live, der zeigt, wo es scheitert.",
    sub: "Dieselben vier Schritte in jedem Projekt, von Drohnenerkennung bis LLM-Assistent.",
    stages: [
      { title: "Daten", body: "Sammeln, annotieren und prüfen, bevor darauf trainiert wird.", proof: "Drohnen-Datensatz 3–9 m, annotiert in CVAT" },
      { title: "Modell", body: "Mit dem einfachsten Modell beginnen, das funktionieren kann, dann ergänzen, was die Zahlen verlangen.", proof: "YOLOv8 · RAG + Reranker · Tool-Calling-LLM" },
      { title: "Deploy", body: "Es muss außerhalb meines Laptops laufen, mit Tests bei jedem Push.", proof: "FastAPI · Docker · CI · 2 Live-Demos" },
      { title: "Messen", body: "Auf ungesehenen Daten testen und berichten, wo es bricht.", proof: "Held-out-Sets · Multi-Fidelity-Eval mit 270 Läufen" },
    ],
    loop: "Fehler liefern den nächsten Fix",
    loopProof: "eine Prompt-Regel: 86 → 90 von 90 Tests",
  },
};

const ICONS = [
  // data: stacked layers
  <path key="d" d="M12 3 3 7.5 12 12l9-4.5L12 3Zm-9 9 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />,
  // model: nodes
  <g key="m"><circle cx="6" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="12" r="2.2" /><path d="M8 7l8 4M8 17l8-4" /></g>,
  // ship: rocket-ish arrow out of a box
  <g key="s"><path d="M4 14v5h16v-5" /><path d="M12 15V4m0 0-4 4m4-4 4 4" /></g>,
  // measure: chart with check
  <g key="e"><path d="M4 20V10m6 10V4m6 16v-7" /><path d="m15 8 2 2 4-4" /></g>,
];

const STEP_MS = 2600;

export default function HowIWork() {
  const { locale } = useT();
  const copy = COPY[locale] ?? COPY.en;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % 4), STEP_MS);
    return () => clearInterval(id);
  }, [reduce, paused]);

  return (
    <section className="relative overflow-hidden border-t border-default bg-subtle">
      <div className="container-page py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">{copy.kicker}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{copy.title}</h2>
          <p className="mt-4 text-base text-muted">{copy.sub}</p>
        </motion.div>

        <div
          className="relative"
          onMouseLeave={() => setPaused(false)}
        >
          {/* track behind the step numbers (desktop) */}
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[27px] hidden h-px bg-[var(--border-strong)] md:block">
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }}
              animate={{ width: `${(active / 3) * 100}%` }}
              transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            {!reduce && (
              <motion.span
                className="absolute -top-[5px] h-[11px] w-[11px] rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent), 0 0 18px var(--accent)",
                }}
                animate={{ left: `calc(${(active / 3) * 100}% - 5px)` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </div>

          <ol className="grid gap-4 md:grid-cols-4 md:gap-5">
            {copy.stages.map((stage, i) => {
              const on = i === active;
              return (
                <motion.li
                  key={stage.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onMouseEnter={() => { setActive(i); setPaused(true); }}
                  onFocus={() => { setActive(i); setPaused(true); }}
                  tabIndex={0}
                  className="group relative flex flex-col items-center text-center outline-none"
                >
                  <span
                    className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500"
                    style={{
                      background: on ? "linear-gradient(135deg, var(--accent), var(--accent-2))" : "var(--bg)",
                      borderColor: on ? "transparent" : "var(--border-strong)",
                      color: on ? "#fff" : "var(--fg-muted)",
                      boxShadow: on ? "0 10px 30px -10px var(--accent)" : "none",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {ICONS[i]}
                    </svg>
                  </span>

                  <div
                    className="card mt-5 flex w-full flex-1 flex-col p-5 transition-all duration-500"
                    style={{
                      borderColor: on ? "color-mix(in srgb, var(--accent) 45%, var(--border))" : undefined,
                      transform: on ? "translateY(-4px)" : "none",
                      boxShadow: on ? "0 14px 34px -18px color-mix(in srgb, var(--accent) 60%, transparent)" : undefined,
                    }}
                  >
                    <span className="num text-[11px] uppercase tracking-[0.16em] text-faint">0{i + 1}</span>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight">{stage.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{stage.body}</p>
                    <p className="num mt-4 border-t border-default pt-3 text-xs font-medium text-[var(--accent)]">{stage.proof}</p>
                    {/* time bar for the active stage */}
                    <span aria-hidden className="absolute bottom-0 left-0 h-[2px] overflow-hidden rounded-full" style={{ width: "100%" }}>
                      {on && !reduce && !paused && (
                        <motion.span
                          key={`bar-${active}`}
                          className="block h-full"
                          style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                        />
                      )}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* the loop back: measuring feeds the next fix */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 rounded-full border border-default bg-[var(--bg)] px-5 py-2.5 text-sm"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`text-emerald-500 ${reduce ? "" : "animate-[spin_6s_linear_infinite]"}`} aria-hidden>
              <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" />
            </svg>
            <span className="font-medium">{copy.loop}</span>
            <span className="hidden text-faint sm:inline">·</span>
            <span className="num hidden text-xs text-muted sm:inline">{copy.loopProof}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
