import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  italicWord,
  subtitle,
  className,
  id,
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!italicWord) return title;
    const idx = title.toLowerCase().indexOf(italicWord.toLowerCase());
    if (idx === -1) return title;
    const before = title.slice(0, idx);
    const after = title.slice(idx + italicWord.length);
    return (
      <>
        {before}
        <em
          className="not-italic font-light text-gold"
          style={{ color: "var(--color-gold)" }}
        >
          {italicWord}
        </em>
        {after}
      </>
    );
  };

  return (
    <header className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px w-8 bg-gold" />
        <span className="font-mono uppercase tracking-[0.15em] text-[11px] text-text-muted">
          {eyebrow}
        </span>
      </div>
      <h2
        id={id}
        className="text-[32px] md:text-[56px] font-display leading-[1.15] md:leading-[1.05] tracking-[-0.015em] md:tracking-[-0.02em] font-normal text-text"
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[18px] text-text-muted max-w-2xl">{subtitle}</p>
      )}
    </header>
  );
}
