"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useData } from "@/context/data-provider";
import { Loader2, Lock, ShieldCheck, Mail } from "lucide-react";

export default function LoginPage() {
  const { login, loading, error, isAuthenticated } = useData();
  const [email, setEmail] = useState("admin@aura.ai");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#0a0a0b] selection:bg-indigo-500/30">
      {/* Cinematic background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse delay-700" />
      </div>

      <Card className="w-full max-w-md border-none bg-zinc-900/40 backdrop-blur-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 z-10 transition-all hover:shadow-indigo-500/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
        <CardHeader className="space-y-4 pt-10 pb-6 text-center relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500 shadow-xl shadow-indigo-500/40 ring-1 ring-white/20 transform transition-transform hover:scale-110 active:scale-95 duration-300">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-3xl font-black tracking-tighter text-white uppercase italic">Aura Analytics</CardTitle>
            <CardDescription className="text-zinc-400 font-medium tracking-tight">Institutional Enrollment Intelligence Portal</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pb-12 px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 group-focus-within:text-indigo-400 transition-colors">Admin Identifier</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@aura.ai"
                    className="h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 pl-11 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 group">
                <Label htmlFor="password" title="Try 'password123'" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1 group-focus-within:text-indigo-400 transition-colors cursor-help">Access Key</Label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 pl-11 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[13px] font-bold py-3 px-4 rounded-xl text-center animate-in fade-in slide-in-from-top-1 duration-300">
                Invalid credentials. System access denied.
              </div>
            )}

            <Button 
                type="submit" 
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all disabled:opacity-50"
                disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying Pulse...
                </>
              ) : (
                "Authorize Access"
              )}
            </Button>
            
            <div className="pt-4 flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-zinc-800" />
                <p className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Aura Intelligence Protocol</p>
                <span className="h-px w-8 bg-zinc-800" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
