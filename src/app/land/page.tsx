"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  MapPin, Plus, FileText, Upload, Search, CheckCircle2, Clock,
  AlertTriangle, Eye, Download, History, Folder, BarChart3,
} from "lucide-react";

interface LandRecord {
  id: number; name: string; location: string; area: string;
  dagNo: string; status: "নিষ্পত্তি" | "চলমান" | "বিরোধ"; docs: number;
  value: string; lastUpdated: string;
}

const lands: LandRecord[] = [
  { id: 1, name: "পূর্বপাড়া কৃষিজমি", location: "মৌজা: পূর্বপাড়া, উপজেলা: সদর", area: "২.৫ একর", dagNo: "দাগ নং ১২৩৪", status: "নিষ্পত্তি", docs: 5, value: "৳১,৫০,০০,০০০", lastUpdated: "মার্চ ২০২৬" },
  { id: 2, name: "বাজার সংলগ্ন প্লট", location: "মৌজা: হাটপাড়া, উপজেলা: সদর", area: "১০ শতক", dagNo: "দাগ নং ৫৬৭৮", status: "চলমান", docs: 3, value: "৳৩৫,০০,০০০", lastUpdated: "ফেব্রুয়ারি ২০২৬" },
  { id: 3, name: "পৈতৃক বাড়ির জমি", location: "মৌজা: গোবিন্দপুর, উপজেলা: কোটালীপাড়া", area: "৫ কাঠা", dagNo: "দাগ নং ৯১০১", status: "নিষ্পত্তি", docs: 8, value: "৳২০,০০,০০০", lastUpdated: "জানুয়ারি ২০২৬" },
  { id: 4, name: "নদীর পাড়ের জমি", location: "মৌজা: চরভাটি, উপজেলা: রাজবাড়ী", area: "১.২ একর", dagNo: "দাগ নং ১১১২", status: "বিরোধ", docs: 2, value: "৳৪৫,০০,০০০", lastUpdated: "মার্চ ২০২৬" },
  { id: 5, name: "শহরের বাণিজ্যিক প্লট", location: "মৌজা: স্টেশনপাড়া, পৌরসভা: গোপালগঞ্জ", area: "৫ শতক", dagNo: "দাগ নং ১৩১৪", status: "চলমান", docs: 4, value: "৳৯০,০০,০০০", lastUpdated: "মার্চ ২০২৬" },
];

