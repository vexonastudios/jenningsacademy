import { useState, useEffect } from "react";
import BiblePhaseBar from "./BiblePhaseBar";
import { Volume2, PlayCircle } from "lucide-react";

export default function ModeLearnSequence({ item, onNext, onSpeak, isSpeaking }) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    // Start reading the books automatically
    let isMounted = true;
    
    const readSequence = async () => {
      // Intro
      onSpeak(`Let's learn the books of ${item.title}. Listen carefully.`);
      await new Promise(r => setTimeout(r, 4000));
      
      for (let i = 0; i < item.books.length; i++) {
        if (!isMounted) return;
        setCurrentIndex(i);
        onSpeak(item.books[i].name);
        await new Promise(r => setTimeout(r, 2000));
      }
      
      if (!isMounted) return;
      setCurrentIndex(-1); // Reset highlight
      setShowNext(true);
      onSpeak("Now it's your turn. Press start to rebuild the scroll.");
    };

    readSequence();

    return () => { isMounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  const handleReadAgain = () => {
    setShowNext(false);
    let i = 0;
    setCurrentIndex(0);
    const interval = setInterval(() => {
        if (i < item.books.length) {
            setCurrentIndex(i);
            onSpeak(item.books[i].name);
            i++;
        } else {
            clearInterval(interval);
            setCurrentIndex(-1);
            setShowNext(true);
        }
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 overflow-hidden relative">
      <BiblePhaseBar phase="study" title={item.title} />

      <div className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
            
            <p className="text-xl text-amber-500 font-bold mb-2 uppercase tracking-widest text-center">Learning Phase</p>
            <p className="text-3xl text-white font-black mb-8 text-center">{item.title}</p>
            
            <div className="flex flex-col gap-3 w-full max-w-sm">
                {item.books.map((book, idx) => (
                    <div 
                        key={book.id} 
                        className={`px-6 py-4 rounded-xl font-bold text-lg text-center transition-all ${
                            currentIndex === idx 
                                ? "bg-amber-500 text-slate-900 scale-105 shadow-xl shadow-amber-500/20" 
                                : currentIndex > -1 && currentIndex > idx 
                                ? "bg-slate-800 text-amber-200 border border-slate-700" 
                                : "bg-slate-800 text-slate-400 border border-slate-700 opacity-50"
                        }`}
                    >
                        {idx + 1}. {book.name}
                    </div>
                ))}
            </div>

            <div className={`mt-12 flex flex-col items-center gap-6 transition-all duration-700 ${showNext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <button
                    onClick={onNext}
                    className="flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 text-xl font-black rounded-2xl transition-transform hover:scale-105 shadow-xl shadow-amber-500/20"
                >
                    <PlayCircle className="w-6 h-6" />
                    Start Game
                </button>
                <button
                    onClick={handleReadAgain}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold"
                >
                    <Volume2 className="w-4 h-4" /> Listen Again
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
