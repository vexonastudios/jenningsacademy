"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { UserButton } from "@clerk/nextjs";
import { PlusCircle, CalendarSync, Settings, TrendingUp, GripVertical, Settings2, Sparkles, BookOpen, Calculator, Type, Gamepad2, Keyboard, Star, Map, X, Link, Clock, Medal, ChevronRight, ChevronLeft, Play, Volume2, Lock, Pencil, Trash2, FileDown, Save, Flame, Camera } from "lucide-react";
import { addChild, updateChild, deleteChild, publishPlan, savePlanAsTemplate } from "../actions";
import { getModulesForGrade } from "@/modules/_shared/moduleTypes";
import Avatar from "@/components/Avatar";
import {
  DndContext, closestCenter,
  PointerSensor, TouchSensor,
  useSensor, useSensors, DragOverlay
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext,
  verticalListSortingStrategy, useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ICON_MAP = {
  Calculator: Calculator,
  Type: Type,
  BookOpen: BookOpen,
  Settings: Settings,
  Gamepad2: Gamepad2,
  Keyboard: Keyboard,
  Star: Star,
  Map: Map,
};

// ── Sortable module row ───────────────────────────────────────────────────────
function SortableModule({ module, idx, onRemove, childSchoolDays, onToggleDay }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: module.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : "auto",
  };
  const IconComponent = ICON_MAP[module.iconCode] || Calculator;
  return (
    <div ref={setNodeRef} style={style}
      className="group flex items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-[shadow] relative select-none"
    >
      {/* Drag Handle — only this area activates drag */}
      <div {...attributes} {...listeners}
        className="px-2 text-slate-300 hover:text-indigo-500 cursor-grab active:cursor-grabbing touch-none transition-colors"
      >
        <GripVertical className="w-5 h-5" />
      </div>
      <span className="w-8 text-center font-bold text-slate-300 text-sm ml-2 mr-3">{idx + 1}</span>
      <div className={`p-3 rounded-lg ${module.color} mr-4`}>
        <IconComponent className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-slate-800">{module.type}</h3>
        <div className="flex flex-wrap gap-1 mt-1.5" onPointerDown={e => e.stopPropagation()}>
          {['Mon','Tue','Wed','Thu','Fri'].map(day => {
            const isActive = module.active_days ? module.active_days.includes(day) : childSchoolDays.includes(day);
            return (
              <button
                key={day}
                onClick={() => onToggleDay && onToggleDay(module.id, day)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
                  isActive 
                    ? 'bg-slate-800 text-white border-slate-800 hover:bg-slate-700' 
                    : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-500'
                }`}
              >
                {day}
              </button>
            );
          })}
          {/* Weekend days — always off by default, opt-in only */}
          <span className="mx-1 text-slate-200 select-none">|</span>
          {['Sat','Sun'].map(day => {
            const isActive = module.active_days?.includes(day);
            return (
              <button
                key={day}
                onClick={() => onToggleDay && onToggleDay(module.id, day)}
                title={`Toggle ${day} (weekend)`}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
                  isActive 
                    ? 'bg-amber-500 text-white border-amber-500 hover:bg-amber-400' 
                    : 'bg-white text-slate-300 border-slate-100 hover:border-amber-300 hover:text-amber-500'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <button
        onPointerDown={e => e.stopPropagation()} // prevent drag activating on X button
        onClick={() => onRemove(module.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

// Mock per-student daily progress — will be replaced by live `sessions` table queries
const overviewData = {
  Default: [
    { type: "Math",      status: "done",    minutesSpent: 18 },
    { type: "Spelling",  status: "active",  minutesSpent: 6  },
    { type: "Audiobook", status: "pending", minutesSpent: 0  },
    { type: "Reward",    status: "pending", minutesSpent: 0  },
  ],
};

function formatOverviewDate(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  if (offset === 0) return "Today — " + d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  if (offset === -1) return "Yesterday — " + d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function buildWeekDays() {
  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      isToday: i === 0,
    });
  }
  return days;
}
const weekDays = buildWeekDays();

export default function ParentClient({ profiles, initialPlans = [] }) {
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [activeChildId, setActiveChildId] = useState(profiles[0]?.id || null);
  const [rewardTime, setRewardTime] = useState(15);
  const [familySlug, setFamilySlug] = useState("");

  // Fetch (or auto-create) the family slug once on mount
  useEffect(() => {
    fetch("/api/family-slug")
      .then(r => r.json())
      .then(d => { if (d.familySlug) setFamilySlug(d.familySlug); })
      .catch(() => {});
  }, []);

  const voiceOptions = [
    { id: "2fe8mwpfJcqvj9RGBsC1", name: "Mr. Smith" },
    { id: "vDDsFF2fWRAHODFKKuEX", name: "Mr. Davis" },
    { id: "fnYMz3F5gMEDGMWcH1ex", name: "Mr. Harrison" },
    { id: "DODLEQrClDo8wCz460ld", name: "Ms. Sarah" },
    { id: "w2CTE3MYza6FgBnETYNT", name: "Ms. Emily" }
  ];

  const [selectedVoice, setSelectedVoice] = useState(voiceOptions[0].id);
  const [editVoice, setEditVoice] = useState(voiceOptions[0].id);
  const [playingVoice, setPlayingVoice] = useState(null);
  const [overviewView, setOverviewView] = useState("day");
  const [overviewOffset, setOverviewOffset] = useState(0);
  const [editingChild, setEditingChild] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [saveTemplateModal, setSaveTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [editAvatarUrl, setEditAvatarUrl] = useState(null); // preview while in edit modal
  const [avatarVersions, setAvatarVersions] = useState({}); // { [profileId]: timestamp } for cache busting
  const avatarInputRef = useRef(null);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const handleAvatarFileChange = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editingChild) return;

    // Instant local preview
    const preview = URL.createObjectURL(file);
    setEditAvatarUrl(preview);
    setAvatarUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("profileId", editingChild.id);

      const res = await fetch("/api/upload-avatar", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      // Update the live editingChild reference so the edit modal avatar refreshes
      setEditingChild(prev => ({ ...prev, avatar_url: data.url }));
      setEditAvatarUrl(data.url);
      // Update version map so ALL roster avatars for this profile re-render immediately
      setAvatarVersions(v => ({ ...v, [editingChild.id]: Date.now() }));
      addToast("📸 Photo saved!");
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setAvatarUploading(false);
    }
  }, [editingChild, addToast]);

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

  // Build a lookup: profileId → today's saved modules
  const planByProfile = Object.fromEntries(
    initialPlans.map(p => [p.profile_id, p.modules])
  );

  const defaultPlan = [
    { id: "p1", type: "Math",     iconCode: "Calculator", color: "text-blue-600 bg-blue-100" },
    { id: "p2", type: "Spelling", iconCode: "Type",       color: "text-purple-600 bg-purple-100" },
    { id: "p3", type: "Audiobook",iconCode: "BookOpen",   color: "text-amber-600 bg-amber-100" },
  ];

  const getInitialPlan = (profileId) => planByProfile[profileId] || defaultPlan;

  const [todaysPlan, setTodaysPlan] = useState(() => getInitialPlan(profiles[0]?.id));

  // When parent switches to a different child, load that child's saved plan
  useEffect(() => {
    setTodaysPlan(getInitialPlan(activeChildId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChildId]);

  // Resolve best avatar URL for a child:
  // 1. Versioned proxy path after an upload this session (cache-busted)
  // 2. Original avatar_url; Avatar component proxies it through /api/avatar
  const resolveAvatar = (child) => {
    if (avatarVersions[child.id]) return `/api/avatar/${child.id}?v=${avatarVersions[child.id]}`;
    return child.avatar_url;
  };

  const activeChild = profiles.find(p => p.id === activeChildId) || profiles[0];

  // Grade-filtered library — only show modules valid for the active child's grade
  const childGrade = activeChild?.grade_level ?? 1;
  const libraryModules = getModulesForGrade(childGrade).map((m) => ({
    type: m.id,
    iconCode: m.iconCode,
    color: m.color,
    desc: m.description,
    estimatedMinutes: m.estimatedMinutes,
    minimumPassScore: m.minimumPassScore,
  }));

  const handleAddModule = async (mod) => {
    const updated = [...todaysPlan, { 
      ...mod, 
      id: `p${Date.now()}`,
      active_days: mod.active_days || activeChild?.school_days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    }];
    setTodaysPlan(updated);
    if (activeChild) {
      const todayStr = new Date().toISOString().split('T')[0];
      try {
        await publishPlan({ profileId: activeChild.id, modules: updated, targetDate: todayStr });
        addToast("💾 Plan updated!", "save");
      } catch {
        addToast("Couldn't save — try again", "error");
      }
    }
  };

  const handleRemoveModule = async (id) => {
    const updated = todaysPlan.filter(p => p.id !== id);
    setTodaysPlan(updated);
    // Autosave removal immediately
    if (activeChild) {
      const todayStr = new Date().toISOString().split('T')[0];
      try {
        await publishPlan({ profileId: activeChild.id, modules: updated, targetDate: todayStr });
        addToast("💾 Plan updated!", "save");
      } catch {
        addToast("Couldn't save — try again", "error");
      }
    }
  };

  const handleToggleDay = async (moduleId, day) => {
    const updated = todaysPlan.map(mod => {
      if (mod.id !== moduleId) return mod;
      const currentDays = mod.active_days || activeChild.school_days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      const newDays = currentDays.includes(day)
        ? currentDays.filter(d => d !== day)
        : [...currentDays, day];
      return { ...mod, active_days: newDays };
    });
    setTodaysPlan(updated);
    
    if (activeChild) {
      const todayStr = new Date().toISOString().split('T')[0];
      try {
        await publishPlan({ profileId: activeChild.id, modules: updated, targetDate: todayStr });
      } catch {
        // Silent failure for inline toggles to prevent toast spam
      }
    }
  };

  // DnD-kit: support both mouse (PointerSensor) and touch/iPad (TouchSensor)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 200, tolerance: 8 } })
  );

  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;

    // Compute the new order synchronously
    const oldIdx = todaysPlan.findIndex(m => m.id === active.id);
    const newIdx = todaysPlan.findIndex(m => m.id === over.id);
    const reordered = arrayMove(todaysPlan, oldIdx, newIdx);

    setTodaysPlan(reordered);

    // Autosave: flush new order to Supabase immediately
    if (activeChild) {
      const todayStr = new Date().toISOString().split('T')[0];
      try {
        await publishPlan({ profileId: activeChild.id, modules: reordered, targetDate: todayStr });
        addToast("💾 Order saved!", "save");
      } catch {
        addToast("Couldn't save order — try again", "error");
      }
    }
  };

  const handlePublishPlan = async () => {
    if (!activeChild) return;
    setPublishing(true);
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      await publishPlan({ profileId: activeChild.id, modules: todaysPlan, targetDate: todayStr });
      addToast(`✅ Plan published for ${activeChild.name}!`);
    } catch(e) { addToast("Failed to publish: " + e.message, "error"); }
    finally { setPublishing(false); }
  };

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) return;
    await savePlanAsTemplate({ name: templateName, modules: todaysPlan });
    setSaveTemplateModal(false);
    setTemplateName("");
    addToast(`📁 Template "${templateName}" saved!`);
  };

  const handleDeleteChild = async (childId) => {
    await deleteChild(childId);
    setConfirmDelete(null);
    setActiveChildId(profiles.find(p => p.id !== childId)?.id || null);
  };

  const handleSubmitEditChild = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const days = [];
    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => { if (fd.get(`eday_${d}`)) days.push(d); });
    await updateChild({
      id: editingChild.id,
      name: fd.get("ename"),
      grade: fd.get("egrade"),
      pin: fd.get("epin"),
      voiceId: fd.get("evoiceId"),
      startDate: fd.get("estartDate"),
      schoolDays: days,
      lockMode: fd.get("elockMode") === "on",
      parentExitPin: fd.get("eparentExitPin") || null,
    });
    setEditingChild(null);
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

  // ── Onboarding: no children yet ────────────────────────────────────────────
  if (profiles.length === 0 && !isAddingChild) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col items-center justify-center px-6 font-[family-name:var(--font-geist-sans)]">
        <div className="text-center max-w-lg">
          <div className="bg-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/30">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 mb-4">Welcome to Jennings Academy!</h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            Let's get started by adding your first student. You'll set up their profile, pick a guide voice, and we'll build their learning path together.
          </p>
          <button onClick={() => setIsAddingChild(true)} className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-indigo-500/30 transition-[colors,transform,shadow] hover:-translate-y-1 text-lg">
            <PlusCircle className="w-6 h-6" /> Add Your First Student
          </button>
          <p className="text-slate-400 text-sm mt-6">It only takes 60 seconds ✨</p>
        </div>

        {/* Floating Add Child Modal still available from this screen */}
        {isAddingChild && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 px-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setIsAddingChild(false)} className="absolute top-6 right-6 text-slate-400"><X className="w-6 h-6" /></button>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Add Your First Student</h2>
              <form onSubmit={handleSubmitNewChild} className="space-y-4">
                <input name="name" required type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Child's First Name" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="grade" required type="number" min="1" max="12" defaultValue="1" className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Grade" />
                  <input name="pin" required type="text" maxLength="4" pattern="[0-9]{4}" title="4 digits" className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="4-Digit PIN" />
                </div>
                <input type="hidden" name="voiceId" value={voiceOptions[0].id} />
                <input name="startDate" required type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-[colors,transform,shadow] shadow-md">Create Profile →</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 font-[family-name:var(--font-geist-sans)] pb-24">
      
      {/* Edit Child Modal */}
      {editingChild && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative max-h-[90vh] flex flex-col">
            <button onClick={() => { setEditingChild(null); setEditAvatarUrl(null); }} className="absolute top-6 right-6 text-slate-400 z-10"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-bold text-slate-800 px-8 pt-8 pb-2 shrink-0">Edit {editingChild.name}</h2>
            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-8 pb-4">

            {/* ── Avatar Picker ── */}
            <div className="flex flex-col items-center mb-6">
              <div
                className="relative cursor-pointer group"
                onClick={() => avatarInputRef.current?.click()}
              >
                <Avatar
                  name={editingChild.name}
                  avatarUrl={editAvatarUrl ?? editingChild.avatar_url}
                  profileId={editingChild.id}
                  className="w-24 h-24 rounded-full text-3xl"
                  textClass="text-3xl font-bold"
                />
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {avatarUploading
                    ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <Camera className="w-7 h-7 text-white" />
                  }
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">Tap to change photo</p>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarFileChange}
              />
            </div>

            <form id="editChildForm" onSubmit={handleSubmitEditChild} className="space-y-4">
              <div><label className="block text-sm font-semibold text-slate-600 mb-1">First Name</label>
                <input name="ename" required type="text" defaultValue={editingChild.name} className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-slate-600 mb-1">Grade</label>
                  <input name="egrade" required type="number" min="1" max="12" defaultValue={editingChild.grade_level} className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                <div><label className="block text-sm font-semibold text-slate-600 mb-1">PIN</label>
                  <input name="epin" required type="text" maxLength="4" pattern="[0-9]{4}" title="4 digits" defaultValue={editingChild.pin_code} className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
              </div>
                <input type="hidden" name="evoiceId" value={editVoice} />
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Guide Voice</label>
                  <div className="grid grid-cols-2 gap-2">
                    {voiceOptions.map(v => (
                      <div
                        key={v.id}
                        onClick={() => setEditVoice(v.id)}
                        className={`flex items-center justify-between p-2 rounded-xl cursor-pointer border-2 transition-colors
                          ${editVoice === v.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white hover:border-slate-300'}`}
                      >
                        <p className="text-xs font-bold text-slate-800">{v.name}</p>
                        <button
                          type="button"
                          onClick={(e) => handlePlaySample(v.id, e)}
                          className={`p-1.5 rounded-full ${playingVoice === v.id ? 'bg-indigo-500 text-white animate-pulse' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          {playingVoice === v.id ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              <div><label className="block text-sm font-semibold text-slate-600 mb-1">Start Date</label>
                <input name="estartDate" required type="date" defaultValue={editingChild.start_date || new Date().toISOString().split('T')[0]} className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
              <div><label className="block text-sm font-semibold text-slate-600 mb-2">School Days</label>
                <div className="flex flex-wrap gap-2">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => (
                    <label key={day} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-100">
                      <input type="checkbox" name={`eday_${day}`} defaultChecked={(editingChild.school_days || ['Mon','Tue','Wed','Thu','Fri']).includes(day)} className="accent-indigo-600 w-4 h-4" />
                      <span className="text-sm font-medium text-slate-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-2">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-sm font-bold text-slate-800 flex items-center gap-2">🔒 Focus Mode (Kiosk Lock)</label>
                    <p className="text-xs text-slate-400 mt-0.5">Forces fullscreen & blocks alt-tab when child logs in</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="elockMode" defaultChecked={!!editingChild.lock_mode} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-[colors,transform,shadow]"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Parent Exit PIN (4 digits)</label>
                  <input name="eparentExitPin" type="text" maxLength="4" pattern="[0-9]{4}" title="4 digits" defaultValue={editingChild.parent_exit_pin || ""} placeholder="e.g. 9999 — only you know this" className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  <p className="text-xs text-slate-400 mt-1">This is different from the child's PIN — only the parent uses it to exit Focus Mode.</p>
                </div>
              </div>
            </form>
            </div>{/* end scrollable */}
            {/* Sticky save button always visible */}
            <div className="px-8 py-4 bg-white border-t border-slate-100 rounded-b-3xl shrink-0">
              <button form="editChildForm" type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-[colors,transform,shadow] shadow-md shadow-indigo-500/20">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Delete this student?</h2>
            <p className="text-slate-400 text-sm mb-6">This will permanently remove their profile and all session history. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={() => handleDeleteChild(confirmDelete)} className="flex-1 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-md">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Save Template Modal */}
      {saveTemplateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Save as Template</h2>
            <input value={templateName} onChange={e => setTemplateName(e.target.value)} type="text" placeholder="e.g. Standard Week, Heavy Math Day..." className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4" />
            <div className="flex gap-3">
              <button onClick={() => setSaveTemplateModal(false)} className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={handleSaveTemplate} className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast Notifications ─────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border text-sm font-semibold
              pointer-events-auto animate-[slideIn_0.3s_ease]
              ${
                toast.type === "error" ? "bg-rose-50 border-rose-200 text-rose-700 shadow-rose-200/50"
                : toast.type === "save"  ? "bg-emerald-500 border-emerald-600 text-white shadow-emerald-500/40"
                : "bg-white border-slate-100 text-slate-700 shadow-slate-200/60"
              }`}
          >
            <span className="text-lg leading-none">
              {toast.type === "error" ? "⚠️" : toast.type === "save" ? "✓" : "✓"}
            </span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {isAddingChild && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 px-4">
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
                         className={`flex items-center justify-between p-2 rounded-xl cursor-pointer border-2 transition-[colors,transform,shadow] ${selectedVoice === v.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white hover:border-slate-300'}`}
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

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-[colors,transform,shadow] shadow-md mt-6">
                Create Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Premium Header */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white border-b border-slate-100 sticky top-0 z-50">
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
          <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-100">
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
                    <li key={child.id} onClick={() => setActiveChildId(child.id)} className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-[colors,transform,shadow] duration-300 ${isActive ? "bg-indigo-50 border border-indigo-100 ring-1 ring-indigo-200 shadow-sm" : "hover:bg-slate-50 border border-transparent"}`}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={child.name}
                          avatarUrl={resolveAvatar(child)}
                          profileId={child.id}
                          className="w-11 h-11 rounded-full"
                          textClass="text-base font-bold"
                        />
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{child.name}</p>
                          <p className="text-xs text-slate-500 font-medium">Grade {child.grade_level}</p>
                          {child.current_streak > 0 && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-500"><Flame className="w-3 h-3" />{child.current_streak}d</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button title="Copy Link" className="p-1.5 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors" onClick={(e) => {
                          e.stopPropagation();
                          const slug = child.child_slug;
                          const url = familySlug && slug
                            ? `https://app-jenningsacademy.vercel.app/path/${familySlug}/${slug}`
                            : `https://app-jenningsacademy.vercel.app/path?profile=${child.id}`;
                          navigator.clipboard.writeText(url);
                          addToast(`🔗 Link copied for ${child.name}!`);
                        }}>
                          <Link className="w-3.5 h-3.5" />
                        </button>
                        <button title="Edit" className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors" onClick={(e) => { e.stopPropagation(); setEditingChild(child); setEditVoice(child.voice_id || voiceOptions[0].id); }}>
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button title="Delete" className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors" onClick={(e) => { e.stopPropagation(); setConfirmDelete(child.id); }}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}

            <button onClick={() => setIsAddingChild(true)} className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-medium hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-[colors,transform,shadow]">
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

               <button className="w-full text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors py-2.5 rounded-xl border border-white/10 flex items-center justify-center gap-2">
                 Detailed Report <ChevronRight className="w-4 h-4" />
               </button>
            </div>
          )}
        </aside>

        {/* === COLUMN 2: Flight Plan Editor === */}
        <section className="lg:col-span-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-200/60 border border-slate-100 min-h-[700px]">
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
                   <div className="flex gap-2 flex-wrap justify-end">
                     <button onClick={() => setSaveTemplateModal(true)} className="px-4 py-2.5 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 text-sm">
                       <Save className="w-4 h-4" /> Save Template
                     </button>
                     <button onClick={() => window.open(`/api/report?profileId=${activeChild.id}`, '_blank')} className="px-4 py-2.5 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 text-sm">
                       <FileDown className="w-4 h-4" /> Report
                     </button>
                     <button onClick={handlePublishPlan} disabled={publishing} className="px-5 py-2.5 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-[colors,transform,shadow] hover:-translate-y-0.5 whitespace-nowrap disabled:opacity-70 text-sm">
                       {publishing ? "Publishing..." : "Publish Plan"}
                     </button>
                   </div>
                 </div>
                  {/* Active Path Editor — Sortable */}
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={todaysPlan.map(m => m.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-4">
                        {todaysPlan.length === 0 && (
                          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-slate-400">
                            Add modules from the Library →
                          </div>
                        )}
                        {todaysPlan.map((module, idx) => (
                          <SortableModule
                            key={module.id}
                            module={module}
                            idx={idx}
                            onRemove={handleRemoveModule}
                            childSchoolDays={activeChild.school_days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
                            onToggleDay={handleToggleDay}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
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
          <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Module Library
            </h2>
            <div className="space-y-3">
              {libraryModules.map((mod, idx) => {
                const LibIcon = ICON_MAP[mod.iconCode] || Calculator;
                return (
                <div key={idx} onClick={() => handleAddModule(mod)} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 cursor-pointer transition-[colors,transform,shadow] group">
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

          <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/60 border border-slate-100">
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

        {/* Progress Overview moved to Hub — link there */}
        <section className="lg:col-span-12">
          <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-[2rem] border border-indigo-100 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Want to see progress?</h2>
              <p className="text-sm text-slate-500 mt-0.5">Today's results and streaks live in the Academy Hub.</p>
            </div>
            <a href="/" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-3 rounded-xl shadow-md shadow-indigo-500/20 transition-[colors,transform,shadow] hover:-translate-y-0.5 shrink-0">
              <TrendingUp className="w-4 h-4" /> View Progress →
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
