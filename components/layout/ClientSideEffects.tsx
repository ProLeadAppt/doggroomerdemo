"use client";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/motion/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);
const CookieConsent = dynamic(
  () => import("@/components/ui/CookieConsent").then((m) => m.CookieConsent),
  { ssr: false }
);

export default function ClientSideEffects() {
  return (
    <>
      <CustomCursor />
      <CookieConsent />
    </>
  );
}
