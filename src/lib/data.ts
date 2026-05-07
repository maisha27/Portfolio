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
    headline: "Care Platform for Everyone",
    impactStatement: "Connects qualified caregivers with families, reducing hiring friction while ensuring quality care.",
    problemStatementShort: "Finding reliable caregivers is fragmented and inefficient; families need a single trusted platform.",
    keyFeatures: [
      "Multi-role dashboards (clients, candidates, families)",
      "Real-time scheduling & invoicing",
      "Active production use with real users",
    ],
    processSteps: [
      { title: "Client Registration", order: 1 },
      { title: "Candidate Vetting", order: 2 },
      { title: "Scheduling & Matching", order: 3 },
      { title: "Service Delivery & Tracking", order: 4 },
      { title: "Invoicing & Payments", order: 5 },
    ],
    systemDiagram: {
      title: "Platform Architecture",
      nodes: [
        { label: "Clients", role: "user", icon: "👥" },
        { label: "Web Dashboard", role: "system", icon: "🖥️" },
        { label: "Matching Engine", role: "service", icon: "⚙️" },
        { label: "Candidates", role: "user", icon: "✨" },
        { label: "Families", role: "user", icon: "👨‍👩‍👧" },
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
      ],
    },
    tech: ["Next.js", "TypeScript", "Node.js", "Express.js", "AWS"],
    status: "live",
    links: {},
    media: {
      image: "/project-media/portfolio2_p27_img01.jpg",
      caption: "R2R Care dashboard and workflow interface",
    },
    screenshots: [
      "/project-media/r2rcare_web_mockup1.png",
      "/project-media/r2rcare_web_mockup2.png",
      "/project-media/r2rcare_web_mockup3.png",
      "/project-media/r2rcare_web_mockup4.png",
      "/project-media/r2rcare_web_mockup5.png",
      "/project-media/r2rcare_candidate_mockup1.png",
      "/project-media/r2rcare_candidate_mockup2.png",
      "/project-media/r2rcare_candidate_mockup3.png",
      "/project-media/r2rcare_candidate_mockup4.png",
      "/project-media/r2rcare_family_mockup1.png",
      "/project-media/r2rcare_family_mockup2.png",
      "/project-media/r2rcare_family_mockup3.png",
      "/project-media/r2rcare_family_mockup4.png",
      "/project-media/r2rcare_family_mockup5.png",
      "/project-media/r2rcare_family_mockup6.png",
      "/project-media/r2rcare_family_mockup7.png",
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
    headline: "Institution Workflows at Scale",
    impactStatement: "Removes administrative friction between students, teachers, and administrators through role-based dashboards and automation.",
    problemStatementShort: "Educational institutions struggle with fragmented communication and repetitive administrative tasks.",
    keyFeatures: [
      "Role-based dashboard system",
      "Workflow automation reducing overhead",
      "Scalable architecture from day one",
    ],
    processSteps: [
      { title: "User Role Setup", order: 1 },
      { title: "Dashboard Customization", order: 2 },
      { title: "Workflow Automation", order: 3 },
      { title: "Communication Hub", order: 4 },
    ],
    systemDiagram: {
      title: "Institution Ecosystem",
      nodes: [
        { label: "Students", role: "user", icon: "📚" },
        { label: "Teachers", role: "user", icon: "👨‍🏫" },
        { label: "Admins", role: "user", icon: "⚙️" },
        { label: "Dashboard", role: "system", icon: "📊" },
        { label: "Workflow Engine", role: "service", icon: "🔄" },
      ],
      connections: [
        { from: 0, to: 3 },
        { from: 1, to: 3 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    status: "development",
    links: {},
    media: {
      image: "/project-media/portfolio2_p28_img01.png",
      caption: "CampusHub role-based dashboard experience",
    },
    screenshots: [
      "/project-media/CampusHub_mockup1.jpg",
      "/project-media/CampusHub_mockup2.jpg",
      "/project-media/CampusHub_mockup3.jpg",
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
    headline: "Digital Services Excellence",
    impactStatement: "Establishes strong brand presence and client engagement for a digital service agency through professional design.",
    problemStatementShort: "Digital agencies need web presence that reflects their expertise and builds client trust.",
    keyFeatures: [
      "Business-focused design",
      "Live client deployment",
      "Custom CMS for content management",
    ],
    processSteps: [
      { title: "Brand Discovery", order: 1 },
      { title: "UI/UX Design", order: 2 },
      { title: "Development & CMS Integration", order: 3 },
      { title: "Live Deployment", order: 4 },
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
      "/project-media/DiginexGen_Mockup1.png",
      "/project-media/DiginexGen_Mockup2.png",
      "/project-media/DiginexGen_Mockup3.png",
      "/project-media/DiginexGen_Mockup4.png",
      "/project-media/DiginexGen_Mockup5.png",
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
    headline: "E-Commerce with Heart",
    impactStatement: "Built a full-stack bookstore that won university recognition by combining thoughtful UX with independent design.",
    problemStatementShort: "Students needed a simple, elegant way to discover and purchase Islamic literature.",
    keyFeatures: [
      "Independent UI/UX design",
      "University competition winner",
      "GitHub Pages deployment",
    ],
    tech: ["React", "Node.js", "MySQL"],
    status: "live",
    links: {},
    media: {
      image: "/project-media/portfolio2_p30_img01.png",
      caption: "Islamic Bookstore interface preview",
    },
    screenshots: [
      "/project-media/Islamic_bookstore_mockup1.png",
      "/project-media/Islamic_bookstore_mockup2.png",
      "/project-media/Islamic_bookstore_mockup3.png",
      "/project-media/Islamic_bookstore_mockup4.png",
      "/project-media/Islamic_bookstore_mockup5.png",
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
    headline: "Voice-First Farming",
    impactStatement: "Makes agricultural IoT technology accessible to non-tech farmers through Bangla voice interface and bilingual support.",
    problemStatementShort: "Farmers with minimal tech familiarity lack accessible tools for IoT-based crop management.",
    keyFeatures: [
      "Bilingual voice interface (Bangla + English)",
      "IoT sensor integration",
      "Accessibility-first design",
    ],
    processSteps: [
      { title: "Farmer Onboarding", order: 1 },
      { title: "Voice Command Interface", order: 2 },
      { title: "IoT Sensor Data Collection", order: 3 },
      { title: "Actionable Insights", order: 4 },
    ],
    systemDiagram: {
      title: "Voice-First IoT System",
      nodes: [
        { label: "Farmer", role: "user", icon: "👨‍🌾" },
        { label: "Voice Interface", role: "system", icon: "🎤" },
        { label: "IoT Sensors", role: "service", icon: "📡" },
        { label: "Analytics", role: "service", icon: "📊" },
        { label: "Insights", role: "database", icon: "💡" },
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    tech: ["React Native", "IoT", "Node.js"],
    status: "completed",
    links: {},
    media: {
      image: "/project-media/portfolio2_p31_img01.png",
      caption: "GreenAgro mobile interaction screen",
    },
    screenshots: [
      "/project-media/greenagro_mockup1.png",
      "/project-media/greenagro_mockup2.png",
      "/project-media/greenagro_mockup3.png"
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
    headline: "Travel Memories Reimagined",
    impactStatement: "Creates an engaging travel logging experience where map interactions and journaling combine to preserve precious memories.",
    problemStatementShort: "Travelers want more than just photo albums; they need to reconnect with the story of their journeys.",
    keyFeatures: [
      "Interactive map integration",
      "Personal journey journaling",
      "Rich media presentation",
    ],
    tech: ["React Native", "Maps API"],
    status: "completed",
    links: {},
    media: {
      image: "/project-media/portfolio2_p33_img01.png",
      caption: "WanderLog travel journaling screen",
    },
    screenshots: [
      "/project-media/wanderLog_mockup1.png",
      "/project-media/wanderLog_mockup2.png",
      "/project-media/wanderLog_mockup3.png",
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
    headline: "Premium E-Commerce Elegance",
    impactStatement: "Delivers a refined shopping experience for luxury fashion through smooth navigation, elegant design, and frictionless checkout.",
    problemStatementShort: "Premium e-commerce apps need to balance visual appeal with seamless user flows.",
    keyFeatures: [
      "Firebase-powered backend",
      "Elegant product presentation",
      "Smooth browsing-to-checkout",
    ],
    tech: ["Flutter", "Firebase"],
    status: "completed",
    links: {},
    media: {
      image: "/project-media/portfolio2_p32_img01.png",
      caption: "Haya Lumiere product browsing experience",
    },
    screenshots: [
      "/project-media/haya_lumiere_mockup1.png",
      "/project-media/haya_lumiere_mockup2.png",
      "/project-media/haya_lumiere_mockup3.png",
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
    headline: "Design System from Scratch",
    impactStatement: "Establishes a complete design foundation and product blueprint ready for development teams to build with confidence.",
    problemStatementShort: "Education platforms need comprehensive design systems that scale and maintain consistency.",
    keyFeatures: [
      "Complete UX in Figma",
      "Reusable component library",
      "Development-ready documentation",
    ],
    processSteps: [
      { title: "User Research & Flows", order: 1 },
      { title: "Component Design", order: 2 },
      { title: "Design System Documentation", order: 3 },
      { title: "Handoff to Development", order: 4 },
    ],
    tech: ["Figma", "Design Systems"],
    status: "completed",
    links: {},
    media: {
      image: "/project-media/portfolio2_p34_img01.png",
      caption: "LearnConnect UX and interface concept",
    },
    screenshots: [
      "/project-media/LearnConnect_mockup1.png",
      "/project-media/LearnConnect_mockup2.png",
      "/project-media/LearnConnect_mockup3.png",
      "/project-media/LearnConnect_mockup4.png"
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
  "Empathy-driven problem solving",
  "Accessible by default",
  "Real users, real impact",
];

export const recruiterSignals = [
  "Shipped production systems solving real problems",
  "Bridge between design and development with accessibility focus",
  "Empathy and UX at the core of every decision",
];
