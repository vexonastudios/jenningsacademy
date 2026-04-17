"use client";

import { useState } from "react";
import { Check, Lock, Play, Volume2, CalendarDays, AlertCircle } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function ChildPath() {
  const [activeDate, setActiveDate] = useState("Oct 14");

  // Mocking out a week of data
  const weeklyData = {
    "Oct 10": { dayName: "Mon", status: "completed", steps: [
      { title: "Math", isCompleted: true, isCurrent: false, time: "15 min" },
      { title: "Audiobook", isCompleted: true, isCurrent: false, time: "20 min" },
    ]},
    "Oct 11": { dayName: "Tue", status: "completed", steps: [
      { title: "Spelling", isCompleted: true, isCurrent: false, time: "10 min" },
      { title: "Logic Puzzles", isCompleted: true, isCurrent: false, time: "15 min" },
    ]},
    "Oct 12": { dayName: "Wed", status: "missed", steps: [
      { title: "Math", isCompleted: true, isCurrent: false, time: "15 min" },
      { title: "Audiobook", isCompleted: false, isCurrent: true, time: "20 min" },
      { title: "Word Runner", isCompleted: false, isCurrent: false, time: "Reward" },
    ]},
    "Oct 13": { dayName: "Thu", status: "missed", steps: [
      { title: "Spelling", isCompleted: false, isCurrent: true, time: "10 min" },
      { title: "Math", isCompleted: false, isCurrent: false, time: "15 min" },
    ]},
    "Oct 14": { dayName: "Fri", status: "current", steps: [
      { title: "Math", isCompleted: true, isCurrent: false, time: "15 min" },
      { title: "Spelling", isCompleted: false, isCurrent: true, time: "10 min" },
      { title: "Audiobook", isCompleted: false, isCurrent: false, time: "20 min" },
      { title: "Word Runner", isCompleted: false, isCurrent: false, time: "Reward" },
    ]},
  };

  const dates = Object.keys(weeklyData);
  const activeSteps = weeklyData[activeDate].steps;
  const isPastNotFinished = weeklyData[activeDate].status === "missed";

  return (
    <div className="min-h-screen bg-sky-50 font-[family-name:var(--font-geist-sans)] selection:bg-indigo-500/30 overflow-hidden relative pb-32">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/60 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Voice Guide Header */}
      <nav className="flex justify-between items-center px-8 py-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xl px-5 py-3 rounded-full shadow-lg border border-white">
          <button className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-400 hover:scale-105 transition-all shadow-lg shadow-indigo-500/30">
            <Volume2 className="w-5 h-5" />
          </button>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Voice Guide</p>
            <p className="text-slate-700 font-bold text-sm">
              {isPastNotFinished ? "Let's finish up what we missed!" : "Great job! Ready for the next one?"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="bg-white p-1 rounded-full shadow-md border border-slate-100">
             <UserButton afterSignOutUrl="/sign-in" appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
           </div>
        </div>
      </nav>

      {/* Horizontal Calendar Strip Tracker */}
      <section className="relative z-10 max-w-4xl mx-auto mt-8 px-6">
        <div className="bg-white/60 backdrop-blur-md border border-white p-4 rounded-3xl shadow-sm flex items-center justify-between overflow-x-auto gap-4">
          <div className="flex items-center gap-2 px-4 text-indigo-400 font-bold border-r border-slate-200">
            <CalendarDays className="w-6 h-6" />
            <span className="uppercase tracking-widest text-xs hidden sm:block">Timeline</span>
          </div>

          <div className="flex flex-1 justify-around gap-2 min-w-[500px]">
            {dates.map((date) => {
              const dayObj = weeklyData[date];
              const isActive = activeDate === date;
              return (
                <button 
                  key={date} 
                  onClick={() => setActiveDate(date)}
                  className={`flex flex-col items-center p-3 rounded-2xl min-w-[80px] transition-all
                    ${isActive ? "bg-white shadow-md border border-indigo-100 scale-110" : "hover:bg-white/50 border border-transparent"}
                  `}
                >
                  <p className={`text-xs font-bold uppercase mb-1 ${isActive ? "text-indigo-400" : "text-slate-400"}`}>
                    {dayObj.dayName}
                  </p>
                  <p className={`text-xl font-black mb-2 ${isActive ? "text-slate-800" : "text-slate-600"}`}>
                    {date.split(" ")[1]}
                  </p>
                  {/* Status Indicator Bubble */}
                  <div className="relative">
                    {dayObj.status === "completed" && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />}
                    {dayObj.status === "missed" && <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]" />}
                    {dayObj.status === "current" && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stepping Stones UI */}
      <main className="relative z-10 max-w-3xl mx-auto mt-16 px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          {isPastNotFinished && (
            <div className="bg-rose-100 text-rose-600 font-bold px-4 py-1.5 rounded-full text-sm inline-flex items-center gap-2 mb-4 border border-rose-200">
               <AlertCircle className="w-4 h-4" /> Making up missed work
            </div>
          )}
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-900 to-slate-700 mb-4 tracking-tight">
            {isPastNotFinished ? "Catch-Up Path" : "Today's Path"}
          </h1>
          <p className="text-slate-500 font-medium text-lg bg-white/50 backdrop-blur-md inline-block px-5 py-2 rounded-full border border-white shadow-sm">
            {weeklyData[activeDate].dayName}, {activeDate}
          </p>
        </div>

        <div className="relative">
          {/* Vertical Track Line */}
          <div className="absolute left-[39px] top-4 bottom-4 w-2 bg-gradient-to-b from-emerald-200 via-indigo-200 to-white/80 rounded-full" />
          
          <div className="space-y-12">
            {activeSteps.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-8 group ${!step.isCompleted && !step.isCurrent ? 'opacity-70 saturate-50' : 'opacity-100'}`}
              >
                {/* Node Status */}
                <div className="relative z-10 w-20 h-20 flex-shrink-0">
                  {step.isCompleted ? (
                    <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center border-[6px] border-emerald-50 shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
                      <Check className="w-8 h-8 text-white relative z-10" />
                    </div>
                  ) : step.isCurrent ? (
                    <div className="w-full h-full rounded-full bg-indigo-500 flex items-center justify-center border-[6px] border-indigo-50 shadow-[0_10px_40px_rgba(99,102,241,0.4)] animate-[pulse_3s_ease-in-out_infinite]">
                      <Play className="w-8 h-8 text-white ml-2 relative z-10" />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-[6px] border-slate-100 shadow-md">
                      <Lock className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Card */}
                <div 
                  className={`flex-1 p-6 rounded-[2rem] border-2 transition-all duration-500
                    ${step.isCurrent 
                      ? 'bg-white border-indigo-200 shadow-2xl shadow-indigo-500/10 cursor-pointer hover:border-indigo-300 hover:-translate-y-1 hover:shadow-indigo-500/20' 
                      : step.isCompleted
                        ? 'bg-white/60 border-transparent shadow-sm'
                        : 'bg-white/40 border-transparent backdrop-blur-sm'
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${step.isCompleted ? 'text-emerald-500' : step.isCurrent ? 'text-indigo-500' : 'text-slate-400'}`}>
                        Step {idx + 1}
                      </p>
                      <h2 className={`text-2xl font-bold tracking-tight ${step.isCompleted ? 'text-slate-500' : step.isCurrent ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step.title}
                      </h2>
                    </div>
                    {step.isCurrent ? (
                      <button className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-600/30 group-hover:bg-indigo-500 transition-colors">
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
