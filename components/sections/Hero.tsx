"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const SIDEBAR_ROWS = [
  { label: "Status", value: "Available · Q3 2026" },
  { label: "Response", value: "< 24h" },
  { label: "Location", value: "Jakarta / Remote" },
  { label: "Timezone", value: "GMT+7" },
];

const headlineWords = ["Membangun", "web", "yang", "berfungsi,", "tampak", "tajam,", "dan", "tetap", "responsif."];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-16 px-4 md:px-6 lg:px-12 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 gold-glow pointer-events-none" aria-hidden="true" />

      <motion.div
        className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,163,82,0.4) 0%, transparent 70%)" }}
        animate={reduce ? undefined : { y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto w-full grid lg:grid-cols-[1fr_280px] gap-12 items-center">
        <div>
          <motion.h1
            id="hero-heading"
            className="text-[56px] sm:text-7xl lg:text-[96px] font-display leading-[0.95] tracking-[-0.03em] text-text text-balance"
            initial={reduce ? false : "hidden"}
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
          >
            {headlineWords.map((word, i) => {
              const isItalic = word === "tajam,";
              return (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {isItalic ? (
                    <em className="font-light not-italic" style={{ color: "var(--color-gold)" }}>
                      {word}
                    </em>
                  ) : (
                    word
                  )}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.p
            className="mt-8 text-[18px] leading-[1.6] text-text-muted max-w-2xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            Saya Iqbal Attila. Web developer yang fokus pada landing page dan web app dengan animasi presisi,
            performance tinggi, dan craft yang terukur.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button href="#rate-card">
              Lihat Rate Card <ArrowRight size={14} className="ml-2" />
            </Button>
            <Button
              variant="secondary"
              href={buildWhatsAppLink({ message: "Halo Iqbal, saya mau konsultasi gratis." })}
            >
              Konsultasi Gratis
            </Button>
          </motion.div>
        </div>

        <motion.aside
          className="hidden lg:block p-6 rounded border"
          style={{ background: "var(--color-surface-1)", borderColor: "var(--color-border)" }}
          initial={reduce ? false : { opacity: 0, x: 20 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Availability metadata"
        >
          <h2 className="font-mono uppercase text-[11px] tracking-[0.15em] text-gold mb-4">Spec</h2>
          <dl className="space-y-3">
            {SIDEBAR_ROWS.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 text-[13px]">
                <dt className="text-text-dim">{row.label}</dt>
                <dd className="text-text text-right">{row.value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">Scroll</span>
          <ChevronDown size={16} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
