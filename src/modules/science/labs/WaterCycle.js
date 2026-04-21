"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Droplets } from "lucide-react";

const STAGES = [
  {
    id: "evaporation",
    label: "Evaporation",
    emoji: "☀️",
    action: "Click the Sun",
    desc: "The sun's heat causes water from oceans, lakes, and rivers to turn into invisible water vapor and rise into the atmosphere.",
    voiceText: "Evaporation! The sun's energy heats liquid water until it turns into invisible water vapor and rises into the sky. This is how God continuously refills our clouds!",
    color: "bg-yellow-100 border-yellow-400 text-yellow-800",
  },
  {
    id: "condensation",
    label: "Condensation",
    emoji: "☁️",
    action: "Click the Cloud",
    desc: "As water vapor rises and cools, it condenses into tiny water droplets that form clouds.",
    voiceText: "Condensation! As water vapor rises high into the cool atmosphere, it cools down and condenses back into tiny droplets, forming clouds. Each cloud can hold millions of gallons of water!",
    color: "bg-slate-100 border-slate-400 text-slate-700",
  },
  {
    id: "precipitation",
    label: "Precipitation",
    emoji: "🌧️",
    action: "Click the Storm Cloud",
    desc: "When clouds become heavy with water droplets, they release water as rain, snow, sleet, or hail.",
    voiceText: "Precipitation! When clouds collect enough water droplets, gravity pulls them back down as rain, snow, or hail. God designed this cycle to continually water the earth!",
    color: "bg-sky-100 border-sky-400 text-sky-800",
  },
  {
    id: "collection",
    label: "Collection",
    emoji: "🌊",
    action: "Click the River",
    desc: "Water collects back in oceans, lakes, rivers, and groundwater — ready to evaporate again and restart the cycle.",
    voiceText: "Collection! Water flows back into oceans, lakes, and rivers through runoff and underground streams. The water cycle is one of God's most elegant and essential designs for life on Earth!",
    color: "bg-blue-100 border-blue-400 text-blue-800",
  },
];

const LABEL_QUIZ = [
  { stageId: "evaporation", question: "Water turns into vapor and rises. This is called..." },
  { stageId: "condensation", question: "Vapor cools and forms clouds. This is called..." },
  { stageId: "precipitation", question: "Water falls from clouds as rain or snow. This is..." },
  { stageId: "collection", question: "Water gathers in oceans and rivers. This is..." },
];

