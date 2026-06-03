import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Testimonials } from "@/components/sections/Testimonials";

describe("Testimonials", () => {
  it("renders section heading", () => {
    render(<Testimonials />);
    expect(screen.getByRole("heading", { name: /apa kata mereka/i })).toBeInTheDocument();
  });
  it("renders all testimonial slides", () => {
    render(<Testimonials />);
    const slides = screen.getAllByRole("article");
    expect(slides.length).toBe(5);
  });
  it("renders tablist for slide navigation", () => {
    render(<Testimonials />);
    expect(screen.getByRole("tablist", { name: /testimonial slides/i })).toBeInTheDocument();
  });
});
