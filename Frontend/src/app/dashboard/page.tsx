"use client";

import { useData } from "@/context/data-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BarChart, 
  Users, 
  TrendingUp, 
  Globe, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  ShieldCheck,
  Percent,
  ChevronRight,
  Database,
  LayoutDashboard
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { analytics, enrollmentData, loading, loadAnalytics } = useData();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!analytics) {
      loadAnalytics();
    }
  }, []);

  if (!isClient) return null;

  const insights = analytics?.insights || {};
  const strInsights = {
    yield_leader: insights.yield_leader || "GENERAL SCIENCES",
    growth_pulse: insights.growth_pulse || "MAIN CAMPUS",
    yield_velocity: insights.yield_velocity || "STABLE CURVE"
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-white font-sans uppercase italic leading-none">Executive Hub</h2>
            <LayoutDashboard className="h-4 w-4 text-primary opacity-60" />
          </div>
          <p className="text-slate-400 font-semibold italic uppercase tracking-[0.15em] text-[10px]">Aura Intelligence | Active Enrollment Diagnostic.</p>
        </div>
        <div className="flex gap-2">
            <Badge className="h-9 px-4 border-emerald-500/20 text-emerald-500 font-black uppercase tracking-[0.15em] text-[9px] bg-emerald-500/5 rounded-xl">
                SYSTEM OPERATIONAL
            </Badge>
            <Badge className="h-9 px-4 border-indigo-500/20 text-indigo-500 font-black uppercase tracking-[0.15em] text-[9px] bg-indigo-500/5 rounded-xl italic">
                CORE v2.4
            </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Institutional Reach", value: analytics?.total_students.toLocaleString() || "0", sub: "Verified Records", icon: Users, color: "text-primary", bg: "bg-primary/20" },
          { label: "Target Alpha", value: strInsights.yield_leader, sub: "Yield Leader", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/20" },
          { label: "Regional Hub", value: strInsights.growth_pulse, sub: "Growth Center", icon: Globe, color: "text-indigo-500", bg: "bg-indigo-500/20" },
          { label: "Yield Velocity", value: strInsights.yield_velocity, sub: "Performance Index", icon: TrendingUp, color: "text-pink-500", bg: "bg-pink-500/20" }
        ].map((stat, idx) => (
          <Card key={idx} className="institutional-card group relative overflow-hidden">
            <div className={`absolute top-0 right-0 h-24 w-24 ${stat.bg} blur-[40px] rounded-full translate-x-12 -translate-y-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-6">
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                 <stat.icon className={`h-4 w-4 ${stat.color} opacity-60`} />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase truncate leading-none">{stat.value}</h3>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 institutional-card p-0 overflow-hidden group border-none">
          <CardHeader className="bg-white/[0.02] border-b border-white/5 p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-black italic uppercase tracking-tighter text-white">Institutional Diagnostic</CardTitle>
                <CardDescription className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1 italic">
                    Real-time enrollment health & strategic vectoring.
                </CardDescription>
              </div>
              <ShieldCheck className="h-6 w-6 text-emerald-500 opacity-60" />
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-10">
              <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-4 group/item hover:border-primary/40 transition-all duration-500">
                         <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Predicted Yield</span>
                            <Percent className="h-3.5 w-3.5 text-primary opacity-60" />
                         </div>
                         <div className="text-3xl font-black text-white italic tracking-tighter leading-none">89.4%</div>
                         <div className="flex items-center gap-2 text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                            <ArrowUpRight className="h-3 w-3" />
                            +4.2% Above Baseline
                         </div>
                      </div>

                      <div className="space-y-3">
                          <Button 
                            className="w-full h-14 font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all bg-primary hover:bg-primary/90 text-white rounded-xl tracking-[0.2em] uppercase text-[9px] italic group"
                            onClick={() => router.push("/dashboard/analytics")}
                          >
                            Explore Strategic Vectors
                            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                          <p className="text-[7px] font-bold text-center text-slate-500 uppercase tracking-widest italic">Aura Analytical Protocol v2.4 Active</p>
                      </div>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Database className="h-4 w-4 text-primary opacity-60" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">System Logs</h4>
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                    <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>Sync Verified - Log {i*412}</span>
                                </div>
                            ))}
                        </div>
                      </div>
                      <div className="pt-4 border-t border-white/5">
                        <span className="text-[8px] font-black text-primary uppercase tracking-widest italic cursor-pointer hover:underline" onClick={() => router.push("/dashboard/logs")}>
                            View Security Audit
                        </span>
                      </div>
                  </div>
              </div>
          </CardContent>
        </Card>

        <Card className="institutional-card bg-indigo-600 text-white border-none shadow-xl group relative overflow-hidden p-8 flex flex-col justify-between h-auto">
            <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 blur-[60px] rounded-full translate-x-20 -translate-y-20" />
            <div className="relative z-10 space-y-8">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50 italic">Strategic Yield</p>
                    <Activity className="h-4 w-4 text-white opacity-60" />
                </div>
                <div className="space-y-1">
                    <div className="text-xl font-black text-white italic tracking-widest uppercase truncate leading-none">
                        {strInsights.yield_leader}
                    </div>
                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Yield Peak</p>
                </div>
                <div className="pt-4 border-t border-white/10 group-hover:border-white/30 transition-colors">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black italic tracking-widest uppercase">YIELD VELOCITY</span>
                        <Badge className="bg-white/10 text-white border-none font-black text-[9px] tracking-wide px-3 py-1 italic uppercase"> {strInsights.yield_velocity}</Badge>
                    </div>
                </div>
              </div>

              <div className="space-y-4 pt-10">
                  <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-black italic text-lg shadow-xl shrink-0">IA</div>
                      <div className="flex flex-col min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-tighter italic text-white truncate">Dean of Analytics</p>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-emerald-300 italic opacity-80">Verified Admin</p>
                      </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/5 border-white/20 hover:bg-white/10 text-white font-black text-[8px] tracking-[0.3em] uppercase h-12 rounded-xl italic transition-all"
                    onClick={() => router.push("/dashboard/reports")}
                  >
                    Generate Executive Synthesis
                  </Button>
              </div>
            </div>
        </Card>
      </div>
    </div>
  );
}
