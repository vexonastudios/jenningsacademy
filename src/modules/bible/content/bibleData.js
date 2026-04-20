export const OT_BOOKS = [
  // The Law
  { id: "gen", name: "Genesis", section: "The Law" },
  { id: "exo", name: "Exodus", section: "The Law" },
  { id: "lev", name: "Leviticus", section: "The Law" },
  { id: "num", name: "Numbers", section: "The Law" },
  { id: "deu", name: "Deuteronomy", section: "The Law" },
  
  // History
  { id: "jos", name: "Joshua", section: "History (OT)" },
  { id: "jud", name: "Judges", section: "History (OT)" },
  { id: "rut", name: "Ruth", section: "History (OT)" },
  { id: "1sa", name: "1 Samuel", section: "History (OT)" },
  { id: "2sa", name: "2 Samuel", section: "History (OT)" },
  { id: "1ki", name: "1 Kings", section: "History (OT)" },
  { id: "2ki", name: "2 Kings", section: "History (OT)" },
  { id: "1ch", name: "1 Chronicles", section: "History (OT)" },
  { id: "2ch", name: "2 Chronicles", section: "History (OT)" },
  { id: "ezr", name: "Ezra", section: "History (OT)" },
  { id: "neh", name: "Nehemiah", section: "History (OT)" },
  { id: "est", name: "Esther", section: "History (OT)" },

  // Poetry & Wisdom
  { id: "job", name: "Job", section: "Poetry & Wisdom" },
  { id: "psa", name: "Psalms", section: "Poetry & Wisdom" },
  { id: "pro", name: "Proverbs", section: "Poetry & Wisdom" },
  { id: "ecc", name: "Ecclesiastes", section: "Poetry & Wisdom" },
  { id: "son", name: "Song of Solomon", section: "Poetry & Wisdom" },

  // Major Prophets
  { id: "isa", name: "Isaiah", section: "Major Prophets" },
  { id: "jer", name: "Jeremiah", section: "Major Prophets" },
  { id: "lam", name: "Lamentations", section: "Major Prophets" },
  { id: "eze", name: "Ezekiel", section: "Major Prophets" },
  { id: "dan", name: "Daniel", section: "Major Prophets" },

  // Minor Prophets
  { id: "hos", name: "Hosea", section: "Minor Prophets" },
  { id: "joe", name: "Joel", section: "Minor Prophets" },
  { id: "amo", name: "Amos", section: "Minor Prophets" },
  { id: "oba", name: "Obadiah", section: "Minor Prophets" },
  { id: "jon", name: "Jonah", section: "Minor Prophets" },
  { id: "mic", name: "Micah", section: "Minor Prophets" },
  { id: "nah", name: "Nahum", section: "Minor Prophets" },
  { id: "hab", name: "Habakkuk", section: "Minor Prophets" },
  { id: "zep", name: "Zephaniah", section: "Minor Prophets" },
  { id: "hag", name: "Haggai", section: "Minor Prophets" },
  { id: "zec", name: "Zechariah", section: "Minor Prophets" },
  { id: "mal", name: "Malachi", section: "Minor Prophets" }
];

export const NT_BOOKS = [
  // Gospels
  { id: "mat", name: "Matthew", section: "Gospels" },
  { id: "mar", name: "Mark", section: "Gospels" },
  { id: "luk", name: "Luke", section: "Gospels" },
  { id: "joh", name: "John", section: "Gospels" },

  // History
  { id: "act", name: "Acts", section: "History (NT)" },

  // Paul's Epistles
  { id: "rom", name: "Romans", section: "Paul's Epistles" },
  { id: "1co", name: "1 Corinthians", section: "Paul's Epistles" },
  { id: "2co", name: "2 Corinthians", section: "Paul's Epistles" },
  { id: "gal", name: "Galatians", section: "Paul's Epistles" },
  { id: "eph", name: "Ephesians", section: "Paul's Epistles" },
  { id: "php", name: "Philippians", section: "Paul's Epistles" },
  { id: "col", name: "Colossians", section: "Paul's Epistles" },
  { id: "1th", name: "1 Thessalonians", section: "Paul's Epistles" },
  { id: "2th", name: "2 Thessalonians", section: "Paul's Epistles" },
  { id: "1ti", name: "1 Timothy", section: "Paul's Epistles" },
  { id: "2ti", name: "2 Timothy", section: "Paul's Epistles" },
  { id: "tit", name: "Titus", section: "Paul's Epistles" },
  { id: "phm", name: "Philemon", section: "Paul's Epistles" },

  // General Epistles
  { id: "heb", name: "Hebrews", section: "General Epistles" },
  { id: "jam", name: "James", section: "General Epistles" },
  { id: "1pe", name: "1 Peter", section: "General Epistles" },
  { id: "2pe", name: "2 Peter", section: "General Epistles" },
  { id: "1jo", name: "1 John", section: "General Epistles" },
  { id: "2jo", name: "2 John", section: "General Epistles" },
  { id: "3jo", name: "3 John", section: "General Epistles" },
  { id: "jud_nt", name: "Jude", section: "General Epistles" },

  // Prophecy
  { id: "rev", name: "Revelation", section: "Prophecy" }
];

export const ALL_BOOKS = [...OT_BOOKS, ...NT_BOOKS];
