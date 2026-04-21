"use client";

import { useState, useEffect, useMemo } from "react";
import { CheckCircle, Telescope } from "lucide-react";

// Constellations defined as relative % positions within the view canvas
const CONSTELLATIONS = [
  {
    id: "ursa_major",
    name: "Ursa Major",
    aka: "The Great Bear / Big Dipper",
    fact: "The two stars at the far end of the Big Dipper's 'cup' point directly to Polaris, the North Star. Sailors trusted this God-given compass for centuries!",
    stars: [
      { id: "s1", x: 20, y: 30 }, { id: "s2", x: 30, y: 25 },
      { id: "s3", x: 42, y: 22 }, { id: "s4", x: 54, y: 24 },
      { id: "s5", x: 60, y: 35 }, { id: "s6", x: 52, y: 44 },
      { id: "s7", x: 35, y: 42 },
    ],
    lines: [["s1","s2"],["s2","s3"],["s3","s4"],["s4","s5"],["s5","s6"],["s6","s7"],["s7","s3"]],
  },
  {
    id: "orion",
    name: "Orion",
    aka: "The Hunter",
    fact: "Orion's three belt stars are perfectly aligned and visible from every continent on Earth. The Bible itself mentions Orion in Job 9:9: 'He made the Bear, Orion, and the Pleiades!'",
    stars: [
      { id: "s1", x: 35, y: 15 }, { id: "s2", x: 55, y: 18 },
      { id: "s3", x: 60, y: 35 }, { id: "s4", x: 55, y: 52 },
      { id: "s5", x: 35, y: 55 }, { id: "s6", x: 28, y: 35 },
      { id: "s7", x: 40, y: 38 }, { id: "s8", x: 50, y: 38 }, { id: "s9", x: 60, y: 38 }, // belt
    ],
    lines: [["s1","s2"],["s2","s3"],["s3","s4"],["s4","s5"],["s5","s6"],["s6","s1"],["s7","s8"],["s8","s9"]],
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    aka: "The Queen",
    fact: "Cassiopeia is shaped like a giant W or M in the sky. It is a circumpolar constellation — meaning it never sets below the horizon in the northern hemisphere!",
    stars: [
      { id: "s1", x: 15, y: 55 }, { id: "s2", x: 28, y: 35 },
      { id: "s3", x: 45, y: 48 }, { id: "s4", x: 60, y: 30 },
      { id: "s5", x: 78, y: 50 },
    ],
    lines: [["s1","s2"],["s2","s3"],["s3","s4"],["s4","s5"]],
  },
];

