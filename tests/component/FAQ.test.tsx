import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQ } from "@/components/sections/FAQ";

describe("FAQ", () => {
  it("renders heading", () => {
    render(<FAQ />);
    expect(screen.getByRole("heading", { name: /pertanyaan umum/i })).toBeInTheDocument();
  });
  it("first FAQ is open by default", () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    const firstFaqButton = buttons.find((b) => b.getAttribute("aria-controls")?.startsWith("faq-panel-"));
    expect(firstFaqButton).toHaveAttribute("aria-expanded", "true");
  });
  it("clicking question toggles open state", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    const faqButtons = buttons.filter((b) => b.getAttribute("aria-controls")?.startsWith("faq-panel-"));
    const secondButton = faqButtons[1];
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
    await user.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "true");
  });
});
