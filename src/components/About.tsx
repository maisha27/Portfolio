"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { recruiterSignals, skillGroups } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-20 sm:py-32 relative" aria-label="About">
      {/* Warm ambient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(201,162,39,0.025) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="flex items-center gap-4 mb-6 sm:mb-10"
        >
          <div className="h-px w-8" style={{ background: "rgba(201,162,39,0.35)" }} />
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}
          >
            About Me
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Bio */}
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.05}
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 sm:mb-8 leading-tight"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Connecting design,
              <br />
              code, and{" "}
              <em
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(90deg, #c9a227, #d4760a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                real impact
              </em>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1}
              className="leading-[1.85] mb-5"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "1.05rem",
              }}
            >
              I&apos;m a passionate problem-solver who connects design, development, and real-world
              needs to build meaningful digital products. I have experience working on full-stack
              systems, mobile apps, and UI/UX design, and I enjoy creating intuitive and impactful
              user experiences.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.15}
              className="leading-[1.85]"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "1.05rem",
              }}
            >
              Whether I&apos;m architecting a backend service, crafting a design system, or building
              a mobile interface — I bring the same care for craft, clarity, and the end user to
              everything I ship.
            </motion.p>

            {/* Recruiter signals — styled like a bookplate */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.2}
              className="mt-6 sm:mt-8 p-4 sm:p-6 relative"
              style={{
                background: "rgba(245,220,170,0.06)",
                border: "1px solid rgba(201,162,39,0.22)",
              }}
            >
              {/* Corner ornaments */}
              {[
                { t: 0, l: 0, style: { borderTop: "1px solid rgba(201,162,39,0.32)", borderLeft: "1px solid rgba(201,162,39,0.32)" } },
                { t: 0, r: 0, style: { borderTop: "1px solid rgba(201,162,39,0.32)", borderRight: "1px solid rgba(201,162,39,0.32)" } },
                { b: 0, l: 0, style: { borderBottom: "1px solid rgba(201,162,39,0.32)", borderLeft: "1px solid rgba(201,162,39,0.32)" } },
                { b: 0, r: 0, style: { borderBottom: "1px solid rgba(201,162,39,0.32)", borderRight: "1px solid rgba(201,162,39,0.32)" } },
              ].map((c, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4"
                  style={{
                    top: c.t !== undefined ? 0 : undefined,
                    bottom: (c as { b?: number }).b !== undefined ? 0 : undefined,
                    left: c.l !== undefined ? 0 : undefined,
                    right: (c as { r?: number }).r !== undefined ? 0 : undefined,
                    ...c.style,
                  }}
                />
              ))}

              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-4"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}
              >
                Recruiter-ready proof
              </p>
              <ul className="space-y-3">
                {recruiterSignals.map((signal) => (
                  <li key={signal} className="flex gap-3">
                    <span
                      className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-lora), Georgia, serif",
                        fontSize: "0.97rem",
                        lineHeight: "1.7",
                      }}
                    >
                      {signal}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right: Skills — library catalog style */}
          <div className="space-y-7">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.category}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.1 + i * 0.06}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2 h-px" style={{ background: "rgba(201,162,39,0.45)" }} />
                  <p
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}
                  >
                    {group.category}
                  </p>
                  <div className="flex-1 h-px" style={{ background: "rgba(201,162,39,0.07)" }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm transition-all duration-250 cursor-default"
                      style={{
                        background: "rgba(245,220,170,0.025)",
                        border: "1px solid rgba(201,162,39,0.1)",
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-lora), Georgia, serif",
                        borderRadius: "2px",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.32)";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(201,162,39,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.1)";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(245,220,170,0.025)";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
