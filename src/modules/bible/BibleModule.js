"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ModuleShell from "@/modules/_shared/ModuleShell";
import useModuleSession from "@/modules/_shared/useModuleSession";
import useSoundEffects from "@/modules/_shared/useSoundEffects";
import { getCurriculumForGrade } from "./content/bibleCurriculum";

import ModeLearnSequence from "./components/ModeLearnSequence";
import ModeScrollBuilder from "./components/ModeScrollBuilder";

// Helper to shuffle arrays
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default function BibleModule({ profileId, grade, onRoundComplete }) {
  const [loading, setLoading] = useState(true);
  const [sessionItems, setSessionItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Phase track: 'learn' -> 'play'
  const [phase, setPhase] = useState('learn');
  const [totalTimeMs, setTotalTimeMs] = useState(0);

  const { playComplete, playSwoosh, playTap, playSuccess, playError } = useSoundEffects();

  useEffect(() => {
    const available = getCurriculumForGrade(grade);
    if (!available || available.length === 0) {
        onRoundComplete(true); // Exit safely if nothing maps (should never happen)
        return;
    }

    // Clone and shuffle to pick 2 random sections for today's session
    const clone = [...available];
    shuffle(clone);
    const selected = clone.slice(0, 2);

    setSessionItems(selected);
    setLoading(false);
  }, [profileId, grade, onRoundComplete]);

  const {
      isSpeaking,
      speakPhase,
      stopSpeaking
  } = useModuleSession();

  // Clean utterance handler wrapper
  const handleSpeak = (text) => {
      speakPhase(text);
  };

  const handleNextPhase = (timeMs = 0) => {
      stopSpeaking();
      playTap();
      if (phase === 'learn') {
          // Move from Learn -> Play for current item
          setPhase('play');
      } else {
          // Completed Play. Add time, move to next item!
          setTotalTimeMs(prev => prev + timeMs);
          playSuccess();
          
          if (currentIndex + 1 < sessionItems.length) {
              setCurrentIndex(currentIndex + 1);
              setPhase('learn');
          } else {
              // Module complete!
              playComplete();
              onRoundComplete(true);
          }
      }
  };

  const handleMiss = () => {
      playError();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (sessionItems.length === 0) return null;

  const currentItem = sessionItems[currentIndex];
  // Calculate relative progress (e.g. 2 items, 2 phases = 4 theoretical steps)
  const totalSteps = sessionItems.length * 2;
  const currentStep = (currentIndex * 2) + (phase === 'learn' ? 0 : 1);
  const progressPct = ((currentStep) / totalSteps) * 100;

  return (
    <ModuleShell 
      progressPct={progressPct} 
      moduleType="Bible" 
      onQuit={() => onRoundComplete(false)}
    >
      <div className="h-full relative overflow-hidden bg-stone-900 rounded-b-3xl">
        {phase === 'learn' ? (
            <ModeLearnSequence 
              key={`learn-${currentItem.id}`}
              item={currentItem}
              onNext={() => handleNextPhase(0)}
              onSpeak={handleSpeak}
              isSpeaking={isSpeaking}
            />
        ) : (
            <ModeScrollBuilder 
              key={`play-${currentItem.id}`}
              item={currentItem}
              onNext={(timeMs) => handleNextPhase(timeMs)}
              onMiss={handleMiss}
              onSpeak={handleSpeak}
              isSpeaking={isSpeaking}
            />
        )}
      </div>
    </ModuleShell>
  );
}
