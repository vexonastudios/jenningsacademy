"use client";

import { useState, useEffect } from "react";
import { CheckCircle, PawPrint } from "lucide-react";

const ANIMALS = [
  {
    id: "dog",
    name: "Dog",
    emoji: "🐕",
    type: "mammal",
    clue: "I have fur/hair and nurse my young with milk.",
    fact: "Mammals like dogs are warm-blooded and care for their young. God made over 5,000 species of mammals!",
  },
  {
    id: "eagle",
    name: "Bald Eagle",
    emoji: "🦅",
    type: "bird",
    clue: "I have feathers, wings, and a beak.",
    fact: "Birds are the only animals with true feathers! The Bald Eagle was chosen as America's symbol of strength and freedom.",
  },
  {
    id: "salmon",
    name: "Salmon",
    emoji: "🐟",
    type: "fish",
    clue: "I breathe through gills, have scales, and live in water.",
    fact: "Salmon swim thousands of miles back to the exact stream where they were born to lay eggs. God gave them an incredible built-in compass!",
  },
  {
    id: "iguana",
    name: "Iguana",
    emoji: "🦎",
    type: "reptile",
    clue: "I am cold-blooded, have dry scaly skin, and bask in the sun.",
    fact: "Reptiles cannot make their own body heat, so they bask in the sun to warm up — God's natural solar heating system!",
  },
  {
    id: "whale",
    name: "Whale",
    emoji: "🐋",
    type: "mammal",
    clue: "Even though I live in the ocean, I breathe air and nurse my calves with milk.",
    fact: "Whales are mammals! Despite living in the sea, they breathe air through a blowhole and give birth to live young. God made 90+ species of whale!",
  },
  {
    id: "penguin",
    name: "Penguin",
    emoji: "🐧",
    type: "bird",
    clue: "I have feathers and a beak, but I swim instead of fly!",
    fact: "Penguins are birds that cannot fly but are incredible swimmers. God designed them with wings perfectly suited for swimming instead!",
  },
  {
    id: "frog",
    name: "Frog",
    emoji: "🐸",
    type: "amphibian",
    clue: "I live both on land and in water, and I have moist skin without scales.",
    fact: "Frogs are amphibians — they start life as water-breathing tadpoles and transform into air-breathing adults! One of God's most remarkable metamorphoses.",
  },
  {
    id: "cobra",
    name: "Cobra",
    emoji: "🐍",
    type: "reptile",
    clue: "I am cold-blooded, covered in dry scales, and often bask in the sun to regulate temperature.",
    fact: "Snakes are reptiles that can sense heat with special pit organs, similar to a natural infrared camera God built right into their heads!",
  },
];

const BUCKETS = [
  { id: "mammal",    label: "Mammal",    emoji: "🐾", color: "bg-amber-100 border-amber-400", textColor: "text-amber-800", trait: "Fur/Hair · Warm-blooded · Nurses young" },
  { id: "bird",      label: "Bird",      emoji: "🪶", color: "bg-sky-100 border-sky-400",    textColor: "text-sky-800",    trait: "Feathers · Beak · Lays eggs" },
  { id: "fish",      label: "Fish",      emoji: "🐠", color: "bg-blue-100 border-blue-400",  textColor: "text-blue-800",  trait: "Gills · Scales · Cold-blooded" },
  { id: "reptile",   label: "Reptile",   emoji: "🦎", color: "bg-emerald-100 border-emerald-400", textColor: "text-emerald-800", trait: "Dry scales · Cold-blooded · Lays eggs" },
  { id: "amphibian", label: "Amphibian", emoji: "🐸", color: "bg-teal-100 border-teal-400",  textColor: "text-teal-800",  trait: "Moist skin · Both land & water" },
];

