"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Brain, Send, Sparkles, User, Bot } from "lucide-react";

interface Message {
  id: number; text: string; sender: "user" | "ai"; time: string;
}

const initialMessages: Message[] = [
  { id: 1, text: "আসসালামু আলাইকুম! আমি আপনার পারিবারিক AI সহকারী। পরিবারের যেকোনো তথ্য সম্পর্কে আমাকে জিজ্ঞাসা করুন। 🤖", sender: "ai", time: "এইমাত্র" },
];

const suggestedQueries = [
  "এই মাসের মোট খরচ কত?",
  "কতগুলো কাজ চলমান আছে?",
  "পরবর্তী পারিবারিক সভা কবে?",
  "জমির মোট মূল্য কত?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: messages.length + 1, text: input, sender: "user", time: "এইমাত্র" };
    setMessages([...messages, userMsg]);
    setInput("");

    // Simulated AI Response
    setTimeout(() => {
      const aiResponses: Record<string, string> = {
        "খরচ": "এই মাসে পরিবারের মোট খরচ হয়েছে ৳৪৮,৭০০। গত মাসের তুলনায় ৫% কম। সবচেয়ে বেশি খরচ হয়েছে জমি সংক্রান্ত কাজে (৳৪৫,০০০)। 📊",
        "কাজ": "বর্তমানে ৩টি কাজ চলমান আছে: ১) জমি জরিপ (৬৫%), ২) মাসিক হিসাব (৮০%), ৩) দলিল ডিজিটাইজেশন (৪৫%)। ২টি কাজের ডেডলাইন এই সপ্তাহে।",
        "সভা": "পরবর্তী পারিবারিক সভা ০১ এপ্রিল ২০২৬, সন্ধ্যা ৭:০০টায় ঢাকা কার্যালয়ে। আনুমানিক ১৮ জন অংশগ্রহণকারী। 📅",
        "জমি": "পরিবারের মোট ৫টি সম্পত্তি আছে। আনুমানিক মোট মূল্য ৳৩,৪০,০০,০০০। ২টি নিষ্পত্তি হয়েছে, ২টি চলমান এবং ১টিতে বিরোধ আছে। 🏡",
      };

      let response = "দুঃখিত, আমি এই প্রশ্নের উত্তর এখনো দিতে পারছি না। তবে পরিবারের তথ্য সম্পর্কে জিজ্ঞাসা করলে আমি সাহায্য করতে পারব! 🤔";
      for (const [key, val] of Object.entries(aiResponses)) {
        if (userMsg.text.includes(key)) { response = val; break; }
      }

      setMessages((prev) => [...prev, { id: prev.length + 1, text: response, sender: "ai", time: "এইমাত্র" }]);
    }, 1200);
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
                AI পারিবারিক সহকারী <Sparkles size={16} className="text-gold animate-pulse" />
              </h1>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>পরিবার এআই ইঞ্জিন v1.0 — পরিবারের ডেটা নিয়ে জিজ্ঞাসা করুন</p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 fade-in-up ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                msg.sender === "ai" ? "bg-primary/10" : ""
              }`} style={{ background: msg.sender === "user" ? "linear-gradient(135deg, var(--primary), var(--gold))" : undefined }}>
                {msg.sender === "ai" ? <Bot size={16} style={{ color: "var(--primary)" }} /> : <User size={14} className="text-white" />}
              </div>
              <div className={`max-w-[70%] p-4 rounded-2xl ${msg.sender === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                style={{
                  background: msg.sender === "user" ? "linear-gradient(135deg, var(--primary), var(--primary-dark))" : "var(--card-bg)",
                  border: msg.sender === "ai" ? "1px solid var(--card-border)" : "none",
                }}>
                <p className="text-xs leading-relaxed">{msg.text}</p>
                <p className="text-[9px] mt-2 opacity-50">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested */}
        <div className="px-6 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((q) => (
              <button key={q} onClick={() => { setInput(q); }}
                className="px-3 py-1.5 rounded-full text-[10px] transition-all hover:scale-105"
                style={{ background: "var(--glass)", border: "1px solid var(--glass-border)" }}>
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-6 pb-6 pt-2">
          <div className="flex items-center gap-3 p-2 rounded-2xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="আপনার প্রশ্ন লিখুন..." className="flex-1 bg-transparent outline-none text-xs px-2"
              style={{ color: "var(--foreground)" }} />
            <button onClick={handleSend} className="btn-primary text-xs py-2 px-4">
              <Send size={14} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
