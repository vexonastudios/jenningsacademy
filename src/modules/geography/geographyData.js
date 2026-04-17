export const GEOGRAPHY_GROUPS = [
  // Day 1-5 (Skipped in this data array since they focus on continents/oceans, but we can do states anyway or mix)
  // Let's map out purely the 50 states into 15 groups.
  {
    dayId: 6,
    region: "The Southwest",
    stateIds: ["tx", "ok", "nm", "az"],
  },
  {
    dayId: 7,
    region: "The Deep South",
    stateIds: ["fl", "ga", "al", "sc"],
  },
  {
    dayId: 8,
    region: "The Pacific Coast",
    stateIds: ["ca", "or", "wa", "ak", "hi"],
  },
  {
    dayId: 9,
    region: "New England",
    stateIds: ["me", "nh", "vt", "ma"],
  },
  {
    dayId: 10,
    region: "New England & Mid Atlantic",
    stateIds: ["ri", "ct", "ny", "nj"],
  },
  {
    dayId: 11,
    region: "The Great Lakes",
    stateIds: ["mi", "oh", "in", "il"],
  },
  {
    dayId: 12,
    region: "The Midwest (North)",
    stateIds: ["wi", "mn", "ia", "mo"],
  },
  {
    dayId: 13,
    region: "The South",
    stateIds: ["nc", "va", "tn"],
  },
  {
    dayId: 14,
    region: "The Heartland",
    stateIds: ["ar", "ms", "la"],
  },
  {
    dayId: 15,
    region: "The Rocky Mountains",
    stateIds: ["co", "ut", "nv", "wy"],
  },
  {
    dayId: 16,
    region: "The Northern Rockies",
    stateIds: ["mt", "id"],
  },
  {
    dayId: 17,
    region: "The Great Plains (North)",
    stateIds: ["nd", "sd", "ne"],
  },
  {
    dayId: 18,
    region: "The Great Plains (South)",
    stateIds: ["ks"],
  },
  {
    dayId: 19,
    region: "The Mid-Atlantic",
    stateIds: ["pa", "md", "de"],
  },
  {
    dayId: 20,
    region: "The Appalachians",
    stateIds: ["wv", "ky"],
  }
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

