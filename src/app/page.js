import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CalendarSync, Settings2, TrendingUp, Flame, ChevronRight, BookOpen, Calculator, Type, Gamepad2 } from "lucide-react";
import Link from "next/link";

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

  // Fetch all profiles + today's plans in parallel
  const [{ data: profiles }, { data: plans }] = await Promise.all([
    supabase.from("profiles").select("*").eq("parent_id", userId).order("created_at", { ascending: true }),
    supabase.from("daily_plans").select("profile_id, modules").eq("target_date", todayStr),
  ]);

  const safeProfiles = profiles || [];
  const planMap = Object.fromEntries((plans || []).map(p => [p.profile_id, p.modules || []]));

  // Build per-child link: prefer friendly URL, fall back to UUID
  const childLink = (p) => {
    if (p.child_slug) {
      // Need family slug too — skip for now, use UUID path
    }
    return `/path?profile=${p.id}`;
  };

  // Summary stats
  const totalChildren = safeProfiles.length;
  const totalModulesToday = safeProfiles.reduce((acc, p) => acc + (planMap[p.id]?.length || 0), 0);
  const streakTotal = safeProfiles.reduce((acc, p) => acc + (p.current_streak || 0), 0);

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

      <main className="px-6 pb-16 max-w-7xl mx-auto space-y-8">

        {/* ── Summary Stats ── */}
        <div className="grid grid-cols-3 gap-4">
          <StatChip label="Students" value={totalChildren} accent="text-indigo-600" />
          <StatChip label="Modules Today" value={totalModulesToday} accent="text-purple-600" />
          <StatChip label="Total Streak Days" value={`${streakTotal}🔥`} accent="text-amber-600" />
        </div>

        {/* ── Progress Overview ── */}
        <section className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/60 border border-slate-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-500" /> Today's Progress
              </h2>
              <p className="text-sm text-slate-400 font-medium mt-0.5">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
            </div>
            <Link href="/parent" className="flex items-center gap-1.5 text-indigo-600 text-xs font-bold hover:text-indigo-800 transition-colors">
              Edit Plans <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {safeProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-300">
              <Settings2 className="w-16 h-16 mb-4 opacity-40" />
              <p className="text-sm font-semibold">No students yet — add one in Manage Plans</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {safeProfiles.map((child) => {
                const modules = planMap[child.id] || [];
                const done = 0; // TODO: pull from sessions when available
                const pct = modules.length ? Math.round((done / modules.length) * 100) : 0;
                const hasPhoto = child.avatar_url?.startsWith("http") || child.avatar_url?.startsWith("/api/");

                return (
                  <div key={child.id} className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                    {/* Avatar */}
                    <div className="shrink-0">
                      {hasPhoto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`/api/avatar/${child.id}`} alt={child.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" />
                      ) : (
                        <div className={`w-12 h-12 rounded-full ${child.avatar_url || "bg-indigo-500"} text-white flex items-center justify-center font-bold text-base ring-2 ring-white shadow-sm`}>
                          {child.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Name + grade */}
                    <div className="w-36 shrink-0">
                      <p className="font-bold text-slate-800">{child.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-[width] duration-700 ${pct === 100 ? "bg-emerald-400" : "bg-indigo-400"}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-400">{pct}%</span>
                      </div>
                      {child.current_streak > 0 && (
                        <span className="text-xs text-amber-600 font-bold flex items-center gap-1 mt-1">
                          <Flame className="w-3 h-3" />{child.current_streak} day streak
                        </span>
                      )}
                    </div>

                    {/* Module chips */}
                    <div className="flex flex-wrap gap-2 flex-1">
                      {modules.length === 0 ? (
                        <span className="text-xs text-slate-300 font-medium italic">No plan set</span>
                      ) : modules.map((m, i) => (
                        <span key={i} className={`text-xs font-bold px-3 py-1 rounded-lg ${MODULE_COLORS[m.type] || "bg-slate-100 text-slate-600"}`}>
                          {m.type}
                        </span>
                      ))}
                    </div>

                    {/* Launch button */}
                    <Link
                      href={childLink(child)}
                      className="shrink-0 flex items-center gap-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-[colors,transform,shadow] hover:-translate-y-0.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Start
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Quick Action Cards ── */}
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/parent" className="group bg-white rounded-[1.5rem] border border-slate-100 shadow-lg shadow-slate-200/40 p-6 flex items-center gap-5 hover:-translate-y-1 transition-[transform,shadow] hover:shadow-indigo-200/60">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <CalendarSync className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-base">Manage Plans</h3>
              <p className="text-slate-400 text-sm mt-0.5">Build, reorder, and publish each child's daily learning schedule.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 ml-auto transition-colors" />
          </Link>

          <Link href="/parent" className="group bg-white rounded-[1.5rem] border border-slate-100 shadow-lg shadow-slate-200/40 p-6 flex items-center gap-5 hover:-translate-y-1 transition-[transform,shadow] hover:shadow-purple-200/60">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Settings2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-base">Student Profiles</h3>
              <p className="text-slate-400 text-sm mt-0.5">Edit child settings, guide voice, lock mode, and profile photos.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500 ml-auto transition-colors" />
          </Link>
        </div>

        {/* ── Student Quick-Launch ── */}
        {safeProfiles.length > 0 && (
          <section className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/60 border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-5">Student Quick-Launch</h2>
            <div className="flex flex-wrap gap-4">
              {safeProfiles.map((child) => {
                const hasPhoto = child.avatar_url?.startsWith("http") || child.avatar_url?.startsWith("/api/");
                return (
                  <Link
                    key={child.id}
                    href={childLink(child)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="relative">
                      {hasPhoto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`/api/avatar/${child.id}`} alt={child.name}
                          className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-100 group-hover:ring-indigo-300 shadow-lg transition-all group-hover:-translate-y-1" />
                      ) : (
                        <div className={`w-20 h-20 rounded-full ${child.avatar_url || "bg-indigo-500"} text-white flex items-center justify-center font-black text-2xl ring-4 ring-slate-100 group-hover:ring-indigo-300 shadow-lg transition-all group-hover:-translate-y-1`}>
                          {child.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <BookOpen className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-800 text-sm">{child.name}</p>
                      <p className="text-xs text-slate-400">Grade {child.grade_level}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
