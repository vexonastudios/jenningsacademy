"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play, Pause, Volume2, BookOpen, ChevronRight, Lightbulb,
  Check, X, Trophy, ChevronLeft, SkipForward, Loader2, Gauge, Type
} from "lucide-react";
import { useSoundEffects } from "@/modules/_shared/useSoundEffects";
import { BOOK_META, CHAPTERS } from "./content/thisCountryOfOurs";

// ─── SRT Parser ────────────────────────────────────────────────────────────────
function parseSRT(raw) {
  const cues = [];
  const blocks = raw.trim().split(/\n\n+/);
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 3) continue;
    const timeLine = lines.find(l => l.includes("-->"));
    if (!timeLine) continue;
    const [startStr, endStr] = timeLine.split("-->").map(s => s.trim());
    const toSec = (t) => {
      // strip XML tags like <break time="1.6s"/>
      const clean = t.replace(/<[^>]*>/g, "").trim();
      const parts = clean.replace(",", ".").split(":");
      if (parts.length !== 3) return 0;
      return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
    };
    const textLines = lines.slice(lines.indexOf(timeLine) + 1);
    const text = textLines
      .join(" ")
      .replace(/<[^>]*>/g, "")   // strip XML tags
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;
    cues.push({ startSec: toSec(startStr), endSec: toSec(endStr), text });
  }
  return cues;
}

// ─── Chapter Cue Filter ─────────────────────────────────────────────────────
function getCuesForChapter(allCues, chapter) {
  return allCues.filter(
    c => c.startSec >= chapter.startSec && c.startSec < chapter.endSec
  );
}

