"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Zap } from "lucide-react";

const COMPONENTS = [
  {
    id: "battery",
    name: "Battery",
    desc: "Provides voltage — the 'pressure' that pushes electrons through the circuit.",
    emoji: "🔋",
    color: "bg-green-100 border-green-400 text-green-800",
  },
  {
    id: "switch",
    name: "Switch",
    desc: "Opens or closes the circuit path. An open switch stops electron flow — like removing a bridge.",
    emoji: "🔌",
    color: "bg-sky-100 border-sky-400 text-sky-800",
  },
  {
    id: "wire",
    name: "Copper Wire",
    desc: "A conductor that gives electrons a low-resistance path to flow through.",
    emoji: "〰️",
    color: "bg-orange-100 border-orange-400 text-orange-800",
  },
];

export default function CircuitBoard({ speak, onComplete }) {
  const [placed, setPlaced] = useState({});
  const [dragging, setDragging] = useState(null);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  const circuitComplete = COMPONENTS.every((c) => placed[c.id]);
  const bulbOn = circuitComplete && switchOn;

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak(
        "Welcome to the Circuit Board! Electricity needs a closed loop to flow. Drag the battery, wire, and switch onto the circuit board, then flip the switch to light the bulb!"
      );
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  useEffect(() => {
    if (bulbOn) {
      setTimeout(() => speak("The circuit is complete! Electrons are flowing from the negative terminal of the battery, through the wire, and back to the positive terminal — lighting the bulb!"), 600);
    }
  }, [bulbOn, speak]);

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    if (!dragging) return;

    if (dragging !== slotId) {
      const dropped = COMPONENTS.find((c) => c.id === dragging);
      speak(`The ${dropped?.name} doesn't go in that slot. Each slot on the board is labeled — match the component to the right position!`);
      setDragging(null);
      return;
    }

    const comp = COMPONENTS.find((c) => c.id === slotId);
    setPlaced((prev) => ({ ...prev, [slotId]: true }));
    speak(`${comp.name} connected! ${comp.desc}`);
    setDragging(null);
  };

  const remaining = COMPONENTS.filter((c) => !placed[c.id]);

  if (bulbOn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="relative mb-6">
          <div className="text-7xl animate-pulse drop-shadow-[0_0_24px_rgba(250,204,21,0.9)]">💡</div>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Circuit Complete!</h2>
        <p className="text-slate-500 mb-6 max-w-sm">
          The electrons have a complete path to travel.  The consistent, observable laws of electricity reflect the order God built into creation.
        </p>
        <button
          onClick={onComplete}
          className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-yellow-400/30 transition-transform hover:-translate-y-1"
        >
          Finish Lab
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-slate-900 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-yellow-400">
          <Zap className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase">Circuit Board</h3>
        </div>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          Electricity needs a <strong className="text-yellow-300">complete, unbroken loop</strong> to flow. Drag the components onto the circuit board in the correct slots, then flip the switch!
        </p>

        {/* Component Shelf */}
        <div className="space-y-2">
          <h4 className="text-xs uppercase font-black text-slate-500 tracking-wider mb-2 border-b border-slate-700 pb-2">
            Components Shelf
          </h4>
          {COMPONENTS.map((comp) => {
            if (placed[comp.id]) return (
              <div key={comp.id} className="flex items-center gap-2 text-emerald-400 text-sm font-semibold py-1">
                <CheckCircle className="w-4 h-4" /> {comp.name} ✓
              </div>
            );
            return (
              <div
                key={comp.id}
                draggable
                onDragStart={() => setDragging(comp.id)}
                onDragEnd={() => setDragging(null)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-grab active:cursor-grabbing ${comp.color} font-bold text-sm select-none transition-transform hover:scale-105`}
              >
                <span className="text-xl">{comp.emoji}</span>
                {comp.name}
              </div>
            );
          })}
        </div>

        {circuitComplete && (
          <div className="mt-6 bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4">
            <p className="text-yellow-200 text-sm font-semibold text-center">All components placed! Now flip the switch on the board →</p>
          </div>
        )}
      </div>

      {/* Circuit Board Canvas */}
      <div className="flex-1 bg-emerald-950 flex items-center justify-center p-8 relative overflow-hidden">
        {/* PCB texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />

        <div className="relative w-full max-w-sm aspect-square">
          {/* Circuit trace lines (decorative) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">
            {/* Main loop */}
            <rect x="40" y="40" width="220" height="220" rx="10"
              fill="none" stroke={circuitComplete ? (bulbOn ? "#facc15" : "#22d3ee") : "#134e4a"}
              strokeWidth="6" strokeDasharray={circuitComplete ? "0" : "12 8"}
              className="transition-all duration-1000"
            />
            {/* Electron animation when bulbOn */}
            {bulbOn && (
              <circle r="6" fill="#facc15">
                <animateMotion dur="2s" repeatCount="indefinite"
                  path="M40,150 L40,40 L150,40 L260,40 L260,150 L260,260 L150,260 L40,260 L40,150" />
              </circle>
            )}
          </svg>

          {/* Battery Slot — top-left */}
          <div
            onDrop={(e) => handleDrop(e, "battery")}
            onDragOver={(e) => e.preventDefault()}
            className={`absolute top-[10%] left-[10%] w-20 h-20 rounded-2xl border-4 flex flex-col items-center justify-center transition-all
              ${placed.battery ? "bg-green-900 border-green-400 shadow-[0_0_16px_rgba(74,222,128,0.4)]" : "border-dashed border-green-700 bg-green-950/50"}`}
          >
            {placed.battery ? <><span className="text-2xl">🔋</span><span className="text-[9px] font-bold text-green-300 mt-1">Battery</span></>
              : <span className="text-[10px] font-bold text-green-600">Drop<br/>Battery</span>}
          </div>

          {/* Wire Slot — right */}
          <div
            onDrop={(e) => handleDrop(e, "wire")}
            onDragOver={(e) => e.preventDefault()}
            className={`absolute top-[10%] right-[10%] w-20 h-20 rounded-2xl border-4 flex flex-col items-center justify-center transition-all
              ${placed.wire ? "bg-orange-900 border-orange-400 shadow-[0_0_16px_rgba(251,146,60,0.4)]" : "border-dashed border-orange-700 bg-orange-950/50"}`}
          >
            {placed.wire ? <><span className="text-2xl">〰️</span><span className="text-[9px] font-bold text-orange-300 mt-1">Wire</span></>
              : <span className="text-[10px] font-bold text-orange-600">Drop<br/>Wire</span>}
          </div>

          {/* Switch Slot — bottom-left */}
          <div
            onDrop={(e) => handleDrop(e, "switch")}
            onDragOver={(e) => e.preventDefault()}
            className={`absolute bottom-[10%] left-[10%] w-20 h-20 rounded-2xl border-4 flex flex-col items-center justify-center transition-all
              ${placed.switch ? "bg-sky-900 border-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.4)]" : "border-dashed border-sky-700 bg-sky-950/50"}`}
          >
            {placed.switch ? <><span className="text-2xl">🔌</span><span className="text-[9px] font-bold text-sky-300 mt-1">Switch</span></>
              : <span className="text-[10px] font-bold text-sky-600">Drop<br/>Switch</span>}
          </div>

          {/* Bulb — center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className={`text-6xl transition-all duration-700 ${bulbOn ? "drop-shadow-[0_0_24px_rgba(250,204,21,0.9)] scale-125" : "opacity-40 grayscale"}`}>
              💡
            </div>
            <span className={`text-xs font-bold mt-2 transition-colors ${bulbOn ? "text-yellow-300" : "text-slate-500"}`}>
              {bulbOn ? "LIVE!" : "Bulb"}
            </span>
          </div>

          {/* Flip switch button — appears after circuit placed */}
          {circuitComplete && !switchOn && (
            <button
              onClick={() => setSwitchOn(true)}
              className="absolute bottom-[10%] right-[10%] w-20 h-20 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-white font-black text-xs transition-all shadow-lg shadow-yellow-400/40 active:scale-95 flex flex-col items-center justify-center gap-1"
            >
              <Zap className="w-6 h-6" />
              FLIP!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
