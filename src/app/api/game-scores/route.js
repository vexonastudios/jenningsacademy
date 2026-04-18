import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET  /api/game-scores?gameId=word-runner&familyParentId=xxx
 *   Returns all sibling scores for a given game, keyed by profile name.
 *
 * POST /api/game-scores
 *   Body: { profileId, gameId, score, level, won, difficulty, levelTime }
 *   Upserts (or inserts) a high-score entry.
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const gameId    = searchParams.get('gameId')    || 'word-runner';
  const parentId  = searchParams.get('parentId');

  if (!parentId) {
    return NextResponse.json({ error: 'parentId required' }, { status: 400 });
  }

  // Fetch all profiles that belong to this parent
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name, avatar_url')
    .eq('parent_id', parentId);

  if (!profiles?.length) return NextResponse.json({ scores: [] });

  const profileIds = profiles.map(p => p.id);

  // Fetch game score entries for all of those profiles
  const { data: rows } = await supabase
    .from('game_scores')
    .select('*')
    .eq('game_id', gameId)
    .in('profile_id', profileIds)
    .order('score', { ascending: false });

  // Enrich with profile name/avatar
  const profileMap = Object.fromEntries(profiles.map(p => [p.id, p]));
  const scores = (rows || []).map(r => ({
    ...r,
    playerName: profileMap[r.profile_id]?.name ?? 'Unknown',
    avatarColor: profileMap[r.profile_id]?.avatar_url ?? 'bg-slate-500',
  }));

  return NextResponse.json({ scores });
}

export async function POST(request) {
  const body = await request.json();
  const { profileId, gameId, score, level, won, difficulty, levelTime } = body;

  if (!profileId || !gameId || score == null) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Upsert: one row per (profile_id, game_id) — only keep best score
  const { data: existing } = await supabase
    .from('game_scores')
    .select('id, score')
    .eq('profile_id', profileId)
    .eq('game_id', gameId)
    .single();

  if (existing) {
    if (score > existing.score) {
      await supabase
        .from('game_scores')
        .update({ score, level, won, difficulty, level_time: levelTime, updated_at: new Date().toISOString() })
        .eq('id', existing.id);
    }
  } else {
    await supabase
      .from('game_scores')
      .insert([{ profile_id: profileId, game_id: gameId, score, level, won, difficulty, level_time: levelTime }]);
  }

  return NextResponse.json({ ok: true });
}
