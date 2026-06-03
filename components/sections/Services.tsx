"use client";

import { Code2, Layout, Wrench, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";

const SERVICES = [
  {
    icon: Layout,
    title: "Landing Page",
    description: "One-page high-converting dengan animasi presisi dan performance tinggi.",
  },
  {
    icon: Code2,
    title: "Web App",
    description: "Full-stack app dengan auth, API, dashboard, dan interaksi real-time.",
  },
  {
    icon: Sparkles,
    title: "UI/UX Implementation",
    description: "Translate Figma ke kode yang presisi dengan attention ke micro-detail.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Update konten, fix bug, performance audit untuk project existing.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-4 md:px-6 lg:px-12" aria-labelledby="services-heading">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeading
          eyebrow="Services"
          title="Apa yang saya kerjakan"
          italicWord="kerjakan"
          id="services-heading"
        />
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <Card className="h-full hover:border-gold transition-colors duration-150 group">
                  <Icon size={28} className="text-gold mb-4 transition-transform group-hover:rotate-3" aria-hidden="true" />
                  <h3 className="font-sans text-[22px] font-semibold leading-[1.3] tracking-[-0.01em] text-text mb-2">{s.title}</h3>
                  <p className="text-[13px] leading-[1.5] text-text-muted">{s.description}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
