import { useEffect } from "react";
import { Volume2, ArrowRight } from "lucide-react";
import ShapesPhaseBar from "./ShapesPhaseBar";

export default function ShapeIntro({ shape, onNext, onSpeak, isSpeaking }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onSpeak(`This is a ${shape.name}. Notice how ${shape.attributes}.`);
    }, 500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full min-h-full bg-slate-900">
      <ShapesPhaseBar phase="study" title="Meet the Shape" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg flex flex-col items-center">
          
          <h2 className="text-4xl text-slate-300 font-bold mb-4 uppercase tracking-widest text-center">
            {shape.name}
          </h2>

          <div className={`w-64 h-64 flex items-center justify-center p-4 transition-all duration-700 animate-in fade-in zoom-in-50 ${shape.colorClass}`}>
            {shape.svg}
          </div>

          <button 
            onClick={() => onSpeak(`This is a ${shape.name}. Notice how ${shape.attributes}.`)}
            disabled={isSpeaking}
            className={`mt-10 px-8 py-4 rounded-full flex items-center gap-3 text-lg font-bold transition-all shadow-xl
              ${isSpeaking 
                ? "bg-slate-800 text-slate-500 border-2 border-slate-700 cursor-not-allowed animate-pulse" 
                : "bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-105"}`}
          >
            <Volume2 className="w-6 h-6" />
            {isSpeaking ? "Listening..." : "Hear it"}
          </button>

        </div>
      </div>

      <div className="px-6 pb-8 flex justify-center mt-auto shrink-0">
        <button 
          onClick={onNext}
          className="w-full max-w-sm py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex justify-center items-center gap-2"
        >
          Let's Play <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
