"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const CustomCursor = dynamic(
  () => import("@/components/motion/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);
const CookieConsent = dynamic(
  () => import("@/components/ui/CookieConsent").then((m) => m.CookieConsent),
  { ssr: false }
);
const StickyMobileCTA = dynamic(() => import("@/components/conversion/StickyMobileCTA"), { ssr: false });
const ExitIntent = dynamic(() => import("@/components/conversion/ExitIntent"), { ssr: false });

export default function ClientSideEffects() {
  const [isDesktopNonTouch, setIsDesktopNonTouch] = useState(false);

  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    const isWideEnough = window.innerWidth >= 1024;
    setIsDesktopNonTouch(!hasTouch && isWideEnough);
  }, []);

  return (
    <>
      {isDesktopNonTouch && <CustomCursor />}
      <CookieConsent />
      <StickyMobileCTA />
      <ExitIntent />
    </>
  );
}
