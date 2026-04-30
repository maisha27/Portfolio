"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { otherProjects } from "@/lib/data";
import type { Project } from "@/lib/types";
import BookModal from "@/components/BookModal";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

function BookCard({ project, delay, index, onOpen }: { project: Project; delay: number; index: number; onOpen: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      whileHover={{ rotateY: -4, x: 5, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="group relative flex flex-col"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
      style={{ cursor: "pointer",
        background: "var(--bg-card)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(201,162,39,0.18)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.32), 0 2px 6px rgba(0,0,0,0.18)",
        transformPerspective: 900,
        transformOrigin: "left center",
      }}
    >
      {/* ── BOOK SPINE — left edge ───────────────────────────────── */}
      <div
        className="absolute top-0 left-0 bottom-0 w-[14px] z-10"
        style={{
          background: `linear-gradient(180deg,
            ${project.accentColor}55 0%,
            ${project.accentColor}20 40%,
            ${project.accentColor}18 60%,
            ${project.accentColor}42 100%)`,
          boxShadow: `inset -5px 0 12px rgba(0,0,0,0.55), inset 2px 0 4px rgba(255,255,255,0.05), 3px 0 10px rgba(0,0,0,0.35)`,
          borderRight: `1px solid ${project.accentColor}28`,
        }}
      >
        {/* Embossed spine ribs — alternating highlight + shadow pairs */}
        {[18, 38, 58, 78].flatMap((pct) => [
          <div
            key={`${pct}-h`}
            className="absolute inset-x-0"
            style={{
              top: `${pct}%`, height: "2px",
              background: "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.06) 100%)",
            }}
          />,
          <div
            key={`${pct}-s`}
            className="absolute inset-x-0 h-px"
            style={{ top: `calc(${pct}% + 2px)`, background: "rgba(0,0,0,0.28)" }}
          />,
        ])}
        {/* Foil strip */}
        <div
          aria-hidden
          style={{
            position: "absolute", left: "2px", right: "2px", top: "40%",
            height: "14px",
            background: `linear-gradient(135deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.10) 40%, ${project.accentColor}28 60%, rgba(255,255,255,0.00) 100%)`,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(0,0,0,0.18)",
          }}
        />
        {/* Chapter number — vertical */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.12em",
              color: `${project.accentColor}55`,
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── PAGE EDGE LINES — right side ────────────────────────── */}
      {[3, 6, 9].map((right, i) => (
        <div
          key={right}
          className="absolute top-4 bottom-4 w-px pointer-events-none z-10"
          style={{
            right: `${right}px`,
            background: `rgba(245,220,170,${0.045 - i * 0.013})`,
          }}
        />
      ))}

      {/* ── COVER: image ────────────────────────────────────────── */}
      {project.media?.image && (
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "1 / 1",
            marginLeft: "14px",
            borderBottom: "1px solid rgba(201,162,39,0.07)",
            background: `linear-gradient(160deg, ${project.gradientFrom}a0 0%, ${project.gradientTo}c8 100%)`,
          }}
        >
          <Image
            src={project.media.image}
            alt={`${project.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="object-contain"
          />
          {/* Subtle bottom fade into card body */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${project.gradientTo}b0 0%, transparent 18%)`,
            }}
          />
        </div>
      )}

      {/* ── CONTENT ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col p-5" style={{ paddingLeft: "calc(14px + 1.25rem)" }}>
        {/* Type */}
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-2"
          style={{ color: `${project.accentColor}75`, fontFamily: "var(--font-geist-mono)" }}
        >
          {project.type}
        </p>

        {/* Title */}
        <h3
          className="text-lg font-bold mb-3 leading-tight"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="flex-1 mb-5 leading-relaxed"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-lora), Georgia, serif",
            fontSize: "0.95rem",
            lineHeight: "1.72",
          }}
        >
          {project.description}
        </p>

        {/* Features */}
        <ul className="space-y-1.5 mb-5">
          {project.features.slice(0, 2).map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span
                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: project.accentColor }}
              />
              <span
                style={{
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-lora), Georgia, serif",
                  fontSize: "0.87rem",
                  lineHeight: "1.6",
                }}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid rgba(201,162,39,0.07)" }}
        >
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs"
                style={{
                  color: "var(--text-secondary)",
                  background: "rgba(245,220,170,0.02)",
                  border: "1px solid rgba(201,162,39,0.08)",
                  fontFamily: "var(--font-geist-mono)",
                  borderRadius: "2px",
                }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span
                className="px-2 py-0.5 text-xs"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}
              >
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors duration-200"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-geist-mono)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = project.accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                onClick={(e) => e.stopPropagation()}
              >
                ↗ Visit
              </a>
            )}
            {project.links.figma && !project.links.live && (
              <a
                href={project.links.figma}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors duration-200"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-geist-mono)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = project.accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                onClick={(e) => e.stopPropagation()}
              >
                ↗ Figma
              </a>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onOpen(); }}
              className="text-xs transition-colors duration-200"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-geist-mono)" }}
              aria-label={`Open ${project.title} details`}
              onMouseEnter={(e) => (e.currentTarget.style.color = project.accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Details →
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function OtherProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section className="py-24 relative" aria-label="Other projects">
      {/* Ornamental section divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-24">
          <div className="flex-1 h-px" style={{ background: "rgba(201,162,39,0.08)" }} />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 2 L10.3 6.8 L16 9 L10.3 11.2 L9 16 L7.7 11.2 L2 9 L7.7 6.8 Z"
              fill="none"
              stroke="rgba(201,162,39,0.22)"
              strokeWidth="1"
            />
          </svg>
          <div className="flex-1 h-px" style={{ background: "rgba(201,162,39,0.08)" }} />
        </div>
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 gap-4">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-6" style={{ background: "rgba(201,162,39,0.35)" }} />
              <p
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}
              >
                From the Shelves
              </p>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.05}
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              More things I&apos;ve built
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
            href="https://github.com/maisha27"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-sm transition-colors duration-200 hidden sm:block"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-lora), Georgia, serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            GitHub →
          </motion.a>
        </div>

        {/* Bookshelf grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, i) => (
            <BookCard
              key={project.id}
              project={project}
              delay={i * 0.06}
              index={i}
              onOpen={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      <BookModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
