"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Dna } from "lucide-react";

// All crosses use simple Mendelian genetics. T = dominant, t = recessive.
const CROSSES = [
  {
    id: "pure_tall",
    title: "Pea Plant: Height",
    trait: "Stem Height",
    dominant: { allele: "T", label: "Tall", emoji: "🌱" },
    recessive: { allele: "t", label: "Short", emoji: "🪴" },
    parent1: "TT",
    parent2: "tt",
    question: "What percentage of offspring will be TALL?",
    answer: 100,
    explanation: "All offspring (Tt) carry the dominant Tall (T) gene. Even though recessive (t) is hidden, every plant looks tall. This is called being heterozygous — having two different alleles.",
    fact: "Gregor Mendel was an Augustinian monk who performed these exact experiments in the 1860s. His faith-driven curiosity about God's created order launched the entire science of genetics!",
  },
  {
    id: "hybrid_tall",
    title: "Hybrid Cross",
    trait: "Stem Height",
    dominant: { allele: "T", label: "Tall", emoji: "🌱" },
    recessive: { allele: "t", label: "Short", emoji: "🪴" },
    parent1: "Tt",
    parent2: "Tt",
    question: "What percentage of offspring will be SHORT?",
    answer: 25,
    explanation: "A 3:1 ratio! Three tall plants (TT, Tt, Tt) and ONE short plant (tt). The recessive short gene appears in 25% of offspring when two hybrid plants cross.",
    fact: "Mendel's 3:1 ratio was at first disbelieved. It was only rediscovered 35 years later and confirmed by multiple independent scientists. Truth, once discovered, always wins out!",
  },
  {
    id: "flower_color",
    title: "Pea Plant: Flower Color",
    trait: "Flower Color",
    dominant: { allele: "P", label: "Purple", emoji: "🌸" },
    recessive: { allele: "p", label: "White", emoji: "🤍" },
    parent1: "Pp",
    parent2: "pp",
    question: "What percentage of offspring will have PURPLE flowers?",
    answer: 50,
    explanation: "A 1:1 ratio! Two purple (Pp) and two white (pp) offspring. When one parent is hybrid (Pp) and the other is recessive (pp), exactly half will show the dominant trait.",
    fact: "Flower color in peas is determined by a single gene with two alleles — just like this! Mendel discovered this law by patiently growing and counting over 10,000 pea plants to God's glory.",
  },
];

function buildSquare(p1, p2) {
  // p1 and p2 are "TT", "Tt", "tt", "Pp", "pp" etc.
  const a = p1.split("");
  const b = p2.split("");
  return [
    a[0] + b[0], a[0] + b[1],
    a[1] + b[0], a[1] + b[1],
  ];
}

function isDominant(genotype, domAllele) {
  return genotype.toUpperCase().includes(domAllele.toUpperCase());
}

function sortGenotype(g) {
  // Put uppercase first: "tT" → "Tt"
  return g.split("").sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : a < b ? -1 : 1).join("");
}

