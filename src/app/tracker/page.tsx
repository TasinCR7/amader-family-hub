"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PerformanceChart from "@/components/PerformanceChart";
import AIPredictor from "@/components/AIPredictor";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  Zap, 
  ChevronRight,
  Search,
  Users
} from "lucide-react";

const familyStats = [
  { label: "সামগ্রিক সাফল্য", value: "৮৪%", icon: TrendingUp, color: "var(--success)" },
  { label: "চলমান লক্ষ্যসমূহ", value: "১২", icon: Target, color: "var(--info)" },
  { label: "অর্জিত মাইলফলক", value: "২৫", icon: Award, color: "var(--gold)" },
  { label: "প্রবৃদ্ধির হার", value: "+১৫.২%", icon: Zap, color: "var(--primary)" },
];

const members = [
  { id: 1, name: "আব্দুল করিম", role: "পারিবারিক প্রধান", score: 92, trend: "up" },
  { id: 2, name: "ফারুক আহমেদ", role: "সদস্য", score: 78, trend: "down" },
  { id: 3, name: "মোহাম্মদ আলী", role: "সদস্য", score: 85, trend: "up" },
  { id: 4, name: "রহিমা বেগম", role: "সদস্য", score: 88, trend: "up" },
];

export default function TrackerPage() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4"
          style={{
            background: "rgba(10, 15, 26, 0.8)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--card-border)",
          }}
        >
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold gradient-text">সফলতা-ব্যর্থতা ট্র্যাকার</h2>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="সদস্য খুঁজুন..."
                className="pl-10 pr-4 py-2 bg-glass border border-glass-border rounded-xl text-xs focus:outline-none"
              />
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {familyStats.map((stat, i) => (
              <div key={i} className="glass-card p-5 space-y-3 fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg" style={{ background: `${stat.color}20` }}>
                    <stat.icon size={20} style={{ color: stat.color }} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Performance Chart */}
            <div className="lg:col-span-2 glass-card p-6 space-y-6 fade-in-up" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">পারিবারিক পারফরম্যান্স বিশ্লেষণ</h3>
                  <p className="text-xs text-muted-foreground">সাফল্য বনাম ব্যর্থতার তুলনামূলক চিত্র</p>
                </div>
                <select className="bg-glass border border-glass-border rounded-lg text-xs p-1.5 outline-none">
                  <option>আজকের বছর</option>
                  <option>গত বছর</option>
                </select>
              </div>
              <PerformanceChart />
            </div>

            {/* AI Predictor */}
            <div className="fade-in-up" style={{ animationDelay: "500ms" }}>
              <AIPredictor />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Member List */}
             <div className="glass-card p-5 space-y-4 fade-in-up" style={{ animationDelay: "600ms" }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">সদস্য ভিত্তিক বিশ্লেষণ</h3>
                <Users size={16} className="text-muted-foreground" />
              </div>
              <div className="space-y-2">
                {members.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border ${
                      selectedMember?.id === member.id 
                      ? "bg-primary/10 border-primary/30" 
                      : "bg-glass border-glass-border hover:border-glass-border-hover"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-gold/20 font-bold text-xs">
                      {member.name.substring(0, 2)}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-[10px] text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{member.score}%</p>
                      {member.trend === "up" ? (
                        <TrendingUp size={12} className="text-success inline" />
                      ) : (
                        <TrendingDown size={12} className="text-danger inline" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Insight (Conditional) */}
            <div className="lg:col-span-2 glass-card p-6 flex flex-col justify-center items-center text-center space-y-4 fade-in-up" style={{ animationDelay: "700ms" }}>
              {!selectedMember ? (
                <>
                   <div className="w-16 h-16 rounded-full bg-glass flex items-center justify-center mb-2">
                    <Users size={32} className="text-muted-foreground opacity-20" />
                  </div>
                  <h3 className="text-muted-foreground">বিশদ তথ্য দেখতে একজন সদস্য নির্বাচন করুন</h3>
                  <p className="text-xs text-muted-foreground max-w-sm">ব্যক্তিগত লক্ষ্য, অর্জিত সাফল্য এবং উন্নতির ক্ষেত্রগুলো এখানে প্রদর্শিত হবে।</p>
                </>
              ) : (
                <div className="w-full space-y-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-gold flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-primary/20">
                      {selectedMember.name.substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedMember.role} • সদস্য আইডি: #{selectedMember.id}৪৫</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-glass p-4 rounded-2xl border border-glass-border text-left">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">সাফল্য স্কোর</p>
                      <p className="text-2xl font-bold text-primary">{selectedMember.score}%</p>
                    </div>
                    <div className="bg-glass p-4 rounded-2xl border border-glass-border text-left md:col-span-2">
                       <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">সর্বশেষ অর্জন</p>
                       <p className="text-sm font-medium">"জমি জরিপ কার্যক্রম সফলভাবে সম্পন্ন" - ৫ দিন আগে</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-left">
                    <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                      <Zap size={12} /> উন্নতির ক্ষেত্রসমূহ
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["যোগাযোগ", "সময় ব্যবস্থাপনা", "বাজেট প্ল্যানিং"].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-glass border border-glass-border rounded-full text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
