import { supabase } from "@/lib/supabase";
import { getSpellingContent } from "@/modules/spelling/content";
import { NextResponse } from "next/server";

/**
 * GET /api/spelling-words?profileId=xxx
 *
 * Returns the student's current active word set for the Spelling module,
 * including word, hint, and sentence fields.
 * Used by the parent dashboard to display, print, or email the word list.
 */

// Must match the same deterministic shuffle used in SpellingModule.js
function dayShuffle(arr) {
  const dateStr = new Date().toDateString();
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) seed = (seed * 31 + dateStr.charCodeAt(i)) >>> 0;
  const rng = () => { seed ^= seed << 13; seed ^= seed >> 17; seed ^= seed << 5; return (seed >>> 0) / 4294967296; };
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const profileId = searchParams.get("profileId");

  if (!profileId) {
    return NextResponse.json({ error: "Missing profileId" }, { status: 400 });
  }

  // 1. Get the child's grade level and name
  const { data: profile } = await supabase
    .from("profiles")
    .select("name, grade_level")
    .eq("id", profileId)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // 2. Get current setIndex (same logic as /api/spelling-progress)
  const { data: lastSession } = await supabase
    .from("sessions")
    .select("score, metadata")
    .eq("profile_id", profileId)
    .eq("module_type", "Spelling")
    .eq("completed", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const lastScore = lastSession?.score ?? 0;
  const lastSetIndex = lastSession?.metadata?.setIndex ?? 0;
  const currentSetIndex = lastScore >= 80 ? lastSetIndex + 1 : lastSetIndex;

  // 3. Build the word list
  const grade = Number(profile.grade_level) || 1;
  const { pool, roundSize } = getSpellingContent(grade);
  const totalSets = Math.ceil(pool.length / roundSize);
  const effectiveIdx = currentSetIndex % totalSets;
  const start = effectiveIdx * roundSize;
  let words = pool.slice(start, start + roundSize);
  if (words.length < roundSize) words = [...words, ...pool.slice(0, roundSize - words.length)];
  words = dayShuffle(words);

  return NextResponse.json({
    childName: profile.name,
    grade,
    setIndex: currentSetIndex,
    setNumber: effectiveIdx + 1,
    totalSets,
    words, // [{word, hint, sentence}]
  });
}
