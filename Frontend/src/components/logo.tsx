import { GraduationCap } from "lucide-react";

export function Logo({ iconOnly = false }: { iconOnly?: boolean }) {
  return (
    <div className="flex items-center gap-3 px-1 py-1">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
        <GraduationCap className="h-5 w-5" />
      </div>
      {!iconOnly && (
        <div className="flex flex-col">
          <h1 className="text-sm font-black uppercase tracking-widest text-foreground">Aura</h1>
          <p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground/60 leading-none">Intelligence Hub</p>
        </div>
      )}
    </div>
  );
}
