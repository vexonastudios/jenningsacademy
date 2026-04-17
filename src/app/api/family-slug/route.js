import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { familySlugFromEmail, slugify } from "@/lib/slugify";

/**
 * GET /api/family-slug
 * Returns (or creates) the family slug for the current parent.
 */
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Check if a slug already exists
  const { data: existing } = await supabase
    .from("parent_settings")
    .select("family_slug")
    .eq("user_id", userId)
    .single();

  if (existing?.family_slug) {
    return NextResponse.json({ familySlug: existing.family_slug });
  }

  // Auto-derive from email
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || "";
  const username = user?.username || "";
  const base = username ? slugify(username) : familySlugFromEmail(email);

  // Ensure uniqueness — append random suffix if taken
  let candidate = base;
  let suffix = 2;
  while (true) {
    const { data: clash } = await supabase
      .from("parent_settings")
      .select("user_id")
      .eq("family_slug", candidate)
      .single();
    if (!clash) break;
    candidate = `${base}${suffix++}`;
  }

  await supabase.from("parent_settings").insert([{ user_id: userId, family_slug: candidate }]);
  return NextResponse.json({ familySlug: candidate });
}

/**
 * PATCH /api/family-slug  { familySlug: "newslug" }
 * Lets a parent update their family slug.
 */
export async function PATCH(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { familySlug: raw } = await request.json();
  const candidate = slugify(raw || "");
  if (candidate.length < 2) return NextResponse.json({ error: "Too short" }, { status: 400 });

  const { error } = await supabase
    .from("parent_settings")
    .upsert([{ user_id: userId, family_slug: candidate }], { onConflict: "user_id" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ familySlug: candidate });
}
