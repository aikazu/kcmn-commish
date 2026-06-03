import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders primary variant", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toHaveClass("btn-primary");
  });
  it("renders secondary variant", () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-secondary");
  });
  it("renders as link with external URL", () => {
    render(<Button href="https://wa.me/123">WhatsApp</Button>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
  it("renders as internal link", () => {
    render(<Button href="/section">Go</Button>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/section");
  });
});
