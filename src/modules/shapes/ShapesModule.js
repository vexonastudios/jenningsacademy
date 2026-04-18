"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { SHAPES_CURRICULUM } from "./content/shapesCurriculum";
import ShapeIntro from "./components/ShapeIntro";
import ModeTapShape from "./components/ModeTapShape";
import ModeDragOutline from "./components/ModeDragOutline";
import ShapesReview from "./components/ShapesReview";

// phases: intro -> tap -> drag_outline -> review
const PHASES = ["intro", "tap", "drag_outline", "review"];

export default function ShapesModule({ profileId, grade, onRoundComplete }) {
  const [loading, setLoading] = useState(true);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [targetShape, setTargetShape] = useState(null);
  
  // Audio state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);

  // Load state and pick today's shape
  useEffect(() => {
    // In a full DB implementation we would fetch which shapes they've mastered.
    // For MVP, we pick a random one they haven't just done, or just step sequentially.
    try {
      const ledgerKey = `shapes_ledger_${profileId}`;
      const saved = localStorage.getItem(ledgerKey);
      let lastIndex = -1;
      
      if (saved) {
        const parsed = JSON.parse(saved);
        lastIndex = SHAPES_CURRICULUM.findIndex(s => s.id === parsed.lastShapeId);
      }
      
      // Pick the next shape in sequence, looping around
      const todayIndex = (lastIndex + 1) % SHAPES_CURRICULUM.length;
      setTargetShape(SHAPES_CURRICULUM[todayIndex]);
    } catch(e) {
      setTargetShape(SHAPES_CURRICULUM[0]);
    }
    
    setLoading(false);
  }, [profileId]);

  const speak = (text) => {
    if (!profileId || !text) return;
    setIsSpeaking(true);
    if (audioRef.current) {
       audioRef.current.pause();
    }
    
    // We assume default profile fetches or we pass it down. 
    // In actual app, we hit the /api/tts. Let's use a default voice if profile is not fully loaded.
    const audio = new Audio(`/api/tts?voiceId=flq6f7yk4E4fJM5XTYuZ&text=${encodeURIComponent(text)}`);
    audioRef.current = audio;
    audio.play();
    audio.onended = () => setIsSpeaking(false);
    audio.onerror = () => setIsSpeaking(false);
  };

  const handleNextPhase = () => {
    if (phaseIndex < PHASES.length - 1) {
       setPhaseIndex(i => i + 1);
    }
  };

  const handleComplete = () => {
     // Save progress local ledger
     const ledgerKey = `shapes_ledger_${profileId}`;
     localStorage.setItem(ledgerKey, JSON.stringify({
         lastShapeId: targetShape.id,
         completedAt: new Date().toISOString()
     }));

     // Push upward to hub
     if (onRoundComplete) {
         onRoundComplete({
             score: 100, // They successfully completed the interactive track
             totalItems: 3,
             correctItems: 3,
             metadata: { shapeLearned: targetShape.id, shapeName: targetShape.name }
         });
     }
  };

  if (loading || !targetShape) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-full gap-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-400" />
        <p className="font-semibold text-sm">Building Shape World...</p>
      </div>
    );
  }

  const currentPhase = PHASES[phaseIndex];

  return (
    <div className="w-full h-full relative">
       {currentPhase === "intro" && (
          <ShapeIntro shape={targetShape} onNext={handleNextPhase} onSpeak={speak} isSpeaking={isSpeaking} />
       )}
       {currentPhase === "tap" && (
          <ModeTapShape shape={targetShape} onNext={handleNextPhase} onSpeak={speak} isSpeaking={isSpeaking} />
       )}
       {currentPhase === "drag_outline" && (
          <ModeDragOutline shape={targetShape} onNext={handleNextPhase} onSpeak={speak} isSpeaking={isSpeaking} />
       )}
       {currentPhase === "review" && (
          <ShapesReview shape={targetShape} onComplete={handleComplete} />
       )}
    </div>
  );
}
