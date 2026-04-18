"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Volume2, ChevronRight, ChevronLeft, Check, RotateCcw,
  ArrowRight, BookOpen, Pencil, Trophy, Loader2, FileText, CheckCircle2
} from "lucide-react";
import { getSpellingContent } from "./content";
import StreakMeter from "@/modules/_shared/StreakMeter";

// ─── Deterministic shuffle (same order all day; different each new day) ──────
function dayShuffle(arr) {
  const dateStr = new Date().toDateString();
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) seed = (seed * 31 + dateStr.charCodeAt(i)) >>> 0;
  const rng = () => { seed ^= seed << 13; seed ^= seed >> 17; seed ^= seed << 5; return (seed >>> 0) / 4294967296; };
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// ─── Letter comparison ────────────────────────────────────────────────────────
function compareLetters(typed, target) {
  const t = target.toLowerCase().trim(), s = typed.toLowerCase().trim();
  const maxLen = Math.max(t.length, s.length);
  return Array.from({ length: maxLen }, (_, i) => ({
    target: t[i] ?? "", typed: s[i] ?? "", correct: s[i] !== undefined && s[i] === t[i],
  }));
}

// ─── Cloze sentence (replace the word with underscores matching length) ───────
function makeCloze(sentence, word) {
  const blank = Array.from({ length: word.length }, () => "_").join(" ");
  return sentence.replace(new RegExp(`\\b${word}\\b`, "gi"), `【${blank}】`);
}

