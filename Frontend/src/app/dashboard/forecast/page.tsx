"use client";

import { useData } from "@/context/data-provider";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useEffect, useState } from "react";
import { 
    TrendingUp, 
    Loader2, 
    Info, 
    ArrowUpRight, 
    AlertCircle, 
    ShieldCheck, 
    Activity,
    Target,
    Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ForecastPage() {
  const { forecast, loadForecast, loading } = useData();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!forecast) {
      loadForecast();
    }
  }, []);

  if (!isClient) return null;

  if (loading && !forecast) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] italic">Initiating ARIMA Projections...</p>
        </div>
    );
  }

  if (!forecast || !forecast.forecast || forecast.forecast.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center animate-in fade-in duration-1000">
        <TrendingUp className="h-12 w-12 text-slate-500 mx-auto opacity-20" />
        <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-500">Forecasting Standby</h3>
      </div>
    );
  }

  const chartData = (forecast?.forecast || []).map((f: any) => ({
    year: f.Year,
    predicted: f.Predicted,
    lower: f.Lower_CI,
    upper: f.Upper_CI,
    display: f.Year.toString(),
  }));

  const latestProjected = chartData[chartData.length - 1];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl">
          <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-2">{label} PROJECTION</p>
          <div className="space-y-1">
            <p className="text-xl font-black text-white italic">{payload[0].value.toFixed(0)} <span className="text-[9px] opacity-40 not-italic uppercase tracking-tight">Records</span></p>
            {payload[1] && (
                <p className="text-[8px] font-bold text-slate-400 uppercase opacity-60">Confidence Key: ±{((payload[1].value - payload[0].value)).toFixed(0)}</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const chartTheme = {
    textColor: 'rgba(215, 225, 235, 0.4)', 
    gridColor: 'rgba(255, 255, 255, 0.03)',
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-white font-sans uppercase italic leading-none">Institutional Projections</h2>
            <TrendingUp className="h-4 w-4 text-primary opacity-60" />
          </div>
          <p className="text-slate-400 font-semibold italic uppercase tracking-[0.15em] text-[10px]">Autoregressive Integrated Moving Average (ARIMA).</p>
        </div>
        <div className="flex gap-2">
            {forecast.is_synthetic && (
                <Badge className="h-9 px-4 border-amber-500/20 text-amber-500 font-black uppercase tracking-[0.15em] text-[8px] bg-amber-500/5 rounded-lg italic">
                    STATISTICAL MODEL
                </Badge>
            )}
            <Badge className="h-9 px-4 border-rose-500/20 text-rose-500 font-black uppercase tracking-[0.15em] text-[8px] bg-rose-500/5 rounded-lg">
                95% CONFIDENCE ACTIVE
            </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 institutional-card p-0 overflow-hidden relative group border-none">
          <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="space-y-1">
                <h4 className="text-xl font-black italic uppercase tracking-tighter text-white font-sans">Predictive Trajectory</h4>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 opacity-60">Growth Analysis | {chartData.length} Cycle Projection</p>
            </div>
            <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
          </div>
          <CardContent className="p-8">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.gridColor} />
                <XAxis 
                  dataKey="display" 
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
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  dot={{ r: 5, fill: '#6366f1', strokeWidth: 2, stroke: "#0f172a" }}
                  activeDot={{ r: 7, strokeWidth: 0 }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <Card className="institutional-card bg-primary text-white border-none shadow-xl group relative overflow-hidden p-8 flex flex-col justify-between h-56">
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">Target Cycle</p>
                        <ShieldCheck className="h-4 w-4 text-white opacity-60" />
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="text-4xl font-black italic tracking-tighter uppercase">{latestProjected?.display}</div>
                        <p className="text-lg font-black italic tracking-tight uppercase opacity-80">PROJECTED PEAK</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/60 italic">Expected Yield</span>
                            <span className="text-xl font-black italic">{latestProjected?.predicted.toFixed(0)}</span>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="institutional-card bg-white/[0.01] border-white/5 group p-8 min-h-[220px]">
                <div className="flex items-start gap-3 mb-6">
                    <Target className="h-4 w-4 text-rose-500 opacity-60" />
                    <div>
                        <h4 className="text-base font-black italic uppercase tracking-tighter text-white">Statistical Gap</h4>
                        <p className="text-[8px] font-bold uppercase tracking-widest text-slate-500 opacity-60">Error Distribution</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                            <span className="text-slate-400">Confidence Range</span>
                            <span className="text-rose-500">95% RELIABLE</span>
                        </div>
                        <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-rose-500 w-[95%] animate-pulse" />
                        </div>
                    </div>
                    <p className="text-[9px] font-bold text-slate-500 leading-relaxed uppercase italic opacity-60 mt-4">
                        Trends across the {chartData.length > 0 ? `${chartData[0].year} - ${latestProjected.year}` : "N/A"} cycle.
                    </p>
                </div>
            </Card>
        </div>

        <Card className="lg:col-span-4 institutional-card p-0 overflow-hidden relative group border-none">
          <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="space-y-1">
                <h4 className="text-xl font-black italic uppercase tracking-tighter text-white font-sans">Confidence Threshold Mapping</h4>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 opacity-60">Linear probability area map.</p>
            </div>
            <ShieldCheck className="h-5 w-5 text-rose-500 opacity-60" />
          </div>
          <CardContent className="p-8">
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorCI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.gridColor} />
                    <XAxis 
                        dataKey="display" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: chartTheme.textColor, fontSize: 10, fontWeight: 900}}
                        dy={8}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: chartTheme.textColor, fontSize: 10, fontWeight: 900}}
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Area 
                        type="monotone" 
                        dataKey="upper" 
                        stroke="transparent" 
                        fill="url(#colorCI)" 
                        animationDuration={2000}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#ef4444" 
                        strokeWidth={3} 
                        fill="none" 
                        animationDuration={2000}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="lower" 
                        stroke="transparent" 
                        fill="url(#colorCI)" 
                        animationDuration={2000}
                    />
                </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-6 py-4 rounded-xl shadow-xl">
              <Info className="h-4 w-4 text-primary opacity-60" />
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 italic">
                Aura Intelligence uses <span className="text-white font-black">Autoregressive Optimization</span> protocol.
              </p>
          </div>
      </div>
    </div>
  );
}
