"use client";

import { useState } from "react";
import { Lock, ShieldCheck, Delete } from "lucide-react";

/**
 * LockOverlay — shown when:
 * a) The child alt-tabs away or ESC is pressed
 * b) Fullscreen exits for any reason
 *
 * Two modes:
 * - "return"  → "Tap to Return" re-enters fullscreen (user gesture = allowed)
 * - "unlock"  → parent PIN pad for exiting lock mode entirely
 */
export default function LockOverlay({ childName, onReturn, onParentUnlock, unlockError }) {
  const [mode, setMode] = useState("return");
  const [pin, setPin] = useState("");
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"];

  const handleDigit = (d) => {
    if (d === "del") { setPin(p => p.slice(0, -1)); return; }
    if (pin.length >= 4) return;
    const next = pin + String(d);
    setPin(next);
    if (next.length === 4) {
      onParentUnlock(next);
      setPin("");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/98 text-white select-none">

      {mode === "return" ? (
        /* ── Return to Work View ── */
        <div className="text-center px-8 max-w-md">
          <div className="w-24 h-24 bg-indigo-600/20 border-2 border-indigo-400/40 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Lock className="w-12 h-12 text-indigo-300" />
          </div>
          <h1 className="text-4xl font-black mb-3">Focus Mode is On</h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            {childName}, let&apos;s get back to your work!<br />You&apos;re almost done for today. 💪
          </p>

          {/* This button is the user gesture that allows requestFullscreen() */}
          <button
            onClick={onReturn}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xl py-5 rounded-2xl shadow-2xl shadow-indigo-500/30 transition-all active:scale-95"
          >
            Tap to Return to Work
          </button>

          <button
            onClick={() => setMode("unlock")}
            className="mt-8 text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors"
          >
            Parent Exit →
          </button>
        </div>
      ) : (
        /* ── Parent PIN Exit View ── */
        <div className="text-center px-8 w-full max-w-sm">
          <button
            onClick={() => { setMode("return"); setPin(""); }}
            className="mb-8 text-slate-400 hover:text-white text-sm flex items-center gap-2 mx-auto transition-colors"
          >
            ← Back
          </button>
          <div className="w-16 h-16 bg-emerald-600/20 border-2 border-emerald-400/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-black mb-2">Parent Override</h2>
          <p className="text-slate-400 text-sm mb-8">Enter the parent exit PIN to unlock</p>

          {/* PIN dots */}
          <div className="flex justify-center gap-4 mb-6">
            {[0,1,2,3].map(i => (
              <div key={i} className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all
                ${pin.length > i ? "border-emerald-400 bg-emerald-900/30" : "border-slate-700 bg-slate-800"}`}
              >
                {pin.length > i && <div className="w-3 h-3 rounded-full bg-emerald-400" />}
              </div>
            ))}
          </div>

          {unlockError && (
            <p className="text-rose-400 text-sm font-bold mb-4 animate-pulse">{unlockError}</p>
          )}

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-3">
            {digits.map((d, idx) => (
              d === null ? <div key={idx} /> :
              <button
                key={idx}
                onClick={() => handleDigit(d)}
                className={`h-14 rounded-2xl text-lg font-bold transition-all active:scale-95 select-none
                  ${d === "del"
                    ? "bg-slate-800 text-slate-400 hover:bg-slate-700 flex items-center justify-center"
                    : "bg-slate-800 hover:bg-slate-700 text-white"}`}
              >
                {d === "del" ? <Delete className="w-5 h-5 mx-auto" /> : d}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
