"use client";

import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Modal from "@/components/Modal";


interface Member {
  id: number;
  name: string;
  name_en?: string;
  role?: string;
  relation?: string;
  generation?: string;
  phone?: string;
  email?: string;
  location?: string;
  status: string;
  avatar?: string;
  tasks?: number;
  score?: number;
}

const generations = ["সব", "১ম প্রজন্ম", "২য় প্রজন্ম", "৩য় প্রজন্ম"];

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedGen, setSelectedGen] = useState("সব");
  const [showFilter, setShowFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    name_en: "",
    role: "",
    relation: "",
    generation: "২য় প্রজন্ম",
    phone: "",
    email: "",
    location: "",
    status: "active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const supabase = createClient();

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('members')
      .select('*');
    
    if (error) {
      console.error("Error fetching members:", error);
    } else if (data) {
      const sorted = [...data].sort((a, b) => (b.score || 0) - (a.score || 0));
      setMembers(sorted);
    }
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from("members").insert([formData]);
    if (error) {
      alert("Error adding member: " + error.message);
    } else {
      setIsModalOpen(false);
      setFormData({
        name: "",
        name_en: "",
        role: "",
        relation: "",
        generation: "২য় প্রজন্ম",
        phone: "",
        email: "",
        location: "",
        status: "active",
      });
      fetchMembers();
    }
    setIsSubmitting(false);
  };


  const filtered = members.filter((m) => {
    const matchSearch = m.name?.includes(search) || m.name_en?.toLowerCase().includes(search.toLowerCase()) || m.location?.includes(search);
    const matchGen = selectedGen === "সব" || m.generation === selectedGen;
    return matchSearch && matchGen;
  });

  const activeCount = members.filter((m) => m.status === "active").length;

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
                  মোট {members.length} জন • সক্রিয় {activeCount} জন
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
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-xs py-2"
              >
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
              <p className="text-2xl font-extrabold gradient-text">{members.length}</p>
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
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-primary opacity-20" />
              <p className="mt-4 text-xs text-muted-foreground">সদস্য তথ্য লোড হচ্ছে...</p>
            </div>
          ) : filtered.length === 0 ? (
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
                        {member.avatar || member.name.substring(0, 2)}
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
                        {(member.score || 0) >= 90 && <Star size={12} style={{ color: "var(--gold)" }} />}
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
                        <span className="text-[10px] font-medium">{member.tasks || 0} কাজ</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award size={12} style={{ color: "var(--gold)" }} />
                        <span className="text-[10px] font-medium">{member.score || 0}%</span>
                      </div>
                    </div>
                    <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${member.score || 0}%`, background: "linear-gradient(90deg, var(--primary), var(--gold))" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Member Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="নতুন সদস্য যোগ করুন"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">নাম (বাংলা)</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                  placeholder="যেমন: আব্দুল করিম"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">নাম (ইংরেজি)</label>
                <input
                  type="text"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                  placeholder="যেমন: Abdul Karim"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">পদবী/সেরল</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                  placeholder="যেমন: ছাত্র, প্রকৌশলী"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">সম্পর্ক</label>
                <input
                  type="text"
                  value={formData.relation}
                  onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                  placeholder="যেমন: পুত্র, নাতি"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">প্রজন্ম</label>
                <select
                  value={formData.generation}
                  onChange={(e) => setFormData({ ...formData, generation: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 appearance-none"
                >
                  {generations.slice(1).map(g => (
                    <option key={g} value={g} className="bg-slate-900">{g}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">অবস্থান</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 appearance-none"
                >
                  <option value="active" className="bg-slate-900">সক্রিয়</option>
                  <option value="inactive" className="bg-slate-900">নিষ্ক্রিয়</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">ফোন নম্বর</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                placeholder="০১XXXXXXXXX"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">ইমেইল</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                placeholder="example@mail.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">এলাকা/ঠিকানা</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                placeholder="যেমন: ঢাকা, বগুড়া"
              />
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
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
                সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </Modal>
      </main>

    </div>
  );
}
