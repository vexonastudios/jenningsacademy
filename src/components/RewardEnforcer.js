"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";

export function RewardEnforcer({ maxTimeMinutes = 15 }) {
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(maxTimeMinutes * 60);
  const router = useRouter();

  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      // The iron-clad kick out
      alert("Time is up! Great job playing today, let's head back to the Hub.");
      router.push("/path");
      return;
    }

    const timer = setInterval(() => {
      // Note: we strictly tick down real time. 
      // If the parent wants this to be 'Active Time', we can integrate the useActiveTracker here. 
      // Most reward limits are based on sheer wall-clock time limit.
      setTimeLeftSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds, router]);

  const mins = Math.floor(timeLeftSeconds / 60);
  const secs = timeLeftSeconds % 60;

  // Turns text red when under 2 minutes
  const isWarning = timeLeftSeconds < 120;

  return (
    <div className={`fixed top-4 right-4 backdrop-blur-md px-5 py-2.5 rounded-full border shadow-2xl flex items-center gap-3 z-[9999] transition-colors
      ${isWarning ? 'bg-rose-900/90 border-rose-500 text-rose-100 animate-pulse' : 'bg-slate-900/90 border-slate-700 text-white'}
    `}>
      <Clock className={`w-4 h-4 ${isWarning ? 'text-rose-400' : 'text-emerald-400'}`} />
      <span className="font-mono font-bold tracking-widest">
        {mins}:{secs < 10 ? '0' : ''}{secs}
      </span>
    </div>
  );
}
