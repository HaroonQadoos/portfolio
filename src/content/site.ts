// Single source for all portfolio copy. Edit values here; components read from it.

export const profile = {
  name: "Haroon Qadoos",
  firstName: "Haroon",
  lastName: "Qadoos",
  role: "Full Stack Engineer",
  headline: "I build fast storefronts and web apps that convert.",
  summary:
    "Full Stack Engineer with 1 year of hands-on experience shipping Shopify stores, Webflow sites and Next.js applications — from pixel-perfect UI to the APIs and databases behind it.",
  yearsOfExperience: "1+",
  available: true,
  email: "haroonriaz034@gmail.com",
  resume: "/resume.pdf",
  socials: {
    github: "https://github.com/haroonqadoos",
    linkedin: "https://www.linkedin.com/in/haroonqadoos",
  },
} as const;

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export type Service = {
  title: string;
  description: string;
  tags: string[];
  /** Preview shown floating beside the open row. */
  image?: string;
};

export const services: Service[] = [
  {
    title: "Full Stack Development",
    description:
      "Production web apps with Next.js, TypeScript and MongoDB — typed end to end, server-rendered and deployed on Vercel.",
    tags: ["Next.js", "Server Actions", "Mongo DB", "REST & GraphQL"],
    image: "/projects/protocole.jpg",
  },
  {
    title: "Shopify Development",
    description:
      "Custom Online Store 2.0 themes, Liquid sections, app integrations and storefront speed work that lifts conversion.",
    tags: ["Liquid", "Theme 2.0", "Storefront API", "Metafields"],
    image: "/projects/bavastudios.jpg",
  },
  {
    title: "Webflow Development",
    description:
      "Pixel-perfect Webflow builds with CMS collections, Interactions and clean class systems clients can edit themselves.",
    tags: ["Webflow CMS", "Interactions", "Client-first", "SEO"],
    image: "/projects/knights-of-repair.jpg",
  },
  {
    title: "Performance & SEO",
    description:
      "Core Web Vitals audits, image and script optimisation, structured data and technical SEO fixes across any stack.",
    tags: ["Core Web Vitals", "Lighthouse", "Schema.org", "Analytics"],
    image: "/projects/fitcandylabs.jpg",
  },
];

