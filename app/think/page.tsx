"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function ThinkPage() {
  const { t } = useT();

  return (
    <div className="container-page py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 max-w-2xl"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-faint">
          {t.think.kicker}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          {t.think.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {t.think.description}
        </p>
      </motion.div>

      {/* Toolbox */}
      <section className="mb-20">
        <h2 className="mb-6 text-xs uppercase tracking-[0.18em] text-faint">
          {t.think.skillsTitle}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {t.think.groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card p-6"
            >
              <h3 className="text-base font-semibold tracking-tight">
                {g.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item} className="chip num">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Framework */}
      <section>
        <h2 className="mb-6 text-xs uppercase tracking-[0.18em] text-faint">
          {t.think.approachTitle}
        </h2>
        <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {t.think.approach.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card flex flex-col p-6"
            >
              <h3 className="num text-sm font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </section>
    </div>
  );
}