export default function LandPage() {
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<LandRecord | null>(null);

  const filtered = lands.filter((l) =>
    l.name.includes(search) || l.location.includes(search) || l.dagNo.includes(search)
  );

  const totalLands = lands.length;
  const settled = lands.filter((l) => l.status === "নিষ্পত্তি").length;
  const ongoing = lands.filter((l) => l.status === "চলমান").length;
  const disputes = lands.filter((l) => l.status === "বিরোধ").length;

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 px-6 py-4"
          style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:ml-0 ml-12">
              <div className="p-2 rounded-xl" style={{ background: "rgba(168, 85, 247, 0.1)" }}>
                <MapPin size={20} style={{ color: "#a855f7" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">জমি ও সম্পত্তি</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>ডকুমেন্ট ভল্ট • স্ট্যাটাস ওয়ার্কফ্লো • প্রগ্রেস ট্র্যাকিং</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="জমি বা দাগ নং..." className="pl-9 pr-4 py-2 rounded-xl text-xs border-0 outline-none w-48"
                  style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--foreground)" }} />
              </div>
              <button className="btn-primary text-xs py-2"><Plus size={14} /> নতুন রেকর্ড</button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass-card p-4 text-center fade-in-up">
              <p className="text-2xl font-extrabold gradient-text">{totalLands}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>মোট সম্পত্তি</p>
            </div>
            <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "100ms" }}>
              <p className="text-2xl font-extrabold" style={{ color: "var(--success)" }}>{settled}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>নিষ্পত্তি</p>
            </div>
            <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "200ms" }}>
              <p className="text-2xl font-extrabold" style={{ color: "var(--gold)" }}>{ongoing}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>চলমান</p>
            </div>
            <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "300ms" }}>
              <p className="text-2xl font-extrabold" style={{ color: "var(--danger)" }}>{disputes}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>বিরোধ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Land Records Table */}
            <div className="lg:col-span-2 glass-card overflow-hidden fade-in-up" style={{ animationDelay: "400ms" }}>
              <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--card-border)" }}>
                <h3 className="font-semibold text-sm">সম্পত্তি তালিকা</h3>
                <BarChart3 size={16} style={{ color: "var(--text-muted)" }} />
              </div>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr><th>সম্পত্তি</th><th>এলাকা</th><th>পরিমাণ</th><th>স্ট্যাটাস</th><th>দলিল</th><th></th></tr>
                  </thead>
                  <tbody>
                    {filtered.map((land) => (
                      <tr key={land.id} className="cursor-pointer" onClick={() => setSelectedRecord(land)}>
                        <td>
                          <p className="font-medium text-xs">{land.name}</p>
                          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{land.dagNo}</p>
                        </td>
                        <td className="text-xs">{land.area}</td>
                        <td className="text-xs font-semibold" style={{ color: "var(--gold)" }}>{land.value}</td>
                        <td>
                          <span className={`badge text-[10px] ${
                            land.status === "নিষ্পত্তি" ? "badge-success" :
                            land.status === "চলমান" ? "badge-warning" : "badge-danger"
                          }`}>
                            {land.status === "নিষ্পত্তি" ? <CheckCircle2 size={10} /> :
                             land.status === "চলমান" ? <Clock size={10} /> : <AlertTriangle size={10} />}
                            {land.status}
                          </span>
                        </td>
                        <td className="text-xs">
                          <div className="flex items-center gap-1">
                            <Folder size={12} style={{ color: "var(--info)" }} /> {land.docs}টি
                          </div>
                        </td>
                        <td><Eye size={14} style={{ color: "var(--text-muted)" }} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detail Panel / Map Placeholder */}
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "500ms" }}>
              {!selectedRecord ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <MapPin size={48} className="opacity-10 mb-4" />
                  <h3 className="text-sm" style={{ color: "var(--text-muted)" }}>বিশদ তথ্য দেখতে একটি সম্পত্তি নির্বাচন করুন</h3>
                  <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>ম্যাপ, দলিল এবং ইতিহাস এখানে দেখানো হবে</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-bold text-lg">{selectedRecord.name}</h3>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{selectedRecord.location}</p>
                  </div>

                  {/* Map Placeholder */}
                  <div className="w-full h-36 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(16, 185, 129, 0.05))", border: "1px dashed var(--glass-border)" }}>
                    <div className="text-center">
                      <MapPin size={24} className="mx-auto mb-1 opacity-30" />
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>ম্যাপ ভিউ (শীঘ্রই আসছে)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl" style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }}>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>পরিমাণ</p>
                      <p className="text-sm font-bold">{selectedRecord.area}</p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }}>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>মূল্য</p>
                      <p className="text-sm font-bold" style={{ color: "var(--gold)" }}>{selectedRecord.value}</p>
                    </div>
                  </div>

                  {/* Document Vault */}
                  <div>
                    <h4 className="text-xs font-semibold flex items-center gap-1.5 mb-3">
                      <Folder size={12} style={{ color: "var(--info)" }} /> ডকুমেন্ট ভল্ট ({selectedRecord.docs}টি)
                    </h4>
                    <div className="space-y-2">
                      {["মূল দলিল.pdf", "নামজারি রসিদ.pdf", "ম্যাপ কপি.jpg"].slice(0, selectedRecord.docs).map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }}>
                          <div className="flex items-center gap-2">
                            <FileText size={12} style={{ color: "var(--primary)" }} />
                            <span className="text-[10px]">{doc}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button className="p-1 rounded hover:bg-glass"><Download size={10} /></button>
                            <button className="p-1 rounded hover:bg-glass"><History size={10} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-2 p-2 rounded-xl text-[10px] transition-colors flex items-center justify-center gap-1"
                      style={{ background: "var(--glass)", border: "1px dashed var(--glass-border)", color: "var(--text-muted)" }}>
                      <Upload size={10} /> নতুন দলিল আপলোড
                    </button>
                  </div>

                  {/* Status Workflow */}
                  <div>
                    <h4 className="text-xs font-semibold mb-3">স্ট্যাটাস ওয়ার্কফ্লো</h4>
                    <div className="flex items-center gap-2">
                      {["নিষ্পত্তি", "চলমান", "বিরোধ"].map((s, i) => (
                        <div key={s} className="flex items-center gap-1">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold ${
                            selectedRecord.status === s ? "text-white" : "text-muted-foreground"
                          }`} style={{
                            background: selectedRecord.status === s
                              ? (s === "নিষ্পত্তি" ? "var(--success)" : s === "চলমান" ? "var(--gold)" : "var(--danger)")
                              : "var(--glass)",
                            border: `1px solid ${selectedRecord.status === s ? "transparent" : "var(--glass-border)"}`,
                          }}>
                            {i + 1}
                          </div>
                          <span className="text-[9px]">{s}</span>
                          {i < 2 && <div className="w-4 h-px" style={{ background: "var(--glass-border)" }} />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    সর্বশেষ আপডেট: {selectedRecord.lastUpdated}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