export default function WaterCycle({ speak, onComplete }) {
  const [phase, setPhase] = useState("explore"); // explore → quiz → done
  const [activeStageIdx, setActiveStageIdx] = useState(null);
  const [completedStages, setCompletedStages] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak("Welcome to the Water Cycle lab! The water cycle is one of God's most brilliant designs. The same water molecules that fell as rain in ancient times may be in a cloud above you right now! Click each part of the scene to explore the four stages.");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  const handleStageClick = (idx) => {
    const stage = STAGES[idx];
    setActiveStageIdx(idx);
    speak(stage.voiceText);
    if (!completedStages.includes(stage.id)) {
      setCompletedStages(prev => [...prev, stage.id]);
    }
  };

  const allExplored = STAGES.every(s => completedStages.includes(s.id));

  const handleStartQuiz = () => {
    setPhase("quiz");
    speak("Excellent! You've explored all four stages of the water cycle. Now let's test your memory. I'll describe a stage — you click the correct label!");
  };

  const handleQuizAnswer = (stageId) => {
    if (answered) return;
    setAnswered(stageId);
    const correct = stageId === LABEL_QUIZ[quizIdx].stageId;
    if (correct) {
      setQuizScore(s => s + 1);
      speak(`Correct! ${STAGES.find(s => s.id === stageId).desc}`);
    } else {
      const correctStage = STAGES.find(s => s.id === LABEL_QUIZ[quizIdx].stageId);
      speak(`Not quite! The answer is ${correctStage.label}. ${correctStage.desc}`);
    }
    setTimeout(() => {
      setAnswered(null);
      if (quizIdx + 1 >= LABEL_QUIZ.length) {
        setPhase("done");
      } else {
        setQuizIdx(i => i + 1);
      }
    }, 3000);
  };

  if (phase === "done") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="text-6xl mb-6">💧🌍</div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Water Cycle Expert!</h2>
        <p className="text-lg font-bold text-slate-600 mb-2">{quizScore}/{LABEL_QUIZ.length} Correct</p>
        <p className="text-slate-500 mb-8 max-w-md leading-relaxed text-sm">
          <span className="font-semibold italic text-slate-700">"He draws up the drops of water, which distill as rain to the streams; the clouds pour down their moisture and abundant showers fall on mankind." — Job 36:27-28</span>
        </p>
        <button onClick={onComplete} className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-sky-500/30 transition-transform hover:-translate-y-1">
          Finish Lab
        </button>
      </div>
    );
  }

  const activeStage = activeStageIdx !== null ? STAGES[activeStageIdx] : null;

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-sky-950 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-sky-400">
          <Droplets className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase">Water Cycle</h3>
        </div>

        {phase === "explore" && (
          <>
            <p className="text-sky-100/80 text-sm mb-6 leading-relaxed">
              Click each part of the landscape scene to trigger and learn about the four stages of the water cycle!
            </p>
            <div className="space-y-2 mb-6">
              <h4 className="text-xs uppercase font-black text-sky-400 tracking-wider mb-2 border-b border-sky-800 pb-2">
                Stages ({completedStages.length}/{STAGES.length})
              </h4>
              {STAGES.map((stage) => {
                const done = completedStages.includes(stage.id);
                return (
                  <div key={stage.id} className={`flex items-center gap-2 text-sm font-semibold py-1 transition-colors ${done ? "text-emerald-400" : "text-sky-300/50"}`}>
                    {done ? <CheckCircle className="w-4 h-4 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-current shrink-0" />}
                    {stage.label}
                  </div>
                );
              })}
            </div>
            {activeStage && (
              <div className="bg-sky-900/60 border border-sky-700/50 rounded-xl p-4">
                <p className="text-xs font-black text-sky-300 uppercase tracking-wider mb-1">{activeStage.label}</p>
                <p className="text-xs text-sky-100 leading-relaxed">{activeStage.desc}</p>
              </div>
            )}
            {allExplored && (
              <button onClick={handleStartQuiz} className="mt-4 w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-sky-500/20">
                Start Quiz! →
              </button>
            )}
          </>
        )}

        {phase === "quiz" && (
          <>
            <p className="text-sky-100/80 text-sm mb-6 leading-relaxed">Read the description and click the correct stage name on the right!</p>
            <div className="bg-sky-900/60 border border-sky-700/50 rounded-xl p-4">
              <p className="text-xs font-black text-sky-300 uppercase tracking-wider mb-2">Question {quizIdx + 1}/{LABEL_QUIZ.length}</p>
              <p className="text-white font-semibold text-sm leading-relaxed">{LABEL_QUIZ[quizIdx].question}</p>
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs font-bold text-sky-400">Score: {quizScore}/{quizIdx}</span>
            </div>
          </>
        )}
      </div>

      {/* Main Landscape */}
      <div className="flex-1 bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-100 flex flex-col items-end justify-end relative overflow-hidden" style={{ minHeight: 400 }}>

        {/* Sky */}
        <div className="absolute inset-0">
          {/* Sun */}
          <button
            onClick={() => phase === "explore" && handleStageClick(0)}
            className={`absolute top-6 right-10 text-5xl transition-transform hover:scale-125 active:scale-95 ${phase === "explore" ? "cursor-pointer" : ""} drop-shadow-lg`}
            title="Click: Evaporation"
          >
            ☀️
            {completedStages.includes("evaporation") && (
              <div className="absolute -bottom-1 -right-1 text-lg">✅</div>
            )}
          </button>

          {/* Cloud — condensation */}
          <button
            onClick={() => phase === "explore" && handleStageClick(1)}
            className={`absolute top-16 left-16 text-5xl transition-transform hover:scale-125 active:scale-95 ${phase === "explore" ? "cursor-pointer" : ""}`}
            title="Click: Condensation"
          >
            ☁️
            {completedStages.includes("condensation") && (
              <div className="absolute -bottom-1 -right-1 text-lg">✅</div>
            )}
          </button>

          {/* Storm cloud — precipitation */}
          <button
            onClick={() => phase === "explore" && handleStageClick(2)}
            className={`absolute top-28 left-1/2 -translate-x-1/2 text-5xl transition-transform hover:scale-125 active:scale-95 ${phase === "explore" ? "cursor-pointer" : ""}`}
            title="Click: Precipitation"
          >
            🌧️
            {completedStages.includes("precipitation") && (
              <div className="absolute -bottom-1 -right-1 text-lg">✅</div>
            )}
          </button>

          {/* Evaporation arrows (visual) */}
          {completedStages.includes("evaporation") && (
            <div className="absolute bottom-24 left-1/2 flex flex-col items-center gap-1 opacity-60">
              {[0,1,2].map(i => (
                <div key={i} className="text-sky-400 font-black text-lg animate-bounce" style={{ animationDelay: `${i * 0.3}s` }}>💨</div>
              ))}
            </div>
          )}
        </div>

        {/* Mountains */}
        <div className="absolute bottom-16 left-0 right-0 flex items-end">
          <div className="w-0 h-0 border-l-[80px] border-r-[80px] border-b-[120px] border-l-transparent border-r-transparent border-b-slate-400 opacity-60" />
          <div className="w-0 h-0 border-l-[60px] border-r-[60px] border-b-[90px] border-l-transparent border-r-transparent border-b-slate-500 opacity-70 -ml-8" />
        </div>

        {/* Ground / River */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-emerald-700/50 rounded-t-[50%]" />

        {/* River / ocean — collection */}
        <button
          onClick={() => phase === "explore" && handleStageClick(3)}
          className={`absolute bottom-2 left-1/4 text-4xl transition-transform hover:scale-125 active:scale-95 ${phase === "explore" ? "cursor-pointer" : ""}`}
          title="Click: Collection"
        >
          🌊
          {completedStages.includes("collection") && (
            <div className="absolute -bottom-1 -right-1 text-lg">✅</div>
          )}
        </button>

        {/* Quiz label buttons overlaid */}
        {phase === "quiz" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 p-4">
              {STAGES.map(stage => (
                <button
                  key={stage.id}
                  onClick={() => handleQuizAnswer(stage.id)}
                  disabled={!!answered}
                  className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all text-left
                    ${answered === stage.id && answered === LABEL_QUIZ[quizIdx].stageId ? "bg-emerald-100 border-emerald-500 text-emerald-800 scale-105"
                      : answered === stage.id ? "bg-rose-100 border-rose-400 text-rose-800"
                      : answered && stage.id === LABEL_QUIZ[quizIdx].stageId ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                      : "bg-white/90 border-slate-300 text-slate-700 hover:scale-105 hover:border-sky-400 active:scale-95"}`}
                >
                  <div className="text-2xl mb-1">{stage.emoji}</div>
                  {stage.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
