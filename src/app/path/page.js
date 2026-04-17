import { Check, Lock, Play, Volume2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function ChildPath() {
  const steps = [
    { title: "Math", isCompleted: true, isCurrent: false },
    { title: "Spelling", isCompleted: false, isCurrent: true },
    { title: "Audiobook", isCompleted: false, isCurrent: false },
    { title: "Word Runner", isCompleted: false, isCurrent: false },
  ];

  return (
    <div className="min-h-screen bg-slate-900 font-[family-name:var(--font-geist-sans)] selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* Background Orbs / Premium Aesthetic */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-pink-600/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Voice Guide Header */}
      <nav className="flex justify-between items-center px-8 py-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-full border border-white/10 shadow-2xl">
          <button className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-400 hover:scale-105 transition-all shadow-lg shadow-indigo-500/30">
            <Volume2 className="w-5 h-5" />
          </button>
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Voice Guide</p>
            <p className="text-white font-medium text-sm">"Great job on Math! Ready for spelling?"</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="bg-white/10 p-1 rounded-full border border-white/20">
             <UserButton afterSignOutUrl="/sign-in" />
           </div>
        </div>
      </nav>

      {/* Stepping Stones UI */}
      <main className="relative z-10 max-w-3xl mx-auto mt-20 px-6 pb-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 mb-4">
            Today's Path
          </h1>
          <p className="text-white/50 text-lg">Friday, October 14th</p>
        </div>

        <div className="relative">
          {/* Vertical Track Line */}
          <div className="absolute left-[39px] top-4 bottom-4 w-1 bg-white/5 rounded-full" />
          
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-8 group ${!step.isCompleted && !step.isCurrent ? 'opacity-50' : 'opacity-100'}`}
              >
                {/* Node Status */}
                <div className="relative z-10 w-20 h-20 flex-shrink-0">
                  {step.isCompleted ? (
                    <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center border-4 border-slate-900 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                  ) : step.isCurrent ? (
                    <div className="w-full h-full rounded-full bg-indigo-500 flex items-center justify-center border-4 border-slate-900 shadow-[0_0_40px_rgba(99,102,241,0.5)] animate-pulse">
                      <Play className="w-8 h-8 text-white ml-2" />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-900">
                      <Lock className="w-8 h-8 text-white/30" />
                    </div>
                  )}
                </div>

                {/* Card */}
                <div 
                  className={`flex-1 p-6 rounded-3xl border transition-all duration-500
                    ${step.isCurrent 
                      ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 border-indigo-500/50 shadow-2xl shadow-indigo-500/10 cursor-pointer hover:border-indigo-400 hover:scale-[1.02]' 
                      : step.isCompleted
                        ? 'bg-white/5 border-emerald-500/20'
                        : 'bg-white/5 border-white/5'
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${step.isCompleted ? 'text-emerald-400' : step.isCurrent ? 'text-indigo-400' : 'text-white/30'}`}>
                        Step {idx + 1}
                      </p>
                      <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                    </div>
                    {step.isCurrent && (
                      <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 group-hover:bg-indigo-400 transition-colors">
                        Start Module
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

    </div>
  );
}
