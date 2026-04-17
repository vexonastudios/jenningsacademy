"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import USA from "@svg-maps/usa";
import USMap from "./components/USMap";
import { GEOGRAPHY_GROUPS } from "./geographyData";
import { ArrowRight, Volume2, Sparkles, MapPin } from "lucide-react";

// The TTS Hook
function useSpeechAsync(voiceId) {
  const audioRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      audioRef.current?.pause();
    };
  }, []);

  const speakAsync = useCallback((text) => new Promise((resolve) => {
    if (!voiceId || !text || !mountedRef.current) { resolve(); return; }
    audioRef.current?.pause();
    const audio = new Audio(`/api/tts?voiceId=${encodeURIComponent(voiceId)}&text=${encodeURIComponent(text)}`);
    audioRef.current = audio;
    audio.onended = resolve;
    audio.onerror = resolve;
    audio.play().catch(resolve);
  }), [voiceId]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
  }, []);

  return { speakAsync, stop };
}

// LocalStorage Helper
const loadProgress = (profileId) => {
  const blank = { 
    day: 6, // Starting at day 6 per the spec for the U.S. states core push MVP
    states: {} 
  };
  USA.locations.forEach(l => {
    blank.states[l.id] = { status: 'Unseen', hits: 0, misses: 0, lastTested: null };
  });

  if (typeof window === "undefined") return blank;
  const stored = localStorage.getItem(`geo_progress_${profileId}`);
  if (stored) {
    return JSON.parse(stored);
  }
  return blank;
};

const saveProgress = (profileId, data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`geo_progress_${profileId}`, JSON.stringify(data));
  }
};

