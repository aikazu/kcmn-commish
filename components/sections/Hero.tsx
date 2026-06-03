"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Sigil } from "@/components/ui/Sigil";
import { Magnetic } from "@/components/motion/Magnetic";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const SIDEBAR_ROWS = [
  { label: "STATUS", value: "Available · Q3 2026" },
  { label: "RESPONSE", value: "< 24h" },
  { label: "LOCATION", value: "Jakarta / Remote" },
  { label: "TIMEZONE", value: "GMT+7" },
  { label: "STACK", value: "Next · TS · Motion" },
];

const headlineWords = [
  "Membangun",
  "web",
  "yang",
  "berfungsi,",
  "tampak",
  "tajam,",
  "dan",
  "tetap",
  "responsif.",
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 md:px-6 lg:px-12"
      aria-labelledby="hero-heading"
    >
      {/* Ambient glow */}
      <div className="gold-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Drifting orb */}
      <motion.div
        className="pointer-events-none absolute -right-20 top-10 h-[28rem] w-[28rem] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(201,163,82,0.35) 0%, transparent 70%)",
        }}
        animate={reduce ? undefined : { y: [0, -28, 0], x: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:grid-cols-[1fr_320px]">
        <div>
          {/* Classification eyebrow */}
          <motion.div
            className="mb-8 flex items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Web Dev Commission
            </span>
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="text-balance font-display text-[52px] leading-[0.95] tracking-[-0.03em] text-text sm:text-7xl lg:text-[92px]"
            initial={reduce ? false : "hidden"}
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.07, delayChildren: 0.2 },
              },
            }}
          >
            {headlineWords.map((word, i) => {
              const isItalic = word === "tajam,";
              return (
                <motion.span
                  key={i}
                  className="mr-3 inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 32, rotateX: reduce ? 0 : -40 },
                    show: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  style={{ transformPerspective: 600 }}
                >
                  {isItalic ? (
                    <em
                      className="font-light not-italic"
                      style={{ color: "var(--color-gold)" }}
                    >
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
            className="mt-8 max-w-2xl text-[18px] leading-[1.6] text-text-muted"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            Saya Iqbal Attila. Web developer yang fokus pada landing page dan web
            app dengan animasi presisi, performance tinggi, dan craft yang
            terukur.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic>
              <Button href="#rate-card">
                Lihat Rate Card <ArrowRight size={14} className="ml-2" />
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button
                variant="secondary"
                href={buildWhatsAppLink({
                  message: "Halo Iqbal, saya mau konsultasi gratis.",
                })}
              >
                Konsultasi Gratis
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Spec-sheet sidebar */}
        <motion.aside
          className="corner-ticks relative hidden border p-6 lg:block"
          style={{
            background: "rgba(18,18,18,0.6)",
            backdropFilter: "blur(8px)",
            borderColor: "var(--color-border)",
          }}
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Availability metadata"
        >
          {/* Top gold-line signature */}
          <span
            className="absolute inset-x-0 top-0 h-[2px] bg-gold"
            aria-hidden="true"
          />

          <div className="mb-5 flex items-center justify-between">
            <Sigil size={44} />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
              IA · v1.0
            </span>
          </div>

          <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            // commission-spec
          </h2>

          <dl>
            {SIDEBAR_ROWS.map((row) => (
              <div key={row.label} className="spec-row">
                <dt className="text-text-dim">{row.label}</dt>
                <dd className="tnum text-right text-text">{row.value}</dd>
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
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">
            Scroll
          </span>
          <ChevronDown size={16} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
