import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

// GET /api/report?profileId=xyz
export async function GET(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get('profileId');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', profileId).single();
  const { data: sessions } = await supabase.from('sessions').select('*').eq('profile_id', profileId).order('created_at', { ascending: false }).limit(42);
  const { data: badges } = await supabase.from('badges').select('*').eq('profile_id', profileId);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Weekly Report — ${profile?.name || 'Student'}</title>
<style>
  body { font-family: 'Segoe UI', sans-serif; max-width: 780px; margin: 40px auto; padding: 0 24px; color: #1e293b; }
  .header { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 32px; border-radius: 16px; margin-bottom: 32px; }
  .header h1 { margin: 0 0 4px; font-size: 28px; }
  .header p { margin: 0; opacity: 0.8; font-size: 14px; }
  .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
  .card h2 { margin: 0 0 12px; font-size: 16px; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; font-size: 12px; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; padding: 8px 12px; font-size: 12px; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
  td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
  .badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 600; margin: 2px; }
  .stat { font-size: 32px; font-weight: 800; color: #4f46e5; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  @media print { body { margin: 0; } }
</style>
</head>
<body>
<div class="header">
  <h1>📚 Jennings Academy — Weekly Report</h1>
  <p>${profile?.name || 'Student'} · Grade ${profile?.grade_level} · Generated ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
</div>

<div class="grid" style="margin-bottom:24px">
  <div class="card" style="text-align:center">
    <div class="stat">${profile?.current_streak || 0}</div>
    <p style="margin:0;color:#64748b;font-size:13px">Day Streak 🔥</p>
  </div>
  <div class="card" style="text-align:center">
    <div class="stat">${sessions?.length || 0}</div>
    <p style="margin:0;color:#64748b;font-size:13px">Sessions Completed</p>
  </div>
  <div class="card" style="text-align:center">
    <div class="stat">${sessions?.reduce((a, s) => a + (s.active_seconds || 0), 0) > 0 ? Math.round(sessions.reduce((a, s) => a + (s.active_seconds || 0), 0) / 60) : 0}</div>
    <p style="margin:0;color:#64748b;font-size:13px">Active Minutes</p>
  </div>
</div>

<div class="card">
  <h2>🏅 Badges Earned</h2>
  ${badges?.length > 0 ? badges.map(b => `<span class="badge">${b.badge_key}</span>`).join('') : '<p style="color:#94a3b8;font-size:14px">No badges yet — keep going!</p>'}
</div>

<div class="card">
  <h2>📝 Session History</h2>
  <table>
    <thead><tr><th>Date</th><th>Module</th><th>Active Time</th><th>Status</th></tr></thead>
    <tbody>
      ${sessions?.slice(0, 14).map(s => `
        <tr>
          <td>${new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
          <td>${s.module_type || '—'}</td>
          <td>${s.active_seconds ? Math.round(s.active_seconds / 60) + ' min' : '—'}</td>
          <td style="color: ${s.completed ? '#059669' : '#dc2626'}; font-weight:600">${s.completed ? '✓ Done' : '○ Incomplete'}</td>
        </tr>
      `).join('') || '<tr><td colspan="4" style="color:#94a3b8;text-align:center;padding:20px">No sessions recorded yet</td></tr>'}
    </tbody>
  </table>
</div>

<p style="color:#94a3b8;font-size:12px;text-align:center;margin-top:32px">
  Jennings Academy · Generated automatically · <a href="https://app-jenningsacademy.vercel.app/parent">View Live Dashboard</a>
</p>
<script>window.print();</script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}
