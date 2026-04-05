"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Settings, 
  Layers, 
  Briefcase, 
  BookOpen, 
  MessageSquare, 
  Plus, 
  Save, 
  Trash2, 
  Loader2,
  ChevronRight,
  Database,
  Layout,
  Server
} from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/providers/PortfolioProvider";

// ============================================================
// ADMIN CONSOLE (CMS)
// ============================================================

// ============================================================
// SUB-COMPONENTS (Internal)
// ============================================================

const LoginForm = ({ credentials, setCredentials, onLogin, loading, error, focusReveal }: any) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-6 mt-12">
    <motion.div initial="hidden" animate="visible" variants={focusReveal} className="w-full max-w-md p-1 bg-surface border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-8 bg-black/40 backdrop-blur-xl rounded-[calc(1rem-4px)]">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-accent/20 rounded-lg"><Database size={24} className="text-gradient-accent" /></div>
          <h1 className="text-xl font-black uppercase tracking-tighter">Admin <span className="text-accent">Protocol</span></h1>
        </div>
        <form onSubmit={onLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Access Identifier</label>
            <input type="text" value={credentials.user || ""} onChange={(e) => setCredentials({...credentials, user: e.target.value})} className="w-full bg-surface/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent/40 outline-none transition-colors" placeholder="admin@ashutosh.in" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">Secure Key</label>
            <input type="password" value={credentials.pass || ""} onChange={(e) => setCredentials({...credentials, pass: e.target.value})} className="w-full bg-surface/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent/40 outline-none transition-colors" placeholder="••••••••" />
          </div>
          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" size={16} /> : "Initiate Connection"}
          </button>
        </form>
      </div>
    </motion.div>
  </div>
);

