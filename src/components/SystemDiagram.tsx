"use client";

import { motion } from "framer-motion";
import type { DiagramNode } from "@/lib/types";

interface SystemDiagramProps {
  title: string;
  nodes: DiagramNode[];
  connections: Array<{ from: number; to: number }>;
  accentColor: string;
}

export default function SystemDiagram({ title, nodes, accentColor }: SystemDiagramProps) {
  const ac = accentColor;

  const nodeStyle = (role: DiagramNode["role"]): React.CSSProperties => {
    const map: Record<DiagramNode["role"], React.CSSProperties> = {
      user:     { background: `${ac}12`, border: `1.5px solid ${ac}55` },
      system:   { background: `${ac}22`, border: `1.5px solid ${ac}80` },
      service:  { background: `${ac}17`, border: `1.5px solid ${ac}65` },
      database: { background: `${ac}10`, border: `1.5px dashed ${ac}45` },
    };
    return map[role];
  };

  return (
    <div>
      <p
        className="text-[10px] tracking-[0.25em] uppercase mb-5"
        style={{ color: `${ac}70`, fontFamily: "var(--font-geist-mono)" }}
      >
        {title}
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: i * 0.09,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center px-4 py-3 rounded min-w-[88px] text-center"
            style={nodeStyle(node.role)}
          >
            {node.icon && (
              <span className="text-xl mb-1.5" aria-hidden="true">
                {node.icon}
              </span>
            )}
            <p
              className="font-medium"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.72rem",
                lineHeight: "1.3",
              }}
            >
              {node.label}
            </p>
            <p
              className="capitalize mt-0.5"
              style={{
                color: `${ac}60`,
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.6rem",
              }}
            >
              {node.role}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Flow direction indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: nodes.length * 0.09 + 0.15 }}
        className="flex justify-center items-center gap-1.5 mt-5"
        style={{
          color: `${ac}45`,
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
        }}
      >
        <span>data flow</span>
        <span>→</span>
      </motion.div>
    </div>
  );
}
