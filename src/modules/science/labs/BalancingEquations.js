"use client";

import { useState, useEffect } from "react";
import { CheckCircle, FlaskConical } from "lucide-react";

// Equations to balance. Students add coefficients to make atoms equal on both sides.
const EQUATIONS = [
  {
    id: "water",
    name: "Forming Water",
    reactants: [
      { formula: "H₂", element: "H", count: 2, label: "Hydrogen" },
      { formula: "O₂", element: "O", count: 2, label: "Oxygen" },
    ],
    product: { formula: "H₂O", elements: { H: 2, O: 1 }, label: "Water" },
    // Balanced: 2H₂ + O₂ → 2H₂O
    solution: { r0: 2, r1: 1, p: 2 },
    fact: "Two hydrogen molecules and one oxygen molecule combine to make two water molecules. The number of atoms is identical on both sides — matter is never created or destroyed!",
  },
  {
    id: "co2",
    name: "Burning Carbon",
    reactants: [
      { formula: "C", element: "C", count: 1, label: "Carbon" },
      { formula: "O₂", element: "O", count: 2, label: "Oxygen" },
    ],
    product: { formula: "CO₂", elements: { C: 1, O: 2 }, label: "Carbon Dioxide" },
    // Balanced: 1C + 1O₂ → 1CO₂
    solution: { r0: 1, r1: 1, p: 1 },
    fact: "Carbon burning in oxygen forms carbon dioxide. This is exactly what happens when you breathe — your body 'burns' glucose and exhales CO₂!",
  },
  {
    id: "salt",
    name: "Forming Table Salt",
    reactants: [
      { formula: "Na", element: "Na", count: 1, label: "Sodium" },
      { formula: "Cl₂", element: "Cl", count: 2, label: "Chlorine" },
    ],
    product: { formula: "NaCl", elements: { Na: 1, Cl: 1 }, label: "Table Salt" },
    // Balanced: 2Na + Cl₂ → 2NaCl
    solution: { r0: 2, r1: 1, p: 2 },
    fact: "Two sodium atoms and one chlorine molecule react to form two units of sodium chloride — ordinary table salt! The very same salt Jesus called us to be in Matthew 5:13.",
  },
];

function AtomCount({ elements, coeff }) {
  // Multiply each element count by the coefficient
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {Object.entries(elements).map(([el, cnt]) => (
        <span key={el} className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg text-xs font-mono font-bold">
          {el}: {cnt * coeff}
        </span>
      ))}
    </div>
  );
}