export default function PunnettSquares({ speak, onComplete }) {
  const [crossIdx, setCrossIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  const cross = CROSSES[crossIdx];
  const cells = buildSquare(cross.parent1, cross.parent2).map(sortGenotype);
  const domAllele = cross.dominant.allele;

  const dominantCount = cells.filter(c => isDominant(c, domAllele)).length;
  const recessiveCount = 4 - dominantCount;
  const domPct = dominantCount * 25;
  const recPct = recessiveCount * 25;

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak("Welcome to the Punnett Square Lab! Gregor Mendel was a Christian monk who discovered the laws of heredity by studying pea plants. A Punnett Square helps us predict what traits offspring will inherit. Let's explore his most famous experiments!");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  useEffect(() => {
    setSelected(null);
    setChecked(false);
    if (hasSpokenIntro) {
      speak(`Cross ${crossIdx + 1}: ${cross.title}. The dominant trait is ${cross.dominant.label}, shown by a capital ${cross.dominant.allele}. The recessive trait is ${cross.recessive.label}, shown by a lowercase ${cross.recessive.allele}. Look at the Punnett Square and answer the question!`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crossIdx]);

  const handleCheck = () => {
    if (selected === null) return;
    setChecked(true);
    const correct = selected === cross.answer;
    if (correct) {
      speak(`Correct! ${cross.explanation} ${cross.fact}`);
    } else {
      speak(`Not quite. Count the cells: ${dominantCount} show dominant traits - that's ${domPct}%, and ${recessiveCount} show recessive - that's ${recPct}%. ${cross.explanation}`);
    }
  };

  const handleNext = () => {
    const next = [...completed, cross.id];
    setCompleted(next);
    if (crossIdx + 1 >= CROSSES.length) {
      speak("Excellent! You've completed all three Punnett Square crosses. Mendelian genetics shows us that the diversity of life follows elegant, predictable mathematical laws — a beautiful testament to God's orderly design of creation!");
      setTimeout(onComplete, 3000);
    } else {
      setCrossIdx(i => i + 1);
    }
  };

  const answers = [0, 25, 50, 75, 100];

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-emerald-950 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-emerald-400">
          <Dna className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase text-sm">Punnett Squares</h3>
        </div>
        <p className="text-emerald-100/80 text-sm mb-6 leading-relaxed">
          Study the Punnett Square to predict offspring traits. Count the dominant vs. recessive cells and answer the question!
        </p>

        {/* Progress */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs uppercase font-black text-emerald-400 tracking-wider mb-2 border-b border-emerald-800 pb-2">
            Crosses ({completed.length}/{CROSSES.length})
          </h4>
          {CROSSES.map((c, i) => {
            const done = completed.includes(c.id);
            const cur = i === crossIdx;
            return (
              <div key={c.id} className={`flex items-center gap-2 text-sm font-semibold py-1 ${cur ? "text-white" : done ? "text-emerald-400" : "text-emerald-600/40"}`}>
                {done ? <CheckCircle className="w-4 h-4 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-current shrink-0" />}
                {c.title}
              </div>
            );
          })}
        </div>

        {/* Trait legend */}
        <div className="bg-emerald-900/60 border border-emerald-700/50 rounded-xl p-4 mt-auto">
          <p className="text-xs font-black text-emerald-300 uppercase tracking-wider mb-2">Trait Key</p>
          <div className="space-y-1 text-xs text-emerald-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center font-black text-white text-xs">{cross.dominant.allele}</span>
              <span><strong className="text-white">{cross.dominant.allele}_</strong> = {cross.dominant.emoji} {cross.dominant.label} (dominant)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-slate-600 flex items-center justify-center font-black text-white text-xs">{cross.recessive.allele}</span>
              <span><strong className="text-white">{cross.recessive.allele}{cross.recessive.allele}</strong> = {cross.recessive.emoji} {cross.recessive.label} (recessive)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-8 gap-6">
        <div className="text-center">
          <h3 className="font-extrabold text-slate-800 text-xl mb-1">{cross.title}</h3>
          <p className="text-slate-500 text-sm font-medium">{cross.trait}</p>
        </div>

        {/* Parent alleles */}
        <div className="flex items-center gap-6 text-lg font-black text-slate-700">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Parent 1</span>
            <span className="text-2xl bg-white border-2 border-slate-200 rounded-xl px-4 py-2 shadow-sm font-mono">{cross.parent1}</span>
          </div>
          <span className="text-2xl text-slate-300">×</span>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Parent 2</span>
            <span className="text-2xl bg-white border-2 border-slate-200 rounded-xl px-4 py-2 shadow-sm font-mono">{cross.parent2}</span>
          </div>
        </div>

        {/* Punnett Square */}
        <div className="relative">
          {/* Column headers */}
          <div className="flex ml-12 mb-1">
            {cross.parent2.split("").map((a, i) => (
              <div key={i} className="w-20 text-center font-black text-slate-600 font-mono text-lg">{a}</div>
            ))}
          </div>
          <div className="flex">
            {/* Row headers */}
            <div className="flex flex-col mr-1">
              {cross.parent1.split("").map((a, i) => (
                <div key={i} className="h-20 flex items-center justify-center w-12 font-black text-slate-600 font-mono text-lg">{a}</div>
              ))}
            </div>
            {/* Grid */}
            <div className="grid grid-cols-2 gap-1">
              {cells.map((cell, i) => {
                const dominant = isDominant(cell, domAllele);
                return (
                  <div
                    key={i}
                    className={`w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-black text-xl transition-all
                      ${dominant
                        ? "bg-emerald-100 border-emerald-400 text-emerald-700"
                        : "bg-slate-100 border-slate-300 text-slate-500"}`}
                  >
                    <span>{cell}</span>
                    <span className="text-lg mt-0.5">{dominant ? cross.dominant.emoji : cross.recessive.emoji}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Counts */}
          <div className="flex gap-4 mt-4 justify-center">
            <span className="bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-black px-3 py-1 rounded-full">
              {cross.dominant.emoji} {cross.dominant.label}: {dominantCount}/4 = {domPct}%
            </span>
            <span className="bg-slate-100 text-slate-600 border border-slate-300 text-xs font-black px-3 py-1 rounded-full">
              {cross.recessive.emoji} {cross.recessive.label}: {recessiveCount}/4 = {recPct}%
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow p-4 text-center">
          <p className="font-bold text-slate-700 mb-3">{cross.question}</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {answers.map(pct => (
              <button
                key={pct}
                disabled={checked}
                onClick={() => setSelected(pct)}
                className={`w-16 py-2 rounded-xl border-2 font-black text-sm transition-all
                  ${checked && pct === cross.answer ? "bg-emerald-100 border-emerald-500 text-emerald-700 scale-110"
                    : checked && pct === selected && pct !== cross.answer ? "bg-rose-100 border-rose-400 text-rose-700"
                    : selected === pct ? "bg-sky-600 border-sky-600 text-white scale-105"
                    : "bg-white border-slate-200 text-slate-600 hover:scale-105 hover:border-sky-300"}`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {checked ? (
          <button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-1">
            {crossIdx + 1 >= CROSSES.length ? "Finish Lab ✓" : "Next Cross →"}
          </button>
        ) : (
          <button
            disabled={selected === null}
            onClick={handleCheck}
            className={`font-bold px-10 py-3.5 rounded-xl shadow-lg transition-all ${selected !== null ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/30 hover:-translate-y-1" : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`}
          >
            Submit Answer →
          </button>
        )}
      </div>
    </div>
  );
}
