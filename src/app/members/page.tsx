"use client";

import Sidebar from "@/components/Sidebar";
import { Users, Search, Mail, Phone, MapPin, UserPlus, Filter } from "lucide-react";

const members = [
  { id: 1, name: "আব্দুল করিম", nameEn: "Abdul Karim", role: "প্রধান", phone: "০১৭XXXXXXXX", email: "karim@family.com", location: "ঢাকা", status: "active", avatar: "AK" },
  { id: 2, name: "ফারুক আহমেদ", nameEn: "Faruk Ahmed", role: "সদস্য", phone: "০১৮XXXXXXXX", email: "faruk@family.com", location: "চট্টগ্রাম", status: "active", avatar: "FA" },
  { id: 3, name: "মোহাম্মদ আলী", nameEn: "Mohammad Ali", role: "সদস্য", phone: "০১৯XXXXXXXX", email: "ali@family.com", location: "সিলেট", status: "active", avatar: "MA" },
  { id: 4, name: "রহিমা বেগম", nameEn: "Rahima Begum", role: "সদস্য", phone: "০১৬XXXXXXXX", email: "rahima@family.com", location: "রাজশাহী", status: "inactive", avatar: "RB" },
  { id: 5, name: "জামাল উদ্দিন", nameEn: "Jamal Uddin", role: "কোষাধ্যক্ষ", phone: "০১৫XXXXXXXX", email: "jamal@family.com", location: "খুলনা", status: "active", avatar: "JU" },
  { id: 6, name: "সালমা খাতুন", nameEn: "Salma Khatun", role: "সদস্য", phone: "০১৩XXXXXXXX", email: "salma@family.com", location: "বরিশাল", status: "active", avatar: "SK" },
];

export default function MembersPage() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">সদস্য তালিকা</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>পরিবারের সকল সদস্যের তথ্য</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="সদস্য খুঁজুন..."
                className="pl-9 pr-4 py-2 rounded-xl text-sm border-0 outline-none"
                style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--foreground)" }}
              />
            </div>
            <button className="btn-secondary py-2 px-3"><Filter size={16} /></button>
            <button className="btn-primary"><UserPlus size={16} /> যোগ করুন</button>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {members.map((member, i) => (
            <div key={member.id} className="glass-card p-5 fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--gold))" }}
                >
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm truncate">{member.name}</h3>
                    <span className={`badge text-[10px] ${member.status === "active" ? "badge-success" : "badge-danger"}`}>
                      {member.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{member.role}</p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <Phone size={12} /> {member.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <Mail size={12} /> {member.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <MapPin size={12} /> {member.location}
                    </div>
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
