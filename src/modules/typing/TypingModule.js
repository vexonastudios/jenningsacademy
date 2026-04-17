"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  CheckCircle, Trophy, Keyboard,
  Eye, EyeOff, Zap, BookOpen, Volume2
} from "lucide-react";
import { useTypingEngine } from "./hooks/useTypingEngine";
import KeyboardVisualizer from "./components/KeyboardVisualizer";
import { LESSONS } from "./content/lessons";
import { FINGER_MAP, ZONE_STYLES } from "./content/fingerZones";

// ─── Grade → accuracy pass threshold ─────────────────────────────────────────
function passThreshold(grade) {
  const g = Number(grade);
  if (g <= 3) return 78;
  if (g <= 6) return 82;
  return 87;
}

// ─── Shared TTS hook ──────────────────────────────────────────────────────────
function useSpeech(voiceId) {
  const audioRef   = useRef(null);
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback((text) => {
    if (!voiceId || !text) return;
    // Stop any current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    setSpeaking(true);
    try {
      const audio = new Audio(
        `/api/tts?voiceId=${encodeURIComponent(voiceId)}&text=${encodeURIComponent(text)}`
      );
      audioRef.current = audio;
      audio.play().catch(() => {});
      audio.onended = () => setSpeaking(false);
      audio.onerror = () => setSpeaking(false);
    } catch {
      setSpeaking(false);
    }
  }, [voiceId]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setSpeaking(false);
  }, []);

  // Clean up on unmount
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  return { speak, stop, speaking };
}

// ─── Phase progress bar ───────────────────────────────────────────────────────
const PHASE_STEPS = [
  { id: "posture",     label: "Posture"   },
  { id: "instruction", label: "New Skill" },
  { id: "drill",       label: "Practice"  },
  { id: "challenge",   label: "Challenge" },
  { id: "review",      label: "Review"    },
];

