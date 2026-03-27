"use client";

import Sidebar from "@/components/Sidebar";
import { Vote, Plus, CheckCircle2, Clock, Users } from "lucide-react";

const polls = [
  {
    id: 1,
    title: "পরবর্তী পারিবারিক সভার তারিখ",
    status: "চলমান",
    totalVotes: 18,
    totalMembers: 32,
    deadline: "৩০ মার্চ ২০২৬",
    options: [
      { text: "১ এপ্রিল (শুক্রবার)", votes: 8, percent: 44 },
      { text: "৩ এপ্রিল (রবিবার)", votes: 6, percent: 33 },
      { text: "৮ এপ্রিল (শুক্রবার)", votes: 4, percent: 22 },
    ],
  },
  {
    id: 2,
    title: "বাড়ির রঙ পরিবর্তন",
    status: "চলমান",
    totalVotes: 12,
    totalMembers: 32,
    deadline: "০৫ এপ্রিল ২০২৬",
    options: [
      { text: "হালকা সবুজ", votes: 5, percent: 42 },
      { text: "ক্রিম রঙ", votes: 4, percent: 33 },
      { text: "সিলভার গ্রে", votes: 3, percent: 25 },
    ],
  },
  {
    id: 3,
    title: "ঈদের আয়োজনের বাজেট",
    status: "সম্পন্ন",
    totalVotes: 28,
    totalMembers: 32,
    deadline: "সম্পন্ন",
    options: [
      { text: "৳৩০,০০০", votes: 15, percent: 54 },
      { text: "৳৫০,০০০", votes: 8, percent: 29 },
      { text: "৳২০,০০০", votes: 5, percent: 18 },
    ],
  },
];

export default function VotingPage() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">ভোটিং ও সিদ্ধান্ত</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>পারিবারিক সিদ্ধান্ত গ্রহণে সকলের মতামত</p>
          </div>
          <button className="btn-primary"><Plus size={16} /> নতুন ভোট</button>
        </div>

        <div className="space-y-4">
          {polls.map((poll, i) => (
            <div key={poll.id} className="glass-card p-5 fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Vote size={18} style={{ color: "var(--primary)" }} />
                    <h3 className="font-semibold text-sm">{poll.title}</h3>
                  </div>
                  <div className="flex gap-3 mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1"><Users size={12} /> {poll.totalVotes}/{poll.totalMembers} ভোট</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {poll.deadline}</span>
                  </div>
                </div>
                <span className={`badge text-[10px] ${poll.status === "চলমান" ? "badge-warning" : "badge-success"}`}>
                  {poll.status === "চলমান" ? <Clock size={10} /> : <CheckCircle2 size={10} />} {poll.status}
                </span>
              </div>

              <div className="space-y-3">
                {poll.options.map((option, j) => {
                  const isWinner = poll.status === "সম্পন্ন" && option.percent === Math.max(...poll.options.map(o => o.percent));
                  return (
                    <div key={j}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{option.text}</span>
                        <span className="text-xs font-semibold" style={{ color: isWinner ? "var(--success)" : "var(--text-muted)" }}>
                          {option.percent}% ({option.votes} ভোট)
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${option.percent}%`,
                            background: isWinner
                              ? "linear-gradient(90deg, var(--success), var(--primary))"
                              : "linear-gradient(90deg, var(--primary), var(--gold))",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {poll.status === "চলমান" && (
                <div className="mt-4 pt-3 border-t" style={{ borderColor: "var(--card-border)" }}>
                  <button className="btn-primary text-xs py-2 w-full justify-center">ভোট দিন</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
