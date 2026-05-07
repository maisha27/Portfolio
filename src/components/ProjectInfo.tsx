"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

const BODY_TEXT = "#ddc9a8";

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

interface ProjectInfoProps {
  project: Project;
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  const ac = project.accentColor;
  const features = project.keyFeatures ?? project.features;

  return (
    <div className="flex flex-col gap-5 md:h-full overflow-y-auto p-5 sm:p-7 md:p-8">

      {/* Headline / Problem Statement */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
        {project.headline ? (
          <div>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ color: `${ac}80`, fontFamily: "var(--font-geist-mono)" }}
            >
              Problem Statement
            </p>
            <h3
              className="text-xl sm:text-2xl font-bold leading-tight mb-3"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                background: `linear-gradient(135deg, var(--text-primary) 30%, ${ac} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {project.headline}
            </h3>
            {project.impactStatement && (
              <p
                style={{
                  color: BODY_TEXT,
                  fontFamily: "var(--font-lora), Georgia, serif",
                  fontSize: "1.05rem",
                  lineHeight: "1.85",
                }}
              >
                {project.impactStatement}
              </p>
            )}
          </div>
        ) : (
          <div>
            <p
              className="text-[10px] tracking-[0.25em] uppercase mb-3"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}
            >
              About
            </p>
            <p
              style={{
                color: BODY_TEXT,
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "1.02rem",
                lineHeight: "1.90",
              }}
            >
              {project.description}
            </p>
          </div>
        )}
      </motion.div>

      <div className="h-px" style={{ background: `${ac}14` }} />

      {/* Key Features / What It Does */}
      {features.length > 0 && (
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.12}>
          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-3"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}
          >
            What It Does
          </p>
          <div className="space-y-2.5">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span
                  className="flex-shrink-0"
                  style={{
                    color: ac,
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.8rem",
                    marginTop: "3px",
                  }}
                >
                  →
                </span>
                <p
                  style={{
                    color: BODY_TEXT,
                    fontFamily: "var(--font-lora), Georgia, serif",
                    fontSize: "1rem",
                    lineHeight: "1.70",
                  }}
                >
                  {f}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Outcome — fallback when no headline */}
      {!project.headline && project.outcome && (
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.22}>
          <div className="h-px mb-5" style={{ background: `${ac}14` }} />
          <div
            className="p-4"
            style={{
              background: "rgba(245,220,170,0.07)",
              border: "1px solid rgba(201,162,39,0.22)",
            }}
          >
            <p
              className="text-[10px] tracking-[0.25em] uppercase mb-2"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}
            >
              Outcome
            </p>
            <p
              style={{
                color: BODY_TEXT,
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "0.97rem",
                lineHeight: "1.78",
              }}
            >
              {project.outcome}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
