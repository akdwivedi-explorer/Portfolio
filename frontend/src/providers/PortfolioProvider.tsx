"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PROJECTS, EXPERIENCES, BLOG_POSTS, TESTIMONIALS, SKILLS } from '@/data';
import { SITE_CONFIG } from '@/lib/constants';

interface PortfolioData {
  projects: any[];
  experience: any[];
  blogPosts: any[];
  testimonials: any[];
  skills: Record<string, any[]>;
  config: Record<string, string>;
}

interface PortfolioContextType {
  data: PortfolioData | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Static fallback data used when the backend is unavailable
function getStaticFallbackData(): PortfolioData {
  const skillsByCategory = SKILLS.reduce((acc: Record<string, any[]>, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return {
    projects: PROJECTS,
    experience: EXPERIENCES,
    blogPosts: BLOG_POSTS,
    testimonials: TESTIMONIALS,
    skills: skillsByCategory,
    config: {
      NAME: SITE_CONFIG.name,
      ROLE: SITE_CONFIG.role,
      EMAIL: SITE_CONFIG.email,
      GITHUB_URL: SITE_CONFIG.github,
      LINKEDIN_URL: SITE_CONFIG.linkedin,
      MEDIUM_URL: SITE_CONFIG.medium,
      REDDIT_URL: SITE_CONFIG.reddit,
      LEETCODE_URL: SITE_CONFIG.leetcode,
      CODECHEF_URL: SITE_CONFIG.codechef,
      HERO_TITLE: 'Code that feels designed.',
      HERO_BADGE: 'Available for new projects',
      ABOUT_HEADLINE: 'Engineering that actually ships.',
      ABOUT_BIO: `Hey, I'm ${SITE_CONFIG.name}, a ${SITE_CONFIG.role} based in ${SITE_CONFIG.location}. I specialize in building performant, scalable distributed systems using Java Spring Boot and Microservices architecture.`,
    },
  };
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await api.public.getAll();
      setData(result);
    } catch (error) {
      console.warn('Backend unavailable, using static fallback data.');
      // Use static data as fallback so UI is always populated
      setData(getStaticFallbackData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, refresh: fetchData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
