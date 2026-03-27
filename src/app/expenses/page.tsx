"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AnimatedCounter from "@/components/AnimatedCounter";
import MiniChart from "@/components/MiniChart";
import {
  Wallet, Plus, TrendingUp, TrendingDown, ArrowUpRight, FileText,
  Search, Filter, Upload, Download, Calendar, Tag, User,
} from "lucide-react";

interface Expense {
  id: number; title: string; amount: number; date: string;
  category: string; paidBy: string; receipt?: boolean;
}

const expenses: Expense[] = [
  { id: 1, title: "জমি করের পরিশোধ", amount: 45000, date: "২৫ মার্চ ২০২৬", category: "জমি", paidBy: "আব্দুল করিম", receipt: true },
  { id: 2, title: "মসজিদ মেরামত অনুদান", amount: 15000, date: "২০ মার্চ ২০২৬", category: "অনুদান", paidBy: "ফারুক আহমেদ" },
  { id: 3, title: "পারিবারিক খাবারের খরচ", amount: 8500, date: "১৮ মার্চ ২০২৬", category: "খাবার", paidBy: "জামাল উদ্দিন" },
  { id: 4, title: "বিদ্যুৎ বিল", amount: 3200, date: "১৫ মার্চ ২০২৬", category: "বিল", paidBy: "মোহাম্মদ আলী", receipt: true },
  { id: 5, title: "শিক্ষা উপকরণ", amount: 12000, date: "১০ মার্চ ২০২৬", category: "শিক্ষা", paidBy: "রহিমা বেগম", receipt: true },
  { id: 6, title: "চিকিৎসা খরচ", amount: 25000, date: "০৫ মার্চ ২০২৬", category: "চিকিৎসা", paidBy: "সালমা খাতুন" },
  { id: 7, title: "ফসলের সার কেনা", amount: 18000, date: "০১ মার্চ ২০২৬", category: "কৃষি", paidBy: "আব্দুল করিম", receipt: true },
  { id: 8, title: "পরিবহন খরচ", amount: 5500, date: "২৮ ফেব্রু ২০২৬", category: "পরিবহন", paidBy: "মোহাম্মদ আলী" },
];

const categories = ["সব", "জমি", "অনুদান", "খাবার", "বিল", "শিক্ষা", "চিকিৎসা", "কৃষি", "পরিবহন"];
const monthlyData = [32000, 28000, 45000, 38000, 52000, 41000, 48000, 35000, 55000, 42000, 38000, 48700];
const reportTypes = ["মাসিক", "বার্ষিক", "জমি-ভিত্তিক", "সদস্য-ভিত্তিক", "কাস্টম"];

