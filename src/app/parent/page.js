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

  // Pre-fetch all avatar images server-side so they are inlined as base64
  // in the initial HTML response — zero extra round-trips for the browser.
  const avatarDataUrls = {};
  await Promise.all(
    (profiles || []).map(async (profile) => {
      const url = profile.avatar_url;
      if (!url?.startsWith('http')) return;
      try {
        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) return;
        const buf = await res.arrayBuffer();
        const ct  = res.headers.get('content-type') || 'image/jpeg';
        avatarDataUrls[profile.id] = `data:${ct};base64,${Buffer.from(buf).toString('base64')}`;
      } catch { /* silently fall back to proxy */ }
    })
  );

  return <ParentClient profiles={profiles || []} initialPlans={initialPlans || []} avatarDataUrls={avatarDataUrls} />;
}
