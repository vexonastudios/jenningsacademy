import { OT_BOOKS, NT_BOOKS, ALL_BOOKS } from "./bibleData";

// Helper to grab a chunk of books
const getSection = (books, sectionName) => books.filter(b => b.section === sectionName);

// The core curriculum levels
export const BIBLE_CURRICULUM = [
  // Beginner levels (Grades K-3 primarily, but good for all starting out)
  {
    id: "lvl_law",
    gradeMin: 0,
    gradeMax: 12,
    title: "The Law",
    description: "The first 5 books of the Old Testament.",
    books: getSection(OT_BOOKS, "The Law")
  },
  {
    id: "lvl_gospels",
    gradeMin: 0,
    gradeMax: 12,
    title: "The Gospels",
    description: "The 4 accounts of Jesus.",
    books: getSection(NT_BOOKS, "Gospels")
  },
  {
    id: "lvl_poetry",
    gradeMin: 0,
    gradeMax: 12,
    title: "Poetry & Wisdom",
    description: "5 books of poems, songs, and wise sayings.",
    books: getSection(OT_BOOKS, "Poetry & Wisdom")
  },
  {
    id: "lvl_major_prophets",
    gradeMin: 1,
    gradeMax: 12,
    title: "Major Prophets",
    description: "The 5 longer books of prophecy.",
    books: getSection(OT_BOOKS, "Major Prophets")
  },
  {
    id: "lvl_history_nt",
    gradeMin: 1,
    gradeMax: 12,
    title: "New Testament History & Prophecy",
    description: "Acts and Revelation.",
    books: [...getSection(NT_BOOKS, "History (NT)"), ...getSection(NT_BOOKS, "Prophecy")]
  },
  {
    id: "lvl_minor_prophets",
    gradeMin: 2,
    gradeMax: 12,
    title: "Minor Prophets",
    description: "The 12 shorter books of prophecy.",
    books: getSection(OT_BOOKS, "Minor Prophets")
  },
  {
    id: "lvl_history_ot",
    gradeMin: 2,
    gradeMax: 12,
    title: "Old Testament History",
    description: "The 12 books of Israel's history.",
    books: getSection(OT_BOOKS, "History (OT)")
  },
  {
    id: "lvl_general_epistles",
    gradeMin: 3,
    gradeMax: 12,
    title: "General Epistles",
    description: "8 letters written to the early churches.",
    books: getSection(NT_BOOKS, "General Epistles")
  },
  {
    id: "lvl_pauls_epistles",
    gradeMin: 3,
    gradeMax: 12,
    title: "Paul's Epistles",
    description: "13 letters written by the Apostle Paul.",
    books: getSection(NT_BOOKS, "Paul's Epistles")
  },

  // Intermediate Challenges (combined sections)
  {
    id: "chal_ot_start",
    gradeMin: 4,
    gradeMax: 12,
    title: "Law & History",
    description: "The first 17 books of the Old Testament.",
    books: [...getSection(OT_BOOKS, "The Law"), ...getSection(OT_BOOKS, "History (OT)")]
  },
  {
    id: "chal_nt_start",
    gradeMin: 4,
    gradeMax: 12,
    title: "Gospels & History",
    description: "The first 5 books of the New Testament.",
    books: [...getSection(NT_BOOKS, "Gospels"), ...getSection(NT_BOOKS, "History (NT)")]
  },

  // Advanced Iron-Man Challenges
  {
    id: "iron_ot",
    gradeMin: 6,
    gradeMax: 12,
    title: "Complete Old Testament",
    description: "All 39 books of the Old Testament.",
    books: OT_BOOKS
  },
  {
    id: "iron_nt",
    gradeMin: 6,
    gradeMax: 12,
    title: "Complete New Testament",
    description: "All 27 books of the New Testament.",
    books: NT_BOOKS
  },
  {
    id: "iron_full",
    gradeMin: 9,
    gradeMax: 12,
    title: "The Entire Bible",
    description: "All 66 books from Genesis to Revelation.",
    books: ALL_BOOKS
  }
];

export function getCurriculumForGrade(grade) {
  const g = Number(grade) || 1;
  return BIBLE_CURRICULUM.filter(item => g >= item.gradeMin && g <= item.gradeMax);
}