export default function ExpensesPage() {
  const [selectedCat, setSelectedCat] = useState("সব");
  const [search, setSearch] = useState("");
  const [showReportMenu, setShowReportMenu] = useState(false);

  const filtered = expenses.filter((e) => {
    const matchCat = selectedCat === "সব" || e.category === selectedCat;
    const matchSearch = e.title.includes(search) || e.paidBy.includes(search);
    return matchCat && matchSearch;
  });

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const catBreakdown = categories.slice(1).map((cat) => ({
    name: cat,
    total: expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0),
  })).sort((a, b) => b.total - a.total);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 px-6 py-4"
          style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:ml-0 ml-12">
              <div className="p-2 rounded-xl" style={{ background: "rgba(245, 158, 11, 0.1)" }}>
                <Wallet size={20} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">খরচের হিসাব</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>স্মার্ট ক্যাটাগরি • OCR রেডি • ব্র্যান্ডেড PDF</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="খরচ খুঁজুন..." className="pl-9 pr-4 py-2 rounded-xl text-xs border-0 outline-none w-48"
                  style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--foreground)" }} />
              </div>
              <div className="relative">
                <button onClick={() => setShowReportMenu(!showReportMenu)} className="btn-secondary text-xs py-2">
                  <FileText size={14} /> PDF রিপোর্ট
                </button>
                {showReportMenu && (
                  <div className="absolute right-0 top-full mt-2 z-30 w-48 glass-card p-2 space-y-1" style={{ background: "var(--sidebar-bg)" }}>
                    {reportTypes.map((r) => (
                      <button key={r} className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-glass transition-colors flex items-center gap-2">
                        <Download size={12} /> {r} রিপোর্ট
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="btn-primary text-xs py-2"><Plus size={14} /> খরচ যোগ</button>
            </div>
          </div>
          {/* Category filter */}
          <div className="flex items-center gap-2 mt-3 pt-3 overflow-x-auto" style={{ borderTop: "1px solid var(--card-border)" }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCat(cat)}
                className="px-3 py-1 rounded-full text-[10px] font-medium transition-all whitespace-nowrap flex-shrink-0"
                style={{
                  background: selectedCat === cat ? "linear-gradient(135deg, var(--primary), var(--gold))" : "var(--glass)",
                  color: selectedCat === cat ? "white" : "var(--text-muted)",
                  border: `1px solid ${selectedCat === cat ? "transparent" : "var(--glass-border)"}`,
                }}>
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-5 fade-in-up">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>এই মাসের মোট খরচ</p>
              <div className="stat-number gradient-text mt-2">৳<AnimatedCounter end={48700} /></div>
              <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "var(--success)" }}>
                <TrendingDown size={12} /> ৫% কম গত মাসের চেয়ে
              </div>
            </div>
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "100ms" }}>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>বার্ষিক মোট খরচ</p>
              <div className="stat-number gradient-text mt-2">৳<AnimatedCounter end={285000} /></div>
              <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "var(--gold)" }}>
                <TrendingUp size={12} /> গড় মাসিক ৳২৩,৭৫০
              </div>
            </div>
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "200ms" }}>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>মোট লেনদেন</p>
              <div className="stat-number gradient-text mt-2"><AnimatedCounter end={156} /></div>
              <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "var(--info)" }}>
                <ArrowUpRight size={12} /> এই মাসে ১২টি
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2 glass-card p-5 fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">মাসিক খরচের চার্ট</h3>
                <select className="bg-glass border border-glass-border rounded-lg text-xs p-1.5 outline-none">
                  <option>২০২৬</option><option>২০২৫</option>
                </select>
              </div>
              <MiniChart data={monthlyData} color="#f59e0b" height={200} />
              <div className="flex justify-between mt-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                {["এপ্রি", "মে", "জুন", "জুলা", "আগ", "সেপ্ট", "অক্টো", "নভে", "ডিসে", "জানু", "ফেব্রু", "মার্চ"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="glass-card p-5 fade-in-up" style={{ animationDelay: "400ms" }}>
              <h3 className="font-semibold text-sm mb-4">ক্যাটাগরি ভিত্তিক</h3>
              <div className="space-y-3">
                {catBreakdown.filter(c => c.total > 0).map((cat, i) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="flex items-center gap-1.5">
                        <Tag size={10} style={{ color: "var(--primary)" }} /> {cat.name}
                      </span>
                      <span className="font-semibold">৳{cat.total.toLocaleString()}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(cat.total / 45000) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden fade-in-up" style={{ animationDelay: "500ms" }}>
            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--card-border)" }}>
              <h3 className="font-semibold text-sm">সাম্প্রতিক খরচ ({filtered.length})</h3>
              <button className="btn-secondary text-[10px] py-1.5 px-3">
                <Upload size={12} /> রসিদ আপলোড
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>বিবরণ</th><th>পরিমাণ</th><th>তারিখ</th><th>বিভাগ</th><th>পরিশোধকারী</th><th>রসিদ</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => (
                    <tr key={e.id}>
                      <td className="font-medium">{e.title}</td>
                      <td className="font-semibold" style={{ color: "var(--gold)" }}>৳{e.amount.toLocaleString()}</td>
                      <td className="text-xs">{e.date}</td>
                      <td><span className="badge badge-info text-[10px]">{e.category}</span></td>
                      <td className="text-xs">{e.paidBy}</td>
                      <td>
                        {e.receipt ? (
                          <span className="badge badge-success text-[10px]">✓ আছে</span>
                        ) : (
                          <button className="badge badge-warning text-[10px] cursor-pointer hover:opacity-80">
                            <Upload size={10} /> আপলোড
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