export default function AstronomyMap({ speak, onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [clickedStars, setClickedStars] = useState({}); // { starId: true }
  const [drawnLines, setDrawnLines] = useState([]); // line indices completed
  const [completed, setCompleted] = useState([]); // constellation ids done
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  // Memoize background star field so positions don't re-randomize on every state update
  const bgStars = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      size: Math.random() > 0.8 ? 2 : 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.2,
    })),
  []);

  const constellation = CONSTELLATIONS[currentIdx];
  const allDone = completed.length === CONSTELLATIONS.length;

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak("Welcome to the Astronomy Map! The heavens declare the glory of God. Click each star in the constellation to connect them and identify the pattern. Begin with Ursa Major, also known as the Big Dipper!");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  // When constellation changes, reset state and announce
  useEffect(() => {
    if (hasSpokenIntro && constellation) {
      speak(`Now find the constellation: ${constellation.name}. ${constellation.aka}. Click all ${constellation.stars.length} stars to draw the pattern!`);
    }
    setClickedStars({});
    setDrawnLines([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  const handleStarClick = (starId) => {
    if (clickedStars[starId]) return;
    const newClicked = { ...clickedStars, [starId]: true };
    setClickedStars(newClicked);

    // Check which lines are now fully connected
    const newLines = constellation.lines.filter(([a, b]) => newClicked[a] && newClicked[b]);
    setDrawnLines(newLines);

    const allStarsFound = constellation.stars.every((s) => newClicked[s.id]);
    if (allStarsFound) {
      const next = [...completed, constellation.id];
      setCompleted(next);
      if (next.length === CONSTELLATIONS.length) {
        speak(`Outstanding! You identified all three constellations. ${constellation.fact} The orderly heavens are a testament to God's magnificent design!`);
      } else {
        speak(`You completed ${constellation.name}! ${constellation.fact}`);
      }
    }
  };

  const handleNext = () => {
    if (currentIdx < CONSTELLATIONS.length - 1) {
      setCurrentIdx((i) => i + 1);
    }
  };

  if (allDone) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="text-6xl mb-6">🌌✨</div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Star Navigator!</h2>
        <p className="text-slate-500 mb-6 max-w-md leading-relaxed">
          You identified all three constellations!  <span className="font-semibold italic text-slate-700">"The heavens declare the glory of God; and the firmament shows His handiwork." — Psalm 19:1</span>
        </p>
        <button
          onClick={onComplete}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 transition-transform hover:-translate-y-1"
        >
          Finish Lab
        </button>
      </div>
    );
  }

  const isConstellationComplete = completed.includes(constellation.id);

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-indigo-950 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-indigo-400">
          <Telescope className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase">Astronomy Map</h3>
        </div>
        <p className="text-indigo-200/80 text-sm mb-6 leading-relaxed">
          Click each glowing star to connect the constellation and reveal its pattern in the night sky.
        </p>

        {/* Progress */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs uppercase font-black text-indigo-400 tracking-wider mb-2 border-b border-indigo-800 pb-2">
            Progress ({completed.length}/{CONSTELLATIONS.length})
          </h4>
          {CONSTELLATIONS.map((con, i) => {
            const isDone = completed.includes(con.id);
            const isCurrent = i === currentIdx;
            return (
              <div key={con.id} className={`flex items-center gap-3 py-2 px-3 rounded-xl font-semibold text-sm transition-colors ${isCurrent ? "bg-indigo-800 text-white" : isDone ? "text-emerald-400" : "text-indigo-400/60"}`}>
                {isDone ? <CheckCircle className="w-4 h-4 shrink-0" /> : <span className="w-4 h-4 rounded-full border-2 border-current shrink-0 inline-block" />}
                {con.name}
              </div>
            );
          })}
        </div>

        {/* Fact box */}
        {isConstellationComplete && (
          <div className="bg-indigo-900/60 border border-indigo-700/50 rounded-xl p-4">
            <p className="text-xs font-black text-indigo-300 uppercase tracking-wider mb-1">Fun Fact</p>
            <p className="text-xs text-indigo-100 leading-relaxed">{constellation.fact}</p>
          </div>
        )}

        {isConstellationComplete && currentIdx < CONSTELLATIONS.length - 1 && (
          <button
            onClick={handleNext}
            className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
          >
            Next Constellation →
          </button>
        )}
      </div>

      {/* Star Field */}
      <div className="flex-1 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden flex items-center justify-center p-6">
        {/* Background stars (decorative) — memoized so they don't re-randomize on click */}
        {bgStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: star.size,
              height: star.size,
              top: star.top,
              left: star.left,
              opacity: star.opacity,
            }}
          />
        ))}

        {/* Constellation label */}
        <div className="absolute top-6 left-6 right-6 text-center z-10">
          <h3 className="text-white font-extrabold text-xl tracking-tight">{constellation.name}</h3>
          <p className="text-indigo-300 text-sm">{constellation.aka}</p>
          <p className="text-indigo-400/60 text-xs mt-1">
            {Object.keys(clickedStars).length}/{constellation.stars.length} stars found
          </p>
        </div>

        {/* SVG star map */}
        <div className="relative w-full max-w-lg aspect-square">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Draw completed lines */}
            {drawnLines.map(([a, b], i) => {
              const sa = constellation.stars.find((s) => s.id === a);
              const sb = constellation.stars.find((s) => s.id === b);
              return (
                <line
                  key={i}
                  x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
                  stroke="rgba(165,180,252,0.6)" strokeWidth="0.6"
                  className="animate-[fadeIn_0.4s_ease]"
                />
              );
            })}
          </svg>

          {/* Stars */}
          {constellation.stars.map((star) => {
            const clicked = clickedStars[star.id];
            return (
              <button
                key={star.id}
                onClick={() => handleStarClick(star.id)}
                className="absolute group"
                style={{
                  top: `${star.y}%`,
                  left: `${star.x}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className={`w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center
                  ${clicked
                    ? "bg-yellow-300 shadow-[0_0_16px_6px_rgba(253,224,71,0.5)] scale-125"
                    : "bg-white/30 border border-white/40 group-hover:bg-yellow-200/60 group-hover:scale-150 group-hover:shadow-[0_0_8px_rgba(253,224,71,0.4)]"
                  }`}
                >
                  {clicked && <div className="w-2 h-2 rounded-full bg-yellow-100" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
