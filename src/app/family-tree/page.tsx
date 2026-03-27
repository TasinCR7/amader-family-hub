"use client";

import Sidebar from "@/components/Sidebar";
import { GitBranch, ZoomIn, ZoomOut, Maximize } from "lucide-react";

interface FamilyMember {
  name: string;
  relation: string;
  born?: string;
  died?: string;
  children?: FamilyMember[];
}

const familyTree: FamilyMember = {
  name: "মরহুম আব্দুল গফুর",
  relation: "প্রতিষ্ঠাতা",
  born: "১৯৩০",
  died: "২০১৫",
  children: [
    {
      name: "আব্দুল করিম",
      relation: "বড় ছেলে",
      born: "১৯৫৫",
      children: [
        { name: "ফারুক আহমেদ", relation: "নাতি", born: "১৯৮০", children: [
          { name: "তানভীর", relation: "প্রপৌত্র", born: "২০০৫" },
          { name: "তাসনিম", relation: "প্রপৌত্রী", born: "২০০৮" },
        ]},
        { name: "সালমা খাতুন", relation: "নাতনী", born: "১৯৮৩" },
      ],
    },
    {
      name: "মোহাম্মদ আলী",
      relation: "মেজো ছেলে",
      born: "১৯৫৮",
      children: [
        { name: "জামাল উদ্দিন", relation: "নাতি", born: "১৯৮৫", children: [
          { name: "আরাফ", relation: "প্রপৌত্র", born: "২০১০" },
        ]},
      ],
    },
    {
      name: "রহিমা বেগম",
      relation: "মেয়ে",
      born: "১৯৬২",
      children: [
        { name: "নাসরিন", relation: "নাতনী", born: "১৯৮৮" },
        { name: "নাসিমা", relation: "নাতনী", born: "১৯৯০" },
      ],
    },
  ],
};

function TreeNode({ member, level = 0 }: { member: FamilyMember; level?: number }) {
  const isRoot = level === 0;
  const isDeceased = !!member.died;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`glass-card px-4 py-3 text-center min-w-[140px] relative ${isRoot ? "pulse-glow" : ""}`}
        style={{
          background: isRoot
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(245, 158, 11, 0.1))"
            : isDeceased
            ? "rgba(100, 100, 100, 0.15)"
            : "var(--card-bg)",
          borderColor: isRoot ? "rgba(16, 185, 129, 0.4)" : "var(--card-border)",
        }}
      >
        <p className="font-semibold text-sm">{member.name}</p>
        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
          {member.relation}
        </p>
        <p className="text-[10px] mt-1" style={{ color: isDeceased ? "var(--danger)" : "var(--primary-light)" }}>
          {member.born}{member.died ? ` — ${member.died}` : ""} {isDeceased ? "🕌" : ""}
        </p>
      </div>

      {member.children && member.children.length > 0 && (
        <>
          <div className="w-px h-6" style={{ background: "var(--glass-border)" }} />
          <div className="flex gap-3 md:gap-6 relative">
            {member.children.length > 1 && (
              <div
                className="absolute top-0 h-px"
                style={{
                  background: "var(--glass-border)",
                  left: "50%",
                  right: "50%",
                  width: `calc(100% - 140px)`,
                  marginLeft: "calc(-50% + 70px)",
                }}
              />
            )}
            {member.children.map((child, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-px h-6" style={{ background: "var(--glass-border)" }} />
                <TreeNode member={child} level={level + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FamilyTreePage() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">বংশ বৃক্ষ</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>মরহুম আব্দুল গফুর পরিবারের বংশ তালিকা</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary p-2"><ZoomIn size={16} /></button>
            <button className="btn-secondary p-2"><ZoomOut size={16} /></button>
            <button className="btn-secondary p-2"><Maximize size={16} /></button>
          </div>
        </div>

        <div className="glass-card p-8 overflow-x-auto fade-in-up">
          <div className="flex justify-center min-w-[600px]">
            <TreeNode member={familyTree} />
          </div>
        </div>

        {/* Legend */}
        <div className="glass-card p-4 mt-4 flex flex-wrap gap-4 text-xs fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: "rgba(16, 185, 129, 0.3)" }} />
            <span>প্রতিষ্ঠাতা</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }} />
            <span>জীবিত সদস্য</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: "rgba(100, 100, 100, 0.15)" }} />
            <span>মরহুম 🕌</span>
          </div>
        </div>
      </main>
    </div>
  );
}
