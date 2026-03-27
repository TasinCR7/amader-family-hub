"use client";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  color?: string;
  delay?: number;
}

export default function StatCard({
  icon,
  label,
  value,
  change,
  changeType = "neutral",
  color = "var(--primary)",
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className="glass-card p-5 flex flex-col gap-3 fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, color }}
        >
          {icon}
        </div>
        {change && (
          <span
            className={`badge ${
              changeType === "up"
                ? "badge-success"
                : changeType === "down"
                ? "badge-danger"
                : "badge-info"
            }`}
          >
            {changeType === "up" ? "↑" : changeType === "down" ? "↓" : "●"} {change}
          </span>
        )}
      </div>
      <div>
        {value}
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {label}
        </p>
      </div>
    </div>
  );
}
