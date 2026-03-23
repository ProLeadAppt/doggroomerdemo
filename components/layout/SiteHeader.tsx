"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { PawPrint } from "lucide-react";
import { Button } from "../ui/Button";
import { MagneticButton } from "../motion/MagneticButton";
import { navLinks } from "../../data/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-pw-border/50 shadow-pw"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-pw-container items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-pw-sage/30 bg-pw-teal p-1 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
              <PawPrint className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-wide text-pw-charcoal transition-colors group-hover:text-pw-teal">
                Pawsome & Co.
              </span>
              <span className="font-script text-[11px] text-pw-terracotta -mt-0.5">
                Where every dog leaves happy.
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-xs font-medium tracking-[0.12em] uppercase text-pw-muted transition-colors hover:text-pw-charcoal after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-pw-terracotta after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
            <MagneticButton>
              <Button asChild>
                <Link href="/booking">Book a Groom</Link>
              </Button>
            </MagneticButton>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-[5px] lg:hidden p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-[2px] w-6 bg-pw-charcoal transition-colors"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-[2px] w-6 bg-pw-charcoal transition-colors"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-[2px] w-6 bg-pw-charcoal transition-colors"
            />
          </button>
        </div>
        {/* Scroll progress indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pw-sage via-pw-teal to-pw-terracotta origin-left"
          style={{ scaleX, opacity: scrolled ? 1 : 0 }}
        />
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-pw-cream/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-2xl font-semibold tracking-wide text-pw-charcoal hover:text-pw-teal transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
              >
                <Button asChild>
                  <Link href="/booking" onClick={() => setMobileOpen(false)}>
                    Book a Groom
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
