"use client";

/**
 * <Avatar> — smart avatar that shows:
 *  - A photo (<img>) when avatarUrl starts with "http"
 *  - A coloured initial block for legacy CSS-class avatars
 *  - A default indigo block as fallback
 *
 * Props
 *  name      string   — child's name (used for initial + alt)
 *  avatarUrl string   — either an https:// URL or a Tailwind bg-* class
 *  className string   — sizing / shape classes (e.g. "w-12 h-12 rounded-full")
 *  textClass string   — text size class (default "text-lg")
 */
export default function Avatar({ name, avatarUrl, className = "", textClass = "text-base" }) {
  const isPhoto = avatarUrl?.startsWith("http");
  const letter  = name?.charAt(0).toUpperCase() || "?";

  if (isPhoto) {
    return (
      <img
        src={avatarUrl}
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
