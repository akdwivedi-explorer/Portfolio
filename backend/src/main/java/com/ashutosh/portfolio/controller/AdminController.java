package com.ashutosh.portfolio.controller;

import com.ashutosh.portfolio.model.*;
import com.ashutosh.portfolio.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "http://localhost:3000") // Next.js default port
public class AdminController {

    private final ProjectService projectService;
    private final ExperienceService experienceService;
    private final TestimonialService testimonialService;
    private final BlogPostService blogPostService;
    private final CommentService commentService;
    private final SkillService skillService;
    private final GlobalConfigService globalConfigService;

    public AdminController(ProjectService projectService,
                           ExperienceService experienceService,
                           TestimonialService testimonialService,
                           BlogPostService blogPostService,
                           CommentService commentService,
                           SkillService skillService,
                           GlobalConfigService globalConfigService) {
        this.projectService = projectService;
        this.experienceService = experienceService;
        this.testimonialService = testimonialService;
        this.blogPostService = blogPostService;
        this.commentService = commentService;
        this.skillService = skillService;
        this.globalConfigService = globalConfigService;
    }

    // Site Configuration
    @GetMapping("/config")
    public ResponseEntity<Map<String, String>> getFullConfig() {
        return ResponseEntity.ok(globalConfigService.getAllConfig());
    }

    @PostMapping("/config")
    public ResponseEntity<GlobalConfig> updateConfig(@RequestBody GlobalConfig config) {
        return ResponseEntity.ok(globalConfigService.saveConfig(config));
    }

    // Project Management
    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        return ResponseEntity.ok(projectService.saveProject(project));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project) {
        project.setId(id);
        return ResponseEntity.ok(projectService.saveProject(project));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    // Experience Management
    @PostMapping("/experience")
    public ResponseEntity<Experience> createExperience(@RequestBody Experience experience) {
        return ResponseEntity.ok(experienceService.saveExperience(experience));
    }

    @DeleteMapping("/experience/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
        return ResponseEntity.noContent().build();
    }

    // Skill / Tech Stack Management
    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @PostMapping("/skills")
    public ResponseEntity<Skill> saveSkill(@RequestBody Skill skill) {
        return ResponseEntity.ok(skillService.saveSkill(skill));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }

    // Testimonial Management
    @PostMapping("/testimonials")
    public ResponseEntity<Testimonial> createTestimonial(@RequestBody Testimonial testimonial) {
        return ResponseEntity.ok(testimonialService.saveTestimonial(testimonial));
    }

    // BlogPost Management
    @PostMapping("/blog")
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPost blogPost) {
        return ResponseEntity.ok(blogPostService.saveBlogPost(blogPost));
    }

    @DeleteMapping("/blog/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable Long id) {
        blogPostService.deleteBlogPost(id);
        return ResponseEntity.noContent().build();
    }

    // Comment Moderation
    @GetMapping("/comments/pending")
    public ResponseEntity<List<Comment>> getPendingComments() {
        return ResponseEntity.ok(commentService.getPendingComments());
    }

    @PostMapping("/comments/{id}/approve")
    public ResponseEntity<Comment> approveComment(@PathVariable Long id) {
        return commentService.approveComment(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        if (commentService.deleteComment(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

