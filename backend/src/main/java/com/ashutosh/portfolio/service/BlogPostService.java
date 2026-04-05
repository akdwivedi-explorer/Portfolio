package com.ashutosh.portfolio.service;

import com.ashutosh.portfolio.model.BlogPost;
import com.ashutosh.portfolio.repository.BlogPostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    public BlogPostService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAllByOrderByPublishedAtDesc();
    }

    public List<BlogPost> getLatestBlogPosts() {
        return blogPostRepository.findTop3ByOrderByPublishedAtDesc();
    }

    public Optional<BlogPost> getBlogPostBySlug(String slug) {
        return blogPostRepository.findBySlug(slug);
    }

    @Transactional
    public BlogPost saveBlogPost(BlogPost blogPost) {
        if (blogPost.getPublishedAt() == null) {
            blogPost.setPublishedAt(java.time.LocalDateTime.now());
        }
        if (blogPost.getSlug() == null || blogPost.getSlug().isEmpty()) {
            blogPost.setSlug(blogPost.getTitle().toLowerCase().replaceAll("[^a-z0-0]", "-") + "-" + System.currentTimeMillis());
        }
        if (blogPost.getSummary() == null || blogPost.getSummary().isEmpty()) {
          if (blogPost.getContent() != null && blogPost.getContent().length() > 100) {
            blogPost.setSummary(blogPost.getContent().substring(0, 97) + "...");
          } else {
            blogPost.setSummary(blogPost.getTitle());
          }
        }
        return blogPostRepository.save(blogPost);
    }

    @Transactional
    public void deleteBlogPost(Long id) {
        blogPostRepository.deleteById(id);
    }
}