export default function AnimalSorter({ speak, onComplete }) {
  const [queue, setQueue] = useState(() => [...ANIMALS].sort(() => Math.random() - 0.5));
  const [current, setCurrent] = useState(0);
  const [sorted, setSorted] = useState({}); // { animalId: { guessed, correct } }
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [showFact, setShowFact] = useState(false);

  const animal = queue[current];
  const isDone = current >= queue.length;

  useEffect(() => {
    if (!hasSpokenIntro && animal) {
      speak("Welcome to the Animal Sorter! God created every living creature with unique features. Read the clue, then drag each animal into the correct category based on its traits!");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, animal, speak]);

  useEffect(() => {
    if (animal && hasSpokenIntro) {
      speak(`Next animal: the ${animal.name}. ${animal.clue} Where does it belong?`);
      setShowFact(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const handleSort = (bucketId) => {
    const isCorrect = bucketId === animal.type;
    const result = { guessed: bucketId, correct: animal.type, isCorrect };
    setSorted(prev => ({ ...prev, [animal.id]: result }));

    if (isCorrect) {
      speak(`Correct! ${animal.name} is a ${animal.type}. ${animal.fact}`);
    } else {
      const correct = BUCKETS.find(b => b.id === animal.type);
      speak(`Not quite! A ${animal.name} is actually a ${animal.type} — ${correct.trait}. ${animal.fact}`);
    }

    setShowFact(true);
    setTimeout(() => {
      setCurrent(i => i + 1);
    }, 3500);
  };

  if (isDone) {
    const total = queue.length;
    const correct = Object.values(sorted).filter(r => r.isCorrect).length;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="text-6xl mb-6">🏆</div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Animal Expert!</h2>
        <p className="text-lg font-bold text-slate-600 mb-2">{correct}/{total} Correct</p>
        <p className="text-slate-400 mb-8 max-w-md leading-relaxed text-sm">
          <span className="font-semibold italic text-slate-600">"So God created great sea creatures and every living thing... And God saw that it was good." — Genesis 1:21</span>
        </p>
        <button onClick={onComplete} className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-amber-400/30 transition-transform hover:-translate-y-1">
          Finish Lab
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-amber-950 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-amber-400">
          <PawPrint className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase">Animal Sorter</h3>
        </div>
        <p className="text-amber-100/80 text-sm mb-6 leading-relaxed">
          Read the clue and sort each animal into the correct animal class!
        </p>

        {/* Category guide */}
        <div className="space-y-2">
          <h4 className="text-xs uppercase font-black text-amber-400 tracking-wider mb-2 border-b border-amber-800 pb-2">Animal Classes</h4>
          {BUCKETS.map(b => (
            <div key={b.id} className="text-xs font-semibold text-amber-200/80 flex gap-2">
              <span>{b.emoji}</span>
              <span><span className="font-black text-white">{b.label}:</span> {b.trait}</span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-amber-400">Progress</span>
            <span className="text-xs font-bold text-amber-200">{current}/{queue.length}</span>
          </div>
          <div className="w-full h-3 bg-amber-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${(current / queue.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 bg-amber-50 flex flex-col items-center justify-center p-8 gap-6">
        {/* Current Animal Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-amber-100 p-8 w-full max-w-md text-center">
          <div className="text-7xl mb-4 leading-none">{animal.emoji}</div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-3">{animal.name}</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <p className="text-xs font-black text-amber-600 uppercase tracking-wider mb-1">Your Clue</p>
            <p className="text-sm text-slate-600 font-medium italic">"{animal.clue}"</p>
          </div>
          {showFact && (
            <div className={`rounded-xl p-3 text-sm font-semibold ${sorted[animal.id]?.isCorrect ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>
              {sorted[animal.id]?.isCorrect ? "✅ " : "❌ "}{animal.fact}
            </div>
          )}
        </div>

        {/* Buckets */}
        {!showFact && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
            {BUCKETS.map(bucket => (
              <button
                key={bucket.id}
                onClick={() => handleSort(bucket.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 font-bold text-sm transition-all hover:scale-105 active:scale-95 ${bucket.color} ${bucket.textColor}`}
              >
                <span className="text-3xl">{bucket.emoji}</span>
                <span>{bucket.label}</span>
              </button>
            ))}
          </div>
        )}

        {showFact && (
          <p className="text-slate-400 text-sm font-medium">Next animal coming up...</p>
        )}
      </div>
    </div>
  );
}
