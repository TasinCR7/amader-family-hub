"use client";

import Sidebar from "@/components/Sidebar";
import { Calendar, Clock, MapPin, Users, Bell, Plus, ChevronRight } from "lucide-react";

const events = [
  { id: 1, title: "পারিবারিক সভা — ২য় ত্রৈমাসিক", date: "০১ এপ্রিল ২০২৬", time: "সন্ধ্যা ৭:০০", location: "ঢাকা, পারিবারিক কার্যালয়", attendees: 18, type: "সভা", reminder: true },
  { id: 2, title: "ঈদুল ফিতর উদযাপন", date: "৩০ মার্চ ২০২৬", time: "সকাল ১০:০০", location: "পৈতৃক বাড়ি, গোপালগঞ্জ", attendees: 32, type: "উৎসব", reminder: true },
  { id: 3, title: "জমি নামজারি শুনানি", date: "০৫ এপ্রিল ২০২৬", time: "সকাল ১১:০০", location: "ভূমি অফিস, সদর", attendees: 3, type: "আইনি", reminder: false },
  { id: 4, title: "মরহুম আব্দুল গফুরের ইসালে সওয়াব", date: "১৫ এপ্রিল ২০২৬", time: "আসরের পর", location: "গ্রামের মসজিদ", attendees: 25, type: "ধর্মীয়", reminder: true },
  { id: 5, title: "শিক্ষা তহবিল বিতরণ", date: "২০ এপ্রিল ২০২৬", time: "বিকাল ৪:০০", location: "পারিবারিক কার্যালয়", attendees: 10, type: "কাজ", reminder: false },
];

const typeColors: Record<string, string> = {
  "সভা": "var(--info)", "উৎসব": "var(--gold)", "আইনি": "var(--danger)",
  "ধর্মীয়": "var(--success)", "কাজ": "var(--primary)",
};

export default function EventsPage() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 px-6 py-4"
          style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:ml-0 ml-12">
              <div className="p-2 rounded-xl" style={{ background: "rgba(59, 130, 246, 0.1)" }}>
                <Calendar size={20} style={{ color: "var(--info)" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">ইভেন্ট ও ক্যালেন্ডার</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>স্মার্ট রিমাইন্ডার • অটো নোটিফিকেশন</p>
              </div>
            </div>
            <button className="btn-primary text-xs py-2"><Plus size={14} /> নতুন ইভেন্ট</button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Timeline */}
          <div className="space-y-4">
            {events.map((event, i) => (
              <div key={event.id} className="glass-card p-5 fade-in-up flex flex-col md:flex-row md:items-center gap-4"
                style={{ animationDelay: `${i * 80}ms` }}>
                {/* Date badge */}
                <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
                  style={{ background: `${typeColors[event.type] || "var(--primary)"}15`, border: `1px solid ${typeColors[event.type] || "var(--primary)"}25` }}>
                  <span className="text-lg font-black" style={{ color: typeColors[event.type] }}>{event.date.split(" ")[0]}</span>
                  <span className="text-[8px] font-semibold" style={{ color: "var(--text-muted)" }}>{event.date.split(" ").slice(1).join(" ")}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-sm">{event.title}</h3>
                    <span className="badge text-[9px]" style={{ background: `${typeColors[event.type]}15`, color: typeColors[event.type] }}>
                      {event.type}
                    </span>
                    {event.reminder && <Bell size={12} className="text-gold animate-pulse" />}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1"><Clock size={10} /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={10} /> {event.location}</span>
                    <span className="flex items-center gap-1"><Users size={10} /> {event.attendees} জন</span>
                  </div>
                </div>

                <button className="btn-secondary text-[10px] py-1.5 px-3 flex-shrink-0">
                  বিস্তারিত <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
