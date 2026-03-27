"use client";

import Sidebar from "@/components/Sidebar";
import { Image as ImageIcon, Heart, Star, Upload } from "lucide-react";

const galleryItems = [
  { id: 1, title: "পারিবারিক সভা ২০২৫", category: "ইভেন্ট", color: "#10b981" },
  { id: 2, title: "ঈদের আনন্দ", category: "উৎসব", color: "#f59e0b" },
  { id: 3, title: "জমি জরিপ", category: "কাজ", color: "#3b82f6" },
  { id: 4, title: "পরিবারের পিকনিক", category: "বিনোদন", color: "#a855f7" },
  { id: 5, title: "বাড়ির নির্মাণ", category: "প্রকল্প", color: "#ef4444" },
  { id: 6, title: "বাচ্চাদের জন্মদিন", category: "উৎসব", color: "#f59e0b" },
];

export default function GalleryPage() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">গ্যালারি ও শ্রদ্ধাঞ্জলি</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>পরিবারের স্মৃতি ও ছবির সংগ্রহ</p>
          </div>
          <button className="btn-primary"><Upload size={16} /> ছবি আপলোড</button>
        </div>

        {/* Tribute Section */}
        <div
          className="glass-card p-6 md:p-8 mb-6 text-center relative overflow-hidden fade-in-up"
          style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(245, 158, 11, 0.05))" }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <Heart size={300} />
          </div>
          <div className="relative z-10">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--gold))" }}
            >
              <Star size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-bold gradient-text mb-2">মরহুম আব্দুল গফুর</h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>১৯৩০ — ২০১৫</p>
            <p className="text-sm mt-4 max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
              &ldquo;একজন দয়ালু পিতা, একজন বিশ্বাসী মানুষ, এবং আমাদের পরিবারের ভিত্তি।
              তাঁর স্মৃতি আমাদের হৃদয়ে চিরকাল বেঁচে থাকবে।&rdquo;
            </p>
            <p className="text-xs mt-3" style={{ color: "var(--primary-light)" }}>
              🕌 আল্লাহ তাঁকে জান্নাতুল ফিরদাউস দান করুন। আমীন।
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <h3 className="font-semibold text-lg mb-4">📸 পারিবারিক অ্যালবাম</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <div key={item.id} className="glass-card overflow-hidden cursor-pointer fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div
                className="h-48 flex items-center justify-center"
                style={{ background: `${item.color}15` }}
              >
                <ImageIcon size={48} style={{ color: item.color, opacity: 0.5 }} />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <span className="badge badge-info text-[10px] mt-2">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
