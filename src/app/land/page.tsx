"use client";

import Sidebar from "@/components/Sidebar";
import { MapPin, Plus, FileText, Eye, Upload, Landmark } from "lucide-react";

const lands = [
  { id: 1, name: "বাড়ির জমি", location: "গ্রাম: পূর্বপাড়া, উপজেলা: হাটহাজারী", area: "১২ শতক", type: "আবাসিক", status: "নিজস্ব", docs: 3 },
  { id: 2, name: "কৃষি জমি - উত্তর", location: "গ্রাম: দক্ষিণপাড়া, উপজেলা: রাউজান", area: "৫০ শতক", type: "কৃষি", status: "নিজস্ব", docs: 5 },
  { id: 3, name: "বাগান জমি", location: "গ্রাম: মধ্যমপাড়া, উপজেলা: ফটিকছড়ি", area: "৩০ শতক", type: "বাগান", status: "ভাড়া", docs: 2 },
  { id: 4, name: "দোকান জমি", location: "বাজার: কদমতলী, উপজেলা: হাটহাজারী", area: "৫ শতক", type: "বাণিজ্যিক", status: "নিজস্ব", docs: 4 },
  { id: 5, name: "পুকুর পাড়ের জমি", location: "গ্রাম: পূর্বপাড়া, উপজেলা: হাটহাজারী", area: "১৮ শতক", type: "মিশ্র", status: "নিজস্ব", docs: 1 },
];

const typeColors: Record<string, string> = {
  "আবাসিক": "badge-success",
  "কৃষি": "badge-warning",
  "বাগান": "badge-info",
  "বাণিজ্যিক": "badge-danger",
  "মিশ্র": "badge-info",
};

export default function LandPage() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">জমি ব্যবস্থাপনা</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>পরিবারের সকল জমির রেকর্ড ও দলিলপত্র</p>
          </div>
          <button className="btn-primary"><Plus size={16} /> নতুন জমি যোগ করুন</button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="glass-card p-4 text-center fade-in-up">
            <Landmark size={20} className="mx-auto mb-2" style={{ color: "var(--primary)" }} />
            <div className="text-xl font-bold">৫</div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>মোট জমি</p>
          </div>
          <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "100ms" }}>
            <MapPin size={20} className="mx-auto mb-2" style={{ color: "var(--gold)" }} />
            <div className="text-xl font-bold">১১৫ শতক</div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>মোট আয়তন</p>
          </div>
          <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "200ms" }}>
            <FileText size={20} className="mx-auto mb-2" style={{ color: "var(--info)" }} />
            <div className="text-xl font-bold">১৫</div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>মোট দলিল</p>
          </div>
          <div className="glass-card p-4 text-center fade-in-up" style={{ animationDelay: "300ms" }}>
            <div className="text-xl font-bold" style={{ color: "var(--success)" }}>৮০%</div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>নিজস্ব জমি</p>
          </div>
        </div>

        {/* Land cards */}
        <div className="space-y-3">
          {lands.map((land, i) => (
            <div key={land.id} className="glass-card p-5 fade-in-up" style={{ animationDelay: `${(i + 4) * 80}ms` }}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16, 185, 129, 0.15)" }}>
                    <MapPin size={18} style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{land.name}</h3>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{land.location}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold">{land.area}</span>
                  <span className={`badge text-[10px] ${typeColors[land.type]}`}>{land.type}</span>
                  <span className={`badge text-[10px] ${land.status === "নিজস্ব" ? "badge-success" : "badge-warning"}`}>{land.status}</span>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg" style={{ background: "var(--glass)" }}><Eye size={14} /></button>
                    <button className="p-2 rounded-lg" style={{ background: "var(--glass)" }}><Upload size={14} /></button>
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
