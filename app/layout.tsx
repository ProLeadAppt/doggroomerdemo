import type { Metadata } from "next";
import { Quicksand, DM_Sans, Pacifico } from "next/font/google";
import { ClientSideEffects } from "@/components/layout/ClientSideEffects";
import "./globals.css";

const displayFont = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const scriptFont = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Pawsome & Co. | Premium Dog Grooming in Balmain",
  description:
    "Where every dog leaves happy. Premium grooming, gentle care, and tail-wagging results at Balmain's favourite dog grooming studio. Book online today.",
  openGraph: {
    title: "Pawsome & Co. | Premium Dog Grooming in Balmain",
    description:
      "Where every dog leaves happy. Premium grooming, gentle care, and tail-wagging results in Balmain.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable} min-h-screen bg-pw-cream text-pw-charcoal antialiased font-body relative overflow-x-hidden`}
      >
        <ClientSideEffects />
        {children}
      </body>
    </html>
  );
}
