import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

// POST /api/upload-avatar
// Body: multipart/form-data  { file: File, profileId: string }
export async function POST(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file      = formData.get("file");
  const profileId = formData.get("profileId");

  if (!file || !profileId) {
    return NextResponse.json({ error: "Missing file or profileId" }, { status: 400 });
  }

  // Verify this profile belongs to the authenticated parent
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", profileId)
    .eq("parent_id", userId)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Read file bytes
  const buffer      = await file.arrayBuffer();
  const bytes       = new Uint8Array(buffer);
  const contentType = file.type || "image/jpeg";
  const ext         = contentType.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
  const storagePath = `${profileId}.${ext}`;

  // Upload to Supabase Storage (upsert = replace existing)
  const { error: uploadError } = await supabase.storage
    .from("child-avatars")
    .upload(storagePath, bytes, { contentType, upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Get the real Supabase public URL — stored in DB so the proxy can fetch it server-side
  const { data: { publicUrl } } = supabase.storage
    .from("child-avatars")
    .getPublicUrl(storagePath);

  // Persist the real Supabase URL to the DB (the proxy /api/avatar reads this)
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", profileId)
    .eq("parent_id", userId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Return the PROXY path to the client — browser never touches the Supabase domain.
  // The ?v= timestamp busts the browser cache on each re-upload.
  return NextResponse.json({ url: `/api/avatar/${profileId}?v=${Date.now()}` });
}
