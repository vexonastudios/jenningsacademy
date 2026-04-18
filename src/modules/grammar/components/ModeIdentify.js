import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Volume2 } from "lucide-react";
import GrammarPhaseBar from "./GrammarPhaseBar";

export default function ModeIdentify({ item, onNext, onSpeak, isSpeaking, grade }) {
  const [selectedWord, setSelectedWord] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Split sentence into words, stripping punctuation for exact matching if needed
  // Using a regex to split by word boundaries while keeping punctuation visually attached?
  // Actually, easiest is just split by space.
  const words = item.sentence.split(" ");

  useEffect(() => {
    setTimeout(() => {
      onSpeak(item.prompt);
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  const handleTap = (word) => {
    if (isCorrect) return; // Prevent tapping after success

    // Clean punctuation from the tapped word to match targets
    const cleanWord = word.replace(/[^\w\s]|_/g, "").trim();
    
    // Some targets might be upper or lower, best to match lowercase
    const isValid = item.targetWords.some(t => t.toLowerCase() === cleanWord.toLowerCase());

    setSelectedWord(word);

    if (isValid) {
       setIsCorrect(true);
       if (!isSpeaking) onSpeak("Great job! That is correct.");
       setTimeout(() => {
          onNext();
       }, 2000);
    } else {
       setIsCorrect(false);
       if (!isSpeaking) onSpeak(`Oops! "${cleanWord}" is not the ${item.posTarget.toUpperCase()}. Keep trying!`);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-full bg-slate-900 overflow-hidden">
      <GrammarPhaseBar phase="practice" title="Word Finder" />

      <div className="px-6 pt-10 pb-4 text-center max-w-2xl mx-auto w-full">
        <p className="text-2xl text-slate-200 font-bold leading-relaxed mb-6">
          {item.prompt}
        </p>

        <button 
           onClick={() => onSpeak(item.prompt)}
           disabled={isSpeaking}
           className="mx-auto w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-indigo-400 hover:text-indigo-300 transition-all border border-slate-700"
        >
           <Volume2 className={`w-8 h-8 ${isSpeaking ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      <div className="flex-1 w-full flex items-center justify-center px-6">
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
          {words.map((w, idx) => {
             const isThisSelected = selectedWord === w;
             
             let stateClass = "bg-slate-800 border-slate-600 text-white hover:bg-slate-700 hover:-translate-y-1";
             
             if (isThisSelected && isCorrect) {
                 stateClass = "bg-emerald-600 border-emerald-400 text-white scale-110 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce";
             } else if (isThisSelected && isCorrect === false) {
                 stateClass = "bg-rose-900 border-rose-500 text-white animate-shake";
             } else if (isCorrect) {
                 // Dim others once correct
                 stateClass = "bg-slate-800 border-slate-700 text-slate-500 opacity-50";
             }

             return (
               <button 
                 key={idx}
                 onClick={() => handleTap(w)}
                 className={`text-3xl sm:text-4xl font-black px-6 py-4 rounded-2xl border-4 transition-all duration-300 shadow-xl ${stateClass}`}
               >
                 {w}
               </button>
             );
          })}
        </div>
      </div>
    </div>
  );
}
