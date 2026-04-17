"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Settings, ArrowLeft, Volume2, Star } from "lucide-react";

// ─── Animal + Food Themes ─────────────────────────────────────────────────────
const THEMES = [
  { id: "bunny",    animal: "Bunny",    emoji: "🐰", food: "carrot", plural: "carrots", foodEmoji: "🥕", bg: "#FFF5F7", accent: "#F43F5E", soft: "#FECDD3" },
  { id: "monkey",  animal: "Monkey",   emoji: "🐵", food: "banana", plural: "bananas", foodEmoji: "🍌", bg: "#FFFBEB", accent: "#D97706", soft: "#FDE68A" },
  { id: "dog",     animal: "Dog",      emoji: "🐶", food: "bone",   plural: "bones",   foodEmoji: "🦴", bg: "#EFF6FF", accent: "#2563EB", soft: "#BFDBFE" },
  { id: "squirrel",animal: "Squirrel", emoji: "🐿️",  food: "acorn",  plural: "acorns",  foodEmoji: "🌰", bg: "#FFF7ED", accent: "#EA580C", soft: "#FED7AA" },
  { id: "bird",    animal: "Bird",     emoji: "🐦", food: "worm",   plural: "worms",   foodEmoji: "🪱", bg: "#F0FDF4", accent: "#16A34A", soft: "#BBF7D0" },
];

// ─── LocalStorage helpers ─────────────────────────────────────────────────────
const ls = {
  load: (key, def) => {
    if (typeof window === "undefined") return def;
    try { return { ...def, ...JSON.parse(localStorage.getItem(key) || "{}") }; }
    catch { return def; }
  },
  save: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
};

const DEF_SETTINGS = { maxNumber: 5, countSpeed: 1000, showEquation: true, mixThemes: true };
const DEF_PROGRESS = { roundsCompleted: 0, mastered: [], streak: 0 };

// ─── Round generator ──────────────────────────────────────────────────────────
function makeRound(maxNum, themeIdx) {
  const pool = [];
  for (let a = 1; a < maxNum; a++) {
    for (let b = 1; b <= Math.min(3, maxNum - a); b++) pool.push([a, b]);
  }
  if (!pool.length) return { a: 1, b: 1, theme: THEMES[0] };
  const [a, b] = pool[Math.floor(Math.random() * pool.length)];
  return { a, b, theme: THEMES[themeIdx % THEMES.length] };
}

// ─── Async TTS (resolves when audio ends) ────────────────────────────────────
function useSpeechAsync(voiceId) {
  const audioRef   = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; audioRef.current?.pause(); };
  }, []);

  const speakAsync = useCallback((text) => new Promise((resolve) => {
    if (!voiceId || !text || !mountedRef.current) { resolve(); return; }
    audioRef.current?.pause();
    const audio = new Audio(
      `/api/tts?voiceId=${encodeURIComponent(voiceId)}&text=${encodeURIComponent(text)}`
    );
    audioRef.current = audio;
    audio.onended = resolve;
    audio.onerror = resolve;
    audio.play().catch(resolve);
  }), [voiceId]);

  const stop = useCallback(() => { audioRef.current?.pause(); audioRef.current = null; }, []);
  return { speakAsync, stop };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Confetti ─────────────────────────────────────────────────────────────────
const CONF_COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6BF5", "#FFB347"];

