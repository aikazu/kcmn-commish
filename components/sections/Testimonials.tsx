"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/components/data/testimonials";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  useEffect(() => {
    if (!embla) return;
    const id = setInterval(() => embla.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [embla]);

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 px-4 md:px-6 lg:px-12"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          eyebrow="Testimonials"
          title="Apa kata mereka"
          italicWord="mereka"
          id="testimonials-heading"
        />

        <div
          className="overflow-hidden"
          ref={emblaRef}
          aria-live="polite"
        >
          <div className="flex gap-6">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.id}
                className="card p-6 md:p-8 flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                aria-roledescription="slide"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs"
                    style={{ background: "var(--color-surface-3)", color: "var(--color-gold)", border: "1px solid var(--color-border-gold)" }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-sans text-[13px] text-text">{t.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">{t.project}</p>
                  </div>
                </div>
                <blockquote className="text-[15px] leading-[1.55] text-text-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </article>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial slides">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={selected === i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className={cn(
                "h-1 transition-all duration-150",
                selected === i ? "w-8 bg-gold" : "w-4 bg-border"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
