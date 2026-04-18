"use client";

import { useState } from "react";
import { Sparkles, Delete } from "lucide-react";

export default function PinGate({ profileId, profileName, onSuccess }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"];

  const handleDigit = (d) => {
    if (d === "del") {
      setPin(p => p.slice(0, -1));
      return;
    }
    if (pin.length >= 4) return;
    const next = pin + String(d);
    setPin(next);
    if (next.length === 4) verify(next);
  };

  const verify = async (code) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId, pin: code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPin("");
        setError("Wrong PIN — try again!");
        setShake(true);
        setTimeout(() => setShake(false), 600);
      } else {
        onSuccess(data.profile);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setPin("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-50 to-white flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2 mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Jennings Academy" className="h-20 w-auto drop-shadow-lg" />
        <span className="text-xl font-black text-indigo-900 tracking-tight">Jennings Academy</span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-[2rem] shadow-2xl p-10 w-full max-w-sm border border-slate-100">
        <h1 className="text-3xl font-black text-slate-800 text-center mb-1">
          Hi, {profileName}! 👋
        </h1>
        <p className="text-slate-400 text-center text-sm font-medium mb-8">Enter your 4-digit PIN to start</p>

        {/* PIN Display */}
        <div className={`flex justify-center gap-4 mb-8 transition-all ${shake ? "animate-[shake_0.4s_ease]" : ""}`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-200
                ${pin.length > i
                  ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-200"
                  : "border-slate-200 bg-slate-50"}
              `}
            >
              {pin.length > i && (
                <div className="w-4 h-4 rounded-full bg-indigo-600" />
              )}
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-rose-500 text-center text-sm font-bold mb-4 animate-pulse">{error}</p>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3">
          {digits.map((d, idx) => (
            d === null ? <div key={idx} /> :
            <button
              key={idx}
              onClick={() => handleDigit(d)}
              disabled={loading}
              className={`h-16 rounded-2xl text-xl font-bold transition-all active:scale-95 select-none
                ${d === "del"
                  ? "bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center"
                  : "bg-indigo-50 text-indigo-900 hover:bg-indigo-100 shadow-sm border border-indigo-100"}
              `}
            >
              {d === "del" ? <Delete className="w-5 h-5" /> : d}
            </button>
          ))}
        </div>
      </div>

      <p className="text-slate-400 text-xs mt-8 text-center">
        Ask a parent if you forgot your PIN
      </p>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
