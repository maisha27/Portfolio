"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live", development: "In Progress", completed: "Completed",
};
const STATUS_COLOR: Record<Project["status"], string> = {
  live: "#9ab87a", development: "#c9a227", completed: "#a08060",
};
const STATUS_BG: Record<Project["status"], string> = {
  live: "rgba(154,184,122,0.08)", development: "rgba(201,162,39,0.08)", completed: "rgba(160,128,96,0.08)",
};

// Body text colour — ~5.8:1 contrast on the darkest project gradients.
const BODY_TEXT = "#ddc9a8";

// ─── Left page — Overview ─────────────────────────────────────────────────────

function OverviewLeft({ project }: { project: Project }) {
  const ac = project.accentColor;
  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto p-7 md:p-8">
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase mb-3"
           style={{ color: `${ac}80`, fontFamily: "var(--font-geist-mono)" }}>
          {project.type}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-3"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair), Georgia, serif" }}>
          {project.title}
        </h2>
        <p className="leading-relaxed mb-4"
           style={{ color: BODY_TEXT, fontFamily: "var(--font-lora), Georgia, serif",
                    fontStyle: "italic", fontSize: "1rem", lineHeight: "1.80" }}>
          {project.role}
        </p>
        <span className="inline-block px-2.5 py-0.5 text-xs"
              style={{ color: STATUS_COLOR[project.status], background: STATUS_BG[project.status],
                       border: `1px solid ${STATUS_COLOR[project.status]}28`,
                       fontFamily: "var(--font-geist-mono)", borderRadius: "2px" }}>
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <div className="h-px" style={{ background: `${ac}18` }} />

      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2.5"
           style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}>
          Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 text-xs"
                  style={{ color: BODY_TEXT, background: "rgba(245,220,170,0.035)",
                           border: "1px solid rgba(201,162,39,0.12)",
                           fontFamily: "var(--font-geist-mono)", borderRadius: "2px" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {(project.links.live || project.links.github || project.links.figma) && (
        <div className="flex flex-wrap gap-2.5 mt-auto">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-4 py-2 text-xs transition-opacity duration-200 hover:opacity-75"
               style={{ color: ac, border: `1px solid ${ac}38`, background: `${ac}07`,
                        fontFamily: "var(--font-geist-mono)", borderRadius: "2px" }}>
              ↗ Live Site
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-4 py-2 text-xs transition-opacity duration-200 hover:opacity-75"
               style={{ color: BODY_TEXT, border: "1px solid rgba(201,162,39,0.14)",
                        fontFamily: "var(--font-geist-mono)", borderRadius: "2px" }}>
              GitHub
            </a>
          )}
          {project.links.figma && (
            <a href={project.links.figma} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-4 py-2 text-xs transition-opacity duration-200 hover:opacity-75"
               style={{ color: BODY_TEXT, border: "1px solid rgba(201,162,39,0.14)",
                        fontFamily: "var(--font-geist-mono)", borderRadius: "2px" }}>
              Figma
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Right page — Overview ────────────────────────────────────────────────────

function OverviewRight({ project }: { project: Project }) {
  const ac = project.accentColor;
  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto p-7 md:p-8">
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3"
           style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}>
          About
        </p>
        <p style={{ color: BODY_TEXT, fontFamily: "var(--font-lora), Georgia, serif",
                    fontSize: "1.02rem", lineHeight: "1.90" }}>
          {project.description}
        </p>
      </div>

      <div className="h-px" style={{ background: `${ac}14` }} />

      <div className="p-4"
           style={{ background: "rgba(245,220,170,0.07)", border: "1px solid rgba(201,162,39,0.22)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2"
           style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}>
          Outcome
        </p>
        <p style={{ color: BODY_TEXT, fontFamily: "var(--font-lora), Georgia, serif",
                    fontSize: "0.97rem", lineHeight: "1.78" }}>
          {project.outcome}
        </p>
      </div>

      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3"
           style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}>
          Highlights
        </p>
        <div className="space-y-2.5">
          {project.features.map((f) => (
            <div key={f} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: ac }} />
              <p style={{ color: BODY_TEXT, fontFamily: "var(--font-lora), Georgia, serif",
                          fontSize: "0.95rem", lineHeight: "1.70" }}>
                {f}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Left page — Gallery ──────────────────────────────────────────────────────
// Shows platform type at top and the full cover image below, no other text.

function GalleryLeft({ project }: { project: Project }) {
  const ac = project.accentColor;
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ padding: "20px" }}>
      {/* Platform type label */}
      <p
        className="flex-shrink-0 text-[10px] tracking-[0.3em] uppercase mb-4"
        style={{ color: `${ac}80`, fontFamily: "var(--font-geist-mono)" }}
      >
        {project.type}
      </p>

      {/* Cover image — fills remaining space, shown in full */}
      {project.media?.image ? (
        <div
          className="flex-1 relative overflow-hidden min-h-0"
          style={{
            border: `1px solid ${ac}22`,
            background: `linear-gradient(160deg, ${project.gradientFrom}a0 0%, ${project.gradientTo}c0 100%)`,
          }}
        >
          <Image
            src={project.media.image}
            alt={`${project.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-contain"
          />
        </div>
      ) : (
        <div
          className="flex-1 flex items-center justify-center"
          style={{ border: `1px solid ${ac}12` }}
        >
          <p style={{ color: `${ac}30`, fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem" }}>
            {project.title}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Right page — Gallery ─────────────────────────────────────────────────────
// Full-image letterbox viewer with overlaid prev/next arrows and a caption bar.
// object-contain ensures screenshots are never cropped regardless of aspect ratio.
// The project-gradient letterbox fill is visible for portrait shots in landscape.

function getGroupInfo(
  groups: Array<{ label: string; count: number }>,
  index: number,
): { label: string; indexInGroup: number; groupSize: number } | null {
  let offset = 0;
  for (const g of groups) {
    if (index < offset + g.count) {
      return { label: g.label, indexInGroup: index - offset, groupSize: g.count };
    }
    offset += g.count;
  }
  return null;
}

function GalleryRight({ project, screenshots, screenshotIndex, goNext, goPrev, onJumpTo }: {
  project: Project;
  screenshots: string[];
  screenshotIndex: number;
  goNext: () => void;
  goPrev: () => void;
  onJumpTo: (idx: number) => void;
}) {
  const ac = project.accentColor;
  const currentScreenshot = screenshots[screenshotIndex] ?? null;
  const total = screenshots.length;
  const hasPrev = screenshotIndex > 0;
  const hasNext = screenshotIndex < total - 1;

  const groups = project.screenshotGroups ?? null;
  const currentGroup = groups ? getGroupInfo(groups, screenshotIndex) : null;

  const arrowStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    [side]: "6px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 5,
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.54)",
    border: `1px solid ${ac}35`,
    borderRadius: "50%",
    color: ac,
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: 1,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    transition: "background 0.18s",
  });

  return (
    <div
      className="relative w-full h-full flex flex-col"
      style={{ padding: "12px 12px 10px", gap: "8px", background: "rgba(0,0,0,0.32)", minHeight: "260px" }}
    >
      {/* Screenshot frame — flex-1 so it fills available height */}
      <div
        style={{
          flex: 1,
          position: "relative",
          border: `1px solid ${ac}28`,
          background: `linear-gradient(160deg, ${project.gradientFrom}90, ${project.gradientTo}b0)`,
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {currentScreenshot && (
          <Image
            src={currentScreenshot}
            alt={`${project.title} screenshot ${screenshotIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        )}

        {/* Frame corner accents */}
        {[
          { top: "8px",    left: "8px",  borderTop:    `1px solid ${ac}40`, borderLeft:   `1px solid ${ac}40` },
          { top: "8px",    right: "8px", borderTop:    `1px solid ${ac}40`, borderRight:  `1px solid ${ac}40` },
          { bottom: "8px", left: "8px",  borderBottom: `1px solid ${ac}40`, borderLeft:   `1px solid ${ac}40` },
          { bottom: "8px", right: "8px", borderBottom: `1px solid ${ac}40`, borderRight:  `1px solid ${ac}40` },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: "10px", height: "10px",
                                pointerEvents: "none", ...s }} />
        ))}

        {/* Persistent section badge — top-right, only for grouped projects */}
        {currentGroup && (
          <div
            aria-live="polite"
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 6,
              padding: "3px 10px",
              fontSize: "0.58rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: ac,
              background: `${ac}14`,
              border: `1px solid ${ac}35`,
              borderRadius: "2px",
              fontFamily: "var(--font-geist-mono)",
              pointerEvents: "none",
            }}
          >
            {currentGroup.label}
          </div>
        )}

        {/* Prev arrow — hidden on first screenshot */}
        {hasPrev && (
          <button onClick={goPrev} aria-label="Previous screenshot" style={arrowStyle("left")}>
            ‹
          </button>
        )}

        {/* Next arrow — hidden on last screenshot */}
        {hasNext && (
          <button onClick={goNext} aria-label="Next screenshot" style={arrowStyle("right")}>
            ›
          </button>
        )}
      </div>

      {/* Caption bar: counter on left, jump-dots on right */}
      <div style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}>
        <p style={{
          fontSize: "0.68rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-geist-mono)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          flexShrink: 0,
        }}>
          {currentGroup
            ? `${currentGroup.label} · ${currentGroup.indexInGroup + 1} / ${currentGroup.groupSize}`
            : `Screenshot ${screenshotIndex + 1} of ${total}`}
        </p>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => onJumpTo(i)}
              aria-label={`Screenshot ${i + 1}`}
              aria-current={i === screenshotIndex ? "true" : undefined}
              style={{
                width: i === screenshotIndex ? "16px" : "5px",
                height: "5px",
                borderRadius: "3px",
                background: i === screenshotIndex ? ac : `${ac}35`,
                transition: "all 0.2s",
                cursor: "pointer",
                border: "none",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Chapter-transition overlay ───────────────────────────────────────────────
// Full-spread fairy-tale / candlelight interstitial that appears when the user
// navigates from one screenshot group to another (e.g. Web App → Candidate App).
// Renders inside the spread container so it respects overflow:hidden.

const EMBER_SEEDS = [
  { dx: -28, delay: 0,    dur: 2.0, size: 2 },
  { dx:  -8, delay: 0.45, dur: 2.4, size: 3 },
  { dx:   4, delay: 0.15, dur: 1.9, size: 2 },
  { dx:  18, delay: 0.70, dur: 2.2, size: 2 },
  { dx:  32, delay: 0.35, dur: 2.5, size: 3 },
  { dx: -16, delay: 0.90, dur: 2.1, size: 2 },
  { dx:  10, delay: 1.10, dur: 1.8, size: 2 },
  { dx: -38, delay: 0.60, dur: 2.3, size: 2 },
];

function ChapterTransitionOverlay({
  label,
  accentColor,
}: {
  label: string;
  accentColor: string;
}) {
  const ac = accentColor;
  return (
    <motion.div
      key={label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.38 }}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 25,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(4,2,12,0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Pulsing ambient glow — large soft orb */}
      <motion.div
        animate={{
          scale: [1, 1.10, 0.94, 1.06, 1],
          opacity: [0.55, 0.72, 0.50, 0.68, 0.55],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ac}38 0%, ${ac}16 38%, transparent 68%)`,
          filter: "blur(28px)",
        }}
      />
      {/* Tighter inner glow — simulates candle flame core */}
      <motion.div
        animate={{
          scale: [1, 1.18, 0.92, 1.12, 1],
          opacity: [0.7, 0.95, 0.60, 0.88, 0.7],
        }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        style={{
          position: "absolute",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ac}65 0%, ${ac}20 55%, transparent 80%)`,
          filter: "blur(12px)",
        }}
      />

      {/* Floating embers */}
      {EMBER_SEEDS.map((e, i) => (
        <motion.div
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: -110, opacity: [0, 0.75, 0.45, 0] }}
          transition={{
            duration: e.dur,
            delay: e.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            left: `calc(50% + ${e.dx}px)`,
            top: "54%",
            width: e.size,
            height: e.size,
            borderRadius: "50%",
            background: ac,
            boxShadow: `0 0 5px 1px ${ac}90`,
          }}
        />
      ))}

      {/* Text content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        {/* Top ornamental rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.55 }}
          style={{
            height: "1px",
            width: "110px",
            margin: "0 auto 18px",
            background: `linear-gradient(90deg, transparent, ${ac}90, transparent)`,
          }}
        />

        {/* "Now entering" */}
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.38 }}
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: `${ac}75`,
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "16px",
          }}
        >
          Now entering
        </motion.p>

        {/* Section title */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.50, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            fontFamily: "var(--font-playfair), Georgia, serif",
            letterSpacing: "0.05em",
            lineHeight: 1.2,
            textShadow: `0 0 50px ${ac}70, 0 0 100px ${ac}30`,
            marginBottom: "18px",
          }}
        >
          {label}
        </motion.h3>

        {/* Bottom ornamental rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.55 }}
          style={{
            height: "1px",
            width: "110px",
            margin: "0 auto",
            background: `linear-gradient(90deg, transparent, ${ac}90, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── BookSpread — holds page state, keyed by project.id for auto-reset ────────

function BookSpread({ project, onClose }: { project: Project; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  // coverOpen: false on mount → true after 80 ms, triggering the opening animation.
  const [coverOpen, setCoverOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const screenshots = project.screenshots ?? [];
  const totalPages = 1 + screenshots.length;
  const isFirst = page === 0;
  const isLast  = page === totalPages - 1;
  const ac = project.accentColor;

  // Trigger cover-open animation shortly after modal enters
  useEffect(() => {
    if (prefersReducedMotion) return;
    const t = setTimeout(() => setCoverOpen(true), 80);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  // Focus close button on mount
  useEffect(() => {
    requestAnimationFrame(() => closeButtonRef.current?.focus());
  }, []);

  // Keyboard navigation + focus trap
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { onClose(); return; }
      if (e.key === "ArrowRight") { setDirection(1);  setPage((p) => Math.min(p + 1, totalPages - 1)); return; }
      if (e.key === "ArrowLeft")  { setDirection(-1); setPage((p) => Math.max(p - 1, 0)); return; }

      if (e.key === "Tab") {
        const focusable = Array.from(
          modal.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length < 2) return;
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, totalPages]);

  // Chapter-transition banner — detect when page crosses a screenshot group boundary
  const [chapterBanner, setChapterBanner] = useState<string | null>(null);
  const prevPageRef = useRef<number>(0);
  useEffect(() => {
    const groups = project.screenshotGroups;
    if (!groups) return;
    const prevPage = prevPageRef.current;
    prevPageRef.current = page;
    if (page === 0 || prevPage === 0) return;
    const prevGroup = getGroupInfo(groups, prevPage - 1);
    const currGroup = getGroupInfo(groups, page - 1);
    if (prevGroup?.label !== currGroup?.label && currGroup) {
      setChapterBanner(currGroup.label);
      const t = setTimeout(() => setChapterBanner(null), 2400);
      return () => clearTimeout(t);
    }
  }, [page, project.screenshotGroups]);

  // Auto-slide: advance one screenshot every 2 s while gallery is visible.
  // Pauses during intro, chapter transitions, overview page, and single-screenshot projects.
  // Resets the 2 s window on every manual navigation (page dep causes re-run).
  // Loops: after the last screenshot wraps back to screenshot 1.
  useEffect(() => {
    if (chapterBanner || page === 0 || screenshots.length <= 1) return;
    const t = setInterval(() => {
      setDirection(1);
      setPage((p) => (p >= totalPages - 1 ? 1 : p + 1));
    }, 2000);
    return () => clearInterval(t);
  }, [page, chapterBanner, screenshots.length, totalPages]);

  const goNext = () => { if (!isLast)  { setDirection(1);  setPage((p) => p + 1); } };
  const goPrev = () => { if (!isFirst) { setDirection(-1); setPage((p) => p - 1); } };

  const spreadVariants = prefersReducedMotion
    ? {
        enter:  { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.25 } },
        exit:   { opacity: 0, transition: { duration: 0.18 } },
      }
    : {
        enter:  (dir: number) => ({ x: dir > 0 ? "6%" : "-6%", opacity: 0 }),
        center: { x: 0, opacity: 1,
                  transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
        exit:   (dir: number) => ({
          x: dir > 0 ? "-4%" : "4%", opacity: 0,
          transition: { duration: 0.20, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] },
        }),
      };

  const isOverview = page === 0;
  const screenshotIndex = page - 1;

  // Shared jump handler — used by both GalleryLeft dots and GalleryRight caption dots
  const jumpToScreenshot = (idx: number) => {
    setDirection(idx > screenshotIndex ? 1 : -1);
    setPage(idx + 1);
  };

  return (
    <motion.div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — case study`}
      initial={{ scale: 0.95, opacity: 0, y: 14 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.97, opacity: 0, y: 6 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full flex flex-col overflow-hidden"
      style={{
        maxWidth: "1060px",
        height: "min(90vh, 720px)",
        background: `linear-gradient(160deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
        border: "1px solid rgba(201,162,39,0.14)",
        boxShadow: "0 40px 100px rgba(0,0,0,0.85), 0 12px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(245,220,170,0.04)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── HEADER ───────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-6 py-3.5 flex-shrink-0"
        style={{
          borderBottom: `1px solid ${ac}1e`,
          background: `linear-gradient(90deg, ${project.gradientFrom}cc 0%, rgba(0,0,0,0.28) 100%)`,
          position: "relative", zIndex: 30,
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ac }} />
          <span className="text-sm font-semibold truncate"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair), Georgia, serif" }}>
            {project.title}
          </span>
          <span className="text-xs hidden sm:block flex-shrink-0"
                style={{ color: `${ac}70`, fontFamily: "var(--font-geist-mono)" }}>
            {project.type}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs tabular-nums"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}>
            {page + 1} / {totalPages}
          </span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center w-7 h-7 transition-opacity duration-200 hover:opacity-60"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── SPREAD AREA ─────────────────────────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">

        {/* ── COVER OPENING ANIMATION ──────────────────────────────────────── */}
        {/* The cover sits over the LEFT half of the spread (the left page area).
            It rotates around its RIGHT edge (= the spine axis, at 50% of spread)
            from rotateY(0) → rotateY(-180deg) while fading out, revealing the pages
            underneath.  Only plays on first open; reduced-motion skips entirely.   */}
        {!prefersReducedMotion && (
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0, zIndex: 20,
              perspective: "1000px",
              perspectiveOrigin: "50% 50%",
              pointerEvents: "none",
            }}
          >
            <motion.div
              initial={{ rotateY: 0, opacity: 1 }}
              animate={{
                rotateY: coverOpen ? -180 : 0,
                opacity: coverOpen ? 0 : 1,
              }}
              transition={{
                rotateY: { duration: 0.65, ease: [0.65, 0, 0.35, 1] },
                // Start fading once the hinge has pulled the cover past 45°
                opacity: { duration: 0.20, delay: coverOpen ? 0.30 : 0 },
              }}
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "50%", height: "100%",
                // Rotate around RIGHT edge = the spine axis at centre of spread
                transformOrigin: "right center",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                background: `linear-gradient(160deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
                overflow: "hidden",
              }}
            >
              {/* Cover design — mirrors the Book3D front cover aesthetic */}
              {/* Top accent stripe */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                background: `linear-gradient(90deg, transparent, ${ac}80, transparent)`,
              }} />
              {/* Inner frame */}
              <div style={{
                position: "absolute", inset: "16px",
                border: `1px solid ${ac}22`, pointerEvents: "none",
              }} />
              {/* Corner brackets */}
              {[
                { top: "16px",    left: "16px",  borderTop:    `1px solid ${ac}50`, borderLeft:   `1px solid ${ac}50` },
                { top: "16px",    right: "16px", borderTop:    `1px solid ${ac}50`, borderRight:  `1px solid ${ac}50` },
                { bottom: "16px", left: "16px",  borderBottom: `1px solid ${ac}50`, borderLeft:   `1px solid ${ac}50` },
                { bottom: "16px", right: "16px", borderBottom: `1px solid ${ac}50`, borderRight:  `1px solid ${ac}50` },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: "14px", height: "14px", ...s }} />
              ))}
              {/* Cover image */}
              {project.media?.image && (
                <>
                  <Image
                    src={project.media.image} alt={project.title}
                    fill sizes="460px"
                    className="object-cover object-center"
                    style={{ opacity: 0.35 }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(160deg, ${project.gradientFrom}d0, ${project.gradientTo}e8)`,
                  }} />
                </>
              )}
              {/* Title block */}
              <div style={{ position: "absolute", bottom: "28px", left: "24px", right: "24px" }}>
                <p style={{
                  fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase",
                  color: `${ac}72`, fontFamily: "var(--font-geist-mono)", marginBottom: "10px",
                }}>
                  {project.type}
                </p>
                <h3 style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "1.5rem", fontWeight: "700", lineHeight: "1.2",
                }}>
                  {project.title}
                </h3>
              </div>
            </motion.div>
          </div>
        )}

        {/* ── PAGES — fade in as cover opens ───────────────────────────────── */}
        {/* delay matches when the cover starts becoming transparent (~0.28s in)  */}
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.30, duration: 0.32 }}
          className="absolute inset-0"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={spreadVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`absolute inset-0 grid grid-cols-1 ${isOverview ? 'md:grid-cols-[1fr_4px_1fr]' : 'md:grid-cols-[1fr_4px_2fr]'}`}
            >

              {/* LEFT PAGE — mobile: order 2 */}
              <div
                className="order-2 md:order-none overflow-hidden"
                style={{
                  background: "linear-gradient(to bottom right, rgba(245,232,210,0.062), rgba(245,232,210,0.035))",
                  boxShadow: "inset -6px 0 16px rgba(0,0,0,0.18)",
                }}
              >
                {isOverview
                  ? <OverviewLeft project={project} />
                  : <GalleryLeft project={project} />
                }
              </div>

              {/* SPINE — visible depth gutter between pages */}
              <div
                className="hidden md:block"
                style={{
                  background: `linear-gradient(90deg,
                    rgba(0,0,0,0.22) 0%,
                    ${ac}32 30%,
                    ${ac}18 50%,
                    ${ac}32 70%,
                    rgba(0,0,0,0.22) 100%)`,
                  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
                }}
              />

              {/* RIGHT PAGE — mobile: order 1 */}
              <div
                className="order-1 md:order-none overflow-hidden"
                style={{
                  background: "rgba(245,232,210,0.030)",
                  boxShadow: "inset 6px 0 16px rgba(0,0,0,0.18)",
                }}
              >
                {isOverview
                  ? <OverviewRight project={project} />
                  : (
                    <GalleryRight
                      project={project}
                      screenshots={screenshots}
                      screenshotIndex={screenshotIndex}
                      goNext={goNext}
                      goPrev={goPrev}
                      onJumpTo={jumpToScreenshot}
                    />
                  )
                }
              </div>

            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── CHAPTER TRANSITION OVERLAY ───────────────────────────────────── */}
        <AnimatePresence>
          {chapterBanner && (
            <ChapterTransitionOverlay
              label={chapterBanner}
              accentColor={ac}
            />
          )}
        </AnimatePresence>

      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-6 py-3.5 flex-shrink-0"
        style={{
          borderTop: `1px solid ${ac}18`,
          background: `linear-gradient(90deg, rgba(0,0,0,0.22) 0%, ${project.gradientTo}cc 100%)`,
          position: "relative", zIndex: 30,
        }}
      >
        {/* Prev */}
        <button
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous page"
          className="inline-flex items-center gap-1.5 text-xs transition-opacity duration-200"
          style={{
            color: isFirst ? "var(--text-muted)" : BODY_TEXT,
            opacity: isFirst ? 0.35 : 1,
            fontFamily: "var(--font-geist-mono)",
            cursor: isFirst ? "default" : "pointer",
          }}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {page === 1 ? "Overview" : "Prev"}
        </button>

        {/* Page dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
              aria-label={`Page ${i + 1}`}
              aria-current={i === page ? "page" : undefined}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === page ? "18px" : "6px",
                height: "6px",
                background: i === page ? ac : `${ac}38`,
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={goNext}
          disabled={isLast}
          aria-label="Next page"
          className="inline-flex items-center gap-1.5 text-xs transition-opacity duration-200"
          style={{
            color: isLast ? "var(--text-muted)" : BODY_TEXT,
            opacity: isLast ? 0.35 : 1,
            fontFamily: "var(--font-geist-mono)",
            cursor: isLast ? "default" : "pointer",
          }}
        >
          {page === 0 ? "Gallery" : "Next"}
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

// ─── BookModal — outer wrapper: backdrop + scroll lock ────────────────────────

interface BookModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function BookModal({ project, onClose }: BookModalProps) {
  const [introProject, setIntroProject] = useState<Project | null>(null);
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  // Show intro every time a new project is opened — no reduced-motion guard
  // (the chapter transitions have no such guard either).
  useEffect(() => {
    if (!project) { setIntroVisible(false); return; }
    setIntroProject(project);
    setIntroVisible(true);
    const t = setTimeout(() => setIntroVisible(false), 2200);
    return () => clearTimeout(t);
  // project.id changing is the signal for "new project opened"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

  const ip = introProject; // stable ref inside JSX

  return (
    <>
      {/* ── INTRO OVERLAY ─────────────────────────────────────────────────── */}
      {/* position:fixed, z-index above modal (65 > 60), initial opacity:1     */}
      {/* so the dark screen is visible the instant the user clicks.           */}
      {/* Does NOT use ChapterTransitionOverlay to avoid its opacity:0 initial  */}
      {/* and absolute positioning — the whole div is self-contained here.     */}
      <AnimatePresence>
        {introVisible && ip && (
          <motion.div
            key={`intro-${ip.id}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 65,
              background: "rgba(4,2,12,0.95)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              pointerEvents: "none",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Ambient glow orb */}
            <motion.div
              animate={{ scale: [1, 1.10, 0.94, 1.06, 1], opacity: [0.55, 0.72, 0.50, 0.68, 0.55] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "520px", height: "520px", borderRadius: "50%",
                background: `radial-gradient(circle, ${ip.accentColor}38 0%, ${ip.accentColor}16 38%, transparent 68%)`,
                filter: "blur(32px)",
              }}
            />
            {/* Flame core */}
            <motion.div
              animate={{ scale: [1, 1.18, 0.92, 1.12, 1], opacity: [0.7, 0.95, 0.60, 0.88, 0.7] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              style={{
                position: "absolute",
                width: "140px", height: "140px", borderRadius: "50%",
                background: `radial-gradient(circle, ${ip.accentColor}65 0%, ${ip.accentColor}20 55%, transparent 80%)`,
                filter: "blur(14px)",
              }}
            />
            {/* Floating embers */}
            {EMBER_SEEDS.map((e, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: -130, opacity: [0, 0.75, 0.45, 0] }}
                transition={{ duration: e.dur, delay: e.delay, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${e.dx}px)`, top: "54%",
                  width: e.size, height: e.size, borderRadius: "50%",
                  background: ip.accentColor,
                  boxShadow: `0 0 5px 1px ${ip.accentColor}90`,
                }}
              />
            ))}
            {/* Text */}
            <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.55 }}
                style={{ height: "1px", width: "110px", margin: "0 auto 18px",
                         background: `linear-gradient(90deg, transparent, ${ip.accentColor}90, transparent)` }}
              />
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.38 }}
                style={{ fontSize: "0.58rem", letterSpacing: "0.38em", textTransform: "uppercase",
                         color: `${ip.accentColor}75`, fontFamily: "var(--font-geist-mono)", marginBottom: "16px" }}
              >
                Now entering
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.50, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700,
                         color: "var(--text-primary)", fontFamily: "var(--font-playfair), Georgia, serif",
                         letterSpacing: "0.05em", lineHeight: 1.2, marginBottom: "18px",
                         textShadow: `0 0 50px ${ip.accentColor}70, 0 0 100px ${ip.accentColor}30` }}
              >
                {ip.title}
              </motion.h3>
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.34, duration: 0.55 }}
                style={{ height: "1px", width: "110px", margin: "0 auto",
                         background: `linear-gradient(90deg, transparent, ${ip.accentColor}90, transparent)` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL BACKDROP + CONTENT ─────────────────────────────────────── */}
      <AnimatePresence>
        {project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
            style={{
              zIndex: 60,
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              background: "rgba(4,4,12,0.82)",
            }}
            onClick={onClose}
            aria-label="Close modal backdrop"
          >
            <BookSpread key={project.id} project={project} onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
