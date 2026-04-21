"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle, Wrench } from "lucide-react";

const CHALLENGES = [
  {
    id: "rock",
    label: "Lift the Boulder",
    emoji: "🪨",
    weightKg: 100,
    effortNeeded: 30, // effort ≤ this = success
    desc: "Move the fulcrum closer to the load to gain mechanical advantage!",
    successMsg: "You lifted it! By moving the fulcrum close to the rock, your side of the lever had a much longer arm — requiring far less force. This is mechanical advantage!",
  },
  {
    id: "safe",
    label: "Lift the Safe",
    emoji: "🗄️",
    weightKg: 250,
    effortNeeded: 50,
    desc: "This safe is very heavy! Position the fulcrum close to the load to maximize your mechanical advantage.",
    successMsg: "Incredible! Even a 250kg safe can be lifted with the right fulcrum position. Archimedes said: 'Give me a lever long enough and a place to stand, and I shall move the Earth!'",
  },
  {
    id: "car",
    label: "Lift the Car",
    emoji: "🚗",
    weightKg: 1500,
    effortNeeded: 80,
    desc: "A car might seem impossible — but with the right lever ratio, anything is possible!",
    successMsg: "You lifted a car! This is the same principle used in car jacks. God embedded simple machines into creation for us to discover and use!",
  },
];

