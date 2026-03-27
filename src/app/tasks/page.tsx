"use client";

import Sidebar from "@/components/Sidebar";
import { ClipboardList, Plus, CheckCircle2, Clock, AlertTriangle, User } from "lucide-react";

const tasks = [
  { id: 1, title: "জমি জরিপ সম্পন্ন করা", assignee: "আব্দুল করিম", deadline: "২৮ মার্চ ২০২৬", status: "চলমান", progress: 65, priority: "high" },
  { id: 2, title: "পারিবারিক সভা আয়োজন", assignee: "ফারুক আহমেদ", deadline: "০১ এপ্রিল ২০২৬", status: "আসন্ন", progress: 30, priority: "medium" },
  { id: 3, title: "মাসিক হিসাব নিকাশ", assignee: "জামাল উদ্দিন", deadline: "৩১ মার্চ ২০২৬", status: "চলমান", progress: 80, priority: "high" },
  { id: 4, title: "বাড়ির মেরামত পরিকল্পনা", assignee: "মোহাম্মদ আলী", deadline: "১৫ এপ্রিল ২০২৬", status: "আসন্ন", progress: 10, priority: "low" },
  { id: 5, title: "শিক্ষা তহবিল পর্যালোচনা", assignee: "রহিমা বেগম", deadline: "০৫ এপ্রিল ২০২৬", status: "সম্পন্ন", progress: 100, priority: "medium" },
];

export default function TasksPage() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">কাজ ও পরিকল্পনা</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>পরিবারের সকল কাজ ও টাস্ক ব্যবস্থাপনা</p>
          </div>
          <button className="btn-primary"><Plus size={16} /> নতুন কাজ</button>
        </div>

        {/* Summary badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm">
            <ClipboardList size={16} style={{ color: "var(--info)" }} />
            <span>মোট: <strong>৫</strong></span>
          </div>
          <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm">
            <Clock size={16} style={{ color: "var(--gold)" }} />
            <span>চলমান: <strong>২</strong></span>
          </div>
          <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} style={{ color: "var(--success)" }} />
            <span>সম্পন্ন: <strong>১</strong></span>
          </div>
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {tasks.map((task, i) => (
            <div key={task.id} className="glass-card p-5 fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
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
                    <span>সময়সীমা: {task.deadline}</span>
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
          ))}
        </div>
      </main>
    </div>
  );
}
