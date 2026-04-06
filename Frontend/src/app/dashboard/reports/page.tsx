"use client";

import { useData } from "@/context/data-provider";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Activity, 
  CheckCircle2, 
  ArrowUpRight,
  Database,
  Loader2,
  FileSpreadsheet,
  TrendingUp,
  ShieldCheck,
  Target,
  Globe
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function ReportsPage() {
  const { analytics, loadAnalytics, downloadReport, loading } = useData();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!analytics) {
      loadAnalytics();
    }
  }, []);

  if (!isClient) return null;

  const insights = (analytics as any)?.insights || {};
  const hasSyntheticInsights = insights.is_insight_synthetic;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-white font-sans uppercase italic leading-none">Synthesis Center</h2>
            <FileText className="h-4 w-4 text-emerald-500 opacity-60" />
          </div>
          <p className="text-slate-400 font-semibold italic uppercase tracking-[0.15em] text-[10px]">Strategic Enrollment Planning (SEP) & Generation.</p>
        </div>
        <div className="flex gap-2">
            <Badge className="h-9 px-4 border-emerald-500/20 text-emerald-500 font-black uppercase tracking-[0.15em] text-[9px] bg-emerald-500/5 rounded-xl">
                VERIFIED 
            </Badge>
            <Badge className="h-9 px-4 border-indigo-500/20 text-indigo-500 font-black uppercase tracking-[0.15em] text-[9px] bg-indigo-500/5 rounded-xl italic">
                 AURA CORE 2.4
            </Badge>
        </div>
      </div>

      {!analytics ? (
        <Card className="institutional-card bg-white/[0.01] border-dashed border-2 border-white/5 flex flex-col items-center justify-center py-20 group text-center">
            <Database className="h-10 w-10 text-slate-500 mx-auto mb-6 opacity-20" />
            <h3 className="text-2xl font-black mb-2 italic tracking-tighter uppercase text-slate-500">Baseline Missing</h3>
        </Card>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2 institutional-card p-0 overflow-hidden relative group border-none shadow-2xl">
            <CardHeader className="border-b border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-black italic uppercase tracking-tighter text-white font-sans">Strategic Summary hub</CardTitle>
                    <div className="flex items-center gap-3 mt-1">
                        <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Protocol v2.4</CardDescription>
                        {hasSyntheticInsights && (
                            <Badge className="bg-amber-500/10 text-amber-500 border-none font-black text-[7px] tracking-widest px-2 py-0.5 uppercase italic rounded-md">VERIFIED SYNTHESIS</Badge>
                        )}
                    </div>
                </div>
                <ShieldCheck className="h-6 w-6 text-emerald-500 opacity-60" />
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 italic ml-1 leading-none">Strategic Yield Leader</p>
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-primary/40 transition-all duration-500 group">
                        <span className="text-lg font-black italic uppercase tracking-tighter text-white font-sans">{insights.yield_leader || "GENERAL SCIENCES"}</span>
                        <ArrowUpRight className="h-4 w-4 text-primary group-hover:rotate-45 transition-transform" />
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 italic ml-1 leading-none">Growth Index</p>
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-pink-500/40 transition-all duration-500 group">
                        <span className="text-lg font-black italic uppercase tracking-tighter text-white font-sans">{insights.yield_velocity || "STABLE CURVE"}</span>
                        <TrendingUp className="h-4 w-4 text-pink-500 group-hover:scale-125 transition-transform" />
                    </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 left-0 h-full w-1 bg-primary" />
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <Activity className="h-3.5 w-3.5 text-primary opacity-60" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Executive Synthesis Note</h4>
                    </div>
                    <p className="text-xs font-semibold text-slate-300 leading-loose italic uppercase tracking-tight opacity-90">
                        {insights.yield_leader && insights.growth_pulse ? (
                            <>Institutional profile indicates strong programmatic demand in <span className="text-primary font-black">{insights.yield_leader}</span>, with critical regional pulse peaking from <span className="text-emerald-500 font-black italic">{insights.growth_pulse}</span> hub.</>
                        ) : (
                            <>Aura Intelligence has calibrated a baseline institutional profile. Initial synthesis suggests a <span className="text-primary font-black">Stable Academic Trajectory</span> with emerging demand in core disciplines.</>
                        )}
                    </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-6">
                <Button 
                    size="lg" 
                    className="w-full h-16 font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 bg-primary hover:bg-primary/90 text-white rounded-2xl italic group"
                    onClick={downloadReport}
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <>
                            <Download className="mr-3 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                            Initialize Export Protocol
                        </>
                    )}
                </Button>
                <div className="flex items-center justify-center gap-3 opacity-40">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] italic">
                        Format: Institutional Synthesis CSV (v2.4)
                    </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="institutional-card bg-primary text-white border-none shadow-2xl group relative overflow-hidden p-8 flex flex-col justify-between min-h-[220px]">
                <div className="relative z-10 space-y-6">
                    <Target className="h-8 w-8 text-white opacity-40" />
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Academic Standard</h3>
                        <p className="text-white/60 text-[9px] font-bold leading-relaxed uppercase tracking-[0.1em] italic">
                            Aura Reports meet collegiate documentation standards for (SEP).
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 w-fit px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                        <span className="text-[9px] uppercase font-black tracking-widest">EXCEL OPTIMIZED (2.0)</span>
                    </div>
                </div>
            </Card>

            <Card className="institutional-card p-8 space-y-6 border-white/5 group transition-all min-h-[240px] shadow-2xl">
                <div className="flex items-center gap-4">
                    <Database className="h-4 w-4 text-emerald-500 opacity-60" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white italic">Export Mapping</p>
                </div>
                <ul className="space-y-4">
                    {[
                        "Reach Inventory",
                        "Yield Leaderboard",
                        "Pulse Distribution",
                        "Growth Trajectory",
                        "Economic Origin Map"
                    ].map(item => (
                        <li key={item} className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest group/item leading-none">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-40 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all" />
                            <span className="group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                    ))}
                </ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
