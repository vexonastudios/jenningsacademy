/**
 * useSoundEffects — tiny Web Audio API sound effects.
 * No external files needed. Generates sounds programmatically.
 * Returns: { playCorrect, playWrong, playChime, playComplete }
 */
export function useSoundEffects() {
  const getCtx = () => {
    if (typeof window === "undefined") return null;
    return new (window.AudioContext || window.webkitAudioContext)();
  };

  const playTone = (frequency, duration, type = "sine", gainLevel = 0.3) => {
    try {
      const ctx = getCtx();
      if (!ctx) return;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      gainNode.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch(e) {
      // Silently fail if audio context isn't ready
    }
  };

  const playCorrect = () => {
    // Happy ascending two-note chime
    setTimeout(() => playTone(523.25, 0.15, "sine", 0.35), 0);   // C5
    setTimeout(() => playTone(783.99, 0.25, "sine", 0.35), 150); // G5
  };

  const playWrong = () => {
    // Low dull thud
    playTone(180, 0.35, "triangle", 0.3);
  };

  const playChime = () => {
    // Soft single bell
    playTone(880, 0.4, "sine", 0.25);
  };

  const playComplete = () => {
    // Triumphant three-note fanfare
    setTimeout(() => playTone(523.25, 0.15, "sine", 0.35), 0);
    setTimeout(() => playTone(659.25, 0.15, "sine", 0.35), 160);
    setTimeout(() => playTone(783.99, 0.4, "sine", 0.4), 320);
  };

  return { playCorrect, playWrong, playChime, playComplete };
}