function PhaseBar({ phase }) {
  const active = PHASE_STEPS.findIndex(p => p.id === phase);
  return (
    <div className="flex items-center justify-center gap-1.5 pt-3 pb-2 shrink-0 flex-wrap">
      {PHASE_STEPS.map((p, i) => {
        const done = i < active, cur = i === active;
        return (
          <div key={p.id} className="flex items-center gap-1.5">
            <div className={`px-3 py-1 rounded-full text-xs font-bold transition-all
              ${cur ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : done ? "bg-emerald-800/40 text-emerald-400 border border-emerald-700/30"
                : "bg-slate-800 text-slate-600"}`}>
              {done ? "✓ " : ""}{p.label}
            </div>
            {i < PHASE_STEPS.length - 1 && (
              <div className={`w-4 h-px ${done ? "bg-emerald-600" : "bg-slate-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Typing Prompt Display ────────────────────────────────────────────────────
function PromptDisplay({ text, typed }) {
  return (
    <div className="font-mono text-2xl sm:text-3xl leading-relaxed tracking-wide break-words">
      {text.split("").map((char, i) => {
        const isTyped   = i < typed.length;
        const isCursor  = i === typed.length;
        const correct   = isTyped && typed[i] === char;
        const incorrect = isTyped && typed[i] !== char;
        const display   = char === " " ? "\u00a0" : char;
        return (
          <span key={i} className={`
            ${isCursor  ? "border-l-2 border-indigo-400 text-slate-200 animate-[blink_1s_ease-in-out_infinite]" : ""}
            ${correct   ? "text-emerald-400" : ""}
            ${incorrect ? "text-rose-400 bg-rose-400/10 rounded" : ""}
            ${!isTyped && !isCursor ? "text-slate-500" : ""}
          `}>
            {display}
          </span>
        );
      })}
    </div>
  );
}

// ─── Live Metrics Bar ─────────────────────────────────────────────────────────
function MetricsBar({ wpm, accuracy, isChallenge = false }) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold
        ${isChallenge ? "bg-indigo-900/40 border-indigo-700/40 text-indigo-300"
          : "bg-slate-800 border-slate-700 text-slate-300"}`}>
        <Zap className="w-3.5 h-3.5" />
        {wpm} WPM
      </div>
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold
        ${accuracy >= 95 ? "bg-emerald-900/40 border-emerald-700/40 text-emerald-300"
          : accuracy >= 80 ? "bg-amber-900/40 border-amber-700/40 text-amber-300"
          : "bg-rose-900/40 border-rose-700/40 text-rose-300"}`}>
        {accuracy}% Accuracy
      </div>
    </div>
  );
}

// ─── Replay voice button ──────────────────────────────────────────────────────
function SpeakButton({ onSpeak, speaking }) {
  return (
    <button
      onClick={onSpeak}
      disabled={speaking}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all
        ${speaking
          ? "bg-indigo-900/40 border-indigo-700/40 text-indigo-400 cursor-not-allowed animate-pulse"
          : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"}`}
      title="Hear it again">
      <Volume2 className={`w-3.5 h-3.5 ${speaking ? "animate-pulse" : ""}`} />
      {speaking ? "Playing…" : "Hear again"}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// POSTURE SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
const POSTURE_ITEMS = [
  { icon: "🪑", label: "Feet flat on the floor" },
  { icon: "📐", label: "Sitting up straight, back against the chair" },
  { icon: "🤲", label: "Wrists relaxed — not resting while typing" },
  { icon: "👁️",  label: "Eyes on the screen, not the keyboard" },
];

function PostureScreen({ lessonNumber, lessonTitle, voiceId, onNext }) {
  const [checked, setChecked] = useState([false, false, false, false]);
  const allChecked = checked.every(Boolean);
  const { speak, speaking } = useSpeech(voiceId);

  // Read the posture reminder on load
  useEffect(() => {
    const t = setTimeout(() =>
      speak(`Lesson ${lessonNumber}: ${lessonTitle}. Before we start, let's check your posture. Feet flat on the floor. Sitting up straight. Wrists relaxed. Eyes on the screen, not the keyboard. Check each item, then press Let's Begin.`),
    600);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full min-h-full">
      <PhaseBar phase="posture" />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-1">
              Lesson {lessonNumber} · Daily Posture Check
            </p>
            <h2 className="text-3xl font-black text-white">{lessonTitle}</h2>
            <div className="flex justify-center mt-3">
              <SpeakButton onSpeak={() => speak(`Lesson ${lessonNumber}: ${lessonTitle}. Before we start, let's check your posture. Feet flat on the floor. Sitting up straight. Wrists relaxed. Eyes on the screen.`)} speaking={speaking} />
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 rounded-3xl p-6 space-y-4 mb-8">
            <p className="text-slate-400 text-sm font-semibold text-center mb-5">
              Check all four before you begin:
            </p>
            {POSTURE_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => setChecked(c => { const n = [...c]; n[i] = !n[i]; return n; })}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all
                  ${checked[i]
                    ? "bg-emerald-900/30 border-emerald-500/40 text-emerald-300"
                    : "bg-slate-900/40 border-slate-700/40 text-slate-400 hover:border-slate-500"}`}>
                <span className="text-2xl w-8 shrink-0">{item.icon}</span>
                <span className="font-semibold flex-1">{item.label}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                  ${checked[i] ? "bg-emerald-500 border-emerald-400" : "border-slate-600"}`}>
                  {checked[i] && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={onNext}
            disabled={!allChecked}
            className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all
              ${allChecked
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"}`}>
            {allChecked ? <><CheckCircle className="w-5 h-5" /> Let&rsquo;s Begin!</> : "Check all 4 items above"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// INSTRUCTION SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function InstructionScreen({ lesson, voiceId, onNext }) {
  const { speak, speaking } = useSpeech(voiceId);

  // Read the instruction body on load
  useEffect(() => {
    const t = setTimeout(() =>
      speak(`${lesson.instruction.title}. ${lesson.instruction.body}`),
    500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full min-h-full">
      <PhaseBar phase="instruction" />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <span className="text-xs text-purple-400 font-bold uppercase tracking-widest">
              {lesson.phaseLabel}
            </span>
            <h2 className="text-4xl font-black text-white mt-1">{lesson.instruction.title}</h2>
            <div className="flex justify-center mt-3">
              <SpeakButton onSpeak={() => speak(`${lesson.instruction.title}. ${lesson.instruction.body}`)} speaking={speaking} />
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 rounded-3xl p-7 mb-6">
            <p className="text-slate-200 text-lg leading-relaxed">{lesson.instruction.body}</p>
          </div>

          {/* Target key indicators with finger color */}
          {lesson.targetKeys?.length > 0 && (
            <div className="mb-6">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center mb-3">
                New keys this lesson
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {lesson.targetKeys.map(k => {
                  const zone = FINGER_MAP[k.toLowerCase()];
                  const st   = zone ? ZONE_STYLES[zone] : null;
                  return (
                    <div key={k} className="flex flex-col items-center gap-1">
                      <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-black uppercase
                        ${st ? `${st.bg} ${st.border} text-white` : "bg-slate-700 border-slate-600 text-white"}`}>
                        {k}
                      </div>
                      <span className="text-[10px] text-slate-500">{st?.label ?? ""}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <button onClick={onNext}
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5">
            <BookOpen className="w-5 h-5" /> Start Practice
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DRILL SCREEN (warmup + practice drills)
// ═══════════════════════════════════════════════════════════════════════════════
function DrillScreen({ prompt, label, targetKeys, showKeyboard, voiceId, onToggleKeyboard, onDrillComplete }) {
  const engine        = useTypingEngine(prompt);
  const completedRef  = useRef(false);
  const { speak, speaking } = useSpeech(voiceId);

  // Read the drill intro on load
  useEffect(() => {
    const cleanLabel = label.replace(/[⚡]/g, "").trim();
    const t = setTimeout(() =>
      speak(`${cleanLabel}. Type the text below. You can use backspace to correct any errors. Press any key when you are ready.`),
    400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Global key capture
  useEffect(() => {
    const handler = (e) => engine.handleKeyDown(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [engine.handleKeyDown]);

  // Complete when prompt fully typed
  useEffect(() => {
    if (engine.isComplete && !completedRef.current) {
      completedRef.current = true;
      speak("Great job! Moving to the next step.");
      setTimeout(() => onDrillComplete(engine.weakKeys), 1000);
    }
  }, [engine.isComplete, engine.weakKeys, onDrillComplete, speak]);

  const lastEntry = engine.keystrokeLog[engine.keystrokeLog.length - 1] ?? null;

  return (
    <div className="flex flex-col h-full min-h-full">
      <PhaseBar phase="drill" />
      <div className="flex-1 flex flex-col px-6 pt-4 pb-6 gap-5 overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{label}</p>
            <p className="text-slate-300 text-sm mt-0.5">Type the text below — backspace to correct errors</p>
          </div>
          <div className="flex items-center gap-2">
            <SpeakButton
              onSpeak={() => speak(`${label.replace(/[⚡]/g, "").trim()}. Type the text below. Backspace to correct errors.`)}
              speaking={speaking}
            />
            <MetricsBar wpm={engine.netWpm} accuracy={engine.accuracy} />
            <button onClick={onToggleKeyboard}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              title={showKeyboard ? "Hide keyboard" : "Show keyboard"}>
              {showKeyboard ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Prompt */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-3xl p-6 flex-1 flex items-center">
          <PromptDisplay text={prompt} typed={engine.typed} />
        </div>

        {/* Completion flash */}
        {engine.isComplete && (
          <div className="flex items-center justify-center gap-3 py-3 rounded-2xl bg-emerald-900/30 border border-emerald-700/40 text-emerald-300 font-bold animate-pulse">
            <CheckCircle className="w-5 h-5" /> Nice work! Moving to next step…
          </div>
        )}

        {/* Visual keyboard */}
        {showKeyboard && (
          <div className="flex justify-center py-2">
            <KeyboardVisualizer
              nextKey={engine.nextKey}
              lastKey={lastEntry?.actual ?? null}
              lastCorrect={lastEntry?.correct ?? true}
              compact
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHALLENGE SCREEN (timed 30s sprint)
// ═══════════════════════════════════════════════════════════════════════════════
const CHALLENGE_DURATION = 30;

function ChallengeScreen({ lesson, threshold, showKeyboard, voiceId, onToggleKeyboard, onChallengeComplete }) {
  const engine       = useTypingEngine(lesson.challenge.prompt);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft,   setTimeLeft]   = useState(CHALLENGE_DURATION);
  const [finished,   setFinished]   = useState(false);
  const { speak, speaking } = useSpeech(voiceId);

  const finishedRef  = useRef(false);
  const engineRef    = useRef(engine);
  useEffect(() => { engineRef.current = engine; });

  // Read challenge intro on load
  useEffect(() => {
    const t = setTimeout(() =>
      speak(`Challenge round! You have ${CHALLENGE_DURATION} seconds. Type as accurately as you can. Press any key to start the timer.`),
    400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFinished(true);
    const eng = engineRef.current;
    const accuracy = eng.accuracy;
    const passed   = accuracy >= threshold;
    speak(passed
      ? `Great work! You scored ${accuracy} percent accuracy and ${eng.netWpm} words per minute. You passed!`
      : `Good effort! You scored ${accuracy} percent. You need ${threshold} percent to advance. Keep practicing!`
    );
    onChallengeComplete({
      wpm:      eng.netWpm,
      accuracy,
      weakKeys: eng.weakKeys,
      passed,
      score:    accuracy,
    });
  }, [threshold, onChallengeComplete, speak]);

  // Global key capture — starts timer on first printable key
  useEffect(() => {
    const handler = (e) => {
      if (finished) return;
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        if (!hasStarted) setHasStarted(true);
      }
      engine.handleKeyDown(e);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [engine.handleKeyDown, hasStarted, finished]);

  // Countdown
  useEffect(() => {
    if (!hasStarted || finished) return;
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(id); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [hasStarted, finished]);

  // 10-second warning
  useEffect(() => {
    if (timeLeft === 10 && hasStarted && !finished) speak("Ten seconds remaining!");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // Trigger finish when time or prompt runs out
  useEffect(() => { if (timeLeft === 0 && hasStarted) finish(); }, [timeLeft, hasStarted, finish]);
  useEffect(() => { if (engine.isComplete) finish(); }, [engine.isComplete, finish]);

  const pct        = ((CHALLENGE_DURATION - timeLeft) / CHALLENGE_DURATION) * 100;
  const timerColor = timeLeft <= 10 ? "text-rose-400" : timeLeft <= 20 ? "text-amber-400" : "text-emerald-400";
  const lastEntry  = engine.keystrokeLog[engine.keystrokeLog.length - 1] ?? null;

  return (
    <div className="flex flex-col h-full min-h-full">
      <PhaseBar phase="challenge" />
      <div className="flex-1 flex flex-col px-6 pt-4 pb-6 gap-4 overflow-y-auto">

        {/* Timer + Metrics */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-xs text-amber-400 font-bold uppercase tracking-widest">Challenge Round</p>
            <p className="text-slate-400 text-sm mt-0.5">
              {!hasStarted ? "Press any key to start the timer!" : "Type as accurately as you can!"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <SpeakButton
              onSpeak={() => speak(`Challenge round. ${CHALLENGE_DURATION} seconds. Type as accurately as you can. Press any key to start.`)}
              speaking={speaking}
            />
            <MetricsBar wpm={engine.netWpm} accuracy={engine.accuracy} isChallenge />
            <button onClick={onToggleKeyboard}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors">
              {showKeyboard ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Big countdown */}
        <div className="flex items-center gap-4 bg-slate-800/60 border border-slate-700/40 rounded-2xl px-5 py-3">
          <div className={`text-5xl font-black font-mono ${timerColor} w-14 text-right`}>
            {timeLeft}
          </div>
          <div className="flex-1">
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  timeLeft <= 10 ? "bg-rose-500" : timeLeft <= 20 ? "bg-amber-500" : "bg-emerald-500"}`}
                style={{ width: `${100 - pct}%` }} />
            </div>
            <p className="text-xs text-slate-500 mt-1 font-mono">{CHALLENGE_DURATION}s challenge · accuracy determines your grade</p>
          </div>
          {!hasStarted && <div className="text-xs text-amber-400 font-bold animate-pulse">▶ START</div>}
        </div>

        {/* Typing Prompt */}
        <div className="bg-slate-800/60 border border-amber-500/20 rounded-3xl p-6 flex-1 flex items-center">
          <PromptDisplay text={lesson.challenge.prompt} typed={engine.typed} />
        </div>

        {/* Visual Keyboard */}
        {showKeyboard && (
          <div className="flex justify-center py-2">
            <KeyboardVisualizer
              nextKey={engine.nextKey}
              lastKey={lastEntry?.actual ?? null}
              lastCorrect={lastEntry?.correct ?? true}
              compact
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// REVIEW SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function ReviewScreen({ lesson, results, accWeakKeys, threshold, lessonNumber, totalLessons, voiceId, onFinish }) {
  const { wpm, accuracy, passed } = results;
  const nextLesson = LESSONS[(lessonNumber + 1) % totalLessons];
  const { speak, speaking } = useSpeech(voiceId);

  // Read the review on load
  useEffect(() => {
    const topWeak = Object.entries(accWeakKeys)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([k]) => k)
      .join(", ");
    const weakMsg = topWeak ? `Keys to keep practicing: ${topWeak}.` : "";
    const msg = passed
      ? `Lesson complete! You scored ${accuracy} percent accuracy at ${wpm} words per minute. Excellent work! ${weakMsg} Next lesson: ${nextLesson?.title ?? "coming soon"}.`
      : `Good effort! You scored ${accuracy} percent accuracy at ${wpm} words per minute. You need ${threshold} percent to move on. ${weakMsg} Same lesson next time — you can do it!`;
    const t = setTimeout(() => speak(msg), 500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Top 3 weak keys
  const topWeak = Object.entries(accWeakKeys)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-full px-6 py-8 max-w-xl mx-auto w-full">
      {/* Score ring */}
      <div className="flex flex-col items-center mb-8">
        <div className={`w-36 h-36 rounded-full border-[6px] flex flex-col items-center justify-center mb-5 shadow-2xl
          ${passed
            ? "border-emerald-400 bg-emerald-900/20 shadow-emerald-600/20"
            : accuracy >= 70 ? "border-amber-400 bg-amber-900/20 shadow-amber-600/20"
            : "border-rose-400 bg-rose-900/20 shadow-rose-600/20"}`}>
          <span className={`text-5xl font-black ${passed ? "text-emerald-400" : accuracy >= 70 ? "text-amber-400" : "text-rose-400"}`}>
            {accuracy}%
          </span>
          <span className="text-slate-500 text-xs font-semibold">Accuracy</span>
        </div>

        <h2 className="text-3xl font-black text-white text-center">
          {passed ? "Lesson Complete! 🎉" : "Keep Practicing! 📖"}
        </h2>
        <p className="text-slate-400 mt-1 text-center">
          {passed ? `You've mastered "${lesson.title}"` : `You need ${threshold}% to move on`}
        </p>
        <div className="mt-3">
          <SpeakButton
            onSpeak={() => {
              const msg = passed
                ? `Lesson complete! ${accuracy} percent accuracy, ${wpm} words per minute. Great work!`
                : `You scored ${accuracy} percent. You need ${threshold} percent to advance. Keep it up!`;
              speak(msg);
            }}
            speaking={speaking}
          />
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 text-center">
          <div className="text-3xl font-black text-indigo-400">{wpm}</div>
          <div className="text-xs text-slate-400 font-semibold mt-0.5">Words / Min</div>
        </div>
        <div className={`border rounded-2xl p-4 text-center
          ${passed ? "bg-emerald-900/20 border-emerald-700/30" : "bg-slate-800/60 border-slate-700/50"}`}>
          <div className={`text-3xl font-black ${passed ? "text-emerald-400" : "text-amber-400"}`}>{accuracy}%</div>
          <div className="text-xs text-slate-400 font-semibold mt-0.5">Accuracy</div>
        </div>
      </div>

      {/* Mastery indicator */}
      <div className={`rounded-2xl border p-4 mb-5 text-sm text-center
        ${passed ? "bg-emerald-900/20 border-emerald-700/30" : "bg-slate-800/60 border-slate-700/40"}`}>
        {passed ? (
          <p className="text-emerald-300 font-bold">
            ✓ Next session: <span className="text-white">Lesson {Math.min(lessonNumber + 2, totalLessons)} — {nextLesson?.title}</span>
          </p>
        ) : (
          <p className="text-amber-300 font-semibold">
            Same lesson tomorrow — keep at it! Accuracy needs to reach {threshold}%.
          </p>
        )}
      </div>

      {/* Weak keys */}
      {topWeak.length > 0 && (
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4 mb-6">
          <p className="text-xs text-rose-400 font-bold uppercase tracking-widest mb-3">Keys to practice</p>
          <div className="flex items-center gap-3 flex-wrap">
            {topWeak.map(([k, count]) => (
              <div key={k} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-rose-900/30 border border-rose-700/40 rounded-xl flex items-center justify-center font-black text-xl uppercase text-rose-300">
                  {k}
                </div>
                <span className="text-[10px] text-slate-500">{count} miss{count !== 1 ? "es" : ""}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onFinish}
        className={`w-full py-4 rounded-2xl font-black text-lg transition-all hover:-translate-y-1
          ${passed
            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
            : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"}`}>
        {passed ? <><Trophy className="w-5 h-5 inline mr-2" />Done — Great Work!</> : <>Done — See You Tomorrow 💪</>}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN MODULE
// ═══════════════════════════════════════════════════════════════════════════════
export default function TypingModule({ grade, attempt, onRoundComplete, profileId, voiceId }) {
  const [lessonNumber,    setLessonNumber]    = useState(null);
  const [phase,           setPhase]           = useState("loading");
  const [drillStep,       setDrillStep]       = useState(0);
  const [accWeakKeys,     setAccWeakKeys]     = useState({});
  const [challengeResult, setChallengeResult] = useState(null);
  const [showKeyboard,    setShowKeyboard]    = useState(true);

  const threshold = passThreshold(grade);

  // ── Fetch current lesson ─────────────────────────────────────────────────
  useEffect(() => {
    if (!profileId) { setLessonNumber(0); setPhase("posture"); return; }
    fetch(`/api/typing-progress?profileId=${profileId}`)
      .then(r => r.json())
      .then(d => { setLessonNumber(d.lessonNumber ?? 0); setPhase("posture"); })
      .catch(() => { setLessonNumber(0); setPhase("posture"); });
  }, [profileId]);

  const lesson = lessonNumber !== null ? LESSONS[lessonNumber % LESSONS.length] : null;

  // Build drill list for this lesson: [warmup?, drill1, drill2]
  const drillList = lesson
    ? [
        ...(lesson.warmupPrompt ? [{ label: "⚡ Warmup Drill", prompt: lesson.warmupPrompt }] : []),
        ...lesson.drills,
      ]
    : [];

  // ── Phase transitions ────────────────────────────────────────────────────
  const advance = (newPhase) => setPhase(newPhase);

  const handleDrillComplete = useCallback((weakKeys) => {
    setAccWeakKeys(prev => {
      const merged = { ...prev };
      Object.entries(weakKeys).forEach(([k, v]) => { merged[k] = (merged[k] || 0) + v; });
      return merged;
    });
    const nextStep = drillStep + 1;
    if (nextStep < drillList.length) {
      setDrillStep(nextStep);
    } else {
      advance("challenge");
    }
  }, [drillStep, drillList.length]);

  const handleChallengeComplete = useCallback((results) => {
    setAccWeakKeys(prev => {
      const merged = { ...prev };
      Object.entries(results.weakKeys || {}).forEach(([k, v]) => { merged[k] = (merged[k] || 0) + v; });
      return merged;
    });
    setChallengeResult(results);
    advance("review");
  }, []);

  const handleFinish = useCallback(() => {
    if (!challengeResult) return;
    onRoundComplete({
      score:    challengeResult.accuracy,
      metadata: {
        lessonNumber,
        lessonTitle: lesson?.title,
        wpm:         challengeResult.wpm,
        accuracy:    challengeResult.accuracy,
        passed:      challengeResult.passed,
        weakKeys:    accWeakKeys,
      },
    });
  }, [challengeResult, lessonNumber, lesson, accWeakKeys, onRoundComplete]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (phase === "loading" || !lesson) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-full gap-4 text-slate-400">
        <Keyboard className="w-10 h-10 animate-pulse text-indigo-400" />
        <p className="font-semibold text-sm">Loading your lesson…</p>
      </div>
    );
  }

  // ── Posture ──────────────────────────────────────────────────────────────
  if (phase === "posture") {
    return (
      <PostureScreen
        lessonNumber={lessonNumber + 1}
        lessonTitle={lesson.title}
        voiceId={voiceId}
        onNext={() => advance("instruction")}
      />
    );
  }

  // ── Instruction ──────────────────────────────────────────────────────────
  if (phase === "instruction") {
    return (
      <InstructionScreen
        lesson={lesson}
        voiceId={voiceId}
        onNext={() => { setDrillStep(0); advance("drill"); }}
      />
    );
  }

  // ── Drill (warmup + practice passes) ────────────────────────────────────
  if (phase === "drill") {
    const step = drillList[drillStep];
    if (!step) { advance("challenge"); return null; }
    return (
      <DrillScreen
        key={`drill-${drillStep}`}
        prompt={step.prompt}
        label={step.label}
        targetKeys={lesson.targetKeys}
        showKeyboard={showKeyboard}
        voiceId={voiceId}
        onToggleKeyboard={() => setShowKeyboard(s => !s)}
        onDrillComplete={handleDrillComplete}
      />
    );
  }

  // ── Challenge ────────────────────────────────────────────────────────────
  if (phase === "challenge") {
    return (
      <ChallengeScreen
        key="challenge"
        lesson={lesson}
        threshold={threshold}
        showKeyboard={showKeyboard}
        voiceId={voiceId}
        onToggleKeyboard={() => setShowKeyboard(s => !s)}
        onChallengeComplete={handleChallengeComplete}
      />
    );
  }

  // ── Review ────────────────────────────────────────────────────────────────
  if (phase === "review" && challengeResult) {
    return (
      <ReviewScreen
        lesson={lesson}
        results={challengeResult}
        accWeakKeys={accWeakKeys}
        threshold={threshold}
        lessonNumber={lessonNumber}
        totalLessons={LESSONS.length}
        voiceId={voiceId}
        onFinish={handleFinish}
      />
    );
  }

  return null;
}
