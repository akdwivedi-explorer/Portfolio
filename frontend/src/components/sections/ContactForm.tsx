"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Dummy submission for now
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formState);
      setSuccess();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const setSuccess = () => {
    setIsSuccess(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-secondary ml-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="John Doe"
          value={formState.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:border-accent/40 focus:bg-white/10 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-secondary ml-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="john@example.com"
          value={formState.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:border-accent/40 focus:bg-white/10 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-secondary ml-1">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="How can I help you?"
          value={formState.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted focus:border-accent/40 focus:bg-white/10 outline-none transition-all resize-none"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs mt-2">
          {error}
        </div>
      )}

      <div className="relative mt-4 group/box">
        {/* The Action Box Container */}
        <div className="absolute -inset-2 border-protocol rounded-2xl opacity-50 group-hover/box:opacity-100 transition-opacity duration-500 pointer-events-none corner-accent" />
        
        <div className="relative flex items-center justify-between gap-4 p-1 rounded-xl overflow-hidden">
          <div className="hidden sm:flex flex-col gap-1 ml-2">
            <p className="text-[10px] font-black text-accent uppercase tracking-widest opacity-60">Status</p>
            <p className="text-[11px] font-bold text-white uppercase tracking-tighter">Ready to Transmit</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={cn(
              "group relative flex-1 sm:flex-none flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-black transition-all duration-300 overflow-hidden",
              isSuccess
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-white text-black hover:bg-accent hover:text-white border border-white/10"
            )}
          >
            <div className="relative z-20 flex items-center justify-center gap-3 w-full h-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span className="uppercase tracking-widest text-xs">Processing...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 size={18} />
                  <span className="uppercase tracking-widest text-xs">Sent Successfully</span>
                </>
              ) : (
                <>
                  <span className="uppercase tracking-widest text-xs font-black">Send Message</span>
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      <p className="text-[9px] text-center text-muted uppercase tracking-[0.2em] mt-2 opacity-50">
        Secure Protocol • End-to-End Encrypted Inquiry
      </p>
    </form>
  );
}
