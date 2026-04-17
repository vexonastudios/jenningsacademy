import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/avatar/[profileId]
 * Proxies the child's avatar image through Next.js so the browser
 * never needs to resolve the Supabase storage domain directly.
 */
export async function GET(request, { params }) {
  const { profileId } = await params;

  // Fetch the stored avatar path for this profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", profileId)
    .single();

  const avatarUrl = profile?.avatar_url;

  // If it's already a Supabase https URL, fetch and proxy it
  // If it's a Tailwind class (e.g. "bg-blue-500"), return 404 so client shows initial
  if (!avatarUrl || !avatarUrl.startsWith("http")) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const upstream = await fetch(avatarUrl, { next: { revalidate: 3600 } });
    if (!upstream.ok) return new NextResponse(null, { status: 404 });

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const buffer      = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
