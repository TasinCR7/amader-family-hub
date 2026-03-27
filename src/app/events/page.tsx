"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Calendar, Clock, MapPin, Users, Bell, Plus, ChevronRight, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Modal from "@/components/Modal";


interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  type: string;
  reminder: boolean;
}

const typeColors: Record<string, string> = {
  "সভা": "var(--info)", "উৎসব": "var(--gold)", "আইনি": "var(--danger)",
  "ধর্মীয়": "var(--success)", "কাজ": "var(--primary)",
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    attendees: "0",
    type: "সভা",
    reminder: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format date for display (e.g., "28 মার্চ")
    const dateObj = new Date(formData.date);
    const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
    const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]}`;

    const { error } = await supabase.from("events").insert([{
      ...formData,
      date: formattedDate,
      attendees: Number(formData.attendees)
    }]);

    if (error) {
      alert("Error adding event: " + error.message);
    } else {
      setIsModalOpen(false);
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        attendees: "0",
        type: "সভা",
        reminder: true,
      });
      fetchEvents();
    }
    setIsSubmitting(false);
  };


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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary text-xs py-2"
            >
              <Plus size={14} /> নতুন ইভেন্ট
            </button>

          </div>
        </header>

        <div className="p-6 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-primary opacity-20" />
              <p className="mt-4 text-xs text-muted-foreground">ইভেন্টগুলো লোড হচ্ছে...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="p-20 text-center glass-card">
              <Calendar size={48} className="mx-auto mb-4 opacity-10" />
              <p className="text-sm text-muted-foreground">কোনো ইভেন্ট পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event, i) => (
                <div key={event.id} className="glass-card p-5 fade-in-up flex flex-col md:flex-row md:items-center gap-4"
                  style={{ animationDelay: `${i * 80}ms` }}>
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
          )}
        </div>

        {/* Add Event Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="নতুন ইভেন্ট তৈরি করুন"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">ইভেন্টের শিরোনাম</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                placeholder="যেমন: মাসিক পারিবারিক সভা"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">তারিখ</label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">সময়</label>
                <input
                  required
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                  placeholder="যেমন: বিকাল ৪:০০"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">অবস্থান</label>
              <input
                required
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                placeholder="যেমন: বৈঠকখানা, জুম মিটিং"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">ধরণ</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 appearance-none"
                >
                  {Object.keys(typeColors).map(t => (
                    <option key={t} value={t} className="bg-slate-900">{t}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">পুর্বানুমানিত উপস্থিত</label>
                <input
                  type="number"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                  placeholder="০"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="reminder"
                checked={formData.reminder}
                onChange={(e) => setFormData({ ...formData, reminder: e.target.checked })}
                className="w-4 h-4 rounded border-glass-border bg-glass text-primary focus:ring-primary/50"
              />
              <label htmlFor="reminder" className="text-xs text-muted-foreground cursor-pointer select-none">
                সবাইকে রিমাইন্ডার পাঠান
              </label>
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
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                ইভেন্ট তৈরি করুন
              </button>
            </div>
          </form>
        </Modal>
      </main>

    </div>
  );
}
