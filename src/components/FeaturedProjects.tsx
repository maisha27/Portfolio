"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { featuredProjects } from "@/lib/data";
import type { Project } from "@/lib/types";
import BookModal from "@/components/BookModal";

// ─── Book geometry ────────────────────────────────────────────────────────────
// A CSS 3D box: 6 faces built with transform + translateZ / rotateY / rotateX.
// The maths: each face starts at origin facing +z, then is rotated into position
// and translated to the correct side of the box.
//
//   Front  : translateZ(+D/2)                          faces viewer
//   Back   : rotateY(180deg) translateZ(+D/2)          faces away
//   Spine  : rotateY(-90deg) translateZ(W/2)           left face  (-x)
//   Pages  : rotateY(+90deg) translateZ(W/2)           right face (+x)
//   Top    : rotateX(+90deg) translateZ(H/2)           top face   (-y)
//   Bottom : rotateX(-90deg) translateZ(H/2)           bottom face (+y)

const W = 220; // book front cover width  (px)
const H = 300; // book front cover height (px)
const D = 36;  // spine thickness         (px)

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  development: "In Progress",
  completed: "Completed",
};

// ─── Book3D ───────────────────────────────────────────────────────────────────

function Book3D({
  project,
  index,
  simple,
  onOpen,
}: {
  project: Project;
  index: number;
  simple: boolean;
  onOpen: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered,  setHovered]  = useState(false);
  const [focused,  setFocused]  = useState(false);
  // active: drives all visual feedback for both mouse-hover AND keyboard-focus
  const active = hovered || focused;
  const ac = project.accentColor;

  // Corner accent helper — four corner bracket pieces on the front cover
  const cornerStyle = (pos: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    width: "12px",
    height: "12px",
    ...pos,
  });

  return (
    // Outer wrapper: handles entrance fade-in only (no 3D here)
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: index * 0.14 }}
      className="relative flex flex-col items-center"
    >
      {/* Perspective wrapper: each book has its own 3D rendering context */}
      <div style={{ perspective: "900px", perspectiveOrigin: "50% 40%" }}>

        {/* Book body: rotates in 3D on hover, lifts off shelf */}
        <motion.div
          animate={
            simple
              ? { rotateY: -6, scale: active ? 1.03 : 1 }
              : { rotateY: active ? -12 : -32, y: active ? -10 : 0 }
          }
          transition={
            simple
              ? { duration: 0.28 }
              : { type: "spring", stiffness: 190, damping: 24 }
          }
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onClick={onOpen}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Open ${project.title} case study`}
          style={{
            width: W,
            height: H,
            transformStyle: "preserve-3d",
            cursor: "pointer",
            position: "relative",
            // No outline:none — :focus-visible in globals.css adds the gold ring
            // for keyboard users while suppressing it for mouse/touch clicks.
          }}
        >

          {/* ── FRONT COVER ───────────────────────────────────────────── */}
          <div
            style={{
              position: "absolute",
              width: W,
              height: H,
              transform: `translateZ(${D / 2}px)`,
              overflow: "hidden",
              backfaceVisibility: "hidden",
              background: `linear-gradient(160deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
              border: `1px solid ${ac}2a`,
              boxShadow: active
                ? `6px 14px 42px rgba(0,0,0,0.72), 0 0 0 1px ${ac}18, inset 8px 0 18px rgba(0,0,0,0.30)`
                : `4px 8px 28px rgba(0,0,0,0.55), inset 8px 0 18px rgba(0,0,0,0.22)`,
              transition: "box-shadow 0.35s",
            }}
          >
            {/* Cover image — low opacity, tinted by gradient overlay */}
            {project.media?.image && (
              <>
                <Image
                  src={project.media.image}
                  alt={project.title}
                  fill
                  sizes="220px"
                  className="object-cover object-center"
                  style={{ opacity: 0.42 }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(160deg,
                      ${project.gradientFrom}d4 0%,
                      ${project.gradientTo}b8 50%,
                      ${project.gradientTo}f0 100%)`,
                  }}
                />
              </>
            )}

            {/* Accent stripe at top */}
            <div
              style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                background: `linear-gradient(90deg, transparent 0%, ${ac}80 50%, transparent 100%)`,
              }}
            />

            {/* Inner frame */}
            <div
              style={{
                position: "absolute", inset: "10px",
                border: `1px solid ${ac}1e`, pointerEvents: "none",
              }}
            />

            {/* Corner brackets */}
            <div style={cornerStyle({ top: "10px", left: "10px",
              borderTop: `1px solid ${ac}55`, borderLeft: `1px solid ${ac}55` })} />
            <div style={cornerStyle({ top: "10px", right: "10px",
              borderTop: `1px solid ${ac}55`, borderRight: `1px solid ${ac}55` })} />
            <div style={cornerStyle({ bottom: "10px", left: "10px",
              borderBottom: `1px solid ${ac}55`, borderLeft: `1px solid ${ac}55` })} />
            <div style={cornerStyle({ bottom: "10px", right: "10px",
              borderBottom: `1px solid ${ac}55`, borderRight: `1px solid ${ac}55` })} />

            {/* Chapter watermark */}
            <div
              aria-hidden
              style={{
                position: "absolute", top: "16px", right: "16px",
                fontSize: "62px", fontWeight: "bold", lineHeight: 1,
                userSelect: "none", pointerEvents: "none",
                color: `${ac}10`,
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Type label */}
            <div
              style={{
                position: "absolute", top: "20px", left: "16px", right: "72px",
                fontSize: "8px", letterSpacing: "0.24em", textTransform: "uppercase",
                color: `${ac}72`, fontFamily: "var(--font-geist-mono)",
              }}
            >
              {project.type}
            </div>

            {/* Title + status — pinned to cover bottom */}
            <div style={{ position: "absolute", bottom: "20px", left: "16px", right: "16px" }}>
              <h3
                style={{
                  fontSize: "1rem", fontWeight: "700", lineHeight: "1.25",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  marginBottom: "8px",
                }}
              >
                {project.title}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: ac, display: "inline-block", flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase",
                    color: `${ac}82`, fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  {statusLabel[project.status]}
                </span>
              </div>
            </div>

            {/* Hover/focus overlay: "Open" prompt — visible at rest so books read as interactive */}
            <motion.div
              animate={{ opacity: active ? 1 : 0.22 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "rgba(0,0,0,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span
                style={{
                  padding: "6px 16px",
                  border: `1px solid ${ac}65`,
                  color: ac, fontSize: "9px", letterSpacing: "0.20em",
                  textTransform: "uppercase", fontFamily: "var(--font-geist-mono)",
                  background: "rgba(0,0,0,0.42)",
                }}
              >
                Open
              </span>
            </motion.div>
          </div>

          {/* ── SPINE — left face ─────────────────────────────────────── */}
          <div
            style={{
              position: "absolute", width: D, height: H,
              transform: `rotateY(-90deg) translateZ(${W / 2}px)`,
              backfaceVisibility: "hidden",
              overflow: "hidden",
              background: `linear-gradient(180deg,
                ${ac}52 0%, ${ac}22 22%,
                ${ac}14 52%, ${ac}22 80%,
                ${ac}46 100%)`,
              borderLeft: "1px solid rgba(0,0,0,0.48)",
              boxShadow: "inset -6px 0 14px rgba(0,0,0,0.50), inset 2px 0 5px rgba(255,255,255,0.05)",
            }}
          >
            {/* Embossed spine ribs — alternating highlight + shadow pairs */}
            {[14, 28, 50, 72, 86].flatMap((pct) => [
              <div
                key={`${pct}-h`}
                style={{
                  position: "absolute", left: 0, right: 0, top: `${pct}%`,
                  height: "2px",
                  background: "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.10) 100%)",
                }}
              />,
              <div
                key={`${pct}-s`}
                style={{
                  position: "absolute", left: 0, right: 0, top: `calc(${pct}% + 2px)`,
                  height: "1px", background: "rgba(0,0,0,0.32)",
                }}
              />,
            ])}
            {/* Foil title strip — shimmer band across spine */}
            <div
              aria-hidden
              style={{
                position: "absolute", left: "2px", right: "2px", top: "42%",
                height: "18px",
                background: `linear-gradient(135deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.12) 30%, ${ac}30 55%, rgba(255,255,255,0.06) 80%, rgba(255,255,255,0.00) 100%)`,
                borderTop: "1px solid rgba(255,255,255,0.10)",
                borderBottom: "1px solid rgba(0,0,0,0.20)",
              }}
            />
            {/* Vertical spine title */}
            <div
              aria-hidden
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%) rotate(180deg)",
                writingMode: "vertical-rl",
                fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase",
                color: `${ac}68`, fontFamily: "var(--font-geist-mono)",
                whiteSpace: "nowrap", userSelect: "none",
              }}
            >
              {project.title}
            </div>
          </div>

          {/* ── BACK COVER ────────────────────────────────────────────── */}
          <div
            style={{
              position: "absolute", width: W, height: H,
              transform: `rotateY(180deg) translateZ(${D / 2}px)`,
              backfaceVisibility: "hidden",
              background: project.gradientTo,
              borderRight: `1px solid ${ac}14`,
            }}
          />

          {/* ── PAGE STACK — right edge ───────────────────────────────── */}
          <div
            style={{
              position: "absolute", width: D, height: H,
              transform: `rotateY(90deg) translateZ(${W / 2}px)`,
              backfaceVisibility: "hidden",
              overflow: "hidden",
              background:
                "linear-gradient(90deg, rgba(240,228,208,0.16), rgba(240,228,208,0.09), rgba(240,228,208,0.14))",
            }}
          >
            {/* Page lines — every 5th is a heavier section separator */}
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute", left: 0, right: 0,
                  top: `${(i / 23) * 96 + 2}%`,
                  height: i % 5 === 0 ? "2px" : "1px",
                  background: `rgba(245,220,170,${i % 5 === 0 ? 0.20 : 0.055})`,
                }}
              />
            ))}
          </div>

          {/* ── TOP EDGE ──────────────────────────────────────────────── */}
          <div
            style={{
              position: "absolute", width: W, height: D,
              transform: `rotateX(90deg) translateZ(${H / 2}px)`,
              backfaceVisibility: "hidden",
              background: `linear-gradient(180deg, ${ac}18 0%, rgba(245,220,170,0.04) 100%)`,
            }}
          />

          {/* ── BOTTOM EDGE ───────────────────────────────────────────── */}
          <div
            style={{
              position: "absolute", width: W, height: D,
              transform: `rotateX(-90deg) translateZ(${H / 2}px)`,
              backfaceVisibility: "hidden",
              background: "rgba(0,0,0,0.52)",
            }}
          />

        </motion.div>

        {/* Cast shadow on shelf surface */}
        <div
          aria-hidden
          style={{
            width: "88%", height: "14px", margin: "0 auto", marginTop: "-5px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.65), transparent 70%)",
            filter: "blur(4px)",
            opacity: active ? 0.42 : 0.72,
            transition: "opacity 0.35s",
          }}
        />

      </div>

      {/* Metadata below book — visible at a glance on the shelf */}
      <div className="mt-3 text-center" style={{ maxWidth: W + 16 }}>
        <p
          style={{
            color: "var(--text-secondary)", fontFamily: "var(--font-geist-mono)",
            fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase",
            marginBottom: "5px",
          }}
        >
          {project.title}
        </p>
        <div className="flex justify-center gap-1 flex-wrap">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.66rem", padding: "1px 5px",
                color: `${ac}92`, border: `1px solid ${ac}30`,
                fontFamily: "var(--font-geist-mono)", borderRadius: "1px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── FeaturedProjects ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  }),
};

export default function FeaturedProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section id="work" ref={ref} className="py-32 relative" aria-label="Featured projects">
      {/* Background warm glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(201,162,39,0.028) 0%, transparent 70%)",
        }}
      />

      {/* ── Chandelier ──────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none", zIndex: 0,
        }}
      >
        {/* Inner sway wrapper — rotates around top-center so arm tips sweep */}
        <div
          className="chandelier"
          style={{
            transformOrigin: "top center",
            animationName: "chandelierSway",
            animationDuration: "7s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        >
          <svg width="180" height="108" viewBox="0 0 180 108" fill="none" aria-hidden>
            {/* Ceiling mount rod */}
            <rect x="84" y="0" width="12" height="16" rx="2" fill="rgba(201,162,39,0.22)" />
            {/* Crown ring */}
            <ellipse cx="90" cy="22" rx="16" ry="7"
              stroke="rgba(201,162,39,0.22)" strokeWidth="1"
              fill="rgba(201,162,39,0.06)" />
            {/* Main horizontal arms */}
            <path d="M74 22 L18 30" stroke="rgba(201,162,39,0.18)" strokeWidth="1.5" />
            <path d="M106 22 L162 30" stroke="rgba(201,162,39,0.18)" strokeWidth="1.5" />
            {/* Inner drooping arms */}
            <path d="M80 24 L56 30 Q48 40 50 56"
              stroke="rgba(201,162,39,0.16)" strokeWidth="1" fill="none" />
            <path d="M100 24 L124 30 Q132 40 130 56"
              stroke="rgba(201,162,39,0.16)" strokeWidth="1" fill="none" />
            {/* Outer drooping arms */}
            <path d="M18 30 Q10 42 12 62"
              stroke="rgba(201,162,39,0.16)" strokeWidth="1" fill="none" />
            <path d="M162 30 Q170 42 168 62"
              stroke="rgba(201,162,39,0.16)" strokeWidth="1" fill="none" />
            {/* Centre pendant chain */}
            <line x1="90" y1="29" x2="90" y2="76"
              stroke="rgba(201,162,39,0.22)" strokeWidth="1" />
            {/* Bulb drops */}
            <ellipse cx="12"  cy="66" rx="4.5" ry="5.5" fill="rgba(201,162,39,0.20)" />
            <ellipse cx="50"  cy="60" rx="3.5" ry="4.5" fill="rgba(201,162,39,0.18)" />
            <ellipse cx="90"  cy="80" rx="5.5" ry="6.5" fill="rgba(201,162,39,0.28)" />
            <ellipse cx="130" cy="60" rx="3.5" ry="4.5" fill="rgba(201,162,39,0.18)" />
            <ellipse cx="168" cy="66" rx="4.5" ry="5.5" fill="rgba(201,162,39,0.20)" />
            {/* Flame glints above each bulb */}
            <ellipse cx="12"  cy="61" rx="2"   ry="2.5" fill="rgba(255,210,120,0.38)" />
            <ellipse cx="50"  cy="55" rx="1.8" ry="2.2" fill="rgba(255,210,120,0.32)" />
            <ellipse cx="90"  cy="74" rx="2.5" ry="3"   fill="rgba(255,210,120,0.44)" />
            <ellipse cx="130" cy="55" rx="1.8" ry="2.2" fill="rgba(255,210,120,0.32)" />
            <ellipse cx="168" cy="61" rx="2"   ry="2.5" fill="rgba(255,210,120,0.38)" />
          </svg>
          {/* Warm glow pool beneath the chandelier */}
          <div style={{
            position: "absolute", top: "78px", left: "50%",
            transform: "translateX(-50%)",
            width: "320px", height: "130px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.052) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        </div>
      </div>

      {/* ── Volumetric light shafts — diagonal warm rays ─────────────────────── */}
      <div aria-hidden style={{
        position: "absolute", top: 0, bottom: 0, left: "7%",
        width: "130px",
        transform: "rotate(-10deg)", transformOrigin: "top center",
        background: "linear-gradient(to bottom, transparent 0%, rgba(201,162,39,0.014) 28%, rgba(201,162,39,0.020) 52%, rgba(201,162,39,0.009) 76%, transparent 100%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: 0, bottom: 0, right: "5%",
        width: "110px",
        transform: "rotate(8deg)", transformOrigin: "top center",
        background: "linear-gradient(to bottom, transparent 0%, rgba(201,162,39,0.010) 32%, rgba(201,162,39,0.016) 56%, rgba(201,162,39,0.007) 80%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* ── Section-edge candle glows ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="section-candle"
        style={{
          position: "absolute", left: "1%", top: "52%",
          width: "220px", height: "220px",
          background: "radial-gradient(circle, rgba(201,162,39,0.065) 0%, rgba(201,162,39,0.028) 35%, transparent 70%)",
          filter: "blur(22px)",
          animationName: "sectionFlicker",
          animationDuration: "4.3s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        className="section-candle"
        style={{
          position: "absolute", right: "1%", top: "35%",
          width: "200px", height: "200px",
          background: "radial-gradient(circle, rgba(155,35,53,0.050) 0%, rgba(201,162,39,0.022) 42%, transparent 70%)",
          filter: "blur(26px)",
          animationName: "sectionFlicker",
          animationDuration: "5.6s",
          animationTimingFunction: "ease-in-out",
          animationDelay: "1.6s",
          animationIterationCount: "infinite",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* ── Section header ── */}
        <div className="mb-20">
          <motion.div
            variants={fadeUp} initial="hidden"
            animate={inView ? "visible" : "hidden"} custom={0}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px flex-1"
              style={{ background: "linear-gradient(to right, transparent, rgba(201,162,39,0.3))" }} />
            <span className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}>
              Featured Works
            </span>
            <div className="h-px flex-1"
              style={{ background: "linear-gradient(to left, transparent, rgba(201,162,39,0.3))" }} />
          </motion.div>

          <motion.h2
            variants={fadeUp} initial="hidden"
            animate={inView ? "visible" : "hidden"} custom={0.07}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Projects with real-world outcomes
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden"
            animate={inView ? "visible" : "hidden"} custom={0.12}
            style={{
              color: "var(--text-secondary)", fontFamily: "var(--font-lora), Georgia, serif",
              fontSize: "1.05rem", lineHeight: "1.8", maxWidth: "40rem",
            }}
          >
            Built for users, teams, and delivery pressure — not just portfolio aesthetics.
          </motion.p>
        </div>

        {/* ── Bookshelf ── */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={inView ? "visible" : "hidden"} custom={0.18}
          className="relative"
        >
          {/* ── Library hall backdrop — gothic arch silhouettes ─────────────── */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-50px -70px 0",
              pointerEvents: "none",
              opacity: 0.042,
              zIndex: 0,
            }}
          >
            <svg
              width="100%" height="100%"
              viewBox="0 0 1100 360"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
            >
              {/* Gothic arch windows across the back wall */}
              {[70, 340, 610, 880].map((x) => (
                <g key={x}>
                  <path
                    d={`M${x} 360 L${x} 195 C${x} 105 ${x+88} 82 ${x+88} 82 C${x+88} 82 ${x+176} 105 ${x+176} 195 L${x+176} 360`}
                    stroke="rgba(201,162,39,1)" strokeWidth="1.5" fill="none"
                  />
                  <path
                    d={`M${x+22} 360 L${x+22} 205 C${x+22} 125 ${x+88} 105 ${x+88} 105 C${x+88} 105 ${x+154} 125 ${x+154} 205 L${x+154} 360`}
                    stroke="rgba(201,162,39,0.55)" strokeWidth="1" fill="none"
                  />
                  {/* Rose window at arch apex */}
                  <circle cx={x+88} cy={102} r={21}
                    stroke="rgba(201,162,39,0.85)" strokeWidth="1" fill="none" />
                  <circle cx={x+88} cy={102} r={12}
                    stroke="rgba(201,162,39,0.50)" strokeWidth="1" fill="none" />
                  <circle cx={x+88} cy={102} r={4}
                    fill="rgba(201,162,39,0.30)" />
                </g>
              ))}
              {/* Horizontal shelf lines on back wall */}
              <line x1="0" y1="295" x2="1100" y2="295"
                stroke="rgba(201,162,39,1)" strokeWidth="1.5" />
              <line x1="0" y1="307" x2="1100" y2="307"
                stroke="rgba(201,162,39,0.40)" strokeWidth="1" />
            </svg>
          </div>

          {/* Books row — wraps to 1-column on narrow screens */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 items-end pb-2">
            {featuredProjects.map((project, i) => (
              <Book3D
                key={project.id}
                project={project}
                index={i}
                simple={prefersReducedMotion}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>

          {/* Shelf — front lip surface */}
          <div
            aria-hidden
            style={{
              height: "8px",
              background: "linear-gradient(180deg, rgba(201,162,39,0.22) 0%, rgba(201,162,39,0.06) 100%)",
              borderTop: "1px solid rgba(201,162,39,0.30)",
              boxShadow: "0 2px 0 rgba(0,0,0,0.55)",
              marginTop: "-2px",
              position: "relative", zIndex: 2,
            }}
          />
          {/* Shelf lip underside — gives the board visible thickness */}
          <div
            aria-hidden
            style={{
              height: "4px",
              background: "linear-gradient(180deg, rgba(0,0,0,0.70), rgba(0,0,0,0.40))",
              position: "relative", zIndex: 1,
            }}
          />
          {/* Floor shadow beneath shelf */}
          <div
            aria-hidden
            style={{
              height: "28px",
              background: "linear-gradient(180deg, rgba(0,0,0,0.38), transparent)",
            }}
          />
        </motion.div>

        {/* Shelf hint */}
        <motion.p
          variants={fadeUp} initial="hidden"
          animate={inView ? "visible" : "hidden"} custom={0.28}
          className="text-center mt-5"
          style={{
            color: "var(--text-secondary)", fontFamily: "var(--font-geist-mono)",
            fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase",
          }}
        >
          Click a book to open the case study
        </motion.p>
      </div>

      <BookModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
