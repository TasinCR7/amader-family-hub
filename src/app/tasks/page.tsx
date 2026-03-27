"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import {
  ClipboardList, Plus, CheckCircle2, Clock, AlertTriangle, User,
  Sparkles, LayoutList, Columns3, Bell, MessageSquare, Mail,
  ChevronRight, Zap, Search, Loader2,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Modal from "@/components/Modal";


interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  due_date?: string;
  members?: { name: string };
  progress?: number;
}

const kanbanCols: { label: string; status: string; color: string }[] = [
  { label: "আসন্ন", status: "আসন্ন", color: "var(--info)" },
  { label: "চলমান", status: "চলমান", color: "var(--gold)" },
  { label: "সম্পন্ন", status: "সম্পন্ন", color: "var(--success)" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "kanban">("list");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "আসন্ন",
    priority: "মাঝারি",
    due_date: "",
    member_id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const supabase = createClient();

  useEffect(() => {
    fetchTasks();
    fetchMembers();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*, members(name)');
    
    if (!error && data) {
      setTasks(data.map(t => ({ 
        ...t, 
        progress: t.status === 'সম্পন্ন' ? 100 : t.status === 'চলমান' ? 50 : 0 
      })));
    }
    setLoading(false);
  }

  async function fetchMembers() {
    const { data } = await supabase.from("members").select("id, name");
    if (data) setMembers(data);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from("tasks").insert([{
      ...formData,
      member_id: formData.member_id ? Number(formData.member_id) : null,
    }]);

    if (error) {
      alert("Error adding task: " + error.message);
    } else {
      setIsModalOpen(false);
      setFormData({
        title: "",
        description: "",
        status: "আসন্ন",
        priority: "মাঝারি",
        due_date: "",
        member_id: "",
      });
      fetchTasks();
    }
    setIsSubmitting(false);
  };


  const filtered = tasks.filter((t) =>
    t.title?.includes(search) || t.members?.name?.includes(search)
  );

  const ongoing = tasks.filter((t) => t.status === "চলমান").length;
  const upcoming = tasks.filter((t) => t.status === "আসন্ন").length;
  const done = tasks.filter((t) => t.status === "সম্পন্ন").length;

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 px-6 py-4"
          style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:ml-0 ml-12">
              <div className="p-2 rounded-xl" style={{ background: "rgba(59, 130, 246, 0.1)" }}>
                <ClipboardList size={20} style={{ color: "var(--info)" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">কাজ ও পরিকল্পনা</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>AI দ্বারা পরিচালিত টাস্ক ম্যানেজমেন্ট</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="কাজ খুঁজুন..." className="pl-9 pr-4 py-2 rounded-xl text-xs border-0 outline-none w-48"
                  style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--foreground)" }} />
              </div>
              <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid var(--glass-border)" }}>
                <button onClick={() => setView("list")}
                  className={`p-2 transition-colors ${view === "list" ? "bg-primary/20 text-primary" : "bg-glass text-muted-foreground"}`}>
                  <LayoutList size={16} />
                </button>
                <button onClick={() => setView("kanban")}
                  className={`p-2 transition-colors ${view === "kanban" ? "bg-primary/20 text-primary" : "bg-glass text-muted-foreground"}`}>
                  <Columns3 size={16} />
                </button>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-xs py-2"
              >
                <Plus size={14} /> নতুন কাজ
              </button>

            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass-card p-4 text-center fade-in-up">
              <p className="text-2xl font-extrabold" style={{ color: "var(--info)" }}>{tasks.length}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>মোট কাজ</p>
            </div>
            <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "100ms" }}>
              <p className="text-2xl font-extrabold" style={{ color: "var(--gold)" }}>{ongoing}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>চলমান</p>
            </div>
            <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "200ms" }}>
              <p className="text-2xl font-extrabold" style={{ color: "var(--info)" }}>{upcoming}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>আসন্ন</p>
            </div>
            <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "300ms" }}>
              <p className="text-2xl font-extrabold" style={{ color: "var(--success)" }}>{done}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>সম্পন্ন</p>
            </div>
          </div>

          {/* ═══ LIST VIEW ═══ */}
          {view === "list" && (
            <div className="space-y-3">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 size={40} className="animate-spin text-primary opacity-20" />
                  <p className="mt-4 text-xs text-muted-foreground">কাজগুলো লোড হচ্ছে...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-20 text-center">
                  <LayoutList size={48} className="mx-auto mb-4 opacity-10" />
                  <p className="text-sm text-muted-foreground">কোনো কাজ পাওয়া যায়নি</p>
                </div>
              ) : (
                filtered.map((task, i) => (
                  <div key={task.id} className="glass-card p-5 fade-in-up" style={{ animationDelay: `${(i + 4) * 80}ms` }}>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {task.status === "সম্পন্ন" ? (
                            <CheckCircle2 size={18} style={{ color: "var(--success)" }} />
                          ) : task.priority === "উচ্চ" ? (
                            <AlertTriangle size={18} style={{ color: "var(--danger)" }} />
                          ) : (
                            <Clock size={18} style={{ color: "var(--gold)" }} />
                          )}
                          <h3 className="font-semibold text-sm">{task.title}</h3>
                          <span className={`badge text-[10px] ${
                            task.priority === "উচ্চ" ? "badge-danger" :
                            task.priority === "মাঝারি" ? "badge-warning" : "badge-info"
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                          <span className="flex items-center gap-1"><User size={12} /> {task.members?.name || "অনির্ধারিত"}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {task.due_date || "ডেডলাইন নেই"}</span>
                        </div>
                      </div>
                      <div className="w-full md:w-40">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`badge text-[10px] ${
                            task.status === "সম্পন্ন" ? "badge-success" :
                            task.status === "চলমান" ? "badge-warning" : "badge-info"
                          }`}>{task.status}</span>
                          <span className="text-xs font-semibold">{task.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${task.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ═══ KANBAN VIEW ═══ */}
          {view === "kanban" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {kanbanCols.map((col) => {
                const colTasks = filtered.filter((t) => t.status === col.status);
                return (
                  <div key={col.status} className="space-y-3">
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                      <h4 className="text-xs font-semibold">{col.label}</h4>
                      <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }}>
                        {colTasks.length}
                      </span>
                    </div>
                    {colTasks.map((task, i) => (
                      <div key={task.id} className="glass-card p-4 space-y-3 fade-in-up cursor-grab active:cursor-grabbing"
                        style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="flex items-start justify-between">
                          <h3 className="text-xs font-semibold flex-1">{task.title}</h3>
                          <span className={`badge text-[9px] ${
                            task.priority === "উচ্চ" ? "badge-danger" :
                            task.priority === "মাঝারি" ? "badge-warning" : "badge-info"
                          }`}>
                            {task.priority === "উচ্চ" ? "🔴" : task.priority === "মাঝারি" ? "🟡" : "🔵"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                            style={{ background: "linear-gradient(135deg, var(--primary), var(--gold))" }}>
                            {task.members?.name?.substring(0, 2) || "??"}
                          </div>
                          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{task.members?.name || "অনির্ধারিত"}</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${task.progress}%` }} />
                        </div>
                        <div className="flex items-center justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
                          <span>{task.due_date || "কখনো না"}</span>
                          <span className="font-semibold">{task.progress}%</span>
                        </div>
                      </div>
                    ))}
                    {colTasks.length === 0 && (
                      <div className="glass-card p-6 text-center">
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>কোনো কাজ নেই</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add Task Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="নতুন কাজ যোগ করুন"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">কাজের শিরোনাম</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                placeholder="যেমন: জমির সীমানা নির্ধারণ"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">বিবরণ (ঐচ্ছিক)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 h-20 resize-none"
                placeholder="কাজের বিস্তারিত বিবরণ লিখুন..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">অগ্রাধিকার (Priority)</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 appearance-none"
                >
                  <option value="নিচে" className="bg-slate-900">নিচে</option>
                  <option value="মাঝারি" className="bg-slate-900">মাঝারি</option>
                  <option value="উচ্চ" className="bg-slate-900">উচ্চ</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">স্ট্যাটাস</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 appearance-none"
                >
                  <option value="আসন্ন" className="bg-slate-900">আসন্ন</option>
                  <option value="চলমান" className="bg-slate-900">চলমান</option>
                  <option value="সম্পন্ন" className="bg-slate-900">সম্পন্ন</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">ডেডলাইন</label>
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">দায়িত্বপ্রাপ্ত সদস্য</label>
                <select
                  value={formData.member_id}
                  onChange={(e) => setFormData({ ...formData, member_id: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 appearance-none"
                >
                  <option value="" className="bg-slate-900">অনির্ধারিত</option>
                  {members.map(m => (
                    <option key={m.id} value={m.id} className="bg-slate-900">{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 btn-secondary py-2.5"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-[2] btn-primary py-2.5 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                কাজ সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </Modal>
      </main>

    </div>
  );
}
