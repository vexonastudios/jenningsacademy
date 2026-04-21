"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Lightbulb } from "lucide-react";

const COLORS = [
  { id: "red",    label: "Red",    wavelength: "700 nm", hex: "#ef4444", fact: "Red light has the longest wavelength and bends the least through a prism." },
  { id: "orange", label: "Orange", wavelength: "620 nm", hex: "#f97316", fact: "Orange is produced by wavelengths between red and yellow light." },
  { id: "yellow", label: "Yellow", wavelength: "580 nm", hex: "#eab308", fact: "Yellow light sits in the middle of the visible spectrum." },
  { id: "green",  label: "Green",  wavelength: "530 nm", hex: "#22c55e", fact: "Green is the wavelength most visible to the human eye — God designed our eyes to see it best!" },
  { id: "blue",   label: "Blue",   wavelength: "470 nm", hex: "#3b82f6", fact: "Blue light scatters more in the atmosphere — this is why the sky appears blue!" },
  { id: "indigo", label: "Indigo", wavelength: "425 nm", hex: "#6366f1", fact: "Indigo sits between blue and violet in the visible spectrum." },
  { id: "violet", label: "Violet", wavelength: "400 nm", hex: "#a855f7", fact: "Violet light has the shortest wavelength and bends the MOST through a prism." },
];

const QUIZ = [
  { question: "Which color bends the MOST through a prism?", answer: "violet", hint: "It has the shortest wavelength." },
  { question: "Which color bends the LEAST through a prism?", answer: "red", hint: "It has the longest wavelength." },
  { question: "Why does the sky appear blue?", answer: "blue", hint: "This color scatters most in the atmosphere." },
  { question: "Which color is the human eye most sensitive to?", answer: "green", hint: "God designed our eyes to pick this one up best!" },
];

