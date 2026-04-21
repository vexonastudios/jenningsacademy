import { useState, useEffect, useMemo } from "react";
import ShapesPhaseBar from "./ShapesPhaseBar";
import { SHAPES_CURRICULUM } from "../content/shapesCurriculum";
import { CheckCircle2, XCircle } from "lucide-react";

// Fisher-Yates shuffle
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default function ModeTapShape({ shape, onNext, onSpeak, isSpeaking }) {
  const ROUNDS = 5;
  const [currentRound, setCurrentRound] = useState(0);
  const [options, setOptions] = useState([]);
  const [feedbackState, setFeedbackState] = useState(null); // 'correct' | 'wrong'
  const [wrongTaps, setWrongTaps] = useState(new Set()); // keep track of which wrong ones were tapped

  const getNumWrongOptions = (roundIdx) => {
    switch (roundIdx) {
      case 0: return 2; // total 3
      case 1: return 3; // total 4
      case 2: return 4; // total 5
      case 3: return 5; // total 6
      default: return 7; // total 8
    }
  };

  // Generate options for this round
  useEffect(() => {
    // Pick random wrong shapes based on progressive difficulty
    const wrongPool = SHAPES_CURRICULUM.filter(s => s.id !== shape.id);
    shuffle(wrongPool);
    const chosenWrong = wrongPool.slice(0, getNumWrongOptions(currentRound));

    // Mix them with the correct shape
    const newlyShuffled = shuffle([...chosenWrong, shape]);
    setOptions(newlyShuffled);
    setFeedbackState(null);
    setWrongTaps(new Set());

    // Speak prompt quickly
    setTimeout(() => {
      onSpeak(`Tap the ${shape.name}.`);
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound, shape.id]);

  const handleTap = (selectedShape) => {
    if (feedbackState === "correct") return; // block taps while animating success
    
    if (selectedShape.id === shape.id) {
      setFeedbackState("correct");
      if (!isSpeaking) onSpeak("Great job!");
      
      setTimeout(() => {
        if (currentRound + 1 < ROUNDS) {
          setCurrentRound(r => r + 1);
        } else {
          onNext(); // Advance to next phase!
        }
      }, 1500);
    } else {
      // Wrong tap
      const s = new Set(wrongTaps);
      s.add(selectedShape.id);
      setWrongTaps(s);
      
      // We don't block feedbackState so they can keep trying immediately
      if (!isSpeaking) onSpeak(`Oops! That's a ${selectedShape.name}. Find the ${shape.name}!`);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-full bg-slate-900">
      <ShapesPhaseBar phase="practice" title="Tap the Shape" />

      <div className="px-6 pt-6 pb-2 text-center">
        <p className="text-xl text-slate-300 font-semibold">
          Can you find the <span className={shape.colorClass + " font-black uppercase tracking-wider"}>{shape.name}</span>?
        </p>
        <div className="flex justify-center gap-1 mt-4">
            {Array.from({length: ROUNDS}).map((_, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full max-w-[40px] transition-all 
                ${i < currentRound ? "bg-emerald-500" : i === currentRound ? "bg-indigo-500 scale-110" : "bg-slate-700"}`} />
            ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {options.map((opt) => {
            const isCorrectAndFound = feedbackState === "correct" && opt.id === shape.id;
            const isWrongAndTapped = wrongTaps.has(opt.id);

            return (
              <button 
                key={opt.id}
                onClick={() => handleTap(opt)}
                className={`relative w-32 h-32 sm:w-40 sm:h-40 p-6 rounded-3xl transition-all duration-300 shadow-xl border-4
                  ${isCorrectAndFound 
                    ? "bg-emerald-900/50 border-emerald-400 scale-110 animate-bounce" 
                    : isWrongAndTapped 
                      ? "bg-rose-900/30 border-rose-500/50 opacity-40 grayscale hover:grayscale cursor-not-allowed" 
                      : "bg-slate-800 border-slate-700 hover:border-slate-500 hover:-translate-y-1 hover:shadow-2xl"}`}
              >
                <div className={`w-full h-full ${isWrongAndTapped ? "text-slate-500" : opt.colorClass}`}>
                  {opt.svg}
                </div>
                
                {isCorrectAndFound && (
                  <div className="absolute -top-3 -right-3 text-emerald-400 bg-slate-900 rounded-full">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                )}
                {isWrongAndTapped && (
                  <div className="absolute -top-3 -right-3 text-rose-500 bg-slate-900 rounded-full">
                    <XCircle className="w-8 h-8" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
