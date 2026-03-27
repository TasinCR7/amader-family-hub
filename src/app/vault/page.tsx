"use client";

import Sidebar from "@/components/Sidebar";
import { Lock, FileText, Clock, Shield, Eye, Download, AlertTriangle, Plus } from "lucide-react";

const vaultItems = [
  { id: 1, name: "পারিবারিক সংবিধান", type: "PDF", access: "সবাই", expires: "কখনো না", size: "২.৫ MB", uploaded: "জানু ২০২৬" },
  { id: 2, name: "ব্যাংক অ্যাকাউন্ট তথ্য", type: "এনক্রিপ্টেড", access: "শুধু অ্যাডমিন", expires: "৩০ দিন", size: "১৫ KB", uploaded: "মার্চ ২০২৬" },
  { id: 3, name: "জমির মূল দলিল (স্ক্যান)", type: "ছবি", access: "সিনিয়র সদস্য", expires: "কখনো না", size: "১৫ MB", uploaded: "ফেব্রু ২০২৬" },
  { id: 4, name: "পাসওয়ার্ড ভল্ট", type: "এনক্রিপ্টেড", access: "শুধু অ্যাডমিন", expires: "৭ দিন", size: "৫ KB", uploaded: "মার্চ ২০২৬" },
  { id: 5, name: "বীমা নথি", type: "PDF", access: "সিনিয়র সদস্য", expires: "৯০ দিন", size: "৩ MB", uploaded: "জানু ২০২৬" },
];

export default function VaultPage() {
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
            <button className="btn-primary text-xs py-2"><Plus size={14} /> নতুন ফাইল</button>
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
            <table className="data-table">
              <thead>
                <tr><th>নাম</th><th>ধরন</th><th>অ্যাক্সেস</th><th>মেয়াদ</th><th>সাইজ</th><th></th></tr>
              </thead>
              <tbody>
                {vaultItems.map((item, i) => (
                  <tr key={item.id} className="fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                    <td><div className="flex items-center gap-2"><FileText size={14} style={{ color: "var(--primary)" }} /><span className="font-medium text-xs">{item.name}</span></div></td>
                    <td><span className={`badge text-[10px] ${item.type === "এনক্রিপ্টেড" ? "badge-danger" : "badge-info"}`}>{item.type}</span></td>
                    <td className="text-xs"><div className="flex items-center gap-1"><Shield size={10} /> {item.access}</div></td>
                    <td className="text-xs">
                      {item.expires === "কখনো না" ? (
                        <span style={{ color: "var(--success)" }}>∞ স্থায়ী</span>
                      ) : (
                        <span className="flex items-center gap-1" style={{ color: "var(--gold)" }}><Clock size={10} /> {item.expires}</span>
                      )}
                    </td>
                    <td className="text-xs" style={{ color: "var(--text-muted)" }}>{item.size}</td>
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
          </div>
        </div>
      </main>
    </div>
  );
}
