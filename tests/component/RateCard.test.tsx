import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RateCard } from "@/components/sections/RateCard";
import { RATE_TIERS } from "@/components/data/rateCard";
import { PHONE_NUMBER } from "@/lib/whatsapp";

describe("RateCard", () => {
  it("renders all tier names", () => {
    render(<RateCard />);
    for (const tier of RATE_TIERS) {
      expect(screen.getByText(tier.name)).toBeInTheDocument();
    }
  });
  it("renders WhatsApp CTA links with tier name in URL", () => {
    render(<RateCard />);
    const links = screen.getAllByRole("link");
    const basicLink = links.find((l) =>
      l.getAttribute("href")?.includes(`wa.me/${PHONE_NUMBER}`) &&
      l.getAttribute("href")?.includes(encodeURIComponent("Basic"))
    );
    expect(basicLink).toBeDefined();
  });
  it("marks popular tier with Popular badge", () => {
    render(<RateCard />);
    expect(screen.getByText("Popular")).toBeInTheDocument();
  });
  it("renders prices for all tiers", () => {
    render(<RateCard />);
    for (const tier of RATE_TIERS) {
      expect(screen.getByText(tier.price)).toBeInTheDocument();
    }
  });
});
