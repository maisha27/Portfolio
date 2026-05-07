"use client";

import { motion } from "framer-motion";
import type { ProcessStep } from "@/lib/types";

interface ProcessFlowProps {
  steps: ProcessStep[];
  accentColor: string;
}

export default function ProcessFlow({ steps, accentColor }: ProcessFlowProps) {
  const ac = accentColor;

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <motion.div
            key={step.order}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex gap-4"
          >
            {/* Left column: circle + connector line */}
            <div className="flex flex-col items-center flex-shrink-0" style={{ width: "32px" }}>
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold flex-shrink-0"
                style={{
                  background: `${ac}15`,
                  color: ac,
                  border: `1.5px solid ${ac}`,
                  fontFamily: "var(--font-geist-mono)",
                  lineHeight: 1,
                }}
              >
                {step.order}
              </div>
              {!isLast && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.1 + 0.15, duration: 0.3 }}
                  className="w-px flex-1 my-1"
                  style={{
                    background: `${ac}28`,
                    transformOrigin: "top",
                    minHeight: "20px",
                  }}
                />
              )}
            </div>

            {/* Right column: content */}
            <div className={`flex-1 ${isLast ? "pb-0" : "pb-4"}`}>
              <h4
                className="font-semibold"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "0.95rem",
                  lineHeight: "2rem",
                }}
              >
                {step.title}
              </h4>
              {step.description && (
                <p
                  className="mt-0.5"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-lora), Georgia, serif",
                    fontSize: "0.875rem",
                    lineHeight: "1.65",
                  }}
                >
                  {step.description}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
