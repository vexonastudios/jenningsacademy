"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Hook to track actual "Active" seconds the user spends on the page.
 * It strictly pauses if:
 * 1. The user switches tabs or minimizes the window (visibilitychange)
 * 2. The user has not moved the mouse or typed anything for `idleTimeoutMs`
 */
export function useActiveTracker({ profileId, moduleId, idleTimeoutMs = 30000 }) {
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const lastActivityTimeRef = useRef(Date.now());
  const intervalRef = useRef(null);

  useEffect(() => {
    // 1. Setup Activity Listeners
    const handleActivity = () => {
      lastActivityTimeRef.current = Date.now();
      if (isIdle) setIsIdle(false);
    };

    // Throttle events so we don't bombard the event loop
    const throttledActivity = () => {
      handleActivity();
    };

    window.addEventListener("mousemove", throttledActivity, { passive: true });
    window.addEventListener("keydown", throttledActivity, { passive: true });
    window.addEventListener("click", throttledActivity, { passive: true });
    window.addEventListener("scroll", throttledActivity, { passive: true });
    window.addEventListener("touchstart", throttledActivity, { passive: true });

    // 2. Setup Visibility Listener (Tab Switching)
    const handleVisibilityChange = () => {
      setIsHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 3. Heartbeat Counter
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityTimeRef.current;

      const actuallyIdle = timeSinceLastActivity > idleTimeoutMs;
      
      setIsIdle(actuallyIdle);

      // Only increment if we are actively focused and NOT idle
      if (!document.hidden && !actuallyIdle) {
        setActiveSeconds((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", throttledActivity);
      window.removeEventListener("keydown", throttledActivity);
      window.removeEventListener("click", throttledActivity);
      window.removeEventListener("scroll", throttledActivity);
      window.removeEventListener("touchstart", throttledActivity);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(intervalRef.current);
    };
  }, [isIdle, idleTimeoutMs]);

  // Optionally flush to Supabase every 60 seconds
  useEffect(() => {
    if (activeSeconds > 0 && activeSeconds % 60 === 0) {
      // TODO: Hook this up to server-action `updateSessionTime(profileId, moduleId, activeSeconds)`
      // console.log(`Saved ${activeSeconds} active seconds to database`);
    }
  }, [activeSeconds]);

  return { activeSeconds, isIdle, isHidden };
}
