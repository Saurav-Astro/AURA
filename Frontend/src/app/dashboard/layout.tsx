"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  BarChart, 
  TrendingUp, 
  FileText, 
  User, 
  LogOut, 
  Menu, 
  X,
  Upload,
  Settings,
  Bell,
  Search,
  Lock,
  Activity,
  ShieldCheck,
  ChevronRight,
  Database
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/data-provider";
import { Badge } from "@/components/ui/badge";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useData();

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Upload Data", icon: Upload, path: "/dashboard/upload" },
    { name: "Analytics", icon: BarChart, path: "/dashboard/analytics" },
    { name: "Forecast", icon: TrendingUp, path: "/dashboard/forecast" },
    { name: "Reports", icon: FileText, path: "/dashboard/reports" },
    { name: "Access Logs", icon: ShieldCheck, path: "/dashboard/logs" },
    { name: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden relative font-sans text-foreground">
      {/* Dynamic Ambient Background Glows - Slate Institutional Refinement */}
      <div className="aura-ambient-glow top-20 left-40 h-[500px] w-[500px] bg-primary/25" />
      <div className="aura-ambient-glow bottom-40 right-20 h-[400px] w-[400px] bg-indigo-500/15" />
      <div className="aura-ambient-glow top-1/2 left-1/3 h-[300px] w-[300px] bg-emerald-500/10" />

      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } border-r border-white/5 bg-[#0a0f1d] transition-all duration-700 ease-in-out flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3 animate-in fade-in duration-1000">
              <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Database className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black italic tracking-tighter text-xl text-white leading-none">AURA</span>
                <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-500">Intelligence Hub</span>
              </div>
            </div>
          ) : (
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
              <Database className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1 py-4">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-500 group relative ${
                pathname === item.path 
                  ? "bg-white/5 text-white shadow-xl shadow-black/20" 
                  : "text-slate-400 hover:bg-white/[0.03] hover:text-white"
              }`}
            >
              <item.icon className={`h-4.5 w-4.5 transition-all duration-500 ${
                 pathname === item.path ? "text-primary scale-110" : "group-hover:scale-110"
              }`} />
              {isSidebarOpen && (
                <span className="font-black italic uppercase tracking-tighter text-[11px]">
                  {item.name}
                </span>
              )}
              {pathname === item.path && (
                <div className="absolute right-4 h-1 w-1 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/5 opacity-40">
           <p className="text-[8px] font-black uppercase tracking-[0.3em] px-4 pb-4">Cloud Security Active</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10">
        <header className="h-16 border-b border-white/5 bg-background/40 backdrop-blur-3xl px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="hover:bg-white/5 rounded-xl text-slate-400"
            >
              {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-xl group focus-within:border-primary/50 transition-all">
                <Search className="h-3.5 w-3.5 text-slate-500 group-hover:text-primary transition-colors" />
                <input 
                    type="text" 
                    placeholder="STRATEGIC SEARCH..." 
                    className="bg-transparent border-none outline-none text-[9px] font-black uppercase tracking-widest text-white placeholder:text-slate-500/50 w-48"
                />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative hover:bg-white/5 rounded-xl">
                    <Bell className="h-4 w-4 text-slate-400" />
                    <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-rose-500 rounded-full border-2 border-background" />
                </Button>
            </div>
            
            <div className="h-8 w-px bg-white/5" />
            
            <div className="flex items-center gap-4 bg-white/5 pr-4 pl-1.5 py-1.5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black italic text-xs text-white shadow-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    IA
                </div>
                {isSidebarOpen && (
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black italic uppercase tracking-tighter text-white leading-none">Dean of Analytics</span>
                        <span className="text-[7px] font-bold uppercase tracking-widest text-emerald-500 opacity-60">Verified Admin</span>
                    </div>
                )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-8 relative">
           {children}
        </div>
      </main>
    </div>
  );
}
