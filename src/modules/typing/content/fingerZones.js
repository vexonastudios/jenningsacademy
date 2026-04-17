/**
 * fingerZones.js
 * Maps every key on the keyboard to its assigned finger and color zone.
 * Used by KeyboardVisualizer for color coding and by the instruction cards.
 */

// Key → finger zone ID
export const FINGER_MAP = {
  // ── Left Pinky ────────────────────────────
  q: 'l-pinky', a: 'l-pinky', z: 'l-pinky',
  // ── Left Ring ─────────────────────────────
  w: 'l-ring',  s: 'l-ring',  x: 'l-ring',
  // ── Left Middle ───────────────────────────
  e: 'l-middle',d: 'l-middle',c: 'l-middle',
  // ── Left Index ────────────────────────────
  r: 'l-index', f: 'l-index', v: 'l-index',
  t: 'l-index', g: 'l-index', b: 'l-index',
  // ── Right Index ───────────────────────────
  y: 'r-index', h: 'r-index', n: 'r-index',
  u: 'r-index', j: 'r-index', m: 'r-index',
  // ── Right Middle ──────────────────────────
  i: 'r-middle',k: 'r-middle',',': 'r-middle',
  // ── Right Ring ────────────────────────────
  o: 'r-ring',  l: 'r-ring',  '.': 'r-ring',
  // ── Right Pinky ───────────────────────────
  p: 'r-pinky', ';': 'r-pinky', '/': 'r-pinky', "'": 'r-pinky',
  // ── Thumbs ────────────────────────────────
  ' ': 'thumb',
};

// Zone → visual style tokens
export const ZONE_STYLES = {
  'l-pinky':  { bg: 'bg-violet-500/25', border: 'border-violet-500/60', pulse: 'bg-violet-400',  hex: '#8B5CF6', label: 'Left Pinky'  },
  'l-ring':   { bg: 'bg-blue-500/25',   border: 'border-blue-500/60',   pulse: 'bg-blue-400',    hex: '#3B82F6', label: 'Left Ring'   },
  'l-middle': { bg: 'bg-cyan-500/25',   border: 'border-cyan-500/60',   pulse: 'bg-cyan-400',    hex: '#06B6D4', label: 'Left Middle' },
  'l-index':  { bg: 'bg-emerald-500/25',border: 'border-emerald-500/60',pulse: 'bg-emerald-400', hex: '#10B981', label: 'Left Index'  },
  'r-index':  { bg: 'bg-amber-500/25',  border: 'border-amber-500/60',  pulse: 'bg-amber-400',   hex: '#F59E0B', label: 'Right Index' },
  'r-middle': { bg: 'bg-orange-500/25', border: 'border-orange-500/60', pulse: 'bg-orange-400',  hex: '#F97316', label: 'Right Middle'},
  'r-ring':   { bg: 'bg-rose-500/25',   border: 'border-rose-500/60',   pulse: 'bg-rose-400',    hex: '#EF4444', label: 'Right Ring'  },
  'r-pinky':  { bg: 'bg-pink-500/25',   border: 'border-pink-500/60',   pulse: 'bg-pink-400',    hex: '#EC4899', label: 'Right Pinky' },
  'thumb':    { bg: 'bg-slate-600/40',  border: 'border-slate-500/60',  pulse: 'bg-slate-400',   hex: '#6B7280', label: 'Thumbs'      },
};

// Convenience: get zone for a key char (case-insensitive)
export function getZone(key) {
  return FINGER_MAP[key?.toLowerCase()] ?? null;
}

// Convenience: get the full style object for a key
export function getKeyStyle(key) {
  const zone = getZone(key);
  return zone ? ZONE_STYLES[zone] : null;
}
