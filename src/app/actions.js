"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// ─── ADD CHILD ────────────────────────────────────────────────────────────────
export async function addChild(payload) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { name, grade: rawGrade, pin, startDate, schoolDays, voiceId } = payload;
  const grade = parseInt(rawGrade || "1", 10);
  const colors = ["bg-blue-500", "bg-pink-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500"];
  const avatarColor = colors[Math.floor(Math.random() * colors.length)];

  const { data: newProfile, error: profileError } = await supabase.from('profiles').insert([{
    parent_id: userId, name, grade_level: grade, pin_code: pin,
    avatar_url: avatarColor, voice_id: voiceId, start_date: startDate, school_days: schoolDays
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

  // Upsert: if a plan exists for this profile+date, replace it
  const { error } = await supabase.from('daily_plans').upsert([{
    profile_id: profileId,
    target_date: targetDate,
    modules,
  }], { onConflict: 'profile_id,target_date' });

  if (error) throw new Error(error.message);
  revalidatePath('/parent');
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
