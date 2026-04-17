"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Volume2, ChevronRight, ChevronLeft, Check, X, RotateCcw, ArrowRight, BookOpen, Pencil, Trophy } from "lucide-react";
import { getSpellingContent } from "./content";

// ─── Seeded Fisher-Yates shuffle ───────────────────────────────────────────────
// Same grade+attempt always picks the same word set; different attempt = different set.
function seededShuffle(arr, seed) {
  let s = (seed * 2654435761) >>> 0;
  const rng = () => {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Letter-by-letter comparison ───────────────────────────────────────────────
// Returns an array aligned to the TARGET word length.
// Each slot: { target, typed, correct }
// Extra typed chars beyond target length appear as extra wrong slots.
function compareLetters(typed, target) {
  const t = target.toLowerCase().trim();
  const s = typed.toLowerCase().trim();
  const maxLen = Math.max(t.length, s.length);
  return Array.from({ length: maxLen }, (_, i) => ({
    target: t[i] ?? "",
    typed: s[i] ?? "",
    correct: s[i] !== undefined && s[i] === t[i],
  }));
}

// ─── LetterBoxes component ──────────────────────────────────────────────────────
function LetterBoxes({ typed, target }) {
  const slots = compareLetters(typed, target);
  return (
    <div className="flex flex-wrap justify-center gap-1.5 my-4">
      {slots.map((slot, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          {/* The typed letter */}
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 flex items-center justify-center text-lg font-black uppercase transition-all ${
              slot.typed === ""
                ? "border-rose-400 bg-rose-900/20 text-rose-400"
                : slot.correct
                ? "border-emerald-400 bg-emerald-900/30 text-emerald-300"
                : "border-rose-400 bg-rose-900/30 text-rose-300"
            }`}
          >
            {slot.typed || "·"}
          </div>
          {/* Show correct letter below wrong slots */}
          {!slot.correct && slot.target && (
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">
              {slot.target}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Phase indicator ───────────────────────────────────────────────────────────
function PhaseBar({ phase }) {
  const phases = [
    { id: "study",    label: "Study",    icon: BookOpen },
    { id: "practice", label: "Practice", icon: Pencil },
    { id: "final",    label: "Final Test", icon: Trophy },
  ];
  const idx = phases.findIndex(p => p.id === phase);
  return (
    <div className="flex items-center justify-center gap-2 pt-4 pb-2 shrink-0">
      {phases.map((p, i) => {
        const Icon = p.icon;
        const active = p.id === phase;
        const done = i < idx;
        return (
          <div key={p.id} className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" :
              done ? "bg-emerald-800/40 text-emerald-400 border border-emerald-700/40" :
              "bg-slate-800 text-slate-500"
            }`}>
              <Icon className="w-3 h-3" /> {p.label}
            </div>
            {i < phases.length - 1 && (
              <div className={`w-6 h-px ${done ? "bg-emerald-600" : "bg-slate-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Module ───────────────────────────────────────────────────────────────
export default function SpellingModule({ grade, attempt, onRoundComplete, voiceId }) {
  const { pool, roundSize } = getSpellingContent(grade);

  // Pick this session's words — seeded so retry = fresh set, same attempt = same set
  const sessionWords = useMemo(() => {
    const seed = grade * 1000 + attempt * 97;
    return seededShuffle(pool, seed).slice(0, roundSize);
  }, [pool, roundSize, grade, attempt]);

  // ── State ──────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState("study"); // "study" | "practice" | "final" | "review"
  const [cardIdx, setCardIdx] = useState(0);
  const [seenSet, setSeenSet] = useState(new Set([0]));

  // Shared input state for practice + final phases
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [letterResult, setLetterResult] = useState(null); // { slots, isCorrect }
  const [practiceAttempts, setPracticeAttempts] = useState({}); // idx → attempt count
  const [testResults, setTestResults] = useState([]); // [{word, typed, correct}]
  const [isPlaying, setIsPlaying] = useState(false);

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
    } catch {
      setIsPlaying(false);
    }
  }, [voiceId]);

  // ── Auto-play when phase/card changes ─────────────────────────────────────
  useEffect(() => {
    const w = sessionWords[cardIdx];
    if (!w) return;
    let text = "";
    if (phase === "study") {
      text = `The word is ${w.word}. ${w.word}. ${w.hint}. ${w.sentence}`;
    } else if (phase === "practice") {
      text = `Practice word ${cardIdx + 1}. The word is ${w.word}. ${w.word}. ${w.hint}.`;
    } else if (phase === "final") {
      text = `Test word ${cardIdx + 1} of ${sessionWords.length}. The word is ${w.word}. ${w.word}. ${w.hint}.`;
    }
    if (text) {
      const t = setTimeout(() => speak(text), 400);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardIdx, phase]);

  // ── Auto-focus input in typing phases ─────────────────────────────────────
  useEffect(() => {
    if ((phase === "practice" || phase === "final") && !submitted) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [phase, cardIdx, submitted]);

  // ── Navigation helpers ─────────────────────────────────────────────────────
  const allSeen = seenSet.size >= sessionWords.length;

  const goStudyNext = () => {
    const next = cardIdx + 1;
    if (next < sessionWords.length) {
      setCardIdx(next);
      setSeenSet(prev => new Set([...prev, next]));
    }
  };

  const goStudyPrev = () => {
    if (cardIdx > 0) setCardIdx(cardIdx - 1);
  };

  const startPractice = () => {
    setPhase("practice");
    setCardIdx(0);
    setAnswer(""); setSubmitted(false); setLetterResult(null);
  };

  const startFinal = () => {
    setPhase("final");
    setCardIdx(0);
    setTestResults([]);
    setAnswer(""); setSubmitted(false); setLetterResult(null);
  };

  // ── Submit (shared for practice + final) ──────────────────────────────────
  const handleSubmit = () => {
    if (!answer.trim() || submitted) return;
    const w = sessionWords[cardIdx];
    const target = w.word.toLowerCase().trim();
    const typed = answer.toLowerCase().trim();
    const isCorrect = typed === target;
    const slots = compareLetters(typed, target);
    setLetterResult({ slots, typed, isCorrect });
    setSubmitted(true);
    if (phase === "final") {
      setTestResults(prev => [...prev, { ...w, typed, correct: isCorrect }]);
    }
    if (phase === "practice") {
      setPracticeAttempts(prev => ({ ...prev, [cardIdx]: (prev[cardIdx] || 0) + 1 }));
    }
    if (isCorrect) {
      // Play a short celebration sound / congrats
      speak(`Correct! ${w.word}.`);
    }
  };

  // ── Retry (practice only) ─────────────────────────────────────────────────
  const handleRetry = () => {
    setAnswer("");
    setSubmitted(false);
    setLetterResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // ── Advance to next word ──────────────────────────────────────────────────
  const handleNext = () => {
    setAnswer(""); setSubmitted(false); setLetterResult(null);
    if (cardIdx < sessionWords.length - 1) {
      setCardIdx(i => i + 1);
    } else {
      // End of this phase
      if (phase === "practice") {
        setPhase("review_practice");
      } else if (phase === "final") {
        setPhase("review");
      }
    }
  };

  // Key handler for typing phases
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!submitted) handleSubmit();
      else if (submitted && letterResult?.isCorrect) handleNext();
    }
  };

  // ── Score computation ──────────────────────────────────────────────────────
  const finalScore = useMemo(() => {
    if (testResults.length === 0) return 0;
    const correct = testResults.filter(r => r.correct).length;
    return Math.round((correct / sessionWords.length) * 100);
  }, [testResults, sessionWords.length]);

  const missedWords = testResults.filter(r => !r.correct);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: STUDY PHASE
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === "study") {
    const w = sessionWords[cardIdx];
    const isLast = cardIdx === sessionWords.length - 1;

    return (
      <div className="flex flex-col h-full min-h-full">
        <PhaseBar phase="study" />

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 py-3">
          {sessionWords.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCardIdx(i); setSeenSet(prev => new Set([...prev, i])); }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === cardIdx ? "bg-indigo-400 scale-125" :
                seenSet.has(i) ? "bg-slate-500" : "bg-slate-700"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
          <div className="w-full max-w-xl bg-slate-800/60 border border-slate-700/60 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl">
            {/* Word number */}
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center mb-4">
              Word {cardIdx + 1} of {sessionWords.length}
            </p>

            {/* The Word */}
            <h2 className="text-5xl sm:text-6xl font-black text-white text-center tracking-tight mb-2">
              {w.word}
            </h2>

            {/* Pronunciation dots */}
            <div className="flex justify-center gap-1 mb-6">
              {w.word.split("").map((ch, i) => (
                <span key={i} className="text-xs text-slate-500 uppercase tracking-wider font-mono">
                  {ch}
                </span>
              ))}
            </div>

            {/* Definition */}
            <div className="bg-slate-900/60 rounded-2xl px-6 py-4 mb-4 border border-slate-700/40">
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-1">Definition</p>
              <p className="text-slate-200 font-semibold text-lg">{w.hint}</p>
            </div>

            {/* Sentence */}
            {w.sentence && (
              <div className="bg-slate-900/40 rounded-2xl px-6 py-4 border border-slate-700/30">
                <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mb-1">In a sentence</p>
                <p className="text-slate-300 italic text-base">&ldquo;{w.sentence}&rdquo;</p>
              </div>
            )}

            {/* Hear it button */}
            <button
              onClick={() => speak(`The word is ${w.word}. ${w.word}. ${w.hint}. ${w.sentence}`)}
              disabled={isPlaying}
              className={`mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                isPlaying
                  ? "bg-indigo-900/40 text-indigo-400 border border-indigo-700/40 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5"
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
              {isPlaying ? "Listening…" : "Hear it again"}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 pb-6 gap-4 shrink-0">
          <button
            onClick={goStudyPrev}
            disabled={cardIdx === 0}
            className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 rounded-xl font-bold text-sm transition-all border border-slate-700"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {isLast || allSeen ? (
            <button
              onClick={startPractice}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5"
            >
              <Pencil className="w-4 h-4" /> Start Practice
            </button>
          ) : (
            <button
              onClick={goStudyNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: PRACTICE-COMPLETE intermission (all words practiced)
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === "review_practice") {
    const totalAttempts = Object.values(practiceAttempts).reduce((a, b) => a + b, 0);
    return (
      <div className="flex flex-col items-center justify-center min-h-full py-16 px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(52,211,153,0.3)]">
          <Check className="w-12 h-12 text-emerald-400" />
        </div>
        <h2 className="text-4xl font-black text-white mb-3">Practice Complete!</h2>
        <p className="text-slate-400 text-lg mb-2">You practiced all {sessionWords.length} words.</p>
        <p className="text-slate-500 text-sm mb-10">
          You made {totalAttempts} total attempt{totalAttempts !== 1 ? "s" : ""} across all words.
        </p>
        <button
          onClick={startFinal}
          className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-lg shadow-indigo-600/30 hover:-translate-y-1 transition-all"
        >
          <Trophy className="w-6 h-6" /> Take Final Test
        </button>
        <p className="text-slate-600 text-xs mt-4">This is where your score counts.</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: PRACTICE PHASE + FINAL TEST PHASE (shared typing UI)
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === "practice" || phase === "final") {
    const w = sessionWords[cardIdx];
    const isPractice = phase === "practice";
    const attemptsThisWord = practiceAttempts[cardIdx] || 0;

    return (
      <div className="flex flex-col h-full min-h-full">
        <PhaseBar phase={phase} />

        {/* Progress */}
        <div className="flex justify-center gap-1.5 py-3">
          {sessionWords.map((_, i) => {
            const isDone = isPractice ? practiceAttempts[i] > 0 : i < testResults.length;
            const isCurrent = i === cardIdx;
            return (
              <div key={i} className={`h-1.5 flex-1 max-w-[40px] rounded-full transition-all ${
                isCurrent ? "bg-indigo-400" :
                isDone ? "bg-emerald-500" : "bg-slate-700"
              }`} />
            );
          })}
        </div>

        {/* Word number + hear again */}
        <div className="flex items-center justify-between px-6 pt-2 pb-1">
          <p className="text-slate-500 text-sm font-bold">
            {isPractice ? "Practice" : "Test"} — Word {cardIdx + 1} of {sessionWords.length}
          </p>
          {isPractice && attemptsThisWord > 0 && (
            <span className="text-xs text-amber-400 font-bold bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-700/30">
              Attempt #{attemptsThisWord + 1}
            </span>
          )}
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
          <div className="w-full max-w-lg">
            {/* Hear button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => speak(
                  isPractice
                    ? `Practice word ${cardIdx + 1}. The word is ${w.word}. ${w.word}. ${w.hint}.`
                    : `Test word ${cardIdx + 1}. The word is ${w.word}. ${w.word}. ${w.hint}.`
                )}
                disabled={isPlaying}
                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1.5 shadow-xl transition-all border-4 ${
                  isPlaying
                    ? "bg-indigo-900/50 border-indigo-500/50 text-indigo-400 animate-pulse scale-110"
                    : "bg-indigo-600 border-indigo-400/30 text-white hover:bg-indigo-500 hover:scale-105 shadow-indigo-600/40"
                }`}
              >
                <Volume2 className="w-8 h-8" />
                <span className="text-xs font-bold">{isPlaying ? "Playing…" : "Hear it"}</span>
              </button>
            </div>

            {/* Input or letter result */}
            {!submitted ? (
              <div className="space-y-3">
                <label className="block text-center text-slate-400 text-sm font-semibold">
                  Type the word you hear, then press <kbd className="bg-slate-700 px-1.5 py-0.5 rounded text-xs">Enter</kbd>
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="w-full text-center text-3xl font-black bg-slate-800 border-2 border-slate-600 focus:border-indigo-500 text-white rounded-2xl px-6 py-4 outline-none transition-colors tracking-widest placeholder:text-slate-600 placeholder:font-normal placeholder:text-lg placeholder:tracking-normal"
                  placeholder="Type your answer…"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-all text-sm"
                >
                  Submit →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Letter boxes */}
                <p className="text-center text-slate-400 text-sm font-semibold">
                  {letterResult.isCorrect ? "✅ Correct!" : "Let's see where you went:"}
                </p>
                <LetterBoxes typed={letterResult.typed} target={w.word} />

                {letterResult.isCorrect ? (
                  /* Correct — show next button */
                  <button
                    onClick={handleNext}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {cardIdx < sessionWords.length - 1 ? (
                      <><ArrowRight className="w-4 h-4" /> Next Word</>
                    ) : (
                      <><Check className="w-4 h-4" /> {isPractice ? "Finish Practice" : "See Results"}</>
                    )}
                  </button>
                ) : (
                  /* Wrong — show retry (practice) or next (final) */
                  <div className="space-y-2">
                    {isPractice && (
                      <>
                        <p className="text-center text-rose-400 text-sm font-semibold">
                          The correct spelling is <span className="text-white font-black tracking-wider">{w.word}</span>
                        </p>
                        <button
                          onClick={handleRetry}
                          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <RotateCcw className="w-4 h-4" /> Try Again
                        </button>
                      </>
                    )}
                    {!isPractice && (
                      <>
                        <p className="text-center text-rose-400 text-sm font-semibold">
                          Correct spelling: <span className="text-white font-black tracking-wider">{w.word}</span>
                        </p>
                        <button
                          onClick={handleNext}
                          className="w-full py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                          {cardIdx < sessionWords.length - 1 ? "Next Word" : "See Results"}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hint strip (practice only, optional peek) */}
        {isPractice && !submitted && (
          <div className="px-6 pb-4 text-center">
            <p className="text-slate-600 text-xs italic">{w.hint}</p>
          </div>
        )}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: FINAL REVIEW / SCORE
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === "review") {
    return (
      <div className="flex flex-col min-h-full px-6 py-10 max-w-xl mx-auto w-full">
        {/* Score ring */}
        <div className="flex flex-col items-center mb-8">
          <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-[6px] mb-4 shadow-xl ${
            finalScore >= 80
              ? "border-emerald-400 bg-emerald-900/20 shadow-emerald-500/20"
              : finalScore >= 60
              ? "border-amber-400 bg-amber-900/20 shadow-amber-500/20"
              : "border-rose-400 bg-rose-900/20 shadow-rose-500/20"
          }`}>
            <span className={`text-4xl font-black ${finalScore >= 80 ? "text-emerald-400" : finalScore >= 60 ? "text-amber-400" : "text-rose-400"}`}>
              {finalScore}%
            </span>
            <span className="text-slate-500 text-xs font-semibold">Score</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            {finalScore >= 80 ? "Great job! 🎉" : finalScore >= 60 ? "Good effort! 💪" : "Keep practicing! 📖"}
          </h2>
          <p className="text-slate-400 mt-1">
            {testResults.filter(r => r.correct).length} of {sessionWords.length} words correct
          </p>
        </div>

        {/* Missed words */}
        {missedWords.length > 0 && (
          <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 p-5 mb-6">
            <p className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-3">Words to practice more</p>
            <div className="space-y-2">
              {missedWords.map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-white font-black tracking-wide">{r.word}</span>
                  <span className="text-rose-400 text-sm font-mono">you typed: <span className="text-slate-400">{r.typed || "(blank)"}</span></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All correct! */}
        {missedWords.length === 0 && (
          <div className="bg-emerald-900/20 rounded-2xl border border-emerald-700/30 p-5 mb-6 text-center">
            <p className="text-emerald-400 font-bold">🏆 Perfect score! Every word correct!</p>
          </div>
        )}

        {/* Fire the result */}
        <button
          onClick={() => onRoundComplete({
            score: finalScore,
            totalItems: sessionWords.length,
            correctItems: testResults.filter(r => r.correct).length,
            accuracy: finalScore / 100,
            metadata: {
              wordsCorrect: testResults.filter(r => r.correct).map(r => r.word),
              wordsMissed: missedWords.map(r => ({ word: r.word, typed: r.typed })),
            },
          })}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all hover:-translate-y-1 ${
            finalScore >= 80
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
          }`}
        >
          {finalScore >= 80 ? "Complete! ✓" : "Submit Score & Retry"}
        </button>
      </div>
    );
  }

  return null;
}
