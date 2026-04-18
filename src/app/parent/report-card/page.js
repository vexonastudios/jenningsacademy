import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ReportCardClient from "./ReportCardClient";

export const metadata = {
  title: "Report Cards — Jennings Academy",
  description: "View grades, averages, and progress for each student.",
};

export default async function ReportCardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // ── Fetch all profiles for this parent ───────────────────────────────────
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("parent_id", userId)
    .order("created_at", { ascending: true });

  const profileIds = (profiles || []).map((p) => p.id);

  // ── Fetch all sessions (last 90 days) ────────────────────────────────────
  let sessions = [];
  if (profileIds.length > 0) {
    const since = new Date();
    since.setDate(since.getDate() - 90);
    const { data } = await supabase
      .from("sessions")
      .select("id, profile_id, module_type, score, time_spent_seconds, created_at, metadata")
      .in("profile_id", profileIds)
      .eq("completed", true)
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false });
    sessions = data || [];
  }

  return (
    <ReportCardClient profiles={profiles || []} sessions={sessions} />
  );
}
