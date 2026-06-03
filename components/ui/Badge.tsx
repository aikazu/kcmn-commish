import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "gold" | "signal" | "alert";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  default: "",
  gold: "badge-gold",
  signal: "badge-signal",
  alert: "badge-alert",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span className={cn("badge", variantClass[variant], className)} {...rest}>
      {children}
    </span>
  );
}
