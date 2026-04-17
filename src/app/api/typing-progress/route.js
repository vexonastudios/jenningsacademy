import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { LESSONS } from "@/modules/typing/content/lessons";

/**
 * GET /api/typing-progress?profileId=xxx
 *
 * Returns the student's current typing lesson number.
 * Logic:
 *  - No sessions yet  → lessonNumber = 0 (start at Lesson 1)
 *  - Last session passed (accuracy >= threshold) → advance to next lesson
 *  - Last session failed → repeat same lesson
 */

function gradeThreshold(grade) {
  const g = Number(grade) || 1;
  if (g <= 3) return 78;
  if (g <= 6) return 82;
  return 87;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const profileId = searchParams.get("profileId");

  if (!profileId) {
    return NextResponse.json({ error: "Missing profileId" }, { status: 400 });
  }

  // Get profile for grade
  const { data: profile } = await supabase
    .from("profiles")
    .select("grade_level")
    .eq("id", profileId)
    .single();

  const threshold = gradeThreshold(profile?.grade_level);

  // Find last completed Typing session
  const { data: lastSession } = await supabase
    .from("sessions")
    .select("score, metadata")
    .eq("profile_id", profileId)
    .eq("module_type", "Typing")
    .eq("completed", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!lastSession) {
    // First time — start at lesson 1 (index 0)
    return NextResponse.json({ lessonNumber: 0 });
  }

  const lastLesson  = lastSession.metadata?.lessonNumber ?? 0;
  const lastScore   = lastSession.score ?? 0;
  const passed      = lastScore >= threshold;
  const nextLesson  = passed
    ? Math.min(lastLesson + 1, LESSONS.length - 1)
    : lastLesson;

  return NextResponse.json({
    lessonNumber: nextLesson,
    lastScore,
    passed,
  });
}
