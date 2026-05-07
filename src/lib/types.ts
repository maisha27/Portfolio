export interface Project {
  id: string;
  title: string;
  type: string;
  role: string;
  description: string;
  outcome: string;
  features: string[];
  tech: string[];
  status: "live" | "development" | "completed";
  media?: {
    image?: string;
    pdf?: string;
    caption?: string;
  };
  links: {
    live?: string;
    github?: string;
    playStore?: string;
    appStore?: string;
    figma?: string;
  };
  screenshots?: string[];
  screenshotGroups?: Array<{ label: string; count: number }>;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;

  // Brand language fields
  headline?: string;
  impactStatement?: string;
  problemStatementShort?: string;
  keyFeatures?: string[];
  processSteps?: ProcessStep[];
  systemDiagram?: SystemDiagramData;
}

export interface ProcessStep {
  title: string;
  description?: string;
  order: number;
}

export interface DiagramNode {
  label: string;
  icon?: string;
  role: "user" | "system" | "service" | "database";
}

export interface SystemDiagramData {
  title: string;
  nodes: DiagramNode[];
  connections: Array<{ from: number; to: number }>;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
