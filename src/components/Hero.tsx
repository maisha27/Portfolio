"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { brandPillars, social } from "@/lib/data";

// ─── Dust motes ──────────────────────────────────────────────────────────────

const MOTES = [
  { left: "15%", top: "72%", s: 1,   delay: "0s",   dur: "8.5s",  drift: "7px"  },
  { left: "38%", top: "58%", s: 1.5, delay: "2.6s", dur: "11.5s", drift: "-5px" },
  { left: "61%", top: "78%", s: 1,   delay: "1.1s", dur: "9.0s",  drift: "10px" },
  { left: "27%", top: "64%", s: 1,   delay: "4.8s", dur: "12.5s", drift: "-7px" },
  { left: "75%", top: "68%", s: 1.5, delay: "1.7s", dur: "10.5s", drift: "5px"  },
  { left: "50%", top: "82%", s: 1,   delay: "3.4s", dur: "7.5s",  drift: "-4px" },
  { left: "87%", top: "55%", s: 1,   delay: "0.5s", dur: "9.5s",  drift: "6px"  },
  { left: "8%",  top: "48%", s: 1.5, delay: "5.2s", dur: "11.0s", drift: "-3px" },
] as const;

function DustMotes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="dust-mote absolute rounded-full"
          style={{
            left: m.left,
            top: m.top,
            width:  `${m.s}px`,
            height: `${m.s}px`,
            background: "rgba(245,220,170,0.70)",
            "--dust-drift": m.drift,
            animationName: "dustFloat",
            animationDuration: m.dur,
            animationTimingFunction: "ease-in-out",
            animationDelay: m.delay,
            animationIterationCount: "infinite",
            animationFillMode: "both",
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zM15.971 13c-.17-1.883 1.271-2.065 1.789-2.065 1.475 0 1.958.818 2.024 2.065h-3.813zm-12.409 7H0V6h8.05c4.435 0 5.042 2.761 5.042 4.038 0 1.524-.853 2.664-2.109 3.218 1.612.517 2.508 1.713 2.508 3.296C13.491 19.045 12.548 20 3.562 20zm-1.18-8.602h3.976c1.518 0 1.928-.766 1.928-1.548 0-.982-.493-1.489-1.928-1.489H2.382v3.037zm0 5.362h4.316c1.602 0 2.236-.768 2.236-1.791 0-.886-.535-1.813-2.236-1.813H2.382v3.604z" />
  </svg>
);

// ─── Stained glass panel data ─────────────────────────────────────────────────

const GLASS_PANELS = [
  { row: 0, col: 0, colorTop: "rgba(22,40,118,0.80)",  colorBot: "rgba(16,30,90,0.70)",  spec: "rgba(140,168,255,0.15)" },
  { row: 0, col: 1, colorTop: "rgba(100,22,48,0.76)",  colorBot: "rgba(76,16,36,0.66)",  spec: "rgba(255,140,170,0.12)" },
  { row: 1, col: 0, colorTop: "rgba(14,68,82,0.72)",   colorBot: "rgba(10,50,62,0.62)",  spec: "rgba(120,210,228,0.13)" },
  { row: 1, col: 1, colorTop: "rgba(58,30,120,0.76)",  colorBot: "rgba(44,22,92,0.66)",  spec: "rgba(168,148,255,0.14)" },
  { row: 2, col: 0, colorTop: "rgba(10,48,106,0.70)",  colorBot: "rgba(8,36,80,0.60)",   spec: "rgba(108,158,248,0.11)" },
  { row: 2, col: 1, colorTop: "rgba(82,14,38,0.67)",   colorBot: "rgba(62,10,28,0.57)",  spec: "rgba(248,120,148,0.10)" },
] as const;

type PanelDef = (typeof GLASS_PANELS)[number];

// ─── Single glass panel ───────────────────────────────────────────────────────

function GlassPanel({
  panel,
  isOpen,
  simple,
}: {
  panel: PanelDef;
  isOpen: boolean;
  simple: boolean;
}) {
  const isLeft = panel.col === 0;
  const openDelay  = panel.row * 0.08 + panel.col * 0.03;
  const closeDelay = (2 - panel.row) * 0.06 + (1 - panel.col) * 0.025;

  return (
    <motion.div
      initial={false}
      animate={
        isOpen
          ? simple
            ? { opacity: 0 }
            : { opacity: 0, rotateY: isLeft ? -88 : 88 }
          : simple
          ? { opacity: 1 }
          : { opacity: 1, rotateY: 0 }
      }
      transition={
        isOpen
          ? {
              duration: simple ? 0.35 : 0.52,
              ease: [0.65, 0, 0.35, 1] as [number, number, number, number],
              delay: openDelay,
            }
          : {
              duration: simple ? 0.30 : 0.42,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              delay: closeDelay,
            }
      }
      className="absolute"
      style={{
        top:    `${(panel.row / 3) * 100}%`,
        left:   panel.col === 0 ? "0" : "50%",
        width:  "50%",
        height: "33.334%",
        transformOrigin: isLeft ? "left center" : "right center",
        background: `linear-gradient(152deg, ${panel.colorTop} 0%, ${panel.colorBot} 100%)`,
        borderTop:    panel.row === 0 ? "1px solid rgba(200,220,255,0.16)" : "none",
        borderBottom: "1px solid rgba(200,220,255,0.14)",
        borderLeft:   "1px solid rgba(200,220,255,0.12)",
        borderRight:  "1px solid rgba(200,220,255,0.12)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${panel.spec} 0%, transparent 52%)`,
        }}
      />
      {isLeft && (
        <div
          className="absolute top-0 bottom-0 right-0 w-px"
          style={{ background: "rgba(200,220,255,0.24)" }}
        />
      )}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "rgba(200,220,255,0.18)" }}
      />
    </motion.div>
  );
}

