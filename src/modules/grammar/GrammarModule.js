"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { GRAMMAR_CONTENT } from "./content";
import ModeSentenceFix from "./components/ModeSentenceFix";
import ModeIdentify from "./components/ModeIdentify";
import ModeScramble from "./components/ModeScramble";
import GrammarReview from "./components/GrammarReview";
import StreakMeter from "@/modules/_shared/StreakMeter";

// Fisher-Yates shuffle
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default function GrammarModule({ profileId, grade, onRoundComplete }) {
  const [loading, setLoading] = useState(true);
  const [sessionItems, setSessionItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  
  // Audio state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Select curriculum directly, fallback to highest available if out of bounds
    let filtered = GRAMMAR_CONTENT[grade] || GRAMMAR_CONTENT[4];

    const clone = [...filtered];
    shuffle(clone);
    // Grab exactly 3 random tasks for the "Daily Chunk"
    setSessionItems(clone.slice(0, 3));
    setLoading(false);
  }, [profileId, grade]);

  const speak = (text) => {
    if (!profileId || !text) return;
    setIsSpeaking(true);
    if (audioRef.current) {
       audioRef.current.pause();
    }
    
    // Default voice in case profile voice missing
    const audio = new Audio(`/api/tts?voiceId=flq6f7yk4E4fJM5XTYuZ&text=${encodeURIComponent(text)}`);
    audioRef.current = audio;
    audio.play();
    audio.onended = () => setIsSpeaking(false);
    audio.onerror = () => setIsSpeaking(false);
  };

  const handleNext = () => {
     setStreak(s => {
       const next = s + 1;
       if (next === 3 || next % 5 === 0) {
         setShowCombo(true);
         setTimeout(() => setShowCombo(false), 1500);
       }
       return next;
     });
     setCurrentIndex(i => i + 1);
  };

  const handleMiss = () => {
     setStreak(0);
  };

  const handleComplete = () => {
     if (onRoundComplete) {
         onRoundComplete({
             score: 100, // GrammarFlow currently enforces mastery gating via the minigames
             totalItems: sessionItems.length,
             correctItems: sessionItems.length,
             metadata: { }
         });
     }
  };

  if (loading || sessionItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-full gap-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
        <p className="font-semibold text-sm">Building Language Engines...</p>
      </div>
    );
  }

  // Are we done?
  if (currentIndex >= sessionItems.length) {
     return <GrammarReview onComplete={handleComplete} />;
  }

  const currentItem = sessionItems[currentIndex];

  return (
    <div className="w-full h-full relative overflow-x-hidden">
       <StreakMeter streak={streak} showCombo={showCombo} />
       {currentItem.type === "fix" && (
           <ModeSentenceFix key={currentItem.id} item={currentItem} onNext={handleNext} onMiss={handleMiss} onSpeak={speak} isSpeaking={isSpeaking} grade={grade} />
       )}
       {currentItem.type === "identify" && (
           <ModeIdentify key={currentItem.id} item={currentItem} onNext={handleNext} onMiss={handleMiss} onSpeak={speak} isSpeaking={isSpeaking} grade={grade} />
       )}
       {currentItem.type === "scramble" && (
           <ModeScramble key={currentItem.id} item={currentItem} onNext={handleNext} onMiss={handleMiss} onSpeak={speak} isSpeaking={isSpeaking} grade={grade} />
       )}
    </div>
  );
}
