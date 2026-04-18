/**
 * lessons.js — Typing Academy curriculum
 *
 * 12 structured lessons progressing from F/J anchors to full-alphabet synthesis.
 * Each lesson is designed to take 8–15 minutes with 4 drills + a 60s challenge.
 * Drill philosophy: repeat → build → mix → real words → phrases.
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
    estimatedMinutes: 10,
    instruction: {
      title: 'Find Your Anchors',
      body: 'Feel the small bumps on the F and J keys? Those are your home base. Your LEFT index finger always rests on F. Your RIGHT index finger always rests on J. Every time you look away from the screen, find the bumps and return here first. Never look at the keyboard — trust your fingers.',
      image: '/typing_home_row.png'
    },
    warmupPrompt: null,
    drills: [
      { label: 'Drill 1 — Single Keys',    prompt: 'f f f f j j j j f f f j j j f j f j f j f j f j f j' },
      { label: 'Drill 2 — Building Pairs', prompt: 'ff jj ff jj fj jf fj jf fjf jfj ffj jjf ffjj jjff fj jf fjf jfj' },
      { label: 'Drill 3 — Speed Bursts',   prompt: 'fj fj fj jf jf jf ff jj ff jj fjfj jfjf fjjf ffjj jffj fjfj jfjf' },
      { label: 'Drill 4 — Rhythm',         prompt: 'f j f j f j ff jj fj jf fjf jfj ffjj jjff fj jf fjf jfjf fj jf ffjj' },
    ],
    challenge: {
      prompt: 'f j f j ff jj fj jf fjf jfj ffjj jjff fj jf fjfj jfjf fj jf ff jj fj jf fjf jfj ff jj fj jf fjf jfjf ff jj fj jf ffjj jjff fj jf fjfj jfjf fj ff jj jf fjfj',
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
    estimatedMinutes: 12,
    instruction: {
      title: 'Your Left Hand\'s Home',
      body: 'Your left hand covers A, S, D, F. Pinky on A, ring on S, middle on D, index on F. Keep your right index on J as your anchor. Glide your fingers — do not lift your wrist off the home position. Think of your fingers like piano keys resting on their notes.',
    },
    warmupPrompt: 'f j f j ff jj fj jf fjf jfj ffjj jjff fj jf fjfj',
    drills: [
      { label: 'Drill 1 — Single Keys',     prompt: 'a a a a s s s s d d d d f f f f a s d f f d s a a a s s d d f f a s d f' },
      { label: 'Drill 2 — Sequence',        prompt: 'asdf fdsa asdf fdsa asfd fasd adsf sfda dsaf dsaf sdaf fads dads adds' },
      { label: 'Drill 3 — Word Building',   prompt: 'sad dad dads adds fads ads add lads flask fast fads sads asd dads fads' },
      { label: 'Drill 4 — Real Words',      prompt: 'sad add dad dads ads flask fads fad ask lass adds fall falls asks dads sad' },
    ],
    challenge: {
      prompt: 'asdf fdsa fads sad dads add ads fad asdf fdsa fads sad dad add ask all fall lads flask fads dads sad add ads fad asks falls lass lads flask sad dad adds fads ask all fall',
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
    estimatedMinutes: 12,
    instruction: {
      title: 'Your Right Hand\'s Home',
      body: 'Right hand: J under index, K under middle, L under ring, semicolon under pinky. Keep your left index on F as your anchor. Feel the J bump to find home in the dark. Your pinky on semicolon may feel weak at first — that is normal, it will get stronger.',
    },
    warmupPrompt: 'asdf fdsa sad fads dads add flask fads asks',
    drills: [
      { label: 'Drill 1 — Single Keys',   prompt: 'j j j j k k k k l l l l ; ; ; ; j k l ; ; l k j j k l ; ; l k j jkl;' },
      { label: 'Drill 2 — Sequence',      prompt: 'jkl; ;lkj jkl; ;lkj jk lj l; k; jl kl jkl; ;lkj jk l; ;lkj jkl; jl kl' },
      { label: 'Drill 3 — Pinky Focus',   prompt: '; ; ; ;j ;k ;l j; k; l; ;j ;l ;k j; l; k; ;; ;j ;l j;l ;kj jkl; ;lkj' },
      { label: 'Drill 4 — Build Rhythm',  prompt: 'jkl; ;lkj jk lj l; k; jl kl j;l ;kj kl jl jkl ;lkj jk l; jkl; jl kl jl jkl;' },
    ],
    challenge: {
      prompt: 'jkl; ;lkj jk lj l; k; jl kl jkl; ;lkj jk l; jkl jkl; kl jl jkl; ;lkj jl kl jkl; j; k; l; ;lkj jkl; kl jl jkl; ;lkj jk l; jkl kl jl jkl; ;lkj',
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
    estimatedMinutes: 14,
    instruction: {
      title: 'All Eight Fingers!',
      body: 'Both hands on home row. Find F and J bumps first, then let the other fingers fall into place. Practice alternating: left key, right key. You can form real words with just these 8 keys! Focus on a smooth rhythm rather than trying to go fast.',
    },
    warmupPrompt: 'jkl; ;lkj jk lj l; k; jkl jkl; asdf fdsa sad dads',
    drills: [
      { label: 'Drill 1 — Alternating',   prompt: 'fj dk sl a; jf kd ls ;a fj dk sl a; jf kd ls ;a fj dk sl a; fj dk jf kd' },
      { label: 'Drill 2 — Both Halves',   prompt: 'asdf jkl; fdsa ;lkj asdf jkl; asdf jkl; fdsa ;lkj fj dk sl a; jf kd ls ;a' },
      { label: 'Drill 3 — Real Words',    prompt: 'ask all fall lads flask dad sad fads lass asks dads falls flask add ask lass' },
      { label: 'Drill 4 — Short Phrases', prompt: 'a lad asks all dad falls all lads flask sad lass add fads ask all dads fall' },
    ],
    challenge: {
      prompt: 'ask all fall lads flask dad sad fads lass ask fall lads all flag sad flask a lad asks all day flask falls dads lass dad asks all lads flask fall sad add fads all lads flask dad sad fads asks fall lass flask all',
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
      body: 'Using only home row keys, you can type a surprising number of real words. Focus on rhythm: type at a steady pace rather than starting fast and then stopping. Accuracy first — speed will come naturally with practice. Think of each word as a pattern, not individual letters.',
    },
    warmupPrompt: 'asdf jkl; ask all fall lads flask dad sad fads',
    drills: [
      { label: 'Drill 1 — Word List',     prompt: 'ask all fall lads flask dad lass dads falls asks add sad fad fads flask lads' },
      { label: 'Drill 2 — More Words',    prompt: 'slack salad slad flag glad lass flask flak lads dads flask asks dad fad add' },
      { label: 'Drill 3 — Short Phrases', prompt: 'a lad asks a lass all day dad falls dads add flasks all lads ask a sad dad' },
      { label: 'Drill 4 — Fluency Run',   prompt: 'ask all fall lads flask dad lass dads falls a lad asks a lass all day dad slack' },
    ],
    challenge: {
      prompt: 'a lad asks all day flask falls dads lass dad asks all lads flask fall sad ask all fall lads dad fads flask lass a lad asks a lass all day dad falls dads add flask all lads ask',
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
    estimatedMinutes: 14,
    instruction: {
      title: 'Your Middle Fingers Reach Up',
      body: 'E is pressed by your LEFT middle finger — reach up one row from D. I is pressed by your RIGHT middle finger — reach up one row from K. Keep your other fingers resting on home row while you reach. Return your middle finger to D or K after each reach.',
    },
    warmupPrompt: 'ask all fall lads flask dad lass dads falls adds',
    drills: [
      { label: 'Drill 1 — New Keys',    prompt: 'e e e e i i i i de ki ded kik ede iki ee ii ei ie e i e i ede iki dei eki' },
      { label: 'Drill 2 — Mix In',      prompt: 'ed id ei def ike idea side field skill slide like silk aisle alike isle aide' },
      { label: 'Drill 3 — Real Words',  prompt: 'if is die side file like silk skill aisle ideal slide lake like said fail elk' },
      { label: 'Drill 4 — Phrases',     prompt: 'if a field fails idea side skill like ideal slide file die left led lake aisle elk' },
    ],
    challenge: {
      prompt: 'if a field side skill like ideal fails silk aisle slide file die left led idea like said die side file skill lake aisle ideal slide if a field fails like silk die left led idea side skill',
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
    estimatedMinutes: 14,
    instruction: {
      title: 'Index Fingers Reach Up',
      body: 'R is pressed by your LEFT index finger — reach up one row from F. U is pressed by your RIGHT index finger — reach up one row from J. Return to home row after each reach! These index keys are powerful — they open up a huge range of real English words.',
    },
    warmupPrompt: 'if side file like skill ideal fails silk aisle slide',
    drills: [
      { label: 'Drill 1 — New Keys',    prompt: 'r r r r u u u u fr ju rfr uju rr uu ru ur re ui rude rule ruse sure' },
      { label: 'Drill 2 — Mix In',      prompt: 'fur rule ruse sure rude ride fire sir lure fuse rife slur rural urge blur rural' },
      { label: 'Drill 3 — More Words',  prompt: 'ruler fluid slur duel rife lure sure fire ride fur rule ruse tired raised lured' },
      { label: 'Drill 4 — Phrases',     prompt: 'fur rule ruse sure ride fire sir fluid slur duel ruler rife fuse lure tired raised' },
    ],
    challenge: {
      prompt: 'fur rule ruse sure ride fire sir fluid slur duel ruler rife used fuse lure fur rule ruse sure ride fire slur duel ruler lure fluid rife used fuse rule sir ride fire fur ruse sure',
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
    estimatedMinutes: 14,
    instruction: {
      title: 'Your Index Fingers Stretch',
      body: 'T is pressed by your LEFT index — reach past R, one row up. Y is pressed by your RIGHT index — reach past U, one row up. These are bigger stretches, so be extra careful to return to home. T is one of the most common letters in English — you will use it constantly.',
    },
    warmupPrompt: 'fur rule sure ride fire fluid slur ruler rife lure',
    drills: [
      { label: 'Drill 1 — New Keys',     prompt: 't t t t y y y y ft jy tft yty tt yy ty yt tr tu yt ty try yet' },
      { label: 'Drill 2 — Key Mix',      prompt: 'try yet edit tired style daily truly drift yield study fist tier dirty retire' },
      { label: 'Drill 3 — Real Words',   prompt: 'try yet style edit tired daily truly drift yield study list fist left lift first' },
      { label: 'Drill 4 — Phrases',      prompt: 'try yet style edit tired daily truly drift yield study list left lift first truly' },
    ],
    challenge: {
      prompt: 'try yet style edit tired daily truly drift yield study list fist left lift first try yet style edit tired daily truly drift yield study list fist left first lift truly',
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
    estimatedMinutes: 14,
    instruction: {
      title: 'Reaching to the Center',
      body: 'G is pressed by your LEFT index — just a tiny stretch right from F. H is pressed by your RIGHT index — just a tiny stretch left from J. These are the closest reach keys: a small confident nudge. G and H together unlock words like "the", "high", "light", and "right".',
    },
    warmupPrompt: 'try yet style tired daily truly drift yield study',
    drills: [
      { label: 'Drill 1 — New Keys',    prompt: 'g g g g h h h h fg jh ghg hgh ggg hhh gh hg gf hj ghf ghj fgh jhg gfh hjg' },
      { label: 'Drill 2 — Key Mix',     prompt: "high glad light eight they this shift fresh flight the right girl grill shirt though" },
      { label: 'Drill 3 — Real Words',  prompt: 'high glad light eight they this shift fresh flight slight right girl grill shirt' },
      { label: 'Drill 4 — Phrases',     prompt: 'the high light is right eight girls shift the fresh slight right light they grill' },
    ],
    challenge: {
      prompt: 'high glad light eight they this shift fresh flight slight right girl grill shirt the high light is right eight girls shift fresh slight right they grill the high glad light eight shift',
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
    estimatedMinutes: 16,
    instruction: {
      title: 'Reaching Down to the Bottom Row',
      body: 'C: left middle curls down from D. N: right index stretches down past J. V: left index curls down from F. M: right index stretches next to N. Keep wrists floating — not planted on the desk. The bottom row feels awkward at first, but your fingers will adapt quickly.',
    },
    warmupPrompt: 'high glad light they this shift flight right girl',
    drills: [
      { label: 'Drill 1 — New Keys',    prompt: 'c c c c n n n n v v v v m m m m cn vm cv mn cn vm cv mn cvm nvmc cnvm' },
      { label: 'Drill 2 — Pairs',       prompt: 'can nice vine mine mice seven given night might mince civil invite virtue never' },
      { label: 'Drill 3 — Real Words',  prompt: 'can nice seven given night might never vine mine entire mince civil invite virtue' },
      { label: 'Drill 4 — Phrases',     prompt: 'can never mine seven nice given night might virtue civil entire mince invite vine' },
    ],
    challenge: {
      prompt: 'can nice seven given night might never vine mine entire mince civil invite virtue can nice seven given night might never vine mine civil virtue entire mince invite night might',
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
    estimatedMinutes: 16,
    instruction: {
      title: 'Unlocking the Last Keys',
      body: 'W: left ring reaches up from S. O: right ring reaches up from L. B: left index stretches past V. P: right pinky reaches up from semicolon. After this lesson, you\'ll have the whole alphabet except Q, X, and Z! The end is in sight — keep going!',
    },
    warmupPrompt: 'can nice seven given night might never entire vine',
    drills: [
      { label: 'Drill 1 — New Keys',    prompt: 'w w w w o o o o b b b b p p p p wo bp ow pb wow pop bow orb sob probe' },
      { label: 'Drill 2 — Key Mix',     prompt: 'slow flow word own below brown power spoken globe problem welcome combine probe' },
      { label: 'Drill 3 — Real Words',  prompt: 'slow flow word own below brown power spoken globe problem welcome combine probe broken' },
      { label: 'Drill 4 — Phrases',     prompt: 'below the brown globe slow flow word own broken power spoken welcome probe combine' },
    ],
    challenge: {
      prompt: 'slow flow word own below brown power spoken globe problem welcome combine probe broken slow flow word own below brown power spoken globe welcome broken combine probe problem slow',
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
    estimatedMinutes: 18,
    instruction: {
      title: 'The Final Keys',
      body: 'Q: left pinky reaches up from A. X: left ring curls down from S. Z: left pinky curls down from A. These are rare keys, but now you have the ENTIRE alphabet! Time to put it all together. The famous pangram "the quick brown fox jumps over the lazy dog" uses every single letter.',
    },
    warmupPrompt: 'slow flow word below brown power spoken globe probe',
    drills: [
      { label: 'Drill 1 — New Keys',     prompt: 'q q q x x x z z z qx zx qz quiz fox lazy exit zinc queen zap extra quartz' },
      { label: 'Drill 2 — Pangram',      prompt: 'the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog' },
      { label: 'Drill 3 — Synthesis',    prompt: 'quit extra zero mixed squad proxy fixes blaze square oxygen freeze exactly' },
      { label: 'Drill 4 — Full Run',     prompt: 'the quick brown fox jumps over the lazy dog quit extra zero blaze squad proxy fixes' },
    ],
    challenge: {
      prompt: 'the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog',
    },
  },
];
