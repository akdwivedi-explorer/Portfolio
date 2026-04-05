// ============================================================
// All TypeScript types for the portfolio
// ============================================================

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  coverImage: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  featured: boolean;
  displayOrder: number;
  status: "completed" | "in-progress" | "planned";
  year: number;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string; // ISO date string
  endDate?: string;  // null = current
  isCurrent: boolean;
  description: string;
  highlights: string[];
  displayOrder: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown
  coverImage?: string;
  publishedAt: string; // ISO date string
  tags: string[];
  readTimeMinutes: number;
  mediumUrl?: string;
  claps?: string;
  views?: string;
}

export interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  summary: string;
  coverImage?: string;
  publishedAt: string;
  tags: string[];
  readTimeMinutes: number;
  mediumUrl?: string;
  claps?: string;
  views?: string;
}

export interface Testimonial {
  id: number;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  content: string;
  displayOrder: number;
}

export interface UsesItem {
  id: number;
  category: "Hardware" | "Software" | "Productivity" | "DevTools";
  name: string;
  description: string;
  url?: string;
  displayOrder: number;
}

export interface Skill {
  id: number;
  name: string;
  iconUrl: string;
  category: "Frontend" | "Backend" | "DevOps" | "Tools";
  displayOrder: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Comment {
  id: number;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string; // ISO date string from backend
  blogPostSlug: string;
  approved: boolean;
  parentCommentId?: number;
  replies?: Comment[]; // For the recursive UI
}

