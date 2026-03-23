import type { ReactNode } from "react";
import { Badge } from "./Badge";

type SectionHeadingProps = {
  badge?: string;
  badgeTone?: "sage" | "warm" | "gold" | "neutral" | "teal";
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  badge,
  badgeTone = "sage",
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {badge && <Badge tone={badgeTone}>{badge}</Badge>}
      <h2 className="font-display text-display-lg text-pw-charcoal">
        {title}
      </h2>
      {subtitle && (
        <p className="text-pw-muted text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
