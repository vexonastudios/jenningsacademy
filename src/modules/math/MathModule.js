"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Calculator, ArrowRight, Volume2, Target, Trophy, Flame, BookOpen, Pencil, ClipboardCheck, Medal, CheckCircle, Zap } from "lucide-react";
import { generateProblem } from "./MathEngine";
import { useSoundEffects } from "@/modules/_shared/useSoundEffects";
import { GRADE_1_CURRICULUM } from "./curriculum/mathGrade1";
import { GRADE_2_CURRICULUM } from "./curriculum/mathGrade2";
import { GRADE_3_CURRICULUM } from "./curriculum/mathGrade3";
import { GRADE_4_CURRICULUM } from "./curriculum/mathGrade4";
import { GRADE_5_CURRICULUM } from "./curriculum/mathGrade5";
import { GRADE_6_CURRICULUM } from "./curriculum/mathGrade6";
import { GRADE_7_CURRICULUM } from "./curriculum/mathGrade7";
import { GRADE_8_CURRICULUM } from "./curriculum/mathGrade8";
import { GRADE_9_CURRICULUM, GRADE_10_CURRICULUM } from "./curriculum/mathGrade9";
import GeometryCanvas from "./components/GeometryCanvas";

const CURRICULUM_MAP = {
  1: GRADE_1_CURRICULUM,
  2: GRADE_2_CURRICULUM,
  3: GRADE_3_CURRICULUM,
  4: GRADE_4_CURRICULUM,
  5: GRADE_5_CURRICULUM,
  6: GRADE_6_CURRICULUM,
  7: GRADE_7_CURRICULUM,
  8: GRADE_8_CURRICULUM,
  9: GRADE_9_CURRICULUM,
  10: GRADE_10_CURRICULUM,
  11: GRADE_10_CURRICULUM,
  12: GRADE_10_CURRICULUM,
};

// ── IMPROVEMENT #5: TTS hook now accepts the child's profile voiceId ───────────
function useSpeechAsync(voiceId) {
  const audioRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      audioRef.current?.pause();
    };
  }, []);

  const speakAsync = useCallback((text) => new Promise((resolve) => {
    // Use the profile's voice, falling back to a default
    const resolvedVoiceId = voiceId || "flq6f7yk4E4fJM5XTYuZ";
    if (!resolvedVoiceId || !text || !mountedRef.current) { resolve(); return; }
    audioRef.current?.pause();
    const audio = new Audio(`/api/tts?voiceId=${encodeURIComponent(resolvedVoiceId)}&text=${encodeURIComponent(text)}`);
    audioRef.current = audio;
    audio.onended = resolve;
    audio.onerror = resolve;
    audio.play().catch(resolve);
  }), [voiceId]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
  }, []);

  return { speakAsync, stop };
}

