"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { social } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

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

/* Grand arch decoration above the CTA */
function GrandArch() {
  return (
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] h-[160px] pointer-events-none"
      aria-hidden
    >
      <svg viewBox="0 0 280 160" fill="none" className="w-full h-full opacity-[0.35]">
        <path
          d="M18 160 L18 90 Q18 16 140 16 Q262 16 262 90 L262 160"
          stroke="rgba(201,162,39,0.35)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M44 160 L44 96 Q44 42 140 42 Q236 42 236 96 L236 160"
          stroke="rgba(201,162,39,0.15)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="140" cy="52" r="20" stroke="rgba(201,162,39,0.25)" strokeWidth="1" fill="rgba(201,162,39,0.03)" />
        <circle cx="140" cy="52" r="11" stroke="rgba(201,162,39,0.14)" strokeWidth="1" fill="none" />
        <circle cx="140" cy="52" r="4" fill="rgba(201,162,39,0.1)" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={140 + 4 * Math.cos(rad)}
              y1={52 + 4 * Math.sin(rad)}
              x2={140 + 11 * Math.cos(rad)}
              y2={52 + 11 * Math.sin(rad)}
              stroke="rgba(201,162,39,0.1)"
              strokeWidth="1"
            />
          );
        })}
        {/* Petal circles */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={`p${i}`}
              cx={140 + 15.5 * Math.cos(rad)}
              cy={52 + 15.5 * Math.sin(rad)}
              r="3.5"
              stroke="rgba(201,162,39,0.1)"
              strokeWidth="1"
              fill="none"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="py-36 relative overflow-hidden" aria-label="Contact">
      <GrandArch />

      {/* Warm ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,162,39,0.045) 0%, transparent 65%)" }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative pt-12">
        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="h-px w-12" style={{ background: "rgba(201,162,39,0.3)" }} />
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}
          >
            Get In Touch
          </p>
          <div className="h-px w-12" style={{ background: "rgba(201,162,39,0.3)" }} />
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.07}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Let&apos;s build something
          <br />
          <em
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #c9a227 0%, #d4760a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            together.
          </em>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.12}
          className="max-w-lg mx-auto mb-12"
          style={{
            color: "var(--text-secondary)",
            lineHeight: "1.85",
            fontFamily: "var(--font-lora), Georgia, serif",
            fontSize: "1.1rem",
          }}
        >
          I&apos;m open to full-time roles, freelance projects, and interesting collaborations.
          If you have an idea or opportunity — I&apos;d love to hear from you.
        </motion.p>

        {/* Email CTA */}
        <motion.a
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.17}
          href={`mailto:${social.email}`}
          className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl mb-14"
          style={{
            background: "linear-gradient(135deg, rgba(201,162,39,0.9), rgba(172,110,8,0.85))",
            color: "#0d0802",
            fontFamily: "var(--font-playfair), Georgia, serif",
            letterSpacing: "0.04em",
            boxShadow: "0 0 40px rgba(201,162,39,0.14)",
            borderRadius: "2px",
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {social.email}
        </motion.a>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.22}
          className="flex items-center justify-center gap-7"
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
              className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              <Icon />
              <span
                className="hidden sm:inline text-sm"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 mt-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: "rgba(201,162,39,0.07)" }} />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1 L7 4.5 L11 6 L7 7.5 L6 11 L5 7.5 L1 6 L5 4.5 Z"
              fill="rgba(201,162,39,0.15)"
              stroke="rgba(201,162,39,0.2)"
              strokeWidth="0.5"
            />
          </svg>
          <div className="flex-1 h-px" style={{ background: "rgba(201,162,39,0.07)" }} />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-lora), Georgia, serif",
              fontStyle: "italic",
            }}
          >
            © 2025 Maisha Nanjeeba — Designed &amp; Built with care
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}
          >
            Next.js · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </section>
  );
}
