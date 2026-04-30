import type { Project, SkillGroup } from "./types";

export const featuredProjects: Project[] = [
  {
    id: "r2r-care",
    title: "R2R Care",
    type: "Full Stack Web + Mobile System",
    role: "Full-stack developer working across admin, candidate, and family experiences",
    description:
      "A complex care management system where clients can hire qualified caregivers, manage services, and track every interaction — spanning a web admin panel, a candidate mobile app, and a family portal.",
    outcome: "Shipped as a real product used by active users across all three platforms.",
    features: [
      "Multi-role system: clients, candidates, and family portals",
      "Scheduling, invoicing, and service tracking in one platform",
      "Real-world deployment with active users across all three surfaces",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "Express.js", "AWS"],
    status: "live",
    links: {},
    media: {
      image: "/project-media/portfolio2_p27_img01.jpg",
      caption: "R2R Care dashboard and workflow interface",
    },
    screenshots: [
      "/project-media/portofolio2_p24_img01.png",
      "/project-media/portofolio2_p25_img01.png",
      "/project-media/portofolio2_p25_img02.png",
      "/project-media/portofolio2_p26_img01.png",
      "/project-media/portofolio2_p26_img02.png",
      "/project-media/portofolio_mobile_p11_img01.jpeg",
      "/project-media/portofolio_mobile_p12_img01.jpeg",
      "/project-media/portofolio_mobile_p13_img01.jpeg",
      "/project-media/portofolio_mobile_p14_img01.jpeg",
      "/project-media/portofolio_mobile_p17_img01.jpeg",
      "/project-media/portofolio_mobile_p18_img01.jpeg",
      "/project-media/portofolio_mobile_p19_img01.jpeg",
      "/project-media/portofolio_mobile_p20_img01.jpeg",
      "/project-media/portofolio_mobile_p21_img01.jpeg",
      "/project-media/portofolio_mobile_p22_img01.jpeg",
      "/project-media/portofolio_mobile_p23_img01.jpeg",
    ],
    screenshotGroups: [
      { label: "Web App", count: 5 },
      { label: "Candidate App", count: 4 },
      { label: "Family Portal", count: 7 },
    ],
    gradientFrom: "#1a0a2e",
    gradientTo: "#0d0620",
    accentColor: "#a78bfa",
  },
  {
    id: "campushub",
    title: "CampusHub",
    type: "Full Stack Web Application",
    role: "Product-minded full-stack builder focused on architecture and UX flow",
    description:
      "An educational management platform that streamlines communication and workflows between students, teachers, and administrators — designed from the ground up for real institutional scale.",
    outcome: "Delivered a scalable foundation with role-based dashboards and automated workflows.",
    features: [
      "Multi-dashboard system tailored to each user role",
      "Workflow automation cutting administrative overhead",
      "Designed for scalability with a clean system architecture",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    status: "development",
    links: {},
    media: {
      image: "/project-media/portfolio2_p28_img01.png",
      caption: "CampusHub role-based dashboard experience",
    },
    screenshots: [
      "/project-media/portofolio2_p22_img01.jpeg",
      "/project-media/portofolio2_p23_img01.jpeg",
      "/project-media/portofolio2_p23_img02.jpeg",
    ],
    gradientFrom: "#061a2e",
    gradientTo: "#040f1d",
    accentColor: "#60a5fa",
  },
  {
    id: "digital-nexgen",
    title: "Digital NexGen",
    type: "Client Web Project",
    role: "Lead Designer & Full-Stack Developer collaborating with stakeholders on delivery",
    description:
      "A professional web presence built for a digital service agency — crafted during my role as a Lead Designer & Full-Stack Developer and deployed live for a real client.",
    outcome: "Designed and developed the initial end-to-end platform for Digital NexGen, focusing on a clean, professional aesthetic for their digital services. This project involved creating a custom user dashboard and a streamlined UI/UX to enhance client engagement. Note: The visuals shown represent the original V1.0 design as delivered.",
    features: [
      "Business-focused design with strong brand alignment",
      "Live deployment handling real client traffic",
      "Custom CMS integration for non-technical content management",
    ],
    tech: ["React", "Next.js", "PHP", "MySQL"],
    status: "live",
    links: {
      live: "https://www.digitalnexgen.co/",
    },
    media: {
      image: "/project-media/portfolio2_p29_img01.png",
      caption: "Digital NexGen client website preview",
    },
    screenshots: [
      "/project-media/portofolio2_p10_img01.png",
      "/project-media/portofolio2_p10_img02.png",
      "/project-media/portofolio2_p11_img01.jpeg",
      "/project-media/portofolio2_p11_img02.jpeg",
      "/project-media/portofolio2_p11_img03.png",
    ],
    gradientFrom: "#1f0f00",
    gradientTo: "#120800",
    accentColor: "#fbbf24",
  },
];

export const otherProjects: Project[] = [
  {
    id: "islamic-bookstore",
    title: "Islamic Bookstore",
    type: "Full Stack Web App",
    role: "Independent developer and designer",
    description:
      "Independently designed and developed a full-stack bookstore platform. Won 1st place in a university web development competition.",
    outcome: "Won 1st place in a university web development competition.",
    features: ["Independent UI/UX design", "Competition winner", "Live GitHub deployment"],
    tech: ["React", "Node.js", "MySQL"],
    status: "live",
    links: {},
    media: {
      image: "/project-media/portfolio2_p30_img01.png",
      caption: "Islamic Bookstore interface preview",
    },
    screenshots: [
      "/project-media/portofolio2_p02_img02.jpeg",
      "/project-media/portofolio2_p02_img01.jpeg",
      "/project-media/portofolio2_p03_img01.jpeg",
      "/project-media/portofolio2_p03_img02.jpeg",
      "/project-media/portofolio2_p03_img03.jpeg",
    ],
    gradientFrom: "#0a1f1a",
    gradientTo: "#050f0d",
    accentColor: "#34d399",
  },
  {
    id: "greenagro",
    title: "GreenAgro",
    type: "Mobile App",
    role: "Mobile developer for accessibility-focused agri-tech solution",
    description:
      "IoT-based agriculture support app with voice accessibility in Bangla and English, built for farmers with minimal tech familiarity.",
    outcome: "Improved usability for low-tech users through bilingual voice-first flows.",
    features: ["IoT sensor integration", "Bilingual voice interface", "Accessibility-first design"],
    tech: ["React Native", "IoT", "Node.js"],
    status: "completed",
    links: {},
    media: {
      image: "/project-media/portfolio2_p31_img01.png",
      caption: "GreenAgro mobile interaction screen",
    },
    screenshots: [
      "/project-media/portofolio_mobile_p07_img01.png",
      "/project-media/portofolio_mobile_p08_img01.png",
      "/project-media/portofolio_mobile_p09_img01.png"
    ],
    gradientFrom: "#0a1a06",
    gradientTo: "#050e03",
    accentColor: "#86efac",
  },
  {
    id: "wanderlog",
    title: "WanderLog",
    type: "Mobile App",
    role: "React Native developer focused on map and journaling experience",
    description:
      "A travel logging app with map integration and personal journaling — built for the experience of recording and revisiting journeys.",
    outcome: "Created an engaging travel memory experience with rich map interactions.",
    features: ["Interactive map integration", "Personal journey journaling", "Rich media UI"],
    tech: ["React Native", "Maps API"],
    status: "completed",
    links: {},
    media: {
      image: "/project-media/portfolio2_p33_img01.png",
      caption: "WanderLog travel journaling screen",
    },
    screenshots: [
      "/project-media/portofolio_mobile_p02_img01.jpeg",
      "/project-media/portofolio_mobile_p02_img02.jpeg",
      "/project-media/portofolio_mobile_p03_img01.jpeg",
    ],
    gradientFrom: "#05161f",
    gradientTo: "#030d14",
    accentColor: "#22d3ee",
  },
  {
    id: "haya-lumiere",
    title: "Haya Lumiere",
    type: "Mobile E-Commerce App",
    role: "Flutter developer with product UI focus",
    description:
      "An elegant e-commerce app for abaya fashion, focused on a refined UI and smooth end-to-end shopping experience.",
    outcome: "Delivered a premium commerce flow with smooth browsing-to-checkout journeys.",
    features: ["Firebase-powered backend", "Elegant product presentation", "Smooth cart and checkout flow"],
    tech: ["Flutter", "Firebase"],
    status: "completed",
    links: {},
    media: {
      image: "/project-media/portfolio2_p32_img01.png",
      caption: "Haya Lumiere product browsing experience",
    },
    screenshots: [
      "/project-media/portofolio_mobile_p04_img01.jpeg",
      "/project-media/portofolio_mobile_p05_img01.jpeg",
      "/project-media/portofolio_mobile_p05_img02.jpeg",
    ],
    gradientFrom: "#1f0510",
    gradientTo: "#110209",
    accentColor: "#fb7185",
  },
  {
    id: "learnconnect",
    title: "LearnConnect",
    type: "UI/UX Case Study",
    role: "UI/UX designer and design-system builder",
    description:
      "A complete platform design in Figma — comprehensive user flows, component system, and UX strategy. Design-only, not yet developed.",
    outcome: "Produced a development-ready design system and end-to-end product blueprint.",
    features: ["Complete UX system in Figma", "Component library & design tokens", "Full user flow documentation"],
    tech: ["Figma", "Design Systems"],
    status: "completed",
    links: {},
    media: {
      image: "/project-media/portfolio2_p34_img01.png",
      caption: "LearnConnect UX and interface concept",
    },
    screenshots: [
      "/project-media/portofolio2_p19_img01.jpeg",
      "/project-media/portofolio2_p20_img01.jpeg",
      "/project-media/portofolio2_p21_img01.jpeg",
      "/project-media/portofolio2_p21_img02.png"
    ],
    gradientFrom: "#150a1f",
    gradientTo: "#0a0512",
    accentColor: "#c084fc",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "MySQL", "Supabase", "PostgreSQL"],
  },
  {
    category: "Mobile",
    skills: ["React Native", "Flutter"],
  },
  {
    category: "Design",
    skills: ["Figma", "UI/UX Systems", "Prototyping"],
  },
  {
    category: "Cloud & Tools",
    skills: ["AWS", "Firebase", "Git", "REST APIs"],
  },
];

export const social = {
  email: "mnanjeeba@gmail.com",
  github: "https://github.com/maisha27",
  behance: "https://www.behance.net/maishananjeeba96",
  linkedin: "https://www.linkedin.com/in/maisha-nanjeeba-a32591298/",
};

export const brandPillars = [
  "Design-minded engineering",
  "Real users over toy projects",
  "Clear, collaborative delivery",
];

export const recruiterSignals = [
  "Built and shipped real products, not only tutorials",
  "Comfortable across frontend, backend, mobile, and UX",
  "Able to explain technical decisions in business language",
];
