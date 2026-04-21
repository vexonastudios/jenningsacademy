"use client";

import { useState, useEffect, useMemo } from "react";
import MicroscopeLab from "./labs/MicroscopeLab";
import AnatomyBuilder from "./labs/AnatomyBuilder";
import BotanySprouter from "./labs/BotanySprouter";
import WeatherStation from "./labs/WeatherStation";
import AnimalSorter from "./labs/AnimalSorter";
import ChemistryMixer from "./labs/ChemistryMixer";
import CircuitBoard from "./labs/CircuitBoard";
import PrismLab from "./labs/PrismLab";
import SimpleMachines from "./labs/SimpleMachines";
import WaterCycle from "./labs/WaterCycle";
import PhysicsSlider from "./labs/PhysicsSlider";
import AstronomyMap from "./labs/AstronomyMap";
import BalancingEquations from "./labs/BalancingEquations";
import PendulumSwing from "./labs/PendulumSwing";
import PunnettSquares from "./labs/PunnettSquares";
import { FlaskConical } from "lucide-react";

/**
 * ScienceModule
 * -------------
 * Randomly selects an interactive science lab from a pool
 * appropriate for the student's grade level.
 *
 * Grades 1-4  Pool: Microscope (Cell Biology) | Anatomy Builder (Human Body)
 * Grades 5-8  Pool: Chemistry Mixer (Reactions) | Circuit Board (Electricity)
 * Grades 9-12 Pool: Physics Slider (Gravity/Freefall) | Astronomy Map (Constellations)
 *
 * Each lab is biblically sound — observational/operational science only,
 * zero references to origins, evolution, or secular historical science.
 */

const LAB_POOLS = {
  lower:  ["microscope", "anatomy", "botany", "weather", "animals"],
  middle: ["chemistry", "circuit", "prism", "machines", "watercycle"],
  upper:  ["physics", "astronomy", "equations", "pendulum", "punnett"],
};

const LAB_LABELS = {
  microscope: "Microscope Lab",
  anatomy:    "Anatomy Builder",
  botany:     "Botany Sprouter",
  weather:    "Weather Station",
  animals:    "Animal Sorter",
  chemistry:  "Chemistry Bench",
  circuit:    "Circuit Board",
  prism:      "Prism Lab",
  machines:   "Simple Machines",
  watercycle: "Water Cycle",
  physics:    "Physics Simulation",
  astronomy:  "Astronomy Map",
  equations:  "Balancing Equations",
  pendulum:   "Pendulum Lab",
  punnett:    "Punnett Squares",
};

function pickRandomLab(grade) {
  const g = Number(grade) || 1;
  const pool = g <= 4 ? LAB_POOLS.lower : g <= 8 ? LAB_POOLS.middle : LAB_POOLS.upper;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function ScienceModule({ grade, voiceId, onRoundComplete }) {
  const [phase, setPhase] = useState("intro");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Determine the lab once when the component mounts
  const labType = useMemo(() => pickRandomLab(grade), [grade]);

  const speak = (text) => {
    if (!voiceId || isSpeaking) return;
    setIsSpeaking(true);
    try {
      const audio = new Audio(`/api/tts?voiceId=${voiceId}&text=${encodeURIComponent(text)}`);
      audio.play();
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
    } catch {
      setIsSpeaking(false);
    }
  };

  // Intro welcome voice
  useEffect(() => {
    if (phase === "intro") {
      speak(
        "Welcome to the Science Lab! Put on your safety goggles — today we are going to perform a science experiment. Watch carefully, listen well, and have fun!"
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, voiceId]);

  const handleComplete = () => onRoundComplete({ score: 100 });

  // ── Intro Splash ──────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="relative mb-8">
          <div className="w-28 h-28 bg-teal-100 rounded-[2rem] flex items-center justify-center text-teal-600 shadow-xl shadow-teal-200/50 border-4 border-white transform rotate-12">
            <FlaskConical className="w-14 h-14" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full shadow-md px-2 py-1 text-xs font-black text-teal-700 border border-teal-100">
            LAB
          </div>
        </div>

        <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
          Welcome to the Lab!
        </h2>
        <p className="text-slate-500 font-medium text-lg max-w-md mx-auto mb-3 leading-relaxed">
          Today's experiment: <span className="font-black text-teal-600">{LAB_LABELS[labType]}</span>
        </p>
        <p className="text-slate-400 text-sm max-w-sm mx-auto mb-10">
          Put on your safety goggles. Watch carefully, listen to the guide, and take notes of what happens!
        </p>

        <button
          onClick={() => setPhase("lab")}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-lg shadow-teal-600/30 transition-all hover:-translate-y-1 active:scale-95"
        >
          Enter Laboratory →
        </button>
      </div>
    );
  }

  // ── Active Lab ────────────────────────────────────────────────────────────
  return (
    <div className="p-4 sm:p-8 h-full max-w-5xl mx-auto">
      {labType === "microscope" && <MicroscopeLab      speak={speak} onComplete={handleComplete} />}
      {labType === "anatomy"    && <AnatomyBuilder      speak={speak} onComplete={handleComplete} />}
      {labType === "botany"     && <BotanySprouter      speak={speak} onComplete={handleComplete} />}
      {labType === "weather"    && <WeatherStation      speak={speak} onComplete={handleComplete} />}
      {labType === "animals"    && <AnimalSorter        speak={speak} onComplete={handleComplete} />}
      {labType === "chemistry"  && <ChemistryMixer      speak={speak} onComplete={handleComplete} />}
      {labType === "circuit"    && <CircuitBoard        speak={speak} onComplete={handleComplete} />}
      {labType === "prism"      && <PrismLab            speak={speak} onComplete={handleComplete} />}
      {labType === "machines"   && <SimpleMachines      speak={speak} onComplete={handleComplete} />}
      {labType === "watercycle" && <WaterCycle           speak={speak} onComplete={handleComplete} />}
      {labType === "physics"    && <PhysicsSlider       speak={speak} onComplete={handleComplete} />}
      {labType === "astronomy"  && <AstronomyMap        speak={speak} onComplete={handleComplete} />}
      {labType === "equations"  && <BalancingEquations  speak={speak} onComplete={handleComplete} />}
      {labType === "pendulum"   && <PendulumSwing       speak={speak} onComplete={handleComplete} />}
      {labType === "punnett"    && <PunnettSquares      speak={speak} onComplete={handleComplete} />}
    </div>
  );
}
