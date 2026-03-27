"use client";

import Sidebar from "@/components/Sidebar";
import { Lock, FileText, Clock, Shield, Eye, Download, AlertTriangle, Plus, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";


interface VaultItem {
  id: number;
  name: string;
  file_type: string;
  access_level: string;
  expiry: string;
  file_size: string;
  uploaded_at: string;
}

export default function VaultPage() {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    file_type: "এনক্রিপ্টেড",
    access_level: "শুধুমাত্র অ্যাডমিন",
    expiry: "কখনো না",
    file_size: "০ KB",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const supabase = createClient();

  useEffect(() => {
    fetchVault();
  }, []);

  async function fetchVault() {
    setLoading(true);
    const { data, error } = await supabase.from('vault').select('*').order('uploaded_at', { ascending: false });
    if (!error && data) setItems(data);
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase.from("vault").insert([{
      ...formData,
      uploaded_at: new Date().toISOString()
    }]);

    if (error) {
      alert("Error adding file: " + error.message);
    } else {
      setIsModalOpen(false);
      setFormData({
        name: "",
        file_type: "এনক্রিপ্টেড",
        access_level: "শুধুমাত্র অ্যাডমিন",
        expiry: "কখনো না",
        file_size: "০ KB",
      });
      fetchVault();
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
              <div className="p-2 rounded-xl" style={{ background: "rgba(239, 68, 68, 0.1)" }}>
                <Lock size={20} style={{ color: "var(--danger)" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">সিকিউর ভল্ট</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>এনক্রিপ্টেড • এক্সপায়রি কন্ট্রোল • একসেস ম্যানেজমেন্ট</p>
              </div>
            </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-xs py-2"
              >
                <Plus size={14} /> নতুন ফাইল
              </button>

          </div>
        </header>
        <div className="p-6 space-y-6">
          <div className="glass-card p-4 flex items-start gap-3" style={{ background: "rgba(239, 68, 68, 0.05)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
            <Shield size={16} style={{ color: "var(--danger)", marginTop: 2 }} />
            <div>
              <p className="text-xs font-semibold">এন্টারপ্রাইজ গ্রেড সিকিউরিটি</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>সকল ফাইল AES-256 এনক্রিপশনে সুরক্ষিত। অ্যাক্সেস লগ সংরক্ষিত হচ্ছে।</p>
            </div>
          </div>
          <div className="glass-card overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 size={40} className="animate-spin text-primary opacity-20" />
                <p className="mt-4 text-xs text-muted-foreground">ডকুমেন্ট লোড হচ্ছে...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="p-20 text-center">
                <FileText size={48} className="mx-auto mb-4 opacity-10" />
                <p className="text-sm text-muted-foreground">ভল্টে কোনো ফাইল নেই</p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr><th>নাম</th><th>ধরন</th><th>অ্যাক্সেস</th><th>মেয়াদ</th><th>সাইজ</th><th></th></tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={item.id} className="fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                      <td><div className="flex items-center gap-2"><FileText size={14} style={{ color: "var(--primary)" }} /><span className="font-medium text-xs">{item.name}</span></div></td>
                      <td><span className={`badge text-[10px] ${item.file_type === "এনক্রিপ্টেড" ? "badge-danger" : "badge-info"}`}>{item.file_type}</span></td>
                      <td className="text-xs"><div className="flex items-center gap-1"><Shield size={10} /> {item.access_level}</div></td>
                      <td className="text-xs">
                        {item.expiry === "কখনো না" ? (
                          <span style={{ color: "var(--success)" }}>∞ স্থায়ী</span>
                        ) : (
                          <span className="flex items-center gap-1" style={{ color: "var(--gold)" }}><Clock size={10} /> {item.expiry}</span>
                        )}
                      </td>
                      <td className="text-xs" style={{ color: "var(--text-muted)" }}>{item.file_size}</td>
                      <td>
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-glass"><Eye size={12} /></button>
                          <button className="p-1.5 rounded-lg hover:bg-glass"><Download size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Add File Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="ভল্টে নতুন ফাইল যোগ করুন"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">ফাইলের নাম</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                placeholder="যেমন: জমির দলিলের কপি"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">ফাইলের ধরন</label>
                <select
                  value={formData.file_type}
                  onChange={(e) => setFormData({ ...formData, file_type: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 appearance-none"
                >
                  <option value="এনক্রিপ্টেড" className="bg-slate-900">এনক্রিপ্টেড</option>
                  <option value="পিডিএফ" className="bg-slate-900">পিডিএফ</option>
                  <option value="ছবি" className="bg-slate-900">ছবি</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">ফাইলের সাইজ</label>
                <input
                  required
                  type="text"
                  value={formData.file_size}
                  onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                  placeholder="যেমন: ১.৫ MB"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">অ্যাক্সেস লেভেল</label>
                <select
                  value={formData.access_level}
                  onChange={(e) => setFormData({ ...formData, access_level: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50 appearance-none"
                >
                  <option value="শুধুমাত্র অ্যাডমিন" className="bg-slate-900">শুধুমাত্র অ্যাডমিন</option>
                  <option value="পরিবার প্রধান" className="bg-slate-900">পরিবার প্রধান</option>
                  <option value="সাধারণ সদস্য" className="bg-slate-900">সাধারণ সদস্য</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">মেয়াদ (Expiry)</label>
                <input
                  required
                  type="text"
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                  placeholder="যেমন: কখনো না বা ১ বছর"
                />
              </div>
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
                ফাইল রেকর্ড করুন
              </button>
            </div>
          </form>
        </Modal>
      </main>

    </div>
  );
}
