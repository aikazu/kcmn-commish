import { describe, it, expect } from "vitest";
import { buildWhatsAppLink, defaultMessage, PHONE_NUMBER } from "@/lib/whatsapp";

describe("buildWhatsAppLink", () => {
  it("builds link without tier", () => {
    const link = buildWhatsAppLink();
    expect(link).toBe(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Halo Iqbal, saya tertarik dengan jasa web development kamu.")}`);
  });

  it("builds link with tier", () => {
    const link = buildWhatsAppLink({ tier: "Pro" });
    expect(link).toContain(encodeURIComponent("paket Pro"));
  });

  it("builds link with custom message", () => {
    const link = buildWhatsAppLink({ message: "Custom msg" });
    expect(link).toContain(encodeURIComponent("Custom msg"));
  });

  it("encodes special characters", () => {
    const link = buildWhatsAppLink({ message: "Hello & world" });
    expect(link).toContain(encodeURIComponent("Hello & world"));
  });
});

describe("defaultMessage", () => {
  it("returns general message when no tier", () => {
    expect(defaultMessage()).toContain("web development");
  });
  it("includes tier name when provided", () => {
    expect(defaultMessage("Basic")).toContain("Basic");
  });
});