export default function GeographyModule({ profileId, onRoundComplete }) {
  const { speakAsync, stop } = useSpeechAsync("alloy"); // Standardizing on one voice for now
  
  // Persistence State
  const [ledger, setLedger] = useState(() => loadProgress(profileId));

  // Flow State
  const [phase, setPhase] = useState("booting"); // booting -> review -> new -> test -> complete
  
  // Daily Queue State
  const [reviewQueue, setReviewQueue] = useState([]);
  const [newQueue, setNewQueue] = useState([]);
  const [testQueue, setTestQueue] = useState([]);
  
  // Phase Interaction State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false); // To block multiple clicks
  const [overlayMsg, setOverlayMsg] = useState(null); // visual feedback on map
  
  // Initialize Daily Queue
  useEffect(() => {
    if (phase !== "booting") return;

    const currentDay = ledger.day;
    
    // 1. Find states to review (Prioritize 'Learning', then 'Introduced')
    const allStatesData = Object.entries(ledger.states).map(([id, data]) => ({id, ...data}));
    const learning = allStatesData.filter(s => s.status === 'Learning');
    const introduced = allStatesData.filter(s => s.status === 'Introduced');
    
    // Shuffle helper
    const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);
    
    // Pick ~5 review states
    let pool = shuffle([...learning, ...introduced]).slice(0, 5);
    const resolvedReviewQueue = pool.map(s => USA.locations.find(l => l.id === s.id));

    // 2. Find new material based on day
    const dayConfig = GEOGRAPHY_GROUPS.find(g => g.dayId === currentDay);
    const resolvedNewQueue = dayConfig ? dayConfig.stateIds.map(sid => USA.locations.find(l => l.id === sid)) : [];

    // 3. Setup sets
    setReviewQueue(resolvedReviewQueue);
    setNewQueue(resolvedNewQueue);
    
    // The test queue is a shuffled mix of today's review + new
    setTestQueue(shuffle([...resolvedReviewQueue, ...resolvedNewQueue]));

    setPhase("review");
  }, [phase, ledger]);

  useEffect(() => {
    saveProgress(profileId, ledger);
  }, [ledger, profileId]);

  // Audio orchestrator based on phase and index
  useEffect(() => {
    if (phase === "review" && reviewQueue[currentIndex]) {
      speakAsync(`Let's review. This is ${reviewQueue[currentIndex].name}.`);
    } else if (phase === "new" && newQueue[currentIndex]) {
      speakAsync(`New state! This is ${newQueue[currentIndex].name}.`);
    } else if (phase === "test" && testQueue[currentIndex]) {
      speakAsync(`Tap ${testQueue[currentIndex].name} on the map.`);
    }
  }, [phase, currentIndex, reviewQueue, newQueue, testQueue, speakAsync]);

  const handleNext = () => {
    stop();
    setOverlayMsg(null);
    if (phase === "review") {
      if (currentIndex + 1 < reviewQueue.length) {
        setCurrentIndex(c => c + 1);
      } else {
        setPhase(newQueue.length > 0 ? "new" : "test");
        setCurrentIndex(0);
      }
    } else if (phase === "new") {
      if (currentIndex + 1 < newQueue.length) {
        setCurrentIndex(c => c + 1);
      } else {
        setPhase("test");
        setCurrentIndex(0);
      }
    } else if (phase === "test") {
      if (currentIndex + 1 < testQueue.length) {
        setCurrentIndex(c => c + 1);
      } else {
        // Complete current day
        const nextLedger = { ...ledger, day: ledger.day + 1 };
        setLedger(nextLedger);
        onRoundComplete({ score: 100, metadata: { dayCompleted: ledger.day } });
      }
    }
  };

  const handleMapClick = (location) => {
    if (phase !== "test" || isAnswering) return;
    
    const target = testQueue[currentIndex];
    setIsAnswering(true);

    const updatedLedger = { ...ledger, states: { ...ledger.states } };
    const stateData = { ...updatedLedger.states[target.id] };

    if (location.id === target.id) {
      // Correct!
      stateData.hits += 1;
      if (stateData.hits >= 2) stateData.status = 'Mastered'; // Demands hitting across multiple sessions basically
      updatedLedger.states[target.id] = stateData;
      setLedger(updatedLedger);

      speakAsync(`Great job! That is ${target.name}.`).then(() => {
        setIsAnswering(false);
        handleNext();
      });
      setOverlayMsg({ isCorrect: true, text: "Correct!" });
    } else {
      // Wrong!
      stateData.misses += 1;
      stateData.status = 'Learning'; // Demote to learning
      updatedLedger.states[target.id] = stateData;
      setLedger(updatedLedger);

      speakAsync(`Oops, that was ${location.name}. Try tapping ${target.name} again.`).then(() => {
        setIsAnswering(false);
        setOverlayMsg(null);
      });
      setOverlayMsg({ isCorrect: false, text: location.name });
    }
  };

  if (phase === "booting") return <div className="flex-1 bg-slate-50 relative flex items-center justify-center font-bold text-slate-400">Loading Map...</div>;

  // Resolve Map Properties based on Phase
  let highlightIds = [];
  let dimIds = [];
  let mapMode = "learn";
  let promptText = "";
  
  if (phase === "review") {
    if (reviewQueue.length === 0) {
      // Skip logic inside effect if empty, but just in case
      handleNext(); return null;
    }
    highlightIds = [reviewQueue[currentIndex].id];
    // In learn mode, dim out states that are 'Unseen' so they don't distract
    dimIds = USA.locations.filter(l => ledger.states[l.id].status === 'Unseen' && l.id !== reviewQueue[currentIndex].id).map(l => l.id);
    promptText = `Review: ${reviewQueue[currentIndex].name}`;
  } 
  else if (phase === "new") {
    highlightIds = [newQueue[currentIndex].id];
    // Dim out all Unseen EXCEPT the new ones being introduced today
    const todaysIds = newQueue.map(q => q.id);
    dimIds = USA.locations.filter(l => ledger.states[l.id].status === 'Unseen' && !todaysIds.includes(l.id)).map(l => l.id);
    promptText = `New: ${newQueue[currentIndex].name}`;
    
    // Update ledger to mark this as introduced instantly if it was Unseen
    if (ledger.states[newQueue[currentIndex].id].status === 'Unseen') {
      const nextL = {...ledger, states: {...ledger.states}};
      nextL.states[newQueue[currentIndex].id] = { ...nextL.states[newQueue[currentIndex].id], status: 'Introduced'};
      setLedger(nextL);
    }
  } 
  else if (phase === "test") {
    mapMode = "test";
    // We only dim Unseen unintroduced states. Everything else is active.
    dimIds = USA.locations.filter(l => ledger.states[l.id].status === 'Unseen').map(l => l.id);
    promptText = `Tap ${testQueue[currentIndex].name}`;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative pb-24">
      <header className="w-full bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-10 flex justify-between items-center relative">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Geography Mastery</h1>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              Day {ledger.day} • {phase === "review" ? "Reviewing" : phase === "new" ? "New Material" : "Mastery Challenge"}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative w-full pt-6">
        
        {/* Phase Action Prompt */}
        <div className="bg-white rounded-full shadow-md border-2 border-slate-100 px-8 py-4 mb-4 z-20 flex items-center gap-4">
          <button 
             onClick={() => stop()} // Allow interrupt to replay audio based on effect dependency
             className="text-slate-400 hover:text-emerald-500 transition-colors"
          >
            <Volume2 className="w-6 h-6" />
          </button>
          <span className="text-2xl font-black text-slate-700">{promptText}</span>
        </div>

        {/* The SVG Interactive Map */}
        <div className="w-full max-w-5xl px-4 relative flex-1 flex flex-col justify-center">
          <USMap 
            mode={mapMode}
            highlightIds={highlightIds}
            dimIds={dimIds}
            onLocationClick={handleMapClick}
          />
          
          {/* Overlay text for visual hit/miss feedback */}
          {overlayMsg && (
            <div className={`absolute top-10 left-1/2 -translate-x-1/2 p-4 rounded-xl shadow-lg border-2 font-bold text-2xl animate-in zoom-in-50 duration-300 ${overlayMsg.isCorrect ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300'}`}>
              {overlayMsg.text}
            </div>
          )}
        </div>
      </main>

      {/* Floating Bottom Navigator for View modes */}
      {(phase === "review" || phase === "new") && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20 flex justify-center">
          <button
            onClick={handleNext}
            className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-xl transition-all shadow-lg active:scale-95"
          >
            Next <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </div>
  );
}
