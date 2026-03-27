"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Image as ImageIcon, Heart, Search, Upload, Star, Calendar, MapPin, MessageSquare } from "lucide-react";

const photos = [
  { id: 1, title: "পারিবারিক ঈদ উদযাপন ২০২৫", date: "এপ্রিল ২০২৫", location: "ঢাকা", likes: 24, category: "ঈদ" },
  { id: 2, title: "জমি জরিপ কার্যক্রম", date: "মার্চ ২০২৬", location: "গোপালগঞ্জ", likes: 8, category: "কাজ" },
  { id: 3, title: "নবজাতকের আকিকা", date: "জানুয়ারি ২০২৬", location: "সিলেট", likes: 32, category: "উৎসব" },
  { id: 4, title: "পারিবারিক পিকনিক", date: "ডিসেম্বর ২০২৫", location: "কক্সবাজার", likes: 45, category: "ভ্রমণ" },
  { id: 5, title: "বার্ষিক সভা ২০২৫", date: "নভেম্বর ২০২৫", location: "রাজশাহী", likes: 12, category: "সভা" },
  { id: 6, title: "রমজানের ইফতার মাহফিল", date: "মার্চ ২০২৬", location: "খুলনা", likes: 18, category: "ধর্মীয়" },
];

const colors = ["#10b981", "#f59e0b", "#3b82f6", "#a855f7", "#ef4444", "#06b6d4"];

export default function GalleryPage() {
  const [search, setSearch] = useState("");
  const filtered = photos.filter((p) => p.title.includes(search) || p.category.includes(search));

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 px-6 py-4"
          style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:ml-0 ml-12">
              <div className="p-2 rounded-xl" style={{ background: "rgba(245, 158, 11, 0.1)" }}>
                <ImageIcon size={20} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">গ্যালারি ও শ্রদ্ধাঞ্জলি</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>ছবি • স্মৃতি • মেমোরি ওয়াল</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ছবি খুঁজুন..."
                  className="pl-9 pr-4 py-2 rounded-xl text-xs border-0 outline-none w-48"
                  style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--foreground)" }} />
              </div>
              <button className="btn-primary text-xs py-2"><Upload size={14} /> আপলোড</button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Memory Wall Tribute */}
          <div className="glass-card p-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(16, 185, 129, 0.04))" }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: "var(--gold)", filter: "blur(60px)" }} />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center pulse-glow flex-shrink-0"
                style={{ background: "linear-gradient(135deg, var(--gold), #d97706)" }}>
                <Heart size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold mb-1">🕌 মেমোরি ওয়াল — মরহুম আব্দুল গফুর</h2>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  তাঁর স্মৃতি আমাদের পথ চলার প্রেরণা। এই ওয়ালে পরিবারের সবাই তাঁর প্রতি শ্রদ্ধা ও ভালোবাসা প্রকাশ করতে পারবেন।
                  আল্লাহ তাঁকে জান্নাতুল ফিরদাউস দান করুন। আমিন।
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <button className="btn-primary text-[10px] py-1.5 px-3"><MessageSquare size={10} /> শ্রদ্ধাঞ্জলি লিখুন</button>
                  <button className="btn-secondary text-[10px] py-1.5 px-3"><Upload size={10} /> ছবি যোগ করুন</button>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((photo, i) => (
              <div key={photo.id} className="glass-card overflow-hidden fade-in-up group cursor-pointer" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="h-48 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${colors[i % colors.length]}15, ${colors[(i + 1) % colors.length]}10)` }}>
                  <ImageIcon size={48} className="opacity-10" />
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px]"
                    style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>
                    <Heart size={10} style={{ color: "var(--danger)" }} /> {photo.likes}
                  </div>
                  <span className="absolute top-3 left-3 badge badge-info text-[9px]">{photo.category}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-xs mb-2 group-hover:text-primary transition-colors">{photo.title}</h3>
                  <div className="flex items-center gap-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1"><Calendar size={10} /> {photo.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={10} /> {photo.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
