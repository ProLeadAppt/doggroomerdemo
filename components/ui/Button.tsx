"use client";

import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  asChild?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses =
  "relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-[color,background-color,border-color,box-shadow,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pw-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-pw-cream disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-pw-terracotta text-white hover:bg-pw-terracotta-500 hover:shadow-glow-terracotta active:scale-[0.97]",
  secondary:
    "border border-pw-border text-pw-teal bg-transparent hover:bg-pw-teal/5 hover:border-pw-teal/40",
  ghost:
    "text-pw-muted hover:text-pw-charcoal hover:bg-pw-charcoal/5 border border-transparent",
  accent:
    "bg-pw-amber text-white hover:bg-pw-amber-500 hover:shadow-glow-amber active:scale-[0.97]",
};

export function Button({
  children,
  variant = "primary",
  fullWidth,
  asChild,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variants[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  if (asChild) {
    return <div className={classes} role="presentation">{children}</div>;
  }

  const Comp = motion.button;

  return (
    <Comp
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={classes}
      {...(props as ComponentProps<typeof Comp>)}
    >
      {children}
    </Comp>
  );
}
