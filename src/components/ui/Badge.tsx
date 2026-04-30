"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "tech" | "status-live" | "status-dev" | "status-done" | "featured";
}

export default function Badge({ children, variant = "tech" }: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    tech: {
      background: "rgba(245,220,170,0.025)",
      color: "var(--text-secondary)",
      border: "1px solid rgba(201,162,39,0.1)",
    },
    "status-live": {
      background: "rgba(154,184,122,0.08)",
      color: "#9ab87a",
      border: "1px solid rgba(154,184,122,0.22)",
    },
    "status-dev": {
      background: "rgba(201,162,39,0.08)",
      color: "var(--accent)",
      border: "1px solid rgba(201,162,39,0.25)",
    },
    "status-done": {
      background: "rgba(160,128,96,0.08)",
      color: "#a08060",
      border: "1px solid rgba(160,128,96,0.22)",
    },
    featured: {
      background: "rgba(201,162,39,0.07)",
      color: "var(--accent)",
      border: "1px solid rgba(201,162,39,0.22)",
    },
  };

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium"
      style={{
        ...styles[variant],
        fontFamily: "var(--font-geist-mono)",
        borderRadius: "2px",
      }}
    >
      {children}
    </span>
  );
}
