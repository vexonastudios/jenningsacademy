"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Sprout } from "lucide-react";

const REQUIREMENTS = [
  { id: "soil", name: "Soil", emoji: "🪱", desc: "Soil contains minerals and nutrients the roots absorb to grow.", color: "bg-amber-900 border-amber-700 text-amber-100" },
  { id: "seed", name: "Seed", emoji: "🌰", desc: "A seed contains everything the plant needs to start life — a tiny embryo waiting to grow!", color: "bg-orange-100 border-orange-400 text-orange-800" },
  { id: "water", name: "Water", emoji: "💧", desc: "Water carries nutrients from the soil up through the stem to the rest of the plant.", color: "bg-sky-100 border-sky-400 text-sky-800" },
  { id: "sun", name: "Sunlight", emoji: "☀️", desc: "Plants use sunlight to make their own food through photosynthesis — they turn light into sugar!", color: "bg-yellow-100 border-yellow-400 text-yellow-800" },
];

const PLANT_PARTS = [
  { id: "roots", name: "Roots", desc: "Roots anchor the plant and absorb water and minerals from the soil.", emoji: "🌱", dropId: "roots_zone" },
  { id: "stem", name: "Stem", desc: "The stem acts like a highway, carrying water and nutrients from the roots to the leaves.", emoji: "🌿", dropId: "stem_zone" },
  { id: "leaves", name: "Leaves", desc: "Leaves are the plant's solar panels — they capture sunlight and perform photosynthesis.", emoji: "🍃", dropId: "leaves_zone" },
  { id: "flower", name: "Flower", desc: "Flowers are the plant's way of reproducing. God designed them to attract pollinators like bees!", emoji: "🌸", dropId: "flower_zone" },
];

