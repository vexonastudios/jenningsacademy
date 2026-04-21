import { useState, useEffect, useMemo } from "react";
import ShapesPhaseBar from "./ShapesPhaseBar";
import { Check, XCircle } from "lucide-react";
import { SHAPES_CURRICULUM } from "../content/shapesCurriculum";

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

export default function ModeDragOutline({ shape, onNext, onSpeak, isSpeaking }) {
  const [placed, setPlaced] = useState(false);
  const [wrongTaps, setWrongTaps] = useState(new Set());
  
  // Memoize the inventory options so they don't shuffle on every render
  const options = useMemo(() => {
    const wrongPool = SHAPES_CURRICULUM.filter(s => s.id !== shape.id);
    shuffle(wrongPool);
    const chosenWrong = wrongPool.slice(0, 3); // 3 decoys + 1 correct = 4 inventory items
    return shuffle([...chosenWrong, shape]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape.id]);
  
  useEffect(() => {
    setTimeout(() => {
      onSpeak(`Can you put the ${shape.name} in its place? Tap the shape!`);
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTap = (selectedShape) => {
    if (placed) return;
    
    if (selectedShape.id === shape.id) {
      setPlaced(true);
      if (!isSpeaking) onSpeak(`Perfect! You matched the ${shape.name}!`);
      setTimeout(() => {
        onNext();
      }, 2500);
    } else {
      const s = new Set(wrongTaps);
      s.add(selectedShape.id);
      setWrongTaps(s);
      if (!isSpeaking) onSpeak(`Oops! That's a ${selectedShape.name}. Find the ${shape.name} to complete the puzzle!`);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-full bg-slate-900 overflow-hidden relative">
      <ShapesPhaseBar phase="practice" title="Puzzle Time" />

      {/* Confetti or Celebration overlay when placed */}
      {placed && (
        <div className="absolute inset-x-0 top-1/4 flex justify-center z-0 animate-in zoom-in spin-in-12 duration-700">
           <div className={`w-[400px] h-[400px] rounded-full blur-3xl opacity-20 ${shape.bgClass}`} />
        </div>
      )}

      <div className="px-6 pt-6 pb-2 text-center relative z-10">
        <p className="text-xl text-slate-300 font-semibold">
          Tap the shape to place it in the puzzle!
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 gap-16">
        
        {/* The Outline */}
        <div className={`relative w-48 h-48 border-4 border-dashed rounded-3xl transition-all duration-500 flex items-center justify-center
          ${placed ? "border-transparent" : "border-slate-600 bg-slate-800/50" }`}>
          
          {/* Inner shape reference (faint) */}
          {!placed && (
            <div className="w-full h-full text-slate-700 opacity-50 p-4">
               {shape.svg}
            </div>
          )}

          {/* Placed Shape */}
          {placed && (
            <div className={`absolute inset-0 p-4 transition-all duration-500 animate-in zoom-in-50 fill-mode-both ${shape.colorClass}`}>
               {shape.svg}
            </div>
          )}

          {placed && (
             <div className="absolute -top-4 -right-4 bg-emerald-500 text-white rounded-full p-2 shadow-xl animate-bounce">
               <Check className="w-8 h-8" strokeWidth={4} />
             </div>
          )}
        </div>


        {/* The Draggable / Touchable Shape Inventory */}
        <div className="flex items-center justify-center gap-4 flex-wrap w-full max-w-2xl mx-auto min-h-[140px]">
            {!placed && options.map((opt) => {
              const isWrong = wrongTaps.has(opt.id);
              
              return (
                <button 
                  key={opt.id}
                  onClick={() => handleTap(opt)}
                  disabled={isWrong}
                  className={`relative w-24 h-24 sm:w-32 sm:h-32 p-4 rounded-2xl shadow-xl transition-all border-4 text-white
                    ${isWrong 
                      ? "bg-slate-800/80 border-rose-500/30 opacity-40 grayscale cursor-not-allowed" 
                      : `border-transparent hover:-translate-y-2 hover:scale-105 active:scale-95 ${opt.bgClass}`}`}
                >
                  <div className="w-full h-full drop-shadow-md">
                     {opt.svg}
                  </div>
                  {isWrong && (
                    <div className="absolute -top-2 -right-2 text-rose-500 bg-slate-900 rounded-full">
                      <XCircle className="w-6 h-6" />
                    </div>
                  )}
                </button>
              );
            })}
        </div>

      </div>
    </div>
  );
}