function Confetti() {
  const pieces = useMemo(() =>
    Array.from({ length: 55 }, (_, i) => ({
      i,
      color: CONF_COLORS[i % CONF_COLORS.length],
      left:  `${Math.random() * 100}%`,
      delay: `${(Math.random() * 0.7).toFixed(2)}s`,
      dur:   `${(1.4 + Math.random() * 1.4).toFixed(2)}s`,
      size:  6 + Math.random() * 10,
      round: Math.random() > 0.5 ? "50%" : "2px",
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
      <style>{`@keyframes cfall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}`}</style>
      {pieces.map(p => (
        <div key={p.i} style={{
          position: "absolute", left: p.left, top: -20,
          width: p.size, height: p.size,
          background: p.color, borderRadius: p.round,
          animation: `cfall ${p.dur} ${p.delay} ease-in forwards`,
        }} />
      ))}
    </div>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ progress, onPlay, onSettings }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full py-10 px-6 gap-8"
      style={{ background: "linear-gradient(145deg,#FFF5F7 0%,#EEF2FF 100%)" }}>
      <div className="text-center">
        <div style={{ fontSize: 100 }} className="animate-bounce select-none">🐰</div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-800 mt-3 leading-tight">
          Feed the Animals!
        </h1>
        <p className="text-lg text-slate-500 mt-2 font-semibold">Counting &amp; Addition</p>
      </div>

      <div className="flex gap-4">
        {[
          { val: progress.roundsCompleted, label: "Rounds",  color: "#6366F1" },
          { val: `🔥${progress.streak}`,   label: "Streak",  color: "#F59E0B" },
          { val: `⭐${progress.mastered.length}`, label: "Learned", color: "#10B981" },
        ].map(({ val, label, color }) => (
          <div key={label} className="flex flex-col items-center bg-white rounded-2xl shadow-md p-4 min-w-[76px]">
            <span className="text-2xl font-black" style={{ color }}>{val}</span>
            <span className="text-[11px] font-bold text-slate-400 mt-1">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button onClick={onPlay}
          className="w-full py-5 rounded-3xl font-black text-2xl text-white transition-all hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)", boxShadow: "0 8px 28px rgba(79,70,229,.4)" }}>
          ▶ &nbsp; Play!
        </button>
        <button onClick={onSettings}
          className="w-full py-3 rounded-2xl font-bold text-slate-600 bg-white border-2 border-slate-200 hover:border-slate-300 transition-all text-sm">
          ⚙ Parent Settings
        </button>
      </div>
    </div>
  );
}

// ─── SETTINGS SCREEN ─────────────────────────────────────────────────────────
function SettingsScreen({ settings, onSave, onBack }) {
  const [s, set] = useState(settings);
  const put = (k, v) => set(prev => ({ ...prev, [k]: v }));

  return (
    <div className="flex flex-col min-h-full px-6 py-8 max-w-md mx-auto w-full">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-bold mb-6 hover:text-slate-600">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h2 className="text-2xl font-black text-slate-800 mb-6">Parent Settings</h2>

      <div className="space-y-4">
        {/* Max number */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="font-bold text-slate-700 mb-3">Highest number in equations</p>
          <div className="flex gap-3">
            {[3, 5, 10].map(n => (
              <button key={n} onClick={() => put("maxNumber", n)}
                className={`flex-1 py-3 rounded-xl font-black text-xl transition-all
                  ${s.maxNumber === n ? "bg-indigo-500 text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Count speed */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="font-bold text-slate-700 mb-3">Counting speed</p>
          <div className="flex gap-3">
            {[{ l: "Slow", v: 1500 }, { l: "Normal", v: 1000 }, { l: "Fast", v: 600 }].map(o => (
              <button key={o.v} onClick={() => put("countSpeed", o.v)}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all
                  ${s.countSpeed === o.v ? "bg-indigo-500 text-white shadow-lg" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {o.l}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        {[
          { k: "showEquation", lbl: "Show equation (2 + 1 = 3)",   icon: "🔢" },
          { k: "mixThemes",    lbl: "Rotate between all animals",   icon: "🎨" },
        ].map(({ k, lbl, icon }) => (
          <div key={k} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between gap-4">
            <p className="font-semibold text-slate-700">{icon} {lbl}</p>
            <button onClick={() => put(k, !s[k])}
              className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${s[k] ? "bg-indigo-500" : "bg-slate-300"}`}>
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${s[k] ? "left-6" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => onSave(s)}
        className="mt-8 w-full py-4 rounded-2xl font-black text-white text-lg transition-all hover:opacity-90"
        style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)", boxShadow: "0 8px 24px rgba(79,70,229,.3)" }}>
        Save ✓
      </button>
    </div>
  );
}

// ─── GAME SCREEN ─────────────────────────────────────────────────────────────
const ANIM = `
  @keyframes animalBob     { 0%,100%{transform:translateY(0)}      50%{transform:translateY(-10px)} }
  @keyframes animalExcite  { 0%,100%{transform:scale(1)rotate(0)}  50%{transform:scale(1.18)rotate(-6deg)} }
  @keyframes animalHappy   { from{transform:scale(1.1)rotate(-6deg)} to{transform:scale(1.22)rotate(6deg)} }
  @keyframes itemCount     { 0%{transform:scale(1)translateY(0)}   50%{transform:scale(1.5)translateY(-14px)} 100%{transform:scale(1.2)translateY(-6px)} }
  @keyframes numPop        { from{opacity:0;transform:translateX(-50%)scale(.3)} to{opacity:1;transform:translateX(-50%)scale(1)} }
  @keyframes flyIn         { from{opacity:0;transform:translateY(70px)scale(.5)} to{opacity:1;transform:translateY(0)scale(1)} }
  @keyframes eqPop         { from{opacity:0;transform:scale(.6)} to{opacity:1;transform:scale(1)} }
  @keyframes starSpin      { from{transform:rotate(0)scale(1)} to{transform:rotate(360deg)scale(1.3)} }
`;

function GameScreen({ round, settings, voiceId, onNext, onDone }) {
  const { a, b, theme } = round;
  const total = a + b;

  const { speakAsync, stop } = useSpeechAsync(voiceId);

  // phase: 'intro' | 'drag' | 'counting' | 'reward'
  const [phase,       setPhase]       = useState("intro");
  const [placedIds,   setPlacedIds]   = useState(new Set());
  const [countIdx,    setCountIdx]    = useState(-1);
  const [allGlow,     setAllGlow]     = useState(false);
  const [mood,        setMood]        = useState("idle");   // idle | excited | happy
  const [dragPos,     setDragPos]     = useState(null);     // { id, x, y } for ghost
  const [dropGlow,    setDropGlow]    = useState(false);

  const dragRef   = useRef(null);   // live drag state (no stale closures)
  const dropRef   = useRef(null);   // ref to drop zone element
  const cancelRef = useRef({ cancelled: false });

  // ── INTRO: speak context, then enable drag ─────────────────────────────────
  useEffect(() => {
    const tok = { cancelled: false };
    cancelRef.current = tok;

    async function intro() {
      const aWord = `${a} ${a === 1 ? theme.food : theme.plural}`;
      const bWord = `${b} more ${b === 1 ? theme.food : theme.plural}`;
      await sleep(350);
      if (tok.cancelled) return;
      await speakAsync(`The ${theme.animal} has ${aWord}.`);
      if (tok.cancelled) return;
      await sleep(250);
      await speakAsync(`Add ${bWord}.`);
      if (tok.cancelled) return;
      setPhase("drag");
    }

    intro();
    return () => { tok.cancelled = true; stop(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── COUNTING: sequential highlight + voice ─────────────────────────────────
  useEffect(() => {
    if (phase !== "counting") return;
    const tok = { cancelled: false };
    cancelRef.current = tok;

    async function count() {
      setMood("excited");
      await sleep(400);
      if (tok.cancelled) return;
      await speakAsync("Let's count together!");
      if (tok.cancelled) return;
      await sleep(200);

      for (let i = 0; i < total; i++) {
        if (tok.cancelled) return;
        setCountIdx(i);
        await speakAsync(String(i + 1));
        await sleep(settings.countSpeed * 0.3);
      }

      if (tok.cancelled) return;
      setCountIdx(-1);
      setAllGlow(true);
      await sleep(600);
      await speakAsync(`${a} plus ${b} equals ${total}.`);
      if (tok.cancelled) return;
      await sleep(300);
      setPhase("reward");
      setMood("happy");
      await speakAsync("Great job!");
    }

    count();
    return () => { tok.cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── Drag: place item on drop ───────────────────────────────────────────────
  const placeItem = useCallback((id, clientY) => {
    const dropEl = dropRef.current;
    const inZone = dropEl
      ? clientY <= dropEl.getBoundingClientRect().bottom + 80   // 80px extra forgiveness
      : clientY < window.innerHeight * 0.65;

    if (!inZone) return;

    setPlacedIds(prev => {
      if (prev.has(id)) return prev;
      const next = new Set([...prev, id]);
      setMood("excited");
      if (next.size >= b) {
        setTimeout(() => setPhase("counting"), 700);
      } else {
        setTimeout(() => setMood("idle"), 800);
      }
      return next;
    });
  }, [b]);

  const onPtrDown = useCallback((e, id) => {
    if (phase !== "drag" || placedIds.has(id)) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { id };
    setDragPos({ id, x: e.clientX, y: e.clientY });
    setDropGlow(true);
  }, [phase, placedIds]);

  const onPtrMove = useCallback((e, id) => {
    if (dragRef.current?.id !== id) return;
    setDragPos({ id, x: e.clientX, y: e.clientY });
  }, []);

  const onPtrUp = useCallback((e, id) => {
    if (dragRef.current?.id !== id) return;
    placeItem(id, e.clientY);
    dragRef.current = null;
    setDragPos(null);
    setDropGlow(false);
  }, [placeItem]);

  // ── Animal animation style ─────────────────────────────────────────────────
  const animalAnim =
    mood === "happy"   ? "animalHappy 0.55s ease infinite alternate" :
    mood === "excited" ? "animalExcite 0.4s ease 3" :
                         "animalBob 2.2s ease-in-out infinite";

  const isCounting = phase === "counting";
  const isReward   = phase === "reward";

  // ── Food item renderer ────────────────────────────────────────────────────
  function FoodItem({ index, size = 56 }) {
    const active = isCounting && countIdx === index;
    const glow   = allGlow || active;
    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <span style={{
          fontSize:   size,
          display:    "inline-block",
          animation:  active ? "itemCount 0.4s ease" : "none",
          filter:     glow
            ? `drop-shadow(0 0 14px gold) brightness(1.25)`
            : "none",
          transition: "filter 0.15s ease",
        }}>
          {theme.foodEmoji}
        </span>
        {active && (
          <span style={{
            position: "absolute", top: -42, left: "50%",
            fontSize: 30, fontWeight: 900, color: theme.accent,
            animation: "numPop 0.25s ease",
            lineHeight: 1,
          }}>
            {countIdx + 1}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full"
      style={{ background: `linear-gradient(160deg, ${theme.bg} 0%, #FFFFFF 100%)` }}>
      <style>{ANIM}</style>

      {/* ── TOP: Drop zone — animal + placed food ── */}
      <div ref={dropRef}
        className="flex flex-col items-center justify-end pt-6 pb-5 px-4"
        style={{
          minHeight: "52%",
          borderBottom: phase === "drag"
            ? `3px dashed ${dropGlow ? theme.accent : theme.soft}`
            : "none",
          transition: "border-color 0.2s",
        }}>

        {/* Drop hint */}
        {phase === "drag" && (
          <p className="text-sm font-bold mb-3 transition-all"
            style={{ color: dropGlow ? theme.accent : "#CBD5E1" }}>
            {dropGlow ? "✨ Drop here!" : "⬆ Drag the food up to feed the animal"}
          </p>
        )}

        {/* Animal */}
        <span style={{
          fontSize: 100,
          display: "inline-block",
          animation: animalAnim,
          filter: mood === "happy" ? "drop-shadow(0 0 20px gold)" : "none",
          transition: "filter 0.3s",
          userSelect: "none",
        }}>
          {theme.emoji}
        </span>

        {/* All food items (existing + placed) */}
        <div className="flex flex-wrap justify-center gap-3 mt-4 px-4">
          {/* a existing items */}
          {Array.from({ length: a }).map((_, i) => (
            <FoodItem key={`a${i}`} index={i} />
          ))}
          {/* placed b items */}
          {Array.from({ length: placedIds.size }).map((_, i) => (
            <div key={`p${i}`} style={{ animation: !isCounting ? "flyIn 0.5s ease" : "none" }}>
              <FoodItem index={a + i} />
            </div>
          ))}
        </div>

        {/* Equation badge */}
        {settings.showEquation && allGlow && (
          <div className="mt-5 px-6 py-3 rounded-3xl font-black text-3xl"
            style={{
              background: theme.bg,
              border: `3px solid ${theme.soft}`,
              color: theme.accent,
              animation: "eqPop 0.4s ease",
              boxShadow: `0 4px 20px ${theme.soft}`,
            }}>
            {a} + {b} = <span style={{ fontSize: 40 }}>{total}</span>
          </div>
        )}
      </div>

      {/* ── BOTTOM: Content per phase ── */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-6 gap-4">

        {/* INTRO */}
        {phase === "intro" && (
          <div className="flex flex-col items-center gap-3 opacity-60">
            <span style={{ fontSize: 64 }} className="animate-pulse">{theme.foodEmoji}</span>
            <p className="text-slate-400 font-semibold text-base">Getting ready…</p>
          </div>
        )}

        {/* DRAG */}
        {phase === "drag" && (
          <div className="flex flex-col items-center gap-5 w-full">
            <p className="text-center font-bold text-slate-400 text-sm">
              Drag {b === 1 ? `the ${theme.food}` : `the ${b} ${theme.plural}`} up!
            </p>
            <div className="flex gap-8 flex-wrap justify-center">
              {Array.from({ length: b }).map((_, id) => {
                const placed  = placedIds.has(id);
                const dragged = dragPos?.id === id;
                return (
                  <span key={id}
                    onPointerDown={(e) => onPtrDown(e, id)}
                    onPointerMove={(e) => onPtrMove(e, id)}
                    onPointerUp={(e)   => onPtrUp(e, id)}
                    style={{
                      fontSize:    88,
                      display:     "inline-block",
                      cursor:      placed ? "default" : "grab",
                      opacity:     placed || dragged ? 0.2 : 1,
                      transform:   !placed && !dragged ? "rotate(-6deg)" : "none",
                      filter:      !placed && !dragged
                        ? `drop-shadow(0 6px 12px ${theme.soft})`
                        : "none",
                      transition:  "opacity 0.2s, transform 0.2s",
                      touchAction: "none",
                      userSelect:  "none",
                    }}>
                    {theme.foodEmoji}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* COUNTING */}
        {phase === "counting" && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-400 font-bold text-sm">Counting together…</p>
            <div className="text-6xl font-black min-h-[72px] flex items-center"
              style={{ color: theme.accent }}>
              {countIdx >= 0 ? countIdx + 1 : ""}
            </div>
          </div>
        )}

        {/* REWARD */}
        {isReward && (
          <div className="flex flex-col items-center gap-5 w-full max-w-xs">
            <span style={{ fontSize: 64, animation: "starSpin 0.8s ease infinite alternate" }}>⭐</span>
            <p className="text-2xl font-black text-slate-700 text-center">Amazing!</p>
            <div className="flex gap-3 w-full">
              <button onClick={onNext}
                className="flex-1 py-4 rounded-3xl font-black text-white text-xl shadow-xl transition-all hover:scale-105 active:scale-95"
                style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.soft})` }}>
                Next! →
              </button>
              <button onClick={onDone}
                className="flex-1 py-4 rounded-3xl font-bold text-slate-600 text-base bg-white border-2 border-slate-200 hover:border-slate-300 transition-all">
                All Done ✓
              </button>
            </div>
          </div>
        )}
      </div>

      {/* dragging ghost */}
      {dragPos && (
        <span style={{
          position:   "fixed",
          left:       dragPos.x - 48,
          top:        dragPos.y - 48,
          fontSize:   96,
          pointerEvents: "none",
          zIndex:     9998,
          transform:  "scale(1.15) rotate(-8deg)",
          filter:     `drop-shadow(0 10px 22px ${theme.soft})`,
          userSelect: "none",
        }}>
          {theme.foodEmoji}
        </span>
      )}

      {/* floating replay button */}
      <button
        onClick={() => {
          const aW = `${a} ${a === 1 ? theme.food : theme.plural}`;
          const bW = `${b} more ${b === 1 ? theme.food : theme.plural}`;
          speakAsync(
            phase === "drag"
              ? `The ${theme.animal} has ${aW}. Add ${bW}.`
              : `${a} plus ${b} equals ${total}.`
          );
        }}
        className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg border-2 transition-all hover:scale-110 active:scale-95"
        style={{ background: "white", borderColor: theme.soft, color: theme.accent, zIndex: 1000 }}>
        <Volume2 className="w-5 h-5" />
      </button>
    </div>
  );
}

// ─── ROOT MODULE ─────────────────────────────────────────────────────────────
export default function FeedAnimalsModule({ grade, attempt, onRoundComplete, voiceId }) {
  const [screen,       setScreen]       = useState("home");
  const [settings,     setSettings]     = useState(() => ls.load("feedAnimals_settings", DEF_SETTINGS));
  const [progress,     setProgress]     = useState(() => ls.load("feedAnimals_progress", DEF_PROGRESS));
  const [themeIdx,     setThemeIdx]     = useState(0);
  const [round,        setRound]        = useState(null);
  const [roundKey,     setRoundKey]     = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const pushRound = useCallback((nextThemeIdx) => {
    setRound(makeRound(settings.maxNumber, nextThemeIdx));
    setRoundKey(k => k + 1);
  }, [settings.maxNumber]);

  const startGame = useCallback(() => {
    pushRound(themeIdx);
    setScreen("game");
  }, [pushRound, themeIdx]);

  const handleNext = useCallback(() => {
    if (!round) return;
    const key = `${round.a}+${round.b}`;
    setProgress(p => {
      const updated = {
        ...p,
        roundsCompleted: p.roundsCompleted + 1,
        streak:   p.streak + 1,
        mastered: [...new Set([...p.mastered, key])],
      };
      ls.save("feedAnimals_progress", updated);
      return updated;
    });

    // Confetti burst
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2200);

    // Advance theme + new round
    const next = settings.mixThemes ? (themeIdx + 1) % THEMES.length : themeIdx;
    if (settings.mixThemes) setThemeIdx(next);
    pushRound(next);
  }, [round, settings.mixThemes, themeIdx, pushRound]);

  const handleDone = useCallback(() => {
    const updated = {
      ...progress,
      roundsCompleted: progress.roundsCompleted + 1,
      streak: progress.streak + 1,
    };
    ls.save("feedAnimals_progress", updated);
    setProgress(updated);
    setScreen("home");
    onRoundComplete({
      score: 100,
      metadata: { roundsCompleted: updated.roundsCompleted, mastered: updated.mastered },
    });
  }, [progress, onRoundComplete]);

  const saveSettings = useCallback((s) => {
    ls.save("feedAnimals_settings", s);
    setSettings(s);
    setScreen("home");
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      {showConfetti && <Confetti />}

      {screen === "home"     && <HomeScreen progress={progress} onPlay={startGame} onSettings={() => setScreen("settings")} />}
      {screen === "settings" && <SettingsScreen settings={settings} onSave={saveSettings} onBack={() => setScreen("home")} />}
      {screen === "game" && round && (
        <GameScreen
          key={roundKey}
          round={round}
          settings={settings}
          voiceId={voiceId}
          onNext={handleNext}
          onDone={handleDone}
        />
      )}
    </div>
  );
}
