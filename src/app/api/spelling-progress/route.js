import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

/**
 * GET /api/spelling-progress?profileId=xxx
 *
 * Returns the student's current mastery state for the Spelling module:
 *   setIndex   — which word-set to show (0 = first set of words, 1 = second, etc.)
 *   lastScore  — their score from the most recent spelling session (or null)
 *   passed     — whether they passed the last session (score >= 80)
 *
 * Logic:
 *   - No previous session      → setIndex 0 (start from the beginning)
 *   - Last score >= 80 (pass)  → setIndex lastSetIndex + 1 (advance to next set)
 *   - Last score <  80 (fail)  → setIndex lastSetIndex     (same set again)
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const profileId = searchParams.get("profileId");

  if (!profileId) {
    return NextResponse.json({ error: "Missing profileId" }, { status: 400 });
  }

  // Fetch the most recent completed Spelling session for this student
  const { data, error } = await supabase
    .from("sessions")
    .select("score, metadata")
    .eq("profile_id", profileId)
    .eq("module_type", "Spelling")
    .eq("completed", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // No sessions yet — start at set 0
  if (error || !data) {
    return NextResponse.json({ setIndex: 0, lastScore: null, passed: null });
  }

  const lastScore = data.score ?? 0;
  const lastSetIndex = data.metadata?.setIndex ?? 0;
  const passed = lastScore >= 80;

  // Advance set only if they passed last time
  const nextSetIndex = passed ? lastSetIndex + 1 : lastSetIndex;

  return NextResponse.json({
    setIndex: nextSetIndex,
    lastScore,
    passed,
  });
}
