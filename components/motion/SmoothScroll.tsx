"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  // Honor prefers-reduced-motion (brand §7): skip smooth scroll entirely so
  // hash navigation and clicks land instantly — better a11y, no scroll race.
  if (reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
