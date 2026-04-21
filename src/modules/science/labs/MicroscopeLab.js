"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Search, CircleDashed } from "lucide-react";

const SAMPLES = [
  {
    id: "leaf",
    title: "Plant Leaf Cell",
    targets: [
      { id: "nucleus", label: "Nucleus", top: "30%", left: "45%" },
      { id: "chloroplast", label: "Chloroplast", top: "60%", left: "70%" },
      { id: "cellwall", label: "Cell Wall", top: "10%", left: "10%" }
    ],
    bgClass: "bg-emerald-900" // We'll simulate a zoom with CSS
  }
];

export default function MicroscopeLab({ speak, onComplete }) {
  const [sample] = useState(SAMPLES[0]);
  const [found, setFound] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak(`We are looking at a ${sample.title} under the microscope. Scan the slide to identify the key structures: Nucleus, Chloroplast, and Cell Wall.`);
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, sample.title, speak]);

  const handleTargetClick = (targetId) => {
    if (!found.includes(targetId)) {
      setFound(prev => {
        const next = [...prev, targetId];
        const obj = sample.targets.find(t => t.id === targetId);
        
        if (next.length === sample.targets.length) {
          speak(`You found the ${obj.label}! Discovery Complete! Excellent observation skills.`);
        } else {
          speak(`Great job! You found the ${obj.label}. Keep looking!`);
        }
        
        return next;
      });
    }
  };

  const remaining = sample.targets.length - found.length;

  if (remaining === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mb-6 shadow-lg border outline outline-4 outline-emerald-50">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Discovery Complete!</h2>
        <p className="text-slate-500 mb-8 max-w-sm">You found all the vital elements of the {sample.title}. Excellent observation!</p>
        <button onClick={onComplete} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-1">
          Finish Lab
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      
      {/* Viewport Sidebar */}
      <div className="w-full md:w-80 bg-slate-900 text-white p-8 flex flex-col shrink-0 relative overflow-hidden">
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-3 mb-8 text-emerald-400">
            <Search className="w-6 h-6" />
            <h3 className="font-extrabold tracking-widest uppercase title-font">Microscope</h3>
          </div>
          
          <h4 className="text-xl font-bold mb-2">Subject: {sample.title}</h4>
          <p className="text-sm text-slate-400 mb-8 leading-relaxed">
            Scan the slide and identify the key structures.
          </p>

          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700/50">
            <h5 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-4 border-b border-slate-700 pb-2">Target Elements ({found.length}/{sample.targets.length})</h5>
            <ul className="space-y-3">
              {sample.targets.map(t => {
                const isFound = found.includes(t.id);
                return (
                  <li key={t.id} className={`flex items-center gap-3 text-sm font-semibold transition-colors ${isFound ? "text-emerald-400" : "text-slate-300"}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 ${isFound ? "bg-emerald-500/20 border-emerald-400" : "border-slate-600"}`}>
                      {isFound && <CheckCircle className="w-3 h-3" />}
                    </div>
                    {t.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Main lens area */}
      <div className="flex-1 bg-slate-100 flex flex-col items-center justify-center relative p-6">
         {/* Top controls */}
         <div className="absolute top-6 left-6 right-6 flex justify-between z-10">
           <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow border border-slate-200 font-bold text-slate-700 text-sm">
             Magnification: {zoom}x
           </div>
           <div className="flex gap-2">
             <button onClick={() => setZoom(z => Math.max(1, z - 0.5))} className="bg-white hover:bg-slate-50 text-slate-600 font-bold w-10 h-10 rounded-xl shadow border border-slate-200">−</button>
             <button onClick={() => setZoom(z => Math.min(3, z + 0.5))} className="bg-white hover:bg-slate-50 text-slate-600 font-bold w-10 h-10 rounded-xl shadow border border-slate-200">+</button>
           </div>
         </div>

         {/* Lens Viewport */}
         <div className="w-full max-w-md aspect-square bg-black rounded-full border-8 border-slate-800 shadow-2xl overflow-hidden relative shadow-inner">
           {/* The sample backdrop — targets live INSIDE so they scale with zoom */}
           <div 
             className={`absolute inset-0 ${sample.bgClass} transition-transform duration-500 cursor-crosshair`}
             style={{ 
               transform: `scale(${zoom})`,
               transformOrigin: "center center",
               backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 60%)'
             }}
           >
              {/* Fake cellular pattern SVG */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M10,10 Q30,5 50,20 T90,10 Q95,40 80,60 T10,90 Q5,50 10,10 Z" fill="none" stroke="#a7f3d0" strokeWidth="1" />
                 <path d="M40,40 Q60,35 80,50 T100,50 Q100,80 70,90 T40,40 Z" fill="none" stroke="#a7f3d0" strokeWidth="1" />
              </svg>

              {/* Clickable Targets — positioned inside scaled div so they move with zoom */}
              {sample.targets.map(t => {
                const isFound = found.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTargetClick(t.id)}
                    className="absolute w-12 h-12 -ml-6 -mt-6 group"
                    style={{ top: t.top, left: t.left }}
                  >
                    {!isFound ? (
                       <CircleDashed className="w-8 h-8 text-white/40 group-hover:text-amber-300 group-hover:scale-125 transition-all animate-[spin_10s_linear_infinite]" />
                    ) : (
                       <CheckCircle className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    )}
                  </button>
                );
              })}
           </div>
           
           {/* Lens reflections */}
           <div className="absolute inset-0 pointer-events-none rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
           <div className="absolute inset-0 pointer-events-none rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/20" />
         </div>
         <p className="text-slate-400 mt-6 font-medium">Use +/− to zoom in, then click the glowing targets to identify each cell structure.</p>
      </div>
    </div>
  );
}
