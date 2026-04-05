import type {
  Project,
  Experience,
  BlogPostSummary,
  BlogPost,
  Testimonial,
  UsesItem,
  Skill,
} from "@/types";

// ============================================================
// PORTFOLIO DATA
// ============================================================

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Inventory Management System",
    slug: "inventory-management-system",
    description:
      "A RESTful API for managing inventory — products, stock levels, and order tracking — built with Node.js and JavaScript.",
    coverImage: "/images/projects/inventory.png",
    liveUrl: "https://user-managment-system-frontend-self.vercel.app/login",
    githubUrl: "https://github.com/akdwivedi-explorer/User-Managment-System",
    tags: ["Javascript", "Node.js", "Express.js", "REST APIs"],
    featured: true,
    displayOrder: 1,
    status: "completed",
    year: 2023,
  },
  {
    id: 2,
    title: "Task Manager",
    slug: "task-manager",
    description:
      "A task management web application supporting task creation, assignment, prioritization, and status tracking.",
    coverImage: "/images/projects/taskmanager.png",
    githubUrl: "https://github.com/akdwivedi-explorer/task_manager",
    tags: ["Javascript", "Node.js", "Express.js"],
    featured: true,
    displayOrder: 2,
    status: "completed",
    year: 2023,
  },
  {
    id: 3,
    title: "Restaurant Management System",
    slug: "restaurant-management-system",
    description:
      "A scalable backend system modelling real-world restaurant operations — covering customers, menus, food catalog, orders, payments, reservations, and table management.",
    coverImage: "/images/projects/restaurant.png",
    githubUrl: "https://github.com/akdwivedi-explorer/restaurant-management",
    tags: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA", "Java", "Docker", "JUnit 5", "Maven"],
    featured: true,
    displayOrder: 3,
    status: "in-progress",
    year: 2025,
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Software Engineer (Backend)",
    company: "PharmEasy",
    companyUrl: "https://pharmeasy.in",
    isCurrent: true,
    startDate: "2025-12-11",
    description:
      "Backend Software Engineer at PharmEasy, working to create a world-class health-tech experience through robust and scalable backend engineering.",
    highlights: [
      "Migrated 6+ PHP APIs to Spring Boot",
      "Built Golang (Chi) traffic proxy",
      "Improved service decoupling",
      "Supported canary releases via Docker & K8s",
    ],
    displayOrder: 1,
  },
  {
    id: 2,
    role: "Associate Software Engineer Intern",
    company: "Accenture",
    companyUrl: "https://accenture.com",
    isCurrent: false,
    startDate: "2025-05-19",
    endDate: "2025-07-11",
    description:
      "Contributed to automation tooling and data quality pipelines for EPM reporting at Accenture.",
    highlights: [
      "Reduced manual review time by 60%",
      "Cut batch execution from 1hr to 10min",
      "Built Python Excel error-detection tool",
      "Automated real-time email failure alerts",
    ],
    displayOrder: 2,
  },
];

export const BLOG_POSTS: BlogPostSummary[] = [
  {
    id: 1,
    title: "How an API Request Travels Through a Microservices System",
    slug: "how-api-request-travels-microservices",
    summary:
      "A practical walkthrough of how an HTTP request flows through the layers of a Spring Boot microservice — from Client to Controller, Service, Repository, and Database.",
    coverImage: "/images/blog/api-travel.png",
    publishedAt: "2026-01-06T00:00:00Z",
    tags: ["microservices", "spring-boot", "backend", "system-design"],
    readTimeMinutes: 4,
    mediumUrl: "https://medium.com/@akumardwivedi77/how-an-api-request-travels-through-a-microservices-system-8ca61d9b2d61",
    claps: "3+",
    views: "30+",
  },
  {
    id: 2,
    title: "Password Hashing",
    slug: "password-hashing-deep-dive",
    summary:
      "A deep dive into why passwords must be hashed, the fundamental difference between encryption and hashing, and how 'Salting' protects users from sophisticated Rainbow Table attacks even after a data breach.",
    coverImage: "/images/blog/password-hashing.png",
    publishedAt: "2026-02-24T00:00:00Z",
    tags: ["security", "information-security", "data-security", "backend"],
    readTimeMinutes: 8,
    mediumUrl: "https://medium.com/@akumardwivedi77/password-hashing-d6f067886b64",
    claps: "0",
    views: "20+",
  },
];

