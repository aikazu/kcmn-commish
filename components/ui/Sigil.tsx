interface SigilProps {
  size?: number;
  className?: string;
  /** Thicken strokes for small render sizes (app icon / favicon). */
  weight?: "regular" | "bold";
}

/**
 * IA Sigil — geometric monogram in a containment frame with corner cut-marks.
 * Spec: brand-system.md §2.1 (viewBox 200×200). Gold on dark by default.
 */
export function Sigil({ size = 40, className, weight = "regular" }: SigilProps) {
  const frame = weight === "bold" ? 4 : 1.5;
  const tick = weight === "bold" ? 2 : 1;
  const letter = weight === "bold" ? 5 : 3;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Outer containment frame */}
      <rect x="30" y="30" width="140" height="140" stroke="var(--color-gold)" strokeWidth={frame} />
      {/* Corner cut-marks — 10px ticks */}
      <g stroke="var(--color-gold)" strokeWidth={tick}>
        <path d="M30 40 V30 H40" />
        <path d="M160 30 H170 V40" />
        <path d="M170 160 V170 H160" />
        <path d="M40 170 H30 V160" />
      </g>
      {/* Letter I — stem + serif bars */}
      <rect x="63" y="68" width="6" height="64" fill="var(--color-gold)" />
      <rect x="54" y="68" width="24" height={frame} fill="var(--color-gold)" />
      <rect x="54" y={132 - frame} width="24" height={frame} fill="var(--color-gold)" />
      {/* Letter A */}
      <path
        d="M 100 132 L 117 68 L 134 132"
        stroke="var(--color-gold)"
        strokeWidth={letter}
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      <line x1="107" y1="108" x2="127" y2="108" stroke="var(--color-gold)" strokeWidth={letter} />
    </svg>
  );
}
