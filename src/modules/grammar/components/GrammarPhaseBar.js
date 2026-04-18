import { BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

export default function GrammarPhaseBar({ phase, title }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-900/50 flex items-center justify-center border border-orange-500/30">
          <BookOpen className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <p className="text-orange-400 font-bold uppercase tracking-widest text-xs">GrammarFlow</p>
          <p className="text-slate-300 font-semibold">{title || "Sentences & Structure"}</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${phase === 'study' ? 'border-amber-400 bg-amber-900/50 text-amber-400' : 'border-slate-700 bg-slate-800 text-slate-500'}`}>
          <Sparkles className="w-4 h-4" />
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${phase === 'practice' ? 'border-sky-400 bg-sky-900/50 text-sky-400' : 'border-slate-700 bg-slate-800 text-slate-500'}`}>
          <CheckCircle2 className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
