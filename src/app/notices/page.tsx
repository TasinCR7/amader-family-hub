"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Megaphone, Pin, Plus, Clock, User, AlertTriangle, Eye, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Modal from "@/components/Modal";


interface Notice {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  author?: string;
  pinned?: boolean;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "সাধারণ",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchNotices();
  }, []);

  async function fetchNotices() {
    setLoading(true);
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setNotices(data);
    }
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase.from("notifications").insert([{
      ...formData,
      is_read: false,
      author: "অ্যাডমিন",
      pinned: false
    }]);

    if (error) {
      alert("Error adding notice: " + error.message);
    } else {
      setIsModalOpen(false);
      setFormData({
        title: "",
        message: "",
        type: "সাধারণ",
      });
      fetchNotices();
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
              <div className="p-2 rounded-xl" style={{ background: "rgba(245, 158, 11, 0.1)" }}>
                <Megaphone size={20} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">নোটিশ বোর্ড</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>গুরুত্বপূর্ণ ঘোষণা ও বিজ্ঞপ্তি</p>
              </div>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary text-xs py-2"
            >
              <Plus size={14} /> নতুন নোটিশ
            </button>

          </div>
        </header>
        <div className="p-6 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-primary opacity-20" />
              <p className="mt-4 text-xs text-muted-foreground">নোটিশগুলো লোড হচ্ছে...</p>
            </div>
          ) : notices.length === 0 ? (
            <div className="p-20 text-center">
              <Megaphone size={48} className="mx-auto mb-4 opacity-10" />
              <p className="text-sm text-muted-foreground">কোনো নতুন নোটিশ নেই</p>
            </div>
          ) : (
            notices.map((notice, i) => (
              <div key={notice.id} className={`glass-card p-5 fade-in-up ${notice.type === 'সতর্কতা' ? "border-l-4 border-l-red-500" : ""}`}
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-start gap-2 mb-2 flex-wrap">
                  {notice.type === 'সতর্কতা' && <AlertTriangle size={12} style={{ color: "var(--danger)" }} />}
                  <h3 className="font-semibold text-sm flex-1">{notice.title}</h3>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>{notice.message}</p>
                <div className="flex items-center justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><User size={10} /> {notice.author || "অ্যাডমিন"}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {new Date(notice.created_at).toLocaleDateString('bn-BD')}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Notice Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="নতুন নোটিশ দিন"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">শিরোনাম</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                placeholder="যেমন: জরুরি সভা সংক্রান্ত"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">বিস্তারিত বার্তা</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 h-32 resize-none"
                placeholder="বিস্তারিত এখানে লিখুন..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">ধরণ</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 appearance-none"
              >
                <option value="সাধারণ" className="bg-slate-900">সাধারণ</option>
                <option value="জরুরি" className="bg-slate-900">জরুরি</option>
                <option value="সতর্কতা" className="bg-slate-900">সতর্কতা</option>
                <option value="উৎসব" className="bg-slate-900">উৎসব</option>
              </select>
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
                নোটিশ প্রকাশ করুন
              </button>
            </div>
          </form>
        </Modal>
      </main>

    </div>
  );
}
