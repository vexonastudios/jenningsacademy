"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, Lock, Play, Volume2, Flame, Loader2, X } from "lucide-react";
import PinGate from "./PinGate";
import CelebrationOverlay from "@/components/CelebrationOverlay";
import LockOverlay from "@/components/LockOverlay";
import Avatar from "@/components/Avatar";
import { useLockMode } from "@/hooks/useLockMode";
import { fetchTodayPlan, recordSession } from "@/app/actions";

// Pull profileId from URL query e.g. /path?profile=abc-123
function getProfileIdFromUrl() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("profile");
}

/** Small PIN pad for the always-visible parent exit corner button */
function ParentExitPad({ onUnlock, error }) {
  const [pin, setPin] = useState("");
  const digits = [1,2,3,4,5,6,7,8,9,null,0,"⌫"];
  const handleDigit = (d) => {
    if (d === "⌫") { setPin(p => p.slice(0,-1)); return; }
    if (pin.length >= 4) return;
    const next = pin + String(d);
    setPin(next);
    if (next.length === 4) { onUnlock(next); setPin(""); }
  };
  return (
    <div>
      <div className="flex justify-center gap-2 mb-3">
        {[0,1,2,3].map(i => (
          <div key={i} className={`w-8 h-8 rounded-lg border flex items-center justify-center
            ${pin.length > i ? "border-emerald-400 bg-emerald-900/40" : "border-slate-600 bg-slate-800"}`}>
            {pin.length > i && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
          </div>
        ))}
      </div>
      {error && <p className="text-rose-400 text-xs text-center mb-2">{error}</p>}
      <div className="grid grid-cols-3 gap-1.5">
        {digits.map((d, idx) => (
          d === null ? <div key={idx} /> :
          <button key={idx} onClick={() => handleDigit(d)}
            className="h-10 rounded-xl text-sm font-bold text-white bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all">
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChildPath() {
  const [profileId, setProfileId] = useState(null);
  const [profile, setProfile] = useState(null);
  
  const [plan, setPlan] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [loadingPlan, setLoadingPlan] = useState(true);
  
  const [celebration, setCelebration] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lockUnlocked, setLockUnlocked] = useState(false);
  
  // Module Simulator State
  const [activeModuleSim, setActiveModuleSim] = useState(null);
  const [simLoading, setSimLoading] = useState(false);

  // Pull profileId from URL on mount
  useEffect(() => {
    setProfileId(getProfileIdFromUrl());
  }, []);

  // Fetch plan after unlocking pingate
  useEffect(() => {
    if (profile?.id) {
      setLoadingPlan(true);
      fetchTodayPlan(profile.id).then(({ plan, completedModuleTypes }) => {
        setPlan(plan);
        setCompletedModules(completedModuleTypes);
        setLoadingPlan(false);
        speakGuide(`Welcome back, ${profile.name}! Ready to learn today? Let's go!`);
      }).catch(err => {
        console.error("Failed to load plan", err);
        setLoadingPlan(false);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  // Lock Mode
  const { isBlocked, setIsBlocked, returnToWork, parentUnlock, unlockError, setUnlockError, unlockCompleted, showParentExit, setShowParentExit } = useLockMode({
    enabled: !lockUnlocked && !!profile?.lock_mode,
    profileId: profile?.id,
    parentExitPin: profile?.parent_exit_pin,
    onUnlocked: () => setLockUnlocked(true),
  });

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

  const handleStartModule = (mod) => {
    setActiveModuleSim(mod);
    speakGuide(`Starting ${mod.type}! Do your best!`);
  };

  const handleCompleteSimulator = async () => {
    if (!activeModuleSim || !plan) return;
    setSimLoading(true);
    try {
      await recordSession({
        profileId: profile.id,
        planId: plan.id,
        moduleType: activeModuleSim.type,
        score: Math.floor(Math.random() * 20) + 80, // Mock score 80-100
        timeSpent: 600 // Mock 10 minutes
      });
      setCompletedModules(prev => [...prev, activeModuleSim.type]);
      setCelebration({ message: `You finished ${activeModuleSim.type}! 🎉` });
      speakGuide(`Amazing work on ${activeModuleSim.type}! You are a superstar!`);
    } catch (e) {
      alert("Error saving session");
    } finally {
      setSimLoading(false);
      setActiveModuleSim(null);
    }
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
      <PinGate profileId={profileId} profileName="Student" onSuccess={(p) => {
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
      {/* Lock Overlay */}
      {isBlocked && profile?.lock_mode && !lockUnlocked && (
        <LockOverlay childName={profile.name} onReturn={returnToWork} onParentUnlock={parentUnlock} unlockError={unlockError} />
      )}

      {/* Parent Exit Corner */}
      {profile?.lock_mode && !lockUnlocked && !isBlocked && (
        <>
          {showParentExit ? (
            <div className="fixed bottom-6 right-6 z-[9998] bg-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-700 w-64">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white text-xs font-bold">Parent Exit PIN</p>
                <button onClick={() => { setShowParentExit(false); setUnlockError(""); }} className="text-slate-400 hover:text-white text-xs">✕</button>
              </div>
              <ParentExitPad onUnlock={parentUnlock} error={unlockError} />
            </div>
          ) : (
            <button onClick={() => setShowParentExit(true)} className="fixed bottom-6 right-6 z-[9998] bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold px-4 py-2 rounded-full border border-slate-600 shadow-lg transition-all backdrop-blur-sm">
              🔒 Parent Exit
            </button>
          )}
        </>
      )}

      {/* Celebration & Simulator Overlays */}
      {celebration && <CelebrationOverlay message={celebration.message} onDone={() => setCelebration(null)} />}
      
      {activeModuleSim && !celebration && (
        <div className="fixed inset-0 z-[9999] bg-slate-900 text-white flex flex-col items-center justify-center">
          <div className="absolute top-6 right-6">
            <button onClick={() => setActiveModuleSim(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-8 h-8" />
            </button>
          </div>
          <h2 className="text-6xl font-black mb-8 opacity-50">[{activeModuleSim.type} Module Engine]</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-lg text-center">
            This simulates launching into the actual standalone module. In full production, this would be an iframe or a dedicated route for the {activeModuleSim.type} app.
          </p>
          <button 
            onClick={handleCompleteSimulator}
            disabled={simLoading}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:opacity-50 text-white px-12 py-6 rounded-[2rem] text-3xl font-black shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] transition-all hover:-translate-y-2 flex items-center gap-4"
          >
            {simLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Check className="w-10 h-10" />}
            {simLoading ? "Saving Results..." : "Finish Module"}
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex justify-between items-center px-6 py-5 relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 bg-white border border-slate-100 shadow-md px-4 py-3 rounded-full">
          <button
            onClick={() => speakGuide("Keep going, you are doing amazing!")}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-[colors,transform,shadow] shadow-lg ${isSpeaking ? "bg-indigo-400 animate-pulse scale-110" : "bg-indigo-500 hover:bg-indigo-400 hover:scale-105"}`}
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Guide Voice</p>
            <p className="text-slate-700 font-bold text-sm">Ready for today, {profile.name}?</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {(profile.current_streak > 0) && (
            <div className="flex items-center gap-2 bg-orange-100 border border-orange-200 px-4 py-2 rounded-full shadow-sm">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-black text-orange-600">{profile.current_streak} Day Streak!</span>
            </div>
          )}
          <div className="bg-white p-1 rounded-full shadow-md border border-slate-100">
            <Avatar name={profile.name} avatarUrl={profile.avatar_url} profileId={profile.id} className="w-10 h-10 rounded-full" textClass="text-base font-bold" />
          </div>
        </div>
      </nav>

      {/* Main Path Area */}
      <main className="relative z-10 max-w-3xl mx-auto mt-14 px-6">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-900 to-slate-700 mb-4 tracking-tight">Today's Path</h1>
          <p className="text-slate-500 font-medium text-lg bg-white inline-block px-5 py-2 rounded-full border border-slate-100 shadow-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {loadingPlan ? (
          <div className="flex flex-col items-center py-20 text-indigo-400">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="font-bold">Syncing your plan...</p>
          </div>
        ) : !plan || plan.modules?.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">You have a Rest Day!</h2>
            <p className="text-slate-500">Go outside and play!</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-[39px] top-4 bottom-4 w-2 bg-gradient-to-b from-emerald-200 via-indigo-200 to-white/80 rounded-full" />
            <div className="space-y-12">
              {(() => {
                let currentFound = false; // first uncomplete module becomes isCurrent
                return plan.modules.map((mod, idx) => {
                  const isCompleted = completedModules.includes(mod.type);
                  const isCurrent = !isCompleted && !currentFound;
                  if (isCurrent) currentFound = true;

                  return (
                    <div key={idx} className={`flex items-center gap-8 group ${!isCompleted && !isCurrent ? "opacity-70 saturate-50" : ""}`}>
                      <div className="relative z-10 w-20 h-20 flex-shrink-0">
                        {isCompleted ? (
                          <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center border-[6px] border-emerald-50 shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
                            <Check className="w-8 h-8 text-white" />
                          </div>
                        ) : isCurrent ? (
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
                        ${isCurrent
                          ? "bg-white border-indigo-200 shadow-2xl shadow-indigo-500/10 cursor-pointer hover:border-indigo-300 hover:-translate-y-1"
                          : isCompleted
                            ? "bg-white/60 border-transparent shadow-sm"
                            : "bg-white/40 border-transparent"}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${isCompleted ? "text-emerald-500" : isCurrent ? "text-indigo-500" : "text-slate-400"}`}>
                              Step {idx + 1}
                            </p>
                            <h2 className={`text-2xl font-bold tracking-tight ${isCompleted ? "text-slate-500" : isCurrent ? "text-slate-800" : "text-slate-400"}`}>
                              {mod.type}
                            </h2>
                          </div>
                          {isCurrent ? (
                            <button onClick={() => handleStartModule(mod)} className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-colors">
                              Start Module
                            </button>
                          ) : (
                            <div className="bg-slate-100/50 text-slate-400 px-4 py-2 rounded-xl font-medium text-sm border border-slate-100">
                              {isCompleted ? "Complete" : "Locked"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
