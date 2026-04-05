package com.ashutosh.portfolio.controller;

import com.ashutosh.portfolio.model.*;
import com.ashutosh.portfolio.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public")
@CrossOrigin(origins = "http://localhost:3000") // Next.js default port
public class PublicPortfolioController {

    private final ProjectService projectService;
    private final ExperienceService experienceService;
    private final TestimonialService testimonialService;
    private final BlogPostService blogPostService;
    private final SkillService skillService;
    private final GlobalConfigService globalConfigService;

    public PublicPortfolioController(ProjectService projectService,
                                     ExperienceService experienceService,
                                     TestimonialService testimonialService,
                                     BlogPostService blogPostService,
                                     SkillService skillService,
                                     GlobalConfigService globalConfigService) {
        this.projectService = projectService;
        this.experienceService = experienceService;
        this.testimonialService = testimonialService;
        this.blogPostService = blogPostService;
        this.skillService = skillService;
        this.globalConfigService = globalConfigService;
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getPortfolioData() {
        Map<String, Object> data = new java.util.HashMap<>();
        data.put("projects", projectService.getAllProjects());
        data.put("experience", experienceService.getAllExperiences());
        data.put("testimonials", testimonialService.getAllTestimonials());
        data.put("blogPosts", blogPostService.getAllBlogPosts());
        data.put("skills", skillService.getSkillsGroupedByCategory());
        data.put("config", globalConfigService.getAllConfig());
        return ResponseEntity.ok(data);
    }

    @GetMapping("/config")
    public ResponseEntity<Map<String, String>> getSiteConfig() {
        return ResponseEntity.ok(globalConfigService.getAllConfig());
    }

    @GetMapping("/skills")
    public ResponseEntity<Map<String, List<Skill>>> getSkills() {
        return ResponseEntity.ok(skillService.getSkillsGroupedByCategory());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/projects/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        return ResponseEntity.ok(projectService.getFeaturedProjects());
    }

    @GetMapping("/projects/{slug}")
    public ResponseEntity<Project> getProjectBySlug(@PathVariable String slug) {
        return projectService.getProjectBySlug(slug)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/experience")
    public ResponseEntity<List<Experience>> getAllExperiences() {
        return ResponseEntity.ok(experienceService.getAllExperiences());
    }

    @GetMapping("/testimonials")
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAllTestimonials());
    }

    @GetMapping("/blog")
    public ResponseEntity<List<BlogPost>> getAllBlogPosts() {
        return ResponseEntity.ok(blogPostService.getAllBlogPosts());
    }
}
