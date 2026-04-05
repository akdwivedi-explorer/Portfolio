"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageSquare, RefreshCw } from "lucide-react";
import axios from "axios";
import { Comment } from "@/types";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentSectionProps {
  blogPostSlug: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ blogPostSlug }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchComments = useCallback(async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    else setIsRefreshing(true);
    
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api/v1";
      const response = await axios.get(`${BACKEND_URL}/comments/blog/${blogPostSlug}`);
      const flatComments: Comment[] = response.data;
      
      // Build tree (Single level of reply logic)
      const rootComments = flatComments.filter(c => !c.parentCommentId);
      const tree = rootComments.map(root => ({
        ...root,
        replies: flatComments.filter(c => c.parentCommentId === root.id)
      }));
      
      // Sort roots by newest first (since backend ASC for tree processing)
      const sortedTree = tree.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setComments(sortedTree);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [blogPostSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <MessageSquare className="text-blue-500 w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Discussion</h2>
          {comments.length > 0 && (
            <span className="bg-white/10 text-white/60 text-sm px-3 py-1 rounded-full">
              {comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)}
            </span>
          )}
        </div>
        
        <button 
          onClick={() => fetchComments(false)}
          className={`p-2 hover:bg-white/5 rounded-full transition-colors ${isRefreshing ? "animate-spin text-blue-500" : "text-gray-400"}`}
          title="Refresh comments"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Primary Comment Form */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-white/80 mb-4">Leave a thought</h3>
        <CommentForm 
          blogPostSlug={blogPostSlug} 
          onSuccess={() => fetchComments(false)} 
        />
      </div>

      <div className="space-y-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-gray-500 animate-pulse">Loading thoughts...</p>
          </div>
        ) : (
          <CommentList 
            comments={comments} 
            blogPostSlug={blogPostSlug} 
            onRefresh={() => fetchComments(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default CommentSection;
