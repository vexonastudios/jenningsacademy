import { Trophy } from "lucide-react";

export default function GrammarReview({ onComplete }) {
  return (
    <div className="flex flex-col min-h-full px-6 py-10 max-w-xl mx-auto w-full justify-center">
      <div className="flex flex-col items-center mb-8">
        <div className="w-40 h-40 rounded-full flex flex-col items-center justify-center mb-6 shadow-2xl bg-indigo-900/30 border-[6px] border-indigo-500">
           <Trophy className="w-20 h-20 text-indigo-400" />
        </div>
        
        <h2 className="text-4xl font-black text-white text-center mb-3">
          Grammar Master!
        </h2>
        <p className="text-slate-400 text-center text-lg">
          Amazing job! You really know your sentences.
        </p>
      </div>

      <button onClick={onComplete}
        className="w-full py-5 rounded-2xl font-black text-xl transition-all hover:-translate-y-1 bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_40px_rgba(79,70,229,0.4)] flex items-center justify-center gap-3">
        Finish Today's Path
      </button>
    </div>
  );
}
