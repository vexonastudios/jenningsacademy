/**
 * MODULE REGISTRY — Single source of truth for all Jennings Academy learning modules.
 *
 * To add a new module:
 *  1. Build its folder under src/modules/[name]/
 *  2. Add an entry to MODULE_REGISTRY below
 *  3. Done — it will automatically appear in Manage Plans for valid grades.
 */

// Lucide icon names (resolved at render time via ICON_MAP in consumers)
export const MODULE_REGISTRY = {
  Math: {
    id: "Math",
    label: "Math",
    description: "Grade-appropriate arithmetic and problem solving",
    color: "text-blue-600 bg-blue-100",
    iconCode: "Calculator",
    supportedGrades: [1, 2, 3, 4, 5, 6, 7, 8],
    estimatedMinutes: 15,
    minimumPassScore: 70,        // % correct needed to mark complete; else retry with new questions
    timeLimitSeconds: null,      // null = untimed
    component: () => import("@/modules/math/MathModule"),
  },

  Spelling: {
    id: "Spelling",
    label: "Spelling",
    description: "Weekly word lists and vocabulary practice",
    color: "text-purple-600 bg-purple-100",
    iconCode: "Type",
    supportedGrades: [1, 2, 3, 4, 5, 6, 7, 8],
    estimatedMinutes: 10,
    minimumPassScore: null,  // Spelling manages its own mastery — no ModuleShell retry
    timeLimitSeconds: null,
    component: () => import("@/modules/spelling/SpellingModule"),
  },

  Typing: {
    id: "Typing",
    label: "Typing",
    description: "Structured keyboard skills from home row to full mastery",
    color: "text-sky-600 bg-sky-100",
    iconCode: "Keyboard",
    supportedGrades: [1, 2, 3, 4, 5, 6, 7, 8],
    estimatedMinutes: 12,
    minimumPassScore: null,  // Typing manages its own mastery and lesson progression
    timeLimitSeconds: null,
    component: () => import("@/modules/typing/TypingModule"),
  },

  Audiobook: {
    id: "Audiobook",
    label: "Audiobook",
    description: "Narrated chapter books with comprehension checks",
    color: "text-amber-600 bg-amber-100",
    iconCode: "BookOpen",
    supportedGrades: [3, 4, 5, 6, 7, 8],  // Not available below 3rd grade
    estimatedMinutes: 20,
    minimumPassScore: 60,
    timeLimitSeconds: null,
    component: () => import("@/modules/audiobook/AudiobookModule"),
  },

  Logic: {
    id: "Logic",
    label: "Logic",
    description: "Critical thinking puzzles and reasoning challenges",
    color: "text-rose-600 bg-rose-100",
    iconCode: "Settings",
    supportedGrades: [2, 3, 4, 5, 6, 7, 8],
    estimatedMinutes: 15,
    minimumPassScore: 60,
    timeLimitSeconds: null,
    component: () => import("@/modules/logic/LogicModule"),
  },

  "Reward Unlock": {
    id: "Reward Unlock",
    label: "Reward Unlock",
    description: "Free playtime reward — unlocked after completing all prior modules",
    color: "text-emerald-600 bg-emerald-100",
    iconCode: "Gamepad2",
    supportedGrades: [1, 2, 3, 4, 5, 6, 7, 8],
    estimatedMinutes: 15,
    minimumPassScore: null,  // Rewards can't fail
    timeLimitSeconds: null,
    component: () => import("@/modules/reward/RewardModule"),
  },
};

/**
 * Returns all modules available for a given grade level.
 * Used by Manage Plans to filter the library picker.
 *
 * @param {number} grade  - The child's grade level (e.g. 4)
 * @returns {Object[]}    - Array of module registry entries
 */
export function getModulesForGrade(grade) {
  const g = Number(grade) || 1; // treat null / undefined / 0 as grade 1
  return Object.values(MODULE_REGISTRY).filter((m) =>
    m.supportedGrades.includes(g)
  );
}

/**
 * Looks up a single module's metadata by its type string.
 * Safe-returns null if the type doesn't exist in the registry.
 *
 * @param {string} type  - e.g. "Spelling"
 * @returns {Object|null}
 */
export function getModuleByType(type) {
  return MODULE_REGISTRY[type] ?? null;
}
