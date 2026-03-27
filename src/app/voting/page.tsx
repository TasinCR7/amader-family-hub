"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Vote, Plus, CheckCircle2, Clock, Users, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Modal from "@/components/Modal";


interface Poll {
  id: number;
  question: string;
  status: string;
  deadline: string;
  poll_options: { text: string; votes: number }[];
  members?: { name: string };
  totalVoters?: number;
}

export default function VotingPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    deadline: "",
    options: ["", ""],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchPolls();
  }, []);

  async function fetchPolls() {
    setLoading(true);
    const { data, error } = await supabase
      .from('polls')
      .select('*, poll_options(*), members(name)');
    
    if (!error && data) {
      setPolls(data.map(p => ({
        ...p,
        totalVoters: p.poll_options.reduce((sum: number, o: any) => sum + o.votes, 0)
      })));
    }
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { data: pollData, error: pollError } = await supabase
      .from("polls")
      .insert([{
        question: formData.question,
        deadline: new Date(formData.deadline).toLocaleDateString('bn-BD'),
        status: "চলমান",
      }])
      .select()
      .single();

    if (pollError) {
      alert("Error creating poll: " + pollError.message);
    } else if (pollData) {
      const optionsToInsert = formData.options
        .filter(opt => opt.trim() !== "")
        .map(opt => ({
          poll_id: pollData.id,
          text: opt,
          votes: 0
        }));

      const { error: optionsError } = await supabase
        .from("poll_options")
        .insert(optionsToInsert);

      if (optionsError) {
        alert("Error adding options: " + optionsError.message);
      } else {
        setIsModalOpen(false);
        setFormData({
          question: "",
          deadline: "",
          options: ["", ""],
        });
        fetchPolls();
      }
    }
    setIsSubmitting(false);
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };


  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 px-6 py-4"
          style={{ background: "rgba(10, 15, 26, 0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)" }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:ml-0 ml-12">
              <div className="p-2 rounded-xl" style={{ background: "rgba(168, 85, 247, 0.1)" }}>
                <Vote size={20} style={{ color: "#a855f7" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">ভোটিং ও পোল</h1>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>গণতান্ত্রিক সিদ্ধান্ত গ্রহণ</p>
              </div>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary text-xs py-2"
            >
              <Plus size={14} /> নতুন পোল
            </button>

          </div>
        </header>

        <div className="p-6 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-primary opacity-20" />
              <p className="mt-4 text-xs text-muted-foreground">পোলগুলো লোড হচ্ছে...</p>
            </div>
          ) : polls.length === 0 ? (
            <div className="p-20 text-center glass-card">
              <Vote size={48} className="mx-auto mb-4 opacity-10" />
              <p className="text-sm text-muted-foreground">কোনো পোল পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="space-y-4">
              {polls.map((poll, idx) => {
                const maxVotes = Math.max(...poll.poll_options.map(o => o.votes));
                const totalVotes = poll.totalVoters || 0;
                return (
                  <div key={poll.id} className="glass-card p-6 fade-in-up" style={{ animationDelay: `${idx * 80}ms` }}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{poll.question}</h3>
                          <span className={`badge text-[10px] ${poll.status === "চলমান" ? "badge-warning" : "badge-success"}`}>
                            {poll.status === "চলমান" ? <Clock size={10} /> : <CheckCircle2 size={10} />}
                            {poll.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px]" style={{ color: "var(--text-muted)" }}>
                          <span>তৈরি করেছেন: {poll.members?.name || "অ্যাডমিন"}</span>
                          <span className="flex items-center gap-1"><Users size={10} /> {totalVotes} ভোটার</span>
                          <span>সময়সীমা: {poll.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {poll.poll_options.map((opt, i) => {
                        const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                        const isWinning = opt.votes === maxVotes && opt.votes > 0;
                        return (
                          <div key={i} className="relative p-3 rounded-xl overflow-hidden" style={{ background: "var(--glass)", border: `1px solid ${isWinning ? "rgba(16, 185, 129, 0.3)" : "var(--glass-border)"}` }}>
                            <div className="absolute inset-0 rounded-xl transition-all duration-500"
                              style={{ background: isWinning ? "rgba(16, 185, 129, 0.08)" : "rgba(255,255,255,0.02)", width: `${pct}%` }} />
                            <div className="relative flex items-center justify-between">
                              <span className="text-xs font-medium">{opt.text}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{opt.votes} ভোট</span>
                                <span className="text-xs font-bold" style={{ color: isWinning ? "var(--primary)" : "var(--text-muted)" }}>{pct}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add Poll Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="নতুন পোল তৈরি করুন"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">ভোটের প্রশ্ন</label>
              <input
                required
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
                placeholder="যেমন: এবারের ঈদ পুনর্মিলনী কোথায় হবে?"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">বিকল্পসমূহ (Options)</label>
              <div className="space-y-2">
                {formData.options.map((opt, i) => (
                  <input
                    key={i}
                    required={i < 2}
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    className="w-full bg-glass border border-glass-border rounded-xl px-4 py-1.5 text-xs outline-none focus:border-primary/50"
                    placeholder={`বিকল্প ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={addOption}
                className="text-[10px] text-primary hover:underline flex items-center gap-1"
              >
                <Plus size={10} /> আরও বিকল্প যোগ করুন
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">সময়সীমা</label>
              <input
                required
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/50"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 btn-secondary py-2.5"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-[2] btn-primary py-2.5 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                পোল প্রকাশ করুন
              </button>
            </div>
          </form>
        </Modal>
      </main>

    </div>
  );
}
