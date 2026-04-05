package com.ashutosh.portfolio.service;

import com.ashutosh.portfolio.model.Comment;
import com.ashutosh.portfolio.repository.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    /**
     * Fetch all approved comments for a blog post (flat list for tree building in frontend).
     */
    public List<Comment> getApprovedComments(String blogPostSlug) {
        return commentRepository.findByBlogPostSlugAndApprovedTrueOrderByCreatedAtAsc(blogPostSlug);
    }


    /**
     * Fetch replies for a specific comment.
     */
    public List<Comment> getReplies(Long parentCommentId) {
        return commentRepository.findByParentCommentIdAndApprovedTrueOrderByCreatedAtAsc(parentCommentId);
    }

    /**
     * Add a new comment (initially unapproved).
     */
    @Transactional
    public Comment addComment(Comment comment) {
        comment.setApproved(false); // Force default moderation
        return commentRepository.save(comment);
    }

    /**
     * Admin: Fetch all pending comments.
     */
    public List<Comment> getPendingComments() {
        return commentRepository.findByApprovedFalseOrderByCreatedAtAsc();
    }

    /**
     * Admin: Approve a comment by ID.
     */
    @Transactional
    public Optional<Comment> approveComment(Long id) {
        return commentRepository.findById(id).map(comment -> {
            comment.setApproved(true);
            return commentRepository.save(comment);
        });
    }

    /**
     * Admin: Delete a comment (or reply) by ID.
     */
    @Transactional
    public boolean deleteComment(Long id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
