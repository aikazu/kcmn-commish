"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function CTA() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 lg:px-12 relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute inset-0 gold-glow pointer-events-none" aria-hidden="true" />
      <motion.div
        className="max-w-3xl mx-auto text-center relative"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 id="cta-heading" className="text-[32px] md:text-[64px] font-display leading-[1.15] md:leading-[1.0] tracking-[-0.02em] font-normal text-text text-balance">
          Siap <em className="font-light not-italic" style={{ color: "var(--color-gold)" }}>mulai</em>?
        </h2>
        <p className="mt-6 text-[18px] leading-[1.6] text-text-muted max-w-2xl mx-auto">
          Diskusi gratis 30 menit via WhatsApp atau video call. Tidak ada commitment, tidak ada tekanan.
        </p>
        <div className="mt-10">
          <Button
            href={buildWhatsAppLink({ message: "Halo Iqbal, saya siap mulai. Boleh jadwalkan kickoff call?" })}
            size="large"
          >
            Mulai via WhatsApp <ArrowRight size={14} className="ml-2" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
