"use client";

export function GrainOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <div className="noise-overlay-fixed w-[200%] h-[200%] -left-1/2 -top-1/2" />
    </div>
  );
}
