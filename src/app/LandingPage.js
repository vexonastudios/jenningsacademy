"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Sparkles, CheckCircle2, Gamepad2, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-[family-name:var(--font-geist-sans)] selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] opacity-50 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img src="/logo.png" alt="Jennings Academy Logo" className="h-16 w-auto scale-125 origin-right drop-shadow-lg object-contain" />
          <span className="text-3xl font-black tracking-tight text-white">Jennings Academy</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-sm font-bold bg-white text-slate-900 px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-bold mb-8 animate-[slideDown_0.5s_ease-out]">
          <Sparkles className="w-4 h-4" />
          <span>The Premier Christian Homeschool App</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] animate-[slideUp_0.6s_ease-out]">
          Education Built on <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Truth & Wisdom
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-12 font-medium leading-relaxed animate-[fadeIn_0.8s_ease-out]">
          A gamified, comprehensive curriculum combining classical logic, structured grammar, and immersive reading—designed specifically for Christian families.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-[slideUp_1s_ease-out]">
          <Link href="/sign-up" className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-black text-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105 transition-all">
            Start Learning <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#features" className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-300 px-8 py-4 rounded-full font-bold text-lg transition-all">
            Explore Curriculum
          </Link>
        </div>

        {/* Feature Grid preview */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full max-w-5xl">
          {[
            {
              icon: Brain,
              title: "Classical Logic (K-12)",
              desc: "From basic sequencing to deep apologetics and formal fallacies, equipping minds to defend truth.",
              color: "text-rose-400",
              bg: "bg-rose-500/10",
              border: "border-rose-500/20"
            },
            {
              icon: Gamepad2,
              title: "Gamified Math & Typing",
              desc: "Turn drills into thrills with arcade-style math races, word runners, and typing challenges.",
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
              border: "border-emerald-500/20"
            },
            {
              icon: BookOpen,
              title: "Immersive Reading",
              desc: "A rich library of audiobooks and synchronized spelling tests with adaptive difficulty.",
              color: "text-amber-400",
              bg: "bg-amber-500/10",
              border: "border-amber-500/20"
            }
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-start p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/80 transition-colors text-left group">
              <div className={`p-4 rounded-2xl ${f.bg} ${f.border} border mb-6 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-8 h-8 ${f.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </main>

      {/* Footer minimal */}
      <footer className="border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <Shield className="w-4 h-4" />
            <span>Safe, ad-free, and family-focused.</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Jennings Academy. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
