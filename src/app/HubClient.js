"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CalendarSync, Settings2, TrendingUp, Flame, ChevronRight, BookOpen, 
  ChevronLeft, Copy, Check 
} from "lucide-react";

const MODULE_COLORS = {
  Math:          "bg-blue-100 text-blue-700",
  Spelling:      "bg-purple-100 text-purple-700",
  Audiobook:     "bg-amber-100 text-amber-700",
  Logic:         "bg-rose-100 text-rose-700",
  "Reward Unlock": "bg-emerald-100 text-emerald-700",
};

// Map day/week date offsets
function buildWeekDays() {
  const days = [];
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  for(let i=0; i<7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      iso: d.toISOString().split('T')[0],
      isToday: d.toISOString().split('T')[0] === todayStr
    });
  }
  return days;
}

const weekDays = buildWeekDays();

function formatOverviewDate(offset) {
  if (offset === 0) return "Today";
  if (offset === -1) return "Yesterday";
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function StatChip({ label, value, accent }) {
  return (
    <div className={`flex flex-col items-center bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100`}>
      <span className={`text-2xl font-black ${accent}`}>{value}</span>
      <span className="text-xs text-slate-400 font-semibold mt-0.5 text-center">{label}</span>
    </div>
  );
}

export default function HubClient({ safeProfiles, planMap, totalChildren, totalModulesToday, streakTop, familySlug }) {
  const [overviewView, setOverviewView] = useState("day"); // 'day', 'week', 'month'
  const [overviewOffset, setOverviewOffset] = useState(0);

  const childLink = (p) => {
    return familySlug && p.child_slug 
      ? `/path/${familySlug}/${p.child_slug}`
      : `/path?profile=${p.id}`;
  };

  const CopyButtonLink = ({ profile }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = (e) => {
      e.preventDefault();
      const url = `${window.location.origin}${childLink(profile)}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    };

    return (
      <button 
        onClick={handleCopy} 
        title="Copy child's login link"
        className={`absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-md z-10 ${copied ? 'bg-emerald-500 text-white' : 'bg-white border text-slate-400 hover:text-indigo-600 hover:border-indigo-200'}`}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    );
  };

  return (
    <main className="px-6 pb-16 max-w-7xl mx-auto space-y-8">
      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-3 gap-4">
        <StatChip label="Students" value={totalChildren} accent="text-indigo-600" />
        <StatChip label="Modules Today" value={totalModulesToday} accent="text-purple-600" />
        <StatChip label="Top Streak" value={`${streakTop}🔥`} accent="text-amber-600" />
      </div>

      {/* ── Progress Overview ── */}
      <section className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/60 border border-slate-100 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" /> Progress Overview
            </h2>
            <p className="text-sm text-slate-400 font-medium mt-0.5">
              {overviewView === "week" ? "Last 7 days across all students" : 
               overviewView === "month" ? "This month's summary" : 
               formatOverviewDate(overviewOffset)}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Day Navigation — hidden in week/month view */}
            {overviewView === "day" && (
              <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setOverviewOffset(o => o - 1)}
                  className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-[colors,transform,shadow] text-slate-500 hover:text-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOverviewOffset(0)}
                  disabled={overviewOffset === 0}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg hover:bg-white hover:shadow-sm transition-[colors,transform,shadow] text-slate-500 disabled:opacity-40"
                >
                  Today
                </button>
                <button
                  onClick={() => setOverviewOffset(o => Math.min(o + 1, 0))}
                  disabled={overviewOffset === 0}
                  className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-[colors,transform,shadow] text-slate-500 hover:text-slate-800 disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Day / Week / Month Toggle */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => { setOverviewView("day"); setOverviewOffset(0); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-[colors,transform,shadow] ${overviewView === "day" ? "bg-white shadow-sm text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
              >
                Day
              </button>
              <button
                onClick={() => setOverviewView("week")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-[colors,transform,shadow] ${overviewView === "week" ? "bg-white shadow-sm text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
              >
                Week
              </button>
              <button
                onClick={() => setOverviewView("month")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-[colors,transform,shadow] ${overviewView === "month" ? "bg-white shadow-sm text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
              >
                Month
              </button>
            </div>
          </div>
        </div>

        {safeProfiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-300">
            <Settings2 className="w-16 h-16 mb-4 opacity-40" />
            <p className="text-sm font-semibold">No students yet — add one in Manage Plans</p>
          </div>
        ) : overviewView === "day" ? (
          /* ---- DAY VIEW ---- */
          <div className="divide-y divide-slate-50">
            {safeProfiles.map((child) => {
              const modules = planMap[child.id] || [];
              const currentDayShort = new Date().toLocaleDateString("en-US", { weekday: "short" });
              const activeModules = modules.filter(m => !m.active_days || m.active_days.includes(currentDayShort));
              const todayStrStrict = new Date().toISOString().split("T")[0];
              const childSessions = completedSessions?.filter(s => s.profile_id === child.id && s.created_at?.startsWith(todayStrStrict)) || [];
              
              // Only count unique module types to avoid over-100% bugs if they replay
              const doneTypes = new Set(childSessions.map(s => s.module_type));
              const done = activeModules.filter(m => doneTypes.has(m.type)).length;
              
              const pct = activeModules.length ? Math.round((done / activeModules.length) * 100) : 0;
              const hasPhoto = child.avatar_url?.startsWith("http") || child.avatar_url?.startsWith("/api/");

              return (
                <div key={child.id} className="flex items-center gap-5 py-5 first:pt-0 last:pb-0 group">
                  {/* Avatar */}
                  <div className="shrink-0 relative">
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
                    <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{child.name}</p>
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
                    ) : (() => {
                      const currentDayShort = new Date().toLocaleDateString("en-US", { weekday: "short" });
                      const activeModules = modules.filter(m => !m.active_days || m.active_days.includes(currentDayShort));
                      
                      return activeModules.length === 0 ? (
                        <span className="text-xs text-slate-300 font-medium italic">Rest day</span>
                      ) : activeModules.map((m, i) => (
                        <span key={i} className={`text-xs font-bold px-3 py-1 rounded-lg ${MODULE_COLORS[m.type] || "bg-slate-100 text-slate-600"}`}>
                          {m.type}
                        </span>
                      ));
                    })()}
                  </div>

                      {/* Launch button */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(`${window.location.origin}${childLink(child)}`);
                        const btn = e.currentTarget;
                        const origText = btn.innerHTML;
                        btn.innerHTML = `<svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
                        setTimeout(() => btn.innerHTML = origText, 2500);
                      }}
                      className="text-xs font-bold px-3 py-2 text-slate-400 hover:text-indigo-600 flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Link
                    </button>
                    <Link
                      href={childLink(child)}
                      className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-[colors,transform,shadow] hover:-translate-y-0.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Start
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ---- WEEK/MONTH MOCK VIEW ---- */
          <div className="overflow-x-auto pt-2">
            <table className="w-full min-w-[700px] text-sm hidden sm:table">
              <thead>
                <tr>
                  <th className="text-left pb-3 pr-6 font-semibold text-slate-400 text-xs uppercase tracking-wider w-36">Student</th>
                  {overviewView === "week" ? weekDays.map(d => (
                    <th key={d.label} className={`pb-3 px-2 font-semibold text-xs uppercase tracking-wider text-center ${d.isToday ? "text-indigo-500" : "text-slate-400"}`}>
                      <div>{d.label}</div>
                      <div className={`text-base font-black mt-0.5 ${d.isToday ? "text-indigo-600" : "text-slate-700"}`}>{d.date}</div>
                    </th>
                  )) : (
                    // Month View Columns
                    [1, 2, 3, 4].map(w => (
                      <th key={w} className="pb-3 px-2 font-semibold text-xs uppercase tracking-wider text-center text-slate-400">
                        <div>Week {w}</div>
                        <div className="text-base font-black mt-0.5 text-slate-700">Avg</div>
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {safeProfiles.map((child) => {
                  const hasPhoto = child.avatar_url?.startsWith("http") || child.avatar_url?.startsWith("/api/");
                  return (
                    <tr key={child.id} className="hover:bg-indigo-50/20 transition-colors group">
                      <td className="py-3 pr-6">
                        <div className="flex items-center gap-3">
                          {hasPhoto ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={`/api/avatar/${child.id}`} alt={child.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                          ) : (
                            <div className={`w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                              {child.name?.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="font-semibold text-slate-700 text-xs">{child.name}</span>
                        </div>
                      </td>
                      {overviewView === "week" ? weekDays.map((d, dIdx) => {
                        const childModules = planMap[child.id] || [];
                        const activeMods = childModules.filter(m => !m.active_days || m.active_days.includes(d.label));
                        const doneThisDay = completedSessions?.filter(s => s.profile_id === child.id && s.created_at?.startsWith(d.iso)) || [];
                        const unqDone = new Set(doneThisDay.map(s => s.module_type)).size;
                        const realPct = activeMods.length > 0 ? Math.round((unqDone / activeMods.length) * 100) : null;

                        return (
                          <td key={d.label} className="py-3 px-2 text-center">
                            {realPct === null ? (
                              <span className="text-slate-300 text-xs">—</span>
                            ) : (
                              <div className="flex flex-col items-center gap-1">
                                <div className="w-full max-w-[60px] h-2 bg-slate-100 rounded-full overflow-hidden mx-auto">
                                  <div className={`h-full rounded-full ${realPct === 100 ? "bg-emerald-400" : realPct >= 75 ? "bg-amber-400" : realPct > 0 ? "bg-indigo-400" : "bg-transparent"}`} style={{ width: `${realPct}%` }} />
                                </div>
                                <span className={`text-xs font-bold ${realPct === 100 ? "text-emerald-600" : realPct >= 75 ? "text-amber-600" : realPct > 0 ? "text-indigo-500" : "text-slate-300"}`}>{realPct}%</span>
                              </div>
                            )}
                          </td>
                        );
                      }) : (
                        // Month View Mock Data Rows
                        [1, 2, 3, 4].map((w, wIdx) => {
                          const mockPct = wIdx < 2 ? (wIdx % 2 === 0 ? 95 : 80) : null;
                          return (
                            <td key={w} className="py-3 px-2 text-center">
                              {mockPct === null ? (
                                <span className="text-slate-300 text-xs">—</span>
                              ) : (
                                <div className="flex flex-col items-center gap-1">
                                  <div className="w-full max-w-[60px] h-2 bg-slate-100 rounded-full overflow-hidden mx-auto">
                                    <div className={`h-full rounded-full ${mockPct >= 90 ? "bg-emerald-400" : "bg-amber-400"}`} style={{ width: `${mockPct}%` }} />
                                  </div>
                                  <span className={`text-xs font-bold ${mockPct >= 90 ? "text-emerald-600" : "text-amber-600"}`}>{mockPct}%</span>
                                </div>
                              )}
                            </td>
                          );
                        })
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {/* Mobile Fallback */}
            <div className="sm:hidden py-10 text-center text-slate-400 text-sm">
              Please view on a larger screen to see week and month trends.
            </div>
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
          <div className="flex flex-wrap gap-6">
            {safeProfiles.map((child) => {
              const hasPhoto = child.avatar_url?.startsWith("http") || child.avatar_url?.startsWith("/api/");
              return (
                <div key={child.id} className="relative flex flex-col items-center gap-2 group">
                  <CopyButtonLink profile={child} />
                  <Link href={childLink(child)} className="relative block">
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
                  </Link>
                  <div className="text-center">
                    <p className="font-bold text-slate-800 text-sm">{child.name}</p>
                    <p className="text-xs text-slate-400">Grade {child.grade_level}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
