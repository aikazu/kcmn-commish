import { describe, it, expect } from "vitest";
import { RATE_TIERS } from "@/components/data/rateCard";
import { PROJECTS } from "@/components/data/portfolio";
import { TESTIMONIALS } from "@/components/data/testimonials";
import { WHATSAPP_NUMBER } from "@/components/data/contact";

describe("data shape", () => {
  it("rate tiers have required fields", () => {
    for (const tier of RATE_TIERS) {
      expect(tier.id).toBeTruthy();
      expect(tier.name).toBeTruthy();
      expect(tier.price).toBeTruthy();
      expect(tier.features.length).toBeGreaterThan(0);
    }
  });
  it("exactly one rate tier is popular", () => {
    const popular = RATE_TIERS.filter((t) => t.popular);
    expect(popular.length).toBe(1);
  });
  it("projects have required fields", () => {
    for (const p of PROJECTS) {
      expect(p.title).toBeTruthy();
      expect(p.tech.length).toBeGreaterThan(0);
      expect(["lg", "md", "sm"]).toContain(p.span);
    }
  });
  it("testimonials have required fields", () => {
    for (const t of TESTIMONIALS) {
      expect(t.name).toBeTruthy();
      expect(t.quote).toBeTruthy();
      expect(t.initials).toHaveLength(2);
    }
  });
  it("whatsapp number is digits only", () => {
    expect(/^\d+$/.test(WHATSAPP_NUMBER)).toBe(true);
  });
});