export default function SimpleMachines({ speak, onComplete }) {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [fulcrumPos, setFulcrumPos] = useState(50); // 0=far left, 100=far right (closer to load on right)
  const [effort, setEffort] = useState(100);
  const [lifted, setLifted] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const challenge = CHALLENGES[challengeIdx];

  // Mechanical advantage: fulcrum closer to load (right) = less effort
  // Load arm = 100 - fulcrumPos; Effort arm = fulcrumPos
  // MA = effortArm / loadArm = fulcrumPos / (100 - fulcrumPos)
  // Required effort = weight / MA (capped at 100)
  const calcEffort = useCallback((pos) => {
    const loadArm = 100 - pos;
    const effortArm = pos;
    if (loadArm <= 0) return 0;
    const ma = effortArm / loadArm;
    return Math.min(100, Math.round(challenge.weightKg / ma / 10));
  }, [challenge.weightKg]);

  useEffect(() => {
    setEffort(calcEffort(fulcrumPos));
  }, [fulcrumPos, calcEffort]);

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak("Welcome to the Simple Machines lab! A lever is one of the six simple machines God's laws of physics make possible. By moving the fulcrum — the pivot point — you change how much force you need to lift a heavy object. Try it!");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  useEffect(() => {
    setFulcrumPos(50);
    setLifted(false);
    setShowSuccess(false);
  }, [challengeIdx]);

  const handleLift = () => {
    if (effort <= challenge.effortNeeded) {
      setLifted(true);
      setShowSuccess(true);
      speak(challenge.successMsg);
    } else {
      speak(`You need ${effort}% effort — that's too much strain! Move the fulcrum closer to the ${challenge.emoji} to reduce the effort needed.`);
    }
  };

  const handleNext = () => {
    const next = [...completed, challenge.id];
    setCompleted(next);
    if (challengeIdx + 1 >= CHALLENGES.length) {
      onComplete();
    } else {
      setChallengeIdx(i => i + 1);
      const nextC = CHALLENGES[challengeIdx + 1];
      speak(`Next challenge: ${nextC.label}. ${nextC.desc}`);
    }
  };

  const leverTilt = (fulcrumPos - 50) * 0.4; // degrees of tilt based on fulcrum position

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-stone-900 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-amber-400">
          <Wrench className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase">Simple Machines</h3>
        </div>
        <p className="text-stone-300 text-sm mb-6 leading-relaxed">
          A lever has three parts: the <strong className="text-white">Load</strong>, the <strong className="text-white">Fulcrum</strong> (pivot), and the <strong className="text-white">Effort</strong>. Moving the fulcrum changes the mechanical advantage!
        </p>

        {/* Challenge list */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs uppercase font-black text-stone-400 tracking-wider mb-2 border-b border-stone-700 pb-2">Challenges</h4>
          {CHALLENGES.map((ch, i) => {
            const isDone = completed.includes(ch.id);
            const isCurrent = i === challengeIdx;
            return (
              <div key={ch.id} className={`flex items-center gap-3 text-sm font-semibold py-1.5 px-2 rounded-lg transition-colors ${isCurrent ? "bg-stone-800 text-white" : isDone ? "text-emerald-400" : "text-stone-500"}`}>
                {isDone ? <CheckCircle className="w-4 h-4 shrink-0" /> : <span className="text-lg">{ch.emoji}</span>}
                {ch.label}
              </div>
            );
          })}
        </div>

        {/* MA Info panel */}
        <div className="bg-stone-800 border border-stone-700 rounded-xl p-4 mt-auto">
          <p className="text-xs font-black text-amber-400 uppercase tracking-wider mb-2">Mechanical Advantage</p>
          <div className="space-y-1 text-xs text-stone-300 font-mono">
            <div className="flex justify-between"><span>Load:</span><span className="text-white font-black">{challenge.weightKg} kg</span></div>
            <div className="flex justify-between"><span>Effort Arm:</span><span className="text-white font-black">{fulcrumPos}%</span></div>
            <div className="flex justify-between"><span>Load Arm:</span><span className="text-white font-black">{100 - fulcrumPos}%</span></div>
            <div className="flex justify-between border-t border-stone-600 mt-1 pt-1"><span>Required Effort:</span>
              <span className={`font-black ${effort <= challenge.effortNeeded ? "text-emerald-400" : "text-rose-400"}`}>{effort}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lever Canvas */}
      <div className="flex-1 bg-stone-100 flex flex-col items-center justify-center p-8 gap-6 relative overflow-hidden">
        <h3 className="font-bold text-slate-700 text-lg">{challenge.emoji} {challenge.label}</h3>

        {/* Lever visual */}
        <div className="relative w-full max-w-md" style={{ height: 200 }}>
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-stone-300 rounded-lg" />

          {/* Fulcrum triangle */}
          <div
            className="absolute bottom-4 transition-all duration-300"
            style={{ left: `calc(${fulcrumPos}% - 16px)` }}
          >
            <svg width="32" height="40" viewBox="0 0 32 40">
              <polygon points="16,0 32,40 0,40" fill="#78716c" />
            </svg>
          </div>

          {/* The lever beam */}
          <div
            className="absolute bg-amber-800 rounded-full shadow-lg"
            style={{
              height: 14,
              width: "100%",
              bottom: 44,
              left: 0,
              transform: `rotate(${-leverTilt}deg)`,
              transformOrigin: `${fulcrumPos}% center`,
              transition: "transform 0.3s ease",
            }}
          />

          {/* Load object (right side) */}
          <div
            className="absolute text-4xl transition-all duration-500"
            style={{
              right: 8,
              bottom: lifted ? 80 : 52,
              transform: `rotate(${leverTilt}deg)`,
              transformOrigin: "bottom center",
            }}
          >
            {challenge.emoji}
          </div>

          {/* Person (left side) */}
          <div
            className="absolute text-3xl transition-all duration-300"
            style={{
              left: 8,
              bottom: lifted ? 52 : 60 - leverTilt,
            }}
          >
            🏋️
          </div>
        </div>

        {/* Fulcrum slider */}
        <div className="w-full max-w-md">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
            <span>← Fulcrum Left (Less Advantage)</span>
            <span>(More Advantage) Fulcrum Right →</span>
          </div>
          <input
            type="range" min="10" max="90" value={fulcrumPos}
            onChange={e => { setFulcrumPos(Number(e.target.value)); setLifted(false); setShowSuccess(false); }}
            className="w-full accent-amber-600"
            disabled={showSuccess}
          />
        </div>

        {/* Effort meter */}
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow p-4">
          <div className="flex justify-between mb-2">
            <span className="font-bold text-slate-700 text-sm">Required Effort</span>
            <span className={`font-black text-lg ${effort <= challenge.effortNeeded ? "text-emerald-600" : "text-rose-500"}`}>{effort}%</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-300 ${effort <= challenge.effortNeeded ? "bg-emerald-500" : "bg-rose-500"}`}
              style={{ width: `${Math.min(100, effort)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0% (Effortless)</span>
            <span>Target: ≤{challenge.effortNeeded}%</span>
            <span>100% (Maximum)</span>
          </div>
        </div>

        {showSuccess ? (
          <button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-1">
            {challengeIdx + 1 >= CHALLENGES.length ? "Finish Lab ✓" : "Next Challenge →"}
          </button>
        ) : (
          <button
            onClick={handleLift}
            className={`font-bold px-10 py-3.5 rounded-xl shadow-lg transition-all ${effort <= challenge.effortNeeded ? "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-400/30 hover:-translate-y-1" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
          >
            {effort <= challenge.effortNeeded ? "🏋️ Lift!" : `Still Too Heavy (${effort}% effort)`}
          </button>
        )}
      </div>
    </div>
  );
}
