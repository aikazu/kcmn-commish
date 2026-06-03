"use client";

import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";
import { SOCIAL, CONTACT_EMAIL } from "@/components/data/contact";

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Rate Card", href: "#rate-card" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--color-border)" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg width="32" height="32" viewBox="0 0 200 200" fill="none" aria-hidden="true">
                <rect x="30" y="30" width="140" height="140" stroke="var(--color-gold)" strokeWidth="1.5" />
                <rect x="63" y="68" width="6" height="64" fill="var(--color-gold)" />
                <path d="M 100 132 L 117 68 L 134 132" stroke="var(--color-gold)" strokeWidth="3" />
                <line x1="107" y1="108" x2="127" y2="108" stroke="var(--color-gold)" strokeWidth="3" />
              </svg>
              <span className="font-display text-xl text-text">Iqbal Attila</span>
            </div>
            <p className="text-[13px] leading-[1.5] text-text-muted">Secure by design. Delivered with intent.</p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-mono uppercase text-[11px] tracking-[0.15em] text-gold mb-4">Nav</h2>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[13px] leading-[1.5] text-text-muted hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono uppercase text-[11px] tracking-[0.15em] text-gold mb-4">Connect</h2>
            <ul className="space-y-3">
              {Object.entries(SOCIAL).map(([key, url]) => {
                const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];
                if (!Icon) return null;
                return (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-gold transition-colors"
                    >
                      <Icon size={16} aria-hidden="true" />
                      {key}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-gold transition-colors"
                >
                  <Mail size={16} aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: "var(--color-border)" }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
            © 2026 Iqbal Attila. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted hover:text-gold inline-flex items-center gap-2"
          >
            Back to top <ArrowUp size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
