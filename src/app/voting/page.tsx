"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Vote, Plus, CheckCircle2, Clock, Users, BarChart3, ChevronRight } from "lucide-react";

interface Poll {
  id: number; question: string; options: { text: string; votes: number }[];
  totalVoters: number; status: "চলমান" | "সম্পন্ন"; deadline: string;
  creator: string;
}

const polls: Poll[] = [
  {
    id: 1, question: "পারিবারিক পিকনিক কোথায় হবে?", totalVoters: 28, status: "চলমান", deadline: "৩০ মার্চ ২০২৬", creator: "আব্দুল করিম",
    options: [{ text: "কক্সবাজার", votes: 12 }, { text: "সিলেট", votes: 8 }, { text: "বান্দরবান", votes: 5 }, { text: "সুন্দরবন", votes: 3 }],
  },
  {
    id: 2, question: "নতুন পারিবারিক কোষাধ্যক্ষ কে হবেন?", totalVoters: 22, status: "সম্পন্ন", deadline: "২০ মার্চ ২০২৬", creator: "ফারুক আহমেদ",
    options: [{ text: "জামাল উদ্দিন", votes: 14 }, { text: "মোহাম্মদ আলী", votes: 8 }],
  },
  {
    id: 3, question: "মরহুমের ইসালে সওয়াবের তারিখ", totalVoters: 30, status: "চলমান", deadline: "১০ এপ্রিল ২০২৬", creator: "রহিমা বেগম",
    options: [{ text: "১৫ এপ্রিল", votes: 15 }, { text: "২০ এপ্রিল", votes: 10 }, { text: "২৫ এপ্রিল", votes: 5 }],
  },
];

export default function VotingPage() {
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 px-6 py-4"
          style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:ml-0 ml-12">
              <div className="p-2 rounded-xl" style={{ background: "rgba(168, 85, 247, 0.1)" }}>
                <Vote size={20} style={{ color: "#a855f7" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">ভোটিং ও পোল</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>গণতান্ত্রিক সিদ্ধান্ত গ্রহণ</p>
              </div>
            </div>
            <button className="btn-primary text-xs py-2"><Plus size={14} /> নতুন পোল</button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card p-4 text-center fade-in-up">
              <p className="text-2xl font-extrabold gradient-text">{polls.length}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>মোট পোল</p>
            </div>
            <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "100ms" }}>
              <p className="text-2xl font-extrabold" style={{ color: "var(--gold)" }}>{polls.filter(p => p.status === "চলমান").length}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>চলমান</p>
            </div>
            <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "200ms" }}>
              <p className="text-2xl font-extrabold" style={{ color: "var(--success)" }}>{polls.filter(p => p.status === "সম্পন্ন").length}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>সম্পন্ন</p>
            </div>
          </div>

          {/* Polls */}
          <div className="space-y-4">
            {polls.map((poll, idx) => {
              const maxVotes = Math.max(...poll.options.map(o => o.votes));
              const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0);
              return (
                <div key={poll.id} className="glass-card p-6 fade-in-up" style={{ animationDelay: `${(idx + 3) * 80}ms` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{poll.question}</h3>
                        <span className={`badge text-[10px] ${poll.status === "চলমান" ? "badge-warning" : "badge-success"}`}>
                          {poll.status === "চলমান" ? <Clock size={10} /> : <CheckCircle2 size={10} />}
                          {poll.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                        <span>তৈরি করেছেন: {poll.creator}</span>
                        <span className="flex items-center gap-1"><Users size={10} /> {poll.totalVoters} ভোটার</span>
                        <span>সময়সীমা: {poll.deadline}</span>
                      </div>
                    </div>
                    {poll.status === "চলমান" && (
                      <button className="btn-primary text-[10px] py-1.5 px-3">ভোট দিন</button>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {poll.options.map((opt, i) => {
                      const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                      const isWinning = opt.votes === maxVotes;
                      return (
                        <div key={i} className="relative p-3 rounded-xl overflow-hidden" style={{ background: "var(--glass)", border: `1px solid ${isWinning ? "rgba(16, 185, 129, 0.3)" : "var(--glass-border)"}` }}>
                          <div className="absolute inset-0 rounded-xl transition-all duration-500"
                            style={{ background: isWinning ? "rgba(16, 185, 129, 0.08)" : "rgba(255,255,255,0.02)", width: `${pct}%` }} />
                          <div className="relative flex items-center justify-between">
                            <span className="text-xs font-medium">{opt.text}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{opt.votes} ভোট</span>
                              <span className="text-xs font-bold" style={{ color: isWinning ? "var(--primary)" : "var(--text-muted)" }}>{pct}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
