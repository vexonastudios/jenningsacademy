import { supabase } from "@/lib/supabase";

/**
 * Ensures a daily_plan exists for the given child+date.
 * If one exists, returns it.
 * If not, fetches the child's master_plan, filters active_days, and inserts a daily_plan.
 */
export async function getOrGenerateDailyPlan(profileId, dateStr) {
  // 1. Check existing plan
  const { data: existingPlan } = await supabase
    .from("daily_plans")
    .select("*")
    .eq("profile_id", profileId)
    .eq("target_date", dateStr)
    .single();

  // Evaluate day in local time to avoid timezone wrap
  const d = new Date(dateStr + "T12:00:00Z");
  const currentDayShort = d.toLocaleDateString("en-US", { weekday: "short" });

  if (existingPlan) {
    // Hot-fix for polluted existing plans: filter them on the fly
    const { data: existingProfile } = await supabase.from("profiles").select("school_days").eq("id", profileId).single();
    existingPlan.modules = existingPlan.modules.filter(m => {
      const validDays = m.active_days || existingProfile?.school_days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      return validDays.includes(currentDayShort);
    });
    return existingPlan;
  }

  // 2. No plan exists; Generate one from the master_plan
  const { data: profile } = await supabase
    .from("profiles")
    .select("master_plan, school_days")
    .eq("id", profileId)
    .single();

  const masterPlan = profile?.master_plan || [];

  const activeModules = masterPlan.filter(m => {
    const validDays = m.active_days || profile?.school_days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    return validDays.includes(currentDayShort);
  });

  // 4. Insert into DB
  const { data: newPlan, error } = await supabase
    .from("daily_plans")
    .insert([{
      profile_id: profileId,
      target_date: dateStr,
      modules: activeModules
    }])
    .select()
    .single();

  if (error) {
    console.error("Error generating daily plan:", error);
    return { profile_id: profileId, target_date: dateStr, modules: [] };
  }

  return newPlan;
}
