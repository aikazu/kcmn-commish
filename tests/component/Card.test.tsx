import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Content</Card>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
  it("has card class", () => {
    const { container } = render(<Card>X</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("card");
  });
});
