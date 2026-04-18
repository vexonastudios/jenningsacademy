import { useState, useEffect } from "react";
import GrammarPhaseBar from "./GrammarPhaseBar";
import { Volume2, Check } from "lucide-react";

export default function ModeSentenceFix({ item, onNext, onSpeak, isSpeaking, grade }) {
  const [hasFixedCap, setHasFixedCap] = useState(false);
  const [hasFixedPunc, setHasFixedPunc] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      onSpeak(item.prompt);
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  useEffect(() => {
     if (hasFixedCap && hasFixedPunc) {
         if (!isSpeaking) onSpeak("Perfect sentence!");
         setTimeout(() => {
             onNext();
         }, 2000);
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFixedCap, hasFixedPunc]);

  const handleCapTap = () => {
    if (!hasFixedCap) {
        setHasFixedCap(true);
        // minimal audio feedback if desired, or let visual do it
    }
  };

  const currentSentence = hasFixedCap ? item.correctCap : item.broken;

  return (
    <div className="flex flex-col h-full min-h-full bg-slate-900 overflow-hidden">
      <GrammarPhaseBar phase="practice" title="Sentence Fixer" />

      <div className="px-6 pt-10 pb-4 text-center max-w-2xl mx-auto w-full">
        <p className="text-2xl text-slate-200 font-bold leading-relaxed mb-6">
          {item.prompt}
        </p>

        <button 
           onClick={() => onSpeak(item.prompt)}
           disabled={isSpeaking}
           className="mx-auto w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-rose-400 hover:text-rose-300 transition-all border border-slate-700"
        >
           <Volume2 className={`w-8 h-8 ${isSpeaking ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center px-6 gap-10">
        
        {/* The Sentence Display */}
        <div className="relative bg-slate-800 border-4 border-slate-600 rounded-3xl px-10 py-8 flex items-center gap-2 shadow-2xl">
           
           {/* Capitalization UI */}
           <button 
             onClick={handleCapTap}
             disabled={hasFixedCap}
             className={`text-5xl font-black transition-all ${
                hasFixedCap ? "text-emerald-400" : "text-rose-400 border-b-4 border-dashed border-rose-400 hover:scale-110 active:scale-95 cursor-pointer pb-1"
             }`}
           >
             {hasFixedCap ? item.correctCap.charAt(0) : item.broken.charAt(0)}
           </button>

           <span className="text-5xl font-black text-white">
              {currentSentence.slice(1)}
           </span>

           {/* Punctuation UI */}
           {hasFixedPunc ? (
             <span className="text-5xl font-black text-emerald-400 animate-in zoom-in spin-in-12">
                {item.puncTarget}
             </span>
           ) : (
             <span className="text-5xl font-black text-slate-600 border-b-4 border-dashed border-slate-600 w-8 inline-block animate-pulse">
                &nbsp;
             </span>
           )}
        </div>

        {/* Punctuation Picker Tool */}
        {!hasFixedPunc && (
           <div className="flex gap-6 mt-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
             {[".", "?", "!"].map(p => (
                <button
                  key={p}
                  onClick={() => {
                     if (p === item.puncTarget) {
                        setHasFixedPunc(true);
                     } else {
                        if (!isSpeaking) onSpeak(`Not quite... Does it need a ${p === '.' ? 'period' : p === '?' ? 'question mark' : 'exclamation point'}?`);
                     }
                  }}
                  className="w-20 h-20 bg-slate-800 border-4 border-slate-600 text-slate-300 hover:border-amber-400 hover:text-amber-400 hover:-translate-y-2 rounded-2xl text-5xl font-black transition-all shadow-xl"
                >
                  {p}
                </button>
             ))}
           </div>
        )}

        {hasFixedCap && hasFixedPunc && (
           <div className="text-emerald-400 flex flex-col items-center animate-in zoom-in duration-500">
             <Check className="w-16 h-16" />
             <p className="font-bold uppercase tracking-widest mt-2">Fixed!</p>
           </div>
        )}

      </div>
    </div>
  );
}
