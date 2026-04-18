import { useState, useEffect } from "react";
import ShapesPhaseBar from "./ShapesPhaseBar";
import { Check } from "lucide-react";

export default function ModeDragOutline({ shape, onNext, onSpeak, isSpeaking }) {
  const [placed, setPlaced] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      onSpeak(`Can you put the ${shape.name} in its place? Tap the shape!`);
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTap = () => {
    if (placed) return;
    setPlaced(true);
    if (!isSpeaking) onSpeak(`Perfect! You matched the ${shape.name}!`);
    setTimeout(() => {
      onNext();
    }, 2500);
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
        <div className="h-32 flex items-center justify-center">
            {!placed && (
              <button 
                onClick={handleTap}
                className={`w-32 h-32 p-4 rounded-2xl shadow-xl border-[6px] border-transparent hover:-translate-y-2 hover:scale-105 active:scale-95 transition-all text-white ${shape.bgClass}`}
              >
                <div className="w-full h-full drop-shadow-md">
                   {shape.svg}
                </div>
              </button>
            )}
        </div>

      </div>
    </div>
  );
}
