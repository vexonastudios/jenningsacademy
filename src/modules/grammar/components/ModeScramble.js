import { useState, useEffect } from "react";
import GrammarPhaseBar from "./GrammarPhaseBar";
import { Volume2, RotateCcw, Check } from "lucide-react";

export default function ModeScramble({ item, onNext, onMiss, onSpeak, isSpeaking, grade }) {
  const [bank, setBank] = useState([...item.words]); // words left to pick
  const [slots, setSlots] = useState([]); // words picked
  
  const isComplete = bank.length === 0;
  const isCorrect = isComplete && slots.join(" ") === item.target;

  useEffect(() => {
    // Reset state when new item loads
    setBank([...item.words]);
    setSlots([]);
    
    setTimeout(() => {
      onSpeak(item.prompt);
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  useEffect(() => {
      if (isComplete) {
          if (isCorrect) {
              if (!isSpeaking) onSpeak(`Perfect! ${item.target}.`);
              setTimeout(() => {
                  onNext();
              }, 2500);
          } else {
              if (onMiss) onMiss();
              if (!isSpeaking) onSpeak("That doesn't sound quite right. Try again!");
              // Auto reset after a moment
              setTimeout(() => {
                  handleReset();
              }, 2000);
          }
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete, isCorrect]);

  const handleTapWord = (word, index) => {
      if (isComplete) return;
      const newBank = [...bank];
      newBank.splice(index, 1);
      setBank(newBank);
      setSlots([...slots, word]);
  };

  const handleReset = () => {
      setBank([...item.words]);
      setSlots([]);
  };

  return (
    <div className="flex flex-col h-full min-h-full bg-slate-900 overflow-hidden relative">
      <GrammarPhaseBar phase="practice" title="Sentence Builder" />

      {/* Confetti or Celebration overlay */}
      {isComplete && isCorrect && (
        <div className="absolute inset-x-0 top-1/3 flex justify-center z-0 animate-in zoom-in spin-in-12 duration-700">
           <div className={`w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-sky-500`} />
        </div>
      )}

      <div className="px-6 pt-10 pb-4 text-center max-w-2xl mx-auto w-full relative z-10">
        <p className="text-2xl text-slate-200 font-bold leading-relaxed mb-6">
          {item.prompt}
        </p>

        <div className="flex justify-center gap-4">
            <button 
               onClick={() => onSpeak(item.prompt)}
               disabled={isSpeaking}
               className="w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-sky-400 hover:text-sky-300 transition-all border border-slate-700"
            >
               <Volume2 className={`w-8 h-8 ${isSpeaking ? 'animate-pulse' : ''}`} />
            </button>
            
            {slots.length > 0 && !isComplete && (
                <button 
                   onClick={handleReset}
                   className="w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-slate-700"
                >
                   <RotateCcw className="w-6 h-6" />
                </button>
            )}
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center px-6 gap-12 relative z-10">
        
        {/* The Slots Area */}
        <div className={`flex flex-wrap justify-center gap-3 p-6 rounded-3xl min-h-[120px] transition-all border-4
            ${isComplete && isCorrect ? "border-emerald-500 bg-emerald-900/30 shadow-[0_0_40px_rgba(16,185,129,0.3)]" 
              : isComplete ? "border-rose-500 bg-rose-900/30 animate-shake" 
              : "border-slate-700 bg-slate-800"}`}>
            
            {slots.map((word, i) => (
                <div key={i} className="animate-in slide-in-from-bottom-5 zoom-in px-6 py-4 rounded-2xl bg-sky-600 text-white font-black text-3xl shadow-lg border border-sky-400">
                    {word}
                </div>
            ))}
            
            {/* Empty placeholders */}
            {Array.from({length: bank.length}).map((_, i) => (
                <div key={`empty-${i}`} className="px-6 py-4 rounded-2xl border-4 border-dashed border-slate-600 w-24 h-16" />
            ))}
            
            {isComplete && isCorrect && (
                <div className="absolute -top-4 -right-4 bg-emerald-500 text-white rounded-full p-2 shadow-xl animate-bounce">
                  <Check className="w-8 h-8" strokeWidth={4} />
                </div>
             )}
        </div>

        {/* The Word Bank */}
        <div className="flex flex-wrap justify-center gap-4 min-h-[100px]">
            {bank.map((word, i) => (
                <button 
                  key={i}
                  onClick={() => handleTapWord(word, i)}
                  className="px-6 py-4 rounded-2xl bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white font-black text-3xl shadow-md border-b-4 border-slate-900 active:translate-y-1 active:border-b-0 transition-all"
                >
                  {word}
                </button>
            ))}
        </div>

      </div>
    </div>
  );
}
