"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Calculator, ArrowRight, Volume2, Target, Trophy, Flame } from "lucide-react";
import { generateProblem } from "./MathEngine";
import { GRADE_1_CURRICULUM } from "./curriculum/mathGrade1";

// ── TTS Hook ──────────────────────────────────────────────────────────────────
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

// ── Storage Helpers ────────────────────────────────────────────────────────────
const loadLedger = (profileId) => {
  const blank = { day: 1, skills: {} };
  if (typeof window === "undefined") return blank;
  const stored = localStorage.getItem(`math_ledger_${profileId}`);
  return stored ? JSON.parse(stored) : blank;
};

const saveLedger = (profileId, data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`math_ledger_${profileId}`, JSON.stringify(data));
  }
};

// ── Queue Generators ───────────────────────────────────────────────────────────
const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);

function selectWeightedProblems(skillsLedger, requiredCount) {
  const activeTags = Object.keys(skillsLedger);
  if (activeTags.length === 0) return [];
  
  const weighted = activeTags.map(tag => {
    const total = skillsLedger[tag].hits + skillsLedger[tag].misses;
    const missRate = total > 0 ? (skillsLedger[tag].misses / total) : 0.5;
    return { tag, weight: 0.1 + missRate };
  });

  // Sort so weakest are at the top
  weighted.sort((a,b) => b.weight - a.weight);
  
  // Pick tags focusing on the weakest 5
  const focusPool = weighted.slice(0, Math.max(5, activeTags.length)).map(info => info.tag);
  
  const gen = [];
  for(let i=0; i<requiredCount; i++) {
    gen.push(generateProblem(focusPool[i % focusPool.length]));
  }
  return shuffle(gen);
}

function generateNewSkillProblems(newSkillsTags, requiredCount) {
  if (!newSkillsTags || newSkillsTags.length === 0) return [];
  const gen = [];
  for(let i=0; i<requiredCount; i++) {
    gen.push(generateProblem(newSkillsTags[i % newSkillsTags.length]));
  }
  return shuffle(gen);
}

