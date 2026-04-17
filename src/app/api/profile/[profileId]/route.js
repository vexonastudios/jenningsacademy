import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

/**
 * GET /api/profile/[profileId]
 * Returns basic child profile info (name, grade_level, voice_id) used by module sessions.
 * No auth required — profile IDs are UUIDs; PIN gate on the path protects access.
 */
export async function GET(req, { params }) {
  const { profileId } = await params;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, grade_level, voice_id, current_streak, avatar_url")
    .eq("id", profileId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
