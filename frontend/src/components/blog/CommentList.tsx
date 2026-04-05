"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MessageCircle, Reply, Calendar } from "lucide-react";
import { Comment } from "@/types";
import CommentForm from "./CommentForm";

interface CommentListProps {
  comments: Comment[];
  blogPostSlug: string;
  onRefresh: () => void;
}

const CommentItem: React.FC<{ 
  comment: Comment; 
  blogPostSlug: string; 
  onRefresh: () => void;
  isReply?: boolean;
}> = ({ comment, blogPostSlug, onRefresh, isReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Format date to: "March 29, 2024"
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className={`relative p-5 rounded-2xl border ${isReply ? "bg-white/3 border-white/5 ml-8 mt-4" : "bg-white/5 border-white/10 mt-6"}`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* User Info */}
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isReply ? "bg-indigo-500/20" : "bg-blue-500/20"}`}>
            <User className={`w-5 h-5 ${isReply ? "text-indigo-400" : "text-blue-400"}`} />
          </div>
          <div>
            <h4 className="font-semibold text-white/90">{comment.authorName}</h4>
            <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {formatDate(comment.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Reply Action - Only for top-level comments per user request ("Single level of reply") */}
        {!isReply && !comment.parentCommentId && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Reply size={14} /> 
            {showReplyForm ? "Cancel" : "Reply"}
          </button>
        )}
      </div>

      <div className="mt-4 text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
        {comment.content}
      </div>

      {/* Conditional Reply Form */}
      <AnimatePresence>
        {showReplyForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-6 overflow-hidden"
          >
            <div className="pt-4 border-t border-white/5">
              <CommentForm
                blogPostSlug={blogPostSlug}
                parentCommentId={comment.id}
                onSuccess={() => {
                  setShowReplyForm(false);
                  onRefresh();
                }}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recursive Replies - though user asked for "Single level", the data structure and this logic handle it */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              blogPostSlug={blogPostSlug} 
              onRefresh={onRefresh} 
              isReply={true} 
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const CommentList: React.FC<CommentListProps> = ({ comments, blogPostSlug, onRefresh }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-white/5 border border-dashed border-white/10 rounded-2xl">
        <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-400">No comments yet</h3>
        <p className="text-gray-500 text-sm mt-1">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          blogPostSlug={blogPostSlug} 
          onRefresh={onRefresh} 
        />
      ))}
    </div>
  );
};

export default CommentList;
