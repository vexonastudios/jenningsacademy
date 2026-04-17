import { Check, Lock, Play, Volume2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function ChildPath() {
  const steps = [
    { title: "Math", isCompleted: true, isCurrent: false, time: "15 min" },
    { title: "Spelling", isCompleted: false, isCurrent: true, time: "10 min" },
    { title: "Audiobook", isCompleted: false, isCurrent: false, time: "20 min" },
    { title: "Word Runner", isCompleted: false, isCurrent: false, time: "Reward" },
  ];

  return (
    <div className="min-h-screen bg-sky-50 font-[family-name:var(--font-geist-sans)] selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* Background Orbs / Premium Light Aesthetic */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/60 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Voice Guide Header */}
      <nav className="flex justify-between items-center px-8 py-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xl px-5 py-3 rounded-full shadow-lg border border-white">
          <button className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-400 hover:scale-105 transition-all shadow-lg shadow-indigo-500/30">
            <Volume2 className="w-5 h-5" />
          </button>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Voice Guide</p>
            <p className="text-slate-700 font-bold text-sm">"Great job on Math! Ready for spelling?"</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="bg-white p-1 rounded-full shadow-md border border-slate-100">
             <UserButton afterSignOutUrl="/sign-in" appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
           </div>
        </div>
      </nav>

      {/* Stepping Stones UI */}
      <main className="relative z-10 max-w-3xl mx-auto mt-16 px-6 pb-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-900 to-slate-700 mb-4">
            Today's Path
          </h1>
          <p className="text-slate-500 font-medium text-lg bg-white/50 backdrop-blur-md inline-block px-4 py-1.5 rounded-full border border-white">
            Friday, October 14th
          </p>
        </div>

        <div className="relative">
          {/* Vertical Track Line */}
          <div className="absolute left-[39px] top-4 bottom-4 w-2 bg-gradient-to-b from-emerald-200 via-indigo-200 to-white/50 rounded-full" />
          
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-8 group ${!step.isCompleted && !step.isCurrent ? 'opacity-70 saturate-50' : 'opacity-100'}`}
              >
                {/* Node Status */}
                <div className="relative z-10 w-20 h-20 flex-shrink-0">
                  {step.isCompleted ? (
                    <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center border-[6px] border-emerald-50 shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
                      <Check className="w-8 h-8 text-white relative z-10" />
                    </div>
                  ) : step.isCurrent ? (
                    <div className="w-full h-full rounded-full bg-indigo-500 flex items-center justify-center border-[6px] border-indigo-50 shadow-[0_10px_40px_rgba(99,102,241,0.4)] animate-[pulse_3s_ease-in-out_infinite]">
                      <Play className="w-8 h-8 text-white ml-2 relative z-10" />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-[6px] border-slate-100 shadow-md">
                      <Lock className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Card */}
                <div 
                  className={`flex-1 p-6 rounded-[2rem] border-2 transition-all duration-500
                    ${step.isCurrent 
                      ? 'bg-white border-indigo-200 shadow-2xl shadow-indigo-500/10 cursor-pointer hover:border-indigo-300 hover:-translate-y-1 hover:shadow-indigo-500/20' 
                      : step.isCompleted
                        ? 'bg-white/60 border-transparent shadow-sm'
                        : 'bg-white/40 border-transparent backdrop-blur-sm'
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${step.isCompleted ? 'text-emerald-500' : step.isCurrent ? 'text-indigo-500' : 'text-slate-400'}`}>
                        Step {idx + 1}
                      </p>
                      <h2 className={`text-2xl font-bold ${step.isCompleted ? 'text-slate-500' : step.isCurrent ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step.title}
                      </h2>
                    </div>
                    {step.isCurrent ? (
                      <button className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-600/30 group-hover:bg-indigo-500 transition-colors">
                        Start Module
                      </button>
                    ) : (
                      <div className="bg-slate-100/50 text-slate-400 px-4 py-2 rounded-xl font-medium text-sm border border-slate-100">
                        {step.time}
                      </div>
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
