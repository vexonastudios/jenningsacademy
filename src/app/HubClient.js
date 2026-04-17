"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { 
  CalendarSync, Settings2, TrendingUp, Flame, ChevronRight, BookOpen, 
  ChevronLeft, Copy, Check, X, Printer, Mail, Type
} from "lucide-react";

// ─── Spelling Mastery Chart ───────────────────────────────────────────────────
function SpellingMasteryChart({ profile, spellingHistory }) {
  const sessions = (spellingHistory || []).filter(s => s.profile_id === profile.id);
  if (sessions.length === 0) return <span className="text-xs text-slate-300 italic">No sessions yet</span>;

  // Group by setIndex — for each set, check if any session passed (score >= 80)
  const bySet = {};
  sessions.forEach(s => {
    const idx = s.metadata?.setIndex ?? 0;
    if (!bySet[idx]) bySet[idx] = [];
    bySet[idx].push(s);
  });
  const maxSet = Math.max(0, ...Object.keys(bySet).map(Number));
  // Show all attempted sets plus the next locked one
  const totalSlots = maxSet + 2;

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {Array.from({ length: totalSlots }, (_, i) => {
        const attempts = bySet[i] || [];
        const mastered = attempts.some(s => (s.score ?? 0) >= 80 || s.metadata?.passed === true);
        const attempted = attempts.length > 0;
        const bestScore = attempted ? Math.max(...attempts.map(s => s.score ?? 0)) : null;
        const title = attempted
          ? `Set ${i + 1}: best score ${bestScore}% ${mastered ? '✓ mastered' : '— not yet mastered'}`
          : `Set ${i + 1}: locked`;
        return (
          <div key={i} title={title}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all
              ${mastered ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-300'
                : attempted ? 'bg-amber-400 text-white'
                : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
            {i + 1}
          </div>
        );
      })}
      <span className="text-xs text-slate-400 ml-1">
        {Object.values(bySet).filter(arr => arr.some(s => (s.score ?? 0) >= 80)).length} set{Object.values(bySet).filter(arr => arr.some(s => (s.score ?? 0) >= 80)).length !== 1 ? 's' : ''} mastered
      </span>
    </div>
  );
}

