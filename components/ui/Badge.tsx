import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "sage" | "warm" | "gold" | "neutral" | "teal";
  className?: string;
};

export function Badge({
  children,
  tone = "sage",
  className = "",
}: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase";

  const styles = {
    sage: "bg-pw-sage/10 text-pw-sage-700 border border-pw-sage/30",
    warm: "bg-pw-terracotta/10 text-pw-terracotta border border-pw-terracotta/30",
    gold: "bg-pw-amber/10 text-pw-amber-700 border border-pw-amber/30",
    neutral: "bg-pw-elevated text-pw-muted border border-pw-border",
    teal: "bg-pw-teal/10 text-pw-teal border border-pw-teal/30",
  }[tone];

  return <span className={`${base} ${styles} ${className}`}>{children}</span>;
}
