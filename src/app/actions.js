"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { getOrGenerateDailyPlan } from "@/lib/planEngine";
import { slugify } from "@/lib/slugify";

// ─── ADD CHILD ────────────────────────────────────────────────────────────────
export async function addChild(payload) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { name, grade: rawGrade, pin, startDate, schoolDays, voiceId } = payload;
  const grade = parseInt(rawGrade || "1", 10);
  const colors = ["bg-blue-500", "bg-pink-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500"];
  const avatarColor = colors[Math.floor(Math.random() * colors.length)];

  // Build a unique child_slug within this parent
  const baseSlug = slugify(name);
  let childSlug = baseSlug;
  let attempt = 2;
  while (true) {
    const { data: clash } = await supabase.from('profiles')
      .select('id').eq('parent_id', userId).eq('child_slug', childSlug).single();
    if (!clash) break;
    childSlug = `${baseSlug}${attempt++}`;
  }

  const { data: newProfile, error: profileError } = await supabase.from('profiles').insert([{
    parent_id: userId, name, grade_level: grade, pin_code: pin,
    avatar_url: avatarColor, voice_id: voiceId, start_date: startDate,
    school_days: schoolDays, child_slug: childSlug
  }]).select().single();

  if (profileError) throw new Error(profileError.message);

  const defaultModules = [
    { id: "mod1", type: "Math",     iconCode: "Calculator", color: "text-blue-600 bg-blue-100" },
    { id: "mod2", type: "Spelling", iconCode: "Type",       color: "text-purple-600 bg-purple-100" },
    { id: "mod3", type: "Reading",  iconCode: "BookOpen",   color: "text-amber-600 bg-amber-100" },
  ];
  const todayStr = new Date().toISOString().split('T')[0];
  await supabase.from('daily_plans').insert([{ profile_id: newProfile.id, target_date: todayStr, modules: defaultModules }]);

  revalidatePath('/parent');
}

// ─── UPDATE CHILD ─────────────────────────────────────────────────────────────
export async function updateChild(payload) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { id, name, grade, pin, voiceId, startDate, schoolDays, lockMode, parentExitPin } = payload;
  // Re-slug if name changed
  const newSlug = slugify(name);
  const { error } = await supabase.from('profiles')
    .update({
      name,
      grade_level: parseInt(grade, 10),
      pin_code: pin,
      voice_id: voiceId,
      start_date: startDate,
      school_days: schoolDays,
      lock_mode: lockMode,
      parent_exit_pin: parentExitPin || null,
      child_slug: newSlug,
    })
    .eq('id', id)
    .eq('parent_id', userId);

  if (error) throw new Error(error.message);
  revalidatePath('/parent');
}

// ─── DELETE CHILD ─────────────────────────────────────────────────────────────
export async function deleteChild(profileId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { error } = await supabase.from('profiles')
    .delete()
    .eq('id', profileId)
    .eq('parent_id', userId);

  if (error) throw new Error(error.message);
  revalidatePath('/parent');
}

// ─── PUBLISH PLAN ─────────────────────────────────────────────────────────────
export async function publishPlan(payload) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { profileId, modules, targetDate } = payload;

  // Verify the profile belongs to this parent
  const { data: profile } = await supabase.from('profiles')
    .select('id').eq('id', profileId).eq('parent_id', userId).single();
  if (!profile) throw new Error("Profile not found");

  // 1. Save to the child's Master Plan Template
  const { error: masterErr } = await supabase.from('profiles')
    .update({ master_plan: modules })
    .eq('id', profileId);

  if (masterErr) throw new Error(masterErr.message);

  // 2. Clear out any un-started 'future' or 'today' daily plans so they get regenerated fresh if the parent edited it
  // Notice we only delete plans that haven't been completed, but for simplicity we'll just delete today's plan
  // so the JIT engine rebuilds it instantly.
  await supabase.from('daily_plans')
    .delete()
    .eq('profile_id', profileId)
    .eq('target_date', targetDate);

  revalidatePath('/parent');
  revalidatePath('/');
}

// ─── SAVE PLAN AS TEMPLATE ────────────────────────────────────────────────────
export async function savePlanAsTemplate(payload) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { name, modules } = payload;
  const { error } = await supabase.from('plan_templates').insert([{ parent_id: userId, name, modules }]);
  if (error) throw new Error(error.message);
  revalidatePath('/parent');
}

// ─── VERIFY CHILD PIN ─────────────────────────────────────────────────────────
// Note: called client-side via fetch to /api/verify-pin — not a Server Action
// but kept here for reference pattern.

// --- RECORD SESSION -------------------------------------------------------------
export async function recordSession(payload) {
  const { profileId, planId, moduleType, score, timeSpent } = payload;
  
  if (!profileId || !planId || !moduleType) throw new Error("Invalid session data");

  const { error } = await supabase.from('sessions').insert([{
    profile_id: profileId,
    daily_plan_id: planId,
    module_type: moduleType,
    score: score || 0,
    time_spent_seconds: timeSpent || 0,
    completed: true
  }]);

  if (error) throw new Error(error.message);
}

// ─── FETCH TODAY'S PLAN & SESSIONS ─────────────────────────────────────────

export async function fetchTodayPlan(profileId) {
  const todayStr = new Date().toISOString().split('T')[0];
  
  // 1. Get the generated active plan for today
  const plan = await getOrGenerateDailyPlan(profileId, todayStr);
  
  if (!plan || !plan.id) return { plan: null, completedModuleTypes: [] };

  // 2. Fetch all completed sessions strictly for this daily plan
  const { data: sessions } = await supabase
    .from('sessions')
    .select('module_type')
    .eq('daily_plan_id', plan.id)
    .eq('completed', true);

  const completedModuleTypes = (sessions || []).map(s => s.module_type);

  return { plan, completedModuleTypes };
}
