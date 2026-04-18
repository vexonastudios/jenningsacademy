import React from "react";

export default function StreakMeter({ streak, showCombo }) {
  if (streak === 0 && !showCombo) return null;
  
  const isHot = streak >= 5;
  const isOnFire = streak >= 10;

  return (
    <div className="absolute top-20 right-4 z-20 flex flex-col items-end gap-2">
      {streak > 0 && (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-black text-sm transition-all duration-500 animate-[streakPop_0.3s_ease-out]
          ${isOnFire ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-[0_0_20px_rgba(251,146,60,0.6)]"
            : isHot ? "bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"}`}
        >
          <span className={`text-lg ${isOnFire ? "animate-bounce" : ""}`}>
            {isOnFire ? "🌟" : isHot ? "🔥" : "⚡"}
          </span>
          <span>{streak} in a row{isOnFire ? "! LEGENDARY!" : isHot ? "! On fire!" : "!"}</span>
        </div>
      )}
      {showCombo && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg animate-bounce">
          COMBO x{streak}! 🎯
        </div>
      )}
    </div>
  );
}
