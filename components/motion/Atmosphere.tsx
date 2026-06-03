"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Atmosphere — fixed grain overlay + bespoke gold cursor (desktop, fine-pointer only).
 * Cursor follows pointer with a trailing ring that grows over interactive targets.
 * Respects prefers-reduced-motion and coarse pointers (touch) by disabling the cursor.
 */
export function Atmosphere() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // 1. Detect capability — enables render of the cursor nodes.
  useEffect(() => {
    if (reduce) {
      setEnabled(false);
      return;
    }
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(finePointer);
  }, [reduce]);

  // 2. Wire pointer tracking once the nodes exist.
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx}px, ${ty}px)`;
      const interactive = (e.target as Element)?.closest(
        "a, button, [role='button'], [role='tab'], input, summary"
      );
      ring.dataset.hot = interactive ? "true" : "false";
    };

    const tick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      {enabled && (
        <div aria-hidden="true">
          <div
            ref={dotRef}
            className="pointer-events-none fixed left-0 top-0 z-[200] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
            style={{ marginLeft: "-2px", marginTop: "-2px" }}
          />
          <div
            ref={ringRef}
            data-hot="false"
            className="cursor-ring pointer-events-none fixed left-0 top-0 z-[200] rounded-full"
          />
        </div>
      )}
    </>
  );
}
