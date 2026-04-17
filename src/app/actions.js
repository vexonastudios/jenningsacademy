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

  const { error } = await supabase.from('profiles').insert([
    {
       parent_id: userId,
       name,
       grade_level: grade,
       pin_code: pin,
       avatar_url: avatarColor, 
    }
  ]);

  if (error) {
     console.error("Supabase insert error:", error);
     throw new Error(error.message);
  }

  // Tell Next.js to refresh the parent page to show the new child
  revalidatePath('/parent');
}
