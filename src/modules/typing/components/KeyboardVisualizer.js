"use client";

import { useState, useEffect } from "react";
import { FINGER_MAP, ZONE_STYLES } from "../content/fingerZones";

/**
 * KeyboardVisualizer
 * ──────────────────
 * Visual QWERTY keyboard that:
 *  • Colors each key by its assigned finger zone
 *  • Highlights + pulses the `nextKey` (next character to type)
 *  • Briefly flashes green (correct) or red (wrong) on `lastKey`
 *  • Shows a finger-zone legend below the keyboard
 *
 * Props:
 *   nextKey    {string|null}  – Next character the student needs to type
 *   lastKey    {string|null}  – The most recently typed character
 *   lastCorrect {boolean}     – Whether lastKey was correct
 *   compact    {boolean}      – Smaller layout for smaller screens
 */

const ROWS = [
  ["`","1","2","3","4","5","6","7","8","9","0","-","=","bksp"],
  ["tab","q","w","e","r","t","y","u","i","o","p","[","]","\\"],
  ["caps","a","s","d","f","g","h","j","k","l",";","'","enter"],
  ["shift-l","z","x","c","v","b","n","m",",",".","/","shift-r"],
];

const rightHandKeys = ['y','h','n','u','j','m','i','k',',','o','l','.','p',';','/','\'','6','7','8','9','0','-','=','[',']','\\'];
const leftHandKeys = ['q','a','z','w','s','x','e','d','c','r','f','v','t','g','b','1','2','3','4','5','`'];

const shiftMappings = {
  '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0', '_': '-', '+': '=',
  '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/'
};

export default function KeyboardVisualizer({ nextKey, lastKey, lastCorrect, compact = false }) {
  const [flash, setFlash] = useState(null); // { key, type: 'correct' | 'wrong' }

  // Flash the last-pressed key briefly
  useEffect(() => {
    if (!lastKey) return;
    const type = lastCorrect ? "correct" : "wrong";
    setFlash({ key: lastKey.toLowerCase(), type });
    const t = setTimeout(() => setFlash(null), 180);
    return () => clearTimeout(t);
  }, [lastKey, lastCorrect]);

  const next  = nextKey;
  let needsShiftL = false;
  let needsShiftR = false;
  let baseNext = next?.toLowerCase();

  if (next && next === next.toUpperCase() && next.toLowerCase() !== next.toUpperCase()) {
    // Upper case letter
    if (rightHandKeys.includes(baseNext)) needsShiftL = true;
    else if (leftHandKeys.includes(baseNext)) needsShiftR = true;
  } else if (shiftMappings[next]) {
    // Shifted symbol
    baseNext = shiftMappings[next];
    if (rightHandKeys.includes(baseNext)) needsShiftL = true;
    else if (leftHandKeys.includes(baseNext)) needsShiftR = true;
  }

  const gap = compact ? "gap-1" : "gap-1.5";

  function KeyCell({ k }) {
    const zone  = FINGER_MAP[k] ?? null;
    const st    = zone ? ZONE_STYLES[zone] : null;
    
    // Check if this key should be highlighted
    const isNext = (k === baseNext) || 
                   (k === "shift-l" && needsShiftL) || 
                   (k === "shift-r" && needsShiftR);
                   
    const isFlash  = flash?.key === k; // Note: flash.key logic might need mapping for shifted characters if tracking exactly
    const flashType = flash?.type;

    let cls = "";
    if (isFlash && flashType === "correct") {
      cls = "bg-emerald-400 border-emerald-200 text-slate-900 scale-110 shadow-[0_0_10px_rgba(52,211,153,0.8)]";
    } else if (isFlash && flashType === "wrong") {
      cls = "bg-rose-500 border-rose-300 text-white scale-95";
    } else if (isNext) {
      cls = `${st?.pulse ?? "bg-slate-400"} border-white text-slate-900 scale-110 shadow-[0_0_14px_rgba(255,255,255,0.4)] animate-pulse`;
    } else if (st) {
      cls = `${st.bg} ${st.border} text-slate-300`;
    } else {
      cls = "bg-slate-800/50 border-slate-700 text-slate-500";
    }

    // Determine correct width
    let wClass = compact ? "w-7" : "w-8 sm:w-9";
    if (k === "bksp") wClass = compact ? "w-10" : "w-12 sm:w-16";
    else if (k === "tab" || k === "\\") wClass = compact ? "w-10" : "w-12 sm:w-14";
    else if (k === "caps") wClass = compact ? "w-12" : "w-14 sm:w-[70px]";
    else if (k === "enter") wClass = compact ? "w-16" : "w-16 sm:w-20";
    else if (k === "shift-l") wClass = compact ? "w-16" : "w-20 sm:w-24";
    else if (k === "shift-r") wClass = compact ? "w-14" : "w-16 sm:w-24";
    
    const hClass = compact ? "h-7 text-[10px]" : "h-8 sm:h-9 text-xs";

    return (
      <div className={`${wClass} ${hClass} rounded-lg flex items-center justify-center font-black uppercase border transition-all duration-100 ${cls}`}>
        {k === "shift-l" || k === "shift-r" ? "SHIFT" : k}
      </div>
    );
  }

  // Finger zone legend (compact: hide)
  const nextZone   = baseNext ? FINGER_MAP[baseNext] : null;
  const nextStyle  = nextZone ? ZONE_STYLES[nextZone] : null;

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 select-none">
      {/* Rows */}
      <div className={`flex flex-col items-center gap-1 sm:gap-1.5`}>
        {ROWS.map((row, ri) => (
          <div key={ri} className={`flex ${gap}`}>
            {row.map(k => <KeyCell key={k} k={k} />)}
          </div>
        ))}
        {/* Space bar */}
        <div className={`
          ${compact ? "w-44 h-7 text-[10px]" : "w-52 sm:w-60 h-8 sm:h-9 text-xs"}
          rounded-lg flex items-center justify-center font-bold uppercase border transition-all duration-100
          ${next === " "
            ? "bg-slate-300 border-white text-slate-900 scale-105 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            : "bg-slate-800/50 border-slate-700 text-slate-500"}
        `}>
          SPACE
        </div>
      </div>

      {/* Finger cue — which finger/hand for the next key */}
      {nextStyle && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 bg-slate-800/60">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ background: nextStyle.hex }} />
          <span className="text-xs font-bold text-slate-300">
            {needsShiftL && "L. Pinky + "}{needsShiftR && "R. Pinky + "}{nextStyle.label}
          </span>
        </div>
      )}

      {/* Zone legend */}
      {!compact && (
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 max-w-sm mt-1 sm:mt-2">
          {Object.entries(ZONE_STYLES).slice(0, 8).map(([zone, st]) => (
            <div key={zone} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: st.hex }} />
              <span className="text-[10px] text-slate-500">{st.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
