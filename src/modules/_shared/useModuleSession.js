"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { recordSession } from "@/app/actions";

/**
 * useModuleSession
 * ----------------
 * The shared hook that every module uses to:
 *   - Know who the student is and what grade they are
 *   - Submit a completed session to the database
 *   - Handle returning to the Path after completion
 *
 * Usage inside a module component:
 *   const { grade, profile, completeSession, isSubmitting } = useModuleSession({
 *     profileId,
 *     planId,
 *     moduleType: "Spelling",
 *     onDone,    // called after successful DB write
 *   });
 *
 * When the module logic finishes, call:
 *   completeSession({
 *     score: 90,              // 0-100 integer
 *     totalItems: 10,
 *     correctItems: 9,
 *     accuracy: 0.9,
 *     metadata: { ... }      // any module-specific detail
 *   });
 */
export function useModuleSession({ profileId, planId, moduleType, onDone }) {
  const [profile, setProfile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startRef = useRef(Date.now());

  // Fetch the child's profile (grade level, name etc.) on mount
  useEffect(() => {
    if (!profileId) return;
    fetch(`/api/profile/${profileId}`)
      .then((r) => r.json())
      .then((data) => setProfile(data))
      .catch(console.error);
  }, [profileId]);

  /**
   * completeSession — call this when the module decides the student is done.
   * It persists the session to Supabase and fires onDone so the Path can
   * mark the module as complete and show the celebration.
   *
   * @param {Object} results
   *   score          {number}  - 0-100 percentage
   *   totalItems     {number}  - how many questions/items were presented
   *   correctItems   {number}  - how many were correct
   *   accuracy       {number}  - 0-1 float (correctItems / totalItems)
   *   metadata       {Object}  - any extra per-module detail to store
   */
  const completeSession = useCallback(
    async (results) => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      const timeSpent = Math.round((Date.now() - startRef.current) / 1000);

      const payload = {
        profileId,
        planId,
        moduleType,
        score: results.score ?? 0,
        timeSpent,
        metadata: {
          totalItems: results.totalItems,
          correctItems: results.correctItems,
          accuracy: results.accuracy,
          grade: profile?.grade_level,
          moduleVersion: "1.0",
          ...results.metadata,
        },
      };

      try {
        await recordSession(payload);
      } catch (err) {
        console.error("Failed to record session:", err);
      } finally {
        setIsSubmitting(false);
        onDone?.();
      }
    },
    [isSubmitting, profileId, planId, moduleType, profile, onDone]
  );

  return {
    profile,
    grade: profile?.grade_level ?? null,
    isSubmitting,
    completeSession,
  };
}
