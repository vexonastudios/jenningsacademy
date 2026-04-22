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

  FeedAnimals: {
    id: "FeedAnimals",
    label: "Feed the Animals",
    description: "Visual counting and addition game for early learners",
    color: "text-pink-600 bg-pink-100",
    iconCode: "Star",
    supportedGrades: [1, 2],
    estimatedMinutes: 10,
    minimumPassScore: null,  // Game manages its own loop
    timeLimitSeconds: null,
    component: () => import("@/modules/feedAnimals/FeedAnimalsModule"),
  },

  Shapes: {
    id: "Shapes",
    label: "Shapes Adventure",
    description: "Interactive discovery of core shapes and their attributes",
    color: "text-emerald-600 bg-emerald-100",
    iconCode: "Shapes", // Using lucide-react Shapes icon
    supportedGrades: [1, 2],
    estimatedMinutes: 10,
    minimumPassScore: null,
    timeLimitSeconds: null,
    component: () => import("@/modules/shapes/ShapesModule"),
  },

  Grammar: {
    id: "Grammar",
    label: "GrammarFlow",
    description: "Structured grammar, sentence building, and targeted editing practice",
    color: "text-orange-600 bg-orange-100",
    iconCode: "PenTool", // Using lucide-react PenTool icon
    supportedGrades: [1, 2, 3, 4, 5, 6, 7, 8],
    estimatedMinutes: 15,
    minimumPassScore: null,
    timeLimitSeconds: null,
    component: () => import("@/modules/grammar/GrammarModule"),
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
    supportedGrades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    estimatedMinutes: 15,
    minimumPassScore: null,
    timeLimitSeconds: null,
    component: () => import("@/modules/logic/LogicModule"),
  },

  Geography: {
    id: "Geography",
    label: "Geography Mastery",
    description: "30-day mastery of U.S. states, capitals, and continents",
    color: "text-emerald-600 bg-emerald-100",
    iconCode: "Map",
    supportedGrades: [1, 2, 3, 4, 5, 6, 7, 8],
    estimatedMinutes: 15,
    minimumPassScore: null,
    timeLimitSeconds: null,
    component: () => import("@/modules/geography/GeographyModule"),
  },

  MathFlow: {
    id: "MathFlow",
    label: "Math Curriculum",
    description: "Abeka-style core math curriculum with targeted error practice",
    color: "text-sky-600 bg-sky-100",
    iconCode: "Calculator",
    supportedGrades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    estimatedMinutes: 20,
    minimumPassScore: null,
    timeLimitSeconds: null,
    component: () => import("@/modules/math/MathModule"),
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

  Bible: {
    id: "Bible",
    label: "Bible Memory",
    description: "Interactive course to memorize the sequence of the 66 books",
    color: "text-amber-700 bg-amber-100",
    iconCode: "ScrollText",
    supportedGrades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    estimatedMinutes: 10,
    minimumPassScore: null,
    timeLimitSeconds: null,
    component: () => import("@/modules/bible/BibleModule"),
  },

  Science: {
    id: "Science",
    label: "Science Lab",
    description: "Interactive science experiments and lab simulations",
    color: "text-teal-600 bg-teal-100",
    iconCode: "FlaskConical",
    supportedGrades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    estimatedMinutes: 15,
    minimumPassScore: null, // Custom lab-based completion
    timeLimitSeconds: null,
    component: () => import("@/modules/science/ScienceModule"),
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

/**
 * REWARD_GAMES — All available arcade/reward games parents can assign.
 * Each entry has an `id` (passed as `rewardGame` prop to RewardModule),
 * a display label, description, emoji, and the iframe src path.
 *
 * To add a new reward game:
 *   1. Drop its files in public/games/[game-id]/
 *   2. Add an entry here
 *   3. Done — it automatically appears in the parent plan editor picker.
 */
export const REWARD_GAMES = [
  {
    id: "word-runner",
    label: "Word Runner",
    description: "Run, jump, and stomp enemies while answering word gates!",
    emoji: "🏃",
    iframeSrc: "/games/word-runner/runner.html",
    scoreMessageType: "WORD_RUNNER_SCORE",
  },
  {
    id: "skytyper",
    label: "Sky Typer Squadron",
    description: "Type fast to shoot down enemy planes in this arcade classic!",
    emoji: "✈️",
    iframeSrc: "/games/skytyper/sky-typer.html",
    scoreMessageType: "SKY_TYPER_SCORE",
  },
];

export function getRewardGameById(id) {
  return REWARD_GAMES.find(g => g.id === id) ?? REWARD_GAMES[0];
}

/**
 * AUDIOBOOKS — Available audiobooks for the Audiobook module.
 */
export const AUDIOBOOKS = [
  {
    id: "this-country-of-ours",
    title: "This Country of Ours",
    author: "H. E. Marshall"
  }
];

export function getAudiobookById(id) {
  return AUDIOBOOKS.find(b => b.id === id) ?? AUDIOBOOKS[0];
}

