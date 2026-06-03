import { describe, it, expect } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("merges classes", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });
  it("resolves conflicts (later wins)", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });
  it("handles falsy values", () => {
    expect(cn("px-4", false && "py-2", null, undefined)).toBe("px-4");
  });
  it("accepts array input", () => {
    expect(cn(["px-4", "py-2"])).toBe("px-4 py-2");
  });
});
