package com.ashutosh.portfolio.config;

import com.ashutosh.portfolio.model.*;
import com.ashutosh.portfolio.service.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProjectService projectService;
    private final ExperienceService experienceService;
    private final SkillService skillService;
    private final GlobalConfigService globalConfigService;
    private final BlogPostService blogPostService;
    private final TestimonialService testimonialService;

    public DataSeeder(ProjectService projectService,
                      ExperienceService experienceService,
                      SkillService skillService,
                      GlobalConfigService globalConfigService,
                      BlogPostService blogPostService,
                      TestimonialService testimonialService) {
        this.projectService = projectService;
        this.experienceService = experienceService;
        this.skillService = skillService;
        this.globalConfigService = globalConfigService;
        this.blogPostService = blogPostService;
        this.testimonialService = testimonialService;
    }

    @Override
    public void run(String... args) throws Exception {
        if (globalConfigService.getAllConfig().isEmpty()) {
            System.out.println(">>> Starting Data Seeding for PostgreSQL...");
            seedConfig();
            seedSkills();
            seedProjects();
            seedExperience();
            seedTestimonials();
            seedBlogs();
            System.out.println(">>> Data Seeding Completed Successfully.");
        }
    }

    private void seedConfig() {
        List<GlobalConfig> configs = Arrays.asList(
            createConfig("NAME", "Ashutosh Dwivedi", "The site owner name"),
            createConfig("ROLE", "Software Developer specialized in Backend Development", "Primary job title"),
            createConfig("HERO_TITLE", "Code that feels designed.", "Main headline on home page"),
            createConfig("HERO_BADGE", "Available for new projects", "Status badge text"),
            createConfig("ABOUT_HEADLINE", "Engineering that actually ships.", "Heading on About page"),
            createConfig("ABOUT_BIO", "Hey, I'm Ashutosh Dwivedi, a **Backend Engineer** based in India who thrives on solving complex **architectural challenges**. Specializing in **Java**, **Spring Boot**, and **Microservices**, I engineer **performant, resilient distributed systems** designed to handle **production-scale concurrency** and deliver **secure, enterprise-grade solutions**.", "Short biography"),
            createConfig("EMAIL", "ashutosh.dwivedi604@gmail.com", "Contact email"),
            createConfig("GITHUB_URL", "https://github.com/ashutosh-explorer", "Github profile link"),
            createConfig("LINKEDIN_URL", "https://www.linkedin.com/in/ashutosh-dwivedi-451b96256/", "LinkedIn profile link"),
            createConfig("MEDIUM_URL", "https://medium.com/@akumardwivedi77", "Medium blog profile link"),
            createConfig("REDDIT_URL", "https://www.reddit.com/user/AshuCode/", "Reddit profile link"),
            createConfig("LEETCODE_URL", "https://leetcode.com/u/akdwivediofficial/", "LeetCode profile link"),
            createConfig("CODECHEF_URL", "https://www.codechef.com/users/akdwivedi_01", "CodeChef profile link")
        );
        globalConfigService.saveAll(configs);
    }

    private GlobalConfig createConfig(String key, String value, String desc) {
        GlobalConfig c = new GlobalConfig();
        c.setKey(key);
        c.setValue(value);
        c.setDescription(desc);
        return c;
    }

    private void seedSkills() {
        // Backend
        skillService.saveSkill(createSkill("Java", "Backend", "java", 1));
        skillService.saveSkill(createSkill("C++", "Backend", "cpp", 2));
        skillService.saveSkill(createSkill("JavaScript", "Backend", "javascript", 3));
        skillService.saveSkill(createSkill("Go", "Backend", "go", 4));
        skillService.saveSkill(createSkill("Python", "Backend", "python", 5));
        
        // Frameworks
        skillService.saveSkill(createSkill("Spring Boot", "Backend", "springboot", 6));
        skillService.saveSkill(createSkill("Spring Security", "Backend", "springsecurity", 7));
        skillService.saveSkill(createSkill("Hibernate", "Backend", "hibernate", 8));
        skillService.saveSkill(createSkill("Node.js", "Backend", "nodejs", 9));
        skillService.saveSkill(createSkill("Express.js", "Backend", "express", 10));
        
        // Data
        skillService.saveSkill(createSkill("MySQL", "Backend", "mysql", 11));
        skillService.saveSkill(createSkill("PostgreSQL", "Backend", "postgresql", 12));
        skillService.saveSkill(createSkill("MongoDB", "Backend", "mongodb", 13));
        skillService.saveSkill(createSkill("Redis", "Backend", "redis", 14));
        skillService.saveSkill(createSkill("ElasticSearch", "Backend", "elasticsearch", 15));
        
        // DevOps
        skillService.saveSkill(createSkill("Docker", "DevOps", "docker", 16));
        skillService.saveSkill(createSkill("Kubernetes", "DevOps", "k8s", 17));
        skillService.saveSkill(createSkill("Grafana", "DevOps", "grafana", 18));
        skillService.saveSkill(createSkill("Datadog", "DevOps", "datadog", 19));
        
        // Tools
        skillService.saveSkill(createSkill("DSA", "Tools", "dsa", 20));
        skillService.saveSkill(createSkill("System Design", "Tools", "system-design", 21));
    }

    private Skill createSkill(String name, String cat, String icon, int order) {
        Skill s = new Skill();
        s.setName(name);
        s.setCategory(cat);
        s.setIcon(icon);
        s.setDisplayOrder(order);
        return s;
    }

    private void seedProjects() {
        Project p1 = new Project();
        p1.setTitle("Inventory Management System");
        p1.setSlug("inventory-management-system");
        p1.setDescription("A RESTful API for managing inventory — products, stock levels, and order tracking — built with Node.js and JavaScript.");
        p1.setCoverImage("/images/projects/inventory.png");
        p1.setGithubUrl("https://github.com/akdwivedi-explorer/User-Managment-System");
        p1.setLiveUrl("https://user-managment-system-frontend-self.vercel.app/login");
        p1.setTags(Arrays.asList("Javascript", "Node.js", "Express.js", "REST APIs"));
        p1.setFeatured(true);
        p1.setStatus("completed");
        p1.setYear(2023);
        p1.setDisplayOrder(1);
        projectService.saveProject(p1);

        Project p2 = new Project();
        p2.setTitle("Task Manager");
        p2.setSlug("task-manager");
        p2.setDescription("A task management web application supporting task creation, assignment, prioritization, and status tracking.");
        p2.setCoverImage("/images/projects/taskmanager.png");
        p2.setGithubUrl("https://github.com/akdwivedi-explorer/task_manager");
        p2.setTags(Arrays.asList("Javascript", "Node.js", "Express.js"));
        p2.setFeatured(true);
        p2.setStatus("completed");
        p2.setYear(2023);
        p2.setDisplayOrder(2);
        projectService.saveProject(p2);

        Project p3 = new Project();
        p3.setTitle("Restaurant Management System");
        p3.setSlug("restaurant-management-system");
        p3.setDescription("A scalable backend system modelling real-world restaurant operations — covering customers, menus, orders, and payments.");
        p3.setCoverImage("/images/projects/restaurant.png");
        p3.setGithubUrl("https://github.com/akdwivedi-explorer/restaurant-management");
        p3.setTags(Arrays.asList("Spring Boot", "Spring MVC", "Spring Security", "Java", "Docker", "Maven"));
        p3.setFeatured(true);
        p3.setStatus("in-progress");
        p3.setYear(2025);
        p3.setDisplayOrder(3);
        projectService.saveProject(p3);
    }

    private void seedExperience() {
        Experience e1 = new Experience();
        e1.setRole("Software Engineer (Backend)");
        e1.setCompany("PharmEasy");
        e1.setCompanyUrl("https://pharmeasy.in");
        e1.setCurrent(true);
        e1.setStartDate(LocalDate.of(2025, 12, 11));
        e1.setDescription("Backend Software Engineer at PharmEasy, working to create a world-class health-tech experience.");
        e1.setHighlights(Arrays.asList(
            "Migrated 6+ PHP APIs to Spring Boot",
            "Built Golang (Chi) traffic proxy",
            "Improved service decoupling",
            "Supported canary releases via Docker & K8s"
        ));
        e1.setDisplayOrder(1);
        experienceService.saveExperience(e1);

        Experience e2 = new Experience();
        e2.setRole("Associate Software Engineer Intern");
        e2.setCompany("Accenture");
        e2.setCompanyUrl("https://accenture.com");
        e2.setCurrent(false);
        e2.setStartDate(LocalDate.of(2025, 5, 19));
        e2.setEndDate(LocalDate.of(2025, 7, 11));
        e2.setDescription("Contributed to automation tooling and data quality pipelines for EPM reporting.");
        e2.setHighlights(Arrays.asList(
            "Reduced manual review time by 60%",
            "Cut batch execution from 1hr to 10min",
            "Built Python Excel error-detection tool",
            "Automated real-time email failure alerts"
        ));
        e2.setDisplayOrder(2);
        experienceService.saveExperience(e2);
    }

    private void seedTestimonials() {
        Testimonial t1 = new Testimonial();
        t1.setAuthorName("Aniket Kumar");
        t1.setAuthorRole("Software Engineer at PharmEasy");
        t1.setContent("Ashutosh worked under me to help with a critical PHP to Spring Boot migration. His ability to decouple complex legacy logic into clean microservices saved us months.");
        t1.setDisplayOrder(1);
        testimonialService.saveTestimonial(t1);

        Testimonial t2 = new Testimonial();
        t2.setAuthorName("Chandan Kumar");
        t2.setAuthorRole("Technical Lead at PharmEasy | Ex-Paytm");
        t2.setContent("I've worked with many backend engineers, but few have Ashutosh's grasp of distributed systems. He didn't just fix our scaling issues; he re-architected for the future.");
        t2.setDisplayOrder(2);
        testimonialService.saveTestimonial(t2);

        Testimonial t3 = new Testimonial();
        t3.setAuthorName("Kamna Dubey");
        t3.setAuthorRole("Software Engineer at PTC Softwares");
        t3.setContent("Building high-performance systems requires a blend of technical mastery and solid methodology. Working with Ashutosh was a seamless experience in both areas.");
        t3.setDisplayOrder(3);
        testimonialService.saveTestimonial(t3);
    }

    private void seedBlogs() {
        BlogPost b1 = new BlogPost();
        b1.setTitle("How an API Request Travels Through a Microservices System");
        b1.setSlug("how-api-request-travels-microservices");
        b1.setSummary("A practical walkthrough of how an HTTP request flows through the layers of a Spring Boot microservice \u2014 from Client to Controller, Service, Repository, and Database.");
        b1.setPublishedAt(LocalDateTime.now());
        b1.setReadTimeMinutes(4);
        b1.setTags(Arrays.asList("microservices", "backend", "spring-boot"));
        b1.setMediumUrl("https://medium.com/@akumardwivedi77/how-an-api-request-travels-through-a-microservices-system-8ca61d9b2d61");
        b1.setContent("# How an API Request Travels Through a Microservices System\n\nEver wondered what really happens when you hit an endpoint? Behind a simple \"200 OK\" lies a meticulously orchestrated journey through multiple architectural layers...");
        blogPostService.saveBlogPost(b1);

        BlogPost b2 = new BlogPost();
        b2.setTitle("Password Hashing");
        b2.setSlug("password-hashing-deep-dive");
        b2.setSummary("A deep dive into why passwords must be hashed and how 'Salting' protects users from credential theft.");
        b2.setPublishedAt(LocalDateTime.now());
        b2.setReadTimeMinutes(8);
        b2.setTags(Arrays.asList("security", "backend", "data-security", "information-security"));
        b2.setMediumUrl("https://medium.com/@akumardwivedi77/password-hashing-d6f067886b64");
        b2.setContent("# Password Hashing: More Than Just Security\n\n\u201cDo not store your password in DB without hashing it.\u201d We\u2019ve all heard it, but do we truly understand the *why*? As a backend developer, understanding the mechanics is key...");
        blogPostService.saveBlogPost(b2);
    }
}
