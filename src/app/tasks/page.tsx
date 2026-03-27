"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  ClipboardList, Plus, CheckCircle2, Clock, AlertTriangle, User,
  Sparkles, LayoutList, Columns3, Bell, MessageSquare, Mail,
  ChevronRight, Zap, Search,
} from "lucide-react";

interface Task {
  id: number; title: string; assignee: string; deadline: string;
  status: "চলমান" | "আসন্ন" | "সম্পন্ন"; progress: number;
  priority: "high" | "medium" | "low"; aiSuggestion?: string;
}

const tasks: Task[] = [
  { id: 1, title: "জমি জরিপ সম্পন্ন করা", assignee: "আব্দুল করিম", deadline: "২৮ মার্চ ২০২৬", status: "চলমান", progress: 65, priority: "high", aiSuggestion: "সার্ভয়ার সাথে যোগাযোগ করুন — ডেডলাইন শেষ হতে ১ দিন বাকি।" },
  { id: 2, title: "পারিবারিক সভা আয়োজন", assignee: "ফারুক আহমেদ", deadline: "০১ এপ্রিল ২০২৬", status: "আসন্ন", progress: 30, priority: "medium", aiSuggestion: "স্থান নির্ধারণ এবং সদস্যদের জানানো বাকি আছে।" },
  { id: 3, title: "মাসিক হিসাব নিকাশ", assignee: "জামাল উদ্দিন", deadline: "৩১ মার্চ ২০২৬", status: "চলমান", progress: 80, priority: "high" },
  { id: 4, title: "বাড়ির মেরামত পরিকল্পনা", assignee: "মোহাম্মদ আলী", deadline: "১৫ এপ্রিল ২০২৬", status: "আসন্ন", progress: 10, priority: "low" },
  { id: 5, title: "শিক্ষা তহবিল পর্যালোচনা", assignee: "রহিমা বেগম", deadline: "০৫ এপ্রিল ২০২৬", status: "সম্পন্ন", progress: 100, priority: "medium" },
  { id: 6, title: "পুরাতন দলিল ডিজিটাইজেশন", assignee: "সালমা খাতুন", deadline: "২০ এপ্রিল ২০২৬", status: "চলমান", progress: 45, priority: "medium", aiSuggestion: "স্ক্যানার ব্যবহার করে প্রতিদিন ৫টি করে দলিল স্ক্যান করুন।" },
];

const kanbanCols: { label: string; status: Task["status"]; color: string }[] = [
  { label: "আসন্ন", status: "আসন্ন", color: "var(--info)" },
  { label: "চলমান", status: "চলমান", color: "var(--gold)" },
  { label: "সম্পন্ন", status: "সম্পন্ন", color: "var(--success)" },
];

export default function TasksPage() {
  const [view, setView] = useState<"list" | "kanban">("list");
  const [search, setSearch] = useState("");

  const filtered = tasks.filter((t) =>
    t.title.includes(search) || t.assignee.includes(search)
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
              {/* View Toggle */}
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
              <button className="btn-primary text-xs py-2"><Plus size={14} /> নতুন কাজ</button>
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

          {/* AI Suggestion Banner */}
          <div className="glass-card p-4 relative overflow-hidden fade-in-up" style={{ animationDelay: "350ms" }}>
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                <Sparkles size={16} style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <h4 className="text-xs font-semibold flex items-center gap-1.5 mb-1">
                  AI পরামর্শ <Zap size={10} className="text-gold" />
                </h4>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  ২টি কাজের ডেডলাইন এই সপ্তাহে — &quot;জমি জরিপ&quot; ও &quot;মাসিক হিসাব&quot;। অগ্রাধিকার দিন। 🎯
                </p>
              </div>
              <div className="flex gap-2 ml-auto flex-shrink-0">
                <button className="p-1.5 rounded-lg" style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }} title="WhatsApp Reminder">
                  <MessageSquare size={12} />
                </button>
                <button className="p-1.5 rounded-lg" style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }} title="Email Reminder">
                  <Mail size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* ═══ LIST VIEW ═══ */}
          {view === "list" && (
            <div className="space-y-3">
              {filtered.map((task, i) => (
                <div key={task.id} className="glass-card p-5 fade-in-up" style={{ animationDelay: `${(i + 4) * 80}ms` }}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {task.status === "সম্পন্ন" ? (
                          <CheckCircle2 size={18} style={{ color: "var(--success)" }} />
                        ) : task.priority === "high" ? (
                          <AlertTriangle size={18} style={{ color: "var(--danger)" }} />
                        ) : (
                          <Clock size={18} style={{ color: "var(--gold)" }} />
                        )}
                        <h3 className="font-semibold text-sm">{task.title}</h3>
                        <span className={`badge text-[10px] ${
                          task.priority === "high" ? "badge-danger" :
                          task.priority === "medium" ? "badge-warning" : "badge-info"
                        }`}>
                          {task.priority === "high" ? "জরুরি" : task.priority === "medium" ? "মাঝারি" : "সাধারণ"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                        <span className="flex items-center gap-1"><User size={12} /> {task.assignee}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {task.deadline}</span>
                      </div>
                      {task.aiSuggestion && (
                        <div className="mt-2 flex items-start gap-2 p-2 rounded-lg text-[10px]"
                          style={{ background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.1)" }}>
                          <Sparkles size={10} style={{ color: "var(--primary)", marginTop: 2, flexShrink: 0 }} />
                          <span style={{ color: "var(--text-muted)" }}>{task.aiSuggestion}</span>
                        </div>
                      )}
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
              ))}
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
                            task.priority === "high" ? "badge-danger" :
                            task.priority === "medium" ? "badge-warning" : "badge-info"
                          }`}>
                            {task.priority === "high" ? "🔴" : task.priority === "medium" ? "🟡" : "🔵"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                            style={{ background: "linear-gradient(135deg, var(--primary), var(--gold))" }}>
                            {task.assignee.substring(0, 2)}
                          </div>
                          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{task.assignee}</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${task.progress}%` }} />
                        </div>
                        <div className="flex items-center justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
                          <span>{task.deadline}</span>
                          <span className="font-semibold">{task.progress}%</span>
                        </div>
                        {task.aiSuggestion && (
                          <div className="flex items-center gap-1 text-[9px]" style={{ color: "var(--primary)" }}>
                            <Sparkles size={8} /> AI পরামর্শ আছে
                          </div>
                        )}
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
      </main>
    </div>
  );
}
