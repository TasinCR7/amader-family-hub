"use client";

import Sidebar from "@/components/Sidebar";
import { Megaphone, Pin, Plus, Clock, User, AlertTriangle, Eye } from "lucide-react";

const notices = [
  { id: 1, title: "পারিবারিক সভার তারিখ নির্ধারিত", content: "আগামী ০১ এপ্রিল ২০২৬, সন্ধ্যা ৭:০০টায় ঢাকা কার্যালয়ে বার্ষিক পারিবারিক সভা অনুষ্ঠিত হবে।", author: "আব্দুল করিম", date: "২৫ মার্চ ২০২৬", pinned: true, urgent: true, views: 28 },
  { id: 2, title: "জমি করের শেষ তারিখ", content: "সকল জমির কর ৩১ মার্চের মধ্যে পরিশোধ করতে হবে। বিলম্বে জরিমানা আরোপিত হবে।", author: "জামাল উদ্দিন", date: "২০ মার্চ ২০২৬", pinned: true, urgent: false, views: 22 },
  { id: 3, title: "শিক্ষা বৃত্তির জন্য আবেদন", content: "পরিবারের শিক্ষার্থীদের জন্য বৃত্তির আবেদন গ্রহণ চলছে। যোগ্য প্রার্থীরা যোগাযোগ করুন।", author: "রহিমা বেগম", date: "১৫ মার্চ ২০২৬", pinned: false, urgent: false, views: 15 },
  { id: 4, title: "নতুন সদস্যের স্বাগতম", content: "আমাদের পরিবারে নতুন সদস্য যোগ হয়েছেন। সবাইকে উষ্ণ অভ্যর্থনা জানাই।", author: "ফারুক আহমেদ", date: "১০ মার্চ ২০২৬", pinned: false, urgent: false, views: 30 },
];

export default function NoticesPage() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 px-6 py-4"
          style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:ml-0 ml-12">
              <div className="p-2 rounded-xl" style={{ background: "rgba(245, 158, 11, 0.1)" }}>
                <Megaphone size={20} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">নোটিশ বোর্ড</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>গুরুত্বপূর্ণ ঘোষণা ও বিজ্ঞপ্তি</p>
              </div>
            </div>
            <button className="btn-primary text-xs py-2"><Plus size={14} /> নতুন নোটিশ</button>
          </div>
        </header>
        <div className="p-6 space-y-4">
          {notices.map((notice, i) => (
            <div key={notice.id} className={`glass-card p-5 fade-in-up ${notice.pinned ? "border-l-4" : ""}`}
              style={{ animationDelay: `${i * 80}ms`, borderLeftColor: notice.pinned ? (notice.urgent ? "var(--danger)" : "var(--gold)") : "transparent" }}>
              <div className="flex items-start gap-2 mb-2 flex-wrap">
                {notice.pinned && <Pin size={12} style={{ color: "var(--gold)" }} />}
                {notice.urgent && <AlertTriangle size={12} style={{ color: "var(--danger)" }} />}
                <h3 className="font-semibold text-sm flex-1">{notice.title}</h3>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>{notice.content}</p>
              <div className="flex items-center justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><User size={10} /> {notice.author}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {notice.date}</span>
                </div>
                <span className="flex items-center gap-1"><Eye size={10} /> {notice.views} জন দেখেছেন</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
