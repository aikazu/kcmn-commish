"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const DEMOS = [
  { id: "saas", label: "SaaS", color: "from-[#1F1F1F] to-[#C9A352]", codeLabel: "saas" },
  { id: "ecom", label: "E-commerce", color: "from-[#282828] to-[#E0BF6B]", codeLabel: "ecommerce" },
  { id: "port", label: "Portfolio", color: "from-[#1F1F1F] to-[#8A6F2D]", codeLabel: "portfolio" },
];

export function LiveDemo() {
  const [active, setActive] = useState(DEMOS[0].id);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -2]);

  return (
    <section
      id="live-demo"
      className="py-24 md:py-32 px-4 md:px-6 lg:px-12"
      aria-labelledby="live-demo-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          eyebrow="Live Demo"
          title="Lihat kodenya sendiri"
          italicWord="sendiri"
          subtitle="Mock browser dengan 3 project pilihan. Klik tab untuk switch."
          id="live-demo-heading"
        />

        <div ref={ref} className="flex flex-col items-center">
          <div
            className="flex gap-2 mb-6"
            role="tablist"
            aria-label="Demo projects"
          >
            {DEMOS.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={active === d.id}
                onClick={() => setActive(d.id)}
                className={cn(
                  "btn btn-tertiary",
                  active === d.id && "text-gold"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>

          <motion.div
            className="w-full max-w-3xl rounded border overflow-hidden"
            style={{
              background: "var(--color-surface-1)",
              borderColor: "var(--color-border)",
              rotate,
            }}
          >
            <div
              className="h-8 flex items-center gap-1.5 px-3 border-b"
              style={{ background: "var(--color-surface-2)", borderColor: "var(--color-border)" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-alert" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-caution" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal" aria-hidden="true" />
            </div>

            <div className="relative aspect-video overflow-hidden">
              <AnimatePresence mode="wait">
                {DEMOS.filter((d) => d.id === active).map((d) => (
                  <motion.div
                    key={d.id}
                    initial={reduce ? false : { opacity: 0, x: 30 }}
                    animate={reduce ? undefined : { opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className={cn("absolute inset-0 bg-gradient-to-br p-8", d.color)}
                  >
                    <div className="font-mono text-xs text-text-dim mb-2">{`// demo/${d.codeLabel}.tsx`}</div>
                    <pre className="font-mono text-sm text-text-muted leading-relaxed whitespace-pre-wrap">
{`export default function ${d.codeLabel.charAt(0).toUpperCase() + d.codeLabel.slice(1)}() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <Features />
    </div>
  );
}`}
                    </pre>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
