"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import { Button } from "@/components/ui/Button";
import { Sigil } from "@/components/ui/Sigil";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Rate Card", href: "#rate-card" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrolled(v > 0.01);
  });

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 backdrop-blur-md transition-[background,height] duration-300",
        scrolled
          ? "border-b border-border bg-[rgba(10,10,10,0.88)]"
          : "border-b border-transparent bg-[rgba(10,10,10,0.4)]"
      )}
      aria-label="Main navigation"
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1280px] items-center justify-between px-4 transition-[height] duration-300 md:px-6 lg:px-12",
          scrolled ? "h-14" : "h-16"
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-text transition-colors hover:text-gold"
          aria-label="Iqbal Attila home"
        >
          <Sigil
            size={scrolled ? 26 : 30}
            className="transition-all duration-300 group-hover:rotate-[-3deg]"
          />
          <span className="font-display text-lg leading-none">
            Iqbal Attila
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono uppercase text-[11px] tracking-[0.15em] text-text-muted hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            href={buildWhatsAppLink({ message: "Halo Iqbal, saya ingin diskusi proyek." })}
            size="default"
            className="text-[10px]"
          >
            Hubungi
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-text hover:text-gold"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={reduce ? undefined : { opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: "var(--color-canvas)", borderTop: "1px solid var(--color-border)" }}
          >
            <ul className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn("block font-mono uppercase text-[11px] tracking-[0.15em] text-text-muted hover:text-gold")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  href={buildWhatsAppLink({ message: "Halo Iqbal, saya ingin diskusi proyek." })}
                  className="w-full"
                >
                  Hubungi via WhatsApp
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress — hairline gold fill across the bottom edge */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] origin-left bg-gold"
        style={{ scaleX: progress, width: "100%" }}
        aria-hidden="true"
      />
    </nav>
  );
}
