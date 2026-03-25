interface SectionDividerProps {
  variant?: "wave" | "curve" | "angle" | "dots";
  color?: "sage" | "teal" | "cream";
  flip?: boolean;
  className?: string;
}

const colorMap: Record<string, string> = {
  sage: "#8a9a7b",
  teal: "#1b6b6d",
  cream: "#f5f0e8",
};

export function SectionDivider({
  variant = "wave",
  color = "sage",
  flip = false,
  className = "",
}: SectionDividerProps) {
  const fill = colorMap[color] || colorMap.sage;

  const svgContent = () => {
    switch (variant) {
      case "wave":
        return (
          <svg
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            className="block w-full h-full"
          >
            <path
              d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z"
              fill={fill}
              fillOpacity="0.08"
            />
          </svg>
        );
      case "curve":
        return (
          <svg
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            className="block w-full h-full"
          >
            <path
              d="M0,48 Q720,0 1440,48"
              fill="none"
              stroke={fill}
              strokeWidth="1.5"
              strokeOpacity="0.15"
            />
          </svg>
        );
      case "angle":
        return (
          <svg
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            className="block w-full h-full"
          >
            <polygon
              points="0,48 1440,0 1440,48"
              fill={fill}
              fillOpacity="0.05"
            />
          </svg>
        );
      case "dots":
        return (
          <svg
            viewBox="0 0 1440 24"
            preserveAspectRatio="none"
            className="block w-full h-full"
          >
            {Array.from({ length: 36 }).map((_, i) => (
              <circle
                key={i}
                cx={20 + i * 40}
                cy="12"
                r="2"
                fill={fill}
                fillOpacity={0.06 + (Math.sin(i * 0.5) * 0.04)}
              />
            ))}
          </svg>
        );
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden ${flip ? "rotate-180" : ""} ${className}`}
      style={{ height: variant === "dots" ? "24px" : "48px" }}
    >
      {svgContent()}
    </div>
  );
}
