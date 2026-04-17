"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, Lock, Play, Volume2, CalendarDays, AlertCircle, Flame } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import PinGate from "./PinGate";
import CelebrationOverlay from "@/components/CelebrationOverlay";
import LockOverlay from "@/components/LockOverlay";
import { useLockMode } from "@/hooks/useLockMode";

// Pull profileId from URL query e.g. /path?profile=abc-123
function getProfileIdFromUrl() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("profile");
}

export default function ChildPath() {
  const [profileId, setProfileId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [celebration, setCelebration] = useState(null);
  const [activeDate, setActiveDate] = useState("Oct 14");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lockUnlocked, setLockUnlocked] = useState(false);

  // Pull profileId from URL on mount
  useEffect(() => {
    setProfileId(getProfileIdFromUrl());
  }, []);

  // ── Lock Mode ──────────────────────────────────────────────────────────────
  const { isBlocked, setIsBlocked, parentUnlock, unlockError, setUnlockError, unlockCompleted } = useLockMode({
    enabled: !lockUnlocked && !!profile?.lock_mode,
    profileId: profile?.id,
    parentExitPin: profile?.parent_exit_pin,
    onUnlocked: () => setLockUnlocked(true),
  });

  // Speak via ElevenLabs whenever a new step becomes active
  const speakGuide = useCallback(async (text) => {
    if (!profile?.voice_id || isSpeaking) return;
    setIsSpeaking(true);
    try {
      const audio = new Audio(`/api/tts?voiceId=${profile.voice_id}&text=${encodeURIComponent(text)}`);
      audio.play();
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
    } catch {
      setIsSpeaking(false);
    }
  }, [profile?.voice_id, isSpeaking]);

  // Greet on login
  useEffect(() => {
    if (profile) {
      speakGuide(`Welcome back, ${profile.name}! Ready to learn today? Let's go!`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  // Mock week data
  const weeklyData = {
    "Oct 10": { dayName: "Mon", status: "completed", steps: [
      { title: "Math",    isCompleted: true,  isCurrent: false, time: "15 min" },
      { title: "Audiobook", isCompleted: true, isCurrent: false, time: "20 min" },
    ]},
    "Oct 11": { dayName: "Tue", status: "completed", steps: [
      { title: "Spelling",    isCompleted: true, isCurrent: false, time: "10 min" },
      { title: "Logic Puzzles", isCompleted: true, isCurrent: false, time: "15 min" },
    ]},
    "Oct 12": { dayName: "Wed", status: "missed", steps: [
      { title: "Math",      isCompleted: true,  isCurrent: false, time: "15 min" },
      { title: "Audiobook", isCompleted: false, isCurrent: true,  time: "20 min" },
      { title: "Word Runner", isCompleted: false, isCurrent: false, time: "Reward" },
    ]},
    "Oct 13": { dayName: "Thu", status: "missed", steps: [
      { title: "Spelling", isCompleted: false, isCurrent: true,  time: "10 min" },
      { title: "Math",     isCompleted: false, isCurrent: false, time: "15 min" },
    ]},
    "Oct 14": { dayName: "Fri", status: "current", steps: [
      { title: "Math",     isCompleted: true,  isCurrent: false, time: "15 min" },
      { title: "Spelling", isCompleted: false, isCurrent: true,  time: "10 min" },
      { title: "Audiobook", isCompleted: false, isCurrent: false, time: "20 min" },
      { title: "Word Runner", isCompleted: false, isCurrent: false, time: "Reward" },
    ]},
  };

  const dates = Object.keys(weeklyData);
  const activeSteps = weeklyData[activeDate].steps;
  const isPastNotFinished = weeklyData[activeDate].status === "missed";

  // Simulate completing a step
  const handleStartModule = (step) => {
    // In Phase 4 this will launch the real module
    // For now simulate completion and celebrate
    setCelebration({ message: `You finished ${step.title}! 🎉` });
    speakGuide(`Amazing work on ${step.title}! You are a superstar!`);
  };

  // ── PIN Gate ──────────────────────────────────────────────────────────────────
  if (!profile) {
    if (!profileId) {
      return (
        <div className="min-h-screen flex items-center justify-center text-slate-400 bg-sky-50">
          <p className="text-lg font-semibold">No student profile found in URL.<br />Ask a parent to share the correct link.</p>
        </div>
      );
    }
    return (
      <PinGate
        profileId={profileId}
        profileName="Student"
        onSuccess={(p) => {
          // ⚡ Must request fullscreen synchronously here, inside the user gesture
          // (button click → fetch → this callback). React's setState is async and
          // loses the gesture context, so doing it in a useEffect would be blocked.
          if (p.lock_mode) {
            const el = document.documentElement;
            if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
          }
          setProfile(p);
        }}
      />
    );
  }

  // ── Authenticated Child View ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-sky-50 font-[family-name:var(--font-geist-sans)] selection:bg-indigo-500/30 overflow-hidden relative pb-32">
      {/* Lock Overlay — shown when alt-tabbed or fullscreen exited */}
      {isBlocked && profile?.lock_mode && !lockUnlocked && (
        <LockOverlay
          childName={profile.name}
          onReturn={() => { setIsBlocked(false); }}
          onParentUnlock={parentUnlock}
          unlockError={unlockError}
        />
      )}

      {/* Celebration Overlay */}
      {celebration && (
        <CelebrationOverlay
          message={celebration.message}
          onDone={() => setCelebration(null)}
        />
      )}


      {/* Voice Guide Header */}
      <nav className="flex justify-between items-center px-6 py-5 relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 bg-white border border-slate-100 shadow-md px-4 py-3 rounded-full">
          <button
            onClick={() => speakGuide(isPastNotFinished ? "Let's finish up what we missed!" : "Great job! Keep going, you are doing amazing!")}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-[colors,transform,shadow] shadow-lg ${isSpeaking ? "bg-indigo-400 animate-pulse scale-110" : "bg-indigo-500 hover:bg-indigo-400 hover:scale-105"}`}
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Guide Voice</p>
            <p className="text-slate-700 font-bold text-sm">
              {isPastNotFinished ? "Let's finish what we missed!" : `Ready for today, ${profile.name}?`}
            </p>
          </div>
        </div>

        {/* Streak Badge + Avatar */}
        <div className="flex items-center gap-4">
          {(profile.current_streak > 0) && (
            <div className="flex items-center gap-2 bg-orange-100 border border-orange-200 px-4 py-2 rounded-full shadow-sm">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-black text-orange-600">{profile.current_streak} Day Streak!</span>
            </div>
          )}
          <div className="bg-white p-1 rounded-full shadow-md border border-slate-100">
            <div className={`w-10 h-10 rounded-full ${profile.avatar_url || "bg-indigo-500"} text-white flex items-center justify-center font-bold text-base`}>
              {profile.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </nav>

      {/* Horizontal Calendar Timeline */}
      <section className="relative z-10 max-w-4xl mx-auto mt-6 px-6">
        <div className="bg-white border border-slate-100 shadow-md p-4 rounded-3xl flex items-center justify-between overflow-x-auto gap-4">
          <div className="flex items-center gap-2 px-4 text-indigo-400 font-bold border-r border-slate-200 shrink-0">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div className="flex flex-1 justify-around gap-2 min-w-[500px]">
            {dates.map((date) => {
              const dayObj = weeklyData[date];
              const isActive = activeDate === date;
              return (
                <button
                  key={date}
                  onClick={() => setActiveDate(date)}
                  className={`flex flex-col items-center p-3 rounded-2xl min-w-[72px] transition-[colors,transform,shadow]
                    ${isActive ? "bg-white shadow-md border border-indigo-100 scale-110" : "hover:bg-white/50 border border-transparent"}`}
                >
                  <p className={`text-xs font-bold uppercase mb-1 ${isActive ? "text-indigo-400" : "text-slate-400"}`}>{dayObj.dayName}</p>
                  <p className={`text-xl font-black mb-2 ${isActive ? "text-slate-800" : "text-slate-600"}`}>{date.split(" ")[1]}</p>
                  <div>
                    {dayObj.status === "completed" && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />}
                    {dayObj.status === "missed"    && <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]" />}
                    {dayObj.status === "current"   && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stepping Stones */}
      <main className="relative z-10 max-w-3xl mx-auto mt-14 px-6">
        <div className="text-center mb-14 flex flex-col items-center">
          {isPastNotFinished && (
            <div className="bg-rose-100 text-rose-600 font-bold px-4 py-1.5 rounded-full text-sm inline-flex items-center gap-2 mb-4 border border-rose-200">
              <AlertCircle className="w-4 h-4" /> Making up missed work
            </div>
          )}
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-900 to-slate-700 mb-4 tracking-tight">
            {isPastNotFinished ? "Catch-Up Path" : "Today's Path"}
          </h1>
          <p className="text-slate-500 font-medium text-lg bg-white inline-block px-5 py-2 rounded-full border border-slate-100 shadow-sm">
            {weeklyData[activeDate].dayName}, {activeDate}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[39px] top-4 bottom-4 w-2 bg-gradient-to-b from-emerald-200 via-indigo-200 to-white/80 rounded-full" />
          <div className="space-y-12">
            {activeSteps.map((step, idx) => (
              <div key={idx} className={`flex items-center gap-8 group ${!step.isCompleted && !step.isCurrent ? "opacity-70 saturate-50" : ""}`}>
                <div className="relative z-10 w-20 h-20 flex-shrink-0">
                  {step.isCompleted ? (
                    <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center border-[6px] border-emerald-50 shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                  ) : step.isCurrent ? (
                    <div className="w-full h-full rounded-full bg-indigo-500 flex items-center justify-center border-[6px] border-indigo-50 shadow-[0_10px_40px_rgba(99,102,241,0.4)] animate-[pulse_3s_ease-in-out_infinite]">
                      <Play className="w-8 h-8 text-white ml-2" />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-[6px] border-slate-100 shadow-md">
                      <Lock className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                </div>

                <div className={`flex-1 p-6 rounded-[2rem] border-2 transition-[colors,transform,shadow] duration-500
                  ${step.isCurrent
                    ? "bg-white border-indigo-200 shadow-2xl shadow-indigo-500/10 cursor-pointer hover:border-indigo-300 hover:-translate-y-1"
                    : step.isCompleted
                      ? "bg-white/60 border-transparent shadow-sm"
                      : "bg-white/40 border-transparent"}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${step.isCompleted ? "text-emerald-500" : step.isCurrent ? "text-indigo-500" : "text-slate-400"}`}>
                        Step {idx + 1}
                      </p>
                      <h2 className={`text-2xl font-bold tracking-tight ${step.isCompleted ? "text-slate-500" : step.isCurrent ? "text-slate-800" : "text-slate-400"}`}>
                        {step.title}
                      </h2>
                    </div>
                    {step.isCurrent ? (
                      <button
                        onClick={() => handleStartModule(step)}
                        className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-colors"
                      >
                        Start Module
                      </button>
                    ) : (
                      <div className="bg-slate-100/50 text-slate-400 px-4 py-2 rounded-xl font-medium text-sm border border-slate-100">
                        {step.time}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
