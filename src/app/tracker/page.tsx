"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PerformanceChart from "@/components/PerformanceChart";
import AIPredictor from "@/components/AIPredictor";
import { TrendingUp, TrendingDown, Target, Award, Zap, Users, Search, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Member {
  id: number;
  name: string;
  role: string;
  score: number;
  trend?: string;
}

export default function TrackerPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      const { data, error } = await supabase.from('members').select('id, name, role, score').order('score', { ascending: false });
      if (!error && data) {
        setMembers(data.map(m => ({ ...m, trend: Math.random() > 0.5 ? 'up' : 'down' })));
      }
      setLoading(false);
    }
    fetchMembers();
  }, []);

  const overallSuccess = members.length > 0 ? Math.round(members.reduce((s, m) => s + (m.score || 0), 0) / members.length) : 0;

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 px-6 py-4" style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold gradient-text">সফলতা-ব্যর্থতা ট্র্যাকার</h2>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="সামগ্রিক সাফল্য" value={`${overallSuccess}%`} icon={TrendingUp} color="var(--success)" />
            <StatCard label="নিবন্ধিত সদস্য" value={members.length.toString()} icon={Users} color="var(--info)" />
            <StatCard label="অর্জিত মাইলফলক" value="২৫" icon={Award} color="var(--gold)" />
            <StatCard label="প্রবৃদ্ধির হার" value="+১৫.২%" icon={Zap} color="var(--primary)" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card p-6"><PerformanceChart /></div>
            <AIPredictor />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-card p-5 space-y-4">
              <h3 className="font-semibold text-sm">সদস্য পারফরম্যান্স</h3>
              {loading ? <Loader2 className="animate-spin mx-auto opacity-20" /> : (
                <div className="space-y-2">
                  {members.map(m => (
                    <button key={m.id} onClick={() => setSelectedMember(m)} className={`w-full flex items-center gap-3 p-3 rounded-xl border ${selectedMember?.id === m.id ? "bg-primary/10 border-primary/30" : "bg-glass border-glass-border"}`}>
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">{m.name.substring(0, 2)}</div>
                      <div className="flex-1 text-left text-[11px] font-medium">{m.name}</div>
                      <div className="font-bold text-xs">{m.score}%</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="lg:col-span-2 glass-card p-10 flex flex-col items-center justify-center text-center">
              {selectedMember ? (
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-gold mx-auto flex items-center justify-center text-3xl font-bold text-white shadow-xl">{selectedMember.name.substring(0, 2)}</div>
                  <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedMember.role}</p>
                  <div className="text-4xl font-black text-primary">{selectedMember.score}%</div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">বিস্তারিত দেখতে সদস্য নির্বাচন করুন</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="glass-card p-5 space-y-2">
      <div className="p-2 rounded-lg w-fit" style={{ background: `${color}20` }}><Icon size={18} style={{ color }} /></div>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
