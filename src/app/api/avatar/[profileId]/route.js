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

  // Determine the real upstream URL to fetch:
  // - If DB has a full https:// Supabase URL → use it directly
  // - If DB has an old /api/avatar/... proxy path (prev deploy bug) or a CSS class → 404
  let upstreamUrl = avatarUrl;
  if (!upstreamUrl || upstreamUrl.startsWith("/api/") || !upstreamUrl.startsWith("http")) {
    // Last-resort: try to construct the URL from the Supabase env var + profile ID
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!base) return new NextResponse(null, { status: 404 });
    // Try both jpg and webp
    upstreamUrl = `${base}/storage/v1/object/public/child-avatars/${profileId}.webp`;
  }

  try {
    // Always fetch fresh — uploading a new photo replaces the same Supabase path,
    // so we must never serve a stale cached copy.
    const upstream = await fetch(upstreamUrl, { cache: "no-store" });
    if (!upstream.ok) return new NextResponse(null, { status: 404 });

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const buffer      = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Public CDN cache: Vercel edge caches this globally after first request.
        // The ?v=timestamp on each upload bypasses this for fresh uploads.
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
