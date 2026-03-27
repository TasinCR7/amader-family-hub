"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Wallet,
  MapPin,
  GitBranch,
  Image as ImageIcon,
  Calendar,
  Vote,
  Shield,
  Menu,
  X,
  Heart,
  ChevronDown,
  TrendingUp,
  Lock,
  Megaphone,
  Brain,
} from "lucide-react";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "ড্যাশবোর্ড", labelEn: "Dashboard" },
  { href: "/members", icon: Users, label: "সদস্য তালিকা", labelEn: "Members" },
  { href: "/tasks", icon: ClipboardList, label: "কাজ ও পরিকল্পনা", labelEn: "Tasks" },
  { href: "/expenses", icon: Wallet, label: "খরচের হিসাব", labelEn: "Expenses" },
  { href: "/land", icon: MapPin, label: "জমি ব্যবস্থাপনা", labelEn: "Land" },
  { href: "/family-tree", icon: GitBranch, label: "বংশ বৃক্ষ", labelEn: "Family Tree" },
  { href: "/gallery", icon: ImageIcon, label: "গ্যালারি ও শ্রদ্ধাঞ্জলি", labelEn: "Gallery" },
  { href: "/events", icon: Calendar, label: "ইভেন্ট ও ক্যালেন্ডার", labelEn: "Events" },
  { href: "/voting", icon: Vote, label: "ভোটিং", labelEn: "Voting" },
  { href: "/tracker", icon: TrendingUp, label: "সফলতা-ব্যর্থতা", labelEn: "Performance" },
  { href: "/vault", icon: Lock, label: "সিকিউর ভল্ট", labelEn: "Vault" },
  { href: "/notices", icon: Megaphone, label: "নোটিশ বোর্ড", labelEn: "Notices" },
  { href: "/assistant", icon: Brain, label: "AI সহকারী", labelEn: "AI Assistant" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-xl glass-card md:hidden"
        style={{ background: "var(--sidebar-bg)" }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen flex flex-col transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[260px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--card-border)",
          backdropFilter: "blur(30px)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b" style={{ borderColor: "var(--card-border)" }}>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--gold))" }}
          >
            <Heart size={20} className="text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold gradient-text whitespace-nowrap">আমাদের পরিবার</h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Gafur Family Hub</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`nav-link ${isActive ? "active" : ""}`}
                title={item.labelEn}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t" style={{ borderColor: "var(--card-border)" }}>
          <div className="nav-link cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
            <ChevronDown
              size={18}
              className={`flex-shrink-0 transition-transform ${collapsed ? "rotate-90" : "-rotate-90"}`}
            />
            {!collapsed && <span className="text-xs">সংকুচিত করুন</span>}
          </div>
          <div className="flex items-center gap-3 px-4 py-3 mt-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--gold))" }}
            >
              <Shield size={14} className="text-white" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-xs font-semibold">অ্যাডমিন</p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
