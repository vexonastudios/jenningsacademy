"use client";

import { useMemo } from "react";
import LogicEngine from "./components/LogicEngine";
import { TRUTH_AND_WISDOM_CONTENT } from "./content/truthAndWisdom";
import { FALLACY_DETECTIVE_CONTENT } from "./content/fallacyDetective";
import { DEDUCTION_STUDIO_CONTENT } from "./content/deductionStudio";

export default function LogicModule({ grade, attempt, voiceId, profileId, onRoundComplete }) {
  
  // Select curriculum based on grade tier
  const { content, title, subtitle } = useMemo(() => {
    if (grade >= 1 && grade <= 5) {
      return { content: TRUTH_AND_WISDOM_CONTENT, title: "Truth & Wisdom", subtitle: "Foundations of Reasoning" };
    }
    if (grade >= 6 && grade <= 8) {
      return { content: FALLACY_DETECTIVE_CONTENT, title: "Fallacy Detective", subtitle: "Argument Lab" };
    }
    // Grades 9-12 (and fallback)
    return { content: DEDUCTION_STUDIO_CONTENT, title: "Build the Argument", subtitle: "Deduction Studio" };
  }, [grade]);

  const handleComplete = (metrics) => {
    onRoundComplete({
      score: metrics.score,
      metadata: {
        logicTier: title,
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
          onComplete={handleComplete} 
        />
      </main>

    </div>
  );
}
