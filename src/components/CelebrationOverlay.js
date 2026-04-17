"use client";

import { useEffect, useRef } from "react";

export default function CelebrationOverlay({ message = "Great job! 🎉", onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 8 + 4,
      d: Math.random() * 120,
      color: ["#6366f1","#10b981","#f59e0b","#ec4899","#3b82f6","#a855f7"][Math.floor(Math.random() * 6)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngle: 0,
      tiltAngleInc: (Math.random() * 0.07) + 0.05,
    }));

    let angle = 0;
    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.01;
      particles.forEach((p, i) => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(angle + p.d) + 3 + p.r / 2) * 1.2;
        p.tilt = Math.sin(p.tiltAngle) * 15;
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
        if (p.y > canvas.height + 20) {
          p.x = Math.random() * canvas.width;
          p.y = -20;
        }
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    const timer = setTimeout(() => {
      cancelAnimationFrame(frame);
      onDone?.();
    }, 3500);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center pointer-events-auto" onClick={onDone}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-[2rem] shadow-2xl px-14 py-12 text-center border border-white max-w-md mx-4">
        <div className="text-7xl mb-4">⭐</div>
        <h2 className="text-4xl font-black text-slate-800 mb-3">{message}</h2>
        <p className="text-slate-400 font-medium text-lg mb-6">Keep going — you're doing amazing!</p>
        <button onClick={onDone} className="bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 transition-all hover:scale-105">
          Next Step →
        </button>
      </div>
    </div>
  );
}
