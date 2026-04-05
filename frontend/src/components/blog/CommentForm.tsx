"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";

interface CommentFormProps {
  blogPostSlug: string;
  parentCommentId?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  blogPostSlug, 
  parentCommentId, 
  onSuccess, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    authorName: "",
    authorEmail: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api/v1";
      await axios.post(`${BACKEND_URL}/comments`, {
        ...formData,
        blogPostSlug,
        parentCommentId: parentCommentId || null,
      });

      setIsSuccess(true);
      setFormData({ authorName: "", authorEmail: "", content: "" });
      
      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-8 bg-green-500/10 border border-green-500/20 rounded-2xl text-center"
      >
        <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Comment Submitted!</h3>
        <p className="text-gray-400 max-w-sm">
          Thank you for your thoughts. Your comment is pending moderation and will appear once approved.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1 flex items-center gap-2">
            <User size={14} /> Name
          </label>
          <input
            required
            type="text"
            placeholder="John Doe"
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1 flex items-center gap-2">
            <Mail size={14} /> Email
          </label>
          <input
            required
            type="email"
            placeholder="john@example.com"
            value={formData.authorEmail}
            onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* Content TextArea */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400 ml-1 flex items-center gap-2">
          <MessageSquare size={14} /> Comment
        </label>
        <textarea
          required
          rows={5}
          placeholder="Share your thoughts..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm ml-1">{error}</p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-8 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={18} />
              Post Comment
            </>
          )}
          <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </motion.form>
  );
};

export default CommentForm;
