import { useState, useEffect } from "react";
import BiblePhaseBar from "./BiblePhaseBar";
import { Volume2, RotateCcw, Timer, Check } from "lucide-react";

export default function ModeScrollBuilder({ item, onNext, onMiss, onSpeak, isSpeaking }) {
  // Scramble the bank once on mount
  const [bank, setBank] = useState([]);
  const [slots, setSlots] = useState([]);
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // The true target array of book IDs
  const targetOrder = item.books.map(b => b.id);
  const isComplete = slots.length === item.books.length;
  // If complete, it is inherently correct because we enforce correct tapping order
  
  useEffect(() => {
    // Scramble logic
    const arr = [...item.books];
    arr.sort(() => 0.5 - Math.random());
    setBank(arr);
    setSlots([]);
    setTimeMs(0);
    setIsRunning(true);
    
    // Auto-prompt
    setTimeout(() => {
      onSpeak(`Rebuild the scroll of ${item.title}.`);
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  useEffect(() => {
    let interval;
    if (isRunning) {
        interval = setInterval(() => {
            setTimeMs(prev => prev + 10);
        }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
      if (isComplete) {
          setIsRunning(false); // Stop timer
          onSpeak(`Excellent! You rebuilt ${item.title}.`);
          setTimeout(() => {
              // Pass the time to higher level if needed, but for now just proceed
              onNext(timeMs);
          }, 3500);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  const handleTapWord = (book) => {
      if (isComplete) return;

      // Ensure they tapped the correct next book in the canonical sequence
      const nextExpectedId = targetOrder[slots.length];
      
      if (book.id === nextExpectedId) {
          // Correct!
          const newBank = bank.filter(b => b.id !== book.id);
          setBank(newBank);
          setSlots([...slots, book]);
      } else {
          // Incorrect!
          if (onMiss) onMiss();
          // Visual shake on the bank button can be added via a temporary class state if needed
          if (!isSpeaking) {
              onSpeak("Not quite. Think about which book comes next.");
          }
      }
  };

  const handleReset = () => {
      // Re-scramble all original books
      const arr = [...item.books];
      arr.sort(() => 0.5 - Math.random());
      setBank(arr);
      setSlots([]);
      setTimeMs(0); // Optionally reset timer, or keep it running. Let's keep it running for penalty.
  };

  // Format stopwatch: MM:SS.ms
  const formatTime = (ms) => {
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      const milliseconds = Math.floor((ms % 1000) / 10);
      return `${minutes > 0 ? minutes + ':' : ''}${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full min-h-[100dvh] bg-stone-900 overflow-hidden relative">
      <BiblePhaseBar phase="practice" title="Scroll Builder" />

      {/* Confetti or Celebration overlay */}
      {isComplete && (
        <div className="absolute inset-x-0 top-1/3 flex justify-center z-0 animate-in zoom-in spin-in-12 duration-700">
           <div className={`w-[600px] h-[600px] rounded-full blur-3xl opacity-20 bg-amber-500`} />
        </div>
      )}

      {/* Header controls & Timer */}
      <div className="px-6 pt-6 pb-2 text-center max-w-2xl mx-auto w-full relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <button 
               onClick={() => onSpeak(`Rebuild the scroll of ${item.title}.`)}
               disabled={isSpeaking}
               className="w-12 h-12 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-amber-400 hover:text-amber-300 transition-all border border-stone-700"
            >
               <Volume2 className={`w-6 h-6 ${isSpeaking ? 'animate-pulse' : ''}`} />
            </button>
            {slots.length > 0 && !isComplete && (
                <button 
                   onClick={handleReset}
                   className="w-12 h-12 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-stone-300 transition-all border border-stone-700"
                >
                   <RotateCcw className="w-5 h-5" />
                </button>
            )}
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xl font-black transition-colors ${
            isComplete ? 'bg-emerald-900/50 border border-emerald-500/50 text-emerald-400' : 'bg-stone-800 border border-stone-700 text-stone-300'
        }`}>
            <Timer className="w-5 h-5" />
            {formatTime(timeMs)}
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center px-6 gap-8 relative z-10 pb-10">
        
        <p className="text-xl text-stone-200 font-bold mb-2">Rebuild: <span className="text-amber-400">{item.title}</span></p>

        {/* The Reconstructed Scroll (Slots) */}
        <div className={`flex flex-col items-center gap-2 p-6 rounded-3xl w-full max-w-sm transition-all border-y-[12px]
            ${isComplete ? "border-amber-600 bg-[#f4e4bc] shadow-[0_0_40px_rgba(245,158,11,0.2)]" 
              : "border-stone-700 bg-stone-800/80"}`}>
            
            {slots.map((book, i) => (
                <div key={i} className={`animate-in slide-in-from-top-5 zoom-in px-4 py-3 rounded-md font-black text-xl w-full text-center shadow-sm border ${
                    isComplete ? "bg-[#fffbea] text-[#78350f] border-[#d4b483]" : "bg-stone-700 text-amber-100 border-stone-600"
                }`}>
                    {i + 1}. {book.name}
                </div>
            ))}
            
            {/* Empty placeholders - only show one 'next' slot to guide them */}
            {!isComplete && (
                <div className="px-4 py-3 rounded-md border-2 border-dashed border-stone-600 w-full text-center animate-pulse text-stone-500 font-bold bg-stone-800/50">
                    {slots.length + 1}. ?
                </div>
            )}
            
            {isComplete && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-stone-900 rounded-full p-4 shadow-2xl animate-bounce">
                  <Check className="w-12 h-12" strokeWidth={4} />
                </div>
             )}
        </div>

        {/* The Scattered Bank */}
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mt-4">
            {bank.map((book) => (
                <button 
                  key={book.id}
                  onClick={() => handleTapWord(book)}
                  className="px-5 py-3 rounded-xl bg-stone-700 text-stone-200 hover:bg-stone-600 hover:text-white font-bold text-lg shadow-md border-b-4 border-stone-900 active:translate-y-1 active:border-b-0 transition-all select-none"
                >
                  {book.name}
                </button>
            ))}
        </div>

      </div>
    </div>
  );
}
