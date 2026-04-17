import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

/**
 * /path/[familySlug]/[childSlug]
 * Resolves a friendly URL → the UUID-based path page.
 * e.g. /path/jennings/emma → /path?profile=7e3b4314-...
 */
export default async function FriendlyPathPage({ params }) {
  const { familySlug, childSlug } = await params;

  // 1. Look up the parent by family slug
  const { data: settings } = await supabase
    .from("parent_settings")
    .select("user_id")
    .eq("family_slug", familySlug)
    .single();

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50 text-slate-400 text-center px-6">
        <div>
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-2xl font-black text-slate-700 mb-2">Family not found</h1>
          <p className="text-slate-400">The link <strong>/{familySlug}/{childSlug}</strong> doesn't match any account.<br />Ask a parent to share the correct link.</p>
        </div>
      </div>
    );
  }

  // 2. Look up the child by slug within that parent's profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("parent_id", settings.user_id)
    .eq("child_slug", childSlug)
    .single();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50 text-slate-400 text-center px-6">
        <div>
          <p className="text-5xl mb-4">👤</p>
          <h1 className="text-2xl font-black text-slate-700 mb-2">Student not found</h1>
          <p className="text-slate-400">No student named <strong>{childSlug}</strong> in the <strong>{familySlug}</strong> account.<br />Ask a parent to share the correct link.</p>
        </div>
      </div>
    );
  }

  // 3. Redirect to the canonical UUID path page (PinGate handles auth)
  redirect(`/path?profile=${profile.id}`);
}
