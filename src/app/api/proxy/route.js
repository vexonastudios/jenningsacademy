import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  try {
    const res = await fetch(targetUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch from target: ${res.status}`);
    }
    const text = await res.text();
    
    return new NextResponse(text, {
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
