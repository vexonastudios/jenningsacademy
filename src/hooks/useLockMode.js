"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/**
 * useLockMode — Kiosk-style lock for the Child Path.
 *
 * KEY DESIGN DECISION:
 * Browsers cannot be stopped from handling ESC (security spec).
 * Instead of fighting the browser, we:
 *  1. Show the LockOverlay immediately when fullscreen exits or tab switches
 *  2. The overlay itself IS the effective lock — child can see nothing underneath
 *  3. The "Tap to Return" button is a real user gesture, so requestFullscreen() works there
 *  4. We do NOT use setTimeout to re-request fullscreen (those are rejected by browsers)
 *
 * @param {Object} options
 * @param {boolean}  options.enabled       - Is lock mode on for this session?
 * @param {string}   options.profileId     - Child's profile UUID
 * @param {string}   options.parentExitPin - The parent's override PIN
 * @param {Function} options.onUnlocked    - Called when parent successfully exits lock mode
 */
export function useLockMode({ enabled, profileId, parentExitPin, onUnlocked }) {
  const [isBlocked, setIsBlocked] = useState(false);
  const [unlockError, setUnlockError] = useState("");
  const [showParentExit, setShowParentExit] = useState(false);

  // ── 1. Force fullscreen on mount ───────────────────────────────────────────
  const requestFS = useCallback(() => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      return el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  }, []);

  const exitFS = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    requestFS();
  }, [enabled, requestFS]);

  // ── 2. Fullscreen change listener ─────────────────────────────────────────
  // IMPORTANT: We do NOT try to re-request fullscreen here (no user gesture).
  // Instead, we show the overlay. The overlay's "Tap to Return" button handles
  // re-entering fullscreen inside a real user gesture.
  useEffect(() => {
    if (!enabled) return;

    const onFSChange = () => {
      const isNowFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
      if (!isNowFS) {
        setIsBlocked(true);
      } else {
        setIsBlocked(false);
      }
    };

    document.addEventListener("fullscreenchange", onFSChange);
    document.addEventListener("webkitfullscreenchange", onFSChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFSChange);
      document.removeEventListener("webkitfullscreenchange", onFSChange);
    };
  }, [enabled]);

  // ── 3. Visibility change (alt-tab, home button) ───────────────────────────
  useEffect(() => {
    if (!enabled) return;

    const onVisibilityChange = () => {
      if (document.hidden) {
        setIsBlocked(true);
      }
      // When they come back, the overlay is already showing.
      // They MUST tap "Return to Work" which re-requests FS as a user gesture.
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [enabled]);

  // ── 4. Keyboard shortcut interception ─────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;

    const BLOCKED_KEYS = new Set([
      "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12",
    ]);

    const onKeyDown = (e) => {
      // Block F-keys
      if (BLOCKED_KEYS.has(e.key)) { e.preventDefault(); return; }
      // Block Ctrl+W (close tab), Ctrl+T (new tab), Ctrl+N, Ctrl+R (refresh)
      if (e.ctrlKey && ["w","t","n","r","l"].includes(e.key.toLowerCase())) {
        e.preventDefault(); return;
      }
      // Block Alt+F4, Alt+Left/Right (back/forward)
      if (e.altKey && ["F4","ArrowLeft","ArrowRight"].includes(e.key)) {
        e.preventDefault(); return;
      }
      // Block Meta+Tab (macOS app switch)
      if (e.metaKey && e.key === "Tab") {
        e.preventDefault(); return;
      }
      // Intercept ESC — show the blocker overlay instead of just exiting
      // Note: ESC WILL still exit fullscreen (browser security spec), but
      // our fullscreenchange listener above catches that and shows the overlay.
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [enabled]);

  // ── 5. Beforeunload ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;

    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [enabled]);

  // ── 6. Browser Back Button ─────────────────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;
    window.history.pushState(null, "", window.location.href);
    const onPopState = () => {
      window.history.pushState(null, "", window.location.href);
      setIsBlocked(true);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [enabled]);

  // ── 7. "Return to Work" — called from overlay button (user gesture) ────────
  // This IS a user gesture, so requestFullscreen() will succeed here.
  const returnToWork = useCallback(() => {
    requestFS();
    setIsBlocked(false);
  }, [requestFS]);

  // ── 8. Parent PIN unlock ───────────────────────────────────────────────────
  const parentUnlock = useCallback(async (enteredPin) => {
    setUnlockError("");
    if (enteredPin === parentExitPin) {
      exitFS();
      onUnlocked?.();
    } else {
      setUnlockError("Incorrect parent PIN. Try again.");
    }
  }, [parentExitPin, exitFS, onUnlocked]);

  // ── 9. All tasks complete — graceful exit ──────────────────────────────────
  const unlockCompleted = useCallback(() => {
    exitFS();
    onUnlocked?.();
  }, [exitFS, onUnlocked]);

  return {
    isBlocked,
    setIsBlocked,
    returnToWork,
    parentUnlock,
    unlockError,
    setUnlockError,
    unlockCompleted,
    showParentExit,
    setShowParentExit,
  };
}
