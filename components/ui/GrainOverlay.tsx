export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ opacity: 0.035 }}
    >
      <svg className="w-full h-full">
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
}
