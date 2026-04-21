"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Beaker, Info } from "lucide-react";

export default function ChemistryMixer({ speak, onComplete }) {
  const [stage, setStage] = useState("mixing"); // mixing, reacting, done
  const [selectedChem, setSelectedChem] = useState(null);
  const [ingredients, setIngredients] = useState([]); // items in the big beaker
  const [reactionMsg, setReactionMsg] = useState("");
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak("Welcome to the Chemistry Bench. Today, you must create a bubbly reaction by mixing an Acid and a Base. What happens when you combine vinegar and baking soda?");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  const CHEMICALS = [
    { id: "vinegar", name: "Vinegar", color: "bg-slate-100 border-slate-300", liquidColor: "bg-slate-100", type: "acid" },
    { id: "baking_soda", name: "Baking Soda", color: "bg-orange-50 border-orange-200", liquidColor: "bg-orange-100", type: "base" },
    { id: "water", name: "Water", color: "bg-cyan-50 border-cyan-200", liquidColor: "bg-cyan-400", type: "neutral" },
    { id: "dye", name: "Red Food Dye", color: "bg-rose-50 border-rose-200", liquidColor: "bg-rose-600", type: "neutral" }
  ];

  const handleMix = () => {
    if (!selectedChem) return;
    const newMix = [...ingredients, selectedChem];
    setIngredients(newMix);
    setSelectedChem(null);

    // Speak what was added
    const isAcidOrBase = selectedChem.type === "acid" || selectedChem.type === "base";
    const addedSpeech = isAcidOrBase 
       ? `You added ${selectedChem.name}, which is a ${selectedChem.type}.`
       : `You added ${selectedChem.name}.`;
    speak(addedSpeech);

    // Check for reaction
    const hasVinegar = newMix.some(c => c.id === "vinegar");
    const hasSoda = newMix.some(c => c.id === "baking_soda");

    if (hasVinegar && hasSoda) {
      setStage("reacting");
      const msg = "Chemical Reaction Complete! The Acid and Base combined to release Carbon Dioxide gas. Fantastic job!";
      setReactionMsg(msg);
      setTimeout(() => speak(msg), 1500); // speak after the eruption starts
      setTimeout(() => setStage("done"), 6000);
    } else if (newMix.length >= 4) {
      setStage("reacting");
      const msg = "You mixed a bunch of things, but no powerful reaction occurred. Try mixing an Acid and a Base!";
      setReactionMsg(msg);
      setTimeout(() => speak(msg), 1500);
      setTimeout(() => {
        setIngredients([]);
        setStage("mixing");
      }, 6000);
    }
  };

  const getBeakerColor = () => {
    if (ingredients.length === 0) return "transparent";
    // Blend colors or just take the last dropped dye if any, else first
    const hasDye = ingredients.find(c => c.id === "dye");
    if (hasDye) return hasDye.liquidColor;
    return ingredients[0].liquidColor;
  };

  if (stage === "done") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="relative mb-8">
           <div className="text-6xl animate-bounce">🌋</div>
           <CheckCircle className="absolute -bottom-2 -right-2 text-emerald-500 w-8 h-8 bg-white rounded-full" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Experiment Success!</h2>
        <p className="text-slate-500 mb-8 max-w-sm">{reactionMsg}</p>
        <button onClick={onComplete} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 transition-transform hover:-translate-y-1">
          Complete Lab
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
       <div className="w-full md:w-80 bg-indigo-900 text-white p-8 flex flex-col shrink-0">
          <div className="flex items-center gap-3 mb-6 text-indigo-400">
            <Beaker className="w-6 h-6" />
            <h3 className="font-extrabold tracking-widest uppercase">Chemistry Bench</h3>
          </div>
          
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Your objective: Create an eruptive chemical reaction by mixing the correct Acid and Base.
          </p>

          <div className="bg-indigo-800/50 rounded-xl p-4 mb-6">
             <h4 className="text-xs uppercase font-black text-indigo-300 mb-3 tracking-wider">Chemical Shelf</h4>
             <div className="grid grid-cols-2 gap-2">
               {CHEMICALS.map(c => (
                 <button
                   key={c.id}
                   onClick={() => setSelectedChem(c)}
                   className={`p-3 rounded-xl border-2 text-xs font-bold transition-all text-slate-800 ${c.color} ${selectedChem?.id === c.id ? "ring-2 ring-white scale-105 shadow-md" : "hover:scale-105"}`}
                 >
                   {c.name}
                   <div className="text-[10px] font-semibold opacity-60 mt-0.5">{c.type}</div>
                 </button>
               ))}
             </div>
          </div>

          <div className="mt-auto bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-3 text-amber-200">
             <Info className="w-5 h-5 shrink-0" />
             <p className="text-xs font-medium">Acids (like Vinegar) release hydrogen ions, while bases (like Baking Soda) accept them. Mixing them causes a bubbly reaction!</p>
          </div>
       </div>

       {/* Mixing Area */}
       <div className="flex-1 bg-slate-50 flex items-center justify-center p-8 relative">
          <div className="text-center w-full max-w-sm">
             
             {/* The Main Flask */}
             <div className="relative mx-auto w-48 h-64 border-8 border-t-0 border-white bg-slate-100/50 rounded-b-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-end justify-center overflow-hidden mb-8">
                {/* Visual Liquid Level */}
                <div 
                  className={`w-full transition-all duration-700 ease-out ${getBeakerColor()}`}
                  style={{ height: `${Math.min(100, ingredients.length * 25)}%` }}
                >
                   {/* Bubbles if reacting */}
                   {stage === "reacting" && (
                     <div className="absolute inset-0 flex items-start justify-center gap-2 pt-2 mix-blend-overlay">
                       <div className="w-4 h-4 bg-white rounded-full animate-bounce" />
                       <div className="w-6 h-6 bg-white rounded-full animate-[bounce_0.8s_infinite]" />
                       <div className="w-3 h-3 bg-white rounded-full animate-[bounce_1.2s_infinite]" />
                     </div>
                   )}
                </div>

                {/* Flask reflections */}
                <div className="absolute inset-y-0 left-2 w-4 bg-white/40 rounded-full my-4" />
                <div className="absolute -top-4 w-12 h-8 bg-sky-100/20 rounded-full border-4 border-white" />
             </div>

             {/* Overflow bubbles if reacting */}
             {stage === "reacting" && (
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 pointer-events-none">
                 <div className="text-6xl animate-ping">🫧</div>
                 <div className="absolute font-black text-rose-500 tracking-widest uppercase bg-white/90 px-6 py-2 rounded-full shadow-lg border border-rose-100 scale-150 animate-pulse">
                   REACTION!
                 </div>
               </div>
             )}

             <button
               disabled={!selectedChem || stage !== "mixing"}
               onClick={handleMix}
               className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                 !selectedChem || stage !== "mixing" 
                   ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" 
                   : "bg-indigo-500 hover:bg-indigo-400 text-white active:scale-95"
               }`}
             >
               {selectedChem ? `Add ${selectedChem.name} to flask` : "Select a chemical to add"}
             </button>
             
             {ingredients.length > 0 && stage === "mixing" && (
               <p className="mt-4 text-sm font-semibold text-slate-400">
                 Contains: {ingredients.map(i => i.name).join(", ")}
               </p>
             )}
          </div>
       </div>
    </div>
  );
}
