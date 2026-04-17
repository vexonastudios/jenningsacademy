/**
 * Placeholder module export used while actual module is being built.
 * Import this in any module's index.js until the real component is ready.
 */
"use client";
import { Hammer } from "lucide-react";

export default function ComingSoon({ moduleType, grade }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-full py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6">
        <Hammer className="w-10 h-10 text-slate-400" />
      </div>
      <h2 className="text-3xl font-black text-white mb-2">{moduleType} Module</h2>
      <p className="text-slate-400 mb-1">Grade {grade} content</p>
      <p className="text-slate-600 text-sm">Coming soon — check back after the next build!</p>
    </div>
  );
}
