import { NextResponse } from 'next/server';

// POST /api/notify  { parentEmail, childName, message }
export async function POST(request) {
  const { parentEmail, childName, message } = await request.json();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — email not sent");
    return NextResponse.json({ skipped: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Jennings Academy <alerts@jenningsacademy.com>",
      to: parentEmail,
      subject: `📚 Update about ${childName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 16px;">
          <h2 style="color: #4f46e5; margin: 0 0 12px;">Jennings Academy</h2>
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">${message}</p>
          <a href="https://app-jenningsacademy.vercel.app/parent" 
             style="display: inline-block; margin-top: 20px; background: #4f46e5; color: white; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 700;">
            View Dashboard →
          </a>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">Jennings Academy · Unsubscribe anytime</p>
        </div>
      `
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ sent: true });
}
