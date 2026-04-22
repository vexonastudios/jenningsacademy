"use client";

import { useMemo } from "react";
import LogicEngine from "./components/LogicEngine";
import { LOGIC_CONTENT } from "./content";

export default function LogicModule({ grade, attempt, voiceId, profileId, onRoundComplete }) {
  
  const isTestDay = new Date().getDay() === 5;

  // Select curriculum based on grade tier
  const { content, title, subtitle } = useMemo(() => {
    let source = LOGIC_CONTENT[grade] || LOGIC_CONTENT[5];
    let t = "Truth & Wisdom";
    let s = "Foundations of Reasoning";
    
    if (grade >= 1 && grade <= 5) {
      t = "Truth & Wisdom";
      s = "Foundations of Reasoning";
    } else if (grade >= 6 && grade <= 8) {
      t = "Fallacy Detective";
      s = "Argument Lab";
    } else {
      // Grades 9-12 (and fallback)
      t = "Build the Argument";
      s = "Deduction Studio";
    }
    
    // Pick subset: 8 questions for Friday tests, 4 for daily practice
    const shuffled = [...source].sort(() => 0.5 - Math.random());
    return { content: shuffled.slice(0, isTestDay ? 8 : 4), title: t, subtitle: s };
  }, [grade, isTestDay]);

  const handleComplete = (metrics) => {
    onRoundComplete({
      score: isTestDay ? metrics.score : null, // Only record official score on Fridays
      metadata: {
        logicTier: title,
        isTest: isTestDay,
        ...metrics
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative pb-20">
      
      {/* Module Header Header */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-10 sticky top-0">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h1>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {isTestDay && (
              <div className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full text-sm animate-pulse">
                Weekly Test
              </div>
            )}
            <div className="bg-rose-100 text-rose-700 font-bold px-3 py-1 rounded-full text-sm">
              Grade {grade}
            </div>
          </div>
        </div>
      </header>

      {/* Main Engine */}
      <main className="flex-1 flex w-full">
        <LogicEngine 
          content={content} 
          voiceId={voiceId} 
          isTestMode={isTestDay}
          onComplete={handleComplete} 
        />
      </main>

    </div>
  );
}
