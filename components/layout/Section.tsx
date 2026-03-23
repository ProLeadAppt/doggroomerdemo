import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  noDivider?: boolean;
  dark?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  noDivider,
  dark,
}: SectionProps) {
  const bg = dark ? "bg-pw-charcoal text-white" : "bg-pw-cream";

  return (
    <>
      <section
        id={id}
        className={`relative w-full px-6 py-20 sm:py-28 lg:py-32 ${bg} ${className}`}
      >
        <div className="mx-auto w-full max-w-pw-container">{children}</div>
      </section>
      {!noDivider && <div className="section-divider" />}
    </>
  );
}