const EditModal = ({ editingItem, setEditingItem, loading, onSave }: any) => (
  <AnimatePresence>
    {editingItem && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-2xl bg-surface border border-white/10 rounded-[2rem] overflow-hidden">
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <h3 className="text-xl font-black uppercase tracking-tighter">{editingItem.data.id ? "Edit" : "Add"} {editingItem.type}</h3>
              <button onClick={() => setEditingItem(null)} className="text-secondary hover:text-white transition-colors">Cancel</button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar space-y-6">
              {Object.entries(editingItem.data).filter(([key]) => !["id", "createdAt", "updatedAt"].includes(key)).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-secondary font-bold">{key}</label>
                  {key === "featured" ? (
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={!!value} onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, [key]: e.target.checked } })} className="w-5 h-5 accent-accent bg-black/40 border-white/5 rounded-md" />
                      <span className="text-xs text-secondary italic">Highlight on homepage</span>
                    </div>
                  ) : key === "content" || key === "description" || key === "summary" ? (
                    <textarea className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-all font-medium min-h-[120px]" value={(value as string) || ""} onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, [key]: e.target.value } })} />
                  ) : (
                    <input className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-all font-medium" value={Array.isArray(value) ? value.join(", ") : ((value as string) || "")} onChange={(e) => {
                        let newValue: any = e.target.value;
                        if (key === "tags") newValue = e.target.value.split(",").map((t: string) => t.trim());
                        let extra = {};
                        if (key === "title" && !editingItem.data.slug) { extra = { slug: e.target.value.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') }; }
                        setEditingItem({ ...editingItem, data: { ...editingItem.data, [key]: newValue, ...extra } });
                      }} />
                  )}
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-white/5 flex gap-4">
              <button onClick={() => onSave(editingItem)} disabled={loading} className="flex-1 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-accent hover:text-white transition-all shadow-lg shadow-white/5 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Confirm & Sync"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function AdminDashboard() {
  const [isLogged, setIsLogged] = useState(false);
  const [credentials, setCredentials] = useState({ user: "", pass: "" });
  const [activeTab, setActiveTab] = useState("config");
  const [config, setConfig] = useState<Record<string, string>>({});
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<{ type: string; data: any } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { refresh: refreshPortfolio } = usePortfolio();

  const focusReveal = {
    hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const allData = await api.public.getAll();
      setConfig(allData.config || {});
      setProjects(allData.projects || []);
      setExperiences(allData.experience || []);
      setBlogPosts(allData.blogPosts || []);
      const flattenedSkills = Object.values(allData.skills || {}).flat();
      setSkills(flattenedSkills);
    } catch (err) {
      console.error("Failed to fetch CMS data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.admin.getFullConfig(credentials);
      if (res) { setIsLogged(true); fetchData(); refreshPortfolio(); }
    } catch (err) {
      setError("Authentication failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateConfig = async (key: string, value: string) => {
    try {
      await api.admin.updateConfig({ key, value }, credentials);
      setConfig({ ...config, [key]: value });
      refreshPortfolio();
    } catch (err) { alert("Failed to update configuration"); }
  };

  const handleSaveItem = async (item: any) => {
    setLoading(true);
    try {
      if (item.type === "skill") await api.admin.saveSkill(item.data, credentials);
      if (item.type === "project") await api.admin.saveProject(item.data, credentials);
      if (item.type === "blog") await api.admin.saveBlog(item.data, credentials);
      if (item.type === "experience") await api.admin.saveExperience(item.data, credentials);
      setEditingItem(null);
      fetchData();
      refreshPortfolio();
    } catch (err) {
      alert("Sync failed. Check database constraints.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLogged) return <LoginForm credentials={credentials} setCredentials={setCredentials} onLogin={handleLogin} loading={loading} error={error} focusReveal={focusReveal} />;

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-64 space-y-6">
          <div className="flex items-center gap-3 mb-10"><div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" /><p className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Protocol Active</p></div>
          <nav className="space-y-2">
            {[
              { id: "config", label: "Site Config", icon: Settings },
              { id: "projects", label: "Projects", icon: Briefcase },
              { id: "skills", label: "Tech Stack", icon: Layers },
              { id: "experience", label: "Experience", icon: Server },
              { id: "blog", label: "Blogs", icon: BookOpen },
              { id: "socials", label: "Socials", icon: Layout },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("w-full flex items-center justify-between p-4 rounded-xl text-left transition-all", activeTab === tab.id ? "bg-white text-black font-black shadow-xl shadow-white/10" : "text-secondary hover:bg-white/5 hover:text-white")}>
                <div className="flex items-center gap-3"><tab.icon size={18} /><span className="text-xs uppercase tracking-widest font-bold">{tab.label}</span></div>
                {activeTab === tab.id && <ChevronRight size={14} />}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-10 bg-surface border border-white/10 rounded-[3rem] min-h-[600px] backdrop-blur-xl">
            {activeTab === "config" && (
              <div className="space-y-12">
                <div><h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">Site Configuration</h2><p className="text-sm text-secondary">Manage site-wide identity and text content.</p></div>
                <div className="grid grid-cols-1 gap-6">
                  {Object.entries(config).map(([key, value]) => (
                    <div key={key} className="space-y-2 p-6 rounded-2xl bg-black/40 border border-white/5">
                      <div className="flex items-center justify-between mb-2"><label className="text-[10px] uppercase tracking-widest text-accent font-bold">{key}</label><button onClick={() => handleUpdateConfig(key, (value as string) || "")} className="text-[10px] font-bold text-secondary hover:text-white transition-colors flex items-center gap-2"><Save size={12} /> Sync Change</button></div>
                      <textarea value={(value as string) || ""} onChange={(e) => setConfig({ ...config, [key]: e.target.value })} className="w-full bg-transparent text-white font-medium focus:outline-none resize-none min-h-[60px]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-12">
                <div className="flex items-center justify-between"><div><h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">Technical Arsenal</h2><p className="text-sm text-secondary">Manage your categorized skill set.</p></div><button onClick={() => setEditingItem({ type: "skill", data: { name: "", category: "Frontend", icon: "Code", level: 90 } })} className="p-3 bg-white text-black rounded-xl hover:bg-accent hover:text-white transition-all"><Plus size={20} /></button></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between group">
                      <div className="flex items-center gap-4"><div className="p-2 bg-surface rounded-lg"><Layers size={16} className="text-accent" /></div><div><p className="text-xs font-bold text-white uppercase tracking-widest">{skill.name}</p><p className="text-[10px] text-muted uppercase tracking-widest">{skill.category} · {skill.icon}</p></div></div>
                      <div className="flex items-center gap-2"><button onClick={() => setEditingItem({ type: "skill", data: skill })} className="p-2 hover:text-accent transition-colors"><Settings size={14} /></button><button onClick={async () => { if (confirm("Delete?")) { try { await api.admin.deleteSkill(skill.id, credentials); fetchData(); refreshPortfolio(); } catch(e) { alert("Failed to delete."); } } }} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={14} /></button></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-12">
                <div className="flex items-center justify-between"><div><h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">Project Archives</h2><p className="text-sm text-secondary">CRUD operations for your case studies.</p></div><button onClick={() => setEditingItem({ type: "project", data: { title: "", description: "", status: "ACTIVE", tags: [] } })} className="p-3 bg-white text-black rounded-xl hover:bg-accent hover:text-white transition-all"><Plus size={20} /></button></div>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="p-6 rounded-3xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                      <div className="flex-1"><div className="flex items-center gap-3 mb-2"><span className="px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[8px] font-black uppercase text-accent">{project.status}</span><h3 className="text-lg font-bold text-white">{project.title}</h3></div><p className="text-xs text-secondary line-clamp-1 max-w-xl">{project.description}</p></div>
                      <div className="flex items-center gap-3"><button onClick={() => setEditingItem({ type: "project", data: project })} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-bold uppercase transition-all">Edit</button><button onClick={async () => { if (confirm("Delete?")) { try { await api.admin.deleteProject(project.id, credentials); fetchData(); refreshPortfolio(); } catch(e) { alert("Failed to delete."); } } }} className="p-3 text-secondary hover:text-red-500 transition-colors"><Trash2 size={16} /></button></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="space-y-12">
                <div className="flex items-center justify-between"><div><h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">Experience Timeline</h2><p className="text-sm text-secondary">Manage your professional career path.</p></div><button onClick={() => setEditingItem({ type: "experience", data: { company: "", position: "", period: "", description: "" } })} className="p-3 bg-white text-black rounded-xl hover:bg-accent hover:text-white transition-all"><Plus size={20} /></button></div>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="p-6 rounded-3xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                      <div className="flex-1"><div className="flex items-center gap-3 mb-2"><span className="px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[8px] font-black uppercase text-accent">{exp.period}</span><h3 className="text-lg font-bold text-white">{exp.company}</h3></div><p className="text-xs text-secondary">{exp.position}</p></div>
                      <div className="flex items-center gap-3"><button onClick={() => setEditingItem({ type: "experience", data: exp })} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-bold uppercase transition-all">Edit</button><button onClick={async () => { if (confirm("Delete?")) { try { await api.admin.deleteExperience(exp.id, credentials); fetchData(); refreshPortfolio(); } catch(e) { alert("Failed to delete."); } } }} className="p-3 text-secondary hover:text-red-500 transition-colors"><Trash2 size={16} /></button></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "blog" && (
              <div className="space-y-12">
                <div className="flex items-center justify-between"><div><h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">Blog Engine</h2><p className="text-sm text-secondary">Publish and manage your thoughts.</p></div><button onClick={() => setEditingItem({ type: "blog", data: { title: "", content: "", status: "DRAFT", slug: "" } })} className="p-3 bg-white text-black rounded-xl hover:bg-accent hover:text-white transition-all"><Plus size={20} /></button></div>
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between group">
                      <div className="flex items-center gap-4"><div className="p-2 bg-surface rounded-lg"><BookOpen size={16} className="text-accent" /></div><div><p className="text-xs font-bold text-white uppercase tracking-widest">{post.title}</p><p className="text-[10px] text-muted uppercase tracking-widest">{post.status} · /{post.slug}</p></div></div>
                      <div className="flex items-center gap-2"><button onClick={() => setEditingItem({ type: "blog", data: post })} className="p-2 hover:text-accent transition-colors"><Settings size={14} /></button><button onClick={async () => { if (confirm("Delete?")) { try { await api.admin.deleteBlog(post.id, credentials); fetchData(); refreshPortfolio(); } catch(e) { alert("Failed to delete."); } } }} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={14} /></button></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "socials" && (
              <div className="space-y-12">
                 <div><h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">Social Channels</h2><p className="text-sm text-secondary">Manage your external links and platforms.</p></div>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(config).filter(([key]) => key.includes("URL") || key.includes("EMAIL")).map(([key, value]) => (
                      <div key={key} className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                         <div className="flex items-center justify-between"><label className="text-[10px] uppercase tracking-widest text-accent font-bold">{key.replace("_URL", "")}</label><button onClick={() => handleUpdateConfig(key, (value as string) || "")} className="text-[10px] font-bold text-secondary hover:text-white transition-colors flex items-center gap-2"><Save size={12} /> Sync</button></div>
                          <input value={(value as string) || ""} onChange={(e) => setConfig({ ...config, [key]: e.target.value })} className="w-full bg-transparent border-b border-white/10 py-2 text-white font-medium focus:outline-none focus:border-accent transition-colors" />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <EditModal editingItem={editingItem} setEditingItem={setEditingItem} loading={loading} onSave={handleSaveItem} />
    </div>
  );
}
