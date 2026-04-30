"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-700"
      style={{
        background: scrolled ? "rgba(13, 8, 2, 0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,162,39,0.1)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — Gothic arch monogram */}
        <a href="#" className="group flex items-center gap-2.5" aria-label="Home">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="absolute inset-0 w-full h-full" fill="none">
              <path
                d="M5 36 L5 18 Q5 4 18 4 Q31 4 31 18 L31 36"
                stroke="rgba(201,162,39,0.25)"
                strokeWidth="1"
                fill="none"
                className="transition-all duration-500 group-hover:stroke-[rgba(201,162,39,0.55)]"
              />
              <circle
                cx="18"
                cy="14"
                r="4"
                stroke="rgba(201,162,39,0.15)"
                strokeWidth="1"
                fill="rgba(201,162,39,0.03)"
                className="transition-all duration-500 group-hover:stroke-[rgba(201,162,39,0.4)]"
              />
            </svg>
            <span
              className="relative text-sm font-bold transition-colors duration-300"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontStyle: "italic",
                color: "var(--text-secondary)",
              }}
            >
              mn
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide transition-colors duration-300"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-lora), Georgia, serif",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:mnanjeeba@gmail.com"
            className="text-sm px-5 py-2 transition-all duration-300"
            style={{
              color: "var(--accent)",
              border: "1px solid rgba(201,162,39,0.25)",
              fontFamily: "var(--font-playfair), Georgia, serif",
              letterSpacing: "0.06em",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(201,162,39,0.07)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.25)";
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 transition-colors duration-200"
          style={{ color: "var(--text-secondary)" }}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <div className="w-5 flex flex-col gap-[5px]">
            <span
              className="block h-px w-full bg-current origin-center transition-transform duration-300"
              style={{ transform: mobileOpen ? "translateY(6px) rotate(45deg)" : undefined }}
            />
            <span
              className="block h-px w-full bg-current transition-opacity duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block h-px w-full bg-current origin-center transition-transform duration-300"
              style={{ transform: mobileOpen ? "translateY(-6px) rotate(-45deg)" : undefined }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(13,8,2,0.98)",
              borderBottom: "1px solid rgba(201,162,39,0.1)",
            }}
          >
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base transition-colors duration-200"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-lora), Georgia, serif",
                    fontSize: "1.1rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:mnanjeeba@gmail.com"
                className="text-sm px-5 py-2.5 text-center transition-all duration-200"
                style={{
                  color: "var(--accent)",
                  border: "1px solid rgba(201,162,39,0.25)",
                  borderRadius: "2px",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  letterSpacing: "0.06em",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
