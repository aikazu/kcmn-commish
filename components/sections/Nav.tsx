"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
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
  const reduce = useReducedMotion();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ background: "rgba(10, 10, 10, 0.8)", borderBottom: "1px solid var(--color-border)" }}
      aria-label="Main navigation"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl text-text hover:text-gold transition-colors"
          aria-label="Iqbal Attila home"
        >
          IA<span className="text-gold">.</span>
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
    </nav>
  );
}
