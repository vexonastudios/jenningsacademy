export const GRAMMAR_CURRICULUM = [
  // ──────────────────────────────
  // SCRAMBLE MODE:
  // type: "scramble"
  // words: list of words scrambled
  // target: the correct word order string
  // ──────────────────────────────
  {
    id: "g1_scram_1",
    type: "scramble",
    prompt: "Put the words in the right order to make a sentence.",
    words: ["dog", "The", "ran", "fast"],
    target: "The dog ran fast",
    audioFallback: "The dog ran fast"
  },
  {
    id: "g1_scram_2",
    type: "scramble",
    prompt: "Put the words in the right order to make a sentence.",
    words: ["cat", "sleeps", "The"],
    target: "The cat sleeps",
    audioFallback: "The cat sleeps"
  },
  {
    id: "g1_scram_3",
    type: "scramble",
    prompt: "Put the words in the right order to make a sentence.",
    words: ["like", "apples", "I"],
    target: "I like apples",
    audioFallback: "I like apples"
  },

  // ──────────────────────────────
  // IDENTIFY MODE:
  // type: "identify"
  // sentence: the full sentence
  // targetWords: array of words that are correct to tap
  // posTarget: string name of the part of speech being tested e.g., "noun"
  // ──────────────────────────────
  {
    id: "g1_ident_1",
    type: "identify",
    posTarget: "noun", // 'noun' or 'verb' here
    prompt: "Can you tap the NOUN (the person, place, or thing) in this sentence?",
    sentence: "The cat sits.",
    targetWords: ["cat"]
  },
  {
    id: "g1_ident_2",
    type: "identify",
    posTarget: "verb", 
    prompt: "Can you tap the VERB (the action word) in this sentence?",
    sentence: "The cat sits.",
    targetWords: ["sits"]
  },
  {
    id: "g1_ident_3",
    type: "identify",
    posTarget: "noun",
    prompt: "Which word is a NOUN?",
    sentence: "Look at the big tree.",
    targetWords: ["tree"]
  },
  {
    id: "g1_ident_4",
    type: "identify",
    posTarget: "verb",
    prompt: "Which word shows the ACTION?",
    sentence: "I run to the park.",
    targetWords: ["run"]
  },

  // ──────────────────────────────
  // FIX MODE:
  // type: "fix"
  // broken: string with incorrect capitalization/punctuation
  // capCorrect: boolean - true if first letter needs cap
  // puncCorrect: ".", "?", "!" - what the ending should be
  // ──────────────────────────────
  {
    id: "g1_fix_1",
    type: "fix",
    prompt: "Fix this sentence! It needs a capital letter and a period.",
    broken: "we went to the store",
    correctCap: "We went to the store",
    puncTarget: "." 
  },
  {
    id: "g1_fix_2",
    type: "fix",
    prompt: "Fix this sentence! What goes at the end of a question?",
    broken: "how old are you",
    correctCap: "How old are you",
    puncTarget: "?" 
  },
  {
    id: "g1_fix_3",
    type: "fix",
    prompt: "Fix this sentence! Make sure it looks like a real sentence.",
    broken: "the sun is hot",
    correctCap: "The sun is hot",
    puncTarget: "." 
  }
];
