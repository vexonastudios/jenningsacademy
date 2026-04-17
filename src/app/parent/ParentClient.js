"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { PlusCircle, CalendarSync, Settings, TrendingUp, GripVertical, Settings2, Sparkles, BookOpen, Calculator, Type, Gamepad2, X, Link, Clock, Medal, ChevronRight, Play, Volume2 } from "lucide-react";
import { addChild } from "../actions";

const ICON_MAP = {
  Calculator: Calculator,
  Type: Type,
  BookOpen: BookOpen,
  Settings: Settings,
  Gamepad2: Gamepad2
};

export default function ParentClient({ profiles }) {
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [activeChildId, setActiveChildId] = useState(profiles[0]?.id || null);
  const [rewardTime, setRewardTime] = useState(15);

  const voiceOptions = [
    { id: "2fe8mwpfJcqvj9RGBsC1", name: "Mr. Smith" },
    { id: "vDDsFF2fWRAHODFKKuEX", name: "Mr. Davis" },
    { id: "fnYMz3F5gMEDGMWcH1ex", name: "Mr. Harrison" },
    { id: "DODLEQrClDo8wCz460ld", name: "Ms. Sarah" },
    { id: "w2CTE3MYza6FgBnETYNT", name: "Ms. Emily" }
  ];

  const [selectedVoice, setSelectedVoice] = useState(voiceOptions[0].id);
  const [playingVoice, setPlayingVoice] = useState(null);

  const handlePlaySample = (voiceId, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (playingVoice) return; // Prevent overlapping audio
    setPlayingVoice(voiceId);
    
    const audio = new Audio(`/api/tts?voiceId=${voiceId}`);
    audio.play();
    audio.onended = () => setPlayingVoice(null);
    audio.onerror = () => {
      console.error("Audio playback error");
      setPlayingVoice(null);
    }
  };

  const [todaysPlan, setTodaysPlan] = useState([
    { id: "p1", type: "Math", iconCode: "Calculator", color: "text-blue-600 bg-blue-100" },
    { id: "p2", type: "Spelling", iconCode: "Type", color: "text-purple-600 bg-purple-100" },
    { id: "p3", type: "Audiobook", iconCode: "BookOpen", color: "text-amber-600 bg-amber-100" },
  ]);

  const libraryModules = [
    { type: "Math", iconCode: "Calculator", color: "text-blue-600 bg-blue-100", desc: "Adaptive arithmetic" },
    { type: "Spelling", iconCode: "Type", color: "text-purple-600 bg-purple-100", desc: "Weekly word lists" },
    { type: "Audiobook", iconCode: "BookOpen", color: "text-amber-600 bg-amber-100", desc: "Comprehension focus" },
    { type: "Logic", iconCode: "Settings", color: "text-rose-600 bg-rose-100", desc: "Critical thinking puzzles" },
  ];

  const activeChild = profiles.find(p => p.id === activeChildId) || profiles[0];

  const handleAddModule = (mod) => {
    setTodaysPlan([...todaysPlan, { ...mod, id: `p${Date.now()}` }]);
  };

  const handleRemoveModule = (id) => {
    setTodaysPlan(todaysPlan.filter(p => p.id !== id));
  };

  const handleSubmitNewChild = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Convert checkbox array for the days
    const days = [];
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(d => {
       if (formData.get(`day_${d}`)) days.push(d);
    });

    // Create a plain serializable JSON object instead of passing FormData
    // This perfectly bypasses Next.js MessagePort boundary crashes
    const payload = {
      name: formData.get("name"),
      grade: formData.get("grade"),
      pin: formData.get("pin"),
      startDate: formData.get("startDate"),
      voiceId: formData.get("voiceId"),
      schoolDays: days
    };

    await addChild(payload);
    setIsAddingChild(false);
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-cyan-50 font-[family-name:var(--font-geist-sans)] pb-24">
      
      {/* Modal for adding a child */}
      {isAddingChild && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsAddingChild(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Add a Child</h2>
            <form onSubmit={handleSubmitNewChild} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">First Name</label>
                <input name="name" required type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="e.g. Jimmy" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Grade Level</label>
                  <input name="grade" required type="number" min="1" max="12" className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="1" defaultValue="1" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">4-Digit PIN</label>
                  <input name="pin" required type="text" maxLength="4" pattern="[0-9]{4}" title="Must be exactly 4 numbers" className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="1234" />
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="border-t border-slate-100 pt-4 mt-4">
                 <h3 className="text-sm font-bold text-slate-800 mb-3">Settings & Guide Voice</h3>
                 
                 <div className="mb-4">
                   <label className="block text-sm font-semibold text-slate-600 mb-2">Select a Guide Voice</label>
                   <input type="hidden" name="voiceId" value={selectedVoice} />
                   <div className="grid grid-cols-2 gap-2">
                     {voiceOptions.map(v => (
                       <div key={v.id} 
                         onClick={() => setSelectedVoice(v.id)}
                         className={`flex items-center justify-between p-2 rounded-xl cursor-pointer border-2 transition-all ${selectedVoice === v.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white hover:border-slate-300'}`}
                       >
                         <div>
                           <p className="text-xs font-bold text-slate-800">{v.name}</p>
                         </div>
                         <button 
                           onClick={(e) => handlePlaySample(v.id, e)}
                           className={`p-1.5 rounded-full ${playingVoice === v.id ? 'bg-indigo-500 text-white animate-pulse' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                         >
                           {playingVoice === v.id ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                         </button>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div className="mb-4">
                   <label className="block text-sm font-semibold text-slate-600 mb-1">School Start Date</label>
                   <input name="startDate" required type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                 </div>

                 <div>
                   <label className="block text-sm font-semibold text-slate-600 mb-2">School Days</label>
                   <div className="flex flex-wrap gap-2">
                     {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                       <label key={day} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-100">
                         <input type="checkbox" name={`day_${day}`} defaultChecked={['Mon','Tue','Wed','Thu','Fri'].includes(day)} className="accent-indigo-600 w-4 h-4" />
                         <span className="text-sm font-medium text-slate-700">{day}</span>
                       </label>
                     ))}
                   </div>
                 </div>
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-6">
                Create Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Premium Header */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white/60 backdrop-blur-md border-b border-white/40 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-indigo-600/20 shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-900 to-slate-700 bg-clip-text text-transparent cursor-pointer">
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

      <main className="max-w-[1400px] mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* === COLUMN 1: Roster & Analytics === */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Your Students
            </h2>
            
            {profiles.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-slate-500 mb-4 text-sm font-medium">No children added yet.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {profiles.map((child) => {
                  const isActive = activeChildId === child.id;
                  const initials = child.name ? child.name.charAt(0).toUpperCase() : "?";
                  
                  return (
                    <li key={child.id} onClick={() => setActiveChildId(child.id)} className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? "bg-indigo-50 border border-indigo-100 ring-1 ring-indigo-200 shadow-sm" : "hover:bg-slate-50 border border-transparent"}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${child.avatar_url || "bg-indigo-500"} text-white flex items-center justify-center font-bold text-lg shadow-inner ring-2 ring-white`}>
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{child.name}</p>
                          <p className="text-xs text-slate-500 font-medium">Grade {child.grade_level}</p>
                        </div>
                      </div>
                      <button 
                        title="Copy Student Link"
                        className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors"
                        onClick={(e) => {
                           e.stopPropagation();
                           alert(`Bookmark Link Copied: https://app.jennings.com/path?profile=${child.id}`);
                        }}
                      >
                         <Link className="w-4 h-4" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}

            <button onClick={() => setIsAddingChild(true)} className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-medium hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all">
              <PlusCircle className="w-4 h-4" /> Add Child
            </button>
          </div>

          {/* Analytics Card */}
          {activeChild && (
            <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 p-6 rounded-3xl shadow-xl shadow-indigo-600/20 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <TrendingUp className="w-24 h-24" />
               </div>
               <h3 className="font-semibold text-indigo-100 text-sm mb-1">{activeChild.name}'s Mastery</h3>
               <p className="text-3xl font-bold mb-6">84%</p>
               
               {/* Mini CSS Chart */}
               <div className="space-y-3 mb-6 relative z-10">
                 <div>
                   <div className="flex justify-between text-xs font-medium text-indigo-200 mb-1">
                     <span>Math</span>
                     <span>92%</span>
                   </div>
                   <div className="w-full h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-[92%]"></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-xs font-medium text-indigo-200 mb-1">
                     <span>Spelling</span>
                     <span>76%</span>
                   </div>
                   <div className="w-full h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[76%]"></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-xs font-medium text-indigo-200 mb-1">
                     <span>Comprehension</span>
                     <span>88%</span>
                   </div>
                   <div className="w-full h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-[88%]"></div>
                   </div>
                 </div>
               </div>

               <button className="w-full text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors py-2.5 rounded-xl backdrop-blur-sm border border-white/10 flex items-center justify-center gap-2">
                 Detailed Report <ChevronRight className="w-4 h-4" />
               </button>
            </div>
          )}
        </aside>

        {/* === COLUMN 2: Flight Plan Editor === */}
        <section className="lg:col-span-6">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white min-h-[700px]">
             {activeChild ? (
               <>
                 <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
                   <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-2">Today's Flight Plan</h2>
                      <p className="text-slate-500 flex items-center gap-2">
                        <CalendarSync className="w-4 h-4" /> 
                        Building path for <span className="font-semibold text-indigo-600">{activeChild.name}</span>
                      </p>
                   </div>
                   <div className="flex gap-3">
                     <button className="px-6 py-2.5 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                       Publish Plan
                     </button>
                   </div>
                 </div>

                 {/* Active Path Editor */}
                 <div className="space-y-4">
                    {todaysPlan.length === 0 && (
                      <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-slate-400">
                        Drop modules here from the Library to build the path.
                      </div>
                    )}
                    {todaysPlan.map((module, idx) => {
                      const IconComponent = ICON_MAP[module.iconCode] || Calculator;
                      return (
                      <div key={module.id} className="group flex items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative">
                         <div className="px-2 text-slate-300 cursor-grab hover:text-slate-500 transition-colors">
                           <GripVertical className="w-5 h-5" />
                         </div>
                         <span className="w-8 text-center font-bold text-slate-300 text-sm ml-2 mr-3">
                           {idx + 1}
                         </span>
                         <div className={`p-3 rounded-lg ${module.color} mr-4`}>
                           <IconComponent className="w-5 h-5" />
                         </div>
                         <div className="flex-1">
                           <h3 className="font-bold text-slate-800">{module.type}</h3>
                           <p className="text-xs text-slate-500">Standard progression</p>
                         </div>
                         <button onClick={() => handleRemoveModule(module.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all">
                           <X className="w-5 h-5" />
                         </button>
                      </div>
                    )})}

                    {/* The Reward Game is always fixed at the end */}
                    <div className="flex items-center bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 shadow-sm mt-8 opacity-80">
                       <div className="px-2 text-emerald-200">
                         <Lock className="w-5 h-5" />
                       </div>
                       <span className="w-8 text-center font-bold text-emerald-300 text-sm ml-2 mr-3">
                         {todaysPlan.length + 1}
                       </span>
                       <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600 mr-4">
                         <Gamepad2 className="w-5 h-5" />
                       </div>
                       <div className="flex-1">
                         <h3 className="font-bold text-emerald-800">Reward Unlock</h3>
                         <p className="text-xs text-emerald-600 font-medium">{rewardTime} Minutes of Playtime</p>
                       </div>
                    </div>
                 </div>
               </>
             ) : (
                <div className="flex flex-col items-center justify-center h-[500px] text-slate-400">
                   <Settings2 className="w-16 h-16 mb-4 opacity-20" />
                   <h2 className="text-xl font-semibold mb-2">No Students Selected</h2>
                   <p className="text-sm text-center max-w-sm">Add a child to the roster to build their path.</p>
                </div>
             )}
          </div>
        </section>

        {/* === COLUMN 3: Module Library & Settings === */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Module Library
            </h2>
            <div className="space-y-3">
              {libraryModules.map((mod, idx) => {
                const LibIcon = ICON_MAP[mod.iconCode] || Calculator;
                return (
                <div key={idx} onClick={() => handleAddModule(mod)} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 cursor-pointer transition-all group">
                   <div className={`p-2 rounded-lg ${mod.color} mt-0.5`}>
                     <LibIcon className="w-4 h-4" />
                   </div>
                   <div>
                     <p className="font-semibold text-slate-700 text-sm group-hover:text-indigo-700 transition-colors">{mod.type}</p>
                     <p className="text-xs text-slate-500 leading-tight mt-0.5">{mod.desc}</p>
                   </div>
                </div>
              )})}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Medal className="w-4 h-4" /> Reward Settings
            </h2>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700">Game Playtime</label>
                <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">{rewardTime} Mins</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="60" 
                step="5"
                value={rewardTime}
                onChange={(e) => setRewardTime(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                <span>5m</span>
                <span>60m</span>
              </div>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
}