// ── Main UI Component ──────────────────────────────────────────────────────────
export default function MathModule({ profileId, gradeLevel = 1, onRoundComplete }) {
  const { speakAsync, stop } = useSpeechAsync("alloy");
  const [ledger, setLedger] = useState(() => loadLedger(profileId));
  
  const [phase, setPhase] = useState("booting"); // booting -> warmup -> teaching -> practice -> quiz -> test -> review_complete
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dayConfig, setDayConfig] = useState(null);

  // Answering State
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong'

  // Initialize Queues
  useEffect(() => {
    if (phase !== "booting") return;

    // Use Grade 1 curriculum mapping MVP. In production, select by gradeLevel prop.
    const curriculum = GRADE_1_CURRICULUM;
    const today = curriculum.find(c => c.day === ledger.day);
    
    // If they beat all 10 days of MVP, fallback to generic endless test.
    if (!today) {
        setDayConfig({ day: ledger.day, isTestDay: true, endless: true });
        setQueue(selectWeightedProblems(ledger.skills, 20));
        setPhase("test");
        return;
    }

    setDayConfig(today);
    
    // Make sure 'newSkills' are instantly added to the ledger so they can be tracked from now on!
    const nextLedger = { ...ledger, skills: { ...ledger.skills } };
    let ledgerMutated = false;
    today.newSkills?.forEach(tag => {
      if (!nextLedger.skills[tag]) {
        nextLedger.skills[tag] = { hits: 0, misses: 0 };
        ledgerMutated = true;
      }
    });
    if(ledgerMutated) setLedger(nextLedger);

    if (today.isTestDay) {
        setQueue(selectWeightedProblems(nextLedger.skills, 20)); // Friday Test
        setPhase("test");
    } else {
        // Normal Day Bootup: Starts at warmup IF there are prior skills tracked
        const priorSkills = Object.keys(ledger.skills);
        if (priorSkills.length === 0) {
            // First day ever -> Skip to teaching
            setPhase("teaching");
        } else {
            setQueue(selectWeightedProblems(nextLedger.skills, 5));
            setPhase("warmup");
        }
    }
  }, [phase, ledger]);

  useEffect(() => {
    saveLedger(profileId, ledger);
  }, [ledger, profileId]);

  // Audio driver
  useEffect(() => {
    if (!dayConfig) return;
    
    if (phase === "teaching") {
      speakAsync(dayConfig.teachingScript || "Let's learn something new.");
    } else if (phase === "warmup" && currentIndex === 0) {
      speakAsync("Let's do a quick warm up flash drill.");
    } else if (phase === "practice" && currentIndex === 0) {
      speakAsync("Now let's practice what we just learned.");
    } else if (phase === "quiz" && currentIndex === 0) {
      speakAsync("Time for the daily quiz. Do your best!");
    } else if (phase === "test" && currentIndex === 0) {
      speakAsync("It's test day! Take your time and focus.");
    }
  }, [phase, currentIndex, dayConfig, speakAsync]);

  // Submit Answer Logic
  const submitAnswer = () => {
    if (userInput === "" || feedback !== null) return;
    
    const problem = queue[currentIndex];
    const parsedInput = parseInt(userInput, 10);
    const isCorrect = parsedInput === problem.answer;
    
    // Update Ledger instantly
    const nextL = { ...ledger, skills: { ...ledger.skills } };
    if (!nextL.skills[problem.skillTag]) nextL.skills[problem.skillTag] = { hits: 0, misses: 0 };
    if (isCorrect) nextL.skills[problem.skillTag].hits += 1;
    else nextL.skills[problem.skillTag].misses += 1;
    setLedger(nextL);

    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      speakAsync("Correct!").then(() => advanceNext());
    } else {
      speakAsync(`Oops. The answer is ${problem.answer}. Try harder next time.`).then(() => advanceNext());
    }
  };

  const advanceNext = () => {
    setFeedback(null);
    setUserInput("");
    
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex(c => c + 1);
    } else {
      // Phase complete
      if (phase === "warmup") {
         setPhase("teaching");
      } else if (phase === "practice") {
         // Generate daily quiz: 10 items (mix of new and review)
         const mixed = shuffle([
             ...generateNewSkillProblems(dayConfig.newSkills, 3), // guarantee 3 hits on new stuff
             ...selectWeightedProblems(ledger.skills, 7)
         ]);
         setQueue(mixed);
         setCurrentIndex(0);
         setPhase("quiz");
      } else if (phase === "quiz" || phase === "test") {
         // Day complete!
         stop();
         const nextLedger = { ...ledger, day: ledger.day + 1 };
         setLedger(nextLedger);
         onRoundComplete({ score: 100, metadata: { dayCompleted: ledger.day } });
      }
    }
  };

  const skipTeaching = () => {
    stop();
    // Build practice queue
    setQueue(generateNewSkillProblems(dayConfig.newSkills, 5));
    setCurrentIndex(0);
    setPhase(dayConfig.newSkills.length > 0 ? "practice" : "quiz");
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (phase === "teaching" || phase === "booting") return;
      if (feedback !== null) return; // Block input while showing feedback
      
      if (e.key >= "0" && e.key <= "9") {
        setUserInput(prev => prev + e.key);
      } else if (e.key === "Backspace") {
        setUserInput(prev => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        submitAnswer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, feedback, userInput, queue, currentIndex]); // Dependencies important so closures grab latest state!

  if (phase === "booting" || !dayConfig) return <div className="flex-1 bg-sky-50 flex items-center justify-center font-bold text-sky-400">Loading Map...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 relative pb-24">
      {/* Header */}
      <header className="w-full bg-white border-b border-sky-200 px-6 py-4 shadow-sm z-10 flex justify-between items-center relative">
        <div className="flex items-center gap-3">
          <div className="bg-sky-100 p-2 rounded-lg text-sky-700">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Math Curriculum</h1>
            <p className="text-sm font-bold text-sky-600 uppercase tracking-wider mt-0.5">
              Day {ledger.day} • {phase.toUpperCase()}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 py-8">
        
        {phase === "teaching" ? (
           <div className="bg-white rounded-[2rem] shadow-xl p-10 w-full text-center border-4 border-sky-100 flex flex-col items-center">
              <div className="bg-sky-100 text-sky-800 p-4 rounded-full mb-6">
                <Volume2 className="w-10 h-10 animate-pulse" />
              </div>
              <h2 className="text-4xl font-black text-slate-800 mb-8">{dayConfig.teachingVisual}</h2>
              <p className="text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                {dayConfig.teachingScript}
              </p>
              <button 
                onClick={skipTeaching}
                className="mt-12 bg-sky-500 hover:bg-sky-600 text-white font-black text-2xl py-4 px-12 rounded-full shadow-lg transition-transform active:scale-95"
              >
                Let's Practice!
              </button>
           </div>
        ) : (
          /* Question Mode */
          <div className="w-full max-w-md flex flex-col items-center">
             
             {/* Progress Bubbles */}
             <div className="flex gap-2 mb-8">
               {queue.map((_, i) => (
                 <div key={i} className={`w-3 h-3 rounded-full ${i < currentIndex ? 'bg-sky-500' : i === currentIndex ? 'bg-sky-300 animate-pulse' : 'bg-slate-200'}`} />
               ))}
             </div>

             {/* The Equation */}
             <div className="bg-white rounded-[2rem] shadow-xl p-8 w-full border-4 border-slate-100 text-center relative overflow-hidden">
                <h2 className="text-5xl font-black text-slate-800 mb-6 drop-shadow-sm">
                  {queue[currentIndex]?.equation.replace("?", "")}
                  <span className={`inline-block min-w-16 h-14 border-b-4 ml-2 transition-colors ${feedback === 'correct' ? 'text-emerald-500 border-emerald-500' : feedback === 'wrong' ? 'text-rose-500 border-rose-500' : 'text-sky-600 border-sky-300'}`}>
                    {userInput || "\u00A0"}
                  </span>
                </h2>

                {/* Sub-label for tracking */}
                <div className="text-xs font-bold text-slate-300 uppercase tracking-widest mt-4">
                  SKILL: {queue[currentIndex]?.skillTag.replace(/_/g, " ")}
                </div>

                {/* Feedback Overlay inside box */}
                {feedback && (
                  <div className={`absolute inset-0 flex items-center justify-center font-black text-4xl ${feedback === 'correct' ? 'bg-emerald-100/90 text-emerald-600' : 'bg-rose-100/90 text-rose-600'}`}>
                     {feedback === 'correct' ? 'Awesome!' : `Answer: ${queue[currentIndex]?.answer}`}
                  </div>
                )}
             </div>

             {/* The Numpad */}
             <div className="grid grid-cols-3 gap-4 mt-8 w-full">
               {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                 <button 
                  key={num}
                  onClick={() => setUserInput(p => p + num)}
                  className="bg-white hover:bg-slate-50 border-b-4 border-slate-200 text-slate-700 font-black text-3xl py-6 rounded-2xl shadow-sm active:translate-y-1 active:border-b-0 transition-all"
                 >
                   {num}
                 </button>
               ))}
               <button 
                 onClick={() => setUserInput(p => p.slice(0, -1))}
                 className="bg-rose-50 hover:bg-rose-100 text-rose-500 font-black text-2xl py-6 rounded-2xl shadow-sm active:translate-y-1 transition-all"
               >
                 DEL
               </button>
               <button 
                 onClick={() => setUserInput(p => p + "0")}
                 className="bg-white hover:bg-slate-50 border-b-4 border-slate-200 text-slate-700 font-black text-3xl py-6 rounded-2xl shadow-sm active:translate-y-1 active:border-b-0 transition-all"
               >
                 0
               </button>
               <button 
                 onClick={submitAnswer}
                 className="bg-emerald-500 hover:bg-emerald-600 border-b-4 border-emerald-600 text-white font-black text-2xl py-6 rounded-2xl shadow-sm active:translate-y-1 active:border-b-0 transition-all"
               >
                 GO
               </button>
             </div>

          </div>
        )}

      </main>
    </div>
  );
}
