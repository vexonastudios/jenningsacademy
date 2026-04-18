"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft, GraduationCap, TrendingUp, Clock, Star,
  ChevronDown, ChevronUp, Award, BookOpen, BarChart3, Calendar
} from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getLetterGrade(score) {
  if (score === null || score === undefined) return { letter: "—", color: "text-slate-400", bg: "bg-slate-50", border: "border-slate-200", bar: "bg-slate-300" };
  if (score >= 93) return { letter: "A",  color: "text-emerald-700", bg: "bg-emerald-50",  border: "border-emerald-200", bar: "bg-emerald-400" };
  if (score >= 90) return { letter: "A−", color: "text-emerald-600", bg: "bg-emerald-50",  border: "border-emerald-200", bar: "bg-emerald-400" };
  if (score >= 87) return { letter: "B+", color: "text-teal-700",    bg: "bg-teal-50",     border: "border-teal-200",    bar: "bg-teal-400" };
  if (score >= 83) return { letter: "B",  color: "text-yellow-700",  bg: "bg-yellow-50",   border: "border-yellow-200",  bar: "bg-yellow-400" };
  if (score >= 80) return { letter: "B−", color: "text-yellow-600",  bg: "bg-yellow-50",   border: "border-yellow-200",  bar: "bg-yellow-400" };
  if (score >= 77) return { letter: "C+", color: "text-orange-700",  bg: "bg-orange-50",   border: "border-orange-200",  bar: "bg-orange-400" };
  if (score >= 73) return { letter: "C",  color: "text-orange-600",  bg: "bg-orange-50",   border: "border-orange-200",  bar: "bg-orange-400" };
  if (score >= 70) return { letter: "C−", color: "text-orange-500",  bg: "bg-orange-50",   border: "border-orange-200",  bar: "bg-orange-400" };
  if (score >= 60) return { letter: "D",  color: "text-rose-700",    bg: "bg-rose-50",     border: "border-rose-200",    bar: "bg-rose-400" };
  return                 { letter: "F",  color: "text-red-700",    bg: "bg-red-50",      border: "border-red-200",    bar: "bg-red-400" };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatMins(secs) {
  if (!secs || secs < 60) return `${secs || 0}s`;
  return `${Math.round(secs / 60)}m`;
}

// ─── Donut Score Ring ─────────────────────────────────────────────────────────
function ScoreRing({ score, size = 80 }) {
  const grade = getLetterGrade(score);
  const r = 28;
  const circ = 2 * Math.PI * r;
  const pct = score != null ? score / 100 : 0;
  const dash = circ * pct;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#f1f5f9" strokeWidth="6" />
        <circle
          cx="32" cy="32" r={r}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ * 0.25}
          className={`transition-all duration-700 ${
            score == null ? "stroke-slate-200" :
            score >= 90 ? "stroke-emerald-400" :
            score >= 80 ? "stroke-yellow-400" :
            score >= 70 ? "stroke-orange-400" :
            score >= 60 ? "stroke-rose-400" : "stroke-red-400"
          }`}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-sm font-black leading-none ${grade.color}`}>{grade.letter}</span>
        {score != null && <span className="text-[9px] text-slate-400 font-bold">{score}%</span>}
      </div>
    </div>
  );
}

// ─── Per-Module Row ───────────────────────────────────────────────────────────
function ModuleRow({ moduleType, sessions }) {
  const [expanded, setExpanded] = useState(false);
  const scored = sessions.filter(s => s.score != null && s.score > 0);
  const avg = scored.length ? Math.round(scored.reduce((a, s) => a + s.score, 0) / scored.length) : null;
  const totalTime = sessions.reduce((a, s) => a + (s.time_spent_seconds || 0), 0);
  const grade = getLetterGrade(avg);

  const MODULE_ICONS = {
    MathFlow: "🧮", Math: "🧮", Spelling: "🔤", Geography: "🌎",
    Logic: "🧠", FeedAnimals: "🐾", "Reward Unlock": "🎁", Reading: "📖",
  };

  return (
    <div className={`rounded-2xl border ${grade.border} ${grade.bg} overflow-hidden transition-all`}>
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-4 p-4 text-left hover:opacity-90 transition-opacity"
      >
        <span className="text-2xl">{MODULE_ICONS[moduleType] || "📘"}</span>
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-sm ${grade.color}`}>{moduleType}</p>
          <p className="text-xs text-slate-400">{sessions.length} session{sessions.length !== 1 ? "s" : ""} · {formatMins(totalTime)} total</p>
        </div>
        {/* Mini score bar */}
        <div className="hidden sm:block w-24">
          <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${grade.bar}`} style={{ width: `${avg ?? 0}%` }} />
          </div>
          <p className={`text-xs font-black mt-1 text-right ${grade.color}`}>{avg != null ? `${avg}%` : "—"}</p>
        </div>
        <div className={`font-black text-lg px-3 py-1 rounded-xl ${grade.bg} ${grade.color} border ${grade.border} ml-2`}>
          {grade.letter}
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>

      {expanded && (
        <div className="border-t border-white/40 px-4 pb-4 pt-2 space-y-2">
          {sessions.map((s, i) => {
            const sg = getLetterGrade(s.score > 0 ? s.score : null);
            return (
              <div key={i} className="flex items-center gap-3 text-xs bg-white/60 rounded-xl px-3 py-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-slate-500 font-medium">{formatDate(s.created_at)}</span>
                <div className={`font-black px-2 py-0.5 rounded-lg ${sg.bg} ${sg.color} border ${sg.border} ml-1`}>
                  {s.score > 0 ? `${s.score}%` : "✓"}
                </div>
                <span className="text-slate-400 ml-auto flex items-center gap-1">
                  <Clock className="w-3 h-3" />{formatMins(s.time_spent_seconds)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Student Report Card ──────────────────────────────────────────────────────
function StudentCard({ profile, sessions }) {
  const [open, setOpen] = useState(false);

  const moduleSessions = useMemo(() => {
    const map = {};
    sessions.forEach(s => {
      if (!map[s.module_type]) map[s.module_type] = [];
      map[s.module_type].push(s);
    });
    return map;
  }, [sessions]);

  const sortedModules = Object.keys(moduleSessions).sort();

  const gradedSessions = sessions.filter(s => s.score > 0);
  const overallAvg = gradedSessions.length
    ? Math.round(gradedSessions.reduce((a, s) => a + s.score, 0) / gradedSessions.length)
    : null;
  const totalTime = sessions.reduce((a, s) => a + (s.time_spent_seconds || 0), 0);
  const totalHours = (totalTime / 3600).toFixed(1);
  const overallGrade = getLetterGrade(overallAvg);
  const hasPhoto = profile.avatar_url?.startsWith("http") || profile.avatar_url?.startsWith("/api/");

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-5 px-8 py-6 text-left hover:bg-slate-50/60 transition-colors"
      >
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/api/avatar/${profile.id}`} alt={profile.name}
            className="w-14 h-14 rounded-full object-cover ring-4 ring-slate-100 shrink-0" />
        ) : (
          <div className={`w-14 h-14 rounded-full ${profile.avatar_url || "bg-indigo-500"} text-white flex items-center justify-center font-black text-xl ring-4 ring-slate-100 shrink-0`}>
            {profile.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h2 className="font-black text-slate-800 text-lg">{profile.name}</h2>
          <p className="text-sm text-slate-400 font-medium">Grade {profile.grade_level} · {sessions.length} sessions</p>
        </div>

        {/* Stats row */}
        <div className="hidden sm:flex items-center gap-6 mr-4">
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium">Avg Score</p>
            <p className={`text-lg font-black ${overallGrade.color}`}>{overallAvg != null ? `${overallAvg}%` : "—"}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium">Study Time</p>
            <p className="text-lg font-black text-indigo-600">{totalHours}h</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium">Modules</p>
            <p className="text-lg font-black text-slate-700">{sortedModules.length}</p>
          </div>
        </div>

        <ScoreRing score={overallAvg} size={72} />
        {open ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0 ml-2" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-2" />}
      </button>

      {open && (
        <div className="border-t border-slate-100 px-8 py-6 space-y-3 bg-slate-50/40">
          {sessions.length === 0 ? (
            <p className="text-slate-400 text-sm italic text-center py-8">No sessions yet in the last 90 days.</p>
          ) : sortedModules.length === 0 ? (
            <p className="text-slate-400 text-sm italic text-center py-8">No scored sessions yet.</p>
          ) : (
            <>
              {/* Overall summary bar */}
              {overallAvg != null && (
                <div className={`flex items-center gap-4 rounded-2xl p-4 border ${overallGrade.border} ${overallGrade.bg} mb-5`}>
                  <Award className={`w-6 h-6 ${overallGrade.color} shrink-0`} />
                  <div className="flex-1">
                    <p className={`text-sm font-black ${overallGrade.color}`}>Overall Average: {overallAvg}% ({overallGrade.letter})</p>
                    <div className="h-2 bg-white/60 rounded-full mt-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${overallGrade.bar} transition-all duration-700`} style={{ width: `${overallAvg}%` }} />
                    </div>
                  </div>
                </div>
              )}
              {sortedModules.map(mod => (
                <ModuleRow key={mod} moduleType={mod} sessions={moduleSessions[mod]} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Report Card Client ──────────────────────────────────────────────────
export default function ReportCardClient({ profiles, sessions }) {
  const [selectedId, setSelectedId] = useState("all");

  const filtered = selectedId === "all"
    ? profiles
    : profiles.filter(p => p.id === selectedId);

  const familyAvg = useMemo(() => {
    const s = sessions.filter(s => s.score > 0);
    return s.length ? Math.round(s.reduce((a, x) => a + x.score, 0) / s.length) : null;
  }, [sessions]);

  const familyGrade = getLetterGrade(familyAvg);
  const totalTime = sessions.reduce((a, s) => a + (s.time_spent_seconds || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30">
      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors p-2 -ml-2 rounded-xl hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-600">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-slate-800 text-lg leading-tight">Report Cards</h1>
              <p className="text-xs text-slate-400 font-medium">Last 90 days</p>
            </div>
          </div>

          {/* Student filter */}
          {profiles.length > 1 && (
            <select
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
              className="text-sm font-bold text-slate-600 bg-slate-100 border-0 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none cursor-pointer"
            >
              <option value="all">All Students</option>
              {profiles.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* ── Family Summary ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: <GraduationCap className="w-5 h-5" />, label: "Students", value: profiles.length, accent: "text-indigo-600", bg: "bg-indigo-50 text-indigo-600" },
            { icon: <BarChart3 className="w-5 h-5" />, label: "Family Avg", value: familyAvg != null ? `${familyAvg}%` : "—", accent: familyGrade.color, bg: `${familyGrade.bg} ${familyGrade.color}` },
            { icon: <Clock className="w-5 h-5" />, label: "Total Study", value: `${(totalTime / 3600).toFixed(1)}h`, accent: "text-amber-600", bg: "bg-amber-50 text-amber-600" },
            { icon: <Star className="w-5 h-5" />, label: "Sessions", value: sessions.length, accent: "text-purple-600", bg: "bg-purple-50 text-purple-600" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col items-center gap-1">
              <div className={`p-2 rounded-xl ${s.bg}`}>{s.icon}</div>
              <span className={`text-2xl font-black ${s.accent}`}>{s.value}</span>
              <span className="text-xs text-slate-400 font-semibold">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Grade Scale Legend */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" /> Grade Scale
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "A  90–100%", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
              { label: "B  80–89%",  color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
              { label: "C  70–79%",  color: "bg-orange-100 text-orange-700 border-orange-200" },
              { label: "D  60–69%",  color: "bg-rose-100 text-rose-700 border-rose-200" },
              { label: "F  <60%",    color: "bg-red-100 text-red-700 border-red-200" },
            ].map(g => (
              <span key={g.label} className={`text-xs font-bold px-3 py-1 rounded-full border ${g.color}`}>{g.label}</span>
            ))}
          </div>
        </div>

        {/* ── Per-Student Cards ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-300">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-40" />
            <p className="font-semibold">No students found.</p>
          </div>
        ) : (
          filtered.map(profile => (
            <StudentCard
              key={profile.id}
              profile={profile}
              sessions={sessions.filter(s => s.profile_id === profile.id)}
            />
          ))
        )}
      </main>
    </div>
  );
}
