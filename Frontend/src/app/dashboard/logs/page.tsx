"use client";

import { useData } from "@/context/data-provider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { 
    ShieldCheck, 
    Loader2, 
    Clock, 
    Database, 
    Download, 
    User, 
    Activity, 
    AlertCircle, 
    CheckCircle2,
    Lock,
    Globe,
    Terminal,
    RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LogsPage() {
  const { logs, loadLogs, loading } = useData();
  const [isClient, setIsClient] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (logs.length === 0) {
      loadLogs();
    }
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await loadLogs();
    setTimeout(() => setIsSyncing(false), 1000);
  };

  if (!isClient) return null;

  if (loading && logs.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] italic">Accessing Audit Trail...</p>
        </div>
    );
  }

  const getLogIcon = (iconName: string) => {
    switch (iconName) {
        case "Database": return <Database className="h-4 w-4" />;
        case "Download": return <Download className="h-4 w-4" />;
        case "ShieldCheck": return <ShieldCheck className="h-4 w-4" />;
        case "User": return <User className="h-4 w-4" />;
        case "Activity": return <Activity className="h-4 w-4" />;
        default: return <Terminal className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 font-sans uppercase italic leading-none">Access Console</h2>
            <Button 
                variant="ghost" 
                size="icon" 
                className={`h-10 w-10 rounded-xl transition-all ${isSyncing ? 'bg-primary/10 animate-spin border border-primary/20' : 'bg-slate-50 border border-slate-100 hover:bg-slate-100'}`}
                onClick={handleManualSync}
            >
                <RefreshCw className={`h-4 w-4 ${isSyncing ? 'text-primary' : 'text-slate-400'}`} />
            </Button>
          </div>
          <p className="text-slate-500 font-semibold italic uppercase tracking-[0.15em] text-[10px]">Institutional security audit & activity log.</p>
        </div>
        <div className="flex gap-2">
            <Badge className="h-9 px-4 border-emerald-500/20 text-emerald-600 font-black uppercase tracking-[0.15em] text-[8px] bg-emerald-50 rounded-xl">
                 SECURE TUNNEL 
            </Badge>
            <Badge className="h-9 px-4 border-indigo-500/20 text-indigo-600 font-black uppercase tracking-[0.15em] text-[8px] bg-indigo-50 rounded-xl italic">
                 AUDIT TRAIL ACTIVE
            </Badge>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <Card className="lg:col-span-4 institutional-card p-0 overflow-hidden relative group border-none shadow-sm">
          <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Lock className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="space-y-0.5">
                    <h4 className="text-base font-black italic uppercase tracking-tighter text-slate-900">Institutional Access History</h4>
                    <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-slate-500 opacity-60">Verified Admin Record</p>
                </div>
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 italic flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Latest 50 Cycles
            </p>
          </div>
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <th className="px-8 py-4">Security ID</th>
                    <th className="px-6 py-4">Protocol Action</th>
                    <th className="px-6 py-4">Identity</th>
                    <th className="px-6 py-4">Origin Hub</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(logs || []).map((log) => (
                    <tr key={log.id} className="group hover:bg-slate-50 transition-colors duration-500">
                      <td className="px-8 py-4">
                        <span className="text-[10px] font-black text-primary italic uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md border border-primary/10">{log.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors">
                                {getLogIcon(log.icon)}
                            </div>
                            <span className="text-[11px] font-bold text-slate-900 uppercase italic tracking-tighter leading-none">{log.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-60" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                            <Globe className="h-2.5 w-2.5 opacity-40" />
                            {log.origin}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`border-none font-black text-[7px] tracking-widest px-2 py-0.5 uppercase rounded-md ${
                            log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                        }`}>
                            {log.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <span className="text-[10px] font-black text-slate-500 tabular-nums tracking-widest leading-none">{log.timestamp}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {logs.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
                    <AlertCircle className="h-10 w-10 text-slate-500 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500/40 italic">Log Ingestion Standby</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
              { label: "Active Tunnel", value: "ADMIN_CONSOLE", icon: Database, color: "text-primary" },
              { label: "Protocol Integrity", value: "OPTIMAL", icon: Activity, color: "text-emerald-500" },
              { label: "Last Sync", value: logs[0]?.timestamp.split(' ')[1] || "N/A", icon: Clock, color: "text-indigo-500" },
              { label: "Security Status", value: "ENCRYPTED", icon: ShieldCheck, color: "text-slate-900" }
          ].map((item, idx) => (
              <Card key={idx} className="institutional-card group p-6 shadow-sm border border-slate-200">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">{item.label}</p>
                  <div className="space-y-1">
                    <h4 className="text-xl font-black italic tracking-tighter uppercase text-slate-900 truncate leading-none">
                        {item.value}
                    </h4>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 opacity-60 leading-none mt-1">
                        <item.icon className={`h-2.5 w-2.5 ${item.color}`} />
                        Aura Security Pulse
                    </p>
                  </div>
              </Card>
          ))}
      </div>
    </div>
  );
}