// ─── Word List Modal ─────────────────────────────────────────────────────────
function WordListModal({ profile, onClose }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch on mount
  useState(() => {
    fetch(`/api/spelling-words?profileId=${profile.id}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError("Could not load word list."); setLoading(false); });
  });

  const handlePrint = () => window.print();

  const buildMailtoBody = () => {
    if (!data) return "";
    const lines = [
      `Spelling Word List — ${data.childName} (Grade ${data.grade}, Set ${data.setNumber})`,
      "",
      ...data.words.map((w, i) =>
        `${i + 1}. ${w.word.toUpperCase()}\n   Definition: ${w.hint}\n   In a sentence: "${w.sentence}"`
      ),
      "",
      "Practice these words out loud before the next session!",
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div id="spelling-word-list-modal" className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
            <div>
              <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                <Type className="w-5 h-5 text-purple-500" /> Spelling Word List
              </h3>
              {data && (
                <p className="text-sm text-slate-400 mt-0.5">
                  {data.childName} · Grade {data.grade} · Set {data.setNumber} of {data.totalSets}
                </p>
              )}
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 px-7 py-5">
            {loading && <div className="py-16 text-center text-slate-400 text-sm">Loading word list…</div>}
            {error && <div className="py-16 text-center text-rose-400 text-sm">{error}</div>}
            {data && (
              <ol className="space-y-4">
                {data.words.map((w, i) => (
                  <li key={i} className="bg-slate-50 rounded-2xl px-5 py-4 border border-slate-100">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs text-slate-400 font-bold w-5 shrink-0">{i + 1}.</span>
                      <div className="flex-1">
                        <p className="font-black text-slate-800 text-xl tracking-wide">{w.word}</p>
                        <p className="text-sm text-indigo-600 font-semibold mt-1">{w.hint}</p>
                        {w.sentence && (
                          <p className="text-sm text-slate-500 italic mt-1">&ldquo;{w.sentence}&rdquo;</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* Footer actions */}
          {data && (
            <div className="px-7 py-4 border-t border-slate-100 flex gap-3">
              <button onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-colors">
                <Printer className="w-4 h-4" /> Print List
              </button>
              <a href={`mailto:?subject=Spelling Word List — ${data.childName}&body=${buildMailtoBody()}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-colors">
                <Mail className="w-4 h-4" /> Email to Yourself
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

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

export default function HubClient({ safeProfiles, planMap, totalChildren, totalModulesToday, streakTop, familySlug, completedSessions, spellingHistory }) {
  const [overviewView, setOverviewView] = useState("day"); // 'day', 'week', 'month'
  const [overviewOffset, setOverviewOffset] = useState(0);
  const [wordListProfileId, setWordListProfileId] = useState(null);

  const wordListProfile = wordListProfileId ? safeProfiles.find(p => p.id === wordListProfileId) : null;

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

                  {/* Name + grade + time */}
                  <div className="w-36 shrink-0">
                    <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{child.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-[width] duration-700 ${pct === 100 ? "bg-emerald-400" : "bg-indigo-400"}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-400">{pct}%</span>
                    </div>
                    {/* Total time today */}
                    {(() => {
                      const totalSecs = childSessions.reduce((acc, s) => acc + (s.time_spent_seconds || 0), 0);
                      if (totalSecs < 60) return null;
                      const mins = Math.round(totalSecs / 60);
                      return (
                        <span className="text-xs text-indigo-500 font-bold mt-1 flex items-center gap-1">
                          ⏱ {mins} min{mins !== 1 ? "s" : ""} today
                        </span>
                      );
                    })()}
                    {child.current_streak > 0 && (
                      <span className="text-xs text-amber-600 font-bold flex items-center gap-1 mt-1">
                        <Flame className="w-3 h-3" />{child.current_streak} day streak
                      </span>
                    )}
                  </div>

                  {/* Module chips with completion + time */}
                  <div className="flex flex-wrap gap-2 flex-1">
                    {modules.length === 0 ? (
                      <span className="text-xs text-slate-300 font-medium italic">No plan set</span>
                    ) : (() => {
                      const currentDayShort = new Date().toLocaleDateString("en-US", { weekday: "short" });
                      const activeModules = modules.filter(m => !m.active_days || m.active_days.includes(currentDayShort));
                      
                      return activeModules.length === 0 ? (
                        <span className="text-xs text-slate-300 font-medium italic">Rest day</span>
                      ) : activeModules.map((m, i) => {
                        const sessionForMod = childSessions.find(s => s.module_type === m.type);
                        const isDone = !!sessionForMod;
                        const timeSecs = sessionForMod?.time_spent_seconds || 0;
                        const timeMins = timeSecs > 0 ? Math.round(timeSecs / 60) : null;
                        return (
                          <span key={i} className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                            isDone
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : MODULE_COLORS[m.type] || "bg-slate-100 text-slate-600"
                          }`}>
                            {isDone && <span className="text-emerald-500">✓</span>}
                            {m.type}
                            {isDone && timeMins && (
                              <span className="text-emerald-400 font-normal">{timeMins}m</span>
                            )}
                          </span>
                        );
                      });
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

      {/* ── Spelling Mastery ── */}
      {spellingHistory?.length > 0 && (
        <section className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/60 border border-slate-100 p-8">
          <div className="flex items-center gap-2 mb-5">
            <Type className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-bold text-slate-800">Spelling Mastery</h2>
            <span className="ml-auto flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Mastered</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> In progress</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300 inline-block" /> Locked</span>
            </span>
          </div>
          <div className="divide-y divide-slate-50">
            {safeProfiles.map(child => {
              const childHasSpelling = spellingHistory.some(s => s.profile_id === child.id);
              if (!childHasSpelling) return null;
              const hasPhoto = child.avatar_url?.startsWith("http") || child.avatar_url?.startsWith("/api/");
              return (
                <div key={child.id} className="flex items-center gap-5 py-4 first:pt-0 last:pb-0">
                  {hasPhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/api/avatar/${child.id}`} alt={child.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className={`w-9 h-9 rounded-full ${child.avatar_url || 'bg-indigo-500'} text-white flex items-center justify-center font-bold text-sm shrink-0`}>
                      {child.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="w-24 shrink-0">
                    <p className="font-bold text-slate-700 text-sm">{child.name}</p>
                    <p className="text-xs text-slate-400">Grade {child.grade_level}</p>
                  </div>
                  <div className="flex-1">
                    <SpellingMasteryChart profile={child} spellingHistory={spellingHistory} />
                  </div>
                  <button
                    onClick={() => setWordListProfileId(child.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-xl transition-colors shrink-0">
                    <Printer className="w-3.5 h-3.5" /> Word List
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Word list modal */}
      {wordListProfile && (
        <WordListModal profile={wordListProfile} onClose={() => setWordListProfileId(null)} />
      )}

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
