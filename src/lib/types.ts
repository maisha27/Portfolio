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
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
