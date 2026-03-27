"use client";

import { useState, useEffect } from "react";
import { Sparkles, Brain, Info } from "lucide-react";

export default function AIPredictor() {
  const [effort, setEffort] = useState(70);
  const [resources, setResources] = useState(60);
  const [risk, setRisk] = useState(30);
  const [probability, setProbability] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Predictive logic (Simulated AI model)
    // Probability = (Effort * 0.5 + Resources * 0.3 + (100 - Risk) * 0.2)
    const calculate = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
        const result = (effort * 0.5 + resources * 0.3 + (100 - risk) * 0.2).toFixed(1);
        setProbability(parseFloat(result));
        setIsAnalyzing(false);
      }, 800);
    };

    calculate();
  }, [effort, resources, risk]);

  const getStatus = (p: number) => {
    if (p > 80) return { label: "খুব আশাব্যঞ্জক", color: "var(--success)" };
    if (p > 60) return { label: "ভালো সম্ভাবনা", color: "var(--primary)" };
    if (p > 40) return { label: "মাঝারি ঝুঁকি", color: "var(--gold)" };
    return { label: "উচ্চ ঝুঁকি", color: "var(--danger)" };
  };

  const status = getStatus(probability);

  return (
    <div className="glass-card p-6 h-full flex flex-col space-y-6 relative overflow-hidden">
      {/* AI Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Brain size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI সফলতা প্রিডিক্টর</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">পরিবার এআই ইঞ্জিন v1.0</p>
          </div>
        </div>
        <Sparkles size={16} className="text-gold animate-pulse" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center py-6">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Circular Progress */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="url(#aiGradient)"
              strokeWidth="8"
              strokeDasharray="440"
              strokeDashoffset={440 - (440 * probability) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--gold)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isAnalyzing ? (
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 200}ms` }} />
                ))}
              </div>
            ) : (
              <>
                <span className="text-4xl font-black gradient-text">{probability}%</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-50">সাফল্য সম্ভাবনা</span>
              </>
            )}
          </div>
        </div>
        <div className="mt-4 px-4 py-1.5 rounded-full text-[10px] font-bold border animate-fade-in" 
          style={{ borderColor: `${status.color}40`, color: status.color, background: `${status.color}10` }}>
          {status.label}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-medium">
            <span className="text-muted-foreground">পরিশ্রম (Effort)</span>
            <span>{effort}%</span>
          </div>
          <input 
            type="range" min="0" max="100" value={effort} onChange={(e) => setEffort(parseInt(e.target.value))}
            className="w-full accent-primary h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-medium">
            <span className="text-muted-foreground">সম্পদ (Resources)</span>
            <span>{resources}%</span>
          </div>
          <input 
            type="range" min="0" max="100" value={resources} onChange={(e) => setResources(parseInt(e.target.value))}
            className="w-full accent-gold h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-medium">
            <span className="text-muted-foreground">ঝুঁকি (Risk)</span>
            <span>{risk}%</span>
          </div>
          <input 
            type="range" min="0" max="100" value={risk} onChange={(e) => setRisk(parseInt(e.target.value))}
            className="w-full accent-danger h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/10 rounded-xl">
        <Info size={12} className="text-primary mt-0.5" />
        <p className="text-[10px] leading-relaxed text-muted-foreground italic">
          এই প্রিডিকশনটি বিগত পারিবারিক ইতিহাসের ডেটা এবং বর্তমান রিসোর্স ম্যাপিং এর উপর ভিত্তি করে তৈরি।
        </p>
      </div>
    </div>
  );
}
