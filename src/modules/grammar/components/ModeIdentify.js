import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Volume2 } from "lucide-react";
import GrammarPhaseBar from "./GrammarPhaseBar";

// Simple, child-friendly definitions for each part of speech
const POS_DEFINITIONS = {
  noun:        { def: "A person, place, thing, or idea.",       example: "dog, school, love",       color: "border-sky-500/40 bg-sky-500/10 text-sky-300" },
  verb:        { def: "An action or state of being.",           example: "run, jump, is, was",      color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
  adjective:   { def: "A word that describes a noun.",          example: "big, red, happy",         color: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
  adverb:      { def: "A word that describes a verb, adjective, or other adverb.", example: "quickly, very, loudly", color: "border-purple-500/40 bg-purple-500/10 text-purple-300" },
  pronoun:     { def: "A word used instead of a noun.",         example: "he, she, they, it",       color: "border-rose-500/40 bg-rose-500/10 text-rose-300" },
  preposition: { def: "Shows the relationship between words.",  example: "on, in, under, after",    color: "border-orange-500/40 bg-orange-500/10 text-orange-300" },
  conjunction: { def: "Connects words, phrases, or clauses.",   example: "and, but, or, because",   color: "border-teal-500/40 bg-teal-500/10 text-teal-300" },
  interjection:{ def: "An exclamation expressing emotion.",     example: "Wow!, Oh!, Ouch!",        color: "border-pink-500/40 bg-pink-500/10 text-pink-300" },
};

export default function ModeIdentify({ item, onNext, onMiss, onSpeak, isSpeaking, grade }) {
  const [selectedWord, setSelectedWord] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const words = item.sentence.split(" ");
  const pos = item.posTarget?.toLowerCase();
  const posDef = POS_DEFINITIONS[pos];

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
       if (onMiss) onMiss();
       if (!isSpeaking) onSpeak(`Oops! "${cleanWord}" is not the ${item.posTarget?.toUpperCase()}. Keep trying!`);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-full bg-slate-900 overflow-hidden">
      <GrammarPhaseBar phase="practice" title="Word Finder" />

      <div className="px-6 pt-8 pb-4 text-center max-w-2xl mx-auto w-full">
        <p className="text-2xl text-slate-200 font-bold leading-relaxed mb-5">
          {item.prompt}
        </p>

        {/* Part-of-Speech Definition Reminder */}
        {posDef && (
          <div className={`inline-flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border mb-5 ${posDef.color}`}>
            <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-0.5">
              What is a {pos}?
            </p>
            <p className="text-sm font-bold">{posDef.def}</p>
            <p className="text-xs opacity-60">e.g. {posDef.example}</p>
          </div>
        )}

        <button 
           onClick={() => onSpeak(item.prompt)}
           disabled={isSpeaking}
           className="mx-auto w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-indigo-400 hover:text-indigo-300 transition-all border border-slate-700"
        >
           <Volume2 className={`w-7 h-7 ${isSpeaking ? 'animate-pulse' : ''}`} />
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
