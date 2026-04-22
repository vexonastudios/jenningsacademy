import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CalendarSync, Settings2, TrendingUp, Flame, ChevronRight, BookOpen, Calculator, Type, Gamepad2 } from "lucide-react";
import Link from "next/link";
import HubClient from "./HubClient";
import LandingPage from "./LandingPage";

// Map module type → colour ring for mini plan chips
const MODULE_COLORS = {
  Math:          "bg-blue-100 text-blue-700",
  Spelling:      "bg-purple-100 text-purple-700",
  Audiobook:     "bg-amber-100 text-amber-700",
  Logic:         "bg-rose-100 text-rose-700",
  "Reward Unlock": "bg-emerald-100 text-emerald-700",
};

function StatChip({ label, value, accent }) {
  return (
    <div className={`flex flex-col items-center bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100`}>
      <span className={`text-2xl font-black ${accent}`}>{value}</span>
      <span className="text-xs text-slate-400 font-semibold mt-0.5 text-center">{label}</span>
    </div>
  );
}

export default async function Home() {
  const { userId } = await auth();
  if (!userId) return <LandingPage />;

  const todayStr = new Date().toISOString().split("T")[0];

  // Fetch profiles + settings
  const [{ data: profiles }, { data: settings }] = await Promise.all([
    supabase.from("profiles").select("*").eq("parent_id", userId).order("created_at", { ascending: true }),
    supabase.from("parent_settings").select("family_slug").eq("user_id", userId).single()
  ]);

  const safeProfiles = profiles || [];
  const familySlug = settings?.family_slug || "";

  // JIT Generate/Fetch today's plan for every child
  const { getOrGenerateDailyPlan } = await import("@/lib/planEngine");
  const plans = await Promise.all(safeProfiles.map(p => getOrGenerateDailyPlan(p.id, todayStr)));
  
  const planMap = Object.fromEntries(plans.map(p => [p.profile_id, p.modules || []]));
  const planIds = plans.map(p => p.id).filter(Boolean);

  // Fetch recent completed sessions (last 30 days) for historical views
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  let rawSessions = [];
  if (safeProfiles.length > 0) {
    const { data } = await supabase
      .from("sessions")
      .select("profile_id, daily_plan_id, module_type, score, time_spent_seconds, created_at")
      .in("profile_id", safeProfiles.map(p => p.id))
      .gte("created_at", thirtyDaysAgo.toISOString())
      .eq("completed", true);
    rawSessions = data || [];
  }

  // Spelling mastery history — all time (not just 30 days) for the progress chart
  let spellingHistory = [];
  if (safeProfiles.length > 0) {
    const { data } = await supabase
      .from("sessions")
      .select("profile_id, score, metadata")
      .in("profile_id", safeProfiles.map(p => p.id))
      .eq("module_type", "Spelling")
      .eq("completed", true)
      .order("created_at", { ascending: true });
    spellingHistory = data || [];
  }

  const completedSessions = rawSessions;

  // Summary stats
  const currentDayShort = new Date().toLocaleDateString("en-US", { weekday: "short" });
  const totalChildren = safeProfiles.length;
  const totalModulesToday = safeProfiles.reduce((acc, p) => {
    const mods = planMap[p.id] || [];
    return acc + mods.filter(m => !m.active_days || m.active_days.includes(currentDayShort)).length;
  }, 0);
  const streakTop = Math.max(0, ...safeProfiles.map(p => p.current_streak || 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 font-[family-name:var(--font-geist-sans)]">
      
      {/* ── Top Nav ── */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Jennings Academy"
            width={48}
            height={48}
            className="h-12 w-auto drop-shadow-sm"
          />
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight leading-tight">Jennings Academy</h1>
            <p className="text-slate-400 text-xs font-medium">Good morning! Here's where your family stands today.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/parent" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-[colors,transform,shadow] hover:-translate-y-0.5">
            <CalendarSync className="w-4 h-4" /> Manage Plans
          </Link>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </header>
      <HubClient 
        safeProfiles={safeProfiles} 
        planMap={planMap} 
        totalChildren={totalChildren} 
        totalModulesToday={totalModulesToday} 
        streakTop={streakTop} 
        familySlug={familySlug}
        completedSessions={completedSessions}
        spellingHistory={spellingHistory}
      />
    </div>
  );
}
