"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
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
  Sparkles,
  Brain,
  Target,
  Award,
  BarChart3,
  Zap,
  Heart,
  BookOpen,
  Loader2,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

/* ───── Dynamic Stats Logic ───── */
// Note: Real data is fetched in the useEffect below.
const emptyChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export default function Home() {
  const [insightIndex] = useState(0);
  const [stats, setStats] = useState({
    membersCount: 0,
    totalExpenses: 0,
    tasksCount: 0,
    landCount: 0,
  });
  const [activities, setActivities] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchDashboardStats() {
      setLoading(true);
      
      try {
        // Fetch member count
        const { count: mCount } = await supabase
          .from('members')
          .select('*', { count: 'exact', head: true });
        
        // Fetch total expenses
        const { data: expData } = await supabase
          .from('expenses')
          .select('amount');
        const totalExp = expData?.reduce((acc, row) => acc + (Number(row.amount) || 0), 0) || 0;

        // Fetch land record count
        const { count: lCount } = await supabase
          .from('land_records')
          .select('*', { count: 'exact', head: true });

        // Fetch tasks count & data
        const { count: tCount, data: tData } = await supabase
          .from('tasks')
          .select('*')
          .limit(3);
        
        // Fetch recent activities (using notifications or specific audit log if exists)
        const { data: nData } = await supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          membersCount: mCount || 0,
          totalExpenses: totalExp,
          tasksCount: tCount || 0,
          landCount: lCount || 0,
        });

        setTasks(tData || []);
        setActivities(nData?.map(n => ({
          id: n.id,
          action: n.title,
          user: n.author || "অ্যাডমিন",
          time: new Date(n.created_at).toLocaleDateString('bn-BD'),
          type: n.type === 'সফলতা' ? 'success' : (n.type === 'সতর্কতা' ? 'warning' : 'info')
        })) || []);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardStats();
  }, []);

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

          {/* ═══ Tribute & Welcome Banner ═══ */}
          <div
            className="glass-card p-6 md:p-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(245, 158, 11, 0.04), rgba(59, 130, 246, 0.04))",
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "var(--primary)", filter: "blur(80px)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: "var(--gold)", filter: "blur(60px)" }} />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Tribute Photo */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center pulse-glow"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--gold))", boxShadow: "0 0 40px rgba(16, 185, 129, 0.2)" }}>
                  <Heart size={40} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs mb-1.5 flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                  <BookOpen size={12} /> ইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mb-1">
                  <span className="gradient-text">মরহুম আব্দুল গফুর</span> পরিবার পোর্টাল
                </h2>
                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                  আল্লাহ তাঁকে জান্নাতুল ফিরদাউস দান করুন। তাঁর রেখে যাওয়া উত্তরাধিকার ও পরিবারকে এগিয়ে নিতে আমরা প্রতিশ্রুতিবদ্ধ।
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--primary-light)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                    🤲 আসসালামু আলাইকুম
                  </span>
                  <span className="text-xs" style={{ color: "var(--gold)" }}>
                    {new Date().toLocaleDateString("bn-BD", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ KPI Stats ═══ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "0ms" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                  <Users size={20} style={{ color: "var(--primary)" }} />
                </div>
                {loading ? <Loader2 size={12} className="animate-spin text-muted-foreground mr-2" /> : (
                  <span className="badge badge-success text-[10px]">
                    <TrendingUp size={10} /> ১২%
                  </span>
                )}
              </div>
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>মোট সদস্য</p>
              <p className="text-3xl font-extrabold">{loading ? "..." : <AnimatedCounter end={stats.membersCount} />}</p>
            </div>
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: "rgba(245, 158, 11, 0.1)" }}>
                  <Wallet size={20} style={{ color: "var(--gold)" }} />
                </div>
                {loading ? <Loader2 size={12} className="animate-spin text-muted-foreground mr-2" /> : (
                  <span className="badge badge-warning text-[10px]">
                    <TrendingUp size={10} /> ৮%
                  </span>
                )}
              </div>
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>মোট খরচ</p>
              <p className="text-3xl font-extrabold">{loading ? "..." : <AnimatedCounter end={stats.totalExpenses} prefix="৳" />}</p>
            </div>
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: "rgba(59, 130, 246, 0.1)" }}>
                  <ClipboardList size={20} style={{ color: "var(--info)" }} />
                </div>
                <span className="badge badge-info text-[10px]">৩ নতুন</span>
              </div>
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>চলমান কাজ</p>
              <p className="text-3xl font-extrabold"><AnimatedCounter end={stats.tasksCount} /></p>
            </div>
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: "rgba(168, 85, 247, 0.1)" }}>
                  <MapPin size={20} style={{ color: "#a855f7" }} />
                </div>
                {loading ? <Loader2 size={12} className="animate-spin text-muted-foreground mr-2" /> : (
                  <span className="badge badge-success text-[10px]">
                    <TrendingUp size={10} /> ১০০%
                  </span>
                )}
              </div>
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>জমি রেকর্ড</p>
              <p className="text-3xl font-extrabold">{loading ? "..." : <AnimatedCounter end={stats.landCount} />}</p>
            </div>
          </div>

          {/* ═══ AI Quick Insights ═══ */}
            <div className="glass-card p-5 fade-in-up relative overflow-hidden" style={{ animationDelay: "350ms" }}>
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                <Brain size={18} style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm flex items-center gap-1.5">
                  AI দ্রুত বিশ্লেষণ <Sparkles size={14} className="text-gold animate-pulse" />
                </h3>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>পরিবার এআই ইঞ্জিন দ্বারা চালিত</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="flex items-start gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
                style={{ background: `var(--primary)08`, border: `1px solid var(--primary)15` }}>
                <TrendingUp size={16} style={{ color: "var(--primary)", marginTop: 2, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed">ডেটা বিশ্লেষণ করে আপনার এআই সহকারী এখানে গুরুত্বপূর্ণ ইনসাইট প্রদান করবে।</p>
              </div>
            </div>
          </div>

          {/* ═══ 4 Interactive Charts ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chart 1: সাফল্যের হার */}
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-sm">সাফল্যের হার</h3>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>গত ১২ মাসের সাফল্য</p>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} style={{ color: "var(--gold)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--success)" }}>০%</span>
                </div>
              </div>
              <MiniChart data={emptyChartData} color="#10b981" height={160} />
              <div className="flex justify-between mt-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                {["এপ্রি", "মে", "জুন", "জুলা", "আগ", "সেপ্ট", "অক্টো", "নভে", "ডিসে", "জানু", "ফেব্রু", "মার্চ"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Chart 2: খরচের প্রবণতা */}
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "500ms" }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-sm">খরচের প্রবণতা</h3>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>মাসিক খরচ (টাকায়)</p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} style={{ color: "var(--gold)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--gold)" }}>০%</span>
                </div>
              </div>
              <MiniChart data={emptyChartData} color="#f59e0b" height={160} />
              <div className="flex justify-between mt-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                {["এপ্রি", "মে", "জুন", "জুলা", "আগ", "সেপ্ট", "অক্টো", "নভে", "ডিসে", "জানু", "ফেব্রু", "মার্চ"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Chart 3: জমি অগ্রগতি */}
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "600ms" }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-sm">জমি অগ্রগতি</h3>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>জমি রেকর্ড সংখ্যা</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} style={{ color: "#a855f7" }} />
                  <span className="text-xs font-semibold" style={{ color: "#a855f7" }}>০</span>
                </div>
              </div>
              <MiniChart data={emptyChartData} color="#a855f7" height={160} />
              <div className="flex justify-between mt-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                {["এপ্রি", "মে", "জুন", "জুলা", "আগ", "সেপ্ট", "অক্টো", "নভে", "ডিসে", "জানু", "ফেব্রু", "মার্চ"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Chart 4: Top Members Ranking */}
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "700ms" }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-sm">সদস্য র‍্যাংকিং</h3>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>কাজের সাফল্যের ভিত্তিতে</p>
                </div>
                <BarChart3 size={16} style={{ color: "var(--info)" }} />
              </div>
              <div className="space-y-3 py-4 text-center">
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>এখনও কোনো র‍্যাংকিং নেই। কার্যক্রম শুরু করলে এখানে দেখা যাবে।</p>
              </div>
            </div>
          </div>

          {/* ═══ Activities & Tasks ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent Activities */}
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "800ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">সাম্প্রতিক কার্যক্রম</h3>
                <Clock size={16} style={{ color: "var(--text-muted)" }} />
              </div>
              <div className="space-y-3">
                {activities.length > 0 ? activities.map((activity) => (
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
                )) : (
                  <p className="text-xs text-center py-4" style={{ color: "var(--text-muted)" }}>নতুন কোনো কার্যক্রম নেই।</p>
                )}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="glass-card p-5 lg:col-span-2 fade-in-up" style={{ animationDelay: "900ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">আসন্ন কাজসমূহ</h3>
                <button className="btn-primary text-xs py-1.5 px-3">সব দেখুন</button>
              </div>
              <div className="space-y-4">
                {tasks.length > 0 ? tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-4 py-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <CalendarDays size={12} style={{ color: "var(--text-muted)" }} />
                        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                          {task.deadline || "কোনো তারিখ নেই"}
                        </span>
                        <span className={`badge text-[10px] ${task.status === "চলমান" ? "badge-warning" : "badge-info"}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-xs text-center py-8" style={{ color: "var(--text-muted)" }}>কোনো চলমান কাজ নেই।</p>
                )}
              </div>
            </div>
          </div>

          {/* ═══ Member Growth Chart ═══ */}
          <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "1000ms" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-sm">সদস্য বৃদ্ধি</h3>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>গত ১২ মাসে পরিবারের সদস্য সংখ্যা</p>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} style={{ color: "var(--primary)" }} />
                <span className="text-xs font-semibold" style={{ color: "var(--primary-light)" }}>০</span>
              </div>
            </div>
            <MiniChart data={emptyChartData} color="#10b981" height={120} />
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
