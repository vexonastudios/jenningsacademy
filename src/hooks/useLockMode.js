"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/**
 * useLockMode — Kiosk-style lock for the Child Path.
 *
 * When active:
 *  - Forces fullscreen immediately
 *  - Re-requests fullscreen the instant it's exited
 *  - On alt-tab / app switch: shows a full-screen "Come back" overlay
 *  - Intercepts dangerous keyboard shortcuts (F5, Ctrl+W, Alt+F4, etc.)
 *  - Blocks beforeunload (browser close / refresh)
 *  - Provides a parentUnlock(pin) function that checks the parent exit PIN
 *
 * @param {Object} options
 * @param {boolean}  options.enabled       - Is lock mode on for this session?
 * @param {string}   options.profileId     - Child's profile UUID
 * @param {string}   options.parentExitPin - The parent's override PIN
 * @param {Function} options.onUnlocked    - Called when parent successfully exits lock mode
 */
export function useLockMode({ enabled, profileId, parentExitPin, onUnlocked }) {
  const [isBlocked, setIsBlocked] = useState(false); // Tab-switch blocker visible?
  const [unlockError, setUnlockError] = useState("");
  const reEntryTimeoutRef = useRef(null);

  // ── 1. Force fullscreen ────────────────────────────────────────────────────
  const requestFS = useCallback(() => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(); // Safari / older iOS
    }
  }, []);

  const exitFS = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }, []);

  // ── 2. Fullscreen change listener — re-enter if they escape ───────────────
  useEffect(() => {
    if (!enabled) return;
    requestFS();

    const onFSChange = () => {
      const isNowFS =
        !!(document.fullscreenElement || document.webkitFullscreenElement);
      if (!isNowFS) {
        // Give browser 200ms then re-request
        setTimeout(requestFS, 200);
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
  }, [enabled, requestFS]);

  // ── 3. Visibility change (alt-tab, home button, app switcher) ─────────────
  useEffect(() => {
    if (!enabled) return;

    const onVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden — set blocked so overlay shows on return
        setIsBlocked(true);
        // Optionally clear any pending re-entry timer
        if (reEntryTimeoutRef.current) clearTimeout(reEntryTimeoutRef.current);
      } else {
        // They came back — re-request fullscreen immediately
        requestFS();
        // Brief delay to let fullscreen kick in, then clear blocker
        reEntryTimeoutRef.current = setTimeout(() => setIsBlocked(false), 800);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [enabled, requestFS]);

  // ── 4. Keyboard shortcut interception ────────────────────────────────────
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
      // Block Alt+F4, Alt+Left (back)
      if (e.altKey && ["F4","ArrowLeft","ArrowRight"].includes(e.key)) {
        e.preventDefault(); return;
      }
      // Block Meta+Tab (macOS app switch via keyboard)
      if (e.metaKey && e.key === "Tab") {
        e.preventDefault(); return;
      }
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [enabled]);

  // ── 5. Beforeunload (close/refresh prevention) ───────────────────────────
  useEffect(() => {
    if (!enabled) return;

    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Required by Chrome
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [enabled]);

  // ── 6. Browser Back Button ────────────────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;
    // Push a dummy state so back button doesn't navigate away
    window.history.pushState(null, "", window.location.href);
    const onPopState = () => {
      window.history.pushState(null, "", window.location.href);
      setIsBlocked(true);
      setTimeout(() => { setIsBlocked(false); requestFS(); }, 400);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [enabled, requestFS]);

  // ── 7. Parent PIN unlock ──────────────────────────────────────────────────
  const parentUnlock = useCallback(async (enteredPin) => {
    setUnlockError("");
    if (enteredPin === parentExitPin) {
      exitFS();
      onUnlocked?.();
    } else {
      setUnlockError("Incorrect parent PIN. Try again.");
    }
  }, [parentExitPin, exitFS, onUnlocked]);

  // ── 8. All tasks complete — graceful exit ─────────────────────────────────
  const unlockCompleted = useCallback(() => {
    exitFS();
    onUnlocked?.();
  }, [exitFS, onUnlocked]);

  return { isBlocked, setIsBlocked, parentUnlock, unlockError, setUnlockError, unlockCompleted };
}
