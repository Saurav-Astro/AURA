"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useData } from "@/context/data-provider";
import { useState, useRef, useEffect } from "react";
import { 
  Database,
  Upload,
  FileSpreadsheet,
  Plus,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info,
  ShieldCheck,
  ChevronRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function UploadPage() {
  const { uploadFile, error, analytics, loadAnalytics, loading } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!analytics) {
      loadAnalytics();
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await uploadFile(selectedFile);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.push("/dashboard");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black tracking-tight text-white font-sans uppercase italic leading-none">Ingestion Hub</h2>
            <Database className="h-4 w-4 text-primary opacity-60" />
          </div>
          <p className="text-slate-400 font-semibold italic uppercase tracking-[0.15em] text-[10px]">Secure Institutional Record Processing.</p>
        </div>
        <div className="flex gap-2">
            <Badge className="h-9 px-4 border-indigo-500/20 text-indigo-500 font-black uppercase tracking-[0.15em] text-[9px] bg-indigo-500/5 rounded-xl">
                AURA 2.4
            </Badge>
            <Badge className="h-9 px-4 border-emerald-500/20 text-emerald-500 font-black uppercase tracking-[0.15em] text-[9px] bg-emerald-500/5 rounded-xl italic">
                 SECURE
            </Badge>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="institutional-card p-0 overflow-hidden relative group border-none shadow-2xl">
            <CardHeader className="bg-white/[0.02] border-b border-white/5 p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-emerald-500 opacity-40" />
                <div className="flex items-center gap-6 relative z-10">
                    <Database className="h-8 w-8 text-primary opacity-60" />
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black italic uppercase tracking-tighter text-white font-sans">Data Ingestion Hub</CardTitle>
                        <CardDescription className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1 italic leading-none">
                            Supports .CSV, .XLSX, and .XLS.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="flex flex-col items-center justify-center p-16 text-center relative">
                    <div className="relative mb-8 transform transition-transform group-hover:scale-105 duration-700">
                        <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-3xl backdrop-blur-3xl">
                            <FileSpreadsheet className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                        </div>
                    </div>
                    
                    <p className="mb-10 max-w-sm text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-[0.1em] opacity-80 italic">
                        Select records to initiate predictive trends & regional pulse.
                    </p>
                    
                    <div className="flex flex-col gap-4 w-full max-w-sm relative z-10">
                        <input 
                            type="file" 
                            accept=".csv, .xlsx, .xls" 
                            className="hidden" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        {!selectedFile ? (
                        <Button 
                                size="lg" 
                                className="w-full h-14 font-black shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all bg-primary hover:bg-primary/90 text-white rounded-xl tracking-[0.2em] uppercase text-[9px] italic group" 
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <span className="flex items-center gap-3">
                                    <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-500" />
                                    Select Dataset
                                </span>
                            </Button>
                        ) : (
                            <div className="space-y-4 animate-in zoom-in duration-500 w-full">
                                <div className="bg-white/5 border border-primary/40 rounded-xl p-4 flex items-center justify-between shadow-2xl group/file transition-all">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <FileSpreadsheet className="h-4 w-4 text-primary opacity-60" />
                                        <span className="text-[10px] font-black truncate max-w-[150px] italic text-white uppercase tracking-widest">{selectedFile.name}</span>
                                    </div>
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                </div>
                                <Button 
                                    size="lg" 
                                    className="w-full h-14 font-black shadow-2xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl tracking-[0.2em] uppercase text-[9px] italic group" 
                                    onClick={handleUpload}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <span className="flex items-center gap-3">
                                            <Upload className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                                            Execute Ingestion
                                        </span>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="institutional-card p-8 relative overflow-hidden group border-none shadow-2xl bg-white/[0.01] min-h-[180px]">
            <div className="flex items-center gap-4 mb-6">
              <Info className="h-4 w-4 text-primary opacity-60" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white italic leading-none">Protocol Specs</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white/[0.03] p-4 rounded-xl border border-white/5 transition-all hover:bg-white/5 group/item">
                <span className="text-[9px] font-bold text-slate-500 uppercase italic tracking-widest leading-none">Status</span>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[8px] tracking-widest px-2 py-0.5 uppercase rounded-md">Operational</Badge>
              </div>
              <div className="flex justify-between items-center bg-white/[0.03] p-4 rounded-xl border border-white/5 transition-all hover:bg-white/5 group/item">
                <span className="text-[9px] font-bold text-slate-500 uppercase italic tracking-widest leading-none">Active Records</span>
                <span className="text-[9px] font-black uppercase text-primary tracking-widest italic leading-none">
                  {analytics?.total_students.toLocaleString() || "0"} SEEDSETS
                </span>
              </div>
            </div>
          </Card>

          <Card 
            className="institutional-card bg-indigo-600 text-white border-none shadow-2xl group relative overflow-hidden p-8 flex flex-col items-center justify-center h-48 cursor-pointer transition-all active:scale-[0.98]" 
            onClick={() => router.push("/dashboard")}
          >
              <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                  <ShieldCheck className="h-8 w-8 text-white/50 group-hover:scale-125 transition-transform duration-500" />
                  <div className="space-y-1">
                    <h3 className="text-xl font-black italic tracking-tighter uppercase leading-none">Access Hub</h3>
                    <p className="text-white/60 text-[9px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        Deploy Dashboards
                        <ChevronRight className="h-2.5 w-2.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
              </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