export type SkillGroup = { title: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui", "HTML & CSS"],
  },
  {
    title: "Backend & Platforms",
    skills: ["Node.js", "Server Actions", "REST APIs", "Shopify Liquid", "Shopify Storefront API", "Webflow CMS", "Resend"],
  },
  {
    title: "Database & DevOps",
    skills: ["Mongo DB", "Drizzle ORM", "Vercel", "Git & GitHub", "GitHub Actions"],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Path under /public, e.g. "/projects/storefront.webp". A generated preview is shown when omitted. */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "protocole",
    title: "Protocole",
    category: "Full Stack",
    description: "Full stack web app built with Next.js and MongoDB, from UI to API routes and data layer.",
    highlights: ["Next.js App Router", "MongoDB data layer", "Live in production"],
    tags: ["Next.js", "MongoDB", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://theprotocole.com/",
    image: "/projects/protocole.jpg",
  },
  {
    slug: "ai-code-reviewer",
    title: "AI Code Reviewer",
    category: "Full Stack",
    description: "Web app that reviews submitted code with AI and returns feedback on bugs, style and improvements.",
    highlights: ["AI-generated code feedback", "Paste code, get a review"],
    tags: ["React", "Node.js", "AI"],
    repoUrl: "https://github.com/HaroonQadoos/AI-Code-Reviewer",
  },
  {
    slug: "realtime-tracker",
    title: "Real Time Device Tracker",
    category: "Full Stack",
    description: "Tracks connected devices live on a map, pushing location updates to every viewer in real time.",
    highlights: ["Live location over WebSockets", "Multiple devices on one map"],
    tags: ["Node.js", "Socket.io", "Maps"],
    repoUrl: "https://github.com/HaroonQadoos/RealTimeTracker",
  },
  {
    slug: "chitchat",
    title: "ChitChat",
    category: "Full Stack",
    description: "Real-time chat application with instant messaging between users.",
    highlights: ["Instant message delivery", "Real-time updates over WebSockets"],
    tags: ["Node.js", "Socket.io", "MongoDB"],
    repoUrl: "https://github.com/HaroonQadoos/ChitChat",
  },
  {
    slug: "bavastudios",
    title: "BavaStudios",
    category: "Shopify",
    description: "Shopify store built and customised for the BavaStudios brand.",
    highlights: ["Custom theme sections", "Responsive storefront"],
    tags: ["Shopify", "Liquid", "JavaScript"],
    liveUrl: "https://bavastudios.com/",
    image: "/projects/bavastudios.jpg",
  },
  {
    slug: "fitcandylabs",
    title: "FitCandyLabs",
    category: "Shopify",
    description: "Shopify storefront for FitCandyLabs with custom sections and product pages.",
    highlights: ["Custom product pages", "Responsive storefront"],
    tags: ["Shopify", "Liquid", "JavaScript"],
    liveUrl: "https://fitcandylabs.com/",
    image: "/projects/fitcandylabs.jpg",
  },
  {
    slug: "ablabs",
    title: "AbLabs",
    category: "Shopify",
    description: "UK Shopify store for AbLabs, customised theme and storefront.",
    highlights: ["Theme customisation", "Responsive storefront"],
    tags: ["Shopify", "Liquid", "JavaScript"],
    liveUrl: "https://ablabsonline.co.uk/",
    image: "/projects/ablabs.jpg",
  },
  {
    slug: "alexie-of-athens",
    title: "Alexie of Athens",
    category: "Shopify",
    description: "Shopify store for the Alexie of Athens brand with a custom-styled storefront.",
    highlights: ["Theme customisation", "Responsive storefront"],
    tags: ["Shopify", "Liquid", "JavaScript"],
    liveUrl: "https://www.alexieofathens.com/",
    image: "/projects/alexie-of-athens.jpg",
  },
  {
    slug: "knights-of-repair",
    title: "Knights of Repair",
    category: "Webflow",
    description: "Webflow site for Knights of Repair with CMS-driven content and responsive layouts.",
    highlights: ["Webflow CMS", "Responsive layouts"],
    tags: ["Webflow", "CMS", "SEO"],
    liveUrl: "https://www.knightsofrepair.com/",
    image: "/projects/knights-of-repair.jpg",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  tags: string[];
  links?: { label: string; url: string }[];
  /** Preview that follows the cursor while hovering the row. */
  image?: string;
};

export const experience: Experience[] = [
  {
    company: "EcommerceSteem",
    image: "/projects/protocole.jpg",
    role: "Full Stack Developer",
    period: "2025 — 2026",
    achievements: [
      "Built Protocole, a full stack Next.js app backed by MongoDB.",
      "Developed an AI Code Reviewer, a Real Time Device Tracker and ChitChat, a real-time chat app.",
      "Built and customised Shopify stores for BavaStudios, FitCandyLabs, AbLabs and Alexie of Athens.",
      "Developed the Knights of Repair site on Webflow.",
    ],
    tags: ["Next.js", "MongoDB", "Node.js", "Socket.io", "Shopify", "Liquid", "Webflow"],
    links: [
      { label: "Protocole", url: "https://theprotocole.com/" },
      { label: "AI Code Reviewer", url: "https://github.com/HaroonQadoos/AI-Code-Reviewer" },
      { label: "Real Time Device Tracker", url: "https://github.com/HaroonQadoos/RealTimeTracker" },
      { label: "ChitChat", url: "https://github.com/HaroonQadoos/ChitChat" },
      { label: "BavaStudios", url: "https://bavastudios.com/" },
      { label: "FitCandyLabs", url: "https://fitcandylabs.com/" },
      { label: "AbLabs", url: "https://ablabsonline.co.uk/" },
      { label: "Alexie of Athens", url: "https://www.alexieofathens.com/" },
      { label: "Knights of Repair", url: "https://www.knightsofrepair.com/" },
    ],
  },
  {
    company: "Freelance & Agency Projects",
    image: "/projects/alexie-of-athens.jpg",
    role: "Shopify & Webflow Developer",
    period: "2025 — Now",
    achievements: [
      "Built and customised Shopify themes with Liquid, metafields and app integrations for e-commerce brands.",
      "Designed and developed Webflow sites with CMS collections, Interactions and SEO-ready structure.",
      "Improved Core Web Vitals and fixed technical SEO issues across client storefronts.",
    ],
    tags: ["Shopify", "Liquid", "Webflow", "SEO"],
  },
  {
    company: "Independent",
    image: "/projects/fitcandylabs.jpg",
    role: "Full Stack Engineer",
    period: "2025 — Now",
    achievements: [
      "Shipped Next.js apps with Server Actions, PostgreSQL and typed APIs, deployed on Vercel.",
      "Integrated Shopify and Webflow APIs into custom dashboards and automations.",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
];

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
