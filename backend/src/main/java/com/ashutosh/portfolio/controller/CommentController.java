package com.ashutosh.portfolio.controller;

import com.ashutosh.portfolio.model.Comment;
import com.ashutosh.portfolio.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    /**
     * Get all approved comments for a specific blog post.
     */
    @GetMapping("/blog/{slug}")
    public ResponseEntity<List<Comment>> getCommentsByBlog(@PathVariable String slug) {
        return ResponseEntity.ok(commentService.getApprovedComments(slug));
    }

    /**
     * Post a new comment.
     */
    @PostMapping
    public ResponseEntity<Comment> postComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.addComment(comment));
    }

    /**
     * Get replies to a specific comment.
     */
    @GetMapping("/{id}/replies")
    public ResponseEntity<List<Comment>> getReplies(@PathVariable Long id) {
        return ResponseEntity.ok(commentService.getReplies(id));
    }
}
