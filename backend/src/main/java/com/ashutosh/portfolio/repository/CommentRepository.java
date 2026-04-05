package com.ashutosh.portfolio.repository;

import com.ashutosh.portfolio.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    // Fetch top-level comments for a blog post
    List<Comment> findByBlogPostSlugAndParentCommentIdIsNullAndApprovedTrueOrderByCreatedAtDesc(String blogPostSlug);
    
    // Fetch replies for a specific comment
    List<Comment> findByParentCommentIdAndApprovedTrueOrderByCreatedAtAsc(Long parentCommentId);
    
    // Admin: Fetch all pending comments
    List<Comment> findByApprovedFalseOrderByCreatedAtAsc();

    // Fetch all approved comments for a blog post (for flat list processing)
    List<Comment> findByBlogPostSlugAndApprovedTrueOrderByCreatedAtAsc(String blogPostSlug);
}