// ── Phase Progress Bar ─────────────────────────────────────────────────────────
function MathPhaseBar({ phase, isTestDay, isFirstDay }) {
  const allPhases = isTestDay
    ? [{ id: "test", label: "Final Test", icon: Trophy }]
    : isFirstDay
      ? [
          { id: "teaching", label: "Lesson", icon: BookOpen },
          { id: "practice", label: "Practice", icon: Pencil },
          { id: "quiz", label: "Quiz", icon: ClipboardCheck },
        ]
      : [
          { id: "warmup", label: "Warm-Up", icon: Flame },
          { id: "teaching", label: "Lesson", icon: BookOpen },
          { id: "practice", label: "Practice", icon: Pencil },
          { id: "quiz", label: "Quiz", icon: Target },
        ];

  const idx = allPhases.findIndex((p) => p.id === phase);

  return (
    <div className="flex items-center justify-center gap-2 pt-4 pb-2 shrink-0 flex-wrap">
      {allPhases.map((p, i) => {
        const Icon = p.icon;
        const active = p.id === phase;
        const done = i < idx;
        return (
          <div key={p.id} className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all
              ${active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : done ? "bg-emerald-800/40 text-emerald-400 border border-emerald-700/40"
                : "bg-slate-800 text-slate-500"}`}>
              <Icon className="w-3 h-3" /> {p.label}
            </div>
            {i < allPhases.length - 1 && <div className={`w-5 h-px ${done ? "bg-emerald-600" : "bg-slate-700"}`} />}
          </div>
        );
      })}
    </div>
  );
}

// ── IMPROVEMENT #2: Streak / Gamification Meter ────────────────────────────────
function StreakMeter({ streak }) {
  if (streak === 0) return null;
  
  const isHot = streak >= 5;
  const isOnFire = streak >= 10;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-black text-sm transition-all duration-500 animate-[streakPop_0.3s_ease-out]
      ${isOnFire ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-[0_0_20px_rgba(251,146,60,0.6)]"
        : isHot ? "bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
        : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"}`}
    >
      <span className={`text-lg ${isOnFire ? "animate-bounce" : ""}`}>
        {isOnFire ? "🌟" : isHot ? "🔥" : "⚡"}
      </span>
      <span>{streak} in a row{isOnFire ? "! LEGENDARY!" : isHot ? "! On fire!" : "!"}</span>
    </div>
  );
}

// ── IMPROVEMENT #3: Premium Numpad ─────────────────────────────────────────────
// Shows grade-appropriate keys (negative/decimal only for grade 5+)
function NumPad({ onDigit, onDelete, onSubmit, grade, disabled }) {
  const showDecimal = grade >= 5;
  const showNegative = grade >= 6;

  const btnBase = "font-black text-2xl py-5 rounded-2xl transition-all duration-150 active:scale-95 active:brightness-90 border-b-4 select-none";
  const numBtn = `${btnBase} bg-gradient-to-b from-slate-700 to-slate-800 hover:from-slate-600 text-slate-100 border-slate-900 shadow-md`;
  const delBtn = `${btnBase} bg-gradient-to-b from-rose-800 to-rose-900 hover:from-rose-700 text-rose-200 border-rose-950 shadow-md`;
  const goBtn = `${btnBase} bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 text-white border-emerald-800 shadow-lg shadow-emerald-900/50`;
  const specBtn = `${btnBase} bg-gradient-to-b from-indigo-700 to-indigo-800 hover:from-indigo-600 text-indigo-200 border-indigo-950 shadow-md`;

  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <button
          key={num}
          disabled={disabled}
          onClick={() => onDigit(String(num))}
          className={numBtn}
        >
          {num}
        </button>
      ))}
      {/* Row 4: special | 0 | DEL */}
      <button
        disabled={disabled}
        onClick={() => showNegative ? onDigit("-") : showDecimal ? onDigit(".") : null}
        className={`${(showNegative || showDecimal) ? specBtn : "bg-slate-800/40 text-slate-700 border-slate-900 rounded-2xl py-5 cursor-default font-black text-2xl border-b-4"}`}
      >
        {showNegative ? "−" : showDecimal ? "." : ""}
      </button>
      <button
        disabled={disabled}
        onClick={() => onDigit("0")}
        className={numBtn}
      >
        0
      </button>
      <button
        disabled={disabled}
        onClick={onDelete}
        className={delBtn}
      >
        ⌫
      </button>
      {/* Decimal for grade 5 (no negative) in last slot */}
      {showDecimal && !showNegative && (
        <>
          <button
            disabled={disabled}
            onClick={() => onDigit(".")}
            className={`${specBtn} text-xl`}
          >
            .
          </button>
          <button
            disabled={disabled}
            onClick={onSubmit}
            className={`${goBtn} col-span-2`}
          >
            GO →
          </button>
        </>
      )}
      {/* Standard GO button when no extras needed */}
      {!showDecimal && !showNegative && (
        <button disabled={disabled} onClick={onSubmit} className={`${goBtn} col-span-3 mt-1`}>
          GO →
        </button>
      )}
      {/* GO button for grade 6+ */}
      {showNegative && (
        <button disabled={disabled} onClick={onSubmit} className={`${goBtn} col-span-3 mt-1`}>
          GO →
        </button>
      )}
    </div>
  );
}