export default function PrismLab({ speak, onComplete }) {
  const [phase, setPhase] = useState("explore"); // explore → quiz → done
  const [prismPlaced, setPrismPlaced] = useState(false);
  const [beamAngle, setBeamAngle] = useState(45);
  const [highlightColor, setHighlightColor] = useState(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  useEffect(() => {
    if (!hasSpokenIntro) {
      speak("Welcome to the Prism Lab! White light is actually made of ALL the colors of the rainbow hidden inside it. When light passes through a glass prism, it refracts — it bends — and each color separates because they each travel at slightly different speeds!");
      setHasSpokenIntro(true);
    }
  }, [hasSpokenIntro, speak]);

  const handlePlacePrism = () => {
    setPrismPlaced(true);
    speak("The prism is in place! Watch as the white light bends and splits into the full spectrum — Red, Orange, Yellow, Green, Blue, Indigo, and Violet. We remember ROY G BIV! Click each color band to learn more.");
  };

  const handleColorClick = (color) => {
    setHighlightColor(color);
    speak(`${color.label}: Wavelength ${color.wavelength}. ${color.fact}`);
  };

  const handleStartQuiz = () => {
    setPhase("quiz");
    speak("Now let's test what you've learned! I will ask you questions about light — click the color band that best answers each question.");
  };

  const handleAnswer = (colorId) => {
    if (answered) return;
    const q = QUIZ[quizIdx];
    const correct = colorId === q.answer;
    setAnswered(colorId);
    if (correct) {
      setQuizScore(s => s + 1);
      speak(`Correct! ${COLORS.find(c => c.id === colorId)?.fact}`);
    } else {
      speak(`Not quite. The answer is ${q.answer}. ${q.hint}`);
    }
    setTimeout(() => {
      setAnswered(null);
      if (quizIdx + 1 >= QUIZ.length) {
        setPhase("done");
      } else {
        setQuizIdx(i => i + 1);
      }
    }, 3000);
  };

  if (phase === "done") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="text-6xl mb-6">🌈</div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Light Expert!</h2>
        <p className="text-lg font-bold text-slate-600 mb-2">{quizScore}/{QUIZ.length} Correct</p>
        <p className="text-slate-500 mb-8 max-w-md leading-relaxed text-sm">
          <span className="font-semibold italic text-slate-700">"God said, 'Let there be light,' and there was light." — Genesis 1:3. The rainbow is God's covenant sign — and now you know the science of light behind it!</span>
        </p>
        <button onClick={onComplete} className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-violet-500/30 transition-transform hover:-translate-y-1">
          Finish Lab
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-slate-950 text-white p-8 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-6 text-violet-400">
          <Lightbulb className="w-6 h-6" />
          <h3 className="font-extrabold tracking-widest uppercase">Prism Lab</h3>
        </div>

        {phase === "explore" && (
          <>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              White light is a mixture of all visible wavelengths. Use the prism to split it into its spectrum!
            </p>
            {!prismPlaced ? (
              <button
                onClick={handlePlacePrism}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-violet-500/20 mb-6"
              >
                🔷 Place Prism in Beam
              </button>
            ) : (
              <>
                <div className="mb-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-2">Beam Angle: {beamAngle}°</label>
                  <input type="range" min="15" max="75" value={beamAngle} onChange={e => setBeamAngle(Number(e.target.value))}
                    className="w-full accent-violet-500" />
                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-1"><span>Shallow</span><span>Steep</span></div>
                </div>
                <p className="text-xs text-slate-400 mb-4">Click each color band to learn about its wavelength.</p>
                <button onClick={handleStartQuiz}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg mt-auto">
                  Ready for Quiz! →
                </button>
              </>
            )}
            {highlightColor && (
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mt-auto">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: highlightColor.hex }} />
                  <p className="font-black text-sm" style={{ color: highlightColor.hex }}>{highlightColor.label}</p>
                  <span className="text-xs text-slate-500 ml-auto">{highlightColor.wavelength}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{highlightColor.fact}</p>
              </div>
            )}
          </>
        )}

        {phase === "quiz" && (
          <>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">Quiz time! Click the correct color on the spectrum.</p>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <p className="text-xs font-black text-violet-400 uppercase tracking-wider mb-2">Question {quizIdx + 1}/{QUIZ.length}</p>
              <p className="text-white font-semibold text-sm leading-relaxed">{QUIZ[quizIdx].question}</p>
              <p className="text-slate-400 text-xs mt-2 italic">Hint: {QUIZ[quizIdx].hint}</p>
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs font-bold text-slate-400">Score: {quizScore}/{quizIdx}</span>
            </div>
          </>
        )}
      </div>

      {/* Optics Canvas */}
      <div className="flex-1 bg-slate-900 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="w-full max-w-lg relative" style={{ height: 360 }}>

          {/* Incoming beam */}
          <div
            className="absolute bg-white/80 rounded-full shadow-[0_0_20px_6px_rgba(255,255,255,0.4)]"
            style={{
              width: prismPlaced ? "30%" : "60%",
              height: 8,
              top: "42%",
              left: prismPlaced ? "5%" : "20%",
              transform: `rotate(-${beamAngle - 45}deg)`,
              transformOrigin: "right center",
              transition: "all 0.4s ease",
            }}
          />

          {/* Prism shape */}
          <div className="absolute" style={{ top: "30%", left: "35%", width: 80, height: 80 }}>
            <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-2xl">
              <polygon points="40,5 75,75 5,75"
                fill="rgba(147,197,253,0.25)" stroke="#60a5fa" strokeWidth="2" />
              <polygon points="40,5 75,75 5,75"
                fill="url(#prismGrad)" />
              <defs>
                <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Spectrum fan (only when prism placed) */}
          {prismPlaced && COLORS.map((color, i) => {
            const spread = (i - 3) * (6 + Math.abs(beamAngle - 45) * 0.2);
            const isHighlighted = highlightColor?.id === color.id;
            return (
              <button
                key={color.id}
                onClick={() => handleColorClick(color)}
                className={`absolute rounded-full transition-all duration-500 cursor-pointer ${answered === color.id ? "scale-150 z-20" : "hover:scale-110"}`}
                style={{
                  height: 10,
                  width: "35%",
                  top: `${42 + spread}%`,
                  left: "55%",
                  backgroundColor: color.hex,
                  opacity: 0.85,
                  boxShadow: isHighlighted || (phase === "quiz" && answered === color.id)
                    ? `0 0 20px 8px ${color.hex}88`
                    : `0 0 8px 2px ${color.hex}55`,
                  transform: `rotate(${spread * 0.3}deg)`,
                  transformOrigin: "left center",
                }}
              />
            );
          })}

          {/* Labels on color bands */}
          {prismPlaced && (
            <div className="absolute right-0 flex flex-col gap-0.5" style={{ top: "20%", width: 80 }}>
              {COLORS.map(color => (
                <div key={color.id} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color.hex }} />
                  <span className="text-[9px] font-bold" style={{ color: color.hex }}>{color.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* "ROYGBIV" label */}
          {prismPlaced && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-black tracking-[0.3em] bg-white/10 px-4 py-1 rounded-full text-white/60">
              ROY G BIV
            </div>
          )}

          {!prismPlaced && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/40 font-semibold text-sm">Place the prism to split the light beam →</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
