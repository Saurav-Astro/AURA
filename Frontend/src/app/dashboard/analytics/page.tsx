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
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";
import { useEffect, useState } from "react";
import { BarChart as BarChartIcon, Info, Loader2, Database, TrendingUp, RefreshCw, Activity, Map, PieChart as PieChartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#f43f5e", "#fb923c"];

export default function AnalyticsPage() {
  const { analytics, loadAnalytics, loading } = useData();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!analytics) {
      loadAnalytics();
    }
  }, []);

  if (!isClient) return null;

  if (loading && !analytics) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] italic">Calibrating Diagnostic Suiite...</p>
        </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center animate-in fade-in duration-1000">
        <Database className="h-12 w-12 text-slate-500 mx-auto opacity-20" />
        <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-500">Data Hub Standby</h3>
      </div>
    );
  }

  const insights = analytics.insights || {};
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl">
          <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-2">{label || 'Metric'}</p>
          <div className="space-y-1">
            <p className="text-xl font-black text-white italic">{payload[0].value.toLocaleString()} <span className="text-[9px] opacity-40 not-italic uppercase tracking-tight">Records</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  const chartTheme = {
    textColor: 'rgba(215, 225, 235, 0.4)', // Slate-400 equivalent
    gridColor: 'rgba(255, 255, 255, 0.03)',
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-white font-sans uppercase italic leading-none">Diagnostic Suite</h2>
            <BarChartIcon className="h-4 w-4 text-primary opacity-60" />
          </div>
          <p className="text-slate-400 font-semibold italic uppercase tracking-[0.15em] text-[10px]">Strategic Enrollment Planning (SEP) Analytics.</p>
        </div>
        <div className="flex gap-2">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={loadAnalytics} 
                disabled={loading}
                className="h-9 px-4 border-white/5 bg-white/5 text-slate-400 font-black uppercase tracking-[0.15em] text-[8px] rounded-lg items-center gap-2 hover:bg-white/10 hover:text-white transition-all"
            >
                {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                Sync Engine
            </Button>
            <Badge className="h-9 px-4 border-emerald-500/20 text-emerald-500 font-black uppercase tracking-[0.15em] text-[9px] bg-emerald-500/5 rounded-lg">
                LIVE DATA
            </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
              { label: "Programmatic Demand", value: insights.yield_leader, color: "text-primary", bg: "bg-primary/20", icon: Activity, sub: "Yield Leader" },
              { label: "Regional Pulse", value: insights.growth_pulse, color: "text-emerald-500", bg: "bg-emerald-500/20", icon: Map, sub: "Geographic Peak" },
              { label: "Yield Velocity", value: insights.yield_velocity, color: "text-pink-500", bg: "bg-pink-500/20", icon: TrendingUp, sub: "Growth Index" },
              { label: "Processing Engine", value: "ACTIVE", color: "text-indigo-500", bg: "bg-indigo-500/20", icon: Database, sub: "Aura Core 2.4" }
          ].map((item, idx) => (
            <Card key={idx} className="institutional-card group relative overflow-hidden">
                <div className={`absolute top-0 right-0 h-24 w-24 ${item.bg} blur-[40px] rounded-full translate-x-12 -translate-y-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 italic leading-none">{item.label}</p>
                        <item.icon className={`h-4 w-4 ${item.color} opacity-60`} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-xl font-black italic tracking-tighter text-white uppercase truncate leading-none">{item.value}</h4>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">{item.sub}</p>
                    </div>
                </div>
            </Card>
          ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="institutional-card p-0 overflow-hidden group border-none">
          <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="space-y-1">
                <h4 className="text-xl font-black italic uppercase tracking-tighter text-white font-sans">Socio-Economic Profile</h4>
            </div>
            {analytics.is_financial_synthetic && (
                <Badge className="bg-pink-500/10 text-pink-500 border-none font-black text-[7px] tracking-widest px-2 py-0.5 uppercase italic rounded-md">INSTITUTIONAL MODEL</Badge>
            )}
          </div>
          <CardContent className="p-0 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={(analytics.financial_distribution || []).map(fi => ({ name: fi.Category, value: fi.Students }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {(analytics.financial_distribution || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 p-8 space-y-4">
              {(analytics.financial_distribution || []).map((item: any, index: number) => (
                <div key={item.Category} className="space-y-1 group/legend">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter italic">
                    <span className="text-slate-500 group-hover/legend:text-white transition-colors uppercase">{item.Category}</span>
                    <span className="text-white">{item.Students.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                    <div 
                        className="h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${(item.Students / analytics.total_students) * 100}%`, backgroundColor: COLORS[index % COLORS.length] }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="institutional-card p-0 overflow-hidden group border-none">
          <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="space-y-1">
                <h4 className="text-xl font-black italic uppercase tracking-tighter text-white font-sans">Legacy Index</h4>
            </div>
            {analytics.is_family_synthetic && (
                <Badge className="bg-amber-500/10 text-amber-500 border-none font-black text-[7px] tracking-widest px-2 py-0.5 uppercase italic rounded-md">INSTITUTIONAL MODEL</Badge>
            )}
          </div>
          <CardContent className="p-0 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={(analytics.family_distribution || []).map(f => ({ name: f.Category, value: f.Students }))}
                    cx="50%"
                    cy="50%"
                    paddingAngle={8}
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {(analytics.family_distribution || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 p-8 space-y-4">
              {(analytics.family_distribution || []).map((item: any, index: number) => (
                <div key={item.Category} className="space-y-1 group/legend">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter italic">
                    <span className="text-slate-500 group-hover/legend:text-white transition-colors uppercase">{item.Category}</span>
                    <span className="text-white">{item.Students.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                    <div 
                        className="h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${(item.Students / analytics.total_students) * 100}%`, backgroundColor: COLORS[(index + 2) % COLORS.length] }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 institutional-card p-0 overflow-hidden relative group border-none">
          <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="space-y-1">
                <h4 className="text-xl font-black italic uppercase tracking-tighter text-white font-sans">Volume Analysis</h4>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 opacity-60">Programmatic participation distribution.</p>
            </div>
            <Activity className="h-4 w-4 text-primary opacity-60" />
          </div>
          <CardContent className="p-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.course_distribution || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.gridColor} />
                <XAxis 
                  dataKey="Course" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: chartTheme.textColor, fontSize: 10, fontWeight: 900}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: chartTheme.textColor, fontSize: 10, fontWeight: 900}}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="Students" 
                  fill="#6366f1" 
                  radius={[6, 6, 0, 0]} 
                  barSize={32}
                  animationDuration={2000}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-6 py-4 rounded-xl shadow-xl">
              <Info className="h-4 w-4 text-primary opacity-60" />
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 italic">
                Verified Diagnostic Baseline: <span className="text-white">{analytics.total_students.toLocaleString()} SEEDS</span>
              </p>
          </div>
      </div>
    </div>
  );
}
