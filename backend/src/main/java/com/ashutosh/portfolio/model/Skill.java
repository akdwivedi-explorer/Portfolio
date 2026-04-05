package com.ashutosh.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill extends AbstractEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // e.g., "Backend Mastery", "Frontend Excellence"

    @Column(nullable = false)
    private String icon; // Icon name e.g., "Server", "Layout"

    private int displayOrder;

    // Manual Getters and Setters for Java 25 compatibility
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
}