// ─── ArchFrame ────────────────────────────────────────────────────────────────
// Four depth layers in a single CSS 3D preserve-3d scene:
//   Layer A  z: -28px  stone shadow (visual depth behind the frame)
//   Layer B  z: -12px  outer arch SVG tracery
//   Layer C  z:   0px  ambient wash + photo + glass panels
//   Layer D  z:  +8px  foreground trim SVG + corner brackets (closest to viewer)
//
// The outer div passes transformStyle: "preserve-3d" so the layers participate
// in the parent perspective context set on the Hero wrapper (1200px). When the
// whole frame tilts on hover the z-offsets produce visible parallax.

function ArchFrame({
  children,
  isOpen,
  simple,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  simple: boolean;
}) {
  return (
    <div
      className="relative"
      style={{
        width: "300px",
        height: "400px",
        // Pass 3D context upward — lets depth layers participate in Hero's
        // 1200px perspective so hover-tilt creates visible parallax between layers.
        transformStyle: "preserve-3d",
      }}
    >
      {/* ── 3D scene wrapper ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* ── LAYER A: stone shadow — far back ────────────────────────────── */}
        {/* Dark vignette creates the illusion of depth behind the arch opening. */}
        <div
          className="absolute pointer-events-none"
          aria-hidden
          style={{
            inset: "-10px",
            transform: "translateZ(-28px)",
            background:
              "radial-gradient(ellipse 110% 90% at 50% 35%, rgba(4,2,0,0) 20%, rgba(4,2,0,0.96) 100%)",
          }}
        />
        {/* Warm candle glow bleeding from the 'wall' behind */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            transform: "translateZ(-18px)",
            background:
              "radial-gradient(ellipse 68% 48% at 50% 28%, rgba(201,162,39,0.07) 0%, transparent 74%)",
          }}
        />

        {/* ── LAYER B: outer arch SVG tracery — mid-back ──────────────────── */}
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full pointer-events-none"
          fill="none"
          aria-hidden
          style={{ transform: "translateZ(-12px)" }}
        >
          <path
            d="M20 400 L20 190 C20 60 150 30 150 30 C150 30 280 60 280 190 L280 400"
            stroke="rgba(201,162,39,0.22)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M48 400 L48 200 C48 90 150 65 150 65 C150 65 252 90 252 200 L252 400"
            stroke="rgba(201,162,39,0.10)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="150" cy="95" r="32" stroke="rgba(201,162,39,0.18)" strokeWidth="1" fill="rgba(201,162,39,0.02)" />
          <circle cx="150" cy="95" r="20" stroke="rgba(201,162,39,0.12)" strokeWidth="1" fill="none" />
          <circle cx="150" cy="95" r="7" fill="rgba(201,162,39,0.06)" />
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={150 + 7 * Math.cos(angle)}
                y1={95 + 7 * Math.sin(angle)}
                x2={150 + 20 * Math.cos(angle)}
                y2={95 + 20 * Math.sin(angle)}
                stroke="rgba(201,162,39,0.08)"
                strokeWidth="1"
              />
            );
          })}
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            const cx = 150 + 26 * Math.cos(a);
            const cy = 95 + 26 * Math.sin(a);
            return <circle key={`p${i}`} cx={cx} cy={cy} r="4" stroke="rgba(201,162,39,0.08)" strokeWidth="1" fill="none" />;
          })}
          <path d="M20 370 Q20 400 48 400" stroke="rgba(201,162,39,0.10)" strokeWidth="1" fill="none" />
          <path d="M280 370 Q280 400 252 400" stroke="rgba(201,162,39,0.10)" strokeWidth="1" fill="none" />
          <line x1="20" y1="380" x2="20" y2="400" stroke="rgba(201,162,39,0.07)" strokeWidth="1" />
          <line x1="280" y1="380" x2="280" y2="400" stroke="rgba(201,162,39,0.07)" strokeWidth="1" />
        </svg>

        {/* ── LAYER C: ambient wash + photo (z: 0) ────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,162,39,0.06) 0%, rgba(155,35,53,0.03) 50%, transparent 80%)",
          }}
        />

        {/* Photo container — overflow:hidden is safe here; it creates a local
            stacking context but glass panels use their own perspective: 700px  */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: "130px",
            left: "44px",
            right: "44px",
            bottom: "0px",
            borderTop: "1px solid rgba(201,162,39,0.15)",
            borderLeft: "1px solid rgba(201,162,39,0.08)",
            borderRight: "1px solid rgba(201,162,39,0.08)",
          }}
        >
          {/* Photo — blur transitions with glass state */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transition: "filter 0.65s ease-out",
              filter: isOpen ? "blur(0px) saturate(1)" : "blur(5px) saturate(0.82)",
            }}
          >
            {children}
          </div>

          {/* Glass panels — own perspective context inside overflow container */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ perspective: "700px", perspectiveOrigin: "50% 50%" }}
          >
            {GLASS_PANELS.map((panel, i) => (
              <GlassPanel key={i} panel={panel} isOpen={isOpen} simple={simple} />
            ))}
          </div>

          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background: "linear-gradient(to top, var(--bg-base), transparent)",
              zIndex: 10,
            }}
          />
        </div>

        {/* ── LAYER D: foreground arch trim + brackets — closest to viewer ── */}
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full pointer-events-none"
          fill="none"
          aria-hidden
          style={{ transform: "translateZ(8px)" }}
        >
          {/* Stronger inner arch outline rendered in front of photo */}
          <path
            d="M44 400 L44 200 C44 85 150 62 150 62 C150 62 256 85 256 200 L256 400"
            stroke="rgba(201,162,39,0.38)"
            strokeWidth="0.75"
            fill="none"
          />
          {/* Keystone at arch apex */}
          <circle cx="150" cy="62" r="3.5" fill="rgba(201,162,39,0.30)" />
          <circle cx="150" cy="62" r="6.5" stroke="rgba(201,162,39,0.18)" strokeWidth="0.5" fill="none" />
          {/* Base moulding corners */}
          <path d="M44 388 L44 400 L20 400"  stroke="rgba(201,162,39,0.24)" strokeWidth="0.75" fill="none" />
          <path d="M256 388 L256 400 L280 400" stroke="rgba(201,162,39,0.24)" strokeWidth="0.75" fill="none" />
        </svg>

        {/* Gold corner brackets — foreground */}
        <div
          className="absolute top-0 left-0 w-5 h-5"
          style={{
            transform: "translateZ(8px)",
            borderTop:  "1px solid rgba(201,162,39,0.55)",
            borderLeft: "1px solid rgba(201,162,39,0.55)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-5 h-5"
          style={{
            transform: "translateZ(8px)",
            borderTop:   "1px solid rgba(201,162,39,0.55)",
            borderRight: "1px solid rgba(201,162,39,0.55)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-5 h-5"
          style={{
            transform: "translateZ(8px)",
            borderBottom: "1px solid rgba(201,162,39,0.55)",
            borderLeft:   "1px solid rgba(201,162,39,0.55)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-5 h-5"
          style={{
            transform: "translateZ(8px)",
            borderBottom: "1px solid rgba(201,162,39,0.55)",
            borderRight:  "1px solid rgba(201,162,39,0.55)",
          }}
        />

      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isGlassOpen, setIsGlassOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const isTouchDevice = useSyncExternalStore(
    () => () => {},
    () => window.matchMedia("(hover: none)").matches,
    () => false,
  );

  const effectivelyOpen = isTouchDevice || isGlassOpen;
  const simpleAnim = prefersReducedMotion || isTouchDevice;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const archScale   = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const archY       = useTransform(scrollYProgress, [0, 0.75], [0, -180]);
  const archOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center" aria-label="Introduction">
      {/* Atmospheric warm light pools */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-1/3 w-[700px] h-[700px] rounded-full candle-glow"
          style={{
            background: "radial-gradient(circle, rgba(201,162,39,0.055) 0%, transparent 70%)",
            animation: "candlePulse 4.8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full candle-glow"
          style={{
            background: "radial-gradient(circle, rgba(155,35,53,0.035) 0%, transparent 70%)",
            animation: "candlePulse 5.5s ease-in-out infinite 1.3s",
          }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full candle-glow"
          style={{
            background: "radial-gradient(circle, rgba(46,95,163,0.025) 0%, transparent 70%)",
            animation: "candlePulse 6.2s ease-in-out infinite 2.8s",
          }}
        />
      </div>

      <DustMotes />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(245,220,170,1) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-14 sm:pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-center">

          {/* ── Left: Content ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 mb-6 sm:mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "var(--accent)" }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--accent)" }} />
              </span>
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-geist-mono)" }}
              >
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "var(--text-primary)" }}
            >
              Maisha
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #c9a227 0%, #d4870a 55%, #c9a227 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Nanjeeba
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-base mb-6"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: "0.04em",
              }}
            >
              Full Stack Developer &amp; UI/UX Designer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="leading-relaxed max-w-xl mb-8 sm:mb-10"
              style={{
                color: "var(--text-secondary)",
                lineHeight: "1.85",
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "1.1rem",
              }}
            >
              I design and build full-stack web and mobile applications with a strong focus on user
              experience, real-world problem solving, and clean, scalable systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className="flex flex-wrap gap-2 sm:gap-2.5 mb-8 sm:mb-10"
            >
              {brandPillars.map((pillar) => (
                <span
                  key={pillar}
                  className="px-3 py-1.5 text-xs tracking-wide"
                  style={{
                    color: "var(--text-secondary)",
                    background: "rgba(201,162,39,0.04)",
                    border: "1px solid rgba(201,162,39,0.12)",
                    borderRadius: "2px",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  {pillar}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 text-sm font-semibold transition-all duration-400 hover:scale-[1.03]"
                style={{
                  background: "linear-gradient(135deg, rgba(201,162,39,0.92), rgba(172,115,8,0.88))",
                  color: "#0d0802",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  letterSpacing: "0.05em",
                  boxShadow: "0 0 28px rgba(201,162,39,0.18)",
                  borderRadius: "2px",
                }}
              >
                View Work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 text-sm font-medium transition-all duration-300"
                style={{
                  color: "var(--text-primary)",
                  border: "1px solid rgba(201,162,39,0.35)",
                  background: "rgba(201,162,39,0.04)",
                  borderRadius: "2px",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(201,162,39,0.09)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.55)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(201,162,39,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.35)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }}
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 sm:gap-5"
            >
              {[
                { href: social.github,   Icon: GitHubIcon,   label: "GitHub"   },
                { href: social.linkedin, Icon: LinkedInIcon, label: "LinkedIn" },
                { href: social.behance,  Icon: BehanceIcon,  label: "Behance"  },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-all duration-200 hover:scale-110"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  <Icon />
                </a>
              ))}
              <div className="hidden xs:block w-px h-4 mx-1" style={{ background: "rgba(201,162,39,0.15)" }} />
              <a
                href={`mailto:${social.email}`}
                className="hidden xs:block text-xs transition-colors duration-200"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-geist-mono)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {social.email}
              </a>
            </motion.div>
          </div>

          {/* ── Right: Gothic arch portrait ──────────────────────────────────── */}
          {/* perspective: 1200px on this wrapper is the single perspective context
              for the entire 3D scene — the inner motion.div's whileHover rotateY/X
              and ArchFrame's translateZ layers all render in this same space.      */}
          <div className="arch-scale-wrapper w-full flex justify-center overflow-x-clip">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex justify-center relative"
            style={{ perspective: "1200px" }}
          >
            {/* Scroll morph: arch scales and floats upward on scroll.
                transformStyle preserve-3d passes ArchFrame's depth layers into the
                parent perspective context so hover-tilt shows layer parallax.     */}
            <motion.div
              style={{
                scale: archScale,
                y: archY,
                opacity: archOpacity,
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
              }}
              whileHover={!simpleAnim ? { rotateY: 5, rotateX: 2 } : undefined}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative"
              tabIndex={0}
              aria-label="Portrait of Maisha Nanjeeba — hover to reveal"
              onHoverStart={() => setIsGlassOpen(true)}
              onHoverEnd={() => setIsGlassOpen(false)}
              onFocus={() => setIsGlassOpen(true)}
              onBlur={() => setIsGlassOpen(false)}
            >
              <ArchFrame isOpen={effectivelyOpen} simple={simpleAnim}>
                <Image
                  src="/core_image.jpeg"
                  alt="Maisha Nanjeeba"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="220px"
                />
              </ArchFrame>

              {/* Floating tech labels */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-[68px] top-16 px-3 py-2 text-xs hidden xl:block"
                style={{
                  background: "rgba(19,12,4,0.94)",
                  border: "1px solid rgba(201,162,39,0.2)",
                  color: "var(--accent)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "var(--font-geist-mono)",
                  borderRadius: "2px",
                }}
              >
                Next.js · TypeScript
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                className="absolute -left-[68px] bottom-24 px-3 py-2 text-xs hidden xl:block"
                style={{
                  background: "rgba(19,12,4,0.94)",
                  border: "1px solid rgba(201,162,39,0.14)",
                  color: "var(--text-secondary)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "var(--font-geist-mono)",
                  borderRadius: "2px",
                }}
              >
                Figma · UI/UX
              </motion.div>
            </motion.div>
          </motion.div>
          </div>
        </div>

        {/* Scroll indicator — decorative, no information for screen readers */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}
          >
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8"
            style={{ background: "linear-gradient(to bottom, rgba(201,162,39,0.35), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