export default function BalancingEquations({ speak, onComplete }) {
  const [eqIdx, setEqIdx] = useState(0);
  const [coeffs, setCoeffs] = useState([1, 1, 1]); // [r0, r1, product]
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  const eq = EQUATIONS[eqIdx];

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak("Welcome to the Chemistry Lab! The Law of Conservation of Mass states that matter cannot be created or destroyed — only rearranged. This is why chemical equations must be balanced. The atoms on the left side must exactly equal the atoms on the right side!");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  useEffect(() => {
    setCoeffs([1, 1, 1]);
    setChecked(false);
    setIsCorrect(false);
    if (hasSpokenIntro) {
      speak(`Next equation: ${eq.name}. Adjust the coefficients until the number of each atom is equal on both sides of the arrow.`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eqIdx]);

  // Compute atom counts on each side
  const leftAtoms = {};
  eq.reactants.forEach((r, i) => {
    const cnt = r.count * coeffs[i];
    leftAtoms[r.element] = (leftAtoms[r.element] || 0) + cnt;
  });
  const rightAtoms = {};
  Object.entries(eq.product.elements).forEach(([el, cnt]) => {
    rightAtoms[el] = cnt * coeffs[2];
  });

  const isBalanced = Object.keys(leftAtoms).every(
    el => leftAtoms[el] === (rightAtoms[el] || 0)
  ) && Object.keys(rightAtoms).every(
    el => rightAtoms[el] === (leftAtoms[el] || 0)
  );

  const handleCheck = () => {
    setChecked(true);
    setIsCorrect(isBalanced);
    if (isBalanced) {
      speak(`Balanced! ${eq.fact}`);
    } else {
      speak("Not quite balanced yet. Look at the atom counts on both sides — they must be equal!");
    }
  };

  const handleNext = () => {
    const next = [...completed, eq.id];
    setCompleted(next);
    if (eqIdx + 1 >= EQUATIONS.length) {
      speak("Excellent work! You balanced all three equations, proving the Law of Conservation of Mass. Matter is never lost — just rearranged. God built this law into the very fabric of chemistry!");
      setTimeout(onComplete, 2500);
    } else {
      setEqIdx(i => i + 1);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-indigo-950 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-indigo-400">
          <FlaskConical className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase text-sm">Equations Lab</h3>
        </div>
        <p className="text-indigo-100/80 text-sm mb-6 leading-relaxed">
          Adjust the coefficients (multipliers) on each side until the atom counts are perfectly equal. This proves the <strong className="text-white">Law of Conservation of Mass</strong>.
        </p>

        {/* Equation list */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs uppercase font-black text-indigo-400 tracking-wider mb-2 border-b border-indigo-800 pb-2">
            Equations ({completed.length}/{EQUATIONS.length})
          </h4>
          {EQUATIONS.map((e, i) => {
            const done = completed.includes(e.id);
            const cur = i === eqIdx;
            return (
              <div key={e.id} className={`flex items-center gap-2 text-sm font-semibold py-1 ${cur ? "text-white" : done ? "text-emerald-400" : "text-indigo-400/50"}`}>
                {done ? <CheckCircle className="w-4 h-4 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-current shrink-0" />}
                {e.name}
              </div>
            );
          })}
        </div>

        <div className="bg-indigo-900/60 border border-indigo-700/50 rounded-xl p-4 mt-auto">
          <p className="text-xs font-black text-indigo-300 uppercase tracking-wider mb-1">Key Law</p>
          <p className="text-xs text-indigo-100 leading-relaxed">
            <strong>Conservation of Mass:</strong> The total mass of reactants always equals the total mass of products. Atoms are rearranged, never created or destroyed.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-8 gap-6">
        <h3 className="font-extrabold text-slate-800 text-xl">{eq.name}</h3>

        {/* Equation display */}
        <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Reactants */}
            {eq.reactants.map((r, i) => (
              <div key={r.formula} className="flex items-center gap-2">
                {i > 0 && <span className="text-2xl font-black text-slate-400">+</span>}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-0.5">
                    <input
                      type="number" min="1" max="6" value={coeffs[i]}
                      onChange={e => { const c = [...coeffs]; c[i] = Math.max(1, Math.min(6, Number(e.target.value))); setCoeffs(c); setChecked(false); }}
                      className="w-12 text-center font-black text-2xl text-indigo-600 border-2 border-indigo-200 rounded-xl bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <span className="text-2xl font-black text-slate-700 ml-1">{r.formula}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{r.label}</span>
                </div>
              </div>
            ))}

            {/* Arrow */}
            <span className="text-3xl font-black text-slate-300">→</span>

            {/* Product */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-end gap-0.5">
                <input
                  type="number" min="1" max="6" value={coeffs[2]}
                  onChange={e => { const c = [...coeffs]; c[2] = Math.max(1, Math.min(6, Number(e.target.value))); setCoeffs(c); setChecked(false); }}
                  className="w-12 text-center font-black text-2xl text-emerald-600 border-2 border-emerald-200 rounded-xl bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <span className="text-2xl font-black text-slate-700 ml-1">{eq.product.formula}</span>
              </div>
              <span className="text-xs text-slate-400 font-semibold">{eq.product.label}</span>
            </div>
          </div>
        </div>

        {/* Atom balance checker */}
        <div className="w-full max-w-xl grid grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 text-center">⬅ LEFT SIDE (Reactants)</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {Object.entries(leftAtoms).map(([el, cnt]) => (
                <span key={el} className={`px-3 py-1 rounded-full text-sm font-black border-2 ${rightAtoms[el] === cnt ? "bg-emerald-50 border-emerald-400 text-emerald-700" : "bg-rose-50 border-rose-400 text-rose-700"}`}>
                  {el}: {cnt}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 text-center">RIGHT SIDE (Products) ➡</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {Object.entries(rightAtoms).map(([el, cnt]) => (
                <span key={el} className={`px-3 py-1 rounded-full text-sm font-black border-2 ${leftAtoms[el] === cnt ? "bg-emerald-50 border-emerald-400 text-emerald-700" : "bg-rose-50 border-rose-400 text-rose-700"}`}>
                  {el}: {cnt}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Balance status */}
        <div className={`w-full max-w-xl text-center py-3 rounded-2xl font-bold text-sm transition-all ${isBalanced ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-500 border border-rose-100"}`}>
          {isBalanced ? "✅ Equation is balanced! Ready to check." : "⚖️ Not balanced yet — adjust the coefficients."}
        </div>

        {checked && isCorrect ? (
          <button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-1">
            {eqIdx + 1 >= EQUATIONS.length ? "Finish Lab ✓" : "Next Equation →"}
          </button>
        ) : (
          <button
            onClick={handleCheck}
            disabled={!isBalanced}
            className={`font-bold px-10 py-3.5 rounded-xl shadow-lg transition-all ${isBalanced ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/30 hover:-translate-y-1" : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`}
          >
            Check Balance →
          </button>
        )}
      </div>
    </div>
  );
}