export const USES_ITEMS: UsesItem[] = [
  {
    id: 1,
    category: "Hardware",
    name: "MacBook Pro 14\" M3 Pro",
    description: "Primary machine for backend development and microservices orchestration.",
    displayOrder: 1,
  },
  {
    id: 2,
    category: "Software",
    name: "IntelliJ IDEA",
    description: "Go-to IDE for Java and Spring Boot development.",
    displayOrder: 2,
  },
  {
    id: 3,
    category: "Software",
    name: "VS Code",
    description: "For frontend work and quick script editing.",
    displayOrder: 3,
  },
  {
    id: 4,
    category: "Software",
    name: "GoLand",
    description: "Powerful IDE for Golang services.",
    displayOrder: 4,
  },
  {
    id: 5,
    category: "Software",
    name: "WebStorm",
    description: "Specialized IDE for JavaScript/TypeScript heavy projects.",
    displayOrder: 5,
  },
  {
    id: 6,
    category: "Software",
    name: "Medis",
    description: "Intuitive GUI for Redis management.",
    displayOrder: 6,
  },
  {
    id: 7,
    category: "DevTools",
    name: "Docker",
    description: "Containerization tool for consistent deployments.",
    displayOrder: 7,
  },
  {
    id: 8,
    category: "DevTools",
    name: "Postman",
    description: "API testing and documentation platform.",
    displayOrder: 8,
  },
  {
    id: 9,
    category: "Productivity",
    name: "Notion",
    description: "Project planning and documentation space.",
    displayOrder: 9,
  },
];

// Expanded Tech Stack for Backend Mastery
export const SKILLS: Skill[] = [
  // Languages & Core
  { id: 1, name: "Java", iconUrl: "/icons/java.svg", category: "Backend", displayOrder: 1 },
  { id: 2, name: "C++", iconUrl: "/icons/cpp.svg", category: "Backend", displayOrder: 2 },
  { id: 3, name: "JavaScript", iconUrl: "/icons/javascript.svg", category: "Backend", displayOrder: 3 },
  { id: 4, name: "Go", iconUrl: "/icons/go.svg", category: "Backend", displayOrder: 4 },
  { id: 5, name: "Python", iconUrl: "/icons/python.svg", category: "Backend", displayOrder: 5 },
  
  // Frameworks
  { id: 6, name: "Spring Boot", iconUrl: "/icons/springboot.svg", category: "Backend", displayOrder: 6 },
  { id: 7, name: "Spring Security", iconUrl: "/icons/springsecurity.svg", category: "Backend", displayOrder: 7 },
  { id: 8, name: "Hibernate", iconUrl: "/icons/hibernate.svg", category: "Backend", displayOrder: 8 },
  { id: 9, name: "Node.js", iconUrl: "/icons/nodejs.svg", category: "Backend", displayOrder: 9 },
  { id: 10, name: "Express.js", iconUrl: "/icons/express.svg", category: "Backend", displayOrder: 10 },
  
  // Databases & Cache
  { id: 11, name: "MySQL", iconUrl: "/icons/mysql.svg", category: "Backend", displayOrder: 11 },
  { id: 12, name: "PostgreSQL", iconUrl: "/icons/postgresql.svg", category: "Backend", displayOrder: 12 },
  { id: 13, name: "MongoDB", iconUrl: "/icons/mongodb.svg", category: "Backend", displayOrder: 13 },
  { id: 14, name: "Redis", iconUrl: "/icons/redis.svg", category: "Backend", displayOrder: 14 },
  { id: 15, name: "ElasticSearch", iconUrl: "/icons/elasticsearch.svg", category: "Backend", displayOrder: 15 },
  
  // DevOps & Observability
  { id: 16, name: "Docker", iconUrl: "/icons/docker.svg", category: "DevOps", displayOrder: 16 },
  { id: 17, name: "Kubernetes", iconUrl: "/icons/k8s.svg", category: "DevOps", displayOrder: 17 },
  { id: 18, name: "Grafana", iconUrl: "/icons/grafana.svg", category: "DevOps", displayOrder: 18 },
  { id: 19, name: "Datadog", iconUrl: "/icons/datadog.svg", category: "DevOps", displayOrder: 19 },
  
  // System Design & CS Fundamentals
  { id: 20, name: "DSA", iconUrl: "/icons/dsa.svg", category: "Tools", displayOrder: 20 },
  { id: 21, name: "System Design", iconUrl: "/icons/system-design.svg", category: "Tools", displayOrder: 21 },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    authorName: "Aniket Kumar",
    authorRole: "Software Engineer at PharmEasy",
    content: "Ashutosh worked under me to help with a critical PHP to Spring Boot migration. His ability to decouple complex legacy logic into clean, scalable microservices saved us months of development time.",
    authorAvatar: "https://ui-avatars.com/api/?name=Aniket+Kumar&background=FF5C00&color=fff",
    displayOrder: 1,
  },
  {
    id: 2,
    authorName: "Chandan Kumar",
    authorRole: "Technical Lead at PharmEasy | Ex-Paytm",
    content: "I've worked with many backend engineers, but few have Ashutosh's grasp of distributed systems. He didn't just fix our scaling issues; he re-architected the system to be future-proof. He also handled our canary deployment changes for microservices with exceptional precision.",
    authorAvatar: "https://ui-avatars.com/api/?name=Chandan+Kumar&background=C5FF4D&color=000",
    displayOrder: 2,
  },
  {
    id: 3,
    authorName: "Kamna Dubey",
    authorRole: "Software Engineer at PTC Softwares",
    content: "Building high-performance systems requires a blend of technical mastery and solid methodology. Working with Ashutosh was a seamless experience in both areas.",
    authorAvatar: "https://ui-avatars.com/api/?name=Kamna+Dubey&background=2496ED&color=fff",
    displayOrder: 3,
  },
];

