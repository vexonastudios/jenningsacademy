export const GEOGRAPHY_GROUPS = [
  // ─── STATES (Days 1 - 15) ──────────────────────────────────────────────────
  { dayId: 1, type: "state", region: "The Southwest", stateIds: ["tx", "ok", "nm", "az"] },
  { dayId: 2, type: "state", region: "The Deep South", stateIds: ["fl", "ga", "al", "sc"] },
  { dayId: 3, type: "state", region: "The Pacific Coast", stateIds: ["ca", "or", "wa", "ak", "hi"] },
  { dayId: 4, type: "state", region: "New England", stateIds: ["me", "nh", "vt", "ma"] },
  { dayId: 5, type: "state", region: "New England & Mid Atlantic", stateIds: ["ri", "ct", "ny", "nj"] },
  { dayId: 6, type: "state", region: "The Great Lakes", stateIds: ["mi", "oh", "in", "il"] },
  { dayId: 7, type: "state", region: "The Midwest (North)", stateIds: ["wi", "mn", "ia", "mo"] },
  { dayId: 8, type: "state", region: "The South", stateIds: ["nc", "va", "tn"] },
  { dayId: 9, type: "state", region: "The Heartland", stateIds: ["ar", "ms", "la"] },
  { dayId: 10, type: "state", region: "The Rocky Mountains", stateIds: ["co", "ut", "nv", "wy"] },
  { dayId: 11, type: "state", region: "The Northern Rockies", stateIds: ["mt", "id"] },
  { dayId: 12, type: "state", region: "The Great Plains (North)", stateIds: ["nd", "sd", "ne"] },
  { dayId: 13, type: "state", region: "The Great Plains (South)", stateIds: ["ks"] },
  { dayId: 14, type: "state", region: "The Mid-Atlantic", stateIds: ["pa", "md", "de"] },
  { dayId: 15, type: "state", region: "The Appalachians", stateIds: ["wv", "ky"] },
  { dayId: 16, type: "state", isReview: true, region: "All US States Review", stateIds: [] },

  // ─── CAPITALS (Days 17 - 31) ────────────────────────────────────────────────
  { dayId: 17, type: "capital", region: "Southwest Capitals", stateIds: ["tx", "ok", "nm", "az"] },
  { dayId: 18, type: "capital", region: "Deep South Capitals", stateIds: ["fl", "ga", "al", "sc"] },
  { dayId: 19, type: "capital", region: "Pacific Coast Capitals", stateIds: ["ca", "or", "wa", "ak", "hi"] },
  { dayId: 20, type: "capital", region: "New England Capitals", stateIds: ["me", "nh", "vt", "ma"] },
  { dayId: 21, type: "capital", region: "Mid Atlantic Capitals", stateIds: ["ri", "ct", "ny", "nj"] },
  { dayId: 22, type: "capital", region: "Great Lakes Capitals", stateIds: ["mi", "oh", "in", "il"] },
  { dayId: 23, type: "capital", region: "Midwest Capitals", stateIds: ["wi", "mn", "ia", "mo"] },
  { dayId: 24, type: "capital", region: "South Capitals", stateIds: ["nc", "va", "tn"] },
  { dayId: 25, type: "capital", region: "Heartland Capitals", stateIds: ["ar", "ms", "la"] },
  { dayId: 26, type: "capital", region: "Rocky Mountain Capitals", stateIds: ["co", "ut", "nv", "wy"] },
  { dayId: 27, type: "capital", region: "Northern Rockies Capitals", stateIds: ["mt", "id"] },
  { dayId: 28, type: "capital", region: "Great Plains North Capitals", stateIds: ["nd", "sd", "ne"] },
  { dayId: 29, type: "capital", region: "Great Plains South Capitals", stateIds: ["ks"] },
  { dayId: 30, type: "capital", region: "Mid-Atlantic Capitals", stateIds: ["pa", "md", "de"] },
  { dayId: 31, type: "capital", region: "Appalachian Capitals", stateIds: ["wv", "ky"] },
  { dayId: 32, type: "capital", isReview: true, region: "All US Capitals Review", stateIds: [] }
];

export const CONTINENTS = ["North America", "South America", "Europe", "Africa", "Asia", "Australia", "Antarctica"];
export const OCEANS = ["Pacific", "Atlantic", "Indian", "Arctic", "Southern"];

export const STATE_CAPITALS = {
  al: "Montgomery", ak: "Juneau", az: "Phoenix", ar: "Little Rock", ca: "Sacramento",
  co: "Denver", ct: "Hartford", de: "Dover", fl: "Tallahassee", ga: "Atlanta",
  hi: "Honolulu", id: "Boise", il: "Springfield", in: "Indianapolis", ia: "Des Moines",
  ks: "Topeka", ky: "Frankfort", la: "Baton Rouge", me: "Augusta", md: "Annapolis",
  ma: "Boston", mi: "Lansing", mn: "Saint Paul", ms: "Jackson", mo: "Jefferson City",
  mt: "Helena", ne: "Lincoln", nv: "Carson City", nh: "Concord", nj: "Trenton",
  nm: "Santa Fe", ny: "Albany", nc: "Raleigh", nd: "Bismarck", oh: "Columbus",
  ok: "Oklahoma City", or: "Salem", pa: "Harrisburg", ri: "Providence", sc: "Columbia",
  sd: "Pierre", tn: "Nashville", tx: "Austin", ut: "Salt Lake City", vt: "Montpelier",
  va: "Richmond", wa: "Olympia", wv: "Charleston", wi: "Madison", wy: "Cheyenne"
};

