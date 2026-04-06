"use client";

import { useData } from "@/context/data-provider";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Save, 
  Loader2, 
  Smartphone,
  Fingerprint,
  RefreshCw,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { analytics, loadAnalytics } = useData();
  const [isClient, setIsClient] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "admin@aura.edu.in",
    password: "••••••••••••",
  });

  useEffect(() => {
    setIsClient(true);
    if (!analytics) {
      loadAnalytics();
    }
  }, []);

  if (!isClient) return null;

  const handleSync = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    // Simulate high-fidelity secure handshake
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-white font-sans uppercase italic leading-none">Security Console</h2>
            <ShieldCheck className="h-4 w-4 text-indigo-500 opacity-60" />
          </div>
          <p className="text-slate-400 font-semibold italic uppercase tracking-[0.15em] text-[10px]">Administrative Access Control Hub.</p>
        </div>
        <div className="flex gap-2">
            <Badge className="h-9 px-4 border-indigo-500/20 text-indigo-500 font-black uppercase tracking-[0.15em] text-[9px] bg-indigo-500/5 rounded-xl">
                ENCRYPTED HUB
            </Badge>
            <Badge className="h-9 px-4 border-emerald-500/20 text-emerald-500 font-black uppercase tracking-[0.15em] text-[9px] bg-emerald-500/5 rounded-xl italic">
                 VERIFIED
            </Badge>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 institutional-card p-0 overflow-hidden relative group border-none shadow-2xl">
            <CardHeader className="bg-white/[0.02] border-b border-white/5 p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-rose-500 opacity-40" />
                <div className="flex items-center gap-6 relative z-10">
                    <Fingerprint className="h-8 w-8 text-primary opacity-60" />
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black italic uppercase tracking-tighter text-white font-sans">Administrative Identity</CardTitle>
                        <CardDescription className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1 italic leading-none">
                            Update Secure Credentials
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                <form onSubmit={handleSync} className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic ml-1 leading-none">Admin Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full h-14 pl-12 pr-6 bg-white/[0.03] border border-white/5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-white focus:border-primary/50 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic ml-1 leading-none">Secure Passcode</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input 
                                    type="password" 
                                    placeholder="NEW PASSCODE..."
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full h-14 pl-12 pr-6 bg-white/[0.03] border border-white/5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-white focus:border-primary/50 outline-none transition-all placeholder:text-slate-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button 
                            size="lg" 
                            className="w-full h-16 font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 bg-primary hover:bg-primary/90 text-white rounded-2xl italic group"
                            type="submit"
                            disabled={isSyncing}
                        >
                            {isSyncing ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : success ? (
                                <>
                                    <CheckCircle2 className="mr-3 h-5 w-5 text-emerald-400" />
                                    Handshake Successful
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="mr-3 h-5 w-5 group-hover:rotate-180 transition-transform duration-700" />
                                    Initialize Secure Sync
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>

        <div className="space-y-8">
            <Card className="institutional-card bg-primary text-white border-none shadow-2xl group relative overflow-hidden p-8 flex flex-col justify-between h-56">
                <div className="relative z-10 space-y-4">
                    <Smartphone className="h-8 w-8 text-white/40 mb-2" />
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Identity Shield</h3>
                    <p className="text-white/70 text-[9px] font-bold leading-relaxed uppercase tracking-[0.1em] italic">
                        Enterprise multi-layered encryption protocols.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white/10 w-fit px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span className="text-[9px] uppercase font-black tracking-widest leading-none">TLS 1.3 SYNC</span>
                </div>
            </Card>

            <Card className="institutional-card p-8 space-y-6 border-white/5 group transition-all min-h-[220px] shadow-2xl bg-white/[0.01]">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <RefreshCw className="h-4 w-4 text-rose-500 opacity-60" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white italic leading-none">Session Status</p>
                </div>
                <div className="space-y-4">
                    {[
                        { label: "Institutional Admin", value: "LAST SYNC: 2M AGO" },
                        { label: "IP Protocol", value: "192.168.1.1 (OK)" }
                    ].map(item => (
                        <div key={item.label} className="border-b border-white/5 pb-3 group/item cursor-default flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover/item:text-white transition-colors leading-none">{item.label}</span>
                            <span className="text-[9px] font-bold text-rose-500/80 italic leading-none">{item.value}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