// ─── QuizEngine component ──────────────────────────────────────────────────
function QuizEngine({ chapter, cues, voiceId, onComplete }) {
  const [qIdx, setQIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  
  const { playCorrect, playWrong, playComplete } = useSoundEffects();
  const ttsAudioRef = useRef(null);

  const q = chapter.questions[qIdx];
  const total = chapter.questions.length;

  useEffect(() => {
    if (q.options) {
      const arr = [...q.options];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setShuffledOptions(arr);
    }
  }, [qIdx, q]);

  useEffect(() => {
    // Stop any existing TTS when unmounting or switching questions
    return () => {
      if (ttsAudioRef.current) {
        ttsAudioRef.current.pause();
        ttsAudioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    // Only play TTS when a new question starts (not submitted yet)
    if (q.q && voiceId && !submitted) {
      if (ttsAudioRef.current) {
        ttsAudioRef.current.pause();
      }
      const url = `/api/tts?voiceId=${encodeURIComponent(voiceId)}&text=${encodeURIComponent(q.q)}`;
      const a = new Audio(url);
      ttsAudioRef.current = a;
      // Slight delay to let UI render before speaking
      const t = setTimeout(() => a.play().catch(() => {}), 400);
      return () => clearTimeout(t);
    }
  }, [qIdx, q.q, voiceId, submitted]);

  const handleSubmit = () => {
    if (!userAnswer) return;
    const isCorrect = userAnswer === q.a;
    setResults(r => [...r, { question: q.q, answer: userAnswer, correct: isCorrect }]);
    setSubmitted(true);
    
    // Stop TTS if still playing
    if (ttsAudioRef.current) ttsAudioRef.current.pause();
    
    if (isCorrect) playCorrect();
    else playWrong();
  };

  const handleNext = () => {
    if (qIdx < total - 1) {
      setQIdx(i => i + 1);
      setUserAnswer(null);
      setSubmitted(false);
      setShowHint(false);
    } else {
      playComplete();
      onComplete(results);
    }
  };

  const hintCue = cues.find(c => Math.abs(c.startSec - q.hintSec) < 30);

  if (submitted) {
    const isCorrect = userAnswer === q.a;
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 max-w-xl mx-auto w-full animate-[fadeIn_0.3s_ease-out]">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${isCorrect ? "bg-emerald-100 border-emerald-400" : "bg-rose-100 border-rose-400"}`}>
          {isCorrect ? <Check className={`w-12 h-12 text-emerald-500`} /> : <X className={`w-12 h-12 text-rose-500`} />}
        </div>
        <h3 className={`text-2xl font-black ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}>
          {isCorrect ? "Correct!" : "Not quite."}
        </h3>
        
        <div className="w-full space-y-3">
          <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">Your Answer</p>
            <p className="text-slate-600 font-medium">{userAnswer}</p>
          </div>
          {!isCorrect && (
            <div className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mb-2">Correct Answer</p>
              <p className="text-slate-700 font-bold leading-relaxed">{q.a}</p>
            </div>
          )}
        </div>

        <button onClick={handleNext}
          className="w-full mt-4 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2">
          {qIdx < total - 1 ? <><ChevronRight className="w-5 h-5" /> Next Question</> : <><Trophy className="w-5 h-5" /> Finish Chapter</>}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-xl mx-auto w-full animate-[fadeIn_0.3s_ease-out]">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {chapter.questions.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-all ${i < qIdx ? "bg-indigo-400" : i === qIdx ? "bg-indigo-600" : "bg-slate-200"}`} />
        ))}
      </div>

      <div className="text-center mb-2">
        <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Question {qIdx + 1} of {total}</p>
        <h3 className="text-xl font-black text-slate-800 leading-snug">{q.q}</h3>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 animate-[slideDown_0.3s_ease-out]">
          <p className="text-xs text-amber-600 font-bold uppercase tracking-widest mb-2">📖 Hint — from the text:</p>
          <p className="text-slate-700 italic leading-relaxed text-sm">"{q.hintText || hintCue?.text}"</p>
        </div>
      )}

      {/* Options */}
      <div className="flex flex-col gap-3 mb-4">
        {shuffledOptions.map((opt, i) => {
          const isSelected = userAnswer === opt;
          return (
            <button
              key={i}
              onClick={() => setUserAnswer(opt)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-semibold ${
                isSelected 
                  ? "bg-indigo-50 border-indigo-400 text-indigo-900 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50"
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        {!showHint && (
          <button onClick={() => setShowHint(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-sm hover:bg-amber-100 transition-all">
            <Lightbulb className="w-4 h-4" /> Hint
          </button>
        )}
        <button onClick={handleSubmit} disabled={!userAnswer}
          className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-xl transition-all">
          Submit Answer
        </button>
      </div>
    </div>
  );
}

// ─── Main AudiobookModule ──────────────────────────────────────────────────
export default function AudiobookModule({ grade, voiceId, onRoundComplete }) {
  const [allCues, setAllCues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chapter progress — in a real app this would be fetched per-profile
  const [chapterIdx, setChapterIdx] = useState(0);
  const [phase, setPhase] = useState("read"); // "read" | "quiz" | "done"

  // Audio
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentSec, setCurrentSec] = useState(0);
  const [duration, setDuration] = useState(0);

  // Highlighted cue index
  const [activeCueIdx, setActiveCueIdx] = useState(0);
  const activeCueRef = useRef(null);

  // User preferences
  const [fontSizeClass, setFontSizeClass] = useState("text-base");
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hasFinishedListening, setHasFinishedListening] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("audiobook_font_size");
    if (saved) setFontSizeClass(saved);
  }, []);

  const FONT_SIZES = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl"];
  const decreaseFontSize = () => {
    const idx = FONT_SIZES.indexOf(fontSizeClass);
    if (idx > 0) {
      const next = FONT_SIZES[idx - 1];
      setFontSizeClass(next);
      localStorage.setItem("audiobook_font_size", next);
    }
  };
  const increaseFontSize = () => {
    const idx = FONT_SIZES.indexOf(fontSizeClass);
    if (idx < FONT_SIZES.length - 1) {
      const next = FONT_SIZES[idx + 1];
      setFontSizeClass(next);
      localStorage.setItem("audiobook_font_size", next);
    }
  };

  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const next = rates[nextIdx];
    setPlaybackRate(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = next;
    }
  };

  const chapter = CHAPTERS[chapterIdx];

  // ── Load SRT ──────────────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    fetch(`/api/proxy?url=${encodeURIComponent(BOOK_META.srtUrl)}`)
      .then(r => {
        if (!r.ok) throw new Error("Failed to fetch SRT");
        return r.text();
      })
      .then(raw => {
        setAllCues(parseSRT(raw));
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load the audiobook text. Please check your connection.");
        setLoading(false);
      });
  }, []);

  // ── Init audio ────────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio(BOOK_META.mp3Url);
    audioRef.current = audio;
    audio.playbackRate = playbackRate;
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => setCurrentSec(audio.currentTime));
    audio.addEventListener("ended", () => setPlaying(false));
    // Seek to chapter start
    audio.currentTime = chapter.startSec;
    return () => {
      audio.pause();
      audio.src = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterIdx]);

  // ── Sync highlighted cue with audio time ──────────────────────────────────
  const chapterCuesRaw = allCues ? getCuesForChapter(allCues, chapter) : [];
  const chapterCues = chapterCuesRaw.filter(c => {
    // Strip chapter headers if they appear within the first 15 seconds
    if (c.startSec < chapter.startSec + 15) {
      const lower = c.text.toLowerCase().replace(/[^a-z0-9]/gi, '');
      const t1 = `chapter${chapter.id}`;
      const t2 = chapter.title.toLowerCase().replace(/[^a-z0-9]/gi, '');
      if (lower.includes(t1) || lower.includes(t2) || lower === t1 + t2) {
        return false;
      }
    }
    return true;
  });

  useEffect(() => {
    if (!chapterCues.length) return;
    const idx = chapterCues.findIndex(c => currentSec >= c.startSec && currentSec < c.endSec);
    if (idx >= 0 && idx !== activeCueIdx) {
      setActiveCueIdx(idx);
    }
    // Check if finished listening
    if (currentSec >= chapter.endSec - 2) {
      setHasFinishedListening(true);
    }
    // Auto-stop at chapter end
    if (currentSec >= chapter.endSec && playing) {
      audioRef.current?.pause();
      setPlaying(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSec]);

  // ── Auto-scroll active cue into view ─────────────────────────────────────
  useEffect(() => {
    activeCueRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeCueIdx]);

  // ── Playback controls ─────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      if (audio.currentTime < chapter.startSec || audio.currentTime >= chapter.endSec) {
        audio.currentTime = chapter.startSec;
      }
      audio.play().catch(() => {});
      setPlaying(true);
    }
  }, [playing, chapter]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in an input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(e.target.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault(); // prevent page scroll
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay]);

  const seekTo = (sec) => {
    if (audioRef.current) audioRef.current.currentTime = sec;
  };

  const handleCueTap = (cue) => {
    seekTo(cue.startSec);
    if (!playing && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const handleQuizDone = useCallback((results) => {
    onRoundComplete?.({
      score: 100,
      totalItems: results.length,
      correctItems: results.length,
      metadata: { book: BOOK_META.id, chapterId: chapter.id, chapterTitle: chapter.title },
    });
    setPhase("done");
  }, [chapter, onRoundComplete]);

  // ─── Loading / Error ───────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400 min-h-full">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
      <p className="text-sm font-semibold">Loading audiobook…</p>
    </div>
  );

  if (error) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400 min-h-full px-6 text-center">
      <p className="text-rose-400 font-bold">{error}</p>
    </div>
  );

  // ─── Chapter Complete / Quiz Intro ─────────────────────────────────────────
  if (phase === "done") return (
    <div className="flex flex-col items-center justify-center min-h-full gap-6 px-6 py-16 text-center">
      <div className="w-28 h-28 rounded-full bg-indigo-100 border-4 border-indigo-400 flex items-center justify-center">
        <Trophy className="w-14 h-14 text-indigo-500" />
      </div>
      <h2 className="text-4xl font-black text-slate-800">Chapter Complete!</h2>
      <p className="text-slate-500 max-w-sm">Great work! Come back tomorrow for the next chapter.</p>
    </div>
  );

  // ─── Quiz Phase ────────────────────────────────────────────────────────────
  if (phase === "quiz") {
    return (
      <div className="flex flex-col h-full min-h-full bg-white">
        <div className="bg-indigo-600 text-white px-6 py-4 shrink-0">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-1">Chapter {chapter.id}</p>
          <h2 className="text-lg font-black leading-tight">{chapter.title}</h2>
          <p className="text-indigo-200 text-sm mt-1">Answer the comprehension questions below.</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <QuizEngine chapter={chapter} cues={chapterCues} voiceId={voiceId} onComplete={handleQuizDone} />
        </div>
      </div>
    );
  }

  // ─── Reading + Listening Phase ─────────────────────────────────────────────
  const progressPct = duration > 0 ? ((currentSec - chapter.startSec) / (chapter.endSec - chapter.startSec)) * 100 : 0;
  const clampedProgress = Math.max(0, Math.min(100, progressPct));

  return (
    <div className="flex flex-col h-full min-h-full bg-white">

      {/* Header */}
      <div className="bg-slate-800 text-white px-6 py-4 shrink-0 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{BOOK_META.title}</p>
          </div>
          <h2 className="text-lg font-black leading-tight text-white">
            Ch. {chapter.id}: {chapter.title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-700 rounded-xl overflow-hidden shadow-sm">
            <button onClick={decreaseFontSize} title="Decrease Text Size" 
              className="w-10 h-10 flex items-center justify-center hover:bg-slate-600 text-slate-300 transition-colors font-bold text-sm">
              A-
            </button>
            <div className="w-px bg-slate-600"></div>
            <button onClick={increaseFontSize} title="Increase Text Size" 
              className="w-10 h-10 flex items-center justify-center hover:bg-slate-600 text-slate-300 transition-colors font-bold text-lg">
              A+
            </button>
          </div>
          <button onClick={cyclePlaybackRate} title="Play Speed"
            className="w-10 h-10 flex flex-col items-center justify-center rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors font-black text-[10px]">
            <Gauge className="w-4 h-4 mb-0.5" />
            {playbackRate}x
          </button>
        </div>
      </div>

      {/* Chapter progress bar */}
      <div className="h-1 bg-slate-200 shrink-0">
        <div className="h-1 bg-indigo-500 transition-all" style={{ width: `${clampedProgress}%` }} />
      </div>

      {/* Scrollable text */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
        <div className="mb-10 pb-8 border-b border-slate-100 text-center">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3">Chapter {chapter.id}</h1>
          <h2 className="text-2xl font-bold text-slate-500">{chapter.title}</h2>
        </div>

        <div className="space-y-2 max-w-4xl mx-auto">
          {chapterCues.map((cue, i) => (
            <span
              key={i}
              ref={i === activeCueIdx ? activeCueRef : null}
              onClick={() => handleCueTap(cue)}
              className={`inline cursor-pointer rounded px-0.5 transition-all leading-relaxed font-medium ${fontSizeClass}
                ${i === activeCueIdx
                  ? "bg-indigo-100 text-indigo-800 font-bold"
                  : "text-slate-700 hover:text-indigo-600"
                }`}
            >
              {cue.text}{" "}
            </span>
          ))}
        </div>

        {/* After all text: invite to quiz */}
        <div className="pt-16 pb-8 text-center">
          <div className="inline-block bg-indigo-50 border border-indigo-200 rounded-2xl px-8 py-6">
            <p className="text-indigo-800 font-bold mb-4">Finished reading? Take the chapter quiz!</p>
            {hasFinishedListening ? (
              <button onClick={() => { audioRef.current?.pause(); setPlaying(false); setPhase("quiz"); }}
                className="flex items-center gap-2 mx-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20 hover:-translate-y-1">
                <ChevronRight className="w-5 h-5" /> Start Quiz
              </button>
            ) : (
              <div className="text-slate-500 font-semibold bg-slate-200/50 rounded-xl px-6 py-3 border border-slate-200 text-sm">
                Finish listening to unlock the quiz...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Audio Player Bar */}
      <div className="bg-white border-t border-slate-200 px-5 py-3 shrink-0">
        {/* Seek bar */}
        <input
          type="range" min={chapter.startSec} max={chapter.endSec} value={currentSec}
          onChange={e => seekTo(parseFloat(e.target.value))}
          className="w-full h-1.5 accent-indigo-600 mb-3 cursor-pointer"
        />
        <div className="flex items-center justify-between gap-4">
          <button onClick={togglePlay}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all
              ${playing ? "bg-slate-700 text-white" : "bg-indigo-600 text-white hover:bg-indigo-500"}`}>
            {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <div className="flex-1">
            <p className="text-xs text-slate-400 font-mono">
              {formatTime(currentSec - chapter.startSec)} / {formatTime(chapter.endSec - chapter.startSec)}
            </p>
          </div>
          {hasFinishedListening ? (
            <button onClick={() => { audioRef.current?.pause(); setPlaying(false); setPhase("quiz"); }}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm rounded-xl hover:bg-emerald-100 transition-all shadow-sm">
              <SkipForward className="w-4 h-4" /> Take Quiz
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 border border-slate-200 text-slate-400 font-bold text-sm rounded-xl cursor-not-allowed">
              <SkipForward className="w-4 h-4 opacity-50" /> Take Quiz
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatTime(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
