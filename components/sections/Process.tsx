"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Step {
  no: string;
  phase: string;
  title: string;
  body: string;
  duration: string;
}

const STEPS: Step[] = [
  {
    no: "01",
    phase: "Discovery",
    title: "Scope & goals",
    body: "Discovery call 30 menit. Definisikan tujuan, audiens, dan kriteria sukses. Output: brief + estimasi.",
    duration: "1–2 hari",
  },
  {
    no: "02",
    phase: "Design",
    title: "Wireframe → UI",
    body: "Dari wireframe ke high-fidelity di Figma. Iterasi sampai arah visual fix sebelum satu baris kode ditulis.",
    duration: "3–5 hari",
  },
  {
    no: "03",
    phase: "Build",
    title: "Ship the code",
    body: "Implementasi presisi: animasi, performance budget, aksesibilitas, dan test. Preview deploy tiap milestone.",
    duration: "1–4 minggu",
  },
  {
    no: "04",
    phase: "Launch",
    title: "Deploy & handover",
    body: "Go-live, audit Lighthouse, dokumentasi handover, dan window maintenance gratis sesuai paket.",
    duration: "1–2 hari",
  },
];

export function Process() {
  const reduce = useReducedMotion();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="px-4 py-24 md:px-6 md:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="Process"
          title="Cara saya bekerja"
          italicWord="bekerja"
          subtitle="Empat fase, transparan, dengan output jelas di tiap langkah."
          id="process-heading"
        />

        <ol className="relative grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.no}
              className="group relative flex flex-col border border-border p-6 md:p-7"
              style={{ background: "var(--color-surface-1)" }}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Top gold-line on active/hover */}
              <span
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />

              <div className="flex items-center justify-between">
                <span className="tnum font-display text-[40px] font-medium leading-none text-text-dim transition-colors duration-300 group-hover:text-gold">
                  {s.no}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                  {s.phase}
                </span>
              </div>

              <h3 className="mt-6 font-sans text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-text">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-[1.55] text-text-muted">
                {s.body}
              </p>

              <div
                className="mt-6 border-t pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-text-dim"
                style={{ borderColor: "var(--color-border)" }}
              >
                ⌁ {s.duration}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
