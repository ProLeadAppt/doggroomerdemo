import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#1b6b6d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://doggroomer.netlify.app"),
  title: {
    default: "Pawsome & Co. | Premium Dog Grooming in Balmain",
    template: "%s | Pawsome & Co.",
  },
  description:
    "Where every dog leaves happy. Premium grooming, gentle care, and tail-wagging results at Balmain's favourite dog grooming studio. Book online today.",
  keywords: [
    "dog grooming",
    "dog groomer balmain",
    "pet grooming sydney",
    "cavoodle groomer",
    "puppy grooming",
    "dog wash balmain",
    "premium dog grooming",
  ],
  authors: [{ name: "Pawsome & Co." }],
  creator: "Munyal",
  openGraph: {
    title: "Pawsome & Co. | Premium Dog Grooming in Balmain",
    description:
      "Where every dog leaves happy. Premium grooming, gentle care, and tail-wagging results in Balmain.",
    url: "https://doggroomer.netlify.app",
    siteName: "Pawsome & Co.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Happy groomed dog at Pawsome & Co.",
      },
    ],
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawsome & Co. | Premium Dog Grooming in Balmain",
    description:
      "Where every dog leaves happy. Premium grooming, gentle care, and tail-wagging results.",
    images: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&q=80",
    ],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-pw-teal focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <ClientSideEffects />
        {children}
      </body>
    </html>
  );
}
