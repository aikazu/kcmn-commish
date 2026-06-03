export interface Project {
  id: string;
  title: string;
  category: "Landing Page" | "Web App" | "Dashboard" | "E-commerce";
  description: string;
  tech: string[];
  imageGradient: [string, string];
  span: "lg" | "md" | "sm";
  year: string;
  /** Short metric shown on the tile, e.g. "98 Lighthouse". */
  metric: string;
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "SaaS Analytics Platform",
    category: "Web App",
    description: "Dashboard analytics real-time dengan chart interaktif.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    imageGradient: ["#1F1F1F", "#C9A352"],
    span: "lg",
    year: "2026",
    metric: "12k MAU",
  },
  {
    id: "p2",
    title: "E-commerce Storefront",
    category: "E-commerce",
    description: "Toko online dengan payment gateway lokal.",
    tech: ["Next.js", "Stripe", "Sanity CMS"],
    imageGradient: ["#282828", "#E0BF6B"],
    span: "md",
    year: "2025",
    metric: "+38% konversi",
  },
  {
    id: "p3",
    title: "Brand Landing",
    category: "Landing Page",
    description: "Landing page untuk startup fintech.",
    tech: ["Next.js", "Framer Motion"],
    imageGradient: ["#121212", "#8A6F2D"],
    span: "md",
    year: "2025",
    metric: "100 Lighthouse",
  },
  {
    id: "p4",
    title: "Internal CRM",
    category: "Dashboard",
    description: "CRM internal dengan role-based access.",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    imageGradient: ["#1F1F1F", "#C9A352"],
    span: "sm",
    year: "2024",
    metric: "RBAC",
  },
  {
    id: "p5",
    title: "Portfolio Site",
    category: "Landing Page",
    description: "Portfolio personal dengan animasi orchestrated.",
    tech: ["Next.js", "Motion", "Lenis"],
    imageGradient: ["#282828", "#E0BF6B"],
    span: "sm",
    year: "2024",
    metric: "Award-listed",
  },
  {
    id: "p6",
    title: "Booking System",
    category: "Web App",
    description: "Sistem booking dengan kalender real-time.",
    tech: ["Next.js", "Supabase", "Tailwind"],
    imageGradient: ["#121212", "#C9A352"],
    span: "sm",
    year: "2025",
    metric: "Real-time",
  },
];
