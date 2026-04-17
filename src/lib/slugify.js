/**
 * Convert any string to a clean URL slug.
 * "James Jennings" → "jamesjennings"
 * "Emma-Rose" → "emmarose"
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")                  // decompose accented chars
    .replace(/[\u0300-\u036f]/g, "")  // strip accent marks
    .replace(/[^a-z0-9]/g, "")        // keep only letters/numbers
    .slice(0, 32);                     // max 32 chars
}

/**
 * Derive a family slug from a Clerk email address.
 * "james.jennings@gmail.com" → "jennings"
 * Falls back to the local part before @ if split fails.
 */
export function familySlugFromEmail(email) {
  const local = email.split("@")[0];          // "james.jennings"
  const parts = local.split(/[._-]/);          // ["james","jennings"]
  const base  = parts.length > 1 ? parts[parts.length - 1] : local;
  return slugify(base) || slugify(local) || "family";
}
