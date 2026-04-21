"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, Bone } from "lucide-react";

const BONES = [
  {
    id: "skull",
    name: "Skull",
    fact: "The skull is made of 22 bones fused together to protect your brain — the most complex organ in your body!",
    emoji: "💀",
    dropZone: { top: "4%", left: "36%", w: 56, h: 56 },
    color: "bg-amber-100 border-amber-300 text-amber-800",
  },
  {
    id: "ribcage",
    name: "Rib Cage",
    fact: "You have 12 pairs of ribs that form a protective cage around your heart and lungs. Without them, every breath would be dangerous!",
    emoji: "🦴",
    dropZone: { top: "28%", left: "28%", w: 72, h: 72 },
    color: "bg-sky-100 border-sky-300 text-sky-800",
  },
  {
    id: "femur",
    name: "Femur",
    fact: "The femur is the longest and strongest bone in your entire body. It can support up to 30 times your body weight!",
    emoji: "🦵",
    dropZone: { top: "57%", left: "31%", w: 56, h: 80 },
    color: "bg-emerald-100 border-emerald-300 text-emerald-800",
  },
  {
    id: "spine",
    name: "Spine",
    fact: "Your spine has 33 vertebrae stacked like blocks, acting as both a pillar for your body and a protective tube for your spinal cord!",
    emoji: "🔗",
    dropZone: { top: "26%", left: "47%", w: 18, h: 90 },
    color: "bg-violet-100 border-violet-300 text-violet-800",
  },
];

export default function AnatomyBuilder({ speak, onComplete }) {
  const [placed, setPlaced] = useState({}); // { boneId: true }
  const [dragging, setDragging] = useState(null);
  const [activeFact, setActiveFact] = useState(null);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak(
        "Welcome to the Anatomy Builder! The human body is wonderfully and fearfully made. Drag each bone to the correct position on the skeleton to complete the body."
      );
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  const remaining = BONES.filter((b) => !placed[b.id]).length;

  const handleDrop = (e, slotBoneId) => {
    e.preventDefault();
    if (!dragging) return;

    // Check if the dragged bone matches this slot
    if (dragging !== slotBoneId) {
      speak("That bone doesn't fit there — look at the shape of the slot and try a different bone!");
      setDragging(null);
      return;
    }

    setPlaced((prev) => {
      const next = { ...prev, [slotBoneId]: true };
      const bone = BONES.find((b) => b.id === slotBoneId);
      setActiveFact(bone);

      const allDone = BONES.every((b) => next[b.id]);
      if (allDone) {
        setTimeout(() => speak("Amazing! You have built the entire skeleton. Your body is truly wonderfully made by God!"), 500);
      } else {
        speak(`${bone.name} placed! ${bone.fact}`);
      }
      return next;
    });
    setDragging(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  if (remaining === 0 && Object.keys(placed).length === BONES.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="text-6xl mb-6 animate-bounce">🎉</div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Skeleton Complete!</h2>
        <p className="text-slate-500 mb-2 max-w-md">
          You built the entire skeleton. God designed each bone with incredible purpose and precision — <span className="font-bold text-slate-700">"I am fearfully and wonderfully made." — Psalm 139:14</span>
        </p>
        <button
          onClick={onComplete}
          className="mt-8 bg-amber-500 hover:bg-amber-400 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-amber-400/30 transition-transform hover:-translate-y-1"
        >
          Finish Lab
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-amber-950 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-amber-400">
          <Bone className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase">Anatomy Builder</h3>
        </div>
        <p className="text-amber-100/80 text-sm mb-6 leading-relaxed">
          Drag each bone from the shelf below onto the correct location on the skeleton.
        </p>

        {/* Bone Shelf */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs uppercase font-black text-amber-400 tracking-wider mb-3 border-b border-amber-800 pb-2">
            Bone Shelf ({remaining} left)
          </h4>
          {BONES.map((bone) => {
            if (placed[bone.id]) return null;
            return (
              <div
                key={bone.id}
                draggable
                onDragStart={() => setDragging(bone.id)}
                onDragEnd={() => setDragging(null)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-grab active:cursor-grabbing ${bone.color} font-bold text-sm select-none transition-transform hover:scale-105`}
              >
                <span className="text-xl">{bone.emoji}</span>
                {bone.name}
              </div>
            );
          })}
          {remaining === 0 && (
            <div className="text-emerald-400 font-bold text-center py-2">All bones placed! ✓</div>
          )}
        </div>

        {/* Fact Panel */}
        {activeFact && (
          <div className="bg-amber-900/60 border border-amber-700/50 rounded-xl p-4 mt-auto">
            <p className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1">Did You Know?</p>
            <p className="text-xs text-amber-100 leading-relaxed">{activeFact.fact}</p>
          </div>
        )}
      </div>

      {/* Body Canvas */}
      <div className="flex-1 bg-slate-50 flex items-center justify-center p-8">
        <div ref={bodyRef} className="relative w-[160px] h-[420px] mx-auto">
          {/* Silhouette SVG */}
          <svg viewBox="0 0 160 420" className="absolute inset-0 w-full h-full opacity-10">
            {/* Head */}
            <ellipse cx="80" cy="32" rx="26" ry="28" fill="#475569" />
            {/* Neck */}
            <rect x="70" y="58" width="20" height="18" rx="4" fill="#475569" />
            {/* Torso */}
            <rect x="42" y="74" width="76" height="110" rx="12" fill="#475569" />
            {/* Left Arm */}
            <rect x="16" y="78" width="26" height="90" rx="10" fill="#475569" />
            {/* Right Arm */}
            <rect x="118" y="78" width="26" height="90" rx="10" fill="#475569" />
            {/* Pelvis */}
            <rect x="50" y="182" width="60" height="38" rx="8" fill="#475569" />
            {/* Left Leg */}
            <rect x="52" y="216" width="30" height="140" rx="10" fill="#475569" />
            {/* Right Leg */}
            <rect x="92" y="216" width="30" height="140" rx="10" fill="#475569" />
          </svg>

          {/* Drop Zones */}
          {BONES.map((bone) => (
            <div
              key={bone.id}
              onDrop={(e) => handleDrop(e, bone.id)}
              onDragOver={handleDragOver}
              className="absolute flex items-center justify-center"
              style={{
                top: bone.dropZone.top,
                left: bone.dropZone.left,
                width: bone.dropZone.w,
                height: bone.dropZone.h,
              }}
            >
              {placed[bone.id] ? (
                <div className={`w-full h-full rounded-xl ${bone.color} flex flex-col items-center justify-center border-2 opacity-90 shadow-md`}>
                  <span className="text-lg">{bone.emoji}</span>
                  <span className="text-[9px] font-black mt-0.5">{bone.name}</span>
                  <CheckCircle className="w-3 h-3 mt-0.5" />
                </div>
              ) : (
                <div className={`w-full h-full rounded-xl border-2 border-dashed flex items-center justify-center transition-colors
                  ${dragging === bone.id || dragging ? "border-amber-400 bg-amber-50/80" : "border-slate-300 bg-white/50"}`}>
                  <span className="text-[10px] font-bold text-slate-400 text-center px-1">{bone.name}?</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
