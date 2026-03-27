"use client";

import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import MiniChart from "@/components/MiniChart";
import {
  Users,
  Wallet,
  ClipboardList,
  MapPin,
  TrendingUp,
  Bell,
  Search,
  CalendarDays,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const expenseData = [12000, 18000, 15000, 22000, 19000, 25000, 21000, 28000, 24000, 31000, 27000, 35000];
const memberData = [8, 10, 12, 14, 16, 18, 22, 24, 25, 28, 30, 32];

const recentActivities = [
  { id: 1, action: "নতুন সদস্য যোগ হয়েছে", user: "আব্দুল করিম", time: "২ ঘণ্টা আগে", type: "success" as const },
  { id: 2, action: "খরচ রেকর্ড করা হয়েছে", user: "ফারুক আহমেদ", time: "৫ ঘণ্টা আগে", type: "info" as const },
  { id: 3, action: "জমির দলিল আপলোড", user: "মোহাম্মদ আলী", time: "১ দিন আগে", type: "warning" as const },
  { id: 4, action: "কাজ সম্পন্ন হয়েছে", user: "রহিমা বেগম", time: "২ দিন আগে", type: "success" as const },
  { id: 5, action: "নতুন ইভেন্ট তৈরি", user: "জামাল উদ্দিন", time: "৩ দিন আগে", type: "info" as const },
];

const upcomingTasks = [
  { id: 1, title: "জমি জরিপ সম্পন্ন করা", deadline: "২৮ মার্চ ২০২৬", status: "চলমান", progress: 65 },
  { id: 2, title: "পারিবারিক সভা আয়োজন", deadline: "০১ এপ্রিল ২০২৬", status: "আসন্ন", progress: 30 },
  { id: 3, title: "মাসিক হিসাব নিকাশ", deadline: "৩১ মার্চ ২০২৬", status: "চলমান", progress: 80 },
];

export default function Home() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-6 py-4"
          style={{
            background: "rgba(10, 15, 26, 0.8)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--card-border)",
          }}
        >
          <div className="flex items-center gap-4 flex-1 md:ml-0 ml-12">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="অনুসন্ধান করুন..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border-0 outline-none"
                style={{
                  background: "var(--glass)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--foreground)",
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative p-2.5 rounded-xl transition-colors"
              style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }}
            >
              <Bell size={18} />
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white"
                style={{ background: "var(--danger)" }}
              >
                ৩
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--gold))" }}
              >
                AG
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Banner */}
          <div
            className="glass-card p-6 md:p-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(245, 158, 11, 0.05))",
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
              style={{ background: "var(--primary)", filter: "blur(80px)" }}
            />
            <div className="relative z-10">
              <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
                আসসালামু আলাইকুম 🤲
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <span className="gradient-text">আমাদের পরিবার পোর্টালে</span> স্বাগতম
              </h2>
              <p className="text-sm max-w-lg" style={{ color: "var(--text-muted)" }}>
                মরহুম আব্দুল গফুর পরিবারের সকল তথ্য, কাজ, খরচ এবং জমির রেকর্ড এক জায়গায়।
                আজকের তারিখ: <span className="font-semibold" style={{ color: "var(--gold)" }}>
                  {new Date().toLocaleDateString("bn-BD", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Users size={20} />}
              label="মোট সদস্য"
              value={<AnimatedCounter end={32} />}
              change="১২%"
              changeType="up"
              color="var(--primary)"
              delay={0}
            />
            <StatCard
              icon={<Wallet size={20} />}
              label="মোট খরচ"
              value={<AnimatedCounter end={285000} prefix="৳" />}
              change="৮%"
              changeType="up"
              color="var(--gold)"
              delay={100}
            />
            <StatCard
              icon={<ClipboardList size={20} />}
              label="চলমান কাজ"
              value={<AnimatedCounter end={7} />}
              change="৩ নতুন"
              changeType="neutral"
              color="var(--info)"
              delay={200}
            />
            <StatCard
              icon={<MapPin size={20} />}
              label="জমি রেকর্ড"
              value={<AnimatedCounter end={15} />}
              change="১০০%"
              changeType="up"
              color="#a855f7"
              delay={300}
            />
          </div>

          {/* Charts & Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Expense Chart */}
            <div className="glass-card p-5 lg:col-span-2 fade-in-up" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-base">মাসিক খরচের তথ্য</h3>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>গত ১২ মাসের খরচ</p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} style={{ color: "var(--success)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--success)" }}>+১৫%</span>
                </div>
              </div>
              <MiniChart data={expenseData} color="#10b981" height={180} />
              <div className="flex justify-between mt-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                {["এপ্রি", "মে", "জুন", "জুলা", "আগ", "সেপ্ট", "অক্টো", "নভে", "ডিসে", "জানু", "ফেব্রু", "মার্চ"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "500ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-base">সাম্প্রতিক কার্যক্রম</h3>
                <Clock size={16} style={{ color: "var(--text-muted)" }} />
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 py-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background:
                          activity.type === "success"
                            ? "rgba(34, 197, 94, 0.15)"
                            : activity.type === "info"
                            ? "rgba(59, 130, 246, 0.15)"
                            : "rgba(245, 158, 11, 0.15)",
                      }}
                    >
                      {activity.type === "success" ? (
                        <CheckCircle2 size={14} style={{ color: "#4ade80" }} />
                      ) : activity.type === "info" ? (
                        <ArrowUpRight size={14} style={{ color: "#60a5fa" }} />
                      ) : (
                        <AlertCircle size={14} style={{ color: "#fbbf24" }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{activity.action}</p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Member chart + Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Member Growth */}
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "600ms" }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-base">সদস্য বৃদ্ধি</h3>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>গত ১২ মাস</p>
                </div>
              </div>
              <MiniChart data={memberData} color="#f59e0b" height={160} />
            </div>

            {/* Upcoming Tasks */}
            <div className="glass-card p-5 lg:col-span-2 fade-in-up" style={{ animationDelay: "700ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-base">আসন্ন কাজসমূহ</h3>
                <button className="btn-primary text-xs py-1.5 px-3">সব দেখুন</button>
              </div>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-4 py-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <CalendarDays size={12} style={{ color: "var(--text-muted)" }} />
                        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                          {task.deadline}
                        </span>
                        <span className={`badge text-[10px] ${task.status === "চলমান" ? "badge-warning" : "badge-info"}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-24">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold">{task.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${task.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center py-6 text-xs" style={{ color: "var(--text-muted)" }}>
            <p>🕌 মরহুম আব্দুল গফুর পরিবার পোর্টাল &copy; {new Date().getFullYear()}</p>
            <p className="mt-1">তৈরি করেছেন ❤️ দিয়ে — আমাদের পরিবার</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
