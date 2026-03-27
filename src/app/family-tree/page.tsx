"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { GitBranch, ChevronRight, ChevronDown, Heart, Star, MapPin, Calendar } from "lucide-react";

interface FamilyMember {
  id: number; name: string; nameEn: string; relation: string;
  birth?: string; death?: string; location?: string; story?: string;
  children?: FamilyMember[]; isDeceased?: boolean;
}

const familyTree: FamilyMember = {
  id: 0, name: "মরহুম আব্দুল গফুর", nameEn: "Abdul Gafur", relation: "প্রতিষ্ঠাতা",
  birth: "১৯৩০", death: "২০১৫", location: "গোপালগঞ্জ", isDeceased: true,
  story: "পরিবারের প্রতিষ্ঠাতা। তিনি কৃষি ও শিক্ষায় গুরুত্বপূর্ণ অবদান রেখেছেন।",
  children: [
    {
      id: 1, name: "আব্দুল করিম", nameEn: "Abdul Karim", relation: "জ্যেষ্ঠ পুত্র",
      birth: "১৯৫৫", location: "ঢাকা",
      story: "পরিবারের বর্তমান প্রধান। সকল পারিবারিক সিদ্ধান্তে নেতৃত্ব দেন।",
      children: [
        { id: 10, name: "মোহাম্মদ আলী", nameEn: "Mohammad Ali", relation: "নাতি", birth: "১৯৮৫", location: "সিলেট" },
        { id: 11, name: "সালমা খাতুন", nameEn: "Salma Khatun", relation: "নাতনী", birth: "১৯৮৮", location: "বরিশাল" },
      ],
    },
    {
      id: 2, name: "ফারুক আহমেদ", nameEn: "Faruk Ahmed", relation: "কনিষ্ঠ পুত্র",
      birth: "১৯৬০", location: "চট্টগ্রাম",
      children: [
        { id: 20, name: "জামাল উদ্দিন", nameEn: "Jamal Uddin", relation: "ভাতিজা", birth: "১৯৯০", location: "খুলনা" },
      ],
    },
    {
      id: 3, name: "রহিমা বেগম", nameEn: "Rahima Begum", relation: "কন্যা",
      birth: "১৯৫৮", location: "রাজশাহী",
    },
    {
      id: 4, name: "করিম উদ্দিন", nameEn: "Korim Uddin", relation: "ভাই",
      birth: "১৯৩৫", location: "ময়মনসিংহ",
      children: [
        { id: 40, name: "নূরজাহান বেগম", nameEn: "Nurjahan Begum", relation: "ভাতিজি", birth: "১৯৭০", location: "ময়মনসিংহ" },
      ],
    },
  ],
};

function TreeNode({ member, depth = 0 }: { member: FamilyMember; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = member.children && member.children.length > 0;

  return (
    <div className="fade-in-up" style={{ animationDelay: `${depth * 100}ms` }}>
      <div
        className={`glass-card p-4 mb-3 flex items-center gap-4 cursor-pointer group transition-all ${
          member.isDeceased ? "border-l-4" : ""
        }`}
        style={{
          marginLeft: depth > 0 ? `${depth * 24}px` : 0,
          borderLeftColor: member.isDeceased ? "var(--gold)" : "transparent",
        }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
          member.isDeceased ? "text-white" : "text-white"
        }`} style={{
          background: member.isDeceased
            ? "linear-gradient(135deg, var(--gold), #d97706)"
            : `linear-gradient(135deg, var(--primary), ${depth === 0 ? "var(--gold)" : "var(--info)"})`,
        }}>
          {member.isDeceased ? <Heart size={20} /> : member.name.substring(0, 2)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-semibold text-sm ${member.isDeceased ? "gradient-text" : ""}`}>{member.name}</h3>
            {member.isDeceased && <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(245, 158, 11, 0.15)", color: "var(--gold)" }}>মরহুম</span>}
            <span className="badge badge-info text-[9px]">{member.relation}</span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
            {member.birth && (
              <span className="flex items-center gap-1"><Calendar size={10} /> {member.birth}{member.death ? ` – ${member.death}` : ""}</span>
            )}
            {member.location && (
              <span className="flex items-center gap-1"><MapPin size={10} /> {member.location}</span>
            )}
          </div>
          {member.story && (
            <p className="text-[10px] mt-1 opacity-60 line-clamp-2">{member.story}</p>
          )}
        </div>

        {/* Expand icon */}
        {hasChildren && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--text-muted)" }}>
              {member.children!.length}
            </span>
            {expanded ? <ChevronDown size={16} className="opacity-40" /> : <ChevronRight size={16} className="opacity-40" />}
          </div>
        )}
      </div>

      {/* Children */}
      {expanded && hasChildren && (
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "var(--glass-border)" }} />
          {member.children!.map((child) => (
            <TreeNode key={child.id} member={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FamilyTreePage() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 px-6 py-4"
          style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <div className="flex items-center gap-3 md:ml-0 ml-12">
            <div className="p-2 rounded-xl" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
              <GitBranch size={20} style={{ color: "var(--primary)" }} />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">পারিবারিক বংশগাছ</h1>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>ইন্টারেক্টিভ ফ্যামিলি ট্রি — ক্লিক করে প্রসারিত/সংকুচিত করুন</p>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Legend */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-3 h-3 rounded" style={{ background: "linear-gradient(135deg, var(--gold), #d97706)" }} />
              <span style={{ color: "var(--text-muted)" }}>মরহুম</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-3 h-3 rounded" style={{ background: "linear-gradient(135deg, var(--primary), var(--gold))" }} />
              <span style={{ color: "var(--text-muted)" }}>প্রতিষ্ঠাতা প্রজন্ম</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-3 h-3 rounded" style={{ background: "linear-gradient(135deg, var(--primary), var(--info))" }} />
              <span style={{ color: "var(--text-muted)" }}>বর্তমান সদস্য</span>
            </div>
          </div>

          {/* Tree */}
          <TreeNode member={familyTree} />
        </div>
      </main>
    </div>
  );
}
