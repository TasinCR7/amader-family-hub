"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { GitBranch, ChevronRight, ChevronDown, Heart, MapPin, Calendar, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface FamilyMember {
  id: number;
  name: string;
  name_en?: string;
  relation?: string;
  birth_year?: string;
  death_year?: string;
  location?: string;
  story?: string;
  is_deceased?: boolean;
  parent_id?: number | null;
  children?: FamilyMember[];
}

function TreeNode({ member, depth = 0 }: { member: FamilyMember; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = member.children && member.children.length > 0;

  return (
    <div className="fade-in-up" style={{ animationDelay: `${depth * 100}ms` }}>
      <div
        className={`glass-card p-4 mb-3 flex items-center gap-4 cursor-pointer group transition-all ${
          member.is_deceased ? "border-l-4" : ""
        }`}
        style={{
          marginLeft: depth > 0 ? `${depth * 24}px` : 0,
          borderLeftColor: member.is_deceased ? "var(--gold)" : "transparent",
        }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0" 
          style={{
            background: member.is_deceased
              ? "linear-gradient(135deg, var(--gold), #d97706)"
              : `linear-gradient(135deg, var(--primary), ${depth === 0 ? "var(--gold)" : "var(--info)"})`,
            color: "white"
          }}>
          {member.is_deceased ? <Heart size={20} /> : member.name.substring(0, 2)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-semibold text-sm ${member.is_deceased ? "gradient-text" : ""}`}>{member.name}</h3>
            {member.is_deceased && <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(245, 158, 11, 0.15)", color: "var(--gold)" }}>মরহুম</span>}
            <span className="badge badge-info text-[9px]">{member.relation}</span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
            {member.birth_year && (
              <span className="flex items-center gap-1"><Calendar size={10} /> {member.birth_year}{member.death_year ? ` – ${member.death_year}` : ""}</span>
            )}
            {member.location && (
              <span className="flex items-center gap-1"><MapPin size={10} /> {member.location}</span>
            )}
          </div>
        </div>

        {hasChildren && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--text-muted)" }}>
              {member.children!.length}
            </span>
            {expanded ? <ChevronDown size={16} className="opacity-40" /> : <ChevronRight size={16} className="opacity-40" />}
          </div>
        )}
      </div>

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
  const [root, setRoot] = useState<FamilyMember | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTree() {
      setLoading(true);
      const { data, error } = await supabase.from('members').select('*');
      
      if (!error && data) {
        // Build hierarchy
        const memberMap: { [key: number]: FamilyMember } = {};
        data.forEach(m => memberMap[m.id] = { ...m, children: [] });
        
        let rootNode: FamilyMember | null = null;
        data.forEach(m => {
          if (m.parent_id && memberMap[m.parent_id]) {
            memberMap[m.parent_id].children!.push(memberMap[m.id]);
          } else if (m.generation === '১ম প্রজন্ম' || !m.parent_id) {
            if (!rootNode) rootNode = memberMap[m.id];
          }
        });
        setRoot(rootNode);
      }
      setLoading(false);
    }
    fetchTree();
  }, []);

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
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>ইন্টারেক্টিভ ফ্যামিলি ট্রি — ডাটাবেস থেকে লোড করা</p>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-primary opacity-20" />
              <p className="mt-4 text-xs text-muted-foreground">বংশগাছ তৈরি হচ্ছে...</p>
            </div>
          ) : root ? (
            <TreeNode member={root} />
          ) : (
            <div className="p-20 text-center glass-card">
              <GitBranch size={48} className="mx-auto mb-4 opacity-10" />
              <p className="text-sm text-muted-foreground">কোনো বংশগাছ খুঁজে পাওয়া যায়নি। মেম্বার অ্যাড করার সময় "Parent ID" সেট করুন।</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
