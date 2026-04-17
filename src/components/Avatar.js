"use client";

/**
 * Avatar - renders a proxied photo or coloured initial block.
 *
 * Props
 *  name      string  - child's name
 *  avatarUrl string  - Supabase https URL, /api/avatar proxy path, or Tailwind bg-* class
 *  profileId string  - when provided, any Supabase URL is forced through /api/avatar proxy
 *  className string  - sizing/shape classes
 *  textClass string  - text size class
 */
export default function Avatar({ name, avatarUrl, profileId, className = "", textClass = "text-base" }) {
  const letter = name?.charAt(0).toUpperCase() || "?";

  // Choose the image src:
  //  /api/avatar/... already proxied → use as-is
  //  https://...supabase.co + profileId → force through proxy (browser DNS blocked)
  //  any other http URL → use directly
  //  CSS class / null → show initial letter
  let src = null;
  if (avatarUrl?.startsWith("/api/avatar")) {
    src = avatarUrl;
  } else if (avatarUrl?.startsWith("http") && profileId) {
    src = `/api/avatar/${profileId}`;
  } else if (avatarUrl?.startsWith("http")) {
    src = avatarUrl;
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${className} object-cover ring-2 ring-white shadow-sm`}
      />
    );
  }

  return (
    <div
      className={`
        ${className}
        ${avatarUrl || "bg-indigo-500"}
        text-white flex items-center justify-center font-bold ${textClass}
        ring-2 ring-white shadow-sm
      `}
    >
      {letter}
    </div>
  );
}
