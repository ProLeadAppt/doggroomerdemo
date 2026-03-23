"use client";

import { useEffect, useState } from "react";
import { SmoothScroll } from "../motion/SmoothScroll";
import { GrainOverlay } from "../ui/GrainOverlay";
import { Preloader } from "../motion/Preloader";
import { CustomCursor } from "../motion/CustomCursor";

export function ClientSideEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Preloader />;

  return (
    <>
      <SmoothScroll />
      <GrainOverlay />
      <Preloader />
      <CustomCursor />
    </>
  );
}
