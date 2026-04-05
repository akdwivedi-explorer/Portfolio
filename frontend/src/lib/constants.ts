export const SITE_CONFIG = {
  name: "Ashutosh Dwivedi",
  title: "Ashutosh Dwivedi — Software Developer specialized in Backend Development",
  description:
    "Software Developer specialized in Backend Development at PharmEasy, building robust and scalable health-tech systems with Java Spring Boot and modern microservices architecture.",
  url: "https://ashutoshdwivedi.in",
  email: "ashutosh.dwivedi604@gmail.com",
  github: "https://github.com/ashutosh-explorer",
  linkedin: "https://www.linkedin.com/in/ashutosh-dwivedi-451b96256/",
  reddit: "https://www.reddit.com/user/AshuCode/",
  medium: "https://medium.com/@akumardwivedi77",
  leetcode: "https://leetcode.com/u/akdwivediofficial/",
  codechef: "https://www.codechef.com/users/akdwivedi_01",
  location: "India",
  role: "Software Developer specialized in Backend Development",
  ogImage: "/og-image.png",
};

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Uses", href: "/uses" },
];

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api";

export const GISCUS_CONFIG = {
  repo: "ashutoshdwivedi/portfolio" as `${string}/${string}`,
  repoId: "YOUR_REPO_ID",       // Update after creating GitHub repo
  category: "Comments",
  categoryId: "YOUR_CATEGORY_ID", // Update after setting up Giscus
  mapping: "pathname" as const,
  theme: "dark" as const,
};