// ── Storage Helpers ────────────────────────────────────────────────────────────
const loadLedger = (profileId, grade) => {
  const blank = { day: 1, skills: {}, savedPhase: null, savedIndex: 0, savedQueue: [] };
  if (typeof window === "undefined") return blank;
  const stored = localStorage.getItem(`math_ledger_g${grade}_${profileId}`);
  return stored ? { ...blank, ...JSON.parse(stored) } : blank;
};

const saveLedger = (profileId, grade, data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`math_ledger_g${grade}_${profileId}`, JSON.stringify(data));
  }
};

// ── Queue Generators ───────────────────────────────────────────────────────────
const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);

function selectWeightedProblems(skillsLedger, requiredCount) {
  const activeTags = Object.keys(skillsLedger);
  if (activeTags.length === 0) return [];

  const weighted = activeTags.map(tag => {
    const total = skillsLedger[tag].hits + skillsLedger[tag].misses;
    const missRate = total > 0 ? (skillsLedger[tag].misses / total) : 0.5;
    return { tag, weight: 0.1 + missRate };
  });

  weighted.sort((a, b) => b.weight - a.weight);
  const focusPool = weighted.slice(0, Math.max(5, activeTags.length)).map(info => info.tag);

  const gen = [];
  for (let i = 0; i < requiredCount; i++) {
    gen.push(generateProblem(focusPool[i % focusPool.length]));
  }
  return shuffle(gen);
}

function generateNewSkillProblems(newSkillsTags, requiredCount) {
  if (!newSkillsTags || newSkillsTags.length === 0) return [];
  const gen = [];
  for (let i = 0; i < requiredCount; i++) {
    gen.push(generateProblem(newSkillsTags[i % newSkillsTags.length]));
  }
  return shuffle(gen);
}

