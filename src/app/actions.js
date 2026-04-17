"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addChild(formData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const name = formData.get("name");
  const grade = parseInt(formData.get("grade") || "1", 10);
  const pin = formData.get("pin");

  const colors = ["bg-blue-500", "bg-pink-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500"];
  const avatarColor = colors[Math.floor(Math.random() * colors.length)];
  const initials = name.charAt(0).toUpperCase();

  const { data: newProfile, error: profileError } = await supabase.from('profiles').insert([
    {
       parent_id: userId,
       name,
       grade_level: grade,
       pin_code: pin,
       avatar_url: avatarColor, 
    }
  ]).select().single();

  if (profileError) {
     console.error("Supabase insert error:", profileError);
     throw new Error(profileError.message);
  }

  // Generate a recommended starter plan for today
  const defaultModules = [
    { id: "mod1", type: "Math", iconType: "Calculator", color: "text-blue-600 bg-blue-100" },
    { id: "mod2", type: "Spelling", iconType: "Type", color: "text-purple-600 bg-purple-100" },
    { id: "mod3", type: "Reading", iconType: "BookOpen", color: "text-amber-600 bg-amber-100" }
  ];

  const todayStr = new Date().toISOString().split('T')[0];

  await supabase.from('daily_plans').insert([
    {
       profile_id: newProfile.id,
       target_date: todayStr,
       modules: defaultModules
    }
  ]);

  // Tell Next.js to refresh the parent page to show the new child
  revalidatePath('/parent');
}
