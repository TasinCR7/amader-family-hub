"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Brain, Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Message {
  id: number; text: string; sender: "user" | "ai"; time: string;
}

const initialMessages: Message[] = [
  { id: 1, text: "আসসালামু আলাইকুম! আমি আপনার পারিবারিক AI সহকারী। পরিবারের যেকোনো তথ্য সম্পর্কে আমাকে জিজ্ঞাসা করুন। 🤖", sender: "ai", time: "এখন" },
];

const suggestedQueries = [
  "এই মাসের মোট খরচ কত?",
  "কতগুলো কাজ চলমান আছে?",
  "পরবর্তী পারিবারিক সভা কবে?",
  "পরিবারের মোট সদস্য কতজন?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      const { data: members } = await supabase.from('members').select('count');
      const { data: expenses } = await supabase.from('expenses').select('amount');
      const { data: tasks } = await supabase.from('tasks').select('*', { count: 'exact' });
      const { data: events } = await supabase.from('events').select('*').limit(1);

      setStats({
        memberCount: members?.length || 0,
        totalExpenses: expenses?.reduce((sum, e) => sum + (e.amount || 0), 0) || 0,
        ongoingTasks: tasks?.filter(t => t.status === 'চলমান').length || 0,
        nextEvent: events?.[0] || null
      });
    }
    fetchStats();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: messages.length + 1, text: input, sender: "user", time: "এখন" };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    // AI Response Logic
    setTimeout(() => {
      let response = "দুঃখিত, আমি এই প্রশ্নের সঠিক উত্তর দিতে পারছি না। তবে পরিবারের তথ্য সম্পর্কে জিজ্ঞাসা করলে আমি সাহায্য করতে পারব! 🤔";
      
      if (input.includes("খরচ")) {
        response = `এই মুহূর্তে পরিবারের মোট রেকর্ডকৃত খরচ ৳${stats.totalExpenses.toLocaleString()}। 📊`;
      } else if (input.includes("কাজ")) {
        response = `বর্তমানে ${stats.ongoingTasks}টি কাজ চলমান আছে। ড্যাশবোর্ড থেকে বিস্তারিত দেখে নিন।`;
      } else if (input.includes("সভা") || input.includes("ইভেন্ট")) {
        response = stats.nextEvent 
          ? `পরবর্তী ইভেন্ট: "${stats.nextEvent.title}" যা ${stats.nextEvent.date} তারিখে অনুষ্ঠিত হবে। 📅` 
          : "বর্তমানে কোনো নতুন ইভেন্ট শিডিউল করা নেই।";
      } else if (input.includes("সদস্য")) {
        response = `বর্তমানে পরিবার পোর্টালে মোট ${stats.memberCount} জন সদস্য নিবন্ধিত আছেন। 👥`;
      }

      setMessages((prev) => [...prev, { id: prev.length + 1, text: response, sender: "ai", time: "এখন" }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <header className="sticky top-0 z-20 px-6 py-4"
          style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <div className="flex items-center gap-3 md:ml-0 ml-12">
            <div className="p-2 rounded-xl" style={{ background: "rgba(16, 185, 129, 0.1)" }}>
              <Brain size={20} style={{ color: "var(--primary)" }} />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text flex items-center gap-2">
                AI সহকারী <Sparkles size={16} className="text-gold animate-pulse" />
              </h1>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>লাইভ ডেটা ইন্টিগ্রেশন v1.1</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 fade-in-up ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                msg.sender === "ai" ? "bg-primary/10" : "bg-gradient-to-br from-primary to-gold"
              }`}>
                {msg.sender === "ai" ? <Bot size={16} style={{ color: "var(--primary)" }} /> : <User size={14} className="text-white" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl ${msg.sender === "user" ? "rounded-tr-sm bg-primary text-white" : "rounded-tl-sm bg-glass border border-glass-border shadow-sm"}`}>
                <p className="text-xs leading-relaxed">{msg.text}</p>
                <p className="text-[9px] mt-2 opacity-50">{msg.time}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2 items-center text-xs opacity-50">
              <Loader2 size={12} className="animate-spin" /> মস্তিস্ক প্রসেস করছে...
            </div>
          )}
        </div>

        <div className="px-6 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((q) => (
              <button key={q} onClick={() => setInput(q)} className="px-3 py-1.5 rounded-full text-[10px] bg-glass border border-glass-border hover:bg-glass-hover">
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 pt-2">
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-glass border border-glass-border">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="আপনার প্রশ্ন লিখুন..." className="flex-1 bg-transparent border-none outline-none text-xs px-2" />
            <button onClick={handleSend} className="btn-primary py-2 px-4 text-xs"><Send size={14} /></button>
          </div>
        </div>
      </main>
    </div>
  );
}
