import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "default" | "large";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary",
};

const sizeClass: Record<Size, string> = {
  default: "",
  large: "px-7 py-3.5 text-[13px]",
};

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: never;
}

interface ButtonAsLinkProps
  extends ButtonBaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> {
  href: string;
}

export function Button(props: ButtonAsButtonProps | ButtonAsLinkProps) {
  const { variant = "primary", size = "default", className, children } = props;
  const classes = cn("btn", variantClass[variant], sizeClass[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = props;
    const isExternal =
      href.startsWith("http") || href.startsWith("wa.me") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButtonProps;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
