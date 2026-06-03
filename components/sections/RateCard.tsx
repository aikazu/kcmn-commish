"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RATE_TIERS } from "@/components/data/rateCard";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export function RateCard() {
  const reduce = useReducedMotion();

  return (
    <section
      id="rate-card"
      className="py-24 md:py-32 px-4 md:px-6 lg:px-12"
      aria-labelledby="rate-card-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          eyebrow="Rate Card"
          title="Pilih paket yang sesuai"
          italicWord="sesuai"
          subtitle="Harga transparan, tidak ada hidden cost. Klik untuk mulai via WhatsApp."
          id="rate-card-heading"
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RATE_TIERS.map((tier) => (
            <StaggerItem key={tier.id}>
              <motion.div
                className={cn(
                  "card p-6 md:p-8 h-full flex flex-col relative",
                  tier.popular && "ring-2 ring-gold"
                )}
                animate={
                  tier.popular && !reduce
                    ? { boxShadow: ["0 0 0 0 rgba(201,163,82,0)", "0 0 0 8px rgba(201,163,82,0.1)", "0 0 0 0 rgba(201,163,82,0)"] }
                    : undefined
                }
                transition={{ duration: 2.5, repeat: Infinity }}
                whileHover={reduce ? undefined : { y: -4 }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="gold">Popular</Badge>
                  </div>
                )}

                <h3 className="font-sans text-[22px] font-semibold leading-[1.3] tracking-[-0.01em] text-text">{tier.name}</h3>
                <p className="mt-2 text-[13px] leading-[1.5] text-text-muted min-h-[3em]">{tier.description}</p>

                <div className="mt-6 pb-6 border-b" style={{ borderColor: "var(--color-border)" }}>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[64px] font-normal leading-[1] tracking-[-0.025em] text-text tnum">{tier.price}</span>
                    <span className="text-[13px] text-text-dim">{tier.priceSuffix}</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[13px] leading-[1.5] text-text-muted">
                      <Check size={16} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    href={buildWhatsAppLink({ tier: tier.name })}
                    variant={tier.popular ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {tier.ctaLabel}
                  </Button>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
