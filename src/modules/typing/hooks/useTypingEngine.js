"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useTypingEngine
 * ───────────────
 * The core typing-test engine.
 *
 * Returns real-time WPM, accuracy, error map, and a keyDown handler
 * that should be wired to a global window listener.
 *
 * Auto-resets when `text` changes (phase transitions).
 *
 * @param {string} text – The prompt to type.
 * @returns {TypingEngine}
 */
export function useTypingEngine(text) {
  const [typed,       setTyped]       = useState("");
  const [startTime,   setStartTime]   = useState(null);
  const [nowMs,       setNowMs]       = useState(Date.now());
  const [keystrokeLog,setKeystrokeLog]= useState([]); // {expected, actual, correct}

  const timerRef    = useRef(null);
  const startRef    = useRef(null); // stable ref for finish callbacks
  const keystrokRef = useRef([]);

  // ── Reset on text change ──────────────────────────────────────────────────
  useEffect(() => {
    setTyped("");
    setStartTime(null);
    setNowMs(Date.now());
    setKeystrokeLog([]);
    keystrokRef.current = [];
    clearInterval(timerRef.current);
  }, [text]);

  // ── Live timer (0.5s tick for WPM display) ───────────────────────────────
  useEffect(() => {
    if (startTime && nowMs - startTime < 300000) { // cap at 5 min safety
      timerRef.current = setInterval(() => setNowMs(Date.now()), 500);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime, nowMs]);

  // ── Derived metrics ───────────────────────────────────────────────────────
  const position       = typed.length;
  const isComplete     = text.length > 0 && position >= text.length;
  const elapsedMin     = startTime ? (nowMs - startTime) / 60000 : 0;
  const correctChars   = typed.split("").filter((c, i) => c === text[i]).length;
  const netWpm         = (startTime && elapsedMin > 0.05)
    ? Math.max(0, Math.round((correctChars / 5) / elapsedMin))
    : 0;
  const accuracy       = position > 0
    ? Math.round((correctChars / position) * 100)
    : 100;

  // Map of expected key → error count (e.g. { r: 3, y: 1 })
  const weakKeys = keystrokeLog
    .filter(k => !k.correct)
    .reduce((acc, k) => {
      if (k.expected && k.expected !== " ") {
        acc[k.expected] = (acc[k.expected] || 0) + 1;
      }
      return acc;
    }, {});

  // ── Key handler ───────────────────────────────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    // Ignore if already complete
    if (text.length === 0 || position >= text.length) return;

    // Ignore modifier combos
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      setTyped(prev => prev.slice(0, -1));
      return;
    }

    // Only process single printable chars
    if (e.key.length !== 1) return;
    e.preventDefault();

    const char     = e.key;
    const expected = text[position];
    const isCorrect = char === expected;

    // Kick off start time on first real keystroke
    if (!startTime) {
      const now = Date.now();
      setStartTime(now);
      startRef.current = now;
    }

    const entry = { expected, actual: char, correct: isCorrect };
    keystrokRef.current = [...keystrokRef.current, entry];
    setKeystrokeLog(prev => [...prev, entry]);
    setTyped(prev => prev + char);
  }, [text, position, startTime]);

  const reset = useCallback(() => {
    setTyped("");
    setStartTime(null);
    setNowMs(Date.now());
    setKeystrokeLog([]);
    keystrokRef.current = [];
    clearInterval(timerRef.current);
  }, []);

  return {
    typed,
    position,
    isComplete,
    netWpm,
    accuracy,
    weakKeys,
    keystrokeLog,
    nextKey:        text[position] ?? null,
    elapsedSeconds: elapsedMin * 60,
    handleKeyDown,
    reset,
  };
}
