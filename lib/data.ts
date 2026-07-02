export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export type Skill = {
  name: string;
  category: string;
};

// ─── Brand constants ───────────────────────────────────────────────────────────
export const BRAND = {
  name: "ASad Rana",
  initials: "AR",
  tagline: "Creative Developer",
  email: "hello@asadrana.dev",
  github: "https://github.com/asadrana",
  twitter: "https://twitter.com/asadrana",
  linkedin: "https://linkedin.com/in/asadrana",
} as const;

// ─── Navigation (single source of truth) ──────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Hire Me",
  href: "#contact",
};
