"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type DemoId = "saas" | "ecom" | "port";

interface Demo {
  id: DemoId;
  label: string;
  url: string;
  accent: string;
}

const DEMOS: Demo[] = [
  { id: "saas", label: "SaaS", url: "app.acme.io", accent: "#C9A352" },
  { id: "ecom", label: "E-commerce", url: "shop.acme.id", accent: "#E0BF6B" },
  { id: "port", label: "Portfolio", url: "studio.acme.co", accent: "#8A6F2D" },
];

/** Rendered mini-UI preview per demo — not a screenshot, real layout boxes. */
function Preview({ id, accent }: { id: DemoId; accent: string }) {
  const bar = (w: string, dim = false) => (
    <span
      className="block h-2 rounded-sm"
      style={{ width: w, background: dim ? "var(--color-surface-3)" : "var(--color-surface-4)" }}
    />
  );

  if (id === "saas") {
    return (
      <div className="flex h-full gap-3 p-5">
        <div className="flex w-1/4 flex-col gap-2.5">
          <span className="h-5 w-5 rounded" style={{ background: accent }} />
          {bar("80%", true)}
          {bar("60%", true)}
          {bar("70%", true)}
          {bar("50%", true)}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex gap-3">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="flex-1 rounded border p-3"
                style={{ borderColor: "var(--color-border)", background: "var(--color-surface-2)" }}
              >
                <span className="block h-4 w-10 rounded" style={{ background: accent, opacity: 0.6 }} />
                <span className="mt-2 block h-1.5 w-12 rounded-sm bg-surface-4" />
              </div>
            ))}
          </div>
          <div
            className="flex flex-1 items-end gap-2 rounded border p-3"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface-2)" }}
          >
            {[40, 65, 30, 80, 55, 90, 50].map((h, k) => (
              <span
                key={k}
                className="flex-1 rounded-t-sm"
                style={{ height: `${h}%`, background: accent, opacity: 0.5 + (h / 200) }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (id === "ecom") {
    return (
      <div className="grid h-full grid-cols-3 gap-3 p-5">
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <div
            key={k}
            className="flex flex-col gap-2 rounded border p-2"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface-2)" }}
          >
            <span
              className="block flex-1 rounded"
              style={{ background: `linear-gradient(135deg, var(--color-surface-3), ${accent}33)` }}
            />
            <span className="block h-1.5 w-full rounded-sm bg-surface-4" />
            <span className="block h-2 w-8 rounded-sm" style={{ background: accent, opacity: 0.7 }} />
          </div>
        ))}
      </div>
    );
  }

  // portfolio
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-8">
      <span className="block h-2 w-20 rounded-sm" style={{ background: accent }} />
      <span className="block h-7 w-3/4 rounded" style={{ background: "var(--color-surface-4)" }} />
      <span className="block h-7 w-1/2 rounded" style={{ background: "var(--color-surface-4)" }} />
      <span className="mt-1 block h-2 w-2/3 rounded-sm bg-surface-3" />
      <div className="mt-3 flex gap-2">
        <span className="h-6 w-24 rounded" style={{ background: accent, opacity: 0.8 }} />
        <span className="h-6 w-20 rounded border" style={{ borderColor: accent }} />
      </div>
    </div>
  );
}

export function LiveDemo() {
  const [active, setActive] = useState<DemoId>(DEMOS[0].id);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [1.5, -1.5]);
  const current = DEMOS.find((d) => d.id === active)!;

  return (
    <section
      id="live-demo"
      className="px-4 py-24 md:px-6 md:py-32 lg:px-12"
      aria-labelledby="live-demo-heading"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="Live Demo"
          title="Lihat hasilnya langsung"
          italicWord="langsung"
          subtitle="Preview UI yang dirender nyata — bukan screenshot. Klik tab untuk switch."
          id="live-demo-heading"
        />

        <div ref={ref} className="flex flex-col items-center">
          <div className="mb-6 flex gap-2" role="tablist" aria-label="Demo projects">
            {DEMOS.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={active === d.id}
                onClick={() => setActive(d.id)}
                className={cn(
                  "relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                  active === d.id ? "text-gold" : "text-text-muted hover:text-text"
                )}
              >
                {d.label}
                {active === d.id && (
                  <motion.span
                    layoutId="demo-tab"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-gold"
                  />
                )}
              </button>
            ))}
          </div>

          <motion.div
            className="w-full max-w-3xl overflow-hidden border"
            style={{
              background: "var(--color-surface-1)",
              borderColor: "var(--color-border)",
              rotate,
            }}
          >
            {/* Browser chrome with URL bar */}
            <div
              className="flex h-9 items-center gap-2 border-b px-3"
              style={{ background: "var(--color-surface-2)", borderColor: "var(--color-border)" }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-alert" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-caution" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-signal" aria-hidden="true" />
              <div
                className="ml-3 flex h-5 flex-1 items-center rounded px-2 font-mono text-[10px] text-text-dim"
                style={{ background: "var(--color-canvas)" }}
              >
                <span className="mr-1 text-signal">▲</span>
                {current.url}
              </div>
            </div>

            <div className="relative aspect-video overflow-hidden" style={{ background: "var(--color-canvas)" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Preview id={active} accent={current.accent} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">
            ⌁ Rendered with Next.js · Motion · Tailwind
          </p>
        </div>
      </div>
    </section>
  );
}
