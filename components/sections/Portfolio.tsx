"use client";

import { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS, type Project } from "@/components/data/portfolio";
import { cn } from "@/lib/cn";

const SPAN_CLASS: Record<Project["span"], string> = {
  lg: "lg:col-span-2 lg:row-span-2",
  md: "lg:col-span-1 lg:row-span-2",
  sm: "lg:col-span-1",
};

export function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  return (
    <section
      id="portfolio"
      className="py-24 md:py-32 px-4 md:px-6 lg:px-12"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          eyebrow="Portfolio"
          title="Hasil kerja pilihan"
          italicWord="pilihan"
          id="portfolio-heading"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              className={cn(
                "group relative h-52 overflow-hidden border text-left lg:h-64",
                "transition-[transform,border-color] duration-[300ms] hover:scale-[1.015] hover:border-gold",
                SPAN_CLASS[p.span]
              )}
              style={{ borderColor: "var(--color-border)", background: "var(--color-surface-1)" }}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              aria-label={`Lihat detail ${p.title}`}
            >
              {/* Gradient field + grid texture */}
              <span
                className="absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-60"
                style={{
                  background: `linear-gradient(135deg, ${p.imageGradient[0]} 0%, ${p.imageGradient[1]} 100%)`,
                }}
                aria-hidden="true"
              />
              <span className="grid-texture absolute inset-0 opacity-50" aria-hidden="true" />

              {/* Top gold-line reveal */}
              <span
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />

              {/* Mock browser chrome */}
              <span
                className="absolute left-0 right-0 top-0 flex h-7 items-center gap-1.5 border-b px-3"
                style={{ background: "rgba(10,10,10,0.45)", borderColor: "var(--color-border)" }}
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-alert opacity-70" />
                <span className="h-2 w-2 rounded-full bg-caution opacity-70" />
                <span className="h-2 w-2 rounded-full bg-signal opacity-70" />
                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.15em] text-text-dim">
                  {p.year}
                </span>
              </span>

              {/* Bottom label block */}
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-[rgba(10,10,10,0.95)] to-transparent p-5 pt-10">
                <span className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                    {p.category}
                  </span>
                  <span className="tnum font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                    {p.metric}
                  </span>
                </span>
                <span className="font-display text-[20px] font-semibold leading-[1.2] text-text lg:text-[22px]">
                  {p.title}
                </span>
                <span className="mt-1 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Lihat detail <ArrowUpRight size={11} />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="absolute inset-0 bg-[rgba(10,10,10,0.9)]" aria-hidden="true" />
            <motion.div
              className="relative max-w-2xl w-full p-8 rounded border max-h-[90vh] overflow-auto"
              style={{ background: "var(--color-surface-1)", borderColor: "var(--color-border-gold)" }}
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.95 }}
              animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-gold"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                {active.category}
              </span>
              <h3 id="modal-title" className="mt-2 font-display text-[32px] font-medium leading-[1.15] text-text">
                {active.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-text-dim">
                <span>
                  Year <span className="ml-1 text-text-muted">{active.year}</span>
                </span>
                <span>
                  Impact <span className="ml-1 text-gold">{active.metric}</span>
                </span>
              </div>
              <p className="mt-4 text-[15px] leading-[1.55] text-text-muted">{active.description}</p>
              <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">
                  Tech Stack
                </span>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {active.tech.map((t) => (
                    <li key={t} className="badge">{t}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
