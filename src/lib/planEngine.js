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

  if (existingPlan) return existingPlan;

  // 2. No plan exists; Generate one from the master_plan
  const { data: profile } = await supabase
    .from("profiles")
    .select("master_plan")
    .eq("id", profileId)
    .single();

  const masterPlan = profile?.master_plan || [];

  // 3. Filter modules so only the ones assigned for 'today' make it into the daily_plan
  // Date string needs to be evaluated in local time context if possible, 
  // but standardizing to UTC/server short string:
  const d = new Date(dateStr + "T12:00:00Z"); // middle of day to avoid timezone wrap
  const currentDayShort = d.toLocaleDateString("en-US", { weekday: "short" });

  const activeModules = masterPlan.filter(m => 
    !m.active_days || m.active_days.includes(currentDayShort)
  );

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
