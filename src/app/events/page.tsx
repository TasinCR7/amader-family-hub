"use client";

import Sidebar from "@/components/Sidebar";
import { Calendar, Plus, MapPin, Clock, Users } from "lucide-react";

const events = [
  { id: 1, title: "পারিবারিক সভা", date: "০১ এপ্রিল ২০২৬", time: "সন্ধ্যা ৬:০০", location: "বাড়ির উঠান", attendees: 25, type: "সভা", upcoming: true },
  { id: 2, title: "ঈদুল ফিতর উদযাপন", date: "১৫ এপ্রিল ২০২৬", time: "সকাল ৯:০০", location: "পারিবারিক ভবন", attendees: 40, type: "উৎসব", upcoming: true },
  { id: 3, title: "জমি পরিদর্শন", date: "১০ এপ্রিল ২০২৬", time: "সকাল ১০:০০", location: "উত্তরের জমি", attendees: 5, type: "কাজ", upcoming: true },
  { id: 4, title: "মাসিক হিসাব বৈঠক", date: "২৫ মার্চ ২০২৬", time: "রাত ৮:০০", location: "অনলাইন", attendees: 8, type: "সভা", upcoming: false },
  { id: 5, title: "মিলাদ মাহফিল", date: "২০ মার্চ ২০২৬", time: "বিকাল ৪:০০", location: "মসজিদ", attendees: 50, type: "ধর্মীয়", upcoming: false },
];

const typeColors: Record<string, string> = {
  "সভা": "badge-info",
  "উৎসব": "badge-success",
  "কাজ": "badge-warning",
  "ধর্মীয়": "badge-success",
};

export default function EventsPage() {
  const upcomingEvents = events.filter((e) => e.upcoming);
  const pastEvents = events.filter((e) => !e.upcoming);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">ইভেন্ট ও ক্যালেন্ডার</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>পারিবারিক অনুষ্ঠান ও ইভেন্টসমূহ</p>
          </div>
          <button className="btn-primary"><Plus size={16} /> নতুন ইভেন্ট</button>
        </div>

        {/* Upcoming */}
        <h3 className="font-semibold text-base mb-3">📅 আসন্ন ইভেন্ট</h3>
        <div className="space-y-3 mb-8">
          {upcomingEvents.map((event, i) => (
            <div key={event.id} className="glass-card p-5 fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(16, 185, 129, 0.15)" }}
                >
                  <Calendar size={20} style={{ color: "var(--primary)" }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{event.title}</h3>
                    <span className={`badge text-[10px] ${typeColors[event.type] || "badge-info"}`}>{event.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {event.attendees} জন</span>
                  </div>
                </div>
                <button className="btn-primary text-xs py-2 px-4">বিস্তারিত</button>
              </div>
            </div>
          ))}
        </div>

        {/* Past */}
        <h3 className="font-semibold text-base mb-3" style={{ color: "var(--text-muted)" }}>📋 পূর্ববর্তী ইভেন্ট</h3>
        <div className="space-y-3">
          {pastEvents.map((event, i) => (
            <div key={event.id} className="glass-card p-5 opacity-60 fade-in-up" style={{ animationDelay: `${(i + 3) * 80}ms` }}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{event.title}</h3>
                    <span className={`badge text-[10px] ${typeColors[event.type] || "badge-info"}`}>{event.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>{event.date}</span>
                    <span>{event.location}</span>
                    <span>{event.attendees} জন অংশগ্রহণ</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
