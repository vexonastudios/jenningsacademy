import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CalendarSync, Settings2, TrendingUp, Flame, ChevronRight, BookOpen, Calculator, Type, Gamepad2 } from "lucide-react";
import Link from "next/link";
import HubClient from "./HubClient";

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
  if (!userId) redirect("/sign-in");

  const todayStr = new Date().toISOString().split("T")[0];

  // Fetch all profiles + today's plans + family slug in parallel
  const [{ data: profiles }, { data: plans }, { data: settings }] = await Promise.all([
    supabase.from("profiles").select("*").eq("parent_id", userId).order("created_at", { ascending: true }),
    supabase.from("daily_plans").select("profile_id, modules").eq("target_date", todayStr),
    supabase.from("parent_settings").select("family_slug").eq("user_id", userId).single()
  ]);

  const safeProfiles = profiles || [];
  const planMap = Object.fromEntries((plans || []).map(p => [p.profile_id, p.modules || []]));
  const familySlug = settings?.family_slug || "";

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
      <header className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Jennings Academy</h1>
          <p className="text-slate-400 text-sm font-medium">Good morning! Here's where your family stands today.</p>
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
      />
    </div>
  );
}
