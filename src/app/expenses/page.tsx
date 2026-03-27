"use client";

import Sidebar from "@/components/Sidebar";
import AnimatedCounter from "@/components/AnimatedCounter";
import MiniChart from "@/components/MiniChart";
import { Wallet, Plus, TrendingUp, TrendingDown, ArrowUpRight, FileText } from "lucide-react";

const expenses = [
  { id: 1, title: "জমি করের পরিশোধ", amount: 45000, date: "২৫ মার্চ ২০২৬", category: "জমি", paidBy: "আব্দুল করিম" },
  { id: 2, title: "মসজিদ মেরামত অনুদান", amount: 15000, date: "২০ মার্চ ২০২৬", category: "অনুদান", paidBy: "ফারুক আহমেদ" },
  { id: 3, title: "পারিবারিক খাবারের খরচ", amount: 8500, date: "১৮ মার্চ ২০২৬", category: "খাবার", paidBy: "জামাল উদ্দিন" },
  { id: 4, title: "বিদ্যুৎ বিল", amount: 3200, date: "১৫ মার্চ ২০২৬", category: "বিল", paidBy: "মোহাম্মদ আলী" },
  { id: 5, title: "শিক্ষা উপকরণ", amount: 12000, date: "১০ মার্চ ২০২৬", category: "শিক্ষা", paidBy: "রহিমা বেগম" },
  { id: 6, title: "চিকিৎসা খরচ", amount: 25000, date: "০৫ মার্চ ২০২৬", category: "চিকিৎসা", paidBy: "সালমা খাতুন" },
];

const monthlyData = [32000, 28000, 45000, 38000, 52000, 41000, 48000, 35000, 55000, 42000, 38000, 48700];

export default function ExpensesPage() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">খরচের হিসাব</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>পরিবারের সকল আয়-ব্যয়ের তথ্য</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary"><FileText size={16} /> PDF রিপোর্ট</button>
            <button className="btn-primary"><Plus size={16} /> খরচ যোগ করুন</button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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

        {/* Chart */}
        <div className="glass-card p-5 mb-6 fade-in-up" style={{ animationDelay: "300ms" }}>
          <h3 className="font-semibold text-base mb-3">মাসিক খরচের চার্ট</h3>
          <MiniChart data={monthlyData} color="#f59e0b" height={200} />
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden fade-in-up" style={{ animationDelay: "400ms" }}>
          <div className="p-5 border-b" style={{ borderColor: "var(--card-border)" }}>
            <h3 className="font-semibold text-base">সাম্প্রতিক খরচ</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>বিবরণ</th>
                  <th>পরিমাণ</th>
                  <th>তারিখ</th>
                  <th>বিভাগ</th>
                  <th>পরিশোধকারী</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id}>
                    <td className="font-medium">{e.title}</td>
                    <td className="font-semibold" style={{ color: "var(--gold)" }}>৳{e.amount.toLocaleString("bn-BD")}</td>
                    <td>{e.date}</td>
                    <td><span className="badge badge-info">{e.category}</span></td>
                    <td>{e.paidBy}</td>
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
