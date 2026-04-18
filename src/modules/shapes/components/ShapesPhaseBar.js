import { Map, Sparkles, CheckCircle2 } from "lucide-react";

export default function ShapesPhaseBar({ phase, title }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center border border-emerald-500/30">
          <Map className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Shapes Adventure</p>
          <p className="text-slate-300 font-semibold">{title}</p>
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