// ─── LetterBoxes UI ───────────────────────────────────────────────────────────
function LetterBoxes({ typed, target }) {
  const slots = compareLetters(typed, target);
  return (
    <div className="flex flex-wrap justify-center gap-1.5 my-4">
      {slots.map((slot, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 flex items-center justify-center text-lg font-black uppercase
            ${slot.typed === "" ? "border-rose-400 bg-rose-900/20 text-rose-400"
              : slot.correct ? "border-emerald-400 bg-emerald-900/30 text-emerald-300"
              : "border-rose-400 bg-rose-900/30 text-rose-300"}`}>
            {slot.typed || "·"}
          </div>
          {!slot.correct && slot.target && (
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">{slot.target}</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Phase progress bar (grade-aware) ─────────────────────────────────────────
function PhaseBar({ phase, grade }) {
  const hasSentence = Number(grade) >= 3;
  const allPhases = [
    { id: "study",    label: "Study",      icon: BookOpen },
    { id: "practice", label: "Practice",   icon: Pencil },
    ...(hasSentence ? [{ id: "sentence", label: "Sentences", icon: FileText }] : []),
    { id: "final",    label: "Final Test", icon: Trophy },
  ];
  const idx = allPhases.findIndex(p => p.id === phase);
  return (
    <div className="flex items-center justify-center gap-2 pt-4 pb-2 shrink-0 flex-wrap">
      {allPhases.map((p, i) => {
        const Icon = p.icon;
        const active = p.id === phase, done = i < idx;
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

// ─── Main Module ─────────────────────────────────────────────────────────────
export default function SpellingModule({ grade, attempt, onRoundComplete, voiceId, profileId }) {
  const { pool, roundSize } = getSpellingContent(grade);
  const hasSentence = Number(grade) >= 3;

  // ── Mastery set index ──────────────────────────────────────────────────────
  const [setIndex, setSetIndex]   = useState(null);
  const [lastScore, setLastScore] = useState(null);

  useEffect(() => {
    if (!profileId) { setSetIndex(0); return; }
    fetch(`/api/spelling-progress?profileId=${profileId}`)
      .then(r => r.json())
      .then(d => { setSetIndex(d.setIndex ?? 0); setLastScore(d.lastScore); })
      .catch(() => setSetIndex(0));
  }, [profileId]);

  // ── Session word set (same set all day; same set until mastery) ──────────
  const sessionWords = useMemo(() => {
    if (setIndex === null) return [];
    const totalSets = Math.ceil(pool.length / roundSize);
    const effectiveIdx = setIndex % totalSets;
    const start = effectiveIdx * roundSize;
    let raw = pool.slice(start, start + roundSize);
    if (raw.length < roundSize) raw = [...raw, ...pool.slice(0, roundSize - raw.length)];
    return dayShuffle(raw);
  }, [pool, roundSize, setIndex]);

  // ── Core state ─────────────────────────────────────────────────────────────
  const [phase, setPhase]              = useState("study");
  const [cardIdx, setCardIdx]          = useState(0);
  const [seenSet, setSeenSet]          = useState(new Set([0]));
  const [answer, setAnswer]            = useState("");
  const [submitted, setSubmitted]      = useState(false);
  const [letterResult, setLetterResult] = useState(null);
  const [practiceAttempts, setPracticeAttempts] = useState({});
  const [sentenceAttempts, setSentenceAttempts] = useState({});
  const [testResults, setTestResults]  = useState([]);
  const [isPlaying, setIsPlaying]      = useState(false);
  const [streak, setStreak]            = useState(0);
  const [showCombo, setShowCombo]      = useState(false);

  const inputRef = useRef(null);
  const audioRef = useRef(null);

  // ── TTS ───────────────────────────────────────────────────────────────────
  const speak = useCallback(async (text) => {
    if (!voiceId) return;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setIsPlaying(true);
    try {
      const audio = new Audio(`/api/tts?voiceId=${encodeURIComponent(voiceId)}&text=${encodeURIComponent(text)}`);
      audioRef.current = audio;
      audio.play().catch(() => {});
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
    } catch { setIsPlaying(false); }
  }, [voiceId]);

  // ── Auto-play when word/phase changes ─────────────────────────────────────
  useEffect(() => {
    const w = sessionWords[cardIdx];
    if (!w) return;
    let text = "";
    if (phase === "study")    text = `The word is ${w.word}. ${w.hint}. ${w.sentence ?? ""}`;
    // Practice and Final: say "Please spell: WORD" then definition after a brief pause
    if (phase === "practice") text = `Please spell... ${w.word}. ... ${w.hint}.`;
    if (phase === "final")    text = `Please spell... ${w.word}. ... ${w.hint}.`;
    if (phase === "sentence") text = `Fill in the missing word. ${w.sentence ?? w.hint}.`;
    if (text) { const t = setTimeout(() => speak(text), 400); return () => clearTimeout(t); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardIdx, phase, sessionWords]);

  // ── Auto-focus input ──────────────────────────────────────────────────────
  useEffect(() => {
    if (["practice", "final", "sentence"].includes(phase) && !submitted) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [phase, cardIdx, submitted]);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (setIndex === null) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-full gap-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
        <p className="font-semibold text-sm">Loading your word set…</p>
      </div>
    );
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  const allSeen = seenSet.size >= sessionWords.length;
  const goStudyNext = () => { const n = cardIdx + 1; if (n < sessionWords.length) { setCardIdx(n); setSeenSet(s => new Set([...s, n])); } };
  const goStudyPrev = () => { if (cardIdx > 0) setCardIdx(c => c - 1); };

  const clearInput = () => { setAnswer(""); setSubmitted(false); setLetterResult(null); };
  const startPractice    = () => { setPhase("practice");  setCardIdx(0); clearInput(); };
  const startSentence    = () => { setPhase("sentence");  setCardIdx(0); clearInput(); };
  const startFinal       = () => { setPhase("final");     setCardIdx(0); setTestResults([]); clearInput(); };

  const handleSubmit = () => {
    if (!answer.trim() || submitted) return;
    const w = sessionWords[cardIdx];
    const target = w.word.toLowerCase().trim(), typed = answer.toLowerCase().trim();
    const isCorrect = typed === target;
    setLetterResult({ slots: compareLetters(typed, target), typed, isCorrect });
    setSubmitted(true);
    if (phase === "practice") setPracticeAttempts(p => ({ ...p, [cardIdx]: (p[cardIdx] || 0) + 1 }));
    if (phase === "sentence") setSentenceAttempts(p => ({ ...p, [cardIdx]: (p[cardIdx] || 0) + 1 }));
    if (phase === "final")    setTestResults(p => [...p, { ...w, typed, correct: isCorrect }]);
    if (isCorrect) {
      setStreak(s => {
        const next = s + 1;
        if (next === 3 || next % 5 === 0) {
          setShowCombo(true);
          setTimeout(() => setShowCombo(false), 1500);
        }
        return next;
      });
      speak(`Correct! ${w.word}.`);
      // Auto-advance after 1.5s on correct answers
      setTimeout(() => handleNext(), 1500);
    } else {
      setStreak(0);
    }
  };

  const handleRetry = () => { clearInput(); setTimeout(() => inputRef.current?.focus(), 50); };

  const handleNext = () => {
    clearInput();
    if (cardIdx < sessionWords.length - 1) {
      setCardIdx(i => i + 1);
    } else {
      if (phase === "practice") setPhase("review_practice");
      if (phase === "sentence") setPhase("review_sentence");
      if (phase === "final")    setPhase("review");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { if (!submitted) handleSubmit(); else if (letterResult?.isCorrect) handleNext(); }
  };

  const PASS = 80;
  const finalScore  = testResults.length ? Math.round(testResults.filter(r => r.correct).length / sessionWords.length * 100) : 0;
  const passed      = finalScore >= PASS;
  const missedWords = testResults.filter(r => !r.correct);

  // ═══════════════════════════════════════════════════════════════════════════
  // STUDY
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "study") {
    const w = sessionWords[cardIdx];
    return (
      <div className="flex flex-col h-full min-h-full">
        <PhaseBar phase="study" grade={grade} />
        <div className="flex justify-center gap-1.5 py-3">
          {sessionWords.map((_, i) => (
            <button key={i} onClick={() => { setCardIdx(i); setSeenSet(s => new Set([...s, i])); }}
              className={`w-2 h-2 rounded-full transition-all ${i === cardIdx ? "bg-indigo-400 scale-125" : seenSet.has(i) ? "bg-slate-500" : "bg-slate-700"}`} />
          ))}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
          <div className="w-full max-w-xl bg-slate-800/60 border border-slate-700/60 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center mb-4">
              Word {cardIdx + 1} of {sessionWords.length} · Set {(setIndex ?? 0) + 1}
            </p>
            <h2 className="text-5xl sm:text-6xl font-black text-white text-center tracking-tight mb-2">{w.word}</h2>
            <div className="flex justify-center gap-1 mb-6">
              {w.word.split("").map((ch, i) => <span key={i} className="text-xs text-slate-500 font-mono uppercase">{ch}</span>)}
            </div>
            <div className="bg-slate-900/60 rounded-2xl px-6 py-4 mb-4 border border-slate-700/40">
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-1">Definition</p>
              <p className="text-slate-200 font-semibold text-lg">{w.hint}</p>
            </div>
            {w.sentence && (
              <div className="bg-slate-900/40 rounded-2xl px-6 py-4 border border-slate-700/30">
                <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mb-1">In a sentence</p>
                <p className="text-slate-300 italic text-base">&ldquo;{w.sentence}&rdquo;</p>
              </div>
            )}
            <button onClick={() => speak(`The word is ${w.word}. ${w.hint}. ${w.sentence ?? ""}`)}
              disabled={isPlaying}
              className={`mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all
                ${isPlaying ? "bg-indigo-900/40 text-indigo-400 border border-indigo-700/40 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5"}`}>
              <Volume2 className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
              {isPlaying ? "Listening…" : "Hear it again"}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 pb-6 gap-4 shrink-0">
          <button onClick={goStudyPrev} disabled={cardIdx === 0}
            className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 rounded-xl font-bold text-sm transition-all border border-slate-700">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {(cardIdx === sessionWords.length - 1 || allSeen) ? (
            <button onClick={startPractice}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5">
              <Pencil className="w-4 h-4" /> Start Practice
            </button>
          ) : (
            <button onClick={goStudyNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRACTICE COMPLETE INTERMISSION
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "review_practice" || phase === "review_sentence") {
    const isReadyForFinal = phase === "review_sentence" || !hasSentence;
    return (
      <div className="flex flex-col items-center justify-center min-h-full py-16 px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(52,211,153,0.3)]">
          <Check className="w-12 h-12 text-emerald-400" />
        </div>
        <h2 className="text-4xl font-black text-white mb-3">Practice Complete!</h2>
        <p className="text-slate-400 text-lg mb-2">You practiced all {sessionWords.length} words.</p>
        <p className="text-slate-500 text-sm mb-10">
          {!isReadyForFinal
            ? "Now let's see the words in sentences — fill in the blanks!"
            : "Now it's time for the real test. This one counts."}
        </p>
        <button onClick={!isReadyForFinal ? startSentence : startFinal}
          className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-lg shadow-indigo-600/30 hover:-translate-y-1 transition-all">
          {!isReadyForFinal ? <><FileText className="w-6 h-6" /> Sentence Practice</> : <><Trophy className="w-6 h-6" /> Begin Final Test</>}
        </button>
        <p className="text-slate-600 text-xs mt-4">
          {!isReadyForFinal ? "Fill in the blanks using context clues." : "You need 80% or above to master this word set."}
        </p>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SENTENCE COMPLETION PHASE (Grade 3+ only)
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "sentence") {
    const w = sessionWords[cardIdx];
    const cloze       = makeCloze(w.sentence || w.hint, w.word);
    const attemptsHere = sentenceAttempts[cardIdx] || 0;

    return (
      <div className="flex flex-col h-full min-h-full relative overflow-x-hidden">
        <StreakMeter streak={streak} showCombo={showCombo} />
        <PhaseBar phase="sentence" grade={grade} />
        <div className="flex justify-center gap-1 py-3 px-6">
          {sessionWords.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all
              ${i === cardIdx ? "bg-amber-400" : sentenceAttempts[i] > 0 ? "bg-emerald-500" : "bg-slate-700"}`} />
          ))}
        </div>

        <div className="flex items-center justify-between px-6 pt-1 pb-1">
          <p className="text-slate-500 text-sm font-bold">Sentence Practice — {cardIdx + 1} / {sessionWords.length}</p>
          <span className="text-xs text-amber-400 font-semibold">Read the sentence · Fill the blank</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-6">
          <div className="w-full max-w-lg space-y-6">
            {/* Cloze sentence display */}
            <div className="bg-slate-800/60 border border-amber-500/20 rounded-2xl p-6">
              <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mb-3">Complete the sentence</p>
              <p className="text-xl text-white font-semibold leading-relaxed">
                {cloze.split("【").map((part, i) => {
                  if (i === 0) return <span key={i}>{part}</span>;
                  const [blank, rest] = part.split("】");
                  return (
                    <span key={i}>
                      <span className="bg-amber-500/20 border border-amber-400/40 text-amber-300 font-black px-2 py-0.5 rounded-lg mx-1 tracking-wider text-sm">
                        {blank}
                      </span>
                      {rest}
                    </span>
                  );
                })}
              </p>
              {/* Letter count hint */}
              <p className="text-xs text-slate-600 mt-3">
                {w.word.length} letter{w.word.length !== 1 ? "s" : ""} · Definition: <em className="text-slate-500">{w.hint}</em>
              </p>
            </div>

            {/* Hear button */}
            <div className="flex justify-center">
              <button onClick={() => speak(`Fill in the missing word. ${w.sentence || w.hint}.`)}
                disabled={isPlaying}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border font-bold text-sm transition-all
                  ${isPlaying ? "bg-indigo-900/40 border-indigo-700/40 text-indigo-400 animate-pulse"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"}`}>
                <Volume2 className="w-4 h-4" /> Hear sentence
              </button>
            </div>

            {/* Input or result */}
            {!submitted ? (
              <div className="space-y-3">
                <input ref={inputRef} type="text" value={answer}
                  onChange={e => setAnswer(e.target.value)} onKeyDown={handleKeyDown}
                  autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
                  className="w-full text-center text-3xl font-black bg-slate-800 border-2 border-slate-600 focus:border-amber-400 text-white rounded-2xl px-6 py-4 outline-none transition-colors tracking-widest placeholder:text-slate-600 placeholder:font-normal placeholder:text-lg"
                  placeholder="Type the missing word…" />
                <button onClick={handleSubmit} disabled={!answer.trim()}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-all text-sm">
                  Submit →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-center text-slate-400 text-sm font-semibold flex items-center justify-center gap-2">
                  {letterResult.isCorrect
                    ? <><CheckCircle2 className="w-5 h-5 text-emerald-400" /><span className="text-emerald-400">Correct!</span></>
                    : "Here's what went wrong:"}
                </p>
                <LetterBoxes typed={letterResult.typed} target={w.word} />
                {letterResult.isCorrect ? (
                  <button onClick={handleNext}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                    {cardIdx < sessionWords.length - 1
                      ? <><ArrowRight className="w-4 h-4" /> Next Sentence</>
                      : <><Trophy className="w-6 h-6" /> Begin Final Test</>}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-center text-rose-400 text-sm font-semibold">
                      Correct spelling: <span className="text-white font-black tracking-wider">{w.word}</span>
                    </p>
                    <button onClick={handleRetry}
                      className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                      <RotateCcw className="w-4 h-4" /> Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TYPING PHASE — used by both "practice" and "final"
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "practice" || phase === "final") {
    const w = sessionWords[cardIdx];
    const isPractice = phase === "practice";
    return (
      <div className="flex flex-col h-full min-h-full relative overflow-x-hidden">
        <StreakMeter streak={streak} showCombo={showCombo} />
        <PhaseBar phase={phase} grade={grade} />
        <div className="flex justify-center gap-1 py-3 px-6">
          {sessionWords.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all
              ${i === cardIdx ? "bg-indigo-400" : isPractice ? (practiceAttempts[i] > 0 ? "bg-emerald-500" : "bg-slate-700") : (i < testResults.length ? "bg-emerald-500" : "bg-slate-700")}`} />
          ))}
        </div>
        <div className="flex items-center justify-between px-6 pt-1 pb-1">
          <p className="text-slate-500 text-sm font-bold">
            {isPractice ? "Practice" : "Final Test"} — Word {cardIdx + 1} / {sessionWords.length}
          </p>
          {!isPractice && <span className="text-xs text-rose-400 font-semibold">This is your score 🎯</span>}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
          <div className="w-full max-w-lg">
            <div className="flex justify-center mb-8">
              <button onClick={() => speak(`Please spell... ${w.word}. ... ${w.hint}.`)}
                disabled={isPlaying}
                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1.5 border-4 shadow-xl transition-all
                  ${isPlaying ? "bg-indigo-900/50 border-indigo-500/50 text-indigo-400 animate-pulse scale-110"
                    : "bg-indigo-600 border-indigo-400/30 text-white hover:bg-indigo-500 hover:scale-105 shadow-indigo-600/40"}`}>
                <Volume2 className="w-8 h-8" />
                <span className="text-xs font-bold">{isPlaying ? "Playing…" : "Hear it"}</span>
              </button>
            </div>
            {!submitted ? (
              <div className="space-y-3">
                <label className="block text-center text-slate-400 text-sm font-semibold">
                  Type the word, then press <kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-xs">Enter</kbd>
                </label>
                <input ref={inputRef} type="text" value={answer}
                  onChange={e => setAnswer(e.target.value)} onKeyDown={handleKeyDown}
                  autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
                  className="w-full text-center text-3xl font-black bg-slate-800 border-2 border-slate-600 focus:border-indigo-500 text-white rounded-2xl px-6 py-4 outline-none transition-colors tracking-widest placeholder:text-slate-600 placeholder:font-normal placeholder:text-lg placeholder:tracking-normal"
                  placeholder="Type your answer…" />
                <button onClick={handleSubmit} disabled={!answer.trim()}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-all text-sm">
                  Submit →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-center text-slate-400 text-sm font-semibold flex items-center justify-center gap-2">
                  {letterResult.isCorrect
                    ? <><CheckCircle2 className="w-5 h-5 text-emerald-400" /><span className="text-emerald-400">Correct!</span></>
                    : "Here's what went wrong:"}
                </p>
                <LetterBoxes typed={letterResult.typed} target={w.word} />
                {letterResult.isCorrect ? (
                  <button onClick={handleNext}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                    {cardIdx < sessionWords.length - 1
                      ? <><ArrowRight className="w-4 h-4" /> Next Word</>
                      : <><Check className="w-4 h-4" /> {isPractice ? "Finish Practice" : "See Results"}</>}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-center text-rose-400 text-sm font-semibold">
                      Correct spelling: <span className="text-white font-black tracking-wider">{w.word}</span>
                    </p>
                    {isPractice ? (
                      <button onClick={handleRetry}
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                        <RotateCcw className="w-4 h-4" /> Try Again
                      </button>
                    ) : (
                      <button onClick={handleNext}
                        className="w-full py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                        <ArrowRight className="w-4 h-4" />
                        {cardIdx < sessionWords.length - 1 ? "Next Word" : "See Results"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {isPractice && !submitted && (
          <div className="px-6 pb-4 text-center">
            <p className="text-slate-600 text-xs italic">{w.hint}</p>
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL REVIEW
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "review") {
    return (
      <div className="flex flex-col min-h-full px-6 py-10 max-w-xl mx-auto w-full">
        <div className="flex flex-col items-center mb-8">
          <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-[6px] mb-4 shadow-xl
            ${passed ? "border-emerald-400 bg-emerald-900/20 shadow-emerald-500/20"
              : finalScore >= 60 ? "border-amber-400 bg-amber-900/20 shadow-amber-500/20"
              : "border-rose-400 bg-rose-900/20 shadow-rose-500/20"}`}>
            <span className={`text-4xl font-black ${passed ? "text-emerald-400" : finalScore >= 60 ? "text-amber-400" : "text-rose-400"}`}>
              {finalScore}%
            </span>
            <span className="text-slate-500 text-xs font-semibold">Score</span>
          </div>
          <h2 className="text-3xl font-black text-white text-center">
            {passed ? "Word Set Mastered! 🎉" : "Not quite yet 📖"}
          </h2>
          <p className="text-slate-400 mt-1 text-center">
            {testResults.filter(r => r.correct).length} of {sessionWords.length} correct
          </p>
        </div>

        <div className={`rounded-2xl border p-5 mb-5 text-center ${passed ? "bg-emerald-900/20 border-emerald-700/40" : "bg-slate-800/60 border-slate-700/60"}`}>
          {passed ? (
            <>
              <p className="text-emerald-400 font-bold text-lg mb-1">You&rsquo;ve mastered this word set!</p>
              <p className="text-slate-400 text-sm">Next session will bring a brand new set of words.</p>
            </>
          ) : (
            <>
              <p className="text-amber-400 font-bold text-lg mb-1">You need 80% to master this set.</p>
              <p className="text-slate-400 text-sm">These same words will come back next session. Keep going!</p>
            </>
          )}
        </div>

        {missedWords.length > 0 && (
          <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 p-5 mb-6">
            <p className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-3">Words to review</p>
            <div className="space-y-2">
              {missedWords.map((r, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="text-white font-black tracking-wide">{r.word}</span>
                  <span className="text-slate-500 text-xs font-mono">
                    you typed: <span className="text-rose-400">{r.typed || "(blank)"}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {missedWords.length === 0 && (
          <div className="bg-emerald-900/20 rounded-2xl border border-emerald-700/30 p-4 mb-6 text-center">
            <p className="text-emerald-400 font-bold">🏆 Perfect score — every word correct!</p>
          </div>
        )}

        <button onClick={() => onRoundComplete({
          score: finalScore,
          totalItems: sessionWords.length,
          correctItems: testResults.filter(r => r.correct).length,
          accuracy: finalScore / 100,
          metadata: {
            setIndex,
            passed,
            wordsCorrect: testResults.filter(r => r.correct).map(r => r.word),
            wordsMissed: missedWords.map(r => ({ word: r.word, typed: r.typed })),
          },
        })}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all hover:-translate-y-1
            ${passed ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"}`}>
          {passed ? "Done — Great Work! ✓" : "Done — See You Next Time 📖"}
        </button>
      </div>
    );
  }

  return null;
}
