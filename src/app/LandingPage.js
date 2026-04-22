"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Sparkles, Gamepad2, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-[family-name:var(--font-geist-sans)] selection:bg-indigo-500/20 overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px] opacity-70 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img src="/logo.png" alt="Jennings Academy Logo" className="h-16 w-auto scale-125 origin-right drop-shadow-md object-contain" />
          <span className="text-3xl font-black tracking-tight text-slate-800">Jennings Academy</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-sm font-bold bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-500 hover:scale-105 transition-all shadow-md shadow-indigo-500/20">
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-600 text-sm font-bold mb-8 shadow-sm animate-[slideDown_0.5s_ease-out]">
          <Sparkles className="w-4 h-4" />
          <span>The Premier Christian Homeschool App</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-slate-800 animate-[slideUp_0.6s_ease-out]">
          Education Built on <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500">
            Truth & Wisdom
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mb-12 font-medium leading-relaxed animate-[fadeIn_0.8s_ease-out]">
          A gamified, comprehensive curriculum combining classical logic, structured grammar, and immersive reading—designed specifically for Christian families.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-[slideUp_1s_ease-out]">
          <Link href="/sign-up" className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-black text-lg hover:shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:scale-105 transition-all">
            Start Learning <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#features" className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold text-lg shadow-sm transition-all hover:border-slate-300">
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
              color: "text-rose-600",
              bg: "bg-rose-50",
              border: "border-rose-100"
            },
            {
              icon: Gamepad2,
              title: "Gamified Math & Typing",
              desc: "Turn drills into thrills with arcade-style math races, word runners, and typing challenges.",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              border: "border-emerald-100"
            },
            {
              icon: BookOpen,
              title: "Immersive Reading",
              desc: "A rich library of audiobooks and synchronized spelling tests with adaptive difficulty.",
              color: "text-amber-600",
              bg: "bg-amber-50",
              border: "border-amber-100"
            }
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-start p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all text-left group">
              <div className={`p-4 rounded-2xl ${f.bg} ${f.border} border mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                <f.icon className={`w-8 h-8 ${f.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{f.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </main>

      {/* Footer minimal */}
      <footer className="border-t border-slate-200 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Safe, ad-free, and family-focused.</span>
          </div>
          <div className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Jennings Academy. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
