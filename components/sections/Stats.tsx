"use client";

import { motion, useReducedMotion } from "motion/react";
import { CountUp } from "@/components/motion/CountUp";

interface Stat {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { to: 40, suffix: "+", label: "Projects shipped" },
  { to: 99, suffix: "%", label: "Lighthouse perf" },
  { to: 24, prefix: "< ", suffix: "h", label: "Response time" },
  { to: 4.9, decimals: 1, suffix: "/5", label: "Client rating" },
];

export function Stats() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Track record"
      className="section-line relative overflow-hidden px-4 py-20 md:px-6 md:py-28 lg:px-12"
      style={{ background: "var(--color-surface-1)" }}
    >
      <div className="gold-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="border-l pl-4"
              style={{ borderColor: "var(--color-gold)" }}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="tnum flex items-baseline font-display text-[44px] font-medium leading-none tracking-[-0.025em] text-text md:text-[64px]">
                {s.prefix && <span className="text-text-muted">{s.prefix}</span>}
                <CountUp to={s.to} decimals={s.decimals ?? 0} />
                {s.suffix && (
                  <span className="text-gold">{s.suffix}</span>
                )}
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
