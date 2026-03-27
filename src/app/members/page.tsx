"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  UserPlus,
  Filter,
  TrendingUp,
  CheckCircle2,
  Award,
  Star,
  ChevronDown,
  X,
} from "lucide-react";

const allMembers = [
  { id: 1, name: "আব্দুল করিম", nameEn: "Abdul Karim", role: "পারিবারিক প্রধান", relation: "জ্যেষ্ঠ পুত্র", generation: "২য় প্রজন্ম", phone: "০১৭XXXXXXXX", email: "karim@family.com", location: "ঢাকা", status: "active", avatar: "AK", tasks: 12, score: 95 },
  { id: 2, name: "ফারুক আহমেদ", nameEn: "Faruk Ahmed", role: "সদস্য", relation: "কনিষ্ঠ পুত্র", generation: "২য় প্রজন্ম", phone: "০১৮XXXXXXXX", email: "faruk@family.com", location: "চট্টগ্রাম", status: "active", avatar: "FA", tasks: 7, score: 85 },
  { id: 3, name: "মোহাম্মদ আলী", nameEn: "Mohammad Ali", role: "সদস্য", relation: "নাতি", generation: "৩য় প্রজন্ম", phone: "০১৯XXXXXXXX", email: "ali@family.com", location: "সিলেট", status: "active", avatar: "MA", tasks: 8, score: 88 },
  { id: 4, name: "রহিমা বেগম", nameEn: "Rahima Begum", role: "সদস্য", relation: "বধূ", generation: "২য় প্রজন্ম", phone: "০১৬XXXXXXXX", email: "rahima@family.com", location: "রাজশাহী", status: "inactive", avatar: "RB", tasks: 10, score: 92 },
  { id: 5, name: "জামাল উদ্দিন", nameEn: "Jamal Uddin", role: "কোষাধ্যক্ষ", relation: "ভাতিজা", generation: "৩য় প্রজন্ম", phone: "০১৫XXXXXXXX", email: "jamal@family.com", location: "খুলনা", status: "active", avatar: "JU", tasks: 6, score: 78 },
  { id: 6, name: "সালমা খাতুন", nameEn: "Salma Khatun", role: "সদস্য", relation: "নাতনী", generation: "৩য় প্রজন্ম", phone: "০১৩XXXXXXXX", email: "salma@family.com", location: "বরিশাল", status: "active", avatar: "SK", tasks: 5, score: 72 },
  { id: 7, name: "করিম উদ্দিন", nameEn: "Korim Uddin", role: "উপদেষ্টা", relation: "চাচা", generation: "১ম প্রজন্ম", phone: "০১১XXXXXXXX", email: "korim@family.com", location: "ময়মনসিংহ", status: "active", avatar: "KU", tasks: 3, score: 68 },
  { id: 8, name: "নূরজাহান বেগম", nameEn: "Nurjahan Begum", role: "সদস্য", relation: "চাচী", generation: "১ম প্রজন্ম", phone: "০১২XXXXXXXX", email: "nur@family.com", location: "ময়মনসিংহ", status: "active", avatar: "NB", tasks: 4, score: 74 },
];

const generations = ["সব", "১ম প্রজন্ম", "২য় প্রজন্ম", "৩য় প্রজন্ম"];

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [selectedGen, setSelectedGen] = useState("সব");
  const [showFilter, setShowFilter] = useState(false);

  const filtered = allMembers.filter((m) => {
    const matchSearch = m.name.includes(search) || m.nameEn.toLowerCase().includes(search.toLowerCase()) || m.location.includes(search);
    const matchGen = selectedGen === "সব" || m.generation === selectedGen;
    return matchSearch && matchGen;
  });

  const activeCount = allMembers.filter((m) => m.status === "active").length;

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header
          className="sticky top-0 z-20 px-6 py-4"
          style={{
            background: "rgba(10, 15, 26, 0.8)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--card-border)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:ml-0 ml-12">
              <div className="p-2 rounded-xl" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                <Users size={20} style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">সদস্য তালিকা</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                  মোট {allMembers.length} জন • সক্রিয় {activeCount} জন
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="নাম, ইংরেজি নাম বা এলাকা..."
                  className="pl-9 pr-8 py-2 rounded-xl text-xs border-0 outline-none w-64"
                  style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--foreground)" }}
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2">
                    <X size={12} style={{ color: "var(--text-muted)" }} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`btn-secondary py-2 px-3 text-xs ${showFilter ? "border-primary/50" : ""}`}
              >
                <Filter size={14} />
              </button>
              <button className="btn-primary text-xs py-2">
                <UserPlus size={14} /> যোগ করুন
              </button>
            </div>
          </div>

          {/* Filter row */}
          {showFilter && (
            <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid var(--card-border)" }}>
              <span className="text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>প্রজন্ম:</span>
              {generations.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGen(g)}
                  className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all ${
                    selectedGen === g
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{
                    background: selectedGen === g ? "linear-gradient(135deg, var(--primary), var(--gold))" : "var(--glass)",
                    border: `1px solid ${selectedGen === g ? "transparent" : "var(--glass-border)"}`,
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </header>

        <div className="p-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="glass-card p-4 text-center fade-in-up">
              <p className="text-2xl font-extrabold gradient-text">{allMembers.length}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>মোট সদস্য</p>
            </div>
            <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "100ms" }}>
              <p className="text-2xl font-extrabold" style={{ color: "var(--success)" }}>{activeCount}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>সক্রিয়</p>
            </div>
            <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "200ms" }}>
              <p className="text-2xl font-extrabold" style={{ color: "var(--gold)" }}>৩</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>প্রজন্ম</p>
            </div>
            <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "300ms" }}>
              <p className="text-2xl font-extrabold" style={{ color: "var(--info)" }}>৫</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>এলাকা</p>
            </div>
          </div>

          {/* Members Grid */}
          {filtered.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Users size={48} className="mx-auto mb-4 opacity-10" />
              <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-muted)" }}>কোনো সদস্য পাওয়া যায়নি</h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>অনুসন্ধান বা ফিল্টার পরিবর্তন করুন</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((member, i) => (
                <div
                  key={member.id}
                  className="glass-card p-5 fade-in-up group cursor-pointer"
                  style={{ animationDelay: `${(i + 4) * 80}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-lg transition-transform group-hover:scale-110"
                        style={{ background: "linear-gradient(135deg, var(--primary), var(--gold))" }}
                      >
                        {member.avatar}
                      </div>
                      <div
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                        style={{
                          borderColor: "var(--card-bg)",
                          background: member.status === "active" ? "var(--success)" : "var(--danger)",
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm">{member.name}</h3>
                        {member.score >= 90 && <Star size={12} style={{ color: "var(--gold)" }} />}
                      </div>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        {member.role} • {member.relation}
                      </p>
                      <span
                        className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-medium"
                        style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--text-muted)" }}
                      >
                        {member.generation}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <Phone size={11} /> <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <Mail size={11} /> <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <MapPin size={11} /> <span>{member.location}</span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--card-border)" }}>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} style={{ color: "var(--success)" }} />
                        <span className="text-[10px] font-medium">{member.tasks} কাজ</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award size={12} style={{ color: "var(--gold)" }} />
                        <span className="text-[10px] font-medium">{member.score}%</span>
                      </div>
                    </div>
                    <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${member.score}%`, background: "linear-gradient(90deg, var(--primary), var(--gold))" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
