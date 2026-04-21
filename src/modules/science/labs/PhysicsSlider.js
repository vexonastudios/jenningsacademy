"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, Orbit, ArrowDown } from "lucide-react";

export default function PhysicsSlider({ speak, onComplete }) {
  const [gravity, setGravity] = useState(9.8);
  const [mass, setMass] = useState(1);
  const [isDropping, setIsDropping] = useState(false);
  const [height, setHeight] = useState(0); // 0 = top, 400 = floor
  const [time, setTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  
  const reqRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak("Welcome to the Physics Simulation. Did you know that in a vacuum, a heavy bowling ball and a light feather will drop at the exact same speed? Drop the ball and adjust the sliders to test Galileo's theory!");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);
  
  // A simple physics simulation of freefall: d = 1/2 * g * t^2
  // We use CSS pixels, let's map 400px to roughly 100 meters
  const PIXELS_PER_METER = 4;
  const FLOOR = 400;

  const reset = () => {
    cancelAnimationFrame(reqRef.current);
    setIsDropping(false);
    setHeight(0);
    setTime(0);
  };

  const startDrop = () => {
    reset();
    setIsDropping(true);
    startTimeRef.current = performance.now();
    reqRef.current = requestAnimationFrame(updatePhysics);
  };

  const updatePhysics = (timestamp) => {
    const elapsedSeconds = (timestamp - startTimeRef.current) / 1000;
    
    // d = 0.5 * a * t^2.   We ignore mass because Galileo proved all objects fall at the same rate in a vacuum!
    const distanceMeters = 0.5 * gravity * Math.pow(elapsedSeconds, 2);
    const distancePx = distanceMeters * PIXELS_PER_METER;

    if (distancePx >= FLOOR) {
      setHeight(FLOOR);
      setTime(elapsedSeconds);
      setIsDropping(false);
      // Let them complete after 1 drop
      if (!finished) {
        setFinished(true);
        const velocity = (gravity * elapsedSeconds).toFixed(1);
        speak(`Impact! The object hit the ground in ${elapsedSeconds.toFixed(2)} seconds, reaching a speed of ${velocity} meters per second. Notice how the mass didn't change the time!`);
      }
    } else {
      setHeight(distancePx);
      setTime(elapsedSeconds);
      reqRef.current = requestAnimationFrame(updatePhysics);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => cancelAnimationFrame(reqRef.current);
  }, []);

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
       
       <div className="w-full md:w-80 bg-slate-900 text-white p-8 flex flex-col shrink-0">
          <div className="flex items-center gap-3 mb-6 text-sky-400">
            <Orbit className="w-6 h-6" />
            <h3 className="font-extrabold tracking-widest uppercase">Physics Sim</h3>
          </div>
          
          <p className="text-slate-300 text-sm mb-8 leading-relaxed">
            Test Galileo's theory! Adjust Gravity and Mass, then drop the ball to see how fast it falls 100 meters.
          </p>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gravity (m/s²)</label>
                <span className="text-sky-400 font-bold font-mono">{gravity.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="1" max="25" step="0.1" 
                value={gravity} 
                onChange={(e) => { setGravity(Number(e.target.value)); reset(); }}
                className="w-full accent-sky-500"
                disabled={isDropping}
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-semibold">
                <span>Moon (1.6)</span>
                <span>Earth (9.8)</span>
                <span>Jupiter (24)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mass (kg)</label>
                <span className="text-sky-400 font-bold font-mono">{mass.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="1" max="100" step="1" 
                value={mass} 
                onChange={(e) => { setMass(Number(e.target.value)); reset(); }}
                className="w-full accent-sky-500"
                disabled={isDropping}
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-semibold">
                <span>Feather (1)</span>
                <span>Bowling Ball (100)</span>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-sky-500/10 border border-sky-500/20 p-4 rounded-xl">
             <p className="text-[11px] font-medium text-sky-200 leading-relaxed">
               Did the mass change the speed? In a vacuum, all objects fall at exactly the same rate regardless of mass!
             </p>
          </div>

          {finished && !isDropping && (
             <button onClick={onComplete} className="mt-auto w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
               Complete Lab
             </button>
          )}
       </div>

       {/* Simulation Area */}
       <div className="flex-1 bg-slate-50 relative overflow-hidden flex justify-center py-10 border-l border-slate-200">
          
          <div className="relative w-full max-w-sm h-[400px]">
            {/* Measuring Tape */}
            <div className="absolute left-0 top-0 bottom-0 w-8 border-r-2 border-slate-300 flex flex-col justify-between text-[10px] text-slate-400 font-mono items-start font-bold">
               <span>0m</span>
               <span>25m</span>
               <span>50m</span>
               <span>75m</span>
               <span>100m</span>
            </div>

            {/* The Drop Object */}
            <div 
              className={`absolute left-1/2 -translateX-1/2 w-12 h-12 rounded-full border-4 shadow-xl flex items-center justify-center transition-transform ${isDropping ? 'bg-sky-500 border-sky-600' : 'bg-slate-300 border-slate-400'}`}
              style={{
                transform: `translate3d(-50%, ${height}px, 0) scale(${Math.max(0.5, Math.min(1.5, mass / 30))})`,
              }}
            >
               <ArrowDown className={`w-5 h-5 text-white ${isDropping ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Ground */}
            <div className="absolute bottom-[-16px] left-10 right-0 h-4 bg-slate-800 rounded-lg opacity-20" />
            
            {/* Live Stats UI */}
            <div className="absolute top-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg p-4 w-40">
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Time Elapsed</div>
               <div className="text-3xl font-black text-slate-800 font-mono tracking-tighter">
                 {time.toFixed(2)}<span className="text-sm font-bold text-slate-400 ml-1">s</span>
               </div>
               
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4 mb-1">Velocity</div>
               <div className="text-lg font-bold text-sky-600 font-mono tracking-tight">
                 {(gravity * time).toFixed(1)} m/s
               </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-2 right-0">
               {!isDropping ? (
                 <button onClick={startDrop} className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3 rounded-full shadow-lg active:scale-95 transition-all">
                   DROP
                 </button>
               ) : (
                 <button onClick={reset} className="bg-rose-500 hover:bg-rose-400 text-white font-bold px-8 py-3 rounded-full shadow-lg active:scale-95 transition-all">
                   RESET
                 </button>
               )}
            </div>
          </div>
       </div>

    </div>
  );
}