export default function BotanySprouter({ speak, onComplete }) {
  const [phase, setPhase] = useState("setup"); // setup → growing → label → done
  const [added, setAdded] = useState({});
  const [dragging, setDragging] = useState(null);
  const [labeled, setLabeled] = useState({});
  const [growthStage, setGrowthStage] = useState(0); // 0-4
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [activeFact, setActiveFact] = useState(null);

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak("Welcome to the Botany Lab! Plants are one of God's most amazing creations. They make their own food using sunlight! Click each ingredient on the shelf to add it to the pot, and watch your plant grow!");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  const handleAddItem = (itemId) => {
    if (added[itemId]) return;
    const item = REQUIREMENTS.find(r => r.id === itemId);
    const next = { ...added, [itemId]: true };
    setAdded(next);
    setActiveFact(item);
    speak(`${item.name} added! ${item.desc}`);

    const allAdded = REQUIREMENTS.every(r => next[r.id]);
    if (allAdded) {
      setTimeout(() => {
        speak("All ingredients are in! Watch closely — your plant is starting to grow!");
        setPhase("growing");
        // Animate growth stages
        let stage = 0;
        const interval = setInterval(() => {
          stage++;
          setGrowthStage(stage);
          if (stage >= 4) {
            clearInterval(interval);
            setTimeout(() => {
              speak("Your plant is fully grown! Now, can you label its parts? Drag each label to the correct part of the plant.");
              setPhase("label");
            }, 1000);
          }
        }, 900);
      }, 500);
    }
  };

  const handleLabelDrop = (e, zoneId) => {
    e.preventDefault();
    if (!dragging) return;
    const part = PLANT_PARTS.find(p => p.id === dragging);
    if (!part || part.dropId !== zoneId) {
      speak(`Hmm, that doesn't seem right. Try again!`);
      setDragging(null);
      return;
    }
    const next = { ...labeled, [dragging]: true };
    setLabeled(next);
    speak(`Correct! ${part.name} — ${part.desc}`);
    setDragging(null);

    if (PLANT_PARTS.every(p => next[p.id])) {
      setTimeout(() => {
        speak("You labeled all the parts of the plant! God designed every single part with a special purpose. What a wonderful creation!");
        setPhase("done");
      }, 800);
    }
  };

  if (phase === "done") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="text-6xl mb-6">🌺</div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Plant Expert!</h2>
        <p className="text-slate-500 mb-6 max-w-md leading-relaxed">
          You grew and labeled your plant perfectly. <span className="font-semibold italic text-slate-700">"Then God said, 'Let the earth bring forth grass, the herb that yields seed...' and it was so." — Genesis 1:11</span>
        </p>
        <button onClick={onComplete} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-1">
          Finish Lab
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-emerald-950 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-emerald-400">
          <Sprout className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase">Botany Lab</h3>
        </div>

        {phase === "setup" && (
          <>
            <p className="text-emerald-100/80 text-sm mb-6 leading-relaxed">Click each item below to add it to the pot. Every plant needs these four things to grow!</p>
            <div className="space-y-2">
              {REQUIREMENTS.map(item => (
                <button
                  key={item.id}
                  disabled={!!added[item.id]}
                  onClick={() => handleAddItem(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 font-bold text-sm transition-all
                    ${added[item.id] ? "opacity-50 cursor-not-allowed bg-emerald-900/40 border-emerald-800 text-emerald-400" : `${item.color} cursor-pointer hover:scale-105 active:scale-95`}`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span>{item.name}</span>
                  {added[item.id] && <CheckCircle className="w-4 h-4 ml-auto" />}
                </button>
              ))}
            </div>
          </>
        )}

        {phase === "label" && (
          <>
            <p className="text-emerald-100/80 text-sm mb-6 leading-relaxed">Drag each plant part label to the correct spot on the grown plant!</p>
            <div className="space-y-2">
              {PLANT_PARTS.map(part => (
                !labeled[part.id] && (
                  <div
                    key={part.id}
                    draggable
                    onDragStart={() => setDragging(part.id)}
                    onDragEnd={() => setDragging(null)}
                    className="flex items-center gap-3 p-3 rounded-xl border-2 border-emerald-600 bg-emerald-900/50 font-bold text-sm text-emerald-200 cursor-grab active:cursor-grabbing select-none hover:scale-105 transition-transform"
                  >
                    <span className="text-xl">{part.emoji}</span>{part.name}
                  </div>
                )
              ))}
              {PLANT_PARTS.every(p => labeled[p.id]) && (
                <p className="text-emerald-400 font-bold text-center py-2">All labeled! ✓</p>
              )}
            </div>
          </>
        )}

        {activeFact && phase === "setup" && (
          <div className="mt-auto bg-emerald-900/60 border border-emerald-700/50 rounded-xl p-4">
            <p className="text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Lab Note</p>
            <p className="text-xs text-emerald-100 leading-relaxed">{activeFact.desc}</p>
          </div>
        )}
      </div>

      {/* Main Canvas */}
      <div className="flex-1 bg-gradient-to-b from-sky-100 to-emerald-50 flex flex-col items-center justify-end pb-12 relative overflow-hidden p-6">
        {/* Sky & ground backdrop */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-sky-200/40" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-emerald-900/20 rounded-t-full" />

        {/* Sun (appears when sunlight added) */}
        {added.sun && (
          <div className="absolute top-6 right-10 text-5xl animate-[spin_20s_linear_infinite] drop-shadow-lg">☀️</div>
        )}

        {/* Growing plant stages */}
        <div className="relative flex flex-col items-center mb-4 z-10">
          {/* The plant visual */}
          <div className="relative flex flex-col items-center" style={{ height: 300 }}>

            {/* Flower — only at stage 4 */}
            {growthStage >= 4 && (
              <div
                onDrop={(e) => handleLabelDrop(e, "flower_zone")}
                onDragOver={(e) => e.preventDefault()}
                className={`text-5xl mb-1 transition-all animate-[fadeInDown_0.5s_ease] ${labeled.flower ? "drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]" : ""}`}
              >
                🌸
                {phase === "label" && !labeled.flower && (
                  <div className="text-[10px] font-bold text-pink-600 text-center -mt-1 border border-dashed border-pink-400 rounded px-1">Drop Flower</div>
                )}
                {labeled.flower && <div className="text-[10px] font-black text-emerald-600 text-center">✓ Flower</div>}
              </div>
            )}

            {/* Leaves — stage 3 */}
            {growthStage >= 3 && (
              <div
                onDrop={(e) => handleLabelDrop(e, "leaves_zone")}
                onDragOver={(e) => e.preventDefault()}
                className={`text-4xl transition-all animate-[fadeInDown_0.5s_ease]`}
              >
                🍃🍃
                {phase === "label" && !labeled.leaves && (
                  <div className="text-[10px] font-bold text-emerald-700 text-center border border-dashed border-emerald-400 rounded px-1">Drop Leaves</div>
                )}
                {labeled.leaves && <div className="text-[10px] font-black text-emerald-600 text-center">✓ Leaves</div>}
              </div>
            )}

            {/* Stem — stage 2 */}
            {growthStage >= 2 && (
              <div
                onDrop={(e) => handleLabelDrop(e, "stem_zone")}
                onDragOver={(e) => e.preventDefault()}
                className="flex flex-col items-center animate-[fadeInUp_0.5s_ease]"
              >
                <div className="w-3 bg-emerald-600 rounded-t-full" style={{ height: growthStage >= 3 ? 80 : 40 }} />
                {phase === "label" && !labeled.stem && (
                  <div className="text-[10px] font-bold text-emerald-700 border border-dashed border-emerald-400 rounded px-1 -mt-1">Drop Stem</div>
                )}
                {labeled.stem && <div className="text-[10px] font-black text-emerald-600 -mt-1">✓ Stem</div>}
              </div>
            )}

            {/* Seedling sprout — stage 1 */}
            {growthStage === 1 && (
              <div className="text-3xl animate-[fadeInUp_0.5s_ease]">🌱</div>
            )}
          </div>

          {/* Pot */}
          <div className="relative">
            <div className="w-32 h-24 bg-amber-700 rounded-b-[2rem] rounded-t-lg border-t-4 border-amber-600 flex items-end justify-center pb-2 shadow-lg">
              {added.soil && <span className="text-2xl">🪱</span>}
              {added.seed && <span className="text-xl">🌰</span>}
            </div>
            {added.water && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-2xl animate-bounce">💧</div>
            )}

            {/* Roots drop zone — below pot */}
            {growthStage >= 2 && (
              <div
                onDrop={(e) => handleLabelDrop(e, "roots_zone")}
                onDragOver={(e) => e.preventDefault()}
                className="text-center mt-2"
              >
                <div className="text-2xl">🌱</div>
                {phase === "label" && !labeled.roots && (
                  <div className="text-[10px] font-bold text-amber-800 border border-dashed border-amber-500 rounded px-1">Drop Roots</div>
                )}
                {labeled.roots && <div className="text-[10px] font-black text-emerald-600">✓ Roots</div>}
              </div>
            )}
          </div>
        </div>

        {phase === "growing" && (
          <p className="text-emerald-700 font-bold text-center text-sm z-10">🌱 Growing...</p>
        )}
        {phase === "setup" && Object.keys(added).length === 0 && (
          <p className="text-slate-500 font-medium text-sm z-10">Click items from the shelf to add them to the pot!</p>
        )}
      </div>
    </div>
  );
}
