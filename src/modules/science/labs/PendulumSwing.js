"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle, Clock } from "lucide-react";

const CHALLENGES = [
  {
    id: "short",
    label: "Short String",
    stringLength: 0.25, // meters
    bobMass: 1,
    description: "A short 25cm string with a light bob.",
    hint: "Short strings swing faster. Mass doesn't matter!",
  },
  {
    id: "medium",
    label: "Medium String",
    stringLength: 1.0,
    bobMass: 5,
    description: "A medium 1-meter string with a heavy 5kg bob.",
    hint: "Compare the period to the light bob — same length behaves the same!",
  },
  {
    id: "long",
    label: "Long String",
    stringLength: 4.0,
    bobMass: 1,
    description: "A long 4-meter string with a light bob.",
    hint: "The period quadruples when you quadruple the string length!",
  },
];

// Period of pendulum: T = 2π√(L/g)
const G = 9.81;
function calcPeriod(length) {
  return 2 * Math.PI * Math.sqrt(length / G);
}

export default function PendulumSwing({ speak, onComplete }) {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [isSwinging, setIsSwinging] = useState(false);
  const [angle, setAngle] = useState(-30); // current angle in degrees
  const [elapsed, setElapsed] = useState(0); // seconds
  const [period, setPeriod] = useState(null); // measured period
  const [completed, setCompleted] = useState([]);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [observation, setObservation] = useState(null);

  const rafRef = useRef(null);
  const startRef = useRef(null);
  const lastCrossRef = useRef(null);
  const crossCount = useRef(0);

  const challenge = CHALLENGES[challengeIdx];
  const expectedPeriod = calcPeriod(challenge.stringLength);

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak("Welcome to the Pendulum lab! In 1602, Galileo discovered that a pendulum's period — the time for one full swing — depends only on its LENGTH, not on the mass of the bob or how far you pull it. Let's test this law ourselves!");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  useEffect(() => {
    stopSwing();
    setAngle(-30);
    setElapsed(0);
    setPeriod(null);
    setObservation(null);
    crossCount.current = 0;
    lastCrossRef.current = null;
    if (hasSpokenIntro) {
      speak(`Now testing: ${challenge.description} ${challenge.hint}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeIdx]);

  const stopSwing = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsSwinging(false);
  };

  const startSwing = () => {
    startRef.current = performance.now();
    lastCrossRef.current = null;
    crossCount.current = 0;
    setIsSwinging(true);
    setElapsed(0);
    setPeriod(null);
    rafRef.current = requestAnimationFrame(tick);
  };

  const tick = useCallback((now) => {
    const t = (now - startRef.current) / 1000;
    setElapsed(parseFloat(t.toFixed(2)));

    // θ(t) = θ₀ × cos(2π/T × t)
    const ang = 30 * Math.cos((2 * Math.PI / expectedPeriod) * t);
    setAngle(ang);

    // Detect zero crossing (midpoint of swing) to measure period
    const prevSign = lastCrossRef.current;
    const curSign = ang >= 0 ? 1 : -1;
    if (prevSign !== null && prevSign !== curSign) {
      crossCount.current++;
      if (crossCount.current === 2) {
        // One full period measured
        const measured = parseFloat((t).toFixed(2));
        setPeriod(measured);
      }
    }
    lastCrossRef.current = curSign;

    // Auto-stop after 3 full periods
    if (t > expectedPeriod * 3) {
      setIsSwinging(false);
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [expectedPeriod]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const handleNext = () => {
    const obs = {
      length: challenge.stringLength,
      mass: challenge.bobMass,
      period: period ?? parseFloat(expectedPeriod.toFixed(2)),
    };
    setObservation(obs);
    speak(`String length: ${challenge.stringLength}m, Bob mass: ${challenge.bobMass}kg, Period measured: ${obs.period} seconds. Expected: ${expectedPeriod.toFixed(2)} seconds. Notice the mass made no difference!`);

    const next = [...completed, challenge.id];
    setCompleted(next);
    if (challengeIdx + 1 >= CHALLENGES.length) {
      setTimeout(() => {
        speak("Outstanding! You have proven Galileo's pendulum law experimentally. Only the string length affects the period. This consistent law allowed clockmakers to build accurate pendulum clocks — and it all flows from God's orderly physics!");
        setTimeout(onComplete, 3000);
      }, 1500);
    } else {
      setTimeout(() => setChallengeIdx(i => i + 1), 2000);
    }
  };

  // Pendulum string length pixels (normalized)
  const pxLength = Math.min(220, 50 + challenge.stringLength * 60);
  const bobSize = Math.min(40, 16 + challenge.bobMass * 2);

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-slate-900 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-cyan-400">
          <Clock className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase text-sm">Pendulum Lab</h3>
        </div>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          Does a heavier bob swing faster? Does pulling it back further change the speed? Test Galileo's discovery and find out!
        </p>

        {/* Challenge list */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs uppercase font-black text-slate-500 tracking-wider mb-2 border-b border-slate-700 pb-2">
            Tests ({completed.length}/{CHALLENGES.length})
          </h4>
          {CHALLENGES.map((ch, i) => {
            const done = completed.includes(ch.id);
            const cur = i === challengeIdx;
            return (
              <div key={ch.id} className={`flex items-center gap-2 text-sm font-semibold py-1 ${cur ? "text-white" : done ? "text-emerald-400" : "text-slate-600"}`}>
                {done ? <CheckCircle className="w-4 h-4 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-current shrink-0" />}
                {ch.label}
              </div>
            );
          })}
        </div>

        {/* Live stats */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mt-auto">
          <p className="text-xs font-black text-cyan-400 uppercase tracking-wider mb-3">Current Config</p>
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <div className="flex justify-between"><span>String Length:</span><span className="text-white font-black">{challenge.stringLength}m</span></div>
            <div className="flex justify-between"><span>Bob Mass:</span><span className="text-white font-black">{challenge.bobMass} kg</span></div>
            <div className="flex justify-between border-t border-slate-600 mt-1 pt-1"><span>Expected T:</span><span className="text-cyan-400 font-black">{expectedPeriod.toFixed(2)}s</span></div>
            {period && <div className="flex justify-between"><span>Measured T:</span><span className="text-emerald-400 font-black">{period}s</span></div>}
            {elapsed > 0 && <div className="flex justify-between"><span>Elapsed:</span><span className="text-white font-black">{elapsed}s</span></div>}
          </div>
        </div>
      </div>

      {/* Pendulum canvas */}
      <div className="flex-1 bg-gradient-to-b from-slate-100 to-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <h3 className="font-bold text-slate-700 text-lg mb-2">{challenge.label}</h3>
        <p className="text-slate-400 text-sm mb-6">{challenge.description}</p>

        {/* Ceiling mount */}
        <div className="relative flex flex-col items-center" style={{ height: pxLength + bobSize + 40 }}>
          <div className="w-16 h-4 bg-slate-700 rounded-lg shadow-md" /> {/* Mount */}

          {/* String and bob */}
          <div
            className="absolute top-4 left-1/2"
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "top center",
              width: 0,
              transition: isSwinging ? "none" : "transform 0.3s ease",
            }}
          >
            {/* String */}
            <div
              style={{ width: 2, height: pxLength, background: "#94a3b8", marginLeft: -1 }}
            />
            {/* Bob */}
            <div
              style={{
                width: bobSize, height: bobSize,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #38bdf8, #0284c7)",
                marginLeft: -(bobSize / 2) + 1,
                boxShadow: "0 4px 20px rgba(56,189,248,0.5)",
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mt-8">
          {!isSwinging ? (
            <button
              onClick={startSwing}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-cyan-500/30 transition-transform hover:-translate-y-1 active:scale-95"
            >
              ▶ Release Pendulum
            </button>
          ) : (
            <button onClick={stopSwing} className="bg-rose-500 hover:bg-rose-400 text-white font-bold px-8 py-3 rounded-xl shadow-md active:scale-95">
              ■ Stop
            </button>
          )}

          {!isSwinging && elapsed > 0 && (
            <button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-1"
            >
              {challengeIdx + 1 >= CHALLENGES.length ? "Finish Lab ✓" : "Record & Next →"}
            </button>
          )}
        </div>

        {period && (
          <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-3 text-center">
            <p className="text-emerald-700 font-black text-sm">Period measured: <span className="text-lg">{period}s</span>  ≈ expected {expectedPeriod.toFixed(2)}s ✓</p>
          </div>
        )}
      </div>
    </div>
  );
}
