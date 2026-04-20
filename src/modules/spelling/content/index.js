/**
 * Spelling content index.
 * Add a new grade file here and re-export it in the map below.
 * The getSpellingContent() function handles graceful fallback
 * to the nearest lower grade if an exact match isn't found.
 */

import gradeK  from "./gradeK";
import grade1  from "./grade1";
import grade2  from "./grade2";
import grade3  from "./grade3";
import grade4  from "./grade4";
import grade5  from "./grade5";
import grade6  from "./grade6";
import grade7  from "./grade7";
import grade8  from "./grade8";
import grade9  from "./grade9";
import grade10 from "./grade10";
import grade11 from "./grade11";
import grade12 from "./grade12";

const GRADE_CONTENT = {
  0:  gradeK,
  1:  grade1,
  2:  grade2,
  3:  grade3,
  4:  grade4,
  5:  grade5,
  6:  grade6,
  7:  grade7,
  8:  grade8,
  9:  grade9,
  10: grade10,
  11: grade11,
  12: grade12,
};

/**
 * Returns the word list for a given grade.
 * Falls back to the highest available grade below the requested one.
 */
export function getSpellingContent(grade) {
  const g = Number(grade);
  if (GRADE_CONTENT[g]) return GRADE_CONTENT[g];
  const available = Object.keys(GRADE_CONTENT)
    .map(Number)
    .filter((k) => k <= g)
    .sort((a, b) => b - a);
  return GRADE_CONTENT[available[0]] ?? GRADE_CONTENT[1];
}
