import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

// POST /api/verify-pin  { profileId, pin }
export async function POST(request) {
  const { profileId, pin } = await request.json();

  if (!profileId || !pin) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, voice_id, grade_level, avatar_url, current_streak')
    .eq('id', profileId)
    .eq('pin_code', pin)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Incorrect PIN' }, { status: 401 });
  }

  return NextResponse.json({ profile: data });
}
