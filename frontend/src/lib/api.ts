const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api/v1";

export const api = {
  // Public Endpoints
  public: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/public/all`, { cache: 'no-store' });
      if (!res.ok) throw new Error("Failed to fetch portfolio data");
      return res.json();
    },
    getConfig: async () => {
      const res = await fetch(`${API_BASE_URL}/public/config`);
      if (!res.ok) throw new Error("Failed to fetch site config");
      return res.json();
    },
    getSkills: async () => {
      const res = await fetch(`${API_BASE_URL}/public/skills`, { cache: 'no-store' });
      if (!res.ok) throw new Error("Failed to fetch skills");
      return res.json();
    },
    getProjects: async () => {
      const res = await fetch(`${API_BASE_URL}/public/projects`);
      return res.json();
    },
    getBlogPosts: async () => {
      const res = await fetch(`${API_BASE_URL}/public/blog`);
      return res.json();
    },
  },

  // Admin Endpoints
  admin: {
    getHeaders: (auth: { user: string; pass: string }) => {
      const b64 = btoa(`${auth.user}:${auth.pass}`);
      return {
        "Authorization": `Basic ${b64}`,
        "Content-Type": "application/json",
      };
    },

    getFullConfig: async (auth: { user: string; pass: string }) => {
      const res = await fetch(`${API_BASE_URL}/admin/config`, {
        headers: api.admin.getHeaders(auth),
      });
      if (!res.ok) throw new Error("Auth failed");
      return res.json();
    },

    getSkills: async (auth: { user: string; pass: string }) => {
      const res = await fetch(`${API_BASE_URL}/admin/skills`, {
        headers: api.admin.getHeaders(auth),
      });
      return res.json();
    },

    updateConfig: async (config: { key: string; value: string }, auth: { user: string, pass: string }) => {
      const res = await fetch(`${API_BASE_URL}/admin/config`, {
        method: "POST",
        headers: api.admin.getHeaders(auth),
        body: JSON.stringify(config),
      });
      return res.json();
    },

    saveSkill: async (skill: any, auth: { user: string, pass: string }) => {
      const res = await fetch(`${API_BASE_URL}/admin/skills`, {
        method: "POST",
        headers: api.admin.getHeaders(auth),
        body: JSON.stringify(skill),
      });
      return res.json();
    },

    deleteSkill: async (id: number, auth: { user: string, pass: string }) => {
      const res = await fetch(`${API_BASE_URL}/admin/skills/${id}`, {
        method: "DELETE",
        headers: api.admin.getHeaders(auth),
      });
      if (!res.ok) throw new Error("Failed to delete skill");
    },

    // Projects
    saveProject: async (project: any, auth: { user: string, pass: string }) => {
      const method = project.id ? "PUT" : "POST";
      const url = project.id ? `${API_BASE_URL}/admin/projects/${project.id}` : `${API_BASE_URL}/admin/projects`;
      const res = await fetch(url, {
        method,
        headers: api.admin.getHeaders(auth),
        body: JSON.stringify(project),
      });
      return res.json();
    },
    deleteProject: async (id: number, auth: { user: string, pass: string }) => {
      const res = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
        method: "DELETE",
        headers: api.admin.getHeaders(auth),
      });
      if (!res.ok) throw new Error("Failed to delete project");
    },

    // Blogs
    saveBlog: async (blog: any, auth: { user: string, pass: string }) => {
      const res = await fetch(`${API_BASE_URL}/admin/blog`, {
        method: "POST",
        headers: api.admin.getHeaders(auth),
        body: JSON.stringify(blog),
      });
      return res.json();
    },
    deleteBlog: async (id: number, auth: { user: string, pass: string }) => {
      const res = await fetch(`${API_BASE_URL}/admin/blog/${id}`, {
        method: "DELETE",
        headers: api.admin.getHeaders(auth),
      });
      if (!res.ok) throw new Error("Failed to delete blog");
    },

    // Experience
    saveExperience: async (exp: any, auth: { user: string, pass: string }) => {
      const res = await fetch(`${API_BASE_URL}/admin/experience`, {
        method: "POST",
        headers: api.admin.getHeaders(auth),
        body: JSON.stringify(exp),
      });
      return res.json();
    },
    deleteExperience: async (id: number, auth: { user: string, pass: string }) => {
      const res = await fetch(`${API_BASE_URL}/admin/experience/${id}`, {
        method: "DELETE",
        headers: api.admin.getHeaders(auth),
      });
      if (!res.ok) throw new Error("Failed to delete experience");
    }
  }
};
