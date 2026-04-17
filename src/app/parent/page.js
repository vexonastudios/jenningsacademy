import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { PlusCircle, CalendarSync, Settings, TrendingUp, GripVertical, Settings2, Sparkles, BookOpen, Calculator, Type, Gamepad2 } from "lucide-react";

export default function ParentDashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // MVP Static Data Simulation
  const profiles = [
    { id: "1", name: "Jimmy", grade: 3, avatarColor: "bg-blue-500", initials: "J" },
    { id: "2", name: "Sarah", grade: 5, avatarColor: "bg-pink-500", initials: "S" },
  ];

  const todaysPlan = [
    { id: "p1", type: "Math", icon: Calculator, color: "text-blue-600 bg-blue-100" },
    { id: "p2", type: "Spelling", icon: Type, color: "text-purple-600 bg-purple-100" },
    { id: "p3", type: "Audiobook", icon: BookOpen, color: "text-amber-600 bg-amber-100" },
    { id: "p4", type: "Word Runner", icon: Gamepad2, color: "text-emerald-600 bg-emerald-100" },
  ];

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-indigo-50 via-white to-cyan-50 font-[family-name:var(--font-geist-sans)] pb-24">
      {/* Premium Header */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white/60 backdrop-blur-md border-b border-white/40 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-indigo-600/20 shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-900 to-slate-700 bg-clip-text text-transparent">
            Jennings Academy
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-white rounded-full shadow-sm">
            <Settings2 className="w-5 h-5" />
          </button>
          <div className="bg-white p-1 rounded-full shadow-sm ring-1 ring-slate-100">
             <UserButton afterSignOutUrl="/sign-in" appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Students List */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              Your Students
            </h2>
            <ul className="space-y-3">
              {profiles.map((child, idx) => (
                <li key={child.id} className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 ${idx === 0 ? "bg-indigo-50 border border-indigo-100 ring-1 ring-indigo-200 shadow-sm" : "hover:bg-slate-50 border border-transparent"}`}>
                  <div className={`w-12 h-12 rounded-full ${child.avatarColor} text-white flex items-center justify-center font-bold text-lg shadow-inner ring-2 ring-white`}>
                    {child.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{child.name}</p>
                    <p className="text-xs text-slate-500 font-medium">Grade {child.grade}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-medium hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all">
              <PlusCircle className="w-4 h-4" /> Add Child
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-3xl shadow-xl shadow-indigo-600/20 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <TrendingUp className="w-24 h-24" />
             </div>
             <h3 className="font-semibold text-indigo-100 text-sm mb-1">Weekly Mastery</h3>
             <p className="text-3xl font-bold mb-4">84%</p>
             <button className="text-sm bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg font-medium backdrop-blur-sm">
               View Full Report
             </button>
          </div>
        </aside>

        {/* Main Content: Daily Plan Editor */}
        <section className="lg:col-span-9">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white min-h-[600px]">
             <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
               <div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Today's Flight Plan</h2>
                  <p className="text-slate-500 flex items-center gap-2">
                    <CalendarSync className="w-4 h-4" /> 
                    Editing plan for <span className="font-semibold text-indigo-600">Jimmy</span> · Friday, Oct 14th
                  </p>
               </div>
               <div className="flex gap-3">
                 <button className="px-5 py-2.5 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                   Load Template
                 </button>
                 <button className="px-6 py-2.5 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5">
                   Publish Plan
                 </button>
               </div>
             </div>

             {/* Drag and Drop modules placeholder */}
             <div className="space-y-4 max-w-3xl">
                {todaysPlan.map((module, idx) => (
                  <div key={module.id} className="group flex items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                     <div className="px-2 text-slate-300 cursor-grab hover:text-slate-500 transition-colors">
                       <GripVertical className="w-5 h-5" />
                     </div>
                     <span className="w-8 text-center font-bold text-slate-300 text-sm ml-2 mr-4">
                       0{idx + 1}
                     </span>
                     <div className={`p-3 rounded-xl ${module.color} mr-4`}>
                       <module.icon className="w-6 h-6" />
                     </div>
                     <div className="flex-1">
                       <h3 className="font-bold text-slate-800">{module.type}</h3>
                       <p className="text-sm text-slate-500">Auto-assigned progression</p>
                     </div>
                     <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-indigo-600 transition-all">
                       <Settings className="w-5 h-5" />
                   </button>
                  </div>
                ))}

                <button className="w-full mt-6 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 text-indigo-500 font-bold hover:bg-indigo-100/50 hover:border-indigo-300 transition-all">
                  <PlusCircle className="w-5 h-5" /> Add Module
                </button>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
}
