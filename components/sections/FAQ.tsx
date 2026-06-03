"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const FAQS = [
  {
    q: "Berapa lama pengerjaan?",
    a: "Landing page 2-3 minggu. Web app 4-8 minggu tergantung kompleksitas. Custom project diestimasi setelah discovery call.",
  },
  {
    q: "Bagaimana sistem pembayaran?",
    a: "50% di muka untuk mulai, 50% setelah deploy. Untuk project besar bisa dicicil 3 tahap: kickoff, mid-project, delivery.",
  },
  {
    q: "Apakah include maintenance?",
    a: "Paket Pro dan Custom include 30 hari maintenance gratis. Paket Standard include 14 hari. Setelah itu bisa extend per bulan.",
  },
  {
    q: "Bisa pakai CMS?",
    a: "Bisa. Saya pakai Sanity, Contentlayer, atau MDX. Tergantung kebutuhan dan preferensi tim kamu.",
  },
  {
    q: "Bagaimana kalau saya tidak punya desain?",
    a: "Tidak masalah. Saya bisa mulai dari wireframe atau langsung ke high-fidelity mockup di Figma, lalu implement.",
  },
  {
    q: "Revisi berapa kali?",
    a: "Tergantung paket: Basic 2x, Standard 3x, Pro 5x. Revisi setelah deploy masuk maintenance.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="py-24 md:py-32 px-4 md:px-6 lg:px-12" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="FAQ" title="Pertanyaan umum" italicWord="umum" id="faq-heading" />

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="card p-0 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-sans text-[15px] leading-[1.55] text-text pr-4">{item.q}</span>
                  <Plus
                    size={18}
                    className={cn(
                      "flex-shrink-0 transition-transform duration-150",
                      isOpen && "rotate-45 text-gold"
                    )}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={reduce ? undefined : { height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-[15px] leading-[1.55] text-text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