export const TECH_MARQUEE = [
  { name: "Java", id: "java" },
  { name: "C++", id: "cpp" },
  { name: "Spring Boot", id: "spring" },
  { name: "Go", id: "go" },
  { name: "Node.js", id: "nodejs" },
  { name: "PostgreSQL", id: "postgresql" },
  { name: "MySQL", id: "mysql" },
  { name: "Redis", id: "redis" },
  { name: "Docker", id: "docker" },
  { name: "Kubernetes", id: "k8s" },
  { name: "ElasticSearch", id: "elasticsearch" },
  { name: "Grafana", id: "grafana" },
  { name: "Datadog", id: "datadog" },
  { name: "Python", id: "python" },
  { name: "Hibernate", id: "hibernate" },
  { name: "React.js", id: "react" },
  { name: "Next.js", id: "nextjs" },
];

export const BLOG_POSTS_FULL: BlogPost[] = [
  {
    id: 1,
    title: "How an API Request Travels Through a Microservices System",
    slug: "how-api-request-travels-microservices",
    summary:
      "A practical walkthrough of how an HTTP request flows through the layers of a Spring Boot microservice — from Client to Controller, Service, Repository, and Database.",
    coverImage: "/images/blog/api-travel.png",
    publishedAt: "2026-01-06T00:00:00Z",
    tags: ["microservices", "spring-boot", "backend", "system-design"],
    readTimeMinutes: 4,
    mediumUrl: "https://medium.com/@akumardwivedi77/how-an-api-request-travels-through-a-microservices-system-8ca61d9b2d61",
    claps: "3+",
    views: "30+",
    content: `
# How an API Request Travels Through a Microservices System

Ever wondered what really happens when you hit an endpoint? Behind a simple "200 OK" lies a meticulously orchestrated journey through multiple architectural layers. In a production-grade Spring Boot microservice, this journey is designed for scalability, maintainability, and security.

## 1. The Controller: The Entry Gate
The journey starts when a client sends an HTTP request. The **Controller** is the first point of contact. Its primary job is to act as a traffic cop:
- **Mapping**: Routing the request to the correct method using annotations like \`@GetMapping\` or \`@PostMapping\`.
- **Validation**: Performing basic checks on the request body and parameters.
- **Security**: Triggering authentication and authorization filters.

*Crucially, the Controller contains no business logic. It simply delegates to the Service layer.*

## 2. The Service Layer: The Brains
This is where the real work happens. The **Service Layer** is where your business rules live. It coordinates complex operations and ensures data integrity:
- **Business Logic**: Applying rules specific to your application (e.g., "users must be 18 to order").
- **Orchestration**: Calling multiple repositories or even external services if needed.
- **Abstraction**: Often implemented using Interfaces and Implementations to allow for loose coupling and easier unit testing.

## 3. The Repository Layer: The Data Bridge
When the service decides it needs to talk to the database, it calls the **Repository Layer** (often using Spring Data JPA). This layer:
- **Abstraction**: Masks the complexity of SQL or NoSQL queries.
- **Data Access**: Performs the actual READ, WRITE, or UPDATE operations.
- **DAO Pattern**: Acts as a clean interface to your persistent storage.

## 4. The Database: The Final Destination
The **Database** executes the query and returns the raw data. 

## The Return Journey
Once the database responds, the data flows back **upward** through the same layers. Each layer has a chance to transform the data (often into DTOs) before the Controller finally sends a clean, formatted HTTP response back to the client.

---

*This is a simplified mental model. Real-world systems also involve filters, interceptors, circuit breakers, and distributed tracing. For the full deep dive with detailed diagrams, check out my original post on [Medium](https://medium.com/@akumardwivedi77/how-an-api-request-travels-through-a-microservices-system-8ca61d9b2d61).*
`,
  },
  {
    id: 2,
    title: "Password Hashing",
    slug: "password-hashing-deep-dive",
    summary:
      "A deep dive into why passwords must be hashed, the fundamental difference between encryption and hashing, and how 'Salting' protects users from sophisticated Rainbow Table attacks even after a data breach.",
    coverImage: "/images/blog/password-hashing.png",
    publishedAt: "2026-02-24T00:00:00Z",
    tags: ["security", "information-security", "data-security", "backend"],
    readTimeMinutes: 8,
    mediumUrl: "https://medium.com/@akumardwivedi77/password-hashing-d6f067886b64",
    claps: "0",
    views: "20+",
    content: `
# Password Hashing: More Than Just Security

“Do not store your password in DB without hashing it.” We’ve all heard it, but do we truly understand the *why*? As a backend developer, understanding the mechanics of hashing is the difference between a "vibe coder" and a true engineer.

## The Big Question: What if you're already breached?
Suppose your database is attacked and all data is leaked. Attackers now have emails, addresses, and mobile numbers. What did you achieve by storing the hashed password? 

The answer lies in **Credential Stuffing**. Over 60% of users reuse the same password across multiple sites. By hashing passwords, you ensure that even if *your* site is compromised, you aren't handing attackers the keys to the user's bank account or primary email. Hashing doesn't just protect your app; it protects your users' entire digital life.

## Hashing vs. Encryption
- **Encryption**: A two-way process. Like a lock on a door; you can lock it and later unlock it with a key.
- **Hashing**: A one-way mathematical function. It converts data into a fixed-length string that *cannot* be reversed. 

## The "Rainbow Table" Threat & Salting
Hackers use **Rainbow Tables**—pre-computed tables of common passwords and their corresponding hashes. To defeat this, we use **Salting**. 
Salting adds a unique, random string to the password *before* hashing. This ensures that even identical passwords produce different hashes, making pre-computed tables useless.

*Pro-tip: Never store your Salt in the database alongside the password. Use secure vaults like AWS KMS or HashiCorp Vault.*

## When to use Encryption instead?
For sensitive data that you *need* to read back (like phone numbers or addresses), use Encryption. But remember: encrypting everything makes querying difficult. Only encrypt what is strictly confidential.

---

*For the full technical breakdown and implementation patterns, check out the original article on [Medium](https://medium.com/@akumardwivedi77/password-hashing-d6f067886b64).*
`,
  },
];
