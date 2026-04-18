export const GRAMMAR_CURRICULUM = [
  // ──────────────────────────────
  // GRADE 1
  // ──────────────────────────────

  // ──────────────────────────────
  // SCRAMBLE MODE:
  // type: "scramble"
  // words: list of words scrambled
  // target: the correct word order string
  // ──────────────────────────────
  {
    id: "g1_scram_1",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["dog", "The", "ran", "fast"],
    target: "The dog ran fast",
    audioFallback: "The dog ran fast"
  },
  {
    id: "g1_scram_2",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["cat", "sleeps", "The"],
    target: "The cat sleeps",
    audioFallback: "The cat sleeps"
  },
  {
    id: "g1_scram_3",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["like", "apples", "I"],
    target: "I like apples",
    audioFallback: "I like apples"
  },
  {
    id: "g1_scram_4",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["God", "made", "light"],
    target: "God made light",
    audioFallback: "God made light"
  },
  {
    id: "g1_scram_5",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["pray", "We", "daily"],
    target: "We pray daily",
    audioFallback: "We pray daily"
  },
  {
    id: "g1_scram_6",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["Bible", "The", "helps", "me"],
    target: "The Bible helps me",
    audioFallback: "The Bible helps me"
  },
  {
    id: "g1_scram_7",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["sings", "bird", "A"],
    target: "A bird sings",
    audioFallback: "A bird sings"
  },
  {
    id: "g1_scram_8",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["kind", "Be", "today"],
    target: "Be kind today",
    audioFallback: "Be kind today"
  },
  {
    id: "g1_scram_9",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["Noah", "built", "ark", "the"],
    target: "Noah built the ark",
    audioFallback: "Noah built the ark"
  },
  {
    id: "g1_scram_10",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["lamb", "The", "is", "soft"],
    target: "The lamb is soft",
    audioFallback: "The lamb is soft"
  },
  {
    id: "g1_scram_11",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["read", "I", "books"],
    target: "I read books",
    audioFallback: "I read books"
  },
  {
    id: "g1_scram_12",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["church", "We", "to", "go"],
    target: "We go to church",
    audioFallback: "We go to church"
  },
  {
    id: "g1_scram_13",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["sun", "The", "shines"],
    target: "The sun shines",
    audioFallback: "The sun shines"
  },
  {
    id: "g1_scram_14",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["Ruth", "gleaned", "grain"],
    target: "Ruth gleaned grain",
    audioFallback: "Ruth gleaned grain"
  },
  {
    id: "g1_scram_15",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["wash", "hands", "your"],
    target: "Wash your hands",
    audioFallback: "Wash your hands"
  },
  {
    id: "g1_scram_16",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["David", "sang", "psalms"],
    target: "David sang psalms",
    audioFallback: "David sang psalms"
  },
  {
    id: "g1_scram_17",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["little", "A", "fish", "swims"],
    target: "A little fish swims",
    audioFallback: "A little fish swims"
  },
  {
    id: "g1_scram_18",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["mother", "My", "smiles"],
    target: "My mother smiles",
    audioFallback: "My mother smiles"
  },
  {
    id: "g1_scram_19",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["Jesus", "children", "loves"],
    target: "Jesus loves children",
    audioFallback: "Jesus loves children"
  },
  {
    id: "g1_scram_20",
    type: "scramble",
    grade: 1,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["share", "We", "toys"],
    target: "We share toys",
    audioFallback: "We share toys"
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
    grade: 1,
    posTarget: "noun",
    prompt: "Can you tap the NOUN (the person, place, or thing) in this sentence?",
    sentence: "The cat sits.",
    targetWords: ["cat"]
  },
  {
    id: "g1_ident_2",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Can you tap the VERB (the action word) in this sentence?",
    sentence: "The cat sits.",
    targetWords: ["sits"]
  },
  {
    id: "g1_ident_3",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Which word is a NOUN?",
    sentence: "Look at the big tree.",
    targetWords: ["tree"]
  },
  {
    id: "g1_ident_4",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Which word shows the ACTION?",
    sentence: "I run to the park.",
    targetWords: ["run"]
  },
  {
    id: "g1_ident_5",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Tap the NOUN.",
    sentence: "The boy reads his Bible.",
    targetWords: ["boy", "Bible"]
  },
  {
    id: "g1_ident_6",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Tap the VERB.",
    sentence: "The boy reads his Bible.",
    targetWords: ["reads"]
  },
  {
    id: "g1_ident_7",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Which word is a NOUN?",
    sentence: "Mother baked bread today.",
    targetWords: ["Mother", "bread"]
  },
  {
    id: "g1_ident_8",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Which word is the VERB?",
    sentence: "Mother baked bread today.",
    targetWords: ["baked"]
  },
  {
    id: "g1_ident_9",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Can you tap the NOUN?",
    sentence: "Noah built the ark.",
    targetWords: ["Noah", "ark"]
  },
  {
    id: "g1_ident_10",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Can you tap the VERB?",
    sentence: "Noah built the ark.",
    targetWords: ["built"]
  },
  {
    id: "g1_ident_11",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Find the NOUN.",
    sentence: "The lamb drinks water.",
    targetWords: ["lamb", "water"]
  },
  {
    id: "g1_ident_12",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Find the VERB.",
    sentence: "The lamb drinks water.",
    targetWords: ["drinks"]
  },
  {
    id: "g1_ident_13",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Which word is a NOUN?",
    sentence: "David sang a psalm.",
    targetWords: ["David", "psalm"]
  },
  {
    id: "g1_ident_14",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Which word is the ACTION word?",
    sentence: "David sang a psalm.",
    targetWords: ["sang"]
  },
  {
    id: "g1_ident_15",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Tap the NOUN.",
    sentence: "The sun warms the field.",
    targetWords: ["sun", "field"]
  },
  {
    id: "g1_ident_16",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Tap the VERB.",
    sentence: "The sun warms the field.",
    targetWords: ["warms"]
  },
  {
    id: "g1_ident_17",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Which word is a NOUN?",
    sentence: "Jesus loves children.",
    targetWords: ["Jesus", "children"]
  },
  {
    id: "g1_ident_18",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Which word is the VERB?",
    sentence: "Jesus loves children.",
    targetWords: ["loves"]
  },
  {
    id: "g1_ident_19",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Can you find the NOUN?",
    sentence: "The teacher opens the book.",
    targetWords: ["teacher", "book"]
  },
  {
    id: "g1_ident_20",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Can you find the VERB?",
    sentence: "The teacher opens the book.",
    targetWords: ["opens"]
  },
  {
    id: "g1_ident_21",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Find the NOUN.",
    sentence: "A bird builds a nest.",
    targetWords: ["bird", "nest"]
  },
  {
    id: "g1_ident_22",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Find the VERB.",
    sentence: "A bird builds a nest.",
    targetWords: ["builds"]
  },
  {
    id: "g1_ident_23",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Tap the NOUN.",
    sentence: "The child carries fruit.",
    targetWords: ["child", "fruit"]
  },
  {
    id: "g1_ident_24",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Tap the VERB.",
    sentence: "The child carries fruit.",
    targetWords: ["carries"]
  },
  {
    id: "g1_ident_25",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Which word is a NOUN?",
    sentence: "We sing at church.",
    targetWords: ["church"]
  },
  {
    id: "g1_ident_26",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Which word shows the ACTION?",
    sentence: "We sing at church.",
    targetWords: ["sing"]
  },
  {
    id: "g1_ident_27",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Can you tap the NOUN?",
    sentence: "Ruth gathered grain.",
    targetWords: ["Ruth", "grain"]
  },
  {
    id: "g1_ident_28",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Can you tap the VERB?",
    sentence: "Ruth gathered grain.",
    targetWords: ["gathered"]
  },
  {
    id: "g1_ident_29",
    type: "identify",
    grade: 1,
    posTarget: "noun",
    prompt: "Find the NOUN.",
    sentence: "My father mows grass.",
    targetWords: ["father", "grass"]
  },
  {
    id: "g1_ident_30",
    type: "identify",
    grade: 1,
    posTarget: "verb",
    prompt: "Find the VERB.",
    sentence: "My father mows grass.",
    targetWords: ["mows"]
  },

  // ──────────────────────────────
  // FIX MODE:
  // type: "fix"
  // broken: string with incorrect capitalization/punctuation
  // correctCap: string with corrected capitalization
  // puncTarget: ".", "?", "!" - what the ending should be
  // ──────────────────────────────
  {
    id: "g1_fix_1",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! It needs a capital letter and a period.",
    broken: "we went to the store",
    correctCap: "We went to the store",
    puncTarget: "."
  },
  {
    id: "g1_fix_2",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! What goes at the end of a question?",
    broken: "how old are you",
    correctCap: "How old are you",
    puncTarget: "?"
  },
  {
    id: "g1_fix_3",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! Make sure it looks like a real sentence.",
    broken: "the sun is hot",
    correctCap: "The sun is hot",
    puncTarget: "."
  },
  {
    id: "g1_fix_4",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! It needs a capital letter and a period.",
    broken: "god made the world",
    correctCap: "God made the world",
    puncTarget: "."
  },
  {
    id: "g1_fix_5",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! It is asking something.",
    broken: "where is my book",
    correctCap: "Where is my book",
    puncTarget: "?"
  },
  {
    id: "g1_fix_6",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! Show excitement at the end.",
    broken: "look at the rainbow",
    correctCap: "Look at the rainbow",
    puncTarget: "!"
  },
  {
    id: "g1_fix_7",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! Start with a capital letter.",
    broken: "jesus loves children",
    correctCap: "Jesus loves children",
    puncTarget: "."
  },
  {
    id: "g1_fix_8",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! It needs the right ending mark.",
    broken: "can you help me",
    correctCap: "Can you help me",
    puncTarget: "?"
  },
  {
    id: "g1_fix_9",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! Make it look complete.",
    broken: "we read the bible",
    correctCap: "We read the Bible",
    puncTarget: "."
  },
  {
    id: "g1_fix_10",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! It needs a capital letter and a period.",
    broken: "noah built an ark",
    correctCap: "Noah built an ark",
    puncTarget: "."
  },
  {
    id: "g1_fix_11",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! It is a question.",
    broken: "do birds fly",
    correctCap: "Do birds fly",
    puncTarget: "?"
  },
  {
    id: "g1_fix_12",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! Show strong feeling.",
    broken: "that is amazing",
    correctCap: "That is amazing",
    puncTarget: "!"
  },
  {
    id: "g1_fix_13",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! Begin it correctly.",
    broken: "the lamb is white",
    correctCap: "The lamb is white",
    puncTarget: "."
  },
  {
    id: "g1_fix_14",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! It asks something.",
    broken: "is mother home",
    correctCap: "Is mother home",
    puncTarget: "?"
  },
  {
    id: "g1_fix_15",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! It needs a capital letter and a period.",
    broken: "david sang a song",
    correctCap: "David sang a song",
    puncTarget: "."
  },
  {
    id: "g1_fix_16",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! Add the ending mark for excitement.",
    broken: "thank you lord",
    correctCap: "Thank you Lord",
    puncTarget: "!"
  },
  {
    id: "g1_fix_17",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! Make it a real sentence.",
    broken: "we go to church",
    correctCap: "We go to church",
    puncTarget: "."
  },
  {
    id: "g1_fix_18",
    type: "fix",
    grade: 1,
    prompt: "Fix this sentence! It should ask a question.",
    broken: "what time is lunch",
    correctCap: "What time is lunch",
    puncTarget: "?"
  },

  // ──────────────────────────────
  // GRADE 2
  // ──────────────────────────────

  // ──────────────────────────────
  // SCRAMBLE MODE:
  // type: "scramble"
  // words: list of words scrambled
  // target: the correct word order string
  // ──────────────────────────────
  {
    id: "g2_scram_1",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["little", "The", "bird", "sang", "sweetly"],
    target: "The little bird sang sweetly",
    audioFallback: "The little bird sang sweetly"
  },
  {
    id: "g2_scram_2",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["read", "We", "our", "Bible", "lesson"],
    target: "We read our Bible lesson",
    audioFallback: "We read our Bible lesson"
  },
  {
    id: "g2_scram_3",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["helped", "Mother", "I", "today"],
    target: "I helped Mother today",
    audioFallback: "I helped Mother today"
  },
  {
    id: "g2_scram_4",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["farmer", "The", "planted", "corn", "yellow"],
    target: "The farmer planted yellow corn",
    audioFallback: "The farmer planted yellow corn"
  },
  {
    id: "g2_scram_5",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["church", "We", "to", "Sunday", "went", "on"],
    target: "We went to church on Sunday",
    audioFallback: "We went to church on Sunday"
  },
  {
    id: "g2_scram_6",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["bright", "The", "sun", "shines", "today"],
    target: "The bright sun shines today",
    audioFallback: "The bright sun shines today"
  },
  {
    id: "g2_scram_7",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["kind", "was", "The", "teacher", "very"],
    target: "The teacher was very kind",
    audioFallback: "The teacher was very kind"
  },
  {
    id: "g2_scram_8",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["David", "his", "played", "harp"],
    target: "David played his harp",
    audioFallback: "David played his harp"
  },
  {
    id: "g2_scram_9",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["small", "A", "lamb", "followed", "us"],
    target: "A small lamb followed us",
    audioFallback: "A small lamb followed us"
  },
  {
    id: "g2_scram_10",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["clean", "Please", "your", "room", "now"],
    target: "Please clean your room now",
    audioFallback: "Please clean your room now"
  },
  {
    id: "g2_scram_11",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["the", "children", "Jesus", "blessed"],
    target: "Jesus blessed the children",
    audioFallback: "Jesus blessed the children"
  },
  {
    id: "g2_scram_12",
    type: "scramble",
    grade: 2,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["rain", "the", "After", "grass", "green", "looked"],
    target: "After the rain the grass looked green",
    audioFallback: "After the rain the grass looked green"
  },

  // ──────────────────────────────
  // IDENTIFY MODE:
  // type: "identify"
  // sentence: the full sentence
  // targetWords: array of words that are correct to tap
  // posTarget: string name of the part of speech being tested e.g., "noun"
  // ──────────────────────────────
  {
    id: "g2_ident_1",
    type: "identify",
    grade: 2,
    posTarget: "noun",
    prompt: "Tap the NOUN.",
    sentence: "The rabbit hid in the garden.",
    targetWords: ["rabbit", "garden"]
  },
  {
    id: "g2_ident_2",
    type: "identify",
    grade: 2,
    posTarget: "verb",
    prompt: "Tap the VERB.",
    sentence: "The rabbit hid in the garden.",
    targetWords: ["hid"]
  },
  {
    id: "g2_ident_3",
    type: "identify",
    grade: 2,
    posTarget: "adjective",
    prompt: "Tap the ADJECTIVE that describes a noun.",
    sentence: "The brave soldier marched home.",
    targetWords: ["brave"]
  },
  {
    id: "g2_ident_4",
    type: "identify",
    grade: 2,
    posTarget: "noun",
    prompt: "Which words are NOUNS?",
    sentence: "Sarah carried flowers to church.",
    targetWords: ["Sarah", "flowers", "church"]
  },
  {
    id: "g2_ident_5",
    type: "identify",
    grade: 2,
    posTarget: "verb",
    prompt: "Which word is the ACTION word?",
    sentence: "Sarah carried flowers to church.",
    targetWords: ["carried"]
  },
  {
    id: "g2_ident_6",
    type: "identify",
    grade: 2,
    posTarget: "adjective",
    prompt: "Which word describes the noun?",
    sentence: "The fluffy kitten slept quietly.",
    targetWords: ["fluffy"]
  },
  {
    id: "g2_ident_7",
    type: "identify",
    grade: 2,
    posTarget: "noun",
    prompt: "Tap the NOUNS.",
    sentence: "Father fixed the broken wagon.",
    targetWords: ["Father", "wagon"]
  },
  {
    id: "g2_ident_8",
    type: "identify",
    grade: 2,
    posTarget: "verb",
    prompt: "Tap the VERB.",
    sentence: "Father fixed the broken wagon.",
    targetWords: ["fixed"]
  },
  {
    id: "g2_ident_9",
    type: "identify",
    grade: 2,
    posTarget: "adjective",
    prompt: "Tap the describing word.",
    sentence: "Father fixed the broken wagon.",
    targetWords: ["broken"]
  },
  {
    id: "g2_ident_10",
    type: "identify",
    grade: 2,
    posTarget: "pronoun",
    prompt: "Tap the PRONOUN.",
    sentence: "He opened the heavy door.",
    targetWords: ["He"]
  },
  {
    id: "g2_ident_11",
    type: "identify",
    grade: 2,
    posTarget: "noun",
    prompt: "Tap the NOUNS.",
    sentence: "The baker made warm bread.",
    targetWords: ["baker", "bread"]
  },
  {
    id: "g2_ident_12",
    type: "identify",
    grade: 2,
    posTarget: "adjective",
    prompt: "Tap the ADJECTIVE.",
    sentence: "The baker made warm bread.",
    targetWords: ["warm"]
  },
  {
    id: "g2_ident_13",
    type: "identify",
    grade: 2,
    posTarget: "proper noun",
    prompt: "Tap the PROPER NOUN.",
    sentence: "Daniel prayed to God.",
    targetWords: ["Daniel", "God"]
  },
  {
    id: "g2_ident_14",
    type: "identify",
    grade: 2,
    posTarget: "verb",
    prompt: "Tap the VERB.",
    sentence: "Daniel prayed to God.",
    targetWords: ["prayed"]
  },
  {
    id: "g2_ident_15",
    type: "identify",
    grade: 2,
    posTarget: "noun",
    prompt: "Which words are NOUNS?",
    sentence: "The children sang a hymn.",
    targetWords: ["children", "hymn"]
  },
  {
    id: "g2_ident_16",
    type: "identify",
    grade: 2,
    posTarget: "verb",
    prompt: "Which word shows the action?",
    sentence: "The children sang a hymn.",
    targetWords: ["sang"]
  },
  {
    id: "g2_ident_17",
    type: "identify",
    grade: 2,
    posTarget: "adjective",
    prompt: "Tap the describing word.",
    sentence: "We saw tall trees near the river.",
    targetWords: ["tall"]
  },
  {
    id: "g2_ident_18",
    type: "identify",
    grade: 2,
    posTarget: "noun",
    prompt: "Tap the NOUNS.",
    sentence: "We saw tall trees near the river.",
    targetWords: ["trees", "river"]
  },
  {
    id: "g2_ident_19",
    type: "identify",
    grade: 2,
    posTarget: "pronoun",
    prompt: "Tap the PRONOUN.",
    sentence: "She folded the clean towels.",
    targetWords: ["She"]
  },
  {
    id: "g2_ident_20",
    type: "identify",
    grade: 2,
    posTarget: "verb",
    prompt: "Tap the VERB.",
    sentence: "She folded the clean towels.",
    targetWords: ["folded"]
  },

  // ──────────────────────────────
  // FIX MODE:
  // type: "fix"
  // broken: string with incorrect capitalization/punctuation
  // correctCap: string with corrected capitalization
  // puncTarget: ".", "?", "!" - what the ending should be
  // ──────────────────────────────
  {
    id: "g2_fix_1",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence. It needs a capital letter and a period.",
    broken: "we planted beans in the garden",
    correctCap: "We planted beans in the garden",
    puncTarget: "."
  },
  {
    id: "g2_fix_2",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence. It asks a question.",
    broken: "where did samuel go",
    correctCap: "Where did Samuel go",
    puncTarget: "?"
  },
  {
    id: "g2_fix_3",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence. Show excitement at the end.",
    broken: "look at that huge rainbow",
    correctCap: "Look at that huge rainbow",
    puncTarget: "!"
  },
  {
    id: "g2_fix_4",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence so it looks right.",
    broken: "mother baked a fresh loaf",
    correctCap: "Mother baked a fresh loaf",
    puncTarget: "."
  },
  {
    id: "g2_fix_5",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence. It is asking something.",
    broken: "can you carry this basket",
    correctCap: "Can you carry this basket",
    puncTarget: "?"
  },
  {
    id: "g2_fix_6",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence so it starts correctly.",
    broken: "jesus calmed the storm",
    correctCap: "Jesus calmed the storm",
    puncTarget: "."
  },
  {
    id: "g2_fix_7",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence. Use the right ending mark.",
    broken: "what a bright morning",
    correctCap: "What a bright morning",
    puncTarget: "!"
  },
  {
    id: "g2_fix_8",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence.",
    broken: "the class sang a hymn",
    correctCap: "The class sang a hymn",
    puncTarget: "."
  },
  {
    id: "g2_fix_9",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence. It asks a question.",
    broken: "did father fix the gate",
    correctCap: "Did Father fix the gate",
    puncTarget: "?"
  },
  {
    id: "g2_fix_10",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence to make it complete.",
    broken: "our dog slept by the fire",
    correctCap: "Our dog slept by the fire",
    puncTarget: "."
  },
  {
    id: "g2_fix_11",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence. It should sound excited.",
    broken: "thank you for helping me",
    correctCap: "Thank you for helping me",
    puncTarget: "!"
  },
  {
    id: "g2_fix_12",
    type: "fix",
    grade: 2,
    prompt: "Fix this sentence.",
    broken: "daniel was faithful to god",
    correctCap: "Daniel was faithful to God",
    puncTarget: "."
  },
  // ──────────────────────────────
  // GRADE 3
  // ──────────────────────────────

  // ──────────────────────────────
  // SCRAMBLE MODE:
  // type: "scramble"
  // words: list of words scrambled
  // target: the correct word order string
  // ──────────────────────────────
  {
    id: "g3_scram_1",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["carefully", "The", "student", "copied", "the", "verse"],
    target: "The student copied the verse carefully",
    audioFallback: "The student copied the verse carefully"
  },
  {
    id: "g3_scram_2",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["our", "We", "finished", "before", "lunch", "lesson"],
    target: "We finished our lesson before lunch",
    audioFallback: "We finished our lesson before lunch"
  },
  {
    id: "g3_scram_3",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["softly", "The", "rain", "fell", "all", "night"],
    target: "The rain fell softly all night",
    audioFallback: "The rain fell softly all night"
  },
  {
    id: "g3_scram_4",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["faithful", "Daniel", "remained", "to", "God"],
    target: "Daniel remained faithful to God",
    audioFallback: "Daniel remained faithful to God"
  },
  {
    id: "g3_scram_5",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["cheerfully", "She", "washed", "the", "dishes", "afterward"],
    target: "She washed the dishes cheerfully afterward",
    audioFallback: "She washed the dishes cheerfully afterward"
  },
  {
    id: "g3_scram_6",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["wagon", "The", "old", "creaked", "down", "the", "road"],
    target: "The old wagon creaked down the road",
    audioFallback: "The old wagon creaked down the road"
  },
  {
    id: "g3_scram_7",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["quietly", "Ruth", "gathered", "grain", "in", "the", "field"],
    target: "Ruth gathered grain quietly in the field",
    audioFallback: "Ruth gathered grain quietly in the field"
  },
  {
    id: "g3_scram_8",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["bright", "A", "lantern", "glowed", "in", "the", "window"],
    target: "A bright lantern glowed in the window",
    audioFallback: "A bright lantern glowed in the window"
  },
  {
    id: "g3_scram_9",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["asked", "The", "teacher", "a", "thoughtful", "question"],
    target: "The teacher asked a thoughtful question",
    audioFallback: "The teacher asked a thoughtful question"
  },
  {
    id: "g3_scram_10",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["timid", "The", "colt", "stood", "near", "the", "fence"],
    target: "The timid colt stood near the fence",
    audioFallback: "The timid colt stood near the fence"
  },
  {
    id: "g3_scram_11",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["Psalm", "We", "memorized", "a", "short", "today"],
    target: "We memorized a short Psalm today",
    audioFallback: "We memorized a short Psalm today"
  },
  {
    id: "g3_scram_12",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["helpful", "My", "brother", "carried", "the", "boxes", "inside"],
    target: "My helpful brother carried the boxes inside",
    audioFallback: "My helpful brother carried the boxes inside"
  },
  {
    id: "g3_scram_13",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["The", "crowd", "listened", "closely", "to", "Paul"],
    target: "The crowd listened closely to Paul",
    audioFallback: "The crowd listened closely to Paul"
  },
  {
    id: "g3_scram_14",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["fresh", "Bread", "smelled", "wonderful", "this", "morning"],
    target: "Bread smelled wonderful this morning",
    audioFallback: "Bread smelled wonderful this morning"
  },
  {
    id: "g3_scram_15",
    type: "scramble",
    grade: 3,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["patiently", "The", "children", "waited", "for", "supper"],
    target: "The children waited patiently for supper",
    audioFallback: "The children waited patiently for supper"
  },

  // ──────────────────────────────
  // IDENTIFY MODE:
  // type: "identify"
  // sentence: the full sentence
  // targetWords: array of words that are correct to tap
  // posTarget: string name of the part of speech being tested e.g., "noun"
  // ──────────────────────────────
  {
    id: "g3_ident_1",
    type: "identify",
    grade: 3,
    posTarget: "noun",
    prompt: "Tap the NOUNS.",
    sentence: "The baker carried bread to the market.",
    targetWords: ["baker", "bread", "market"]
  },
  {
    id: "g3_ident_2",
    type: "identify",
    grade: 3,
    posTarget: "verb",
    prompt: "Tap the VERB.",
    sentence: "The baker carried bread to the market.",
    targetWords: ["carried"]
  },
  {
    id: "g3_ident_3",
    type: "identify",
    grade: 3,
    posTarget: "adjective",
    prompt: "Tap the ADJECTIVE.",
    sentence: "The narrow path wound through the forest.",
    targetWords: ["narrow"]
  },
  {
    id: "g3_ident_4",
    type: "identify",
    grade: 3,
    posTarget: "adverb",
    prompt: "Tap the ADVERB that tells how.",
    sentence: "The choir sang beautifully in church.",
    targetWords: ["beautifully"]
  },
  {
    id: "g3_ident_5",
    type: "identify",
    grade: 3,
    posTarget: "pronoun",
    prompt: "Tap the PRONOUN.",
    sentence: "She placed the pitcher on the table.",
    targetWords: ["She"]
  },
  {
    id: "g3_ident_6",
    type: "identify",
    grade: 3,
    posTarget: "proper noun",
    prompt: "Tap the PROPER NOUNS.",
    sentence: "Samuel traveled to Jerusalem with Eli.",
    targetWords: ["Samuel", "Jerusalem", "Eli"]
  },
  {
    id: "g3_ident_7",
    type: "identify",
    grade: 3,
    posTarget: "noun",
    prompt: "Which words are NOUNS?",
    sentence: "The farmer repaired the fence before sunset.",
    targetWords: ["farmer", "fence", "sunset"]
  },
  {
    id: "g3_ident_8",
    type: "identify",
    grade: 3,
    posTarget: "verb",
    prompt: "Which word is the VERB?",
    sentence: "The farmer repaired the fence before sunset.",
    targetWords: ["repaired"]
  },
  {
    id: "g3_ident_9",
    type: "identify",
    grade: 3,
    posTarget: "adjective",
    prompt: "Tap the describing word.",
    sentence: "A gentle breeze cooled the porch.",
    targetWords: ["gentle"]
  },
  {
    id: "g3_ident_10",
    type: "identify",
    grade: 3,
    posTarget: "adverb",
    prompt: "Tap the word that tells how the action happened.",
    sentence: "The little girl answered politely.",
    targetWords: ["politely"]
  },
  {
    id: "g3_ident_11",
    type: "identify",
    grade: 3,
    posTarget: "pronoun",
    prompt: "Tap the PRONOUN.",
    sentence: "They swept the floor before company arrived.",
    targetWords: ["They"]
  },
  {
    id: "g3_ident_12",
    type: "identify",
    grade: 3,
    posTarget: "proper noun",
    prompt: "Tap the PROPER NOUN.",
    sentence: "Mother read from Proverbs this morning.",
    targetWords: ["Proverbs"]
  },
  {
    id: "g3_ident_13",
    type: "identify",
    grade: 3,
    posTarget: "noun",
    prompt: "Tap the NOUNS.",
    sentence: "The lamp cast light across the room.",
    targetWords: ["lamp", "light", "room"]
  },
  {
    id: "g3_ident_14",
    type: "identify",
    grade: 3,
    posTarget: "verb",
    prompt: "Tap the ACTION word.",
    sentence: "The lamp cast light across the room.",
    targetWords: ["cast"]
  },
  {
    id: "g3_ident_15",
    type: "identify",
    grade: 3,
    posTarget: "adjective",
    prompt: "Tap the ADJECTIVES.",
    sentence: "The hungry horse ate dry hay.",
    targetWords: ["hungry", "dry"]
  },
  {
    id: "g3_ident_16",
    type: "identify",
    grade: 3,
    posTarget: "adverb",
    prompt: "Tap the ADVERB.",
    sentence: "Paul spoke boldly before the rulers.",
    targetWords: ["boldly"]
  },
  {
    id: "g3_ident_17",
    type: "identify",
    grade: 3,
    posTarget: "pronoun",
    prompt: "Tap the PRONOUNS.",
    sentence: "He told us the good news.",
    targetWords: ["He", "us"]
  },
  {
    id: "g3_ident_18",
    type: "identify",
    grade: 3,
    posTarget: "proper noun",
    prompt: "Tap the PROPER NOUNS.",
    sentence: "Lydia welcomed Paul into Philippi.",
    targetWords: ["Lydia", "Paul", "Philippi"]
  },
  {
    id: "g3_ident_19",
    type: "identify",
    grade: 3,
    posTarget: "noun",
    prompt: "Tap the NOUNS.",
    sentence: "The captain steered the ship through waves.",
    targetWords: ["captain", "ship", "waves"]
  },
  {
    id: "g3_ident_20",
    type: "identify",
    grade: 3,
    posTarget: "verb",
    prompt: "Tap the VERB.",
    sentence: "The captain steered the ship through waves.",
    targetWords: ["steered"]
  },
  {
    id: "g3_ident_21",
    type: "identify",
    grade: 3,
    posTarget: "adjective",
    prompt: "Tap the ADJECTIVE.",
    sentence: "The faithful servant finished his task.",
    targetWords: ["faithful"]
  },
  {
    id: "g3_ident_22",
    type: "identify",
    grade: 3,
    posTarget: "adverb",
    prompt: "Tap the ADVERB.",
    sentence: "The bell rang loudly at noon.",
    targetWords: ["loudly"]
  },
  {
    id: "g3_ident_23",
    type: "identify",
    grade: 3,
    posTarget: "pronoun",
    prompt: "Tap the PRONOUN.",
    sentence: "We thanked the Lord for His mercy.",
    targetWords: ["We", "His"]
  },
  {
    id: "g3_ident_24",
    type: "identify",
    grade: 3,
    posTarget: "proper noun",
    prompt: "Tap the PROPER NOUNS.",
    sentence: "On Tuesday, Anna visited Texas with Aunt Ruth.",
    targetWords: ["Tuesday", "Anna", "Texas", "Ruth"]
  },

  // ──────────────────────────────
  // FIX MODE:
  // type: "fix"
  // broken: string with incorrect capitalization/punctuation
  // correctCap: string with corrected capitalization
  // puncTarget: ".", "?", "!" - what the ending should be
  // ──────────────────────────────
  {
    id: "g3_fix_1",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. It needs a capital letter and a period.",
    broken: "the wind rattled the old shutters",
    correctCap: "The wind rattled the old shutters",
    puncTarget: "."
  },
  {
    id: "g3_fix_2",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. It asks a question.",
    broken: "did you finish your spelling lesson",
    correctCap: "Did you finish your spelling lesson",
    puncTarget: "?"
  },
  {
    id: "g3_fix_3",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. Show excitement at the end.",
    broken: "what a beautiful sunset",
    correctCap: "What a beautiful sunset",
    puncTarget: "!"
  },
  {
    id: "g3_fix_4",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence so it starts correctly.",
    broken: "daniel prayed three times a day",
    correctCap: "Daniel prayed three times a day",
    puncTarget: "."
  },
  {
    id: "g3_fix_5",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. It should end with a question mark.",
    broken: "where did mother put the basket",
    correctCap: "Where did Mother put the basket",
    puncTarget: "?"
  },
  {
    id: "g3_fix_6",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. It needs a capital letter and a period.",
    broken: "we listened to psalm 23 this morning",
    correctCap: "We listened to Psalm 23 this morning",
    puncTarget: "."
  },
  {
    id: "g3_fix_7",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. Show strong feeling.",
    broken: "thank the lord for his goodness",
    correctCap: "Thank the Lord for His goodness",
    puncTarget: "!"
  },
  {
    id: "g3_fix_8",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence so it looks complete.",
    broken: "the children hurried into the barn",
    correctCap: "The children hurried into the barn",
    puncTarget: "."
  },
  {
    id: "g3_fix_9",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. It asks a question.",
    broken: "has father fed the horses yet",
    correctCap: "Has Father fed the horses yet",
    puncTarget: "?"
  },
  {
    id: "g3_fix_10",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. Use the right ending mark.",
    broken: "look at that lightning",
    correctCap: "Look at that lightning",
    puncTarget: "!"
  },
  {
    id: "g3_fix_11",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence.",
    broken: "paul wrote letters to the churches",
    correctCap: "Paul wrote letters to the churches",
    puncTarget: "."
  },
  {
    id: "g3_fix_12",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. It should ask something.",
    broken: "who left the gate open",
    correctCap: "Who left the gate open",
    puncTarget: "?"
  },
  {
    id: "g3_fix_13",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. It needs a capital letter and a period.",
    broken: "the lantern burned late into the night",
    correctCap: "The lantern burned late into the night",
    puncTarget: "."
  },
  {
    id: "g3_fix_14",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. Show excitement.",
    broken: "how brightly the stars shine",
    correctCap: "How brightly the stars shine",
    puncTarget: "!"
  },
  {
    id: "g3_fix_15",
    type: "fix",
    grade: 3,
    prompt: "Fix this sentence. It asks a question.",
    broken: "can we read from exodus tonight",
    correctCap: "Can we read from Exodus tonight",
    puncTarget: "?"
  },
  // ──────────────────────────────
  // GRADE 4
  // ──────────────────────────────

  // ──────────────────────────────
  // SCRAMBLE MODE:
  // type: "scramble"
  // words: list of words scrambled
  // target: the correct word order string
  // ──────────────────────────────
  {
    id: "g4_scram_1",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["patiently", "The", "young", "apprentice", "sharpened", "his", "tools"],
    target: "The young apprentice sharpened his tools patiently",
    audioFallback: "The young apprentice sharpened his tools patiently"
  },
  {
    id: "g4_scram_2",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["quietly", "Nehemiah", "inspected", "the", "broken", "wall", "at", "night"],
    target: "Nehemiah inspected the broken wall quietly at night",
    audioFallback: "Nehemiah inspected the broken wall quietly at night"
  },
  {
    id: "g4_scram_3",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["Our", "teacher", "explained", "the", "difficult", "lesson", "clearly"],
    target: "Our teacher explained the difficult lesson clearly",
    audioFallback: "Our teacher explained the difficult lesson clearly"
  },
  {
    id: "g4_scram_4",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["The", "silver", "moonlight", "rested", "softly", "on", "the", "field"],
    target: "The silver moonlight rested softly on the field",
    audioFallback: "The silver moonlight rested softly on the field"
  },
  {
    id: "g4_scram_5",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["faithful", "messengers", "carried", "the", "letter", "swiftly", "home"],
    target: "The faithful messengers carried the letter swiftly home",
    audioFallback: "The faithful messengers carried the letter swiftly home"
  },
  {
    id: "g4_scram_6",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["The", "crowd", "listened", "closely", "to", "Peter's", "bold", "sermon"],
    target: "The crowd listened closely to Peter's bold sermon",
    audioFallback: "The crowd listened closely to Peter's bold sermon"
  },
  {
    id: "g4_scram_7",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["carefully", "We", "packed", "our", "books", "before", "the", "storm"],
    target: "We packed our books carefully before the storm",
    audioFallback: "We packed our books carefully before the storm"
  },
  {
    id: "g4_scram_8",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["The", "small", "boat", "drifted", "slowly", "across", "the", "lake"],
    target: "The small boat drifted slowly across the lake",
    audioFallback: "The small boat drifted slowly across the lake"
  },
  {
    id: "g4_scram_9",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["Martha", "served", "the", "guests", "with", "great", "care"],
    target: "Martha served the guests with great care",
    audioFallback: "Martha served the guests with great care"
  },
  {
    id: "g4_scram_10",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["The", "chilly", "wind", "rattled", "the", "windows", "throughout", "the", "evening"],
    target: "The chilly wind rattled the windows throughout the evening",
    audioFallback: "The chilly wind rattled the windows throughout the evening"
  },
  {
    id: "g4_scram_11",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["Paul", "wrote", "encouraging", "words", "to", "the", "church", "from", "prison"],
    target: "Paul wrote encouraging words to the church from prison",
    audioFallback: "Paul wrote encouraging words to the church from prison"
  },
  {
    id: "g4_scram_12",
    type: "scramble",
    grade: 4,
    prompt: "Put the words in the right order to make a sentence.",
    words: ["The", "careful", "farmer", "stored", "grain", "for", "the", "winter"],
    target: "The careful farmer stored grain for the winter",
    audioFallback: "The careful farmer stored grain for the winter"
  },

  // ──────────────────────────────
  // IDENTIFY MODE:
  // type: "identify"
  // sentence: the full sentence
  // targetWords: array of words that are correct to tap
  // posTarget: string name of the part of speech being tested
  // ──────────────────────────────
  {
    id: "g4_ident_1",
    type: "identify",
    grade: 4,
    posTarget: "noun",
    prompt: "Tap the NOUNS.",
    sentence: "The merchant loaded spices onto the ship.",
    targetWords: ["merchant", "spices", "ship"]
  },
  {
    id: "g4_ident_2",
    type: "identify",
    grade: 4,
    posTarget: "verb",
    prompt: "Tap the VERB.",
    sentence: "The merchant loaded spices onto the ship.",
    targetWords: ["loaded"]
  },
  {
    id: "g4_ident_3",
    type: "identify",
    grade: 4,
    posTarget: "adjective",
    prompt: "Tap the ADJECTIVES.",
    sentence: "The weary traveler followed the narrow road.",
    targetWords: ["weary", "narrow"]
  },
  {
    id: "g4_ident_4",
    type: "identify",
    grade: 4,
    posTarget: "adverb",
    prompt: "Tap the ADVERB.",
    sentence: "The messenger arrived unexpectedly before dawn.",
    targetWords: ["unexpectedly"]
  },
  {
    id: "g4_ident_5",
    type: "identify",
    grade: 4,
    posTarget: "pronoun",
    prompt: "Tap the PRONOUNS.",
    sentence: "They told us that their father was coming.",
    targetWords: ["They", "us", "their"]
  },
  {
    id: "g4_ident_6",
    type: "identify",
    grade: 4,
    posTarget: "proper noun",
    prompt: "Tap the PROPER NOUNS.",
    sentence: "Timothy traveled from Lystra to Rome with Paul.",
    targetWords: ["Timothy", "Lystra", "Rome", "Paul"]
  },
  {
    id: "g4_ident_7",
    type: "identify",
    grade: 4,
    posTarget: "preposition",
    prompt: "Tap the PREPOSITION.",
    sentence: "The lantern hung above the doorway.",
    targetWords: ["above"]
  },
  {
    id: "g4_ident_8",
    type: "identify",
    grade: 4,
    posTarget: "conjunction",
    prompt: "Tap the CONJUNCTION.",
    sentence: "We hurried inside because the rain had started.",
    targetWords: ["because"]
  },
  {
    id: "g4_ident_9",
    type: "identify",
    grade: 4,
    posTarget: "noun",
    prompt: "Which words are NOUNS?",
    sentence: "The blacksmith repaired the wagon wheel.",
    targetWords: ["blacksmith", "wagon", "wheel"]
  },
  {
    id: "g4_ident_10",
    type: "identify",
    grade: 4,
    posTarget: "verb",
    prompt: "Which word is the VERB?",
    sentence: "The blacksmith repaired the wagon wheel.",
    targetWords: ["repaired"]
  },
  {
    id: "g4_ident_11",
    type: "identify",
    grade: 4,
    posTarget: "adjective",
    prompt: "Tap the describing words.",
    sentence: "The quiet valley lay under a golden sky.",
    targetWords: ["quiet", "golden"]
  },
  {
    id: "g4_ident_12",
    type: "identify",
    grade: 4,
    posTarget: "adverb",
    prompt: "Tap the word that tells how.",
    sentence: "The children answered respectfully during class.",
    targetWords: ["respectfully"]
  },
  {
    id: "g4_ident_13",
    type: "identify",
    grade: 4,
    posTarget: "pronoun",
    prompt: "Tap the PRONOUN.",
    sentence: "He promised to finish the work tomorrow.",
    targetWords: ["He"]
  },
  {
    id: "g4_ident_14",
    type: "identify",
    grade: 4,
    posTarget: "proper noun",
    prompt: "Tap the PROPER NOUNS.",
    sentence: "Esther spoke bravely before King Ahasuerus.",
    targetWords: ["Esther", "King", "Ahasuerus"]
  },
  {
    id: "g4_ident_15",
    type: "identify",
    grade: 4,
    posTarget: "preposition",
    prompt: "Tap the PREPOSITIONS.",
    sentence: "The cat slept beneath the table during supper.",
    targetWords: ["beneath", "during"]
  },
  {
    id: "g4_ident_16",
    type: "identify",
    grade: 4,
    posTarget: "conjunction",
    prompt: "Tap the CONJUNCTION.",
    sentence: "Ruth worked hard, and Boaz noticed her kindness.",
    targetWords: ["and"]
  },
  {
    id: "g4_ident_17",
    type: "identify",
    grade: 4,
    posTarget: "noun",
    prompt: "Tap the NOUNS.",
    sentence: "The captain gave orders from the deck.",
    targetWords: ["captain", "orders", "deck"]
  },
  {
    id: "g4_ident_18",
    type: "identify",
    grade: 4,
    posTarget: "verb",
    prompt: "Tap the VERB.",
    sentence: "The captain gave orders from the deck.",
    targetWords: ["gave"]
  },
  {
    id: "g4_ident_19",
    type: "identify",
    grade: 4,
    posTarget: "adjective",
    prompt: "Tap the ADJECTIVE.",
    sentence: "The ancient city had massive gates.",
    targetWords: ["ancient", "massive"]
  },
  {
    id: "g4_ident_20",
    type: "identify",
    grade: 4,
    posTarget: "adverb",
    prompt: "Tap the ADVERB.",
    sentence: "The horse stepped cautiously across the bridge.",
    targetWords: ["cautiously"]
  },
  {
    id: "g4_ident_21",
    type: "identify",
    grade: 4,
    posTarget: "preposition",
    prompt: "Tap the PREPOSITION.",
    sentence: "We placed the baskets beside the door.",
    targetWords: ["beside"]
  },
  {
    id: "g4_ident_22",
    type: "identify",
    grade: 4,
    posTarget: "conjunction",
    prompt: "Tap the CONJUNCTION.",
    sentence: "You may read now, or you may wait until evening.",
    targetWords: ["or"]
  },

  // ──────────────────────────────
  // FIX MODE:
  // type: "fix"
  // broken: string with incorrect capitalization/punctuation
  // correctCap: string with corrected capitalization
  // puncTarget: ".", "?", "!" - what the ending should be
  // ──────────────────────────────
  {
    id: "g4_fix_1",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence. It needs a capital letter and a period.",
    broken: "the shepherd led the flock across the hill",
    correctCap: "The shepherd led the flock across the hill",
    puncTarget: "."
  },
  {
    id: "g4_fix_2",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence. It asks a question.",
    broken: "did nehemiah rebuild the wall in jerusalem",
    correctCap: "Did Nehemiah rebuild the wall in Jerusalem",
    puncTarget: "?"
  },
  {
    id: "g4_fix_3",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence. Show excitement at the end.",
    broken: "what a mighty deliverance the lord gave",
    correctCap: "What a mighty deliverance the Lord gave",
    puncTarget: "!"
  },
  {
    id: "g4_fix_4",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence so it starts correctly.",
    broken: "paul and silas sang in the prison",
    correctCap: "Paul and Silas sang in the prison",
    puncTarget: "."
  },
  {
    id: "g4_fix_5",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence. It should end with a question mark.",
    broken: "where did mother place the blue pitcher",
    correctCap: "Where did Mother place the blue pitcher",
    puncTarget: "?"
  },
  {
    id: "g4_fix_6",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence.",
    broken: "the storm passed over the valley before dawn",
    correctCap: "The storm passed over the valley before dawn",
    puncTarget: "."
  },
  {
    id: "g4_fix_7",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence. Show strong feeling.",
    broken: "how gracious the lord has been to us",
    correctCap: "How gracious the Lord has been to us",
    puncTarget: "!"
  },
  {
    id: "g4_fix_8",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence so it looks complete.",
    broken: "our class read about david and goliath today",
    correctCap: "Our class read about David and Goliath today",
    puncTarget: "."
  },
  {
    id: "g4_fix_9",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence. It asks a question.",
    broken: "has father finished repairing the fence yet",
    correctCap: "Has Father finished repairing the fence yet",
    puncTarget: "?"
  },
  {
    id: "g4_fix_10",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence. Use the right ending mark.",
    broken: "look at those dark clouds gathering",
    correctCap: "Look at those dark clouds gathering",
    puncTarget: "!"
  },
  {
    id: "g4_fix_11",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence.",
    broken: "timothy encouraged the believers with faithful words",
    correctCap: "Timothy encouraged the believers with faithful words",
    puncTarget: "."
  },
  {
    id: "g4_fix_12",
    type: "fix",
    grade: 4,
    prompt: "Fix this sentence. It should ask something.",
    broken: "who carried the message to corinth",
    correctCap: "Who carried the message to Corinth",
    puncTarget: "?"
  }
];