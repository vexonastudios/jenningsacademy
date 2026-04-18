/**
 * lessons.js — Typing Academy curriculum
 *
 * 12 structured lessons progressing from F/J anchors to full-alphabet synthesis.
 * Each lesson's drill prompts are strictly limited to keys already introduced
 * in that lesson or earlier, so students only practice what they've learned.
 *
 * Lesson flow each session:
 *   Posture → Instruction → Warmup Drill → Practice × 2 → Challenge (timed) → Review
 */

export const LESSONS = [
  // ── 1: Anchor Keys ────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Your Anchor Keys',
    subtitle: 'F and J',
    phaseLabel: 'Home Row',
    targetKeys: ['f', 'j'],
    targetFinger: 'Both Index Fingers',
    estimatedMinutes: 8,
    instruction: {
      title: 'Find Your Anchors',
      body: 'Feel the small bumps on the F and J keys? Those are your home base. Your LEFT index finger always rests on F. Your RIGHT index finger always rests on J. Every time you look away, return here first.',
      image: '/typing_home_row.png'
    },
    warmupPrompt: null,
    drills: [
      { label: 'Guided Drill',    prompt: 'f f f j j j f f j j f j f j f j f j' },
      { label: 'Building Pattern', prompt: 'ff jj ff jj fj jf fj jf fjf jfj ffj jjf' },
    ],
    challenge: {
      prompt: 'f j f j ff jj fj jf fjf jfj ffjj jjff fj jf fjfj jfjf fj jf ff jj fj',
    },
  },

  // ── 2: Left Home Row ──────────────────────────────────────────────────────
  {
    id: 2,
    title: 'Left Hand Home Row',
    subtitle: 'A S D F',
    phaseLabel: 'Home Row',
    targetKeys: ['a', 's', 'd', 'f'],
    targetFinger: 'Pinky · Ring · Middle · Index',
    estimatedMinutes: 10,
    instruction: {
      title: 'Your Left Hand\'s Home',
      body: 'Your left hand covers A, S, D, F. Pinky on A, ring on S, middle on D, index on F. Keep your right index on J as your anchor. Glide — don\'t lift your wrist.',
    },
    warmupPrompt: 'f j f j ff jj fj jf fjf jfj',
    drills: [
      { label: 'Guided Drill',    prompt: 'a a a s s s d d d f f f a s d f f d s a asdf' },
      { label: 'Building Pattern', prompt: 'asdf fdsa asfd fasd adsf' },
    ],
    challenge: {
      prompt: 'asdf fdsa fads sad dads add ads fad asdf fdsa fads sad dad add',
    },
  },

  // ── 3: Right Home Row ─────────────────────────────────────────────────────
  {
    id: 3,
    title: 'Right Hand Home Row',
    subtitle: 'J K L ;',
    phaseLabel: 'Home Row',
    targetKeys: ['j', 'k', 'l', ';'],
    targetFinger: 'Index · Middle · Ring · Pinky',
    estimatedMinutes: 10,
    instruction: {
      title: 'Your Right Hand\'s Home',
      body: 'Right hand: J under index, K under middle, L under ring, semicolon under pinky. Keep your left index on F as your anchor. Feel the J bump to find home.',
    },
    warmupPrompt: 'asdf fdsa sad fads dads add',
    drills: [
      { label: 'Guided Drill',    prompt: 'j j j k k k l l l ; ; ; j k l ; ; l k j jkl;' },
      { label: 'Building Pattern', prompt: 'jkl; ;lkj jkl; ;lkj jk lj l; k; jl' },
    ],
    challenge: {
      prompt: 'jkl; ;lkj jk lj l; k; jl kl jkl; ;lkj jk l; jkl jkl; kl jl',
    },
  },

  // ── 4: Full Home Row ──────────────────────────────────────────────────────
  {
    id: 4,
    title: 'Full Home Row',
    subtitle: 'Both Hands Together',
    phaseLabel: 'Home Row',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    targetFinger: 'All Eight Fingers',
    estimatedMinutes: 12,
    instruction: {
      title: 'All Eight Fingers!',
      body: 'Both hands on home row. Find F and J bumps first, then let the other fingers fall into place. Practice alternating: left key, right key. You can form real words with just these 8 keys!',
    },
    warmupPrompt: 'jkl; ;lkj jk lj l; k; jkl jkl;',
    drills: [
      { label: 'Alternating Hands', prompt: 'fj dk sl a; jf kd ls ;a fj dk sl a; jf kd' },
      { label: 'Real Words',        prompt: 'ask all fall lads flask dad sad fads lass' },
    ],
    challenge: {
      prompt: 'ask all fall lads flask dad sad fads lass ask fall lads all flag sad flask',
    },
  },

  // ── 5: Home Row Words ─────────────────────────────────────────────────────
  {
    id: 5,
    title: 'Home Row Words',
    subtitle: 'Real Typing Fluency',
    phaseLabel: 'Home Row',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    targetFinger: 'All Eight Fingers',
    estimatedMinutes: 12,
    instruction: {
      title: 'Words from Home Row',
      body: 'Using only home row keys, you can type a surprising number of real words. Focus on rhythm: type at a steady pace rather than bursting fast then stopping. Accuracy first, speed will come!',
    },
    warmupPrompt: 'asdf jkl; ask all fall lads flask',
    drills: [
      { label: 'Word Fluency', prompt: 'ask all fall lads flask dad lass dads falls asks' },
      { label: 'Short Phrases', prompt: 'a lad asks a lass all day dad falls' },
    ],
    challenge: {
      prompt: 'a lad asks all day flask falls dads lass dad asks all lads flask fall sad',
    },
  },

  // ── 6: E and I ────────────────────────────────────────────────────────────
  {
    id: 6,
    title: 'Reach Up: E and I',
    subtitle: 'Middle Fingers Reach Up',
    phaseLabel: 'Reach Keys',
    targetKeys: ['e', 'i'],
    targetFinger: 'Left Middle (E) · Right Middle (I)',
    estimatedMinutes: 12,
    instruction: {
      title: 'Your Middle Fingers Reach Up',
      body: 'E is pressed by your LEFT middle finger — reach up one row from D. I is pressed by your RIGHT middle finger — reach up one row from K. Keep your other fingers resting on home row while you reach.',
    },
    warmupPrompt: 'ask all fall lads flask dad lass',
    drills: [
      { label: 'New Key Drill', prompt: 'e e e i i i de ki ded kik ede iki' },
      { label: 'Real Words',    prompt: 'if is die side file like silk skill aisle' },
    ],
    challenge: {
      prompt: 'if a field side skill like ideal fails silk aisle slide file die left led idea',
    },
  },

  // ── 7: R and U ────────────────────────────────────────────────────────────
  {
    id: 7,
    title: 'Reach Up: R and U',
    subtitle: 'Index Fingers Reach Up',
    phaseLabel: 'Reach Keys',
    targetKeys: ['r', 'u'],
    targetFinger: 'Left Index (R) · Right Index (U)',
    estimatedMinutes: 12,
    instruction: {
      title: 'Index Fingers Reach Up',
      body: 'R is pressed by your LEFT index finger — reach up one row from F. U is pressed by your RIGHT index finger — reach up one row from J. Return to home row after each reach!',
    },
    warmupPrompt: 'if side file like skill ideal fails silk',
    drills: [
      { label: 'New Key Drill', prompt: 'r r r u u u fr ju rfr uju rr uu ru ur' },
      { label: 'Real Words',    prompt: 'fur rule ruse sure rude ride fire sir lure fuse' },
    ],
    challenge: {
      prompt: 'fur rule ruse sure ride fire sir fluid slur duel ruler rife used fuse lure',
    },
  },

  // ── 8: T and Y ────────────────────────────────────────────────────────────
  {
    id: 8,
    title: 'Reach Up: T and Y',
    subtitle: 'Index Fingers Stretch Further',
    phaseLabel: 'Reach Keys',
    targetKeys: ['t', 'y'],
    targetFinger: 'Left Index (T) · Right Index (Y)',
    estimatedMinutes: 12,
    instruction: {
      title: 'Your Index Fingers Stretch',
      body: 'T is pressed by your LEFT index — reach past R, one row up. Y is pressed by your RIGHT index — reach past U, one row up. These are bigger stretches, so be extra careful to return to home.',
    },
    warmupPrompt: 'fur rule sure ride fire fluid slur ruler',
    drills: [
      { label: 'New Key Drill', prompt: 't t t y y y ft jy tft yty tt yy ty yt' },
      { label: 'Real Words',    prompt: 'try yet edit tired style daily truly drift' },
    ],
    challenge: {
      prompt: 'try yet style edit tired daily truly drift yield study list fist left lift first',
    },
  },

  // ── 9: G and H ────────────────────────────────────────────────────────────
  {
    id: 9,
    title: 'Center Keys: G and H',
    subtitle: 'Index Fingers Reach to Center',
    phaseLabel: 'Reach Keys',
    targetKeys: ['g', 'h'],
    targetFinger: 'Left Index (G) · Right Index (H)',
    estimatedMinutes: 12,
    instruction: {
      title: 'Reaching to the Center',
      body: 'G is pressed by your LEFT index — just a tiny stretch right from F. H is pressed by your RIGHT index — just a tiny stretch left from J. These are the closest reach keys: a small confident nudge.',
    },
    warmupPrompt: 'try yet style tired daily truly drift yield',
    drills: [
      { label: 'New Key Drill', prompt: 'g g g h h h fg jh ghg hgh ggg hhh gh hg' },
      { label: 'Real Words',    prompt: 'high glad light eight they this shift fresh flight' },
    ],
    challenge: {
      prompt: 'high glad light eight they this shift fresh flight slight right girl grill shirt',
    },
  },

  // ── 10: C, N, V, M ────────────────────────────────────────────────────────
  {
    id: 10,
    title: 'Reach Down: C N V M',
    subtitle: 'Four New Bottom-Row Keys',
    phaseLabel: 'Reach Keys',
    targetKeys: ['c', 'n', 'v', 'm'],
    targetFinger: 'L. Middle (C) · R. Index (N) · L. Index (V) · R. Index (M)',
    estimatedMinutes: 14,
    instruction: {
      title: 'Reaching Down to the Bottom Row',
      body: 'C: left middle curls down from D. N: right index stretches past J. V: left index curls down from F. M: right index stretches next to N. Keep wrists floating — not planted on the desk.',
    },
    warmupPrompt: 'high glad light they this shift flight right',
    drills: [
      { label: 'New Key Drill', prompt: 'c c c n n n v v v m m m cn vm cv mn cn vm' },
      { label: 'Real Words',    prompt: 'can nice vine mine mice seven given night might' },
    ],
    challenge: {
      prompt: 'can nice seven given night might never vine mine entire mince civil invite virtue',
    },
  },

  // ── 11: W, O, B, P ───────────────────────────────────────────────────────
  {
    id: 11,
    title: 'W, O, B and P',
    subtitle: 'Final Reach Keys',
    phaseLabel: 'Reach Keys',
    targetKeys: ['w', 'o', 'b', 'p'],
    targetFinger: 'L. Ring (W) · R. Ring (O) · L. Index (B) · R. Pinky (P)',
    estimatedMinutes: 14,
    instruction: {
      title: 'Unlocking the Last Keys',
      body: 'W: left ring reaches up from S. O: right ring reaches up from L. B: left index stretches past V. P: right pinky reaches up from semicolon. After this lesson, you\'ll have the whole alphabet except Q, X, and Z!',
    },
    warmupPrompt: 'can nice seven given night might never entire',
    drills: [
      { label: 'New Key Drill', prompt: 'w w w o o o b b b p p p wo bp ow pb wow pop' },
      { label: 'Real Words',    prompt: 'slow flow word own below brown power spoken globe' },
    ],
    challenge: {
      prompt: 'slow flow word own below brown power spoken globe problem welcome combine probe broken',
    },
  },

  // ── 12: Full Alphabet — Synthesis ─────────────────────────────────────────
  {
    id: 12,
    title: 'Full Alphabet',
    subtitle: 'Q, X, Z — You\'re Complete!',
    phaseLabel: 'Synthesis',
    targetKeys: ['q', 'x', 'z'],
    targetFinger: 'L. Pinky (Q, Z) · L. Ring (X)',
    estimatedMinutes: 15,
    instruction: {
      title: 'The Final Keys',
      body: 'Q: left pinky reaches up from A. X: left ring curls down from S. Z: left pinky curls down from A. These are rare keys, but now you have the ENTIRE alphabet! Time to put it all together.',
    },
    warmupPrompt: 'slow flow word below brown power spoken globe',
    drills: [
      { label: 'New Key Drill',   prompt: 'q q q x x x z z z qx zx qz quiz fox lazy exit zinc' },
      { label: 'Full Alphabet',   prompt: 'the quick brown fox jumps over the lazy dog' },
    ],
    challenge: {
      prompt: 'the quick brown fox jumps over the lazy dog the quick brown fox jumps',
    },
  },
];
