import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ParentClient from "./ParentClient";

export default async function ParentDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch profiles belonging to this parent
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('parent_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Error fetching profiles:", error);
  }

  // Fetch today's saved plans for all children
  const todayStr = new Date().toISOString().split('T')[0];
  const profileIds = (profiles || []).map(p => p.id);
  let initialPlans = [];
  if (profileIds.length > 0) {
    const { data: plans } = await supabase
      .from('daily_plans')
      .select('profile_id, modules')
      .eq('target_date', todayStr)
      .in('profile_id', profileIds);
    initialPlans = plans || [];
  }

  return <ParentClient profiles={profiles || []} initialPlans={initialPlans || []} />;
}
