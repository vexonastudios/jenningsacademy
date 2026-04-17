import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ParentClient from "./ParentClient";

export default async function ParentDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch profiles belonging to this parent
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('parent_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Error fetching profiles:", error);
  }

  return <ParentClient profiles={profiles || []} />;
}
