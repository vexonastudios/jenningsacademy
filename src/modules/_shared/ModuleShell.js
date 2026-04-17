"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Clock, Trophy, RotateCcw, CheckCircle } from "lucide-react";

/**
 * ModuleShell
 * -----------
 * A consistent fullscreen wrapper around every learning module.
 * Handles: the header bar (title + timer + exit), result screens (pass/fail/retry),
 * and the slot where the actual module content renders.
 *
 * Props:
 *   moduleType        {string}   - e.g. "Spelling"
 *   minimumPassScore  {number|null} - % to pass; null means always pass
 *   timeLimitSeconds  {number|null} - countdown limit; null means untimed
 *   onComplete        {(results) => void} - called with final results on pass
 *   onExit            {() => void} - called when student closes without finishing
 *   children          {(helpers) => ReactNode} - render-prop pattern:
 *                       children receives { onRoundComplete } to call when the
 *                       module logic decides a round is finished
 */
export default function ModuleShell({
  moduleType,
  minimumPassScore,
  timeLimitSeconds,
  onComplete,
  onExit,
  children,
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [phase, setPhase] = useState("playing"); // "playing" | "passed" | "failed"
  const [lastResults, setLastResults] = useState(null);
  const [attempt, setAttempt] = useState(1);
  const intervalRef = useRef(null);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "playing") return;
    intervalRef.current = setInterval(() => {
      setElapsedSeconds((s) => {
        const next = s + 1;
        // Time-limit enforcement
        if (timeLimitSeconds && next >= timeLimitSeconds) {
          clearInterval(intervalRef.current);
          // Force submit — the module may not have explicitly finished
          setPhase("failed");
          return next;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase, timeLimitSeconds]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const timeRemaining = timeLimitSeconds
    ? Math.max(0, timeLimitSeconds - elapsedSeconds)
    : null;

  // ── Round completion callback (given to child module via render prop) ──────
  const onRoundComplete = useCallback(
    (results) => {
      clearInterval(intervalRef.current);
      const finalResults = {
        ...results,
        timeSpentSeconds: elapsedSeconds,
        attempt,
      };

      // If no minimumPassScore, the module manages its own UX (e.g. Spelling).
      // Just fire onComplete immediately — no ModuleShell result screens.
      if (minimumPassScore === null) {
        onComplete(finalResults);
        return;
      }

      setLastResults(finalResults);
      const passed = (results.score ?? 0) >= minimumPassScore;
      setPhase(passed ? "passed" : "failed");
      if (passed) onComplete(finalResults);
    },
    [elapsedSeconds, attempt, minimumPassScore, onComplete]
  );

  // ── Retry ──────────────────────────────────────────────────────────────────
  const handleRetry = () => {
    setElapsedSeconds(0);
    setPhase("playing");
    setLastResults(null);
    setAttempt((a) => a + 1);
    // `attempt` incrementing causes the child to regenerate a new question set
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col text-white font-[family-name:var(--font-geist-sans)]">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <h1 className="text-lg font-black tracking-tight">{moduleType}</h1>
          {attempt > 1 && (
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
              Attempt #{attempt}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <div
            className={`flex items-center gap-1.5 font-mono text-sm font-bold px-3 py-1.5 rounded-xl border ${
              timeRemaining !== null && timeRemaining < 30
                ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                : "bg-slate-800 border-slate-700 text-slate-300"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {timeRemaining !== null
              ? formatTime(timeRemaining)
              : formatTime(elapsedSeconds)}
          </div>

          {/* Exit */}
          <button
            onClick={onExit}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-all"
            aria-label="Exit module"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ── Content Area ── */}
      <main className="flex-1 overflow-y-auto">
        {phase === "playing" && children({ onRoundComplete, attempt })}

        {phase === "passed" && (
          <ResultScreen
            passed
            score={lastResults?.score}
            minimumPassScore={minimumPassScore}
            moduleType={moduleType}
            timeSpent={lastResults?.timeSpentSeconds}
          />
        )}

        {phase === "failed" && (
          <ResultScreen
            passed={false}
            score={lastResults?.score}
            minimumPassScore={minimumPassScore}
            moduleType={moduleType}
            timeSpent={lastResults?.timeSpentSeconds}
            onRetry={handleRetry}
            onExit={onExit}
          />
        )}
      </main>
    </div>
  );
}

// ── Result Screen ────────────────────────────────────────────────────────────
function ResultScreen({ passed, score, minimumPassScore, moduleType, timeSpent, onRetry, onExit }) {
  const formatTime = (secs) => {
    if (!secs) return "—";
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-16 px-6 text-center">
      {passed ? (
        <>
          <div className="w-28 h-28 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(52,211,153,0.4)]">
            <CheckCircle className="w-14 h-14 text-emerald-400" />
          </div>
          <h2 className="text-5xl font-black text-white mb-3">Awesome Job! 🎉</h2>
          <p className="text-slate-400 text-xl mb-8">You passed {moduleType}!</p>
          {score !== undefined && (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl px-10 py-6 flex gap-10 mb-8">
              <Stat label="Score" value={`${score}%`} color="text-emerald-400" />
              <Stat label="Time" value={formatTime(timeSpent)} color="text-indigo-400" />
            </div>
          )}
          <p className="text-slate-500 text-sm">Returning to your path…</p>
        </>
      ) : (
        <>
          <div className="w-28 h-28 rounded-full bg-rose-500/20 border-4 border-rose-400 flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(251,113,133,0.4)]">
            <RotateCcw className="w-14 h-14 text-rose-400" />
          </div>
          <h2 className="text-5xl font-black text-white mb-3">Almost! Try Again</h2>
          <p className="text-slate-400 text-lg mb-2">
            You scored <strong className="text-rose-300">{score ?? 0}%</strong>
          </p>
          <p className="text-slate-500 text-sm mb-8">
            You need at least <strong>{minimumPassScore}%</strong> to pass. You'll get new questions!
          </p>
          <div className="flex gap-4">
            <button
              onClick={onRetry}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Try Again
            </button>
            <button
              onClick={onExit}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-8 py-4 rounded-2xl text-lg border border-slate-700 transition-all"
            >
              Exit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={`text-3xl font-black ${color}`}>{value}</span>
      <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{label}</span>
    </div>
  );
}
