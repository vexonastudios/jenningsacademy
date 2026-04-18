"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Trophy, Star, Clock, Gamepad2, ChevronRight, RefreshCw, Medal, Zap } from "lucide-react";

const GAME_ID = "word-runner";
const GAME_TIMER_MINUTES = 15; // Parent-configurable — default 15 min

function getRankBadge(rank) {
  if (rank === 0) return { icon: "🥇", color: "text-yellow-400 bg-yellow-900/40 border-yellow-500/50" };
  if (rank === 1) return { icon: "🥈", color: "text-slate-300 bg-slate-700/60 border-slate-500/50" };
  if (rank === 2) return { icon: "🥉", color: "text-amber-600 bg-amber-900/40 border-amber-600/50" };
  return { icon: `#${rank + 1}`, color: "text-slate-400 bg-slate-800 border-slate-700" };
}

export default function RewardModule({ profileId, profile, planId, grade, onRoundComplete }) {
  const [phase, setPhase]               = useState("intro");   // intro | playing | done
  const [timeLeft, setTimeLeft]         = useState(GAME_TIMER_MINUTES * 60);
  const [scores, setScores]             = useState([]);
  const [myBestScore, setMyBestScore]   = useState(null);
  const [lastResult, setLastResult]     = useState(null);      // most recent game-over result
  const [loadingScores, setLoadingScores] = useState(false);
  const timerRef  = useRef(null);
  const iframeRef = useRef(null);

  // ── fetch sibling leaderboard ──────────────────────────────────────────────
  const loadScores = useCallback(async () => {
    if (!profile?.parent_id) return;
    setLoadingScores(true);
    try {
      const res = await fetch(`/api/game-scores?gameId=${GAME_ID}&parentId=${profile.parent_id}`);
      const { scores: rows } = await res.json();
      setScores(rows || []);
      const mine = rows?.find(r => r.profile_id === profileId);
      if (mine) setMyBestScore(mine.score);
    } catch { /* silent */ } finally {
      setLoadingScores(false);
    }
  }, [profile?.parent_id, profileId]);

  useEffect(() => { loadScores(); }, [loadScores]);

  // ── postMessage listener from the iframe ──────────────────────────────────
  useEffect(() => {
    const handler = async (e) => {
      if (e.data?.type !== "WORD_RUNNER_SCORE") return;
      const { score, won, level, levelTime, difficulty } = e.data;
      setLastResult(e.data);

      // Save score to DB
      try {
        await fetch("/api/game-scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileId, gameId: GAME_ID, score, won, level, difficulty, levelTime }),
        });
        await loadScores();
      } catch { /* silent */ }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [profileId, loadScores]);

  // ── countdown timer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleTimerEnd();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleTimerEnd = () => {
    setPhase("done");
    if (onRoundComplete) {
      onRoundComplete({
        score: myBestScore || 0,
        totalItems: 1,
        correctItems: 1,
        metadata: { game: GAME_ID, bestScore: myBestScore }
      });
    }
  };

  const startGame = () => {
    setPhase("playing");
    setTimeLeft(GAME_TIMER_MINUTES * 60);
  };

  const finishEarly = () => {
    clearInterval(timerRef.current);
    handleTimerEnd();
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const timePercent = (timeLeft / (GAME_TIMER_MINUTES * 60)) * 100;
  const isLowTime = timeLeft <= 60;

  // ── INTRO SCREEN ──────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="flex flex-col h-full min-h-full bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center border border-emerald-500/30">
              <Gamepad2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Reward Time!</p>
              <p className="text-slate-300 font-semibold">Free Play</p>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-semibold">{GAME_TIMER_MINUTES} min session</div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 max-w-2xl mx-auto w-full">
          {/* Game card */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-emerald-500/30 rounded-3xl overflow-hidden p-8 shadow-2xl shadow-emerald-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent" />
            <div className="relative">
              <div className="text-7xl mb-4 text-center">🏃</div>
              <h2 className="text-4xl font-black text-white text-center mb-2">Word Runner</h2>
              <p className="text-slate-400 text-center text-base mb-6">
                Run, jump, and stomp enemies! Hit the correct answer blocks to open gates and race to the finish.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["Math", "Spelling", "Grammar", "Co-op"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-700/80 rounded-full text-slate-300 text-xs font-bold uppercase tracking-widest">{tag}</span>
                ))}
              </div>
              <button
                onClick={startGame}
                className="w-full py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-xl shadow-emerald-600/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                <Zap className="w-6 h-6" /> Start Playing
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-black text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" /> Family Leaderboard
              </h3>
              <button onClick={loadScores} className="text-slate-500 hover:text-slate-300">
                <RefreshCw className={`w-4 h-4 ${loadingScores ? "animate-spin" : ""}`} />
              </button>
            </div>
            {scores.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">No scores yet — be the first to play!</p>
            ) : (
              <div className="space-y-3">
                {scores.map((s, i) => {
                  const badge = getRankBadge(i);
                  const isMe = s.profile_id === profileId;
                  return (
                    <div key={s.id || i} className={`flex items-center gap-4 p-3 rounded-2xl transition-all border ${isMe ? "bg-indigo-900/30 border-indigo-500/40" : "bg-slate-800 border-slate-700/40"}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border ${badge.color}`}>
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold text-sm">{s.playerName}{isMe && <span className="ml-2 text-indigo-400 text-xs">(you)</span>}</p>
                        <p className="text-slate-500 text-xs">Lvl {s.level} · {s.difficulty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-black text-lg">{s.score?.toLocaleString()}</p>
                        <p className="text-slate-500 text-xs">{s.level_time}s</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── PLAYING SCREEN ────────────────────────────────────────────────────────
  if (phase === "playing") {
    return (
      <div className="flex flex-col h-full min-h-full bg-slate-950 relative">
        {/* Timer strip */}
        <div className="shrink-0 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest">Word Runner</span>
            </div>
            <div className={`flex items-center gap-2 font-mono font-black text-xl transition-colors ${isLowTime ? "text-rose-400 animate-pulse" : "text-white"}`}>
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
            <button onClick={finishEarly} className="text-xs text-slate-500 hover:text-slate-300 font-semibold px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all">
              Finish Early
            </button>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-slate-800">
            <div
              className={`h-full transition-all duration-1000 ${isLowTime ? "bg-rose-500" : "bg-emerald-500"}`}
              style={{ width: `${timePercent}%` }}
            />
          </div>
        </div>

        {/* Game iframe */}
        <div className="flex-1 relative">
          <iframe
            ref={iframeRef}
            src="/games/word-runner/runner.html"
            className="w-full h-full border-0"
            title="Word Runner"
            allow="autoplay"
          />

          {/* Last result toast */}
          {lastResult && (
            <div className={`absolute top-4 right-4 rounded-2xl px-5 py-3 text-white font-bold text-sm shadow-xl border z-10 transition-all
              ${lastResult.won ? "bg-emerald-900/90 border-emerald-500" : "bg-rose-900/90 border-rose-500"}`}>
              {lastResult.won ? "🎉" : "💀"} Score: <span className="font-black">{lastResult.score?.toLocaleString()}</span>
              {lastResult.won && <span className="ml-2 text-emerald-300">+{lastResult.timeBonus} bonus</span>}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── DONE SCREEN ───────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-full px-6 py-10 max-w-xl mx-auto w-full justify-center items-center">
      <div className="w-40 h-40 rounded-full flex flex-col items-center justify-center mb-6 shadow-2xl bg-emerald-900/30 border-[6px] border-emerald-500">
        <Trophy className="w-20 h-20 text-yellow-400" />
      </div>
      <h2 className="text-4xl font-black text-white text-center mb-3">Time's Up!</h2>
      <p className="text-slate-400 text-center text-lg mb-2">Great session! Your best score has been saved.</p>
      {myBestScore != null && (
        <div className="mt-4 mb-8 px-8 py-5 rounded-2xl bg-slate-800 border border-slate-700 text-center">
          <p className="text-slate-500 text-sm uppercase tracking-widest font-bold mb-1">Your Best Score</p>
          <p className="text-5xl font-black text-yellow-400">{myBestScore.toLocaleString()}</p>
        </div>
      )}
      <button onClick={() => onRoundComplete?.({ score: myBestScore || 0, totalItems: 1, correctItems: 1 })}
        className="w-full py-5 rounded-2xl font-black text-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center gap-3 hover:-translate-y-1 transition-all">
        Finish Day <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