// ── Main UI Component ──────────────────────────────────────────────────────────
// IMPROVEMENT #5: voiceId is now accepted as a prop and used in the TTS hook
export default function MathModule({ profileId, grade = 1, voiceId, onRoundComplete }) {
  // Pass the child's voiceId into the TTS hook
  const { speakAsync, stop } = useSpeechAsync(voiceId);
  const { playCorrect, playWrong, playComplete, playChime } = useSoundEffects();
  const [ledger, setLedger] = useState(() => loadLedger(profileId, grade));

  const [phase, setPhase] = useState("booting");
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dayConfig, setDayConfig] = useState(null);
  const [nextPhaseAfterReady, setNextPhaseAfterReady] = useState(null);

  // Answering State
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong_first' | 'wrong_final'
  const [explanationSteps, setExplanationSteps] = useState(null);
  const [quizMistakes, setQuizMistakes] = useState(0);

  // IMPROVEMENT #2: Streak tracking
  const [streak, setStreak] = useState(0);
  const [showCombo, setShowCombo] = useState(false);

  // IMPROVEMENT #4: Strike system (track attempts per question)
  const [strikeCount, setStrikeCount] = useState(0);

  // Initialize Queues
  useEffect(() => {
    if (phase !== "booting") return;
    const curriculum = CURRICULUM_MAP[grade] || GRADE_1_CURRICULUM;
    const today = curriculum.find(c => c.day === ledger.day);

    if (!today) {
      setDayConfig({ day: ledger.day, isTestDay: true, endless: true });
      setQueue(selectWeightedProblems(ledger.skills, 20));
      setPhase("test");
      return;
    }

    setDayConfig(today);

    const nextLedger = { ...ledger, skills: { ...ledger.skills } };
    let ledgerMutated = false;
    today.newSkills?.forEach(tag => {
      if (!nextLedger.skills[tag]) {
        nextLedger.skills[tag] = { hits: 0, misses: 0 };
        ledgerMutated = true;
      }
    });
    if (ledgerMutated) setLedger(nextLedger);

    if (today.isTestDay) {
      setQueue(selectWeightedProblems(nextLedger.skills, 50));
      setNextPhaseAfterReady("test");
      setPhase("ready");
    } else {
      const priorSkills = Object.keys(nextLedger.skills);
      const saved = ledger.savedPhase;
      if (["warmup", "practice", "quiz", "test"].includes(saved)) {
        if (ledger.savedQueue && ledger.savedQueue.length > 0) {
          setQueue(ledger.savedQueue);
          setCurrentIndex(ledger.savedIndex || 0);
        } else {
          if (saved === "quiz" || saved === "test") {
            setQueue(shuffle([...generateNewSkillProblems(today.newSkills, 10), ...selectWeightedProblems(nextLedger.skills, 20)]));
          } else if (saved === "practice") {
            setQueue(generateNewSkillProblems(today.newSkills, 10));
          } else if (saved === "warmup") {
            setQueue(selectWeightedProblems(nextLedger.skills, 20));
          }
          setCurrentIndex(0);
        }
        setNextPhaseAfterReady(saved);
        setPhase("ready");
      } else if (saved === "teaching" || priorSkills.length === 0) {
        setNextPhaseAfterReady("teaching");
        setPhase("ready");
      } else {
        setQueue(selectWeightedProblems(nextLedger.skills, 20));
        setNextPhaseAfterReady("warmup");
        setPhase("ready");
      }
    }
  }, [phase, ledger]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    saveLedger(profileId, grade, ledger);
  }, [ledger, profileId, grade]);

  useEffect(() => {
    if (phase === "teaching") {
      playChime();
      speakAsync(dayConfig?.teachingScript || "Let's learn something new today.");
    } else if (phase === "warmup" && currentIndex === 0) {
      if (!ledger.savedPhase || ledger.savedPhase === "booting") {
        speakAsync("Before we learn something new, let's do a quick warm-up on what you already know.");
      }
    } else if (phase === "quiz_intro") {
      playChime();
      speakAsync("You're doing great! Let's take a short quiz to see what you remember. Hit start when you're ready!");
    } else if (phase === "quiz_results") {
      playComplete();
      const finalScore = Math.max(0, Math.round(((queue.length - quizMistakes) / Math.max(1, queue.length)) * 100));
      speakAsync(`Quiz complete! You scored ${finalScore} percent! Hit continue to finish the day.`);
    }
  }, [phase, dayConfig, speakAsync, playChime, playComplete, currentIndex, ledger.savedPhase, quizMistakes, queue.length]);

  useEffect(() => {
    const resumablePhases = ["warmup", "teaching", "practice", "quiz", "test", "quiz_intro"];
    if (!resumablePhases.includes(phase)) return;
    setLedger(prev => {
      if (prev.savedPhase === phase && prev.savedIndex === currentIndex && prev.savedQueue === queue) return prev;
      return { ...prev, savedPhase: phase, savedIndex: currentIndex, savedQueue: queue };
    });
  }, [phase, currentIndex, queue]);

  useEffect(() => {
    if (!dayConfig || phase === "booting" || phase === "ready" || phase === "teaching") return;
    const sequenceSpeech = async (intro, problemText) => {
      if (intro) await speakAsync(intro);
      if (problemText) await speakAsync(problemText);
    };
    let intro = null;
    let rawEq = queue[currentIndex]?.equation ?? "";
    let problemText = rawEq.replace("= ?", "").trim();
    if (rawEq.includes("comes") || rawEq.includes("%") || rawEq.includes("→") || rawEq.includes("√")) {
      problemText = rawEq;
    } else if (problemText && !rawEq.includes("?")) {
      problemText = "What is " + problemText.replace("×", "times").replace("÷", "divided by").replace("^", " to the power of ");
    } else {
      problemText = rawEq.replace("= ?", "").replace("?", "").trim();
    }
    if (phase === "warmup" && currentIndex === 0) intro = "Let's do a quick warm-up drill.";
    if (phase === "practice" && currentIndex === 0) intro = "Now let's practice what we just learned.";
    if (phase === "quiz" && currentIndex === 0) intro = "Time for the daily quiz. Do your best!";
    if (phase === "test" && currentIndex === 0) intro = "It's test day! Take your time and focus.";
    sequenceSpeech(intro, problemText);
  }, [phase, currentIndex, dayConfig, queue, speakAsync]);

  // IMPROVEMENT #4: Two-strike answer logic
  const submitAnswer = () => {
    if (userInput === "" || feedback === "correct" || feedback === "wrong_final") return;

    const problem = queue[currentIndex];
    const rawInput = userInput.trim();
    
    // Support floats and negatives
    const parsedInput = parseFloat(rawInput);
    const expectedAnswer = parseFloat(problem.answer);
    const isCorrect = !isNaN(parsedInput) && Math.abs(parsedInput - expectedAnswer) < 0.001;

    // Update ledger
    const nextL = { ...ledger, skills: { ...ledger.skills } };
    if (!nextL.skills[problem.skillTag]) nextL.skills[problem.skillTag] = { hits: 0, misses: 0 };
    if (isCorrect) nextL.skills[problem.skillTag].hits += 1;
    else nextL.skills[problem.skillTag].misses += 1;
    setLedger(nextL);

    if (isCorrect) {
      setFeedback("correct");
      // IMPROVEMENT #2: Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % 5 === 0 || newStreak === 3) {
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 1500);
      }
      playCorrect();
      speakAsync("Correct!").then(() => advanceNext());
    } else {
      // IMPROVEMENT #4: First wrong answer — try again
      if (strikeCount === 0) {
        setFeedback("wrong_first");
        setStrikeCount(1);
        setUserInput(""); // Clear input so they can try again
        setStreak(0); // reset streak
        playWrong();
        speakAsync("Not quite — try again!");
      } else {
        // Second miss — show full explanation
        setFeedback("wrong_final");
        setStreak(0);
        if (phase === "quiz" || phase === "test") setQuizMistakes(m => m + 1);
        playWrong();
        const steps = problem.steps || [];
        setExplanationSteps(steps.length > 0 ? steps : [`The answer is ${problem.answer}.`]);
        const readSteps = async () => {
          await speakAsync(`The answer is ${problem.answer}. Here is how to solve it.`);
          for (const step of steps) await speakAsync(step);
        };
        readSteps();
      }
    }
  };

  const dismissExplanation = () => {
    stop();
    setExplanationSteps(null);
    setStrikeCount(0);
    advanceNext();
  };

  const advanceNext = () => {
    setFeedback(null);
    setUserInput("");
    setStrikeCount(0);

    if (currentIndex + 1 < queue.length) {
      setCurrentIndex(c => c + 1);
    } else {
      if (phase === "warmup") {
        setPhase("teaching");
      } else if (phase === "practice") {
        const mixed = shuffle([
          ...generateNewSkillProblems(dayConfig.newSkills, 10),
          ...selectWeightedProblems(ledger.skills, 20)
        ]);
        setQueue(mixed);
        setCurrentIndex(0);
        setQuizMistakes(0);
        setPhase("quiz_intro");
      } else if (phase === "quiz_intro") {
        setPhase("quiz");
      } else if (phase === "quiz" || phase === "test") {
        setPhase("quiz_results");
      } else if (phase === "quiz_results") {
        stop();
        const finalScore = Math.max(0, Math.round(((queue.length - quizMistakes) / Math.max(1, queue.length)) * 100));
        const nextLedger = { ...ledger, day: ledger.day + 1, savedPhase: null, savedIndex: 0, savedQueue: [] };
        setLedger(nextLedger);
        onRoundComplete({ score: finalScore, metadata: { dayCompleted: ledger.day } });
      }
    }
  };

  const skipTeaching = () => {
    stop();
    if (dayConfig.newSkills && dayConfig.newSkills.length > 0) {
      setQueue(generateNewSkillProblems(dayConfig.newSkills, 10));
      setCurrentIndex(0);
      setPhase("practice");
    } else {
      setQueue(selectWeightedProblems(ledger.skills, 30));
      setCurrentIndex(0);
      setPhase("quiz");
    }
  };

  // IMPROVEMENT #1: Keyboard support now handles negatives and decimals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (phase === "teaching" || phase === "booting") return;
      if (feedback === "correct" || feedback === "wrong_final") return;
      if (e.key >= "0" && e.key <= "9") {
        setUserInput(prev => prev + e.key);
      } else if (e.key === "." || e.key === ",") {
        if (!userInput.includes(".")) setUserInput(prev => prev + ".");
      } else if (e.key === "-" && userInput === "") {
        setUserInput("-");
      } else if (e.key === "Backspace") {
        setUserInput(prev => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        submitAnswer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, feedback, userInput, queue, currentIndex, strikeCount, streak]); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "booting" || !dayConfig) return (
    <div className="flex-1 bg-[#0a0f1e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center animate-pulse">
          <Calculator className="w-9 h-9 text-indigo-400" />
        </div>
        <p className="font-bold text-indigo-400 text-sm tracking-widest uppercase">Loading Math Flow...</p>
      </div>
    </div>
  );

  // ── IMPROVEMENT #3: Redesigned Ready Screen ────────────────────────────────
  if (phase === "ready") {
    return (
      <div className="flex-1 bg-[#0a0f1e] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 bg-slate-900/80 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-slate-700/50 flex flex-col items-center w-full max-w-lg text-center">
          {/* Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-indigo-500/30 blur-2xl rounded-full" />
            <div className="relative bg-gradient-to-br from-indigo-500 to-violet-600 p-6 rounded-[2rem] shadow-xl">
              <Calculator className="w-16 h-16 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-black tracking-tight text-white mb-2">Math<span className="text-indigo-400">Flow</span></h1>
          <p className="text-slate-400 font-semibold text-sm mb-8">Grade {grade} · Day {ledger.day}</p>

          {ledger.savedPhase ? (
            <div className="flex items-center gap-2 bg-indigo-900/50 text-indigo-300 px-5 py-3 rounded-2xl text-sm font-black tracking-widest uppercase border border-indigo-700/50 mb-8">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Resuming {ledger.savedPhase} Phase
            </div>
          ) : (
            <div className="bg-slate-800/50 text-slate-300 px-6 py-3 rounded-2xl text-sm font-bold tracking-wide border border-slate-700/50 mb-8">
              Ready for today's session
            </div>
          )}

          <button
            onClick={() => setPhase(nextPhaseAfterReady)}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-2xl py-5 rounded-[1.5rem] shadow-[0_10px_40px_rgba(99,102,241,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            <span>{ledger.savedPhase ? "Continue" : "Start"}</span>
            <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  const isFirstDay = Object.keys(ledger.skills).length === 0;

  // Determine if input is blocked (just answered correctly or showing final explanation)
  const inputBlocked = feedback === "correct" || feedback === "wrong_final";

  return (
    // IMPROVEMENT #3: Premium dark themed background
    <div className="flex flex-col min-h-screen bg-[#0a0f1e] relative pb-28 overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 z-10 flex flex-col items-center justify-center pt-2 pb-0">
        <MathPhaseBar phase={phase} isTestDay={dayConfig?.isTestDay} isFirstDay={isFirstDay} />
        {/* Progress dots */}
        {phase !== "teaching" && phase !== "ready" && phase !== "booting" && queue.length > 0 && (
          <div className="flex justify-center gap-1.5 py-3">
            {queue.map((_, i) => (
              <div key={i} className={`rounded-full transition-all ${
                i < currentIndex ? "w-2 h-2 bg-indigo-400/60 scale-90"
                : i === currentIndex ? "w-3 h-3 bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.7)]"
                : "w-2 h-2 bg-slate-700"
              }`} />
            ))}
          </div>
        )}
        {(phase === "teaching" || phase === "ready" || phase === "booting") && <div className="py-3" />}
      </header>

      {/* IMPROVEMENT #2: Floating streak meter */}
      <div className="absolute top-20 right-4 z-20 flex flex-col items-end gap-2">
        <StreakMeter streak={streak} />
        {showCombo && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg animate-bounce">
            COMBO x{streak}! 🎯
          </div>
        )}
      </div>

      {/* IMPROVEMENT #4: Improved Wrong Answer Explanation Panel */}
      {explanationSteps && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 backdrop-blur-sm px-4 pb-6">
          <div className="bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-lg border border-rose-900/50 overflow-hidden animate-[slideUp_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-rose-900/60 to-slate-900 px-8 pt-8 pb-4 flex items-center gap-4 border-b border-rose-900/30">
              <div className="bg-rose-900/50 p-3 rounded-full border border-rose-800/50">
                <Volume2 className="w-7 h-7 text-rose-400 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">Let me explain</p>
                <h3 className="text-xl font-black text-white">Here's how to solve it</h3>
              </div>
            </div>
            {/* Original equation for reference */}
            <div className="px-8 pt-5 pb-2">
              <div className="bg-slate-800/80 rounded-2xl px-6 py-3 text-center text-slate-300 font-black text-2xl border border-slate-700/50 mb-4">
                {queue[currentIndex]?.equation}
              </div>
              <div className="space-y-3">
                {explanationSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="bg-indigo-900/50 text-indigo-300 font-black text-sm w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-800/50">{i + 1}</span>
                    <p className="text-base font-semibold text-slate-300 leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-8 pb-8 pt-4">
              <button
                onClick={dismissExplanation}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xl py-4 rounded-2xl shadow-lg shadow-indigo-900/50 active:scale-95 transition-all"
              >
                Got it — Next Question →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 py-6 relative z-10">

        {phase === "teaching" ? (
          // IMPROVEMENT #3: Premium teaching card
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2rem] shadow-2xl p-10 w-full text-center border border-slate-700/50 flex flex-col items-center">
            <div className="bg-indigo-900/40 border border-indigo-700/30 text-indigo-300 p-4 rounded-full mb-6 animate-pulse">
              <Volume2 className="w-10 h-10" />
            </div>
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Listen carefully...</p>
            <h2 className="text-4xl font-black text-white mb-8 leading-tight">{dayConfig.teachingVisual}</h2>
            <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl">
              {dayConfig.teachingScript}
            </p>
            <button
              onClick={skipTeaching}
              className="mt-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xl py-4 px-10 rounded-full shadow-lg shadow-indigo-900/50 transition-transform active:scale-95 flex items-center gap-3"
            >
              <ArrowRight className="w-6 h-6" /> I'm Ready — Let's Practice!
            </button>
          </div>

        ) : phase === "quiz_intro" ? (
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2rem] shadow-2xl p-10 w-full max-w-lg text-center border border-slate-700/50 flex flex-col items-center">
            <div className="bg-indigo-900/40 border border-indigo-700/30 text-indigo-300 p-4 rounded-full mb-6">
              <Medal className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Quiz Time!</h2>
            <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10">
              You've got this. Take your time and remember what you just learned.
            </p>
            <button
              onClick={advanceNext}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 text-white font-black text-2xl py-5 rounded-[1.5rem] shadow-lg shadow-indigo-900/50 transition-transform active:scale-95 flex items-center justify-center gap-3"
            >
              Start Quiz <ArrowRight className="w-7 h-7" />
            </button>
          </div>

        ) : phase === "quiz_results" ? (
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2rem] shadow-2xl p-10 w-full max-w-lg text-center border border-slate-700/50 flex flex-col items-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
              <div className="relative bg-emerald-900/40 border border-emerald-700/30 text-emerald-300 p-6 rounded-full">
                <CheckCircle className="w-16 h-16" />
              </div>
            </div>
            <h2 className="text-4xl font-black text-white mb-2">Quiz Complete!</h2>
            <div className="text-7xl font-black my-8 bg-clip-text text-transparent bg-gradient-to-br from-emerald-400 to-indigo-400">
              {Math.max(0, Math.round(((queue.length - quizMistakes) / Math.max(1, queue.length)) * 100))}%
            </div>
            <p className="text-base text-slate-400 font-medium mb-10">
              Great job completing today's math module!
            </p>
            <button
              onClick={advanceNext}
              className="w-full bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 text-white font-black text-2xl py-5 rounded-[1.5rem] shadow-lg shadow-emerald-900/50 transition-transform active:scale-95 flex items-center justify-center gap-3"
            >
              Finish Day <ArrowRight className="w-7 h-7" />
            </button>
          </div>

        ) : (
          // ── IMPROVEMENT #3: Premium Question Mode ──────────────────────────
          <div className="w-full max-w-md flex flex-col items-center gap-6">

            {/* Equation display card */}
            <div className={`relative bg-slate-900/90 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 w-full border-2 text-center overflow-hidden transition-all duration-300 ${
              feedback === "correct" ? "border-emerald-500/60 shadow-emerald-900/40"
              : feedback === "wrong_first" ? "border-amber-500/60 shadow-amber-900/40"
              : feedback === "wrong_final" ? "border-rose-500/60 shadow-rose-900/40"
              : "border-slate-700/50"
            }`}>
              {/* Problem */}
              <h2 className={`font-black text-white mb-4 drop-shadow-sm ${queue[currentIndex]?.equation?.length > 30 ? "text-xl" : "text-5xl"}`}>
                {queue[currentIndex]?.equation.replace("?", "")}
                <span className={`inline-block min-w-16 h-14 border-b-4 ml-2 transition-colors ${
                  feedback === "correct" ? "text-emerald-400 border-emerald-500"
                  : feedback === "wrong_first" ? "text-amber-400 border-amber-500"
                  : feedback === "wrong_final" ? "text-rose-400 border-rose-500"
                  : "text-indigo-400 border-indigo-500/60"
                }`}>
                  {userInput || "\u00A0"}
                </span>
              </h2>

              {/* Geometry visual */}
              {queue[currentIndex]?.visualData && (
                <GeometryCanvas visualData={queue[currentIndex].visualData} />
              )}

              {/* Skill tag */}
              <div className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-4">
                {queue[currentIndex]?.skillTag.replace(/_/g, " ")}
              </div>

              {/* IMPROVEMENT #4: Inline "Try Again" feedback (first miss) */}
              {feedback === "wrong_first" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-950/80 backdrop-blur-sm rounded-[2rem]">
                  <div className="text-5xl mb-2">🤔</div>
                  <p className="font-black text-amber-300 text-2xl">Not quite!</p>
                  <p className="text-amber-400/80 text-base mt-1">Give it another try...</p>
                </div>
              )}

              {/* Correct overlay */}
              {feedback === "correct" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950/80 backdrop-blur-sm rounded-[2rem]">
                  <div className="text-5xl mb-2 animate-bounce">🎉</div>
                  <p className="font-black text-emerald-300 text-3xl">Correct!</p>
                  {streak > 2 && <p className="text-emerald-400/80 text-sm mt-1">{streak} in a row!</p>}
                </div>
              )}
            </div>

            {/* IMPROVEMENT #1: Grade-aware expanded numpad */}
            {!inputBlocked && feedback !== "wrong_first" && (
              <NumPad
                grade={grade}
                disabled={inputBlocked}
                onDigit={(d) => {
                  if (d === "-" && userInput.length > 0) return;
                  if (d === "." && userInput.includes(".")) return;
                  setUserInput(prev => prev + d);
                }}
                onDelete={() => setUserInput(prev => prev.slice(0, -1))}
                onSubmit={submitAnswer}
              />
            )}

            {/* When feedback is "wrong_first", show a "Try Again" numpad state */}
            {feedback === "wrong_first" && (
              <button
                onClick={() => setFeedback(null)}
                className="w-full py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-xl rounded-2xl shadow-lg shadow-amber-900/40 active:scale-95 transition-all"
              >
                Try Again →
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
