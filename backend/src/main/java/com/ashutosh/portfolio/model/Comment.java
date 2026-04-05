package com.ashutosh.portfolio.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String authorName;

    @Column(nullable = false)
    private String authorEmail;

    @Column(nullable = false, length = 2000)
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private Long parentCommentId;

    @Column(nullable = false)
    private String blogPostSlug;

    private boolean approved = false;

    public Comment() {
        this.createdAt = LocalDateTime.now();
    }

    public Comment(String authorName, String authorEmail, String content, String blogPostSlug) {
        this.authorName = authorName;
        this.authorEmail = authorEmail;
        this.content = content;
        this.blogPostSlug = blogPostSlug;
        this.createdAt = LocalDateTime.now();
        this.approved = false;
    }

    // Getters and Setters (Java 25 standard)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getAuthorEmail() { return authorEmail; }
    public void setAuthorEmail(String authorEmail) { this.authorEmail = authorEmail; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Long getParentCommentId() { return parentCommentId; }
    public void setParentCommentId(Long parentCommentId) { this.parentCommentId = parentCommentId; }

    public String getBlogPostSlug() { return blogPostSlug; }
    public void setBlogPostSlug(String blogPostSlug) { this.blogPostSlug = blogPostSlug; }

    public boolean isApproved() { return approved; }
    public void setApproved(boolean approved) { this.approved = approved; }
}
